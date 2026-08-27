import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { _ as pageMatchesRole, b as roleKeyFromName, x as useBi, y as roleHome } from "./rbac-static-data-BkN8GGlQ.mjs";
import { h as useAccess } from "./use-access-DsjSFy3L.mjs";
import { n as ForbiddenIllustration } from "./illustrations-DxG8Himc.mjs";
import { t as DashboardSkeleton } from "./dashboard-skeleton-CXWjwNnl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/guard-BhjB-ZLB.js
var import_jsx_runtime = require_jsx_runtime();
/** حراسة الصفحة على الواجهة (الحراسة الحقيقية على السيرفر في rbac.server.ts). */
function useCanView(pageKey) {
	const { access, can, isLoading } = useAccess();
	const role = roleKeyFromName(access?.profile?.role_name, access?.isAdmin);
	return {
		loading: isLoading,
		allowed: can(pageKey, "view_list") && pageMatchesRole(pageKey, role),
		access
	};
}
function Forbidden() {
	const bi = useBi();
	const { access } = useAccess();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "surface-mesh flex min-h-screen flex-col items-center justify-center bg-background px-5 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ForbiddenIllustration, { className: "h-32 w-auto" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-xl font-bold text-foreground",
				children: bi("هذه الصفحة ليست جزءاً من مساحتك", "This page is not part of your space")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-md text-sm text-muted-foreground",
				children: bi("دورك الحالي لا يملك صلاحية عرض هذه الصفحة. ارجع إلى مساحتك أو اطلب الصلاحية من الإدارة.", "Your current role cannot view this page. Go back to your space or request access from the admin.")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: roleHome(access?.profile?.role_name, access?.isAdmin),
				className: "btn-shine hover-press mt-6 inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground",
				children: bi("رجوع إلى مساحتي", "Back to my space")
			})
		]
	});
}
function Guard({ pageKey, children }) {
	const { loading, allowed } = useCanView(pageKey);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardSkeleton, {});
	if (!allowed) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Forbidden, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
//#endregion
export { Guard as n, Forbidden as t };
