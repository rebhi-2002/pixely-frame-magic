import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { A as useBi, O as throwBilingual, d as apiClient, p as getErrorMessage } from "./rbac-static-data-DgiM51a_.mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { D as Search, F as Pencil, P as Plus, p as Trash2 } from "../_libs/lucide-react.mjs";
import { d as useAccess } from "./use-access-BCs0D1hx.mjs";
import { n as Guard } from "./guard-CaBAnt-a.mjs";
import { t as Button } from "./button-DfTXnEII.mjs";
import { n as Toolbar, t as PageHeader } from "./page-header-D4CknVcT.mjs";
import { a as Pagination } from "./kit-Ctaz_npe.mjs";
import { t as Input } from "./input-D0-bbXyS.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, r as DialogFooter, t as Dialog } from "./dialog-CE79KVEh.mjs";
import { a as AlertDialogDescription, c as AlertDialogTitle, i as AlertDialogContent, n as AlertDialogAction, o as AlertDialogFooter, r as AlertDialogCancel, s as AlertDialogHeader, t as AlertDialog } from "./alert-dialog-CRZk8vpy.mjs";
import { i as RetryButton, r as LoadingState, t as ErrorState } from "./feedback-states-ZdZSGCTQ.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-CbSL31Oe.mjs";
import { t as useDebouncedValue } from "./use-debounced-value-BXcXEOol.mjs";
import { t as Textarea } from "./textarea-kko37XEX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.constants-DDIjofxH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function mapConstant(c) {
	return {
		id: c.id ?? 0,
		name: c.name ?? "",
		comment: c.comment ?? null,
		icon: c.icon ?? null,
		parent_id: c.parentId ?? c.parent?.id ?? null,
		parent_name: c.parent?.name ?? null
	};
}
async function loadFormData(id) {
	return apiClient.get(`/api/Constant/CreateEditModal?id=${id ?? 0}`);
}
async function listBackendConstants(params = {}) {
	const result = await apiClient.post("/api/Constant/GetAll", {
		searchValue: params.searchValue ?? "",
		sortColumn: "",
		sortColumnDirection: "",
		pageSize: params.pageSize ?? 20,
		skip: params.skip ?? 0
	});
	return {
		rows: (result.data ?? []).map(mapConstant).filter((c) => c.id > 0),
		totalCount: result.totalCount ?? 0
	};
}
async function loadBackendConstantParents() {
	return (await loadFormData()).parents ?? [];
}
async function saveBackendConstant(form) {
	if (!form.name.trim()) throwBilingual("الاسم مطلوب", "Name is required");
	if (form.name.trim().length < 3) throwBilingual("الاسم قصير جدًا (3 أحرف على الأقل)", "Name is too short (at least 3 characters)");
	if (form.id != null && form.parent_id === form.id) throwBilingual("لا يمكن أن يكون الثابت أبًا لنفسه", "A constant can't be its own parent");
	const result = await apiClient.post("/api/Constant/CreateEdit", {
		id: form.id ?? 0,
		name: form.name.trim(),
		comment: form.comment.trim() || null,
		icon: form.icon.trim() || null,
		parentId: form.parent_id
	});
	if (!result.success) {
		if (result.message) throw new Error(result.message);
		throwBilingual("تعذر حفظ الثابت", "Failed to save constant");
	}
}
async function deleteBackendConstant(id) {
	const result = await apiClient.delete(`/api/Constant/Delete?id=${id}`);
	if (!result.success) {
		if (result.message) throw new Error(result.message);
		throwBilingual("تعذر حذف الثابت", "Failed to delete constant");
	}
}
var EMPTY_FORM = {
	name: "",
	comment: "",
	icon: "",
	parent_id: null
};
function ConstantsPage() {
	const bi = useBi();
	const queryClient = useQueryClient();
	const { can } = useAccess();
	const [search, setSearch] = (0, import_react.useState)("");
	const debouncedSearch = useDebouncedValue(search);
	const [page, setPage] = (0, import_react.useState)(0);
	const PAGE_SIZE = 20;
	const [open, setOpen] = (0, import_react.useState)(false);
	const [editingId, setEditingId] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)(EMPTY_FORM);
	const [pendingDelete, setPendingDelete] = (0, import_react.useState)(null);
	const { data: constantsResult, isLoading, isError } = useQuery({
		queryKey: ["constants", {
			search: debouncedSearch,
			page
		}],
		queryFn: () => listBackendConstants({
			searchValue: debouncedSearch.trim(),
			pageSize: PAGE_SIZE,
			skip: page * PAGE_SIZE
		}),
		placeholderData: (prev) => prev
	});
	const constants = constantsResult?.rows ?? [];
	const totalCount = constantsResult?.totalCount ?? 0;
	const { data: parents } = useQuery({
		queryKey: ["backend-constant-parents"],
		queryFn: loadBackendConstantParents,
		staleTime: 3e5,
		retry: false
	});
	const saveMutation = useMutation({
		mutationFn: () => saveBackendConstant({
			...form,
			id: editingId ?? void 0
		}),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["constants"] });
			queryClient.invalidateQueries({ queryKey: ["backend-constant-parents"] });
			setOpen(false);
			toast.success(bi("تم الحفظ", "Saved successfully"));
		},
		onError: (e) => toast.error(getErrorMessage(e, bi("تعذّر الحفظ", "Failed to save")))
	});
	const deleteMutation = useMutation({
		mutationFn: deleteBackendConstant,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["constants"] });
			queryClient.invalidateQueries({ queryKey: ["backend-constant-parents"] });
			setPendingDelete(null);
			toast.success(bi("تم الحذف", "Deleted successfully"));
		},
		onError: (e) => toast.error(getErrorMessage(e, bi("تعذّر الحذف", "Failed to delete")))
	});
	function openDialog(constant) {
		setEditingId(constant?.id ?? null);
		setForm(constant ? {
			name: constant.name,
			comment: constant.comment ?? "",
			icon: constant.icon ?? "",
			parent_id: constant.parent_id
		} : EMPTY_FORM);
		setOpen(true);
	}
	const parentOptionsForEditing = (parents ?? []).filter((p) => p.id !== editingId);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: bi("الثوابت", "Constants"),
			icon: "ListTree"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Toolbar, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative min-w-56 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						placeholder: bi("بحث بالاسم أو الملاحظة", "Search by name or comment"),
						value: search,
						onChange: (e) => {
							setSearch(e.target.value);
							setPage(0);
						},
						className: "ps-9"
					})]
				}), can("admin_constants", "show_add_form") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					className: "ms-auto",
					onClick: () => openDialog(null),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), bi("إضافة ثابت", "Add constant")]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 flex items-center justify-between gap-3 text-xs text-muted-foreground",
					"aria-live": "polite",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: bi(`${totalCount} نتيجة`, `${totalCount} result${totalCount === 1 ? "" : "s"}`) })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 overflow-x-auto rounded-2xl bg-card",
					role: "region",
					"aria-label": bi("قائمة الثوابت", "Constants list"),
					children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingState, { label: bi("عم نحمّل الثوابت…", "Loading constants…") }) : isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, {
						title: bi("تعذّر تحميل الثوابت", "Couldn't load constants"),
						action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RetryButton, {
							label: bi("إعادة المحاولة", "Try again"),
							onClick: () => void queryClient.invalidateQueries({ queryKey: ["constants"] })
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full min-w-[700px] text-start text-sm",
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
									children: bi("الأب", "Parent")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 font-semibold",
									children: bi("ملاحظة", "Comment")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "w-28 px-4 py-3 font-semibold",
									children: bi("إجراءات", "Actions")
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [constants.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-border/60 last:border-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3 text-muted-foreground",
									children: i + 1
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3 font-semibold text-foreground",
									children: c.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3 text-muted-foreground",
									children: c.parent_name ?? "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3 text-muted-foreground",
									children: c.comment ?? "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1",
										children: [can("admin_constants", "edit") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "icon",
											variant: "ghost",
											title: bi("تعديل", "Edit"),
											onClick: () => openDialog(c),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" })
										}), can("admin_constants", "delete") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "icon",
											variant: "ghost",
											title: bi("حذف", "Delete"),
											className: "text-destructive",
											onClick: () => setPendingDelete(c),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
										})]
									})
								})
							]
						}, c.id)), !constants.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							colSpan: 5,
							className: "p-8 text-center text-muted-foreground",
							children: search.trim() ? bi("لا توجد نتائج مطابقة للبحث.", "No constants match your search.") : bi("لا توجد ثوابت بعد.", "No constants yet.")
						}) })] })]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pagination, {
					page,
					pageSize: PAGE_SIZE,
					totalCount,
					onPageChange: setPage,
					summary: bi(`${Math.min(page * PAGE_SIZE + 1, totalCount)}–${Math.min((page + 1) * PAGE_SIZE, totalCount)} من ${totalCount}`, `${Math.min(page * PAGE_SIZE + 1, totalCount)}–${Math.min((page + 1) * PAGE_SIZE, totalCount)} of ${totalCount}`),
					previousLabel: bi("السابق", "Previous"),
					nextLabel: bi("التالي", "Next")
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open,
			onOpenChange: setOpen,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
				className: "text-start",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: editingId ? bi("تعديل ثابت", "Edit constant") : bi("إضافة ثابت", "Add constant") }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "c-name",
									children: bi("الاسم", "Name")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "c-name",
									value: form.name,
									onChange: (e) => setForm((f) => ({
										...f,
										name: e.target.value
									}))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: bi("الأب (اختياري)", "Parent (optional)") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
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
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "c-icon",
									children: bi("أيقونة (اختياري)", "Icon (optional)")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "c-icon",
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
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "c-comment",
									children: bi("ملاحظة (اختياري)", "Comment (optional)")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									id: "c-comment",
									value: form.comment,
									onChange: (e) => setForm((f) => ({
										...f,
										comment: e.target.value
									})),
									rows: 3
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
	pageKey: "admin_constants",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConstantsPage, {})
});
//#endregion
export { SplitComponent as component };
