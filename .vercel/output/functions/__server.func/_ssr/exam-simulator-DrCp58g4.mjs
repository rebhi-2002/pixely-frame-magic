import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { f as getErrorMessage, k as useBi } from "./rbac-static-data-Bv6QEjHq.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { E as Pencil, H as LoaderCircle, T as Plus, l as Trash2 } from "../_libs/lucide-react.mjs";
import { A as description$25 } from "./router-D9hWsH17.mjs";
import { n as useServerFn } from "./createSsrRpc-Deneh4is.mjs";
import { d as useAccess } from "./use-access-BL6Bw5Ej.mjs";
import { n as Guard } from "./guard-Dpfucbbc.mjs";
import { t as Button } from "./button-Nx-_C_c8.mjs";
import { a as Panel, c as RowList, i as EmptyState, l as StatGrid, n as Badge, r as DataTable, t as AppPage } from "./kit-DhXVWrh8.mjs";
import { t as Input } from "./input-D0-bbXyS.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, o as Label, r as DialogFooter, t as Dialog } from "./dialog-1uq10XBZ.mjs";
import { a as AlertDialogDescription, c as AlertDialogTitle, i as AlertDialogContent, n as AlertDialogAction, o as AlertDialogFooter, r as AlertDialogCancel, s as AlertDialogHeader, t as AlertDialog } from "./alert-dialog-OIHj-NyW.mjs";
import { a as deleteMockExam, c as listExamAttempts, h as saveMockExam, p as saveExamAttempt, r as deleteExamAttempt, u as listMockExams } from "./student-evaluation.functions-3Zz7sFfU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/exam-simulator-DrCp58g4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PageRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Guard, {
		pageKey: "student_exam",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, {})
	});
}
var EXAM_EMPTY_FORM = {
	title: "",
	questionsCount: "10",
	minutesLimit: "15"
};
var ATTEMPT_EMPTY_FORM = {
	examTitle: "",
	dateLabel: "",
	scorePercent: "0",
	minutesTaken: "0"
};
function scoreTone(score) {
	if (score >= 80) return "success";
	if (score >= 60) return "primary";
	return "danger";
}
function Body() {
	const bi = useBi();
	const queryClient = useQueryClient();
	const { can } = useAccess();
	const fetchExams = useServerFn(listMockExams);
	const persistExam = useServerFn(saveMockExam);
	const removeExam = useServerFn(deleteMockExam);
	const fetchAttempts = useServerFn(listExamAttempts);
	const persistAttempt = useServerFn(saveExamAttempt);
	const removeAttempt = useServerFn(deleteExamAttempt);
	const examsQuery = useQuery({
		queryKey: ["mock-exams"],
		queryFn: () => fetchExams()
	});
	const attemptsQuery = useQuery({
		queryKey: ["exam-attempts"],
		queryFn: () => fetchAttempts()
	});
	const [examOpen, setExamOpen] = (0, import_react.useState)(false);
	const [editingExamId, setEditingExamId] = (0, import_react.useState)(null);
	const [examForm, setExamForm] = (0, import_react.useState)(EXAM_EMPTY_FORM);
	const [pendingDeleteExam, setPendingDeleteExam] = (0, import_react.useState)(null);
	const [attemptOpen, setAttemptOpen] = (0, import_react.useState)(false);
	const [editingAttemptId, setEditingAttemptId] = (0, import_react.useState)(null);
	const [attemptForm, setAttemptForm] = (0, import_react.useState)(ATTEMPT_EMPTY_FORM);
	const [pendingDeleteAttempt, setPendingDeleteAttempt] = (0, import_react.useState)(null);
	const attempts = attemptsQuery.data ?? [];
	const stats = (0, import_react.useMemo)(() => {
		if (!attempts.length) return {
			taken: 0,
			best: 0,
			avgMinutes: 0
		};
		const best = Math.max(...attempts.map((a) => a.scorePercent));
		const avgMinutes = Math.round(attempts.reduce((s, a) => s + a.minutesTaken, 0) / attempts.length);
		return {
			taken: attempts.length,
			best,
			avgMinutes
		};
	}, [attempts]);
	const examSaveMutation = useMutation({
		mutationFn: () => persistExam({ data: {
			id: editingExamId ?? void 0,
			title: examForm.title,
			questionsCount: Number(examForm.questionsCount) || 1,
			minutesLimit: Number(examForm.minutesLimit) || 1
		} }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["mock-exams"] });
			setExamOpen(false);
			toast.success(bi("تم الحفظ", "Saved successfully"));
		},
		onError: (e) => toast.error(getErrorMessage(e, bi("تعذّر الحفظ", "Failed to save")))
	});
	const examDeleteMutation = useMutation({
		mutationFn: (id) => removeExam({ data: { id } }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["mock-exams"] });
			setPendingDeleteExam(null);
			toast.success(bi("تم الحذف", "Deleted successfully"));
		},
		onError: (e) => toast.error(getErrorMessage(e, bi("تعذّر الحذف", "Failed to delete")))
	});
	const attemptSaveMutation = useMutation({
		mutationFn: () => persistAttempt({ data: {
			id: editingAttemptId ?? void 0,
			examTitle: attemptForm.examTitle,
			dateLabel: attemptForm.dateLabel,
			scorePercent: Number(attemptForm.scorePercent) || 0,
			minutesTaken: Number(attemptForm.minutesTaken) || 0
		} }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["exam-attempts"] });
			setAttemptOpen(false);
			toast.success(bi("تم الحفظ", "Saved successfully"));
		},
		onError: (e) => toast.error(getErrorMessage(e, bi("تعذّر الحفظ", "Failed to save")))
	});
	const attemptDeleteMutation = useMutation({
		mutationFn: (id) => removeAttempt({ data: { id } }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["exam-attempts"] });
			setPendingDeleteAttempt(null);
			toast.success(bi("تم الحذف", "Deleted successfully"));
		},
		onError: (e) => toast.error(getErrorMessage(e, bi("تعذّر الحذف", "Failed to delete")))
	});
	function startExam(exam) {
		setEditingAttemptId(null);
		setAttemptForm({
			examTitle: exam.title,
			dateLabel: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
			scorePercent: "0",
			minutesTaken: "0"
		});
		setAttemptOpen(true);
	}
	function openExamDialog(row) {
		setEditingExamId(row?.id ?? null);
		setExamForm(row ? {
			title: row.title,
			questionsCount: String(row.questionsCount),
			minutesLimit: String(row.minutesLimit)
		} : EXAM_EMPTY_FORM);
		setExamOpen(true);
	}
	function openAttemptDialog(row) {
		setEditingAttemptId(row?.id ?? null);
		setAttemptForm(row ? {
			examTitle: row.examTitle,
			dateLabel: row.dateLabel,
			scorePercent: String(row.scorePercent),
			minutesTaken: String(row.minutesTaken)
		} : ATTEMPT_EMPTY_FORM);
		setAttemptOpen(true);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppPage, {
		title: bi("محاكي الامتحان", "Exam simulator"),
		icon: "Timer",
		subtitle: bi(description$25, "A timed mock exam that looks like the real paper, with analysis that exposes weak spots."),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatGrid, { items: [
				{
					icon: "FileCheck2",
					label: bi("امتحانات أنهيتها", "Exams taken"),
					value: String(stats.taken)
				},
				{
					icon: "Percent",
					label: bi("أفضل نتيجة", "Best score"),
					value: `${stats.best}%`
				},
				{
					icon: "Timer",
					label: bi("متوسط الوقت", "Avg. time"),
					value: bi(`${stats.avgMinutes} د`, `${stats.avgMinutes} min`)
				},
				{
					icon: "Target",
					label: bi("الهدف", "Target"),
					value: "90%"
				}
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: bi("امتحانات جاهزة", "Ready mock exams"),
				icon: "FileText",
				action: can("student_exam", "show_add_form") ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					onClick: () => openExamDialog(null),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), bi("إضافة امتحان", "Add exam")]
				}) : void 0,
				children: examsQuery.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex justify-center py-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-5 animate-spin text-primary" })
				}) : examsQuery.data?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowList, { rows: examsQuery.data.map((e) => ({
					title: e.title,
					meta: bi(`${e.questionsCount} سؤالاً · ${e.minutesLimit} دقيقة`, `${e.questionsCount} questions · ${e.minutesLimit} min`),
					value: bi("ابدأ", "Start"),
					tone: "primary",
					actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "outline",
								onClick: () => startExam(e),
								children: bi("ابدأ", "Start")
							}),
							can("student_exam", "edit") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "icon",
								variant: "ghost",
								onClick: () => openExamDialog(e),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" })
							}),
							can("student_exam", "delete") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "icon",
								variant: "ghost",
								className: "text-destructive",
								onClick: () => setPendingDeleteExam(e),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
							})
						]
					})
				})) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					icon: "FileText",
					text: bi("لا امتحانات جاهزة بعد.", "No ready exams yet.")
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: bi("نتائجك السابقة", "Past results"),
				icon: "History",
				action: can("student_exam", "show_add_form") ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					variant: "outline",
					onClick: () => openAttemptDialog(null),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), bi("تسجيل نتيجة", "Log result")]
				}) : void 0,
				children: attemptsQuery.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex justify-center py-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-5 animate-spin text-primary" })
				}) : attempts.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
					head: [
						bi("الامتحان", "Exam"),
						bi("التاريخ", "Date"),
						bi("النتيجة", "Score"),
						bi("الوقت", "Time"),
						bi("", "")
					],
					rows: attempts.map((a) => [
						a.examTitle,
						a.dateLabel,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
							tone: scoreTone(a.scorePercent),
							children: [a.scorePercent, "%"]
						}, a.id),
						bi(`${a.minutesTaken} د`, `${a.minutesTaken} min`),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-end gap-1",
							children: [can("student_exam", "edit") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "icon",
								variant: "ghost",
								onClick: () => openAttemptDialog(a),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" })
							}), can("student_exam", "delete") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "icon",
								variant: "ghost",
								className: "text-destructive",
								onClick: () => setPendingDeleteAttempt(a),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
							})]
						}, `${a.id}-actions`)
					])
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					icon: "History",
					text: bi("ما في نتائج مسجّلة بعد.", "No results logged yet.")
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: examOpen,
				onOpenChange: setExamOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "text-start",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: editingExamId ? bi("تعديل امتحان", "Edit exam") : bi("إضافة امتحان", "Add exam") }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5 sm:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "mex-title",
										children: bi("العنوان", "Title")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "mex-title",
										value: examForm.title,
										onChange: (e) => setExamForm((f) => ({
											...f,
											title: e.target.value
										}))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "mex-q",
										children: bi("عدد الأسئلة", "Questions")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "mex-q",
										type: "number",
										min: 1,
										value: examForm.questionsCount,
										onChange: (e) => setExamForm((f) => ({
											...f,
											questionsCount: e.target.value
										}))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "mex-min",
										children: bi("المدة (دقائق)", "Duration (min)")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "mex-min",
										type: "number",
										min: 1,
										value: examForm.minutesLimit,
										onChange: (e) => setExamForm((f) => ({
											...f,
											minutesLimit: e.target.value
										}))
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
							className: "gap-2 sm:justify-start",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: () => examSaveMutation.mutate(),
								disabled: examSaveMutation.isPending || !examForm.title.trim(),
								children: bi("حفظ", "Save")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								onClick: () => setExamOpen(false),
								children: bi("إلغاء", "Cancel")
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: attemptOpen,
				onOpenChange: setAttemptOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "text-start",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: editingAttemptId ? bi("تعديل نتيجة", "Edit result") : bi("تسجيل نتيجة", "Log result") }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5 sm:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "att-title",
										children: bi("الامتحان", "Exam")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "att-title",
										value: attemptForm.examTitle,
										onChange: (e) => setAttemptForm((f) => ({
											...f,
											examTitle: e.target.value
										}))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "att-date",
										children: bi("التاريخ", "Date")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "att-date",
										value: attemptForm.dateLabel,
										onChange: (e) => setAttemptForm((f) => ({
											...f,
											dateLabel: e.target.value
										}))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "att-score",
										children: bi("النتيجة (%)", "Score (%)")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "att-score",
										type: "number",
										min: 0,
										max: 100,
										value: attemptForm.scorePercent,
										onChange: (e) => setAttemptForm((f) => ({
											...f,
											scorePercent: e.target.value
										}))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5 sm:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "att-minutes",
										children: bi("الوقت المستغرق (دقيقة)", "Time taken (min)")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "att-minutes",
										type: "number",
										min: 0,
										value: attemptForm.minutesTaken,
										onChange: (e) => setAttemptForm((f) => ({
											...f,
											minutesTaken: e.target.value
										}))
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
							className: "gap-2 sm:justify-start",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: () => attemptSaveMutation.mutate(),
								disabled: attemptSaveMutation.isPending || !attemptForm.examTitle.trim(),
								children: bi("حفظ", "Save")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								onClick: () => setAttemptOpen(false),
								children: bi("إلغاء", "Cancel")
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
				open: !!pendingDeleteExam,
				onOpenChange: (v) => !v && setPendingDeleteExam(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, {
					className: "text-start",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: bi(`حذف «${pendingDeleteExam?.title}»؟`, `Delete "${pendingDeleteExam?.title}"?`) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: bi("لا يمكن التراجع عن هذا الإجراء.", "This action cannot be undone.") })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, {
						className: "gap-2 sm:justify-start",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
							onClick: () => pendingDeleteExam && examDeleteMutation.mutate(pendingDeleteExam.id),
							children: bi("حذف", "Delete")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: bi("إلغاء", "Cancel") })]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
				open: !!pendingDeleteAttempt,
				onOpenChange: (v) => !v && setPendingDeleteAttempt(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, {
					className: "text-start",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: bi("حذف هذه النتيجة؟", "Delete this result?") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: bi("لا يمكن التراجع عن هذا الإجراء.", "This action cannot be undone.") })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, {
						className: "gap-2 sm:justify-start",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
							onClick: () => pendingDeleteAttempt && attemptDeleteMutation.mutate(pendingDeleteAttempt.id),
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
