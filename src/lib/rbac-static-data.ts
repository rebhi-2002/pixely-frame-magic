// بيانات ثابتة (in-memory) لمعلومات لوحة تحكم الأدمن — تحلّ محلّ جداول
// Supabase (modules / pages / roles / permission_keys / role_permissions /
// profiles) لحد ما الباك اند الجديد يوفّر endpoints مكافئة.
//
// تغطي هالبيانات الأدوار الخمسة كلهم (مدير عام / مشرف أكاديمي / معلم / ولي
// أمر / طالب) — مو بس الأدمن. أي مستخدم (حقيقي عبر /api/Auth/Login، أو
// حساب تجريبي محلي عبر "دخول سريع" بصفحة تسجيل الدخول) بيشوف بالضبط صفحات
// دوره + الصلاحيات الممنوحة له (راجع src/integrations/backend/auth.ts
// لتفاصيل كيف تُحدَّد الهوية الحالية).
//
// ⚠️ قيم `key` هون لازم تطابق بالضبط قيم `pageKey` المستخدمة فعلياً بمكوّن
// <Guard> داخل كل ملف route — لأن useCanView() و pageMatchesRole() بملف
// src/lib/bi.ts بيتحققوا من نفس النص بالضبط (بادئة الدور: student_ / teacher_
// / parent_ / supervisor_ / admin_). لو ضفت صفحة جديدة، خذ الـ pageKey من
// ملف الـ route نفسه ولا تخترع قيمة جديدة.
//
// التعديلات اللي تصير من شاشات "وحدات النظام / الأدوار / المستخدمين /
// مصفوفة الصلاحيات" بتنعمل على هالمصفوفات مباشرة (بالذاكرة) — بتضل شغالة
// أثناء تشغيل السيرفر بس بترجع لقيمها الأصلية عند إعادة تشغيله. هاد متوقّع
// لحد ما توصل endpoints حقيقية من الباك اند (احذف هذا الملف حينها).

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
    id: "m-student",
    key: "student",
    name: "مساحة الطالب",
    nameEn: "Student space",
    icon: "GraduationCap",
    enabled: true,
    sort_order: 1,
  },
  {
    id: "m-teacher",
    key: "teacher",
    name: "مساحة المعلم",
    nameEn: "Teacher space",
    icon: "Presentation",
    enabled: true,
    sort_order: 2,
  },
  {
    id: "m-supervisor",
    key: "supervisor",
    name: "الإشراف الأكاديمي",
    nameEn: "Academic supervision",
    icon: "ClipboardCheck",
    enabled: true,
    sort_order: 3,
  },
  {
    id: "m-parent",
    key: "parent",
    name: "مساحة ولي الأمر",
    nameEn: "Parent space",
    icon: "Users",
    enabled: true,
    sort_order: 4,
  },
  {
    id: "m-admin",
    key: "administration",
    name: "الإدارة",
    nameEn: "Administration",
    icon: "ShieldCheck",
    enabled: true,
    sort_order: 5,
  },
  {
    id: "m-academic",
    key: "academic",
    name: "الشؤون الأكاديمية",
    nameEn: "Academic",
    icon: "GraduationCap",
    enabled: true,
    sort_order: 6,
  },
  {
    id: "m-account",
    key: "account",
    name: "الحساب",
    nameEn: "Account",
    icon: "Settings",
    enabled: true,
    sort_order: 7,
  },
];

