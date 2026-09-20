import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as useTranslation } from "../_libs/react-i18next.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { X as MailX } from "../_libs/lucide-react.mjs";
import { r as PublicLayout } from "./public-layout-ydtoxV0W.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/unsubscribe-Q6i90YUL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var OPTION_KEYS = [
	"weekly",
	"reminders",
	"community",
	"marketing"
];
function UnsubscribePage() {
	const { t } = useTranslation();
	const [email, setEmail] = (0, import_react.useState)("");
	const [off, setOff] = (0, import_react.useState)([]);
	const [done, setDone] = (0, import_react.useState)(false);
	const allOff = off.length === OPTION_KEYS.length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublicLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-xl px-5 py-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "flex size-12 items-center justify-center rounded-2xl bg-primary/12 text-primary",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MailX, { className: "size-6" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-5 text-3xl font-bold text-foreground",
				children: t("unsubscribe.h1")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-muted-foreground",
				children: t("unsubscribe.sub")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-8 space-y-5",
				onSubmit: (e) => {
					e.preventDefault();
					setDone(true);
					toast.success(t("unsubscribe.done"));
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						htmlFor: "email",
						className: "mb-2.5 block text-sm font-semibold text-foreground",
						children: t("unsubscribe.email")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: "email",
						type: "email",
						required: true,
						value: email,
						onChange: (e) => setEmail(e.target.value),
						className: "h-12 w-full rounded-xl border border-border bg-card px-4 text-sm text-foreground outline-none focus:border-primary"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2 rounded-2xl border border-border bg-card p-5",
						children: [OPTION_KEYS.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center gap-3 text-sm text-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: off.includes(k),
								onChange: (e) => setOff((prev) => e.target.checked ? [...prev, k] : prev.filter((p) => p !== k)),
								className: "size-4 accent-[var(--color-primary)]"
							}), t(`unsubscribe.options.${k}`)]
						}, k)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "mt-3 flex items-center gap-3 border-t border-border pt-3 text-sm font-bold text-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: allOff,
								onChange: (e) => setOff(e.target.checked ? [...OPTION_KEYS] : []),
								className: "size-4 accent-[var(--color-primary)]"
							}), t("unsubscribe.all")]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						className: "w-full rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90",
						children: t("unsubscribe.submit")
					})
				]
			}),
			done && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-5 rounded-xl border border-success/40 bg-success/10 p-4 text-sm font-semibold text-success",
				children: t("unsubscribe.done")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-xs text-muted-foreground",
				children: t("unsubscribe.note")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "mt-4 inline-flex text-sm font-bold text-primary hover:underline",
				children: t("unsubscribe.back")
			})
		]
	}) });
}
//#endregion
export { UnsubscribePage as component };
