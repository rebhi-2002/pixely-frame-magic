import { i as __toESM } from "../_runtime.mjs";
import { f as Outlet, g as Link, l as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as useTranslation } from "../_libs/react-i18next.mjs";
import { S as usePreferences, x as useBi } from "./rbac-static-data-BkN8GGlQ.mjs";
import { h as useAccess } from "./use-access-DsjSFy3L.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as DashboardSkeleton } from "./dashboard-skeleton-CXWjwNnl.mjs";
import { n as SignOutOverlay, r as useSignOut, t as BrandLockup } from "./use-sign-out-B5CEaTvl.mjs";
import { t as PageTransition } from "./page-transition-Cc_Uhhl7.mjs";
import { E as PanelRightClose, G as House, P as Menu, R as LogOut, T as PanelRightOpen, U as Languages, ct as ChevronLeft, d as Sun, g as Settings, k as Moon, lt as ChevronDown, n as X, y as Search } from "../_libs/lucide-react.mjs";
import { n as DynamicIcon, t as Button } from "./button-CMeJY5ZQ.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { n as ROLE_NAME_EN } from "./rbac-types-DB3J6lDj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/route-DHw7m8sY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function collectPaths(pages) {
	return pages.flatMap((p) => [...p.path ? [p.path] : [], ...collectPaths(p.children)]);
}
/** كل الصفحات القابلة للفتح داخل قسم — تُستخدم لعرض الأيقونات في الحالة المطويّة. */
function collectLeaves(pages) {
	return pages.flatMap((p) => p.path ? [p, ...collectLeaves(p.children)] : collectLeaves(p.children));
}
function AppSidebar({ access, collapsed, onToggle, onClose, onNavigate }) {
	const { t } = useTranslation();
	const bi = useBi();
	const { resolvedTheme, toggleTheme, locale, toggleLocale } = usePreferences();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const { signOut, pending: signingOut } = useSignOut("/");
	const [search, setSearch] = (0, import_react.useState)("");
	const [flyout, setFlyout] = (0, import_react.useState)(null);
	/** اسم القسم/الصفحة بلغة الواجهة الحالية. */
	const label = (item) => locale === "en" ? item.nameEn || item.name : item.name;
	const activeModuleKeys = (0, import_react.useMemo)(() => access.modules.filter((m) => collectPaths(m.pages).some((p) => pathname.startsWith(p))).map((m) => m.key), [access.modules, pathname]);
	const [openModules, setOpenModules] = (0, import_react.useState)(activeModuleKeys);
	const [openGroups, setOpenGroups] = (0, import_react.useState)([]);
	const [closedModules, setClosedModules] = (0, import_react.useState)([]);
	const effectiveOpenModules = Array.from(/* @__PURE__ */ new Set([...openModules, ...activeModuleKeys])).filter((k) => !closedModules.includes(k));
	const toggleModule = (key) => {
		if (effectiveOpenModules.includes(key)) {
			setClosedModules((prev) => [...prev, key]);
			setOpenModules((prev) => prev.filter((k) => k !== key));
		} else {
			setClosedModules((prev) => prev.filter((k) => k !== key));
			setOpenModules((prev) => [...prev, key]);
		}
	};
	const searchResults = (0, import_react.useMemo)(() => {
		const term = search.trim().toLowerCase();
		if (!term) return [];
		const out = [];
		const walk = (m, pages) => {
			for (const p of pages) {
				const name = label(p);
				if (p.path && (p.name.toLowerCase().includes(term) || p.nameEn.toLowerCase().includes(term))) out.push({
					name,
					path: p.path,
					module: label(m)
				});
				walk(m, p.children);
			}
		};
		access.modules.forEach((m) => walk(m, m.pages));
		return out.slice(0, 8);
	}, [
		search,
		access.modules,
		locale
	]);
	const isActive = (path) => Boolean(path && pathname === path);
	const accountItem = (extra) => cn("flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-[13px] font-medium text-sidebar-foreground/85 transition-all duration-200 hover:bg-sidebar-accent hover:text-sidebar-foreground", collapsed && "justify-center px-0", extra);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: cn("shadow-elevation-2 flex h-full shrink-0 flex-col bg-sidebar text-sidebar-foreground transition-[width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]", collapsed ? "w-[76px]" : "w-72"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignOutOverlay, { pending: signingOut }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-2 px-3 py-4",
				children: [
					!collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandLockup, {}),
					onClose && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						onClick: onClose,
						"aria-label": t("common.closeMenu"),
						className: "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground md:hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						onClick: onToggle,
						"aria-label": collapsed ? t("common.expandMenu") : t("common.collapseMenu"),
						className: "hidden text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground md:inline-flex",
						children: collapsed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelRightOpen, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelRightClose, { className: "size-5" })
					})
				]
			}),
			!collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-3 pb-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-sidebar-foreground/50" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: search,
						onChange: (e) => setSearch(e.target.value),
						placeholder: t("common.searchPages"),
						className: "h-9 border-sidebar-border bg-sidebar-accent ps-9 text-sidebar-foreground placeholder:text-sidebar-foreground/50"
					})]
				}), searchResults.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "panel-swap mt-2 space-y-1 rounded-lg bg-sidebar-accent p-1",
					children: searchResults.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: r.path,
						onClick: () => setSearch(""),
						className: "block rounded-md px-2 py-1.5 text-xs hover:bg-sidebar-primary/20",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium",
							children: r.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "ms-1 text-sidebar-foreground/50",
							children: ["— ", r.module]
						})]
					}) }, r.path))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "flex-1 overflow-y-auto px-2 pb-4",
				children: [
					!collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "px-3 pb-1.5 text-[11px] font-bold tracking-wide text-sidebar-foreground/45",
						children: t("common.navigation")
					}),
					access.modules.map((m) => {
						const open = effectiveOpenModules.includes(m.key);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative mb-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => collapsed ? setFlyout(flyout === m.key ? null : m.key) : toggleModule(m.key),
									title: collapsed ? label(m) : void 0,
									className: cn("flex w-full items-center gap-2.5 rounded-xl border-s-2 border-transparent px-3 py-2.5 text-sm font-semibold transition-all duration-200", "hover:bg-sidebar-accent", open && !collapsed && "border-sidebar-primary bg-sidebar-accent", collapsed && "justify-center px-0"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DynamicIcon, {
										name: m.icon,
										className: "size-[18px] shrink-0"
									}), !collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex-1 text-start",
										children: label(m)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: cn("size-4 transition-transform duration-200", !open && "-rotate-90 rtl:rotate-90") })] })]
								}),
								collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "mt-0.5 mb-1 space-y-0.5",
									children: collectLeaves(m.pages).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: p.path,
										onClick: onNavigate,
										title: label(p),
										"aria-label": label(p),
										className: cn("flex items-center justify-center rounded-lg py-2 transition-colors", isActive(p.path) ? "bg-sidebar-primary/15 text-sidebar-primary" : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DynamicIcon, {
											name: p.icon,
											className: "size-4 shrink-0"
										})
									}) }, p.key))
								}),
								collapsed && flyout === m.key && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "panel-swap absolute top-0 z-50 w-56 rounded-xl border border-sidebar-border bg-sidebar p-2 shadow-xl ltr:left-full ltr:ml-2 rtl:right-full rtl:mr-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "px-2 py-1 text-xs font-bold text-sidebar-foreground/60",
										children: label(m)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageList, {
										pages: m.pages,
										isActive,
										label,
										openGroups,
										setOpenGroups,
										onNavigate: () => {
											setFlyout(null);
											onNavigate?.();
										}
									})]
								}),
								!collapsed && open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "panel-swap mt-1",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageList, {
										pages: m.pages,
										isActive,
										label,
										openGroups,
										setOpenGroups,
										onNavigate
									})
								})
							]
						}, m.key);
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 border-t border-sidebar-border pt-3",
						children: [
							!collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-2 px-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] font-bold tracking-wide text-sidebar-foreground/45",
										children: t("common.account")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1.5 truncate text-sm font-semibold",
										children: access.profile?.full_name ?? bi("مستخدم", "User")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate text-xs text-sidebar-foreground/60",
										children: access.profile?.role_name ? bi(access.profile.role_name, ROLE_NAME_EN[access.profile.role_name] ?? access.profile.role_name) : bi("بدون نوع", "No role")
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/",
								onClick: onNavigate,
								title: t("common.backToSite"),
								className: accountItem(),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, { className: "size-4 shrink-0" }), !collapsed && t("common.backToSite")]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/settings",
								onClick: onNavigate,
								title: t("common.settings"),
								className: accountItem(pathname === "/settings" ? "bg-sidebar-primary/12 font-bold text-sidebar-primary" : void 0),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "size-4 shrink-0" }), !collapsed && t("common.settings")]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: toggleTheme,
								title: t("common.themeToggle"),
								className: accountItem(),
								children: [resolvedTheme === "dark" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "size-4 shrink-0" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "size-4 shrink-0" }), !collapsed && t(resolvedTheme === "dark" ? "common.theme.light" : "common.theme.dark")]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: toggleLocale,
								title: t("common.languageToggle"),
								className: accountItem(),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Languages, { className: "size-4 shrink-0" }), !collapsed && t(locale === "ar" ? "common.language.en" : "common.language.ar")]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => void signOut(),
								title: t("common.signOut"),
								className: accountItem("text-destructive hover:bg-destructive/10 hover:text-destructive"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-4 shrink-0" }), !collapsed && t(signingOut ? "common.signingOut" : "common.signOut")]
							})
						]
					})
				]
			})
		]
	});
}
function PageList({ pages, isActive, label, openGroups, setOpenGroups, onNavigate, depth = 0 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: cn("space-y-0.5", depth > 0 && "ms-3 border-s border-sidebar-border ps-2"),
		children: pages.map((p) => {
			if (p.children.length > 0) {
				const open = openGroups.includes(p.key) || p.children.some((c) => isActive(c.path));
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setOpenGroups((prev) => prev.includes(p.key) ? prev.filter((k) => k !== p.key) : [...prev, p.key]),
					className: "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-[13px] transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DynamicIcon, {
							name: p.icon,
							className: "size-4 shrink-0"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex-1 text-start",
							children: label(p)
						}),
						open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-3.5 rtl:rotate-0 ltr:rotate-180" })
					]
				}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "animate-in slide-in-from-top-1 fade-in mt-0.5 duration-200",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageList, {
						pages: p.children,
						isActive,
						label,
						openGroups,
						setOpenGroups,
						onNavigate,
						depth: depth + 1
					})
				})] }, p.key);
			}
			if (!p.path) return null;
			const active = isActive(p.path);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: p.path,
				onClick: onNavigate,
				className: cn("flex items-center gap-2 rounded-xl border-s-2 px-3 py-2 text-[13px] transition-all duration-200", active ? "border-sidebar-primary bg-sidebar-primary/12 font-bold text-sidebar-primary" : "border-transparent text-sidebar-foreground/85 hover:bg-sidebar-accent hover:text-sidebar-foreground"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DynamicIcon, {
					name: p.icon,
					className: "size-4 shrink-0"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label(p) })]
			}) }, p.key);
		})
	});
}
function AuthenticatedLayout() {
	const [collapsed, setCollapsed] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setCollapsed(localStorage.getItem("academia.sidebar") === "collapsed");
	}, []);
	(0, import_react.useEffect)(() => {
		localStorage.setItem("academia.sidebar", collapsed ? "collapsed" : "expanded");
	}, [collapsed]);
	const [mobileOpen, setMobileOpen] = (0, import_react.useState)(false);
	const { access, isLoading, error } = useAccess();
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardSkeleton, {});
	if (error || !access) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4 text-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "تعذّر تحميل صلاحياتك. حاول تحديث الصفحة أو تسجيل الدخول مجدداً."
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen w-full bg-background",
		children: [
			mobileOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				"aria-label": "إغلاق القائمة",
				className: "fixed inset-0 z-40 bg-background/70 backdrop-blur-sm md:hidden",
				onClick: () => setMobileOpen(false)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `fixed inset-y-0 start-0 z-50 flex transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] md:sticky md:top-0 md:z-auto md:h-screen md:translate-x-0 ${mobileOpen ? "translate-x-0" : "max-md:ltr:-translate-x-full max-md:rtl:translate-x-full"}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppSidebar, {
					access,
					collapsed: mobileOpen ? false : collapsed,
					onToggle: () => setCollapsed((c) => !c),
					onClose: () => setMobileOpen(false),
					onNavigate: () => setMobileOpen(false)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "shadow-elevation-1 sticky top-0 z-30 flex h-12 items-center border-b border-border bg-background/90 px-3 backdrop-blur md:hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						onClick: () => setMobileOpen(true),
						"aria-label": "فتح القائمة",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ms-2 font-display text-sm font-bold text-foreground",
						children: "Academia"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageTransition, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) })]
			})
		]
	});
}
//#endregion
export { AuthenticatedLayout as component };
