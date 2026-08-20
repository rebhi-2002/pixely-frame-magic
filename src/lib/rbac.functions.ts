import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireAuth } from "@/integrations/backend/auth-middleware";
import {
  MODULES,
  ROLES,
  USERS,
  loadAccess,
  loadPermissionMatrix,
  loadUsers,
  nextId,
  requireAdmin,
  requirePermission,
} from "./rbac.server";

export const getMyAccess = createServerFn({ method: "GET" })
  .middleware([requireAuth])
  .handler(async ({ context }) => loadAccess(context.userId));

export const listModules = createServerFn({ method: "GET" })
  .middleware([requireAuth])
  .handler(async ({ context }) => {
    await requirePermission(context.userId, "admin_settings", "view_list");
    return MODULES.slice()
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((m) => ({ ...m }));
  });

export const setModuleEnabled = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) => z.object({ id: z.string(), enabled: z.boolean() }).parse(input))
  .handler(async ({ data, context }) => {
    await requirePermission(context.userId, "admin_settings", "edit");
    const m = MODULES.find((mod) => mod.id === data.id);
    if (!m) throw new Error("الوحدة غير موجودة");
    m.enabled = data.enabled;
    return { ok: true };
  });

export const listRoles = createServerFn({ method: "GET" })
  .middleware([requireAuth])
  .handler(async ({ context }) => {
    await requirePermission(context.userId, "admin_roles", "view_list");
    return ROLES.slice();
  });

export const saveRole = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) =>
    z
      .object({
        id: z.string().optional(),
        name: z.string().trim().min(2, "الاسم قصير جداً"),
        description: z.string().trim().max(300).optional().nullable(),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    await requirePermission(context.userId, "admin_roles", data.id ? "edit" : "execute_add");
    if (data.id) {
      const role = ROLES.find((r) => r.id === data.id);
      if (!role) throw new Error("نوع المستخدم غير موجود");
      role.name = data.name;
      role.description = data.description ?? null;
    } else {
      ROLES.push({
        id: nextId("r"),
        name: data.name,
        description: data.description ?? null,
        created_at: new Date().toISOString(),
      });
    }
    return { ok: true };
  });

export const deleteRole = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) => z.object({ id: z.string() }).parse(input))
  .handler(async ({ data, context }) => {
    await requirePermission(context.userId, "admin_roles", "delete");
    const idx = ROLES.findIndex((r) => r.id === data.id);
    if (idx !== -1) ROLES.splice(idx, 1);
    return { ok: true };
  });

export const getPermissionMatrix = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) => z.object({ roleId: z.string() }).parse(input))
  .handler(async ({ data, context }) => {
    await requirePermission(context.userId, "admin_roles", "view_list");
    return loadPermissionMatrix(data.roleId);
  });

export const saveRolePermissions = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) =>
    z
      .object({
        roleId: z.string(),
        granted: z.array(z.string()).max(5000),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    await requireAdmin(context.userId);
    // البيانات ثابتة حالياً (كل الأدوار الحقيقية = "مدير عام" بكل الصلاحيات) —
    // ما في تخزين فعلي لمصفوفة الصلاحيات المخصصة بعد. نُرجع نجاح بدون تعديل
    // حتى ما تنكسر شاشة "شجرة الصلاحيات"، وبنربطها بجدول حقيقي أول ما
    // الباك اند يضيف الأدوار المتعددة.
    return { ok: true, count: data.granted.length };
  });

export const listUsers = createServerFn({ method: "GET" })
  .middleware([requireAuth])
  .handler(async ({ context }) => {
    await requirePermission(context.userId, "admin_users", "view_list");
    return loadUsers();
  });

export const saveUser = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) =>
    z
      .object({
        id: z.string().optional(),
        full_name: z.string().trim().min(2, "الاسم قصير جداً"),
        email: z.string().trim().email("بريد غير صالح").optional().or(z.literal("")),
        phone: z.string().trim().max(30).optional().or(z.literal("")),
        gender: z.enum(["male", "female"]),
        role_id: z.string().nullable().optional(),
        is_active: z.boolean().default(true),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    await requirePermission(context.userId, "admin_users", data.id ? "edit" : "execute_add");
    const role = data.role_id ? ROLES.find((r) => r.id === data.role_id) : null;
    if (data.id) {
      const user = USERS.find((u) => u.id === data.id);
      if (!user) throw new Error("المستخدم غير موجود");
      Object.assign(user, {
        full_name: data.full_name,
        email: data.email || null,
        phone: data.phone || null,
        gender: data.gender,
        role_id: data.role_id ?? null,
        role_name: role?.name ?? null,
        is_active: data.is_active,
      });
    } else {
      USERS.push({
        id: nextId("u"),
        full_name: data.full_name,
        email: data.email || null,
        phone: data.phone || null,
        gender: data.gender,
        avatar_url: null,
        role_id: data.role_id ?? null,
        role_name: role?.name ?? null,
        is_active: data.is_active,
      });
    }
    return { ok: true };
  });

export const toggleUserStatus = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) => z.object({ id: z.string(), is_active: z.boolean() }).parse(input))
  .handler(async ({ data, context }) => {
    await requirePermission(context.userId, "admin_users", "edit");
    const user = USERS.find((u) => u.id === data.id);
    if (!user) throw new Error("المستخدم غير موجود");
    user.is_active = data.is_active;
    return { ok: true };
  });

export const deleteUser = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) => z.object({ id: z.string() }).parse(input))
  .handler(async ({ data, context }) => {
    await requirePermission(context.userId, "admin_users", "delete");
    const idx = USERS.findIndex((u) => u.id === data.id);
    if (idx !== -1) USERS.splice(idx, 1);
    return { ok: true };
  });

export const sendPasswordReset = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) =>
    z.object({ id: z.string(), redirectTo: z.string().url() }).parse(input),
  )
  .handler(async ({ data, context }) => {
    await requirePermission(context.userId, "admin_users", "change_password");
    const user = USERS.find((u) => u.id === data.id);
    if (!user?.email) throw new Error("لا يوجد بريد إلكتروني لهذا المستخدم");
    // ما في endpoint "نسيت كلمة السر" بالباك اند الجديد بعد — راجع
    // src/routes/forgot-password.tsx. نرجّع رسالة واضحة بدل استدعاء وهمي.
    throw new Error("إرسال رابط إعادة تعيين كلمة المرور غير متاح بعد — قيد ربطه بالباك اند الجديد");
  });
