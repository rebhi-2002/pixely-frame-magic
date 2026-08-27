import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as useTranslation } from "../_libs/react-i18next.mjs";
import { t as Reveal } from "./reveal-DrTtc6dz.mjs";
import { N as MessageCircleHeart, S as Quote } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/testimonials-section-CGR7oYIZ.js
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
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 grid gap-4 md:grid-cols-3",
				children: [
					0,
					1,
					2
				].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: i * .08,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex h-full flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-card/40 p-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Quote, { className: "size-6 text-muted-foreground/50" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: t("testimonials.placeholder")
						})]
					})
				}, i))
			})]
		})
	});
}
//#endregion
export { TestimonialsSection as t };
