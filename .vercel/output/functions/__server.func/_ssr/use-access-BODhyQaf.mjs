import { T as pageMatchesRole, a as PERMISSION_KEYS, b as isRealAdmin, g as getStoredUserId, h as getStoredProfile, i as PAGES, k as roleKeyFromName, r as MODULES, y as isDemoSession } from "./rbac-static-data-6lJhuenE.mjs";
import { i as useQueryClient, n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { r as createServerFn } from "./server-CA7E05d5.mjs";
import { n as useServerFn, t as createSsrRpc } from "./createSsrRpc-ByxigA6S.mjs";
import { t as requireAuth } from "./auth-middleware-qbhkJF0k.mjs";
import { i as literalType, n as booleanType, o as objectType, r as enumType, s as stringType, t as arrayType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-access-BODhyQaf.js
var getMyAccess = createServerFn({ method: "GET" }).middleware([requireAuth]).handler(createSsrRpc("3b35a01bd5c939e1ccf817ef8e2d95da72450be263e4c90b0ec119cae61c4641"));
var listModules = createServerFn({ method: "GET" }).middleware([requireAuth]).handler(createSsrRpc("43f41e9156f8f037555e9dde5fef858265ce8ecc9d8a8e424f7ceaa811d511d9"));
var setModuleEnabled = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({
	id: stringType(),
	enabled: booleanType()
}).parse(input)).handler(createSsrRpc("946dd497c24bf8d36254653c7f41eb3d5c7377b174d4b5fced729318b6d150b3"));
var listRoles = createServerFn({ method: "GET" }).middleware([requireAuth]).handler(createSsrRpc("b3e7240a64b294422dcd5dc2f87014a45ea44a13d7c9e4717eb196e88a6389d0"));
var saveRole = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({
	id: stringType().optional(),
	name: stringType().trim().min(2, "الاسم قصير جداً"),
	description: stringType().trim().max(300).optional().nullable()
}).parse(input)).handler(createSsrRpc("79443092956277e07f294e87b21a2dc66b35872b2a71ae0752e0d3e8b9670af7"));
var deleteRole = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({ id: stringType() }).parse(input)).handler(createSsrRpc("68aa14d1b8034aca3740719a1ab75f8f755273a3c48e773af9075eae27b70a63"));
var getPermissionMatrix = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({ roleId: stringType() }).parse(input)).handler(createSsrRpc("b96d976207999c28e41d8af45ef68eaa7e9d2d837ff307cca736138c69ef0afe"));
var saveRolePermissions = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({
	roleId: stringType(),
	granted: arrayType(stringType()).max(5e3)
}).parse(input)).handler(createSsrRpc("91fba1d53d7effe772a1fa2acf1f20d3554f899c639ea07320f087ddb255d93f"));
var listUsers = createServerFn({ method: "GET" }).middleware([requireAuth]).handler(createSsrRpc("aa03dc8fb833649809fc141180e8f16874028bb0aadb8fd3c37e781f5def72bd"));
createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({
	id: stringType().optional(),
	full_name: stringType().trim().min(2, "الاسم قصير جداً"),
	email: stringType().trim().email("بريد غير صالح").optional().or(literalType("")),
	phone: stringType().trim().max(30).optional().or(literalType("")),
	gender: enumType(["male", "female"]),
	role_id: stringType().nullable().optional(),
	is_active: booleanType().default(true)
}).parse(input)).handler(createSsrRpc("9a293f22c1bb39dae946a749d672812445a9e07dd3f6db07865944bcf6a30ad0"));
createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({
	id: stringType(),
	is_active: booleanType()
}).parse(input)).handler(createSsrRpc("fb205e7a8e34b724348b4faafceec9ce36f492599bcf26b52c047b11a927ad9b"));
createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({ id: stringType() }).parse(input)).handler(createSsrRpc("8f956e8410d327174a5b573b64cfb8eb2c059f590228898ac9af3f642e4c773c"));
createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({
	id: stringType(),
	redirectTo: stringType().url()
}).parse(input)).handler(createSsrRpc("7f66dcc378b0c1dafb40cfa8380bc2b145f6c0b5ae45591233e0d87fbd6136ca"));
/**
* تعديل ذاتي — كل مستخدم (أي دور) يقدر يعدّل اسمه/بريده الخاص فقط، بعكس
* saveUser فوق (مقصورة على الأدمن، وبتقدر تعدّل أي مستخدم). نفس بيانات
* USERS بالضبط — تعديلك هون بينعكس مباشرة بشاشة "المستخدمون" بلوحة الأدمن.
*/
var updateOwnProfile = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({
	full_name: stringType().trim().min(2, "الاسم قصير جداً"),
	email: stringType().trim().email("بريد غير صالح").optional().or(literalType(""))
}).parse(input)).handler(createSsrRpc("64a40ba867066efd81962cdda0cf7c813fff4f2a9c51dfba7bfd567879f32599"));
function emptyAccess(userId) {
	return {
		userId,
		isAdmin: false,
		profile: null,
		modules: [],
		permissions: {}
	};
}
function buildAccessTree(userId, profile, roleId, roleName, isAdmin, pageAllowed) {
	const allPermKeys = PERMISSION_KEYS.map((p) => p.key);
	const enabledModules = MODULES.filter((m) => m.enabled).sort((a, b) => a.sort_order - b.sort_order);
	const modules = [];
	const permissions = {};
	for (const m of enabledModules) {
		const modulePages = PAGES.filter((p) => p.module_id === m.id).sort((a, b) => a.sort_order - b.sort_order);
		const build = (parentId) => modulePages.filter((p) => p.parent_id === parentId).map((p) => ({
			id: p.id,
			key: p.key,
			name: p.name,
			nameEn: p.name_en,
			icon: p.icon,
			path: p.path,
			permissions: pageAllowed(p.key) ? allPermKeys : [],
			canView: pageAllowed(p.key),
			children: build(p.id)
		}));
		const tree = build(null);
		if (tree.length === 0) continue;
		const collect = (list) => {
			for (const p of list) {
				permissions[p.key] = p.permissions;
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
		profile: {
			id: userId,
			full_name: profile.name,
			email: profile.email,
			avatar_url: profile.avatar,
			role_id: roleId,
			role_name: roleName
		},
		modules,
		permissions
	};
}
function buildFullAdminAccess(userId, profile) {
	return buildAccessTree(userId, profile, "backend-admin", "مدير النظام", true, () => true);
}
/**
* وصول لأي دور حقيقي غير الأدمن (طالب/معلم/ولي أمر) — يُمنح فقط لو تأكدنا
* فعليًا من الدور (roleId جاي من الباك اند، مش افتراض). بيحصر الوصول
* بالصفحات يلي بادئتها تطابق الدور (pageMatchesRole)، بنفس آلية Guard.
*/
function buildRoleAccess(userId, profile, roleId, roleName, roleKey) {
	return buildAccessTree(userId, profile, String(roleId), roleName, false, (pageKey) => pageMatchesRole(pageKey, roleKey));
}
var ACCESS_QUERY_KEY = ["my-access"];
function useAccess() {
	const fetchAccess = useServerFn(getMyAccess);
	const query = useQuery({
		queryKey: ACCESS_QUERY_KEY,
		queryFn: async () => {
			if (isDemoSession()) return fetchAccess();
			const userId = getStoredUserId();
			if (!userId) return emptyAccess("");
			if (isRealAdmin()) {
				const profile = getStoredProfile();
				return buildFullAdminAccess(userId, {
					name: profile?.name ?? "",
					email: profile?.email ?? "",
					avatar: profile?.avatar ?? null
				});
			}
			const profile = getStoredProfile();
			if (profile?.roleId != null && typeof profile.roleId === "number") {
				const roleKey = roleKeyFromName(profile.roleName, false);
				return buildRoleAccess(userId, {
					name: profile.name,
					email: profile.email,
					avatar: profile.avatar ?? null
				}, profile.roleId, profile.roleName ?? "", roleKey);
			}
			return emptyAccess(userId);
		},
		staleTime: 3e4
	});
	const access = query.data;
	const can = (pageKey, permission) => Boolean(access?.permissions[pageKey]?.includes(permission));
	return {
		...query,
		access,
		can
	};
}
function useInvalidateAccess() {
	const queryClient = useQueryClient();
	return () => queryClient.invalidateQueries({ queryKey: ACCESS_QUERY_KEY });
}
//#endregion
export { listRoles as a, saveRolePermissions as c, useAccess as d, useInvalidateAccess as f, listModules as i, setModuleEnabled as l, deleteRole as n, listUsers as o, getPermissionMatrix as r, saveRole as s, ACCESS_QUERY_KEY as t, updateOwnProfile as u };
