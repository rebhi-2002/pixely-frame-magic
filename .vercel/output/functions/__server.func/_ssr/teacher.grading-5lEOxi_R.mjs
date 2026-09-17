import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { $ as LoaderCircle, F as Pencil, Mt as Check, P as Plus, p as Trash2 } from "../_libs/lucide-react.mjs";
import { a as description$4, yt as useBi } from "./router-DK5KNs7n.mjs";
import { n as useServerFn } from "./createSsrRpc-572OBH4c.mjs";
import { d as useAccess } from "./use-access-KQVg7Dvq.mjs";
import { n as Guard } from "./guard-BP3o1aU5.mjs";
import { t as Button } from "./button-DfTXnEII.mjs";
import { i as EmptyState, n as Badge, o as Panel, r as DataTable, t as AppPage, u as StatGrid } from "./kit-DhMq0cTG.mjs";
import { t as Input } from "./input-D0-bbXyS.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { t as Switch } from "./switch-Cn1w-cIH.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, r as DialogFooter, t as Dialog } from "./dialog-CE79KVEh.mjs";
import { a as AlertDialogDescription, c as AlertDialogTitle, i as AlertDialogContent, n as AlertDialogAction, o as AlertDialogFooter, r as AlertDialogCancel, s as AlertDialogHeader, t as AlertDialog } from "./alert-dialog-CRZk8vpy.mjs";
import { t as getErrorMessage } from "./client-Bmh1iu6g.mjs";
import { a as listGradingItems, n as deleteGradingItem, s as saveGradingItem } from "./teacher-followup.functions-CZBs3RuA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/teacher.grading-5lEOxi_R.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PageRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Guard, {
		pageKey: "teacher_grading",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, {})
	});
}
var EMPTY_FORM = {
	studentName: "",
	itemTitle: "",
	submittedLabel: "",
	status: "بانتظار",
	overdue: false
};
function Body() {
	const bi = useBi();
	const queryClient = useQueryClient();
	const { can } = useAccess();
	const fetchRows = useServerFn(listGradingItems);
	const persist = useServerFn(saveGradingItem);
	const remove = useServerFn(deleteGradingItem);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [editingId, setEditingId] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)(EMPTY_FORM);
	const [pendingDelete, setPendingDelete] = (0, import_react.useState)(null);
	const { data: rows, isLoading } = useQuery({
		queryKey: ["grading-items"],
		queryFn: () => fetchRows()
	});
	const invalidate = () => queryClient.invalidateQueries({ queryKey: ["grading-items"] });
	const list = (0, import_react.useMemo)(() => rows ?? [], [rows]);
	const stats = (0, import_react.useMemo)(() => ({
		pending: list.filter((r) => r.status === "بانتظار").length,
		graded: list.filter((r) => r.status === "مُصحّح").length,
		overdue: list.filter((r) => r.overdue).length
	}), [list]);
	const saveMutation = useMutation({
		mutationFn: () => persist({ data: {
			...form,
			id: editingId ?? void 0
		} }),
		onSuccess: () => {
			invalidate();
			setOpen(false);
			toast.success(bi("تم الحفظ", "Saved successfully"));
		},
		onError: (e) => toast.error(getErrorMessage(e, bi("تعذّر الحفظ", "Failed to save")))
	});
	const gradeMutation = useMutation({
		mutationFn: (row) => persist({ data: {
			...row,
			status: "مُصحّح",
			overdue: false
		} }),
		onSuccess: () => {
			invalidate();
			toast.success(bi("تم التصحيح", "Marked as graded"));
		},
		onError: (e) => toast.error(getErrorMessage(e, bi("تعذّر التحديث", "Failed to update")))
	});
	const deleteMutation = useMutation({
		mutationFn: (id) => remove({ data: { id } }),
		onSuccess: () => {
			invalidate();
			setPendingDelete(null);
			toast.success(bi("تم الحذف", "Deleted successfully"));
		},
		onError: (e) => toast.error(getErrorMessage(e, bi("تعذّر الحذف", "Failed to delete")))
	});
	function openDialog(row) {
		setEditingId(row?.id ?? null);
		setForm(row ? {
			studentName: row.studentName,
			itemTitle: row.itemTitle,
			submittedLabel: row.submittedLabel,
			status: row.status,
			overdue: row.overdue
		} : EMPTY_FORM);
		setOpen(true);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppPage, {
		title: bi("التصحيح", "Grading"),
		icon: "PenSquare",
		subtitle: bi(description$4, "The grading queue: essay answers and uploaded files, with per-student feedback."),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatGrid, { items: [
				{
					icon: "PenSquare",
					label: bi("بانتظار التصحيح", "Pending"),
					value: String(stats.pending)
				},
				{
					icon: "CheckCheck",
					label: bi("مُصحّحة", "Graded"),
					value: String(stats.graded)
				},
				{
					icon: "Clock",
					label: bi("متوسط وقت التصحيح", "Avg. time"),
					value: bi("3.4 د", "3.4 min")
				},
				{
					icon: "AlertTriangle",
					label: bi("متأخّرة", "Overdue"),
					value: String(stats.overdue)
				}
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: bi("طابور التصحيح", "Grading queue"),
				icon: "PenSquare",
				action: can("teacher_grading", "show_add_form") ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					onClick: () => openDialog(null),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), bi("إضافة عنصر", "Add item")]
				}) : void 0,
				children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex justify-center py-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-5 animate-spin text-primary" })
				}) : list.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
					head: [
						bi("الطالب", "Student"),
						bi("العمل", "Item"),
						bi("أُرسل", "Submitted"),
						bi("الحالة", "Status"),
						bi("", "")
					],
					rows: list.map((r) => [
						r.studentName,
						r.itemTitle,
						r.submittedLabel,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: r.status === "مُصحّح" ? "success" : r.overdue ? "danger" : "primary",
							children: bi(r.status, r.status === "مُصحّح" ? "Graded" : "Pending")
						}, r.id),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-end gap-1",
							children: [
								can("teacher_grading", "edit") && r.status !== "مُصحّح" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "icon",
									variant: "ghost",
									className: "text-success",
									onClick: () => gradeMutation.mutate(r),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" })
								}),
								can("teacher_grading", "edit") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "icon",
									variant: "ghost",
									onClick: () => openDialog(r),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" })
								}),
								can("teacher_grading", "delete") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "icon",
									variant: "ghost",
									className: "text-destructive",
									onClick: () => setPendingDelete(r),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
								})
							]
						}, `${r.id}-actions`)
					])
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					icon: "PenSquare",
					text: bi("الطابور فاضي 🎉", "Queue is empty 🎉")
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open,
				onOpenChange: setOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "text-start",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: editingId ? bi("تعديل عنصر", "Edit item") : bi("إضافة عنصر", "Add item") }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "gr-student",
										children: bi("الطالب", "Student")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "gr-student",
										value: form.studentName,
										onChange: (e) => setForm((f) => ({
											...f,
											studentName: e.target.value
										}))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "gr-item",
										children: bi("العمل", "Item")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "gr-item",
										value: form.itemTitle,
										onChange: (e) => setForm((f) => ({
											...f,
											itemTitle: e.target.value
										}))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5 sm:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "gr-submitted",
										children: bi("تاريخ الإرسال", "Submitted")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "gr-submitted",
										value: form.submittedLabel,
										onChange: (e) => setForm((f) => ({
											...f,
											submittedLabel: e.target.value
										}))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 sm:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
										id: "gr-overdue",
										checked: form.overdue,
										onCheckedChange: (v) => setForm((f) => ({
											...f,
											overdue: v
										}))
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "gr-overdue",
										children: bi("متأخّر", "Overdue")
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
							className: "gap-2 sm:justify-start",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: () => saveMutation.mutate(),
								disabled: saveMutation.isPending || !form.studentName.trim() || !form.itemTitle.trim(),
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
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: bi("حذف هذا العنصر؟", "Delete this item?") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: bi("لا يمكن التراجع عن هذا الإجراء.", "This action cannot be undone.") })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, {
						className: "gap-2 sm:justify-start",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
							onClick: () => pendingDelete && deleteMutation.mutate(pendingDelete.id),
							children: bi("حذف", "Delete")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: bi("إلغاء", "Cancel") })]
					})]
				})
			})
		]
	});
}
//#endregion
export { PageRoute as component };
