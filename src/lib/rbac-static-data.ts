// بيانات ثابتة (in-memory) لمعلومات لوحة تحكم الأدمن — تحلّ محلّ جداول
// Supabase (modules / pages / roles / permission_keys / role_permissions /
// profiles) لحد ما الباك اند الجديد يوفّر endpoints مكافئة.
//
// بما إنه حالياً بس حساب أدمن واحد شغّال (راجع src/integrations/backend/auth.ts)،
// كل مستخدم مسجّل دخول يشوف كل وحدات وصفحات "الإدارة" بكل الصلاحيات.
//
// ⚠️ قيم `key` هون لازم تطابق بالضبط قيم `pageKey` المستخدمة فعلياً بمكوّن
// <Guard> داخل كل ملف route (مثلاً src/routes/_authenticated/admin.users.tsx
// يستخدم pageKey="admin_users") — لأن useCanView() و pageMatchesRole() بملف
// src/lib/bi.ts بيتحققوا من نفس النص بالضبط، وبيتحقق كمان إنه يبدأ بـ "admin_"
// حتى يظهر لدور "مدير عام". لو ضفت صفحة إدارة جديدة، خذ الـ pageKey من ملف
// الـ route نفسه ولا تخترع قيمة جديدة.
//
// التعديلات اللي تصير من شاشات "وحدات النظام / الأدوار / المستخدمين" بتنعمل
// على هالمصفوفات مباشرة (بالذاكرة) — بتضل شغالة أثناء تشغيل السيرفر بس
// بترجع لقيمها الأصلية عند إعادة تشغيله. هاد متوقّع لحد ما توصل endpoints
// حقيقية من الباك اند (احذف هذا الملف حينها).

import type { ModuleRow, PermissionKeyRow, RoleRow, UserRow } from "./rbac-types";

export interface StaticPageRow {
  id: string;
  module_id: string;
  parent_id: string | null;
  key: string;
  name: string;
  name_en: string;
  icon: string;
  path: string | null;
  sort_order: number;
}

export const PERMISSION_KEYS: PermissionKeyRow[] = [
  { key: "view_list", label: "عرض بيانات الجدول", sort_order: 1 },
  { key: "show_add_form", label: "عرض واجهة الإضافة", sort_order: 2 },
  { key: "execute_add", label: "تنفيذ الإضافة", sort_order: 3 },
  { key: "edit", label: "تعديل", sort_order: 4 },
  { key: "delete", label: "حذف", sort_order: 5 },
  { key: "view_profile", label: "عرض الملف الشخصي", sort_order: 6 },
  { key: "edit_profile", label: "تعديل الملف الشخصي", sort_order: 7 },
  { key: "show_password_form", label: "عرض واجهة تغيير كلمة المرور", sort_order: 8 },
  { key: "change_password", label: "تنفيذ تغيير كلمة المرور", sort_order: 9 },
];

export const MODULES: ModuleRow[] = [
  {
    id: "m-admin",
    key: "administration",
    name: "الإدارة",
    nameEn: "Administration",
    icon: "ShieldCheck",
    enabled: true,
    sort_order: 1,
  },
  {
    id: "m-academic",
    key: "academic",
    name: "الشؤون الأكاديمية",
    nameEn: "Academic",
    icon: "GraduationCap",
    enabled: true,
    sort_order: 2,
  },
  {
    id: "m-account",
    key: "account",
    name: "الحساب",
    nameEn: "Account",
    icon: "Settings",
    enabled: true,
    sort_order: 3,
  },
];

