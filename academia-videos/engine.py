"""محرّك موشن جرافيك بسيط: سبرايتات (RGBA مسبقة الضرب) + تحويلات أفين + كاميرا + انتقالات."""
import os
HERE = os.path.dirname(os.path.abspath(__file__))
import math, sys
import numpy as np, cv2
from PIL import Image, ImageDraw
sys.path.insert(0, HERE)
import og_primitives as g
g.K = 2                     # تكبير الرسم 2x ثم تصغير = حواف ناعمة
K = g.K
W, H, FPS = 1920, 1080, 30

def hexf(h):
    h = h.lstrip("#"); return np.array([int(h[i:i+2], 16) / 255 for i in (0, 2, 4)], np.float32)

C = {k: hexf(v) for k, v in dict(paper=g.PAPER, card=g.PAPER_CARD, paper2=g.PAPER_2, ink=g.INK, muted=g.MUTED, amber=g.AMBER, coral=g.CORAL, green=g.GREEN, blue=g.BLUE).items()}
CH = dict(paper=g.PAPER, card=g.PAPER_CARD, paper2=g.PAPER_2, ink=g.INK, muted=g.MUTED, amber=g.AMBER, coral=g.CORAL, green=g.GREEN, blue=g.BLUE)

# ---------- سبرايتات ----------
def sprite(w, h, draw_fn):
    img = Image.new("RGBA", (w * K, h * K), (0, 0, 0, 0)); d = ImageDraw.Draw(img); d._img = img
    draw_fn(g.Pen(d), d, img)
    a = np.asarray(img.convert("RGBa").resize((w, h), Image.LANCZOS)).astype(np.float32) / 255
    return a  # RGB مسبق الضرب + alpha

def pil_to_sprite(im):
    return np.asarray(im.convert("RGBa")).astype(np.float32) / 255

def wrap(text, f, maxw, lang="ar"):
    lines, cur = [], ""
    for w in text.split(" "):
        t = (cur + " " + w).strip()
        if g.tw(t, f, lang) <= maxw or not cur: cur = t
        else: lines.append(cur); cur = w
    return lines + [cur]

def text_sprite(text, size, color, lang="ar", display=True, shadow=None, bold=True):
    f = g.font(lang, size, bold=bold, display=display)
    wd = int(g.tw(text, f, lang)) + 24 + (shadow[0] if shadow else 0); asc, desc = f.getmetrics(); asc //= K; desc //= K
    hh = asc + desc + 16 + (shadow[1] if shadow else 0)
    def fn(p, d, img):
        if shadow: d.text(((12 + shadow[0]) * K, (8 + asc + shadow[1]) * K), text, font=f, fill=shadow[2], anchor="ls", **g.tkw(lang))
        d.text((12 * K, (8 + asc) * K), text, font=f, fill=color, anchor="ls", **g.tkw(lang))
    return sprite(wd, hh, fn)

# ---------- نوابض ----------
_springs = {}
def spring_table(damping, stiffness=120.0, n=300):
    k = (damping, stiffness)
    if k not in _springs:
        x = v = 0.0; out = [0.0]; dt = 1 / FPS / 8
        for _ in range(n):
            for _ in range(8):
                a = -stiffness * (x - 1) - damping * v; v += a * dt; x += v * dt
            out.append(x)
        _springs[k] = out
    return _springs[k]

def pop(f, delay=0, damping=14):
    i = int(f - delay)
    if i <= 0: return 0.0
    t = spring_table(damping); return t[min(i, len(t) - 1)]

def lerp(f, a, b, x0, x1, ease=None):
    t = min(1.0, max(0.0, (f - a) / max(1e-6, (b - a))))
    if ease: t = ease(t)
    return x0 + (x1 - x0) * t

ease_out = lambda t: 1 - (1 - t) ** 3

