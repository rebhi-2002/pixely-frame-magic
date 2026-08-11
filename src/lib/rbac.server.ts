import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import type {
  AccessModule,
  AccessPage,
  MyAccess,
  PermissionMatrix,
  TreeModule,
  TreePage,
  UserRow,
} from "./rbac-types";
import { ROLE_MODULE_SCOPE } from "./rbac-types";

export type DB = SupabaseClient<Database>;

export async function checkIsAdmin(sb: DB, userId: string): Promise<boolean> {
  const { data, error } = await sb.rpc("has_role", {
    _user_id: userId,
    _role: "admin",
  });
  if (error) return false;
  return Boolean(data);
}

interface RawPage {
  id: string;
  module_id: string;
  parent_id: string | null;
  key: string;
  name: string;
  name_en: string | null;
  icon: string;
  path: string | null;
  sort_order: number;
}

interface RawModule {
  id: string;
  key: string;
  name: string;
  name_en: string | null;
  icon: string;
  enabled: boolean;
  sort_order: number;
}

export async function loadAccess(sb: DB, userId: string): Promise<MyAccess> {
  const isAdmin = await checkIsAdmin(sb, userId);

  const [{ data: profileRow }, { data: moduleRows }, { data: pageRows }, { data: permKeys }] =
    await Promise.all([
      sb
        .from("profiles")
        .select("id, full_name, email, avatar_url, role_id, roles(name)")
        .eq("user_id", userId)
        .maybeSingle(),
      sb.from("modules").select("*").order("sort_order"),
      sb.from("pages").select("*").order("sort_order"),
      sb.from("permission_keys").select("key").order("sort_order"),
    ]);

  const roleId = profileRow?.role_id ?? null;
  const roleName =
    (profileRow as unknown as { roles?: { name: string } | null } | null)?.roles?.name ?? null;

  let grants: { page_id: string; permission_key: string }[] = [];
  if (roleId) {
    const { data } = await sb
      .from("role_permissions")
      .select("page_id, permission_key")
      .eq("role_id", roleId);
    grants = data ?? [];
  }

  const allPermKeys = (permKeys ?? []).map((p) => p.key);
  const byPageId = new Map<string, Set<string>>();
  const pages = (pageRows ?? []) as unknown as RawPage[];

  if (isAdmin) {
    for (const p of pages) byPageId.set(p.id, new Set(allPermKeys));
  } else {
    for (const g of grants) {
      if (!byPageId.has(g.page_id)) byPageId.set(g.page_id, new Set());
      byPageId.get(g.page_id)!.add(g.permission_key);
    }
  }

  /* نطاق الدور: المستخدم يرى مساحته فقط ولو كان يملك صلاحيات أوسع في القاعدة. */
  const scope =
    (roleName ? ROLE_MODULE_SCOPE[roleName] : undefined) ??
    (isAdmin ? ROLE_MODULE_SCOPE["مدير عام"] : undefined);

  const enabledModules = ((moduleRows ?? []) as unknown as RawModule[])
    .filter((m) => m.enabled)
    .filter((m) => !scope || scope.includes(m.key));

  const permissions: Record<string, string[]> = {};
  const modules: AccessModule[] = [];

  for (const m of enabledModules) {
    const modulePages = pages.filter((p) => p.module_id === m.id);
    const build = (parentId: string | null): AccessPage[] =>
      modulePages
        .filter((p) => p.parent_id === parentId)
        .map((p) => {
          const children = build(p.id);
          const perms = Array.from(byPageId.get(p.id) ?? []);
          return {
            id: p.id,
            key: p.key,
            name: p.name,
            nameEn: p.name_en ?? p.name,
            icon: p.icon,
            path: p.path,
            permissions: perms,
            children,
          };
        })
        .filter((p) => p.permissions.includes("view_list") || p.children.length > 0);

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
      nameEn: m.name_en ?? m.name,
      icon: m.icon,
      pages: tree,
    });
  }

  return {
    userId,
    isAdmin,
    profile: profileRow
      ? {
          id: profileRow.id,
          full_name: profileRow.full_name,
          email: profileRow.email,
          avatar_url: profileRow.avatar_url,
          role_id: profileRow.role_id,
          role_name:
            (profileRow as unknown as { roles?: { name: string } | null }).roles?.name ?? null,
        }
      : null,
    modules,
    permissions,
  };
}

