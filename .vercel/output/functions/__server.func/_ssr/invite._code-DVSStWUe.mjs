import { n as useTranslation } from "../_libs/react-i18next.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { Mt as Check, ut as Gift } from "../_libs/lucide-react.mjs";
import { b as Route$35 } from "./router-B2E04MFx.mjs";
import { t as useSession } from "./use-session-7xGRcQj8.mjs";
import { r as PublicLayout } from "./public-layout-ygP3iwqr.mjs";
import { t as SessionCta } from "./session-cta-B2HMxTdB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/invite._code-DVSStWUe.js
var import_jsx_runtime = require_jsx_runtime();
function InvitePage() {
	const { code } = Route$35.useParams();
	const { t } = useTranslation();
	const { isSignedIn } = useSession();
	const perks = t("invite.perks", { returnObjects: true });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublicLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-2xl px-5 py-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "flex size-12 items-center justify-center rounded-2xl bg-primary/12 text-primary",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gift, { className: "size-6" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-5 text-3xl font-bold text-foreground",
				children: t("invite.h1")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-muted-foreground",
				children: t("invite.sub")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-7 rounded-2xl border border-border bg-card p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: t("invite.codeLabel")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 font-mono text-lg font-bold tracking-widest text-primary",
					children: code
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-7 space-y-3",
				children: perks.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-start gap-2.5 text-sm text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mt-0.5 size-4 shrink-0 text-success" }), p]
				}, p))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-9 flex flex-wrap gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SessionCta, {
					to: "/signup",
					search: { invite: code },
					label: t("invite.cta"),
					className: "glow-primary inline-flex rounded-xl bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
				}), !isSignedIn && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/login",
					className: "inline-flex rounded-xl border border-border bg-card px-7 py-3.5 text-sm font-bold text-foreground transition-colors hover:bg-secondary",
					children: t("invite.login")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-xs text-muted-foreground",
				children: t("invite.disclaimer")
			})
		]
	}) });
}
//#endregion
export { InvitePage as component };
