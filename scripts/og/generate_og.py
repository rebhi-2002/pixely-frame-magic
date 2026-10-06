#!/usr/bin/env python3
"""
مولّد صور المشاركة الاجتماعية لـ Academia — Warm Neo-Brutalism (الثيم الفاتح).

كل بطاقة مبنية من عناصر الهوية نفسها، مو قالب عام، وكل عنصر له قاعدة (راجع "قواعد التصميم" تحت):
  • عنوان الصفحة الفعلي مع تمييز "ماركر" على الكلمة المفتاحية (نفس `.text-highlight` بالموقع)
  • مشهد واجهة مصغّر خاص بالصفحة (بطاقة كورس، جدول توفّر، لوحة ولي أمر…) بمصطلحات المنصة الحقيقية
  • خلفية الشبكة + مدار منقّط من public/visuals، وشريط تيكر بمزايا المنصة، وشرائح الأدوار (طالب/معلّم/ولي أمر)
الناتج: public/og/<key>-<ar|en>.png (1200×630) + public/og/github-repo.png (1280×640)
التشغيل: python3 scripts/og/generate_og.py   (Pillow + libraqm لتشكيل العربي)
الخطوط (نفس خطوط الموقع من Google Fonts): ضع بـ scripts/og/fonts/ الملفات الثابتة (static):
        BalooBhaijaan2-Bold.ttf (عناوين العربي) + Cairo-Bold.ttf / Cairo-SemiBold.ttf (باقي العربي) + Poppins-Bold.ttf / Poppins-Medium.ttf (إنجليزي)
        بدونها يُستعمل DejaVu للعربي — مقبول للمعاينة فقط، مو للنسخة النهائية. النصوص كلها بالجداول PAGES / KICKERS تحت.
"""
import json, math, re, sys
from functools import lru_cache
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "public" / "og"
FONTS = Path(__file__).resolve().parent / "fonts"
def _merge(a, b):
    o = dict(a)
    for k, v in b.items(): o[k] = _merge(o[k], v) if isinstance(o.get(k), dict) and isinstance(v, dict) else v
    return o


_LOC = {l: _merge(json.load(open(ROOT / f"src/i18n/locales/{l}.json", encoding="utf-8")), json.load(open(ROOT / f"src/i18n/locales/{l}.pages.json", encoding="utf-8"))) for l in ("ar", "en")}


def S(path):
    """(عربي، إنجليزي) من نصوص الموقع نفسها — مصدر واحد: لو تغيّر النص بالموقع، أعد التوليد."""
    def get(l):
        x = _LOC[l]
        for k in path.split("."): x = x[int(k)] if k.isdigit() else x[k]
        return x
    return get("ar"), get("en")


def TL(*items):
    """قائمة تيكر ثنائية اللغة: كل عنصر إمّا S(...) أو (ar, en)."""
    return [i[0] for i in items], [i[1] for i in items]


LOGO = Image.open(ROOT / "public/brand/logo-mark.png").convert("RGBA")
DESCRIPTOR = ("منصة تعليمية عربية", "Arabic-first learning platform")  # بدل الدومين: ما بيتغيّر لو انتقل الموقع لدومين مخصّص

# ---- توكنز الثيم الفاتح (styles.css) ----
PAPER, PAPER_CARD, PAPER_2, GRID = "#F7F1E4", "#FFFBF2", "#EFE6D3", "#EDE4D0"
INK, MUTED = "#1F2937", "#52606D"
AMBER, CORAL, GREEN, BLUE = "#F6C04F", "#EC8467", "#78CFA3", "#86B6EC"
K = 3  # supersampling


def _find(names, fallbacks):
    for n in names:
        if (FONTS / n).exists(): return str(FONTS / n)
    for f in fallbacks:
        if Path(f).exists(): return f
    sys.exit(f"خط ناقص: ضع {names[0]} داخل {FONTS}")


F_EN_B = _find(["Poppins-Bold.ttf"], ["/usr/share/fonts/truetype/google-fonts/Poppins-Bold.ttf"])
F_EN_M = _find(["Poppins-Medium.ttf"], ["/usr/share/fonts/truetype/google-fonts/Poppins-Medium.ttf"])
F_AR_B = _find(["Cairo-Bold.ttf"], ["/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"])
F_AR_D = _find(["BalooBhaijaan2-Bold.ttf", "BalooBhaijaan2-ExtraBold.ttf", "Cairo-Bold.ttf"], ["/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"])  # خط العناوين بالموقع
F_AR_M = _find(["Cairo-SemiBold.ttf", "Cairo-Bold.ttf"], ["/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"])


@lru_cache(maxsize=None)
def font(lang, size, bold=True, display=False):
    path = (F_AR_D if display else F_AR_B if bold else F_AR_M) if lang == "ar" else (F_EN_B if bold else F_EN_M)
    return ImageFont.truetype(path, int(round(size * K)), layout_engine=ImageFont.Layout.RAQM)


def tkw(lang): return dict(direction="rtl", language="ar") if lang == "ar" else dict(language="en")
def tw(text, f, lang): return f.getlength(text, **tkw(lang)) / K
def L(lang, ar, en): return ar if lang == "ar" else en


# ---------------------------------------------------------------------------------------------
# قواعد التصميم (كل موضع/لون بالبطاقة ناتج عن قاعدة، مو اختيار عشوائي)
#  1) اللون = الجمهور: أزرق = طالب، كهرماني = معلّم، أخضر = ولي أمر، كورالي = خطأ/تنبيه فقط،
#     كريمي (PAPER_2) = صفحة منصة عامة (قانوني/مساعدة/دخول…). لوحة المشهد + شريحة الدور بنفس اللون.
#  2) شريحة الدور تظهر فقط بالصفحات الخاصة بجمهور واحد (والمفعّلة = لون الصفحة) — مو فلر.
#  3) الاتجاه: الصفحة العربية مرآة كاملة للإنجليزية (اللوحة، ترتيب الصفوف، اتجاه السلالم والتقدّم) —
#     النص بس يبقى مقروء. الظل دايمًا نازل لليمين.
#  4) الميلان: البطاقة الرئيسية بالمشهد -2°، الشريحة/الملصق +3° (بس العناصر "الملصقة"؛ القوائم والصفوف مستقيمة).
#  5) الشريحة العليا (tag) دايمًا بالزاوية العليا الخارجية للوحة وبمعلومة جديدة — ما بتكرّر نص موجود.
#  6) الإيقاع: هامش 34 من حافة الإطار (الشعار/اللوحة/التيكر/النص بنفس الهامش)، الفراغات 24 / 16 / 24
#     (kicker→عنوان→وصف→شرائح)، وكتلة النص متمركزة عموديًا على مركز اللوحة.
#  8) الشريط السفلي: حقائق حقيقية خاصة بالصفحة من نصوص الموقع (مو نص ثابت على كلها). الوصف/kicker أيضًا من نصوص الموقع.
#  7) طبقات الخلفية: شبكة الصفحة (من public/visuals) → بطاقة كريمي سادة → لوحة منقّطة. بدون شبكة داخل البطاقة.
# ---------------------------------------------------------------------------------------------
STUDENT, TEACHER, PARENT, NEUTRAL = BLUE, AMBER, GREEN, PAPER_2
MARGIN = 34


