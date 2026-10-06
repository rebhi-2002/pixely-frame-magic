# academia-videos

فيديوهات تسويقية لأكاديميا بـ[Remotion](https://www.remotion.dev) — الفيديو يُكتب كمكوّنات React بنفس هوية الموقع (Warm Neo-Brutalism)، وبيطلع MP4 جاهز للسوشال.
**منفصل عن الموقع تمامًا**: ما بيدخل بحزمة الموقع ولا بيأثر على سرعته، وله `package.json` خاص.

> ⚠ انكتب هذا المشروع بدون تشغيل (ما في npm/شبكة وقت الكتابة). أول مرة: `npm install` ثم `npm run studio` وراجع الفيديوهات، وبلّغ عن أي خطأ.

## أين يُوضع
جذر مشروع الموقع بجانب `src/` — لأن `scripts/sync-copy.mjs` بيقرأ `../src/i18n/locales`.

## التشغيل
```bash
cd academia-videos
npm install
npm run studio          # معاينة تفاعلية بالمتصفح (تحريك، تدقيق فريم فريم)
npm run render:all      # كل الفيديوهات → out/*.mp4
npm run sync-copy       # بعد أي تغيير بنصوص الموقع: يحدّث copy.generated.json
```

## الفيديوهات
| Composition | القياس | المدة | المصدر |
|---|---|---|---|
| `StudentJourney-ar/en` | 1080×1920 | ~25s | قسم "رحلتك من البحث إلى التقييم" بالرئيسية (7 خطوات + دعوة) |
| `TeacherPitch-ar/en` | 1080×1920 | ~20s | صفحة `/for-teachers` (h1 + 4 مزايا + دعوة) |
| `LogoBumper` | 1080×1080 | 3s | مقدّمة/خاتمة بالشعار |

## قواعد
- **النص كله من الموقع** (`npm run sync-copy`) — ما بنكتب جملة مرتين. بدون أرقام أو أسماء أو إحصاءات مختلقة (نفس مبدأ الموقع).
- **الهوية**: ألوان وخطوط (Baloo Bhaijaan 2 / Cairo / Poppins) وإطار البطاقة من `src/theme.ts` و`src/Frame.tsx` — نفس بطاقات المشاركة.
- **RTL**: العربي بيشتغل من `direction: rtl` بالإطار؛ Chromium بيشكّل الحروف صح.
- **الدومين** بآخر الفيديو: `SITE_URL` بـ`src/theme.ts` — غيّره لما ينتقل الموقع.
- **حركة جديدة**: أضف مكوّنًا بـ`src/`، سجّله بـ`src/Root.tsx`، وأضف سكربت `render:*` بـ`package.json`.

## الترخيص
Remotion مجانية لمنظمة ربحية فيها حتى 3 أشخاص (والتعاون مع فريق خارجي بيجمع الأعداد)، وغير ذلك ترخيص مدفوع. راجع [remotion.dev/license](https://www.remotion.dev/license) قبل أي استخدام تجاري أو لو كبر الفريق.
