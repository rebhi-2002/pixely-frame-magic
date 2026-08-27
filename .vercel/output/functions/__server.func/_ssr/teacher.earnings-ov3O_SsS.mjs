import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { x as useBi } from "./rbac-static-data-BkN8GGlQ.mjs";
import { n as Guard } from "./guard-BhjB-ZLB.mjs";
import { a as Panel, l as StatGrid, n as Badge, r as DataTable, t as AppPage } from "./kit-D87c2tkb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/teacher.earnings-ov3O_SsS.js
var import_jsx_runtime = require_jsx_runtime();
function PageRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Guard, {
		pageKey: "teacher_earnings",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, {})
	});
}
function Body() {
	const bi = useBi();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppPage, {
		title: bi("الأرباح", "Earnings"),
		icon: "Wallet",
		subtitle: bi("أرباحك، عمولة المنصة، وطلبات السحب — كل شي واضح بلا مفاجآت.", "Your earnings, platform fee and payout requests — all transparent."),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatGrid, { items: [
			{
				icon: "Wallet",
				label: bi("الرصيد المتاح", "Available"),
				value: bi("620 ₪", "620 ILS")
			},
			{
				icon: "Hourglass",
				label: bi("قيد التسوية", "Pending"),
				value: bi("200 ₪", "200 ILS")
			},
			{
				icon: "BadgePercent",
				label: bi("عمولة المنصة", "Platform fee"),
				value: "15%"
			},
			{
				icon: "Banknote",
				label: bi("إجمالي مسحوب", "Total paid out"),
				value: bi("3,450 ₪", "3,450 ILS")
			}
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			title: bi("آخر الحركات", "Recent transactions"),
			icon: "Receipt",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
				head: [
					bi("التاريخ", "Date"),
					bi("الوصف", "Description"),
					bi("المبلغ", "Amount"),
					bi("الحالة", "Status")
				],
				rows: [
					[
						bi("2026/07/30", "2026/07/30"),
						bi("اشتراك كورس تفاضل", "Calculus enrollment"),
						bi("+45 ₪", "+45 ILS"),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: "success",
							children: bi("مؤكد", "Cleared")
						})
					],
					[
						bi("2026/07/28", "2026/07/28"),
						bi("طلب سحب", "Payout request"),
						bi("-500 ₪", "-500 ILS"),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: "primary",
							children: bi("قيد التنفيذ", "Processing")
						})
					],
					[
						bi("2026/07/25", "2026/07/25"),
						bi("اشتراك مراجعة", "Review enrollment"),
						bi("+15 ₪", "+15 ILS"),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: "success",
							children: bi("مؤكد", "Cleared")
						})
					]
				]
			})
		})]
	});
}
//#endregion
export { PageRoute as component };
