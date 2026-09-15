import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { n as gsapWithCSS, t as ScrollTrigger } from "../_libs/gsap.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reveal-LUGiBW7K.js
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
* لغة حركة الدخول (entrance motion) — 3 أنماط مسمّاة بس، مو أرقام حرة بكل
* ملف. كل نمط مرتبط بنوع المحتوى (نية الاستخدام) مش اختيار عشوائي:
*
* - "content"  (افتراضي): بطاقات/أقسام مستقلة (مزايا، تدوينات، خطوات).
*   انزلاق واضح (24px) ومدة كاملة (0.7s) — المحتوى نفسه هو نقطة التركيز.
* - "stat"     : بطاقات أرقام/إحصائيات (AnimatedCounter). انزلاق أخف
*   (12px) ومدة أقصر (0.5s) عمدًا — الرقم نفسه عم "يعد" بصريًا أصلاً،
*   فحركة دخول قوية زيادة بتنافس الانتباه بدل ما تخدمه.
* - "compact"  : عناصر شبكة صغيرة/كثيرة (تايلز لوحة تحكم مضغوطة). انزلاق
*   ومدة بينية (16px / 0.55s) — أخف من content لأنها أصغر حجمًا وأكتر عددًا،
*   فحركة كاملة الحجم بتصير مزعجة ومكررة بسرعة.
*
* القاعدة: أضف نمط جديد هون فقط لو نوع محتوى فعليًا مختلف محتاجه — مش رقم
* حر بملف الصفحة. هيك الحركة تبقى نظام موحّد قابل للصيانة، مو تنويع عشوائي.
*/
var REVEAL_VARIANTS = {
	content: {
		y: 24,
		duration: .7
	},
	stat: {
		y: 12,
		duration: .5
	},
	compact: {
		y: 16,
		duration: .55
	}
};
/**
* <Reveal> — غلاف لأي محتوى ليظهر بأنيميشن fade+slide عند وصول المستخدم إليه بالسكرول.
* مثال للتتابع:
*   {items.map((item, i) => (
*     <Reveal key={item.id} delay={i * 0.08}><Card>...</Card></Reveal>
*   ))}
* مثال ببطاقة إحصائية:
*   <Reveal variant="stat" delay={i * 0.08}><StatCard .../></Reveal>
*/
function Reveal({ children, as: Tag = "div", className, delay, variant = "content", y, duration }) {
	const preset = REVEAL_VARIANTS[variant];
	const ref = useScrollReveal({
		delay,
		y: y ?? preset.y,
		duration: duration ?? preset.duration
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
		ref,
		className: cn(className),
		children
	});
}
//#endregion
export { Reveal as t };
