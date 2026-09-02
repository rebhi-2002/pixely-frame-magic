import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as useTranslation } from "../_libs/react-i18next.mjs";
import { _ as Link, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { g as ShieldCheck } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as AuthShell, t as AuthField } from "./auth-shell-DBbXMZHD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reset-password-BDYnuwFC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ResetPasswordPage() {
	const { t } = useTranslation();
	useNavigate();
	const [ready, setReady] = (0, import_react.useState)(null);
	const [password, setPassword] = (0, import_react.useState)("");
	const [confirm, setConfirm] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setReady(false);
	}, []);
	async function submit(e) {
		e.preventDefault();
		if (password.length < 6) {
			toast.error(t("authPages.signup.passwordHint"));
			return;
		}
		if (password !== confirm) {
			toast.error(t("authPages.reset.mismatch"));
			return;
		}
		setLoading(true);
		setLoading(false);
		toast.error("إعادة تعيين كلمة المرور غير متاحة حالياً — قيد الربط مع الباك اند الجديد.");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthShell, {
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-5" }),
		title: t("authPages.reset.h1"),
		subtitle: ready === false ? t("authPages.reset.invalid") : t("authPages.reset.sub"),
		children: ready === false ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/forgot-password",
			className: "inline-flex w-full items-center justify-center rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90",
			children: t("authPages.reset.requestNew")
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: submit,
			className: "space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthField, {
					id: "password",
					label: t("authPages.reset.password"),
					type: "password",
					value: password,
					onChange: setPassword,
					autoComplete: "new-password"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthField, {
					id: "confirm",
					label: t("authPages.reset.confirm"),
					type: "password",
					value: confirm,
					onChange: setConfirm,
					autoComplete: "new-password"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					disabled: loading || ready === null,
					className: "w-full rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60",
					children: loading ? t("common.loading") : t("authPages.reset.submit")
				})
			]
		})
	});
}
//#endregion
export { ResetPasswordPage as component };