/**
 * Server-side enforcement. Both layers must pass: the page's module must be
 * enabled AND the caller's role must hold the permission key.
 */
export async function requirePermission(
  sb: DB,
  userId: string,
  pageKey: string,
  permissionKey: string,
): Promise<void> {
  if (await checkIsAdmin(sb, userId)) return;

  const { data: page } = await sb
    .from("pages")
    .select("id, modules(enabled)")
    .eq("key", pageKey)
    .maybeSingle();

  const moduleEnabled = (page as unknown as { modules?: { enabled: boolean } | null })?.modules
    ?.enabled;
  if (!page || !moduleEnabled) throw new Error("ليس لديك صلاحية للوصول لهذه الوحدة");

  const { data: profile } = await sb
    .from("profiles")
    .select("role_id")
    .eq("user_id", userId)
    .maybeSingle();

  if (!profile?.role_id) throw new Error("ليس لديك صلاحية لتنفيذ هذا الإجراء");

  const { data: grant } = await sb
    .from("role_permissions")
    .select("id")
    .eq("role_id", profile.role_id)
    .eq("page_id", page.id)
    .eq("permission_key", permissionKey)
    .maybeSingle();

  if (!grant) throw new Error("ليس لديك صلاحية لتنفيذ هذا الإجراء");
}

export async function requireAdmin(sb: DB, userId: string): Promise<void> {
  if (!(await checkIsAdmin(sb, userId))) {
    throw new Error("هذا الإجراء متاح لمدير النظام فقط");
  }
}

export async function loadPermissionMatrix(sb: DB, roleId: string): Promise<PermissionMatrix> {
  const [
    { data: role },
    { data: moduleRows },
    { data: pageRows },
    { data: keys },
    { data: grants },
  ] = await Promise.all([
    sb.from("roles").select("id, name").eq("id", roleId).maybeSingle(),
    sb.from("modules").select("*").order("sort_order"),
    sb.from("pages").select("*").order("sort_order"),
    sb.from("permission_keys").select("*").order("sort_order"),
    sb.from("role_permissions").select("page_id, permission_key").eq("role_id", roleId),
  ]);

  if (!role) throw new Error("نوع المستخدم غير موجود");

  const pages = (pageRows ?? []) as RawPage[];
  const modules: TreeModule[] = (moduleRows ?? []).map((m) => {
    const build = (parentId: string | null): TreePage[] =>
      pages
        .filter((p) => p.module_id === m.id && p.parent_id === parentId)
        .map((p) => ({
          id: p.id,
          key: p.key,
          name: p.name,
          icon: p.icon,
          path: p.path,
          children: build(p.id),
        }));
    return {
      id: m.id,
      key: m.key,
      name: m.name,
      icon: m.icon,
      enabled: m.enabled,
      pages: build(null),
    };
  });

  return {
    roleId: role.id,
    roleName: role.name,
    modules,
    permissionKeys: keys ?? [],
    granted: (grants ?? []).map((g) => `${g.page_id}:${g.permission_key}`),
  };
}

export async function loadUsers(sb: DB): Promise<UserRow[]> {
  const { data, error } = await sb
    .from("profiles")
    .select("id, full_name, email, phone, gender, avatar_url, is_active, role_id, roles(name)")
    .order("created_at", { ascending: true });

  if (error) throw new Error(error.message);

  return (data ?? []).map((row) => ({
    id: row.id,
    full_name: row.full_name,
    email: row.email,
    phone: row.phone,
    gender: row.gender,
    avatar_url: row.avatar_url,
    is_active: row.is_active,
    role_id: row.role_id,
    role_name: (row as unknown as { roles?: { name: string } | null }).roles?.name ?? null,
  }));
}
