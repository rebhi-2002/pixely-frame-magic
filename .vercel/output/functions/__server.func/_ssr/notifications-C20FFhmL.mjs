import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { x as useBi } from "./rbac-static-data-BkN8GGlQ.mjs";
import { n as Guard } from "./guard-BhjB-ZLB.mjs";
import { a as Panel, c as RowList, n as Badge, t as AppPage } from "./kit-D87c2tkb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/notifications-C20FFhmL.js
var import_jsx_runtime = require_jsx_runtime();
function NotificationsPage() {
	const bi = useBi();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Guard, {
		pageKey: "notifications",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppPage, {
			title: bi("الإشعارات", "Notifications"),
			icon: "Bell",
			subtitle: bi("تنبيهات الدراسة والحساب والمراجعات في مكان واحد.", "Study, account, and review alerts in one place."),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: bi("اليوم", "Today"),
				icon: "Bell",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					tone: "primary",
					children: "3"
				}),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowList, { rows: [
					{
						title: bi("تم نشر نتيجة اختبار الفيزياء", "Physics quiz result is available"),
						meta: bi("منذ 12 دقيقة", "12 minutes ago"),
						value: bi("جديد", "New"),
						tone: "primary"
					},
					{
						title: bi("موعد مراجعة الرياضيات غداً", "Math review is tomorrow"),
						meta: bi("منذ ساعة", "1 hour ago"),
						value: bi("تذكير", "Reminder"),
						tone: "success"
					},
					{
						title: bi("تم تحديث إعدادات الأمان", "Security settings were updated"),
						meta: bi("منذ 3 ساعات", "3 hours ago")
					}
				] })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: bi("سابقاً", "Earlier"),
				icon: "History",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowList, { rows: [{
					title: bi("أضيف درس جديد إلى مكتبتك", "A new lesson was added to your library"),
					meta: bi("أمس", "Yesterday")
				}, {
					title: bi("اكتملت سلسلة إنجاز 12 يوماً", "Your 12-day achievement streak is complete"),
					meta: bi("منذ يومين", "2 days ago"),
					value: bi("إنجاز", "Achievement"),
					tone: "success"
				}] })
			})]
		})
	});
}
//#endregion
export { NotificationsPage as component };
