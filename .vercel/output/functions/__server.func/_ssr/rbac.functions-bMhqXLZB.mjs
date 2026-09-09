import {
  C as nextId,
  c as ROLE_PERMISSION_GRANTS,
  l as USERS,
  r as MODULES,
  s as ROLES,
} from "./rbac-static-data-Bv6QEjHq.mjs";
import { r as createServerFn } from "./server-EBKWEHZn.mjs";
import { t as requireAuth } from "./auth-middleware-yb1wlLWh.mjs";
import {
  i as literalType,
  n as booleanType,
  o as objectType,
  r as enumType,
  s as stringType,
  t as arrayType,
} from "../_libs/zod.mjs";
import {
  a as requireAdmin,
  i as loadUsers,
  n as loadAccess,
  o as requirePageAction,
  r as loadPermissionMatrix,
  s as requirePermission,
  t as createServerRpc,
} from "./rbac.server-CL_Sz4LS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/rbac.functions-bMhqXLZB.js
var getMyAccess_createServerFn_handler = createServerRpc(
  {
    id: "3b35a01bd5c939e1ccf817ef8e2d95da72450be263e4c90b0ec119cae61c4641",
    name: "getMyAccess",
    filename: "src/lib/rbac.functions.ts",
  },
  (opts) => getMyAccess.__executeServer(opts),
);
var getMyAccess = createServerFn({ method: "GET" })
  .middleware([requireAuth])
  .handler(getMyAccess_createServerFn_handler, async ({ context }) => loadAccess(context.userId));
var listModules_createServerFn_handler = createServerRpc(
  {
    id: "43f41e9156f8f037555e9dde5fef858265ce8ecc9d8a8e424f7ceaa811d511d9",
    name: "listModules",
    filename: "src/lib/rbac.functions.ts",
  },
  (opts) => listModules.__executeServer(opts),
);
var listModules = createServerFn({ method: "GET" })
  .middleware([requireAuth])
  .handler(listModules_createServerFn_handler, async ({ context }) => {
    await requirePermission(context.userId, "admin_settings", "view_list");
    return MODULES.slice()
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((m) => ({ ...m }));
  });
var setModuleEnabled_createServerFn_handler = createServerRpc(
  {
    id: "946dd497c24bf8d36254653c7f41eb3d5c7377b174d4b5fced729318b6d150b3",
    name: "setModuleEnabled",
    filename: "src/lib/rbac.functions.ts",
  },
  (opts) => setModuleEnabled.__executeServer(opts),
);
var setModuleEnabled = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) =>
    objectType({
      id: stringType(),
      enabled: booleanType(),
    }).parse(input),
  )
  .handler(setModuleEnabled_createServerFn_handler, async ({ data, context }) => {
    await requirePermission(context.userId, "admin_settings", "edit");
    const m = MODULES.find((mod) => mod.id === data.id);
    if (!m) throw new Error("الوحدة غير موجودة");
    m.enabled = data.enabled;
    return { ok: true };
  });
var listRoles_createServerFn_handler = createServerRpc(
  {
    id: "b3e7240a64b294422dcd5dc2f87014a45ea44a13d7c9e4717eb196e88a6389d0",
    name: "listRoles",
    filename: "src/lib/rbac.functions.ts",
  },
  (opts) => listRoles.__executeServer(opts),
);
var listRoles = createServerFn({ method: "GET" })
  .middleware([requireAuth])
  .handler(listRoles_createServerFn_handler, async ({ context }) => {
    await requirePermission(context.userId, "admin_roles", "view_list");
    return ROLES.slice();
  });
var saveRole_createServerFn_handler = createServerRpc(
  {
    id: "79443092956277e07f294e87b21a2dc66b35872b2a71ae0752e0d3e8b9670af7",
    name: "saveRole",
    filename: "src/lib/rbac.functions.ts",
  },
  (opts) => saveRole.__executeServer(opts),
);
var saveRole = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) =>
    objectType({
      id: stringType().optional(),
      name: stringType().trim().min(2, "الاسم قصير جداً"),
      description: stringType().trim().max(300).optional().nullable(),
    }).parse(input),
  )
  .handler(saveRole_createServerFn_handler, async ({ data, context }) => {
    await requirePermission(context.userId, "admin_roles", data.id ? "edit" : "execute_add");
    if (data.id) {
      const role = ROLES.find((r) => r.id === data.id);
      if (!role) throw new Error("نوع المستخدم غير موجود");
      role.name = data.name;
      role.description = data.description ?? null;
    } else
      ROLES.push({
        id: nextId("r"),
        name: data.name,
        description: data.description ?? null,
        created_at: /* @__PURE__ */ new Date().toISOString(),
      });
    return { ok: true };
  });
