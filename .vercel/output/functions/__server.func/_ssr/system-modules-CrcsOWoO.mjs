import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { w as useBi } from "./rbac-static-data-g2eybyR5.mjs";
import { n as useServerFn } from "./createSsrRpc-wq0ICmoa.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { d as useAccess, i as listModules, l as setModuleEnabled, t as ACCESS_QUERY_KEY } from "./use-access-C_0mcNbc.mjs";
import { n as Guard } from "./guard-DmupFA9_.mjs";
import { H as LoaderCircle } from "../_libs/lucide-react.mjs";
import { t as DynamicIcon } from "./dynamic-icon-C1Jx44Mm.mjs";
import { t as PageHeader } from "./page-header-V7EDYBIx.mjs";
import { t as Switch } from "./switch-Cn1w-cIH.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/system-modules-CrcsOWoO.js
var import_jsx_runtime = require_jsx_runtime();
function SystemModulesPage() {
	const queryClient = useQueryClient();
	const { can } = useAccess();
	const bi = useBi();
	const fetchModules = useServerFn(listModules);
	const toggle = useServerFn(setModuleEnabled);
	const { data, isLoading } = useQuery({
		queryKey: ["modules"],
		queryFn: () => fetchModules()
	});
	const mutation = useMutation({
		mutationFn: (vars) => toggle({ data: vars }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["modules"] });
			queryClient.invalidateQueries({ queryKey: ACCESS_QUERY_KEY });
			toast.success(bi("تم حفظ حالة الوحدة", "Module status saved"));
		},
		onError: (e) => toast.error(e instanceof Error ? e.message : bi("تعذّر الحفظ", "Failed to save"))
	});
	const editable = can("admin_settings", "edit");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: bi("وحدات النظام", "System modules"),
		icon: "ToggleRight"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-4 text-sm text-muted-foreground",
			children: bi("كل صف يمثّل وحدة نظام كاملة. تعطيل الوحدة يُخفيها فوراً من القائمة الجانبية لكل المستخدمين مهما كانت صلاحياتهم الفردية.", "Each row is a whole system module. Disabling it hides it instantly from every user's sidebar, regardless of their individual permissions.")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-hidden rounded-2xl bg-card",
			children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex justify-center p-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-5 animate-spin text-primary" })
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full text-start text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-b border-border text-xs text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "w-16 px-4 py-3 font-semibold",
							children: "#"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 font-semibold",
							children: bi("الاسم", "Name")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "w-32 px-4 py-3 font-semibold",
							children: bi("الحالة", "Status")
						})
					]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: (data ?? []).map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-b border-border/60 last:border-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 text-muted-foreground",
							children: i + 1
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-2 font-semibold text-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DynamicIcon, {
									name: m.icon,
									className: "size-4 text-muted-foreground"
								}), bi(m.name, m.nameEn)]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
								checked: m.enabled,
								disabled: !editable || mutation.isPending,
								onCheckedChange: (checked) => mutation.mutate({
									id: m.id,
									enabled: checked
								}),
								"aria-label": bi(`تفعيل ${m.name}`, `Enable ${m.nameEn}`)
							})
						})
					]
				}, m.id)) })]
			})
		})]
	})] });
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Guard, {
	pageKey: "admin_settings",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SystemModulesPage, {})
});
//#endregion
export { SplitComponent as component };
