import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { x as useBi } from "./rbac-static-data-BkN8GGlQ.mjs";
import { n as Guard } from "./guard-BhjB-ZLB.mjs";
import { a as Panel, c as RowList, l as StatGrid, s as QuickLinks, t as AppPage } from "./kit-D87c2tkb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/teacher.settings-8eXYHDfr.js
var import_jsx_runtime = require_jsx_runtime();
function PageRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Guard, {
		pageKey: "teacher_settings",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, {})
	});
}
function Body() {
	const bi = useBi();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppPage, {
		title: bi("إعدادات المعلم", "Teacher settings"),
		icon: "Settings",
		subtitle: bi("التسعير، أوقات التوفّر، بيانات الدفع، وتفضيلات الإشعارات.", "Pricing, availability, payout details and notification preferences."),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatGrid, { items: [
				{
					icon: "BadgePercent",
					label: bi("نموذج التسعير", "Pricing model"),
					value: bi("لكل كورس", "Per course")
				},
				{
					icon: "CalendarClock",
					label: bi("أوقات التوفّر", "Availability"),
					value: bi("5 فترات", "5 slots")
				},
				{
					icon: "Banknote",
					label: bi("طريقة السحب", "Payout method"),
					value: bi("حوالة بنكية", "Bank transfer")
				},
				{
					icon: "BellRing",
					label: bi("الإشعارات", "Notifications"),
					value: bi("مفعّلة", "On")
				}
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: bi("الإعدادات", "Settings"),
				icon: "Settings",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowList, { rows: [
					{
						title: bi("سعر الحصة الخاصة", "Private session price"),
						meta: bi("20 ₪ / ساعة", "20 ILS / hour"),
						value: bi("تعديل", "Edit"),
						tone: "primary"
					},
					{
						title: bi("أوقات التوفّر", "Availability"),
						meta: bi("أحد-خميس 17:00-21:00", "Sun-Thu 17:00-21:00"),
						value: bi("تعديل", "Edit"),
						tone: "primary"
					},
					{
						title: bi("بيانات الحوالة", "Bank details"),
						meta: bi("محفوظة ومشفّرة", "Stored encrypted"),
						value: bi("تعديل", "Edit"),
						tone: "primary"
					},
					{
						title: bi("إشعار سؤال جديد", "New question alert"),
						meta: bi("فوري", "Instant"),
						value: bi("مفعّل", "On"),
						tone: "success"
					}
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: bi("روابط سريعة", "Quick links"),
				icon: "Settings",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickLinks, { items: [
					{
						to: "/teacher/profile/edit",
						label: bi("ملفي العام", "Public profile"),
						icon: "UserCog"
					},
					{
						to: "/teacher/earnings",
						label: bi("الأرباح", "Earnings"),
						icon: "Wallet"
					},
					{
						to: "/settings",
						label: bi("اللغة والثيم", "Language & theme"),
						icon: "Palette"
					}
				] })
			})
		]
	});
}
//#endregion
export { PageRoute as component };
