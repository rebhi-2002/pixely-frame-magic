import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { f as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/page-transition-Cc_Uhhl7.js
var import_jsx_runtime = require_jsx_runtime();
/**
* انتقال ناعم بين الصفحات بدل التغيير المفاجئ.
* يُلغى تلقائياً عند prefers-reduced-motion عبر styles.css.
*/
function PageTransition({ children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "route-fade",
		children
	}, pathname);
}
//#endregion
export { PageTransition as t };
