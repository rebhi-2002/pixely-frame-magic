import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { O as throwBilingual, d as apiClient, f as getErrorMessage, k as useBi } from "./rbac-static-data-Bv6QEjHq.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { E as Pencil, T as Plus, b as Search, l as Trash2 } from "../_libs/lucide-react.mjs";
import { d as useAccess } from "./use-access-BL6Bw5Ej.mjs";
import { n as Guard } from "./guard-Dpfucbbc.mjs";
import { t as Button } from "./button-Nx-_C_c8.mjs";
import { n as Toolbar, t as PageHeader } from "./page-header-B-hD-LLI.mjs";
import { t as Input } from "./input-D0-bbXyS.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, o as Label, r as DialogFooter, t as Dialog } from "./dialog-1uq10XBZ.mjs";
import { t as Switch } from "./switch-Cn1w-cIH.mjs";
import { a as AlertDialogDescription, c as AlertDialogTitle, i as AlertDialogContent, n as AlertDialogAction, o as AlertDialogFooter, r as AlertDialogCancel, s as AlertDialogHeader, t as AlertDialog } from "./alert-dialog-OIHj-NyW.mjs";
import { i as RetryButton, r as LoadingState, t as ErrorState } from "./feedback-states-CtpAlO82.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-CbSL31Oe.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.users--JGudS7A.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function mapGender(name) {
	if (!name) return "male";
	const normalized = name.toLowerCase();
	return normalized.includes("أنث") || normalized.includes("female") ? "female" : "male";
}
function mapUser(user) {
	return {
		id: user.id ?? "",
		full_name: user.name ?? "",
		email: user.email ?? null,
		phone: user.phoneNumber ?? null,
		gender: mapGender(user.gender?.name),
		avatar_url: user.avatar ?? null,
		is_active: user.isActive ?? false,
		role_id: user.userTypeId == null ? null : String(user.userTypeId),
		role_name: user.userType?.name ?? null,
		gender_id: user.genderId ?? user.gender?.id ?? null,
		user_type_id: user.userTypeId ?? user.userType?.id ?? null
	};
}
async function loadFormData(id) {
	const query = id ? `?id=${encodeURIComponent(id)}` : "?id=";
	return apiClient.get(`/api/User/CreateEditModal${query}`);
}
async function listBackendUsers() {
	return ((await apiClient.post("/api/User/GetAll", {
		searchValue: "",
		sortColumn: "",
		sortColumnDirection: "",
		pageSize: 1e3,
		skip: 0,
		userTypeId: null,
		genderId: null,
		isActiveSearch: null
	})).data ?? []).map(mapUser).filter((user) => user.id.length > 0);
}
async function loadBackendUserOptions() {
	const result = await loadFormData();
	return {
		roles: result.userTypes ?? [],
		genders: result.genders ?? []
	};
}
function requiredId(value, label) {
	if (value == null || value <= 0) throw new Error(`يجب اختيار ${label}`);
	return value;
}
async function saveBackendUser(form) {
	const existingUser = (form.id ? await loadFormData(form.id) : null)?.user;
	const genderId = requiredId(form.gender_id ?? existingUser?.genderId ?? null, "الجنس");
	const userTypeId = requiredId(form.role_id ? Number(form.role_id) : existingUser?.userTypeId ?? null, "نوع المستخدم");
	if (!form.id && (!form.password || !form.confirmPassword)) throwBilingual("كلمة المرور وتأكيدها مطلوبان عند إضافة مستخدم", "Password and confirmation are required when adding a user");
	const result = await apiClient.post("/api/User/CreateEdit", {
		id: form.id ?? null,
		name: form.full_name,
		email: form.email,
		phoneNumber: form.phone,
		genderId,
		userTypeId,
		isActive: form.is_active,
		avatar: existingUser?.avatar ?? null,
		password: form.id ? null : form.password,
		confirmPassword: form.id ? null : form.confirmPassword
	});
	if (!result.success) {
		if (result.message) throw new Error(result.message);
		throwBilingual("تعذر حفظ المستخدم", "Failed to save user");
	}
}
async function updateBackendUserStatus(id, isActive) {
	const user = (await loadFormData(id)).user;
	if (!user?.id || !user.name || !user.email || !user.phoneNumber) throwBilingual("تعذر تحميل بيانات المستخدم قبل تحديث حالته", "Couldn't load the user's data before updating their status");
	const genderId = requiredId(user.genderId ?? user.gender?.id ?? null, "الجنس");
	const userTypeId = requiredId(user.userTypeId ?? user.userType?.id ?? null, "نوع المستخدم");
	const saved = await apiClient.post("/api/User/CreateEdit", {
		id: user.id,
		name: user.name,
		email: user.email,
		phoneNumber: user.phoneNumber,
		genderId,
		userTypeId,
		isActive,
		avatar: user.avatar ?? null,
		password: null,
		confirmPassword: null
	});
	if (!saved.success) {
		if (saved.message) throw new Error(saved.message);
		throwBilingual("تعذر تحديث حالة المستخدم", "Failed to update user status");
	}
}
async function deleteBackendUser(id) {
	const result = await apiClient.delete(`/api/User/Delete?id=${encodeURIComponent(id)}`);
	if (!result.success) {
		if (result.message) throw new Error(result.message);
		throwBilingual("تعذر حذف المستخدم", "Failed to delete user");
	}
}
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
	const [status, setStatus] = (0, import_react.useState)("all");
	const [gender, setGender] = (0, import_react.useState)("all");
	const [roleFilter, setRoleFilter] = (0, import_react.useState)("all");
	const [open, setOpen] = (0, import_react.useState)(false);
	const [editingId, setEditingId] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)(EMPTY_FORM);
	const [pendingDelete, setPendingDelete] = (0, import_react.useState)(null);
	const { data: users, isLoading, isError } = useQuery({
		queryKey: ["users"],
		queryFn: listBackendUsers
	});
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
	const filtered = (0, import_react.useMemo)(() => {
		return (users ?? []).filter((u) => {
			if (status !== "all" && u.is_active !== (status === "active")) return false;
			if (gender !== "all" && u.gender !== gender) return false;
			if (roleFilter !== "all" && u.role_id !== roleFilter) return false;
			if (search.trim()) {
				const q = search.trim().toLowerCase();
				if (!`${u.full_name} ${u.email ?? ""} ${u.phone ?? ""}`.toLowerCase().includes(q)) return false;
			}
			return true;
		});
	}, [
		users,
		status,
		gender,
		roleFilter,
		search
	]);
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
							onChange: (e) => setSearch(e.target.value),
							className: "ps-9"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterSelect, {
						value: status,
						onChange: setStatus,
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
						onChange: setGender,
						placeholder: bi("الجنس", "Gender"),
						options: [
							{
								value: "all",
								label: bi("الكل", "All")
							},
							{
								value: "male",
								label: bi("ذكر", "Male")
							},
							{
								value: "female",
								label: bi("أنثى", "Female")
							}
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterSelect, {
						value: roleFilter,
						onChange: setRoleFilter,
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
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: bi(`${filtered.length} نتيجة`, `${filtered.length} result${filtered.length === 1 ? "" : "s"}`) }), hasFilters && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "ghost",
						size: "sm",
						onClick: () => {
							setSearch("");
							setStatus("all");
							setGender("all");
							setRoleFilter("all");
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
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [filtered.map((u, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
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
						}, u.id)), !filtered.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							colSpan: 8,
							className: "p-8 text-center text-muted-foreground",
							children: hasFilters ? bi("لا توجد نتائج مطابقة للفلاتر الحالية.", "No users match the current filters.") : bi("لا يوجد مستخدمون بعد.", "No users yet.")
						}) })] })]
					})
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
											gender: gender?.name.includes("أنث") ? "female" : "male"
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
							onClick: () => saveMutation.mutate(),
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
