import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { f as getErrorMessage, k as useBi } from "./rbac-static-data-JRz-nJtL.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { M as Pencil, Y as LoaderCircle, j as Plus, p as Trash2 } from "../_libs/lucide-react.mjs";
import { C as description$18 } from "./router-B49B_5De.mjs";
import { n as useServerFn } from "./createSsrRpc-C7KQUoXf.mjs";
import { d as useAccess } from "./use-access-Cx_9PD_P.mjs";
import { n as Guard } from "./guard-DJBJLisT.mjs";
import { t as Button } from "./button-Nx-_C_c8.mjs";
import { a as Panel, i as EmptyState, l as StatGrid, n as Badge, r as DataTable, t as AppPage } from "./kit-BNtAyy6W.mjs";
import { t as Input } from "./input-D0-bbXyS.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, o as Label, r as DialogFooter, t as Dialog } from "./dialog-1uq10XBZ.mjs";
import { t as Switch } from "./switch-Cn1w-cIH.mjs";
import { a as AlertDialogDescription, c as AlertDialogTitle, i as AlertDialogContent, n as AlertDialogAction, o as AlertDialogFooter, r as AlertDialogCancel, s as AlertDialogHeader, t as AlertDialog } from "./alert-dialog-OIHj-NyW.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-CbSL31Oe.mjs";
import { i as deleteScheduleEvent, m as saveScheduleEvent, u as listScheduleEvents } from "./student-social.functions-BzDqB0iU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/schedule-mpVQghSr.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PageRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Guard, {
		pageKey: "student_schedule",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, {})
	});
}
var EMPTY_FORM = {
	dayAr: "",
	dayEn: "",
	activityTitle: "",
	timeLabel: "",
	type: "حصة",
	hoursPlanned: "1",
	reminderOn: true,
	overdue: false
};
var TYPE_TONE = {
	حصة: "success",
	مراجعة: "primary",
	امتحان: "danger",
	واجب: "muted"
};
function Body() {
	const bi = useBi();
	const queryClient = useQueryClient();
	const { can } = useAccess();
	const fetchRows = useServerFn(listScheduleEvents);
	const persist = useServerFn(saveScheduleEvent);
	const remove = useServerFn(deleteScheduleEvent);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [editingId, setEditingId] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)(EMPTY_FORM);
	const [pendingDelete, setPendingDelete] = (0, import_react.useState)(null);
	const { data: rows, isLoading } = useQuery({
		queryKey: ["schedule-events"],
		queryFn: () => fetchRows()
	});
	const invalidate = () => queryClient.invalidateQueries({ queryKey: ["schedule-events"] });
	const list = rows ?? [];
	const stats = (0, import_react.useMemo)(() => ({
		count: list.length,
		reminders: list.filter((r) => r.reminderOn).length,
		overdue: list.filter((r) => r.overdue).length,
		hours: list.reduce((s, r) => s + r.hoursPlanned, 0)
	}), [list]);
	const saveMutation = useMutation({
		mutationFn: () => persist({ data: {
			...form,
			id: editingId ?? void 0,
			hoursPlanned: Number(form.hoursPlanned) || 0,
			dayEn: form.dayEn || form.dayAr
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
			dayAr: row.dayAr,
			dayEn: row.dayEn,
			activityTitle: row.activityTitle,
			timeLabel: row.timeLabel,
			type: row.type,
			hoursPlanned: String(row.hoursPlanned),
			reminderOn: row.reminderOn,
			overdue: row.overdue
		} : EMPTY_FORM);
		setOpen(true);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppPage, {
		title: bi("الجدول", "Schedule"),
		icon: "CalendarDays",
		subtitle: bi(description$18, "A schedule that reminds you: classes, homework, exams and review sessions."),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatGrid, { items: [
				{
					icon: "CalendarDays",
					label: bi("أحداث هذا الأسبوع", "This week"),
					value: String(stats.count)
				},
				{
					icon: "BellRing",
					label: bi("معلَّمة كمهمة", "Marked important"),
					value: String(stats.reminders)
				},
				{
					icon: "ListChecks",
					label: bi("مهام متأخرة", "Overdue"),
					value: String(stats.overdue)
				},
				{
					icon: "Timer",
					label: bi("ساعات مخطّطة", "Planned hours"),
					value: String(stats.hours)
				}
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: bi("أسبوعك", "Your week"),
				icon: "CalendarDays",
				action: can("student_schedule", "show_add_form") ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					onClick: () => openDialog(null),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), bi("إضافة حدث", "Add event")]
				}) : void 0,
				children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex justify-center py-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-5 animate-spin text-primary" })
				}) : list.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
					head: [
						bi("اليوم", "Day"),
						bi("النشاط", "Activity"),
						bi("الوقت", "Time"),
						bi("النوع", "Type"),
						bi("", "")
					],
					rows: list.map((r) => [
						bi(r.dayAr, r.dayEn),
						r.activityTitle,
						r.timeLabel,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: TYPE_TONE[r.type],
							children: bi(r.type, r.type === "حصة" ? "Class" : r.type === "مراجعة" ? "Review" : r.type === "امتحان" ? "Exam" : "Homework")
						}, r.id),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-end gap-1",
							children: [can("student_schedule", "edit") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "icon",
								variant: "ghost",
								onClick: () => openDialog(r),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" })
							}), can("student_schedule", "delete") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "icon",
								variant: "ghost",
								className: "text-destructive",
								onClick: () => setPendingDelete(r),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
							})]
						}, `${r.id}-actions`)
					])
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					icon: "CalendarDays",
					text: bi("لا أحداث هذا الأسبوع بعد.", "No events this week yet.")
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open,
				onOpenChange: setOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "text-start",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: editingId ? bi("تعديل حدث", "Edit event") : bi("إضافة حدث", "Add event") }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5 sm:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "sch-title",
										children: bi("النشاط", "Activity")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "sch-title",
										value: form.activityTitle,
										onChange: (e) => setForm((f) => ({
											...f,
											activityTitle: e.target.value
										}))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "sch-day",
										children: bi("اليوم", "Day")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "sch-day",
										value: form.dayAr,
										onChange: (e) => setForm((f) => ({
											...f,
											dayAr: e.target.value
										}))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "sch-time",
										children: bi("الوقت", "Time")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "sch-time",
										value: form.timeLabel,
										onChange: (e) => setForm((f) => ({
											...f,
											timeLabel: e.target.value
										}))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: bi("النوع", "Type") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										value: form.type,
										onValueChange: (v) => setForm((f) => ({
											...f,
											type: v
										})),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: "حصة",
												children: bi("حصة", "Class")
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: "مراجعة",
												children: bi("مراجعة", "Review")
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: "امتحان",
												children: bi("امتحان", "Exam")
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: "واجب",
												children: bi("واجب", "Homework")
											})
										] })]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "sch-hours",
										children: bi("ساعات مخطّطة", "Planned hours")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "sch-hours",
										type: "number",
										min: 0,
										step: "0.5",
										value: form.hoursPlanned,
										onChange: (e) => setForm((f) => ({
											...f,
											hoursPlanned: e.target.value
										}))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
										id: "sch-reminder",
										checked: form.reminderOn,
										onCheckedChange: (v) => setForm((f) => ({
											...f,
											reminderOn: v
										}))
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "sch-reminder",
										children: bi("علّمها كمهمة (بدون إشعار فعلي حاليًا)", "Mark as important (no live alert yet)")
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
										id: "sch-overdue",
										checked: form.overdue,
										onCheckedChange: (v) => setForm((f) => ({
											...f,
											overdue: v
										}))
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "sch-overdue",
										children: bi("متأخر", "Overdue")
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
							className: "gap-2 sm:justify-start",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: () => saveMutation.mutate(),
								disabled: saveMutation.isPending || !form.activityTitle.trim() || !form.dayAr.trim(),
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
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: bi(`حذف «${pendingDelete?.activityTitle}»؟`, `Delete "${pendingDelete?.activityTitle}"?`) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: bi("لا يمكن التراجع عن هذا الإجراء.", "This action cannot be undone.") })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, {
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
