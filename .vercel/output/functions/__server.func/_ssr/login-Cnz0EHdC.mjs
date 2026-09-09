import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as useTranslation } from "../_libs/react-i18next.mjs";
import { b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as roleHome, b as login, f as getErrorMessage, k as useBi, l as USERS, m as getStoredProfile, x as loginAsDemo } from "./rbac-static-data-JRz-nJtL.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { q as LogIn } from "../_libs/lucide-react.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
import { t as Button } from "./button-Nx-_C_c8.mjs";
import { n as AuthShell, t as AuthField } from "./auth-shell-Dshw2uh0.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-Cnz0EHdC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DEMO_USERS = USERS.filter((u) => u.id !== "u-admin");
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
		try {
			await login(parsed.data.email, parsed.data.password);
			const profile = getStoredProfile();
			toast.success(t("authPages.login.success"));
			navigate({
				href: roleHome(profile?.roleName ?? null, profile?.roleId === 1),
				replace: true
			});
		} catch (err) {
			const message = getErrorMessage(err, bi("تعذّر تسجيل الدخول", "Sign in failed"));
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
