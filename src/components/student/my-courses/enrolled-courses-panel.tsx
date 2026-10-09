// لوحة «كورساتي المسجّلة» (العقد C-08) — props {} وتجلب بياناتها بنفسها. WP-S6 / S6-02.
// المصدر: activeCourses من Student/Dashboard (نوع معروف بالكود). كل كورس رابط لصفحة التفاصيل /enrolled-course/$id
// (يُنفَّذ بـS6-01 بعد وصول عينة GetCourse). كورس بلا courseId ما يُربَط (لا نخمّن رقمًا).
import { Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Badge, EmptyState, Panel } from "@/components/app/kit";
import { ErrorState, LoadingState, RetryButton } from "@/components/app/feedback-states";
import { getStudentDashboard } from "@/integrations/backend/student";
import { useBi } from "@/lib/bi";
import { withLoadErrorDetail } from "@/lib/load-error";
import { deliveryTypeLabel } from "@/lib/enums";
import { qk } from "@/lib/query-keys";

export function EnrolledCoursesPanel() {
  const bi = useBi();
  const queryClient = useQueryClient();
  const dashboard = useQuery({ queryKey: qk.studentDashboard(), queryFn: getStudentDashboard });
  const courses = dashboard.data?.activeCourses ?? [];

  return (
    <Panel title={bi("كورساتي المسجّلة", "My enrolled courses")} icon="GraduationCap">
      {dashboard.isError ? (
        <ErrorState
          title={bi("تعذّر تحميل كورساتك", "We couldn't load your courses")}
          description={withLoadErrorDetail(
            bi(
              "جرّب التحديث مرة ثانية. إذا استمرت المشكلة، تأكد من اتصالك أو ارجع لاحقاً.",
              "Try again. If the problem continues, check your connection or come back later.",
            ),
            dashboard.error,
            bi,
          )}
          action={
            <RetryButton
              label={bi("إعادة المحاولة", "Try again")}
              onClick={() =>
                void queryClient.invalidateQueries({ queryKey: qk.studentDashboard() })
              }
            />
          }
        />
      ) : dashboard.isLoading ? (
        <LoadingState
          label={bi("جارٍ التحميل…", "Loading…")}
          className="border-none bg-transparent"
        />
      ) : courses.length > 0 ? (
        <ul className="divide-y divide-border">
          {courses.map((course) => {
            const body = (
              <div className="flex items-center justify-between gap-3 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-foreground">
                    {course.courseTitle ?? "—"}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    {[course.groupName, course.teacherName].filter(Boolean).join(" — ")}
                  </p>
                </div>
                <Badge tone="primary">{deliveryTypeLabel(course.deliveryType, bi)}</Badge>
              </div>
            );
            return (
              <li key={course.enrollmentId}>
                {course.courseId != null ? (
                  <Link
                    to="/enrolled-course/$id"
                    params={{ id: String(course.courseId) }}
                    className="block rounded-xl px-2 transition-colors hover:bg-accent/40"
                  >
                    {body}
                  </Link>
                ) : (
                  <div className="px-2">{body}</div>
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <EmptyState
          icon="GraduationCap"
          text={
            dashboard.data?.hasStudentProfile === false
              ? bi(
                  "حسابك غير مربوط بملف طالب بعد، لذلك لا تظهر كورسات مسجّلة.",
                  "Your account isn't linked to a student profile yet, so no enrolled courses are shown.",
                )
              : bi("لست مسجّلاً في أي كورس بعد.", "You're not enrolled in any course yet.")
          }
        />
      )}
    </Panel>
  );
}
