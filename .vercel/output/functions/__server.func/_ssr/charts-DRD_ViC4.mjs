import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { M as useBi } from "./rbac-static-data-6lJhuenE.mjs";
import { Y as WelcomeIllustration } from "./router-ClmuBdEg.mjs";
import { t as Reveal } from "./reveal-LUGiBW7K.mjs";
import { t as useSession } from "./use-session-1juYzQu_.mjs";
import { a as XAxis, c as Bar, d as ResponsiveContainer, f as Tooltip, i as YAxis, l as Pie, n as PieChart, o as Area, p as Legend, r as BarChart, s as CartesianGrid, t as AreaChart, u as Cell } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/charts-DRD_ViC4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* WelcomeBanner — بانر شخصي بأعلى كل لوحة تحكم (طالب/معلم/ولي أمر/مشرف/أدمن).
* الاسم حقيقي (من الجلسة)؛ العنوان الفرعي والنصيحة مخصّصة لكل دور عبر props.
*/
function WelcomeBanner({ subtitle, tip, action }) {
	const { session } = useSession();
	const bi = useBi();
	const firstName = session?.fullName?.trim().split(/\s+/)[0];
	const greeting = firstName ? bi(`أهلاً ${firstName} 👋`, `Hi ${firstName} 👋`) : bi("أهلاً بيك 👋", "Welcome 👋");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "surface-mesh shadow-elevation-1 relative overflow-hidden rounded-2xl border border-border",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative flex items-center gap-6 px-6 py-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl font-bold text-foreground sm:text-2xl",
						children: greeting
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1.5 max-w-md text-sm text-muted-foreground",
						children: bi(...subtitle)
					}),
					tip && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary/12 px-3 py-1 text-xs font-semibold text-primary",
						children: bi(...tip)
					}),
					action && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4",
						children: action
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WelcomeIllustration, { className: "hidden h-28 w-auto shrink-0 sm:block" })]
		})
	}) });
}
var AXIS = {
	fontSize: 11,
	fill: "var(--color-muted-foreground)"
};
var TOOLTIP_STYLE = {
	background: "var(--color-card)",
	border: "1px solid var(--color-border)",
	borderRadius: 14,
	fontSize: 12,
	color: "var(--color-foreground)",
	boxShadow: "0 12px 32px -12px color-mix(in oklab, var(--color-foreground) 30%, transparent)",
	padding: "8px 12px"
};
/** منحنى تراكمي (نمو/نشاط) — البند 16. */
function TrendChart({ data, dataKey = "value", height = 220 }) {
	const id = (0, import_react.useMemo)(() => `grad-${Math.random().toString(36).slice(2, 8)}`, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		style: { height },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
				data,
				margin: {
					top: 8,
					right: 8,
					bottom: 0,
					left: -18
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
						id,
						x1: "0",
						y1: "0",
						x2: "0",
						y2: "1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "0%",
							stopColor: "var(--color-primary)",
							stopOpacity: .55
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "100%",
							stopColor: "var(--color-primary)",
							stopOpacity: .02
						})]
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
						stroke: "var(--color-border)",
						strokeDasharray: "3 5",
						vertical: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
						dataKey: "label",
						tick: AXIS,
						axisLine: false,
						tickLine: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
						tick: AXIS,
						axisLine: false,
						tickLine: false,
						width: 44
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: TOOLTIP_STYLE }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
						type: "monotone",
						dataKey,
						stroke: "var(--color-primary)",
						strokeWidth: 2.5,
						fill: `url(#${id})`
					})
				]
			})
		})
	});
}
/** أعمدة مقارنة (أقسام/مواد) — البند 16. */
function ComparisonChart({ data, height = 220 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		style: { height },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
				data,
				margin: {
					top: 8,
					right: 8,
					bottom: 0,
					left: -18
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
						stroke: "var(--color-border)",
						strokeDasharray: "3 5",
						vertical: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
						dataKey: "label",
						tick: AXIS,
						axisLine: false,
						tickLine: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
						tick: AXIS,
						axisLine: false,
						tickLine: false,
						width: 44
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
						contentStyle: TOOLTIP_STYLE,
						cursor: {
							fill: "var(--color-accent)",
							opacity: .35
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
						dataKey: "value",
						radius: [
							8,
							8,
							4,
							4
						],
						fill: "var(--color-primary)",
						barSize: 28
					})
				]
			})
		})
	});
}
var DONUT_COLORS = [
	"var(--color-primary)",
	"var(--color-success)",
	"var(--color-info)",
	"var(--color-muted-foreground)"
];
/** توزيع دائري (حالات/أدوار) — البند 16. */
function SplitChart({ data, height = 220 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		style: { height },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
					data,
					dataKey: "value",
					nameKey: "label",
					innerRadius: "55%",
					outerRadius: "82%",
					paddingAngle: 3,
					stroke: "var(--color-card)",
					children: data.map((entry, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: DONUT_COLORS[i % DONUT_COLORS.length] }, entry.label))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {
					verticalAlign: "bottom",
					iconType: "circle",
					formatter: (value) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						style: { fontSize: 12 },
						children: value
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: TOOLTIP_STYLE })
			] })
		})
	});
}
//#endregion
export { WelcomeBanner as i, SplitChart as n, TrendChart as r, ComparisonChart as t };