// المسارات الفعلية وقيم الـ key مأخوذة حرفياً من <Guard pageKey="..."> بكل
// ملف route (راجع التعليق أعلاه). موديول "الشؤون الأكاديمية" مبني على
// src/components/admin/admin-feature.tsx اللي فيه نفس القيم أيضاً.
export const PAGES: StaticPageRow[] = [
  {
    id: "p-system-modules",
    module_id: "m-admin",
    parent_id: null,
    key: "admin_settings",
    name: "وحدات النظام",
    name_en: "System modules",
    icon: "ToggleRight",
    path: "/system-modules",
    sort_order: 1,
  },
  {
    id: "p-user-mgmt",
    module_id: "m-admin",
    parent_id: null,
    key: "admin_users",
    name: "إدارة المستخدمين",
    name_en: "User management",
    icon: "UsersRound",
    path: null,
    sort_order: 2,
  },
  {
    id: "p-user-types",
    module_id: "m-admin",
    parent_id: "p-user-mgmt",
    key: "admin_roles",
    name: "الأدوار والصلاحيات",
    name_en: "Roles",
    icon: "IdCard",
    path: "/admin/roles",
    sort_order: 1,
  },
  {
    id: "p-users",
    module_id: "m-admin",
    parent_id: "p-user-mgmt",
    key: "admin_users",
    name: "المستخدمون",
    name_en: "Users",
    icon: "User",
    path: "/admin/users",
    sort_order: 2,
  },
  {
    id: "p-permissions",
    module_id: "m-admin",
    parent_id: "p-user-mgmt",
    key: "admin_roles",
    name: "مصفوفة الصلاحيات",
    name_en: "Permission matrix",
    icon: "Settings2",
    path: "/admin/permissions",
    sort_order: 3,
  },
  {
    id: "p-admin-settings",
    module_id: "m-admin",
    parent_id: null,
    key: "admin_settings",
    name: "إعدادات المنصة",
    name_en: "Platform settings",
    icon: "SlidersHorizontal",
    path: "/admin/settings",
    sort_order: 3,
  },

  {
    id: "p-admin-dashboard",
    module_id: "m-academic",
    parent_id: null,
    key: "admin_dashboard",
    name: "نظرة عامة",
    name_en: "Overview",
    icon: "LayoutDashboard",
    path: "/admin/dashboard",
    sort_order: 1,
  },
  {
    id: "p-admin-teachers",
    module_id: "m-academic",
    parent_id: null,
    key: "admin_teachers",
    name: "المعلمون",
    name_en: "Teachers",
    icon: "Users",
    path: "/admin/teachers",
    sort_order: 2,
  },
  {
    id: "p-admin-curriculum",
    module_id: "m-academic",
    parent_id: null,
    key: "admin_curriculum",
    name: "المنهج",
    name_en: "Curriculum",
    icon: "BookOpen",
    path: "/admin/curriculum",
    sort_order: 3,
  },
  {
    id: "p-admin-curriculum-req",
    module_id: "m-academic",
    parent_id: null,
    key: "admin_curriculum_requests",
    name: "طلبات المنهج",
    name_en: "Curriculum requests",
    icon: "FileCheck",
    path: "/admin/curriculum-requests",
    sort_order: 4,
  },
  {
    id: "p-admin-content-review",
    module_id: "m-academic",
    parent_id: null,
    key: "admin_content_review",
    name: "مراجعة المحتوى",
    name_en: "Content review",
    icon: "FileSearch",
    path: "/admin/content-review",
    sort_order: 5,
  },
  {
    id: "p-admin-community-reports",
    module_id: "m-academic",
    parent_id: null,
    key: "admin_community_reports",
    name: "بلاغات المجتمع",
    name_en: "Community reports",
    icon: "MessageSquareWarning",
    path: "/admin/community-reports",
    sort_order: 6,
  },
  {
    id: "p-admin-payments",
    module_id: "m-academic",
    parent_id: null,
    key: "admin_payments",
    name: "المدفوعات",
    name_en: "Payments",
    icon: "CreditCard",
    path: "/admin/payments",
    sort_order: 7,
  },

  {
    id: "p-notifications",
    module_id: "m-account",
    parent_id: null,
    key: "notifications",
    name: "الإشعارات",
    name_en: "Notifications",
    icon: "Bell",
    path: "/notifications",
    sort_order: 1,
  },
  {
    id: "p-account-settings",
    module_id: "m-account",
    parent_id: null,
    key: "account_settings",
    name: "إعدادات الحساب",
    name_en: "Account settings",
    icon: "Settings",
    path: "/settings",
    sort_order: 2,
  },
];

export const ROLES: RoleRow[] = [
  {
    id: "r-admin",
    name: "مدير عام",
    description: "صلاحيات كاملة على النظام",
    created_at: new Date().toISOString(),
  },
];

export const USERS: UserRow[] = [
  {
    id: "u-admin",
    full_name: "الأدمن",
    email: "admin@Academia.com",
    phone: null,
    gender: "male",
    avatar_url: null,
    is_active: true,
    role_id: "r-admin",
    role_name: "مدير عام",
  },
];

export function nextId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}
