import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { mt as ChevronLeft } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-Nx-_C_c8.mjs";
import { t as DynamicIcon } from "./dynamic-icon-Cf94UsPA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/page-header-B-hD-LLI.js
var import_jsx_runtime = require_jsx_runtime();
function PageHeader({ title, icon, actions, onBack }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "shadow-elevation-1 static z-20 flex items-center justify-between gap-4 border-b border-border bg-card/95 px-5 py-4 backdrop-blur md:sticky md:top-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3",
			children: [
				onBack && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "outline",
					size: "icon",
					onClick: onBack,
					"aria-label": "رجوع",
					className: "text-muted-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4 rotate-180" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DynamicIcon, {
						name: icon,
						className: "size-5"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-lg font-bold text-foreground",
					children: title
				})
			]
		}), actions]
	});
}
function Toolbar({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-wrap items-center gap-2 border-b border-border bg-muted/40 px-5 py-3",
		children
	});
}
//#endregion
export { Toolbar as n, PageHeader as t };
