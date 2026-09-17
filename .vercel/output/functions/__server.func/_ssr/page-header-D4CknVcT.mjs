import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { At as ChevronLeft } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-DfTXnEII.mjs";
import { t as DynamicIcon } from "./dynamic-icon-Cf94UsPA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/page-header-D4CknVcT.js
var import_jsx_runtime = require_jsx_runtime();
function PageHeader({ title, icon, actions, onBack }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "shadow-elevation-1 sticky top-0 z-20 flex min-h-16 flex-wrap items-center justify-between gap-3 border-b border-border bg-background/90 px-4 py-3 backdrop-blur sm:px-6 lg:px-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-w-0 items-center gap-3",
			children: [
				onBack && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "outline",
					size: "icon",
					onClick: onBack,
					"aria-label": "رجوع",
					className: "shrink-0 text-muted-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4 rotate-180" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-primary ring-1 ring-primary/10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DynamicIcon, {
						name: icon,
						className: "size-5"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "truncate text-base font-bold text-foreground sm:text-lg",
					children: title
				})
			]
		}), actions && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex shrink-0 flex-wrap items-center gap-2",
			children: actions
		})]
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
