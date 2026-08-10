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

const title = "الاختبارات | أكاديميا";
const description = "بنك أسئلتك واختباراتك: اختيار متعدد، صح/خطأ، ومقالي — مع تصحيح آلي حيث ينفع.";

export const Route = createFileRoute("/_authenticated/teacher/quizzes")({
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
    <Guard pageKey="teacher_quizzes">
      <Body />
    </Guard>
  );
}

function Body() {
  const bi = useBi();
  return (
    <AppPage
      title={bi("الاختبارات", "Quizzes")}
      icon="ListChecks"
      subtitle={bi(
        "بنك أسئلتك واختباراتك: اختيار متعدد، صح/خطأ، ومقالي — مع تصحيح آلي حيث ينفع.",
        "Your question bank and quizzes: MCQ, true/false and essay — auto-graded where possible.",
      )}
    >
      <StatGrid
        items={[
          { icon: "ListChecks", label: bi("اختبارات", "Quizzes"), value: "14" },
          { icon: "HelpCircle", label: bi("أسئلة في البنك", "Questions in bank"), value: "268" },
          { icon: "Users", label: bi("محاولات هذا الأسبوع", "Attempts this week"), value: "312" },
          { icon: "Percent", label: bi("متوسط النتائج", "Average score"), value: "71%" },
        ]}
      />
      <Panel title={bi("اختباراتك", "Your quizzes")} icon="ListChecks">
        <DataTable
          head={[
            bi("الاختبار", "Quiz"),
            bi("الأسئلة", "Questions"),
            bi("المحاولات", "Attempts"),
            bi("الحالة", "Status"),
          ]}
          rows={[
            [
              bi("رياضيات — وحدة 4", "Math — unit 4"),
              "20",
              "96",
              <Badge tone="success">{bi("نشط", "Live")}</Badge>,
            ],
            [
              bi("فيزياء — الحركة", "Physics — motion"),
              "15",
              "74",
              <Badge tone="success">{bi("نشط", "Live")}</Badge>,
            ],
            [
              bi("كيمياء — تدريب سريع", "Chemistry — quick drill"),
              "10",
              "0",
              <Badge tone="muted">{bi("مسوّدة", "Draft")}</Badge>,
            ],
          ]}
        />
      </Panel>
    </AppPage>
  );
}
