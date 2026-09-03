import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { D as useBi } from "./rbac-static-data-C-KJ3jWh.mjs";
import { n as useServerFn } from "./createSsrRpc-DYGk39x2.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { d as useAccess } from "./use-access-fcr9Vbpe.mjs";
import { n as Guard } from "./guard-C_ikEg3X.mjs";
import { H as LoaderCircle, gt as Check, l as Trash2, n as X } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-RXwCFfhv.mjs";
import { a as Panel, c as RowList, i as EmptyState, n as Badge, t as AppPage } from "./kit-DDkPK7fJ.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { c as markAllNotificationsRead, l as markNotificationRead, n as deleteNotification, s as listNotifications } from "./account-pages.functions-CjI_AaXK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/notifications-CjizBtNP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function NotificationsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Guard, {
		pageKey: "notifications",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, {})
	});
}
function Body() {
	const bi = useBi();
	const queryClient = useQueryClient();
	const { can } = useAccess();
	const fetchRows = useServerFn(listNotifications);
	const markOne = useServerFn(markNotificationRead);
	const markAll = useServerFn(markAllNotificationsRead);
	const remove = useServerFn(deleteNotification);
	const { data: rows, isLoading } = useQuery({
		queryKey: ["notifications"],
		queryFn: () => fetchRows()
	});
	const invalidate = () => queryClient.invalidateQueries({ queryKey: ["notifications"] });
	const list = rows ?? [];
	const today = (0, import_react.useMemo)(() => list.filter((r) => r.category === "اليوم"), [list]);
	const earlier = (0, import_react.useMemo)(() => list.filter((r) => r.category === "سابقاً"), [list]);
	const newCount = list.filter((r) => r.isNew).length;
	const markOneMutation = useMutation({
		mutationFn: (id) => markOne({ data: { id } }),
		onSuccess: invalidate,
		onError: (e) => toast.error(e instanceof Error ? e.message : bi("تعذّر التحديث", "Failed to update"))
	});
	const markAllMutation = useMutation({
		mutationFn: () => markAll(),
		onSuccess: () => {
			invalidate();
			toast.success(bi("تم تعليم الكل كمقروء", "All marked as read"));
		},
		onError: (e) => toast.error(e instanceof Error ? e.message : bi("تعذّر التحديث", "Failed to update"))
	});
	const deleteMutation = useMutation({
		mutationFn: (id) => remove({ data: { id } }),
		onSuccess: invalidate,
		onError: (e) => toast.error(e instanceof Error ? e.message : bi("تعذّر الحذف", "Failed to delete"))
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppPage, {
		title: bi("الإشعارات", "Notifications"),
		icon: "Bell",
		subtitle: bi("تنبيهات الدراسة والحساب والمراجعات في مكان واحد.", "Study, account, and review alerts in one place."),
		children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex justify-center py-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-6 animate-spin text-primary" })
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			title: bi("اليوم", "Today"),
			icon: "Bell",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					tone: "primary",
					children: newCount
				}), can("notifications", "edit") && newCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					variant: "outline",
					onClick: () => markAllMutation.mutate(),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }), bi("تعليم الكل كمقروء", "Mark all read")]
				})]
			}),
			children: today.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowList, { rows: today.map((n) => ({
				title: n.title,
				meta: n.meta,
				value: n.isNew ? bi("جديد", "New") : void 0,
				tone: n.tone,
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1",
					children: [can("notifications", "edit") && n.isNew && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "icon",
						variant: "ghost",
						onClick: () => markOneMutation.mutate(n.id),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" })
					}), can("notifications", "delete") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "icon",
						variant: "ghost",
						className: "text-destructive",
						onClick: () => deleteMutation.mutate(n.id),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
					})]
				})
			})) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				icon: "Bell",
				text: bi("لا إشعارات اليوم.", "No notifications today.")
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			title: bi("سابقاً", "Earlier"),
			icon: "History",
			children: earlier.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowList, { rows: earlier.map((n) => ({
				title: n.title,
				meta: n.meta,
				value: n.tone === "success" ? bi("إنجاز", "Achievement") : void 0,
				tone: n.tone,
				actions: can("notifications", "delete") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "icon",
					variant: "ghost",
					className: "text-destructive",
					onClick: () => deleteMutation.mutate(n.id),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
				}) : void 0
			})) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				icon: "History",
				text: bi("لا إشعارات سابقة.", "No earlier notifications.")
			})
		})] })
	});
}
//#endregion
export { NotificationsPage as component };
