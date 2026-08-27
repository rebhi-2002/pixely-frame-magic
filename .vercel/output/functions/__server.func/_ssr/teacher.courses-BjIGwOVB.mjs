import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { x as useBi } from "./rbac-static-data-BkN8GGlQ.mjs";
import { n as Guard } from "./guard-BhjB-ZLB.mjs";
import { a as Panel, l as StatGrid, n as Badge, r as DataTable, t as AppPage } from "./kit-D87c2tkb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/teacher.courses-BjIGwOVB.js
var import_jsx_runtime = require_jsx_runtime();
function PageRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Guard, {
		pageKey: "teacher_courses",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, {})
	});
}
function Body() {
	const bi = useBi();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppPage, {
		title: bi("كورساتي (معلم)", "My courses (teacher)"),
		icon: "BookOpenCheck",
		subtitle: bi("كورساتك المنشورة: الأسعار، المشتركون، والحصص القادمة.", "Your published courses: pricing, enrollments and upcoming sessions."),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatGrid, { items: [
			{
				icon: "BookOpenCheck",
				label: bi("كورسات منشورة", "Published"),
				value: "4"
			},
			{
				icon: "Users",
				label: bi("مشتركون", "Enrollments"),
				value: "218"
			},
			{
				icon: "Star",
				label: bi("التقييم", "Rating"),
				value: "4.8"
			},
			{
				icon: "Wallet",
				label: bi("إيراد الشهر", "Monthly revenue"),
				value: bi("820 ₪", "820 ILS")
			}
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			title: bi("كورساتك", "Your courses"),
			icon: "BookOpenCheck",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
				head: [
					bi("الكورس", "Course"),
					bi("السعر", "Price"),
					bi("مشتركون", "Enrolled"),
					bi("الحالة", "Status")
				],
				rows: [
					[
						bi("تفاضل وتكامل — الوزاري", "Calculus — ministry"),
						bi("45 ₪", "45 ILS"),
						"96",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: "success",
							children: bi("منشور", "Published")
						})
					],
					[
						bi("مراجعة ليلة الامتحان", "Exam-night review"),
						bi("15 ₪", "15 ILS"),
						"74",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: "success",
							children: bi("منشور", "Published")
						})
					],
					[
						bi("أساسيات الجبر", "Algebra basics"),
						bi("مجاني", "Free"),
						"48",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: "primary",
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
