import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { f as getErrorMessage, k as useBi } from "./rbac-static-data-JRz-nJtL.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { M as Pencil, Y as LoaderCircle, j as Plus, p as Trash2 } from "../_libs/lucide-react.mjs";
import { p as description$12 } from "./router-B49B_5De.mjs";
import { n as useServerFn } from "./createSsrRpc-C7KQUoXf.mjs";
import { d as useAccess } from "./use-access-Cx_9PD_P.mjs";
import { n as Guard } from "./guard-DJBJLisT.mjs";
import { t as Button } from "./button-Nx-_C_c8.mjs";
import { a as Panel, i as EmptyState, l as StatGrid, n as Badge, r as DataTable, t as AppPage } from "./kit-BNtAyy6W.mjs";
import { t as Input } from "./input-D0-bbXyS.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, o as Label, r as DialogFooter, t as Dialog } from "./dialog-1uq10XBZ.mjs";
import { a as AlertDialogDescription, c as AlertDialogTitle, i as AlertDialogContent, n as AlertDialogAction, o as AlertDialogFooter, r as AlertDialogCancel, s as AlertDialogHeader, t as AlertDialog } from "./alert-dialog-OIHj-NyW.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-CbSL31Oe.mjs";
import { a as getSupervisionSettings, o as listStudentRisk, t as deleteStudentRisk, u as saveStudentRisk } from "./supervisor-oversight.functions-BdW2KnWU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/supervisor.students-overview-D6lWoZGd.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PageRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Guard, {
		pageKey: "supervisor_students",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, {})
	});
}
var EMPTY_FORM = {
	studentName: "",
	gradeLabel: "",
	weakestSubject: "",
	weakestPercent: "50",
	status: "مراقبة"
};
var STATUS_TONE = {
	متعثّر: "danger",
	مراقبة: "primary",
	منتظم: "success"
};
function Body() {
	const bi = useBi();
	const queryClient = useQueryClient();
	const { can } = useAccess();
	const fetchRows = useServerFn(listStudentRisk);
	const persist = useServerFn(saveStudentRisk);
	const remove = useServerFn(deleteStudentRisk);
	const fetchSettings = useServerFn(getSupervisionSettings);
	const rowsQuery = useQuery({
		queryKey: ["student-risk"],
		queryFn: () => fetchRows()
	});
	const settingsQuery = useQuery({
		queryKey: ["supervision-settings"],
		queryFn: () => fetchSettings()
	});
	const [open, setOpen] = (0, import_react.useState)(false);
	const [editingId, setEditingId] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)(EMPTY_FORM);
	const [pendingDelete, setPendingDelete] = (0, import_react.useState)(null);
	const isLoading = rowsQuery.isLoading || settingsQuery.isLoading;
	const list = rowsQuery.data ?? [];
	const settings = settingsQuery.data ?? { improvedThisMonth: 0 };
	const stats = (0, import_react.useMemo)(() => ({
		total: list.length,
		atRisk: list.filter((r) => r.status === "متعثّر").length,
		consistent: list.filter((r) => r.status === "منتظم").length
	}), [list]);
	const invalidate = () => queryClient.invalidateQueries({ queryKey: ["student-risk"] });
	const saveMutation = useMutation({
		mutationFn: () => persist({ data: {
			...form,
			id: editingId ?? void 0,
			weakestPercent: Number(form.weakestPercent) || 0
		} }),
		onSuccess: () => {
			invalidate();
			setOpen(false);
			toast.success(bi("تم الحفظ", "Saved successfully"));
		},
		onError: (e) => toast.error(getErrorMessage(e, bi("تعذّر الحفظ", "Failed to save")))
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
			gradeLabel: row.gradeLabel,
			weakestSubject: row.weakestSubject,
			weakestPercent: String(row.weakestPercent),
			status: row.status
		} : EMPTY_FORM);
		setOpen(true);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppPage, {
		title: bi("نظرة الطلاب", "Students overview"),
		icon: "Users",
		subtitle: bi(description$12, "Struggling students first: who needs intervention now, and why."),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatGrid, { items: [
				{
					icon: "Users",
					label: bi("طلاب", "Students"),
					value: String(stats.total)
				},
				{
					icon: "AlertTriangle",
					label: bi("متعثّرون", "At risk"),
					value: String(stats.atRisk)
				},
				{
					icon: "Flame",
					label: bi("منتظمون", "Consistent"),
					value: String(stats.consistent)
				},
				{
					icon: "TrendingUp",
					label: bi("تحسّنوا هذا الشهر", "Improved"),
					value: String(settings.improvedThisMonth)
				}
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: bi("يحتاجون تدخّلاً", "Needs intervention"),
				icon: "Users",
				action: can("supervisor_students", "show_add_form") ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					onClick: () => openDialog(null),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), bi("إضافة طالب", "Add student")]
				}) : void 0,
				children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex justify-center py-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-5 animate-spin text-primary" })
				}) : list.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
					head: [
						bi("الطالب", "Student"),
						bi("الصف", "Grade"),
						bi("أضعف مادة", "Weakest"),
						bi("الحالة", "Status"),
						bi("", "")
					],
					rows: list.map((r) => [
						r.studentName,
						r.gradeLabel,
						bi(`${r.weakestSubject} ${r.weakestPercent}%`, `${r.weakestSubject} ${r.weakestPercent}%`),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: STATUS_TONE[r.status],
							children: bi(r.status, r.status === "متعثّر" ? "At risk" : r.status === "مراقبة" ? "Watch" : "Consistent")
						}, r.id),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-end gap-1",
							children: [can("supervisor_students", "edit") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "icon",
								variant: "ghost",
								onClick: () => openDialog(r),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" })
							}), can("supervisor_students", "delete") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "icon",
								variant: "ghost",
								className: "text-destructive",
								onClick: () => setPendingDelete(r),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
							})]
						}, `${r.id}-actions`)
					])
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					icon: "Users",
					text: bi("لا طلاب مسجّلين هون بعد.", "No students logged here yet.")
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open,
				onOpenChange: setOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "text-start",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: editingId ? bi("تعديل طالب", "Edit student") : bi("إضافة طالب", "Add student") }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "sr-name",
										children: bi("اسم الطالب", "Student name")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "sr-name",
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
										htmlFor: "sr-grade",
										children: bi("الصف", "Grade")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "sr-grade",
										value: form.gradeLabel,
										onChange: (e) => setForm((f) => ({
											...f,
											gradeLabel: e.target.value
										}))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "sr-subject",
										children: bi("أضعف مادة", "Weakest subject")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "sr-subject",
										value: form.weakestSubject,
										onChange: (e) => setForm((f) => ({
											...f,
											weakestSubject: e.target.value
										}))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "sr-percent",
										children: bi("النسبة (%)", "Score (%)")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "sr-percent",
										type: "number",
										min: 0,
										max: 100,
										value: form.weakestPercent,
										onChange: (e) => setForm((f) => ({
											...f,
											weakestPercent: e.target.value
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
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: "متعثّر",
												children: bi("متعثّر", "At risk")
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: "مراقبة",
												children: bi("مراقبة", "Watch")
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: "منتظم",
												children: bi("منتظم", "Consistent")
											})
										] })]
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
							className: "gap-2 sm:justify-start",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: () => saveMutation.mutate(),
								disabled: saveMutation.isPending || !form.studentName.trim(),
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
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: bi(`حذف «${pendingDelete?.studentName}»؟`, `Delete "${pendingDelete?.studentName}"?`) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: bi("لا يمكن التراجع عن هذا الإجراء.", "This action cannot be undone.") })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, {
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
