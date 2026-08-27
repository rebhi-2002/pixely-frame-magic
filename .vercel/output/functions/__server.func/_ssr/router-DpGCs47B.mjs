import { i as __toESM } from "../_runtime.mjs";
import { M as redirect, _ as useNavigate, c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, l as useRouterState, m as createFileRoute, p as lazyRouteComponent, s as Scripts, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as useTranslation } from "../_libs/react-i18next.mjs";
import { a as PreferencesProvider, d as getStoredUserId, f as isAuthenticated, h as logout, t as AUTH_EVENT, v as preferencesBootScript } from "./rbac-static-data-BkN8GGlQ.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { i as useQueryClient, r as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { r as NotFoundIllustration } from "./illustrations-DxG8Himc.mjs";
import { Z as Cookie } from "../_libs/lucide-react.mjs";
import { t as description$36 } from "./achievements-CWbVt_3f.mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { t as Route$62 } from "./blog._slug-D7SU--QF.mjs";
import { t as Route$63 } from "./certificate._id-ztuHlkyS.mjs";
import { t as description$37 } from "./dashboard-DZWQFTWS.mjs";
import { t as description$38 } from "./exam-simulator-fRp_d5O1.mjs";
import { t as description$39 } from "./flashcards-DBt5JrgN.mjs";
import { t as Route$64 } from "./invite._code-Bgp27zoK.mjs";
import { t as description$40 } from "./library-CKzaZr2h.mjs";
import { t as description$41 } from "./mistakes-bank-qmjwZTFB.mjs";
import { t as description$42 } from "./my-certificates-CAyS_YaR.mjs";
import { t as description$43 } from "./my-courses-D0hEDqco.mjs";
import { t as Route$65 } from "./role-permissions._roleId-DUP_WObo.mjs";
import { n as currentUserHome, t as Route$66 } from "./verify-email-CzFZtfLl.mjs";
import { t as Route$67 } from "./teacher._id-Dh3X0oij.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-DpGCs47B.js
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
var styles_default = "/assets/styles-DZNVLq1g.css";
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
		className: "fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-3xl rounded-2xl border border-border bg-card/95 p-4 shadow-lg backdrop-blur md:inset-x-6 md:bottom-6",
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
var Route$61 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Academia | منصة الطالب للتنظيم والإنجاز" },
			{
				name: "description",
				content: "أكاديميا: مكتبة ذكية، مجتمعات مواد، متابعة إنجاز، محاكي امتحان — منصة عربية تساعد الطالب ينظّم دراسته وينجز."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				property: "og:title",
				content: "Academia | منصة الطالب للتنظيم والإنجاز"
			},
			{
				name: "twitter:title",
				content: "Academia | منصة الطالب للتنظيم والإنجاز"
			},
			{
				property: "og:description",
				content: "أكاديميا: مكتبة ذكية، مجتمعات مواد، متابعة إنجاز، محاكي امتحان — منصة عربية تساعد الطالب ينظّم دراسته وينجز."
			},
			{
				name: "twitter:description",
				content: "أكاديميا: مكتبة ذكية، مجتمعات مواد، متابعة إنجاز، محاكي امتحان — منصة عربية تساعد الطالب ينظّم دراسته وينجز."
			}
		],
		links: [
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
			}
		]
	}),
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
function RootComponent() {
	const { queryClient } = Route$61.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PreferencesProvider, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthSync, {}),
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
var $$splitComponentImporter$60 = () => import("./routes-DBzUVpRA.mjs");
var title$43 = "Academia | منصة الطالب للتنظيم والإنجاز";
var description$35 = "Academia: مكتبة ذكية مرتبة، مجتمعات مواد، متابعة إنجاز، بنك أخطاء ومحاكي امتحان وزاري — كل دراستك بمكان واحد.";
var Route$60 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: title$43 },
		{
			name: "description",
			content: description$35
		},
		{
			property: "og:title",
			content: title$43
		},
		{
			property: "og:description",
			content: description$35
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$60, "component")
});
var $$splitComponentImporter$59 = () => import("./403-BYNhuEyn.mjs");
var title$42 = "غير مصرّح | أكاديميا";
var description$34 = "هذا القسم غير متاح لدورك الحالي على المنصة.";
var Route$59 = createFileRoute("/403")({
	head: () => ({ meta: [
		{ title: title$42 },
		{
			name: "description",
			content: description$34
		},
		{
			name: "robots",
			content: "noindex"
		},
		{
			property: "og:title",
			content: title$42
		},
		{
			property: "og:description",
			content: description$34
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$59, "component")
});
var $$splitComponentImporter$58 = () => import("./route-DHw7m8sY.mjs");
var Route$58 = createFileRoute("/_authenticated")({
	ssr: false,
	beforeLoad: async () => {
		if (!isAuthenticated()) throw redirect({ to: "/login" });
		return { user: { id: getStoredUserId() ?? "u-admin" } };
	},
	component: lazyRouteComponent($$splitComponentImporter$58, "component")
});
var $$splitComponentImporter$57 = () => import("./about-BSsf_6CO.mjs");
var Route$57 = createFileRoute("/about")({
	head: () => ({ meta: [
		{ title: "من نحن | أكاديميا" },
		{
			name: "description",
			content: "قصة أكاديميا: فريق عربي يبني منصة تنظيم وإنجاز لطلاب الثانوية بدل فوضى مجموعات الواتساب."
		},
		{
			property: "og:title",
			content: "من نحن | أكاديميا"
		},
		{
			property: "og:description",
			content: "قصة أكاديميا ومهمتنا وقيمنا: الوضوح، خصوصية الطالب، عربي أولاً، وإنجاز قابل للقياس."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$57, "component")
});
var $$splitComponentImporter$56 = () => import("./blog-CaHdSWpU.mjs");
var title$41 = "مدونة أكاديميا | نصائح دراسة وتحضير للامتحان الوزاري";
var description$33 = "مقالات عملية عن تنظيم وقت المذاكرة، تقنيات الاستدعاء النشط، والتحضير للامتحان الوزاري — من فريق أكاديميا.";
var Route$56 = createFileRoute("/blog")({
	head: () => ({ meta: [
		{ title: title$41 },
		{
			name: "description",
			content: description$33
		},
		{
			property: "og:title",
			content: title$41
		},
		{
			property: "og:description",
			content: description$33
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$56, "component")
});
var $$splitComponentImporter$55 = () => import("./contact-WtCmrAnR.mjs");
var title$40 = "تواصل معنا | أكاديميا";
var description$32 = "عندك سؤال، اقتراح، أو بدك تعمل شراكة مدرسية؟ فريق أكاديميا جاهز يسمعك.";
var Route$55 = createFileRoute("/contact")({
	head: () => ({ meta: [
		{ title: title$40 },
		{
			name: "description",
			content: description$32
		},
		{
			property: "og:title",
			content: title$40
		},
		{
			property: "og:description",
			content: description$32
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$55, "component")
});
var $$splitComponentImporter$54 = () => import("./courses-CQbUnZVP.mjs");
var Route$54 = createFileRoute("/courses")({
	head: () => ({ meta: [
		{ title: "الكورسات | أكاديميا" },
		{
			name: "description",
			content: "تصفّح كورسات المعلّمين المعتمدين في أكاديميا حسب المادة والمستوى قبل إنشاء حسابك."
		},
		{
			property: "og:title",
			content: "الكورسات | أكاديميا"
		},
		{
			property: "og:description",
			content: "كورسات من معلّمين موثّقين — تصفّحها بدون حساب، وسجّل عند الاشتراك."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$54, "component")
});
var $$splitComponentImporter$53 = () => import("./for-teachers-CdyysHdm.mjs");
var title$39 = "للمعلمين | انشر محتواك واربح مع أكاديميا";
var description$31 = "ارفع محتواك التعليمي، جهّز بنوك أسئلة، تابع أداء طلابك بتحليلات دقيقة، واحصل على دخل من اشتراكات المنصة.";
var Route$53 = createFileRoute("/for-teachers")({
	head: () => ({ meta: [
		{ title: title$39 },
		{
			name: "description",
			content: description$31
		},
		{
			property: "og:title",
			content: title$39
		},
		{
			property: "og:description",
			content: description$31
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$53, "component")
});
var $$splitComponentImporter$52 = () => import("./forgot-password-DGaxPjSs.mjs");
var title$38 = "استعادة كلمة المرور | أكاديميا";
var description$30 = "أرسل رابط استعادة كلمة المرور إلى بريدك الإلكتروني.";
var Route$52 = createFileRoute("/forgot-password")({
	head: () => ({ meta: [
		{ title: title$38 },
		{
			name: "description",
			content: description$30
		},
		{
			property: "og:title",
			content: title$38
		},
		{
			property: "og:description",
			content: description$30
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$52, "component")
});
var $$splitComponentImporter$51 = () => import("./help-Bd2KCq7i.mjs");
var Route$51 = createFileRoute("/help")({
	head: () => ({ meta: [
		{ title: "مركز المساعدة | أكاديميا" },
		{
			name: "description",
			content: "إجابات سريعة عن الحساب، الاشتراك، المكتبة، والخصوصية في أكاديميا."
		},
		{
			property: "og:title",
			content: "مركز المساعدة | أكاديميا"
		},
		{
			property: "og:description",
			content: "أجوبة مختصرة لأكثر الأسئلة تكراراً على منصة أكاديميا."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$51, "component")
});
var $$splitComponentImporter$50 = () => import("./how-it-works-C009POvf.mjs");
var title$37 = "كيف تعمل أكاديميا؟ | خطوات البداية";
var description$29 = "أربع خطوات فقط: سجّل واختر دورك، حدّد نظامك وصفك وموادك، ابدأ من المكتبة المرتّبة، وتابع إنجازك أسبوعياً.";
var Route$50 = createFileRoute("/how-it-works")({
	head: () => ({ meta: [
		{ title: title$37 },
		{
			name: "description",
			content: description$29
		},
		{
			property: "og:title",
			content: title$37
		},
		{
			property: "og:description",
			content: description$29
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$50, "component")
});
var $$splitComponentImporter$49 = () => import("./login-CTymI_o4.mjs");
var title$36 = "تسجيل الدخول | Academia";
var description$28 = "سجّل الدخول إلى حسابك في Academia وتابع دراستك من حيث توقفت.";
var Route$49 = createFileRoute("/login")({
	ssr: false,
	beforeLoad: async () => {
		if (await currentUserHome()) throw redirect({ to: "/" });
	},
	head: () => ({ meta: [
		{ title: title$36 },
		{
			name: "description",
			content: description$28
		},
		{
			property: "og:title",
			content: title$36
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
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$49, "component")
});
var $$splitComponentImporter$48 = () => import("./pricing-DrFn--Fi.mjs");
var title$35 = "الأسعار | أكاديميا مجاناً أو بريميوم";
var description$27 = "ابدأ مجاناً بالمكتبة والمجتمعات ومتابعة الإنجاز، أو اشترك ببريميوم لمحاكي الامتحان الوزاري وبنك الأخطاء والتقارير.";
var Route$48 = createFileRoute("/pricing")({
	head: () => ({ meta: [
		{ title: title$35 },
		{
			name: "description",
			content: description$27
		},
		{
			property: "og:title",
			content: title$35
		},
		{
			property: "og:description",
			content: description$27
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$48, "component")
});
var $$splitComponentImporter$47 = () => import("./privacy-C0Nrd7pB.mjs");
var title$34 = "سياسة الخصوصية | أكاديميا";
var description$26 = "كيف نجمع بيانات الطلاب والمعلمين، وكيف نحميها، وما الذي يظهر لولي الأمر — بوضوح وبدون لغة قانونية معقدة.";
var Route$47 = createFileRoute("/privacy")({
	head: () => ({ meta: [
		{ title: title$34 },
		{
			name: "description",
			content: description$26
		},
		{
			property: "og:title",
			content: title$34
		},
		{
			property: "og:description",
			content: description$26
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$47, "component")
});
var $$splitComponentImporter$46 = () => import("./reset-password-Bo0bvG-A.mjs");
var title$33 = "تعيين كلمة مرور جديدة | أكاديميا";
var description$25 = "اختر كلمة مرور جديدة لحسابك في أكاديميا.";
var Route$46 = createFileRoute("/reset-password")({
	ssr: false,
	head: () => ({ meta: [
		{ title: title$33 },
		{
			name: "description",
			content: description$25
		},
		{
			name: "robots",
			content: "noindex"
		},
		{
			property: "og:title",
			content: title$33
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
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$46, "component")
});
var $$splitComponentImporter$45 = () => import("./signup-DupQ7lPv.mjs");
var title$32 = "إنشاء حساب | أكاديميا";
var description$24 = "أنشئ حسابك في أكاديميا واختر دورك: طالب، ولي أمر، أو معلّم.";
var Route$45 = createFileRoute("/signup")({
	ssr: false,
	beforeLoad: async () => {
		if (await currentUserHome()) throw redirect({ to: "/" });
	},
	validateSearch: (search) => typeof search.invite === "string" ? { invite: search.invite } : {},
	head: () => ({ meta: [
		{ title: title$32 },
		{
			name: "description",
			content: description$24
		},
		{
			property: "og:title",
			content: title$32
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
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$45, "component")
});
var $$splitComponentImporter$44 = () => import("./terms-Cl4igL1F.mjs");
var title$31 = "شروط الاستخدام | أكاديميا";
var description$23 = "قواعد استخدام أكاديميا: حساب واحد لكل مستخدم، احترام المجتمع، حقوق المحتوى، وسياسة الاشتراكات.";
var Route$44 = createFileRoute("/terms")({
	head: () => ({ meta: [
		{ title: title$31 },
		{
			name: "description",
			content: description$23
		},
		{
			property: "og:title",
			content: title$31
		},
		{
			property: "og:description",
			content: description$23
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$44, "component")
});
var $$splitComponentImporter$43 = () => import("./unsubscribe-BhHyAVOc.mjs");
var Route$43 = createFileRoute("/unsubscribe")({
	head: () => ({ meta: [
		{ title: "إلغاء الإشعارات | أكاديميا" },
		{
			name: "description",
			content: "أوقف رسائل أكاديميا البريدية بدون الحاجة لتسجيل الدخول."
		},
		{
			property: "og:title",
			content: "إلغاء الإشعارات | أكاديميا"
		},
		{
			property: "og:description",
			content: "اختر ما تريد إيقافه من رسائل أكاديميا البريدية."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$43, "component")
});
var $$splitComponentImporter$42 = () => import("./achievements-6bZAuyzF.mjs");
var title$30 = "الإنجاز | أكاديميا";
var Route$42 = createFileRoute("/_authenticated/achievements")({
	head: () => ({ meta: [
		{ title: title$30 },
		{
			name: "description",
			content: description$36
		},
		{
			property: "og:title",
			content: title$30
		},
		{
			property: "og:description",
			content: description$36
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
var $$splitComponentImporter$41 = () => import("./bookmarks-XrB6a1lO.mjs");
var title$29 = "المحفوظات | أكاديميا";
var description$22 = "كل ما حفظته: دروس، أسئلة، ونقاشات — بمكان واحد للرجوع السريع.";
var Route$41 = createFileRoute("/_authenticated/bookmarks")({
	head: () => ({ meta: [
		{ title: title$29 },
		{
			name: "description",
			content: description$22
		},
		{
			property: "og:title",
			content: title$29
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
	component: lazyRouteComponent($$splitComponentImporter$41, "component")
});
var $$splitComponentImporter$40 = () => import("./community-Af69lXHB.mjs");
var title$28 = "مجتمع المواد | أكاديميا";
var description$21 = "اسأل في مجتمع المادة، وجاوب زملاءك — إجابات المعلم تُميّز تلقائياً.";
var Route$40 = createFileRoute("/_authenticated/community")({
	head: () => ({ meta: [
		{ title: title$28 },
		{
			name: "description",
			content: description$21
		},
		{
			property: "og:title",
			content: title$28
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
	component: lazyRouteComponent($$splitComponentImporter$40, "component")
});
var $$splitComponentImporter$39 = () => import("./dashboard-0CT8K1Co.mjs");
var title$27 = "لوحة الطالب | أكاديميا";
var Route$39 = createFileRoute("/_authenticated/dashboard")({
	head: () => ({ meta: [
		{ title: title$27 },
		{
			name: "description",
			content: description$37
		},
		{
			property: "og:title",
			content: title$27
		},
		{
			property: "og:description",
			content: description$37
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
var $$splitComponentImporter$38 = () => import("./exam-simulator-CqfLoVLz.mjs");
var title$26 = "محاكي الامتحان | أكاديميا";
var Route$38 = createFileRoute("/_authenticated/exam-simulator")({
	head: () => ({ meta: [
		{ title: title$26 },
		{
			name: "description",
			content: description$38
		},
		{
			property: "og:title",
			content: title$26
		},
		{
			property: "og:description",
			content: description$38
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
var $$splitComponentImporter$37 = () => import("./flashcards-BKP93HQE.mjs");
var title$25 = "البطاقات | أكاديميا";
var Route$37 = createFileRoute("/_authenticated/flashcards")({
	head: () => ({ meta: [
		{ title: title$25 },
		{
			name: "description",
			content: description$39
		},
		{
			property: "og:title",
			content: title$25
		},
		{
			property: "og:description",
			content: description$39
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
var $$splitComponentImporter$36 = () => import("./library-DbPaPHoB.mjs");
var title$24 = "المكتبة | أكاديميا";
var Route$36 = createFileRoute("/_authenticated/library")({
	head: () => ({ meta: [
		{ title: title$24 },
		{
			name: "description",
			content: description$40
		},
		{
			property: "og:title",
			content: title$24
		},
		{
			property: "og:description",
			content: description$40
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
var $$splitComponentImporter$35 = () => import("./mistakes-bank-10rIRhjg.mjs");
var title$23 = "بنك الأخطاء | أكاديميا";
var Route$35 = createFileRoute("/_authenticated/mistakes-bank")({
	head: () => ({ meta: [
		{ title: title$23 },
		{
			name: "description",
			content: description$41
		},
		{
			property: "og:title",
			content: title$23
		},
		{
			property: "og:description",
			content: description$41
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
var $$splitComponentImporter$34 = () => import("./my-certificates-Cp_rvYNl.mjs");
var title$22 = "شهاداتي | أكاديميا";
var Route$34 = createFileRoute("/_authenticated/my-certificates")({
	head: () => ({ meta: [
		{ title: title$22 },
		{
			name: "description",
			content: description$42
		},
		{
			property: "og:title",
			content: title$22
		},
		{
			property: "og:description",
			content: description$42
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
var $$splitComponentImporter$33 = () => import("./my-courses-BdXXlaqi.mjs");
var title$21 = "كورساتي | أكاديميا";
var Route$33 = createFileRoute("/_authenticated/my-courses")({
	head: () => ({ meta: [
		{ title: title$21 },
		{
			name: "description",
			content: description$43
		},
		{
			property: "og:title",
			content: title$21
		},
		{
			property: "og:description",
			content: description$43
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
var $$splitComponentImporter$32 = () => import("./notifications-C20FFhmL.mjs");
var Route$32 = createFileRoute("/_authenticated/notifications")({
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
	component: lazyRouteComponent($$splitComponentImporter$32, "component")
});
var $$splitComponentImporter$31 = () => import("./referrals-CoXIK280.mjs");
var title$20 = "الإحالات | أكاديميا";
var description$20 = "ادعُ أصدقاءك برابطك الخاص، وتابع كم صديق سجّل فعلياً ومكافآتك.";
var Route$31 = createFileRoute("/_authenticated/referrals")({
	head: () => ({ meta: [
		{ title: title$20 },
		{
			name: "description",
			content: description$20
		},
		{
			property: "og:title",
			content: title$20
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
	component: lazyRouteComponent($$splitComponentImporter$31, "component")
});
var $$splitComponentImporter$30 = () => import("./schedule-DxiL6vb4.mjs");
var title$19 = "الجدول | أكاديميا";
var description$19 = "جدول دراسي يذكّرك: حصص، واجبات، امتحانات، وجلسات مراجعة.";
var Route$30 = createFileRoute("/_authenticated/schedule")({
	head: () => ({ meta: [
		{ title: title$19 },
		{
			name: "description",
			content: description$19
		},
		{
			property: "og:title",
			content: title$19
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
	component: lazyRouteComponent($$splitComponentImporter$30, "component")
});
var $$splitComponentImporter$29 = () => import("./settings-4M142JUN.mjs");
var Route$29 = createFileRoute("/_authenticated/settings")({
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
	component: lazyRouteComponent($$splitComponentImporter$29, "component")
});
var $$splitComponentImporter$28 = () => import("./system-modules-CYadL3OY.mjs");
var Route$28 = createFileRoute("/_authenticated/system-modules")({
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
	component: lazyRouteComponent($$splitComponentImporter$28, "component")
});
var $$splitComponentImporter$27 = () => import("./teacher.register-DjSd9FOY.mjs");
var title$18 = "تسجيل معلّم | أكاديميا";
var description$18 = "سجّل كمعلّم في أكاديميا وارفع وثيقة التوثيق لمراجعة فريق الإشراف.";
var Route$27 = createFileRoute("/teacher/register")({
	ssr: false,
	beforeLoad: async () => {
		if (await currentUserHome()) throw redirect({ to: "/" });
	},
	head: () => ({ meta: [
		{ title: title$18 },
		{
			name: "description",
			content: description$18
		},
		{
			property: "og:title",
			content: title$18
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
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$27, "component")
});
var $$splitComponentImporter$26 = () => import("./admin.community-reports-DHgx-8fz.mjs");
var Route$26 = createFileRoute("/_authenticated/admin/community-reports")({
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
	component: lazyRouteComponent($$splitComponentImporter$26, "component")
});
var $$splitComponentImporter$25 = () => import("./admin.content-review-B47XI8c2.mjs");
var Route$25 = createFileRoute("/_authenticated/admin/content-review")({
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
	component: lazyRouteComponent($$splitComponentImporter$25, "component")
});
var $$splitComponentImporter$24 = () => import("./admin.curriculum-D5MrqUf0.mjs");
var Route$24 = createFileRoute("/_authenticated/admin/curriculum")({
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
	component: lazyRouteComponent($$splitComponentImporter$24, "component")
});
var $$splitComponentImporter$23 = () => import("./admin.curriculum-requests-KDznf6l7.mjs");
var Route$23 = createFileRoute("/_authenticated/admin/curriculum-requests")({
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
	component: lazyRouteComponent($$splitComponentImporter$23, "component")
});
var $$splitComponentImporter$22 = () => import("./admin.dashboard-DKB87-dl.mjs");
var Route$22 = createFileRoute("/_authenticated/admin/dashboard")({
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
	component: lazyRouteComponent($$splitComponentImporter$22, "component")
});
var $$splitComponentImporter$21 = () => import("./admin.payments-CN4uoHR5.mjs");
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
var $$splitComponentImporter$20 = () => import("./admin.permissions-N0pd_Aun.mjs");
var title$17 = "مصفوفة الصلاحيات | Academia";
var description$17 = "اختر نوع المستخدم لتحرير شجرة صلاحياته في Academia.";
var Route$20 = createFileRoute("/_authenticated/admin/permissions")({
	head: () => ({ meta: [
		{ title: title$17 },
		{
			name: "description",
			content: description$17
		},
		{
			property: "og:title",
			content: "مصفوفة الصلاحيات"
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
	component: lazyRouteComponent($$splitComponentImporter$20, "component")
});
var $$splitComponentImporter$19 = () => import("./admin.roles-C_ZgRK2A.mjs");
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
var $$splitComponentImporter$18 = () => import("./admin.teachers-DTAoE5wo.mjs");
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
var $$splitComponentImporter$17 = () => import("./admin.users-Bs70ewx_.mjs");
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
var $$splitComponentImporter$16 = () => import("./parent.report-BbfEfqAU.mjs");
var title$16 = "تقرير الابن | أكاديميا";
var description$16 = "تقرير أسبوعي واضح: التزام، إتقان، ومواطن الضعف — بدون أرقام مضلّلة.";
var Route$16 = createFileRoute("/_authenticated/parent/report")({
	head: () => ({ meta: [
		{ title: title$16 },
		{
			name: "description",
			content: description$16
		},
		{
			property: "og:title",
			content: title$16
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
	component: lazyRouteComponent($$splitComponentImporter$16, "component")
});
var $$splitComponentImporter$15 = () => import("./parent.settings-D3qYOFE_.mjs");
var title$15 = "إعدادات ولي الأمر | أكاديميا";
var description$15 = "الأبناء المرتبطون بحسابك، فك الربط، وتفضيلات الإشعارات والتقارير.";
var Route$15 = createFileRoute("/_authenticated/parent/settings")({
	head: () => ({ meta: [
		{ title: title$15 },
		{
			name: "description",
			content: description$15
		},
		{
			property: "og:title",
			content: title$15
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
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var $$splitComponentImporter$14 = () => import("./supervisor.dashboard-BpCDRRdH.mjs");
var title$14 = "لوحة الإشراف | أكاديميا";
var description$14 = "جودة التعليم عبر المعلمين والصفوف: تنبيهات، متابعات، ومؤشرات إتقان.";
var Route$14 = createFileRoute("/_authenticated/supervisor/dashboard")({
	head: () => ({ meta: [
		{ title: title$14 },
		{
			name: "description",
			content: description$14
		},
		{
			property: "og:title",
			content: title$14
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
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./supervisor.reports-CTVuT-gP.mjs");
var title$13 = "تقارير الإشراف | أكاديميا";
var description$13 = "تقارير دورية جاهزة للتصدير: جودة التدريس، الإتقان، والالتزام.";
var Route$13 = createFileRoute("/_authenticated/supervisor/reports")({
	head: () => ({ meta: [
		{ title: title$13 },
		{
			name: "description",
			content: description$13
		},
		{
			property: "og:title",
			content: title$13
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
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./supervisor.students-overview-BGKrcCA4.mjs");
var title$12 = "نظرة الطلاب | أكاديميا";
var description$12 = "الطلاب المتعثّرون أولاً: من يحتاج تدخّلاً الآن ولماذا.";
var Route$12 = createFileRoute("/_authenticated/supervisor/students-overview")({
	head: () => ({ meta: [
		{ title: title$12 },
		{
			name: "description",
			content: description$12
		},
		{
			property: "og:title",
			content: title$12
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
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./supervisor.teachers-C3bW61YA.mjs");
var title$11 = "المعلمون | أكاديميا";
var description$11 = "أداء كل معلم: سرعة الرد، زمن التصحيح، وإتقان طلابه.";
var Route$11 = createFileRoute("/_authenticated/supervisor/teachers")({
	head: () => ({ meta: [
		{ title: title$11 },
		{
			name: "description",
			content: description$11
		},
		{
			property: "og:title",
			content: title$11
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
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./teacher.analytics-BOox5LCA.mjs");
var title$10 = "التحليلات | أكاديميا";
var description$10 = "أين يتعثّر طلابك بالضبط: أسئلة يخطئ فيها الأكثر، وإتقان كل وحدة.";
var Route$10 = createFileRoute("/_authenticated/teacher/analytics")({
	head: () => ({ meta: [
		{ title: title$10 },
		{
			name: "description",
			content: description$10
		},
		{
			property: "og:title",
			content: title$10
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
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./teacher.community-wyht0L8A.mjs");
var title$9 = "مجتمع الصف | أكاديميا";
var description$9 = "أسئلة طلابك في مكان واحد؛ إجابتك تُميّز كـ«إجابة معلم» تلقائياً.";
var Route$9 = createFileRoute("/_authenticated/teacher/community")({
	head: () => ({ meta: [
		{ title: title$9 },
		{
			name: "description",
			content: description$9
		},
		{
			property: "og:title",
			content: title$9
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
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./teacher.content-8X9eTRo1.mjs");
var title$8 = "المحتوى | أكاديميا";
var description$8 = "دروسك وملفاتك: ارفع، رتّب على شجرة المنهاج، وأرسل للمراجعة قبل النشر.";
var Route$8 = createFileRoute("/_authenticated/teacher/content")({
	head: () => ({ meta: [
		{ title: title$8 },
		{
			name: "description",
			content: description$8
		},
		{
			property: "og:title",
			content: title$8
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
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./teacher.courses-BjIGwOVB.mjs");
var title$7 = "كورساتي (معلم) | أكاديميا";
var description$7 = "كورساتك المنشورة: الأسعار، المشتركون، والحصص القادمة.";
var Route$7 = createFileRoute("/_authenticated/teacher/courses")({
	head: () => ({ meta: [
		{ title: title$7 },
		{
			name: "description",
			content: description$7
		},
		{
			property: "og:title",
			content: title$7
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
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./teacher.dashboard-C-VJvTep.mjs");
var title$6 = "لوحة المعلم | أكاديميا";
var description$6 = "صفوفك اليوم: ما يحتاج تصحيحاً، أسئلة تنتظر جوابك، وأداء طلابك.";
var Route$6 = createFileRoute("/_authenticated/teacher/dashboard")({
	head: () => ({ meta: [
		{ title: title$6 },
		{
			name: "description",
			content: description$6
		},
		{
			property: "og:title",
			content: title$6
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
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./teacher.earnings-ov3O_SsS.mjs");
var title$5 = "الأرباح | أكاديميا";
var description$5 = "أرباحك، عمولة المنصة، وطلبات السحب — كل شي واضح بلا مفاجآت.";
var Route$5 = createFileRoute("/_authenticated/teacher/earnings")({
	head: () => ({ meta: [
		{ title: title$5 },
		{
			name: "description",
			content: description$5
		},
		{
			property: "og:title",
			content: title$5
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
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./teacher.grading-nzvLo6ru.mjs");
var title$4 = "التصحيح | أكاديميا";
var description$4 = "قائمة التصحيح: الأسئلة المقالية والملفات المرفوعة، مع ملاحظات لكل طالب.";
var Route$4 = createFileRoute("/_authenticated/teacher/grading")({
	head: () => ({ meta: [
		{ title: title$4 },
		{
			name: "description",
			content: description$4
		},
		{
			property: "og:title",
			content: title$4
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
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./teacher.quizzes-CSEIl7wT.mjs");
var title$3 = "الاختبارات | أكاديميا";
var description$3 = "بنك أسئلتك واختباراتك: اختيار متعدد، صح/خطأ، ومقالي — مع تصحيح آلي حيث ينفع.";
var Route$3 = createFileRoute("/_authenticated/teacher/quizzes")({
	head: () => ({ meta: [
		{ title: title$3 },
		{
			name: "description",
			content: description$3
		},
		{
			property: "og:title",
			content: title$3
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
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./teacher.settings-8eXYHDfr.mjs");
var title$2 = "إعدادات المعلم | أكاديميا";
var description$2 = "التسعير، أوقات التوفّر، بيانات الدفع، وتفضيلات الإشعارات.";
var Route$2 = createFileRoute("/_authenticated/teacher/settings")({
	head: () => ({ meta: [
		{ title: title$2 },
		{
			name: "description",
			content: description$2
		},
		{
			property: "og:title",
			content: title$2
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
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./library.lesson._id-ChpkiHex.mjs");
var title$1 = "صفحة الدرس | أكاديميا";
var description$1 = "الدرس: ملف مرتّب + أسئلة تفاعلية + بطاقات مراجعة + إضافة أخطائك إلى بنك الأخطاء.";
var Route$1 = createFileRoute("/_authenticated/library/lesson/$id")({
	head: () => ({ meta: [
		{ title: title$1 },
		{
			name: "description",
			content: description$1
		},
		{
			property: "og:title",
			content: title$1
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
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./teacher.profile.edit-cdRJXPSj.mjs");
var title = "ملفي العام | أكاديميا";
var description = "هذا ما يراه الطلاب وأولياء الأمور: نبذتك، موادك، وشهاداتك الموثّقة.";
var Route = createFileRoute("/_authenticated/teacher/profile/edit")({
	head: () => ({ meta: [
		{ title },
		{
			name: "description",
			content: description
		},
		{
			property: "og:title",
			content: title
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
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$60.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$61
});
var R403Route = Route$59.update({
	id: "/403",
	path: "/403",
	getParentRoute: () => Route$61
});
var AuthenticatedRouteRoute = Route$58.update({
	id: "/_authenticated",
	getParentRoute: () => Route$61
});
var AboutRoute = Route$57.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$61
});
var BlogRoute = Route$56.update({
	id: "/blog",
	path: "/blog",
	getParentRoute: () => Route$61
});
var ContactRoute = Route$55.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route$61
});
var CoursesRoute = Route$54.update({
	id: "/courses",
	path: "/courses",
	getParentRoute: () => Route$61
});
var ForTeachersRoute = Route$53.update({
	id: "/for-teachers",
	path: "/for-teachers",
	getParentRoute: () => Route$61
});
var ForgotPasswordRoute = Route$52.update({
	id: "/forgot-password",
	path: "/forgot-password",
	getParentRoute: () => Route$61
});
var HelpRoute = Route$51.update({
	id: "/help",
	path: "/help",
	getParentRoute: () => Route$61
});
var HowItWorksRoute = Route$50.update({
	id: "/how-it-works",
	path: "/how-it-works",
	getParentRoute: () => Route$61
});
var LoginRoute = Route$49.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$61
});
var PricingRoute = Route$48.update({
	id: "/pricing",
	path: "/pricing",
	getParentRoute: () => Route$61
});
var PrivacyRoute = Route$47.update({
	id: "/privacy",
	path: "/privacy",
	getParentRoute: () => Route$61
});
var ResetPasswordRoute = Route$46.update({
	id: "/reset-password",
	path: "/reset-password",
	getParentRoute: () => Route$61
});
var SignupRoute = Route$45.update({
	id: "/signup",
	path: "/signup",
	getParentRoute: () => Route$61
});
var TermsRoute = Route$44.update({
	id: "/terms",
	path: "/terms",
	getParentRoute: () => Route$61
});
var UnsubscribeRoute = Route$43.update({
	id: "/unsubscribe",
	path: "/unsubscribe",
	getParentRoute: () => Route$61
});
var VerifyEmailRoute = Route$66.update({
	id: "/verify-email",
	path: "/verify-email",
	getParentRoute: () => Route$61
});
var AuthenticatedAchievementsRoute = Route$42.update({
	id: "/achievements",
	path: "/achievements",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedBookmarksRoute = Route$41.update({
	id: "/bookmarks",
	path: "/bookmarks",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedCommunityRoute = Route$40.update({
	id: "/community",
	path: "/community",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedDashboardRoute = Route$39.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedExamSimulatorRoute = Route$38.update({
	id: "/exam-simulator",
	path: "/exam-simulator",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedFlashcardsRoute = Route$37.update({
	id: "/flashcards",
	path: "/flashcards",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedLibraryRoute = Route$36.update({
	id: "/library",
	path: "/library",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedMistakesBankRoute = Route$35.update({
	id: "/mistakes-bank",
	path: "/mistakes-bank",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedMyCertificatesRoute = Route$34.update({
	id: "/my-certificates",
	path: "/my-certificates",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedMyCoursesRoute = Route$33.update({
	id: "/my-courses",
	path: "/my-courses",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedNotificationsRoute = Route$32.update({
	id: "/notifications",
	path: "/notifications",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedReferralsRoute = Route$31.update({
	id: "/referrals",
	path: "/referrals",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedScheduleRoute = Route$30.update({
	id: "/schedule",
	path: "/schedule",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedSettingsRoute = Route$29.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedSystemModulesRoute = Route$28.update({
	id: "/system-modules",
	path: "/system-modules",
	getParentRoute: () => AuthenticatedRouteRoute
});
var BlogSlugRoute = Route$62.update({
	id: "/$slug",
	path: "/$slug",
	getParentRoute: () => BlogRoute
});
var CertificateIdRoute = Route$63.update({
	id: "/certificate/$id",
	path: "/certificate/$id",
	getParentRoute: () => Route$61
});
var InviteCodeRoute = Route$64.update({
	id: "/invite/$code",
	path: "/invite/$code",
	getParentRoute: () => Route$61
});
var TeacherIdRoute = Route$67.update({
	id: "/teacher/$id",
	path: "/teacher/$id",
	getParentRoute: () => Route$61
});
var TeacherRegisterRoute = Route$27.update({
	id: "/teacher/register",
	path: "/teacher/register",
	getParentRoute: () => Route$61
});
var AuthenticatedAdminCommunityReportsRoute = Route$26.update({
	id: "/admin/community-reports",
	path: "/admin/community-reports",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAdminContentReviewRoute = Route$25.update({
	id: "/admin/content-review",
	path: "/admin/content-review",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAdminCurriculumRoute = Route$24.update({
	id: "/admin/curriculum",
	path: "/admin/curriculum",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAdminCurriculumRequestsRoute = Route$23.update({
	id: "/admin/curriculum-requests",
	path: "/admin/curriculum-requests",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAdminDashboardRoute = Route$22.update({
	id: "/admin/dashboard",
	path: "/admin/dashboard",
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
var AuthenticatedRolePermissionsRoleIdRoute = Route$65.update({
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
	AuthenticatedAdminContentReviewRoute,
	AuthenticatedAdminCurriculumRoute,
	AuthenticatedAdminCurriculumRequestsRoute,
	AuthenticatedAdminDashboardRoute,
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
var routeTree = Route$61._addFileChildren(rootRouteChildren)._addFileTypes();
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
