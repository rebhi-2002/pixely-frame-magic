import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as useTranslation } from "../_libs/react-i18next.mjs";
import { M as redirect, _ as Link, c as HeadContent, f as createRouter, g as createRootRouteWithContext, h as createFileRoute, l as useLocation, m as lazyRouteComponent, p as Outlet, s as Scripts, u as useRouterState, v as useNavigate, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { O as usePreferences, _ as isAuthenticated, h as getStoredUserId, k as verifyServerSession, o as PreferencesProvider, t as AUTH_EVENT, w as preferencesBootScript, x as logout } from "./rbac-static-data-C-KJ3jWh.mjs";
import { r as NotFoundIllustration } from "./illustrations-DxG8Himc.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { i as useQueryClient, r as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { nt as Cookie } from "../_libs/lucide-react.mjs";
import { t as description$2 } from "./achievements-CWbVt_3f.mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { i as localeFromSearch, n as createSeoHead, r as getSeoForPath, t as applySeo } from "./seo-DnbZCAZc.mjs";
import { t as Route$65 } from "./blog._slug-KC-knHSQ.mjs";
import { t as description$3 } from "./bookmarks-D-HEc_mY.mjs";
import { t as Route$66 } from "./certificate._id-CXDyhiT9.mjs";
import { t as description$4 } from "./community-DLwPdIiR.mjs";
import { t as description$5 } from "./dashboard-DZWQFTWS.mjs";
import { t as description$6 } from "./exam-simulator-fRp_d5O1.mjs";
import { t as description$7 } from "./flashcards-DBt5JrgN.mjs";
import { t as Route$67 } from "./invite._code-Bsw2JB0h.mjs";
import { t as description$8 } from "./library-CKzaZr2h.mjs";
import { t as description$9 } from "./mistakes-bank-qmjwZTFB.mjs";
import { t as description$10 } from "./my-certificates-CAyS_YaR.mjs";
import { t as description$11 } from "./my-courses-D0hEDqco.mjs";
import { t as description$12 } from "./parent.report-SJo4rcZh.mjs";
import { t as description$13 } from "./parent.settings-CuHfWj6b.mjs";
import { t as description$14 } from "./referrals-DDBMjcXA.mjs";
import { t as Route$68 } from "./role-permissions._roleId-DQj-BsyW.mjs";
import { n as currentUserHome, t as Route$69 } from "./verify-email-B66dE7nj.mjs";
import { t as description$15 } from "./schedule-0qVQ4kum.mjs";
import { t as Route$70 } from "./teacher._id-DlJn1AfD.mjs";
import { t as description$16 } from "./supervisor.dashboard-DA421hDX.mjs";
import { t as description$17 } from "./supervisor.reports-CWRVNqJW.mjs";
import { t as description$18 } from "./supervisor.students-overview-tB-QHbAu.mjs";
import { t as description$19 } from "./supervisor.teachers-Ci0FOV1P.mjs";
import { t as description$20 } from "./teacher.analytics-BgWupfQb.mjs";
import { t as description$21 } from "./teacher.community-BgATfIF8.mjs";
import { t as description$22 } from "./teacher.content-C-Ts0nE5.mjs";
import { t as description$23 } from "./teacher.courses-DX1rkZ9s.mjs";
import { t as description$24 } from "./teacher.dashboard-LJcUv6cG.mjs";
import { t as description$25 } from "./teacher.earnings-iaB_PpB3.mjs";
import { t as description$26 } from "./teacher.grading-sXk1M8T3.mjs";
import { t as description$27 } from "./teacher.quizzes-B4Kz1-XZ.mjs";
import { t as description$28 } from "./teacher.settings-D8bydaMM.mjs";
import { t as description$29 } from "./teacher.profile.edit-Bvtjnege.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-Ibn77Wn2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
var styles_default = "/assets/styles-DMMYgyoS.css";
var LAST_ACTIVITY_KEY = "acadimia.lastActivity";
var ACTIVITY_EVENTS = [
	"pointerdown",
	"keydown",
	"scroll",
	"touchstart",
	"visibilitychange"
];
/**
* الجلسة نفسها محفوظة (persistSession) فتبقى بعد الريلود أو إغلاق المتصفح،
* لكن الخمول أكثر من ساعتين ينهيها فوراً عند العودة أو أثناء الجلسة.
*/
function useIdleLogout() {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const signingOut = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined") return;
		const touch = () => {
			if (document.visibilityState === "hidden") return;
			localStorage.setItem(LAST_ACTIVITY_KEY, String(Date.now()));
		};
		const expire = async () => {
			if (signingOut.current) return;
			signingOut.current = true;
			if (!isAuthenticated()) {
				signingOut.current = false;
				return;
			}
			localStorage.removeItem(LAST_ACTIVITY_KEY);
			await logout();
			toast.warning(t("session.expired"));
			navigate({
				to: "/login",
				replace: true
			});
			signingOut.current = false;
		};
		const check = () => {
			const raw = Number(localStorage.getItem("acadimia.lastActivity") ?? 0);
			if (!raw) {
				touch();
				return;
			}
			if (Date.now() - raw > 72e5) expire();
		};
		check();
		touch();
		ACTIVITY_EVENTS.forEach((e) => window.addEventListener(e, touch, { passive: true }));
		const timer = window.setInterval(check, 6e4);
		return () => {
			ACTIVITY_EVENTS.forEach((e) => window.removeEventListener(e, touch));
			window.clearInterval(timer);
		};
	}, [navigate, t]);
	(0, import_react.useEffect)(() => {
		if (typeof window !== "undefined") localStorage.setItem(LAST_ACTIVITY_KEY, String(Date.now()));
	}, [pathname]);
}
function IdleLogoutWatcher() {
	useIdleLogout();
	return null;
}
var CONSENT_KEY = "acadimia.cookieConsent";
/** بانر الموافقة — يظهر أول زيارة فقط، ولا يُشغَّل أي تتبّع تحليلي قبل الموافقة. */
function CookieConsent() {
	const { t } = useTranslation();
	const [visible, setVisible] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!localStorage.getItem(CONSENT_KEY)) setVisible(true);
	}, []);
	const decide = (value) => {
		localStorage.setItem(CONSENT_KEY, value);
		window.dispatchEvent(new CustomEvent("acadimia:cookie-consent", { detail: value }));
		setVisible(false);
	};
	if (!visible) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "dialog",
		"aria-label": t("cookie.title"),
		className: "fixed inset-x-3 bottom-[calc(0.75rem+env(safe-area-inset-bottom))] z-[60] mx-auto max-h-[calc(100dvh-1.5rem)] max-w-3xl overflow-y-auto rounded-2xl border border-border bg-card/95 p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] shadow-lg backdrop-blur md:inset-x-6 md:bottom-6 md:pb-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-3 md:flex-row md:items-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-primary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cookie, { className: "size-4" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-bold text-foreground",
						children: t("cookie.title")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-xs leading-relaxed text-muted-foreground",
						children: [
							t("cookie.text"),
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/privacy",
								className: "font-semibold text-primary hover:underline",
								children: t("cookie.more")
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex shrink-0 gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => decide("declined"),
						className: "rounded-xl border border-border px-3 py-2 text-xs font-bold text-muted-foreground transition-colors hover:text-foreground",
						children: t("cookie.decline")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => decide("accepted"),
						className: "rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground transition-opacity hover:opacity-90",
						children: t("cookie.accept")
					})]
				})
			]
		})
	});
}
/** Keeps the document head aligned with the current route and selected locale. */
function SeoManager() {
	const location = useLocation();
	const { locale } = usePreferences();
	(0, import_react.useEffect)(() => {
		applySeo(getSeoForPath(location.pathname, locale));
	}, [location.pathname, locale]);
	return null;
}
function NotFoundComponent() {
	const { t } = useTranslation();
	const [home, setHome] = (0, import_react.useState)("/");
	(0, import_react.useEffect)(() => {
		currentUserHome().then((next) => setHome(next ?? "/"));
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "surface-mesh flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "shadow-elevation-2 max-w-md rounded-3xl border border-border bg-card p-8 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotFoundIllustration, { className: "mx-auto h-32 w-auto" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-4 font-display text-6xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-3 text-xl font-bold text-foreground",
					children: t("errors.notFoundTitle")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: t("errors.notFoundText")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-7",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: home,
						className: "btn-shine hover-press inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground",
						children: t("errors.backHome")
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	const { t } = useTranslation();
	(0, import_react.useEffect)(() => {}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "shadow-elevation-2 max-w-md rounded-3xl border border-border bg-card p-8 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mx-auto flex size-14 items-center justify-center rounded-full bg-destructive/12 text-destructive",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
						viewBox: "0 0 24 24",
						fill: "none",
						className: "size-7",
						"aria-hidden": true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z",
							stroke: "currentColor",
							strokeWidth: "2",
							strokeLinecap: "round",
							strokeLinejoin: "round"
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-4 text-xl font-bold text-foreground",
					children: t("errors.crashTitle")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: t("errors.crashText")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-7 flex flex-wrap justify-center gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "hover-press inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground",
						children: t("errors.retry")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "hover-press inline-flex items-center justify-center rounded-xl border border-border bg-background px-6 py-3 text-sm font-bold text-foreground hover:bg-secondary",
						children: t("errors.backHome")
					})]
				})
			]
		})
	});
}
var Route$64 = createRootRouteWithContext()({
	head: (ctx) => {
		const seo = createSeoHead("/", localeFromSearch(ctx.match.search));
		return {
			meta: [
				{ charSet: "utf-8" },
				{
					name: "viewport",
					content: "width=device-width, initial-scale=1"
				},
				...seo.meta
			],
			links: [
				...seo.links,
				{
					rel: "manifest",
					href: "/manifest.json"
				},
				{
					rel: "stylesheet",
					href: styles_default
				},
				{
					rel: "preconnect",
					href: "https://fonts.googleapis.com"
				},
				{
					rel: "preconnect",
					href: "https://fonts.gstatic.com",
					crossOrigin: "anonymous"
				},
				{
					rel: "stylesheet",
					href: "https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800&family=Tajawal:wght@400;500;700;800;900&family=Reem+Kufi:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap"
				},
				{
					rel: "icon",
					href: "/favicon.svg",
					type: "image/svg+xml"
				},
				{
					rel: "apple-touch-icon",
					href: "/icons/icon-192.png"
				}
			],
			scripts: seo.scripts
		};
	},
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "ar",
		dir: "rtl",
		"data-theme": "dark",
		className: "dark",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("head", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", { dangerouslySetInnerHTML: { __html: preferencesBootScript } })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function AuthSync() {
	const router = useRouter();
	const queryClient = useQueryClient();
	(0, import_react.useEffect)(() => {
		const onAuthChanged = () => {
			router.invalidate();
			queryClient.invalidateQueries();
		};
		window.addEventListener(AUTH_EVENT, onAuthChanged);
		return () => window.removeEventListener(AUTH_EVENT, onAuthChanged);
	}, [router, queryClient]);
	return null;
}
function ServiceWorkerRegistrar() {
	(0, import_react.useEffect)(() => {
		if ("serviceWorker" in navigator) navigator.serviceWorker.register("/sw.js").catch(() => {});
	}, []);
	return null;
}
function RootComponent() {
	const { queryClient } = Route$64.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PreferencesProvider, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeoManager, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthSync, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceWorkerRegistrar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IdleLogoutWatcher, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CookieConsent, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {
				position: "top-center",
				richColors: true
			})
		] })
	});
}
var $$splitComponentImporter$63 = () => import("./routes-DLRwq8a1.mjs");
var Route$63 = createFileRoute("/")({
	head: (ctx) => createSeoHead("/", localeFromSearch(ctx.match.search)),
	component: lazyRouteComponent($$splitComponentImporter$63, "component")
});
var $$splitComponentImporter$62 = () => import("./403-Chd3u3da.mjs");
var Route$62 = createFileRoute("/403")({
	head: (ctx) => createSeoHead("/403", localeFromSearch(ctx.match.search)),
	component: lazyRouteComponent($$splitComponentImporter$62, "component")
});
var $$splitComponentImporter$61 = () => import("./route-QuUNQ_-8.mjs");
var Route$61 = createFileRoute("/_authenticated")({
	ssr: false,
	beforeLoad: async () => {
		if (!isAuthenticated() || !await verifyServerSession()) throw redirect({ to: "/login" });
		const userId = getStoredUserId();
		if (!userId) throw redirect({ to: "/login" });
		return { user: { id: userId } };
	},
	component: lazyRouteComponent($$splitComponentImporter$61, "component")
});
var $$splitComponentImporter$60 = () => import("./about-Dq1jv2UI.mjs");
var Route$60 = createFileRoute("/about")({
	head: (ctx) => createSeoHead("/about", localeFromSearch(ctx.match.search)),
	component: lazyRouteComponent($$splitComponentImporter$60, "component")
});
var $$splitComponentImporter$59 = () => import("./blog-CQOj7g93.mjs");
var Route$59 = createFileRoute("/blog")({
	head: (ctx) => createSeoHead("/blog", localeFromSearch(ctx.match.search)),
	component: lazyRouteComponent($$splitComponentImporter$59, "component")
});
var $$splitComponentImporter$58 = () => import("./contact-CyfShAdU.mjs");
var Route$58 = createFileRoute("/contact")({
	head: (ctx) => createSeoHead("/contact", localeFromSearch(ctx.match.search)),
	component: lazyRouteComponent($$splitComponentImporter$58, "component")
});
var $$splitComponentImporter$57 = () => import("./courses-D7cJJE3P.mjs");
var Route$57 = createFileRoute("/courses")({
	head: (ctx) => createSeoHead("/courses", localeFromSearch(ctx.match.search)),
	component: lazyRouteComponent($$splitComponentImporter$57, "component")
});
var $$splitComponentImporter$56 = () => import("./for-teachers-DArr9VQK.mjs");
var Route$56 = createFileRoute("/for-teachers")({
	head: (ctx) => createSeoHead("/for-teachers", localeFromSearch(ctx.match.search)),
	component: lazyRouteComponent($$splitComponentImporter$56, "component")
});
var $$splitComponentImporter$55 = () => import("./forgot-password-vvHGzqrI.mjs");
var Route$55 = createFileRoute("/forgot-password")({
	head: (ctx) => createSeoHead("/forgot-password", localeFromSearch(ctx.match.search)),
	component: lazyRouteComponent($$splitComponentImporter$55, "component")
});
var $$splitComponentImporter$54 = () => import("./help-DVvbAd9O.mjs");
var Route$54 = createFileRoute("/help")({
	head: (ctx) => createSeoHead("/help", localeFromSearch(ctx.match.search)),
	component: lazyRouteComponent($$splitComponentImporter$54, "component")
});
var $$splitComponentImporter$53 = () => import("./how-it-works-DkFWSr0y.mjs");
var Route$53 = createFileRoute("/how-it-works")({
	head: (ctx) => createSeoHead("/how-it-works", localeFromSearch(ctx.match.search)),
	component: lazyRouteComponent($$splitComponentImporter$53, "component")
});
var $$splitComponentImporter$52 = () => import("./login-gCblyxc0.mjs");
var Route$52 = createFileRoute("/login")({
	ssr: false,
	beforeLoad: async () => {
		if (await currentUserHome()) throw redirect({ to: "/" });
	},
	head: (ctx) => createSeoHead("/login", localeFromSearch(ctx.match.search)),
	component: lazyRouteComponent($$splitComponentImporter$52, "component")
});
var $$splitComponentImporter$51 = () => import("./pricing-UmJUVFsA.mjs");
var Route$51 = createFileRoute("/pricing")({
	head: (ctx) => createSeoHead("/pricing", localeFromSearch(ctx.match.search)),
	component: lazyRouteComponent($$splitComponentImporter$51, "component")
});
var $$splitComponentImporter$50 = () => import("./privacy-BMONgjPr.mjs");
var Route$50 = createFileRoute("/privacy")({
	head: (ctx) => createSeoHead("/privacy", localeFromSearch(ctx.match.search)),
	component: lazyRouteComponent($$splitComponentImporter$50, "component")
});
var $$splitComponentImporter$49 = () => import("./reset-password-QzO3-Vea.mjs");
var Route$49 = createFileRoute("/reset-password")({
	ssr: false,
	head: (ctx) => createSeoHead("/reset-password", localeFromSearch(ctx.match.search)),
	component: lazyRouteComponent($$splitComponentImporter$49, "component")
});
var $$splitComponentImporter$48 = () => import("./signup-Dlbg-8oZ.mjs");
var Route$48 = createFileRoute("/signup")({
	ssr: false,
	beforeLoad: async () => {
		if (await currentUserHome()) throw redirect({ to: "/" });
	},
	validateSearch: (search) => typeof search.invite === "string" ? { invite: search.invite } : {},
	head: (ctx) => createSeoHead("/signup", localeFromSearch(ctx.match.search)),
	component: lazyRouteComponent($$splitComponentImporter$48, "component")
});
var $$splitComponentImporter$47 = () => import("./terms-zSh9qyi2.mjs");
var Route$47 = createFileRoute("/terms")({
	head: (ctx) => createSeoHead("/terms", localeFromSearch(ctx.match.search)),
	component: lazyRouteComponent($$splitComponentImporter$47, "component")
});
var $$splitComponentImporter$46 = () => import("./unsubscribe-C8XNJGuH.mjs");
var Route$46 = createFileRoute("/unsubscribe")({
	head: (ctx) => createSeoHead("/unsubscribe", localeFromSearch(ctx.match.search)),
	component: lazyRouteComponent($$splitComponentImporter$46, "component")
});
var $$splitComponentImporter$45 = () => import("./achievements-epl6juxh.mjs");
var title$29 = "الإنجاز | أكاديميا";
var Route$45 = createFileRoute("/_authenticated/achievements")({
	head: () => ({ meta: [
		{ title: title$29 },
		{
			name: "description",
			content: description$2
		},
		{
			property: "og:title",
			content: title$29
		},
		{
			property: "og:description",
			content: description$2
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$45, "component")
});
var $$splitComponentImporter$44 = () => import("./bookmarks-DSQKnzVq.mjs");
var title$28 = "المحفوظات | أكاديميا";
var Route$44 = createFileRoute("/_authenticated/bookmarks")({
	head: () => ({ meta: [
		{ title: title$28 },
		{
			name: "description",
			content: description$3
		},
		{
			property: "og:title",
			content: title$28
		},
		{
			property: "og:description",
			content: description$3
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$44, "component")
});
var $$splitComponentImporter$43 = () => import("./community-BVNAKTGM.mjs");
var title$27 = "مجتمع المواد | أكاديميا";
var Route$43 = createFileRoute("/_authenticated/community")({
	head: () => ({ meta: [
		{ title: title$27 },
		{
			name: "description",
			content: description$4
		},
		{
			property: "og:title",
			content: title$27
		},
		{
			property: "og:description",
			content: description$4
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$43, "component")
});
var $$splitComponentImporter$42 = () => import("./dashboard-D_1j3__A.mjs");
var title$26 = "لوحة الطالب | أكاديميا";
var Route$42 = createFileRoute("/_authenticated/dashboard")({
	head: () => ({ meta: [
		{ title: title$26 },
		{
			name: "description",
			content: description$5
		},
		{
			property: "og:title",
			content: title$26
		},
		{
			property: "og:description",
			content: description$5
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$42, "component")
});
var $$splitComponentImporter$41 = () => import("./exam-simulator-BUTzjQaX.mjs");
var title$25 = "محاكي الامتحان | أكاديميا";
var Route$41 = createFileRoute("/_authenticated/exam-simulator")({
	head: () => ({ meta: [
		{ title: title$25 },
		{
			name: "description",
			content: description$6
		},
		{
			property: "og:title",
			content: title$25
		},
		{
			property: "og:description",
			content: description$6
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$41, "component")
});
var $$splitComponentImporter$40 = () => import("./flashcards-D37McWnh.mjs");
var title$24 = "البطاقات | أكاديميا";
var Route$40 = createFileRoute("/_authenticated/flashcards")({
	head: () => ({ meta: [
		{ title: title$24 },
		{
			name: "description",
			content: description$7
		},
		{
			property: "og:title",
			content: title$24
		},
		{
			property: "og:description",
			content: description$7
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$40, "component")
});
var $$splitComponentImporter$39 = () => import("./library-C6IDzJnf.mjs");
var title$23 = "المكتبة | أكاديميا";
var Route$39 = createFileRoute("/_authenticated/library")({
	head: () => ({ meta: [
		{ title: title$23 },
		{
			name: "description",
			content: description$8
		},
		{
			property: "og:title",
			content: title$23
		},
		{
			property: "og:description",
			content: description$8
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$39, "component")
});
var $$splitComponentImporter$38 = () => import("./mistakes-bank-LzqnAB8b.mjs");
var title$22 = "بنك الأخطاء | أكاديميا";
var Route$38 = createFileRoute("/_authenticated/mistakes-bank")({
	head: () => ({ meta: [
		{ title: title$22 },
		{
			name: "description",
			content: description$9
		},
		{
			property: "og:title",
			content: title$22
		},
		{
			property: "og:description",
			content: description$9
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$38, "component")
});
var $$splitComponentImporter$37 = () => import("./my-certificates-C6BawVJ0.mjs");
var title$21 = "شهاداتي | أكاديميا";
var Route$37 = createFileRoute("/_authenticated/my-certificates")({
	head: () => ({ meta: [
		{ title: title$21 },
		{
			name: "description",
			content: description$10
		},
		{
			property: "og:title",
			content: title$21
		},
		{
			property: "og:description",
			content: description$10
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$37, "component")
});
var $$splitComponentImporter$36 = () => import("./my-courses-DSQicRuy.mjs");
var title$20 = "كورساتي | أكاديميا";
var Route$36 = createFileRoute("/_authenticated/my-courses")({
	head: () => ({ meta: [
		{ title: title$20 },
		{
			name: "description",
			content: description$11
		},
		{
			property: "og:title",
			content: title$20
		},
		{
			property: "og:description",
			content: description$11
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$36, "component")
});
var $$splitComponentImporter$35 = () => import("./notifications-CjizBtNP.mjs");
var Route$35 = createFileRoute("/_authenticated/notifications")({
	head: () => ({ meta: [
		{ title: "الإشعارات | Academia" },
		{
			name: "description",
			content: "إشعارات الحساب والمهام التعليمية."
		},
		{
			property: "og:title",
			content: "الإشعارات | Academia"
		},
		{
			property: "og:description",
			content: "إشعارات الحساب والمهام التعليمية."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$35, "component")
});
var $$splitComponentImporter$34 = () => import("./referrals-ChDjNliY.mjs");
var title$19 = "الإحالات | أكاديميا";
var Route$34 = createFileRoute("/_authenticated/referrals")({
	head: () => ({ meta: [
		{ title: title$19 },
		{
			name: "description",
			content: description$14
		},
		{
			property: "og:title",
			content: title$19
		},
		{
			property: "og:description",
			content: description$14
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$34, "component")
});
var $$splitComponentImporter$33 = () => import("./schedule-CH52IPPC.mjs");
var title$18 = "الجدول | أكاديميا";
var Route$33 = createFileRoute("/_authenticated/schedule")({
	head: () => ({ meta: [
		{ title: title$18 },
		{
			name: "description",
			content: description$15
		},
		{
			property: "og:title",
			content: title$18
		},
		{
			property: "og:description",
			content: description$15
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$33, "component")
});
var $$splitComponentImporter$32 = () => import("./settings-DSdT3OmA.mjs");
var Route$32 = createFileRoute("/_authenticated/settings")({
	head: () => ({ meta: [
		{ title: "الإعدادات | أكاديميا" },
		{
			name: "description",
			content: "اللغة، الثيم، وبيانات حسابك في أكاديميا."
		},
		{
			property: "og:title",
			content: "الإعدادات | أكاديميا"
		},
		{
			property: "og:description",
			content: "تفضيلاتك تُحفظ على جهازك وعلى حسابك معاً."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$32, "component")
});
var $$splitComponentImporter$31 = () => import("./system-modules-Cz9w3Jj-.mjs");
var Route$31 = createFileRoute("/_authenticated/system-modules")({
	head: () => ({ meta: [
		{ title: "وحدات النظام | Academia" },
		{
			name: "description",
			content: "تفعيل أو تعطيل وحدات النظام على مستوى كل المستخدمين بضغطة واحدة."
		},
		{
			property: "og:title",
			content: "وحدات النظام | Academia"
		},
		{
			property: "og:description",
			content: "التحكم العام بتفعيل وحدات النظام."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$31, "component")
});
var $$splitComponentImporter$30 = () => import("./teacher.register-BwF0IVYI.mjs");
var Route$30 = createFileRoute("/teacher/register")({
	ssr: false,
	beforeLoad: async () => {
		if (await currentUserHome()) throw redirect({ to: "/" });
	},
	head: (ctx) => createSeoHead("/teacher/register", localeFromSearch(ctx.match.search)),
	component: lazyRouteComponent($$splitComponentImporter$30, "component")
});
var $$splitComponentImporter$29 = () => import("./admin.community-reports-RmFDqOQB.mjs");
var Route$29 = createFileRoute("/_authenticated/admin/community-reports")({
	head: () => ({ meta: [
		{ title: "بلاغات المجتمع | Academia" },
		{
			name: "description",
			content: "إدارة بلاغات مجتمعات Academia."
		},
		{
			property: "og:title",
			content: "بلاغات المجتمع"
		},
		{
			property: "og:description",
			content: "إدارة بلاغات مجتمعات Academia."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$29, "component")
});
var $$splitComponentImporter$28 = () => import("./admin.constants-BGShZmAd.mjs");
var Route$28 = createFileRoute("/_authenticated/admin/constants")({
	head: () => ({ meta: [
		{ title: "الثوابت | Academia" },
		{
			name: "description",
			content: "إدارة الثوابت والتصنيفات العامة على Academia."
		},
		{
			property: "og:title",
			content: "الثوابت"
		},
		{
			property: "og:description",
			content: "إدارة الثوابت والتصنيفات العامة على Academia."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$28, "component")
});
var $$splitComponentImporter$27 = () => import("./admin.content-review-AfvNw953.mjs");
var Route$27 = createFileRoute("/_authenticated/admin/content-review")({
	head: () => ({ meta: [
		{ title: "مراجعة المحتوى | Academia" },
		{
			name: "description",
			content: "مراجعة محتوى Academia التعليمي."
		},
		{
			property: "og:title",
			content: "مراجعة المحتوى"
		},
		{
			property: "og:description",
			content: "مراجعة محتوى Academia التعليمي."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$27, "component")
});
var $$splitComponentImporter$26 = () => import("./admin.course-catalog-BUNX0C8O.mjs");
var Route$26 = createFileRoute("/_authenticated/admin/course-catalog")({
	head: () => ({ meta: [
		{ title: "كتالوج الكورسات العام | Academia" },
		{
			name: "description",
			content: "إدارة الكورسات المعروضة بصفحة الكورسات العامة."
		},
		{
			property: "og:title",
			content: "كتالوج الكورسات العام"
		},
		{
			property: "og:description",
			content: "إدارة الكورسات المعروضة بصفحة الكورسات العامة."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$26, "component")
});
var $$splitComponentImporter$25 = () => import("./admin.curriculum-DRrpd1AG.mjs");
var Route$25 = createFileRoute("/_authenticated/admin/curriculum")({
	head: () => ({ meta: [
		{ title: "المنهاج | Academia" },
		{
			name: "description",
			content: "هيكل منهاج Academia."
		},
		{
			property: "og:title",
			content: "المنهاج"
		},
		{
			property: "og:description",
			content: "هيكل منهاج Academia."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$25, "component")
});
var $$splitComponentImporter$24 = () => import("./admin.curriculum-requests-BBpNGvCp.mjs");
var Route$24 = createFileRoute("/_authenticated/admin/curriculum-requests")({
	head: () => ({ meta: [
		{ title: "طلبات المنهاج | Academia" },
		{
			name: "description",
			content: "إدارة طلبات منهاج Academia."
		},
		{
			property: "og:title",
			content: "طلبات المنهاج"
		},
		{
			property: "og:description",
			content: "إدارة طلبات منهاج Academia."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$24, "component")
});
var $$splitComponentImporter$23 = () => import("./admin.dashboard-DrjPOvsR.mjs");
var Route$23 = createFileRoute("/_authenticated/admin/dashboard")({
	head: () => ({ meta: [
		{ title: "إدارة Academia" },
		{
			name: "description",
			content: "لوحة تشغيل منصة Academia."
		},
		{
			property: "og:title",
			content: "إدارة Academia"
		},
		{
			property: "og:description",
			content: "لوحة تشغيل منصة Academia."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$23, "component")
});
var $$splitComponentImporter$22 = () => import("./admin.pages-BYiOrY0h.mjs");
var Route$22 = createFileRoute("/_authenticated/admin/pages")({
	head: () => ({ meta: [
		{ title: "الصفحات | Academia" },
		{
			name: "description",
			content: "إدارة صفحات وقوائم النظام على Academia."
		},
		{
			property: "og:title",
			content: "الصفحات"
		},
		{
			property: "og:description",
			content: "إدارة صفحات وقوائم النظام على Academia."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$22, "component")
});
var $$splitComponentImporter$21 = () => import("./admin.payments-pY5Tr5T1.mjs");
var Route$21 = createFileRoute("/_authenticated/admin/payments")({
	head: () => ({ meta: [
		{ title: "المدفوعات | Academia" },
		{
			name: "description",
			content: "متابعة مدفوعات Academia."
		},
		{
			property: "og:title",
			content: "المدفوعات"
		},
		{
			property: "og:description",
			content: "متابعة مدفوعات Academia."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$21, "component")
});
var $$splitComponentImporter$20 = () => import("./admin.permissions-DzlqILSB.mjs");
var title$17 = "مصفوفة الصلاحيات | Academia";
var description$1 = "اختر نوع المستخدم لتحرير شجرة صلاحياته في Academia.";
var Route$20 = createFileRoute("/_authenticated/admin/permissions")({
	head: () => ({ meta: [
		{ title: title$17 },
		{
			name: "description",
			content: description$1
		},
		{
			property: "og:title",
			content: "مصفوفة الصلاحيات"
		},
		{
			property: "og:description",
			content: description$1
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$20, "component")
});
var $$splitComponentImporter$19 = () => import("./admin.roles-DABKQDYR.mjs");
var Route$19 = createFileRoute("/_authenticated/admin/roles")({
	head: () => ({ meta: [
		{ title: "الأدوار والصلاحيات | Academia" },
		{
			name: "description",
			content: "إدارة أدوار وصلاحيات Academia."
		},
		{
			property: "og:title",
			content: "الأدوار والصلاحيات"
		},
		{
			property: "og:description",
			content: "إدارة أدوار وصلاحيات Academia."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$19, "component")
});
var $$splitComponentImporter$18 = () => import("./admin.teachers-CEHKFKYM.mjs");
var Route$18 = createFileRoute("/_authenticated/admin/teachers")({
	head: () => ({ meta: [
		{ title: "توثيق المعلمين | Academia" },
		{
			name: "description",
			content: "مراجعة واعتماد طلبات المعلمين."
		},
		{
			property: "og:title",
			content: "توثيق المعلمين"
		},
		{
			property: "og:description",
			content: "مراجعة واعتماد طلبات المعلمين."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$18, "component")
});
var $$splitComponentImporter$17 = () => import("./admin.users-Ct1JWyzO.mjs");
var Route$17 = createFileRoute("/_authenticated/admin/users")({
	head: () => ({ meta: [
		{ title: "المستخدمون | Academia" },
		{
			name: "description",
			content: "إدارة حسابات المستخدمين على Academia."
		},
		{
			property: "og:title",
			content: "المستخدمون"
		},
		{
			property: "og:description",
			content: "إدارة حسابات المستخدمين على Academia."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$17, "component")
});
var $$splitComponentImporter$16 = () => import("./parent.report-nz4BRQEA.mjs");
var title$16 = "تقرير الابن | أكاديميا";
var Route$16 = createFileRoute("/_authenticated/parent/report")({
	head: () => ({ meta: [
		{ title: title$16 },
		{
			name: "description",
			content: description$12
		},
		{
			property: "og:title",
			content: title$16
		},
		{
			property: "og:description",
			content: description$12
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$16, "component")
});
var $$splitComponentImporter$15 = () => import("./parent.settings-sf6kBN3G.mjs");
var title$15 = "إعدادات ولي الأمر | أكاديميا";
var Route$15 = createFileRoute("/_authenticated/parent/settings")({
	head: () => ({ meta: [
		{ title: title$15 },
		{
			name: "description",
			content: description$13
		},
		{
			property: "og:title",
			content: title$15
		},
		{
			property: "og:description",
			content: description$13
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var $$splitComponentImporter$14 = () => import("./supervisor.dashboard-CfHYwIEU.mjs");
var title$14 = "لوحة الإشراف | أكاديميا";
var Route$14 = createFileRoute("/_authenticated/supervisor/dashboard")({
	head: () => ({ meta: [
		{ title: title$14 },
		{
			name: "description",
			content: description$16
		},
		{
			property: "og:title",
			content: title$14
		},
		{
			property: "og:description",
			content: description$16
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./supervisor.reports-BJgIRuYK.mjs");
var title$13 = "تقارير الإشراف | أكاديميا";
var Route$13 = createFileRoute("/_authenticated/supervisor/reports")({
	head: () => ({ meta: [
		{ title: title$13 },
		{
			name: "description",
			content: description$17
		},
		{
			property: "og:title",
			content: title$13
		},
		{
			property: "og:description",
			content: description$17
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./supervisor.students-overview-CHU81Gis.mjs");
var title$12 = "نظرة الطلاب | أكاديميا";
var Route$12 = createFileRoute("/_authenticated/supervisor/students-overview")({
	head: () => ({ meta: [
		{ title: title$12 },
		{
			name: "description",
			content: description$18
		},
		{
			property: "og:title",
			content: title$12
		},
		{
			property: "og:description",
			content: description$18
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./supervisor.teachers-C9Rjl-Oz.mjs");
var title$11 = "المعلمون | أكاديميا";
var Route$11 = createFileRoute("/_authenticated/supervisor/teachers")({
	head: () => ({ meta: [
		{ title: title$11 },
		{
			name: "description",
			content: description$19
		},
		{
			property: "og:title",
			content: title$11
		},
		{
			property: "og:description",
			content: description$19
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./teacher.analytics-BA_QOvZ_.mjs");
var title$10 = "التحليلات | أكاديميا";
var Route$10 = createFileRoute("/_authenticated/teacher/analytics")({
	head: () => ({ meta: [
		{ title: title$10 },
		{
			name: "description",
			content: description$20
		},
		{
			property: "og:title",
			content: title$10
		},
		{
			property: "og:description",
			content: description$20
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./teacher.community-B9DrP_s_.mjs");
var title$9 = "مجتمع الصف | أكاديميا";
var Route$9 = createFileRoute("/_authenticated/teacher/community")({
	head: () => ({ meta: [
		{ title: title$9 },
		{
			name: "description",
			content: description$21
		},
		{
			property: "og:title",
			content: title$9
		},
		{
			property: "og:description",
			content: description$21
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./teacher.content-VLEbUrXd.mjs");
var title$8 = "المحتوى | أكاديميا";
var Route$8 = createFileRoute("/_authenticated/teacher/content")({
	head: () => ({ meta: [
		{ title: title$8 },
		{
			name: "description",
			content: description$22
		},
		{
			property: "og:title",
			content: title$8
		},
		{
			property: "og:description",
			content: description$22
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./teacher.courses-BLOcZUnp.mjs");
var title$7 = "كورساتي (معلم) | أكاديميا";
var Route$7 = createFileRoute("/_authenticated/teacher/courses")({
	head: () => ({ meta: [
		{ title: title$7 },
		{
			name: "description",
			content: description$23
		},
		{
			property: "og:title",
			content: title$7
		},
		{
			property: "og:description",
			content: description$23
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./teacher.dashboard-lDgQqqBW.mjs");
var title$6 = "لوحة المعلم | أكاديميا";
var Route$6 = createFileRoute("/_authenticated/teacher/dashboard")({
	head: () => ({ meta: [
		{ title: title$6 },
		{
			name: "description",
			content: description$24
		},
		{
			property: "og:title",
			content: title$6
		},
		{
			property: "og:description",
			content: description$24
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./teacher.earnings-DPP9WLih.mjs");
var title$5 = "الأرباح | أكاديميا";
var Route$5 = createFileRoute("/_authenticated/teacher/earnings")({
	head: () => ({ meta: [
		{ title: title$5 },
		{
			name: "description",
			content: description$25
		},
		{
			property: "og:title",
			content: title$5
		},
		{
			property: "og:description",
			content: description$25
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./teacher.grading-DVZuEX3F.mjs");
var title$4 = "التصحيح | أكاديميا";
var Route$4 = createFileRoute("/_authenticated/teacher/grading")({
	head: () => ({ meta: [
		{ title: title$4 },
		{
			name: "description",
			content: description$26
		},
		{
			property: "og:title",
			content: title$4
		},
		{
			property: "og:description",
			content: description$26
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./teacher.quizzes-BcbSmGjN.mjs");
var title$3 = "الاختبارات | أكاديميا";
var Route$3 = createFileRoute("/_authenticated/teacher/quizzes")({
	head: () => ({ meta: [
		{ title: title$3 },
		{
			name: "description",
			content: description$27
		},
		{
			property: "og:title",
			content: title$3
		},
		{
			property: "og:description",
			content: description$27
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./teacher.settings-BZ4s5lTk.mjs");
var title$2 = "إعدادات المعلم | أكاديميا";
var Route$2 = createFileRoute("/_authenticated/teacher/settings")({
	head: () => ({ meta: [
		{ title: title$2 },
		{
			name: "description",
			content: description$28
		},
		{
			property: "og:title",
			content: title$2
		},
		{
			property: "og:description",
			content: description$28
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./library.lesson._id-Bkq7Rf3x.mjs");
var title$1 = "صفحة الدرس | أكاديميا";
var description = "الدرس: ملف مرتّب + أسئلة تفاعلية + بطاقات مراجعة + إضافة أخطائك إلى بنك الأخطاء.";
var Route$1 = createFileRoute("/_authenticated/library/lesson/$id")({
	head: () => ({ meta: [
		{ title: title$1 },
		{
			name: "description",
			content: description
		},
		{
			property: "og:title",
			content: title$1
		},
		{
			property: "og:description",
			content: description
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./teacher.profile.edit-CDHDqmhF.mjs");
var title = "ملفي العام | أكاديميا";
var Route = createFileRoute("/_authenticated/teacher/profile/edit")({
	head: () => ({ meta: [
		{ title },
		{
			name: "description",
			content: description$29
		},
		{
			property: "og:title",
			content: title
		},
		{
			property: "og:description",
			content: description$29
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$63.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$64
});
var R403Route = Route$62.update({
	id: "/403",
	path: "/403",
	getParentRoute: () => Route$64
});
var AuthenticatedRouteRoute = Route$61.update({
	id: "/_authenticated",
	getParentRoute: () => Route$64
});
var AboutRoute = Route$60.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$64
});
var BlogRoute = Route$59.update({
	id: "/blog",
	path: "/blog",
	getParentRoute: () => Route$64
});
var ContactRoute = Route$58.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route$64
});
var CoursesRoute = Route$57.update({
	id: "/courses",
	path: "/courses",
	getParentRoute: () => Route$64
});
var ForTeachersRoute = Route$56.update({
	id: "/for-teachers",
	path: "/for-teachers",
	getParentRoute: () => Route$64
});
var ForgotPasswordRoute = Route$55.update({
	id: "/forgot-password",
	path: "/forgot-password",
	getParentRoute: () => Route$64
});
var HelpRoute = Route$54.update({
	id: "/help",
	path: "/help",
	getParentRoute: () => Route$64
});
var HowItWorksRoute = Route$53.update({
	id: "/how-it-works",
	path: "/how-it-works",
	getParentRoute: () => Route$64
});
var LoginRoute = Route$52.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$64
});
var PricingRoute = Route$51.update({
	id: "/pricing",
	path: "/pricing",
	getParentRoute: () => Route$64
});
var PrivacyRoute = Route$50.update({
	id: "/privacy",
	path: "/privacy",
	getParentRoute: () => Route$64
});
var ResetPasswordRoute = Route$49.update({
	id: "/reset-password",
	path: "/reset-password",
	getParentRoute: () => Route$64
});
var SignupRoute = Route$48.update({
	id: "/signup",
	path: "/signup",
	getParentRoute: () => Route$64
});
var TermsRoute = Route$47.update({
	id: "/terms",
	path: "/terms",
	getParentRoute: () => Route$64
});
var UnsubscribeRoute = Route$46.update({
	id: "/unsubscribe",
	path: "/unsubscribe",
	getParentRoute: () => Route$64
});
var VerifyEmailRoute = Route$69.update({
	id: "/verify-email",
	path: "/verify-email",
	getParentRoute: () => Route$64
});
var AuthenticatedAchievementsRoute = Route$45.update({
	id: "/achievements",
	path: "/achievements",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedBookmarksRoute = Route$44.update({
	id: "/bookmarks",
	path: "/bookmarks",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedCommunityRoute = Route$43.update({
	id: "/community",
	path: "/community",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedDashboardRoute = Route$42.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedExamSimulatorRoute = Route$41.update({
	id: "/exam-simulator",
	path: "/exam-simulator",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedFlashcardsRoute = Route$40.update({
	id: "/flashcards",
	path: "/flashcards",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedLibraryRoute = Route$39.update({
	id: "/library",
	path: "/library",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedMistakesBankRoute = Route$38.update({
	id: "/mistakes-bank",
	path: "/mistakes-bank",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedMyCertificatesRoute = Route$37.update({
	id: "/my-certificates",
	path: "/my-certificates",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedMyCoursesRoute = Route$36.update({
	id: "/my-courses",
	path: "/my-courses",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedNotificationsRoute = Route$35.update({
	id: "/notifications",
	path: "/notifications",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedReferralsRoute = Route$34.update({
	id: "/referrals",
	path: "/referrals",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedScheduleRoute = Route$33.update({
	id: "/schedule",
	path: "/schedule",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedSettingsRoute = Route$32.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedSystemModulesRoute = Route$31.update({
	id: "/system-modules",
	path: "/system-modules",
	getParentRoute: () => AuthenticatedRouteRoute
});
var BlogSlugRoute = Route$65.update({
	id: "/$slug",
	path: "/$slug",
	getParentRoute: () => BlogRoute
});
var CertificateIdRoute = Route$66.update({
	id: "/certificate/$id",
	path: "/certificate/$id",
	getParentRoute: () => Route$64
});
var InviteCodeRoute = Route$67.update({
	id: "/invite/$code",
	path: "/invite/$code",
	getParentRoute: () => Route$64
});
var TeacherIdRoute = Route$70.update({
	id: "/teacher/$id",
	path: "/teacher/$id",
	getParentRoute: () => Route$64
});
var TeacherRegisterRoute = Route$30.update({
	id: "/teacher/register",
	path: "/teacher/register",
	getParentRoute: () => Route$64
});
var AuthenticatedAdminCommunityReportsRoute = Route$29.update({
	id: "/admin/community-reports",
	path: "/admin/community-reports",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAdminConstantsRoute = Route$28.update({
	id: "/admin/constants",
	path: "/admin/constants",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAdminContentReviewRoute = Route$27.update({
	id: "/admin/content-review",
	path: "/admin/content-review",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAdminCourseCatalogRoute = Route$26.update({
	id: "/admin/course-catalog",
	path: "/admin/course-catalog",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAdminCurriculumRoute = Route$25.update({
	id: "/admin/curriculum",
	path: "/admin/curriculum",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAdminCurriculumRequestsRoute = Route$24.update({
	id: "/admin/curriculum-requests",
	path: "/admin/curriculum-requests",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAdminDashboardRoute = Route$23.update({
	id: "/admin/dashboard",
	path: "/admin/dashboard",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAdminPagesRoute = Route$22.update({
	id: "/admin/pages",
	path: "/admin/pages",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAdminPaymentsRoute = Route$21.update({
	id: "/admin/payments",
	path: "/admin/payments",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAdminPermissionsRoute = Route$20.update({
	id: "/admin/permissions",
	path: "/admin/permissions",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAdminRolesRoute = Route$19.update({
	id: "/admin/roles",
	path: "/admin/roles",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAdminTeachersRoute = Route$18.update({
	id: "/admin/teachers",
	path: "/admin/teachers",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAdminUsersRoute = Route$17.update({
	id: "/admin/users",
	path: "/admin/users",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedParentReportRoute = Route$16.update({
	id: "/parent/report",
	path: "/parent/report",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedParentSettingsRoute = Route$15.update({
	id: "/parent/settings",
	path: "/parent/settings",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedRolePermissionsRoleIdRoute = Route$68.update({
	id: "/role-permissions/$roleId",
	path: "/role-permissions/$roleId",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedSupervisorDashboardRoute = Route$14.update({
	id: "/supervisor/dashboard",
	path: "/supervisor/dashboard",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedSupervisorReportsRoute = Route$13.update({
	id: "/supervisor/reports",
	path: "/supervisor/reports",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedSupervisorStudentsOverviewRoute = Route$12.update({
	id: "/supervisor/students-overview",
	path: "/supervisor/students-overview",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedSupervisorTeachersRoute = Route$11.update({
	id: "/supervisor/teachers",
	path: "/supervisor/teachers",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedTeacherAnalyticsRoute = Route$10.update({
	id: "/teacher/analytics",
	path: "/teacher/analytics",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedTeacherCommunityRoute = Route$9.update({
	id: "/teacher/community",
	path: "/teacher/community",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedTeacherContentRoute = Route$8.update({
	id: "/teacher/content",
	path: "/teacher/content",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedTeacherCoursesRoute = Route$7.update({
	id: "/teacher/courses",
	path: "/teacher/courses",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedTeacherDashboardRoute = Route$6.update({
	id: "/teacher/dashboard",
	path: "/teacher/dashboard",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedTeacherEarningsRoute = Route$5.update({
	id: "/teacher/earnings",
	path: "/teacher/earnings",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedTeacherGradingRoute = Route$4.update({
	id: "/teacher/grading",
	path: "/teacher/grading",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedTeacherQuizzesRoute = Route$3.update({
	id: "/teacher/quizzes",
	path: "/teacher/quizzes",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedTeacherSettingsRoute = Route$2.update({
	id: "/teacher/settings",
	path: "/teacher/settings",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedLibraryLessonIdRoute = Route$1.update({
	id: "/lesson/$id",
	path: "/lesson/$id",
	getParentRoute: () => AuthenticatedLibraryRoute
});
var AuthenticatedTeacherProfileEditRoute = Route.update({
	id: "/teacher/profile/edit",
	path: "/teacher/profile/edit",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedLibraryRouteChildren = { AuthenticatedLibraryLessonIdRoute };
var AuthenticatedRouteRouteChildren = {
	AuthenticatedAchievementsRoute,
	AuthenticatedBookmarksRoute,
	AuthenticatedCommunityRoute,
	AuthenticatedDashboardRoute,
	AuthenticatedExamSimulatorRoute,
	AuthenticatedFlashcardsRoute,
	AuthenticatedLibraryRoute: AuthenticatedLibraryRoute._addFileChildren(AuthenticatedLibraryRouteChildren),
	AuthenticatedMistakesBankRoute,
	AuthenticatedMyCertificatesRoute,
	AuthenticatedMyCoursesRoute,
	AuthenticatedNotificationsRoute,
	AuthenticatedReferralsRoute,
	AuthenticatedScheduleRoute,
	AuthenticatedSettingsRoute,
	AuthenticatedSystemModulesRoute,
	AuthenticatedAdminCommunityReportsRoute,
	AuthenticatedAdminConstantsRoute,
	AuthenticatedAdminContentReviewRoute,
	AuthenticatedAdminCourseCatalogRoute,
	AuthenticatedAdminCurriculumRoute,
	AuthenticatedAdminCurriculumRequestsRoute,
	AuthenticatedAdminDashboardRoute,
	AuthenticatedAdminPagesRoute,
	AuthenticatedAdminPaymentsRoute,
	AuthenticatedAdminPermissionsRoute,
	AuthenticatedAdminRolesRoute,
	AuthenticatedAdminTeachersRoute,
	AuthenticatedAdminUsersRoute,
	AuthenticatedParentReportRoute,
	AuthenticatedParentSettingsRoute,
	AuthenticatedRolePermissionsRoleIdRoute,
	AuthenticatedSupervisorDashboardRoute,
	AuthenticatedSupervisorReportsRoute,
	AuthenticatedSupervisorStudentsOverviewRoute,
	AuthenticatedSupervisorTeachersRoute,
	AuthenticatedTeacherAnalyticsRoute,
	AuthenticatedTeacherCommunityRoute,
	AuthenticatedTeacherContentRoute,
	AuthenticatedTeacherCoursesRoute,
	AuthenticatedTeacherDashboardRoute,
	AuthenticatedTeacherEarningsRoute,
	AuthenticatedTeacherGradingRoute,
	AuthenticatedTeacherQuizzesRoute,
	AuthenticatedTeacherSettingsRoute,
	AuthenticatedTeacherProfileEditRoute
};
var AuthenticatedRouteRouteWithChildren = AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren);
var BlogRouteChildren = { BlogSlugRoute };
var rootRouteChildren = {
	IndexRoute,
	AuthenticatedRouteRoute: AuthenticatedRouteRouteWithChildren,
	R403Route,
	AboutRoute,
	BlogRoute: BlogRoute._addFileChildren(BlogRouteChildren),
	ContactRoute,
	CoursesRoute,
	ForTeachersRoute,
	ForgotPasswordRoute,
	HelpRoute,
	HowItWorksRoute,
	LoginRoute,
	PricingRoute,
	PrivacyRoute,
	ResetPasswordRoute,
	SignupRoute,
	TermsRoute,
	UnsubscribeRoute,
	VerifyEmailRoute,
	CertificateIdRoute,
	InviteCodeRoute,
	TeacherIdRoute,
	TeacherRegisterRoute
};
var routeTree = Route$64._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
