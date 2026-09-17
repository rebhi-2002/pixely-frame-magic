import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { A as useBi, f as changeMyPassword, g as getStoredUserId, h as getStoredProfile, j as usePreferences, k as updateMyProfile, p as getErrorMessage, v as isDemoSession } from "./rbac-static-data-DgiM51a_.mjs";
import { n as useTranslation } from "../_libs/react-i18next.mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { F as Pencil, R as Palette, S as ShieldCheck, X as LogOut, it as KeyRound, s as UserRound } from "../_libs/lucide-react.mjs";
import { n as useServerFn } from "./createSsrRpc-D3FH_hmA.mjs";
import { d as useAccess, f as useInvalidateAccess, u as updateOwnProfile } from "./use-access-BCs0D1hx.mjs";
import { n as Guard } from "./guard-CaBAnt-a.mjs";
import { n as SignOutOverlay, r as useSignOut } from "./sign-out-overlay-ygNKMH6w.mjs";
import { t as Button } from "./button-DfTXnEII.mjs";
import { t as PageHeader } from "./page-header-D4CknVcT.mjs";
import { t as Input } from "./input-D0-bbXyS.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, r as DialogFooter, t as Dialog } from "./dialog-CE79KVEh.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-CbSL31Oe.mjs";
import { n as ROLE_NAME_EN } from "./rbac-types-DB3J6lDj.mjs";
import { r as loadBackendUserOptions } from "./admin-users-CjBbXoHb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-DdGv7B3L.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var THEMES = [
	"light",
	"dark",
	"auto"
];
var LOCALES = ["ar", "en"];
function SettingsPage() {
	const { t } = useTranslation();
	const bi = useBi();
	const invalidateAccess = useInvalidateAccess();
	const { access, can } = useAccess();
	const { signOut, pending: signingOut } = useSignOut("/login");
	const { theme, setTheme, locale, setLocale } = usePreferences();
	const demo = isDemoSession();
	const userId = getStoredUserId();
	const { data: options } = useQuery({
		queryKey: ["signup-options"],
		queryFn: loadBackendUserOptions,
		enabled: !demo
	});
	const demoUpdateProfile = useServerFn(updateOwnProfile);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [form, setForm] = (0, import_react.useState)({
		full_name: "",
		email: "",
		phone: "",
		genderId: null
	});
	const saveMutation = useMutation({
		mutationFn: async () => {
			if (demo) return demoUpdateProfile({ data: {
				full_name: form.full_name,
				email: form.email
			} });
			if (!userId || form.genderId == null) throw new Error(bi("الجنس مطلوب", "Gender is required"));
			return updateMyProfile({
				id: userId,
				name: form.full_name,
				email: form.email,
				phoneNumber: form.phone,
				genderId: form.genderId
			});
		},
		onSuccess: () => {
			invalidateAccess();
			setOpen(false);
			toast.success(bi("تم الحفظ", "Saved successfully"));
		},
		onError: (e) => toast.error(getErrorMessage(e, bi("تعذّر الحفظ", "Failed to save")))
	});
	function openDialog() {
		const stored = getStoredProfile();
		setForm({
			full_name: access?.profile?.full_name ?? "",
			email: access?.profile?.email ?? "",
			phone: stored?.phoneNumber ?? "",
			genderId: typeof stored?.genderId === "number" ? stored.genderId : null
		});
		setOpen(true);
	}
	const [pwOpen, setPwOpen] = (0, import_react.useState)(false);
	const [pwForm, setPwForm] = (0, import_react.useState)({
		current: "",
		next: "",
		confirm: ""
	});
	const changePasswordMutation = useMutation({
		mutationFn: () => {
			if (pwForm.next !== pwForm.confirm) throw new Error(bi("كلمتا المرور الجديدتان غير متطابقتين", "New passwords don't match"));
			return changeMyPassword({
				currentPassword: pwForm.current,
				newPassword: pwForm.next,
				confirmPassword: pwForm.confirm
			});
		},
		onSuccess: () => {
			setPwOpen(false);
			setPwForm({
				current: "",
				next: "",
				confirm: ""
			});
			toast.success(bi("تم تغيير كلمة المرور", "Password changed successfully"));
		},
		onError: (e) => toast.error(getErrorMessage(e, bi("تعذّر تغيير كلمة المرور", "Failed to change password")))
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignOutOverlay, { pending: signingOut }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: t("settings.h1"),
			icon: "Settings"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-3xl px-5 py-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: t("settings.sub")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "shadow-elevation-1 mt-6 rounded-2xl border border-border bg-card p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "inline-flex items-center gap-2 font-bold text-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Palette, { className: "size-4 text-primary" }), t("settings.langThemeTab")]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-semibold text-foreground",
								children: t("settings.theme")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 flex flex-wrap gap-2",
								children: THEMES.map((value) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setTheme(value),
									className: `rounded-lg border px-3.5 py-2 text-xs font-bold transition-colors ${theme === value ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-muted-foreground hover:text-foreground"}`,
									children: t(`common.theme.${value}`)
								}, value))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-semibold text-foreground",
								children: t("settings.language")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 flex flex-wrap gap-2",
								children: LOCALES.map((value) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setLocale(value),
									className: `rounded-lg border px-3.5 py-2 text-xs font-bold transition-colors ${locale === value ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-muted-foreground hover:text-foreground"}`,
									children: t(`common.language.${value}`)
								}, value))
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "shadow-elevation-1 mt-4 rounded-2xl border border-border bg-card p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "inline-flex items-center gap-2 font-bold text-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, { className: "size-4 text-primary" }), t("settings.account")]
						}), can("account_settings", "edit_profile") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							variant: "outline",
							onClick: openDialog,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" }), bi("تعديل", "Edit")]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-4 grid gap-3 text-sm sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-xs text-muted-foreground",
								children: t("settings.name")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "font-semibold text-foreground",
								children: access?.profile?.full_name ?? "—"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-xs text-muted-foreground",
								children: t("settings.email")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "font-semibold text-foreground",
								children: access?.profile?.email ?? "—"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-xs text-muted-foreground",
								children: t("settings.role")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "font-semibold text-foreground",
								children: access?.profile?.role_name ? bi(access.profile.role_name, ROLE_NAME_EN[access.profile.role_name] ?? access.profile.role_name) : "—"
							})] })
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "shadow-elevation-1 mt-4 rounded-2xl border border-border bg-card p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "inline-flex items-center gap-2 font-bold text-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-4 text-primary" }), t("settings.security")]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-muted-foreground",
							children: t("settings.idleNote")
						}),
						!demo && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							variant: "outline",
							size: "sm",
							className: "mt-4",
							onClick: () => setPwOpen(true),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "size-4" }), bi("تغيير كلمة المرور", "Change password")]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => void signOut(),
							className: "mt-5 flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-bold text-foreground transition-colors hover:bg-secondary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-4" }), t(signingOut ? "common.signingOut" : "settings.signOut")]
						})
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open,
			onOpenChange: setOpen,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
				className: "text-start",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: bi("تعديل بيانات الحساب", "Edit account details") }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "acc-name",
									children: t("settings.name")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "acc-name",
									value: form.full_name,
									onChange: (e) => setForm((f) => ({
										...f,
										full_name: e.target.value
									}))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "acc-email",
									children: t("settings.email")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "acc-email",
									type: "email",
									value: form.email,
									onChange: (e) => setForm((f) => ({
										...f,
										email: e.target.value
									}))
								})]
							}),
							!demo && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "acc-phone",
									children: bi("رقم الهاتف", "Phone number")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "acc-phone",
									type: "tel",
									value: form.phone,
									onChange: (e) => setForm((f) => ({
										...f,
										phone: e.target.value
									}))
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: bi("الجنس", "Gender") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: form.genderId != null ? String(form.genderId) : void 0,
									onValueChange: (v) => setForm((f) => ({
										...f,
										genderId: Number(v)
									})),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
										className: "w-full",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: bi("اختر الجنس", "Select gender") })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: (options?.genders ?? []).map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: String(g.id),
										children: g.name
									}, g.id)) })]
								})]
							})] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
						className: "gap-2 sm:justify-start",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => saveMutation.mutate(),
							disabled: saveMutation.isPending || !form.full_name.trim(),
							children: bi("حفظ", "Save")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: () => setOpen(false),
							children: bi("إلغاء", "Cancel")
						})]
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: pwOpen,
			onOpenChange: setPwOpen,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
				className: "text-start",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: bi("تغيير كلمة المرور", "Change password") }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "pw-current",
									children: bi("كلمة المرور الحالية", "Current password")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "pw-current",
									type: "password",
									autoComplete: "current-password",
									value: pwForm.current,
									onChange: (e) => setPwForm((f) => ({
										...f,
										current: e.target.value
									}))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "pw-next",
									children: bi("كلمة المرور الجديدة", "New password")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "pw-next",
									type: "password",
									autoComplete: "new-password",
									value: pwForm.next,
									onChange: (e) => setPwForm((f) => ({
										...f,
										next: e.target.value
									}))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "pw-confirm",
									children: bi("تأكيد كلمة المرور الجديدة", "Confirm new password")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "pw-confirm",
									type: "password",
									autoComplete: "new-password",
									value: pwForm.confirm,
									onChange: (e) => setPwForm((f) => ({
										...f,
										confirm: e.target.value
									}))
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
						className: "gap-2 sm:justify-start",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => changePasswordMutation.mutate(),
							disabled: changePasswordMutation.isPending || !pwForm.current || !pwForm.next || !pwForm.confirm,
							children: bi("تغيير كلمة المرور", "Change password")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: () => setPwOpen(false),
							children: bi("إلغاء", "Cancel")
						})]
					})
				]
			})
		})
	] });
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Guard, {
	pageKey: "account_settings",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsPage, {})
});
//#endregion
export { SplitComponent as component };
