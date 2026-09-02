import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { ct as Circle, t as lucide_react_exports } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dynamic-icon-C1Jx44Mm.js
var import_jsx_runtime = require_jsx_runtime();
var registry = lucide_react_exports;
function DynamicIcon({ name, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(registry[name] ?? Circle, { ...props });
}
//#endregion
export { DynamicIcon as t };
