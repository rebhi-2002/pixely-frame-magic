import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as USERS, d as getStoredUserId, f as isAuthenticated, o as ROLES, y as roleHome } from "./rbac-static-data-BkN8GGlQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/verify-email-CzFZtfLl.js
async function currentUserHome() {
	if (!isAuthenticated()) return null;
	const userId = getStoredUserId() ?? "u-admin";
	const user = USERS.find((u) => u.id === userId);
	const role = user ? ROLES.find((r) => r.id === user.role_id) : null;
	const isAdmin = role?.name === "مدير عام";
	return roleHome(role?.name, isAdmin);
}
var $$splitComponentImporter = () => import("./verify-email-iH1hz0si.mjs");
var title = "تفعيل الحساب | أكاديميا";
var description = "فعّل حسابك في أكاديميا من الرابط المرسل إلى بريدك.";
var Route = createFileRoute("/verify-email")({
	ssr: false,
	validateSearch: (search) => ({ email: typeof search.email === "string" ? search.email : void 0 }),
	head: () => ({ meta: [
		{ title },
		{
			name: "description",
			content: description
		},
		{
			name: "robots",
			content: "noindex"
		},
		{
			property: "og:title",
			content: title
		},
		{
			property: "og:description",
			content: description
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { currentUserHome as n, Route as t };
