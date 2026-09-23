# Academia — تطبيق الإصدار الجديد + خطة الاتجاه البصري

## 1) حالة ملف الـZIP

فحصت محتوى الـZIP مقابل المشروع الحالي: **الملفات متطابقة بالكامل** (نفس 323 ملف: `src`, `docs`, `e2e`, `Shared`, `playwright.config.ts`, `vitest.config.ts`, `vercel.json`, الباتش، ومجلد `.ChatGPT_Conversation`). الفروقات الوحيدة:

| الفرق | الإجراء |
|---|---|
| متغيرات بيئة ناقصة (`VITE_ENABLE_DEMO_LOGIN`, `VITE_ENABLE_SIGNUP`, `VITE_POSTHOG_KEY`, `VITE_POSTHOG_HOST`, `NITRO_PRESET`) | إضافتها لإعدادات المشروع |
| بقايا Lovable Cloud (`supabase/config.toml`, `src/integrations/supabase/*`) غير موجودة في الإصدار الجديد | التحقق من عدم استخدامها ثم تنظيفها |
| `routeTree.gen.ts` | مُولَّد تلقائيًا — يُترك |

إذًا لا حاجة لنسخ كود: الإصدار الجديد مُطبَّق فعلًا. سأقتصر على المزامنة أعلاه.

## 2) ما يطلبه الملفان في `.ChatGPT_Conversation`

الملفان ليسا قائمة تعديلات UI، بل **تكليف صريح بمرحلة سابقة للتنفيذ**، وينصّان حرفيًا على:

> "Do not start changing components until the audit and design direction are established."

المبدأ الحاكم: الذكاء الاصطناعي **يطبّق** الاتجاه البصري ولا **يخترعه**، ولا يُعاد كتابة كود سليم لمجرد تغيير الشكل.

## المرحلة أ — Audit + Design Direction (هذه الدفعة)

إنتاج حزمة التوثيق التي حدّدها القسم 28 من `ACADEMIA-DESIGN-CONTEXT.md`، مبنية على فحص فعلي للمستودع (المسارات، `styles.css`، `kit.tsx`, `charts.tsx`, `app-sidebar.tsx`, `public-layout.tsx`, لوحات الأدوار) وعلى `docs/architecture` و`docs/design` الحاليين:

```
docs/design/
├── ux-audit.md                      ← 18 محورًا + Nielsen heuristics بأدلة من الملفات
├── user-journeys.md                 ← Student / Teacher / Parent / Admin / Supervisor
├── ai-design-antipatterns.md        ← الأنماط الـ13 + مواضعها الفعلية في المستودع
├── academia-design-direction.md     ← Direction v1.0 + Design Signature
├── visual-identity.md
├── art-direction.md
├── typography-system.md             ← أدوار Tajawal / Reem Kufi / Cairo / IBM Plex Mono
├── layout-composition.md            ← Page Archetypes + قواعد التركيب A–H
├── imagery-guidelines.md            ← Photography direction + 4 عوالم بصرية + Image System
├── competitive-visual-research.md
└── visual-qa-checklist.md
```

كل توصية كبيرة تُوسَم بمصدرها: دليل من المستودع / دليل من SRS / UX best practice / توصية فنية / استنتاج. ولا أختلق متطلبات غير مدعومة.

يضاف كذلك قسم **"ما يجب ألا يُغيَّر"**: البنية، الـtokens، RTL/LTR، الوصولية، وعمل الأداء القائم.

## المرحلة ب — التنفيذ الانتقائي (بعد موافقتك على الاتجاه)

مقسّمة إلى دفعات مرقّمة داخل `academia-design-direction.md`، تقريبًا:

1. طبقة الـtypography والـcolor composition (استخدام أكثر دلالية للألوان الحالية، 80–90% حقل بصري محايد).
2. Image System: `public/media/*` + `src/content/media.ts` + توظيف الصور كمعلومة داخل التركيب.
3. إعادة تركيب الصفحات ذات الأولوية (الهيرو العام، اكتشاف المعلمين، ملف المعلم، لوحة الطالب) دون حذف الـprimitives الحالية.
4. تفريق كثافة كل دور (Admin تشغيلي كثيف ≠ Student ≠ Parent مراقبة).
5. Motion hierarchy بخمسة مستويات + Visual QA.

## تفاصيل تقنية

- لا تعديل على منطق العمل أو على `rbac.*`/`integrations/backend` في المرحلة أ.
- المرحلة ب تُبنى فوق `src/components/app/kit.tsx` كـprimitive vocabulary، بإضافة compositions أعلى منها بدل تكرار `AppPage → StatGrid → Panel × N`.
- الصور ستُدار عبر أصول المشروع ومسار `media.ts` واحد، لا اختيار عشوائي لكل صفحة.
