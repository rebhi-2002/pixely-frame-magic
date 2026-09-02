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
import { c as listTeacherPerformance, d as saveTeacherPerformance, r as deleteTeacherPerformance } from "./supervisor-oversight.functions-Bmdyil0d.mjs";
import { t as description } from "./supervisor.teachers-Ci0FOV1P.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/supervisor.teachers-EG-Q0ZVJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PageRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Guard, {
		pageKey: "supervisor_teachers",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, {})
	});
}
var EMPTY_FORM = {
	teacherName: "",
	subjectName: "",
	studentsCount: "0",
	responseHours: "0",
	gradingDays: "0",
	rating: "5",
	status: "جيد"
};
var STATUS_TONE = {
	ممتاز: "success",
	جيد: "primary",
	"تأخر تصحيح": "danger"
};
function Body() {
	const bi = useBi();
	const queryClient = useQueryClient();
	const { can } = useAccess();
	const fetchRows = useServerFn(listTeacherPerformance);
	const persist = useServerFn(saveTeacherPerformance);
	const remove = useServerFn(deleteTeacherPerformance);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [editingId, setEditingId] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)(EMPTY_FORM);
	const [pendingDelete, setPendingDelete] = (0, import_react.useState)(null);
	const { data: rows, isLoading } = useQuery({
		queryKey: ["teacher-performance"],
		queryFn: () => fetchRows()
	});
	const invalidate = () => queryClient.invalidateQueries({ queryKey: ["teacher-performance"] });
	const list = rows ?? [];
	const stats = (0, import_react.useMemo)(() => {
		if (!list.length) return {
			active: 0,
			avgResponse: 0,
			avgGrading: 0,
			avgRating: 0
		};
		return {
			active: list.length,
			avgResponse: Math.round(list.reduce((s, r) => s + r.responseHours, 0) / list.length),
			avgGrading: Math.round(list.reduce((s, r) => s + r.gradingDays, 0) / list.length * 10) / 10,
			avgRating: Math.round(list.reduce((s, r) => s + r.rating, 0) / list.length * 10) / 10
		};
	}, [list]);
	const saveMutation = useMutation({
		mutationFn: () => persist({ data: {
			...form,
			id: editingId ?? void 0,
			studentsCount: Number(form.studentsCount) || 0,
			responseHours: Number(form.responseHours) || 0,
			gradingDays: Number(form.gradingDays) || 0,
			rating: Number(form.rating) || 0
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
			teacherName: row.teacherName,
			subjectName: row.subjectName,
			studentsCount: String(row.studentsCount),
			responseHours: String(row.responseHours),
			gradingDays: String(row.gradingDays),
			rating: String(row.rating),
			status: row.status
		} : EMPTY_FORM);
		setOpen(true);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppPage, {
		title: bi("المعلمون", "Teachers"),
		icon: "Presentation",
		subtitle: bi(description, "Per-teacher performance: response time, grading speed and student mastery."),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatGrid, { items: [
				{
					icon: "Presentation",
					label: bi("معلمون نشطون", "Active teachers"),
					value: String(stats.active)
				},
				{
					icon: "Clock",
					label: bi("متوسط زمن الرد", "Avg. response"),
					value: bi(`${stats.avgResponse} س`, `${stats.avgResponse}h`)
				},
				{
					icon: "PenSquare",
					label: bi("متوسط زمن التصحيح", "Avg. grading"),
					value: bi(`${stats.avgGrading} يوم`, `${stats.avgGrading}d`)
				},
				{
					icon: "Star",
					label: bi("متوسط التقييم", "Avg. rating"),
					value: String(stats.avgRating)
				}
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: bi("قائمة المعلمين", "Teacher list"),
				icon: "Presentation",
				action: can("supervisor_teachers", "show_add_form") ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					onClick: () => openDialog(null),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), bi("إضافة معلم", "Add teacher")]
				}) : void 0,
				children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex justify-center py-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-5 animate-spin text-primary" })
				}) : list.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
					head: [
						bi("المعلم", "Teacher"),
						bi("المادة", "Subject"),
						bi("طلاب", "Students"),
						bi("الحالة", "Status"),
						bi("", "")
					],
					rows: list.map((r) => [
						r.teacherName,
						r.subjectName,
						String(r.studentsCount),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: STATUS_TONE[r.status],
							children: bi(r.status, r.status === "ممتاز" ? "Excellent" : r.status === "جيد" ? "Good" : "Grading delay")
						}, r.id),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-end gap-1",
							children: [can("supervisor_teachers", "edit") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "icon",
								variant: "ghost",
								onClick: () => openDialog(r),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" })
							}), can("supervisor_teachers", "delete") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "icon",
								variant: "ghost",
								className: "text-destructive",
								onClick: () => setPendingDelete(r),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
							})]
						}, `${r.id}-actions`)
					])
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					icon: "Presentation",
					text: bi("لا معلمون بعد.", "No teachers yet.")
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open,
				onOpenChange: setOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "text-start",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: editingId ? bi("تعديل معلم", "Edit teacher") : bi("إضافة معلم", "Add teacher") }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "tp-name",
										children: bi("اسم المعلم", "Teacher name")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "tp-name",
										value: form.teacherName,
										onChange: (e) => setForm((f) => ({
											...f,
											teacherName: e.target.value
										}))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "tp-subject",
										children: bi("المادة", "Subject")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "tp-subject",
										value: form.subjectName,
										onChange: (e) => setForm((f) => ({
											...f,
											subjectName: e.target.value
										}))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "tp-students",
										children: bi("عدد الطلاب", "Students")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "tp-students",
										type: "number",
										min: 0,
										value: form.studentsCount,
										onChange: (e) => setForm((f) => ({
											...f,
											studentsCount: e.target.value
										}))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: bi("الحالة", "Status") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										value: form.status,
										onValueChange: (v) => setForm((f) => ({
											...f,
											status: v
										})),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: "ممتاز",
												children: bi("ممتاز", "Excellent")
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: "جيد",
												children: bi("جيد", "Good")
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: "تأخر تصحيح",
												children: bi("تأخر تصحيح", "Grading delay")
											})
										] })]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "tp-response",
										children: bi("زمن الرد (ساعات)", "Response (hours)")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "tp-response",
										type: "number",
										min: 0,
										value: form.responseHours,
										onChange: (e) => setForm((f) => ({
											...f,
											responseHours: e.target.value
										}))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "tp-grading",
										children: bi("زمن التصحيح (أيام)", "Grading (days)")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "tp-grading",
										type: "number",
										min: 0,
										step: "0.1",
										value: form.gradingDays,
										onChange: (e) => setForm((f) => ({
											...f,
											gradingDays: e.target.value
										}))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5 sm:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "tp-rating",
										children: bi("التقييم (من 5)", "Rating (out of 5)")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "tp-rating",
										type: "number",
										min: 0,
										max: 5,
										step: "0.1",
										value: form.rating,
										onChange: (e) => setForm((f) => ({
											...f,
											rating: e.target.value
										}))
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
							className: "gap-2 sm:justify-start",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: () => saveMutation.mutate(),
								disabled: saveMutation.isPending || !form.teacherName.trim(),
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
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: bi(`حذف «${pendingDelete?.teacherName}»؟`, `Delete "${pendingDelete?.teacherName}"?`) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: bi("لا يمكن التراجع عن هذا الإجراء.", "This action cannot be undone.") })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, {
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
