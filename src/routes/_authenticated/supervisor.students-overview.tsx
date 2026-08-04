import { createFileRoute } from "@tanstack/react-router";
import { AppPage, StatGrid, Panel, RowList, Progress, DataTable, QuickLinks, Badge, EmptyState } from "@/components/app/kit";
import { Guard } from "@/components/app/guard";
import { useBi } from "@/lib/bi";

const title = "نظرة الطلاب | أكاديميا";
const description = "الطلاب المتعثّرون أولاً: من يحتاج تدخّلاً الآن ولماذا.";

export const Route = createFileRoute("/_authenticated/supervisor/students-overview")({
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
    <Guard pageKey="supervisor_students">
      <Body />
    </Guard>
  );
}

function Body() {
  const bi = useBi();
  return (
    <AppPage
      title={bi("نظرة الطلاب", "Students overview")}
      icon="Users"
      subtitle={bi("الطلاب المتعثّرون أولاً: من يحتاج تدخّلاً الآن ولماذا.", "Struggling students first: who needs intervention now, and why.")}
    >
      <StatGrid
        items={[
          {{ icon: "Users", label: bi("طلاب", "Students"), value: "1,240" }},
          {{ icon: "AlertTriangle", label: bi("متعثّرون", "At risk"), value: "63" }},
          {{ icon: "Flame", label: bi("منتظمون", "Consistent"), value: "812" }},
          {{ icon: "TrendingUp", label: bi("تحسّنوا هذا الشهر", "Improved"), value: "184" }},
        ]}
      />
      <Panel title={bi("يحتاجون تدخّلاً", "Needs intervention")} icon="Users">
        <DataTable
          head={[bi("الطالب", "Student"), bi("الصف", "Grade"), bi("أضعف مادة", "Weakest"), bi("الحالة", "Status")]}
          rows={[
            [bi("أحمد ع.", "Ahmad A."), bi("11", "11"), bi("كيمياء 40%", "Chemistry 40%"), <Badge tone="danger">{bi("متعثّر", "At risk")}</Badge>],
            [bi("سما ح.", "Sama H."), bi("9", "9"), bi("رياضيات 48%", "Math 48%"), <Badge tone="danger">{bi("متعثّر", "At risk")}</Badge>],
            [bi("يزن م.", "Yazan M."), bi("10", "10"), bi("فيزياء 58%", "Physics 58%"), <Badge tone="primary">{bi("مراقبة", "Watch")}</Badge>],
          ]}
        />
      </Panel>
    </AppPage>
  );
}
