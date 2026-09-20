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
import { i as EmptyState, l as RowList, o as Panel, s as Progress, t as AppPage, u as StatGrid } from "./kit--a5tGQyM.mjs";
import { t as Input } from "./input-D0-bbXyS.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, r as DialogFooter, t as Dialog } from "./dialog-CE79KVEh.mjs";
import { a as AlertDialogDescription, c as AlertDialogTitle, i as AlertDialogContent, n as AlertDialogAction, o as AlertDialogFooter, r as AlertDialogCancel, s as AlertDialogHeader, t as AlertDialog } from "./alert-dialog-CRZk8vpy.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-CbSL31Oe.mjs";
import { o as listQuizItems, s as listTeacherCourses } from "./teacher-teaching.functions-D_QDlVah.mjs";
import { c as saveMissedQuestion, o as listMissedQuestions, r as deleteMissedQuestion } from "./teacher-followup.functions-DxyZt22N.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/teacher.analytics-BKUaxXw4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var description = "أين يتعثّر طلابك بالضبط: أسئلة يخطئ فيها الأكثر، وإتقان كل اختبار.";
function PageRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Guard, {
		pageKey: "teacher_analytics",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, {})
	});
}
var EMPTY_FORM = {
	questionTitle: "",
	wrongPercent: "50",
	priority: "مراجعة"
};
function Body() {
	const bi = useBi();
	const queryClient = useQueryClient();
	const { can } = useAccess();
	const fetchMissed = useServerFn(listMissedQuestions);
	const persist = useServerFn(saveMissedQuestion);
	const remove = useServerFn(deleteMissedQuestion);
	const fetchQuizzes = useServerFn(listQuizItems);
	const fetchCourses = useServerFn(listTeacherCourses);
	const missedQuery = useQuery({
		queryKey: ["missed-questions"],
		queryFn: () => fetchMissed()
	});
	const quizzesQuery = useQuery({
		queryKey: ["teacher-quizzes"],
		queryFn: () => fetchQuizzes()
	});
	const coursesQuery = useQuery({
		queryKey: ["teacher-courses"],
		queryFn: () => fetchCourses()
	});
	const [open, setOpen] = (0, import_react.useState)(false);
	const [editingId, setEditingId] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)(EMPTY_FORM);
	const [pendingDelete, setPendingDelete] = (0, import_react.useState)(null);
	const isLoading = missedQuery.isLoading || quizzesQuery.isLoading || coursesQuery.isLoading;
	const missed = (0, import_react.useMemo)(() => missedQuery.data ?? [], [missedQuery.data]);
	const quizzes = (quizzesQuery.data ?? []).filter((q) => q.attemptsCount > 0);
	const activeStudents = (0, import_react.useMemo)(() => coursesQuery.data ?? [], [coursesQuery.data]).reduce((s, c) => s + c.enrolledCount, 0);
	const avgMastery = quizzes.length ? Math.round(quizzes.reduce((s, q) => s + q.avgScore, 0) / quizzes.length) : 0;
	const weakQuizzes = quizzes.filter((q) => q.avgScore < 60).length;
	const invalidate = () => queryClient.invalidateQueries({ queryKey: ["missed-questions"] });
	const saveMutation = useMutation({
		mutationFn: () => persist({ data: {
			...form,
			id: editingId ?? void 0,
			wrongPercent: Number(form.wrongPercent) || 0
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
			questionTitle: row.questionTitle,
			wrongPercent: String(row.wrongPercent),
			priority: row.priority
		} : EMPTY_FORM);
		setOpen(true);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppPage, {
		title: bi("التحليلات", "Analytics"),
		icon: "LineChart",
		subtitle: bi(description, "Exactly where students struggle: most-missed questions and per-quiz mastery."),
		children: [
			isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex justify-center py-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-6 animate-spin text-primary" })
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatGrid, { items: [
					{
						icon: "Users",
						label: bi("طلاب نشطون", "Active students"),
						value: String(activeStudents)
					},
					{
						icon: "Percent",
						label: bi("متوسط الإتقان", "Avg. mastery"),
						value: `${avgMastery}%`
					},
					{
						icon: "ListChecks",
						label: bi("اختبارات مقيّمة", "Scored quizzes"),
						value: String(quizzes.length)
					},
					{
						icon: "AlertTriangle",
						label: bi("اختبارات ضعيفة", "Weak quizzes"),
						value: String(weakQuizzes)
					}
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: bi("إتقان الاختبارات", "Quiz mastery"),
					icon: "LineChart",
					children: quizzes.length ? quizzes.map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
						label: q.title,
						value: q.avgScore
					}, q.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
						icon: "LineChart",
						text: bi("لا اختبارات فيها محاولات بعد.", "No quizzes with attempts yet.")
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: bi("الأسئلة الأكثر خطأً", "Most-missed questions"),
					icon: "XCircle",
					action: can("teacher_analytics", "show_add_form") ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						onClick: () => openDialog(null),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), bi("إضافة سؤال", "Add question")]
					}) : void 0,
					children: missed.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowList, { rows: missed.map((m) => ({
						title: m.questionTitle,
						meta: bi(`${m.wrongPercent}% أخطأوا`, `${m.wrongPercent}% wrong`),
						value: bi(m.priority, m.priority === "أولوية" ? "Priority" : "Review"),
						tone: m.priority === "أولوية" ? "danger" : "primary",
						actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1",
							children: [can("teacher_analytics", "edit") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "icon",
								variant: "ghost",
								onClick: () => openDialog(m),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" })
							}), can("teacher_analytics", "delete") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "icon",
								variant: "ghost",
								className: "text-destructive",
								onClick: () => setPendingDelete(m),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
							})]
						})
					})) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
						icon: "XCircle",
						text: bi("ولا سؤال مسجّل بعد.", "No questions logged yet.")
					})
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open,
				onOpenChange: setOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "text-start",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: editingId ? bi("تعديل سؤال", "Edit question") : bi("إضافة سؤال", "Add question") }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5 sm:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "mq-title",
										children: bi("السؤال", "Question")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "mq-title",
										value: form.questionTitle,
										onChange: (e) => setForm((f) => ({
											...f,
											questionTitle: e.target.value
										}))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "mq-percent",
										children: bi("نسبة الخطأ (%)", "Wrong (%)")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "mq-percent",
										type: "number",
										min: 0,
										max: 100,
										value: form.wrongPercent,
										onChange: (e) => setForm((f) => ({
											...f,
											wrongPercent: e.target.value
										}))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: bi("الأولوية", "Priority") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										value: form.priority,
										onValueChange: (v) => setForm((f) => ({
											...f,
											priority: v
										})),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "مراجعة",
											children: bi("مراجعة", "Review")
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "أولوية",
											children: bi("أولوية", "Priority")
										})] })]
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
							className: "gap-2 sm:justify-start",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: () => saveMutation.mutate(),
								disabled: saveMutation.isPending || !form.questionTitle.trim(),
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
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: bi(`حذف «${pendingDelete?.questionTitle}»؟`, `Delete "${pendingDelete?.questionTitle}"?`) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: bi("لا يمكن التراجع عن هذا الإجراء.", "This action cannot be undone.") })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, {
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
