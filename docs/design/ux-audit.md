# Academia — UX/UI + Visual Design Audit v1.0

المصدر المرجعي: `.ChatGPT_Conversation/ACADEMIA-DESIGN-CONTEXT.md` (الأقسام 1–30) و`Claude — Academia UX-UI Audit Brief.md`.
تاريخ التدقيق: 2026-09-23. النطاق: المستودع الحالي كما هو (81 ملف مسار، 32 صفحة تستخدم `AppPage`).

## وسم الأدلة

كل بند موسوم بمصدره:

- `[REPO]` دليل مباشر من ملف في المستودع
- `[SRS]` متطلب موثّق في `docs/architecture/system-design-and-gap-analysis.md` أو `docs/product/overview.md`
- `[UX]` مبدأ Usability معروف (Nielsen heuristics)
- `[ART]` توصية فنية/اتجاه بصري
- `[INFER]` استنتاج — يحتاج تأكيدك قبل التنفيذ

---

## 01 — Executive findings

1. الأساس الهندسي قوي: tokens دلالية كاملة، وضعان (غامق/فاتح) بتباين مُصحّح صراحةً لـWCAG AA، RTL/LTR، مفردات motion محصورة في `Reveal`، حالات loading/error/empty. `[REPO: src/styles.css, src/components/ui/reveal.tsx, src/components/app/feedback-states.tsx]`
2. الضعف ليس في Design System بل في **Art Direction**: المنتج متناسق لكن غير مميّز. `[REPO + القسم 38 من المستند]`
3. أقوى مؤشر على ذلك: **32 صفحة من أصل 32 تستخدم نفس الهيكل** `AppPage → StatGrid → Panel × N`. `[REPO: rg "<AppPage" = 32 ملف]`
4. اللغة البصرية الأساسية حاليًا **أيقونات**: `Panel` يأخذ `icon` كخاصية أساسية، و`StatGrid` يفرض أيقونة لكل رقم. `[REPO: src/components/app/kit.tsx:47,82]`
5. الصور شبه غائبة: مصدران فقط للصور الحقيقية (`/team/*.jpg` في `about.tsx`، و`PhotoAvatar`)، مقابل رسمَين SVG تزيينيَّين في `public/visuals`. `[REPO]`
6. الوضع الغامق هو الافتراضي مع خلفية `#0A0F1C` وبريمري كهرماني — قريب جدًا من جمالية "Dark SaaS dashboard" التي يحذّر منها القسم 9. `[REPO: src/styles.css:84+]`

## 02 — Current strengths (لا تُلمَس)

| القوة | الدليل |
|---|---|
| tokens دلالية موحّدة | `src/styles.css` |
| تباين مُصحّح ومُعلَّق عليه بأرقام | تعليقات WCAG داخل `styles.css` |
| ثنائية اللغة كنظام لا كترجمة لاحقة | `src/lib/bi.ts`, `src/i18n/*` |
| مفردات motion محصورة | `Reveal` بثلاثة variants |
| فصل public/authenticated | `src/routes/_authenticated/*` |
| RBAC كطبقة بيانات لا كشرط UI متناثر | `src/lib/rbac.*`, `src/hooks/use-access.ts` |
| بنية اختبار قائمة | `e2e/`, `vitest.config.ts` |

## 03 — Current weaknesses

1. **تماثل التركيب** بين كل الصفحات والأدوار. `[REPO]`
2. **كثافة بصرية واحدة** للأدمن والطالب وولي الأمر، رغم اختلاف المهمة جوهريًا. `[REPO + القسم 17]`
3. **الأيقونة بديلًا عن hierarchy**: أيقونة لكل عنوان تُلغي قيمة الأيقونة. `[REPO: kit.tsx]`
4. **غياب image system**: لا `public/media/*` ولا `src/content/media.ts`. `[REPO]`
5. **الأرقام بلا سياق**: `StatGrid` يعرض قيمة نصية مجرّدة دون اتجاه/مقارنة/فترة. `[REPO: kit.tsx:47]`
6. **grid متماثل**: `grid-cols-3` مكرر في الصفحات العامة (index, courses, teachers, about). `[REPO]`
7. **الشعار صورة نقطية** `logo-mark.png` بدل أصل متجهي — يقيّد الأحجام والتلوين. `[REPO: brand-logo.tsx:18]`

## 04 — UX issues (Nielsen heuristics) `[UX]`

