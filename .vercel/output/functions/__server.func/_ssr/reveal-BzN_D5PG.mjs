import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { n as gsapWithCSS, t as ScrollTrigger } from "../_libs/gsap.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reveal-BzN_D5PG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
if (typeof window !== "undefined") gsapWithCSS.registerPlugin(ScrollTrigger);
/**
* useScrollReveal — يكشف العنصر بأنيميشن fade+slide عند دخوله الشاشة عبر GSAP ScrollTrigger.
* يحترم prefers-reduced-motion تلقائياً (العنصر يبقى ظاهراً بدون حركة).
* يعتمد على data-reveal / data-revealed في styles.css كحالة أولية بدون وميض (FOUC).
*/
function useScrollReveal(options = {}) {
	const ref = (0, import_react.useRef)(null);
	const { delay = 0, y = 24, duration = .7, disabled = false } = options;
	(0, import_react.useEffect)(() => {
		const el = ref.current;
		if (!el || disabled) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			el.setAttribute("data-revealed", "true");
			return;
		}
		el.setAttribute("data-reveal", "");
		const ctx = gsapWithCSS.context(() => {
			gsapWithCSS.fromTo(el, {
				opacity: 0,
				y
			}, {
				opacity: 1,
				y: 0,
				duration,
				delay,
				ease: "power3.out",
				onStart: () => el.setAttribute("data-revealed", "true"),
				scrollTrigger: {
					trigger: el,
					start: "top 85%",
					once: true
				}
			});
		}, el);
		return () => ctx.revert();
	}, []);
	return ref;
}
/**
* <Reveal> — غلاف لأي محتوى ليظهر بأنيميشن fade+slide عند وصول المستخدم إليه بالسكرول.
* مثال للتتابع:
*   {items.map((item, i) => (
*     <Reveal key={item.id} delay={i * 0.08}><Card>...</Card></Reveal>
*   ))}
*/
function Reveal({ children, as: Tag = "div", className, delay, y, duration }) {
	const ref = useScrollReveal({
		delay,
		y,
		duration
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
		ref,
		className: cn(className),
		children
	});
}
//#endregion
export { Reveal as t };
