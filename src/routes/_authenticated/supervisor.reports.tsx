import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Bell, Loader2, Trash2 } from "lucide-react";
import { AppPage, StatGrid, Panel, RowList, EmptyState } from "@/components/app/kit";
import { Guard } from "@/components/app/guard";
import { Button } from "@/components/ui/button";
import {
  deleteSupervisionReport,
  getSupervisionSettings,
  listSupervisionReports,
  recordReportDownload,
} from "@/lib/supervisor-oversight.functions";
import { useAccess } from "@/hooks/use-access";
import { useBi } from "@/lib/bi";
import { getErrorMessage } from "@/integrations/backend/client";

const title = "تقارير الإشراف | أكاديميا";
const description = "تقارير دورية عن جودة التدريس، الإتقان، والالتزام.";

export const Route = createFileRoute("/_authenticated/supervisor/reports")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: PageRoute,
});

function PageRoute() {
  return (
    <Guard pageKey="supervisor_reports">
      <Body />
    </Guard>
  );
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
  const reports = useMemo(() => reportsQuery.data ?? [], [reportsQuery.data]);
  const settings = settingsQuery.data ?? { reportFrequencyLabel: "—", dataAnonymised: true };
  const totalDownloads = reports.reduce((s, r) => s + r.downloadsCount, 0);

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["supervision-reports"] });

  const downloadMutation = useMutation({
    mutationFn: (id: string) => download({ data: { id } }),
    onSuccess: () => {
      invalidate();
      toast.success(
        bi(
          "سجّلنا طلبك — التصدير الفعلي للملف قادم مع الباك اند.",
          "Request logged — real file export is coming with the backend.",
        ),
      );
    },
    onError: (e) => toast.error(getErrorMessage(e, bi("تعذّر التنزيل", "Failed to download"))),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => remove({ data: { id } }),
    onSuccess: () => {
      invalidate();
      toast.success(bi("تم الحذف", "Deleted successfully"));
    },
    onError: (e) => toast.error(getErrorMessage(e, bi("تعذّر الحذف", "Failed to delete"))),
  });

  return (
    <AppPage
      title={bi("تقارير الإشراف", "Supervision reports")}
      icon="FileBarChart"
      subtitle={bi(description, "Periodic reports on teaching quality, mastery and consistency.")}
    >
      {isLoading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="size-6 animate-spin text-primary" />
        </div>
      ) : (
        <>
          <StatGrid
            items={[
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
                icon: "Bell",
                label: bi("طلبات نسخة", "Copy requests"),
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
            ]}
          />

          <Panel title={bi("التقارير", "Reports")} icon="FileBarChart">
            {reports.length ? (
              <RowList
                rows={reports.map((r) => ({
                  title: r.title,
                  meta: bi(
                    `${r.formatLabel} · ${r.downloadsCount} طلب`,
                    `${r.formatLabel} · ${r.downloadsCount} requests`,
                  ),
                  tone: "primary" as const,
                  actions: (
                    <div className="flex items-center gap-1">
                      {can("supervisor_reports", "edit") && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => downloadMutation.mutate(r.id)}
                        >
                          <Bell className="size-4" />
                          {bi("اطلب نسخة", "Request a copy")}
                        </Button>
                      )}
                      {can("supervisor_reports", "delete") && (
                        <Button
                          size="icon"
                          variant="ghost"
                          className="text-destructive"
                          onClick={() => deleteMutation.mutate(r.id)}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      )}
                    </div>
                  ),
                }))}
              />
            ) : (
              <EmptyState
                icon="FileBarChart"
                text={bi("لا تقارير جاهزة بعد.", "No reports ready yet.")}
              />
            )}
          </Panel>
        </>
      )}
    </AppPage>
  );
}
