import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AppPage, StatGrid, Panel, DataTable, EmptyState } from "@/components/app/kit";
import { Guard } from "@/components/app/guard";
import { WelcomeBanner } from "@/components/app/welcome-banner";
import { useBi } from "@/lib/bi";
import {
  getMyChildren,
  getChildAttendance,
  getChildExamResults,
} from "@/integrations/backend/parent";
import { authPageHead } from "@/lib/seo";
import { ErrorState, LoadingState, RetryButton } from "@/components/app/feedback-states";

const description = "الحضور ونتائج الامتحانات لأبنائك، مباشرة من سجلات المنصة.";

export const Route = createFileRoute("/_authenticated/parent/report")({
  head: () =>
    authPageHead(
      { title: "تقرير الابن | أكاديميا", description },
      {
        title: "Child's report | Academia",
        description: "Your children's attendance and exam results, straight from platform records.",
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
  const queryClient = useQueryClient();
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const childrenQuery = useQuery({
    queryKey: ["parent-children"],
    queryFn: getMyChildren,
  });
  const children = childrenQuery.data ?? [];
  const activeChild = useMemo(
    () => children.find((c) => c.studentId === selectedId) ?? children[0] ?? null,
    [children, selectedId],
  );

  const attendanceQuery = useQuery({
    queryKey: ["parent-child-attendance", activeChild?.studentId],
    queryFn: () => getChildAttendance(activeChild!.studentId),
    enabled: !!activeChild,
  });
  const examsQuery = useQuery({
    queryKey: ["parent-child-exams", activeChild?.studentId],
    queryFn: () => getChildExamResults(activeChild!.studentId),
    enabled: !!activeChild,
  });

  if (childrenQuery.isError) {
    return (
      <AppPage title={bi("تقرير الابن", "Child report")} icon="FileBarChart">
        <ErrorState
          title={bi("ما قدرنا نحمّل التقرير", "Couldn't load the report")}
          description={bi(
            "جرّب التحديث مرة ثانية. إذا استمرت المشكلة، تأكد من اتصالك أو ارجع لاحقاً.",
            "Try again. If the problem continues, check your connection or come back later.",
          )}
          action={
            <RetryButton
              label={bi("إعادة المحاولة", "Try again")}
              onClick={() => void queryClient.invalidateQueries()}
            />
          }
        />
      </AppPage>
    );
  }

  if (childrenQuery.isLoading) {
    return (
      <AppPage title={bi("تقرير الابن", "Child report")} icon="FileBarChart">
        <LoadingState
          label={bi("جارٍ التحميل…", "Loading…")}
          className="border-none bg-transparent"
        />
      </AppPage>
    );
  }

  if (!children.length) {
    return (
      <AppPage
        title={bi("تقرير الابن", "Child report")}
        icon="FileBarChart"
        subtitle={bi(
          "ما في ابن مرتبط بحسابك بعد بالباك اند.",
          "No child is linked to your account on the backend yet.",
        )}
      >
        <EmptyState
          icon="UserPlus"
          title={bi("لسا ما في تقرير لعرضه", "No report to show yet")}
          description={bi(
            "ربط حساب الأبناء بولي الأمر ميزة لسا ما بنيت بالباك اند — لما تتوفر رح يظهر التقرير هون تلقائياً.",
            "Linking a child's account to a parent isn't built on the backend yet — once it is, the report will appear here automatically.",
          )}
        />
      </AppPage>
    );
  }

  return (
    <AppPage
      title={bi("تقرير الابن", "Child report")}
      icon="FileBarChart"
      subtitle={bi(
        description,
        "Your children's attendance and exam results, straight from platform records.",
      )}
    >
      <WelcomeBanner
        subtitle={["نظرة سريعة على أداء أبنائك.", "A quick look at your children's progress."]}
      />

      {children.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {children.map((c) => (
            <button
              key={c.studentId}
              onClick={() => setSelectedId(c.studentId)}
              className={`rounded-full border px-3 py-1 text-sm ${
                activeChild?.studentId === c.studentId
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground"
              }`}
            >
              {c.studentName}
            </button>
          ))}
        </div>
      )}

      {activeChild && (
        <StatGrid
          items={[
            { icon: "User", label: bi("الابن المتابَع", "Child"), value: activeChild.studentName },
            {
              icon: "GraduationCap",
              label: bi("الصف", "Grade"),
              value: activeChild.gradeName ?? bi("غير محدد", "Not set"),
            },
            {
              icon: "CalendarCheck",
              label: bi("نسبة الحضور", "Attendance rate"),
              value: `${Math.round(activeChild.attendanceRatePercent)}%`,
            },
            {
              icon: "Percent",
              label: bi("متوسط الامتحانات", "Avg. exam score"),
              value:
                activeChild.averageExamScorePercent == null
                  ? "—"
                  : `${Math.round(activeChild.averageExamScorePercent)}%`,
            },
          ]}
        />
      )}

      <Panel title={bi("سجل الحضور", "Attendance record")} icon="CalendarCheck">
        {attendanceQuery.isLoading ? (
          <LoadingState
            label={bi("جارٍ التحميل…", "Loading…")}
            className="border-none bg-transparent"
          />
        ) : attendanceQuery.data?.length ? (
          <DataTable
            head={[bi("التاريخ", "Date"), bi("المجموعة", "Group"), bi("ملاحظات", "Notes")]}
            rows={attendanceQuery.data.map((r) => [
              new Date(r.sessionDate).toLocaleDateString(),
              r.groupName,
              r.notes ?? "—",
            ])}
          />
        ) : (
          <EmptyState
            icon="CalendarCheck"
            text={bi("لا يوجد سجل حضور بعد.", "No attendance records yet.")}
          />
        )}
      </Panel>

      <Panel title={bi("نتائج الامتحانات", "Exam results")} icon="FileBarChart">
        {examsQuery.isLoading ? (
          <LoadingState
            label={bi("جارٍ التحميل…", "Loading…")}
            className="border-none bg-transparent"
          />
        ) : examsQuery.data?.length ? (
          <DataTable
            head={[
              bi("الامتحان", "Exam"),
              bi("التاريخ", "Date"),
              bi("النتيجة", "Score"),
              bi("ملاحظات", "Feedback"),
            ]}
            rows={examsQuery.data.map((r) => [
              r.examTitle,
              new Date(r.examDate).toLocaleDateString(),
              `${r.scoreObtained}/${r.totalMarks}`,
              r.feedback ?? "—",
            ])}
          />
        ) : (
          <EmptyState
            icon="FileBarChart"
            text={bi("لا توجد نتائج امتحانات بعد.", "No exam results yet.")}
          />
        )}
      </Panel>
    </AppPage>
  );
}
