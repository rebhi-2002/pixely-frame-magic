import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { x as useBi } from "./rbac-static-data-BkN8GGlQ.mjs";
import { n as Guard } from "./guard-BhjB-ZLB.mjs";
import { a as Panel, l as StatGrid, n as Badge, r as DataTable, t as AppPage } from "./kit-D87c2tkb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/teacher.content-8X9eTRo1.js
var import_jsx_runtime = require_jsx_runtime();
function PageRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Guard, {
		pageKey: "teacher_content",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, {})
	});
}
function Body() {
	const bi = useBi();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppPage, {
		title: bi("المحتوى", "Content"),
		icon: "FileStack",
		subtitle: bi("دروسك وملفاتك: ارفع، رتّب على شجرة المنهاج، وأرسل للمراجعة قبل النشر.", "Your lessons and files: upload, place on the curriculum tree, submit for review."),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatGrid, { items: [
			{
				icon: "FileStack",
				label: bi("دروس منشورة", "Published"),
				value: "42"
			},
			{
				icon: "Clock",
				label: bi("قيد المراجعة", "In review"),
				value: "5"
			},
			{
				icon: "FileEdit",
				label: bi("مسوّدات", "Drafts"),
				value: "8"
			},
			{
				icon: "Eye",
				label: bi("مشاهدات الشهر", "Views this month"),
				value: "3,140"
			}
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			title: bi("أحدث المحتوى", "Recent content"),
			icon: "FileStack",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
				head: [
					bi("العنوان", "Title"),
					bi("المادة", "Subject"),
					bi("الحالة", "Status"),
					bi("مشاهدات", "Views")
				],
				rows: [
					[
						bi("الدوال — شرح كامل", "Functions — full lesson"),
						bi("رياضيات", "Math"),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: "muted",
							children: bi("قيد المراجعة", "In review")
						}),
						"—"
					],
					[
						bi("قوانين نيوتن", "Newton's laws"),
						bi("فيزياء", "Physics"),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: "success",
							children: bi("منشور", "Published")
						}),
						"1,204"
					],
					[
						bi("ورقة تدريب المشتقات", "Derivatives worksheet"),
						bi("رياضيات", "Math"),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: "primary",
							children: bi("مسوّدة", "Draft")
						}),
						"—"
					]
				]
			})
		})]
	});
}
//#endregion
export { PageRoute as component };
