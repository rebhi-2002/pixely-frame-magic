// نتائج الامتحانات (WP-S8 / S8-01..03) — Student/ExamResults → StudentExamResultRow[].
// النسبة: percentage من الباك اند أو الدرجة/المجموع (lib/exam-percent) — لا أرقام مخترعة.
import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { AppPage, Badge, DataTable, EmptyState, Panel } from "@/components/app/kit";
import { ErrorState, LoadingState, RetryButton } from "@/components/app/feedback-states";
import { Guard } from "@/components/app/guard";
import { Label } from "@/components/ui/label";
import {
  getStudentDashboard,
  getStudentExamResults,
  type StudentExamResultRow,
} from "@/integrations/backend/student";
import { useBi } from "@/lib/bi";
import { formatExamPercent } from "@/lib/exam-percent";
import {
  percentTone,
  resolveExamPercent,
  scoreText,
  sortExamsNewestFirst,
} from "@/lib/exam-results";
import { formatDate } from "@/lib/format";
import { withLoadErrorDetail } from "@/lib/load-error";
import { qk } from "@/lib/query-keys";
import { authPageHead } from "@/lib/seo";

const description = "درجاتك في الامتحانات مع ملاحظات المعلم.";

export const Route = createFileRoute("/_authenticated/exam-results")({
  head: () =>
    authPageHead(
      { title: "نتائج الامتحانات | أكاديميا", description },
      {
        title: "Exam results | Academia",
        description: "Your exam scores with your teacher's feedback.",
      },
    ),
  component: () => (
    <Guard pageKey="student_exam_results">
      <Body />
    </Guard>
  ),
});

const SELECT_CLASS =
  "h-10 w-full rounded-md border border-input bg-transparent px-3 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring sm:max-w-xs";

function Body() {
  const bi = useBi();
  const lang = bi<"ar" | "en">("ar", "en");
  const [courseId, setCourseId] = useState("");
  const courseIdNum = courseId ? Number(courseId) : undefined;

  const dashboard = useQuery({ queryKey: qk.studentDashboard(), queryFn: getStudentDashboard });
  const uniqueCourses = Array.from(
    new Map(
      (dashboard.data?.activeCourses ?? [])
        .filter((c) => c.courseId !== null)
        .map((c) => [c.courseId as number, c.courseTitle ?? `#${c.courseId}`]),
    ),
  );

  const query = useQuery({
    queryKey: qk.studentExamResults(courseIdNum),
    queryFn: () => getStudentExamResults(courseIdNum),
    placeholderData: (previous: StudentExamResultRow[] | undefined) => previous,
  });

  return (
    <AppPage
      title={bi("نتائج الامتحانات", "Exam results")}
      icon="ClipboardCheck"
      subtitle={bi(description, "Your exam scores with your teacher's feedback.")}
    >
      {uniqueCourses.length > 0 && (
        <Panel title={bi("تصفية النتائج", "Filter results")} icon="Filter">
          <div className="space-y-1.5">
            <Label htmlFor="exam-course">{bi("الكورس", "Course")}</Label>
            <select
              id="exam-course"
              className={SELECT_CLASS}
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
            >
              <option value="">{bi("كل الكورسات", "All courses")}</option>
              {uniqueCourses.map(([id, title]) => (
                <option key={id} value={String(id)}>
                  {title}
                </option>
              ))}
            </select>
          </div>
        </Panel>
      )}

      {query.isError ? (
        <ErrorState
          title={bi("ما قدرنا نحمّل نتائج الامتحانات", "We couldn't load your exam results")}
          description={withLoadErrorDetail(
            bi(
              "جرّب مرة ثانية. إذا استمرت المشكلة، تأكد من اتصالك أو ارجع لاحقاً.",
              "Try again. If the problem continues, check your connection or come back later.",
            ),
            query.error,
            bi,
          )}
          action={
            <RetryButton
              label={bi("إعادة المحاولة", "Try again")}
              onClick={() => void query.refetch()}
            />
          }
        />
      ) : !query.data ? (
        <LoadingState label={bi("جارٍ التحميل…", "Loading…")} />
      ) : query.data.length === 0 ? (
        <EmptyState
          icon="ClipboardCheck"
          title={
            courseId
              ? bi("لا توجد نتائج لهذا الكورس", "No results for this course")
              : bi("لا توجد نتائج امتحانات بعد", "No exam results yet")
          }
          description={bi(
            "ستظهر درجاتك هنا بعد أن يرصدها المعلم.",
            "Your scores will appear here once your teacher records them.",
          )}
        />
      ) : (
        <Panel title={bi("الامتحانات", "Exams")} icon="FileText">
          <DataTable
            caption={bi("نتائج الامتحانات", "Exam results")}
            head={[
              bi("الامتحان", "Exam"),
              bi("الكورس", "Course"),
              bi("التاريخ", "Date"),
              bi("الدرجة", "Score"),
              bi("النسبة", "Percent"),
              bi("ملاحظات المعلم", "Teacher feedback"),
            ]}
            rows={sortExamsNewestFirst(query.data).map((r) => {
              const percent = resolveExamPercent(r);
              return [
                r.examTitle,
                r.courseTitle ?? "—",
                formatDate(r.examDate, lang),
                scoreText(r),
                <Badge key={`p-${r.examId}`} tone={percentTone(percent)}>
                  {formatExamPercent(percent)}
                </Badge>,
                r.feedback?.trim() || "—",
              ];
            })}
          />
        </Panel>
      )}
    </AppPage>
  );
}
