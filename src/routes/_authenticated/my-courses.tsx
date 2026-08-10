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

const title = "كورساتي | أكاديميا";
const description = "الكورسات التي اشتركت فيها فعلياً — تقدّمك، الحصة القادمة، وشهادة الإتمام.";

export const Route = createFileRoute("/_authenticated/my-courses")({
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
    <Guard pageKey="student_my_courses">
      <Body />
    </Guard>
  );
}

function Body() {
  const bi = useBi();
  return (
    <AppPage
      title={bi("كورساتي", "My courses")}
      icon="BookOpenCheck"
      subtitle={bi(
        "الكورسات التي اشتركت فيها فعلياً — تقدّمك، الحصة القادمة، وشهادة الإتمام.",
        "Courses you actually enrolled in — progress, next session and completion certificate.",
      )}
    >
      <StatGrid
        items={[
          { icon: "BookOpenCheck", label: bi("كورسات نشطة", "Active courses"), value: "3" },
          { icon: "CheckCircle2", label: bi("مكتملة", "Completed"), value: "2" },
          { icon: "Timer", label: bi("ساعات مشاهدة", "Watch hours"), value: "31" },
          { icon: "Award", label: bi("شهادات", "Certificates"), value: "2" },
        ]}
      />
      <Panel title={bi("كورساتك النشطة", "Active courses")} icon="BookOpenCheck">
        <RowList
          to="/courses"
          rows={[
            {
              title: bi("تفاضل وتكامل — أ. سامي", "Calculus — Mr. Sami"),
              meta: bi("الحصة القادمة: الأحد 18:00", "Next: Sunday 18:00"),
              value: bi("62%", "62%"),
              tone: "primary",
            },
            {
              title: bi("فيزياء الوزاري — أ. ريم", "Ministry physics — Ms. Reem"),
              meta: bi("الحصة القادمة: الثلاثاء 19:30", "Next: Tuesday 19:30"),
              value: bi("45%", "45%"),
              tone: "primary",
            },
            {
              title: bi("عربي — بلاغة وتحليل", "Arabic — rhetoric"),
              meta: bi("مُسجّل مسبقاً", "Pre-recorded"),
              value: bi("88%", "88%"),
              tone: "success",
            },
          ]}
        />
      </Panel>
      <Panel title={bi("كورسات أكملتها", "Completed")} icon="CheckCircle2">
        <RowList
          to="/my-certificates"
          rows={[
            {
              title: bi("مهارات المراجعة الذكية", "Smart revision skills"),
              meta: bi("أُنجز 2026/06/10", "Done 2026/06/10"),
              value: bi("شهادة", "Certificate"),
              tone: "success",
            },
            {
              title: bi("أساسيات الكيمياء", "Chemistry basics"),
              meta: bi("أُنجز 2026/05/02", "Done 2026/05/02"),
              value: bi("شهادة", "Certificate"),
              tone: "success",
            },
          ]}
        />
      </Panel>
    </AppPage>
  );
}
