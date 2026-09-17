import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { A as useBi } from "./rbac-static-data-DgiM51a_.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { Mt as Check, n as X } from "../_libs/lucide-react.mjs";
import { t as Reveal } from "./reveal-LUGiBW7K.mjs";
import { t as DynamicIcon } from "./dynamic-icon-Cf94UsPA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/onboarding-checklist-CwG01ZsZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STEPS_BY_ROLE = {
	student: [
		{
			id: "explore-library",
			title: "استكشف مكتبتك",
			titleEn: "Explore your library",
			href: "/library",
			icon: "Library"
		},
		{
			id: "top-up-wallet",
			title: "اشحن رصيد محفظتك",
			titleEn: "Top up your wallet",
			href: "/wallet",
			icon: "Wallet"
		},
		{
			id: "set-schedule",
			title: "جهّز جدولك الدراسي",
			titleEn: "Set up your study schedule",
			href: "/schedule",
			icon: "Calendar"
		}
	],
	teacher: [
		{
			id: "add-course",
			title: "أضف أول كورس إلك",
			titleEn: "Add your first course",
			href: "/teacher/courses",
			icon: "BookOpen"
		},
		{
			id: "check-analytics",
			title: "استعرض لوحة الأداء",
			titleEn: "Check your performance dashboard",
			href: "/teacher/analytics",
			icon: "BarChart3"
		},
		{
			id: "edit-profile",
			title: "جهّز ملفك المهني",
			titleEn: "Set up your professional profile",
			href: "/teacher/profile/edit",
			icon: "UserCog"
		}
	]
};
function getOnboardingSteps(roleKey) {
	return STEPS_BY_ROLE[roleKey] ?? [];
}
function storageKey(userId) {
	return `academia.onboarding.${userId}`;
}
function readState(userId) {
	const empty = {
		enabled: false,
		dismissed: false,
		completedStepIds: []
	};
	if (typeof window === "undefined") return empty;
	try {
		const raw = localStorage.getItem(storageKey(userId));
		if (!raw) return empty;
		const parsed = JSON.parse(raw);
		return {
			enabled: parsed?.enabled === true,
			dismissed: parsed?.dismissed === true,
			completedStepIds: Array.isArray(parsed?.completedStepIds) ? parsed.completedStepIds : []
		};
	} catch {
		return empty;
	}
}
function writeState(userId, state) {
	if (typeof window === "undefined") return;
	localStorage.setItem(storageKey(userId), JSON.stringify(state));
}
function getCompletedStepIds(userId) {
	return readState(userId).completedStepIds;
}
/** بتقرر هل القائمة تظهر إطلاقًا لهالحساب — أول مرة بس عبر `justRegistered`
* (راجع wasJustRegistered بـauth.ts)، وبعدها القرار محفوظ دائمًا محليًا
* بغض النظر شو صار بجلسات لاحقة. لازم تُستدعى قبل isOnboardingVisible. */
function ensureOnboardingEnabled(userId, justRegistered) {
	const state = readState(userId);
	if (state.enabled || !justRegistered) return;
	writeState(userId, {
		...state,
		enabled: true
	});
}
function isOnboardingVisible(userId) {
	const state = readState(userId);
	return state.enabled && !state.dismissed;
}
function markStepVisited(userId, stepId) {
	const state = readState(userId);
	if (state.completedStepIds.includes(stepId)) return;
	writeState(userId, {
		...state,
		completedStepIds: [...state.completedStepIds, stepId]
	});
}
function dismissOnboarding(userId) {
	writeState(userId, {
		...readState(userId),
		dismissed: true
	});
}
/**
* قائمة "خطواتك الأولى" — بتظهر بس للحسابات يلي بلشت تسجيلها من بعد ما
* انبنت هالميزة (`showInitially`/`justRegistered` أول جلسة بتفعّلها
* بشكل دائم لهالحساب)، حتى ما يتفاجأ حساب قديم بقائمة onboarding فجأة.
* الطالب والمعلّم بس (ولي الأمر مستثنى — راجع onboarding.ts). "اشحن
* محفظتك" وحدها إنجازها حقيقي (رصيد فعلي > صفر)؛ الباقي "زرتها" بالنقر.
*/
function OnboardingChecklist({ userId, roleKey, showInitially, walletBalance }) {
	const bi = useBi();
	const steps = getOnboardingSteps(roleKey);
	const [completed, setCompleted] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const [visible, setVisible] = (0, import_react.useState)(false);
	const [hydrated, setHydrated] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		ensureOnboardingEnabled(userId, showInitially);
		const stored = new Set(getCompletedStepIds(userId));
		if (walletBalance != null && walletBalance > 0) stored.add("top-up-wallet");
		setCompleted(stored);
		setVisible(isOnboardingVisible(userId));
		setHydrated(true);
	}, [userId]);
	if (!hydrated || steps.length === 0 || !visible || completed.size >= steps.length) return null;
	function visit(stepId) {
		markStepVisited(userId, stepId);
		setCompleted((prev) => new Set(prev).add(stepId));
	}
	function dismiss() {
		dismissOnboarding(userId);
		setVisible(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "soft-glow rounded-2xl border border-primary/20 bg-card p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex items-start justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-base font-bold text-foreground",
				children: bi("خطواتك الأولى", "Your first steps")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-0.5 text-xs text-muted-foreground",
				children: bi(`أكملت ${completed.size} من ${steps.length}`, `${completed.size} of ${steps.length} done`)
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: dismiss,
				className: "tap-target inline-flex items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground",
				"aria-label": bi("إخفاء لاحقًا", "Dismiss for now"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "space-y-1.5",
			children: steps.map((step) => {
				const isDone = completed.has(step.id);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: step.href,
					onClick: () => visit(step.id),
					className: "hover-press flex items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 hover:border-border hover:bg-secondary/50",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `inline-flex size-8 shrink-0 items-center justify-center rounded-lg ${isDone ? "bg-success/15 text-success" : "bg-primary/10 text-primary"}`,
						children: isDone ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DynamicIcon, {
							name: step.icon,
							className: "size-4"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `text-sm font-semibold ${isDone ? "text-muted-foreground line-through" : "text-foreground"}`,
						children: bi(step.title, step.titleEn)
					})]
				}) }, step.id);
			})
		})]
	}) });
}
//#endregion
export { OnboardingChecklist as t };
