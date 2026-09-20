import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, UserPlus } from "lucide-react";
import { AppPage, StatGrid, Panel, RowList, Progress, EmptyState } from "@/components/app/kit";
import { Guard } from "@/components/app/guard";
import { WelcomeBanner } from "@/components/app/welcome-banner";
import { Button } from "@/components/ui/button";
import { useBi } from "@/lib/bi";
import { TrendChart } from "@/components/app/charts";
import { getChildReport } from "@/lib/supervisor-oversight.functions";
import { authPageHead } from "@/lib/seo";

const description = "تقرير أسبوعي واضح: التزام، إتقان، ومواطن الضعف — بدون أرقام مضلّلة.";

export const Route = createFileRoute("/_authenticated/parent/report")({
  head: () =>
    authPageHead(
      {
        title: "تقرير الابن | أكاديميا",
        description: "تقرير أسبوعي واضح: التزام، إتقان، ومواطن الضعف — بدون أرقام مضلّلة.",
      },
      {
        title: "Child's report | Academia",
        description:
          "A clear weekly report: commitment, mastery, and weak points — without misleading numbers.",
      },
    ),
  component: PageRoute,
});

function PageRoute() {
  return (
    <Guard pageKey="parent_report">
      <Body />
    </Guard>
  );
}

function Body() {
  const bi = useBi();
  const fetchReport = useServerFn(getChildReport);
  const { data: report, isLoading } = useQuery({
    queryKey: ["child-report"],
    queryFn: () => fetchReport(),
  });

  if (isLoading) {
    return (
      <AppPage title={bi("تقرير الابن", "Child report")} icon="FileBarChart">
        <div className="flex justify-center py-16">
          <Loader2 className="size-6 animate-spin text-primary" />
        </div>
      </AppPage>
    );
  }

  if (!report) {
    return (
      <AppPage
        title={bi("تقرير الابن", "Child report")}
        icon="FileBarChart"
        subtitle={bi(
          "ما في ابن مرتبط بحسابك بعد — اربط أول ابن حتى يظهر تقريره هون.",
          "No child is linked to your account yet — link your first child to see their report here.",
        )}
      >
        <EmptyState
          icon="UserPlus"
          title={bi("لسا ما في تقرير لعرضه", "No report to show yet")}
          description={bi(
            "اربط حساب ابنك أو بنتك من الإعدادات، وبيظهر التقرير الأسبوعي هون تلقائيًا.",
            "Link your child's account from Settings, and their weekly report will appear here automatically.",
          )}
          action={
            <Button asChild size="sm">
              <Link to="/parent/settings">
                <UserPlus className="size-4" />
                {bi("اربط ابن الآن", "Link a child now")}
              </Link>
            </Button>
          }
        />
      </AppPage>
    );
  }

  const avgExamScore = report.examAttempts.length
    ? Math.round(
        report.examAttempts.reduce((s, a) => s + a.scorePercent, 0) / report.examAttempts.length,
      )
    : 0;

  return (
    <AppPage
      title={bi("تقرير الابن", "Child report")}
      icon="FileBarChart"
      subtitle={bi(
        description,
        "A clear weekly report: consistency, mastery and weak spots — no vanity metrics.",
      )}
    >
      <WelcomeBanner
        subtitle={[
          "تابع التزام ابنك وإتقانه أسبوعيًا، بدون أرقام مضلّلة — بس الصورة الواقعية.",
          "Follow your child's consistency and mastery weekly — no vanity metrics, just the real picture.",
        ]}
        tip={["تقرير هالأسبوع جاهز", "This week's report is ready"]}
      />
      <StatGrid
        items={[
          { icon: "User", label: bi("الابن المتابَع", "Child"), value: report.childName },
          {
            icon: "Flame",
            label: bi("أيام دراسة", "Study days"),
            value: `${report.studyDaysCount}/7`,
          },
          {
            icon: "Percent",
            label: bi("متوسط الإتقان", "Avg. mastery"),
            value: `${report.avgMastery}%`,
          },
          {
            icon: "AlertTriangle",
            label: bi("مواد تحتاج دعم", "Needs support"),
            value: String(report.weakSubjectsCount),
          },
        ]}
      />
      <Panel title={bi("دقائق الدراسة هذا الأسبوع", "Study minutes this week")} icon="ChartSpline">
        <TrendChart
          data={report.weeklyLog.map((d) => ({ label: bi(...d.day), value: d.minutes }))}
        />
      </Panel>
      <Panel title={bi("إتقان المواد", "Subject mastery")} icon="LineChart">
        {report.subjects.length ? (
          report.subjects.map((s) => (
            <Progress key={s.id} label={s.subjectName} value={s.progressPercent} />
          ))
        ) : (
          <EmptyState
            icon="LineChart"
            text={bi("لا مواد مسجّلة بعد.", "No subjects logged yet.")}
          />
        )}
      </Panel>
      <Panel title={bi("ملخّص الأسبوع", "Week summary")} icon="Activity">
        <RowList
          rows={[
            {
              title: bi("دقائق الدراسة", "Study minutes"),
              meta: bi(
                `${report.totalMinutes} دقيقة هذا الأسبوع`,
                `${report.totalMinutes} minutes this week`,
              ),
              value: `${report.studyDaysCount}/7`,
              tone: "success",
            },
            {
              title: bi("امتحانات تدريبية", "Mock exams"),
              meta: bi(
                `${report.examAttempts.length} امتحانات`,
                `${report.examAttempts.length} exams`,
              ),
              value: `${avgExamScore}%`,
              tone: "primary",
            },
            ...report.priorityMistakes.map((m) => ({
              title: bi(`${m.subjectName} تحتاج متابعة`, `${m.subjectName} needs attention`),
              meta: m.questionTitle,
              value: bi("تنبيه", "Alert"),
              tone: "danger" as const,
            })),
          ]}
        />
      </Panel>
    </AppPage>
  );
}
