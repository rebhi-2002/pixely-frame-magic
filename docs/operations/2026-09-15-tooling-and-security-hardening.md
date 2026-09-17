# تقرير جلسة: أدوات الجودة، متغيرات البيئة، وهيدرز الأمان — 2026-09-15

توثيق تفصيلي لجلسة عمل ركّزت على: إصلاح أخطاء lint/TypeScript حقيقية، سد فجوة
فحص الأنواع بالـ CI، مركزة التحقق من متغيرات البيئة، وإضافة هيدرز أمان HTTP.
راجع `CHANGELOG.md` بالجذر للملخص المختصر ضمن سياق باقي تاريخ المشروع — هالملف
هو الشرح الكامل لمين بدو يفهم "ليش" و"كيف" بالتفصيل.

> **قبل ما تبلش:** بعد سحب هالتعديلات شغّل `npm install` من جديد — انحذفت حزمة
> (`vite-tsconfig-paths`) وانضافت حزمة (`@vitest/coverage-v8`) وانرقّت حزمة
> (`vitest`)، فـ `node_modules` القديمة مش متوافقة.

---

## 1) إصلاح أخطاء حقيقية بالكود (مش مجرد فورمات)

ملف `Error.txt` يلي انبعث كان من تشغيل CI قديم — أخطاء الـ Prettier يلي فيه كانت
انحلّت أصلاً بالنسخة الحالية. بس لما شغّلت `npm run lint` من جديد، طلعت **أخطاء
حقيقية جديدة** مش موجودة بالملف القديم:

| الملف                                      | المشكلة                                                                                               | الحل                                                          |
| ------------------------------------------ | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| `src/routes/_authenticated/flashcards.tsx` | `useMemo` متنادى من جوا `useMemo` تانية (مخالفة لقواعد React Hooks — ممنوع استدعاء hook جوا callback) | حذفت الـ `useMemo` الداخلية، استبدلتها بـ `rows ?? []` مباشرة |
| `src/routes/_authenticated/library.tsx`    | نفس المشكلة بالضبط                                                                                    | نفس الحل                                                      |
| `src/routes/courses.tsx`                   | `items` كانت array جديدة بكل render، يعني `useMemo` التابعة إلها كانت تعيد الحساب كل مرة بلا فايدة    | لفيت `items` نفسها بـ `useMemo([rows])`                       |

**النتيجة:** `npm run lint` → 0 أخطاء (كانت 2 خطأ حقيقي + عدة تحذيرات).

---

## 2) فصل الـ Hooks عن الـ Components (تحذيرات `react-refresh`)

كان في 5 تحذيرات `react-refresh/only-export-components` — قاعدة بتقول إنه أي ملف
بيصدّر مكوّن React، ما لازم يصدّر معه hook أو دالة عادية بنفس الوقت (غير كده
Hot Module Reload بيتعطل جزئياً بالتطوير). الحل: نقل الجزء غير-المكوّن لملف منفصل.

| الملف الأصلي                                        | شو انفصل                                  | الملف الجديد                                                                                                         |
| --------------------------------------------------- | ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `src/components/app/guard.tsx`                      | `useCanView()`                            | `src/hooks/use-can-view.ts`                                                                                          |
| `src/components/providers/preferences-provider.tsx` | `usePreferences()` + `PreferencesContext` | `src/hooks/use-preferences.ts`                                                                                       |
| `src/components/ui/button.tsx`                      | `buttonVariants` (cva)                    | `src/components/ui/button-variants.ts`                                                                               |
| `src/components/ui/toggle.tsx`                      | `toggleVariants` (cva)                    | `src/components/ui/toggle-variants.ts`                                                                               |
| `src/hooks/use-sign-out.tsx`                        | تقسيم لملفين: hook و component            | `src/hooks/use-sign-out.ts` (الـ hook) + `src/components/site/sign-out-overlay.tsx` (الـ component `SignOutOverlay`) |

**لو بدك تضيف hook أو مكوّن جديد لاحقاً:** خلي كل ملف يصدّر إما مكوّنات React بس،
إما hooks/دوال بس — مش خليط. هيك بتتفادى نفس التحذير من الأساس.

**النتيجة:** `npm run lint` → 0 تحذيرات كمان.

---

## 3) توحيد تسمية Acadimia → Academia

لقيت 3 ملفات توثيق لسا بالاسم القديم (المحتوى جوّاهم ما كان فيه المشكلة، بس اسم
الملف نفسه):

- `Acadimia-API-Frontend-Integration.md` → `Academia-API-Frontend-Integration.md`
- `docs/api/postman/acadimia-current-backend.postman_environment.json` → `academia-current-backend.postman_environment.json`
- `docs/api/postman/acadimia-current-backend.postman_collection.json` → `academia-current-backend.postman_collection.json`

تأكدت إنه ما في أي ملف تاني بالمشروع بيشير لهالأسماء القديمة، فإعادة التسمية آمنة
100%.

---

## 4) إصلاح خطأين TypeScript كانا موجودين من قبل (خارج نطاق `Error.txt`)

