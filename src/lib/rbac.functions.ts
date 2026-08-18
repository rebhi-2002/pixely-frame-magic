import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import {
  loadAccess,
  loadPermissionMatrix,
  loadUsers,
  requireAdmin,
  requirePermission,
} from "./rbac.server";

export const getMyAccess = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => loadAccess(context.supabase, context.userId));

export const listModules = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await requirePermission(context.supabase, context.userId, "admin_settings", "view_list");
    const { data, error } = await context.supabase
      .from("modules")
      .select("id, key, name, name_en, icon, enabled, sort_order")
      .order("sort_order");
    if (error) throw new Error(error.message);
    return (data ?? []).map((m) => ({
      id: m.id,
      key: m.key,
      name: m.name,
      nameEn: m.name_en ?? m.name,
      icon: m.icon,
      enabled: m.enabled,
      sort_order: m.sort_order,
    }));
  });

export const setModuleEnabled = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => z.object({ id: z.string().uuid(), enabled: z.boolean() }).parse(input))
  .handler(async ({ data, context }) => {
    await requirePermission(context.supabase, context.userId, "admin_settings", "edit");
    const { error } = await context.supabase
      .from("modules")
      .update({ enabled: data.enabled })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const listRoles = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await requirePermission(context.supabase, context.userId, "admin_roles", "view_list");
    const { data, error } = await context.supabase
      .from("roles")
      .select("id, name, description, created_at")
      .order("created_at");
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const saveRole = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) =>
    z
      .object({
        id: z.string().uuid().optional(),
        name: z.string().trim().min(2, "الاسم قصير جداً"),
        description: z.string().trim().max(300).optional().nullable(),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    await requirePermission(
      context.supabase,
      context.userId,
      "admin_roles",
      data.id ? "edit" : "execute_add",
    );
    const payload = { name: data.name, description: data.description ?? null };
    const query = data.id
      ? context.supabase.from("roles").update(payload).eq("id", data.id)
      : context.supabase.from("roles").insert(payload);
    const { error } = await query;
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deleteRole = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    await requirePermission(context.supabase, context.userId, "admin_roles", "delete");
    const { error } = await context.supabase.from("roles").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const getPermissionMatrix = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => z.object({ roleId: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    await requirePermission(context.supabase, context.userId, "admin_roles", "view_list");
    return loadPermissionMatrix(context.supabase, data.roleId);
  });

export const saveRolePermissions = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) =>
    z
      .object({
        roleId: z.string().uuid(),
        granted: z.array(z.string()).max(5000),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    await requireAdmin(context.supabase, context.userId);

    const rows = data.granted
      .map((entry) => {
        const [pageId, permissionKey] = entry.split(":");
        return { role_id: data.roleId, page_id: pageId, permission_key: permissionKey };
      })
      .filter((r) => r.page_id && r.permission_key);

    const { error: delError } = await context.supabase
      .from("role_permissions")
      .delete()
      .eq("role_id", data.roleId);
    if (delError) throw new Error(delError.message);

    if (rows.length) {
      const { error } = await context.supabase.from("role_permissions").insert(rows);
      if (error) throw new Error(error.message);
    }
    return { ok: true, count: rows.length };
  });

export const addPageToModule = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) =>
    z
      .object({
        moduleId: z.string().uuid(),
        name: z.string().trim().min(2),
        path: z.string().trim().max(120).optional().nullable(),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    await requireAdmin(context.supabase, context.userId);
    const key = `page_${Date.now().toString(36)}`;
    const { error } = await context.supabase.from("pages").insert({
      module_id: data.moduleId,
      key,
      name: data.name,
      icon: "Circle",
      path: data.path || null,
      sort_order: 99,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const listUsers = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await requirePermission(context.supabase, context.userId, "admin_users", "view_list");
    return loadUsers(context.supabase);
  });

export const saveUser = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) =>
    z
      .object({
        id: z.string().uuid().optional(),
        full_name: z.string().trim().min(2, "الاسم قصير جداً"),
        email: z.string().trim().email("بريد غير صالح").optional().or(z.literal("")),
        phone: z.string().trim().max(30).optional().or(z.literal("")),
        gender: z.enum(["male", "female"]),
        role_id: z.string().uuid().nullable().optional(),
        is_active: z.boolean().default(true),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    await requirePermission(
      context.supabase,
      context.userId,
      "admin_users",
      data.id ? "edit" : "execute_add",
    );
    const payload = {
      full_name: data.full_name,
      email: data.email || null,
      phone: data.phone || null,
      gender: data.gender,
      role_id: data.role_id ?? null,
      is_active: data.is_active,
    };
    const query = data.id
      ? context.supabase.from("profiles").update(payload).eq("id", data.id)
      : context.supabase.from("profiles").insert(payload);
    const { error } = await query;
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const toggleUserStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) =>
    z.object({ id: z.string().uuid(), is_active: z.boolean() }).parse(input),
  )
  .handler(async ({ data, context }) => {
    await requirePermission(context.supabase, context.userId, "admin_users", "edit");
    const { error } = await context.supabase
      .from("profiles")
      .update({ is_active: data.is_active })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deleteUser = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    await requirePermission(context.supabase, context.userId, "admin_users", "delete");
    const { error } = await context.supabase.from("profiles").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const sendPasswordReset = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) =>
    z.object({ id: z.string().uuid(), redirectTo: z.string().url() }).parse(input),
  )
  .handler(async ({ data, context }) => {
    await requirePermission(context.supabase, context.userId, "admin_users", "change_password");
    const { data: profile } = await context.supabase
      .from("profiles")
      .select("email")
      .eq("id", data.id)
      .maybeSingle();
    if (!profile?.email) throw new Error("لا يوجد بريد إلكتروني لهذا المستخدم");
    const { error } = await context.supabase.auth.resetPasswordForEmail(profile.email, {
      redirectTo: data.redirectTo,
    });
    if (error) throw new Error(error.message);
    return { ok: true, email: profile.email };
  });
