import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { f as getErrorMessage, k as useBi } from "./rbac-static-data-Bv6QEjHq.mjs";
import {
  i as useQueryClient,
  n as useQuery,
  t as useMutation,
} from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { H as LoaderCircle, l as Trash2, tt as Download } from "../_libs/lucide-react.mjs";
import { m as description$13 } from "./router-D9hWsH17.mjs";
import { n as useServerFn } from "./createSsrRpc-Deneh4is.mjs";
import { d as useAccess } from "./use-access-BL6Bw5Ej.mjs";
import { n as Guard } from "./guard-Dpfucbbc.mjs";
import { t as Button } from "./button-Nx-_C_c8.mjs";
import {
  a as Panel,
  c as RowList,
  i as EmptyState,
  l as StatGrid,
  t as AppPage,
} from "./kit-DhXVWrh8.mjs";
import {
  a as getSupervisionSettings,
  l as recordReportDownload,
  n as deleteSupervisionReport,
  s as listSupervisionReports,
} from "./supervisor-oversight.functions-BQYJ6ek4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/supervisor.reports-wC0Y49Ef.js
var import_jsx_runtime = require_jsx_runtime();
function PageRoute() {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Guard, {
    pageKey: "supervisor_reports",
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, {}),
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
    queryFn: () => fetchReports(),
  });
  const settingsQuery = useQuery({
    queryKey: ["supervision-settings"],
    queryFn: () => fetchSettings(),
  });
  const isLoading = reportsQuery.isLoading || settingsQuery.isLoading;
  const reports = reportsQuery.data ?? [];
  const settings = settingsQuery.data ?? {
    reportFrequencyLabel: "—",
    dataAnonymised: true,
  };
  const totalDownloads = reports.reduce((s, r) => s + r.downloadsCount, 0);
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["supervision-reports"] });
  const downloadMutation = useMutation({
    mutationFn: (id) => download({ data: { id } }),
    onSuccess: () => {
      invalidate();
      toast.success(bi("تم تسجيل التنزيل", "Download recorded"));
    },
    onError: (e) => toast.error(getErrorMessage(e, bi("تعذّر التنزيل", "Failed to download"))),
  });
  const deleteMutation = useMutation({
    mutationFn: (id) => remove({ data: { id } }),
    onSuccess: () => {
      invalidate();
      toast.success(bi("تم الحذف", "Deleted successfully"));
    },
    onError: (e) => toast.error(getErrorMessage(e, bi("تعذّر الحذف", "Failed to delete"))),
  });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppPage, {
    title: bi("تقارير الإشراف", "Supervision reports"),
    icon: "FileBarChart",
    subtitle: bi(
      description$13,
      "Periodic exportable reports: teaching quality, mastery and consistency.",
    ),
    children: isLoading
      ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
          className: "flex justify-center py-10",
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
            className: "size-6 animate-spin text-primary",
          }),
        })
      : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, {
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatGrid, {
              items: [
                {
                  icon: "FileBarChart",
                  label: bi("تقارير جاهزة", "Ready reports"),
                  value: String(reports.length),
                },
                {
                  icon: "CalendarDays",
                  label: bi("دورية", "Frequency"),
                  value: settings.reportFrequencyLabel,
                },
                {
                  icon: "Download",
                  label: bi("تنزيلات", "Downloads"),
                  value: String(totalDownloads),
                },
                {
                  icon: "ShieldCheck",
                  label: bi("بيانات مجهولة الهوية", "Anonymised"),
                  value: bi(
                    settings.dataAnonymised ? "نعم" : "لا",
                    settings.dataAnonymised ? "Yes" : "No",
                  ),
                },
              ],
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
              title: bi("التقارير", "Reports"),
              icon: "FileBarChart",
              children: reports.length
                ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowList, {
                    rows: reports.map((r) => ({
                      title: r.title,
                      meta: bi(
                        `${r.formatLabel} · ${r.downloadsCount} تنزيل`,
                        `${r.formatLabel} · ${r.downloadsCount} downloads`,
                      ),
                      tone: "primary",
                      actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                        className: "flex items-center gap-1",
                        children: [
                          can("supervisor_reports", "edit") &&
                            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
                              size: "sm",
                              variant: "outline",
                              onClick: () => downloadMutation.mutate(r.id),
                              children: [
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {
                                  className: "size-4",
                                }),
                                bi("تنزيل", "Download"),
                              ],
                            }),
                          can("supervisor_reports", "delete") &&
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                              size: "icon",
                              variant: "ghost",
                              className: "text-destructive",
                              onClick: () => deleteMutation.mutate(r.id),
                              children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
                                className: "size-4",
                              }),
                            }),
                        ],
                      }),
                    })),
                  })
                : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
                    icon: "FileBarChart",
                    text: bi("لا تقارير جاهزة بعد.", "No reports ready yet."),
                  }),
            }),
          ],
        }),
  });
}
//#endregion
export { PageRoute as component };
