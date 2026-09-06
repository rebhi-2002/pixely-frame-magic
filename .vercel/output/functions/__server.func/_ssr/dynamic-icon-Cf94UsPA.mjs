import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { ct as Circle, t as lucide_react_exports } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dynamic-icon-Cf94UsPA.js
var import_jsx_runtime = require_jsx_runtime();
var registry = lucide_react_exports;
function DynamicIcon({ name, ...props }) {
	const Cmp = registry[name] ?? Circle;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cmp, { ...props });
}
//#endregion
export { DynamicIcon as t };
