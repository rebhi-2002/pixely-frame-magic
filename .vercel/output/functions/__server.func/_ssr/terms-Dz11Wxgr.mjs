import { n as useTranslation } from "../_libs/react-i18next.mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { r as PublicLayout } from "./public-layout-CtH4MgCV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/terms-Dz11Wxgr.js
var import_jsx_runtime = require_jsx_runtime();
function LegalPage() {
	const { t } = useTranslation();
	const sections = t("terms.sections", { returnObjects: true });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublicLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-3xl px-5 py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-4xl font-bold text-foreground",
				children: t("terms.h1")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-muted-foreground",
				children: t("terms.intro")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 space-y-5",
				children: sections.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-2xl border border-border bg-card p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-bold text-foreground",
						children: s.t
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm leading-relaxed text-muted-foreground",
						children: s.d
					})]
				}, s.t))
			})
		]
	}) });
}
//#endregion
export { LegalPage as component };
