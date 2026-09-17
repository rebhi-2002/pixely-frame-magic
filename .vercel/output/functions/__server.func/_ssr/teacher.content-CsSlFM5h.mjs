import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { A as useBi, p as getErrorMessage } from "./rbac-static-data-DgiM51a_.mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { $ as LoaderCircle, F as Pencil, P as Plus, p as Trash2 } from "../_libs/lucide-react.mjs";
import { l as description$8 } from "./router-B2E04MFx.mjs";
import { n as useServerFn } from "./createSsrRpc-D3FH_hmA.mjs";
import { d as useAccess } from "./use-access-BCs0D1hx.mjs";
import { n as Guard } from "./guard-CaBAnt-a.mjs";
import { t as Button } from "./button-DfTXnEII.mjs";
import { i as EmptyState, n as Badge, o as Panel, r as DataTable, t as AppPage, u as StatGrid } from "./kit-Ctaz_npe.mjs";
import { t as Input } from "./input-D0-bbXyS.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, r as DialogFooter, t as Dialog } from "./dialog-CE79KVEh.mjs";
import { a as AlertDialogDescription, c as AlertDialogTitle, i as AlertDialogContent, n as AlertDialogAction, o as AlertDialogFooter, r as AlertDialogCancel, s as AlertDialogHeader, t as AlertDialog } from "./alert-dialog-CRZk8vpy.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-CbSL31Oe.mjs";
import { c as saveContentItem, i as listContentItems, t as deleteContentItem } from "./teacher-teaching.functions-ggJa_1v_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/teacher.content-CsSlFM5h.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PageRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Guard, {
		pageKey: "teacher_content",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, {})
	});
}
var EMPTY_FORM = {
	title: "",
	subjectName: "",
	status: "مسوّدة",
	viewsCount: "0"
};
var STATUS_TONE = {
	منشور: "success",
	"قيد المراجعة": "muted",
	مسوّدة: "primary"
};
function Body() {
	const bi = useBi();
	const queryClient = useQueryClient();
	const { can } = useAccess();
	const fetchRows = useServerFn(listContentItems);
	const persist = useServerFn(saveContentItem);
	const remove = useServerFn(deleteContentItem);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [editingId, setEditingId] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)(EMPTY_FORM);
	const [pendingDelete, setPendingDelete] = (0, import_react.useState)(null);
	const { data: rows, isLoading } = useQuery({
		queryKey: ["teacher-content"],
		queryFn: () => fetchRows()
	});
	const invalidate = () => queryClient.invalidateQueries({ queryKey: ["teacher-content"] });
	const list = (0, import_react.useMemo)(() => rows ?? [], [rows]);
	const stats = (0, import_react.useMemo)(() => ({
		published: list.filter((r) => r.status === "منشور").length,
		inReview: list.filter((r) => r.status === "قيد المراجعة").length,
		drafts: list.filter((r) => r.status === "مسوّدة").length,
		views: list.reduce((s, r) => s + r.viewsCount, 0)
	}), [list]);
	const saveMutation = useMutation({
		mutationFn: () => persist({ data: {
			...form,
			id: editingId ?? void 0,
			viewsCount: Number(form.viewsCount) || 0
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
			subjectName: row.subjectName,
			status: row.status,
			viewsCount: String(row.viewsCount)
		} : EMPTY_FORM);
		setOpen(true);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppPage, {
		title: bi("المحتوى", "Content"),
		icon: "FileStack",
		subtitle: bi(description$8, "Your lessons and files: upload, place on the curriculum tree, submit for review."),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatGrid, { items: [
				{
					icon: "FileStack",
					label: bi("دروس منشورة", "Published"),
					value: String(stats.published)
				},
				{
					icon: "Clock",
					label: bi("قيد المراجعة", "In review"),
					value: String(stats.inReview)
				},
				{
					icon: "FileEdit",
					label: bi("مسوّدات", "Drafts"),
					value: String(stats.drafts)
				},
				{
					icon: "Eye",
					label: bi("مشاهدات الشهر", "Views this month"),
					value: String(stats.views)
				}
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: bi("أحدث المحتوى", "Recent content"),
				icon: "FileStack",
				action: can("teacher_content", "show_add_form") ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					onClick: () => openDialog(null),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), bi("إضافة محتوى", "Add content")]
				}) : void 0,
				children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex justify-center py-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-5 animate-spin text-primary" })
				}) : list.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
					head: [
						bi("العنوان", "Title"),
						bi("المادة", "Subject"),
						bi("الحالة", "Status"),
						bi("مشاهدات", "Views"),
						bi("", "")
					],
					rows: list.map((r) => [
						r.title,
						r.subjectName,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: STATUS_TONE[r.status],
							children: bi(r.status, r.status === "منشور" ? "Published" : r.status === "قيد المراجعة" ? "In review" : "Draft")
						}, r.id),
						r.viewsCount > 0 ? String(r.viewsCount) : "—",
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-end gap-1",
							children: [can("teacher_content", "edit") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "icon",
								variant: "ghost",
								onClick: () => openDialog(r),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" })
							}), can("teacher_content", "delete") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "icon",
								variant: "ghost",
								className: "text-destructive",
								onClick: () => setPendingDelete(r),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
							})]
						}, `${r.id}-actions`)
					])
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					icon: "FileStack",
					text: bi("لا محتوى بعد.", "No content yet.")
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open,
				onOpenChange: setOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "text-start",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: editingId ? bi("تعديل محتوى", "Edit content") : bi("إضافة محتوى", "Add content") }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5 sm:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "ci-title",
										children: bi("العنوان", "Title")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "ci-title",
										value: form.title,
										onChange: (e) => setForm((f) => ({
											...f,
											title: e.target.value
										}))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "ci-subject",
										children: bi("المادة", "Subject")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "ci-subject",
										value: form.subjectName,
										onChange: (e) => setForm((f) => ({
											...f,
											subjectName: e.target.value
										}))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: bi("الحالة", "Status") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										value: form.status,
										onValueChange: (v) => setForm((f) => ({
											...f,
											status: v
										})),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: "مسوّدة",
												children: bi("مسوّدة", "Draft")
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: "قيد المراجعة",
												children: bi("قيد المراجعة", "In review")
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: "منشور",
												children: bi("منشور", "Published")
											})
										] })]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5 sm:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "ci-views",
										children: bi("عدد المشاهدات", "Views count")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "ci-views",
										type: "number",
										min: 0,
										value: form.viewsCount,
										onChange: (e) => setForm((f) => ({
											...f,
											viewsCount: e.target.value
										}))
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
