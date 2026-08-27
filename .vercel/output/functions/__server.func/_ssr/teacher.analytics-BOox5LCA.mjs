import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { x as useBi } from "./rbac-static-data-BkN8GGlQ.mjs";
import { n as Guard } from "./guard-BhjB-ZLB.mjs";
import { a as Panel, c as RowList, l as StatGrid, o as Progress, t as AppPage } from "./kit-D87c2tkb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/teacher.analytics-BOox5LCA.js
var import_jsx_runtime = require_jsx_runtime();
function PageRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Guard, {
		pageKey: "teacher_analytics",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, {})
	});
}
function Body() {
	const bi = useBi();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppPage, {
		title: bi("التحليلات", "Analytics"),
		icon: "LineChart",
		subtitle: bi("أين يتعثّر طلابك بالضبط: أسئلة يخطئ فيها الأكثر، وإتقان كل وحدة.", "Exactly where students struggle: most-missed questions and per-unit mastery."),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatGrid, { items: [
				{
					icon: "Users",
					label: bi("طلاب نشطون", "Active students"),
					value: "112"
				},
				{
					icon: "Percent",
					label: bi("متوسط الإتقان", "Avg. mastery"),
					value: "68%"
				},
				{
					icon: "TrendingUp",
					label: bi("تحسّن الشهر", "Monthly gain"),
					value: "+9%"
				},
				{
					icon: "AlertTriangle",
					label: bi("وحدات ضعيفة", "Weak units"),
					value: "3"
				}
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: bi("إتقان الوحدات", "Unit mastery"),
				icon: "LineChart",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
						label: bi("وحدة 1 — الأساسيات", "Unit 1 — basics"),
						value: 88
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
						label: bi("وحدة 2 — النهايات", "Unit 2 — limits"),
						value: 71
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
						label: bi("وحدة 3 — المشتقات", "Unit 3 — derivatives"),
						value: 52
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
						label: bi("وحدة 4 — التكامل", "Unit 4 — integration"),
						value: 39
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: bi("الأسئلة الأكثر خطأً", "Most-missed questions"),
				icon: "XCircle",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowList, { rows: [
					{
						title: bi("تكامل بالتجزيء — سؤال 7", "Integration by parts — Q7"),
						meta: bi("68% أخطأوا", "68% wrong"),
						value: bi("أولوية", "Priority"),
						tone: "danger"
					},
					{
						title: bi("قاعدة السلسلة — سؤال 3", "Chain rule — Q3"),
						meta: bi("54% أخطأوا", "54% wrong"),
						value: bi("مراجعة", "Review"),
						tone: "primary"
					},
					{
						title: bi("النهايات اللانهائية — سؤال 11", "Infinite limits — Q11"),
						meta: bi("41% أخطأوا", "41% wrong"),
						value: bi("مراجعة", "Review"),
						tone: "primary"
					}
				] })
			})
		]
	});
}
//#endregion
export { PageRoute as component };
