"""مشاهد الفيلم التسويقي (1920×1080 — RTL). كل النصوص من copy.json (مأخوذة من نصوص الموقع)."""
import os
HERE = os.path.dirname(os.path.abspath(__file__))
import json, math
import numpy as np
from PIL import Image
from engine import *

copy = json.load(open(os.path.join(HERE, "copy.json"), encoding="utf-8"))["ar"]
HOME, FT = copy["home"], copy["forTeachers"]
STEPS = HOME["startSteps"]          # بحث، مقارنة، اختيار، حجز، دفع، حضور، تقييم
LOGO = Image.open(os.path.join(HERE, "logo.png")).convert("RGBA")
INK, PAPER = C["ink"], C["paper"]   # ألوان float للرسم المباشر؛ CH (hex) لـPen
_cache = {}
def cached(key, fn):
    if key not in _cache: _cache[key] = fn()
    return _cache[key]

def logo_sprite(h):
    return cached(("logo", h), lambda: pil_to_sprite(LOGO.resize((int(LOGO.width * h / LOGO.height), h), Image.LANCZOS)))

# ---------------- عناصر عامة ----------------
def card_sprite(title, desc, color, num):
    def build():
        BW, pad = 840, 16; fd = g.font("ar", 36, bold=False)
        cxc = BW - 30 - 52; tr = cxc - 52 - 28; maxw = tr - 36
        lines = wrap(desc, fd, maxw); BH = 26 + 84 + 10 + len(lines) * 46 + 22
        def fn(p, d, img):
            p.rect((pad, pad, pad + BW, pad + BH), CH[color], r=28, w=7, sh=12)
            p.circle(pad + cxc, pad + BH / 2, 52, CH["card"], w=7, sh=0, shadow=False)
            p.text((pad + cxc, pad + BH / 2 + 4), str(num), g.font("en", 84), anchor="mm", lang="en")
            p.text((pad + tr, pad + 26 + 68), title, g.font("ar", 74, display=True), anchor="rs", lang="ar")
            for i, l in enumerate(lines): p.text((pad + tr, pad + 26 + 84 + 10 + 34 + i * 46), l, fd, fill=CH["ink"], anchor="rs", lang="ar")
        return sprite(BW + 2 * pad + 14, BH + 2 * pad + 14, fn)
    return cached(("card", title, color), build)

def panel_sprite(w, h, color="card", draw_inner=None, key=None):
    def build():
        pad = 16
        def fn(p, d, img):
            p.rect((pad, pad, pad + w, pad + h), CH[color], r=36, w=8, sh=18)
            if draw_inner: draw_inner(p, d, pad)
        return sprite(w + 2 * pad + 20, h + 2 * pad + 20, fn)
    return cached(key or ("panel", w, h, color), build)

def sticker_put(ctx, spr, cx, cy, f, delay, rot=-2.0, fx=0.0, fy=0.0, damping=10):
    p = pop(f, delay, damping)
    if p <= 0: return
    ctx.put(spr, cx + (1 - p) * fx, cy + (1 - p) * fy, sx=0.6 + 0.4 * p, rot=rot * p, alpha=min(1, p * 2.5))

def stack_cards(ctx, f, idxs, x_c, y_top, gap, delays, colors, rots):
    y = y_top
    for k, i in enumerate(idxs):
        s = card_sprite(STEPS[i]["title"], STEPS[i]["text"], colors[k], i + 1); h = s.shape[0]
        sticker_put(ctx, s, x_c, y + h / 2, f, delays[k], rots[k], fx=-300)
        y += h + gap

_words = {}
def word_sprite(text, size, color, shadow):
    key = (text, size, tuple(color), shadow)
    if key not in _words:
        sh = (max(3, int(size * 0.04)), max(3, int(size * 0.04)), (31, 41, 55, 46)) if shadow else None
        _words[key] = text_sprite(text, size, tuple(int(c * 255) for c in color), shadow=sh)
    return _words[key]

