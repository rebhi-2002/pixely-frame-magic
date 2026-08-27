import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { x as useBi } from "./rbac-static-data-BkN8GGlQ.mjs";
import { n as Guard } from "./guard-BhjB-ZLB.mjs";
import { a as Panel, c as RowList, l as StatGrid, s as QuickLinks, t as AppPage } from "./kit-D87c2tkb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/parent.settings-D3qYOFE_.js
var import_jsx_runtime = require_jsx_runtime();
function PageRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Guard, {
		pageKey: "parent_settings",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, {})
	});
}
function Body() {
	const bi = useBi();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppPage, {
		title: bi("إعدادات ولي الأمر", "Parent settings"),
		icon: "Settings",
		subtitle: bi("الأبناء المرتبطون بحسابك، فك الربط، وتفضيلات الإشعارات والتقارير.", "Linked children, unlinking, and notification/report preferences."),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatGrid, { items: [
				{
					icon: "Users",
					label: bi("أبناء مرتبطون", "Linked children"),
					value: "2"
				},
				{
					icon: "Mail",
					label: bi("تقرير أسبوعي", "Weekly report"),
					value: bi("مفعّل", "On")
				},
				{
					icon: "BellRing",
					label: bi("تنبيهات فورية", "Instant alerts"),
					value: bi("مفعّلة", "On")
				},
				{
					icon: "ShieldCheck",
					label: bi("حالة الحساب", "Account status"),
					value: bi("موثّق", "Verified")
				}
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: bi("الأبناء المرتبطون", "Linked children"),
				icon: "Users",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowList, { rows: [{
					title: bi("أحمد — الصف الحادي عشر", "Ahmad — grade 11"),
					meta: bi("ارتبط 2026/03/02", "Linked 2026/03/02"),
					value: bi("فك الربط", "Unlink"),
					tone: "danger"
				}, {
					title: bi("سارة — الصف التاسع", "Sara — grade 9"),
					meta: bi("ارتبط 2026/04/18", "Linked 2026/04/18"),
					value: bi("فك الربط", "Unlink"),
					tone: "danger"
				}] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: bi("الإشعارات", "Notifications"),
				icon: "BellRing",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowList, { rows: [
					{
						title: bi("تقرير أسبوعي بالإيميل", "Weekly email report"),
						meta: bi("كل أحد 8:00", "Every Sunday 8:00"),
						value: bi("مفعّل", "On"),
						tone: "success"
					},
					{
						title: bi("تنبيه تراجع الإتقان", "Mastery drop alert"),
						meta: bi("فوري", "Instant"),
						value: bi("مفعّل", "On"),
						tone: "success"
					},
					{
						title: bi("رسائل المعلمين", "Teacher messages"),
						meta: bi("ملخّص يومي", "Daily digest"),
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
						to: "/parent/report",
						label: bi("تقرير الابن", "Child report"),
						icon: "FileBarChart"
					},
					{
						to: "/notifications",
						label: bi("الإشعارات", "Notifications"),
						icon: "Bell"
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
