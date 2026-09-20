import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { s as User } from "../_libs/lucide-react.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/photo-avatar-FiwFco56.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* أفاتار بصورة حقيقية مع Fallback تلقائي لأيقونة لو الملف غير موجود —
* هيك تقدر تحط اسم مسار صورة بأي مكان بالمشروع (فريق، معلم، طالب) من الآن،
* ولما تتوفر الصورة الحقيقية تحطها بنفس الاسم بدون أي تعديل كود.
*/
function PhotoAvatar({ src, alt = "", icon: Icon = User, className, iconClassName }) {
	const [failed, setFailed] = (0, import_react.useState)(false);
	if (failed) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("flex shrink-0 items-center justify-center rounded-full bg-primary/12 text-primary", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: cn("size-1/2", iconClassName) })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src,
		alt,
		onError: () => setFailed(true),
		className: cn("shrink-0 rounded-full border border-border object-cover", className)
	});
}
//#endregion
export { PhotoAvatar as t };