def kinetic(ctx, f, text, size, y_top, delay=0, color=None, shadow=True, stagger=5, x_right=None, x_center=None, max_w=1000, line_h=1.35):
    color = C["ink"] if color is None else color
    sp = [word_sprite(w, size, color, shadow) for w in text.split(" ")]
    space = size * 0.22; lines, cur, cw = [], [], 0
    for s in sp:
        w = s.shape[1] - 24
        if cur and cw + space + w > max_w: lines.append((cur, cw)); cur, cw = [], 0
        cw += (space if cur else 0) + w; cur.append((s, w))
    lines.append((cur, cw)); k = 0
    for li, (ln, lw) in enumerate(lines):
        y = y_top + li * size * line_h + size * 0.6
        x = (x_center + lw / 2) if x_center is not None else x_right
        for s, w in ln:
            p = pop(f, delay + k * stagger, 11)
            if p > 0:
                ctx.put(s, x - w / 2 + 0, y + (1 - p) * size * 0.6, sx=0.7 + 0.3 * p, rot=(1 - p) * (5 if k % 2 else -5), alpha=min(1, p * 2))
            x -= w + space; k += 1
    return y_top + len(lines) * size * line_h

def marker_sprite(text, size, color):
    def build():
        f = g.font("ar", size, display=True); wd = int(g.tw(text, f, "ar")) + int(size * 0.5) + 40; asc, desc = f.getmetrics(); asc //= K; desc //= K
        hh = asc + desc + int(size * 0.3) + 30; bw = max(5, int(size * 0.05)); sh = int(size * 0.08)
        def fn(p, d, img):
            p.rect((16, 16, wd - 24, hh - 24), tuple(int(c * 255) for c in color), r=int(size * 0.18), w=bw, sh=sh)
            d.text(((wd - 8) / 2 * K, (16 + asc + size * 0.12) * K), text, font=f, fill=CH["ink"], anchor="ms", **g.tkw("ar"))
        return sprite(wd, hh, fn)
    return cached(("marker", text, size, tuple(color)), build)

def marker_put(ctx, f, spr, cx, cy, delay=0):
    s = lerp(f, delay, delay + 16, 0, 1, ease_out)
    if s <= 0: return
    if s < 1:
        spr = spr.copy(); w = spr.shape[1]; spr[:, :int(w * (1 - s)), :] = 0       # مسح من اليمين لليسار (RTL)
    ctx.put(spr, cx, cy)

def rays_ctx(ctx, f, color, opacity, cx, cy, speed):
    ctx.rays(cached("rays", make_rays_mask), color, opacity, f * speed, cx, cy)

def cam_for(f, dur, a=1.0, b=1.06, ox=W / 2, oy=H / 2):
    return (lerp(f, 0, dur, a, b), ox, oy)

# ---------------- المشاهد ----------------
def hook(ctx, f, dur):
    ctx.fill(PAPER); rays_ctx(ctx, f, C["amber"], 0.22, W * 0.22, H * 0.5, 0.25); ctx.cam = cam_for(f, dur, 1, 1.05)
    lp = pop(f, 6, 9); lg = logo_sprite(560)
    ctx.put(lg, 150 + lg.shape[1] / 2, 230 + 280, sx=0.5 + 0.5 * lp, rot=(1 - lp) * -12, alpha=min(1, lp))
    y = kinetic(ctx, f, HOME["h1a"], 150, 200, delay=4, x_right=W - 130, max_w=1000)
    ms = marker_sprite(HOME["h1b"], 150, C["amber"]); marker_put(ctx, f, ms, W - 130 - ms.shape[1] / 2, y + 120, 26)
    kinetic(ctx, f, HOME["h1c"], 96, y + 220, delay=44, color=C["muted"], shadow=False, x_right=W - 130, max_w=1000)

