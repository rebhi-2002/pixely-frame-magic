import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as useTranslation } from "../_libs/react-i18next.mjs";
import { b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { K as MailCheck } from "../_libs/lucide-react.mjs";
import { I as Route$54, z as currentUserHome } from "./router-ClmuBdEg.mjs";
import { s as stringType } from "../_libs/zod.mjs";
import { n as AuthShell, t as AuthField } from "./auth-shell-BlkBORy5.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/verify-email-IBFRJdJe.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function VerifyEmailPage() {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { email: initialEmail } = Route$54.useSearch();
	const [email, setEmail] = (0, import_react.useState)(initialEmail ?? "");
	const [verified, setVerified] = (0, import_react.useState)(false);
	const [loading, setLoading] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {}, [initialEmail]);
	async function resend() {
		const parsed = stringType().trim().email().safeParse(email);
		if (!parsed.success) {
			toast.error(parsed.error.issues[0].message);
			return;
		}
		setLoading(true);
		setLoading(false);
		toast.error("إعادة إرسال رابط التفعيل غير متاح حالياً — قيد الربط مع الباك اند الجديد.");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthShell, {
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MailCheck, { className: "size-5" }),
		title: t("authPages.verify.h1"),
		subtitle: verified ? t("authPages.verify.verified") : t("authPages.verify.sub"),
		children: [verified ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: async () => navigate({
				href: await currentUserHome() ?? "/dashboard",
				replace: true
			}),
			className: "inline-flex w-full items-center justify-center rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90",
			children: t("authPages.verify.goDashboard")
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthField, {
				id: "email",
				label: t("authPages.verify.emailPlaceholder"),
				type: "email",
				value: email,
				onChange: setEmail,
				autoComplete: "email"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: resend,
				disabled: loading,
				className: "w-full rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60",
				children: loading ? t("common.loading") : t("authPages.verify.resend")
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-6 text-center text-xs text-muted-foreground",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/login",
				className: "font-bold text-primary hover:underline",
				children: t("authPages.verify.back")
			})
		})]
	});
}
//#endregion
export { VerifyEmailPage as component };
