import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { $ as LoaderCircle, F as Pencil, P as Plus, p as Trash2 } from "../_libs/lucide-react.mjs";
import { O as description$23, yt as useBi } from "./router-DK5KNs7n.mjs";
import { n as useServerFn } from "./createSsrRpc-572OBH4c.mjs";
import { d as useAccess } from "./use-access-KQVg7Dvq.mjs";
import { n as Guard } from "./guard-BP3o1aU5.mjs";
import { t as Button } from "./button-DfTXnEII.mjs";
import { i as EmptyState, l as RowList, o as Panel, s as Progress, t as AppPage, u as StatGrid } from "./kit-DhMq0cTG.mjs";
import { t as Input } from "./input-D0-bbXyS.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, r as DialogFooter, t as Dialog } from "./dialog-CE79KVEh.mjs";
import { a as AlertDialogDescription, c as AlertDialogTitle, i as AlertDialogContent, n as AlertDialogAction, o as AlertDialogFooter, r as AlertDialogCancel, s as AlertDialogHeader, t as AlertDialog } from "./alert-dialog-CRZk8vpy.mjs";
import { i as deleteMistake, l as listMistakes, m as saveMistake } from "./student-evaluation.functions-vtxWTo5c.mjs";
import { t as getErrorMessage } from "./client-Bmh1iu6g.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-CbSL31Oe.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/mistakes-bank-BHXknKTn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PageRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Guard, {
		pageKey: "student_mistakes",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, {})
	});
}
var EMPTY_FORM = {
	questionTitle: "",
	subjectName: "",
	wrongCount: "1",
	status: "أولوية"
};
var STATUS_TONE = {
	أولوية: "danger",
	مراجعة: "primary",
	مُتقن: "success"
};
function Body() {
	const bi = useBi();
	const queryClient = useQueryClient();
	const { can } = useAccess();
	const fetchRows = useServerFn(listMistakes);
	const persist = useServerFn(saveMistake);
	const remove = useServerFn(deleteMistake);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [editingId, setEditingId] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)(EMPTY_FORM);
	const [pendingDelete, setPendingDelete] = (0, import_react.useState)(null);
	const { data: rows, isLoading } = useQuery({
		queryKey: ["mistakes"],
		queryFn: () => fetchRows()
	});
	const invalidate = () => queryClient.invalidateQueries({ queryKey: ["mistakes"] });
	const list = (0, import_react.useMemo)(() => rows ?? [], [rows]);
	const stats = (0, import_react.useMemo)(() => {
		return {
			open: list.filter((r) => r.status !== "مُتقن").length,
			rotation: list.filter((r) => r.status === "مراجعة").length,
			mastered: list.filter((r) => r.status === "مُتقن").length
		};
	}, [list]);
	const bySubject = (0, import_react.useMemo)(() => {
		const totals = /* @__PURE__ */ new Map();
		for (const r of list) totals.set(r.subjectName, (totals.get(r.subjectName) ?? 0) + 1);
		const grand = list.length || 1;
		return Array.from(totals.entries()).map(([subject, count]) => ({
			subject,
			percent: Math.round(count / grand * 100)
		})).sort((a, b) => b.percent - a.percent);
	}, [list]);
	const mostRepeated = (0, import_react.useMemo)(() => [...list].sort((a, b) => b.wrongCount - a.wrongCount).slice(0, 5), [list]);
	const saveMutation = useMutation({
		mutationFn: () => persist({ data: {
			...form,
			id: editingId ?? void 0,
			wrongCount: Number(form.wrongCount) || 1
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
			questionTitle: row.questionTitle,
			subjectName: row.subjectName,
			wrongCount: String(row.wrongCount),
			status: row.status
		} : EMPTY_FORM);
		setOpen(true);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppPage, {
		title: bi("بنك الأخطاء", "Mistakes bank"),
		icon: "XCircle",
		subtitle: bi(description$23, "Log the questions you get wrong yourself, and track them until you master them."),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatGrid, { items: [
				{
					icon: "XCircle",
					label: bi("أخطاء مفتوحة", "Open mistakes"),
					value: String(stats.open)
				},
				{
					icon: "RefreshCw",
					label: bi("قيد التكرار", "In rotation"),
					value: String(stats.rotation)
				},
				{
					icon: "CheckCircle2",
					label: bi("أُتقنت", "Mastered"),
					value: String(stats.mastered)
				},
				{
					icon: "Layers",
					label: bi("الإجمالي", "Total"),
					value: String(list.length)
				}
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: bi("الأكثر تكراراً", "Most repeated"),
				icon: "XCircle",
				action: can("student_mistakes", "show_add_form") ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					onClick: () => openDialog(null),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), bi("إضافة خطأ", "Add mistake")]
				}) : void 0,
				children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex justify-center py-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-5 animate-spin text-primary" })
				}) : mostRepeated.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowList, { rows: mostRepeated.map((r) => ({
					title: r.questionTitle,
					meta: bi(`${r.subjectName} · أخطأت ${r.wrongCount} مرات`, `${r.subjectName} · wrong ${r.wrongCount} times`),
					value: bi(r.status, r.status === "أولوية" ? "Priority" : r.status === "مراجعة" ? "Review" : "Mastered"),
					tone: STATUS_TONE[r.status],
					actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1",
						children: [can("student_mistakes", "edit") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "icon",
							variant: "ghost",
							onClick: () => openDialog(r),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" })
						}), can("student_mistakes", "delete") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "icon",
							variant: "ghost",
							className: "text-destructive",
							onClick: () => setPendingDelete(r),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
						})]
					})
				})) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					icon: "CheckCircle2",
					text: bi("ولا خطأ مسجّل — استمر هيك! 🎉", "No mistakes logged — keep it up! 🎉")
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: bi("توزيع الأخطاء بالمواد", "Mistakes by subject"),
				icon: "PieChart",
				children: bySubject.length ? bySubject.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
					label: s.subject,
					value: s.percent
				}, s.subject)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					icon: "PieChart",
					text: bi("لا بيانات كافية بعد.", "Not enough data yet.")
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open,
				onOpenChange: setOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "text-start",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: editingId ? bi("تعديل خطأ", "Edit mistake") : bi("إضافة خطأ", "Add mistake") }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5 sm:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "mis-q",
										children: bi("السؤال", "Question")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "mis-q",
										value: form.questionTitle,
										onChange: (e) => setForm((f) => ({
											...f,
											questionTitle: e.target.value
										}))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "mis-subject",
										children: bi("المادة", "Subject")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "mis-subject",
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
										htmlFor: "mis-count",
										children: bi("عدد مرات الخطأ", "Times wrong")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "mis-count",
										type: "number",
										min: 1,
										value: form.wrongCount,
										onChange: (e) => setForm((f) => ({
											...f,
											wrongCount: e.target.value
										}))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5 sm:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: bi("الحالة", "Status") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										value: form.status,
										onValueChange: (v) => setForm((f) => ({
											...f,
											status: v
										})),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: "أولوية",
												children: bi("أولوية", "Priority")
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: "مراجعة",
												children: bi("مراجعة", "Review")
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: "مُتقن",
												children: bi("مُتقن", "Mastered")
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
								disabled: saveMutation.isPending || !form.questionTitle.trim(),
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
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: bi(`حذف «${pendingDelete?.questionTitle}»؟`, `Delete "${pendingDelete?.questionTitle}"?`) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: bi("لا يمكن التراجع عن هذا الإجراء.", "This action cannot be undone.") })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, {
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
