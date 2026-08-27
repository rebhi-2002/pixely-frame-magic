import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { x as useBi } from "./rbac-static-data-BkN8GGlQ.mjs";
import { n as Guard } from "./guard-BhjB-ZLB.mjs";
import { a as Panel, c as RowList, l as StatGrid, t as AppPage } from "./kit-D87c2tkb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/referrals-CoXIK280.js
var import_jsx_runtime = require_jsx_runtime();
function PageRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Guard, {
		pageKey: "student_referrals",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, {})
	});
}
function Body() {
	const bi = useBi();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppPage, {
		title: bi("الإحالات", "Referrals"),
		icon: "Gift",
		subtitle: bi("ادعُ أصدقاءك برابطك الخاص، وتابع كم صديق سجّل فعلياً ومكافآتك.", "Invite friends with your own link, and track who joined and what you earned."),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatGrid, { items: [
			{
				icon: "Link",
				label: bi("رابطك", "Your link"),
				value: "acadimia/r/AH12"
			},
			{
				icon: "UserPlus",
				label: bi("دعوات مُرسلة", "Invites sent"),
				value: "9"
			},
			{
				icon: "CheckCircle2",
				label: bi("سجّلوا فعلياً", "Joined"),
				value: "4"
			},
			{
				icon: "Gift",
				label: bi("مكافآتك", "Rewards"),
				value: bi("2 شهور", "2 months")
			}
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			title: bi("من دعوتهم", "People you invited"),
			icon: "Users",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowList, {
				to: "/invite/AH12",
				rows: [
					{
						title: bi("لؤي ع.", "Loai A."),
						meta: bi("سجّل 2026/07/12", "Joined 2026/07/12"),
						value: bi("مكافأة", "Rewarded"),
						tone: "success"
					},
					{
						title: bi("سما ح.", "Sama H."),
						meta: bi("سجّل 2026/07/03", "Joined 2026/07/03"),
						value: bi("مكافأة", "Rewarded"),
						tone: "success"
					},
					{
						title: bi("يزن م.", "Yazan M."),
						meta: bi("الدعوة مفتوحة", "Invite pending"),
						value: bi("معلّق", "Pending"),
						tone: "muted"
					}
				]
			})
		})]
	});
}
//#endregion
export { PageRoute as component };
