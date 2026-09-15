import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { A as RefreshCw, Ct as CircleAlert, X as LoaderCircle } from "../_libs/lucide-react.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as Button } from "./button-Nx-_C_c8.mjs";
import "./dynamic-icon-Cf94UsPA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/feedback-states-DOqHvyO5.js
var import_jsx_runtime = require_jsx_runtime();
function LoadingState({ label = "جارٍ التحميل…", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		role: "status",
		"aria-live": "polite",
		className: cn("flex min-h-40 flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-card/60 p-6 text-center", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
			"aria-hidden": "true",
			className: "size-6 animate-spin text-primary"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-sm text-muted-foreground",
			children: label
		})]
	});
}
function ErrorState({ title = "تعذّر تحميل المحتوى", description = "حدثت مشكلة مؤقتة. حاول مرة أخرى.", action, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		role: "alert",
		className: cn("flex min-h-40 flex-col items-center justify-center gap-2 rounded-2xl border border-destructive/30 bg-destructive/5 p-6 text-center", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "flex size-11 items-center justify-center rounded-full bg-destructive/12 text-destructive",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
					"aria-hidden": "true",
					className: "size-5"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-sm font-bold text-foreground",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm text-muted-foreground",
				children: description
			}),
			action
		]
	});
}
function RetryButton({ label = "حاول مرة أخرى", onClick, loading = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
		type: "button",
		variant: "outline",
		size: "sm",
		onClick,
		loading,
		children: [!loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
			"aria-hidden": "true",
			className: "size-4"
		}), label]
	});
}
//#endregion
export { LoadingState as n, RetryButton as r, ErrorState as t };