هالخطأين ما كانوا يظهروا بـ `npm run lint` أو حتى بـ CI القديم — لأنه **ما في
أصلاً أي فحص TypeScript بالـ CI** (راجع القسم 5). ظهروا لما شغّلت `npx tsc --noEmit`
يدوياً.

### أ) `src/lib/seo.ts`

```ts
// قبل:
let element = document.getElementById(id); // النوع: HTMLElement | null
element.type = "application/ld+json"; // خطأ: HTMLElement ما عندها .type

// بعد:
let element = document.getElementById(id) as HTMLScriptElement | null;
```

`document.getElementById` بترجع نوع عام `HTMLElement`، وخاصية `.type` موجودة بس
بـ `HTMLScriptElement`. لازم تحديد النوع الدقيق صراحة.

### ب) `vitest.config.ts`

المشروع بيستخدم `vite@8` (النسخة الحديثة يلي بتستخدم محرك rolldown داخلياً)، بينما
`vitest@3.0.5` كان جايب نسخة `vite@7` قديمة (rollup) جوّاه كـ dependency خاصة فيه
— تعارض بأنواع الـ Plugin بين النسختين. **الحل: رقّيت `vitest` لـ `^5.0.1`** (بيدعم
`vite@8` رسمياً حسب `peerDependencies` تبعه)، مش عملت workaround مؤقت (زي `as any`).

---

## 5) سكريبتات `package.json` جديدة + سد فجوة مهمة بالـ CI

### الفجوة الأهم: مافي فحص TypeScript إطلاقاً

`vite build` بس بيترجم الكود (transpile) — **ما بيتحقق من الأنواع**. يعني خطأ
زي يلي بـ `seo.ts` (قسم 4) كان ممكن يوصل production بدون ما حدا ينتبه، طالما
الكود بيترجم صح حتى لو فيه bug بالأنواع.

### السكريبتات الجديدة

| سكريبت          | الأمر                                       | الاستخدام                                                                                                         |
| --------------- | ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `typecheck`     | `tsc --noEmit`                              | فحص أنواع TypeScript بدون توليد ملفات — **الإضافة الأهم**                                                         |
| `lint:fix`      | `eslint . --fix`                            | يصلح مشاكل ESLint القابلة للإصلاح التلقائي                                                                        |
| `format:check`  | `prettier --check .`                        | يتحقق من الفورمات بدون ما يعدّل الملفات (مناسب للـ CI)                                                            |
| `test:coverage` | `vitest run --coverage`                     | تغطية الاختبارات (كانت الإعدادات بـ `vitest.config.ts` جاهزة بس الحزمة `@vitest/coverage-v8` كانت ناقصة — ثبّتها) |
| `validate`      | `typecheck && lint && format:check && test` | **شغّلها قبل أي push أو commit مهم** — بتلخّص كل الفحوصات بأمر واحد                                               |

### تحديث `.github/workflows/ci.yml`

ضفت خطوتين جديدتين (`typecheck` و `format:check`) بين `npm ci` و `npm test`،
عشان الـ CI يوقف أي PR فيه خطأ نوع أو فورمات مش مضبوط، بدل ما يوصل لل `main`.

### `engines` بـ `package.json`

```json
"engines": { "node": ">=22" }
```

يتطابق مع `.nvmrc`. لسا **معلوماتي بس** (npm ما بيرفض التثبيت لو الإصدار مختلف
إلا لو ضفت `engine-strict=true` بملف `.npmrc` — قرر إذا بدك هيك صرامة أو لأ).

---

## 6) ملف مركزي للتحقق من متغيرات البيئة — `src/lib/env.ts`

### المشكلة يلي كانت موجودة

كل ملف كان يقرأ `import.meta.env.VITE_XXX` مباشرة وعنده قيمة افتراضية خاصة فيه.
لو تغيّر اسم متغيّر أو انكتب غلط بمنصة الاستضافة، **ما في أي تحذير** — التطبيق
بيشتغل بصمت بالقيمة الافتراضية (غالباً `localhost`) وحدا بيكتشف المشكلة بالإنتاج
بس، لما كل الطلبات تفشل.

### الحل

ملف وحيد (`src/lib/env.ts`) بيستخدم `zod` (كانت أصلاً dependency بالمشروع) عشان:

1. يتحقق من شكل كل متغيرات البيئة مرة وحدة عند إقلاع التطبيق.
2. يطبع خطأ واضح بالـ console لو في قيمة غير صالحة (رابط مش URL صحيح مثلاً) —
   **بدون ما يوقف التطبيق** (خطأ بمتغيّر ثانوي زي PostHog ما لازم يكسر كل شي).
3. **فحص أمان إضافي**: لو البناء إنتاجي (`PROD`) وعنوان الباك اند لسا `localhost`،
   بيطبع خطأ صارخ بالـ console (وبتلتقطه Sentry لو مفعّل) — هاي أشيع غلطة نشر
   ممكن تصير (نسيان ضبط `VITE_API_BASE_URL` بمنصة الاستضافة).

### الملفات يلي تحدّثت لتستخدم `env` بدل `import.meta.env` مباشرة

