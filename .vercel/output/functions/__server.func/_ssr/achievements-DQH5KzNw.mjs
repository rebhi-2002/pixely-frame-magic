import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { M as useBi, p as getErrorMessage } from "./rbac-static-data-6lJhuenE.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { M as Plus, N as Pencil, X as LoaderCircle, p as Trash2 } from "../_libs/lucide-react.mjs";
import { F as description$30 } from "./router-ClmuBdEg.mjs";
import { n as useServerFn } from "./createSsrRpc-ByxigA6S.mjs";
import { d as useAccess } from "./use-access-BODhyQaf.mjs";
import { n as Guard } from "./guard-X81oQi1X.mjs";
import { t as Button } from "./button-Nx-_C_c8.mjs";
import { i as EmptyState, l as RowList, o as Panel, s as Progress, t as AppPage, u as StatGrid } from "./kit-CS2UTmaS.mjs";
import { t as Input } from "./input-D0-bbXyS.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { t as Switch } from "./switch-Cn1w-cIH.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, r as DialogFooter, t as Dialog } from "./dialog-CE79KVEh.mjs";
import { a as AlertDialogDescription, c as AlertDialogTitle, i as AlertDialogContent, n as AlertDialogAction, o as AlertDialogFooter, r as AlertDialogCancel, s as AlertDialogHeader, t as AlertDialog } from "./alert-dialog-OIHj-NyW.mjs";
import { d as saveBadge, o as listBadges, t as deleteBadge } from "./student-evaluation.functions-CYKtAgl-.mjs";
import { a as getStudyStats, c as listLibrarySubjects } from "./student-learning.functions-BJkQjJcZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/achievements-DQH5KzNw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PageRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Guard, {
		pageKey: "student_achievements",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, {})
	});
}
var EMPTY_FORM = {
	title: "",
	subtitle: "",
	unlocked: false
};
function Body() {
	const bi = useBi();
	const queryClient = useQueryClient();
	const { can } = useAccess();
	const fetchBadges = useServerFn(listBadges);
	const persist = useServerFn(saveBadge);
	const remove = useServerFn(deleteBadge);
	const fetchStats = useServerFn(getStudyStats);
	const fetchSubjects = useServerFn(listLibrarySubjects);
	const badgesQuery = useQuery({
		queryKey: ["badges"],
		queryFn: () => fetchBadges()
	});
	const statsQuery = useQuery({
		queryKey: ["study-stats"],
		queryFn: () => fetchStats()
	});
	const subjectsQuery = useQuery({
		queryKey: ["library-subjects"],
		queryFn: () => fetchSubjects()
	});
	const [open, setOpen] = (0, import_react.useState)(false);
	const [editingId, setEditingId] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)(EMPTY_FORM);
	const [pendingDelete, setPendingDelete] = (0, import_react.useState)(null);
	const isLoading = badgesQuery.isLoading || statsQuery.isLoading || subjectsQuery.isLoading;
	const badges = (0, import_react.useMemo)(() => badgesQuery.data ?? [], [badgesQuery.data]);
	const stats = statsQuery.data ?? {
		streakDays: 0,
		achievementPoints: 0,
		longestStreak: 0
	};
	const subjects = (0, import_react.useMemo)(() => subjectsQuery.data ?? [], [subjectsQuery.data]);
	const unlockedCount = badges.filter((b) => b.unlocked).length;
	const invalidate = () => queryClient.invalidateQueries({ queryKey: ["badges"] });
	const saveMutation = useMutation({
		mutationFn: () => persist({ data: {
			...form,
			id: editingId ?? void 0
		} }),
		onSuccess: () => {
			invalidate();
			setOpen(false);
			toast.success(bi("تم الحفظ", "Saved successfully"));
		},
		onError: (e) => toast.error(getErrorMessage(e, bi("تعذّر الحفظ", "Failed to save")))
	});
	const deleteMutation = useMutation({
		mutationFn: (id) => remove({ data: { id } }),
		onSuccess: () => {
			invalidate();
			setPendingDelete(null);
			toast.success(bi("تم الحذف", "Deleted successfully"));
		},
		onError: (e) => toast.error(getErrorMessage(e, bi("تعذّر الحذف", "Failed to delete")))
	});
	function openDialog(row) {
		setEditingId(row?.id ?? null);
		setForm(row ? {
			title: row.title,
			subtitle: row.subtitle,
			unlocked: row.unlocked
		} : EMPTY_FORM);
		setOpen(true);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppPage, {
		title: bi("الإنجاز", "Achievements"),
		icon: "Trophy",
		subtitle: bi(description$30, "Progress measured by mastery, not hours: badges, streaks and per-subject mastery."),
		children: [
			isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex justify-center py-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-6 animate-spin text-primary" })
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatGrid, { items: [
					{
						icon: "Trophy",
						label: bi("نقاط الإنجاز", "Points"),
						value: String(stats.achievementPoints)
					},
					{
						icon: "Medal",
						label: bi("شارات مفتوحة", "Unlocked badges"),
						value: `${unlockedCount}/${badges.length}`
					},
					{
						icon: "Flame",
						label: bi("أطول سلسلة", "Longest streak"),
						value: String(stats.longestStreak)
					},
					{
						icon: "Flame",
						label: bi("السلسلة الحالية", "Current streak"),
						value: String(stats.streakDays)
					}
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: bi("شاراتك", "Your badges"),
					icon: "Medal",
					action: can("student_achievements", "show_add_form") ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						onClick: () => openDialog(null),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), bi("إضافة شارة", "Add badge")]
					}) : void 0,
					children: badges.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowList, { rows: badges.map((b) => ({
						title: b.title,
						meta: b.subtitle,
						value: bi(b.unlocked ? "مفتوحة" : "قريباً", b.unlocked ? "Unlocked" : "Almost"),
						tone: b.unlocked ? "success" : "primary",
						actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1",
							children: [can("student_achievements", "edit") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "icon",
								variant: "ghost",
								onClick: () => openDialog(b),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" })
							}), can("student_achievements", "delete") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "icon",
								variant: "ghost",
								className: "text-destructive",
								onClick: () => setPendingDelete(b),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
							})]
						})
					})) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
						icon: "Medal",
						text: bi("لا شارات بعد.", "No badges yet.")
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: bi("إتقان المواد", "Subject mastery"),
					icon: "LineChart",
					children: subjects.length ? subjects.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
						label: s.subjectName,
						value: s.progressPercent
					}, s.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
						icon: "LineChart",
						text: bi("أضف مواد بالمكتبة عشان تظهر هون.", "Add subjects in the library to see them here.")
					})
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open,
				onOpenChange: setOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "text-start",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: editingId ? bi("تعديل شارة", "Edit badge") : bi("إضافة شارة", "Add badge") }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5 sm:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "bdg-title",
										children: bi("العنوان", "Title")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "bdg-title",
										value: form.title,
										onChange: (e) => setForm((f) => ({
											...f,
											title: e.target.value
										}))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5 sm:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "bdg-subtitle",
										children: bi("الوصف", "Subtitle")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "bdg-subtitle",
										value: form.subtitle,
										onChange: (e) => setForm((f) => ({
											...f,
											subtitle: e.target.value
										}))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 sm:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
										id: "bdg-unlocked",
										checked: form.unlocked,
										onCheckedChange: (v) => setForm((f) => ({
											...f,
											unlocked: v
										}))
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "bdg-unlocked",
										children: bi("مفتوحة", "Unlocked")
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
							className: "gap-2 sm:justify-start",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: () => saveMutation.mutate(),
								disabled: saveMutation.isPending || !form.title.trim(),
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
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: bi(`حذف «${pendingDelete?.title}»؟`, `Delete "${pendingDelete?.title}"?`) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: bi("لا يمكن التراجع عن هذا الإجراء.", "This action cannot be undone.") })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, {
						className: "gap-2 sm:justify-start",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
							onClick: () => pendingDelete && deleteMutation.mutate(pendingDelete.id),
							children: bi("حذف", "Delete")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: bi("إلغاء", "Cancel") })]
					})]
				})
			})
		]
	});
}
//#endregion
export { PageRoute as component };
