import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { A as useBi, p as getErrorMessage } from "./rbac-static-data-DgiM51a_.mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { I as Pencil, tt as LoaderCircle } from "../_libs/lucide-react.mjs";
import { n as useServerFn } from "./createSsrRpc-1tfOdKec.mjs";
import { d as useAccess } from "./use-access-oB6fzdbG.mjs";
import { n as Guard } from "./guard-BiWzjvf6.mjs";
import { t as Button } from "./button-DfTXnEII.mjs";
import { l as RowList, o as Panel, t as AppPage, u as StatGrid } from "./kit--a5tGQyM.mjs";
import { t as Input } from "./input-D0-bbXyS.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, r as DialogFooter, t as Dialog } from "./dialog-CE79KVEh.mjs";
import { t as Textarea } from "./textarea-kko37XEX.mjs";
import { d as saveTeacherProfile, i as getTeacherProfile } from "./account-pages.functions-C_UOsBTW.mjs";
import { s as listTeacherCourses } from "./teacher-teaching.functions-D_QDlVah.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/teacher.profile.edit-CRfthk9g.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var description = "هذا ما يراه الطلاب وأولياء الأمور: نبذتك، موادك، وشهاداتك الموثّقة.";
function PageRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Guard, {
		pageKey: "teacher_profile_edit",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, {})
	});
}
function Body() {
	const bi = useBi();
	const queryClient = useQueryClient();
	const { can } = useAccess();
	const fetchProfile = useServerFn(getTeacherProfile);
	const persist = useServerFn(saveTeacherProfile);
	const fetchCourses = useServerFn(listTeacherCourses);
	const profileQuery = useQuery({
		queryKey: ["teacher-profile"],
		queryFn: () => fetchProfile()
	});
	const coursesQuery = useQuery({
		queryKey: ["teacher-courses"],
		queryFn: () => fetchCourses()
	});
	const [open, setOpen] = (0, import_react.useState)(false);
	const [form, setForm] = (0, import_react.useState)({
		displayName: "",
		bio: "",
		subjectsLabel: ""
	});
	const isLoading = profileQuery.isLoading || coursesQuery.isLoading;
	const profile = profileQuery.data;
	const students = (coursesQuery.data ?? []).reduce((s, c) => s + c.enrolledCount, 0);
	const saveMutation = useMutation({
		mutationFn: () => persist({ data: form }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["teacher-profile"] });
			setOpen(false);
			toast.success(bi("تم الحفظ", "Saved successfully"));
		},
		onError: (e) => toast.error(getErrorMessage(e, bi("تعذّر الحفظ", "Failed to save")))
	});
	function openDialog() {
		if (!profile) return;
		setForm({
			displayName: profile.displayName,
			bio: profile.bio,
			subjectsLabel: profile.subjectsLabel
		});
		setOpen(true);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppPage, {
		title: bi("ملفي العام", "Public profile"),
		icon: "UserCog",
		subtitle: bi(description, "This is what students and parents see: your bio, subjects and verified credentials."),
		children: [isLoading || !profile ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex justify-center py-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-6 animate-spin text-primary" })
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatGrid, { items: [
			{
				icon: "BadgeCheck",
				label: bi("حالة التوثيق", "Verification"),
				value: bi("موثّق", "Verified")
			},
			{
				icon: "Eye",
				label: bi("زيارات الملف", "Profile views"),
				value: String(profile.profileViews)
			},
			{
				icon: "Star",
				label: bi("التقييم", "Rating"),
				value: String(profile.rating)
			},
			{
				icon: "Users",
				label: bi("طلاب", "Students"),
				value: String(students)
			}
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			title: bi("بيانات الملف", "Profile fields"),
			icon: "UserCog",
			action: can("teacher_profile_edit", "edit_profile") ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				size: "sm",
				variant: "outline",
				onClick: openDialog,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" }), bi("تعديل", "Edit")]
			}) : void 0,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowList, { rows: [
				{
					title: bi("الاسم المعروض", "Display name"),
					meta: profile.displayName,
					tone: "primary"
				},
				{
					title: bi("النبذة", "Bio"),
					meta: profile.bio,
					tone: "primary"
				},
				{
					title: bi("المواد", "Subjects"),
					meta: profile.subjectsLabel,
					tone: "primary"
				},
				{
					title: bi("الشهادات", "Credentials"),
					meta: bi("بكالوريوس رياضيات — موثّقة", "BSc Mathematics — verified"),
					value: bi("موثّقة", "Verified"),
					tone: "success"
				}
			] })
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open,
			onOpenChange: setOpen,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
				className: "text-start",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: bi("تعديل بيانات الملف", "Edit profile fields") }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "tp-name",
									children: bi("الاسم المعروض", "Display name")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "tp-name",
									value: form.displayName,
									onChange: (e) => setForm((f) => ({
										...f,
										displayName: e.target.value
									}))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "tp-bio",
									children: bi("النبذة", "Bio")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									id: "tp-bio",
									value: form.bio,
									onChange: (e) => setForm((f) => ({
										...f,
										bio: e.target.value
									}))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "tp-subjects",
									children: bi("المواد", "Subjects")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "tp-subjects",
									value: form.subjectsLabel,
									onChange: (e) => setForm((f) => ({
										...f,
										subjectsLabel: e.target.value
									}))
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
						className: "gap-2 sm:justify-start",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => saveMutation.mutate(),
							disabled: saveMutation.isPending || !form.displayName.trim(),
							children: bi("حفظ", "Save")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: () => setOpen(false),
							children: bi("إلغاء", "Cancel")
						})]
					})
				]
			})
		})]
	});
}
//#endregion
export { PageRoute as component };
