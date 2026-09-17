import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { A as useBi, p as getErrorMessage } from "./rbac-static-data-DgiM51a_.mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { D as Search, F as Pencil, P as Plus, p as Trash2 } from "../_libs/lucide-react.mjs";
import { d as useAccess } from "./use-access-BCs0D1hx.mjs";
import { n as Guard } from "./guard-CaBAnt-a.mjs";
import { t as Button } from "./button-DfTXnEII.mjs";
import { n as Toolbar, t as PageHeader } from "./page-header-D4CknVcT.mjs";
import { t as Input } from "./input-D0-bbXyS.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { t as Switch } from "./switch-Cn1w-cIH.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, r as DialogFooter, t as Dialog } from "./dialog-CE79KVEh.mjs";
import { a as AlertDialogDescription, c as AlertDialogTitle, i as AlertDialogContent, n as AlertDialogAction, o as AlertDialogFooter, r as AlertDialogCancel, s as AlertDialogHeader, t as AlertDialog } from "./alert-dialog-CRZk8vpy.mjs";
import { i as saveBackendPage, n as listBackendPages, r as loadBackendPageOptions, t as deleteBackendPage } from "./admin-pages-3nXLsF0g.mjs";
import { i as RetryButton, r as LoadingState, t as ErrorState } from "./feedback-states-ZdZSGCTQ.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-CbSL31Oe.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.pages-DI5DHkFg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var EMPTY_FORM = {
	name: "",
	name_en: "",
	link: "",
	icon: "",
	in_menu: true,
	is_active: true,
	is_ajax: false,
	parent_id: null,
	module_id: null,
	category_id: null
};
function PagesPage() {
	const bi = useBi();
	const queryClient = useQueryClient();
	const { can } = useAccess();
	const [search, setSearch] = (0, import_react.useState)("");
	const [open, setOpen] = (0, import_react.useState)(false);
	const [editingId, setEditingId] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)(EMPTY_FORM);
	const [pendingDelete, setPendingDelete] = (0, import_react.useState)(null);
	const { data: pages, isLoading, isError } = useQuery({
		queryKey: ["backend-pages"],
		queryFn: listBackendPages
	});
	const { data: options } = useQuery({
		queryKey: ["backend-page-options"],
		queryFn: loadBackendPageOptions,
		staleTime: 3e5,
		retry: false
	});
	const filtered = (0, import_react.useMemo)(() => {
		const q = search.trim().toLowerCase();
		if (!q) return pages ?? [];
		return (pages ?? []).filter((p) => {
			return `${p.name} ${p.name_en} ${p.link ?? ""}`.toLowerCase().includes(q);
		});
	}, [pages, search]);
	const saveMutation = useMutation({
		mutationFn: () => saveBackendPage({
			...form,
			id: editingId ?? void 0
		}),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["backend-pages"] });
			queryClient.invalidateQueries({ queryKey: ["backend-page-options"] });
			setOpen(false);
			toast.success(bi("تم الحفظ", "Saved successfully"));
		},
		onError: (e) => toast.error(getErrorMessage(e, bi("تعذّر الحفظ", "Failed to save")))
	});
	const deleteMutation = useMutation({
		mutationFn: deleteBackendPage,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["backend-pages"] });
			queryClient.invalidateQueries({ queryKey: ["backend-page-options"] });
			setPendingDelete(null);
			toast.success(bi("تم الحذف", "Deleted successfully"));
		},
		onError: (e) => toast.error(getErrorMessage(e, bi("تعذّر الحذف", "Failed to delete")))
	});
	function openDialog(page) {
		setEditingId(page?.id ?? null);
		setForm(page ? {
			name: page.name,
			name_en: page.name_en,
			link: page.link ?? "",
			icon: page.icon ?? "",
			in_menu: page.in_menu,
			is_active: page.is_active,
			is_ajax: page.is_ajax,
			parent_id: page.parent_id,
			module_id: page.module_id,
			category_id: page.category_id
		} : EMPTY_FORM);
		setOpen(true);
	}
	const modules = options?.modules ?? [];
	const categories = options?.categories ?? [];
	const parentOptionsForEditing = (options?.parents ?? []).filter((p) => p.id !== editingId);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: bi("الصفحات", "Pages"),
			icon: "FileText"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Toolbar, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative min-w-56 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						placeholder: bi("بحث بالاسم أو الرابط", "Search by name or link"),
						value: search,
						onChange: (e) => setSearch(e.target.value),
						className: "ps-9"
					})]
				}), can("admin_pages", "show_add_form") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					className: "ms-auto",
					onClick: () => openDialog(null),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), bi("إضافة صفحة", "Add page")]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 flex items-center justify-between gap-3 text-xs text-muted-foreground",
					"aria-live": "polite",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: bi(`${filtered.length} نتيجة`, `${filtered.length} result${filtered.length === 1 ? "" : "s"}`) })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 overflow-x-auto rounded-2xl bg-card",
					role: "region",
					"aria-label": bi("قائمة الصفحات", "Pages list"),
					children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingState, { label: bi("عم نحمّل الصفحات…", "Loading pages…") }) : isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, {
						title: bi("تعذّر تحميل الصفحات", "Couldn't load pages"),
						action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RetryButton, {
							label: bi("إعادة المحاولة", "Try again"),
							onClick: () => void queryClient.invalidateQueries({ queryKey: ["backend-pages"] })
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full min-w-[900px] text-start text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-border text-xs text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "w-14 px-4 py-3 font-semibold",
									children: "#"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 font-semibold",
									children: bi("الاسم", "Name")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 font-semibold",
									children: bi("الرابط", "Link")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 font-semibold",
									children: bi("الوحدة", "Module")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 font-semibold",
									children: bi("الأب", "Parent")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 font-semibold",
									children: bi("الحالة", "Status")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "w-28 px-4 py-3 font-semibold",
									children: bi("إجراءات", "Actions")
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [filtered.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-border/60 last:border-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3 text-muted-foreground",
									children: i + 1
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "px-4 py-3 font-semibold text-foreground",
									children: [p.name, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs font-normal text-muted-foreground",
										children: p.name_en
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3 text-muted-foreground",
									children: p.link ?? "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3 text-muted-foreground",
									children: p.module_name ?? "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3 text-muted-foreground",
									children: p.parent_name ?? "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `rounded-full px-2 py-0.5 text-xs font-medium ${p.is_active ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`,
											children: p.is_active ? bi("نشطة", "Active") : bi("غير نشطة", "Inactive")
										}), p.in_menu && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded-full border border-border px-2 py-0.5 text-xs font-medium text-muted-foreground",
											children: bi("بالقائمة", "In menu")
										})]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1",
										children: [can("admin_pages", "edit") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "icon",
											variant: "ghost",
											title: bi("تعديل", "Edit"),
											onClick: () => openDialog(p),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" })
										}), can("admin_pages", "delete") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "icon",
											variant: "ghost",
											title: bi("حذف", "Delete"),
											className: "text-destructive",
											onClick: () => setPendingDelete(p),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
										})]
									})
								})
							]
						}, p.id)), !filtered.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							colSpan: 7,
							className: "p-8 text-center text-muted-foreground",
							children: search.trim() ? bi("لا توجد نتائج مطابقة للبحث.", "No pages match your search.") : bi("لا توجد صفحات بعد.", "No pages yet.")
						}) })] })]
					})
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open,
			onOpenChange: setOpen,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
				className: "max-h-[85vh] overflow-y-auto text-start",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: editingId ? bi("تعديل صفحة", "Edit page") : bi("إضافة صفحة", "Add page") }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "p-name",
									children: bi("الاسم بالعربي", "Arabic name")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "p-name",
									value: form.name,
									onChange: (e) => setForm((f) => ({
										...f,
										name: e.target.value
									}))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "p-name-en",
									children: bi("الاسم بالإنجليزي", "English name")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "p-name-en",
									value: form.name_en,
									onChange: (e) => setForm((f) => ({
										...f,
										name_en: e.target.value
									}))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5 sm:col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "p-link",
									children: bi("الرابط (اختياري)", "Link (optional)")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "p-link",
									value: form.link,
									onChange: (e) => setForm((f) => ({
										...f,
										link: e.target.value
									})),
									placeholder: "/admin/example"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "p-icon",
									children: bi("أيقونة (اختياري)", "Icon (optional)")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "p-icon",
									value: form.icon,
									onChange: (e) => setForm((f) => ({
										...f,
										icon: e.target.value
									})),
									placeholder: "lucide icon name"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: bi("الفئة", "Category") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: form.category_id == null ? "none" : String(form.category_id),
									onValueChange: (v) => setForm((f) => ({
										...f,
										category_id: v === "none" ? null : Number(v)
									})),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: bi("اختر الفئة", "Select category") }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "none",
										disabled: true,
										children: bi("اختر الفئة", "Select category")
									}), categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: String(c.id),
										children: c.name
									}, c.id))] })]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: bi("الوحدة (اختياري)", "Module (optional)") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: form.module_id == null ? "none" : String(form.module_id),
									onValueChange: (v) => setForm((f) => ({
										...f,
										module_id: v === "none" ? null : Number(v)
									})),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: bi("بدون وحدة", "No module") }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "none",
										children: bi("بدون وحدة", "No module")
									}), modules.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: String(m.id),
										children: m.name
									}, m.id))] })]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5 sm:col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: bi("الصفحة الأب (اختياري)", "Parent page (optional)") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: form.parent_id == null ? "none" : String(form.parent_id),
									onValueChange: (v) => setForm((f) => ({
										...f,
										parent_id: v === "none" ? null : Number(v)
									})),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: bi("بدون أب", "No parent") }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "none",
										children: bi("بدون أب", "No parent")
									}), parentOptionsForEditing.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: String(p.id),
										children: p.name
									}, p.id))] })]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
									checked: form.is_active,
									onCheckedChange: (v) => setForm((f) => ({
										...f,
										is_active: v
									})),
									id: "p-active"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "p-active",
									children: bi("نشطة", "Active")
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
									checked: form.in_menu,
									onCheckedChange: (v) => setForm((f) => ({
										...f,
										in_menu: v
									})),
									id: "p-in-menu"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "p-in-menu",
									children: bi("تظهر بالقائمة الجانبية", "Show in sidebar")
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
									checked: form.is_ajax,
									onCheckedChange: (v) => setForm((f) => ({
										...f,
										is_ajax: v
									})),
									id: "p-ajax"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "p-ajax",
									children: bi("صفحة Ajax", "Ajax page")
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
						className: "gap-2 sm:justify-start",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => saveMutation.mutate(),
							loading: saveMutation.isPending,
							children: bi("حفظ", "Save")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: () => setOpen(false),
							children: bi("إلغاء", "Cancel")
						})]
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
			open: !!pendingDelete,
			onOpenChange: (v) => !v && setPendingDelete(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, {
				className: "text-start",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: bi(`حذف «${pendingDelete?.name}»؟`, `Delete "${pendingDelete?.name}"?`) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: bi("لا يمكن التراجع عن هذا الإجراء.", "This action cannot be undone.") })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, {
					className: "gap-2 sm:justify-start",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
						onClick: () => pendingDelete && deleteMutation.mutate(pendingDelete.id),
						children: bi("حذف", "Delete")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: bi("إلغاء", "Cancel") })]
				})]
			})
		})
	] });
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Guard, {
	pageKey: "admin_pages",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PagesPage, {})
});
//#endregion
export { SplitComponent as component };
