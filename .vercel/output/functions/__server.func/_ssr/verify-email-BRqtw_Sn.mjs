import { h as createFileRoute, m as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { S as roleHome, g as isAuthenticated, l as USERS, m as getStoredUserId, s as ROLES } from "./rbac-static-data-g2eybyR5.mjs";
import { i as localeFromSearch, n as createSeoHead } from "./seo-Bab-3ZRk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/verify-email-BRqtw_Sn.js
async function currentUserHome() {
	if (!isAuthenticated()) return null;
	const userId = getStoredUserId();
	if (!userId) return "/";
	const user = USERS.find((u) => u.id === userId);
	const role = user ? ROLES.find((r) => r.id === user.role_id) : null;
	const isAdmin = role?.name === "مدير عام";
	return roleHome(role?.name, isAdmin);
}
var $$splitComponentImporter = () => import("./verify-email-fhd8ZSRf.mjs");
var Route = createFileRoute("/verify-email")({
	ssr: false,
	validateSearch: (search) => ({ email: typeof search.email === "string" ? search.email : void 0 }),
	head: (ctx) => createSeoHead("/verify-email", localeFromSearch(ctx.match.search)),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { currentUserHome as n, Route as t };
