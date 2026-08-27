import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { x as useBi } from "./rbac-static-data-BkN8GGlQ.mjs";
import { n as Guard } from "./guard-BhjB-ZLB.mjs";
import { a as Panel, l as StatGrid, n as Badge, r as DataTable, t as AppPage } from "./kit-D87c2tkb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/teacher.grading-nzvLo6ru.js
var import_jsx_runtime = require_jsx_runtime();
function PageRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Guard, {
		pageKey: "teacher_grading",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, {})
	});
}
function Body() {
	const bi = useBi();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppPage, {
		title: bi("التصحيح", "Grading"),
		icon: "PenSquare",
		subtitle: bi("قائمة التصحيح: الأسئلة المقالية والملفات المرفوعة، مع ملاحظات لكل طالب.", "The grading queue: essay answers and uploaded files, with per-student feedback."),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatGrid, { items: [
			{
				icon: "PenSquare",
				label: bi("بانتظار التصحيح", "Pending"),
				value: "18"
			},
			{
				icon: "CheckCheck",
				label: bi("صُحّحت اليوم", "Graded today"),
				value: "11"
			},
			{
				icon: "Clock",
				label: bi("متوسط وقت التصحيح", "Avg. time"),
				value: bi("3.4 د", "3.4 min")
			},
			{
				icon: "AlertTriangle",
				label: bi("متأخّرة", "Overdue"),
				value: "2"
			}
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			title: bi("طابور التصحيح", "Grading queue"),
			icon: "PenSquare",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
				head: [
					bi("الطالب", "Student"),
					bi("العمل", "Item"),
					bi("أُرسل", "Submitted"),
					bi("الحالة", "Status")
				],
				rows: [
					[
						bi("أحمد ع.", "Ahmad A."),
						bi("امتحان وحدة 4 — مقالي", "Unit 4 exam — essay"),
						bi("اليوم 10:12", "Today 10:12"),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: "danger",
							children: bi("بانتظار", "Pending")
						})
					],
					[
						bi("سما ح.", "Sama H."),
						bi("ورقة عمل مرفوعة", "Uploaded worksheet"),
						bi("أمس", "Yesterday"),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: "danger",
							children: bi("بانتظار", "Pending")
						})
					],
					[
						bi("يزن م.", "Yazan M."),
						bi("امتحان وحدة 3", "Unit 3 exam"),
						bi("2026/07/28", "2026/07/28"),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: "success",
							children: bi("مُصحّح", "Graded")
						})
					]
				]
			})
		})]
	});
}
//#endregion
export { PageRoute as component };
