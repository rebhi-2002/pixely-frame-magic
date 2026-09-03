import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as useBi } from "./rbac-static-data-C-KJ3jWh.mjs";
import { n as useServerFn } from "./createSsrRpc-DYGk39x2.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { d as useAccess } from "./use-access-fcr9Vbpe.mjs";
import { n as Guard } from "./guard-C_ikEg3X.mjs";
import { E as Pencil, T as Plus, l as Trash2, v as Settings2 } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-RXwCFfhv.mjs";
import { a as Panel, c as RowList, i as EmptyState, l as StatGrid, o as Progress, s as QuickLinks, t as AppPage } from "./kit-DDkPK7fJ.mjs";
import { t as Input } from "./input-D0-bbXyS.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, o as Label, r as DialogFooter, t as Dialog } from "./dialog-1uq10XBZ.mjs";
import { a as AlertDialogDescription, c as AlertDialogTitle, i as AlertDialogContent, n as AlertDialogAction, o as AlertDialogFooter, r as AlertDialogCancel, s as AlertDialogHeader, t as AlertDialog } from "./alert-dialog-DwQS8Syk.mjs";
import { a as getStudyStats, c as listLibrarySubjects, g as updateWeeklyStudyMinutes, h as saveUpcomingTask, i as deleteUpcomingTask, l as listUpcomingTasks, m as saveStudyStats, u as listWeeklyStudyLog } from "./student-learning.functions-CijpEQDY.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-CbSL31Oe.mjs";
import { i as RetryButton, r as LoadingState, t as ErrorState } from "./feedback-states-D6gMAnZ7.mjs";
import { i as WelcomeBanner, r as TrendChart } from "./charts-BXF7if2_.mjs";
import { t as description } from "./dashboard-DZWQFTWS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-D_1j3__A.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PageRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Guard, {
		pageKey: "student_dashboard",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, {})
	});
}
var TASK_EMPTY_FORM = {
	title: "",
	whenLabel: "",
	type: "مراجعة"
};
var TASK_TONE = {
	امتحان: "primary",
	واجب: "muted",
	مراجعة: "success"
};
function Body() {
	const bi = useBi();
	const queryClient = useQueryClient();
	const { can } = useAccess();
	const fetchLog = useServerFn(listWeeklyStudyLog);
	const updateMinutes = useServerFn(updateWeeklyStudyMinutes);
	const fetchTasks = useServerFn(listUpcomingTasks);
	const persistTask = useServerFn(saveUpcomingTask);
	const removeTask = useServerFn(deleteUpcomingTask);
	const fetchStats = useServerFn(getStudyStats);
	const persistStats = useServerFn(saveStudyStats);
	const fetchSubjects = useServerFn(listLibrarySubjects);
	const logQuery = useQuery({
		queryKey: ["weekly-study-log"],
		queryFn: () => fetchLog()
	});
	const tasksQuery = useQuery({
		queryKey: ["upcoming-tasks"],
		queryFn: () => fetchTasks()
	});
	const statsQuery = useQuery({
		queryKey: ["study-stats"],
		queryFn: () => fetchStats()
	});
	const subjectsQuery = useQuery({
		queryKey: ["library-subjects"],
		queryFn: () => fetchSubjects()
	});
	const [minuteEdit, setMinuteEdit] = (0, import_react.useState)(null);
	const [statsOpen, setStatsOpen] = (0, import_react.useState)(false);
	const [statsForm, setStatsForm] = (0, import_react.useState)({
		streakDays: "0",
		achievementPoints: "0"
	});
	const [taskOpen, setTaskOpen] = (0, import_react.useState)(false);
	const [editingTaskId, setEditingTaskId] = (0, import_react.useState)(null);
	const [taskForm, setTaskForm] = (0, import_react.useState)(TASK_EMPTY_FORM);
	const [pendingDeleteTask, setPendingDeleteTask] = (0, import_react.useState)(null);
	const minutesMutation = useMutation({
		mutationFn: (vars) => updateMinutes({ data: vars }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["weekly-study-log"] });
			setMinuteEdit(null);
			toast.success(bi("تم التحديث", "Updated"));
		},
		onError: (e) => toast.error(e instanceof Error ? e.message : bi("تعذّر التحديث", "Failed to update"))
	});
	const statsMutation = useMutation({
		mutationFn: () => persistStats({ data: {
			streakDays: Number(statsForm.streakDays) || 0,
			achievementPoints: Number(statsForm.achievementPoints) || 0
		} }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["study-stats"] });
			setStatsOpen(false);
			toast.success(bi("تم الحفظ", "Saved successfully"));
		},
		onError: (e) => toast.error(e instanceof Error ? e.message : bi("تعذّر الحفظ", "Failed to save"))
	});
	const taskSaveMutation = useMutation({
		mutationFn: () => persistTask({ data: {
			...taskForm,
			id: editingTaskId ?? void 0
		} }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["upcoming-tasks"] });
			setTaskOpen(false);
			toast.success(bi("تم الحفظ", "Saved successfully"));
		},
		onError: (e) => toast.error(e instanceof Error ? e.message : bi("تعذّر الحفظ", "Failed to save"))
	});
	const taskDeleteMutation = useMutation({
		mutationFn: (id) => removeTask({ data: { id } }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["upcoming-tasks"] });
			setPendingDeleteTask(null);
			toast.success(bi("تم الحذف", "Deleted successfully"));
		},
		onError: (e) => toast.error(e instanceof Error ? e.message : bi("تعذّر الحذف", "Failed to delete"))
	});
	const isLoading = logQuery.isLoading || tasksQuery.isLoading || statsQuery.isLoading || subjectsQuery.isLoading;
	const hasError = logQuery.error || tasksQuery.error || statsQuery.error || subjectsQuery.error;
	const log = logQuery.data ?? [];
	const tasks = tasksQuery.data ?? [];
	const stats = statsQuery.data ?? {
		streakDays: 0,
		achievementPoints: 0
	};
	const subjects = subjectsQuery.data ?? [];
	const minutesToday = log.length ? log[log.length - 1].minutes : 0;
	const tasksDoneLabel = `${subjects.filter((s) => s.progressPercent >= 100).length}/${subjects.length || 0}`;
	function openTaskDialog(row) {
		setEditingTaskId(row?.id ?? null);
		setTaskForm(row ? {
			title: row.title,
			whenLabel: row.whenLabel,
			type: row.type
		} : TASK_EMPTY_FORM);
		setTaskOpen(true);
	}
	function openStatsDialog() {
		setStatsForm({
			streakDays: String(stats.streakDays),
			achievementPoints: String(stats.achievementPoints)
		});
		setStatsOpen(true);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppPage, {
		title: bi("لوحة الطالب", "Student dashboard"),
		icon: "LayoutDashboard",
		subtitle: bi(description, "Everything in one place: today's progress, upcoming tasks, and subjects that need review."),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WelcomeBanner, {
				subtitle: ["خطتك اليوم جاهزة — راجع مهامك القريبة وكمّل سلسلة أيامك المتتالية.", "Your plan for today is ready — check upcoming tasks and keep your streak going."],
				tip: [`${stats.streakDays} يوم متتالي 🔥 — لا تكسر السلسلة اليوم`, `${stats.streakDays}-day streak 🔥 — don't break it today`],
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					size: "sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/library",
						children: bi("افتح مكتبتك", "Open your library")
					})
				})
			}),
			isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingState, { label: bi("عم نجهّز لوحتك…", "Preparing your dashboard…") }) : hasError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, {
				title: bi("ما قدرنا نحمّل اللوحة", "We couldn't load the dashboard"),
				description: bi("جرّب التحديث مرة ثانية. إذا استمرت المشكلة، تأكد من اتصالك أو ارجع لاحقاً.", "Try again. If the problem continues, check your connection or come back later."),
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RetryButton, {
					label: bi("إعادة المحاولة", "Try again"),
					onClick: () => void queryClient.invalidateQueries()
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatGrid, { items: [
					{
						icon: "Flame",
						label: bi("أيام متتالية", "Streak days"),
						value: String(stats.streakDays)
					},
					{
						icon: "Timer",
						label: bi("دقائق دراسة اليوم", "Minutes studied today"),
						value: String(minutesToday)
					},
					{
						icon: "ListChecks",
						label: bi("مواد مكتملة", "Subjects done"),
						value: tasksDoneLabel
					},
					{
						icon: "Trophy",
						label: bi("نقاط الإنجاز", "Achievement points"),
						value: String(stats.achievementPoints)
					}
				] }),
				can("student_dashboard", "edit") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "-mt-2 flex justify-end",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "outline",
						onClick: openStatsDialog,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings2, { className: "size-4" }), bi("تعديل إحصاءاتي", "Edit my stats")]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: bi("ابدأ الآن", "Start now"),
					icon: "Zap",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickLinks, { items: [
						{
							to: "/library",
							label: bi("المكتبة", "Library"),
							icon: "Library"
						},
						{
							to: "/exam-simulator",
							label: bi("محاكي امتحان", "Exam simulator"),
							icon: "Timer"
						},
						{
							to: "/mistakes-bank",
							label: bi("بنك الأخطاء", "Mistakes bank"),
							icon: "XCircle"
						},
						{
							to: "/flashcards",
							label: bi("بطاقات مراجعة", "Flashcards"),
							icon: "Layers"
						},
						{
							to: "/schedule",
							label: bi("جدولي", "My schedule"),
							icon: "CalendarDays"
						},
						{
							to: "/my-courses",
							label: bi("كورساتي", "My courses"),
							icon: "BookOpenCheck"
						}
					] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
					title: bi("دقائق الدراسة الأسبوعية", "Weekly study minutes"),
					icon: "ChartSpline",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendChart, { data: log.map((d) => ({
						label: bi(...d.day),
						value: d.minutes
					})) }), can("student_dashboard", "edit") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 flex flex-wrap gap-2",
						children: log.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setMinuteEdit({
								dayAr: d.day[0],
								dayLabel: d.day,
								minutes: String(d.minutes)
							}),
							className: "rounded-lg border border-border px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary",
							children: [
								bi(...d.day),
								": ",
								d.minutes,
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "ms-1 inline size-3" })
							]
						}, d.day[0]))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: bi("إتقان المواد", "Subject mastery"),
					icon: "LineChart",
					children: subjects.length ? subjects.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
						label: s.subjectName,
						value: s.progressPercent
					}, s.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
						icon: "LineChart",
						text: bi("أضف مواد بالمكتبة عشان تظهر هون.", "Add subjects in the library to see them here.")
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: bi("قريباً", "Coming up"),
					icon: "CalendarClock",
					action: can("student_dashboard", "show_add_form") ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						onClick: () => openTaskDialog(null),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), bi("إضافة مهمة", "Add task")]
					}) : void 0,
					children: tasks.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowList, { rows: tasks.map((t) => ({
						title: t.title,
						meta: t.whenLabel,
						value: t.type,
						tone: TASK_TONE[t.type],
						actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1",
							children: [can("student_dashboard", "edit") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "icon",
								variant: "ghost",
								onClick: () => openTaskDialog(t),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" })
							}), can("student_dashboard", "delete") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "icon",
								variant: "ghost",
								className: "text-destructive",
								onClick: () => setPendingDeleteTask(t),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
							})]
						})
					})) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
						icon: "CalendarClock",
						text: bi("ولا مهمة قادمة حالياً 🎉", "No upcoming tasks right now 🎉")
					})
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: !!minuteEdit,
				onOpenChange: (v) => !v && setMinuteEdit(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "text-start",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: minuteEdit ? bi(...minuteEdit.dayLabel) : "" }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "minutes",
								children: bi("دقائق الدراسة", "Study minutes")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "minutes",
								type: "number",
								min: 0,
								value: minuteEdit?.minutes ?? "",
								onChange: (e) => setMinuteEdit((m) => m ? {
									...m,
									minutes: e.target.value
								} : m)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
							className: "gap-2 sm:justify-start",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: () => minuteEdit && minutesMutation.mutate({
									dayAr: minuteEdit.dayAr,
									minutes: Number(minuteEdit.minutes) || 0
								}),
								disabled: minutesMutation.isPending,
								children: bi("حفظ", "Save")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								onClick: () => setMinuteEdit(null),
								children: bi("إلغاء", "Cancel")
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: statsOpen,
				onOpenChange: setStatsOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "text-start",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: bi("تعديل إحصاءاتي", "Edit my stats") }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "streak",
									children: bi("أيام متتالية", "Streak days")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "streak",
									type: "number",
									min: 0,
									value: statsForm.streakDays,
									onChange: (e) => setStatsForm((f) => ({
										...f,
										streakDays: e.target.value
									}))
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "points",
									children: bi("نقاط الإنجاز", "Achievement points")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "points",
									type: "number",
									min: 0,
									value: statsForm.achievementPoints,
									onChange: (e) => setStatsForm((f) => ({
										...f,
										achievementPoints: e.target.value
									}))
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
							className: "gap-2 sm:justify-start",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: () => statsMutation.mutate(),
								disabled: statsMutation.isPending,
								children: bi("حفظ", "Save")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								onClick: () => setStatsOpen(false),
								children: bi("إلغاء", "Cancel")
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: taskOpen,
				onOpenChange: setTaskOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "text-start",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: editingTaskId ? bi("تعديل مهمة", "Edit task") : bi("إضافة مهمة", "Add task") }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5 sm:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "task-title",
										children: bi("العنوان", "Title")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "task-title",
										value: taskForm.title,
										onChange: (e) => setTaskForm((f) => ({
											...f,
											title: e.target.value
										}))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "task-when",
										children: bi("الموعد", "When")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "task-when",
										value: taskForm.whenLabel,
										onChange: (e) => setTaskForm((f) => ({
											...f,
											whenLabel: e.target.value
										}))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: bi("النوع", "Type") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										value: taskForm.type,
										onValueChange: (v) => setTaskForm((f) => ({
											...f,
											type: v
										})),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: "امتحان",
												children: bi("امتحان", "Quiz")
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: "واجب",
												children: bi("واجب", "Homework")
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: "مراجعة",
												children: bi("مراجعة", "Review")
											})
										] })]
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
							className: "gap-2 sm:justify-start",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: () => taskSaveMutation.mutate(),
								disabled: taskSaveMutation.isPending || !taskForm.title.trim(),
								children: bi("حفظ", "Save")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								onClick: () => setTaskOpen(false),
								children: bi("إلغاء", "Cancel")
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
				open: !!pendingDeleteTask,
				onOpenChange: (v) => !v && setPendingDeleteTask(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, {
					className: "text-start",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: bi(`حذف «${pendingDeleteTask?.title}»؟`, `Delete "${pendingDeleteTask?.title}"?`) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: bi("لا يمكن التراجع عن هذا الإجراء.", "This action cannot be undone.") })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, {
						className: "gap-2 sm:justify-start",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
							onClick: () => pendingDeleteTask && taskDeleteMutation.mutate(pendingDeleteTask.id),
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
