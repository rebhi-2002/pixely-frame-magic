import { createFileRoute } from "@tanstack/react-router";
import {
  AppPage,
  StatGrid,
  Panel,
  RowList,
  Progress,
  DataTable,
  QuickLinks,
  Badge,
  EmptyState,
} from "@/components/app/kit";
import { Guard } from "@/components/app/guard";
import { useBi } from "@/lib/bi";
import { TrendChart } from "@/components/app/charts";

const title = "تقرير الابن | أكاديميا";
const description = "تقرير أسبوعي واضح: التزام، إتقان، ومواطن الضعف — بدون أرقام مضلّلة.";

export const Route = createFileRoute("/_authenticated/parent/report")({
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
    <Guard pageKey="parent_report">
      <Body />
    </Guard>
  );
}

function Body() {
  const bi = useBi();
  return (
    <AppPage
      title={bi("تقرير الابن", "Child report")}
      icon="FileBarChart"
      subtitle={bi(
        "تقرير أسبوعي واضح: التزام، إتقان، ومواطن الضعف — بدون أرقام مضلّلة.",
        "A clear weekly report: consistency, mastery and weak spots — no vanity metrics.",
      )}
    >
      <StatGrid
        items={[
          { icon: "User", label: bi("الابن المتابَع", "Child"), value: bi("أحمد", "Ahmad") },
          { icon: "Flame", label: bi("أيام دراسة", "Study days"), value: "5/7" },
          { icon: "Percent", label: bi("متوسط الإتقان", "Avg. mastery"), value: "66%" },
          { icon: "AlertTriangle", label: bi("مواد تحتاج دعم", "Needs support"), value: "1" },
        ]}
      />
      <Panel title={bi("تقدّم الأسبوع", "Weekly progress")} icon="ChartSpline">
        <TrendChart
          data={[
            { label: bi("أسبوع 1", "W1"), value: 58 },
            { label: bi("أسبوع 2", "W2"), value: 64 },
            { label: bi("أسبوع 3", "W3"), value: 61 },
            { label: bi("أسبوع 4", "W4"), value: 73 },
          ]}
        />
      </Panel>
      <Panel title={bi("إتقان المواد", "Subject mastery")} icon="LineChart">
        <Progress label={bi("الرياضيات", "Math")} value={78} />
        <Progress label={bi("الفيزياء", "Physics")} value={54} />
        <Progress label={bi("الكيمياء", "Chemistry")} value={40} />
        <Progress label={bi("اللغة العربية", "Arabic")} value={91} />
      </Panel>
      <Panel title={bi("ملخّص الأسبوع", "Week summary")} icon="Activity">
        <RowList
          rows={[
            {
              title: bi("ساعات الدراسة", "Study hours"),
              meta: bi("9 ساعات و20 دقيقة", "9h 20m"),
              value: bi("+12%", "+12%"),
              tone: "success",
            },
            {
              title: bi("امتحانات تدريبية", "Mock exams"),
              meta: bi("امتحانان", "2 exams"),
              value: bi("72%", "72%"),
              tone: "primary",
            },
            {
              title: bi("الكيمياء تحتاج متابعة", "Chemistry needs attention"),
              meta: bi("أخطاء متكرّرة في التفاعلات", "Repeated reaction mistakes"),
              value: bi("تنبيه", "Alert"),
              tone: "danger",
            },
          ]}
        />
      </Panel>
    </AppPage>
  );
}