var deleteRole_createServerFn_handler = createServerRpc(
  {
    id: "68aa14d1b8034aca3740719a1ab75f8f755273a3c48e773af9075eae27b70a63",
    name: "deleteRole",
    filename: "src/lib/rbac.functions.ts",
  },
  (opts) => deleteRole.__executeServer(opts),
);
var deleteRole = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) => objectType({ id: stringType() }).parse(input))
  .handler(deleteRole_createServerFn_handler, async ({ data, context }) => {
    await requirePermission(context.userId, "admin_roles", "delete");
    const idx = ROLES.findIndex((r) => r.id === data.id);
    if (idx !== -1) ROLES.splice(idx, 1);
    delete ROLE_PERMISSION_GRANTS[data.id];
    return { ok: true };
  });
var getPermissionMatrix_createServerFn_handler = createServerRpc(
  {
    id: "b96d976207999c28e41d8af45ef68eaa7e9d2d837ff307cca736138c69ef0afe",
    name: "getPermissionMatrix",
    filename: "src/lib/rbac.functions.ts",
  },
  (opts) => getPermissionMatrix.__executeServer(opts),
);
var getPermissionMatrix = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) => objectType({ roleId: stringType() }).parse(input))
  .handler(getPermissionMatrix_createServerFn_handler, async ({ data, context }) => {
    await requirePermission(context.userId, "admin_roles", "view_list");
    return loadPermissionMatrix(data.roleId);
  });
var saveRolePermissions_createServerFn_handler = createServerRpc(
  {
    id: "91fba1d53d7effe772a1fa2acf1f20d3554f899c639ea07320f087ddb255d93f",
    name: "saveRolePermissions",
    filename: "src/lib/rbac.functions.ts",
  },
  (opts) => saveRolePermissions.__executeServer(opts),
);
var saveRolePermissions = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) =>
    objectType({
      roleId: stringType(),
      granted: arrayType(stringType()).max(5e3),
    }).parse(input),
  )
  .handler(saveRolePermissions_createServerFn_handler, async ({ data, context }) => {
    await requireAdmin(context.userId);
    const role = ROLES.find((r) => r.id === data.roleId);
    if (!role) throw new Error("نوع المستخدم غير موجود");
    if (role.name === "مدير عام")
      return {
        ok: true,
        count: data.granted.length,
      };
    ROLE_PERMISSION_GRANTS[data.roleId] = new Set(data.granted);
    return {
      ok: true,
      count: data.granted.length,
    };
  });
var listUsers_createServerFn_handler = createServerRpc(
  {
    id: "aa03dc8fb833649809fc141180e8f16874028bb0aadb8fd3c37e781f5def72bd",
    name: "listUsers",
    filename: "src/lib/rbac.functions.ts",
  },
  (opts) => listUsers.__executeServer(opts),
);
var listUsers = createServerFn({ method: "GET" })
  .middleware([requireAuth])
  .handler(listUsers_createServerFn_handler, async ({ context }) => {
    await requirePermission(context.userId, "admin_users", "view_list");
    return loadUsers();
  });
var saveUser_createServerFn_handler = createServerRpc(
  {
    id: "9a293f22c1bb39dae946a749d672812445a9e07dd3f6db07865944bcf6a30ad0",
    name: "saveUser",
    filename: "src/lib/rbac.functions.ts",
  },
  (opts) => saveUser.__executeServer(opts),
);
var saveUser = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) =>
    objectType({
      id: stringType().optional(),
      full_name: stringType().trim().min(2, "الاسم قصير جداً"),
      email: stringType().trim().email("بريد غير صالح").optional().or(literalType("")),
      phone: stringType().trim().max(30).optional().or(literalType("")),
      gender: enumType(["male", "female"]),
      role_id: stringType().nullable().optional(),
      is_active: booleanType().default(true),
    }).parse(input),
  )
  .handler(saveUser_createServerFn_handler, async ({ data, context }) => {
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
    } else
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
    return { ok: true };
  });