// المسارات الفعلية وقيم الـ key مأخوذة حرفياً من <Guard pageKey="..."> بكل
// ملف route (راجع التعليق أعلاه).
export const PAGES: StaticPageRow[] = [
  // ---- مساحة الطالب ----
  {
    id: "p-student-dashboard",
    module_id: "m-student",
    parent_id: null,
    key: "student_dashboard",
    name: "لوحة المعلومات",
    name_en: "Dashboard",
    icon: "LayoutDashboard",
    path: "/dashboard",
    sort_order: 1,
  },
  {
    id: "p-student-my-courses",
    module_id: "m-student",
    parent_id: null,
    key: "student_my_courses",
    name: "دوراتي",
    name_en: "My courses",
    icon: "BookOpen",
    path: "/my-courses",
    sort_order: 2,
  },
  {
    id: "p-student-library",
    module_id: "m-student",
    parent_id: null,
    key: "student_library",
    name: "المكتبة",
    name_en: "Library",
    icon: "Library",
    path: "/library",
    sort_order: 3,
  },
  {
    id: "p-student-flashcards",
    module_id: "m-student",
    parent_id: null,
    key: "student_flashcards",
    name: "البطاقات التعليمية",
    name_en: "Flashcards",
    icon: "Layers",
    path: "/flashcards",
    sort_order: 4,
  },
  {
    id: "p-student-exam",
    module_id: "m-student",
    parent_id: null,
    key: "student_exam",
    name: "محاكي الامتحان",
    name_en: "Exam simulator",
    icon: "FileQuestion",
    path: "/exam-simulator",
    sort_order: 5,
  },
  {
    id: "p-student-mistakes",
    module_id: "m-student",
    parent_id: null,
    key: "student_mistakes",
    name: "بنك الأخطاء",
    name_en: "Mistakes bank",
    icon: "AlertTriangle",
    path: "/mistakes-bank",
    sort_order: 6,
  },
  {
    id: "p-student-achievements",
    module_id: "m-student",
    parent_id: null,
    key: "student_achievements",
    name: "الإنجازات",
    name_en: "Achievements",
    icon: "Trophy",
    path: "/achievements",
    sort_order: 7,
  },
  {
    id: "p-student-certificates",
    module_id: "m-student",
    parent_id: null,
    key: "student_certificates",
    name: "شهاداتي",
    name_en: "My certificates",
    icon: "Award",
    path: "/my-certificates",
    sort_order: 8,
  },
  {
    id: "p-student-schedule",
    module_id: "m-student",
    parent_id: null,
    key: "student_schedule",
    name: "الجدول",
    name_en: "Schedule",
    icon: "Calendar",
    path: "/schedule",
    sort_order: 9,
  },
  {
    id: "p-student-community",
    module_id: "m-student",
    parent_id: null,
    key: "student_community",
    name: "المجتمع",
    name_en: "Community",
    icon: "MessagesSquare",
    path: "/community",
    sort_order: 10,
  },
  {
    id: "p-student-bookmarks",
    module_id: "m-student",
    parent_id: null,
    key: "student_bookmarks",
    name: "المفضلة",
    name_en: "Bookmarks",
    icon: "Bookmark",
    path: "/bookmarks",
    sort_order: 11,
  },
  {
    id: "p-student-referrals",
    module_id: "m-student",
    parent_id: null,
    key: "student_referrals",
    name: "الإحالات",
    name_en: "Referrals",
    icon: "Gift",
    path: "/referrals",
    sort_order: 12,
  },

  // ---- مساحة المعلم ----
  {
    id: "p-teacher-dashboard",
    module_id: "m-teacher",
    parent_id: null,
    key: "teacher_dashboard",
    name: "لوحة المعلم",
    name_en: "Teacher dashboard",
    icon: "LayoutDashboard",
    path: "/teacher/dashboard",
    sort_order: 1,
  },
  {
    id: "p-teacher-courses",
    module_id: "m-teacher",
    parent_id: null,
    key: "teacher_courses",
    name: "دوراتي",
    name_en: "My courses",
    icon: "BookOpen",
    path: "/teacher/courses",
    sort_order: 2,
  },
  {
    id: "p-teacher-content",
    module_id: "m-teacher",
    parent_id: null,
    key: "teacher_content",
    name: "المحتوى",
    name_en: "Content",
    icon: "FileText",
    path: "/teacher/content",
    sort_order: 3,
  },
  {
    id: "p-teacher-quizzes",
    module_id: "m-teacher",
    parent_id: null,
    key: "teacher_quizzes",
    name: "الاختبارات",
    name_en: "Quizzes",
    icon: "FileQuestion",
    path: "/teacher/quizzes",
    sort_order: 4,
  },
  {
    id: "p-teacher-grading",
    module_id: "m-teacher",
    parent_id: null,
    key: "teacher_grading",
    name: "التصحيح",
    name_en: "Grading",
    icon: "CheckSquare",
    path: "/teacher/grading",
    sort_order: 5,
  },
  {
    id: "p-teacher-analytics",
    module_id: "m-teacher",
    parent_id: null,
    key: "teacher_analytics",
    name: "التحليلات",
    name_en: "Analytics",
    icon: "BarChart3",
    path: "/teacher/analytics",
    sort_order: 6,
  },
  {
    id: "p-teacher-earnings",
    module_id: "m-teacher",
    parent_id: null,
    key: "teacher_earnings",
    name: "الأرباح",
    name_en: "Earnings",
    icon: "Wallet",
    path: "/teacher/earnings",
    sort_order: 7,
  },
  {
    id: "p-teacher-community",
    module_id: "m-teacher",
    parent_id: null,
    key: "teacher_community",
    name: "المجتمع",
    name_en: "Community",
    icon: "MessagesSquare",
    path: "/teacher/community",
    sort_order: 8,
  },
  {
    id: "p-teacher-profile-edit",
    module_id: "m-teacher",
    parent_id: null,
    key: "teacher_profile_edit",
    name: "تعديل الملف الشخصي",
    name_en: "Edit profile",
    icon: "UserCog",
    path: "/teacher/profile/edit",
    sort_order: 9,
  },
  {
    id: "p-teacher-settings",
    module_id: "m-teacher",
    parent_id: null,
    key: "teacher_settings",
    name: "الإعدادات",
    name_en: "Settings",
    icon: "Settings",
    path: "/teacher/settings",
    sort_order: 10,
  },

  // ---- الإشراف الأكاديمي ----
  {
    id: "p-supervisor-dashboard",
    module_id: "m-supervisor",
    parent_id: null,
    key: "supervisor_dashboard",
    name: "لوحة المشرف",
    name_en: "Supervisor dashboard",
    icon: "LayoutDashboard",
    path: "/supervisor/dashboard",
    sort_order: 1,
  },
  {
    id: "p-supervisor-teachers",
    module_id: "m-supervisor",
    parent_id: null,
    key: "supervisor_teachers",
    name: "المعلمون",
    name_en: "Teachers",
    icon: "Users",
    path: "/supervisor/teachers",
    sort_order: 2,
  },
  {
    id: "p-supervisor-students",
    module_id: "m-supervisor",
    parent_id: null,
    key: "supervisor_students",
    name: "نظرة عامة على الطلاب",
    name_en: "Students overview",
    icon: "GraduationCap",
    path: "/supervisor/students-overview",
    sort_order: 3,
  },
  {
    id: "p-supervisor-reports",
    module_id: "m-supervisor",
    parent_id: null,
    key: "supervisor_reports",
    name: "التقارير",
    name_en: "Reports",
    icon: "FileBarChart",
    path: "/supervisor/reports",
    sort_order: 4,
  },

  // ---- مساحة ولي الأمر ----
  {
    id: "p-parent-report",
    module_id: "m-parent",
    parent_id: null,
    key: "parent_report",
    name: "تقرير الأبناء",
    name_en: "Children report",
    icon: "FileBarChart",
    path: "/parent/report",
    sort_order: 1,
  },
  {
    id: "p-parent-settings",
    module_id: "m-parent",
    parent_id: null,
    key: "parent_settings",
    name: "الإعدادات",
    name_en: "Settings",
    icon: "Settings",
    path: "/parent/settings",
    sort_order: 2,
  },

  // ---- الإدارة (مدير عام) ----
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
    id: "p-content-mgmt",
    module_id: "m-admin",
    parent_id: null,
    key: "admin_content",
    name: "محتوى النظام",
    name_en: "System content",
    icon: "FolderTree",
    path: null,
    sort_order: 3,
  },
  {
    id: "p-pages",
    module_id: "m-admin",
    parent_id: "p-content-mgmt",
    key: "admin_pages",
    name: "الصفحات",
    name_en: "Pages",
    icon: "FileText",
    path: "/admin/pages",
    sort_order: 1,
  },
  {
    id: "p-constants",
    module_id: "m-admin",
    parent_id: "p-content-mgmt",
    key: "admin_constants",
    name: "الثوابت",
    name_en: "Constants",
    icon: "ListTree",
    path: "/admin/constants",
    sort_order: 2,
  },

  // ---- الشؤون الأكاديمية (مدير عام) ----
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
    id: "p-admin-course-catalog",
    module_id: "m-academic",
    parent_id: null,
    key: "admin_course_catalog",
    name: "كتالوج الكورسات العام",
    name_en: "Public course catalog",
    icon: "Store",
    path: "/admin/course-catalog",
    sort_order: 8,
  },

  // ---- الحساب (مشترك بين كل الأدوار) ----
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
    description: "صلاحيات كاملة على المنصة",
    created_at: new Date().toISOString(),
  },
  {
    id: "r-supervisor",
    name: "مشرف أكاديمي",
    description: "متابعة المعلمين والطلاب والتقارير",
    created_at: new Date().toISOString(),
  },
  {
    id: "r-teacher",
    name: "معلم",
    description: "إدارة المحتوى والاختبارات والطلاب",
    created_at: new Date().toISOString(),
  },
  {
    id: "r-parent",
    name: "ولي أمر",
    description: "متابعة تقارير الأبناء",
    created_at: new Date().toISOString(),
  },
  {
    id: "r-student",
    name: "طالب",
    description: "مساحة الطالب: مكتبة، إنجاز، امتحانات",
    created_at: new Date().toISOString(),
  },
];

