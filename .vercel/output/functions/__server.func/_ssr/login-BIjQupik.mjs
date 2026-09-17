import { i as __toESM } from "../_runtime.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
import { t as env } from "./ssr.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { A as useBi, E as roleHome, b as login, h as getStoredProfile, l as USERS, p as getErrorMessage, x as loginAsDemo } from "./rbac-static-data-DgiM51a_.mjs";
import { n as useTranslation } from "../_libs/react-i18next.mjs";
import { b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { Z as LogIn } from "../_libs/lucide-react.mjs";
import { L as identifyUser, R as trackEvent } from "./router-D9kxMA2z.mjs";
import { t as Button } from "./button-DfTXnEII.mjs";
import { n as AuthShell, t as AuthField } from "./auth-shell-pi4p_yV1.mjs";
import { t as setMonitoringUser } from "./monitoring-CM_o1ZBz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-BIjQupik.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DEMO_USERS = USERS.filter((u) => u.id !== "u-admin");
var demoEnabled = env.ENABLE_DEMO_LOGIN;
var schema = objectType({
	email: stringType().trim().email(),
	password: stringType().min(6)
});
function LoginPage() {
	const { t } = useTranslation();
	const bi = useBi();
	const navigate = useNavigate();
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [errors, setErrors] = (0, import_react.useState)({});
	const [serverError, setServerError] = (0, import_react.useState)(null);
	function quickLogin(userId) {
		const user = USERS.find((u) => u.id === userId);
		loginAsDemo(userId);
		toast.success(t("authPages.login.success"));
		navigate({
			href: roleHome(user?.role_name, user?.role_id === "r-admin"),
			replace: true
		});
	}
	async function submit(e) {
		e.preventDefault();
		setErrors({});
		setServerError(null);
		const parsed = schema.safeParse({
			email,
			password
		});
		if (!parsed.success) {
			const nextErrors = {};
			for (const issue of parsed.error.issues) {
				const field = issue.path[0];
				if ((field === "email" || field === "password") && !nextErrors[field]) nextErrors[field] = issue.message;
			}
			setErrors(nextErrors);
			toast.error(bi("راجع الحقول المظللة", "Check the highlighted fields"));
			return;
		}
		setLoading(true);
		trackEvent("login_attempt");
		try {
			await login(parsed.data.email, parsed.data.password);
			const profile = getStoredProfile();
			if (profile) {
				identifyUser(profile.id, { roleName: profile.roleName });
				setMonitoringUser({
					id: profile.id,
					email: profile.email
				});
			}
			trackEvent("login_success", { roleId: profile?.roleId ?? null });
			if (profile && profile.roleId == null) toast.warning(bi("تم الدخول، لكن تعذّر تحديد نوع حسابك بدقة — إذا انتقلت لمساحة غير متوقعة تواصل مع الدعم.", "You're signed in, but we couldn't determine your account type precisely — if you land in an unexpected space, contact support."));
			toast.success(t("authPages.login.success"));
			navigate({
				href: roleHome(profile?.roleName ?? null, profile?.roleId === 1),
				replace: true
			});
		} catch (err) {
			const message = getErrorMessage(err, bi("تعذّر تسجيل الدخول", "Sign in failed"));
			trackEvent("login_failed", { message });
			setServerError(message);
		} finally {
			setLoading(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthShell, {
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogIn, { className: "size-5" }),
		title: t("authPages.login.h1"),
		subtitle: t("authPages.login.sub"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: submit,
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthField, {
						id: "email",
						label: t("authPages.login.email"),
						type: "email",
						value: email,
						onChange: setEmail,
						autoComplete: "email",
						error: errors.email
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthField, {
						id: "password",
						label: t("authPages.login.password"),
						type: "password",
						value: password,
						onChange: setPassword,
						autoComplete: "current-password",
						error: errors.password
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex justify-end",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/forgot-password",
							className: "text-xs font-semibold text-primary hover:underline",
							children: t("authPages.login.forgot")
						})
					}),
					serverError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						role: "alert",
						className: "rounded-xl border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm font-semibold text-destructive",
						children: serverError
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						loading,
						className: "w-full",
						children: t("authPages.login.submit")
					})
				]
			}),
			demoEnabled && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 rounded-2xl border border-dashed border-border bg-secondary/40 p-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-2 text-center text-xs font-bold text-muted-foreground",
					children: bi("دخول سريع للتجربة (محلي بالكامل — مؤقت)", "Quick test login (fully local — temporary)")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						disabled: loading,
						onClick: () => quickLogin("u-admin"),
						className: "rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-bold text-foreground transition-colors hover:border-primary/60 hover:text-primary disabled:opacity-60",
						children: bi("أدمن", "Admin")
					}), DEMO_USERS.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						disabled: loading,
						onClick: () => quickLogin(u.id),
						className: "rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-bold text-foreground transition-colors hover:border-primary/60 hover:text-primary disabled:opacity-60",
						children: u.role_name
					}, u.id))]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 space-y-1.5 text-center text-xs text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					t("authPages.login.noAccount"),
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/signup",
						className: "font-bold text-primary hover:underline",
						children: t("authPages.login.signupLink")
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					t("authPages.login.teacherHint"),
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/teacher/register",
						className: "font-bold text-primary hover:underline",
						children: t("authPages.login.teacherLink")
					})
				] })]
			})
		]
	});
}
//#endregion
export { LoginPage as component };
