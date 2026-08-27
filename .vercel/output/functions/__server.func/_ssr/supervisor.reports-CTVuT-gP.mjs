import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { x as useBi } from "./rbac-static-data-BkN8GGlQ.mjs";
import { n as Guard } from "./guard-BhjB-ZLB.mjs";
import { a as Panel, c as RowList, l as StatGrid, t as AppPage } from "./kit-D87c2tkb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/supervisor.reports-CTVuT-gP.js
var import_jsx_runtime = require_jsx_runtime();
function PageRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Guard, {
		pageKey: "supervisor_reports",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, {})
	});
}
function Body() {
	const bi = useBi();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppPage, {
		title: bi("تقارير الإشراف", "Supervision reports"),
		icon: "FileBarChart",
		subtitle: bi("تقارير دورية جاهزة للتصدير: جودة التدريس، الإتقان، والالتزام.", "Periodic exportable reports: teaching quality, mastery and consistency."),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatGrid, { items: [
			{
				icon: "FileBarChart",
				label: bi("تقارير جاهزة", "Ready reports"),
				value: "6"
			},
			{
				icon: "CalendarDays",
				label: bi("دورية", "Frequency"),
				value: bi("أسبوعي", "Weekly")
			},
			{
				icon: "Download",
				label: bi("تنزيلات", "Downloads"),
				value: "42"
			},
			{
				icon: "ShieldCheck",
				label: bi("بيانات مجهولة الهوية", "Anonymised"),
				value: bi("نعم", "Yes")
			}
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			title: bi("التقارير", "Reports"),
			icon: "FileBarChart",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowList, { rows: [
				{
					title: bi("تقرير جودة التدريس — يوليو", "Teaching quality — July"),
					meta: bi("PDF · 12 صفحة", "PDF · 12 pages"),
					value: bi("تنزيل", "Download"),
					tone: "primary"
				},
				{
					title: bi("تقرير الإتقان بالمواد", "Mastery by subject"),
					meta: bi("XLSX", "XLSX"),
					value: bi("تنزيل", "Download"),
					tone: "primary"
				},
				{
					title: bi("تقرير الالتزام الأسبوعي", "Weekly consistency"),
					meta: bi("PDF · 6 صفحات", "PDF · 6 pages"),
					value: bi("تنزيل", "Download"),
					tone: "primary"
				}
			] })
		})]
	});
}
//#endregion
export { PageRoute as component };