def discover(ctx, f, dur):
    ctx.fill(C["blue"]); ctx.cam = cam_for(f, dur, 1, 1.06, W * 0.25)
    def inner(p, d, pad):
        p.rect((pad + 36, pad + 36, pad + 744, pad + 148), CH["paper2"], r=56, w=6, sh=0, shadow=False)
        p.circle(pad + 100, pad + 92, 22, CH["paper2"], w=6, sh=0, shadow=False); p.line((pad + 117, pad + 109), (pad + 138, pad + 130), 6)
        for i in range(2): pass
        p.rect((pad + 170, pad + 82, pad + 470, pad + 102), "#B8B2A3", r=10, w=0, sh=0, shadow=False)
    pw, ph = 780, 700; pn = panel_sprite(pw, ph, "card", inner, "p_discover")
    ctx.put(pn, 120 + pw / 2 + 16, 170 + ph / 2 + 16)
    if (f // 15) % 2 == 0: ctx.put(cached("caret", lambda: sprite(8, 50, lambda p, d, i: p.rect((0, 0, 8, 50), CH["ink"], w=0, sh=0, shadow=False))), 120 + 16 + 500, 170 + 16 + 92)
    for i in range(3):
        on = lerp(f, 70 + i * 60, 78 + i * 60, 0, 1)
        def row(active, i=i):
            def build():
                def fn(p, d, img):
                    p.rect((12, 12, 700, 132), CH["amber"] if active else CH["card"], r=28, w=6, sh=0, shadow=False)
                    p.circle(600, 72, 46, [CH["green"], CH["coral"], CH["blue"]][i], w=6, sh=0, shadow=False)
                    p.rect((220, 52, 510, 74), "#8f8a7c", r=11, w=0, sh=0, shadow=False); p.rect((330, 90, 510, 108), "#B8B2A3", r=9, w=0, sh=0, shadow=False)
                    p.text((140, 74), "أونلاين" if i == 1 else "وجاهي", g.font("ar", 34), anchor="mm", lang="ar")
                return sprite(716, 144, fn)
            return cached(("row", i, active), build)
        ctx.put(row(on > 0.5), 120 + 16 + pw / 2 - 6 - on * 14, 170 + 16 + 230 + i * 160, camera=True)
    stack_cards(ctx, f, [0, 1, 2], W - 110 - 436, 150, 30, [12, 72, 132], ["amber", "card", "green"], [-2, 2, -2])

def bookpay(ctx, f, dur):
    ctx.fill(C["amber"]); rays_ctx(ctx, f, C["card"], 0.18, W * 0.3, H * 0.5, 0.25)
    t = f - 150; k = (1 - t / 14) if 0 <= t < 14 else 0
    ctx.shake = (math.sin(f * 12.9898) * 16 * k, math.cos(f * 78.233) * 16 * k); ctx.cam = cam_for(f, dur, 1, 1.05, W * 0.3)
    def inner(p, d, pad):
        p.rect((pad + 44, pad + 36, pad + 164, pad + 156), CH["amber"], r=30, w=7, sh=0, shadow=False)
        p.text((pad + 104, pad + 100), "$", g.font("en", 80), anchor="mm", lang="en")
        p.text((pad + 696, pad + 120), STEPS[4]["title"], g.font("ar", 64), anchor="rm", lang="ar")
        p.rect((pad + 44, pad + 200, pad + 696, pad + 256), CH["paper2"], r=28, w=6, sh=0, shadow=False)
    pw, ph = 740, 470; pn = panel_sprite(pw, ph, "card", inner, "p_wallet"); ctx.put(pn, 150 + pw / 2 + 16, 190 + ph / 2 + 16)
    grow = lerp(f, 60, 120, 0.05, 1, ease_out)
    bar = cached("bar", lambda: sprite(640, 44, lambda p, d, i: p.rect((0, 0, 640, 44), CH["green"], r=22, w=0, sh=0, shadow=False)))
    ctx.put(bar, 150 + 16 + 696, 190 + 16 + 228, sx=grow, sy=1, anchor=(1, 0.5))
    for i in range(2):
        a = lerp(f, 90 + i * 20, 106 + i * 20, 0, 1)
        sp = cached(("hist", i), lambda i=i: sprite(520, 60, lambda p, d, im: (p.circle(30, 30, 22, CH["blue"], w=5, sh=0, shadow=False), p.rect((80, 20, 80 + (300 if i else 400), 40), "#B8B2A3", r=10, w=0, sh=0, shadow=False))))
        ctx.put(sp, 150 + 16 + 540, 190 + 16 + 320 + i * 70, alpha=a)
    st = cached("stamp", lambda: sprite(300, 300, lambda p, d, im: (p.circle(150, 150, 120, CH["green"], w=10, sh=14), p.line((95, 150), (135, 192), 16), p.line((135, 192), (210, 100), 16))))
    sp = pop(f, 150, 7)
    if sp > 0: ctx.put(st, 730, 330, sx=2.6 - 1.6 * sp, rot=-12 + 12 * sp, alpha=min(1, sp * 3))
    stack_cards(ctx, f, [3, 4], W - 110 - 436, 250, 44, [10, 70], ["card", "blue"], [-2, 2])

def session(ctx, f, dur):
    ctx.fill(C["green"]); ctx.cam = cam_for(f, dur, 1, 1.06, W * 0.28)
    def inner(p, d, pad):
        for i in range(7): p.rect((pad + 44 + i * 98, pad + 40, pad + 44 + i * 98 + 84, pad + 110), CH["amber"] if i == 3 else CH["paper2"], r=14, w=5, sh=0, shadow=False)
    pw, ph = 780, 520; pn = panel_sprite(pw, ph, "card", inner, "p_session"); ctx.put(pn, 130 + pw / 2 + 16, 170 + ph / 2 + 16)
    chip = cached("chip", lambda: sprite(520, 130, lambda p, d, im: (p.rect((12, 12, 500, 112), CH["blue"], r=50, w=7, sh=0, shadow=False), p.text((290, 62), "رابط الاجتماع", g.font("ar", 46), anchor="mm", lang="ar"), p.rect((46, 40, 100, 86), CH["card"], r=8, w=5, sh=0, shadow=False))))
    cp = pop(f, 30, 9); ctx.put(chip, 130 + 16 + 300, 170 + 16 + 230, sx=0.8 + 0.2 * cp, alpha=min(1, cp * 2))
    star = cached("star", lambda: sprite(130, 130, lambda p, d, im: p.poly(g.star(65, 66, 56, 25), CH["amber"], w=5, sh=0, shadow=False)))
    for i in range(5):
        sp = pop(f, 110 + i * 8, 7)
        if sp > 0: ctx.put(star, 130 + 16 + 390 + (i - 2) * 128, 170 + 16 + 400, sx=sp, rot=(1 - sp) * 40, alpha=min(1, sp * 3))
    stack_cards(ctx, f, [5, 6], W - 110 - 436, 250, 44, [10, 90], ["card", "amber"], [-2, 2])

def teachers(ctx, f, dur):
    ctx.fill(C["paper2"]); ctx.cam = cam_for(f, dur, 1, 1.04)
    kinetic(ctx, f, FT["h1"], 92, 175, delay=2, x_right=W - 130, max_w=1660)
    items = [("verified", "green", 700, -200, -3), ("upload", "blue", -700, -200, 3), ("analytics", "card", 700, 200, 2.5), ("income", "coral", -700, 200, -2.5)]
    pos = [(W - 130 - 395, 500), (130 + 395, 500), (W - 130 - 395, 815), (130 + 395, 815)]
    for i, (k, col, fx, fy, rot) in enumerate(items):
        b = FT["benefits"][k]
        def build(b=b, col=col):
            fd = g.font("ar", 34, bold=False); lines = wrap(b["d"], fd, 700)[:3]; BH = 40 + 80 + 12 + len(lines) * 48 + 30
            def fn(p, d, img):
                p.rect((16, 16, 16 + 790, 16 + BH), CH[col], r=28, w=7, sh=12)
                p.text((16 + 760, 16 + 40 + 56), b["t"], g.font("ar", 66, display=True), anchor="rs", lang="ar")
                for j, l in enumerate(lines): p.text((16 + 760, 16 + 40 + 80 + 12 + 34 + j * 48), l, fd, anchor="rs", lang="ar")
            return sprite(790 + 46, BH + 46, fn)
        spr = cached(("ben", k), build); sticker_put(ctx, spr, pos[i][0], pos[i][1], f, 34 + i * 34, rot, fx, fy)

def parents(ctx, f, dur):
    ctx.fill(C["card"]); rays_ctx(ctx, f, C["green"], 0.2, W * 0.75, H * 0.5, -0.2); ctx.cam = cam_for(f, dur, 1, 1.05, W * 0.3)
    role = HOME["roles"]["parent"]
    y = kinetic(ctx, f, role["t"], 170, 200, delay=4, x_right=W - 190, max_w=760)
    kinetic(ctx, f, role["d"], 60, y + 10, delay=20, color=C["muted"], shadow=False, x_right=W - 190, max_w=760)
    def inner(p, d, pad):
        p.text((pad + 816, pad + 66), "حضور", g.font("ar", 44), anchor="rm", lang="ar")
        p.text((pad + 816, pad + 250), "نتائج الامتحانات", g.font("ar", 44), anchor="rm", lang="ar")
    pw, ph = 860, 700; pn = panel_sprite(pw, ph, "paper2", inner, "p_parents"); ctx.put(pn, 130 + pw / 2 + 16, 150 + ph / 2 + 16)
    for i in range(10):
        sp = pop(f, 24 + i * 5, 12)
        s = cached(("sq", i == 6), lambda i=i: sprite(70, 84, lambda p, d, im: p.rect((4, 4, 66, 80), CH["coral"] if i == 6 else CH["green"], r=14, w=5, sh=0, shadow=False)))
        if sp > 0: ctx.put(s, 130 + 16 + 816 - 35 - i * 76.5, 150 + 16 + 160, sy=sp, sx=1, anchor=(0.5, 1.0))
    for i, hgt in enumerate([0.45, 0.7, 0.55, 0.9, 0.78]):
        sp = pop(f, 70 + i * 8, 13); bh = int(300 * hgt)
        s = cached(("bar", i), lambda bh=bh, i=i: sprite(140, bh + 8, lambda p, d, im: p.rect((4, 4, 136, bh + 4), CH["amber"] if i % 2 else CH["blue"], r=14, w=5, sh=0, shadow=False)))
        if sp > 0: ctx.put(s, 130 + 16 + 816 - 70 - i * 158, 150 + 16 + 650, sy=sp, sx=1, anchor=(0.5, 1.0))

def value(ctx, f, dur):
    st = HOME["statement"]; ctx.fill(C["amber"]); rays_ctx(ctx, f, C["card"], 0.3, W / 2, H / 2, 0.35); ctx.cam = cam_for(f, dur, 1, 1.07)
    ms = marker_sprite(st["title"], 140, C["card"]); marker_put(ctx, f, ms, W / 2, 400, 6)
    kinetic(ctx, f, st["sub"], 62, 560, delay=34, shadow=False, x_center=W / 2, max_w=1500)

def cta(ctx, f, dur):
    ctx.fill(PAPER); rays_ctx(ctx, f, C["amber"], 0.2, W / 2, H * 0.55, 0.25); ctx.cam = cam_for(f, dur, 1, 1.04)
    lp = pop(f, 0, 9); lg = logo_sprite(230); ctx.put(lg, W / 2, 190, sx=lp, alpha=min(1, lp * 2))
    kinetic(ctx, f, HOME["ctaTitle"], 130, 320, delay=6, x_center=W / 2, max_w=1500)
    btn = cached("btn", lambda: sprite(900, 220, lambda p, d, im: (p.rect((20, 20, 860, 180), CH["amber"], r=34, w=9, sh=16), p.text((440, 104), HOME["ctaButton"], g.font("ar", 96, display=True), anchor="mm", lang="ar"))))
    bp = pop(f, 22, 9); pulse = 1 + 0.03 * math.sin(max(0, f - 50) / 5)
    if bp > 0: ctx.put(btn, W / 2, 640, sx=(0.5 + 0.5 * bp) * pulse, alpha=min(1, bp * 2))
    url = cached("url", lambda: text_sprite("academia-platform.vercel.app", 52, tuple(int(c * 255) for c in C["ink"]), lang="en", display=True, bold=False))
    ctx.put(url, W / 2, 800, alpha=min(1, pop(f, 44)))
    # confetti
    t = f - 26
    if t >= 0:
        cols = [C["amber"], C["coral"], C["green"], C["blue"], C["ink"]]
        for i in range(70):
            r = lambda s: (math.sin((i + s) * 127.1 + 311.7) * 43758.5453) % 1
            ang = math.pi * (0.1 + 0.8 * r(1)); sp = 16 + r(101) * 26; dirx = 1 if r(201) > 0.5 else -1
            px = 960 + math.cos(ang) * sp * t * dirx; py = 760 - math.sin(ang) * sp * t + 0.45 * t * t; size = int(22 + r(301) * 26)
            fade = lerp(t, 55, 85, 1, 0)
            if fade <= 0 or px < -60 or px > W + 60 or py > H + 60: continue
            shape = int(r(401) * 3); colr = cols[i % 5]
            spr = cached(("conf", shape, size, i % 5), lambda shape=shape, size=size, colr=colr: sprite(size + 12, size + 12, lambda p, d, im: (p.circle((size + 12) / 2, (size + 12) / 2, size / 2, tuple(int(c * 255) for c in colr), w=4, sh=0, shadow=False) if shape == 1 else p.rect((6, 6, size + 6, size + 6), tuple(int(c * 255) for c in colr), r=4 if shape == 0 else size // 3, w=4, sh=0, shadow=False))))
            ctx.put(spr, px, py, rot=t * (6 + r(501) * 14), alpha=fade, camera=False)

SCENES = [("hook", 150, hook), ("discover", 270, discover), ("bookpay", 270, bookpay), ("session", 240, session), ("teachers", 300, teachers), ("parents", 270, parents), ("value", 180, value), ("cta", 210, cta)]
TRANS = [("wipe", "from-left", False), ("slide", "from-left", True), ("wipe", "from-bottom", False), ("slide", "from-bottom", True), ("wipe", "from-left", False), ("slide", "from-left", True), ("fade", "", False)]
T = 14
STARTS = []; _s = 0
for _, fr, _ in SCENES: STARTS.append(_s); _s += fr - T
TOTAL = STARTS[-1] + SCENES[-1][1]
