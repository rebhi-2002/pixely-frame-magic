import { i as __toESM } from "../_runtime.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { A as useBi, E as roleHome, T as register, h as getStoredProfile, p as getErrorMessage } from "./rbac-static-data-DgiM51a_.mjs";
import { n as useTranslation } from "../_libs/react-i18next.mjs";
import { b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { Vt as BadgeCheck } from "../_libs/lucide-react.mjs";
import { L as identifyUser, R as trackEvent } from "./router-D9kxMA2z.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-CbSL31Oe.mjs";
import { r as loadBackendUserOptions } from "./admin-users-CjBbXoHb.mjs";
import { n as AuthShell, t as AuthField } from "./auth-shell-pi4p_yV1.mjs";
import { t as setMonitoringUser } from "./monitoring-CM_o1ZBz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/teacher.register-OUbjWZSC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var schema = objectType({
	fullName: stringType().trim().min(2),
	email: stringType().trim().email(),
	password: stringType().min(6),
	phone: stringType().trim().min(6).max(30)
});
var TEACHER_ROLE_NAME = "المعلم";
function TeacherRegisterPage() {
	const { t } = useTranslation();
	const bi = useBi();
	const navigate = useNavigate();
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [fullName, setFullName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [confirmPassword, setConfirmPassword] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [genderId, setGenderId] = (0, import_react.useState)(null);
	const { data: options } = useQuery({
		queryKey: ["signup-options"],
		queryFn: loadBackendUserOptions
	});
	async function submit(e) {
		e.preventDefault();
		const parsed = schema.safeParse({
			fullName,
			email,
			password,
			phone
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
		const userType = options?.roles.find((r) => r.name === TEACHER_ROLE_NAME);
		if (!userType) {
			toast.error(bi("تعذّر تحديد نوع الحساب — حاول تحديث الصفحة.", "Couldn't determine the account type — try refreshing the page."));
			return;
		}
		setLoading(true);
		trackEvent("signup_attempt", { role: "teacher" });
		try {
			await register({
				name: parsed.data.fullName,
				email: parsed.data.email,
				phoneNumber: parsed.data.phone,
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
			trackEvent("signup_success", { role: "teacher" });
			toast.success(bi("تم إنشاء حساب المعلّم بنجاح", "Teacher account created successfully"));
			navigate({
				href: roleHome(profile?.roleName ?? TEACHER_ROLE_NAME),
				replace: true
			});
		} catch (err) {
			trackEvent("signup_failed", { role: "teacher" });
			toast.error(getErrorMessage(err, bi("تعذّر إنشاء الحساب", "Failed to create account")));
		} finally {
			setLoading(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthShell, {
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, { className: "size-5" }),
		title: t("authPages.teacherRegister.h1"),
		subtitle: t("authPages.teacherRegister.sub"),
		wide: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: submit,
			className: "grid gap-4 sm:grid-cols-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthField, {
					id: "name",
					label: t("authPages.teacherRegister.fullName"),
					value: fullName,
					onChange: setFullName,
					autoComplete: "name"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthField, {
					id: "phone",
					label: t("authPages.teacherRegister.phone"),
					value: phone,
					onChange: setPhone,
					autoComplete: "tel"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthField, {
					id: "email",
					label: t("authPages.teacherRegister.email"),
					type: "email",
					value: email,
					onChange: setEmail,
					autoComplete: "email"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthField, {
					id: "password",
					label: t("authPages.teacherRegister.password"),
					type: "password",
					value: password,
					onChange: setPassword,
					autoComplete: "new-password"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthField, {
					id: "confirm-password",
					label: bi("تأكيد كلمة المرور", "Confirm password"),
					type: "password",
					value: confirmPassword,
					onChange: setConfirmPassword,
					autoComplete: "new-password"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5 sm:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "block text-sm font-semibold text-foreground",
						children: bi("الجنس", "Gender")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: genderId != null ? String(genderId) : void 0,
						onValueChange: (v) => setGenderId(Number(v)),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							className: "w-full sm:w-1/2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: bi("اختر الجنس", "Select gender") })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: (options?.genders ?? []).map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: String(g.id),
							children: g.name
						}, g.id)) })]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					disabled: loading,
					className: "sm:col-span-2 w-full rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60",
					children: loading ? t("common.loading") : t("authPages.teacherRegister.submit")
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-6 text-center text-xs text-muted-foreground",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/signup",
				className: "font-bold text-primary hover:underline",
				children: t("authPages.teacherRegister.back")
			})
		})]
	});
}
//#endregion
export { TeacherRegisterPage as component };
