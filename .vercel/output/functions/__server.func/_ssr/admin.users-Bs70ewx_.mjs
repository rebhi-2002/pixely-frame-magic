import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { x as useBi } from "./rbac-static-data-BkN8GGlQ.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { c as listUsers, d as saveUser, f as sendPasswordReset, g as useServerFn, h as useAccess, i as deleteUser, m as toggleUserStatus, s as listRoles } from "./use-access-DsjSFy3L.mjs";
import { n as Guard } from "./guard-BhjB-ZLB.mjs";
import { B as LoaderCircle, C as Plus, W as KeyRound, c as Trash2, w as Pencil, y as Search } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-CMeJY5ZQ.mjs";
import { n as Toolbar, t as PageHeader } from "./page-header-dZRFB7kQ.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { a as AlertDialogDescription, c as AlertDialogTitle, d as DialogFooter, f as DialogHeader, i as AlertDialogContent, l as Dialog, m as Label, n as AlertDialogAction, o as AlertDialogFooter, p as DialogTitle, r as AlertDialogCancel, s as AlertDialogHeader, t as AlertDialog, u as DialogContent } from "./alert-dialog-Ct-oW2kQ.mjs";
import { t as Switch } from "./switch-Cn1w-cIH.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Dg1urBTx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.users-Bs70ewx_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var EMPTY_FORM = {
	full_name: "",
	email: "",
	phone: "",
	gender: "male",
	role_id: null,
	is_active: true
};
function UsersPage() {
	const bi = useBi();
	const queryClient = useQueryClient();
	const { can } = useAccess();
	const fetchUsers = useServerFn(listUsers);
	const fetchRoles = useServerFn(listRoles);
	const persist = useServerFn(saveUser);
	const toggleStatus = useServerFn(toggleUserStatus);
	const remove = useServerFn(deleteUser);
	const resetPassword = useServerFn(sendPasswordReset);
	const [search, setSearch] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)("all");
	const [gender, setGender] = (0, import_react.useState)("all");
	const [roleFilter, setRoleFilter] = (0, import_react.useState)("all");
	const [open, setOpen] = (0, import_react.useState)(false);
	const [editingId, setEditingId] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)(EMPTY_FORM);
	const [pendingDelete, setPendingDelete] = (0, import_react.useState)(null);
	const { data: users, isLoading } = useQuery({
		queryKey: ["users"],
		queryFn: () => fetchUsers()
	});
	const { data: roles } = useQuery({
		queryKey: ["roles"],
		queryFn: () => fetchRoles(),
		retry: false
	});
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
		mutationFn: () => persist({ data: {
			...form,
			id: editingId ?? void 0
		} }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
			setOpen(false);
			toast.success(bi("تم الحفظ", "Saved successfully"));
		},
		onError: (e) => toast.error(e instanceof Error ? e.message : bi("تعذّر الحفظ", "Failed to save"))
	});
	const statusMutation = useMutation({
		mutationFn: (vars) => toggleStatus({ data: vars }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
			toast.success(bi("تم تحديث الحالة", "Status updated"));
		},
		onError: (e) => toast.error(e instanceof Error ? e.message : bi("تعذّر التحديث", "Failed to update"))
	});
	const deleteMutation = useMutation({
		mutationFn: (id) => remove({ data: { id } }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
			setPendingDelete(null);
			toast.success(bi("تم الحذف", "Deleted successfully"));
		},
		onError: (e) => toast.error(e instanceof Error ? e.message : bi("تعذّر الحذف", "Failed to delete"))
	});
	const resetMutation = useMutation({
		mutationFn: (id) => resetPassword({ data: {
			id,
			redirectTo: `${window.location.origin}/auth`
		} }),
		onSuccess: () => toast.success(bi("تم إرسال رابط تغيير كلمة المرور", "Reset link sent")),
		onError: (e) => toast.error(e instanceof Error ? e.message : bi("تعذّر الإرسال", "Failed to send"))
	});
	function openDialog(user) {
		setEditingId(user?.id ?? null);
		setForm(user ? {
			full_name: user.full_name,
			email: user.email ?? "",
			phone: user.phone ?? "",
			gender: user.gender ?? "male",
			role_id: user.role_id,
			is_active: user.is_active
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
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Toolbar, { children: [
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
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 overflow-x-auto rounded-2xl bg-card",
				children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex justify-center p-10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-5 animate-spin text-primary" })
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-3xl text-start text-sm",
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
									children: [
										can("admin_users", "edit") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "icon",
											variant: "ghost",
											title: bi("تعديل", "Edit"),
											onClick: () => openDialog(u),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" })
										}),
										can("admin_users", "change_password") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "icon",
											variant: "ghost",
											title: bi("إرسال رابط كلمة المرور", "Send password reset link"),
											onClick: () => resetMutation.mutate(u.id),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "size-4" })
										}),
										can("admin_users", "delete") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "icon",
											variant: "ghost",
											title: bi("حذف", "Delete"),
											className: "text-destructive",
											onClick: () => setPendingDelete(u),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
										})
									]
								})
							})
						]
					}, u.id)), !filtered.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						colSpan: 8,
						className: "p-8 text-center text-muted-foreground",
						children: bi("لا توجد نتائج مطابقة.", "No matching results.")
					}) })] })]
				})
			})]
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
									value: form.gender,
									onValueChange: (v) => setForm((f) => ({
										...f,
										gender: v
									})),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "male",
										children: bi("ذكر", "Male")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "female",
										children: bi("أنثى", "Female")
									})] })]
								})]
							}),
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
							disabled: saveMutation.isPending,
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
