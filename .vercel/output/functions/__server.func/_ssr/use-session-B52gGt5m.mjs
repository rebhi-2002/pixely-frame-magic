import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as USERS, d as getStoredUserId, f as isAuthenticated, o as ROLES, t as AUTH_EVENT, u as getStoredEmail, y as roleHome } from "./rbac-static-data-BkN8GGlQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-session-B52gGt5m.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var ROLE_KEY_BY_ID = {
	"r-admin": "admin",
	"r-supervisor": "supervisor",
	"r-teacher": "teacher",
	"r-parent": "parent",
	"r-student": "student"
};
function buildSession() {
	if (!isAuthenticated()) return null;
	const userId = getStoredUserId() ?? "u-admin";
	const user = USERS.find((u) => u.id === userId) ?? USERS[0];
	const role = ROLES.find((r) => r.id === user.role_id);
	const isAdmin = role?.name === "مدير عام";
	const email = getStoredEmail() ?? user.email;
	return {
		userId: user.id,
		email,
		fullName: user.full_name,
		avatarUrl: user.avatar_url,
		roleName: role?.name ?? null,
		roleKey: user.role_id && ROLE_KEY_BY_ID[user.role_id] || "student",
		isAdmin,
		home: roleHome(role?.name, isAdmin)
	};
}
/** جلسة المستخدم للصفحات العامة — تُستخدم لتبديل محتوى الهيدر والأزرار. */
function useSession() {
	const [session, setSession] = (0, import_react.useState)(null);
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		const sync = () => {
			setSession(buildSession());
			setIsLoading(false);
		};
		sync();
		window.addEventListener(AUTH_EVENT, sync);
		return () => window.removeEventListener(AUTH_EVENT, sync);
	}, []);
	return {
		session,
		isSignedIn: Boolean(session),
		isLoading
	};
}
//#endregion
export { useSession as t };