`client.ts`, `auth.ts`, `auth-middleware.ts`, `analytics.ts`, `seo.ts`,
`instrument.client.ts`, `server.ts`, `login.tsx`, `signup.tsx`,
`routes/_authenticated/route.tsx`.

### قاعدة للمستقبل

> أي متغيّر بيئة جديد (`VITE_XXX`) لازم يُضاف أولاً بسكيما `envSchema` جوا
> `src/lib/env.ts`، مش يُقرأ مباشرة بأي مكان تاني بالكود.

### تحديث `.env.example`

ضفت توثيق لمتغيرين كانوا موجودين بالكود بس مش موثّقين هناك:
`VITE_ENABLE_DEMO_LOGIN`, `VITE_ENABLE_SIGNUP`، وكمان `VITE_SITE_URL`.

---

## 7) هيدرز أمان HTTP — `vercel.json` + `public/_headers`

المشروع ما كان فيه أي هيدرز أمان (CSP, X-Frame-Options...). ضفت:

- **`vercel.json`** (بالجذر) — المنصة الافتراضية حسب `vite.config.ts`
  (`NITRO_PRESET` الافتراضي = `vercel`).
- **`public/_headers`** — نفس الهيدرز بصيغة Netlify، للاحتياط لو بدّلت
  `NITRO_PRESET=netlify` بالمستقبل. **حافظ على تطابق الملفين لو عدّلت وحدة منهم.**

الهيدرز المضافة: `X-Content-Type-Options`, `X-Frame-Options: DENY`,
`Referrer-Policy`, `Permissions-Policy`, `Strict-Transport-Security`,
و`Content-Security-Policy` أساسية.

### ⚠️ تحذير مهم عن الـ CSP — لازم اختبار قبل الإطلاق الفعلي

1. الصفحة فيها `<script>` inline (السطر يلي بيطبّق الثيم/اللغة قبل الرسم —
   `preferencesBootScript` بـ `preferences-provider.tsx`)، فاضطريت أسمح بـ
   `'unsafe-inline'` بـ `script-src`. الأفضل مستقبلاً: تحويلها لـ hash-based CSP
   (`'sha256-...'`) بدل `unsafe-inline` — أكثر أماناً بس بده ضبط إضافي وقت البناء.
2. `connect-src` فيه حالياً عنوان الباك اند الحالي مكتوب صراحة
   (`ziadkamalaln2842-001-site1.etempurl.com`). **لو تغيّر عنوان الباك اند
   (`VITE_API_BASE_URL`)، لازم تحدّث `vercel.json` و `public/_headers` يدوياً
   وإلا رح تنكسر كل نداءات الشبكة بسبب CSP.** هاي محدودية ملفات الهيدرز الثابتة —
   ما فيها تقرأ متغيرات بيئة ديناميكياً.
3. **جرّب الموقع كامل بعد أول نشر** (تسجيل دخول، تحليلات PostHog، Sentry) وافتح
   console المتصفح تشوف إذا في أي CSP violation، عدّل القائمة المسموحة حسب الحاجة.

---

## 8) إزالة `vite-tsconfig-paths` لصالح `resolve.tsconfigPaths` المدمجة

Vite 8 صار عنده دعم أصلي لحل مسارات `tsconfig.json` (استيراد `@/...`)، فما عاد
لازم بلوجن خارجي. استبدلته بـ:

```ts
resolve: {
  tsconfigPaths: true;
}
```

بملفي `vite.config.ts` و `vitest.config.ts`، وحذفت الحزمة من `package.json`.
تأكدت إنه الاستيراد بـ `@/...` لسا شغّال بكل مكان (build + tests + typecheck).

---

## ملخص الفحص النهائي

كل هالتعديلات اتأكد منها بتشغيل:

```bash
npm run validate   # typecheck + lint + format:check + test
npm run build       # تأكيد إضافي إنه البناء الفعلي ناجح
```

والنتيجة: **صفر أخطاء TypeScript، صفر أخطاء/تحذيرات ESLint، فورمات نظيف، 16/16
اختبار ناجح، build ناجح.**

---

## شو لسا مفتوح / أفكار لمستقبل قريب (لسا ما اتنفذت)

- **CSP أقوى**: تحويل الـ inline boot script لـ hash-based بدل `unsafe-inline`
  (راجع تحذير القسم 7).
- **تحقق أشد من `env.ts`**: حالياً بيحذّر بس بالـ console لو متغيّر ناقص/غلط، وما
  بيوقف التطبيق. ممكن مستقبلاً تخلي متغيرات معينة (زي `VITE_API_BASE_URL`)
  إجبارية بالإنتاج فعلياً (يرمي خطأ بدل تحذير).
- **Pre-commit hook** (زي `husky` + `lint-staged`): يشغّل `lint:fix` و
  `format` تلقائياً قبل كل commit، بدل ما يعتمد الموضوع على تذكّر المبرمج
  يشغّل `npm run validate` يدوياً.
- **`engine-strict`**: لو بدك تمنع تثبيت الحزم بإصدار Node مختلف عن `>=22`
  فعلياً (مش بس معلوماتي)، ضيف بملف `.npmrc`: `engine-strict=true`.