class Pen:
    """رسم بإحداثيات 1x نسبةً لنقطة أصل (ox, oy). mirror=True يعكس الأفقي (للعربية) بعرض محلي wl."""
    def __init__(self, d, ox=0, oy=0, mirror=False, wl=0): self.d, self.ox, self.oy, self.mirror, self.wl = d, ox, oy, mirror, wl
    def _x(self, x): return self.ox + (self.wl - x if self.mirror else x)
    def _b(self, b):
        xa, xb = self._x(b[0]), self._x(b[2])
        return [min(xa, xb) * K, (self.oy + b[1]) * K, max(xa, xb) * K, (self.oy + b[3]) * K]
    def _p(self, x, y): return (self._x(x) * K, (self.oy + y) * K)
    def rect(self, b, fill, r=0, w=4, sh=7, shadow=True, ink=INK):
        bb = self._b(b)
        if shadow and sh: self.d.rounded_rectangle([bb[0]+sh*K, bb[1]+sh*K, bb[2]+sh*K, bb[3]+sh*K], radius=r*K, fill=INK)
        self.d.rounded_rectangle(bb, radius=r*K, fill=fill, outline=ink if w else None, width=w*K)
    def circle(self, cx, cy, r, fill, w=4, sh=6, shadow=True): self.rect((cx-r, cy-r, cx+r, cy+r), fill, r=r, w=w, sh=sh, shadow=shadow)
    def poly(self, pts, fill, w=4, sh=6, shadow=True):
        P = [self._p(x, y) for x, y in pts]
        if shadow and sh: self.d.polygon([(x + sh*K, y + sh*K) for x, y in P], fill=INK)
        self.d.polygon(P, fill=fill)
        if w: self.d.line(P + [P[0]], fill=INK, width=w*K, joint="curve")
    def line(self, a, b, w=4, fill=INK):
        A, B = self._p(*a), self._p(*b)
        self.d.line([A, B], fill=fill, width=w*K)
        for c in (A, B): self.d.ellipse([c[0]-w*K/2, c[1]-w*K/2, c[0]+w*K/2, c[1]+w*K/2], fill=fill)
    def arc(self, box, s, e, w=4, fill=INK):
        if self.mirror: s, e = 180 - e, 180 - s
        self.d.arc(self._b(box), s % 360, e % 360 if e % 360 else 360, fill=fill, width=w*K)
    def text(self, xy, s, f, fill=INK, anchor="mm", lang="en"):
        if self.mirror: anchor = {"l": "r", "r": "l"}.get(anchor[0], anchor[0]) + anchor[1]
        self.d.text(self._p(*xy), s, font=f, fill=fill, anchor=anchor, **tkw(lang))


def sticker(p, x, y, w, h, ang, fn, pad=26):
    """يرسم fn بطبقة منفصلة ثم يدوّرها — الزاوية بتنعكس تلقائيًا مع المرآة."""
    w, h = int(math.ceil(w)), int(math.ceil(h))
    layer = Image.new("RGBA", ((w + 2*pad)*K, (h + 2*pad)*K), (0, 0, 0, 0))
    ld = ImageDraw.Draw(layer); ld._img = layer
    fn(Pen(ld, pad, pad, mirror=p.mirror, wl=w), ld)
    rot = layer.rotate(-ang if p.mirror else ang, resample=Image.BICUBIC, expand=True)
    left = p._x(x + w) if p.mirror else p._x(x)
    cx, cy = (left + w/2) * K, (p.oy + y + h/2) * K
    p.d._img.paste(rot, (int(cx - rot.width/2), int(cy - rot.height/2)), rot)


