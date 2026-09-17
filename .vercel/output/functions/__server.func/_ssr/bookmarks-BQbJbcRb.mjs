import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { $ as LoaderCircle, F as Pencil, P as Plus, p as Trash2 } from "../_libs/lucide-react.mjs";
import { P as description$29, yt as useBi } from "./router-DK5KNs7n.mjs";
import { n as useServerFn } from "./createSsrRpc-572OBH4c.mjs";
import { d as useAccess } from "./use-access-KQVg7Dvq.mjs";
import { n as Guard } from "./guard-BP3o1aU5.mjs";
import { t as Button } from "./button-DfTXnEII.mjs";
import { i as EmptyState, l as RowList, o as Panel, t as AppPage, u as StatGrid } from "./kit-DhMq0cTG.mjs";
import { t as Input } from "./input-D0-bbXyS.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, r as DialogFooter, t as Dialog } from "./dialog-CE79KVEh.mjs";
import { a as AlertDialogDescription, c as AlertDialogTitle, i as AlertDialogContent, n as AlertDialogAction, o as AlertDialogFooter, r as AlertDialogCancel, s as AlertDialogHeader, t as AlertDialog } from "./alert-dialog-CRZk8vpy.mjs";
import { t as getErrorMessage } from "./client-Bmh1iu6g.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-CbSL31Oe.mjs";
import { d as saveBookmark, s as listBookmarks, t as deleteBookmark } from "./student-social.functions-Dt70dV46.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/bookmarks-BQbJbcRb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PageRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Guard, {
		pageKey: "student_bookmarks",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, {})
	});
}
var EMPTY_FORM = {
	itemTitle: "",
	subjectName: "",
	type: "درس"
};
var TYPE_TONE = {
	درس: "primary",
	سؤال: "muted",
	نقاش: "success"
};
function Body() {
	const bi = useBi();
	const queryClient = useQueryClient();
	const { can } = useAccess();
	const fetchRows = useServerFn(listBookmarks);
	const persist = useServerFn(saveBookmark);
	const remove = useServerFn(deleteBookmark);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [editingId, setEditingId] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)(EMPTY_FORM);
	const [pendingDelete, setPendingDelete] = (0, import_react.useState)(null);
	const { data: rows, isLoading } = useQuery({
		queryKey: ["bookmarks"],
		queryFn: () => fetchRows()
	});
	const invalidate = () => queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
	const list = (0, import_react.useMemo)(() => rows ?? [], [rows]);
	const stats = (0, import_react.useMemo)(() => ({
		total: list.length,
		lessons: list.filter((r) => r.type === "درس").length,
		questions: list.filter((r) => r.type === "سؤال").length,
		threads: list.filter((r) => r.type === "نقاش").length
	}), [list]);
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
			toast.success(bi("تمت الإزالة", "Removed"));
		},
		onError: (e) => toast.error(getErrorMessage(e, bi("تعذّر الحذف", "Failed to delete")))
	});
	function openDialog(row) {
		setEditingId(row?.id ?? null);
		setForm(row ? {
			itemTitle: row.itemTitle,
			subjectName: row.subjectName,
			type: row.type
		} : EMPTY_FORM);
		setOpen(true);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppPage, {
		title: bi("المحفوظات", "Bookmarks"),
		icon: "Bookmark",
		subtitle: bi(description$29, "Everything you saved: lessons, questions and threads — in one quick-access place."),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatGrid, { items: [
				{
					icon: "Bookmark",
					label: bi("عناصر محفوظة", "Saved items"),
					value: String(stats.total)
				},
				{
					icon: "FileText",
					label: bi("دروس", "Lessons"),
					value: String(stats.lessons)
				},
				{
					icon: "HelpCircle",
					label: bi("أسئلة", "Questions"),
					value: String(stats.questions)
				},
				{
					icon: "MessagesSquare",
					label: bi("نقاشات", "Threads"),
					value: String(stats.threads)
				}
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: bi("محفوظاتك", "Your bookmarks"),
				icon: "Bookmark",
				action: can("student_bookmarks", "show_add_form") ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					onClick: () => openDialog(null),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), bi("إضافة عنصر", "Add item")]
				}) : void 0,
				children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex justify-center py-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-5 animate-spin text-primary" })
				}) : list.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowList, { rows: list.map((r) => ({
					title: r.itemTitle,
					meta: r.subjectName,
					value: bi(r.type, r.type === "درس" ? "Lesson" : r.type === "سؤال" ? "Question" : "Thread"),
					tone: TYPE_TONE[r.type],
					actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1",
						children: [can("student_bookmarks", "edit") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "icon",
							variant: "ghost",
							onClick: () => openDialog(r),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" })
						}), can("student_bookmarks", "delete") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "icon",
							variant: "ghost",
							className: "text-destructive",
							onClick: () => setPendingDelete(r),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
						})]
					})
				})) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					icon: "Bookmark",
					text: bi("لا محفوظات بعد.", "No bookmarks yet.")
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open,
				onOpenChange: setOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "text-start",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: editingId ? bi("تعديل عنصر", "Edit item") : bi("إضافة عنصر", "Add item") }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5 sm:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "bm-title",
										children: bi("العنوان", "Title")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "bm-title",
										value: form.itemTitle,
										onChange: (e) => setForm((f) => ({
											...f,
											itemTitle: e.target.value
										}))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "bm-subject",
										children: bi("المادة", "Subject")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "bm-subject",
										value: form.subjectName,
										onChange: (e) => setForm((f) => ({
											...f,
											subjectName: e.target.value
										}))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: bi("النوع", "Type") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										value: form.type,
										onValueChange: (v) => setForm((f) => ({
											...f,
											type: v
										})),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: "درس",
												children: bi("درس", "Lesson")
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: "سؤال",
												children: bi("سؤال", "Question")
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: "نقاش",
												children: bi("نقاش", "Thread")
											})
										] })]
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
							className: "gap-2 sm:justify-start",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: () => saveMutation.mutate(),
								disabled: saveMutation.isPending || !form.itemTitle.trim(),
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
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: bi(`إزالة «${pendingDelete?.itemTitle}»؟`, `Remove "${pendingDelete?.itemTitle}"?`) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: bi("لا يمكن التراجع عن هذا الإجراء.", "This action cannot be undone.") })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, {
						className: "gap-2 sm:justify-start",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
							onClick: () => pendingDelete && deleteMutation.mutate(pendingDelete.id),
							children: bi("إزالة", "Remove")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: bi("إلغاء", "Cancel") })]
					})]
				})
			})
		]
	});
}
//#endregion
export { PageRoute as component };
