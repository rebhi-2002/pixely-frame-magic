import { D as roleKeyFromName, a as PERMISSION_KEYS, c as ROLE_PERMISSION_GRANTS, i as PAGES, l as USERS, r as MODULES, s as ROLES, w as pageMatchesRole } from "./rbac-static-data-DgiM51a_.mjs";
import { i as TSS_SERVER_FUNCTION } from "./server-CQPo-kzR.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/rbac.server-CmWGNCpO.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
function resolveUserAndRole(userId) {
	const user = USERS.find((u) => u.id === userId) ?? null;
	const role = user ? ROLES.find((r) => r.id === user.role_id) : null;
	return {
		user,
		role,
		isAdmin: role?.name === "مدير عام"
	};
}
/**
* الأدمن في بيانات demo (مدير عام) دايماً بيرجع true. الحسابات الحقيقية
* القادمة من الباك إند لا تُطابق static users تلقائيًا، ولذلك لا تحصل على دور
* أو صلاحيات من هذا الملف إلى أن يصل عقد موثوق للـrole/permissions.
*/
async function checkIsAdmin(userId) {
	return resolveUserAndRole(userId).isAdmin;
}
async function loadAccess(userId) {
	const { user, role, isAdmin } = resolveUserAndRole(userId);
	if (!user) return {
		userId,
		isAdmin: false,
		profile: null,
		modules: [],
		permissions: {}
	};
	const allPermKeys = PERMISSION_KEYS.map((p) => p.key);
	const sessionRoleKey = roleKeyFromName(role?.name, isAdmin);
	const grantedSet = isAdmin ? null : ROLE_PERMISSION_GRANTS[role?.id ?? ""] ?? /* @__PURE__ */ new Set();
	const enabledModules = MODULES.filter((m) => m.enabled).sort((a, b) => a.sort_order - b.sort_order);
	const modules = [];
	const permissions = {};
	for (const m of enabledModules) {
		const modulePages = PAGES.filter((p) => p.module_id === m.id).sort((a, b) => a.sort_order - b.sort_order);
		const build = (parentId) => modulePages.filter((p) => p.parent_id === parentId).map((p) => {
			const children = build(p.id);
			const roleOk = pageMatchesRole(p.key, sessionRoleKey);
			const perms = isAdmin ? allPermKeys : roleOk ? allPermKeys.filter((k) => grantedSet?.has(`${p.id}:${k}`)) : [];
			return {
				id: p.id,
				key: p.key,
				name: p.name,
				nameEn: p.name_en,
				icon: p.icon,
				path: p.path,
				permissions: perms,
				canView: perms.includes("view_list"),
				children
			};
		}).filter((p) => p.canView || p.children.length > 0);
		const tree = build(null);
		if (tree.length === 0) continue;
		const collect = (list) => {
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
			pages: tree
		});
	}
	return {
		userId,
		isAdmin,
		profile: user ? {
			id: user.id,
			full_name: user.full_name,
			email: user.email,
			avatar_url: user.avatar_url,
			role_id: user.role_id,
			role_name: user.role_name
		} : null,
		modules,
		permissions
	};
}
/**
* تحقّق صلاحية على مستوى السيرفر لإجراءات "الإدارة" (صفحات admin_*) — مقصورة
* على دور "مدير عام" فقط، بغض النظر عن ROLE_PERMISSION_GRANTS لباقي الأدوار
* (هيدول عندهم صلاحيات على مساحتهم الخاصة بس، مش على شاشات إدارة النظام).
*/
async function requirePermission(userId, _pageKey, _permissionKey) {
	if (!await checkIsAdmin(userId)) throw new Error("ليس لديك صلاحية لتنفيذ هذا الإجراء");
}
async function requireAdmin(userId) {
	if (!await checkIsAdmin(userId)) throw new Error("هذا الإجراء متاح لمدير النظام فقط");
}
/**
* تحقّق صلاحية لإجراءات "مساحة الدور" (صفحات بادئتها student_ أو teacher_
* أو parent_ أو supervisor_) — بعكس requirePermission (المقصورة على admin_
* بس)، هاي بتسمح لصاحب الدور نفسه يدير بيانات مساحته حسب ROLE_PERMISSION_GRANTS
* (نفس المصفوفة يلي شاشة "مصفوفة الصلاحيات" بتعدّلها). الأدمن دايماً مسموحله.
*/
async function requirePageAction(userId, pageKey, permissionKey) {
	const { role, isAdmin } = resolveUserAndRole(userId);
	if (isAdmin) return;
	const roleKey = roleKeyFromName(role?.name, isAdmin);
	const page = PAGES.find((p) => p.key === pageKey);
	const granted = role ? ROLE_PERMISSION_GRANTS[role.id] : void 0;
	if (!page || !pageMatchesRole(pageKey, roleKey) || !granted?.has(`${page.id}:${permissionKey}`)) throw new Error("ليس لديك صلاحية لتنفيذ هذا الإجراء");
}
async function loadPermissionMatrix(roleId) {
	const role = ROLES.find((r) => r.id === roleId);
	if (!role) throw new Error("نوع المستخدم غير موجود");
	const modules = MODULES.slice().sort((a, b) => a.sort_order - b.sort_order).map((m) => {
		const modulePages = PAGES.filter((p) => p.module_id === m.id);
		const build = (parentId) => modulePages.filter((p) => p.parent_id === parentId).sort((a, b) => a.sort_order - b.sort_order).map((p) => ({
			id: p.id,
			key: p.key,
			name: p.name,
			nameEn: p.name_en,
			icon: p.icon,
			path: p.path,
			children: build(p.id)
		}));
		return {
			id: m.id,
			key: m.key,
			name: m.name,
			nameEn: m.nameEn,
			icon: m.icon,
			enabled: m.enabled,
			pages: build(null)
		};
	});
	const granted = role.name === "مدير عام" ? PAGES.flatMap((p) => PERMISSION_KEYS.map((k) => `${p.id}:${k.key}`)) : Array.from(ROLE_PERMISSION_GRANTS[role.id] ?? []);
	return {
		roleId: role.id,
		roleName: role.name,
		modules,
		permissionKeys: PERMISSION_KEYS,
		granted
	};
}
async function loadUsers() {
	return USERS;
}
//#endregion
export { requireAdmin as a, loadUsers as i, loadAccess as n, requirePageAction as o, loadPermissionMatrix as r, requirePermission as s, createServerRpc as t };
