import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as useTranslation } from "../_libs/react-i18next.mjs";
import { t as Reveal } from "./reveal-DrTtc6dz.mjs";
import { A as Minus, p as Sparkles, ut as Check } from "../_libs/lucide-react.mjs";
import { r as PublicLayout } from "./public-layout-BxOOhUSq.mjs";
import { t as SessionCta } from "./session-cta-CkJWvVL3.mjs";
import { t as FAQSection } from "./faq-section-BZbBMoOn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pricing-DrFn--Fi.js
var import_jsx_runtime = require_jsx_runtime();
/**
* PricingCompareTable — مقارنة تفصيلية بين الخطة المجانية وبريميوم، مجمّعة حسب
* الفئة (المحتوى، التحضير للامتحان، المتابعة، الدعم). يقرأ المحتوى بالكامل من
* i18n (pricing.compare) ليبقى قابلاً للتعديل من ملفات الترجمة فقط.
*/
function PricingCompareTable() {
	const { t } = useTranslation();
	const groups = t("pricing.compare.groups", { returnObjects: true });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-t border-border",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-3xl px-5 py-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl font-bold text-foreground sm:text-3xl",
					children: t("pricing.compare.title")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-muted-foreground",
					children: t("pricing.compare.sub")
				})]
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				delay: .08,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "shadow-elevation-1 mt-9 overflow-hidden rounded-2xl border border-border bg-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-[1fr_5rem_5rem] items-center gap-2 border-b border-border bg-card/60 px-5 py-3 sm:grid-cols-[1fr_7rem_7rem]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs font-bold text-muted-foreground",
								children: [
									t("pricing.compare.colFree"),
									" / ",
									t("pricing.compare.colPlus")
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-center text-xs font-bold text-muted-foreground",
								children: t("pricing.compare.colFree")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-center text-xs font-bold text-primary",
								children: t("pricing.compare.colPlus")
							})
						]
					}), groups.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "bg-secondary/40 px-5 py-2 text-xs font-bold text-foreground",
						children: group.t
					}), group.rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-[1fr_5rem_5rem] items-center gap-2 border-t border-border px-5 py-3 sm:grid-cols-[1fr_7rem_7rem]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm text-foreground",
								children: row.l
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex justify-center",
								children: row.free ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4 text-success" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-4 text-muted-foreground/40" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex justify-center",
								children: row.plus ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4 text-primary" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-4 text-muted-foreground/40" })
							})
						]
					}, row.l))] }, group.t))]
				})
			})]
		})
	});
}
var plans = [{
	key: "free",
	highlight: false
}, {
	key: "plus",
	highlight: true
}];
function Pricing() {
	const { t } = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PublicLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "surface-mesh border-b border-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-4xl px-5 py-16 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-4xl font-bold text-foreground",
					children: t("pricing.h1")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-lg text-muted-foreground",
					children: t("pricing.sub")
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto grid max-w-4xl gap-5 px-5 py-16 md:grid-cols-2",
			children: plans.map((p, i) => {
				const features = t(`pricing.${p.key}.features`, { returnObjects: true });
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: i * .08,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `shadow-elevation-2 flex h-full flex-col rounded-2xl border p-7 ${p.highlight ? "glow-primary border-primary/50 bg-card" : "border-border bg-card/60"}`,
						children: [
							p.highlight && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "mb-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1 text-xs font-bold text-primary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3.5" }), t("pricing.plus.badge")]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-xl font-bold text-foreground",
								children: t(`pricing.${p.key}.name`)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-3 flex items-baseline gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-display text-4xl font-bold text-foreground",
									children: t(`pricing.${p.key}.price`)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-sm text-muted-foreground",
									children: [
										t("pricing.currency"),
										" / ",
										t(`pricing.${p.key}.note`)
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-6 flex-1 space-y-3",
								children: features.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-start gap-2.5 text-sm text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mt-0.5 size-4 shrink-0 text-success" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: f })]
								}, f))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SessionCta, {
								to: "/signup",
								label: t(`pricing.${p.key}.cta`),
								className: `hover-press mt-7 inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-bold ${p.highlight ? "btn-shine bg-primary text-primary-foreground" : "border border-border bg-background text-foreground hover:bg-secondary"}`
							})
						]
					})
				}, p.key);
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mx-auto -mt-8 max-w-4xl px-5 pb-4 text-center text-xs text-muted-foreground",
			children: t("pricing.note")
		}) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PricingCompareTable, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FAQSection, {
			i18nKey: "pricing.faq",
			className: "border-t border-border bg-card/40"
		})
	] });
}
//#endregion
export { Pricing as component };
