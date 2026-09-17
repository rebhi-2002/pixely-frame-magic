import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { A as useBi, p as getErrorMessage } from "./rbac-static-data-DgiM51a_.mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { $ as LoaderCircle, P as Plus, l as UserMinus } from "../_libs/lucide-react.mjs";
import { _ as description$15 } from "./router-B2E04MFx.mjs";
import { n as useServerFn } from "./createSsrRpc-D3FH_hmA.mjs";
import { d as useAccess } from "./use-access-BCs0D1hx.mjs";
import { n as Guard } from "./guard-CaBAnt-a.mjs";
import { t as Button } from "./button-DfTXnEII.mjs";
import { c as QuickLinks, i as EmptyState, l as RowList, o as Panel, t as AppPage, u as StatGrid } from "./kit-Ctaz_npe.mjs";
import { t as Input } from "./input-D0-bbXyS.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { t as Switch } from "./switch-Cn1w-cIH.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, r as DialogFooter, t as Dialog } from "./dialog-CE79KVEh.mjs";
import { a as AlertDialogDescription, c as AlertDialogTitle, i as AlertDialogContent, n as AlertDialogAction, o as AlertDialogFooter, r as AlertDialogCancel, s as AlertDialogHeader, t as AlertDialog } from "./alert-dialog-CRZk8vpy.mjs";
import { o as listLinkedChildren, p as unlinkChild, r as getParentNotificationPrefs, t as addLinkedChild, u as saveParentNotificationPrefs } from "./account-pages.functions-BhHJvPyJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/parent.settings-BwXclH0x.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PageRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Guard, {
		pageKey: "parent_settings",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, {})
	});
}
function Body() {
	const bi = useBi();
	const queryClient = useQueryClient();
	const { can } = useAccess();
	const fetchChildren = useServerFn(listLinkedChildren);
	const addChild = useServerFn(addLinkedChild);
	const removeChild = useServerFn(unlinkChild);
	const fetchPrefs = useServerFn(getParentNotificationPrefs);
	const persistPrefs = useServerFn(saveParentNotificationPrefs);
	const childrenQuery = useQuery({
		queryKey: ["linked-children"],
		queryFn: () => fetchChildren()
	});
	const prefsQuery = useQuery({
		queryKey: ["parent-notification-prefs"],
		queryFn: () => fetchPrefs()
	});
	const [addOpen, setAddOpen] = (0, import_react.useState)(false);
	const [childForm, setChildForm] = (0, import_react.useState)({
		childName: "",
		gradeLabel: ""
	});
	const [pendingUnlink, setPendingUnlink] = (0, import_react.useState)(null);
	const isLoading = childrenQuery.isLoading || prefsQuery.isLoading;
	const children = (0, import_react.useMemo)(() => childrenQuery.data ?? [], [childrenQuery.data]);
	const prefs = prefsQuery.data ?? {
		weeklyReport: true,
		masteryAlert: true,
		teacherMessages: true
	};
	const addMutation = useMutation({
		mutationFn: () => addChild({ data: childForm }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["linked-children"] });
			setAddOpen(false);
			setChildForm({
				childName: "",
				gradeLabel: ""
			});
			toast.success(bi("تم الربط", "Linked successfully"));
		},
		onError: (e) => toast.error(getErrorMessage(e, bi("تعذّر الربط", "Failed to link")))
	});
	const unlinkMutation = useMutation({
		mutationFn: (id) => removeChild({ data: { id } }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["linked-children"] });
			setPendingUnlink(null);
			toast.success(bi("تم فك الربط", "Unlinked successfully"));
		},
		onError: (e) => toast.error(getErrorMessage(e, bi("تعذّر فك الربط", "Failed to unlink")))
	});
	const prefsMutation = useMutation({
		mutationFn: (next) => persistPrefs({ data: next }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["parent-notification-prefs"] });
			toast.success(bi("تم الحفظ", "Saved successfully"));
		},
		onError: (e) => toast.error(getErrorMessage(e, bi("تعذّر الحفظ", "Failed to save")))
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppPage, {
		title: bi("إعدادات ولي الأمر", "Parent settings"),
		icon: "Settings",
		subtitle: bi(description$15, "Linked children, unlinking, and notification/report preferences."),
		children: [
			isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex justify-center py-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-6 animate-spin text-primary" })
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatGrid, { items: [
					{
						icon: "Users",
						label: bi("أبناء مرتبطون", "Linked children"),
						value: String(children.length)
					},
					{
						icon: "Mail",
						label: bi("تقرير أسبوعي", "Weekly report"),
						value: bi(prefs.weeklyReport ? "مفعّل" : "متوقّف", prefs.weeklyReport ? "On" : "Off")
					},
					{
						icon: "BellRing",
						label: bi("تنبيهات فورية", "Instant alerts"),
						value: bi(prefs.masteryAlert ? "مفعّلة" : "متوقّفة", prefs.masteryAlert ? "On" : "Off")
					},
					{
						icon: "ShieldCheck",
						label: bi("حالة الحساب", "Account status"),
						value: bi("موثّق", "Verified")
					}
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: bi("الأبناء المرتبطون", "Linked children"),
					icon: "Users",
					action: can("parent_settings", "show_add_form") ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						onClick: () => setAddOpen(true),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), bi("ربط ابن", "Link child")]
					}) : void 0,
					children: children.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowList, { rows: children.map((c) => ({
						title: bi(`${c.childName} — ${c.gradeLabel}`, `${c.childName} — ${c.gradeLabel}`),
						meta: bi(`ارتبط ${c.linkedDateLabel}`, `Linked ${c.linkedDateLabel}`),
						tone: "primary",
						actions: can("parent_settings", "delete") ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							variant: "outline",
							className: "text-destructive",
							onClick: () => setPendingUnlink(c),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserMinus, { className: "size-4" }), bi("فك الربط", "Unlink")]
						}) : void 0
					})) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
						icon: "Users",
						text: bi("ولا ابن مرتبط بعد.", "No linked children yet.")
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: bi("الإشعارات", "Notifications"),
					icon: "BellRing",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowList, { rows: [
						{
							title: bi("تقرير أسبوعي بالإيميل", "Weekly email report"),
							meta: bi("كل أحد 8:00", "Every Sunday 8:00"),
							value: bi(prefs.weeklyReport ? "مفعّل" : "متوقّف", prefs.weeklyReport ? "On" : "Off"),
							tone: prefs.weeklyReport ? "success" : "muted",
							actions: can("parent_settings", "edit") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
								checked: prefs.weeklyReport,
								onCheckedChange: (v) => prefsMutation.mutate({
									...prefs,
									weeklyReport: v
								})
							}) : void 0
						},
						{
							title: bi("تنبيه تراجع الإتقان", "Mastery drop alert"),
							meta: bi("فوري", "Instant"),
							value: bi(prefs.masteryAlert ? "مفعّل" : "متوقّف", prefs.masteryAlert ? "On" : "Off"),
							tone: prefs.masteryAlert ? "success" : "muted",
							actions: can("parent_settings", "edit") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
								checked: prefs.masteryAlert,
								onCheckedChange: (v) => prefsMutation.mutate({
									...prefs,
									masteryAlert: v
								})
							}) : void 0
						},
						{
							title: bi("رسائل المعلمين", "Teacher messages"),
							meta: bi("ملخّص يومي", "Daily digest"),
							value: bi(prefs.teacherMessages ? "مفعّل" : "متوقّف", prefs.teacherMessages ? "On" : "Off"),
							tone: prefs.teacherMessages ? "success" : "muted",
							actions: can("parent_settings", "edit") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
								checked: prefs.teacherMessages,
								onCheckedChange: (v) => prefsMutation.mutate({
									...prefs,
									teacherMessages: v
								})
							}) : void 0
						}
					] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: bi("روابط سريعة", "Quick links"),
					icon: "Settings",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickLinks, { items: [
						{
							to: "/parent/report",
							label: bi("تقرير الابن", "Child report"),
							icon: "FileBarChart"
						},
						{
							to: "/notifications",
							label: bi("الإشعارات", "Notifications"),
							icon: "Bell"
						},
						{
							to: "/settings",
							label: bi("اللغة والثيم", "Language & theme"),
							icon: "Palette"
						}
					] })
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: addOpen,
				onOpenChange: setAddOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "text-start",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: bi("ربط ابن جديد", "Link a new child") }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "lc-name",
									children: bi("اسم الابن", "Child's name")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "lc-name",
									value: childForm.childName,
									onChange: (e) => setChildForm((f) => ({
										...f,
										childName: e.target.value
									}))
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "lc-grade",
									children: bi("الصف", "Grade")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "lc-grade",
									value: childForm.gradeLabel,
									onChange: (e) => setChildForm((f) => ({
										...f,
										gradeLabel: e.target.value
									}))
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
							className: "gap-2 sm:justify-start",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: () => addMutation.mutate(),
								disabled: addMutation.isPending || !childForm.childName.trim() || !childForm.gradeLabel.trim(),
								children: bi("ربط", "Link")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								onClick: () => setAddOpen(false),
								children: bi("إلغاء", "Cancel")
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
				open: !!pendingUnlink,
				onOpenChange: (v) => !v && setPendingUnlink(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, {
					className: "text-start",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: bi(`فك الربط مع «${pendingUnlink?.childName}»؟`, `Unlink "${pendingUnlink?.childName}"?`) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: bi("لا يمكن التراجع عن هذا الإجراء.", "This action cannot be undone.") })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, {
						className: "gap-2 sm:justify-start",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
							onClick: () => pendingUnlink && unlinkMutation.mutate(pendingUnlink.id),
							children: bi("فك الربط", "Unlink")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: bi("إلغاء", "Cancel") })]
					})]
				})
			})
		]
	});
}
//#endregion
export { PageRoute as component };
