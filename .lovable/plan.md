# لوحة تحكم إدارية بصلاحيات (RBAC) — خطة التنفيذ

Full Arabic RTL admin dashboard with two-layer access control: system module toggles (global) + per-role permission trees. An element shows only when both layers say yes, and every check is re-enforced on the server.

## Backend (Lovable Cloud)

Tables:
- `modules` — system modules (الإدارة، إدارة العملاء، المالية…) with `enabled` toggle, icon, sort order.
- `pages` — sub-items and individual pages inside a module (2 levels deep via `parent_id`), each with a route path and icon.
- `permission_keys` — the fine-grained "Tools" actions per page: `view_list`, `show_add_form`, `execute_add`, `edit`, `delete`, `view_profile`, `edit_profile`, `show_password_form`, `change_password`. Independent — no automatic dependency between "show form" and "execute".
- `roles` (أنواع المستخدم) — name, description.
- `role_permissions` — (role_id, page_id, permission_key) rows; presence = granted.
- `profiles` — name, email, phone, gender, avatar, status (فعال/غير فعال), role_id, linked to auth users.
- `user_roles` + `has_role()` security-definer function for the admin/super-admin check (roles for privilege checks live in their own table, never on profiles).

Every table gets RLS + explicit grants. Reads are scoped by role; writes to modules/roles/permissions require admin.

Seed migration inserts the module tree, pages, permission keys, a super-admin role with everything granted, and a couple of demo roles/users so the screens aren't empty.

Auth: email + password sign-in page at `/auth`, all dashboard routes under the protected layout.

## Server enforcement

A single `getMyAccess()` server function returns the current user's effective menu + permission set = enabled modules ∩ role permissions. The sidebar and all UI build from this. Every mutating server function (create user, delete, toggle status, save permissions…) independently re-verifies the required permission key before touching data — hiding a button is never the only guard.

## Screens (all RTL, shared layout: fixed header with title + icon on the right → toolbar → content)

1. **وحدات النظام** — full-width two/three-column table (#, الاسم, الحالة). Toggle saves instantly; disabling a module removes it from every user's sidebar immediately.
2. **صلاحيات المستخدم** (permission tree) — reached via ⚙️ from user types. Level 1: gray full-width section bar with icon, name, master checkbox (cascades to everything below) and a "+" button. Level 2: sub-items laid out side-by-side in columns, each with its own independent checkbox. Level 3: a bordered "Tools" panel per sub-item with a blue header and white body, one row per permission key. **Bulk save via a sticky "حفظ" button at the bottom**, with an unsaved-changes indicator.
3. **أنواع المستخدم** — toolbar (blue + button opens a modal, green search button, quick search field), table (#, الاسم, أدوات ⚙️), pagination with page numbers + "أظهر [10] مدخل" selector.
4. **المستخدمين** — same toolbar plus 3 instant filters (الحالة / الجنس / نوع المستخدم) and text search. Columns: #, الصورة, الاسم (sortable), البريد, الهاتف, الجنس, نوع المستخدم, الحالة (colored clickable link toggling status), أدوات ⚙️ dropdown (تعديل / حذف / التفاصيل / إعادة تعيين كلمة المرور). Every control renders only if the corresponding permission key is granted.
5. **Sidebar** — built entirely from `getMyAccess()`; ungranted items are never rendered in the DOM. Up to 3 levels of accordion, sections collapsed by default, **multiple sections can stay open at once**, chevron indicators, slide-down animation, active item highlighted with its ancestors auto-opened. Collapsed/mobile variant: narrow dark theme showing section icons plus a persistent search field that searches all pages across the tree; clicking a section opens a flyout with its children. Lucide outline icons throughout.

## Technical notes

- `dir="rtl"` + `lang="ar"` on the document, Arabic web font (Cairo/IBM Plex Arabic) loaded via a link tag in the root route.
- Design system: dedicated Arabic-admin palette in `src/styles.css` (blue primary for actions, green/red status), no hardcoded colors in components.
- Data flow: TanStack Query + route loaders under `_authenticated`; mutations invalidate the access query so sidebar/UI update instantly.
- A `<Can permission="…" page="…">` helper component and `useAccess()` hook keep permission checks consistent across pages.
- Each route gets its own Arabic `head()` metadata.

Order of work: Cloud + schema/seed → auth + protected layout + RTL shell → sidebar → system modules → user types → permission tree → users list.