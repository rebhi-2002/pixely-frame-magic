import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { x as useBi } from "./rbac-static-data-BkN8GGlQ.mjs";
import { n as Guard } from "./guard-BhjB-ZLB.mjs";
import { a as Panel, c as RowList, l as StatGrid, t as AppPage } from "./kit-D87c2tkb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/teacher.profile.edit-cdRJXPSj.js
var import_jsx_runtime = require_jsx_runtime();
function PageRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Guard, {
		pageKey: "teacher_profile_edit",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, {})
	});
}
function Body() {
	const bi = useBi();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppPage, {
		title: bi("ملفي العام", "Public profile"),
		icon: "UserCog",
		subtitle: bi("هذا ما يراه الطلاب وأولياء الأمور: نبذتك، موادك، وشهاداتك الموثّقة.", "This is what students and parents see: your bio, subjects and verified credentials."),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatGrid, { items: [
			{
				icon: "BadgeCheck",
				label: bi("حالة التوثيق", "Verification"),
				value: bi("موثّق", "Verified")
			},
			{
				icon: "Eye",
				label: bi("زيارات الملف", "Profile views"),
				value: "1,860"
			},
			{
				icon: "Star",
				label: bi("التقييم", "Rating"),
				value: "4.8"
			},
			{
				icon: "Users",
				label: bi("طلاب", "Students"),
				value: "126"
			}
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			title: bi("بيانات الملف", "Profile fields"),
			icon: "UserCog",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowList, { rows: [
				{
					title: bi("الاسم المعروض", "Display name"),
					meta: bi("أ. سامي خالد", "Mr. Sami Khaled"),
					value: bi("تعديل", "Edit"),
					tone: "primary"
				},
				{
					title: bi("النبذة", "Bio"),
					meta: bi("معلم رياضيات — 12 سنة خبرة", "Math teacher — 12 years"),
					value: bi("تعديل", "Edit"),
					tone: "primary"
				},
				{
					title: bi("المواد", "Subjects"),
					meta: bi("رياضيات · فيزياء", "Math · Physics"),
					value: bi("تعديل", "Edit"),
					tone: "primary"
				},
				{
					title: bi("الشهادات", "Credentials"),
					meta: bi("بكالوريوس رياضيات — موثّقة", "BSc Mathematics — verified"),
					value: bi("موثّقة", "Verified"),
					tone: "success"
				}
			] })
		})]
	});
}
//#endregion
export { PageRoute as component };
