import { i as __toESM } from "../_runtime.mjs";
import { k as isRedirect, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as createServerFn, i as TSS_SERVER_FUNCTION } from "./createServerFn-TbS7u0_2.mjs";
import { t as getServerFnById } from "../__23tanstack-start-server-fn-resolver-yK9ZmGpw.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as requireAuth } from "./auth-middleware-DYL_GR_y.mjs";
import { i as literalType, n as booleanType, o as objectType, r as enumType, s as stringType, t as arrayType } from "../_libs/zod.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-access-DsjSFy3L.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function useServerFn(serverFn) {
	const router = useRouter();
	return import_react.useCallback(async (...args) => {
		try {
			const res = await serverFn(...args);
			if (isRedirect(res)) throw res;
			return res;
		} catch (err) {
			if (isRedirect(err)) {
				err.options._fromLocation = router.stores.location.get();
				return router.navigate(router.resolveRedirect(err).options);
			}
			throw err;
		}
	}, [router, serverFn]);
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
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
var saveUser = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({
	id: stringType().optional(),
	full_name: stringType().trim().min(2, "الاسم قصير جداً"),
	email: stringType().trim().email("بريد غير صالح").optional().or(literalType("")),
	phone: stringType().trim().max(30).optional().or(literalType("")),
	gender: enumType(["male", "female"]),
	role_id: stringType().nullable().optional(),
	is_active: booleanType().default(true)
}).parse(input)).handler(createSsrRpc("9a293f22c1bb39dae946a749d672812445a9e07dd3f6db07865944bcf6a30ad0"));
var toggleUserStatus = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({
	id: stringType(),
	is_active: booleanType()
}).parse(input)).handler(createSsrRpc("fb205e7a8e34b724348b4faafceec9ce36f492599bcf26b52c047b11a927ad9b"));
var deleteUser = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({ id: stringType() }).parse(input)).handler(createSsrRpc("8f956e8410d327174a5b573b64cfb8eb2c059f590228898ac9af3f642e4c773c"));
var sendPasswordReset = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({
	id: stringType(),
	redirectTo: stringType().url()
}).parse(input)).handler(createSsrRpc("7f66dcc378b0c1dafb40cfa8380bc2b145f6c0b5ae45591233e0d87fbd6136ca"));
var ACCESS_QUERY_KEY = ["my-access"];
function useAccess() {
	const fetchAccess = useServerFn(getMyAccess);
	const query = useQuery({
		queryKey: ACCESS_QUERY_KEY,
		queryFn: () => fetchAccess(),
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
//#endregion
export { getPermissionMatrix as a, listUsers as c, saveUser as d, sendPasswordReset as f, useServerFn as g, useAccess as h, deleteUser as i, saveRole as l, toggleUserStatus as m, createSsrRpc as n, listModules as o, setModuleEnabled as p, deleteRole as r, listRoles as s, ACCESS_QUERY_KEY as t, saveRolePermissions as u };
