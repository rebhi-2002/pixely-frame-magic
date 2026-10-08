// تفاصيل الكورس المسجَّل (WP-S6 / S6-01, S6-03, S6-04) — Student/GetCourse → StudentCourseDetail.
// مجموعات الكورس بأيامها (السبت أولًا) + قائمة دروسه (كل درس رابط لصفحة /lesson/$id).
import { Link, createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { AppPage, EmptyState, Panel } from "@/components/app/kit";
import { ErrorState, LoadingState, RetryButton } from "@/components/app/feedback-states";
import { Guard } from "@/components/app/guard";
import { ScheduleRow } from "@/components/student/my-courses/schedule-row";
import { buttonVariants } from "@/components/ui/button-variants";
import { getStudentCourse } from "@/integrations/backend/student";
import { useBi } from "@/lib/bi";
import { groupDaysSummary } from "@/lib/course-detail";
import { scheduleStatusLabel, scheduleStatusTone } from "@/lib/lesson-detail";
import { deliveryTypeLabel } from "@/lib/enums";
import { formatDate, formatTime } from "@/lib/format";
import { withLoadErrorDetail } from "@/lib/load-error";
import { qk } from "@/lib/query-keys";
import { parsePositiveInt } from "@/lib/route-id";
import { authPageHead } from "@/lib/seo";

export const Route = createFileRoute("/_authenticated/enrolled-course/$id")({
  head: () =>
    authPageHead(
      { title: "تفاصيل الكورس | أكاديميا", description: "مجموعات الكورس ومواعيده ودروسه." },
      {
        title: "Course details | Academia",
        description: "Course groups, schedule and lessons.",
      },
    ),
  component: () => (
    <Guard pageKey="student_my_courses">
      <Body />
    </Guard>
  ),
});

function Body() {
  const bi = useBi();
  const lang = bi<"ar" | "en">("ar", "en");
  const { id: rawId } = Route.useParams();
  const id = parsePositiveInt(rawId);

  const query = useQuery({
    queryKey: qk.studentCourse(id ?? 0),
    queryFn: () => getStudentCourse(id as number),
    enabled: id !== null,
  });

  const back = (
    <Link to="/my-courses" className={buttonVariants({ variant: "outline", size: "sm" })}>
      {bi("العودة لكورساتي", "Back to my courses")}
    </Link>
  );

  return (
    <AppPage
      title={query.data?.title ?? bi("تفاصيل الكورس", "Course details")}
      icon="GraduationCap"
      actions={back}
    >
      {id === null ? (
        <EmptyState
          icon="SearchX"
          title={bi("الكورس غير موجود", "Course not found")}
          description={bi("الرابط غير صحيح.", "The link is not valid.")}
        />
      ) : query.isError ? (
        <ErrorState
          title={bi("ما قدرنا نحمّل الكورس", "We couldn't load the course")}
          description={withLoadErrorDetail(
            bi(
              "جرّب مرة ثانية. إذا استمرت المشكلة، تأكد أنك مسجّل بالكورس أو ارجع لاحقاً.",
              "Try again. If the problem continues, make sure you're enrolled in this course or come back later.",
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
      ) : (
        <div className="space-y-6">
          <Panel title={bi("عن الكورس", "About the course")} icon="Info">
            {query.data.description?.trim() && (
              <p className="mb-3 whitespace-pre-line text-sm text-foreground">
                {query.data.description}
              </p>
            )}
            <dl className="grid gap-4 sm:grid-cols-3">
              <div>
                <dt className="text-xs font-semibold text-muted-foreground">
                  {bi("المعلم", "Teacher")}
                </dt>
                <dd className="mt-0.5 text-sm font-medium">{query.data.teacherName ?? "—"}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold text-muted-foreground">
                  {bi("المادة", "Subject")}
                </dt>
                <dd className="mt-0.5 text-sm font-medium">{query.data.subjectName ?? "—"}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold text-muted-foreground">
                  {bi("نوع الحصص", "Session type")}
                </dt>
                <dd className="mt-0.5 text-sm font-medium">
                  {deliveryTypeLabel(query.data.deliveryType, bi)}
                </dd>
              </div>
            </dl>
          </Panel>

          <Panel title={bi("المجموعات والمواعيد", "Groups & schedule")} icon="Users">
            {query.data.groups.length ? (
              <ul className="divide-y divide-border">
                {query.data.groups.map((g) => (
                  <li key={g.groupId} className="py-3">
                    <p className="text-sm font-semibold text-foreground">{g.name}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {groupDaysSummary(g.days, bi) || bi("لا مواعيد محددة", "No set days")}
                      {g.lessonDurationMinutes > 0 &&
                        ` — ${bi(`${g.lessonDurationMinutes} دقيقة للدرس`, `${g.lessonDurationMinutes} min per lesson`)}`}
                    </p>
                    {(g.courseStartDate || g.courseEndDate) && (
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {formatDate(g.courseStartDate, lang)} → {formatDate(g.courseEndDate, lang)}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <EmptyState
                icon="Users"
                text={bi("لا توجد مجموعات لهذا الكورس.", "This course has no groups.")}
              />
            )}
          </Panel>

          <Panel title={bi("الدروس", "Lessons")} icon="Presentation">
            {query.data.lessons.length ? (
              <ul className="divide-y divide-border">
                {query.data.lessons.map((l) => (
                  <li key={`${l.kind}-${l.id}`}>
                    <ScheduleRow
                      item={l}
                      meta={`${formatDate(l.date, lang)} ${formatTime(l.startTime)}`}
                      value={scheduleStatusLabel(l.status, bi)}
                      tone={scheduleStatusTone(l.status)}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <EmptyState
                icon="Presentation"
                text={bi("لا توجد دروس مجدولة بعد.", "No lessons scheduled yet.")}
              />
            )}
          </Panel>
        </div>
      )}
    </AppPage>
  );
}
