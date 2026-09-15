import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { M as useBi, d as apiClient, p as getErrorMessage } from "./rbac-static-data-6lJhuenE.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { D as Save } from "../_libs/lucide-react.mjs";
import { n as Guard } from "./guard-X81oQi1X.mjs";
import { t as Button } from "./button-Nx-_C_c8.mjs";
import { t as PageHeader } from "./page-header-BDwvM2RF.mjs";
import { t as Checkbox } from "./checkbox-kt6FvQcE.mjs";
import { n as listBackendPages } from "./admin-pages-5MU9l7py.mjs";
import { n as LoadingState, r as RetryButton, t as ErrorState } from "./feedback-states-DOqHvyO5.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.backend-permissions-BVkcgkPu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* أنواع المستخدمين الحقيقية متل ما هي مزروعة (seeded) بالباك اند — 5 أنواع:
* مدير النظام، مستخدم، الطالب، المعلم، ولي الامر (راجع UserSeed.cs). لا يوجد
* Controller مستقل لإدارتها (لا إضافة ولا حذف من الواجهة)، فبنجيبها ديناميكيًا
* من نفس endpoint يلي شاشة تعديل المستخدم بتستخدمه (/api/User/CreateEditModal)
* بدل ما نخترع endpoint غير موجود أو نثبّت قائمة ناقصة بالكود.
*/
async function listBackendUserTypes() {
	return (await apiClient.get(`/api/User/CreateEditModal?id=0`)).userTypes ?? [];
}
/** الباك اند بيرجّع إما مصفوفة أرقام (PageIds) مباشرة، أو مصفوفة كائنات
* فيها pageId — بنتعامل مع الاحتمالين دفاعيًا لأن الشكل الدقيق ما انولّد
* من Swagger مباشرة (endpoint من غير مثال استجابة موثّق). */
async function listGrantedPageIds(userTypeId) {
	const result = await apiClient.post(`/api/UserPermission/GetUserTypePermissions?userTypeId=${userTypeId}`);
	if (!Array.isArray(result)) return [];
	return result.map((entry) => typeof entry === "number" ? entry : entry?.pageId).filter((id) => typeof id === "number");
}
async function saveGrantedPageIds(userTypeId, pageIds) {
	await apiClient.post(`/api/UserPermission/SavePermissions?userTypeId=${userTypeId}`, pageIds.map((pageId) => ({
		id: 0,
		userTypeId,
		pageId
	})));
}
function BackendPermissionsPage() {
	const bi = useBi();
	const queryClient = useQueryClient();
	const [userTypeId, setUserTypeId] = (0, import_react.useState)(null);
	const [checked, setChecked] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const { data: userTypes, isLoading: userTypesLoading, isError: userTypesError } = useQuery({
		queryKey: ["backend-user-types"],
		queryFn: listBackendUserTypes
	});
	(0, import_react.useEffect)(() => {
		if (userTypeId == null && userTypes && userTypes.length > 0) setUserTypeId(userTypes[0].id);
	}, [userTypes, userTypeId]);
	const { data: pages, isLoading: pagesLoading, isError: pagesError } = useQuery({
		queryKey: ["backend-pages"],
		queryFn: listBackendPages
	});
	const { data: granted, isLoading: grantedLoading, isError: grantedError } = useQuery({
		queryKey: ["backend-permissions", userTypeId],
		queryFn: () => listGrantedPageIds(userTypeId),
		enabled: userTypeId != null
	});
	(0, import_react.useEffect)(() => {
		setChecked(new Set(granted ?? []));
	}, [granted]);
	const grouped = (0, import_react.useMemo)(() => {
		const groups = /* @__PURE__ */ new Map();
		for (const p of pages ?? []) {
			const key = p.module_name ?? bi("بدون وحدة", "No module");
			if (!groups.has(key)) groups.set(key, []);
			groups.get(key).push(p);
		}
		return groups;
	}, [pages, bi]);
	const saveMutation = useMutation({
		mutationFn: () => saveGrantedPageIds(userTypeId, Array.from(checked)),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["backend-permissions", userTypeId] });
			toast.success(bi("تم حفظ الصلاحيات", "Permissions saved"));
		},
		onError: (e) => toast.error(getErrorMessage(e, bi("تعذّر الحفظ", "Failed to save")))
	});
	function toggle(pageId) {
		setChecked((prev) => {
			const next = new Set(prev);
			if (next.has(pageId)) next.delete(pageId);
			else next.add(pageId);
			return next;
		});
	}
	const isLoading = pagesLoading || grantedLoading || userTypesLoading;
	const isError = pagesError || grantedError || userTypesError;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pb-24",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			icon: "ShieldCheck",
			title: bi("صلاحيات أنواع المستخدمين (الباك اند)", "User type permissions (backend)")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "px-4 py-5 md:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-4 text-sm text-muted-foreground",
					children: bi("أنواع المستخدمين ثابتة بالباك اند (بدون إمكانية إضافة نوع جديد من الواجهة). حدد أي صفحات يقدر هذا النوع يوصلها.", "User types are fixed on the backend (no way to add a new type from the UI). Choose which pages this type can access.")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-5 flex flex-wrap gap-2",
					children: (userTypes ?? []).map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setUserTypeId(t.id),
						className: `rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${userTypeId === t.id ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground hover:border-primary/50"}`,
						children: t.name
					}, t.id))
				}),
				isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingState, { label: bi("عم نحمّل الصفحات والصلاحيات…", "Loading pages and permissions…") }) : isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, {
					title: bi("تعذّر تحميل البيانات", "Couldn't load data"),
					action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RetryButton, {
						label: bi("إعادة المحاولة", "Try again"),
						onClick: () => {
							queryClient.invalidateQueries({ queryKey: ["backend-pages"] });
							queryClient.invalidateQueries({ queryKey: ["backend-permissions", userTypeId] });
						}
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [Array.from(grouped.entries()).map(([moduleName, list]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-border bg-card p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-3 font-display text-sm font-bold text-foreground",
							children: moduleName
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-2 sm:grid-cols-2 lg:grid-cols-3",
							children: (list ?? []).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-sm hover:bg-muted/50",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
									checked: checked.has(p.id),
									onCheckedChange: () => toggle(p.id)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-foreground",
									children: p.name
								})]
							}, p.id))
						})]
					}, moduleName)), !grouped.size && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "p-8 text-center text-muted-foreground",
						children: bi("لا توجد صفحات بعد.", "No pages yet.")
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: () => saveMutation.mutate(),
						loading: saveMutation.isPending,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "size-4" }), bi("حفظ الصلاحيات", "Save permissions")]
					})
				})
			]
		})]
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Guard, {
	pageKey: "admin_backend_permissions",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackendPermissionsPage, {})
});
//#endregion
export { SplitComponent as component };
