import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { x as useBi } from "./rbac-static-data-BkN8GGlQ.mjs";
import { n as Guard } from "./guard-BhjB-ZLB.mjs";
import { a as Panel, l as StatGrid, n as Badge, r as DataTable, t as AppPage } from "./kit-D87c2tkb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/schedule-DxiL6vb4.js
var import_jsx_runtime = require_jsx_runtime();
function PageRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Guard, {
		pageKey: "student_schedule",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, {})
	});
}
function Body() {
	const bi = useBi();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppPage, {
		title: bi("الجدول", "Schedule"),
		icon: "CalendarDays",
		subtitle: bi("جدول دراسي يذكّرك: حصص، واجبات، امتحانات، وجلسات مراجعة.", "A schedule that reminds you: classes, homework, exams and review sessions."),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatGrid, { items: [
			{
				icon: "CalendarDays",
				label: bi("أحداث هذا الأسبوع", "This week"),
				value: "14"
			},
			{
				icon: "BellRing",
				label: bi("تذكيرات مفعّلة", "Reminders on"),
				value: "9"
			},
			{
				icon: "ListChecks",
				label: bi("مهام متأخرة", "Overdue"),
				value: "2"
			},
			{
				icon: "Timer",
				label: bi("ساعات مخطّطة", "Planned hours"),
				value: "11"
			}
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			title: bi("أسبوعك", "Your week"),
			icon: "CalendarDays",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
				head: [
					bi("اليوم", "Day"),
					bi("النشاط", "Activity"),
					bi("الوقت", "Time"),
					bi("النوع", "Type")
				],
				rows: [
					[
						bi("الأحد", "Sunday"),
						bi("مراجعة رياضيات", "Math review"),
						bi("17:00", "17:00"),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: "primary",
							children: bi("مراجعة", "Review")
						})
					],
					[
						bi("الاثنين", "Monday"),
						bi("امتحان فيزياء", "Physics quiz"),
						bi("09:00", "09:00"),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: "danger",
							children: bi("امتحان", "Exam")
						})
					],
					[
						bi("الأربعاء", "Wednesday"),
						bi("تسليم واجب كيمياء", "Chemistry homework due"),
						bi("23:59", "23:59"),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: "muted",
							children: bi("واجب", "Homework")
						})
					]
				]
			})
		})]
	});
}
//#endregion
export { PageRoute as component };
