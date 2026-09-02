import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as useTranslation } from "../_libs/react-i18next.mjs";
import { t as Reveal } from "./reveal-DrTtc6dz.mjs";
import { Ct as BadgeCheck, _t as ChartLine, it as Coins, o as Upload } from "../_libs/lucide-react.mjs";
import { r as PublicLayout } from "./public-layout-B5Rocqhf.mjs";
import { t as SessionCta } from "./session-cta-BjrITV8i.mjs";
import { t as FAQSection } from "./faq-section-BZbBMoOn.mjs";
import { t as TestimonialsSection } from "./testimonials-section-CVk1RM_f.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/for-teachers-l5maiySN.js
var import_jsx_runtime = require_jsx_runtime();
var benefits = [
	{
		icon: Upload,
		key: "upload"
	},
	{
		icon: ChartLine,
		key: "analytics"
	},
	{
		icon: Coins,
		key: "income"
	},
	{
		icon: BadgeCheck,
		key: "verified"
	}
];
function ForTeachers() {
	const { t } = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PublicLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "surface-mesh border-b border-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-5xl px-5 py-20",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "max-w-2xl text-4xl font-bold leading-tight text-foreground sm:text-5xl",
						children: t("forTeachers.h1")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 max-w-2xl text-lg text-muted-foreground",
						children: t("forTeachers.sub")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SessionCta, {
						to: "/signup",
						label: t("forTeachers.cta"),
						className: "btn-shine glow-primary hover-press mt-8 inline-flex rounded-xl bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground"
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto grid max-w-5xl gap-4 px-5 py-16 md:grid-cols-2",
			children: benefits.map((b, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				delay: i * .06,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "hover-lift shadow-elevation-1 h-full rounded-2xl border border-border bg-card p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex size-11 items-center justify-center rounded-xl bg-success/12 text-success",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(b.icon, { className: "size-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-4 text-base font-bold text-foreground",
							children: t(`forTeachers.benefits.${b.key}.t`)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed text-muted-foreground",
							children: t(`forTeachers.benefits.${b.key}.d`)
						})
					]
				})
			}, b.key))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TestimonialsSection, { className: "border-y border-border bg-card/40" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FAQSection, { i18nKey: "forTeachers.faq" })
	] });
}
//#endregion
export { ForTeachers as component };
