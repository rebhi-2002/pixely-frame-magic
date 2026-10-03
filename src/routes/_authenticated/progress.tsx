// صفحة التقدم الأكاديمي (WP-S9) — Student/Progress. الأرقام من الباك اند فقط: النسبة الناقصة
// تُعرض «غير متاح» لا صفرًا (راجع lib/progress.ts). النوع StudentProgressDto مأخوذ من الكود
// ويُتحقق منه عند وصول عينة JSON (J-04).
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { AppPage, EmptyState, Panel, Progress, StatGrid } from "@/components/app/kit";
import { ErrorState, LoadingState, RetryButton } from "@/components/app/feedback-states";
import { Guard } from "@/components/app/guard";
import { getStudentProgress } from "@/integrations/backend/student";
import { useBi } from "@/lib/bi";
import { buildProgressView, percentText } from "@/lib/progress";
import { qk } from "@/lib/query-keys";
import { authPageHead } from "@/lib/seo";

const description = "متابعة نسبة حضورك ومعدّل نتائجك في الامتحانات.";

export const Route = createFileRoute("/_authenticated/progress")({
  head: () =>
    authPageHead(
      { title: "التقدم الأكاديمي | أكاديميا", description },
      {
        title: "Academic progress | Academia",
        description: "Follow your attendance rate and your average exam results.",
      },
    ),
  component: () => (
    <Guard pageKey="student_progress">
      <Body />
    </Guard>
  ),
});

function Body() {
  const bi = useBi();
  const query = useQuery({ queryKey: qk.studentProgress(), queryFn: getStudentProgress });
  const view = query.data ? buildProgressView(query.data) : null;

  return (
    <AppPage
      title={bi("التقدم الأكاديمي", "Academic progress")}
      icon="TrendingUp"
      subtitle={bi(description, "Follow your attendance rate and your average exam results.")}
    >
      {query.isError ? (
        <ErrorState
          title={bi("ما قدرنا نحمّل تقدمك", "We couldn't load your progress")}
          description={bi(
            "جرّب مرة ثانية. إذا استمرت المشكلة، تأكد من اتصالك أو ارجع لاحقاً.",
            "Try again. If the problem continues, check your connection or come back later.",
          )}
          action={
            <RetryButton
              label={bi("إعادة المحاولة", "Try again")}
              onClick={() => void query.refetch()}
            />
          }
        />
      ) : query.isLoading || !view ? (
        <LoadingState label={bi("جارٍ التحميل…", "Loading…")} />
      ) : view.isEmpty ? (
        <EmptyState
          icon="TrendingUp"
          title={bi("لا توجد بيانات تقدم بعد", "No progress data yet")}
          description={bi(
            "ستظهر نسبة الحضور ومعدّل الامتحانات هنا بعد تسجيل أول جلسة أو امتحان.",
            "Your attendance rate and exam average will appear here after your first session or exam.",
          )}
        />
      ) : (
        <div className="space-y-6">
          <StatGrid
            items={[
              {
                icon: "CalendarCheck",
                label: bi("نسبة الحضور", "Attendance rate"),
                value: percentText(view.attendance),
              },
              {
                icon: "ClipboardCheck",
                label: bi("معدّل الامتحانات", "Exam average"),
                value: percentText(view.exams),
              },
              {
                icon: "Users",
                label: bi("جلسات الحضور المسجّلة", "Recorded attendance sessions"),
                value: String(view.attendance.samples),
              },
              {
                icon: "FileText",
                label: bi("امتحانات مُنجَزة", "Exams taken"),
                value: String(view.exams.samples),
              },
            ]}
          />
          <Panel title={bi("نظرة عامة", "Overview")} icon="BarChart3">
            {view.attendance.percent !== null ? (
              <Progress
                label={bi("نسبة الحضور", "Attendance rate")}
                value={view.attendance.percent}
              />
            ) : (
              <UnavailableRow label={bi("نسبة الحضور", "Attendance rate")} />
            )}
            {view.exams.percent !== null ? (
              <Progress label={bi("معدّل الامتحانات", "Exam average")} value={view.exams.percent} />
            ) : (
              <UnavailableRow label={bi("معدّل الامتحانات", "Exam average")} />
            )}
            <p className="mt-3 text-xs text-muted-foreground">
              {bi(
                "النسب محسوبة من سجلات الحضور والامتحانات لدى المنصّة. «غير متاح» تعني أنه لا توجد بيانات كافية بعد.",
                "Percentages are calculated from the platform's attendance and exam records. «Unavailable» means there isn't enough data yet.",
              )}
            </p>
          </Panel>
        </div>
      )}
    </AppPage>
  );
}

function UnavailableRow({ label }: { label: string }) {
  const bi = useBi();
  return (
    <div className="flex items-center justify-between py-2 text-xs">
      <span className="font-semibold text-foreground">{label}</span>
      <span className="text-muted-foreground">{bi("غير متاح", "Unavailable")}</span>
    </div>
  );
}
