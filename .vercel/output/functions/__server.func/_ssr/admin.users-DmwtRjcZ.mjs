import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { A as useBi, p as getErrorMessage } from "./rbac-static-data-DgiM51a_.mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { D as Search, F as Pencil, P as Plus, p as Trash2 } from "../_libs/lucide-react.mjs";
import { d as useAccess } from "./use-access-D-0XcxdM.mjs";
import { n as Guard } from "./guard-BWYeVpPM.mjs";
import { t as Button } from "./button-DfTXnEII.mjs";
import { n as Toolbar, t as PageHeader } from "./page-header-D4CknVcT.mjs";
import { a as Pagination } from "./kit-D0usPDe5.mjs";
import { t as Input } from "./input-D0-bbXyS.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { t as Switch } from "./switch-Cn1w-cIH.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, r as DialogFooter, t as Dialog } from "./dialog-CE79KVEh.mjs";
import { a as AlertDialogDescription, c as AlertDialogTitle, i as AlertDialogContent, n as AlertDialogAction, o as AlertDialogFooter, r as AlertDialogCancel, s as AlertDialogHeader, t as AlertDialog } from "./alert-dialog-CRZk8vpy.mjs";
import { i as RetryButton, r as LoadingState, t as ErrorState } from "./feedback-states-ZdZSGCTQ.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-CbSL31Oe.mjs";
import { t as useDebouncedValue } from "./use-debounced-value-BXcXEOol.mjs";
import { a as updateBackendUserStatus, i as saveBackendUser, n as listBackendUsers, r as loadBackendUserOptions, t as deleteBackendUser } from "./admin-users-CjBbXoHb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.users-DmwtRjcZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var EMPTY_FORM = {
	full_name: "",
	email: "",
	phone: "",
	gender: "male",
	gender_id: null,
	role_id: null,
	is_active: true,
	password: "",
	confirmPassword: ""
};
function UsersPage() {
	const bi = useBi();
	const queryClient = useQueryClient();
	const { can } = useAccess();
	const [search, setSearch] = (0, import_react.useState)("");
	const debouncedSearch = useDebouncedValue(search);
	const [status, setStatus] = (0, import_react.useState)("all");
	const [gender, setGender] = (0, import_react.useState)("all");
	const [roleFilter, setRoleFilter] = (0, import_react.useState)("all");
	const [page, setPage] = (0, import_react.useState)(0);
	const PAGE_SIZE = 20;
	const [open, setOpen] = (0, import_react.useState)(false);
	const [editingId, setEditingId] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)(EMPTY_FORM);
	const [pendingDelete, setPendingDelete] = (0, import_react.useState)(null);
	const { data: options } = useQuery({
		queryKey: ["backend-user-options"],
		queryFn: loadBackendUserOptions,
		staleTime: 3e5,
		retry: false
	});
	const hasFilters = Boolean(search.trim()) || status !== "all" || gender !== "all" || roleFilter !== "all";
	const roles = (options?.roles ?? []).map((role) => ({
		id: String(role.id),
		name: role.name
	}));
	const genders = options?.genders ?? [];
	const { data: usersResult, isLoading, isError } = useQuery({
		queryKey: ["users", {
			search: debouncedSearch,
			status,
			gender,
			roleFilter,
			page
		}],
		queryFn: () => listBackendUsers({
			searchValue: debouncedSearch.trim(),
			userTypeId: roleFilter === "all" ? null : Number(roleFilter),
			genderId: gender === "all" ? null : Number(gender),
			isActiveSearch: status === "all" ? null : status === "active",
			pageSize: PAGE_SIZE,
			skip: page * PAGE_SIZE
		}),
		placeholderData: (prev) => prev
	});
	const users = usersResult?.rows ?? [];
	const totalCount = usersResult?.totalCount ?? 0;
	function resetToFirstPage(setter) {
		return (value) => {
			setter(value);
			setPage(0);
		};
	}
	function validateUserForm() {
		if (!form.full_name.trim()) return bi("الاسم الكامل مطلوب", "Full name is required");
		if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) return bi("البريد الإلكتروني غير صالح", "Enter a valid email address");
		if (!form.phone.trim()) return bi("رقم الجوال مطلوب", "Phone number is required");
		if (form.gender_id == null) return bi("الجنس مطلوب", "Gender is required");
		if (!editingId) {
			if (form.password.length < 6) return bi("كلمة المرور 6 أحرف على الأقل", "Password must be at least 6 characters");
			if (form.password !== form.confirmPassword) return bi("كلمتا المرور غير متطابقتين", "Passwords don't match");
		}
		return null;
	}
	const saveMutation = useMutation({
		mutationFn: () => saveBackendUser({
			...form,
			id: editingId ?? void 0
		}),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
			setOpen(false);
			toast.success(bi("تم الحفظ", "Saved successfully"));
		},
		onError: (e) => toast.error(getErrorMessage(e, bi("تعذّر الحفظ", "Failed to save")))
	});
	const statusMutation = useMutation({
		mutationFn: (vars) => updateBackendUserStatus(vars.id, vars.is_active),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
			toast.success(bi("تم تحديث الحالة", "Status updated"));
		},
		onError: (e) => toast.error(getErrorMessage(e, bi("تعذّر التحديث", "Failed to update")))
	});
	const deleteMutation = useMutation({
		mutationFn: deleteBackendUser,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
			setPendingDelete(null);
			toast.success(bi("تم الحذف", "Deleted successfully"));
		},
		onError: (e) => toast.error(getErrorMessage(e, bi("تعذّر الحذف", "Failed to delete")))
	});
	function openDialog(user) {
		setEditingId(user?.id ?? null);
		setForm(user ? {
			full_name: user.full_name,
			email: user.email ?? "",
			phone: user.phone ?? "",
			gender: user.gender ?? "male",
			gender_id: user.gender_id ?? null,
			role_id: user.role_id,
			is_active: user.is_active,
			password: "",
			confirmPassword: ""
		} : EMPTY_FORM);
		setOpen(true);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: bi("المستخدمين", "Users"),
			icon: "Users2"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Toolbar, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative min-w-56 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							placeholder: bi("بحث بالاسم أو البريد أو الجوال", "Search by name, email, or phone"),
							value: search,
							onChange: (e) => resetToFirstPage(setSearch)(e.target.value),
							className: "ps-9"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterSelect, {
						value: status,
						onChange: resetToFirstPage(setStatus),
						placeholder: bi("الحالة", "Status"),
						options: [
							{
								value: "all",
								label: bi("كل الحالات", "All statuses")
							},
							{
								value: "active",
								label: bi("نشط", "Active")
							},
							{
								value: "inactive",
								label: bi("غير نشط", "Inactive")
							}
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterSelect, {
						value: gender,
						onChange: resetToFirstPage(setGender),
						placeholder: bi("الجنس", "Gender"),
						options: [{
							value: "all",
							label: bi("الكل", "All")
						}, ...genders.map((g) => ({
							value: String(g.id),
							label: g.name
						}))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterSelect, {
						value: roleFilter,
						onChange: resetToFirstPage(setRoleFilter),
						placeholder: bi("نوع المستخدم", "User type"),
						options: [{
							value: "all",
							label: bi("كل الأنواع", "All types")
						}, ...(roles ?? []).map((r) => ({
							value: r.id,
							label: r.name
						}))]
					}),
					can("admin_users", "show_add_form") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						className: "ms-auto",
						onClick: () => openDialog(null),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), bi("إضافة مستخدم", "Add user")]
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex items-center justify-between gap-3 text-xs text-muted-foreground",
					"aria-live": "polite",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: bi(`${totalCount} نتيجة`, `${totalCount} result${totalCount === 1 ? "" : "s"}`) }), hasFilters && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "ghost",
						size: "sm",
						onClick: () => {
							setSearch("");
							setStatus("all");
							setGender("all");
							setRoleFilter("all");
							setPage(0);
						},
						children: bi("مسح الفلاتر", "Clear filters")
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 overflow-x-auto rounded-2xl bg-card",
					role: "region",
					"aria-label": bi("قائمة المستخدمين", "Users list"),
					children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingState, { label: bi("عم نحمّل المستخدمين…", "Loading users…") }) : isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, {
						title: bi("تعذّر تحميل المستخدمين", "Couldn't load users"),
						action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RetryButton, {
							label: bi("إعادة المحاولة", "Try again"),
							onClick: () => void queryClient.invalidateQueries({ queryKey: ["users"] })
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full min-w-[900px] text-start text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-border text-xs text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "w-14 px-4 py-3 font-semibold",
									children: "#"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 font-semibold",
									children: bi("الاسم", "Name")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 font-semibold",
									children: bi("البريد", "Email")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 font-semibold",
									children: bi("الجوال", "Phone")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 font-semibold",
									children: bi("الجنس", "Gender")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 font-semibold",
									children: bi("النوع", "Type")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 font-semibold",
									children: bi("الحالة", "Status")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "w-36 px-4 py-3 font-semibold",
									children: bi("إجراءات", "Actions")
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [users.map((u, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-border/60 last:border-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3 text-muted-foreground",
									children: i + 1
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3 font-semibold text-foreground",
									children: u.full_name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3 text-muted-foreground",
									children: u.email ?? "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3 text-muted-foreground",
									children: u.phone ?? "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3 text-muted-foreground",
									children: u.gender === "male" ? bi("ذكر", "Male") : u.gender === "female" ? bi("أنثى", "Female") : u.gender ?? "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3 text-muted-foreground",
									children: u.role_name ?? "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
										checked: u.is_active,
										disabled: !can("admin_users", "edit"),
										onCheckedChange: (v) => statusMutation.mutate({
											id: u.id,
											is_active: v
										}),
										"aria-label": bi(`حالة ${u.full_name}`, `Status for ${u.full_name}`)
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1",
										children: [can("admin_users", "edit") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "icon",
											variant: "ghost",
											title: bi("تعديل", "Edit"),
											onClick: () => openDialog(u),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" })
										}), can("admin_users", "delete") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "icon",
											variant: "ghost",
											title: bi("حذف", "Delete"),
											className: "text-destructive",
											onClick: () => setPendingDelete(u),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
										})]
									})
								})
							]
						}, u.id)), !users.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							colSpan: 8,
							className: "p-8 text-center text-muted-foreground",
							children: hasFilters ? bi("لا توجد نتائج مطابقة للفلاتر الحالية.", "No users match the current filters.") : bi("لا يوجد مستخدمون بعد.", "No users yet.")
						}) })] })]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pagination, {
					page,
					pageSize: PAGE_SIZE,
					totalCount,
					onPageChange: setPage,
					summary: bi(`${Math.min(page * PAGE_SIZE + 1, totalCount)}–${Math.min((page + 1) * PAGE_SIZE, totalCount)} من ${totalCount}`, `${Math.min(page * PAGE_SIZE + 1, totalCount)}–${Math.min((page + 1) * PAGE_SIZE, totalCount)} of ${totalCount}`),
					previousLabel: bi("السابق", "Previous"),
					nextLabel: bi("التالي", "Next")
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open,
			onOpenChange: setOpen,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
				className: "text-start",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: editingId ? bi("تعديل مستخدم", "Edit user") : bi("إضافة مستخدم", "Add user") }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5 sm:col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "u-name",
									children: bi("الاسم الكامل", "Full name")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "u-name",
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
									htmlFor: "u-email",
									children: bi("البريد الإلكتروني", "Email address")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "u-email",
									type: "email",
									value: form.email,
									onChange: (e) => setForm((f) => ({
										...f,
										email: e.target.value
									}))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "u-phone",
									children: bi("رقم الجوال", "Phone number")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "u-phone",
									value: form.phone,
									onChange: (e) => setForm((f) => ({
										...f,
										phone: e.target.value
									}))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: bi("الجنس", "Gender") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: form.gender_id == null ? "none" : String(form.gender_id),
									onValueChange: (value) => {
										const gender = genders.find((item) => String(item.id) === value);
										setForm((f) => ({
											...f,
											gender_id: gender?.id ?? null,
											gender: gender?.name.includes("أنثى") ? "female" : "male"
										}));
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: bi("اختر الجنس", "Select gender") }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "none",
										disabled: true,
										children: bi("اختر الجنس", "Select gender")
									}), genders.map((gender) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: String(gender.id),
										children: gender.name
									}, gender.id))] })]
								})]
							}),
							!editingId && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "u-password",
									children: bi("كلمة المرور", "Password")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "u-password",
									type: "password",
									value: form.password,
									onChange: (e) => setForm((f) => ({
										...f,
										password: e.target.value
									}))
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "u-confirm-password",
									children: bi("تأكيد كلمة المرور", "Confirm password")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "u-confirm-password",
									type: "password",
									value: form.confirmPassword,
									onChange: (e) => setForm((f) => ({
										...f,
										confirmPassword: e.target.value
									}))
								})]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: bi("نوع المستخدم", "User type") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: form.role_id ?? "none",
									onValueChange: (v) => setForm((f) => ({
										...f,
										role_id: v === "none" ? null : v
									})),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: bi("بدون", "None") }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "none",
										children: bi("بدون", "None")
									}), (roles ?? []).map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: r.id,
										children: r.name
									}, r.id))] })]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 sm:col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
									checked: form.is_active,
									onCheckedChange: (v) => setForm((f) => ({
										...f,
										is_active: v
									})),
									id: "u-active"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "u-active",
									children: bi("الحساب نشط", "Account active")
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
						className: "gap-2 sm:justify-start",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => {
								const error = validateUserForm();
								if (error) {
									toast.error(error);
									return;
								}
								saveMutation.mutate();
							},
							loading: saveMutation.isPending,
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
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
			open: !!pendingDelete,
			onOpenChange: (v) => !v && setPendingDelete(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, {
				className: "text-start",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: bi(`حذف «${pendingDelete?.full_name}»؟`, `Delete "${pendingDelete?.full_name}"?`) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: bi("لا يمكن التراجع عن هذا الإجراء.", "This action cannot be undone.") })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, {
					className: "gap-2 sm:justify-start",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
						onClick: () => pendingDelete && deleteMutation.mutate(pendingDelete.id),
						children: bi("حذف", "Delete")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: bi("إلغاء", "Cancel") })]
				})]
			})
		})
	] });
}
function FilterSelect({ value, onChange, placeholder, options }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
		value,
		onValueChange: onChange,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
			className: "w-40",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
			value: o.value,
			children: o.label
		}, o.value)) })]
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Guard, {
	pageKey: "admin_users",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsersPage, {})
});
//#endregion
export { SplitComponent as component };
