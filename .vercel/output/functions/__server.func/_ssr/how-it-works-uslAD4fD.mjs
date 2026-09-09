import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as useTranslation } from "../_libs/react-i18next.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as Reveal } from "./reveal-BzN_D5PG.mjs";
import { r as PublicLayout } from "./public-layout-D95ocArm.mjs";
import { t as SessionCta } from "./session-cta-IyCqmSwP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/how-it-works-uslAD4fD.js
var import_jsx_runtime = require_jsx_runtime();
var steps = [
	"role",
	"system",
	"subjects",
	"goal"
];
function HowItWorks() {
	const { t } = useTranslation();
	const next = t("howItWorks.next", { returnObjects: true });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PublicLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "surface-mesh border-b border-border",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-4xl px-5 py-16 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-4xl font-bold text-foreground",
				children: t("howItWorks.h1")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-lg text-muted-foreground",
				children: t("howItWorks.sub")
			})]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-4xl px-5 py-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
			className: "relative space-y-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": true,
				className: "absolute top-6 bottom-6 w-0.5 bg-border ltr:left-6 rtl:right-6"
			}), steps.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				as: "li",
				delay: i * .08,
				className: "relative",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "shadow-elevation-1 flex gap-5 rounded-2xl border border-border bg-card p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("relative z-10 flex size-12 shrink-0 items-center justify-center rounded-xl font-display text-xl font-bold", i === 0 ? "bg-primary text-primary-foreground" : "bg-primary/12 text-primary"),
						children: i + 1
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-bold text-foreground",
						children: t(`howItWorks.steps.${s}.t`)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1.5 text-sm leading-relaxed text-muted-foreground",
						children: t(`howItWorks.steps.${s}.d`)
					})] })]
				})
			}, s))]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
			delay: .15,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "shadow-elevation-2 mt-12 rounded-2xl border border-border bg-card/50 p-7",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl font-bold text-foreground",
						children: t("howItWorks.nextTitle")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 space-y-2.5 text-sm text-muted-foreground",
						children: next.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["• ", line] }, line))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SessionCta, {
						to: "/signup",
						label: t("howItWorks.cta"),
						className: "btn-shine hover-press mt-7 inline-flex rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground"
					})
				]
			})
		})]
	})] });
}
//#endregion
export { HowItWorks as component };