var toggleUserStatus_createServerFn_handler = createServerRpc(
  {
    id: "fb205e7a8e34b724348b4faafceec9ce36f492599bcf26b52c047b11a927ad9b",
    name: "toggleUserStatus",
    filename: "src/lib/rbac.functions.ts",
  },
  (opts) => toggleUserStatus.__executeServer(opts),
);
var toggleUserStatus = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) =>
    objectType({
      id: stringType(),
      is_active: booleanType(),
    }).parse(input),
  )
  .handler(toggleUserStatus_createServerFn_handler, async ({ data, context }) => {
    await requirePermission(context.userId, "admin_users", "edit");
    const user = USERS.find((u) => u.id === data.id);
    if (!user) throw new Error("المستخدم غير موجود");
    user.is_active = data.is_active;
    return { ok: true };
  });
var deleteUser_createServerFn_handler = createServerRpc(
  {
    id: "8f956e8410d327174a5b573b64cfb8eb2c059f590228898ac9af3f642e4c773c",
    name: "deleteUser",
    filename: "src/lib/rbac.functions.ts",
  },
  (opts) => deleteUser.__executeServer(opts),
);
var deleteUser = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) => objectType({ id: stringType() }).parse(input))
  .handler(deleteUser_createServerFn_handler, async ({ data, context }) => {
    await requirePermission(context.userId, "admin_users", "delete");
    const idx = USERS.findIndex((u) => u.id === data.id);
    if (idx !== -1) USERS.splice(idx, 1);
    return { ok: true };
  });
var sendPasswordReset_createServerFn_handler = createServerRpc(
  {
    id: "7f66dcc378b0c1dafb40cfa8380bc2b145f6c0b5ae45591233e0d87fbd6136ca",
    name: "sendPasswordReset",
    filename: "src/lib/rbac.functions.ts",
  },
  (opts) => sendPasswordReset.__executeServer(opts),
);
var sendPasswordReset = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) =>
    objectType({
      id: stringType(),
      redirectTo: stringType().url(),
    }).parse(input),
  )
  .handler(sendPasswordReset_createServerFn_handler, async ({ data, context }) => {
    await requirePermission(context.userId, "admin_users", "change_password");
    if (!USERS.find((u) => u.id === data.id)?.email)
      throw new Error("لا يوجد بريد إلكتروني لهذا المستخدم");
    throw new Error("إرسال رابط إعادة تعيين كلمة المرور غير متاح بعد — قيد ربطه بالباك اند الجديد");
  });
var updateOwnProfile_createServerFn_handler = createServerRpc(
  {
    id: "64a40ba867066efd81962cdda0cf7c813fff4f2a9c51dfba7bfd567879f32599",
    name: "updateOwnProfile",
    filename: "src/lib/rbac.functions.ts",
  },
  (opts) => updateOwnProfile.__executeServer(opts),
);
var updateOwnProfile = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) =>
    objectType({
      full_name: stringType().trim().min(2, "الاسم قصير جداً"),
      email: stringType().trim().email("بريد غير صالح").optional().or(literalType("")),
    }).parse(input),
  )
  .handler(updateOwnProfile_createServerFn_handler, async ({ data, context }) => {
    await requirePageAction(context.userId, "account_settings", "edit_profile");
    const user = USERS.find((u) => u.id === context.userId);
    if (!user) throw new Error("المستخدم غير موجود");
    user.full_name = data.full_name;
    user.email = data.email || null;
    return { ok: true };
  });
//#endregion
export {
  deleteRole_createServerFn_handler,
  deleteUser_createServerFn_handler,
  getMyAccess_createServerFn_handler,
  getPermissionMatrix_createServerFn_handler,
  listModules_createServerFn_handler,
  listRoles_createServerFn_handler,
  listUsers_createServerFn_handler,
  saveRolePermissions_createServerFn_handler,
  saveRole_createServerFn_handler,
  saveUser_createServerFn_handler,
  sendPasswordReset_createServerFn_handler,
  setModuleEnabled_createServerFn_handler,
  toggleUserStatus_createServerFn_handler,
  updateOwnProfile_createServerFn_handler,
};
