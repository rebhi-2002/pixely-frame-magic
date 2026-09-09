import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as useTranslation } from "../_libs/react-i18next.mjs";
import { A as Quote, V as MessageCircleHeart } from "../_libs/lucide-react.mjs";
import { t as Reveal } from "./reveal-BzN_D5PG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/testimonials-section-D7klOPg6.js
var import_jsx_runtime = require_jsx_runtime();
/**
* TestimonialsSection — قسم "آراء" توضيحي بانتظار محتوى حقيقي من مستخدمين فعليين.
* لا يحتوي على أي اقتباس أو اسم مُختلق؛ بطاقات skeleton صريحة + شارة "قريباً".
* عند توفر آراء حقيقية، استبدل هذا المكون ببطاقات فعلية (نفس تركيب Card الحالي).
*/
function TestimonialsSection({ className }) {
	const { t } = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-5xl px-5 py-16 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-2 rounded-full bg-primary/12 px-4 py-1.5 text-sm font-bold text-primary",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircleHeart, { className: "size-4" }), t("testimonials.badge")]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-2xl font-bold text-foreground sm:text-3xl",
					children: t("testimonials.title")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mx-auto mt-2 max-w-xl text-sm text-muted-foreground",
					children: t("testimonials.sub")
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				delay: .08,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto mt-10 flex max-w-2xl flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-card/40 p-8 sm:p-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Quote, {
							"aria-hidden": "true",
							className: "size-6"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-lg text-sm leading-relaxed text-muted-foreground",
						children: t("testimonials.placeholder")
					})]
				})
			})]
		})
	});
}
//#endregion
export { TestimonialsSection as t };
