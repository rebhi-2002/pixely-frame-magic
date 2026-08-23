import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Loader2 } from "lucide-react";
import { AppPage, Badge, DataTable, Panel, StatGrid } from "@/components/app/kit";
import { WelcomeBanner } from "@/components/app/welcome-banner";
import { ComparisonChart, SplitChart } from "@/components/app/charts";
import { listRoles, listUsers } from "@/lib/rbac.functions";
import {
  listCommunityReports,
  listContentSubmissions,
  listTeacherVerifications,
} from "@/lib/admin-moderation.functions";
import {
  listCurriculumRequests,
  listCurriculumSubjects,
  listPayments,
} from "@/lib/admin-curriculum.functions";
import { useBi } from "@/lib/bi";

/**
 * لوحة الأدمن — كل رقم هون محسوب فعلياً من بيانات حقيقية (وإن كانت ثابتة
 * بالذاكرة مؤقتاً) عبر الشاشات يلي بنيناها: توثيق المعلمين، مراجعة المحتوى،
 * بلاغات المجتمع، المدفوعات، المنهاج، طلبات المنهاج، المستخدمون/الأدوار.
 * ما في أي رقم مكتوب يدوياً هون — لما تضيف/تعدّل/تحذف بأي شاشة من هذول،
 * الأرقام هنا بتتحدث تلقائياً.
 */
