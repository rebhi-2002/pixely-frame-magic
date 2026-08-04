import { createFileRoute } from "@tanstack/react-router";
import { AppPage, StatGrid, Panel, RowList, Progress, DataTable, QuickLinks, Badge, EmptyState } from "@/components/app/kit";
import { Guard } from "@/components/app/guard";
import { useBi } from "@/lib/bi";

const title = "لوحة الإشراف | أكاديميا";
const description = "جودة التعليم عبر المعلمين والصفوف: تنبيهات، متابعات، ومؤشرات إتقان.";

export const Route = createFileRoute("/_authenticated/supervisor/dashboard")({
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
    <Guard pageKey="supervisor_dashboard">
      <Body />
    </Guard>
  );
}

function Body() {
  const bi = useBi();
  return (
    <AppPage
      title={bi("لوحة الإشراف", "Supervision dashboard")}
      icon="LayoutDashboard"
      subtitle={bi("جودة التعليم عبر المعلمين والصفوف: تنبيهات، متابعات، ومؤشرات إتقان.", "Teaching quality across teachers and classes: alerts, follow-ups and mastery signals.")}
    >
      <StatGrid
        items={[
          {{ icon: "Presentation", label: bi("معلمون", "Teachers"), value: "18" }},
          {{ icon: "Users", label: bi("طلاب", "Students"), value: "1,240" }},
          {{ icon: "AlertTriangle", label: bi("تنبيهات جودة", "Quality alerts"), value: "4" }},
          {{ icon: "Percent", label: bi("متوسط الإتقان", "Avg. mastery"), value: "67%" }},
        ]}
      />
      <Panel title={bi("إجراءات", "Actions")} icon="Zap">
        <QuickLinks
          items={[
            {{ to: "/supervisor/teachers", label: bi("المعلمون", "Teachers"), icon: "Presentation" }},
            {{ to: "/supervisor/students-overview", label: bi("نظرة الطلاب", "Students overview"), icon: "Users" }},
            {{ to: "/supervisor/reports", label: bi("التقارير", "Reports"), icon: "FileBarChart" }},
          ]}
        />
      </Panel>
      <Panel title={bi("تنبيهات تحتاج متابعة", "Alerts to follow up")} icon="AlertTriangle">
        <RowList
          rows={[
            {{ title: bi("تأخّر تصحيح لدى أ. ريم", "Grading delay — Ms. Reem"), meta: bi("18 ورقة > 5 أيام", "18 papers > 5 days"), value: bi("عاجل", "Urgent"), tone: "danger" }},
            {{ title: bi("إتقان منخفض — كيمياء صف 9", "Low mastery — Chemistry grade 9"), meta: bi("38%", "38%"), value: bi("متابعة", "Follow up"), tone: "primary" }},
            {{ title: bi("محتوى بانتظار المراجعة", "Content pending review"), meta: bi("5 عناصر", "5 items"), value: bi("مراجعة", "Review"), tone: "muted" }},
          ]}
        />
      </Panel>
    </AppPage>
  );
}
