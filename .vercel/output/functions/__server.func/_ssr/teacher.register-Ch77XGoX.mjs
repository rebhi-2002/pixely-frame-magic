import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as useTranslation } from "../_libs/react-i18next.mjs";
import { b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as getErrorMessage } from "./rbac-static-data-Bv6QEjHq.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { Ct as BadgeCheck, at as CloudUpload } from "../_libs/lucide-react.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
import { n as AuthShell, t as AuthField } from "./auth-shell-B7r5y7wC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/teacher.register-Ch77XGoX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var schema = objectType({
	fullName: stringType().trim().min(2),
	email: stringType().trim().email(),
	password: stringType().min(6),
	phone: stringType().trim().min(6).max(30),
	subject: stringType().trim().min(2).max(60),
	experience: stringType().trim().max(3),
	bio: stringType().trim().max(600)
});
function TeacherRegisterPage() {
	const { t } = useTranslation();
	useNavigate();
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [fullName, setFullName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [subject, setSubject] = (0, import_react.useState)("");
	const [experience, setExperience] = (0, import_react.useState)("");
	const [bio, setBio] = (0, import_react.useState)("");
	const [docName, setDocName] = (0, import_react.useState)("");
	async function submit(e) {
		e.preventDefault();
		const parsed = schema.safeParse({
			fullName,
			email,
			password,
			phone,
			subject,
			experience,
			bio
		});
		if (!parsed.success) {
			toast.error(parsed.error.issues[0].message);
			return;
		}
		setLoading(true);
		try {
			throw new Error("تسجيل المعلّمين غير متاح حالياً — قيد الربط مع الباك اند الجديد.");
		} catch (err) {
			toast.error(getErrorMessage(err, "…"));
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
					id: "subject",
					label: t("authPages.teacherRegister.subject"),
					value: subject,
					onChange: setSubject
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthField, {
					id: "experience",
					label: t("authPages.teacherRegister.experience"),
					value: experience,
					onChange: setExperience
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5 sm:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						htmlFor: "bio",
						className: "block text-sm font-semibold text-foreground",
						children: t("authPages.teacherRegister.bio")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						id: "bio",
						rows: 3,
						value: bio,
						onChange: (e) => setBio(e.target.value),
						placeholder: t("authPages.teacherRegister.bioPlaceholder"),
						className: "w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5 sm:col-span-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-sm font-semibold text-foreground",
							children: t("authPages.teacherRegister.document")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							htmlFor: "doc",
							className: "flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-input bg-background px-3.5 py-4 text-sm text-muted-foreground transition-colors hover:border-primary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, { className: "size-5 shrink-0 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "min-w-0 truncate",
								children: docName || t("authPages.teacherRegister.documentHint")
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "doc",
							type: "file",
							accept: "image/*,application/pdf",
							className: "sr-only",
							onChange: (e) => setDocName(e.target.files?.[0]?.name ?? "")
						})
					]
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
