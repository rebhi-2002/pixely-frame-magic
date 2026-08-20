// نسخة مبنية على بيانات ثابتة (src/lib/rbac-static-data.ts) بدل Supabase.
// نفس أسماء/توقيعات الدوال محفوظة بالضبط حتى ما نضطر نلمس مكوّنات لوحة
// التحكم (modules-manager.tsx / roles-manager.tsx / users-manager.tsx …) —
// هي بتستدعي هالدوال عبر src/lib/rbac.functions.ts بدون ما تعرف مصدر البيانات.

import type {
  AccessModule,
  AccessPage,
  MyAccess,
  PermissionMatrix,
  TreeModule,
  TreePage,
  UserRow,
} from "./rbac-types";
import { MODULES, PAGES, PERMISSION_KEYS, ROLES, USERS, nextId } from "./rbac-static-data";

/**
 * حالياً كل جلسة مسجّلة دخول = أدمن (راجع ملاحظة src/integrations/backend/auth.ts).
 * لما الباك اند يضيف endpoint لبيانات المستخدم/الدور، بدّل هذا التحقق باستدعاء
 * حقيقي بدل `true` الثابتة.
 */
export async function checkIsAdmin(_userId: string): Promise<boolean> {
  return true;
}

export async function loadAccess(userId: string): Promise<MyAccess> {
  const isAdmin = await checkIsAdmin(userId);
  const allPermKeys = PERMISSION_KEYS.map((p) => p.key);

  const enabledModules = MODULES.filter((m) => m.enabled).sort(
    (a, b) => a.sort_order - b.sort_order,
  );

  const modules: AccessModule[] = [];
  const permissions: Record<string, string[]> = {};

  for (const m of enabledModules) {
    const modulePages = PAGES.filter((p) => p.module_id === m.id).sort(
      (a, b) => a.sort_order - b.sort_order,
    );

    const build = (parentId: string | null): AccessPage[] =>
      modulePages
        .filter((p) => p.parent_id === parentId)
        .map((p) => {
          const children = build(p.id);
          const perms = isAdmin ? allPermKeys : [];
          return {
            id: p.id,
            key: p.key,
            name: p.name,
            nameEn: p.name_en,
            icon: p.icon,
            path: p.path,
            permissions: perms,
            canView: isAdmin,
            children,
          };
        })
        .filter((p) => p.canView || p.children.length > 0);

    const tree = build(null);
    if (tree.length === 0) continue;

    const collect = (list: AccessPage[]) => {
      for (const p of list) {
        if (p.permissions.length) permissions[p.key] = p.permissions;
        collect(p.children);
      }
    };
    collect(tree);

    modules.push({
      id: m.id,
      key: m.key,
      name: m.name,
      nameEn: m.nameEn,
      icon: m.icon,
      pages: tree,
    });
  }

  const user = USERS.find((u) => u.id === userId) ?? USERS[0] ?? null;

  return {
    userId,
    isAdmin,
    profile: user
      ? {
          id: user.id,
          full_name: user.full_name,
          email: user.email,
          avatar_url: user.avatar_url,
          role_id: user.role_id,
          role_name: user.role_name,
        }
      : null,
    modules,
    permissions,
  };
}

/**
 * تحقّق صلاحية على مستوى السيرفر. بما إنه حالياً كل جلسة = أدمن، هاي دايماً
 * بتعدّي — أبقيناها كنقطة تجميع واحدة حتى تكون سهلة الاستبدال لاحقاً بتحقق
 * حقيقي مبني على جلسة/دور فعلي من الباك اند.
 */
export async function requirePermission(
  userId: string,
  _pageKey: string,
  _permissionKey: string,
): Promise<void> {
  if (!(await checkIsAdmin(userId))) {
    throw new Error("ليس لديك صلاحية لتنفيذ هذا الإجراء");
  }
}

export async function requireAdmin(userId: string): Promise<void> {
  if (!(await checkIsAdmin(userId))) {
    throw new Error("هذا الإجراء متاح لمدير النظام فقط");
  }
}

export async function loadPermissionMatrix(roleId: string): Promise<PermissionMatrix> {
  const role = ROLES.find((r) => r.id === roleId);
  if (!role) throw new Error("نوع المستخدم غير موجود");

  const modules: TreeModule[] = MODULES.slice()
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((m) => {
      const modulePages = PAGES.filter((p) => p.module_id === m.id);
      const build = (parentId: string | null): TreePage[] =>
        modulePages
          .filter((p) => p.parent_id === parentId)
          .sort((a, b) => a.sort_order - b.sort_order)
          .map((p) => ({
            id: p.id,
            key: p.key,
            name: p.name,
            nameEn: p.name_en,
            icon: p.icon,
            path: p.path,
            children: build(p.id),
          }));
      return {
        id: m.id,
        key: m.key,
        name: m.name,
        nameEn: m.nameEn,
        icon: m.icon,
        enabled: m.enabled,
        pages: build(null),
      };
    });

  // "مدير عام" يملك كل الصلاحيات على كل الصفحات دائماً بهذا النموذج الثابت.
  const granted =
    role.name === "مدير عام"
      ? PAGES.flatMap((p) => PERMISSION_KEYS.map((k) => `${p.id}:${k.key}`))
      : [];

  return {
    roleId: role.id,
    roleName: role.name,
    modules,
    permissionKeys: PERMISSION_KEYS,
    granted,
  };
}

export async function loadUsers(): Promise<UserRow[]> {
  return USERS;
}

export { MODULES, PAGES, ROLES, USERS, nextId };
