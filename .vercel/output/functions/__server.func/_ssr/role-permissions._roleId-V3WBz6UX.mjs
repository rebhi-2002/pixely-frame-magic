import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { A as useBi, p as getErrorMessage } from "./rbac-static-data-DgiM51a_.mjs";
import { b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { Ft as ChevronDown, k as Save, tt as LoaderCircle } from "../_libs/lucide-react.mjs";
import { n as Route$16 } from "./router-6XTWAeEY.mjs";
import { n as useServerFn } from "./createSsrRpc-1tfOdKec.mjs";
import { c as saveRolePermissions, r as getPermissionMatrix, t as ACCESS_QUERY_KEY } from "./use-access-oB6fzdbG.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as Button } from "./button-DfTXnEII.mjs";
import { t as DynamicIcon } from "./dynamic-icon-Cf94UsPA.mjs";
import { t as PageHeader } from "./page-header-D4CknVcT.mjs";
import { t as Checkbox } from "./checkbox-kt6FvQcE.mjs";
import { n as ROLE_NAME_EN, t as PERMISSION_LABEL_EN } from "./rbac-types-DB3J6lDj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/role-permissions._roleId-V3WBz6UX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function collectPages(pages) {
	return pages.flatMap((p) => [p, ...collectPages(p.children)]);
}
function RolePermissionsPage() {
	const { roleId } = Route$16.useParams();
	const bi = useBi();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const fetchMatrix = useServerFn(getPermissionMatrix);
	const persist = useServerFn(saveRolePermissions);
	const [granted, setGranted] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const [openModules, setOpenModules] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const { data, isLoading } = useQuery({
		queryKey: ["permission-matrix", roleId],
		queryFn: () => fetchMatrix({ data: { roleId } })
	});
	(0, import_react.useEffect)(() => {
		if (data) {
			setGranted(new Set(data.granted));
			setOpenModules(new Set(data.modules.map((m) => m.id)));
		}
	}, [data]);
	const allPages = (0, import_react.useMemo)(() => data ? data.modules.flatMap((m) => collectPages(m.pages)) : [], [data]);
	const saveMutation = useMutation({
		mutationFn: () => persist({ data: {
			roleId,
			granted: Array.from(granted)
		} }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["permission-matrix", roleId] });
			queryClient.invalidateQueries({ queryKey: ACCESS_QUERY_KEY });
			toast.success(bi("تم حفظ الصلاحيات", "Permissions saved"));
		},
		onError: (e) => toast.error(getErrorMessage(e, bi("تعذّر الحفظ", "Failed to save")))
	});
	const keys = data?.permissionKeys ?? [];
	function toggle(entry, on) {
		setGranted((prev) => {
			const next = new Set(prev);
			if (on) next.add(entry);
			else next.delete(entry);
			return next;
		});
	}
	function togglePage(page, on) {
		const pages = [page, ...collectPages(page.children)];
		setGranted((prev) => {
			const next = new Set(prev);
			for (const p of pages) for (const k of keys) {
				const entry = `${p.id}:${k.key}`;
				if (on) next.add(entry);
				else next.delete(entry);
			}
			return next;
		});
	}
	function toggleModule(moduleId, on) {
		const mod = data?.modules.find((m) => m.id === moduleId);
		if (!mod) return;
		for (const p of mod.pages) togglePage(p, on);
	}
	function pageState(page) {
		const pages = [page, ...collectPages(page.children)];
		let on = 0;
		let total = 0;
		for (const p of pages) for (const k of keys) {
			total++;
			if (granted.has(`${p.id}:${k.key}`)) on++;
		}
		if (!on) return "none";
		return on === total ? "all" : "some";
	}
	if (isLoading || !data) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: bi("الصلاحيات", "Permissions"),
		icon: "ShieldCheck"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex justify-center p-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-6 animate-spin text-primary" })
	})] });
	const roleName = bi(data.roleName, ROLE_NAME_EN[data.roleName] ?? data.roleName);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pb-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: bi(`صلاحيات: ${data.roleName}`, `Permissions: ${roleName}`),
				icon: "ShieldCheck",
				onBack: () => navigate({ to: "/admin/roles" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3 p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: bi("تحديد الوحدة يفعّل كل صفحاتها وأدواتها، ويمكنك بعدها إلغاء أي أداة بشكل مستقل. الحفظ لا يتم إلا بالضغط على زر الحفظ بالأسفل.", "Selecting a module enables all its pages and tools; you can then disable any tool individually. Nothing is saved until you press the save button below.")
				}), data.modules.map((mod) => {
					const isOpen = openModules.has(mod.id);
					const modPages = mod.pages.flatMap((p) => [p, ...collectPages(p.children)]);
					const modOn = modPages.some((p) => keys.some((k) => granted.has(`${p.id}:${k.key}`)));
					const modAll = modPages.length > 0 && modPages.every((p) => keys.every((k) => granted.has(`${p.id}:${k.key}`)));
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "shadow-elevation-1 overflow-hidden rounded-2xl border border-border bg-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 border-b border-border px-4 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
								checked: modAll ? true : modOn ? "indeterminate" : false,
								onCheckedChange: (v) => toggleModule(mod.id, v === true),
								"aria-label": bi(mod.name, mod.nameEn)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "flex flex-1 items-center gap-2 text-start",
								onClick: () => setOpenModules((prev) => {
									const next = new Set(prev);
									if (next.has(mod.id)) next.delete(mod.id);
									else next.add(mod.id);
									return next;
								}),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DynamicIcon, {
										name: mod.icon,
										className: "size-4 text-primary"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm font-bold text-foreground",
										children: bi(mod.name, mod.nameEn)
									}),
									!mod.enabled && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded-md bg-muted px-2 py-0.5 text-[11px] text-muted-foreground",
										children: bi("الوحدة معطّلة بالنظام", "Module disabled system-wide")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: cn("ms-auto size-4 text-muted-foreground transition-transform", isOpen && "rotate-180") })
								]
							})]
						}), isOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "divide-y divide-border/60",
							children: mod.pages.map((page) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageRow, {
								page,
								depth: 0,
								keys,
								granted,
								onToggleEntry: toggle,
								onTogglePage: togglePage,
								pageState
							}, page.id))
						})]
					}, mod.id);
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed bottom-0 left-0 right-0 border-t border-border bg-card/95 p-4 backdrop-blur",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-5xl items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted-foreground",
						children: bi(`${granted.size} صلاحية محددة عبر ${allPages.length} صفحة`, `${granted.size} permissions set across ${allPages.length} pages`)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: () => setGranted(new Set(data.granted)),
							children: bi("تراجع", "Reset")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: () => saveMutation.mutate(),
							disabled: saveMutation.isPending,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "size-4" }), saveMutation.isPending ? bi("جارٍ الحفظ...", "Saving...") : bi("حفظ الصلاحيات", "Save permissions")]
						})]
					})]
				})
			})
		]
	});
}
function PageRow({ page, depth, keys, granted, onToggleEntry, onTogglePage, pageState }) {
	const bi = useBi();
	const state = pageState(page);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-4 py-3",
		style: { paddingInlineStart: 16 + depth * 24 },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
					checked: state === "all" ? true : state === "some" ? "indeterminate" : false,
					onCheckedChange: (v) => onTogglePage(page, v === true),
					"aria-label": bi(page.name, page.nameEn)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DynamicIcon, {
					name: page.icon,
					className: "size-4 text-muted-foreground"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm font-semibold text-foreground",
					children: bi(page.name, page.nameEn)
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-2.5 flex flex-wrap gap-x-5 gap-y-2 ps-8",
			children: keys.map((k) => {
				const entry = `${page.id}:${k.key}`;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex cursor-pointer items-center gap-2 text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
						checked: granted.has(entry),
						onCheckedChange: (v) => onToggleEntry(entry, v === true)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground",
						children: bi(k.label, PERMISSION_LABEL_EN[k.key] ?? k.label)
					})]
				}, k.key);
			})
		})]
	}), page.children.map((child) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageRow, {
		page: child,
		depth: depth + 1,
		keys,
		granted,
		onToggleEntry,
		onTogglePage,
		pageState
	}, child.id))] });
}
//#endregion
export { RolePermissionsPage as component };
