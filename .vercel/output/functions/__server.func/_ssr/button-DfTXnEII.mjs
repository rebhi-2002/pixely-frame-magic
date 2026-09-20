import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { d as Slot, v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { tt as LoaderCircle } from "../_libs/lucide-react.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/button-DfTXnEII.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-bold cursor-pointer transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "btn-shine bg-primary text-primary-foreground shadow-elevation-2 hover:-translate-y-0.5 hover:shadow-elevation-3",
			destructive: "bg-destructive text-destructive-foreground shadow-elevation-1 hover:bg-destructive/90 hover:-translate-y-0.5",
			outline: "border border-border bg-card/60 shadow-elevation-1 hover:bg-secondary hover:border-primary/40",
			secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/70",
			soft: "bg-primary/12 text-primary hover:bg-primary/18",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline font-semibold"
		},
		size: {
			default: "h-10 px-5 py-2",
			sm: "h-8 rounded-lg px-3.5 text-xs",
			lg: "h-12 px-7 text-[0.95rem]",
			xl: "h-14 px-8 text-base rounded-2xl",
			icon: "h-10 w-10 shrink-0"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, loading = false, disabled, children, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		"aria-busy": loading || void 0,
		disabled: disabled || loading,
		...props,
		children: asChild ? children : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
			"aria-hidden": "true",
			className: "size-4 animate-spin"
		}), children] })
	});
});
Button.displayName = "Button";
//#endregion
export { buttonVariants as n, Button as t };
