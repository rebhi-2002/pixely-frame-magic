import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { x as useBi } from "./rbac-static-data-BkN8GGlQ.mjs";
import { n as Guard } from "./guard-BhjB-ZLB.mjs";
import { a as Panel, l as StatGrid, n as Badge, r as DataTable, t as AppPage } from "./kit-D87c2tkb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/supervisor.students-overview-BGKrcCA4.js
var import_jsx_runtime = require_jsx_runtime();
function PageRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Guard, {
		pageKey: "supervisor_students",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, {})
	});
}
function Body() {
	const bi = useBi();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppPage, {
		title: bi("نظرة الطلاب", "Students overview"),
		icon: "Users",
		subtitle: bi("الطلاب المتعثّرون أولاً: من يحتاج تدخّلاً الآن ولماذا.", "Struggling students first: who needs intervention now, and why."),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatGrid, { items: [
			{
				icon: "Users",
				label: bi("طلاب", "Students"),
				value: "1,240"
			},
			{
				icon: "AlertTriangle",
				label: bi("متعثّرون", "At risk"),
				value: "63"
			},
			{
				icon: "Flame",
				label: bi("منتظمون", "Consistent"),
				value: "812"
			},
			{
				icon: "TrendingUp",
				label: bi("تحسّنوا هذا الشهر", "Improved"),
				value: "184"
			}
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			title: bi("يحتاجون تدخّلاً", "Needs intervention"),
			icon: "Users",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
				head: [
					bi("الطالب", "Student"),
					bi("الصف", "Grade"),
					bi("أضعف مادة", "Weakest"),
					bi("الحالة", "Status")
				],
				rows: [
					[
						bi("أحمد ع.", "Ahmad A."),
						bi("11", "11"),
						bi("كيمياء 40%", "Chemistry 40%"),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: "danger",
							children: bi("متعثّر", "At risk")
						})
					],
					[
						bi("سما ح.", "Sama H."),
						bi("9", "9"),
						bi("رياضيات 48%", "Math 48%"),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: "danger",
							children: bi("متعثّر", "At risk")
						})
					],
					[
						bi("يزن م.", "Yazan M."),
						bi("10", "10"),
						bi("فيزياء 58%", "Physics 58%"),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: "primary",
							children: bi("مراقبة", "Watch")
						})
					]
				]
			})
		})]
	});
}
//#endregion
export { PageRoute as component };