function pagesForModule(moduleId: string): StaticPageRow[] {
  return PAGES.filter((p) => p.module_id === moduleId);
}

function fullGrant(pages: StaticPageRow[]): string[] {
  return pages.flatMap((p) => PERMISSION_KEYS.map((k) => `${p.id}:${k.key}`));
}

/**
 * مصفوفة الصلاحيات الفعلية لكل دور — بديل جدول role_permissions بـ Supabase.
 * المفتاح: roleId، القيمة: مجموعة "pageId:permissionKey" الممنوحة.
 *
 * - "مدير عام" دايماً كل الصلاحيات على كل شي (بايباس، متل ما كان بالـ SQL
 *   الأصلي: "super admin gets everything").
 * - باقي الأدوار (مشرف/معلم/ولي أمر/طالب) مبدئياً عندها كل الصلاحيات على
 *   مساحتها الخاصة بس (نفس المبدأ يلي كان بالـ seed الأصلي: كل دور له مساحته
 *   المستقلة بالكامل). الأدمن يقدر يقيّدها لاحقاً من شاشة "مصفوفة الصلاحيات"
 *   وبتنحفظ فعلياً (راجع rbac.functions.ts::saveRolePermissions).
 */
export const ROLE_PERMISSION_GRANTS: Record<string, Set<string>> = {
  "r-admin": new Set(fullGrant(PAGES)),
  "r-supervisor": new Set(
    fullGrant([...pagesForModule("m-supervisor"), ...pagesForModule("m-account")]),
  ),
  "r-teacher": new Set(fullGrant([...pagesForModule("m-teacher"), ...pagesForModule("m-account")])),
  "r-parent": new Set(fullGrant([...pagesForModule("m-parent"), ...pagesForModule("m-account")])),
  "r-student": new Set(fullGrant([...pagesForModule("m-student"), ...pagesForModule("m-account")])),
};

