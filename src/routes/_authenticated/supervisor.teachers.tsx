import { createFileRoute } from "@tanstack/react-router";
import { AppPage, StatGrid, Panel, RowList, Progress, DataTable, QuickLinks, Badge, EmptyState } from "@/components/app/kit";
import { Guard } from "@/components/app/guard";
import { useBi } from "@/lib/bi";

const title = "المعلمون | أكاديميا";
const description = "أداء كل معلم: سرعة الرد، زمن التصحيح، وإتقان طلابه.";

export const Route = createFileRoute("/_authenticated/supervisor/teachers")({
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
    <Guard pageKey="supervisor_teachers">
      <Body />
    </Guard>
  );
}

function Body() {
  const bi = useBi();
  return (
    <AppPage
      title={bi("المعلمون", "Teachers")}
      icon="Presentation"
      subtitle={bi("أداء كل معلم: سرعة الرد، زمن التصحيح، وإتقان طلابه.", "Per-teacher performance: response time, grading speed and student mastery.")}
    >
      <StatGrid
        items={[
          { icon: "Presentation", label: bi("معلمون نشطون", "Active teachers"), value: "18" },
          { icon: "Clock", label: bi("متوسط زمن الرد", "Avg. response"), value: "5 س" },
          { icon: "PenSquare", label: bi("متوسط زمن التصحيح", "Avg. grading"), value: "1.8 يوم" },
          { icon: "Star", label: bi("متوسط التقييم", "Avg. rating"), value: "4.6" },
        ]}
      />
      <Panel title={bi("قائمة المعلمين", "Teacher list")} icon="Presentation">
        <DataTable
          head={[bi("المعلم", "Teacher"), bi("المادة", "Subject"), bi("طلاب", "Students"), bi("الحالة", "Status")]}
          rows={[
            [bi("أ. سامي خالد", "Mr. Sami Khaled"), bi("رياضيات", "Math"), "126", <Badge tone="success">{bi("ممتاز", "Excellent")}</Badge>],
            [bi("أ. ريم ناصر", "Ms. Reem Nasser"), bi("فيزياء", "Physics"), "98", <Badge tone="danger">{bi("تأخّر تصحيح", "Grading delay")}</Badge>],
            [bi("أ. هدى سليم", "Ms. Huda Salim"), bi("كيمياء", "Chemistry"), "84", <Badge tone="primary">{bi("جيد", "Good")}</Badge>],
          ]}
        />
      </Panel>
    </AppPage>
  );
}
