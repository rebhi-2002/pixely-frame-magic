import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { A as useBi, p as getErrorMessage } from "./rbac-static-data-DgiM51a_.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { $ as LoaderCircle, F as Pencil, P as Plus, p as Trash2, w as Settings2 } from "../_libs/lucide-react.mjs";
import { n as useServerFn } from "./createSsrRpc-DomYp5NV.mjs";
import { a as listRoles, d as useAccess, n as deleteRole, s as saveRole } from "./use-access-D-0XcxdM.mjs";
import { n as Guard } from "./guard-BWYeVpPM.mjs";
import { t as Button } from "./button-DfTXnEII.mjs";
import { n as Toolbar, t as PageHeader } from "./page-header-D4CknVcT.mjs";
import { t as Input } from "./input-D0-bbXyS.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, r as DialogFooter, t as Dialog } from "./dialog-CE79KVEh.mjs";
import { a as AlertDialogDescription, c as AlertDialogTitle, i as AlertDialogContent, n as AlertDialogAction, o as AlertDialogFooter, r as AlertDialogCancel, s as AlertDialogHeader, t as AlertDialog } from "./alert-dialog-CRZk8vpy.mjs";
import { t as Textarea } from "./textarea-kko37XEX.mjs";
import { n as ROLE_NAME_EN } from "./rbac-types-DB3J6lDj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.roles-XlWT6E0g.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function UserTypesPage() {
	const queryClient = useQueryClient();
	const { can } = useAccess();
	const bi = useBi();
	const fetchRoles = useServerFn(listRoles);
	const persist = useServerFn(saveRole);
	const remove = useServerFn(deleteRole);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [name, setName] = (0, import_react.useState)("");
	const [description, setDescription] = (0, import_react.useState)("");
	const [pendingDelete, setPendingDelete] = (0, import_react.useState)(null);
	const { data, isLoading } = useQuery({
		queryKey: ["roles"],
		queryFn: () => fetchRoles()
	});
	const saveMutation = useMutation({
		mutationFn: () => persist({ data: {
			id: editing?.id,
			name,
			description: description || null
		} }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["roles"] });
			setOpen(false);
			toast.success(bi("تم الحفظ بنجاح", "Saved successfully"));
		},
		onError: (e) => toast.error(getErrorMessage(e, bi("تعذّر الحفظ", "Failed to save")))
	});
	const deleteMutation = useMutation({
		mutationFn: (id) => remove({ data: { id } }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["roles"] });
			setPendingDelete(null);
			toast.success(bi("تم الحذف", "Deleted successfully"));
		},
		onError: (e) => toast.error(getErrorMessage(e, bi("تعذّر الحذف", "Failed to delete")))
	});
	function openDialog(role) {
		setEditing(role);
		setName(role?.name ?? "");
		setDescription(role?.description ?? "");
		setOpen(true);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: bi("أنواع المستخدم", "User roles"),
			icon: "ShieldCheck"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-5",
			children: [can("admin_roles", "show_add_form") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toolbar, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				onClick: () => openDialog(null),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), bi("إضافة نوع مستخدم", "Add role")]
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 overflow-hidden rounded-2xl bg-card",
				children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex justify-center p-10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-5 animate-spin text-primary" })
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-start text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-border text-xs text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "w-16 px-4 py-3 font-semibold",
								children: "#"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-semibold",
								children: bi("الاسم", "Name")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-semibold",
								children: bi("الوصف", "Description")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "w-40 px-4 py-3 font-semibold",
								children: bi("إجراءات", "Actions")
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [(data ?? []).map((role, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-border/60 last:border-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 text-muted-foreground",
								children: i + 1
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 font-semibold text-foreground",
								children: bi(role.name, ROLE_NAME_EN[role.name] ?? role.name)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 text-muted-foreground",
								children: role.description ?? "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											asChild: true,
											size: "icon",
											variant: "ghost",
											title: bi("الصلاحيات", "Permissions"),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
												to: "/role-permissions/$roleId",
												params: { roleId: role.id },
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings2, { className: "size-4" })
											})
										}),
										can("admin_roles", "edit") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "icon",
											variant: "ghost",
											title: bi("تعديل", "Edit"),
											onClick: () => openDialog(role),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" })
										}),
										can("admin_roles", "delete") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "icon",
											variant: "ghost",
											title: bi("حذف", "Delete"),
											className: "text-destructive",
											onClick: () => setPendingDelete(role),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
										})
									]
								})
							})
						]
					}, role.id)), !isLoading && !(data ?? []).length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						colSpan: 4,
						className: "p-8 text-center text-muted-foreground",
						children: bi("لا توجد أنواع مستخدمين بعد.", "No roles yet.")
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
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: editing ? bi("تعديل نوع المستخدم", "Edit role") : bi("إضافة نوع مستخدم", "Add role") }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "role-name",
								children: bi("الاسم", "Name")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "role-name",
								value: name,
								onChange: (e) => setName(e.target.value)
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "role-desc",
								children: bi("الوصف", "Description")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								id: "role-desc",
								value: description,
								onChange: (e) => setDescription(e.target.value),
								rows: 3
							})]
						})]
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
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: (() => {
					const n = pendingDelete ? bi(pendingDelete.name, ROLE_NAME_EN[pendingDelete.name] ?? pendingDelete.name) : "";
					return bi(`حذف «${n}»؟`, `Delete "${n}"?`);
				})() }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: bi("سيتم حذف النوع وكل صلاحياته. لا يمكن التراجع عن هذا الإجراء.", "The role and all of its permissions will be deleted. This cannot be undone.") })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, {
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
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Guard, {
	pageKey: "admin_roles",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserTypesPage, {})
});
//#endregion
export { SplitComponent as component };
