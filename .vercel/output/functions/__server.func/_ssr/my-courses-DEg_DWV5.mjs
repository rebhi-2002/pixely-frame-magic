import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { A as useBi, p as getErrorMessage } from "./rbac-static-data-DgiM51a_.mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { F as Plus, I as Pencil, m as Trash2, tt as LoaderCircle } from "../_libs/lucide-react.mjs";
import { n as useServerFn } from "./createSsrRpc-1tfOdKec.mjs";
import { d as useAccess } from "./use-access-oB6fzdbG.mjs";
import { n as Guard } from "./guard-BiWzjvf6.mjs";
import { t as Button } from "./button-DfTXnEII.mjs";
import { i as EmptyState, l as RowList, o as Panel, t as AppPage, u as StatGrid } from "./kit--a5tGQyM.mjs";
import { t as Input } from "./input-D0-bbXyS.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, r as DialogFooter, t as Dialog } from "./dialog-CE79KVEh.mjs";
import { a as AlertDialogDescription, c as AlertDialogTitle, i as AlertDialogContent, n as AlertDialogAction, o as AlertDialogFooter, r as AlertDialogCancel, s as AlertDialogHeader, t as AlertDialog } from "./alert-dialog-CRZk8vpy.mjs";
import { d as saveEnrollment, o as listEnrollments, t as deleteEnrollment } from "./student-learning.functions-OnB3dj69.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-CbSL31Oe.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/my-courses-DEg_DWV5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var description = "الكورسات التي اشتركت فيها فعلياً — تقدّمك، الحصة القادمة، وشهادة الإتمام.";
function PageRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Guard, {
		pageKey: "student_my_courses",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, {})
	});
}
var EMPTY_FORM = {
	courseTitle: "",
	teacherName: "",
	progressPercent: "0",
	nextSessionLabel: "",
	status: "قيد الدراسة"
};
function Body() {
	const bi = useBi();
	const queryClient = useQueryClient();
	const { can } = useAccess();
	const fetchRows = useServerFn(listEnrollments);
	const persist = useServerFn(saveEnrollment);
	const remove = useServerFn(deleteEnrollment);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [editingId, setEditingId] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)(EMPTY_FORM);
	const [pendingDelete, setPendingDelete] = (0, import_react.useState)(null);
	const { data: rows, isLoading } = useQuery({
		queryKey: ["enrollments"],
		queryFn: () => fetchRows()
	});
	const invalidate = () => queryClient.invalidateQueries({ queryKey: ["enrollments"] });
	const active = (0, import_react.useMemo)(() => (rows ?? []).filter((r) => r.status === "قيد الدراسة"), [rows]);
	const completed = (0, import_react.useMemo)(() => (rows ?? []).filter((r) => r.status === "مكتمل"), [rows]);
	const watchHours = (0, import_react.useMemo)(() => Math.round((rows ?? []).reduce((sum, r) => sum + r.progressPercent, 0) / 10), [rows]);
	const saveMutation = useMutation({
		mutationFn: () => persist({ data: {
			...form,
			id: editingId ?? void 0,
			progressPercent: Number(form.progressPercent) || 0
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
			toast.success(bi("تمت الإزالة من قائمتك", "Removed from your list"));
		},
		onError: (e) => toast.error(getErrorMessage(e, bi("تعذّر الحذف", "Failed to delete")))
	});
	function openDialog(row) {
		setEditingId(row?.id ?? null);
		setForm(row ? {
			courseTitle: row.courseTitle,
			teacherName: row.teacherName,
			progressPercent: String(row.progressPercent),
			nextSessionLabel: row.nextSessionLabel,
			status: row.status
		} : EMPTY_FORM);
		setOpen(true);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppPage, {
		title: bi("كورساتي", "My courses"),
		icon: "BookOpenCheck",
		subtitle: bi(description, "Courses you actually enrolled in — progress, next session and completion certificate."),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatGrid, { items: [
				{
					icon: "BookOpenCheck",
					label: bi("كورسات نشطة", "Active courses"),
					value: String(active.length)
				},
				{
					icon: "CheckCircle2",
					label: bi("مكتملة", "Completed"),
					value: String(completed.length)
				},
				{
					icon: "Timer",
					label: bi("ساعات مشاهدة", "Watch hours"),
					value: String(watchHours)
				},
				{
					icon: "Award",
					label: bi("شهادات", "Certificates"),
					value: String(completed.length)
				}
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: bi("كورساتك النشطة", "Active courses"),
				icon: "BookOpenCheck",
				action: can("student_my_courses", "show_add_form") ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					onClick: () => openDialog(null),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), bi("إضافة كورس", "Add course")]
				}) : void 0,
				children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex justify-center py-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-5 animate-spin text-primary" })
				}) : active.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowList, { rows: active.map((r) => ({
					title: r.courseTitle + (r.teacherName ? ` — ${r.teacherName}` : ""),
					meta: r.nextSessionLabel,
					value: `${r.progressPercent}%`,
					tone: "primary",
					actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1",
						children: [can("student_my_courses", "edit") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "icon",
							variant: "ghost",
							onClick: () => openDialog(r),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" })
						}), can("student_my_courses", "delete") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "icon",
							variant: "ghost",
							className: "text-destructive",
							onClick: () => setPendingDelete(r),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
						})]
					})
				})) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					icon: "BookOpenCheck",
					text: bi("ما في كورسات نشطة — ابدأ بإضافة أول كورس لك.", "No active courses — start by adding your first one.")
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: bi("كورسات أكملتها", "Completed"),
				icon: "CheckCircle2",
				children: completed.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowList, {
					to: "/my-certificates",
					rows: completed.map((r) => ({
						title: r.courseTitle,
						meta: r.teacherName,
						value: bi("شهادة", "Certificate"),
						tone: "success"
					}))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					icon: "Award",
					text: bi("ولا كورس مكتمل بعد — كمّل أول كورس عشان تحصل شهادتك.", "No completed courses yet — finish your first one to earn a certificate.")
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open,
				onOpenChange: setOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "text-start",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: editingId ? bi("تعديل كورس", "Edit course") : bi("إضافة كورس", "Add course") }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5 sm:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "enr-title",
										children: bi("اسم الكورس", "Course title")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "enr-title",
										value: form.courseTitle,
										onChange: (e) => setForm((f) => ({
											...f,
											courseTitle: e.target.value
										}))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "enr-teacher",
										children: bi("المعلم", "Teacher")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "enr-teacher",
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
										htmlFor: "enr-progress",
										children: bi("نسبة الإنجاز (%)", "Progress (%)")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "enr-progress",
										type: "number",
										min: 0,
										max: 100,
										value: form.progressPercent,
										onChange: (e) => setForm((f) => ({
											...f,
											progressPercent: e.target.value
										}))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "enr-next",
										children: bi("الحصة القادمة", "Next session")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "enr-next",
										value: form.nextSessionLabel,
										onChange: (e) => setForm((f) => ({
											...f,
											nextSessionLabel: e.target.value
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
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "قيد الدراسة",
											children: bi("قيد الدراسة", "In progress")
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "مكتمل",
											children: bi("مكتمل", "Completed")
										})] })]
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
							className: "gap-2 sm:justify-start",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: () => saveMutation.mutate(),
								disabled: saveMutation.isPending || !form.courseTitle.trim(),
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
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: bi(`إزالة «${pendingDelete?.courseTitle}»؟`, `Remove "${pendingDelete?.courseTitle}"?`) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: bi("لا يمكن التراجع عن هذا الإجراء.", "This action cannot be undone.") })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, {
						className: "gap-2 sm:justify-start",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
							onClick: () => pendingDelete && deleteMutation.mutate(pendingDelete.id),
							children: bi("إزالة", "Remove")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: bi("إلغاء", "Cancel") })]
					})]
				})
			})
		]
	});
}
//#endregion
export { PageRoute as component };
