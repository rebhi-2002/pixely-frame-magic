// تفاصيل الدرس (WP-S5 / S5-01..03) — Student/GetLesson → StudentLessonDetail (الدرس متداخل بحقل lesson).
// حضوري: القاعة أو «الموقع غير متوفر». أونلاين: المنصة + زر انضمام آمن (http/https وcanJoin من الباك اند).
import type { ReactNode } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { AppPage, Badge, EmptyState, Panel } from "@/components/app/kit";
import { ErrorState, LoadingState, RetryButton } from "@/components/app/feedback-states";
import { Guard } from "@/components/app/guard";
import { buttonVariants } from "@/components/ui/button-variants";
import { getStudentLesson } from "@/integrations/backend/student";
import { useBi } from "@/lib/bi";
import { dayOfWeekLabel, deliveryTypeLabel } from "@/lib/enums";
import { formatDate, formatTime } from "@/lib/format";
import {
  isLessonCancelled,
  isOnlineLesson,
  lessonJoinHref,
  lessonLocationText,
  meetingInstructionsText,
  scheduleStatusLabel,
  scheduleStatusTone,
} from "@/lib/lesson-detail";
import { withLoadErrorDetail } from "@/lib/load-error";
import { qk } from "@/lib/query-keys";
import { parsePositiveInt } from "@/lib/route-id";
import { authPageHead } from "@/lib/seo";

export const Route = createFileRoute("/_authenticated/lesson/$id")({
  head: () =>
    authPageHead(
      { title: "تفاصيل الدرس | أكاديميا", description: "موعد الدرس ومكانه ورابط الانضمام." },
      {
        title: "Lesson details | Academia",
        description: "Lesson time, location and join link.",
      },
    ),
  component: () => (
    <Guard pageKey="student_schedule">
      <Body />
    </Guard>
  ),
});

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <dt className="text-xs font-semibold text-muted-foreground">{label}</dt>
      <dd className="mt-0.5 text-sm font-medium text-foreground">{children}</dd>
    </div>
  );
}

function Body() {
  const bi = useBi();
  const lang = bi<"ar" | "en">("ar", "en");
  const { id: rawId } = Route.useParams();
  const id = parsePositiveInt(rawId);

  const query = useQuery({
    queryKey: qk.studentLesson(id ?? 0),
    queryFn: () => getStudentLesson(id as number),
    enabled: id !== null,
  });

  const back = (
    <Link to="/schedule" className={buttonVariants({ variant: "outline", size: "sm" })}>
      {bi("العودة للجدول", "Back to schedule")}
    </Link>
  );

  return (
    <AppPage title={bi("تفاصيل الدرس", "Lesson details")} icon="Presentation" actions={back}>
      {id === null ? (
        <EmptyState
          icon="SearchX"
          title={bi("الدرس غير موجود", "Lesson not found")}
          description={bi("الرابط غير صحيح.", "The link is not valid.")}
        />
      ) : query.isError ? (
        <ErrorState
          title={bi("ما قدرنا نحمّل الدرس", "We couldn't load the lesson")}
          description={withLoadErrorDetail(
            bi(
              "جرّب مرة ثانية. إذا استمرت المشكلة، تأكد أن الدرس يخصّك أو ارجع لاحقاً.",
              "Try again. If the problem continues, make sure the lesson is yours or come back later.",
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
        (() => {
          const detail = query.data;
          const { lesson } = detail;
          const cancelled = isLessonCancelled(detail);
          const href = lessonJoinHref(detail);
          const instructions = meetingInstructionsText(detail);
          return (
            <div className="space-y-6">
              {cancelled && (
                <div
                  role="alert"
                  className="rounded-2xl border border-destructive/30 bg-destructive/5 p-4 text-sm"
                >
                  <p className="font-bold text-destructive">
                    {bi("هذا الدرس ملغى", "This lesson was cancelled")}
                  </p>
                  <p className="mt-1 text-foreground">
                    {detail.cancellationReason?.trim() || bi("لم يُذكر سبب.", "No reason given.")}
                  </p>
                </div>
              )}
              <Panel
                title={lesson.topic}
                icon="Presentation"
                action={
                  <Badge tone={scheduleStatusTone(lesson.status)}>
                    {scheduleStatusLabel(lesson.status, bi)}
                  </Badge>
                }
              >
                <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <Field label={bi("الكورس", "Course")}>{lesson.courseTitle ?? "—"}</Field>
                  <Field label={bi("المعلم", "Teacher")}>{lesson.teacherName ?? "—"}</Field>
                  <Field label={bi("المجموعة", "Group")}>{detail.groupName ?? "—"}</Field>
                  <Field label={bi("اليوم", "Day")}>{dayOfWeekLabel(lesson.day, bi)}</Field>
                  <Field label={bi("التاريخ", "Date")}>{formatDate(lesson.date, lang)}</Field>
                  <Field label={bi("الوقت", "Time")}>{formatTime(lesson.startTime)}</Field>
                  <Field label={bi("المدة", "Duration")}>
                    {lesson.durationMinutes > 0
                      ? bi(`${lesson.durationMinutes} دقيقة`, `${lesson.durationMinutes} min`)
                      : "—"}
                  </Field>
                  <Field label={bi("نوع الحصة", "Session type")}>
                    {deliveryTypeLabel(lesson.mode, bi)}
                  </Field>
                  <Field
                    label={isOnlineLesson(detail) ? bi("المنصة", "Platform") : bi("القاعة", "Room")}
                  >
                    {lessonLocationText(detail, bi)}
                  </Field>
                </dl>
              </Panel>

              {isOnlineLesson(detail) && !cancelled && (
                <Panel title={bi("الانضمام للدرس", "Join the lesson")} icon="Video">
                  {instructions && (
                    <p className="mb-3 whitespace-pre-line text-sm text-foreground">
                      {instructions}
                    </p>
                  )}
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={buttonVariants({ size: "sm" })}
                    >
                      {bi("انضمام الآن", "Join now")}
                    </a>
                  ) : (
                    <p role="status" className="text-sm text-muted-foreground">
                      {bi(
                        "رابط الانضمام غير متاح حالياً. يظهر قبل موعد الدرس عندما يفعّله المعلم.",
                        "The join link isn't available yet. It appears before the lesson once your teacher enables it.",
                      )}
                    </p>
                  )}
                </Panel>
              )}
            </div>
          );
        })()
      )}
    </AppPage>
  );
}
