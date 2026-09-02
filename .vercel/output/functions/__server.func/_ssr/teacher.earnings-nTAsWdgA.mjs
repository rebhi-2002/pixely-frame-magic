import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { w as useBi } from "./rbac-static-data-g2eybyR5.mjs";
import { n as useServerFn } from "./createSsrRpc-wq0ICmoa.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { d as useAccess } from "./use-access-C_0mcNbc.mjs";
import { n as Guard } from "./guard-DmupFA9_.mjs";
import { E as Pencil, H as LoaderCircle, T as Plus, l as Trash2 } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-RXwCFfhv.mjs";
import { a as Panel, i as EmptyState, l as StatGrid, n as Badge, r as DataTable, t as AppPage } from "./kit-DDkPK7fJ.mjs";
import { t as Input } from "./input-D0-bbXyS.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, o as Label, r as DialogFooter, t as Dialog } from "./dialog-1uq10XBZ.mjs";
import { a as AlertDialogDescription, c as AlertDialogTitle, i as AlertDialogContent, n as AlertDialogAction, o as AlertDialogFooter, r as AlertDialogCancel, s as AlertDialogHeader, t as AlertDialog } from "./alert-dialog-DwQS8Syk.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-CbSL31Oe.mjs";
import { t as description } from "./teacher.earnings-iaB_PpB3.mjs";
import { a as getEarningsSettings, n as deleteEarningTransaction, s as listEarningTransactions, u as saveEarningTransaction } from "./teacher-followup.functions-Z0xgvd53.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/teacher.earnings-nTAsWdgA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PageRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Guard, {
		pageKey: "teacher_earnings",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, {})
	});
}
var EMPTY_FORM = {
	dateLabel: "",
	description: "",
	amount: "0",
	status: "قيد التنفيذ"
};
function Body() {
	const bi = useBi();
	const queryClient = useQueryClient();
	const { can } = useAccess();
	const fetchRows = useServerFn(listEarningTransactions);
	const persist = useServerFn(saveEarningTransaction);
	const remove = useServerFn(deleteEarningTransaction);
	const fetchSettings = useServerFn(getEarningsSettings);
	const rowsQuery = useQuery({
		queryKey: ["earning-transactions"],
		queryFn: () => fetchRows()
	});
	const settingsQuery = useQuery({
		queryKey: ["earnings-settings"],
		queryFn: () => fetchSettings()
	});
	const [open, setOpen] = (0, import_react.useState)(false);
	const [editingId, setEditingId] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)(EMPTY_FORM);
	const [pendingDelete, setPendingDelete] = (0, import_react.useState)(null);
	const isLoading = rowsQuery.isLoading || settingsQuery.isLoading;
	const list = rowsQuery.data ?? [];
	const settings = settingsQuery.data ?? { platformFeePercent: 15 };
	const stats = (0, import_react.useMemo)(() => {
		return {
			available: list.filter((r) => r.status === "مؤكد").reduce((s, r) => s + r.amount, 0),
			pending: list.filter((r) => r.status === "قيد التنفيذ" && r.amount > 0).reduce((s, r) => s + r.amount, 0),
			paidOut: Math.abs(list.filter((r) => r.amount < 0 && r.status === "مؤكد").reduce((s, r) => s + r.amount, 0))
		};
	}, [list]);
	const invalidate = () => queryClient.invalidateQueries({ queryKey: ["earning-transactions"] });
	const saveMutation = useMutation({
		mutationFn: () => persist({ data: {
			...form,
			id: editingId ?? void 0,
			amount: Number(form.amount) || 0
		} }),
		onSuccess: () => {
			invalidate();
			setOpen(false);
			toast.success(bi("تم الحفظ", "Saved successfully"));
		},
		onError: (e) => toast.error(e instanceof Error ? e.message : bi("تعذّر الحفظ", "Failed to save"))
	});
	const deleteMutation = useMutation({
		mutationFn: (id) => remove({ data: { id } }),
		onSuccess: () => {
			invalidate();
			setPendingDelete(null);
			toast.success(bi("تم الحذف", "Deleted successfully"));
		},
		onError: (e) => toast.error(e instanceof Error ? e.message : bi("تعذّر الحذف", "Failed to delete"))
	});
	function openDialog(row) {
		setEditingId(row?.id ?? null);
		setForm(row ? {
			dateLabel: row.dateLabel,
			description: row.description,
			amount: String(row.amount),
			status: row.status
		} : EMPTY_FORM);
		setOpen(true);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppPage, {
		title: bi("الأرباح", "Earnings"),
		icon: "Wallet",
		subtitle: bi(description, "Your earnings, platform fee and payout requests — all transparent."),
		children: [
			isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex justify-center py-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-6 animate-spin text-primary" })
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatGrid, { items: [
				{
					icon: "Wallet",
					label: bi("الرصيد المتاح", "Available"),
					value: bi(`${stats.available} ₪`, `${stats.available} ILS`)
				},
				{
					icon: "Hourglass",
					label: bi("قيد التسوية", "Pending"),
					value: bi(`${stats.pending} ₪`, `${stats.pending} ILS`)
				},
				{
					icon: "BadgePercent",
					label: bi("عمولة المنصة", "Platform fee"),
					value: `${settings.platformFeePercent}%`
				},
				{
					icon: "Banknote",
					label: bi("إجمالي مسحوب", "Total paid out"),
					value: bi(`${stats.paidOut} ₪`, `${stats.paidOut} ILS`)
				}
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: bi("آخر الحركات", "Recent transactions"),
				icon: "Receipt",
				action: can("teacher_earnings", "show_add_form") ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					onClick: () => openDialog(null),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), bi("إضافة حركة", "Add transaction")]
				}) : void 0,
				children: list.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
					head: [
						bi("التاريخ", "Date"),
						bi("الوصف", "Description"),
						bi("المبلغ", "Amount"),
						bi("الحالة", "Status"),
						bi("", "")
					],
					rows: list.map((r) => [
						r.dateLabel,
						r.description,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: r.amount >= 0 ? "text-success" : "text-destructive",
							children: bi(`${r.amount >= 0 ? "+" : ""}${r.amount} ₪`, `${r.amount >= 0 ? "+" : ""}${r.amount} ILS`)
						}, `${r.id}-amt`),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: r.status === "مؤكد" ? "success" : "primary",
							children: bi(r.status, r.status === "مؤكد" ? "Cleared" : "Processing")
						}, r.id),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-end gap-1",
							children: [can("teacher_earnings", "edit") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "icon",
								variant: "ghost",
								onClick: () => openDialog(r),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" })
							}), can("teacher_earnings", "delete") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "icon",
								variant: "ghost",
								className: "text-destructive",
								onClick: () => setPendingDelete(r),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
							})]
						}, `${r.id}-actions`)
					])
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					icon: "Receipt",
					text: bi("لا حركات بعد.", "No transactions yet.")
				})
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open,
				onOpenChange: setOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "text-start",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: editingId ? bi("تعديل حركة", "Edit transaction") : bi("إضافة حركة", "Add transaction") }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5 sm:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "et-desc",
										children: bi("الوصف", "Description")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "et-desc",
										value: form.description,
										onChange: (e) => setForm((f) => ({
											...f,
											description: e.target.value
										}))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "et-date",
										children: bi("التاريخ", "Date")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "et-date",
										value: form.dateLabel,
										onChange: (e) => setForm((f) => ({
											...f,
											dateLabel: e.target.value
										}))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "et-amount",
										children: bi("المبلغ (سالب للسحب)", "Amount (negative for payout)")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "et-amount",
										type: "number",
										value: form.amount,
										onChange: (e) => setForm((f) => ({
											...f,
											amount: e.target.value
										}))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5 sm:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: bi("الحالة", "Status") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										value: form.status,
										onValueChange: (v) => setForm((f) => ({
											...f,
											status: v
										})),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "قيد التنفيذ",
											children: bi("قيد التنفيذ", "Processing")
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "مؤكد",
											children: bi("مؤكد", "Cleared")
										})] })]
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
							className: "gap-2 sm:justify-start",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: () => saveMutation.mutate(),
								disabled: saveMutation.isPending || !form.description.trim(),
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
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: bi("حذف هذه الحركة؟", "Delete this transaction?") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: bi("لا يمكن التراجع عن هذا الإجراء.", "This action cannot be undone.") })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, {
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
