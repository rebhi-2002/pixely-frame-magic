import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { x as useBi } from "./rbac-static-data-BkN8GGlQ.mjs";
import { n as Guard } from "./guard-BhjB-ZLB.mjs";
import { a as Panel, c as RowList, l as StatGrid, t as AppPage } from "./kit-D87c2tkb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/teacher.community-wyht0L8A.js
var import_jsx_runtime = require_jsx_runtime();
function PageRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Guard, {
		pageKey: "teacher_community",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, {})
	});
}
function Body() {
	const bi = useBi();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppPage, {
		title: bi("مجتمع الصف", "Class community"),
		icon: "MessagesSquare",
		subtitle: bi("أسئلة طلابك في مكان واحد؛ إجابتك تُميّز كـ«إجابة معلم» تلقائياً.", "Your students' questions in one place; your answer is marked as a verified teacher answer."),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatGrid, { items: [
			{
				icon: "MessagesSquare",
				label: bi("أسئلة مفتوحة", "Open questions"),
				value: "7"
			},
			{
				icon: "CheckCheck",
				label: bi("أجبت هذا الأسبوع", "Answered this week"),
				value: "23"
			},
			{
				icon: "Flag",
				label: bi("بلاغات", "Reports"),
				value: "1"
			},
			{
				icon: "Clock",
				label: bi("متوسط زمن الرد", "Avg. response"),
				value: bi("4 س", "4 hrs")
			}
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			title: bi("بانتظار جوابك", "Awaiting your answer"),
			icon: "MessagesSquare",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowList, { rows: [
				{
					title: bi("كيف نفرّق بين المتسلسلة المتقاربة والمتباعدة؟", "Convergent vs divergent series?"),
					meta: bi("رياضيات · منذ 3 ساعات", "Math · 3h ago"),
					value: bi("مفتوح", "Open"),
					tone: "primary"
				},
				{
					title: bi("خطأ في حلّ تمرين 12", "Mistake in exercise 12"),
					meta: bi("رياضيات · أمس", "Math · yesterday"),
					value: bi("مفتوح", "Open"),
					tone: "primary"
				},
				{
					title: bi("محتوى غير لائق في نقاش", "Inappropriate content in a thread"),
					meta: bi("بلاغ", "Report"),
					value: bi("بلاغ", "Report"),
					tone: "danger"
				}
			] })
		})]
	});
}
//#endregion
export { PageRoute as component };
