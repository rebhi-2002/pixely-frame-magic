import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { x as useBi } from "./rbac-static-data-BkN8GGlQ.mjs";
import { n as Guard } from "./guard-BhjB-ZLB.mjs";
import { a as Panel, c as RowList, l as StatGrid, t as AppPage } from "./kit-D87c2tkb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/bookmarks-XrB6a1lO.js
var import_jsx_runtime = require_jsx_runtime();
function PageRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Guard, {
		pageKey: "student_bookmarks",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, {})
	});
}
function Body() {
	const bi = useBi();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppPage, {
		title: bi("المحفوظات", "Bookmarks"),
		icon: "Bookmark",
		subtitle: bi("كل ما حفظته: دروس، أسئلة، ونقاشات — بمكان واحد للرجوع السريع.", "Everything you saved: lessons, questions and threads — in one quick-access place."),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatGrid, { items: [
			{
				icon: "Bookmark",
				label: bi("عناصر محفوظة", "Saved items"),
				value: "27"
			},
			{
				icon: "FileText",
				label: bi("دروس", "Lessons"),
				value: "12"
			},
			{
				icon: "HelpCircle",
				label: bi("أسئلة", "Questions"),
				value: "9"
			},
			{
				icon: "MessagesSquare",
				label: bi("نقاشات", "Threads"),
				value: "6"
			}
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			title: bi("محفوظاتك", "Your bookmarks"),
			icon: "Bookmark",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowList, {
				to: "/library",
				rows: [
					{
						title: bi("درس: تكامل بالتجزيء", "Lesson: integration by parts"),
						meta: bi("رياضيات", "Math"),
						value: bi("درس", "Lesson"),
						tone: "primary"
					},
					{
						title: bi("سؤال: قانون أوم", "Question: Ohm's law"),
						meta: bi("فيزياء", "Physics"),
						value: bi("سؤال", "Question"),
						tone: "muted"
					},
					{
						title: bi("نقاش: تنظيم وقت المراجعة", "Thread: planning review time"),
						meta: bi("عام", "General"),
						value: bi("نقاش", "Thread"),
						tone: "muted"
					}
				]
			})
		})]
	});
}
//#endregion
export { PageRoute as component };
