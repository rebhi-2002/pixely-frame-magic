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

const title = "المكتبة | أكاديميا";
const description =
  "مكتبة مرتّبة: فصل ← مادة ← وحدة ← درس. لا مزيد من الملفات الضائعة في الواتساب.";

export const Route = createFileRoute("/_authenticated/library")({
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
    <Guard pageKey="student_library">
      <Body />
    </Guard>
  );
}

function Body() {
  const bi = useBi();
  return (
    <AppPage
      title={bi("المكتبة", "Library")}
      icon="Library"
      subtitle={bi(
        "مكتبة مرتّبة: فصل ← مادة ← وحدة ← درس. لا مزيد من الملفات الضائعة في الواتساب.",
        "A tidy library: term → subject → unit → lesson. No more files lost in WhatsApp.",
      )}
    >
      <StatGrid
        items={[
          { icon: "Book", label: bi("مواد", "Subjects"), value: "6" },
          { icon: "Layers", label: bi("وحدات", "Units"), value: "24" },
          { icon: "FileText", label: bi("دروس", "Lessons"), value: "138" },
          { icon: "CheckCircle2", label: bi("دروس مكتملة", "Completed"), value: "62" },
        ]}
      />
      <Panel title={bi("موادك", "Your subjects")} icon="Book">
        <RowList
          to="/library/lesson/1"
          rows={[
            {
              title: bi("الرياضيات — الفصل الأول", "Math — term 1"),
              meta: bi("6 وحدات · 32 درساً", "6 units · 32 lessons"),
              value: bi("78%", "78%"),
              tone: "success",
            },
            {
              title: bi("الفيزياء — الفصل الأول", "Physics — term 1"),
              meta: bi("5 وحدات · 26 درساً", "5 units · 26 lessons"),
              value: bi("54%", "54%"),
              tone: "primary",
            },
            {
              title: bi("الكيمياء — الفصل الأول", "Chemistry — term 1"),
              meta: bi("4 وحدات · 21 درساً", "4 units · 21 lessons"),
              value: bi("40%", "40%"),
              tone: "muted",
            },
            {
              title: bi("اللغة العربية — الفصل الأول", "Arabic — term 1"),
              meta: bi("5 وحدات · 30 درساً", "5 units · 30 lessons"),
              value: bi("91%", "91%"),
              tone: "success",
            },
          ]}
        />
      </Panel>
      <Panel title={bi("أكملت من حيث توقفت", "Continue where you left off")} icon="History">
        <RowList
          to="/library/lesson/1"
          rows={[
            {
              title: bi("درس: المشتقات — تطبيقات", "Lesson: Derivatives — applications"),
              meta: bi("الرياضيات · وحدة 4", "Math · unit 4"),
              value: bi("متابعة", "Resume"),
              tone: "primary",
            },
            {
              title: bi("درس: قوانين نيوتن", "Lesson: Newton's laws"),
              meta: bi("الفيزياء · وحدة 2", "Physics · unit 2"),
              value: bi("متابعة", "Resume"),
              tone: "primary",
            },
          ]}
        />
      </Panel>
    </AppPage>
  );
}