def chip(p, x, y, text, fill, lang, size=24, h=44, outline_only=False):
    f = font(lang, size); w = tw(text, f, lang) + 36
    p.rect((x, y, x+w, y+h), PAPER_CARD if outline_only else fill, r=h//2, w=3, sh=4)
    p.text((x + w/2, y + h/2 + 1), text, f, lang=lang)
    return w


def chips_row(p, x, y, items, lang, size=22, h=40, gap=10):
    for t, c in items: x += chip(p, x, y, t, c, lang, size, h) + gap
    return x


def tag(p, text, color, lang, pw=430):
    """الشريحة العليا — القاعدة 5: زاوية اللوحة العليا الخارجية، ميلان +3°."""
    f = font(lang, 22); w = tw(text, f, lang) + 40
    sticker(p, pw - w - 16, 10, w + 6, 50, 3, lambda q, d: chip(q, 2, 2, text, color, lang, 22, 46))


def star(cx, cy, R, r=None):
    r = r or R*0.45
    return [(cx + (R if i % 2 == 0 else r)*math.sin(math.pi*i/5), cy - (R if i % 2 == 0 else r)*math.cos(math.pi*i/5)) for i in range(10)]


def avatar(p, cx, cy, r, c, sh=0):
    p.circle(cx, cy, r, PAPER_2, sh=sh)
    p.d.pieslice(p._b((cx - r*0.62, cy + r*0.22, cx + r*0.62, cy + r*1.45)), 180, 360, fill=c, outline=INK, width=3*K)
    p.circle(cx, cy - r*0.18, r*0.34, c, w=3, sh=0, shadow=False)


def skel(p, x, y, widths, gap=16, h=9, fill="#B8B2A3"):
    for i, w in enumerate(widths): p.rect((x, y + i*gap, x + w, y + i*gap + h), fill, r=h//2, w=0, sh=0, shadow=False)


def stars_row(p, cx, y, n=5, R=13):
    pitch = R * 2.4; x0 = cx - pitch * (n - 1) / 2
    for i in range(n): p.poly(star(x0 + i*pitch, y, R), AMBER, w=2, sh=0, shadow=False)


def toggle(p, x, y, on):
    p.rect((x, y, x+54, y+28), GREEN if on else PAPER_2, r=14, w=3, sh=0, shadow=False)
    p.circle(x + (40 if on else 14), y + 14, 9, PAPER_CARD, w=3, sh=0, shadow=False)


def _sg(p): return -1 if p.mirror else 1


def play(p, cx, cy, s=1.0):
    """مثلث التشغيل يبقى يشاور لليمين بالعربي كمان (رموز الوسائط ما بتنعكس)."""
    g = _sg(p)
    p.poly([(cx - g*11*s, cy - 19*s), (cx - g*11*s, cy + 19*s), (cx + g*20*s, cy)], INK, w=0, sh=0, shadow=False)


def check(p, cx, cy, s=1.0, w=6):
    """علامة ✓ ما بتنعكس مع المرآة."""
    g = _sg(p)
    p.line((cx - g*9*s, cy), (cx - g*2*s, cy + 8*s), w); p.line((cx - g*2*s, cy + 8*s), (cx + g*13*s, cy - 10*s), w)


def card(p, b, header=None, hh=0, r=16, sh=7):
    p.rect(b, PAPER_CARD, r=r, sh=sh)
    if header: p.rect((b[0], b[1], b[2], b[1] + hh), header, r=r, w=4, sh=0, shadow=False)


# ================== مشاهد الواجهة — لوحة 430×352 (مرآة تلقائية للعربية) ==================
def s_home(p, lang):
    """المنصة بالمنتصف + الأدوار الثلاثة على المدار (نفس زخرفة study-orbit.svg)."""
    cx, cy, R = 215, 182, 134
    for i in range(36): p.arc((cx-R, cy-R, cx+R, cy+R), i*10, i*10 + 5, w=3)
    lw = 196; lh = int(lw * LOGO.height / LOGO.width)
    p.d._img.alpha_composite(LOGO.resize((lw*K, lh*K), Image.LANCZOS), (int((p.ox + cx - lw/2)*K), int((p.oy + cy - lh/2 + 14)*K)))
    for ang, t, c in ((-90, L(lang, "طالب", "Student"), STUDENT), (30, L(lang, "معلّم", "Teacher"), TEACHER), (150, L(lang, "ولي أمر", "Parent"), PARENT)):
        px_, py_ = cx + R*math.cos(math.radians(ang)), cy + R*math.sin(math.radians(ang))
        f = font(lang, 24); w = tw(t, f, lang) + 36
        p.rect((px_ - w/2, py_ - 23, px_ + w/2, py_ + 23), c, r=23, w=3, sh=5); p.text((px_, py_ + 1), t, f, lang=lang)


def s_default(p, lang):
    """بطاقة الاحتياط: الشعار وحده على المدار (بدون أدوار) — لأي صفحة عامة غير مسجّلة بعد."""
    cx, cy, R = 215, 176, 140
    for i in range(36): p.arc((cx-R, cy-R, cx+R, cy+R), i*10, i*10 + 5, w=3)
    lw = 240; lh = int(lw * LOGO.height / LOGO.width)
    p.d._img.alpha_composite(LOGO.resize((lw*K, lh*K), Image.LANCZOS), (int((p.ox + cx - lw/2)*K), int((p.oy + cy - lh/2 + 8)*K)))


def s_about(p, lang):
    people = ((14, 84, -2, CORAL, L(lang, "الواجهة", "Frontend")), (153, 58, 2, BLUE, L(lang, "الباك اند", "Backend")), (292, 84, -2, GREEN, L(lang, "التوثيق", "Docs")))
    for x, y, a, c, label in people:
        def cardfn(q, d, c=c, label=label):
            card(q, (0, 0, 124, 196), c, 100)
            avatar(q, 62, 50, 32, c if c != BLUE else PAPER_CARD)
            q.text((62, 142), label, font(lang, 24), lang=lang); skel(q, 17, 172, [90])
        sticker(p, x, y, 124, 196, a, cardfn)
    tag(p, L(lang, "٣ مؤسسين", "3 founders"), TEACHER, lang)


def s_courses(p, lang):
    sticker(p, 62, 36, 344, 236, 4, lambda q, d: q.rect((0, 0, 344, 236), PAPER_2, r=16))
    def front(q, d):
        card(q, (0, 0, 382, 232), AMBER, 124)
        q.circle(191, 62, 32, PAPER_CARD, sh=4); play(q, 191, 62)
        skel(q, 22, 146, [220, 150]); q.rect((22, 198, 360, 214), PAPER_2, r=8, w=3, sh=0, shadow=False); q.rect((22, 198, 150, 214), STUDENT, r=8, w=3, sh=0, shadow=False)
    sticker(p, 24, 40, 382, 232, -2, front)
    chips_row(p, 24, 296, ((L(lang, "أونلاين", "Online"), GREEN), (L(lang, "وجاهي", "In person"), AMBER), (L(lang, "مسجّل", "Recorded"), CORAL)), lang, 22, 42)
    tag(p, L(lang, "مباشر", "Live"), CORAL, lang)


def s_teachers(p, lang):
    p.rect((24, 24, 406, 82), PAPER_CARD, r=29)
    p.circle(60, 53, 12, PAPER_CARD, w=5, sh=0, shadow=False); p.line((69, 62), (80, 73), 6)
    skel(p, 100, 48, [170]); chip(p, 318, 31, L(lang, "بحث", "Search"), AMBER, lang, 20, 44)
    for x, c, t, tc in ((24, AMBER, L(lang, "أونلاين", "Online"), GREEN), (222, GREEN, L(lang, "وجاهي", "In person"), BLUE)):
        def cardfn(q, d, c=c, t=t, tc=tc):
            card(q, (0, 0, 184, 176))
            avatar(q, 92, 48, 32, c); skel(q, 37, 96, [110, 70]); stars_row(q, 92, 138, R=10)
            chip(q, 92 - (tw(t, font(lang, 17), lang) + 36)/2, 148, t, tc, lang, 17, 24) if False else None
        sticker(p, x, 104, 184, 176, -2 if x < 100 else 2, cardfn)
    chips_row(p, 24, 300, ((L(lang, "المادة", "Subject"), PAPER_CARD), (L(lang, "الصف", "Grade"), PAPER_CARD), (L(lang, "السعر", "Price"), PAPER_CARD)), lang, 20, 38, 8)


def s_for_teachers(p, lang):
    def grid(q, d):
        card(q, (0, 0, 290, 236), STUDENT, 52)
        q.text((20, 27), L(lang, "أوقات التوفّر", "Availability"), font(lang, 22), anchor="lm", lang=lang)
        for r_ in range(4):
            for c_ in range(5):
                on = (r_ * 5 + c_) % 3 == 0 or (r_, c_) == (2, 3)
                q.rect((18 + c_*51, 70 + r_*41, 18 + c_*51 + 42, 70 + r_*41 + 32), AMBER if on else PAPER_2, r=7, w=3, sh=0, shadow=False)
    sticker(p, 24, 40, 290, 236, -2, grid)
    def wallet(q, d):
        q.rect((0, 0, 214, 120), GREEN, r=18)
        q.circle(50, 44, 22, AMBER, sh=0); q.text((50, 45), "$", font("en", 26), lang="en")
        skel(q, 88, 34, [96, 60], fill="#3B7C5E"); chip(q, 18, 74, L(lang, "سحب", "Withdraw"), PAPER_CARD, lang, 20, 36)
    sticker(p, 192, 226, 214, 120, 3, wallet)
    tag(p, L(lang, "الأرباح", "Earnings"), PARENT, lang)


def s_for_parents(p, lang):
    def dash(q, d):
        card(q, (0, 0, 382, 290), STUDENT, 70)
        avatar(q, 46, 35, 24, PAPER_CARD); skel(q, 86, 26, [120, 70], fill="#5B86B8")
        q.text((22, 102), L(lang, "الحضور", "Attendance"), font(lang, 21), anchor="lm", lang=lang)
        for i in range(10): q.rect((22 + i*35, 120, 22 + i*35 + 28, 148), CORAL if i in (3, 7) else GREEN, r=7, w=3, sh=0, shadow=False)
        q.text((22, 182), L(lang, "النتائج", "Results"), font(lang, 21), anchor="lm", lang=lang)
        for i, hh in enumerate((46, 72, 58, 90, 78)): q.rect((22 + i*70, 270 - hh, 22 + i*70 + 52, 270), (STUDENT, AMBER)[i % 2], r=8, w=3, sh=0, shadow=False)
    sticker(p, 24, 44, 382, 290, -2, dash)
    tag(p, L(lang, "قراءة فقط", "Read-only"), PAPER_CARD, lang)


def s_how(p, lang):
    labels = (L(lang, "سجّل", "Sign up"), L(lang, "تصفّح", "Browse"), L(lang, "التوفّر", "Check"), L(lang, "جدولك", "Follow"))
    for i, (c, t) in enumerate(zip((STUDENT, PARENT, TEACHER, CORAL), labels)):
        x = 14 + i*100; top = 232 - i*52
        p.rect((x, top, x+88, 334), c, r=10)
        p.text((x+44, top+34), str(i+1), font("en", 44), lang="en"); p.text((x+44, top+76), t, font(lang, 19), lang=lang)


def s_contact(p, lang):
    def b1(q, d): q.rect((0, 0, 270, 124), AMBER, r=26); q.poly([(36, 120), (24, 164), (80, 122)], AMBER, sh=0, shadow=False); skel(q, 30, 36, [190, 130, 90], fill="#9A6A12")
    def b2(q, d): q.rect((0, 0, 250, 112), PAPER_CARD, r=26); q.poly([(210, 108), (230, 152), (170, 110)], PAPER_CARD, sh=0, shadow=False); [q.circle(76 + i*48, 56, 11, INK, w=0, sh=0, shadow=False) for i in range(3)]
    sticker(p, 24, 64, 270, 124, -2, b1); sticker(p, 136, 200, 250, 112, 3, b2)
    def env(q, d): q.rect((0, 0, 92, 64), CORAL, r=10); q.line((8, 10), (46, 38), 5); q.line((84, 10), (46, 38), 5)
    sticker(p, 314, 10, 92, 64, 3, env)


def s_help(p, lang):
    p.rect((24, 24, 406, 84), PAPER_CARD, r=30); p.circle(60, 54, 22, STUDENT, sh=0); p.text((60, 56), "?", font("en", 30), lang="en"); skel(p, 98, 49, [220])
    for i, w in enumerate((250, 290, 220)):
        y = 108 + i*74; p.rect((24, y, 406, y + 62), AMBER if i == 0 else PAPER_CARD, r=14)
        skel(p, 46, y + 26, [w - 80]); p.rect((350, y + 15, 382, y + 47), PAPER_CARD, r=8, w=3, sh=0, shadow=False)
        p.line((358, y + 31), (374, y + 31), 4)
        if i: p.line((366, y + 23), (366, y + 39), 4)


def s_privacy(p, lang):
    def lock(q, d):
        q.arc((36, 0, 140, 130), 180, 360, w=24); q.rect((8, 80, 168, 206), AMBER, r=20)
        q.circle(88, 130, 17, INK, w=0, sh=0, shadow=False); q.rect((81, 136, 95, 172), INK, r=6, w=0, sh=0, shadow=False)
    sticker(p, 24, 62, 176, 206, -2, lock)
    for i, t in enumerate((L(lang, "الجمع", "Collect"), L(lang, "الاستخدام", "Use"), L(lang, "الحماية", "Protect"))):
        y = 62 + i*74; p.rect((218, y, 406, y + 62), PAPER_CARD, r=14)
        p.text((238, y + 32), t, font(lang, 24), anchor="lm", lang=lang)
        p.circle(372, y + 31, 17, GREEN, w=3, sh=0, shadow=False); check(p, 372, y + 31, 0.8, 5)


def s_terms(p, lang):
    def doc(q, d):
        q.poly([(0, 0), (190, 0), (250, 60), (250, 292), (0, 292)], PAPER_CARD); q.poly([(190, 0), (190, 60), (250, 60)], PAPER_2, w=4, sh=0, shadow=False)
        for i in range(4):
            y = 92 + i*48; q.rect((24, y, 56, y+32), GREEN if i < 3 else PAPER_2, r=8, w=3, sh=0, shadow=False)
            if i < 3: check(q, 40, y+16, 0.9, 5)
            skel(q, 72, y+11, [150 - (i % 2)*40])
    sticker(p, 40, 28, 250, 292, -2, doc)
    sticker(p, 262, 208, 120, 120, 3, lambda q, d: (q.circle(56, 56, 50, AMBER), check(q, 56, 58, 1.8, 10)))


def s_blog(p, lang):
    def art(q, d):
        card(q, (0, 0, 350, 296), CORAL, 148)
        q.circle(280, 52, 26, AMBER, sh=0, w=3); q.poly([(0, 148), (86, 84), (146, 122), (206, 92), (350, 148)], AMBER, w=3, sh=0, shadow=False)
        q.rect((0, 144, 350, 152), CORAL, w=0, sh=0, shadow=False); q.line((0, 148), (350, 148), 4)
        skel(q, 26, 176, [270, 230, 250, 150], gap=24, h=11)
    sticker(p, 40, 28, 350, 296, -2, art)


def s_login(p, lang):
    def cardfn(q, d):
        card(q, (0, 0, 330, 300)); avatar(q, 165, 60, 36, AMBER)
        q.rect((26, 112, 304, 160), PAPER_2, r=12, w=3, sh=0, shadow=False); skel(q, 46, 132, [150])
        q.rect((26, 174, 304, 222), PAPER_2, r=12, w=3, sh=0, shadow=False); [q.circle(56 + j*26, 198, 7, INK, w=0, sh=0, shadow=False) for j in range(6)]
        q.rect((26, 238, 304, 284), AMBER, r=14); q.text((165, 262), L(lang, "دخول", "Sign in"), font(lang, 26), lang=lang)
    sticker(p, 50, 26, 330, 300, -2, cardfn)


def s_signup(p, lang):
    for i, (t, c) in enumerate(((L(lang, "طالب", "Student"), STUDENT), (L(lang, "معلّم", "Teacher"), TEACHER), (L(lang, "ولي أمر", "Parent"), PARENT))):
        y = 26 + i*108; p.rect((24, y, 406, y + 92), c if i == 0 else PAPER_CARD, r=18)
        avatar(p, 72, y + 46, 28, PAPER_CARD if i == 0 else c); p.text((120, y + 47), t, font(lang, 30), anchor="lm", lang=lang)
        p.circle(366, y + 46, 18, PAPER_CARD, w=4, sh=0, shadow=False)
        if i == 0: check(p, 366, y + 46, 0.9, 5)


def s_teacher_register(p, lang):
    for i, (t, st) in enumerate(((L(lang, "الحساب", "Account"), "done"), (L(lang, "الملف المهني", "Profile"), "now"), (L(lang, "التوفّر", "Availability"), "next"))):
        y = 28 + i*108; p.rect((24, y, 406, y + 92), {"done": PARENT, "now": STUDENT, "next": PAPER_CARD}[st], r=18)
        p.circle(72, y + 46, 24, PAPER_CARD, w=4, sh=0, shadow=False)
        if st == "done": check(p, 72, y + 46, 1.0, 6)
        else: p.text((72, y + 47), str(i+1), font("en", 28), lang="en")
        p.text((116, y + 47), t, font(lang, 28), anchor="lm", lang=lang)


def s_course(p, lang):
    def cardfn(q, d):
        card(q, (0, 0, 370, 286), AMBER, 160)
        q.circle(185, 80, 38, PAPER_CARD, sh=4); play(q, 185, 80, 1.1)
        skel(q, 22, 182, [230, 150]); q.rect((22, 226, 348, 266), PARENT, r=14); q.text((185, 247), L(lang, "ابدأ الآن", "Start now"), font(lang, 24), lang=lang)
    sticker(p, 30, 32, 370, 286, -2, cardfn)


def s_teacher(p, lang):
    def prof(q, d):
        card(q, (0, 0, 350, 304), STUDENT, 90)
        avatar(q, 175, 92, 56, AMBER, sh=0); stars_row(q, 175, 184, R=14); skel(q, 75, 210, [200, 140], gap=18)
        f = font(lang, 20); ws = [tw(t, f, lang) + 36 for t in (L(lang, "أونلاين", "Online"), L(lang, "وجاهي", "In person"))]
        x = (350 - sum(ws) - 10) / 2
        chips_row(q, x, 254, ((L(lang, "أونلاين", "Online"), PARENT), (L(lang, "وجاهي", "In person"), AMBER)), lang, 20, 34)
    sticker(p, 40, 28, 350, 304, -2, prof)


def s_not_found(p, lang):
    for i, (t, c) in enumerate((("4", CORAL), ("0", AMBER), ("4", STUDENT))):
        sticker(p, 22 + i*134, (90, 62, 90)[i], 118, 190, (-2, 2, -2)[i], lambda q, d, t=t, c=c: (q.rect((0, 0, 118, 190), c, r=18), q.text((59, 98), t, font("en", 124), lang="en")))


# المفتاح، المشهد، لون اللوحة (قاعدة 1)، kicker، عنوان ([[تمييز]])، وصف، دور الصفحة (قاعدة 2)، شريط الحقائق (قاعدة 8)
# قاعدة 8 — الشريط السفلي: 2–3 حقائق حقيقية خاصة بالصفحة (مصدرها نصوص الموقع)، ما بتكرّر العنوان/الوصف، وما في
#            نص ثابت على كل الصفحات. S("مسار.بالـi18n") = النص من الموقع نفسه.
PAGES = [
    ("default", s_default, NEUTRAL, S("home.badge"), ("[[أكاديميا]]", "[[Academia]]"), S("nav.tagline"), None,
     TL(("دليل المعلمين", "Teacher directory"), ("جدول ومحفظة", "Schedule & wallet"), ("متابعة لولي الأمر", "Parent dashboard"))),
    ("home", s_home, NEUTRAL, ("منصة دروس خصوصية وكورسات", "Private lessons and courses platform"), ("لاقِ المعلم المناسب\n[[وابدأ بثقة]]\nمع أكاديميا.", "Find the right teacher\n[[and start with confidence]]\nwith Academia."), ("دروس وكورسات مع معلمين موثوقين", "Lessons and courses with trusted teachers"), None,
     TL(("دليل المعلمين", "Teacher directory"), ("جدول ومحفظة", "Schedule & wallet"), ("متابعة لولي الأمر", "Parent dashboard"))),
    ("about", s_about, NEUTRAL, ("قصتنا", "Our story"), ("[[من نحن]]", "[[About]] us"), ("فريق عربي يبني منصة تربط الطلاب بمعلمين وكورسات موثوقة", "An Arabic team building a platform that connects students with trusted teachers"), None,
     TL(S("about.values.0.t"), S("about.values.1.t"), S("about.values.3.t"))),
    ("courses", s_courses, STUDENT, ("كورسات من معلّمين محليين وعالميين", "Local and international teachers"), ("تصفّح [[الكورسات]]", "Browse [[courses]]"), ("حسب المادة والفرع — قبل ما تنشئ حسابك", "By subject and track — before you create an account"), "student",
     TL(("ابحث باسم الكورس أو المعلّم", "Search by course or teacher"), ("صفّي حسب الفرع", "Filter by track"), S("courses.enroll"))),
    ("teachers", s_teachers, STUDENT, ("ابحث وقارن", "Search and compare"), ("دليل [[المعلمين]]", "Teacher [[directory]]"), ("شوف الأسعار والتقييمات قبل ما تسجّل", "Check prices and ratings before you sign up"), "student",
     TL(("السعر بالساعة", "Hourly price"), ("التقييم", "Rating"), ("سنوات الخبرة", "Years of experience"))),
    ("for-teachers", s_for_teachers, TEACHER, ("للمعلمين", "For teachers"), ("أكاديميا [[للمعلمين]]", "Academia [[for teachers]]"), ("ملف مهني، أوقات توفّر، وأرباح تسحبها من محفظتك", "Your profile, your availability, your earnings"), "teacher",
     TL(S("forTeachers.benefits.verified.t"), ("عمولة واضحة مسبقًا", "Commission known upfront"), ("سحب لحسابك البنكي", "Bank withdrawals"))),
    ("for-parents", s_for_parents, PARENT, ("لأولياء الأمور", "For parents"), ("أكاديميا [[لأولياء الأمور]]", "Academia [[for parents]]"), ("حضور ابنك ونتائجه وإشعاراته بلوحة واحدة", "Your child's attendance, results and notifications in one dashboard"), "parent",
     TL(S("forParents.linkingSteps.1.t"), ("لوحة لكل ابن", "One dashboard per child"), ("أب أو أم أو وصي", "Mother, father or guardian"))),
    ("how-it-works", s_how, NEUTRAL, ("خطوات البداية", "Getting started"), ("كيف تعمل [[أكاديميا؟]]", "How [[Academia]] works"), ("سجّل، تصفّح، اطّلع على التوفّر، وتابع جدولك", "Sign up, browse, check availability, follow your schedule"), None,
     TL(("شحن المحفظة بإيصال", "Wallet top-up by receipt"), ("رابط اجتماع للحصص الأونلاين", "Meeting links for online sessions"), ("طلب سحب الأرباح", "Earnings withdrawals"))),
    ("contact", s_contact, NEUTRAL, ("نسمعك", "We're listening"), ("[[تواصل]] معنا", "[[Contact]] us"), S("contact.meta.description"), None,
     TL(("دعم الحساب", "Account support"), ("شراكة مع مدرسة", "School partnerships"), S("contact.sidebar.responseSub"))),
    ("help", s_help, NEUTRAL, ("إجابات سريعة", "Quick answers"), ("مركز [[المساعدة]]", "Help [[center]]"), S("help.sub"), None,
     TL(S("help.topics.0.t"), S("help.topics.1.t"), S("help.topics.2.t"))),
    ("privacy", s_privacy, NEUTRAL, ("بلغة واضحة", "In plain language"), ("سياسة [[الخصوصية]]", "Privacy [[policy]]"), ("كيف نجمع بياناتك ونحميها", "How we collect and protect your data"), None,
     TL(S("privacy.sections.2.t"), S("privacy.sections.4.t"), S("privacy.sections.5.t"))),
    ("terms", s_terms, NEUTRAL, ("قبل ما تبدأ", "Before you start"), ("شروط [[الاستخدام]]", "Terms of [[use]]"), ("الشروط التي تحكم استخدامك لأكاديميا", "The terms that apply when you use Academia"), None,
     TL(S("terms.sections.2.t"), S("terms.sections.3.t"), S("terms.sections.4.t"))),
    ("blog", s_blog, STUDENT, ("تنظيم المذاكرة والتحضير للامتحان", "Study organization and exam prep"), ("مدونة [[أكاديميا]]", "Academia [[Blog]]"), S("blog.sub"), "student", "BLOG_CATEGORIES"),
    ("login", s_login, NEUTRAL, ("أهلًا بعودتك", "Welcome back"), ("[[تسجيل]] الدخول", "[[Sign]] in"), S("authPages.login.sub"), None,
     TL(("بريد وكلمة مرور", "Email and password"), ("المتابعة عبر Google", "Continue with Google"), ("معلّم؟ سجّل من هنا", "Teacher? Sign up here"))),
    ("signup", s_signup, NEUTRAL, ("طالب · ولي أمر · معلّم", "Student · Parent · Teacher"), ("إنشاء [[حساب]]", "Create an [[account]]"), S("authPages.signup.sub"), None,
     TL(("طالب: تصفّح وجدول ومحفظة", "Student: browse & schedule"), ("معلّم: ملف وأرباح", "Teacher: profile & earnings"), ("ولي أمر: حضور ونتائج", "Parent: attendance & results"))),
    ("teacher-register", s_teacher_register, TEACHER, ("انضم كمعلّم", "Join as a teacher"), ("سجّل [[كمعلّم]]", "Join as a [[teacher]]"), S("authPages.teacherRegister.sub"), "teacher",
     TL(S("forTeachers.benefits.verified.t"), ("عمولة واضحة مسبقًا", "Commission known upfront"), ("سحب لحسابك البنكي", "Bank withdrawals"))),
    ("course", s_course, STUDENT, ("ابدأ من غير حساب", "Start without an account"), ("تفاصيل [[الكورس]]", "[[Course]] details"), ("التفاصيل والسعر قبل ما تنشئ حسابك", "Details and price before you create an account"), "student",
     TL(("الدروس والساعات", "Lessons and hours"), ("السعر", "Price"), S("courses.enroll"))),
    ("teacher", s_teacher, TEACHER, ("كورسات وتقييمات", "Courses and reviews"), ("ملف [[المعلّم]]", "[[Teacher]] profile"), ("تعرّف على المعلّم وكورساته وتقييمات طلابه", "Meet the teacher, their courses and student reviews"), "teacher",
     TL(("المؤهلات والخبرة", "Qualifications and experience"), ("أسعار أونلاين ووجاهي", "Online and in-person prices"), S("teacherProfile.reviewsTitle"))),
    ("not-found", s_not_found, NEUTRAL, ("خطأ 404", "Error 404"), ("الصفحة [[غير موجودة]]", "Page [[not found]]"), ("الرابط قديم أو فيه خطأ مطبعي", "The link may be old or have a typo"), None,
     TL(S("notFound.home"), S("notFound.courses"))),
]

ROLES = (("student", "طالب", "Student", STUDENT), ("teacher", "معلّم", "Teacher", TEACHER), ("parent", "ولي أمر", "Parent", PARENT))


# ================== التخطيط ==================
def parse_title(s):
    toks, hl = [], False
    for part in re.split(r"(\[\[|\]\])", s):
        if part == "[[": hl = True
        elif part == "]]": hl = False
        else: toks += [(w, hl) for w in part.split(" ") if w]
    return toks


def wrap_tokens(toks, f, maxw, lang):
    """العبارة الممَيَّزة تبقى كتلة وحدة على نفس السطر إن اتّسعت."""
    space = f.size / K * 0.30
    units = []
    for w, h in toks:
        if h and units and units[-1][0]: units[-1][1].append(w)
        else: units.append((h, [w]))
    lines, cur, cw = [], [], 0
    for h, words in units:
        ws = [(w, h, tw(w, f, lang)) for w in words]
        uw = sum(x[2] for x in ws) + space * (len(ws) - 1)
        for ch in ([ws] if uw <= maxw else [[x] for x in ws]):
            cwid = sum(x[2] for x in ch) + space * (len(ch) - 1)
            if cur and cw + space + cwid > maxw: lines.append(cur); cur, cw = [], 0
            cw += (space if cur else 0) + cwid; cur += ch
    if cur: lines.append(cur)
    return lines, space


def balance(toks, f, maxw, lang):
    """يقلّص عرض السطر قدر الإمكان بدون زيادة عدد الأسطر أو كسر عبارة التمييز — فما يضل سطر أخير يتيم."""
    lines, space = wrap_tokens(toks, f, maxw, lang); n = len(lines)
    if n < 2: return lines, space
    hl_lines = lambda ls: sum(1 for ln in ls if any(h for _, h, _ in ln))
    base_hl = hl_lines(lines); best = (lines, space)
    floor = int(max(tw(w, f, lang) for w, _ in toks))
    for w in range(int(maxw), floor, -6):
        l, sp = wrap_tokens(toks, f, w, lang)
        if len(l) > n or hl_lines(l) > base_hl: break
        best = (l, sp)
    return best


def layout_title(title, f, maxw, lang):
    """\n = سطر مفروض (للعبارات اللي لازم تبقى سوا، مثل "المعلم المناسب"). بدونه: لفّ تلقائي متوازن."""
    if "\n" in title:
        lines, space = [], f.size / K * 0.30
        for seg in title.split("\n"): lines += wrap_tokens(parse_title(seg), f, maxw, lang)[0]
        return lines, space
    return balance(parse_title(title), f, maxw, lang)


def draw_title(p, lines, space, f, size, lang, x_anchor, y_top, ls):
    rtl = lang == "ar"
    for i, line in enumerate(lines):
        yb = y_top + i*ls + size*1.0
        pos, cur = [], x_anchor
        for w, h, ww in line:
            if rtl: pos.append((cur - ww, cur, h)); cur -= ww + space
            else: pos.append((cur, cur + ww, h)); cur += ww + space
        run = [q for q in pos if q[2]]
        if run:
            x0, x1 = min(q[0] for q in run) - 12, max(q[1] for q in run) + 12
            p.rect((x0, yb - size*0.98, x1, yb + size*0.34), AMBER, r=int(size*0.16), w=4, sh=6)
        for (w, h, ww), (a, b, _) in zip(line, pos): p.text((b if rtl else a, yb), w, f, anchor="rs" if rtl else "ls", lang=lang)


def grid_bg(d, x0, y0, x1, y1, color, step=36):
    for x in range(x0, x1, step): d.line([(x*K, y0*K), (x*K, y1*K)], fill=color, width=2)
    for y in range(y0, y1, step): d.line([(x0*K, y*K), (x1*K, y*K)], fill=color, width=2)


def ticker(p, d, lang, x0, x1, y0, y1, items):
    """شريط الحقائق: 2–3 عناصر خاصة بالصفحة (من نصوص الموقع)، موزّعة بالتساوي بين هامشين 34 بنجمة فاصلة."""
    inner0, inner1 = x0 + MARGIN, x1 - MARGIN; star_w = 16; cy = (y0 + y1) / 2
    for size in (22, 21, 20, 19, 18):
        f = font(lang, size); ws = [tw(t, f, lang) for t in items]; n = len(items)
        gap = ((inner1 - inner0) - sum(ws) - (n - 1) * star_w) / (2 * (n - 1) if n > 1 else 1)
        if n == 1 or gap >= 22: break
    p.rect((x0, y0, x1, y1), INK, r=0, w=0, sh=0, shadow=False)
    if n == 1: gap = 0
    x = inner1 if lang == "ar" else inner0; sg = -1 if lang == "ar" else 1
    for i, t in enumerate(items):
        p.text((x, cy + 1), t, f, fill=AMBER, anchor="rm" if lang == "ar" else "lm", lang=lang); x += sg * ws[i]
        if i < n - 1:
            x += sg * gap; p.poly(star(x + sg * star_w / 2, cy, 8), PAPER_CARD, w=0, sh=0, shadow=False); x += sg * (star_w + gap)


def render(scene, bg, kicker, title, sub, role, tick, lang, W=1200, H=630, post=False):
    rtl = lang == "ar"
    img = Image.new("RGBA", (W*K, H*K), PAPER); d = ImageDraw.Draw(img); d._img = img
    p = Pen(d); grid_bg(d, 0, 0, W, H, GRID)
    X0, Y0, X1, Y1 = 30, 30, W - 30, H - 30
    p.rect((X0, Y0, X1, Y1), PAPER_CARD, r=0, w=5, sh=12)          # بطاقة سادة (قاعدة 7)
    HB, TB = 112, Y1 - 52                                            # حد الهيدر وأعلى التيكر
    p.rect((X0, Y0, X1, HB), PAPER_2, r=0, w=0, sh=0, shadow=False); d.line([(X0*K, HB*K), (X1*K, HB*K)], fill=INK, width=5*K)
    lh = 52; lw = int(lh * LOGO.width / LOGO.height); lg = LOGO.resize((lw*K, lh*K), Image.LANCZOS)
    name = L(lang, "أكاديميا", "Academia"); fn = font(lang, 36, display=True); dom = font(lang, 21, bold=False); ly = 56
    if rtl:
        img.alpha_composite(lg, ((X1 - MARGIN - lw)*K, ly*K)); p.text((X1 - MARGIN - lw - 14, 82), name, fn, anchor="rm", lang=lang); p.text((X0 + MARGIN, 82), DESCRIPTOR[0], dom, fill=MUTED, anchor="lm", lang=lang)
    else:
        img.alpha_composite(lg, ((X0 + MARGIN)*K, ly*K)); p.text((X0 + MARGIN + lw + 14, 82), name, fn, anchor="lm", lang=lang); p.text((X1 - MARGIN, 82), DESCRIPTOR[1], dom, fill=MUTED, anchor="rm", lang=lang)
    ticker(p, d, lang, X0 + 3, X1 - 3, TB, Y1 - 3, tick)
    # لوحة المشهد: متمركزة بين الهيدر والتيكر (الظل 12 محسوب)
    PW, PH = 430, 352; area = TB - HB; py = HB + (area - 12 - PH) / 2 + 0
    px = X0 + MARGIN if rtl else X1 - MARGIN - PW
    p.rect((px, py, px+PW, py+PH), bg, r=0, w=5, sh=12)
    for gx in range(int(px) + 20, int(px) + PW - 8, 24):
        for gy in range(int(py) + 20, int(py) + PH - 8, 24): d.ellipse([(gx-1.5)*K, (gy-1.5)*K, (gx+1.5)*K, (gy+1.5)*K], fill="#1F293726")
    layer = Image.new("RGBA", (PW*K, PH*K), (0, 0, 0, 0)); ld = ImageDraw.Draw(layer); ld._img = layer
    scene(Pen(ld, 0, 0, mirror=rtl, wl=PW), lang)
    img.paste(layer, (int(px*K), int(py*K)), layer)
    p.rect((px, py, px+PW, py+PH), None, r=0, w=5, sh=0, shadow=False)
    # عمود النص — متمركز على مركز اللوحة (قاعدة 6)
    tx0, tx1 = (X0 + MARGIN, px - 44) if not rtl else (px + PW + 44, X1 - MARGIN)
    maxw = tx1 - tx0; anchor_x = tx1 if rtl else tx0
    toks = parse_title(title); center = py + PH / 2; avail = PH + 24
    kf = font(lang, 22); kh = 44; sf = font(lang, 27, bold=False)
    best = None
    for size in range(68, 31, -2):
        f = font(lang, size, display=True); lines, space = layout_title(title, f, maxw - 24, lang); ls = size * (1.42 if rtl else 1.34)
        sw = [(w, False) for w in (sub or "").split(" ") if w] if sub and not post else []
        slines = wrap_tokens(sw, sf, maxw, lang)[0] if sw else []
        if len(slines) > 2:                                   # لا نقصّ الجملة: خط أصغر ثم 3 أسطر
            sf2 = font(lang, 24, bold=False); slines = wrap_tokens(sw, sf2, maxw, lang)[0]
        total = kh + 24 + len(lines)*ls + (16 + len(slines)*(38 if len(slines) <= 2 else 34) if slines else 0) + (24 + 44 if role else 0)
        if len(lines) <= (4 if post else 3) and total <= avail: best = (size, f, lines, space, ls, slines, total); break
    size, f, lines, space, ls, slines, total = best
    if size < 44: print("تنبيه: عنوان بخط صغير (%d):" % size, title)
    y = center - total / 2
    kw = tw(kicker, kf, lang) + 40
    sticker(p, (tx1 - kw - 6) if rtl else tx0, y, kw + 6, kh + 4, -2, lambda q, dd: (q.rect((2, 2, kw+2, kh+2), PAPER_CARD, r=22, w=3, sh=5), q.text((2 + kw/2, 2 + kh/2 + 1), kicker, kf, lang=lang)))
    y += kh + 24
    draw_title(p, lines, space, f, size, lang, anchor_x, y, ls); y += len(lines) * ls
    if slines:
        y += 16
        small = len(slines) > 2 or tw(" ".join(w for w, _, _ in slines[0]), sf, lang) > maxw
        sfd = font(lang, 24, bold=False) if len(slines) > 2 else sf; step = 34 if len(slines) > 2 else 38
        if len(slines) > 3: print("تحذير: الوصف أطول من 3 أسطر:", kicker, "|", sub)
        for ln in slines:
            p.text((anchor_x, y + 28), " ".join(w for w, _, _ in ln), sfd, fill=MUTED, anchor="rs" if rtl else "ls", lang=lang); y += step
    if role:
        y += 24; x = tx1 if rtl else tx0
        for key, ar, en, c in ROLES:
            on = key == role; t = L(lang, ar, en); ww = tw(t, font(lang, 22), lang) + 36
            x0 = x - ww if rtl else x
            p.rect((x0, y, x0 + ww, y + 44), c if on else PAPER_CARD, r=22, w=3, sh=4 if on else 0, shadow=on)
            p.text((x0 + ww/2, y + 23), t, font(lang, 22), lang=lang, fill=INK if on else MUTED)
            x = x0 - 12 if rtl else x0 + ww + 12
    return img.resize((W, H), Image.LANCZOS)


def github_card():
    W, H = 1280, 640
    img = Image.new("RGBA", (W*K, H*K), PAPER); d = ImageDraw.Draw(img); d._img = img; p = Pen(d); grid_bg(d, 0, 0, W, H, GRID)
    X0, Y0, X1, Y1 = 34, 34, W - 34, H - 34
    p.rect((X0, Y0, X1, Y1), PAPER_CARD, r=0, w=5, sh=12)
    TB = Y1 - 56; ticker(p, d, "en", X0 + 3, X1 - 3, TB, Y1 - 3, ["React", "TypeScript", "TanStack Start"])
    PW = PH = 380; area = TB - Y0; py = Y0 + (area - 12 - PH) / 2; px = X0 + MARGIN + 18
    p.rect((px, py, px+PW, py+PH), NEUTRAL, r=0, w=5, sh=12)
    for gx in range(int(px) + 20, int(px) + PW - 8, 24):
        for gy in range(int(py) + 20, int(py) + PH - 8, 24): d.ellipse([(gx-1.5)*K, (gy-1.5)*K, (gx+1.5)*K, (gy+1.5)*K], fill="#1F293726")
    cx, cy, R = px + PW/2, py + PH/2, 150
    for i in range(36): p.arc((cx-R, cy-R, cx+R, cy+R), i*10, i*10 + 5, w=3)
    lw = 230; lh = int(lw * LOGO.height / LOGO.width); img.alpha_composite(LOGO.resize((lw*K, lh*K), Image.LANCZOS), (int((cx - lw/2)*K), int((cy - lh/2 + 6)*K)))
    tx = px + PW + 56; f = font("en", 104); w = tw("Academia", f, "en"); tf = font("en", 34, bold=False)
    th = 134 + 24 + 44 + 28 + 48; ty = py + PH/2 - th/2
    p.rect((tx - 4, ty, tx + w + 24, ty + 134), AMBER, r=18, w=5, sh=8); p.text((tx + 10, ty + 118), "Academia", f, anchor="ls", lang="en")
    p.text((tx, ty + 134 + 24 + 34), "Arabic-first Educational Platform", tf, fill=MUTED, anchor="ls", lang="en")
    chips_row(p, tx, ty + 134 + 24 + 44 + 28, (("React", STUDENT), ("TypeScript", TEACHER), ("TanStack Start", PARENT)), "en", 24, 48, 12)
    return img.resize((W, H), Image.LANCZOS)


def save(img, path):
    img.convert("RGB").quantize(colors=256, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.NONE).save(path, optimize=True)


def blog_posts():
    """عنوان/تصنيف/مدة قراءة/تاريخ كل مقال — من src/content/blog-posts.ts نفسه."""
    t = (ROOT / "src/content/blog-posts.ts").read_text(encoding="utf-8")
    g = lambda k, q: re.findall(rf'^\s{{4}}{k}: {q},', t, re.M)
    ar, en = g("title", '"(.*?)"'), g("titleEn", '"(.*?)"')
    cat, cat_en = g("category", '"(.*?)"'), g("categoryEn", '"(.*?)"')
    mins, dates = g("readMinutes", r"(\d+)"), g("publishedAt", '"(.*?)"')
    return [dict(ar=a, en=e, cat=(c, ce), mins=int(m), date=d) for a, e, c, ce, m, d in zip(ar, en, cat, cat_en, mins, dates)]


def write_manifest():
    """src/lib/og-manifest.json: مفاتيح البطاقات الموجودة فعلًا (ar + en معًا) — seo.ts بيرجع للاحتياط لو المفتاح ناقص."""
    names = {f.name for f in OUT.glob("*.png")}
    keys = sorted(n[:-7] for n in names if n.endswith("-ar.png") and n[:-7] + "-en.png" in names)
    (ROOT / "src/lib/og-manifest.json").write_text(json.dumps({"keys": keys}, indent=2) + "\n", encoding="utf-8")


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    posts = blog_posts()
    cats = TL(*[(p["cat"][0], p["cat"][1]) for p in {q["cat"]: q for q in posts}.values()][:3])
    for key, scene, bg, k, t, s_, role, tick in PAGES:
        if tick == "BLOG_CATEGORIES": tick = cats
        sub = s_ if isinstance(s_, tuple) else s_
        for i, lang in enumerate(("ar", "en")):
            save(render(scene, bg, k[i], t[i], sub[i], role, tick[i], lang), OUT / f"{key}-{lang}.png")
    for n, po in enumerate(posts, 1):
        for i, lang in enumerate(("ar", "en")):
            read = f"{po['mins']} دقايق قراءة" if lang == "ar" else f"{po['mins']} min read"
            tick = [L(lang, "مدونة أكاديميا", "Academia Blog"), read, po["date"]]
            save(render(s_blog, STUDENT, po["cat"][i], po[lang], "", "student", tick, lang, post=True), OUT / f"blog-{n}-{lang}.png")
    save(github_card(), OUT / "github-repo.png")
    write_manifest()
    print("done:", len(list(OUT.glob("*.png"))), "images")


if __name__ == "__main__":
    main()
