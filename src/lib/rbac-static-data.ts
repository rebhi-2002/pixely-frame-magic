// بيانات ثابتة (in-memory) لشجرة صفحات/موديولات كل الأدوار الأربعة (مدير عام
// / معلم / ولي أمر / طالب) بلوحات التحكم — تصف بنية القوائم الجانبية فقط
// (تسميات/أيقونات/مسارات)، ومو بيانات وهمية: كل صفحة هون فعلياً موصولة
// بالباك اند الحقيقي (راجع ملف التكامل المطابق تحت src/integrations/backend).
//
// ⚠️ قيم `key` هون لازم تطابق بالضبط قيم `pageKey` المستخدمة فعلياً بمكوّن
// <Guard> داخل كل ملف route — لأن useCanView() و pageMatchesRole() بملف
// src/lib/bi.ts بيتحققوا من نفس النص بالضبط (بادئة الدور: student_ / teacher_
// / parent_ / admin_). لو ضفت صفحة جديدة، خذ الـ pageKey من ملف الـ route
// نفسه ولا تخترع قيمة جديدة.

import type { ModuleRow, PermissionKeyRow } from "./rbac-types";

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
  // مجمّعة بـ3 أقسام منطقية (بدل 13 عنصر مسطّح): لوحة المعلومات تبقى
  // ظاهرة دايمًا كصفحة رئيسية، والباقي مجمّع حسب نية الاستخدام: "أدوات
  // الدراسة" (المحتوى والتدريب اليومي)، "التقدّم والجدول" (تتبّع
  // الإنجاز عبر الوقت)، "المجتمع والمكافآت" (تفاعل اجتماعي ومالي).
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
    name: "كورساتي",
    name_en: "My courses",
    icon: "BookOpen",
    path: "/my-courses",
    sort_order: 2,
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
    sort_order: 3,
  },
  {
    id: "p-student-wallet",
    module_id: "m-student",
    parent_id: null,
    key: "student_wallet",
    name: "محفظتي",
    name_en: "My wallet",
    icon: "Wallet",
    path: "/wallet",
    sort_order: 4,
  },
  {
    id: "p-student-attendance",
    module_id: "m-student",
    parent_id: null,
    key: "student_attendance",
    name: "سجل الحضور",
    name_en: "Attendance",
    icon: "CalendarCheck",
    path: "/attendance",
    sort_order: 5,
  },
  {
    id: "p-student-exam-results",
    module_id: "m-student",
    parent_id: null,
    key: "student_exam_results",
    name: "نتائج الامتحانات",
    name_en: "Exam results",
    icon: "ClipboardCheck",
    path: "/exam-results",
    sort_order: 6,
  },
  {
    id: "p-student-progress",
    module_id: "m-student",
    parent_id: null,
    key: "student_progress",
    name: "التقدم الأكاديمي",
    name_en: "Academic progress",
    icon: "TrendingUp",
    path: "/progress",
    sort_order: 7,
  },

  // ---- مساحة المعلم ----
  // نفس مبدأ تجميع الطالب: لوحة المعلم ظاهرة دايمًا، والباقي بـ3 أقسام
  // حسب سير عمل المعلّم: "التدريس" (إنتاج وتصحيح المحتوى اليومي)،
  // "الأداء" (نتائج وأرباح)، "ملفي المهني" (هوية وتفاعل وإعدادات).
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
    name: "كورساتي",
    name_en: "My courses",
    icon: "BookOpen",
    path: "/teacher/courses",
    sort_order: 2,
  },
  {
    id: "p-teacher-bookings",
    module_id: "m-teacher",
    parent_id: null,
    key: "teacher_bookings",
    name: "طلبات الحجز",
    name_en: "Booking requests",
    icon: "CalendarCheck",
    path: "/teacher/bookings",
    sort_order: 3,
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
    sort_order: 4,
  },
  {
    id: "p-teacher-group-profile",
    module_id: "m-teacher",
    parent_id: null,
    key: "teacher_group_profile",
    name: "ملفي المهني",
    name_en: "My professional profile",
    icon: "UserCog",
    path: null,
    sort_order: 5,
  },
  {
    id: "p-teacher-profile-edit",
    module_id: "m-teacher",
    parent_id: "p-teacher-group-profile",
    key: "teacher_profile_edit",
    name: "تعديل الملف الشخصي",
    name_en: "Edit profile",
    icon: "UserCog",
    path: "/teacher/profile/edit",
    sort_order: 2,
  },
  {
    id: "p-teacher-settings",
    module_id: "m-teacher",
    parent_id: "p-teacher-group-profile",
    key: "teacher_settings",
    name: "الإعدادات",
    name_en: "Settings",
    icon: "Settings",
    path: "/teacher/settings",
    sort_order: 3,
  },

  // ---- الإشراف الأكاديمي ----
  // 4 عناصر بس — مسطّحة عمدًا، مش كل قائمة محتاجة تجميع (لو صارت أكبر
  // بالمستقبل، نفس نمط الطالب/المعلم قابل للتطبيق هون بسهولة).
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
  // ملاحظة: "وحدات النظام" و"الأدوار والصلاحيات" و"مصفوفة الصلاحيات" انحذفوا
  // نهائياً — ما إلهم أي وجود بالباك اند الحقيقي (لا Controller ولا جدول).
  // الشاشة الحقيقية الوحيدة لإدارة الصلاحيات هي "admin_backend_permissions"
  // تحت (تعمل فعلياً على /api/UserPermission).
  //
  // بنية مسطّحة بقصد: كل صفحة تقف لحالها بأعلى مستوى القائمة، وما بنحط صفحة
  // وحيدة جوا مجلّد قابل للطي (تجربة استخدام سيئة — نقرة زيادة لصفحة واحدة).
  // المجلّد الوحيد المتبقي ("إعدادات النظام") فعلاً بيضم أكتر من صفحة مرتبطة.
  {
    id: "p-admin-dashboard",
    module_id: "m-admin",
    parent_id: null,
    key: "admin_dashboard",
    name: "نظرة عامة",
    name_en: "Overview",
    icon: "LayoutDashboard",
    path: "/admin/dashboard",
    sort_order: 1,
  },
  {
    id: "p-users",
    module_id: "m-admin",
    parent_id: null,
    key: "admin_users",
    name: "المستخدمون",
    name_en: "Users",
    icon: "User",
    path: "/admin/users",
    sort_order: 2,
  },
  {
    id: "p-admin-course-catalog",
    // أُعيد ربطها بالكامل بـ/api/Course الحقيقي (Course/GetAll)؛ إنشاء كورس
    // جديد لسا معطّل بانتظار مصدر مواد/صفوف حقيقي (P1-3). راجع الملخص المرفق.
    module_id: "m-admin",
    parent_id: null,
    key: "admin_course_catalog",
    name: "كتالوج الكورسات",
    name_en: "Course catalog",
    icon: "Store",
    path: "/admin/course-catalog",
    sort_order: 3,
  },
  {
    id: "p-admin-payments",
    module_id: "m-admin",
    parent_id: null,
    key: "admin_payments",
    name: "المدفوعات",
    name_en: "Payments",
    icon: "CreditCard",
    path: "/admin/payments",
    sort_order: 4,
  },
  {
    id: "p-backend-permissions",
    module_id: "m-admin",
    parent_id: null,
    key: "admin_backend_permissions",
    name: "صلاحيات الباك اند",
    name_en: "Backend permissions",
    icon: "ShieldCheck",
    path: "/admin/backend-permissions",
    sort_order: 5,
  },
  {
    id: "p-content-mgmt",
    module_id: "m-admin",
    parent_id: null,
    key: "admin_content",
    name: "إعدادات النظام",
    name_en: "System settings",
    icon: "FolderTree",
    path: null,
    sort_order: 6,
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
