import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { w as useBi } from "./rbac-static-data-g2eybyR5.mjs";
import { n as useServerFn } from "./createSsrRpc-wq0ICmoa.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { d as useAccess } from "./use-access-C_0mcNbc.mjs";
import { n as Guard } from "./guard-DmupFA9_.mjs";
import { E as Pencil, H as LoaderCircle, T as Plus, l as Trash2 } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-RXwCFfhv.mjs";
import { a as Panel, c as RowList, i as EmptyState, l as StatGrid, t as AppPage } from "./kit-DDkPK7fJ.mjs";
import { t as Input } from "./input-D0-bbXyS.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, o as Label, r as DialogFooter, t as Dialog } from "./dialog-1uq10XBZ.mjs";
import { a as AlertDialogDescription, c as AlertDialogTitle, i as AlertDialogContent, n as AlertDialogAction, o as AlertDialogFooter, r as AlertDialogCancel, s as AlertDialogHeader, t as AlertDialog } from "./alert-dialog-DwQS8Syk.mjs";
import { c as listLibrarySubjects, p as saveLibrarySubject, r as deleteLibrarySubject } from "./student-learning.functions-DN3V6ojr.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as description } from "./library-CKzaZr2h.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/library-9leWZsuR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PageRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Guard, {
		pageKey: "student_library",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, {})
	});
}
var EMPTY_FORM = {
	subjectName: "",
	termLabel: "الفصل الأول",
	unitsCount: "0",
	lessonsCount: "0",
	progressPercent: "0"
};
function Body() {
	const bi = useBi();
	const queryClient = useQueryClient();
	const { can } = useAccess();
	const fetchRows = useServerFn(listLibrarySubjects);
	const persist = useServerFn(saveLibrarySubject);
	const remove = useServerFn(deleteLibrarySubject);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [editingId, setEditingId] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)(EMPTY_FORM);
	const [pendingDelete, setPendingDelete] = (0, import_react.useState)(null);
	const { data: rows, isLoading } = useQuery({
		queryKey: ["library-subjects"],
		queryFn: () => fetchRows()
	});
	const invalidate = () => queryClient.invalidateQueries({ queryKey: ["library-subjects"] });
	const stats = (0, import_react.useMemo)(() => {
		const list = rows ?? [];
		const units = list.reduce((s, r) => s + r.unitsCount, 0);
		const lessons = list.reduce((s, r) => s + r.lessonsCount, 0);
		const completedLessons = Math.round(list.reduce((s, r) => s + r.lessonsCount * r.progressPercent / 100, 0));
		return {
			subjects: list.length,
			units,
			lessons,
			completedLessons
		};
	}, [rows]);
	const continueList = (0, import_react.useMemo)(() => (rows ?? []).filter((r) => r.progressPercent > 0 && r.progressPercent < 100), [rows]);
	const saveMutation = useMutation({
		mutationFn: () => persist({ data: {
			...form,
			id: editingId ?? void 0,
			unitsCount: Number(form.unitsCount) || 0,
			lessonsCount: Number(form.lessonsCount) || 0,
			progressPercent: Number(form.progressPercent) || 0
		} }),
		onSuccess: () => {
			invalidate();
			setOpen(false);
			toast.success(bi("تم الحفظ", "Saved successfully"));
		},
		onError: (e) => toast.error(e instanceof Error ? e.message : bi("تعذّر الحفظ", "Failed to save"))
	});
	const deleteMutation = useMutation({
		mutationFn: (id) => remove({ data: { id } }),
		onSuccess: () => {
			invalidate();
			setPendingDelete(null);
			toast.success(bi("تم الحذف", "Deleted successfully"));
		},
		onError: (e) => toast.error(e instanceof Error ? e.message : bi("تعذّر الحذف", "Failed to delete"))
	});
	function openDialog(row) {
		setEditingId(row?.id ?? null);
		setForm(row ? {
			subjectName: row.subjectName,
			termLabel: row.termLabel,
			unitsCount: String(row.unitsCount),
			lessonsCount: String(row.lessonsCount),
			progressPercent: String(row.progressPercent)
		} : EMPTY_FORM);
		setOpen(true);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppPage, {
		title: bi("المكتبة", "Library"),
		icon: "Library",
		subtitle: bi(description, "A tidy library: term → subject → unit → lesson. No more files lost in WhatsApp."),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatGrid, { items: [
				{
					icon: "Book",
					label: bi("مواد", "Subjects"),
					value: String(stats.subjects)
				},
				{
					icon: "Layers",
					label: bi("وحدات", "Units"),
					value: String(stats.units)
				},
				{
					icon: "FileText",
					label: bi("دروس", "Lessons"),
					value: String(stats.lessons)
				},
				{
					icon: "CheckCircle2",
					label: bi("دروس مكتملة", "Completed"),
					value: String(stats.completedLessons)
				}
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: bi("موادك", "Your subjects"),
				icon: "Book",
				action: can("student_library", "show_add_form") ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					onClick: () => openDialog(null),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), bi("إضافة مادة", "Add subject")]
				}) : void 0,
				children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex justify-center py-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-5 animate-spin text-primary" })
				}) : rows?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowList, { rows: rows.map((r) => ({
					title: `${r.subjectName} — ${r.termLabel}`,
					meta: bi(`${r.unitsCount} وحدات · ${r.lessonsCount} درساً`, `${r.unitsCount} units · ${r.lessonsCount} lessons`),
					value: `${r.progressPercent}%`,
					tone: r.progressPercent >= 80 ? "success" : r.progressPercent >= 40 ? "primary" : "muted",
					actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1",
						children: [can("student_library", "edit") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "icon",
							variant: "ghost",
							onClick: () => openDialog(r),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" })
						}), can("student_library", "delete") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "icon",
							variant: "ghost",
							className: "text-destructive",
							onClick: () => setPendingDelete(r),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
						})]
					})
				})) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					icon: "Book",
					text: bi("لا مواد بعد.", "No subjects yet.")
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: bi("أكمل من حيث توقفت", "Continue where you left off"),
				icon: "History",
				children: continueList.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowList, {
					to: "/library/lesson/1",
					rows: continueList.map((r) => ({
						title: r.subjectName,
						meta: r.termLabel,
						value: bi("متابعة", "Resume"),
						tone: "primary"
					}))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					icon: "History",
					text: bi("لا شي بانتظار المتابعة الآن.", "Nothing to resume right now.")
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open,
				onOpenChange: setOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "text-start",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: editingId ? bi("تعديل مادة", "Edit subject") : bi("إضافة مادة", "Add subject") }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5 sm:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "lib-subject",
										children: bi("اسم المادة", "Subject name")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "lib-subject",
										value: form.subjectName,
										onChange: (e) => setForm((f) => ({
											...f,
											subjectName: e.target.value
										}))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "lib-term",
										children: bi("الفصل", "Term")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "lib-term",
										value: form.termLabel,
										onChange: (e) => setForm((f) => ({
											...f,
											termLabel: e.target.value
										}))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "lib-progress",
										children: bi("نسبة الإنجاز (%)", "Progress (%)")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "lib-progress",
										type: "number",
										min: 0,
										max: 100,
										value: form.progressPercent,
										onChange: (e) => setForm((f) => ({
											...f,
											progressPercent: e.target.value
										}))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "lib-units",
										children: bi("عدد الوحدات", "Units count")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "lib-units",
										type: "number",
										min: 0,
										value: form.unitsCount,
										onChange: (e) => setForm((f) => ({
											...f,
											unitsCount: e.target.value
										}))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "lib-lessons",
										children: bi("عدد الدروس", "Lessons count")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "lib-lessons",
										type: "number",
										min: 0,
										value: form.lessonsCount,
										onChange: (e) => setForm((f) => ({
											...f,
											lessonsCount: e.target.value
										}))
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
							className: "gap-2 sm:justify-start",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: () => saveMutation.mutate(),
								disabled: saveMutation.isPending || !form.subjectName.trim(),
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
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: bi(`حذف «${pendingDelete?.subjectName}»؟`, `Delete "${pendingDelete?.subjectName}"?`) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: bi("لا يمكن التراجع عن هذا الإجراء.", "This action cannot be undone.") })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, {
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
