import { i as __toESM } from "../_runtime.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
import { t as env } from "./ssr.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { A as useBi, E as roleHome, T as register, h as getStoredProfile, p as getErrorMessage } from "./rbac-static-data-DgiM51a_.mjs";
import { n as useTranslation } from "../_libs/react-i18next.mjs";
import { b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { Mt as Check, Ut as ArrowLeft, i as Users, lt as GraduationCap, s as UserRound } from "../_libs/lucide-react.mjs";
import { L as identifyUser, R as trackEvent } from "./router-D4MhNWYA.mjs";
import { t as Button } from "./button-DfTXnEII.mjs";
import { n as FeatureStatus } from "./feedback-states-ZdZSGCTQ.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-CbSL31Oe.mjs";
import { r as loadBackendUserOptions } from "./admin-users-CjBbXoHb.mjs";
import { n as AuthShell, t as AuthField } from "./auth-shell-BZ9LmvdO.mjs";
import { t as setMonitoringUser } from "./monitoring-BZqkxtbK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/signup-DpVVULjU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var signupEnabled = env.ENABLE_SIGNUP;
var BACKEND_ROLE_NAME = {
	student: "الطالب",
	parent: "ولي الامر"
};
var schema = objectType({
	fullName: stringType().trim().min(2),
	email: stringType().trim().email(),
	phoneNumber: stringType().trim().min(7),
	password: stringType().min(6)
});
function SignupPage() {
	const { t } = useTranslation();
	const bi = useBi();
	const navigate = useNavigate();
	const [role, setRole] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [fullName, setFullName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [phoneNumber, setPhoneNumber] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [confirmPassword, setConfirmPassword] = (0, import_react.useState)("");
	const [genderId, setGenderId] = (0, import_react.useState)(null);
	const { data: options } = useQuery({
		queryKey: ["signup-options"],
		queryFn: loadBackendUserOptions,
		enabled: signupEnabled
	});
	async function submit(e) {
		e.preventDefault();
		const parsed = schema.safeParse({
			fullName,
			email,
			phoneNumber,
			password
		});
		if (!parsed.success) {
			toast.error(parsed.error.issues[0].message);
			return;
		}
		if (password !== confirmPassword) {
			toast.error(bi("كلمتا المرور غير متطابقتين", "Passwords don't match"));
			return;
		}
		if (genderId == null) {
			toast.error(bi("الجنس مطلوب", "Gender is required"));
			return;
		}
		if (!role) return;
		const roleName = BACKEND_ROLE_NAME[role];
		const userType = options?.roles.find((r) => r.name === roleName);
		if (!userType) {
			toast.error(bi("تعذّر تحديد نوع الحساب — حاول تحديث الصفحة.", "Couldn't determine the account type — try refreshing the page."));
			return;
		}
		setLoading(true);
		trackEvent("signup_attempt", { role });
		try {
			await register({
				name: parsed.data.fullName,
				email: parsed.data.email,
				phoneNumber: parsed.data.phoneNumber,
				password: parsed.data.password,
				confirmPassword: parsed.data.password,
				genderId,
				userTypeId: userType.id
			});
			const profile = getStoredProfile();
			if (profile) {
				identifyUser(profile.id, { roleName: profile.roleName });
				setMonitoringUser({
					id: profile.id,
					email: profile.email
				});
			}
			trackEvent("signup_success", { role });
			toast.success(bi("تم إنشاء الحساب بنجاح", "Account created successfully"));
			navigate({
				href: roleHome(profile?.roleName ?? roleName),
				replace: true
			});
		} catch (err) {
			trackEvent("signup_failed", { role });
			toast.error(getErrorMessage(err, bi("تعذّر إنشاء الحساب", "Failed to create account")));
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
			!signupEnabled ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeatureStatus, {
				title: bi("التسجيل قيد التجهيز", "Sign-up is being prepared"),
				description: bi("تسجيل الدخول يعمل حاليًا. سنفعّل إنشاء الحسابات بعد اكتمال مسار التسجيل في الباك إند.", "Sign-in is available now. Account creation will open when the backend registration flow is ready."),
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "outline",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/login",
						children: bi("الذهاب لتسجيل الدخول", "Go to sign in")
					})
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
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
						id: "phone",
						label: bi("رقم الهاتف", "Phone number"),
						type: "tel",
						value: phoneNumber,
						onChange: setPhoneNumber,
						autoComplete: "tel"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-sm font-semibold text-foreground",
							children: bi("الجنس", "Gender")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: genderId != null ? String(genderId) : void 0,
							onValueChange: (v) => setGenderId(Number(v)),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								className: "w-full",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: bi("اختر الجنس", "Select gender") })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: (options?.genders ?? []).map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: String(g.id),
								children: g.name
							}, g.id)) })]
						})]
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
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthField, {
						id: "confirm-password",
						label: bi("تأكيد كلمة المرور", "Confirm password"),
						type: "password",
						value: confirmPassword,
						onChange: setConfirmPassword,
						autoComplete: "new-password"
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
