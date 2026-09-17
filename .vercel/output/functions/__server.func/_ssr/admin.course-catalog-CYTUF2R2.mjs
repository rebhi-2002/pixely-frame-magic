import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { A as useBi, p as getErrorMessage } from "./rbac-static-data-DgiM51a_.mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { $ as LoaderCircle, D as Search, F as Pencil, P as Plus, p as Trash2 } from "../_libs/lucide-react.mjs";
import { n as useServerFn } from "./createSsrRpc-UbjxkEih.mjs";
import { d as useAccess } from "./use-access-Czrv1uG8.mjs";
import { n as Guard } from "./guard-BxeumIGg.mjs";
import { t as Button } from "./button-DfTXnEII.mjs";
import { n as Toolbar, t as PageHeader } from "./page-header-D4CknVcT.mjs";
import { t as Input } from "./input-D0-bbXyS.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, r as DialogFooter, t as Dialog } from "./dialog-CE79KVEh.mjs";
import { a as AlertDialogDescription, c as AlertDialogTitle, i as AlertDialogContent, n as AlertDialogAction, o as AlertDialogFooter, r as AlertDialogCancel, s as AlertDialogHeader, t as AlertDialog } from "./alert-dialog-CRZk8vpy.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-CbSL31Oe.mjs";
import { t as COURSE_FORMAT_LABELS } from "./public-catalog-data-CsZRwh7H.mjs";
import { n as listPublicCourses, r as saveCourse, t as deleteCourse } from "./public-catalog.functions-CAy_l5V4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.course-catalog-CYTUF2R2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var EMPTY_FORM = {
	titleAr: "",
	titleEn: "",
	descriptionAr: "",
	descriptionEn: "",
	teacherAr: "",
	teacherEn: "",
	teacherId: "",
	subjectAr: "",
	subjectEn: "",
	levelAr: "",
	levelEn: "",
	format: "live_online",
	lessons: "0",
	price: "0",
	rating: "",
	studentsCount: "",
	durationHours: "",
	tagsAr: "",
	tagsEn: ""
};
function CourseCatalogPage() {
	const bi = useBi();
	const queryClient = useQueryClient();
	const { can } = useAccess();
	const fetchRows = useServerFn(listPublicCourses);
	const persist = useServerFn(saveCourse);
	const remove = useServerFn(deleteCourse);
	const [search, setSearch] = (0, import_react.useState)("");
	const [open, setOpen] = (0, import_react.useState)(false);
	const [editingId, setEditingId] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)(EMPTY_FORM);
	const [pendingDelete, setPendingDelete] = (0, import_react.useState)(null);
	const { data: rows, isLoading } = useQuery({
		queryKey: ["public-courses"],
		queryFn: () => fetchRows()
	});
	const invalidate = () => queryClient.invalidateQueries({ queryKey: ["public-courses"] });
	const filtered = (0, import_react.useMemo)(() => {
		return (rows ?? []).filter((r) => {
			if (!search.trim()) return true;
			const q = search.trim().toLowerCase();
			return `${r.title[0]} ${r.title[1]} ${r.teacher[0]} ${r.teacher[1]}`.toLowerCase().includes(q);
		});
	}, [rows, search]);
	const saveMutation = useMutation({
		mutationFn: () => persist({ data: {
			...form,
			id: editingId ?? void 0,
			lessons: Number(form.lessons) || 0,
			price: Number(form.price) || 0,
			rating: form.rating.trim() ? Number(form.rating) : void 0,
			studentsCount: form.studentsCount.trim() ? Number(form.studentsCount) : void 0,
			durationHours: form.durationHours.trim() ? Number(form.durationHours) : void 0
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
			titleAr: row.title[0],
			titleEn: row.title[1],
			descriptionAr: row.description[0],
			descriptionEn: row.description[1],
			teacherAr: row.teacher[0],
			teacherEn: row.teacher[1],
			teacherId: row.teacherId,
			subjectAr: row.subject[0],
			subjectEn: row.subject[1],
			levelAr: row.level[0],
			levelEn: row.level[1],
			format: row.format,
			lessons: String(row.lessons),
			price: String(row.price),
			rating: row.rating != null ? String(row.rating) : "",
			studentsCount: row.studentsCount != null ? String(row.studentsCount) : "",
			durationHours: row.durationHours != null ? String(row.durationHours) : "",
			tagsAr: row.tags?.map((t) => t[0]).join(", ") ?? "",
			tagsEn: row.tags?.map((t) => t[1]).join(", ") ?? ""
		} : EMPTY_FORM);
		setOpen(true);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: bi("كتالوج الكورسات العام", "Public course catalog"),
			icon: "Store"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Toolbar, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative min-w-56 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					placeholder: bi("بحث بالعنوان أو المعلم", "Search by title or teacher"),
					value: search,
					onChange: (e) => setSearch(e.target.value),
					className: "ps-9"
				})]
			}), can("admin_course_catalog", "show_add_form") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				className: "ms-auto",
				onClick: () => openDialog(null),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), bi("إضافة كورس", "Add course")]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 overflow-x-auto rounded-2xl bg-card",
				role: "region",
				"aria-label": bi("كتالوج الكورسات", "Course catalog"),
				children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex justify-center p-10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-5 animate-spin text-primary" })
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-3xl text-start text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-border text-xs text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-semibold",
								children: bi("الكورس", "Course")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-semibold",
								children: bi("المعلم", "Teacher")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-semibold",
								children: bi("المادة", "Subject")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-semibold",
								children: bi("الصيغة", "Format")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-semibold",
								children: bi("السعر", "Price")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "w-28 px-4 py-3 font-semibold",
								children: bi("إجراءات", "Actions")
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [filtered.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-border/60 last:border-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 font-semibold text-foreground",
								children: bi(...r.title)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 text-muted-foreground",
								children: bi(...r.teacher)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 text-muted-foreground",
								children: bi(...r.subject)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 text-muted-foreground",
								children: bi(...COURSE_FORMAT_LABELS[r.format])
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 text-muted-foreground",
								children: r.price === 0 ? bi("مجاني", "Free") : `${r.price} JOD`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1",
									children: [can("admin_course_catalog", "edit") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "icon",
										variant: "ghost",
										onClick: () => openDialog(r),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" })
									}), can("admin_course_catalog", "delete") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "icon",
										variant: "ghost",
										className: "text-destructive",
										onClick: () => setPendingDelete(r),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
									})]
								})
							})
						]
					}, r.id)), !filtered.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						colSpan: 5,
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
				className: "max-h-[85vh] overflow-y-auto text-start",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: editingId ? bi("تعديل كورس", "Edit course") : bi("إضافة كورس", "Add course") }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "crs-title-ar",
									children: bi("العنوان (عربي)", "Title (Arabic)")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "crs-title-ar",
									value: form.titleAr,
									onChange: (e) => setForm((f) => ({
										...f,
										titleAr: e.target.value
									}))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "crs-title-en",
									children: bi("العنوان (إنجليزي)", "Title (English)")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "crs-title-en",
									value: form.titleEn,
									onChange: (e) => setForm((f) => ({
										...f,
										titleEn: e.target.value
									}))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5 sm:col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "crs-desc-ar",
									children: bi("وصف قصير (عربي)", "Short description (Arabic)")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "crs-desc-ar",
									value: form.descriptionAr,
									onChange: (e) => setForm((f) => ({
										...f,
										descriptionAr: e.target.value
									}))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5 sm:col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "crs-desc-en",
									children: bi("وصف قصير (إنجليزي)", "Short description (English)")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "crs-desc-en",
									value: form.descriptionEn,
									onChange: (e) => setForm((f) => ({
										...f,
										descriptionEn: e.target.value
									}))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "crs-teacher-ar",
									children: bi("المعلم (عربي)", "Teacher (Arabic)")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "crs-teacher-ar",
									value: form.teacherAr,
									onChange: (e) => setForm((f) => ({
										...f,
										teacherAr: e.target.value
									}))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "crs-teacher-en",
									children: bi("المعلم (إنجليزي)", "Teacher (English)")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "crs-teacher-en",
									value: form.teacherEn,
									onChange: (e) => setForm((f) => ({
										...f,
										teacherEn: e.target.value
									}))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5 sm:col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "crs-teacher-id",
									children: bi("معرّف صفحة المعلم", "Teacher page ID")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "crs-teacher-id",
									value: form.teacherId,
									onChange: (e) => setForm((f) => ({
										...f,
										teacherId: e.target.value
									}))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "crs-subject-ar",
									children: bi("المادة (عربي)", "Subject (Arabic)")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "crs-subject-ar",
									value: form.subjectAr,
									onChange: (e) => setForm((f) => ({
										...f,
										subjectAr: e.target.value
									}))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "crs-subject-en",
									children: bi("المادة (إنجليزي)", "Subject (English)")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "crs-subject-en",
									value: form.subjectEn,
									onChange: (e) => setForm((f) => ({
										...f,
										subjectEn: e.target.value
									}))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "crs-level-ar",
									children: bi("المستوى (عربي)", "Level (Arabic)")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "crs-level-ar",
									value: form.levelAr,
									onChange: (e) => setForm((f) => ({
										...f,
										levelAr: e.target.value
									}))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "crs-level-en",
									children: bi("المستوى (إنجليزي)", "Level (English)")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "crs-level-en",
									value: form.levelEn,
									onChange: (e) => setForm((f) => ({
										...f,
										levelEn: e.target.value
									}))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "crs-format",
									children: bi("صيغة الكورس", "Course format")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: form.format,
									onValueChange: (v) => setForm((f) => ({
										...f,
										format: v
									})),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
										id: "crs-format",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: Object.keys(COURSE_FORMAT_LABELS).map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: key,
										children: bi(...COURSE_FORMAT_LABELS[key])
									}, key)) })]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "crs-lessons",
									children: bi("عدد الدروس", "Lessons count")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "crs-lessons",
									type: "number",
									min: 0,
									value: form.lessons,
									onChange: (e) => setForm((f) => ({
										...f,
										lessons: e.target.value
									}))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "crs-price",
									children: bi("السعر (0 = مجاني)", "Price (0 = free)")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "crs-price",
									type: "number",
									min: 0,
									value: form.price,
									onChange: (e) => setForm((f) => ({
										...f,
										price: e.target.value
									}))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "sm:col-span-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-semibold text-muted-foreground",
									children: bi("الحقول تحت اختيارية — خليها فاضية لحد ما يصير عندك رقم حقيقي، وما بتظهر بالبطاقة أبداً وهي فاضية.", "Fields below are optional — leave empty until you have a real number; they never show on the card while empty.")
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "crs-rating",
									children: bi("تقييم (من 5)", "Rating (out of 5)")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "crs-rating",
									type: "number",
									min: 0,
									max: 5,
									step: .1,
									placeholder: bi("فاضي = ما يظهر", "Empty = hidden"),
									value: form.rating,
									onChange: (e) => setForm((f) => ({
										...f,
										rating: e.target.value
									}))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "crs-students",
									children: bi("عدد الطلاب المشتركين", "Enrolled students")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "crs-students",
									type: "number",
									min: 0,
									placeholder: bi("فاضي = ما يظهر", "Empty = hidden"),
									value: form.studentsCount,
									onChange: (e) => setForm((f) => ({
										...f,
										studentsCount: e.target.value
									}))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "crs-duration",
									children: bi("مدة الكورس (ساعة)", "Duration (hours)")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "crs-duration",
									type: "number",
									min: 0,
									placeholder: bi("فاضي = ما يظهر", "Empty = hidden"),
									value: form.durationHours,
									onChange: (e) => setForm((f) => ({
										...f,
										durationHours: e.target.value
									}))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "crs-tags-ar",
									children: bi("وسوم (عربي)", "Tags (Arabic)")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "crs-tags-ar",
									placeholder: bi("مراجعة نهائية، أسئلة وزارية", "comma, separated"),
									value: form.tagsAr,
									onChange: (e) => setForm((f) => ({
										...f,
										tagsAr: e.target.value
									}))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "crs-tags-en",
									children: bi("وسوم (إنجليزي)", "Tags (English)")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "crs-tags-en",
									placeholder: bi("بنفس ترتيب وعدد الوسوم العربي", "Same order & count as Arabic"),
									value: form.tagsEn,
									onChange: (e) => setForm((f) => ({
										...f,
										tagsEn: e.target.value
									}))
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
						className: "gap-2 sm:justify-start",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => saveMutation.mutate(),
							disabled: saveMutation.isPending || !form.titleAr.trim() || !form.titleEn.trim() || !form.descriptionAr.trim() || !form.descriptionEn.trim(),
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
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: bi(`حذف «${pendingDelete?.title[0]}»؟`, `Delete "${pendingDelete?.title[1]}"?`) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: bi("لا يمكن التراجع عن هذا الإجراء.", "This action cannot be undone.") })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, {
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
	pageKey: "admin_course_catalog",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseCatalogPage, {})
});
//#endregion
export { SplitComponent as component };
