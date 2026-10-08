// تبويب «الدروس» بشاشة الكورس (WP-T4 / T4-01, T4-02..06) — العقد C-01: props { course, onChanged }.
// Lesson/GetSchedule?courseId → LessonRow[] (بلا حالة ولا رابط اجتماع ولا orderIndex). Lesson/Create يكفيه courseId (Q-02b).
// إضافة (LessonFormDialog)، إلغاء (LessonCancelDialog)، ضبط اجتماع للأونلاين (MeetingConfigDialog).
// تعديل (T4-04): Lesson/Update يحدّث العنوان/التاريخ/الوقت/المدة فقط، ويترك الاجتماع لو أُرسل null، ويتجاهل orderIndex والقاعة
// (تحقق من كود الباك اند) → آمن من صف GetSchedule دون كتابة فوق قيم مجهولة.
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Badge, DataTable, EmptyState, Panel } from "@/components/app/kit";
import { ErrorState, LoadingState, RetryButton } from "@/components/app/feedback-states";
import { resolveCourseDeliveryType } from "@/components/teacher/course-seams";
import { LessonCancelDialog } from "@/components/teacher/lesson-cancel-dialog";
import { LessonFormDialog } from "@/components/teacher/lesson-form-dialog";
import { lessonRowToValues } from "@/components/teacher/lesson-form-schema";
import { MeetingConfigDialog } from "@/components/teacher/meeting-config-dialog";
import { Button } from "@/components/ui/button";
import type { TeacherCourseDetail } from "@/integrations/backend/courses";
import { getLessonSchedule, type LessonRow } from "@/integrations/backend/lessons";
import { useBi } from "@/lib/bi";
import { dayOfWeekLabel, deliveryTypeLabel } from "@/lib/enums";
import { formatDate, formatTime } from "@/lib/format";
import { withLoadErrorDetail } from "@/lib/load-error";
import { qk } from "@/lib/query-keys";
import {
  lessonRowActions,
  platformOrRoomText,
  sortLessonsBySchedule,
  suggestNextOrderIndex,
} from "@/lib/teacher-courses";

export interface LessonsTabProps {
  course: TeacherCourseDetail;
  onChanged: () => void;
}

export function LessonsTab({ course, onChanged }: LessonsTabProps) {
  const bi = useBi();
  const lang = bi<"ar" | "en">("ar", "en");
  const deliveryType = resolveCourseDeliveryType(course);
  const [addOpen, setAddOpen] = useState(false);
  const [editRow, setEditRow] = useState<LessonRow | null>(null);
  const [cancelRow, setCancelRow] = useState<LessonRow | null>(null);
  const [meetingRow, setMeetingRow] = useState<LessonRow | null>(null);

  const query = useQuery({
    queryKey: qk.teacherLessons(course.id),
    queryFn: () => getLessonSchedule(course.id),
  });
  const rows = query.data ? sortLessonsBySchedule(query.data) : null;
  // مهم: كائن ثابت بين الريندرات كي لا تُعاد تهيئة النموذج أثناء الكتابة.
  const editLesson = useMemo(() => {
    if (!editRow) return undefined;
    const position = (rows ?? []).findIndex((r) => r.lessonId === editRow.lessonId) + 1;
    return {
      id: editRow.lessonId,
      values: lessonRowToValues(editRow, position > 0 ? position : 1),
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editRow]);

  return (
    <>
      <Panel
        title={bi("دروس الكورس", "Course lessons")}
        icon="Presentation"
        action={
          <Button size="sm" disabled={deliveryType === null} onClick={() => setAddOpen(true)}>
            {bi("إضافة درس", "Add lesson")}
          </Button>
        }
      >
        {deliveryType === null && (
          <p role="status" className="mb-3 text-xs text-muted-foreground">
            {bi(
              "نوع الكورس (حضوري/أونلاين) غير معروف، فلا يمكن إضافة درس الآن.",
              "The course type (in person/online) is unknown, so a lesson can't be added right now.",
            )}
          </p>
        )}
        {query.isError ? (
          <ErrorState
            title={bi("ما قدرنا نحمّل الدروس", "We couldn't load the lessons")}
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
        ) : !rows ? (
          <LoadingState
            label={bi("جارٍ التحميل…", "Loading…")}
            className="border-none bg-transparent"
          />
        ) : rows.length === 0 ? (
          <EmptyState
            icon="Presentation"
            title={bi("لا توجد دروس بعد", "No lessons yet")}
            description={bi("أضف أول درس لهذا الكورس.", "Add the first lesson for this course.")}
          />
        ) : (
          <DataTable
            caption={bi("دروس الكورس", "Course lessons")}
            head={[
              bi("الموضوع", "Topic"),
              bi("اليوم", "Day"),
              bi("التاريخ", "Date"),
              bi("الوقت", "Time"),
              bi("المدة", "Duration"),
              bi("القاعة / المنصة", "Room / Platform"),
              "",
            ]}
            rows={rows.map((r) => {
              const a = lessonRowActions(r, deliveryType);
              return [
                r.topic,
                dayOfWeekLabel(r.day, bi),
                formatDate(r.date, lang),
                formatTime(r.startTime),
                r.durationMinutes > 0
                  ? bi(`${r.durationMinutes} د`, `${r.durationMinutes} min`)
                  : "—",
                platformOrRoomText(r.platformOrRoom, deliveryType),
                <div key={`a-${r.lessonId}`} className="flex flex-wrap gap-1.5">
                  {a.meeting && (
                    <Button size="sm" variant="outline" onClick={() => setMeetingRow(r)}>
                      {bi("بيانات الاجتماع", "Meeting")}
                    </Button>
                  )}
                  {a.edit && (
                    <Button size="sm" variant="outline" onClick={() => setEditRow(r)}>
                      {bi("تعديل", "Edit")}
                    </Button>
                  )}
                  {a.cancel && (
                    <Button size="sm" variant="outline" onClick={() => setCancelRow(r)}>
                      {bi("إلغاء", "Cancel")}
                    </Button>
                  )}
                </div>,
              ];
            })}
          />
        )}
        {deliveryType !== null && (
          <p className="mt-3 text-xs text-muted-foreground">
            {bi("نوع الكورس", "Course type")}: {deliveryTypeLabel(deliveryType, bi)}
          </p>
        )}
      </Panel>

      {deliveryType !== null && (
        <LessonFormDialog
          open={addOpen}
          onOpenChange={setAddOpen}
          courseId={course.id}
          deliveryType={deliveryType}
          nextOrderIndex={suggestNextOrderIndex(query.data ?? [])}
          onSaved={onChanged}
        />
      )}
      {deliveryType !== null && editLesson && (
        <LessonFormDialog
          open
          onOpenChange={(o) => {
            if (!o) setEditRow(null);
          }}
          courseId={course.id}
          deliveryType={deliveryType}
          lesson={editLesson}
          onSaved={onChanged}
        />
      )}
      <LessonCancelDialog
        open={cancelRow !== null}
        onOpenChange={(o) => {
          if (!o) setCancelRow(null);
        }}
        lessonId={cancelRow?.lessonId ?? 0}
        lessonTitle={cancelRow?.topic}
        onCancelled={onChanged}
      />
      <MeetingConfigDialog
        lessonId={meetingRow?.lessonId}
        open={meetingRow !== null}
        onOpenChange={(o) => {
          if (!o) setMeetingRow(null);
        }}
        onSaved={onChanged}
      />
    </>
  );
}