// حسابات الدخول السريع (تجريبية محلياً بالكامل — لا اتصال بأي باك اند، راجع
// src/integrations/backend/auth.ts::loginAsDemo). موجودة عشان تقدروا تجربوا
// كل لوحات التحكم الخمسة أثناء التطوير. "الأدمن" الحقيقي (admin@Academia.com)
// هو نفسه u-admin تحت — لما يسجّل دخول فعلي عبر /api/Auth/Login منعامل هويته
// كـ u-admin. باقي الأربعة حسابات وهمية بالكامل.
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
  {
    id: "u-demo-supervisor",
    full_name: "مشرف (تجريبي)",
    email: null,
    phone: null,
    gender: "male",
    avatar_url: null,
    is_active: true,
    role_id: "r-supervisor",
    role_name: "مشرف أكاديمي",
  },
  {
    id: "u-demo-teacher",
    full_name: "معلم (تجريبي)",
    email: null,
    phone: null,
    gender: "male",
    avatar_url: null,
    is_active: true,
    role_id: "r-teacher",
    role_name: "معلم",
  },
  {
    id: "u-demo-parent",
    full_name: "ولي أمر (تجريبي)",
    email: null,
    phone: null,
    gender: "male",
    avatar_url: null,
    is_active: true,
    role_id: "r-parent",
    role_name: "ولي أمر",
  },
  {
    id: "u-demo-student",
    full_name: "طالب (تجريبي)",
    email: null,
    phone: null,
    gender: "male",
    avatar_url: null,
    is_active: true,
    role_id: "r-student",
    role_name: "طالب",
  },
];

export function nextId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}
