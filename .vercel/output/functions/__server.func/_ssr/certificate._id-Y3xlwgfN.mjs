import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as useTranslation } from "../_libs/react-i18next.mjs";
import { it as CircleX, m as ShieldQuestionMark, ot as CircleCheck } from "../_libs/lucide-react.mjs";
import { r as PublicLayout } from "./public-layout-BxOOhUSq.mjs";
import { t as Route } from "./certificate._id-ztuHlkyS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/certificate._id-Y3xlwgfN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** رقم صالح شكلياً: ACD-YYYY-NNNNN (سجل الشهادات الحقيقي يأتي مع مرحلة الباك-إند). */
var VALID = /^ACD-\d{4}-\d{5}$/i;
function CertificatePage() {
	const { id } = Route.useParams();
	const { t } = useTranslation();
	const initial = id === "verify" ? "" : id;
	const [code, setCode] = (0, import_react.useState)(initial);
	const [result, setResult] = (0, import_react.useState)(initial ? VALID.test(initial) ? "valid" : "invalid" : null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublicLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-2xl px-5 py-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "flex size-12 items-center justify-center rounded-2xl bg-primary/12 text-primary",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldQuestionMark, { className: "size-6" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-5 text-3xl font-bold text-foreground",
				children: t("certificate.h1")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-muted-foreground",
				children: t("certificate.sub")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-8 flex flex-col gap-3 sm:flex-row",
				onSubmit: (e) => {
					e.preventDefault();
					setResult(VALID.test(code.trim()) ? "valid" : "invalid");
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: code,
					onChange: (e) => setCode(e.target.value),
					placeholder: t("certificate.placeholder"),
					"aria-label": t("certificate.id"),
					className: "h-12 flex-1 rounded-xl border border-border bg-card px-4 font-mono text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					className: "h-12 rounded-xl bg-primary px-6 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90",
					children: t("certificate.check")
				})]
			}),
			result === "valid" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 rounded-2xl border border-success/40 bg-success/10 p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "inline-flex items-center gap-2 font-bold text-success",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-5" }), t("certificate.valid")]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "mt-5 grid gap-3 text-sm sm:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: t("certificate.holder"),
							value: "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: t("certificate.course"),
							value: "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: t("certificate.issued"),
							value: "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: t("certificate.id"),
							value: code.toUpperCase(),
							mono: true
						})
					]
				})]
			}),
			result === "invalid" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-8 inline-flex items-center gap-2 rounded-2xl border border-destructive/40 bg-destructive/10 p-5 text-sm font-semibold text-destructive",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "size-5" }), t("certificate.invalid")]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-8 text-xs text-muted-foreground",
				children: t("certificate.note")
			})
		]
	}) });
}
function Row({ label, value, mono }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
		className: "text-xs text-muted-foreground",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
		className: `font-semibold text-foreground ${mono ? "font-mono" : ""}`,
		children: value
	})] });
}
//#endregion
export { CertificatePage as component };
