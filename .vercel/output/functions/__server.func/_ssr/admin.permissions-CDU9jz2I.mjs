import { A as useBi } from "./rbac-static-data-DgiM51a_.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { T as Settings2, tt as LoaderCircle } from "../_libs/lucide-react.mjs";
import { n as useServerFn } from "./createSsrRpc-1tfOdKec.mjs";
import { a as listRoles } from "./use-access-oB6fzdbG.mjs";
import { n as Guard } from "./guard-BiWzjvf6.mjs";
import { t as PageHeader } from "./page-header-D4CknVcT.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.permissions-CDU9jz2I.js
var import_jsx_runtime = require_jsx_runtime();
function PermissionsMatrixPage() {
	const bi = useBi();
	const fetchRoles = useServerFn(listRoles);
	const { data, isLoading } = useQuery({
		queryKey: ["roles"],
		queryFn: () => fetchRoles()
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pb-24",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			icon: "ShieldCheck",
			title: bi("مصفوفة الصلاحيات", "Permission matrix")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "px-4 py-5 md:px-6",
			children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex justify-center py-16",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-6 animate-spin text-primary" })
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
				children: (data ?? []).map((role) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/role-permissions/$roleId",
					params: { roleId: role.id },
					className: "hover-lift group rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary/50",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-base font-bold text-foreground",
							children: role.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid size-9 place-items-center rounded-xl bg-primary/12 text-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings2, { className: "size-4" })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 line-clamp-2 text-sm text-muted-foreground",
						children: role.description || bi("بدون وصف", "No description")
					})]
				}, role.id))
			})
		})]
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Guard, {
	pageKey: "admin_roles",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PermissionsMatrixPage, {})
});
//#endregion
export { SplitComponent as component };
