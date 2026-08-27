import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { x as useBi } from "./rbac-static-data-BkN8GGlQ.mjs";
import { n as Guard } from "./guard-BhjB-ZLB.mjs";
import { a as Panel, l as StatGrid, n as Badge, r as DataTable, t as AppPage } from "./kit-D87c2tkb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/supervisor.teachers-C3bW61YA.js
var import_jsx_runtime = require_jsx_runtime();
function PageRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Guard, {
		pageKey: "supervisor_teachers",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, {})
	});
}
function Body() {
	const bi = useBi();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppPage, {
		title: bi("المعلمون", "Teachers"),
		icon: "Presentation",
		subtitle: bi("أداء كل معلم: سرعة الرد، زمن التصحيح، وإتقان طلابه.", "Per-teacher performance: response time, grading speed and student mastery."),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatGrid, { items: [
			{
				icon: "Presentation",
				label: bi("معلمون نشطون", "Active teachers"),
				value: "18"
			},
			{
				icon: "Clock",
				label: bi("متوسط زمن الرد", "Avg. response"),
				value: bi("5 س", "5h")
			},
			{
				icon: "PenSquare",
				label: bi("متوسط زمن التصحيح", "Avg. grading"),
				value: bi("1.8 يوم", "1.8 days")
			},
			{
				icon: "Star",
				label: bi("متوسط التقييم", "Avg. rating"),
				value: "4.6"
			}
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			title: bi("قائمة المعلمين", "Teacher list"),
			icon: "Presentation",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
				head: [
					bi("المعلم", "Teacher"),
					bi("المادة", "Subject"),
					bi("طلاب", "Students"),
					bi("الحالة", "Status")
				],
				rows: [
					[
						bi("أ. سامي خالد", "Mr. Sami Khaled"),
						bi("رياضيات", "Math"),
						"126",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: "success",
							children: bi("ممتاز", "Excellent")
						})
					],
					[
						bi("أ. ريم ناصر", "Ms. Reem Nasser"),
						bi("فيزياء", "Physics"),
						"98",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: "danger",
							children: bi("تأخّر تصحيح", "Grading delay")
						})
					],
					[
						bi("أ. هدى سليم", "Ms. Huda Salim"),
						bi("كيمياء", "Chemistry"),
						"84",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: "primary",
							children: bi("جيد", "Good")
						})
					]
				]
			})
		})]
	});
}
//#endregion
export { PageRoute as component };
