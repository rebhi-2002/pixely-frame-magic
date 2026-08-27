import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { x as useBi } from "./rbac-static-data-BkN8GGlQ.mjs";
import { n as Guard } from "./guard-BhjB-ZLB.mjs";
import { a as Panel, l as StatGrid, n as Badge, r as DataTable, t as AppPage } from "./kit-D87c2tkb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/teacher.quizzes-CSEIl7wT.js
var import_jsx_runtime = require_jsx_runtime();
function PageRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Guard, {
		pageKey: "teacher_quizzes",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, {})
	});
}
function Body() {
	const bi = useBi();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppPage, {
		title: bi("الاختبارات", "Quizzes"),
		icon: "ListChecks",
		subtitle: bi("بنك أسئلتك واختباراتك: اختيار متعدد، صح/خطأ، ومقالي — مع تصحيح آلي حيث ينفع.", "Your question bank and quizzes: MCQ, true/false and essay — auto-graded where possible."),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatGrid, { items: [
			{
				icon: "ListChecks",
				label: bi("اختبارات", "Quizzes"),
				value: "14"
			},
			{
				icon: "HelpCircle",
				label: bi("أسئلة في البنك", "Questions in bank"),
				value: "268"
			},
			{
				icon: "Users",
				label: bi("محاولات هذا الأسبوع", "Attempts this week"),
				value: "312"
			},
			{
				icon: "Percent",
				label: bi("متوسط النتائج", "Average score"),
				value: "71%"
			}
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			title: bi("اختباراتك", "Your quizzes"),
			icon: "ListChecks",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
				head: [
					bi("الاختبار", "Quiz"),
					bi("الأسئلة", "Questions"),
					bi("المحاولات", "Attempts"),
					bi("الحالة", "Status")
				],
				rows: [
					[
						bi("رياضيات — وحدة 4", "Math — unit 4"),
						"20",
						"96",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: "success",
							children: bi("نشط", "Live")
						})
					],
					[
						bi("فيزياء — الحركة", "Physics — motion"),
						"15",
						"74",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: "success",
							children: bi("نشط", "Live")
						})
					],
					[
						bi("كيمياء — تدريب سريع", "Chemistry — quick drill"),
						"10",
						"0",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: "muted",
							children: bi("مسوّدة", "Draft")
						})
					]
				]
			})
		})]
	});
}
//#endregion
export { PageRoute as component };
