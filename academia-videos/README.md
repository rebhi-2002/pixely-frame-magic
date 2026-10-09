# motion-film — الفيلم التسويقي (Python)

نفس تصميم الفيلم التسويقي (1920×1080، 30fps، ~60 ثانية، 8 مشاهد، عربي) مبنيّ بمحرّك موشن بسيط بـPython، والصوت (مؤثرات + موسيقى خلفية) مولّد برمجيًا فهو أصلي بلا أي ترخيص خارجي.

## المتطلبات
`python3`, `pillow` (مع libraqm لتشكيل العربي), `numpy`, `opencv-python`, `scipy`, و`ffmpeg` (مع libx264 وaac).

## التشغيل
```bash
python3 audio.py          # يولّد audio.wav (المؤثرات + الموسيقى)
python3 render.py         # يرندر الفيديو كامل → academia-promo.mp4 (≈10 دقائق على نواة وحدة)
python3 render.py preview 5 143 400   # لقطات اختبار PNG لفريمات محدّدة
```
لتقسيم الرندر على جلسات قصيرة: `python3 render.py chunk 0 450` ثم 450..900 ... (يطلع مقاطع بـ`chunks/`)، ثم ادمجها بـ`ffmpeg -f concat`.

## تعديل
- النصوص: `copy.json` (منسوخة من نصوص الموقع) و`scenes.py`.
- المدّة/الترتيب: `SCENES` و`TRANS` و`T` آخر `scenes.py`.
- الصوت: `build_events()` بـ`audio.py` (توقيت كل مؤثر) و`music()` للموسيقى.
- **الخطوط (مطلوبة — ضعها بمجلد `fonts/`، ملفات TTF ثابتة static):**
  - إنجليزي/أرقام: `Poppins-Bold.ttf` و`Poppins-Medium.ttf` (Google Fonts).
  - عربي: `Cairo-Bold.ttf` و`BalooBhaijaan2-Bold.ttf` (خطوط الموقع)، أو بديلها `DejaVuSans-Bold.ttf` و`DejaVuSans.ttf`.
  - على لينكس لو الخطوط مثبّتة بالنظام (DejaVu/Poppins) بيلقاها لحاله؛ على ويندوز/ماك لازم تحطها بـ`fonts/`، وإلا بيطلع خطأ يذكر اسم الملف الناقص.
- **تشكيل العربي** يحتاج Pillow مع libraqm: تأكد بـ`python -c "from PIL import features; print(features.check('raqm'))"` (لازم True).
