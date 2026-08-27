import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { x as useBi } from "./rbac-static-data-BkN8GGlQ.mjs";
import { n as Guard } from "./guard-BhjB-ZLB.mjs";
import { a as Panel, c as RowList, l as StatGrid, t as AppPage } from "./kit-D87c2tkb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/community-Af69lXHB.js
var import_jsx_runtime = require_jsx_runtime();
function PageRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Guard, {
		pageKey: "student_community",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, {})
	});
}
function Body() {
	const bi = useBi();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppPage, {
		title: bi("مجتمع المواد", "Subject community"),
		icon: "MessagesSquare",
		subtitle: bi("اسأل في مجتمع المادة، وجاوب زملاءك — إجابات المعلم تُميّز تلقائياً.", "Ask in your subject community and answer classmates — teacher answers are highlighted."),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatGrid, { items: [
			{
				icon: "MessagesSquare",
				label: bi("أسئلة هذا الأسبوع", "Questions this week"),
				value: "48"
			},
			{
				icon: "CheckCheck",
				label: bi("إجابات معتمدة", "Verified answers"),
				value: "31"
			},
			{
				icon: "Users",
				label: bi("أعضاء مادّتك", "Members"),
				value: "312"
			},
			{
				icon: "Star",
				label: bi("سمعتك", "Your reputation"),
				value: "150"
			}
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			title: bi("أحدث الأسئلة", "Latest questions"),
			icon: "MessagesSquare",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowList, { rows: [
				{
					title: bi("كيف نحلّ تكامل بالتجزيء؟", "How to solve integration by parts?"),
					meta: bi("رياضيات · 6 إجابات", "Math · 6 answers"),
					value: bi("إجابة معلم", "Teacher answer"),
					tone: "success"
				},
				{
					title: bi("فرق الجهد في التوالي والتوازي", "Voltage in series vs parallel"),
					meta: bi("فيزياء · 3 إجابات", "Physics · 3 answers"),
					value: bi("مفتوح", "Open"),
					tone: "primary"
				},
				{
					title: bi("مراجعة قواعد الهمزة", "Hamza rules review"),
					meta: bi("عربي · 9 إجابات", "Arabic · 9 answers"),
					value: bi("مُغلق", "Closed"),
					tone: "muted"
				}
			] })
		})]
	});
}
//#endregion
export { PageRoute as component };
