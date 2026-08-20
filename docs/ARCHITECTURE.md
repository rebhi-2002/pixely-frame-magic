# البنية المعمارية

## المكدّس التقني

- **TanStack Start v1** (React 19، Vite 8) — SSR + توجيه بالملفات + server functions.
- **TanStack Router** — `src/routes/` ، الشجرة تُولَّد تلقائياً في `src/routeTree.gen.ts` (لا تُعدّل يدوياً).
- **TanStack Query** — كل قراءات/كتابات RBAC عبر `useQuery` / `useMutation`.
- **Tailwind CSS v4** — التوكنز في `src/styles.css` فقط (لا ألوان مباشرة في المكوّنات).
- **i18next / react-i18next** — عربي (افتراضي، RTL) + إنجليزي (LTR).
- **مكوّنات** shadcn/ui + Radix، أيقونات lucide-react، رسوم recharts، حركات gsap، إشعارات sonner.

## خريطة المجلدات

```
src/
  routes/                      صفحات التطبيق (توجيه بالملفات)
    __root.tsx                 الجذر: lang/dir، الخطوط، الثيم، Toaster، خروج الخمول
    _authenticated/route.tsx   تخطيط لوحة التحكم + القائمة الجانبية + الحراسة
  components/
    site/                      واجهة الموقع العام (هيدر، فوتر، شعار، أبطال، إلخ)
    app/                       عناصر لوحة التحكم (kit، guard، charts، skeleton)
    admin/                     شاشات الإدارة (وحدات النظام، الأدوار، المستخدمون)
    ui/                        مكوّنات shadcn الأساسية
    providers/                 PreferencesProvider (ثيم + لغة)
  lib/
    rbac-types.ts              أنواع الصلاحيات ونطاق الأدوار
    rbac-static-data.ts        بيانات RBAC الحالية (مؤقتة، بديل قاعدة البيانات)
    rbac.server.ts             منطق حساب الصلاحيات على السيرفر
    rbac.functions.ts          server functions (getMyAccess، CRUD الأدوار…)
    bi.ts                      مساعد النصوص ثنائية اللغة + نطاق الأدوار
    session-home.ts            الصفحة الرئيسية لكل دور بعد الدخول
    error-page.ts / error-capture.ts / lovable-error-reporting.ts
  hooks/
    use-access.ts              جلب صلاحيات المستخدم الحالي + can()
    use-session.ts             حالة الجلسة على الواجهة
    use-sign-out.tsx           تسجيل خروج مع طبقة تحميل
    use-idle-logout.ts         خروج تلقائي بعد ساعتين خمول
    use-scrolled.ts / use-scroll-reveal.ts
  integrations/backend/        طبقة الاتصال بالباك اند ASP.NET
    client.ts                  apiClient (fetch + credentials: include)
    auth.ts                    login / logout / isAuthenticated
    auth-middleware.ts         requireAuth لـ server functions (مؤقت)
  i18n/                        الإعداد + ملفات الترجمة (ar/en + ar.pages/en.pages)
  styles.css                   نظام التصميم بالكامل
```

## تدفّق البيانات

```
مكوّن → hook (useAccess / useQuery)
      → server function في src/lib/rbac.functions.ts  (createServerFn)
      → rbac.server.ts  (يحسب الصلاحيات)
      → rbac-static-data.ts   ← ★ نقطة الاستبدال بالباك اند ASP.NET
```

كل عملية تعديل تُبطل `["my-access"]` فتتحدّث القائمة الجانبية والواجهة فوراً.

## اللغة والاتجاه

- `__root.tsx` يضبط `lang` و`dir` على `<html>`.
- النصوص داخل الصفحات تُكتب عبر `useBi()` (`bi("عربي", "English")`) أو مفاتيح i18n.
- الخط يتغيّر تلقائياً حسب `:root[lang]` (Tajawal للعربي، Reem Kufi للإنجليزي).

## الثيم

`PreferencesProvider` يحفظ `acadimia.theme` (`dark` | `light` | `auto`) و
`acadimia.locale` في `localStorage`، ويطبّقهما قبل الرسم لتجنّب الوميض.

## الجلسة والحماية

- الدخول: `POST /api/Auth/Login` ثم يُخزَّن علم محلي في `localStorage`
  (`academia.auth`) لتفعيل واجهات الفرونت فقط.
- الحراسة على الواجهة: `_authenticated/route.tsx` + `components/app/guard.tsx`.
- الحراسة الحقيقية **مسؤولية الباك اند** — راجع `BACKEND-INTEGRATION.md`.
