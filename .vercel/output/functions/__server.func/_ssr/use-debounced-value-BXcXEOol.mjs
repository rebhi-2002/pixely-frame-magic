import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-debounced-value-BXcXEOol.js
var import_react = /* @__PURE__ */ __toESM(require_react());
/** يؤخّر تحديث القيمة لحد ما يوقف المستخدم عن الكتابة (افتراضي 400ms) —
* يمنع إرسال طلب API بكل ضغطة زر بحقول البحث المرتبطة بالباك اند. */
function useDebouncedValue(value, delayMs = 400) {
	const [debounced, setDebounced] = (0, import_react.useState)(value);
	(0, import_react.useEffect)(() => {
		const timer = setTimeout(() => setDebounced(value), delayMs);
		return () => clearTimeout(timer);
	}, [value, delayMs]);
	return debounced;
}
//#endregion
export { useDebouncedValue as t };
