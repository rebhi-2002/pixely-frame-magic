# توثيق مشروع أكاديميا (Acadimia)

منصّة تعليمية عربية (RTL) للطلاب والمعلمين وأولياء الأمور والمشرفين، مبنية على
**TanStack Start (React 19 + Vite)** مع لوحة تحكم مبنية على نظام صلاحيات
(RBAC). الباك اند سيكون **ASP.NET** خارجي (تمّت إزالة الاعتماد على
Supabase/Lovable Cloud بالكامل من الكود).

## فهرس التوثيق

| الملف | المحتوى |
| --- | --- |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | بنية المشروع، المجلدات، تدفّق البيانات، i18n، الثيم |
| [ROUTES.md](./ROUTES.md) | كل الصفحات العامة والمحمية + من يراها |
| [RBAC.md](./RBAC.md) | الوحدات، الصفحات، مفاتيح الصلاحيات، شجرة الصلاحيات، الحراسة |
| [DESIGN-SYSTEM.md](./DESIGN-SYSTEM.md) | الألوان، الخطوط، المكوّنات المشتركة، قواعد الاستخدام |
| [BACKEND-INTEGRATION.md](./BACKEND-INTEGRATION.md) | ما ينتظره الفرونت من ASP.NET (عقود API مطلوبة) |
| [PLAN.md](./PLAN.md) | ما تم إنجازه، وما تبقّى، وخطة المراحل القادمة |
| [CLEANUP-REPORT.md](./CLEANUP-REPORT.md) | تقرير تنظيف الكود بعد إزالة الباك اند القديم |

## تشغيل المشروع

```bash
bun install
bun run dev        # http://localhost:8080
bun run lint       # eslint + prettier
bun run build      # بناء الإنتاج
```

### متغيّرات البيئة

```
VITE_API_BASE_URL="https://localhost:7176"   # عنوان الباك اند ASP.NET
```

لا يوجد أي متغيّر آخر مطلوب لتشغيل الواجهة.
