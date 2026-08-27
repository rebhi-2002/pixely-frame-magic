import { i as __toESM } from "../_runtime.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as useTranslation } from "../_libs/react-i18next.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
import { J as GraduationCap, i as UserRound, r as Users, ut as Check, yt as ArrowLeft } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as AuthShell, t as AuthField } from "./auth-shell-BnVDkM18.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/signup-DupQ7lPv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var schema = objectType({
	fullName: stringType().trim().min(2),
	email: stringType().trim().email(),
	password: stringType().min(6)
});
function SignupPage() {
	const { t } = useTranslation();
	useNavigate();
	const [role, setRole] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [fullName, setFullName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	async function submit(e) {
		e.preventDefault();
		const parsed = schema.safeParse({
			fullName,
			email,
			password
		});
		if (!parsed.success) {
			toast.error(parsed.error.issues[0].message);
			return;
		}
		setLoading(true);
		try {
			throw new Error("إنشاء حساب جديد غير متاح حالياً — قيد الربط مع الباك اند الجديد.");
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "…");
		} finally {
			setLoading(false);
		}
	}
	if (!role) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthShell, {
		title: t("authPages.signup.h1"),
		subtitle: t("authPages.signup.sub"),
		wide: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoleCard, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "size-5" }),
					title: t("authPages.signup.roles.student.t"),
					text: t("authPages.signup.roles.student.d"),
					onClick: () => setRole("student")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoleCard, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-5" }),
					title: t("authPages.signup.roles.parent.t"),
					text: t("authPages.signup.roles.parent.d"),
					onClick: () => setRole("parent")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/teacher/register",
					className: "flex items-start gap-3 rounded-2xl border border-border bg-background p-4 text-start transition-colors hover:border-primary/50",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex size-10 shrink-0 items-center justify-center rounded-xl bg-info/12 text-info",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, { className: "size-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block font-bold text-foreground",
							children: t("authPages.signup.roles.teacher.t")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-1 block text-sm text-muted-foreground",
							children: t("authPages.signup.roles.teacher.d")
						})]
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-6 text-center text-xs text-muted-foreground",
			children: [
				t("authPages.signup.haveAccount"),
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/login",
					className: "font-bold text-primary hover:underline",
					children: t("authPages.signup.loginLink")
				})
			]
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthShell, {
		icon: role === "student" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-5" }),
		title: t("authPages.signup.h1"),
		subtitle: `${t("authPages.signup.chosen")}: ${t(`authPages.signup.roles.${role}.t`)}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => setRole(null),
				className: "mb-5 inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-3.5 rtl:rotate-180" }), t("authPages.signup.change")]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: submit,
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthField, {
						id: "name",
						label: t("authPages.signup.fullName"),
						value: fullName,
						onChange: setFullName,
						autoComplete: "name"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthField, {
						id: "email",
						label: t("authPages.signup.email"),
						type: "email",
						value: email,
						onChange: setEmail,
						autoComplete: "email"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthField, {
						id: "password",
						label: t("authPages.signup.password"),
						type: "password",
						value: password,
						onChange: setPassword,
						autoComplete: "new-password",
						hint: t("authPages.signup.passwordHint")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						disabled: loading,
						className: "w-full rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60",
						children: loading ? t("common.loading") : t("authPages.signup.submit")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-center text-xs text-muted-foreground",
						children: t("authPages.signup.terms")
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 space-y-1.5 text-center text-xs text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					t("authPages.signup.teacherHint"),
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/teacher/register",
						className: "font-bold text-primary hover:underline",
						children: t("authPages.signup.teacherLink")
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					t("authPages.signup.haveAccount"),
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/login",
						className: "font-bold text-primary hover:underline",
						children: t("authPages.signup.loginLink")
					})
				] })]
			})
		]
	});
}
function RoleCard({ icon, title, text, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		className: "group flex items-start gap-3 rounded-2xl border border-border bg-background p-4 text-start transition-colors hover:border-primary/50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-primary",
				children: icon
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block font-bold text-foreground",
					children: title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mt-1 block text-sm text-muted-foreground",
					children: text
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mt-1 size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" })
		]
	});
}
//#endregion
export { SignupPage as component };
