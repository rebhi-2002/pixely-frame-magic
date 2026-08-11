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

const title = "لوحة الطالب | أكاديميا";
const description = "كل دراستك بمكان واحد: تقدّمك اليوم، مهامك القريبة، والمواد التي تحتاج مراجعة.";

export const Route = createFileRoute("/_authenticated/dashboard")({
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
    <Guard pageKey="student_dashboard">
      <Body />
    </Guard>
  );
}

function Body() {
  const bi = useBi();
  return (
    <AppPage
      title={bi("لوحة الطالب", "Student dashboard")}
      icon="LayoutDashboard"
      subtitle={bi(
        "كل دراستك بمكان واحد: تقدّمك اليوم، مهامك القريبة، والمواد التي تحتاج مراجعة.",
        "Everything in one place: today's progress, upcoming tasks, and subjects that need review.",
      )}
    >
      <StatGrid
        items={[
          { icon: "Flame", label: bi("أيام متتالية", "Streak days"), value: "12" },
          { icon: "Timer", label: bi("دقائق دراسة اليوم", "Minutes studied today"), value: "45" },
          { icon: "ListChecks", label: bi("مهام مكتملة", "Tasks done"), value: "8/11" },
          { icon: "Trophy", label: bi("نقاط الإنجاز", "Achievement points"), value: "1,240" },
        ]}
      />
      <Panel title={bi("ابدأ الآن", "Start now")} icon="Zap">
        <QuickLinks
          items={[
            { to: "/library", label: bi("المكتبة", "Library"), icon: "Library" },
            { to: "/exam-simulator", label: bi("محاكي امتحان", "Exam simulator"), icon: "Timer" },
            { to: "/mistakes-bank", label: bi("بنك الأخطاء", "Mistakes bank"), icon: "XCircle" },
            { to: "/flashcards", label: bi("بطاقات مراجعة", "Flashcards"), icon: "Layers" },
            { to: "/schedule", label: bi("جدولي", "My schedule"), icon: "CalendarDays" },
            { to: "/my-courses", label: bi("كورساتي", "My courses"), icon: "BookOpenCheck" },
          ]}
        />
      </Panel>
      <Panel title={bi("دقائق الدراسة الأسبوعية", "Weekly study minutes")} icon="ChartSpline">
        <TrendChart data={[{ label: bi("سبت", "Sat"), value: 35 }, { label: bi("أحد", "Sun"), value: 50 }, { label: bi("اثنين", "Mon"), value: 42 }, { label: bi("ثلاثاء", "Tue"), value: 68 }, { label: bi("أربعاء", "Wed"), value: 55 }, { label: bi("خميس", "Thu"), value: 72 }, { label: bi("جمعة", "Fri"), value: 30 }]} />
      </Panel>
      <Panel title={bi("إتقان المواد", "Subject mastery")} icon="LineChart">
        <Progress label={bi("الرياضيات", "Math")} value={78} />
        <Progress label={bi("الفيزياء", "Physics")} value={54} />
        <Progress label={bi("اللغة العربية", "Arabic")} value={91} />
        <Progress label={bi("الكيمياء", "Chemistry")} value={40} />
      </Panel>
      <Panel title={bi("قريباً", "Coming up")} icon="CalendarClock">
        <RowList
          rows={[
            {
              title: bi("امتحان فيزياء — وحدة 3", "Physics quiz — unit 3"),
              meta: bi("غداً 9:00", "Tomorrow 9:00"),
              value: bi("امتحان", "Quiz"),
              tone: "primary",
            },
            {
              title: bi("تسليم ورقة عمل رياضيات", "Math worksheet due"),
              meta: bi("بعد يومين", "In 2 days"),
              value: bi("واجب", "Homework"),
              tone: "muted",
            },
            {
              title: bi("مراجعة بطاقات كيمياء", "Chemistry flashcards review"),
              meta: bi("اليوم", "Today"),
              value: bi("مراجعة", "Review"),
              tone: "success",
            },
          ]}
        />
      </Panel>
    </AppPage>
  );
}
