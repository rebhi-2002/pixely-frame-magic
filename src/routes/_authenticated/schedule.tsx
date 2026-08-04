import { createFileRoute } from "@tanstack/react-router";
import { AppPage, StatGrid, Panel, RowList, Progress, DataTable, QuickLinks, Badge, EmptyState } from "@/components/app/kit";
import { Guard } from "@/components/app/guard";
import { useBi } from "@/lib/bi";

const title = "الجدول | أكاديميا";
const description = "جدول دراسي يذكّرك: حصص، واجبات، امتحانات، وجلسات مراجعة.";

export const Route = createFileRoute("/_authenticated/schedule")({
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
    <Guard pageKey="student_schedule">
      <Body />
    </Guard>
  );
}

function Body() {
  const bi = useBi();
  return (
    <AppPage
      title={bi("الجدول", "Schedule")}
      icon="CalendarDays"
      subtitle={bi("جدول دراسي يذكّرك: حصص، واجبات، امتحانات، وجلسات مراجعة.", "A schedule that reminds you: classes, homework, exams and review sessions.")}
    >
      <StatGrid
        items={[
          { icon: "CalendarDays", label: bi("أحداث هذا الأسبوع", "This week"), value: "14" },
          { icon: "BellRing", label: bi("تذكيرات مفعّلة", "Reminders on"), value: "9" },
          { icon: "ListChecks", label: bi("مهام متأخرة", "Overdue"), value: "2" },
          { icon: "Timer", label: bi("ساعات مخطّطة", "Planned hours"), value: "11" },
        ]}
      />
      <Panel title={bi("أسبوعك", "Your week")} icon="CalendarDays">
        <DataTable
          head={[bi("اليوم", "Day"), bi("النشاط", "Activity"), bi("الوقت", "Time"), bi("النوع", "Type")]}
          rows={[
            [bi("الأحد", "Sunday"), bi("مراجعة رياضيات", "Math review"), bi("17:00", "17:00"), <Badge tone="primary">{bi("مراجعة", "Review")}</Badge>],
            [bi("الاثنين", "Monday"), bi("امتحان فيزياء", "Physics quiz"), bi("09:00", "09:00"), <Badge tone="danger">{bi("امتحان", "Exam")}</Badge>],
            [bi("الأربعاء", "Wednesday"), bi("تسليم واجب كيمياء", "Chemistry homework due"), bi("23:59", "23:59"), <Badge tone="muted">{bi("واجب", "Homework")}</Badge>],
          ]}
        />
      </Panel>
    </AppPage>
  );
}
