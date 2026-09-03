import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { D as useBi } from "./rbac-static-data-C-KJ3jWh.mjs";
import { n as Guard } from "./guard-C_ikEg3X.mjs";
import { a as Panel, c as RowList, l as StatGrid, t as AppPage } from "./kit-DDkPK7fJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/library.lesson._id-Bkq7Rf3x.js
var import_jsx_runtime = require_jsx_runtime();
function PageRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Guard, {
		pageKey: "student_library",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, {})
	});
}
function Body() {
	const bi = useBi();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppPage, {
		title: bi("صفحة الدرس", "Lesson page"),
		icon: "FileText",
		subtitle: bi("الدرس: ملف مرتّب + أسئلة تفاعلية + بطاقات مراجعة + إضافة أخطائك إلى بنك الأخطاء.", "The lesson: tidy material + interactive questions + flashcards + push mistakes to your bank."),
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
				title: bi("أسئلة الدرس", "Lesson questions"),
				icon: "HelpCircle",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowList, { rows: [
					{
						title: bi("سؤال 1 — اختيار متعدد", "Q1 — multiple choice"),
						meta: bi("أجبت صحيح", "Answered correctly"),
						value: bi("صحيح", "Correct"),
						tone: "success"
					},
					{
						title: bi("سؤال 2 — صح/خطأ", "Q2 — true/false"),
						meta: bi("أُضيف إلى بنك الأخطاء", "Added to mistakes bank"),
						value: bi("خطأ", "Wrong"),
						tone: "danger"
					},
					{
						title: bi("سؤال 3 — إكمال", "Q3 — fill in"),
						meta: bi("لم تُجب بعد", "Not answered yet"),
						value: bi("متاح", "Open"),
						tone: "muted"
					}
				] })
			})
		]
	});
}
//#endregion
export { PageRoute as component };