| Heuristic | الحالة | الملاحظة |
|---|---|---|
| Visibility of system status | جزئي | يوجد loading/error، لكن لا يوجد "أين أنا في رحلتي" للطالب |
| Match with real world | جيد | المصطلحات عربية طبيعية |
| User control & freedom | ضعيف | حفظ شجرة الصلاحيات بزر واحد بدون undo واضح |
| Consistency | **مفرط** | الاتساق تحوّل إلى تكرار |
| Error prevention | جزئي | عمليات الحذف تحتاج تأكيد موحّد |
| Recognition over recall | جيد | الجانبية تعرض المسار الحالي |
| Flexibility | ضعيف | لا اختصارات/بحث عام داخل اللوحات |
| Minimalist design | ضعيف | كثرة الـpanels تُخفي الأهم |
| Error recovery | جيد | `ErrorState` موحّد |
| Help & docs | جزئي | `/help` موجود دون ربطه بسياق الشاشات |

## 05 — Visual design issues

- الحقل البصري غير محايد بما يكفي: الكهرماني يظهر كـprimary في أماكن غير حاملة لمعنى "إنجاز". `[ART]`
- كل الحاويات بنفس `--radius: 0.875rem` ونفس الحدود → نسيج واحد. `[REPO]`
- الرسوم البيانية (`recharts`) تستخدم 5 ألوان بنفس الوزن → rainbow UI. `[REPO: styles.css chart-1..5]`

## 06 — Art-direction issues

لا يوجد حتى الآن: photography direction، visual motifs، layout grammar، typographic scale بأدوار، ولا motion hierarchy. هذه هي الطبقة الغائبة (القسم 1 من المستند). `[ART]`

## 07 — Information architecture issues

- الجانبية مبنية من الصلاحيات، وهذا صحيح تقنيًا، لكنها تُظهر الصفحات **بنفس الوزن** بدل ترتيبها حسب الرحلة. `[REPO: app-sidebar.tsx]`
- ولي الأمر يدخل على لوحة قبل اختيار الابن، بينما الرحلة الصحيحة تبدأ من "أبنائي". `[SRS + القسم 16]`

## 08 — Role-specific issues

| الدور | المشكلة | الاتجاه |
|---|---|---|
| Student | لا "خطوتي التالية" واضحة | صفحة تعلّم موجّهة بالفعل التالي |
| Teacher | الملف العام أصبح منتج اكتشاف، لكن بصريًا لوحة إدارية | Marketplace-grade profile |
| Parent | يشعر أنه workspace وهو read-only | نبرة مراقبة لا تعلّم |
| Admin | جمالية الطالب على شاشات تشغيلية | كثافة جداول وحالات وطوابير |
| Supervisor | قريب جدًا من Admin | تمييز بالنطاق لا بالشكل |

## 09 — AI design anti-patterns

مفصّلة في `ai-design-antipatterns.md`.

## 10 — Accessibility issues

- الأساس جيد (تباين مُوثَّق). `[REPO]`
- المتبقي: التحقق من focus-visible على العناصر المخصّصة، وترتيب التبويب داخل الجانبية المطويّة، وحالة `prefers-reduced-motion` مع `gsap`. `[INFER]`

## 11 — Responsive issues

- الاعتماد على الجانبية وحدها بعد حذف الشريط السفلي جعل تنقّل الجوال خطوتين (فتح → اختيار). `[REPO]`
- الجداول العريضة تحتاج نمط بطاقات على الجوال لا تمريرًا أفقيًا فقط. `[INFER]`

## 12 — 17 — الاستراتيجيات

الصور: `imagery-guidelines.md` · الخطوط: `typography-system.md` · التركيب: `layout-composition.md` · اللون والموشن: `art-direction.md` · المنافسون: `competitive-visual-research.md`.

## 18 — Brand differentiation

الاختبار الحاكم (القسم 29): لو أُزيل الشعار والاسم واللون، هل يعرف المصمم أن هذه Academia؟ اليوم: **لا**. الهدف بعد المرحلة ب: **نعم**، عبر الخطوط + التركيب غير المتماثل + الصور الحقيقية.

## ما يجب ألّا يُغيَّر

1. أسماء وبنية الـtokens في `src/styles.css` وقيم التباين المُصحّحة.
2. `src/components/app/kit.tsx` كمفردات primitive (نُضيف compositions فوقها، لا نحذفها).
3. طبقة RBAC (`src/lib/rbac.*`, `use-access.ts`) ومنطق الحراسة.
4. `src/integrations/backend/*` وحدود API مع ASP.NET.
5. نظام ثنائية اللغة و`bi()` وسلوك RTL/LTR.
6. `Reveal` كمفردة motion وحيدة.
7. بنية المسارات ومسمّياتها العامة (روابط منشورة).

## الخلاصة

المطلوب **refinement + composition + identity**، لا إعادة كتابة. المراحل التنفيذية مرقّمة في `academia-design-direction.md`.
