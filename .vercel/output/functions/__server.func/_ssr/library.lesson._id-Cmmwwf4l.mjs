import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { Mt as Check, n as X } from "../_libs/lucide-react.mjs";
import { yt as useBi } from "./router-DK5KNs7n.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { n as Guard } from "./guard-BP3o1aU5.mjs";
import { l as RowList, n as Badge, o as Panel, t as AppPage, u as StatGrid } from "./kit-DhMq0cTG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/library.lesson._id-Cmmwwf4l.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PageRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Guard, {
		pageKey: "student_library",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, {})
	});
}
var SAMPLE_QUESTIONS = [{
	q: ["ما ناتج مشتقة x²؟", "What is the derivative of x²?"],
	options: [
		["x", "x"],
		["2x", "2x"],
		["x²", "x²"],
		["2", "2"]
	],
	correct: 1
}, {
	q: ["أي مما يلي يمثّل قانون نيوتن الثاني؟", "Which of these is Newton's second law?"],
	options: [
		["F = m × a", "F = m × a"],
		["E = m × c²", "E = m × c²"],
		["V = I × R", "V = I × R"],
		["P = m × v", "P = m × v"]
	],
	correct: 0
}];
function Body() {
	const bi = useBi();
	const [answers, setAnswers] = (0, import_react.useState)({});
	const score = Object.entries(answers).filter(([qi, choice]) => SAMPLE_QUESTIONS[Number(qi)].correct === choice).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppPage, {
		title: bi("صفحة الدرس", "Lesson page"),
		icon: "FileText",
		subtitle: bi("معاينة تصميم لشكل صفحة الدرس المستقبلية — المحتوى والأزرار هون توضيحية ولسا مش موصولة بمحتوى حقيقي.", "A design preview of the upcoming lesson page — content and buttons here are illustrative and not wired to real content yet."),
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "inline-flex items-center rounded-full bg-info/12 px-3 py-1 text-xs font-bold text-info",
			children: bi("معاينة تصميم", "Design preview")
		}),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatGrid, { items: [
				{
					icon: "Clock",
					label: bi("مدة الدرس", "Duration"),
					value: bi("18 د", "18 min")
				},
				{
					icon: "ListChecks",
					label: bi("أسئلة", "Questions"),
					value: "10"
				},
				{
					icon: "Layers",
					label: bi("بطاقات", "Flashcards"),
					value: "12"
				},
				{
					icon: "Target",
					label: bi("نتيجتك", "Your score"),
					value: "80%"
				}
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: bi("محتوى الدرس", "Lesson content"),
				icon: "FileStack",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowList, { rows: [
					{
						title: bi("شرح مكتوب + ملخص", "Written explanation + summary"),
						meta: bi("PDF · 4 صفحات", "PDF · 4 pages"),
						value: bi("فتح", "Open"),
						tone: "primary"
					},
					{
						title: bi("فيديو الشرح", "Explainer video"),
						meta: bi("12 دقيقة", "12 minutes"),
						value: bi("مشاهدة", "Watch"),
						tone: "primary"
					},
					{
						title: bi("ورقة تدريب", "Practice sheet"),
						meta: bi("8 أسئلة", "8 questions"),
						value: bi("تحميل", "Download"),
						tone: "muted"
					}
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: bi("جرّب سؤالين فعليين", "Try two real questions"),
				icon: "HelpCircle",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					tone: score === SAMPLE_QUESTIONS.length ? "success" : "muted",
					children: bi(`${score}/${SAMPLE_QUESTIONS.length}`, `${score}/${SAMPLE_QUESTIONS.length}`)
				}),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-5",
					children: [SAMPLE_QUESTIONS.map((item, qi) => {
						const chosen = answers[qi];
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm font-bold text-foreground",
							children: [
								qi + 1,
								". ",
								bi(...item.q)
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2.5 grid gap-2 sm:grid-cols-2",
							children: item.options.map((opt, oi) => {
								const isChosen = chosen === oi;
								const isCorrect = item.correct === oi;
								const revealed = chosen !== void 0;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									disabled: revealed,
									onClick: () => setAnswers((a) => ({
										...a,
										[qi]: oi
									})),
									className: cn("flex items-center justify-between rounded-xl border px-4 py-2.5 text-start text-sm transition-colors", !revealed && "border-border bg-card hover:border-primary/50", revealed && isCorrect && "border-success bg-success/10 text-success", revealed && isChosen && !isCorrect && "border-destructive bg-destructive/10 text-destructive", revealed && !isChosen && !isCorrect && "border-border bg-card opacity-50"),
									children: [
										bi(...opt),
										revealed && isCorrect && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }),
										revealed && isChosen && !isCorrect && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
									]
								}, oi);
							})
						})] }, qi);
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: bi("هاي أسئلة مثال بتُجاب بالمتصفح بس، بدون حفظ — لتجربة شكل الإجابة الفورية الحقيقي.", "These are example questions answered locally in the browser only, not saved — to try the real instant-feedback experience.")
					})]
				})
			})
		]
	});
}
//#endregion
export { PageRoute as component };
