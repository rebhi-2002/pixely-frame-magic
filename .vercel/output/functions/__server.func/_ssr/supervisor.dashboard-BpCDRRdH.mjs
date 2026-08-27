import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { x as useBi } from "./rbac-static-data-BkN8GGlQ.mjs";
import { n as Guard } from "./guard-BhjB-ZLB.mjs";
import { a as Panel, c as RowList, l as StatGrid, s as QuickLinks, t as AppPage } from "./kit-D87c2tkb.mjs";
import { i as WelcomeBanner, t as ComparisonChart } from "./charts-B-LArutN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/supervisor.dashboard-BpCDRRdH.js
var import_jsx_runtime = require_jsx_runtime();
function PageRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Guard, {
		pageKey: "supervisor_dashboard",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, {})
	});
}
function Body() {
	const bi = useBi();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppPage, {
		title: bi("لوحة الإشراف", "Supervision dashboard"),
		icon: "LayoutDashboard",
		subtitle: bi("جودة التعليم عبر المعلمين والصفوف: تنبيهات، متابعات، ومؤشرات إتقان.", "Teaching quality across teachers and classes: alerts, follow-ups and mastery signals."),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WelcomeBanner, {
				subtitle: ["نظرة شاملة على جودة التعليم عبر كل المعلمين والصفوف اليوم.", "A full overview of teaching quality across every teacher and class today."],
				tip: ["2 تنبيه يحتاج متابعتك", "2 alerts need your attention"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatGrid, { items: [
				{
					icon: "Presentation",
					label: bi("معلمون", "Teachers"),
					value: "18"
				},
				{
					icon: "Users",
					label: bi("طلاب", "Students"),
					value: "1,240"
				},
				{
					icon: "AlertTriangle",
					label: bi("تنبيهات جودة", "Quality alerts"),
					value: "4"
				},
				{
					icon: "Percent",
					label: bi("متوسط الإتقان", "Avg. mastery"),
					value: "67%"
				}
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: bi("متوسط الإتقان بالصفوف", "Average mastery by grade"),
				icon: "ChartSpline",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComparisonChart, { data: [
					{
						label: bi("عاشر", "G10"),
						value: 64
					},
					{
						label: bi("حادي عشر", "G11"),
						value: 71
					},
					{
						label: bi("ثاني عشر", "G12"),
						value: 78
					}
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: bi("إجراءات", "Actions"),
				icon: "Zap",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickLinks, { items: [
					{
						to: "/supervisor/teachers",
						label: bi("المعلمون", "Teachers"),
						icon: "Presentation"
					},
					{
						to: "/supervisor/students-overview",
						label: bi("نظرة الطلاب", "Students overview"),
						icon: "Users"
					},
					{
						to: "/supervisor/reports",
						label: bi("التقارير", "Reports"),
						icon: "FileBarChart"
					}
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: bi("تنبيهات تحتاج متابعة", "Alerts to follow up"),
				icon: "AlertTriangle",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowList, { rows: [
					{
						title: bi("تأخّر تصحيح لدى أ. ريم", "Grading delay — Ms. Reem"),
						meta: bi("18 ورقة > 5 أيام", "18 papers > 5 days"),
						value: bi("عاجل", "Urgent"),
						tone: "danger"
					},
					{
						title: bi("إتقان منخفض — كيمياء صف 9", "Low mastery — Chemistry grade 9"),
						meta: bi("38%", "38%"),
						value: bi("متابعة", "Follow up"),
						tone: "primary"
					},
					{
						title: bi("محتوى بانتظار المراجعة", "Content pending review"),
						meta: bi("5 عناصر", "5 items"),
						value: bi("مراجعة", "Review"),
						tone: "muted"
					}
				] })
			})
		]
	});
}
//#endregion
export { PageRoute as component };
