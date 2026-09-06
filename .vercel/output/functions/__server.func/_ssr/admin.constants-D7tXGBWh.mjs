import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { O as throwBilingual, d as apiClient, f as getErrorMessage, k as useBi } from "./rbac-static-data-Bv6QEjHq.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { E as Pencil, T as Plus, b as Search, l as Trash2 } from "../_libs/lucide-react.mjs";
import { d as useAccess } from "./use-access-BL6Bw5Ej.mjs";
import { n as Guard } from "./guard-Dpfucbbc.mjs";
import { t as Button } from "./button-Nx-_C_c8.mjs";
import { n as Toolbar, t as PageHeader } from "./page-header-B-hD-LLI.mjs";
import { t as Input } from "./input-D0-bbXyS.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, o as Label, r as DialogFooter, t as Dialog } from "./dialog-1uq10XBZ.mjs";
import { a as AlertDialogDescription, c as AlertDialogTitle, i as AlertDialogContent, n as AlertDialogAction, o as AlertDialogFooter, r as AlertDialogCancel, s as AlertDialogHeader, t as AlertDialog } from "./alert-dialog-OIHj-NyW.mjs";
import { i as RetryButton, r as LoadingState, t as ErrorState } from "./feedback-states-CtpAlO82.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-CbSL31Oe.mjs";
import { t as Textarea } from "./textarea-kko37XEX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.constants-D7tXGBWh.js
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
async function listBackendConstants() {
	return ((await apiClient.post("/api/Constant/GetAll", {
		searchValue: "",
		sortColumn: "",
		sortColumnDirection: "",
		pageSize: 1e3,
		skip: 0
	})).data ?? []).map(mapConstant).filter((c) => c.id > 0);
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
	const [open, setOpen] = (0, import_react.useState)(false);
	const [editingId, setEditingId] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)(EMPTY_FORM);
	const [pendingDelete, setPendingDelete] = (0, import_react.useState)(null);
	const { data: constants, isLoading, isError } = useQuery({
		queryKey: ["constants"],
		queryFn: listBackendConstants
	});
	const { data: parents } = useQuery({
		queryKey: ["backend-constant-parents"],
		queryFn: loadBackendConstantParents,
		staleTime: 3e5,
		retry: false
	});
	const filtered = (0, import_react.useMemo)(() => {
		const q = search.trim().toLowerCase();
		if (!q) return constants ?? [];
		return (constants ?? []).filter((c) => {
			return `${c.name} ${c.comment ?? ""}`.toLowerCase().includes(q);
		});
	}, [constants, search]);
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
						onChange: (e) => setSearch(e.target.value),
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
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: bi(`${filtered.length} نتيجة`, `${filtered.length} result${filtered.length === 1 ? "" : "s"}`) })
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
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [filtered.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
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
						}, c.id)), !filtered.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							colSpan: 5,
							className: "p-8 text-center text-muted-foreground",
							children: search.trim() ? bi("لا توجد نتائج مطابقة للبحث.", "No constants match your search.") : bi("لا توجد ثوابت بعد.", "No constants yet.")
						}) })] })]
					})
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
