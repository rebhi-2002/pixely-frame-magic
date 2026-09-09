import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as gsapWithCSS } from "../_libs/gsap.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/animated-counter-DDUyItod.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
 * AnimatedCounter — يصعّد رقم من 0 للقيمة المستهدفة بأنيميشن GSAP لما يظهر بالشاشة.
 * يدعم بادئة/لاحقة (%، +، إلخ) ويحترم prefers-reduced-motion (يعرض القيمة النهائية مباشرة).
 */
function AnimatedCounter({ value, prefix = "", suffix = "", duration = 1.1, className }) {
  const ref = (0, import_react.useRef)(null);
  (0, import_react.useEffect)(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = `${prefix}${value}${suffix}`;
      return;
    }
    const counter = { n: 0 };
    const tween = gsapWithCSS.to(counter, {
      n: value,
      duration,
      ease: "power2.out",
      onUpdate: () => {
        el.textContent = `${prefix}${Math.round(counter.n)}${suffix}`;
      },
    });
    return () => {
      tween.kill();
    };
  }, [value]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
    ref,
    className,
    children: [prefix, "0", suffix],
  });
}
//#endregion
export { AnimatedCounter as t };
