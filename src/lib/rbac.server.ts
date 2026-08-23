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
import { pageMatchesRole, roleKeyFromName } from "./bi";
import {
  MODULES,
  PAGES,
  PERMISSION_KEYS,
  ROLES,
  ROLE_PERMISSION_GRANTS,
  USERS,
  nextId,
} from "./rbac-static-data";

function resolveUserAndRole(userId: string) {
  const user = USERS.find((u) => u.id === userId) ?? USERS[0] ?? null;
  const role = user ? ROLES.find((r) => r.id === user.role_id) : null;
  const isAdmin = role?.name === "مدير عام";
  return { user, role, isAdmin };
}

/**
 * الأدمن الحقيقي (مدير عام) دايماً بيرجع true. باقي الأدوار (معلم/مشرف/ولي
 * أمر/طالب) — سواء حساب تجريبي محلي أو حساب حقيقي لاحقاً من الباك اند —
 * بيرجع false، وبيتحدد وصولهم عبر ROLE_PERMISSION_GRANTS + pageMatchesRole.
 */
export async function checkIsAdmin(userId: string): Promise<boolean> {
  return resolveUserAndRole(userId).isAdmin;
}

export async function loadAccess(userId: string): Promise<MyAccess> {
  const { user, role, isAdmin } = resolveUserAndRole(userId);
  const allPermKeys = PERMISSION_KEYS.map((p) => p.key);
  const sessionRoleKey = roleKeyFromName(role?.name, isAdmin);
  const grantedSet = isAdmin ? null : (ROLE_PERMISSION_GRANTS[role?.id ?? ""] ?? new Set<string>());

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
          const roleOk = pageMatchesRole(p.key, sessionRoleKey);
          const perms = isAdmin
            ? allPermKeys
            : roleOk
              ? allPermKeys.filter((k) => grantedSet?.has(`${p.id}:${k}`))
              : [];
          return {
            id: p.id,
            key: p.key,
            name: p.name,
            nameEn: p.name_en,
            icon: p.icon,
            path: p.path,
            permissions: perms,
            canView: perms.includes("view_list"),
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
 * تحقّق صلاحية على مستوى السيرفر لإجراءات "الإدارة" (صفحات admin_*) — مقصورة
 * على دور "مدير عام" فقط، بغض النظر عن ROLE_PERMISSION_GRANTS لباقي الأدوار
 * (هيدول عندهم صلاحيات على مساحتهم الخاصة بس، مش على شاشات إدارة النظام).
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

/**
 * تحقّق صلاحية لإجراءات "مساحة الدور" (صفحات بادئتها student_ أو teacher_
 * أو parent_ أو supervisor_) — بعكس requirePermission (المقصورة على admin_
 * بس)، هاي بتسمح لصاحب الدور نفسه يدير بيانات مساحته حسب ROLE_PERMISSION_GRANTS
 * (نفس المصفوفة يلي شاشة "مصفوفة الصلاحيات" بتعدّلها). الأدمن دايماً مسموحله.
 */
export async function requirePageAction(
  userId: string,
  pageKey: string,
  permissionKey: string,
): Promise<void> {
  const { role, isAdmin } = resolveUserAndRole(userId);
  if (isAdmin) return;
  const roleKey = roleKeyFromName(role?.name, isAdmin);
  const page = PAGES.find((p) => p.key === pageKey);
  const granted = role ? ROLE_PERMISSION_GRANTS[role.id] : undefined;
  if (!page || !pageMatchesRole(pageKey, roleKey) || !granted?.has(`${page.id}:${permissionKey}`)) {
    throw new Error("ليس لديك صلاحية لتنفيذ هذا الإجراء");
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

  // "مدير عام" دايماً كل الصلاحيات (بايباس ثابت). باقي الأدوار بتُقرأ من
  // ROLE_PERMISSION_GRANTS — المخزن الفعلي يلي saveRolePermissions بيكتب
  // فيه (راجع src/lib/rbac.functions.ts).
  const granted =
    role.name === "مدير عام"
      ? PAGES.flatMap((p) => PERMISSION_KEYS.map((k) => `${p.id}:${k.key}`))
      : Array.from(ROLE_PERMISSION_GRANTS[role.id] ?? []);

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

export { MODULES, PAGES, ROLES, ROLE_PERMISSION_GRANTS, USERS, nextId };
