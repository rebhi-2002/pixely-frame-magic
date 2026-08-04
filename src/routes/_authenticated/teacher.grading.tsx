import { createFileRoute } from "@tanstack/react-router";
import { AppPage, StatGrid, Panel, RowList, Progress, DataTable, QuickLinks, Badge, EmptyState } from "@/components/app/kit";
import { Guard } from "@/components/app/guard";
import { useBi } from "@/lib/bi";

const title = "التصحيح | أكاديميا";
const description = "قائمة التصحيح: الأسئلة المقالية والملفات المرفوعة، مع ملاحظات لكل طالب.";

export const Route = createFileRoute("/_authenticated/teacher/grading")({
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
    <Guard pageKey="teacher_grading">
      <Body />
    </Guard>
  );
}

function Body() {
  const bi = useBi();
  return (
    <AppPage
      title={bi("التصحيح", "Grading")}
      icon="PenSquare"
      subtitle={bi("قائمة التصحيح: الأسئلة المقالية والملفات المرفوعة، مع ملاحظات لكل طالب.", "The grading queue: essay answers and uploaded files, with per-student feedback.")}
    >
      <StatGrid
        items={[
          {{ icon: "PenSquare", label: bi("بانتظار التصحيح", "Pending"), value: "18" }},
          {{ icon: "CheckCheck", label: bi("صُحّحت اليوم", "Graded today"), value: "11" }},
          {{ icon: "Clock", label: bi("متوسط وقت التصحيح", "Avg. time"), value: "3.4 د" }},
          {{ icon: "AlertTriangle", label: bi("متأخّرة", "Overdue"), value: "2" }},
        ]}
      />
      <Panel title={bi("طابور التصحيح", "Grading queue")} icon="PenSquare">
        <DataTable
          head={[bi("الطالب", "Student"), bi("العمل", "Item"), bi("أُرسل", "Submitted"), bi("الحالة", "Status")]}
          rows={[
            [bi("أحمد ع.", "Ahmad A."), bi("امتحان وحدة 4 — مقالي", "Unit 4 exam — essay"), bi("اليوم 10:12", "Today 10:12"), <Badge tone="danger">{bi("بانتظار", "Pending")}</Badge>],
            [bi("سما ح.", "Sama H."), bi("ورقة عمل مرفوعة", "Uploaded worksheet"), bi("أمس", "Yesterday"), <Badge tone="danger">{bi("بانتظار", "Pending")}</Badge>],
            [bi("يزن م.", "Yazan M."), bi("امتحان وحدة 3", "Unit 3 exam"), bi("2026/07/28", "2026/07/28"), <Badge tone="success">{bi("مُصحّح", "Graded")}</Badge>],
          ]}
        />
      </Panel>
    </AppPage>
  );
}
