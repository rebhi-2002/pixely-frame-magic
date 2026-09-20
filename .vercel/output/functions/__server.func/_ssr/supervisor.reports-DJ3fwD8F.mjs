import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { A as useBi, p as getErrorMessage } from "./rbac-static-data-DgiM51a_.mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { Ut as Bell, m as Trash2, tt as LoaderCircle } from "../_libs/lucide-react.mjs";
import { n as useServerFn } from "./createSsrRpc-1tfOdKec.mjs";
import { d as useAccess } from "./use-access-oB6fzdbG.mjs";
import { n as Guard } from "./guard-BiWzjvf6.mjs";
import { t as Button } from "./button-DfTXnEII.mjs";
import { i as EmptyState, l as RowList, o as Panel, t as AppPage, u as StatGrid } from "./kit--a5tGQyM.mjs";
import { a as getSupervisionSettings, l as recordReportDownload, n as deleteSupervisionReport, s as listSupervisionReports } from "./supervisor-oversight.functions-Beyn8Pa2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/supervisor.reports-DJ3fwD8F.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var description = "تقارير دورية عن جودة التدريس، الإتقان، والالتزام.";
function PageRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Guard, {
		pageKey: "supervisor_reports",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, {})
	});
}
function Body() {
	const bi = useBi();
	const queryClient = useQueryClient();
	const { can } = useAccess();
	const fetchReports = useServerFn(listSupervisionReports);
	const download = useServerFn(recordReportDownload);
	const remove = useServerFn(deleteSupervisionReport);
	const fetchSettings = useServerFn(getSupervisionSettings);
	const reportsQuery = useQuery({
		queryKey: ["supervision-reports"],
		queryFn: () => fetchReports()
	});
	const settingsQuery = useQuery({
		queryKey: ["supervision-settings"],
		queryFn: () => fetchSettings()
	});
	const isLoading = reportsQuery.isLoading || settingsQuery.isLoading;
	const reports = (0, import_react.useMemo)(() => reportsQuery.data ?? [], [reportsQuery.data]);
	const settings = settingsQuery.data ?? {
		reportFrequencyLabel: "—",
		dataAnonymised: true
	};
	const totalDownloads = reports.reduce((s, r) => s + r.downloadsCount, 0);
	const invalidate = () => queryClient.invalidateQueries({ queryKey: ["supervision-reports"] });
	const downloadMutation = useMutation({
		mutationFn: (id) => download({ data: { id } }),
		onSuccess: () => {
			invalidate();
			toast.success(bi("سجّلنا طلبك — التصدير الفعلي للملف قادم مع الباك اند.", "Request logged — real file export is coming with the backend."));
		},
		onError: (e) => toast.error(getErrorMessage(e, bi("تعذّر التنزيل", "Failed to download")))
	});
	const deleteMutation = useMutation({
		mutationFn: (id) => remove({ data: { id } }),
		onSuccess: () => {
			invalidate();
			toast.success(bi("تم الحذف", "Deleted successfully"));
		},
		onError: (e) => toast.error(getErrorMessage(e, bi("تعذّر الحذف", "Failed to delete")))
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppPage, {
		title: bi("تقارير الإشراف", "Supervision reports"),
		icon: "FileBarChart",
		subtitle: bi(description, "Periodic reports on teaching quality, mastery and consistency."),
		children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex justify-center py-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-6 animate-spin text-primary" })
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatGrid, { items: [
			{
				icon: "FileBarChart",
				label: bi("تقارير جاهزة", "Ready reports"),
				value: String(reports.length)
			},
			{
				icon: "CalendarDays",
				label: bi("دورية", "Frequency"),
				value: settings.reportFrequencyLabel
			},
			{
				icon: "Bell",
				label: bi("طلبات نسخة", "Copy requests"),
				value: String(totalDownloads)
			},
			{
				icon: "ShieldCheck",
				label: bi("بيانات مجهولة الهوية", "Anonymised"),
				value: bi(settings.dataAnonymised ? "نعم" : "لا", settings.dataAnonymised ? "Yes" : "No")
			}
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			title: bi("التقارير", "Reports"),
			icon: "FileBarChart",
			children: reports.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowList, { rows: reports.map((r) => ({
				title: r.title,
				meta: bi(`${r.formatLabel} · ${r.downloadsCount} طلب`, `${r.formatLabel} · ${r.downloadsCount} requests`),
				tone: "primary",
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1",
					children: [can("supervisor_reports", "edit") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "outline",
						onClick: () => downloadMutation.mutate(r.id),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-4" }), bi("اطلب نسخة", "Request a copy")]
					}), can("supervisor_reports", "delete") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "icon",
						variant: "ghost",
						className: "text-destructive",
						onClick: () => deleteMutation.mutate(r.id),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
					})]
				})
			})) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				icon: "FileBarChart",
				text: bi("لا تقارير جاهزة بعد.", "No reports ready yet.")
			})
		})] })
	});
}
//#endregion
export { PageRoute as component };
