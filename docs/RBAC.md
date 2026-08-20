# نظام الصلاحيات (RBAC)

## الطبقات

الصلاحية النهائية = **وحدة النظام مفعّلة** ∩ **الدور يملك المفتاح على الصفحة**.
إذا فشلت أي طبقة، العنصر لا يُرسم في DOM أصلاً — وبالإضافة لذلك يُعاد التحقّق
عند التنفيذ في `rbac.server.ts`.

## الكيانات

| الكيان | الملف الحالي | الوصف |
| --- | --- | --- |
| `MODULES` | `src/lib/rbac-static-data.ts` | وحدات النظام (مفتاح، اسم عربي/إنجليزي، أيقونة، ترتيب، `enabled`) |
| `PAGES` | نفس الملف | صفحات داخل وحدة، حتى 3 مستويات عبر `parent_id` |
| `PERMISSION_KEYS` | نفس الملف | مفاتيح الأدوات لكل صفحة |
| `ROLES` | نفس الملف | أنواع المستخدم |
| `USERS` | نفس الملف | مستخدمون تجريبيون |

## مفاتيح الصلاحيات

`view_list` · `show_add_form` · `execute_add` · `edit` · `delete` ·
`view_profile` · `edit_profile` · `show_password_form` · `change_password`

المفاتيح **مستقلة**: منح «إظهار النموذج» لا يمنح «تنفيذ الإضافة».

## الأدوار

`مدير عام` · `مشرف أكاديمي` · `معلم` · `ولي أمر` · `طالب`

`ROLE_MODULE_SCOPE` في `src/lib/rbac-types.ts` يحدّد نطاق كل دور، لكن **منح
`view_list`** في شجرة الصلاحيات هو مصدر الحقيقة لظهور العنصر في القائمة الجانبية.

## نقاط التنفيذ في الكود

| الطبقة | الملف |
| --- | --- |
| حساب الصلاحية الفعّالة | `src/lib/rbac.server.ts` → `loadAccess()` |
| إجبار الصلاحية على السيرفر | `requirePermission()` / `requireAdmin()` |
| server functions | `src/lib/rbac.functions.ts` |
| قراءة على الواجهة | `src/hooks/use-access.ts` → `can(pageKey, key)` |
| حراسة الصفحة | `src/components/app/guard.tsx` → `<Guard pageKey="…">` |
| بناء القائمة الجانبية | `src/components/admin/app-sidebar.tsx` |

## الشاشات الإدارية

1. **`/system-modules`** — تبديل الوحدات؛ التعطيل يخفيها عن كل المستخدمين فوراً.
2. **`/admin/roles`** — CRUD أنواع المستخدم + بحث + ترقيم صفحات.
3. **`/role-permissions/$roleId`** — شجرة 3 مستويات (وحدة ← صفحة ← أدوات) مع
   تحديد متتالٍ وزر **حفظ** واحد أسفل الصفحة ومؤشّر تغييرات غير محفوظة.
4. **`/admin/users`** — CRUD مستخدمين + فلاتر (الحالة/الجنس/نوع المستخدم) + بحث،
   وكل زر يظهر فقط بوجود مفتاحه.
5. **`/admin/permissions`** — نظرة عامة على مصفوفة الصلاحيات.

## عند الانتقال إلى ASP.NET

استبدل جسم الدوال في `rbac.server.ts` بنداءات `apiClient` — التوقيعات
(`loadAccess` / `loadPermissionMatrix` / `loadUsers` / `requirePermission`)
مُصمّمة لتبقى كما هي، فلا تحتاج لمسّ أي مكوّن واجهة. العقود المطلوبة في
[BACKEND-INTEGRATION.md](./BACKEND-INTEGRATION.md).
