export const PERMISSION_ORDER = [
  "view_list",
  "show_add_form",
  "execute_add",
  "edit",
  "delete",
  "view_profile",
  "edit_profile",
  "show_password_form",
  "change_password",
] as const;

export type PermissionKey = (typeof PERMISSION_ORDER)[number] | string;

/**
 * ترجمة عرضية مؤقتة (frontend-only) لتسميات الصلاحيات — جدول `permission_keys`
 * بقاعدة البيانات ما فيه عمود إنجليزي (`label_en`) حالياً. مبنية على المفتاح
 * الثابت (`key`) مش على نص `label`، فهي آمنة وما بتتأثر لو تغيّر نص العرض العربي.
 * تُحذف تلقائياً بمجرد ما الباك إند يضيف `label_en` (استبدل بـ`bi(label, labelEn)`).
 */
export const PERMISSION_LABEL_EN: Record<string, string> = {
  view_list: "View list",
  show_add_form: "Show add form",
  execute_add: "Create",
  edit: "Edit",
  delete: "Delete",
  view_profile: "View profile",
  edit_profile: "Edit profile",
  show_password_form: "Show password form",
  change_password: "Change password",
};

/**
 * ترجمة عرضية مؤقتة (frontend-only) لأسماء الأدوار — جدول `roles` ما فيه عمود
 * `name_en` حالياً (بخلاف `modules`/`pages` اللي فيهم). تُحذف بمجرد ما الباك إند
 * يضيف العمود.
 */
export const ROLE_NAME_EN: Record<string, string> = {
  طالب: "Student",
  معلم: "Teacher",
  "ولي أمر": "Parent",
  "مشرف أكاديمي": "Academic Supervisor",
  "مدير عام": "General Admin",
};

export interface PermissionKeyRow {
  key: string;
  label: string;
  sort_order: number;
}

export interface AccessPage {
  id: string;
  key: string;
  name: string;
  nameEn: string;
  icon: string;
  path: string | null;
  permissions: string[];
  /** هل مُنح الدور صلاحية «عرض» لهذه الصفحة (يحدّد ظهورها في التنقّل). */
  canView?: boolean;
  children: AccessPage[];
}

export interface AccessModule {
  id: string;
  key: string;
  name: string;
  nameEn: string;
  icon: string;
  pages: AccessPage[];
}

/** نطاق الوحدات لكل دور — كل مستخدم يرى مساحته فقط (لا مساحات الأدوار الأخرى). */
export const ROLE_MODULE_SCOPE: Record<string, readonly string[]> = {
  طالب: ["student", "shared"],
  معلم: ["teacher", "shared"],
  "ولي أمر": ["parent", "shared"],
  "مشرف أكاديمي": ["supervisor", "shared"],
  "مدير عام": ["platform", "shared"],
};

export interface MyAccess {
  userId: string;
  isAdmin: boolean;
  profile: {
    id: string;
    full_name: string;
    email: string | null;
    avatar_url: string | null;
    role_id: string | null;
    role_name: string | null;
  } | null;
  modules: AccessModule[];
  /** pageKey -> granted permission keys (already intersected with enabled modules) */
  permissions: Record<string, string[]>;
}

export interface TreePage {
  id: string;
  key: string;
  name: string;
  nameEn: string;
  icon: string;
  path: string | null;
  children: TreePage[];
}

export interface TreeModule {
  id: string;
  key: string;
  name: string;
  nameEn: string;
  icon: string;
  enabled: boolean;
  pages: TreePage[];
}

export interface PermissionMatrix {
  roleId: string;
  roleName: string;
  modules: TreeModule[];
  permissionKeys: PermissionKeyRow[];
  /** `${pageId}:${permissionKey}` */
  granted: string[];
}

export interface ModuleRow {
  id: string;
  key: string;
  name: string;
  nameEn: string;
  icon: string;
  enabled: boolean;
  sort_order: number;
}

export interface RoleRow {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
}

export interface UserRow {
  id: string;
  full_name: string;
  email: string | null;
  phone: string | null;
  gender: string;
  avatar_url: string | null;
  is_active: boolean;
  role_id: string | null;
  role_name: string | null;
}

export const GENDER_LABELS: Record<string, string> = {
  male: "ذكر",
  female: "أنثى",
};

export function flattenPages(modules: AccessModule[]) {
  const out: { module: AccessModule; page: AccessPage; parent?: AccessPage }[] = [];
  for (const m of modules) {
    for (const p of m.pages) {
      out.push({ module: m, page: p });
      for (const c of p.children) out.push({ module: m, page: c, parent: p });
    }
  }
  return out;
}
