import { createFileRoute } from "@tanstack/react-router";
import { AppPage, StatGrid, Panel, RowList, Progress, DataTable, QuickLinks, Badge, EmptyState } from "@/components/app/kit";
import { Guard } from "@/components/app/guard";
import { useBi } from "@/lib/bi";

const title = "تقارير الإشراف | أكاديميا";
const description = "تقارير دورية جاهزة للتصدير: جودة التدريس، الإتقان، والالتزام.";

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
  return (
    <AppPage
      title={bi("تقارير الإشراف", "Supervision reports")}
      icon="FileBarChart"
      subtitle={bi("تقارير دورية جاهزة للتصدير: جودة التدريس، الإتقان، والالتزام.", "Periodic exportable reports: teaching quality, mastery and consistency.")}
    >
      <StatGrid
        items={[
          { icon: "FileBarChart", label: bi("تقارير جاهزة", "Ready reports"), value: "6" },
          { icon: "CalendarDays", label: bi("دورية", "Frequency"), value: "أسبوعي" },
          { icon: "Download", label: bi("تنزيلات", "Downloads"), value: "42" },
          { icon: "ShieldCheck", label: bi("بيانات مجهولة الهوية", "Anonymised"), value: "نعم" },
        ]}
      />
      <Panel title={bi("التقارير", "Reports")} icon="FileBarChart">
        <RowList
          rows={[
            { title: bi("تقرير جودة التدريس — يوليو", "Teaching quality — July"), meta: bi("PDF · 12 صفحة", "PDF · 12 pages"), value: bi("تنزيل", "Download"), tone: "primary" },
            { title: bi("تقرير الإتقان بالمواد", "Mastery by subject"), meta: bi("XLSX", "XLSX"), value: bi("تنزيل", "Download"), tone: "primary" },
            { title: bi("تقرير الالتزام الأسبوعي", "Weekly consistency"), meta: bi("PDF · 6 صفحات", "PDF · 6 pages"), value: bi("تنزيل", "Download"), tone: "primary" },
          ]}
        />
      </Panel>
    </AppPage>
  );
}
