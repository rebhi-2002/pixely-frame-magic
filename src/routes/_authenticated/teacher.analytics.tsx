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

const title = "التحليلات | أكاديميا";
const description = "أين يتعثّر طلابك بالضبط: أسئلة يخطئ فيها الأكثر، وإتقان كل وحدة.";

export const Route = createFileRoute("/_authenticated/teacher/analytics")({
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
    <Guard pageKey="teacher_analytics">
      <Body />
    </Guard>
  );
}

function Body() {
  const bi = useBi();
  return (
    <AppPage
      title={bi("التحليلات", "Analytics")}
      icon="LineChart"
      subtitle={bi(
        "أين يتعثّر طلابك بالضبط: أسئلة يخطئ فيها الأكثر، وإتقان كل وحدة.",
        "Exactly where students struggle: most-missed questions and per-unit mastery.",
      )}
    >
      <StatGrid
        items={[
          { icon: "Users", label: bi("طلاب نشطون", "Active students"), value: "112" },
          { icon: "Percent", label: bi("متوسط الإتقان", "Avg. mastery"), value: "68%" },
          { icon: "TrendingUp", label: bi("تحسّن الشهر", "Monthly gain"), value: "+9%" },
          { icon: "AlertTriangle", label: bi("وحدات ضعيفة", "Weak units"), value: "3" },
        ]}
      />
      <Panel title={bi("إتقان الوحدات", "Unit mastery")} icon="LineChart">
        <Progress label={bi("وحدة 1 — الأساسيات", "Unit 1 — basics")} value={88} />
        <Progress label={bi("وحدة 2 — النهايات", "Unit 2 — limits")} value={71} />
        <Progress label={bi("وحدة 3 — المشتقات", "Unit 3 — derivatives")} value={52} />
        <Progress label={bi("وحدة 4 — التكامل", "Unit 4 — integration")} value={39} />
      </Panel>
      <Panel title={bi("الأسئلة الأكثر خطأً", "Most-missed questions")} icon="XCircle">
        <RowList
          rows={[
            {
              title: bi("تكامل بالتجزيء — سؤال 7", "Integration by parts — Q7"),
              meta: bi("68% أخطأوا", "68% wrong"),
              value: bi("أولوية", "Priority"),
              tone: "danger",
            },
            {
              title: bi("قاعدة السلسلة — سؤال 3", "Chain rule — Q3"),
              meta: bi("54% أخطأوا", "54% wrong"),
              value: bi("مراجعة", "Review"),
              tone: "primary",
            },
            {
              title: bi("النهايات اللانهائية — سؤال 11", "Infinite limits — Q11"),
              meta: bi("41% أخطأوا", "41% wrong"),
              value: bi("مراجعة", "Review"),
              tone: "primary",
            },
          ]}
        />
      </Panel>
    </AppPage>
  );
}
