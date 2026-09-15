import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as useTranslation } from "../_libs/react-i18next.mjs";
import { At as ChartColumn, It as BellRing, Y as Lock, a as UsersRound } from "../_libs/lucide-react.mjs";
import { K as ParentReportIllustration } from "./router-ClmuBdEg.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as Reveal } from "./reveal-LUGiBW7K.mjs";
import { r as PublicLayout } from "./public-layout-CNwOdO2W.mjs";
import { t as SessionCta } from "./session-cta-BYAujFtT.mjs";
import { t as FAQSection } from "./faq-section-uPNlPuO0.mjs";
import { t as TestimonialsSection } from "./testimonials-section-C3MNVOmQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/for-parents-BCCKVjcq.js
var import_jsx_runtime = require_jsx_runtime();
var benefits = [
	{
		icon: ChartColumn,
		key: "report"
	},
	{
		icon: Lock,
		key: "privacy"
	},
	{
		icon: UsersRound,
		key: "multiKids"
	},
	{
		icon: BellRing,
		key: "alerts"
	}
];
function ForParents() {
	const { t } = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PublicLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "surface-mesh border-b border-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-5xl px-5 py-20",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "max-w-2xl text-4xl font-bold leading-tight text-foreground sm:text-5xl",
						children: t("forParents.h1")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 max-w-2xl text-lg text-muted-foreground",
						children: t("forParents.sub")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SessionCta, {
						to: "/signup",
						label: t("forParents.cta"),
						className: "btn-shine glow-primary hover-press mt-8 inline-flex rounded-xl bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParentReportIllustration, { className: "mt-12 h-28 w-full max-w-xl" })
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto max-w-4xl px-5 py-16",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: benefits.map((b, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: i * .06,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: cn("shadow-elevation-1 flex flex-col items-start gap-5 rounded-2xl border border-border bg-card p-6 sm:flex-row sm:items-center", i % 2 === 1 && "sm:flex-row-reverse"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex size-14 shrink-0 items-center justify-center rounded-2xl bg-info/12 text-info",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(b.icon, { className: "size-6" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: cn(i % 2 === 1 && "sm:text-end"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-lg font-bold text-foreground",
								children: t(`forParents.benefits.${b.key}.t`)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1.5 text-sm leading-relaxed text-muted-foreground",
								children: t(`forParents.benefits.${b.key}.d`)
							})]
						})]
					})
				}, b.key))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TestimonialsSection, { className: "border-y border-border bg-card/40" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FAQSection, { i18nKey: "forParents.faq" })
	] });
}
//#endregion
export { ForParents as component };
