import { i as __toESM } from "../_runtime.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as useTranslation } from "../_libs/react-i18next.mjs";
import { s as stringType } from "../_libs/zod.mjs";
import { L as MailCheck, W as KeyRound } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as AuthShell, t as AuthField } from "./auth-shell-BnVDkM18.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/forgot-password-DGaxPjSs.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ForgotPasswordPage() {
	const { t } = useTranslation();
	const [email, setEmail] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [sent, setSent] = (0, import_react.useState)(false);
	async function submit(e) {
		e.preventDefault();
		const parsed = stringType().trim().email().safeParse(email);
		if (!parsed.success) {
			toast.error(parsed.error.issues[0].message);
			return;
		}
		setLoading(true);
		setLoading(false);
		toast.error("استعادة كلمة المرور غير متاحة حالياً — قيد الربط مع الباك اند الجديد.");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthShell, {
		icon: sent ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MailCheck, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "size-5" }),
		title: t("authPages.forgot.h1"),
		subtitle: sent ? t("authPages.forgot.sent") : t("authPages.forgot.sub"),
		children: [!sent && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: submit,
			className: "space-y-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthField, {
				id: "email",
				label: t("authPages.forgot.email"),
				type: "email",
				value: email,
				onChange: setEmail,
				autoComplete: "email"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "submit",
				disabled: loading,
				className: "w-full rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60",
				children: loading ? t("common.loading") : t("authPages.forgot.submit")
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-6 text-center text-xs text-muted-foreground",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/login",
				className: "font-bold text-primary hover:underline",
				children: t("authPages.forgot.back")
			})
		})]
	});
}
//#endregion
export { ForgotPasswordPage as component };
