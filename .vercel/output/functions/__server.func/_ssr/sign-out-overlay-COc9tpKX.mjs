import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { S as logout } from "./rbac-static-data-DgiM51a_.mjs";
import { n as useTranslation } from "../_libs/react-i18next.mjs";
import { b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { i as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { R as trackEvent } from "./router-D9kxMA2z.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/sign-out-overlay-COc9tpKX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* خروج موحّد مع تغذية بصرية: إلغاء الاستعلامات ← تفريغ الكاش ← إنهاء الجلسة ←
* تنقّل. `pending` يُستخدم لعرض <SignOutOverlay /> أثناء العملية.
*/
function useSignOut(to = "/") {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const [pending, setPending] = (0, import_react.useState)(false);
	return {
		signOut: (0, import_react.useCallback)(async () => {
			if (pending) return;
			setPending(true);
			try {
				await queryClient.cancelQueries();
				queryClient.clear();
				await logout();
				trackEvent("logout");
				navigate({
					to,
					replace: true
				});
			} finally {
				window.setTimeout(() => setPending(false), 400);
			}
		}, [
			navigate,
			pending,
			queryClient,
			to
		]),
		pending
	};
}
/**
* علامة Academia — قبعة تخرج فوق جبل/حرف A (الشعار المعتمد، راجع
* docs/design/brand-guidelines.md). هاي هي الصورة الرسمية الأصلية نفسها
* (public/brand/logo-mark.png) مش رسمة SVG معاد بناؤها — عشان تطلع مطابقة
* 100% للهوية البصرية المعتمدة بألوانها وتدرّجها الذهبي الأصلي بالضبط.
*
* ليش <img> مش SVG بـ currentColor متل الشعار القديم؟ لأن هالشعار قرار
* تصميم بتدرّج ذهبي ثابت (راجع لوحة الهوية) — بيبقى نفسه بالضبط بالوضع
* الغامق والفاتح عمداً (الذهبي واضح على الاثنين)، عكس الشعار القديم يلي كان
* لونه الواحد يتغيّر مع الثيم. النص المرافق (Academia بـBrandLockup) هو
* يلي بيتغيّر لونه مع الثيم (`text-foreground`)، مش الأيقونة.
*
* الملف الأصلي بدقة كافية (320×299px) تغطي أي حجم عرض واقعي بالتطبيق
* (هيدر/سايدبار حتى ~110px على شاشات retina) بدون تكبير يسبب تبكسل —
* المتصفح بيصغّرها بس (downscale)، وهاي عملية آمنة بصرياً دائماً.
*/
function BrandLogo({ className = "size-9" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: "/brand/logo-mark.png",
		alt: "",
		className: `${className} object-contain`
	});
}
/** العلامة + الاسم الرسمي الثابت.
*  الأيقونة بتاخد كامل مساحة صندوقها بأي حجم (بدون تجاوز حدوده) — هيك
*  بتضمن نفس النسبة البصرية بالضبط عبر كل breakpoints، فما بترجع تكبر
*  بشاشة وتصغر بشاشة تانية بشكل غير متوقّع. */
function BrandLockup({ className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: `group inline-flex items-center gap-3 ${className}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "grid size-10 shrink-0 place-items-center rounded-xl bg-primary/12 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105 lg:size-9",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandLogo, { className: "size-7 lg:size-6" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-display text-lg font-extrabold text-foreground",
			children: "Academia"
		})]
	});
}
/** طبقة انتقال ناعمة تُعرض أثناء تسجيل الخروج. */
function SignOutOverlay({ pending }) {
	const { t } = useTranslation();
	if (!pending) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		role: "status",
		"aria-live": "polite",
		className: "animate-in fade-in fixed inset-0 z-[90] flex flex-col items-center justify-center gap-4 bg-background/80 backdrop-blur-sm duration-200",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "relative grid size-14 place-items-center rounded-2xl bg-primary/12 text-primary",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandLogo, { className: "size-11 animate-pulse" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex items-center gap-2 text-sm font-semibold text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-4 animate-spin rounded-full border-2 border-primary/30 border-t-primary" }), t("common.signingOut")]
		})]
	});
}
//#endregion
export { SignOutOverlay as n, useSignOut as r, BrandLockup as t };
