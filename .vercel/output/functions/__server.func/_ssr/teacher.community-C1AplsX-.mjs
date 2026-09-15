import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { M as useBi, p as getErrorMessage } from "./rbac-static-data-6lJhuenE.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { Ot as Check, X as LoaderCircle } from "../_libs/lucide-react.mjs";
import { u as description$9 } from "./router-ClmuBdEg.mjs";
import { n as useServerFn } from "./createSsrRpc-ByxigA6S.mjs";
import { d as useAccess } from "./use-access-BODhyQaf.mjs";
import { n as Guard } from "./guard-X81oQi1X.mjs";
import { t as Button } from "./button-Nx-_C_c8.mjs";
import { i as EmptyState, l as RowList, o as Panel, t as AppPage, u as StatGrid } from "./kit-CS2UTmaS.mjs";
import { i as listClassQuestions, t as answerClassQuestion } from "./teacher-followup.functions-DJjua4hP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/teacher.community-C1AplsX-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PageRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Guard, {
		pageKey: "teacher_community",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, {})
	});
}
function Body() {
	const bi = useBi();
	const queryClient = useQueryClient();
	const { can } = useAccess();
	const fetchQuestions = useServerFn(listClassQuestions);
	const answer = useServerFn(answerClassQuestion);
	const { data: rows, isLoading } = useQuery({
		queryKey: ["class-questions"],
		queryFn: () => fetchQuestions()
	});
	const list = (0, import_react.useMemo)(() => rows ?? [], [rows]);
	const open = (0, import_react.useMemo)(() => list.filter((q) => q.status === "مفتوح"), [list]);
	const answered = (0, import_react.useMemo)(() => list.filter((q) => q.status === "إجابة معلم"), [list]);
	const answerMutation = useMutation({
		mutationFn: (id) => answer({ data: { id } }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["class-questions"] });
			toast.success(bi("تم تمييز إجابتك", "Your answer was marked"));
		},
		onError: (e) => toast.error(getErrorMessage(e, bi("تعذّر التحديث", "Failed to update")))
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppPage, {
		title: bi("أسئلة طلابي", "My students' questions"),
		icon: "MessagesSquare",
		subtitle: bi(description$9, "Your students' questions in one place, so you can log your answer."),
		children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex justify-center py-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-6 animate-spin text-primary" })
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatGrid, { items: [
				{
					icon: "MessagesSquare",
					label: bi("أسئلة مفتوحة", "Open questions"),
					value: String(open.length)
				},
				{
					icon: "CheckCheck",
					label: bi("أجبت عليها", "You answered"),
					value: String(answered.length)
				},
				{
					icon: "Flag",
					label: bi("بلاغات", "Reports"),
					value: "0"
				},
				{
					icon: "Clock",
					label: bi("متوسط زمن الرد", "Avg. response"),
					value: bi("4 س", "4 hrs")
				}
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: bi("بانتظار جوابك", "Awaiting your answer"),
				icon: "MessagesSquare",
				children: open.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowList, { rows: open.map((q) => ({
					title: q.questionTitle,
					meta: bi(`${q.subjectName} · ${q.answersCount} إجابات`, `${q.subjectName} · ${q.answersCount} answers`),
					value: bi("مفتوح", "Open"),
					tone: "primary",
					actions: can("teacher_community", "edit") ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "outline",
						onClick: () => answerMutation.mutate(q.id),
						disabled: answerMutation.isPending,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }), bi("تمييز كمُجاب", "Mark answered")]
					}) : void 0
				})) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					icon: "MessagesSquare",
					text: bi("ولا سؤال بانتظارك 🎉", "No questions waiting for you 🎉")
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: bi("أجبت عليها", "You answered"),
				icon: "CheckCheck",
				children: answered.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowList, { rows: answered.map((q) => ({
					title: q.questionTitle,
					meta: q.subjectName,
					value: bi("إجابة معلم", "Teacher answer"),
					tone: "success"
				})) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					icon: "CheckCheck",
					text: bi("ما جاوبت أي سؤال بعد.", "You haven't answered any question yet.")
				})
			})
		] })
	});
}
//#endregion
export { PageRoute as component };
