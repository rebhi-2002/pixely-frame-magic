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
import { a as Panel, i as EmptyState, l as StatGrid, n as Badge, r as DataTable, t as AppPage } from "./kit-DDkPK7fJ.mjs";
import { t as Input } from "./input-D0-bbXyS.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, o as Label, r as DialogFooter, t as Dialog } from "./dialog-1uq10XBZ.mjs";
import { a as AlertDialogDescription, c as AlertDialogTitle, i as AlertDialogContent, n as AlertDialogAction, o as AlertDialogFooter, r as AlertDialogCancel, s as AlertDialogHeader, t as AlertDialog } from "./alert-dialog-DwQS8Syk.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-CbSL31Oe.mjs";
import { t as description } from "./teacher.courses-DX1rkZ9s.mjs";
import { r as deleteTeacherCourse, s as listTeacherCourses, u as saveTeacherCourse } from "./teacher-teaching.functions-1ie3qREh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/teacher.courses-DNBKESES.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PageRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Guard, {
		pageKey: "teacher_courses",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, {})
	});
}
var EMPTY_FORM = {
	title: "",
	price: "0",
	enrolledCount: "0",
	status: "مسوّدة"
};
function Body() {
	const bi = useBi();
	const queryClient = useQueryClient();
	const { can } = useAccess();
	const fetchRows = useServerFn(listTeacherCourses);
	const persist = useServerFn(saveTeacherCourse);
	const remove = useServerFn(deleteTeacherCourse);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [editingId, setEditingId] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)(EMPTY_FORM);
	const [pendingDelete, setPendingDelete] = (0, import_react.useState)(null);
	const { data: rows, isLoading } = useQuery({
		queryKey: ["teacher-courses"],
		queryFn: () => fetchRows()
	});
	const invalidate = () => queryClient.invalidateQueries({ queryKey: ["teacher-courses"] });
	const list = rows ?? [];
	const stats = (0, import_react.useMemo)(() => {
		const published = list.filter((r) => r.status === "منشور");
		const enrolled = list.reduce((s, r) => s + r.enrolledCount, 0);
		const revenue = list.reduce((s, r) => s + r.price * r.enrolledCount, 0);
		return {
			published: published.length,
			enrolled,
			revenue
		};
	}, [list]);
	const saveMutation = useMutation({
		mutationFn: () => persist({ data: {
			...form,
			id: editingId ?? void 0,
			price: Number(form.price) || 0,
			enrolledCount: Number(form.enrolledCount) || 0
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
			title: row.title,
			price: String(row.price),
			enrolledCount: String(row.enrolledCount),
			status: row.status
		} : EMPTY_FORM);
		setOpen(true);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppPage, {
		title: bi("كورساتي (معلم)", "My courses (teacher)"),
		icon: "BookOpenCheck",
		subtitle: bi(description, "Your published courses: pricing, enrollments and upcoming sessions."),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatGrid, { items: [
				{
					icon: "BookOpenCheck",
					label: bi("كورسات منشورة", "Published"),
					value: String(stats.published)
				},
				{
					icon: "Users",
					label: bi("مشتركون", "Enrollments"),
					value: String(stats.enrolled)
				},
				{
					icon: "Star",
					label: bi("التقييم", "Rating"),
					value: "4.8"
				},
				{
					icon: "Wallet",
					label: bi("إيراد الشهر", "Monthly revenue"),
					value: bi(`${stats.revenue} ₪`, `${stats.revenue} ILS`)
				}
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: bi("كورساتك", "Your courses"),
				icon: "BookOpenCheck",
				action: can("teacher_courses", "show_add_form") ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					onClick: () => openDialog(null),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), bi("إضافة كورس", "Add course")]
				}) : void 0,
				children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex justify-center py-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-5 animate-spin text-primary" })
				}) : list.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
					head: [
						bi("الكورس", "Course"),
						bi("السعر", "Price"),
						bi("مشتركون", "Enrolled"),
						bi("الحالة", "Status"),
						bi("", "")
					],
					rows: list.map((r) => [
						r.title,
						r.price === 0 ? bi("مجاني", "Free") : bi(`${r.price} ₪`, `${r.price} ILS`),
						String(r.enrolledCount),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: r.status === "منشور" ? "success" : "primary",
							children: bi(r.status, r.status === "منشور" ? "Published" : "Draft")
						}, r.id),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-end gap-1",
							children: [can("teacher_courses", "edit") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "icon",
								variant: "ghost",
								onClick: () => openDialog(r),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" })
							}), can("teacher_courses", "delete") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "icon",
								variant: "ghost",
								className: "text-destructive",
								onClick: () => setPendingDelete(r),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
							})]
						}, `${r.id}-actions`)
					])
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					icon: "BookOpenCheck",
					text: bi("لا كورسات بعد.", "No courses yet.")
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open,
				onOpenChange: setOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "text-start",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: editingId ? bi("تعديل كورس", "Edit course") : bi("إضافة كورس", "Add course") }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5 sm:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "tc-title",
										children: bi("اسم الكورس", "Course title")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "tc-title",
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
										htmlFor: "tc-price",
										children: bi("السعر (₪)", "Price (ILS)")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "tc-price",
										type: "number",
										min: 0,
										value: form.price,
										onChange: (e) => setForm((f) => ({
											...f,
											price: e.target.value
										}))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "tc-enrolled",
										children: bi("عدد المشتركين", "Enrolled count")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "tc-enrolled",
										type: "number",
										min: 0,
										value: form.enrolledCount,
										onChange: (e) => setForm((f) => ({
											...f,
											enrolledCount: e.target.value
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
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "مسوّدة",
											children: bi("مسوّدة", "Draft")
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "منشور",
											children: bi("منشور", "Published")
										})] })]
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
