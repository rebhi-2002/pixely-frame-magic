import { h as createFileRoute, m as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { T as roleHome, _ as isAuthenticated, h as getStoredUserId, l as USERS, m as getStoredProfile, s as ROLES, v as isDemoSession } from "./rbac-static-data-C-KJ3jWh.mjs";
import { i as localeFromSearch, n as createSeoHead } from "./seo-DnbZCAZc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/verify-email-B66dE7nj.js
async function currentUserHome() {
	if (!isAuthenticated()) return null;
	if (!isDemoSession()) {
		const profile = getStoredProfile();
		return roleHome(profile?.roleName ?? null, profile?.roleId === 1);
	}
	const userId = getStoredUserId();
	if (!userId) return "/";
	const user = USERS.find((u) => u.id === userId);
	const role = user ? ROLES.find((r) => r.id === user.role_id) : null;
	const isAdmin = role?.name === "مدير عام";
	return roleHome(role?.name, isAdmin);
}
var $$splitComponentImporter = () => import("./verify-email-BQF2zPgt.mjs");
var Route = createFileRoute("/verify-email")({
	ssr: false,
	validateSearch: (search) => ({ email: typeof search.email === "string" ? search.email : void 0 }),
	head: (ctx) => createSeoHead("/verify-email", localeFromSearch(ctx.match.search)),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { currentUserHome as n, Route as t };