# ---------- سياق الرسم مع كاميرا ----------
class Ctx:
    def __init__(self, canvas, cam=(1.0, W / 2, H / 2), shake=(0, 0)):
        self.c = canvas; self.cam = cam; self.shake = shake

    def fill(self, color): self.c[:] = color

    def put(self, spr, cx, cy, sx=1.0, sy=None, rot=0.0, alpha=1.0, anchor=(0.5, 0.5), camera=True):
        if alpha <= 0.002 or sx == 0: return
        sy = sx if sy is None else sy
        h, w = spr.shape[:2]
        ax, ay = anchor[0] * w, anchor[1] * h
        r = math.radians(rot); cs, sn = math.cos(r), math.sin(r)
        M = np.array([[sx * cs, -sy * sn, 0], [sx * sn, sy * cs, 0], [0, 0, 1]], np.float64)
        T0 = np.array([[1, 0, -ax], [0, 1, -ay], [0, 0, 1]], np.float64)
        T1 = np.array([[1, 0, cx + self.shake[0]], [0, 1, cy + self.shake[1]], [0, 0, 1]], np.float64)
        E = T1 @ M @ T0
        if camera:
            s, ox, oy = self.cam
            Cm = np.array([[s, 0, ox - s * ox], [0, s, oy - s * oy], [0, 0, 1]], np.float64); E = Cm @ E
        corners = E @ np.array([[0, w, w, 0], [0, 0, h, h], [1, 1, 1, 1]], np.float64)
        x0 = max(0, int(math.floor(corners[0].min()))); x1 = min(W, int(math.ceil(corners[0].max())))
        y0 = max(0, int(math.floor(corners[1].min()))); y1 = min(H, int(math.ceil(corners[1].max())))
        if x1 <= x0 or y1 <= y0: return
        E2 = E.copy(); E2[0, 2] -= x0; E2[1, 2] -= y0
        out = cv2.warpAffine(spr, E2[:2], (x1 - x0, y1 - y0), flags=cv2.INTER_LINEAR, borderMode=cv2.BORDER_CONSTANT, borderValue=(0, 0, 0, 0))
        a = out[..., 3:4] * alpha
        roi = self.c[y0:y1, x0:x1]
        roi[:] = roi * (1 - a) + out[..., :3] * alpha

    def rays(self, mask, color, opacity, angle, cx=W / 2, cy=H / 2):
        mh, mw = mask.shape
        M = cv2.getRotationMatrix2D((mw / 2, mh / 2), angle, 1.0); M[0, 2] += cx - mw / 2; M[1, 2] += cy - mh / 2
        m = cv2.warpAffine(mask, M, (W, H), flags=cv2.INTER_LINEAR).astype(np.float32)[..., None] / 255 * opacity
        self.c[:] = self.c * (1 - m) + color * m

def make_rays_mask(size=2400, step=16, on=8):
    m = np.zeros((size, size), np.uint8); c = size // 2
    for a in range(0, 360, step):
        pts = [(c, c)] + [(int(c + c * 1.5 * math.cos(math.radians(a + t))), int(c + c * 1.5 * math.sin(math.radians(a + t)))) for t in np.linspace(0, on, 5)]
        cv2.fillPoly(m, [np.array(pts, np.int32)], 255, lineType=cv2.LINE_AA)
    return m

# ---------- انتقالات ----------
def transition(A, B, kind, direction, p):
    out = np.empty_like(A)
    if kind == "fade":
        out[:] = A * (1 - p) + B * p
    elif kind == "wipe":
        out[:] = A
        if direction == "from-left":
            x = int(W * p); out[:, :x] = B[:, :x]
            if 0 < x < W: out[:, max(0, x - 8):x] = C["ink"]          # حافة حبر صلبة
        else:
            y = int(H * (1 - p)); out[y:, :] = B[y:, :]
            if 0 < y < H: out[y:min(H, y + 8), :] = C["ink"]
    else:  # slide (دفع)
        if direction == "from-left":
            sa = int(W * p); sb = int(W * (1 - p)); out[:] = C["ink"]
            out[:, sa:] = A[:, :W - sa]; out[:, :W - sb] = B[:, sb:]
        else:
            sa = int(H * p); sb = int(H * (1 - p)); out[:] = C["ink"]
            out[:H - sa, :] = A[sa:, :]; out[sb:, :] = B[:H - sb, :]
    return out
