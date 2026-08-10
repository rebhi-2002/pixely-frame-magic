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

const title = "محاكي الامتحان | أكاديميا";
const description =
  "امتحان تدريبي بمؤقّت وشكل ورقة حقيقية، وتحليل يكشف نقاط ضعفك قبل الامتحان الحقيقي.";

export const Route = createFileRoute("/_authenticated/exam-simulator")({
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
    <Guard pageKey="student_exam">
      <Body />
    </Guard>
  );
}

function Body() {
  const bi = useBi();
  return (
    <AppPage
      title={bi("محاكي الامتحان", "Exam simulator")}
      icon="Timer"
      subtitle={bi(
        "امتحان تدريبي بمؤقّت وشكل ورقة حقيقية، وتحليل يكشف نقاط ضعفك قبل الامتحان الحقيقي.",
        "A timed mock exam that looks like the real paper, with analysis that exposes weak spots.",
      )}
    >
      <StatGrid
        items={[
          { icon: "FileCheck2", label: bi("امتحانات أنهيتها", "Exams taken"), value: "7" },
          { icon: "Percent", label: bi("أفضل نتيجة", "Best score"), value: "88%" },
          { icon: "Timer", label: bi("متوسط الوقت", "Avg. time"), value: "42 د" },
          { icon: "Target", label: bi("الهدف", "Target"), value: "90%" },
        ]}
      />
      <Panel title={bi("امتحانات جاهزة", "Ready mock exams")} icon="FileText">
        <RowList
          rows={[
            {
              title: bi("رياضيات — نموذج وزاري كامل", "Math — full ministry model"),
              meta: bi("40 سؤالاً · 60 دقيقة", "40 questions · 60 min"),
              value: bi("ابدأ", "Start"),
              tone: "primary",
            },
            {
              title: bi("فيزياء — الوحدات 1-3", "Physics — units 1-3"),
              meta: bi("25 سؤالاً · 35 دقيقة", "25 questions · 35 min"),
              value: bi("ابدأ", "Start"),
              tone: "primary",
            },
            {
              title: bi("كيمياء — امتحان سريع", "Chemistry — quick quiz"),
              meta: bi("10 أسئلة · 12 دقيقة", "10 questions · 12 min"),
              value: bi("ابدأ", "Start"),
              tone: "primary",
            },
          ]}
        />
      </Panel>
      <Panel title={bi("نتائجك السابقة", "Past results")} icon="History">
        <DataTable
          head={[
            bi("الامتحان", "Exam"),
            bi("التاريخ", "Date"),
            bi("النتيجة", "Score"),
            bi("الوقت", "Time"),
          ]}
          rows={[
            [
              bi("رياضيات — نموذج 2", "Math — model 2"),
              bi("2026/07/28", "2026/07/28"),
              <Badge tone="success">88%</Badge>,
              bi("54 د", "54 min"),
            ],
            [
              bi("فيزياء — وحدة 2", "Physics — unit 2"),
              bi("2026/07/21", "2026/07/21"),
              <Badge tone="primary">72%</Badge>,
              bi("31 د", "31 min"),
            ],
            [
              bi("كيمياء — سريع", "Chemistry — quick"),
              bi("2026/07/14", "2026/07/14"),
              <Badge tone="danger">54%</Badge>,
              bi("11 د", "11 min"),
            ],
          ]}
        />
      </Panel>
    </AppPage>
  );
}
