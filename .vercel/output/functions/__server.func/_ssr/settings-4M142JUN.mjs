import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as useTranslation } from "../_libs/react-i18next.mjs";
import { S as usePreferences, x as useBi } from "./rbac-static-data-BkN8GGlQ.mjs";
import { h as useAccess } from "./use-access-DsjSFy3L.mjs";
import { n as Guard } from "./guard-BhjB-ZLB.mjs";
import { n as SignOutOverlay, r as useSignOut } from "./use-sign-out-B5CEaTvl.mjs";
import { D as Palette, R as LogOut, h as ShieldCheck, i as UserRound } from "../_libs/lucide-react.mjs";
import { t as PageHeader } from "./page-header-dZRFB7kQ.mjs";
import { n as ROLE_NAME_EN } from "./rbac-types-DB3J6lDj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-4M142JUN.js
var import_jsx_runtime = require_jsx_runtime();
var THEMES = [
	"light",
	"dark",
	"auto"
];
var LOCALES = ["ar", "en"];
function SettingsPage() {
	const { t } = useTranslation();
	const bi = useBi();
	const { access } = useAccess();
	const { signOut, pending: signingOut } = useSignOut("/login");
	const { theme, setTheme, locale, setLocale } = usePreferences();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignOutOverlay, { pending: signingOut }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: t("settings.h1"),
			icon: "Settings"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-3xl px-5 py-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: t("settings.sub")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "shadow-elevation-1 mt-6 rounded-2xl border border-border bg-card p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "inline-flex items-center gap-2 font-bold text-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Palette, { className: "size-4 text-primary" }), t("settings.langThemeTab")]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-semibold text-foreground",
								children: t("settings.theme")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 flex flex-wrap gap-2",
								children: THEMES.map((value) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setTheme(value),
									className: `rounded-lg border px-3.5 py-2 text-xs font-bold transition-colors ${theme === value ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-muted-foreground hover:text-foreground"}`,
									children: t(`common.theme.${value}`)
								}, value))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-semibold text-foreground",
								children: t("settings.language")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 flex flex-wrap gap-2",
								children: LOCALES.map((value) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setLocale(value),
									className: `rounded-lg border px-3.5 py-2 text-xs font-bold transition-colors ${locale === value ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-muted-foreground hover:text-foreground"}`,
									children: t(`common.language.${value}`)
								}, value))
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "shadow-elevation-1 mt-4 rounded-2xl border border-border bg-card p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "inline-flex items-center gap-2 font-bold text-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, { className: "size-4 text-primary" }), t("settings.account")]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-4 grid gap-3 text-sm sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-xs text-muted-foreground",
								children: t("settings.name")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "font-semibold text-foreground",
								children: access?.profile?.full_name ?? "—"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-xs text-muted-foreground",
								children: t("settings.email")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "font-semibold text-foreground",
								children: access?.profile?.email ?? "—"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-xs text-muted-foreground",
								children: t("settings.role")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "font-semibold text-foreground",
								children: access?.profile?.role_name ? bi(access.profile.role_name, ROLE_NAME_EN[access.profile.role_name] ?? access.profile.role_name) : "—"
							})] })
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "shadow-elevation-1 mt-4 rounded-2xl border border-border bg-card p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "inline-flex items-center gap-2 font-bold text-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-4 text-primary" }), t("settings.security")]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-muted-foreground",
							children: t("settings.idleNote")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => void signOut(),
							className: "mt-5 inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-bold text-foreground transition-colors hover:bg-secondary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-4" }), t(signingOut ? "common.signingOut" : "settings.signOut")]
						})
					]
				})
			]
		})
	] });
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Guard, {
	pageKey: "account_settings",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsPage, {})
});
//#endregion
export { SplitComponent as component };