export function AdminDashboardPage() {
  const bi = useBi();

  const teacherVerifications = useServerFn(listTeacherVerifications);
  const contentSubmissions = useServerFn(listContentSubmissions);
  const communityReports = useServerFn(listCommunityReports);
  const payments = useServerFn(listPayments);
  const curriculumSubjects = useServerFn(listCurriculumSubjects);
  const curriculumRequests = useServerFn(listCurriculumRequests);
  const users = useServerFn(listUsers);
  const roles = useServerFn(listRoles);

  const q1 = useQuery({
    queryKey: ["teacher-verifications"],
    queryFn: () => teacherVerifications(),
  });
  const q2 = useQuery({ queryKey: ["content-submissions"], queryFn: () => contentSubmissions() });
  const q3 = useQuery({ queryKey: ["community-reports"], queryFn: () => communityReports() });
  const q4 = useQuery({ queryKey: ["payments"], queryFn: () => payments() });
  const q5 = useQuery({ queryKey: ["curriculum-subjects"], queryFn: () => curriculumSubjects() });
  const q6 = useQuery({ queryKey: ["curriculum-requests"], queryFn: () => curriculumRequests() });
  const q7 = useQuery({ queryKey: ["rbac-users"], queryFn: () => users() });
  const q8 = useQuery({ queryKey: ["rbac-roles"], queryFn: () => roles() });

  const isLoading = [q1, q2, q3, q4, q5, q6, q7, q8].some((q) => q.isLoading);

  if (isLoading) {
    return (
      <AppPage title={bi("لوحة إدارة Academia", "Academia admin dashboard")} icon="LayoutDashboard">
        <div className="flex justify-center py-16">
          <Loader2 className="size-6 animate-spin text-primary" />
        </div>
      </AppPage>
    );
  }

  const verifications = q1.data ?? [];
  const content = q2.data ?? [];
  const reports = q3.data ?? [];
  const payoutRows = q4.data ?? [];
  const subjects = q5.data ?? [];
  const requests = q6.data ?? [];
  const allUsers = q7.data ?? [];
  const allRoles = q8.data ?? [];

  const verifiedTeachers = verifications.filter((r) => r.status === "مكتمل").length;
  const totalCourses = subjects.reduce((sum, s) => sum + s.coursesCount, 0);
  const openReports = reports.filter((r) => r.status === "مفتوح").length;

  const tasks: {
    title: [string, string];
    area: [string, string];
    tone: "primary" | "danger" | "muted";
  }[] = [];
  const pendingVerifications = verifications.filter((r) => r.status === "قيد المراجعة").length;
  if (pendingVerifications > 0) {
    tasks.push({
      title: [
        `مراجعة ${pendingVerifications} طلب توثيق`,
        `Review ${pendingVerifications} verification requests`,
      ],
      area: ["المعلمون", "Teachers"],
      tone: "primary",
    });
  }
  const newContent = content.filter((r) => r.status === "جديد").length;
  if (newContent > 0) {
    tasks.push({
      title: [`مراجعة ${newContent} محتوى جديد`, `Review ${newContent} new content items`],
      area: ["المحتوى", "Content"],
      tone: "muted",
    });
  }
  if (openReports > 0) {
    tasks.push({
      title: [
        `تدقيق ${openReports} بلاغ مجتمع مفتوح`,
        `Triage ${openReports} open community reports`,
      ],
      area: ["الأمان", "Safety"],
      tone: "danger",
    });
  }
  const reviewRequests = requests.filter(
    (r) => r.status === "قيد الدراسة" || r.status === "جاهز للاعتماد",
  ).length;
  if (reviewRequests > 0) {
    tasks.push({
      title: [
        `${reviewRequests} طلب منهاج بانتظار القرار`,
        `${reviewRequests} curriculum requests awaiting decision`,
      ],
      area: ["المنهاج", "Curriculum"],
      tone: "primary",
    });
  }
  const pendingPayments = payoutRows.filter((r) => r.status === "قيد المعالجة").length;
  if (pendingPayments > 0) {
    tasks.push({
      title: [`${pendingPayments} دفعة قيد المعالجة`, `${pendingPayments} payments processing`],
      area: ["المدفوعات", "Payments"],
      tone: "muted",
    });
  }

  const roleDistribution = allRoles.map((r) => ({
    label: r.name,
    value: allUsers.filter((u) => u.role_id === r.id).length,
  }));

  const paymentsByStatus = (["ناجحة", "قيد المعالجة", "مستردة", "فاشلة"] as const).map(
    (status) => ({
      labelAr: status,
      labelEn:
        status === "ناجحة"
          ? "Successful"
          : status === "قيد المعالجة"
            ? "Processing"
            : status === "مستردة"
              ? "Refunded"
              : "Failed",
      value: payoutRows.filter((p) => p.status === status).length,
    }),
  );

  return (
    <AppPage
      title={bi("لوحة إدارة Academia", "Academia admin dashboard")}
      icon="LayoutDashboard"
      subtitle={bi(
        "مؤشرات تشغيل المنصة والمراجعات التي تحتاج قراراً — كل رقم محسوب من بيانات حقيقية.",
        "Platform operations and reviews requiring a decision — every number is computed from real data.",
      )}
    >
      <WelcomeBanner
        subtitle={["مؤشرات تشغيل المنصة اليوم.", "Today's platform operations at a glance."]}
      />

      <StatGrid
        items={[
          { icon: "Users", label: bi("المستخدمون", "Users"), value: String(allUsers.length) },
          {
            icon: "Presentation",
            label: bi("المعلمون الموثقون", "Verified teachers"),
            value: String(verifiedTeachers),
          },
          {
            icon: "BookOpenCheck",
            label: bi("الكورسات بالمنهاج", "Courses in curriculum"),
            value: String(totalCourses),
          },
          { icon: "Flag", label: bi("بلاغات مفتوحة", "Open reports"), value: String(openReports) },
        ]}
      />

      <Panel title={bi("مهام بانتظار القرار", "Tasks awaiting a decision")} icon="ListChecks">
        {tasks.length ? (
          <DataTable
            head={[bi("المهمة", "Task"), bi("القسم", "Area"), bi("الحالة", "Status")]}
            rows={tasks.map((t) => [
              bi(...t.title),
              bi(...t.area),
              <Badge key={t.title[0]} tone={t.tone}>
                {bi("بانتظار القرار", "Pending")}
              </Badge>,
            ])}
          />
        ) : (
          <p className="py-6 text-center text-sm text-muted-foreground">
            {bi(
              "لا توجد مهام بانتظار القرار حالياً 🎉",
              "No tasks awaiting a decision right now 🎉",
            )}
          </p>
        )}
      </Panel>

      <div className="grid gap-5 lg:grid-cols-2">
        <Panel title={bi("المستخدمون حسب الدور", "Users by role")} icon="Users">
          <ComparisonChart data={roleDistribution} />
        </Panel>
        <Panel title={bi("المدفوعات حسب الحالة", "Payments by status")} icon="Wallet">
          <SplitChart
            data={paymentsByStatus.map((p) => ({
              label: bi(p.labelAr, p.labelEn),
              value: p.value,
            }))}
          />
        </Panel>
      </div>
    </AppPage>
  );
}
