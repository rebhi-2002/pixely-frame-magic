import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { x as useBi } from "./rbac-static-data-BkN8GGlQ.mjs";
import { n as Guard } from "./guard-BhjB-ZLB.mjs";
import { a as Panel, c as RowList, l as StatGrid, o as Progress, t as AppPage } from "./kit-D87c2tkb.mjs";
import { i as WelcomeBanner, r as TrendChart } from "./charts-B-LArutN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/parent.report-BbfEfqAU.js
var import_jsx_runtime = require_jsx_runtime();
function PageRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Guard, {
		pageKey: "parent_report",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, {})
	});
}
function Body() {
	const bi = useBi();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppPage, {
		title: bi("تقرير الابن", "Child report"),
		icon: "FileBarChart",
		subtitle: bi("تقرير أسبوعي واضح: التزام، إتقان، ومواطن الضعف — بدون أرقام مضلّلة.", "A clear weekly report: consistency, mastery and weak spots — no vanity metrics."),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WelcomeBanner, {
				subtitle: ["تابع التزام ابنك وإتقانه أسبوعيًا، بدون أرقام مضلّلة — بس الصورة الواقعية.", "Follow your child's consistency and mastery weekly — no vanity metrics, just the real picture."],
				tip: ["تقرير هالأسبوع جاهز", "This week's report is ready"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatGrid, { items: [
				{
					icon: "User",
					label: bi("الابن المتابَع", "Child"),
					value: bi("أحمد", "Ahmad")
				},
				{
					icon: "Flame",
					label: bi("أيام دراسة", "Study days"),
					value: "5/7"
				},
				{
					icon: "Percent",
					label: bi("متوسط الإتقان", "Avg. mastery"),
					value: "66%"
				},
				{
					icon: "AlertTriangle",
					label: bi("مواد تحتاج دعم", "Needs support"),
					value: "1"
				}
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: bi("تقدّم الأسبوع", "Weekly progress"),
				icon: "ChartSpline",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendChart, { data: [
					{
						label: bi("أسبوع 1", "W1"),
						value: 58
					},
					{
						label: bi("أسبوع 2", "W2"),
						value: 64
					},
					{
						label: bi("أسبوع 3", "W3"),
						value: 61
					},
					{
						label: bi("أسبوع 4", "W4"),
						value: 73
					}
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: bi("إتقان المواد", "Subject mastery"),
				icon: "LineChart",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
						label: bi("الرياضيات", "Math"),
						value: 78
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
						label: bi("الفيزياء", "Physics"),
						value: 54
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
						label: bi("الكيمياء", "Chemistry"),
						value: 40
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
						label: bi("اللغة العربية", "Arabic"),
						value: 91
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: bi("ملخّص الأسبوع", "Week summary"),
				icon: "Activity",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowList, { rows: [
					{
						title: bi("ساعات الدراسة", "Study hours"),
						meta: bi("9 ساعات و20 دقيقة", "9h 20m"),
						value: bi("+12%", "+12%"),
						tone: "success"
					},
					{
						title: bi("امتحانات تدريبية", "Mock exams"),
						meta: bi("امتحانان", "2 exams"),
						value: bi("72%", "72%"),
						tone: "primary"
					},
					{
						title: bi("الكيمياء تحتاج متابعة", "Chemistry needs attention"),
						meta: bi("أخطاء متكرّرة في التفاعلات", "Repeated reaction mistakes"),
						value: bi("تنبيه", "Alert"),
						tone: "danger"
					}
				] })
			})
		]
	});
}
//#endregion
export { PageRoute as component };
