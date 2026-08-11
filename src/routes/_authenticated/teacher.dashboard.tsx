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
import { ComparisonChart } from "@/components/app/charts";

const title = "لوحة المعلم | أكاديميا";
const description = "صفوفك اليوم: ما يحتاج تصحيحاً، أسئلة تنتظر جوابك، وأداء طلابك.";

export const Route = createFileRoute("/_authenticated/teacher/dashboard")({
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
    <Guard pageKey="teacher_dashboard">
      <Body />
    </Guard>
  );
}

function Body() {
  const bi = useBi();
  return (
    <AppPage
      title={bi("لوحة المعلم", "Teacher dashboard")}
      icon="LayoutDashboard"
      subtitle={bi(
        "صفوفك اليوم: ما يحتاج تصحيحاً، أسئلة تنتظر جوابك، وأداء طلابك.",
        "Your classes today: what needs grading, questions awaiting you, and student performance.",
      )}
    >
      <StatGrid
        items={[
          { icon: "Users", label: bi("طلابك", "Students"), value: "126" },
          { icon: "PenSquare", label: bi("بانتظار التصحيح", "Awaiting grading"), value: "18" },
          {
            icon: "MessagesSquare",
            label: bi("أسئلة بلا جواب", "Unanswered questions"),
            value: "7",
          },
          { icon: "Wallet", label: bi("أرباح الشهر", "This month"), value: "820 د.أ" },
        ]}
      />
      <Panel title={bi("تفاعل الطلاب بالمادة", "Student engagement by subject")} icon="ChartSpline">
        <ComparisonChart
          data={[
            { label: bi("رياضيات", "Math"), value: 320 },
            { label: bi("فيزياء", "Physics"), value: 245 },
            { label: bi("كيمياء", "Chemistry"), value: 180 },
            { label: bi("عربي", "Arabic"), value: 210 },
          ]}
        />
      </Panel>
      <Panel title={bi("إجراءات سريعة", "Quick actions")} icon="Zap">
        <QuickLinks
          items={[
            { to: "/teacher/content", label: bi("إضافة محتوى", "Add content"), icon: "FileStack" },
            {
              to: "/teacher/quizzes",
              label: bi("إنشاء اختبار", "Create quiz"),
              icon: "ListChecks",
            },
            {
              to: "/teacher/grading",
              label: bi("ابدأ التصحيح", "Start grading"),
              icon: "PenSquare",
            },
            {
              to: "/teacher/community",
              label: bi("مجتمع الصف", "Class community"),
              icon: "MessagesSquare",
            },
            { to: "/teacher/analytics", label: bi("التحليلات", "Analytics"), icon: "LineChart" },
            { to: "/teacher/earnings", label: bi("الأرباح", "Earnings"), icon: "Wallet" },
          ]}
        />
      </Panel>
      <Panel title={bi("يحتاج انتباهك", "Needs your attention")} icon="Bell">
        <RowList
          rows={[
            {
              title: bi("18 ورقة رياضيات بانتظار التصحيح", "18 math papers to grade"),
              meta: bi("الصف الحادي عشر", "Grade 11"),
              value: bi("عاجل", "Urgent"),
              tone: "danger",
            },
            {
              title: bi("7 أسئلة في مجتمع الفيزياء", "7 questions in physics community"),
              meta: bi("منذ يومين", "2 days ago"),
              value: bi("متابعة", "Follow up"),
              tone: "primary",
            },
            {
              title: bi("درس «الدوال» بانتظار مراجعة المحتوى", "Functions lesson pending review"),
              meta: bi("أُرسل 2026/07/29", "Sent 2026/07/29"),
              value: bi("قيد المراجعة", "In review"),
              tone: "muted",
            },
          ]}
        />
      </Panel>
    </AppPage>
  );
}
