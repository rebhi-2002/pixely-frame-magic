import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { f as getErrorMessage, k as useBi } from "./rbac-static-data-JRz-nJtL.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { M as Pencil, Y as LoaderCircle, j as Plus, p as Trash2 } from "../_libs/lucide-react.mjs";
import { M as description$27 } from "./router-B49B_5De.mjs";
import { n as useServerFn } from "./createSsrRpc-C7KQUoXf.mjs";
import { d as useAccess } from "./use-access-Cx_9PD_P.mjs";
import { n as Guard } from "./guard-DJBJLisT.mjs";
import { t as Button } from "./button-Nx-_C_c8.mjs";
import { a as Panel, c as RowList, i as EmptyState, l as StatGrid, t as AppPage } from "./kit-BNtAyy6W.mjs";
import { t as Input } from "./input-D0-bbXyS.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, o as Label, r as DialogFooter, t as Dialog } from "./dialog-1uq10XBZ.mjs";
import { a as AlertDialogDescription, c as AlertDialogTitle, i as AlertDialogContent, n as AlertDialogAction, o as AlertDialogFooter, r as AlertDialogCancel, s as AlertDialogHeader, t as AlertDialog } from "./alert-dialog-OIHj-NyW.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-CbSL31Oe.mjs";
import { a as getCommunityStats, c as listCommunityQuestions, f as saveCommunityQuestion, n as deleteCommunityQuestion } from "./student-social.functions-BzDqB0iU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/community-CzGx1swO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PageRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Guard, {
		pageKey: "student_community",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, {})
	});
}
var EMPTY_FORM = {
	questionTitle: "",
	subjectName: "",
	answersCount: "0",
	status: "مفتوح"
};
var STATUS_TONE = {
	"إجابة معلم": "success",
	مفتوح: "primary",
	مُغلق: "muted"
};
function Body() {
	const bi = useBi();
	const queryClient = useQueryClient();
	const { can } = useAccess();
	const fetchQuestions = useServerFn(listCommunityQuestions);
	const persist = useServerFn(saveCommunityQuestion);
	const remove = useServerFn(deleteCommunityQuestion);
	const fetchStats = useServerFn(getCommunityStats);
	const questionsQuery = useQuery({
		queryKey: ["community-questions"],
		queryFn: () => fetchQuestions()
	});
	const statsQuery = useQuery({
		queryKey: ["community-stats"],
		queryFn: () => fetchStats()
	});
	const [open, setOpen] = (0, import_react.useState)(false);
	const [editingId, setEditingId] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)(EMPTY_FORM);
	const [pendingDelete, setPendingDelete] = (0, import_react.useState)(null);
	const questions = questionsQuery.data ?? [];
	const stats = statsQuery.data ?? {
		memberCount: 0,
		reputation: 0
	};
	const verifiedCount = questions.filter((q) => q.status === "إجابة معلم").length;
	const isLoading = questionsQuery.isLoading || statsQuery.isLoading;
	const invalidate = () => queryClient.invalidateQueries({ queryKey: ["community-questions"] });
	const saveMutation = useMutation({
		mutationFn: () => persist({ data: {
			...form,
			id: editingId ?? void 0,
			answersCount: Number(form.answersCount) || 0
		} }),
		onSuccess: () => {
			invalidate();
			setOpen(false);
			toast.success(bi("تم النشر", "Posted successfully"));
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
			subjectName: row.subjectName,
			answersCount: String(row.answersCount),
			status: row.status
		} : EMPTY_FORM);
		setOpen(true);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppPage, {
		title: bi("أسئلتي", "My questions"),
		icon: "MessagesSquare",
		subtitle: bi(description$27, "Log your questions per subject, and track their status until answered."),
		children: [
			isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex justify-center py-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-6 animate-spin text-primary" })
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatGrid, { items: [
				{
					icon: "MessagesSquare",
					label: bi("أسئلة", "Questions"),
					value: String(questions.length)
				},
				{
					icon: "CheckCheck",
					label: bi("إجابات معلم", "Teacher answers"),
					value: String(verifiedCount)
				},
				{
					icon: "Users",
					label: bi("أعضاء مادّتك", "Members"),
					value: String(stats.memberCount)
				},
				{
					icon: "Star",
					label: bi("سمعتك", "Your reputation"),
					value: String(stats.reputation)
				}
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: bi("أحدث الأسئلة", "Latest questions"),
				icon: "MessagesSquare",
				action: can("student_community", "show_add_form") ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					onClick: () => openDialog(null),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), bi("اسأل سؤالاً", "Ask a question")]
				}) : void 0,
				children: questions.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowList, { rows: questions.map((q) => ({
					title: q.questionTitle,
					meta: bi(`${q.subjectName} · ${q.answersCount} إجابات`, `${q.subjectName} · ${q.answersCount} answers`),
					value: bi(q.status, q.status === "إجابة معلم" ? "Teacher answer" : q.status === "مفتوح" ? "Open" : "Closed"),
					tone: STATUS_TONE[q.status],
					actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1",
						children: [can("student_community", "edit") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "icon",
							variant: "ghost",
							onClick: () => openDialog(q),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" })
						}), can("student_community", "delete") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "icon",
							variant: "ghost",
							className: "text-destructive",
							onClick: () => setPendingDelete(q),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
						})]
					})
				})) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					icon: "MessagesSquare",
					text: bi("لا أسئلة بعد — كن أول من يسأل.", "No questions yet — be the first to ask.")
				})
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open,
				onOpenChange: setOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "text-start",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: editingId ? bi("تعديل سؤال", "Edit question") : bi("اسأل سؤالاً", "Ask a question") }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5 sm:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "cq-title",
										children: bi("سؤالك", "Your question")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "cq-title",
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
										htmlFor: "cq-subject",
										children: bi("المادة", "Subject")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "cq-subject",
										value: form.subjectName,
										onChange: (e) => setForm((f) => ({
											...f,
											subjectName: e.target.value
										}))
									})]
								}),
								editingId && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: bi("الحالة", "Status") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										value: form.status,
										onValueChange: (v) => setForm((f) => ({
											...f,
											status: v
										})),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: "مفتوح",
												children: bi("مفتوح", "Open")
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: "إجابة معلم",
												children: bi("إجابة معلم", "Teacher answered")
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: "مُغلق",
												children: bi("مُغلق", "Closed")
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
								disabled: saveMutation.isPending || !form.questionTitle.trim(),
								children: bi("نشر", "Post")
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
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: bi("حذف هذا السؤال؟", "Delete this question?") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: bi("لا يمكن التراجع عن هذا الإجراء.", "This action cannot be undone.") })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, {
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
