import { i as __toESM } from "../_runtime.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as useTranslation } from "../_libs/react-i18next.mjs";
import { S as usePreferences, l as allowedPublicPaths } from "./rbac-static-data-BkN8GGlQ.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as useSession } from "./use-session-B52gGt5m.mjs";
import { n as SignOutOverlay, r as useSignOut, t as BrandLockup } from "./use-sign-out-B5CEaTvl.mjs";
import { t as PageTransition } from "./page-transition-Cc_Uhhl7.mjs";
import { H as LayoutDashboard, R as LogOut, U as Languages, d as Sun, g as Settings, k as Moon, lt as ChevronDown } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/public-layout-BxOOhUSq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var buttonClass = "inline-flex size-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:text-foreground";
function ThemeToggle() {
	const { t } = useTranslation();
	const { resolvedTheme, toggleTheme } = usePreferences();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick: toggleTheme,
		"aria-label": t("common.themeToggle"),
		title: t(resolvedTheme === "dark" ? "common.theme.light" : "common.theme.dark"),
		className: buttonClass,
		children: resolvedTheme === "dark" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "size-4" })
	});
}
function LanguageToggle() {
	const { t } = useTranslation();
	const { locale, toggleLocale } = usePreferences();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: toggleLocale,
		"aria-label": t("common.languageToggle"),
		title: t(locale === "ar" ? "common.language.en" : "common.language.ar"),
		className: `${buttonClass} w-auto gap-1.5 px-2.5 text-xs font-bold`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Languages, { className: "size-4" }), locale === "ar" ? "EN" : "ع"]
	});
}
function PreferenceToggles({ className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `flex items-center gap-2 ${className}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LanguageToggle, {})]
	});
}
var item = "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-semibold text-foreground/80 transition-all duration-200 hover:translate-x-0 hover:bg-secondary hover:text-foreground rtl:hover:-translate-x-0.5 ltr:hover:translate-x-0.5";
/** قائمة المستخدم بعد تسجيل الدخول — لوحة التحكم، الثيم، اللغة، الإعدادات، الخروج. */
function UserMenu({ session }) {
	const { t } = useTranslation();
	const [open, setOpen] = (0, import_react.useState)(false);
	const ref = (0, import_react.useRef)(null);
	const { signOut, pending: signingOut } = useSignOut("/");
	const { resolvedTheme, toggleTheme, locale, toggleLocale } = usePreferences();
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const onClick = (e) => {
			if (!ref.current?.contains(e.target)) setOpen(false);
		};
		document.addEventListener("mousedown", onClick);
		return () => document.removeEventListener("mousedown", onClick);
	}, [open]);
	const initial = session.fullName.trim().charAt(0) || "A";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref,
		className: "relative",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignOutOverlay, { pending: signingOut }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => setOpen((v) => !v),
				"aria-expanded": open,
				"aria-label": session.fullName,
				className: "flex items-center gap-2 rounded-xl border border-border bg-card px-2 py-1.5 text-sm font-bold text-foreground transition-all duration-200 hover:border-primary/50 hover:shadow-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid size-7 place-items-center rounded-lg bg-primary/15 text-xs font-black text-primary",
						children: initial
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hidden max-w-24 truncate sm:inline",
						children: session.fullName
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: `size-4 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}` })
				]
			}),
			open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "animate-in fade-in slide-in-from-top-1 absolute end-0 top-full z-50 mt-2 w-60 rounded-2xl border border-border bg-popover p-2 shadow-xl duration-200",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-b border-border px-3 pb-2.5 pt-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-sm font-bold text-foreground",
							children: session.fullName
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-xs text-muted-foreground",
							children: session.roleName ?? session.email
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-1.5 space-y-0.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: session.home,
								onClick: () => setOpen(false),
								className: item,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutDashboard, { className: "size-4 text-primary" }), t("common.dashboard")]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/settings",
								onClick: () => setOpen(false),
								className: item,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "size-4" }), t("common.settings")]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: toggleTheme,
								className: item,
								children: [resolvedTheme === "dark" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "size-4" }), t(resolvedTheme === "dark" ? "common.theme.light" : "common.theme.dark")]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: toggleLocale,
								className: item,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Languages, { className: "size-4" }), t(locale === "ar" ? "common.language.en" : "common.language.ar")]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1.5 border-t border-border pt-1.5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => void signOut(),
							className: `${item} text-destructive hover:bg-destructive/10 hover:text-destructive`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-4" }), t(signingOut ? "common.signingOut" : "common.signOut")]
						})
					})
				]
			})
		]
	});
}
/** useScrolled — true بمجرد ما يتجاوز المستخدم عتبة السكرول المحددة (افتراضياً 24px). */
function useScrolled(threshold = 24) {
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const onScroll = () => setScrolled(window.scrollY > threshold);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	return scrolled;
}
var navItems = [
	{
		to: "/",
		key: "nav.home"
	},
	{
		to: "/courses",
		key: "nav.courses"
	},
	{
		to: "/how-it-works",
		key: "nav.howItWorks"
	},
	{
		to: "/pricing",
		key: "nav.pricing"
	},
	{
		to: "/for-teachers",
		key: "nav.forTeachers"
	}
];
var footerPlatform = [
	{
		to: "/courses",
		key: "nav.courses"
	},
	{
		to: "/how-it-works",
		key: "nav.howItWorks"
	},
	{
		to: "/pricing",
		key: "nav.pricing"
	},
	{
		to: "/for-teachers",
		key: "nav.forTeachers"
	},
	{
		to: "/blog",
		key: "nav.blog"
	},
	{
		to: "/about",
		key: "nav.about"
	}
];
var footerLegal = [
	{
		to: "/help",
		key: "nav.help"
	},
	{
		to: "/contact",
		key: "nav.contact"
	},
	{
		to: "/privacy",
		key: "nav.privacy"
	},
	{
		to: "/terms",
		key: "nav.terms"
	},
	{
		to: "/unsubscribe",
		key: "nav.unsubscribe"
	}
];
function BrandMark({ className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/",
		className: `flex items-center gap-2 ${className}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandLockup, {})
	});
}
function PublicLayout({ children }) {
	const { t } = useTranslation();
	const { session, isSignedIn } = useSession();
	const scrolled = useScrolled();
	const allowed = allowedPublicPaths(session?.roleKey ?? null);
	const visible = (items) => allowed ? items.filter((i) => allowed.includes(i.to)) : items;
	const nav = visible(navItems);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen flex-col bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#main",
				className: "sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-primary-foreground",
				children: t("common.skipToContent")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: cn("sticky top-0 z-40 border-b transition-all duration-300", scrolled ? "shadow-elevation-2 border-border bg-background/85 backdrop-blur" : "border-transparent bg-transparent"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandMark, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "hidden items-center gap-1 lg:flex",
							children: nav.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: item.to,
								activeOptions: { exact: item.to === "/" },
								activeProps: { className: "bg-secondary text-foreground" },
								className: "nav-underline rounded-lg px-3 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground",
								children: t(item.key)
							}, item.to))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center gap-2",
							children: isSignedIn && session ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: session.home,
								className: "hover-press hidden items-center gap-2 rounded-xl bg-primary px-3 py-2 text-sm font-bold whitespace-nowrap text-primary-foreground sm:inline-flex",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutDashboard, { className: "size-4" }), t("common.dashboard")]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserMenu, { session })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreferenceToggles, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/login",
									className: "hidden rounded-lg px-3 py-2 text-sm font-semibold whitespace-nowrap text-muted-foreground hover:text-foreground sm:inline-flex",
									children: t("common.signIn")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/signup",
									className: "hover-press rounded-xl bg-primary px-3 py-2 text-sm font-bold whitespace-nowrap text-primary-foreground sm:px-4",
									children: t("common.startFree")
								})
							] })
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: cn("border-t px-3 py-2 backdrop-blur transition-colors duration-300 lg:hidden", scrolled ? "border-border bg-background/85" : "border-transparent bg-background/60"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "segmented-nav",
						children: [nav.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: item.to,
							activeOptions: { exact: item.to === "/" },
							activeProps: { className: "bg-background text-foreground shadow-sm" },
							className: "rounded-[10px] px-3 py-1.5 text-xs font-bold whitespace-nowrap text-muted-foreground transition-all duration-200",
							children: t(item.key)
						}, item.to)), isSignedIn && session && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: session.home,
							className: "rounded-[10px] bg-primary px-3 py-1.5 text-xs font-bold whitespace-nowrap text-primary-foreground",
							children: t("common.dashboard")
						})]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				id: "main",
				className: "flex-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageTransition, { children })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "border-t border-border bg-card/40",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 md:flex-row md:items-start md:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-sm space-y-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandMark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: t("nav.tagline")
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-8 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-bold text-foreground",
								children: t("nav.platform")
							}), visible(footerPlatform).map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: i.to,
								className: "block text-muted-foreground transition-transform duration-200 hover:text-primary rtl:hover:-translate-x-1 ltr:hover:translate-x-1",
								children: t(i.key)
							}, i.to))]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-bold text-foreground",
								children: t("nav.legal")
							}), footerLegal.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: i.to,
								className: "block text-muted-foreground hover:text-primary rtl:hover:-translate-x-1 ltr:hover:translate-x-1",
								children: t(i.key)
							}, i.to))]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-t border-border py-4 text-center text-xs text-muted-foreground",
					children: t("nav.rights", { year: (/* @__PURE__ */ new Date()).getFullYear() })
				})]
			})
		]
	});
}
//#endregion
export { PreferenceToggles as n, PublicLayout as r, BrandMark as t };
