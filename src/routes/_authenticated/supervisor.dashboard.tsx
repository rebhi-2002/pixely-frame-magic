import { useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { AppPage, StatGrid, Panel, RowList, QuickLinks, EmptyState } from "@/components/app/kit";
import { Guard } from "@/components/app/guard";
import { WelcomeBanner } from "@/components/app/welcome-banner";
import { useBi } from "@/lib/bi";
import { ComparisonChart } from "@/components/app/charts";
import {
  listStudentRisk,
  listSupervisionReports,
  listTeacherPerformance,
} from "@/lib/supervisor-oversight.functions";
import { listContentItems } from "@/lib/teacher-teaching.functions";
import { authPageHead } from "@/lib/seo";
import { LoadingState } from "@/components/app/feedback-states";

const description = "جودة التعليم عبر المعلمين والصفوف: تنبيهات، متابعات، ومؤشرات إتقان.";

export const Route = createFileRoute("/_authenticated/supervisor/dashboard")({
  head: () =>
    authPageHead(
      {
        title: "لوحة الإشراف | أكاديميا",
        description: "جودة التعليم عبر المعلمين والصفوف: تنبيهات، متابعات، ومؤشرات إتقان.",
      },
      {
        title: "Supervision dashboard | Academia",
        description:
          "Teaching quality across teachers and classes: alerts, follow-ups, and mastery indicators.",
      },
    ),
  component: PageRoute,
});

function PageRoute() {
  return (
    <Guard pageKey="supervisor_dashboard">
      <Body />
    </Guard>
  );
}

function Body() {
  const bi = useBi();
  const fetchTeachers = useServerFn(listTeacherPerformance);
  const fetchStudents = useServerFn(listStudentRisk);
  const fetchContent = useServerFn(listContentItems);
  const fetchReports = useServerFn(listSupervisionReports);

  const teachersQuery = useQuery({
    queryKey: ["teacher-performance"],
    queryFn: () => fetchTeachers(),
  });
  const studentsQuery = useQuery({ queryKey: ["student-risk"], queryFn: () => fetchStudents() });
  const contentQuery = useQuery({ queryKey: ["teacher-content"], queryFn: () => fetchContent() });
  const reportsQuery = useQuery({
    queryKey: ["supervision-reports"],
    queryFn: () => fetchReports(),
  });

  const isLoading =
    teachersQuery.isLoading ||
    studentsQuery.isLoading ||
    contentQuery.isLoading ||
    reportsQuery.isLoading;
  const teachers = useMemo(() => teachersQuery.data ?? [], [teachersQuery.data]);
  const students = useMemo(() => studentsQuery.data ?? [], [studentsQuery.data]);
  const content = useMemo(() => contentQuery.data ?? [], [contentQuery.data]);
  const totalStudents = teachers.reduce((s, t) => s + t.studentsCount, 0);
  const delayedTeachers = teachers.filter((t) => t.status === "تأخر تصحيح");
  const atRiskStudents = students.filter((s) => s.status === "متعثّر");
  const pendingContent = content.filter((c) => c.status === "قيد المراجعة");
  const qualityAlerts = delayedTeachers.length + atRiskStudents.length;
  const avgMastery = students.length
    ? Math.round(100 - students.reduce((s, r) => s + r.weakestPercent, 0) / students.length)
    : 0;

  const byGrade = useMemo(() => {
    const totals = new Map<string, { sum: number; count: number }>();
    for (const s of students) {
      const cur = totals.get(s.gradeLabel) ?? { sum: 0, count: 0 };
      cur.sum += s.weakestPercent;
      cur.count += 1;
      totals.set(s.gradeLabel, cur);
    }
    return Array.from(totals.entries()).map(([label, v]) => ({
      label,
      value: Math.round(v.sum / v.count),
    }));
  }, [students]);

  const alerts: {
    title: [string, string];
    meta: [string, string];
    tone: "danger" | "primary" | "muted";
  }[] = [];
  for (const t of delayedTeachers) {
    alerts.push({
      title: [`تأخّر تصحيح لدى ${t.teacherName}`, `Grading delay — ${t.teacherName}`],
      meta: [`${t.gradingDays} يوم`, `${t.gradingDays} days`],
      tone: "danger",
    });
  }
  for (const s of atRiskStudents) {
    alerts.push({
      title: [
        `إتقان منخفض — ${s.weakestSubject} (${s.studentName})`,
        `Low mastery — ${s.weakestSubject} (${s.studentName})`,
      ],
      meta: [`${s.weakestPercent}%`, `${s.weakestPercent}%`],
      tone: "primary",
    });
  }
  if (pendingContent.length) {
    alerts.push({
      title: [`محتوى بانتظار المراجعة`, `Content pending review`],
      meta: [`${pendingContent.length} عناصر`, `${pendingContent.length} items`],
      tone: "muted",
    });
  }

  return (
    <AppPage
      title={bi("لوحة الإشراف", "Supervision dashboard")}
      icon="LayoutDashboard"
      subtitle={bi(
        description,
        "Teaching quality across teachers and classes: alerts, follow-ups and mastery signals.",
      )}
    >
      <WelcomeBanner
        subtitle={[
          "نظرة شاملة على جودة التعليم عبر كل المعلمين والصفوف اليوم.",
          "A full overview of teaching quality across every teacher and class today.",
        ]}
        tip={[
          `${qualityAlerts} تنبيه يحتاج متابعتك`,
          `${qualityAlerts} alerts need your attention`,
        ]}
      />

      {isLoading ? (
        <LoadingState
          label={bi("جارٍ التحميل…", "Loading…")}
          className="border-none bg-transparent"
        />
      ) : (
        <>
          <StatGrid
            items={[
              {
                icon: "Presentation",
                label: bi("معلمون", "Teachers"),
                value: String(teachers.length),
              },
              { icon: "Users", label: bi("طلاب", "Students"), value: String(totalStudents) },
              {
                icon: "AlertTriangle",
                label: bi("تنبيهات جودة", "Quality alerts"),
                value: String(qualityAlerts),
              },
              {
                icon: "Percent",
                label: bi("متوسط الإتقان", "Avg. mastery"),
                value: students.length ? `${avgMastery}%` : "—",
              },
            ]}
          />

          <Panel title={bi("متوسط الإتقان بالصفوف", "Average mastery by grade")} icon="ChartSpline">
            {byGrade.length ? (
              <ComparisonChart
                data={byGrade.map((g) => ({
                  label: bi(`صف ${g.label}`, `Grade ${g.label}`),
                  value: g.value,
                }))}
              />
            ) : (
              <EmptyState
                icon="ChartSpline"
                text={bi("لا بيانات كافية بعد.", "Not enough data yet.")}
              />
            )}
          </Panel>

          <Panel title={bi("إجراءات", "Actions")} icon="Zap">
            <QuickLinks
              items={[
                {
                  to: "/supervisor/teachers",
                  label: bi("المعلمون", "Teachers"),
                  icon: "Presentation",
                },
                {
                  to: "/supervisor/students-overview",
                  label: bi("نظرة الطلاب", "Students overview"),
                  icon: "Users",
                },
                {
                  to: "/supervisor/reports",
                  label: bi("التقارير", "Reports"),
                  icon: "FileBarChart",
                },
              ]}
            />
          </Panel>

          <Panel title={bi("تنبيهات تحتاج متابعة", "Alerts to follow up")} icon="AlertTriangle">
            {alerts.length ? (
              <RowList
                rows={alerts.map((a) => ({
                  title: bi(...a.title),
                  meta: bi(...a.meta),
                  tone: a.tone,
                }))}
              />
            ) : (
              <EmptyState
                icon="AlertTriangle"
                text={bi("ولا تنبيه حالياً 🎉", "No alerts right now 🎉")}
              />
            )}
          </Panel>
        </>
      )}
    </AppPage>
  );
}
