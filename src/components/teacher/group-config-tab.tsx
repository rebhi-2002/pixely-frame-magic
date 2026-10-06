// تبويب «إعداد المجموعة» (WP-T2 / T2-01 · T2-02 · T2-05). العقد C-01: { course, onChanged } (لم يتغيّر).
//
// المنفَّذ الآن (بلا JSON): النموذج كاملًا — السعة، فترة الكورس، مدة الدرس الافتراضية، أيام الحضور (إضافة/حذف)،
// التحقق (T2-03) وبناء جسم Course/ConfigureGroupSchedule، وعرض أخطاء الباك اند (تعارض/تحقق) داخل النموذج.
// نفس النموذج للحضوري والأونلاين (T2-02): العناوين فقط تتغيّر حسب نوع الكورس.
// ⛔ معلّق على الباك اند (seam بـcourse-seams.ts، J-05/Q-02): معرفة groupId — لحد ما تتوفّر الحفظ معطّل بنص
// صادق، وتعبئة القيم الحالية للتعديل (T2-04) غير مفعّلة. ما نخمّن groupId.
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Panel } from "@/components/app/kit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { resolveCourseDeliveryType, resolveGroupId } from "@/components/teacher/course-seams";
import {
  emptyGroupScheduleValues,
  issuesFor,
  newDayRow,
  toGroupScheduleInput,
  validateGroupScheduleForm,
  type GroupScheduleFormValues,
} from "@/components/teacher/group-schedule-form";
import type { GroupScheduleErrorCode } from "@/components/teacher/group-schedule-validation";
import { configureGroupSchedule, type TeacherCourseDetail } from "@/integrations/backend/courses";
import { getErrorMessage } from "@/integrations/backend/client";
import { assertOk } from "@/integrations/backend/op-result";
import { useBi } from "@/lib/bi";
import { DeliveryType, WEEK_DISPLAY_ORDER, dayOfWeekLabel, type Bi } from "@/lib/enums";
import { qk } from "@/lib/query-keys";

export interface GroupConfigTabProps {
  course: TeacherCourseDetail;
  onChanged: () => void;
}

const SELECT_CLASS =
  "h-10 w-full rounded-md border border-input bg-transparent px-3 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-60";

function issueText(code: GroupScheduleErrorCode, bi: Bi): string {
  switch (code) {
    case "start_date_invalid":
      return bi("اختر تاريخ بداية صحيحًا", "Choose a valid start date");
    case "end_date_invalid":
      return bi("اختر تاريخ نهاية صحيحًا", "Choose a valid end date");
    case "end_before_start":
      return bi("تاريخ النهاية قبل تاريخ البداية", "The end date is before the start date");
    case "duration_invalid":
      return bi("مدة الدرس لازم تكون عددًا صحيحًا أكبر من صفر", "Lesson duration must be a whole number above zero");
    case "capacity_invalid":
      return bi("الحد الأقصى للطلاب لازم يكون عددًا صحيحًا 1 أو أكثر", "Max students must be a whole number, 1 or more");
    case "days_required":
      return bi("أضف يومًا واحدًا على الأقل", "Add at least one day");
    case "day_invalid":
      return bi("اختر يوم الأسبوع", "Choose a weekday");
    case "day_duplicate":
      return bi("هذا اليوم مكرّر", "This day is duplicated");
    case "time_invalid":
      return bi("اختر وقت بدء صحيحًا", "Choose a valid start time");
  }
}

export function GroupConfigTab({ course, onChanged }: GroupConfigTabProps) {
  const bi = useBi();
  const queryClient = useQueryClient();
  const groupId = resolveGroupId(course);
  const deliveryType = resolveCourseDeliveryType(course);

  const [values, setValues] = useState<GroupScheduleFormValues>(emptyGroupScheduleValues);
  const [attempted, setAttempted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const issues = validateGroupScheduleForm(values);
  const show = (codes: GroupScheduleErrorCode[], dayIndex?: number): string[] =>
    attempted ? issuesFor(issues, codes, dayIndex).map((issue) => issueText(issue.code, bi)) : [];

  const setField = (field: keyof Omit<GroupScheduleFormValues, "days">, value: string) =>
    setValues((previous) => ({ ...previous, [field]: value }));
  const setDay = (key: string, patch: Partial<{ dayOfWeek: string; startTime: string }>) =>
    setValues((previous) => ({
      ...previous,
      days: previous.days.map((row) => (row.key === key ? { ...row, ...patch } : row)),
    }));

  const save = useMutation({
    mutationFn: async () => {
      if (groupId === null) {
        throw new Error(bi("المجموعة غير معروفة بعد", "The group isn't known yet"));
      }
      const result = await configureGroupSchedule(toGroupScheduleInput(groupId, values));
      assertOk(result, "تعذّر حفظ جدول المجموعة", "Couldn't save the group schedule");
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: qk.teacherCourses() });
      if (typeof course.id === "number") {
        void queryClient.invalidateQueries({ queryKey: qk.teacherCourse(course.id) });
      }
      // الجدول المتكرر قد يولّد/يغيّر دروسًا: نحدّث قوائم الدروس أيضًا.
      void queryClient.invalidateQueries({ queryKey: ["teacher-lessons"] });
      toast.success(bi("تم حفظ جدول المجموعة.", "The group schedule was saved."));
      onChanged();
    },
    // T2-05: تعارض مع دروس مجدولة / رفض الباك اند → رسالته داخل النموذج، والنموذج يبقى كما هو للتعديل.
    onError: (e: unknown) =>
      setError(getErrorMessage(e, bi("تعذّر حفظ جدول المجموعة", "Couldn't save the group schedule"))),
  });

  const title =
    deliveryType === DeliveryType.Online
      ? bi("إعداد المجموعة (أونلاين)", "Group setup (online)")
      : deliveryType === DeliveryType.InPerson
        ? bi("إعداد المجموعة (حضوري)", "Group setup (in person)")
        : bi("إعداد المجموعة", "Group setup");

  const fieldErrors = (messages: string[]) =>
    messages.map((text) => (
      <p key={text} role="alert" className="text-xs text-destructive">
        {text}
      </p>
    ));

  return (
    <Panel title={title} icon="Users">
      <div className="space-y-5">
        {groupId === null && (
          <p
            role="note"
            className="rounded-xl border border-border bg-secondary/30 px-4 py-3 text-sm text-muted-foreground"
          >
            {bi(
              "حفظ الجدول غير مفعّل بعد: ربط المجموعة بالكورس قيد التنفيذ. يمكنك تجهيز الجدول الآن، ولن يُحفظ حتى يكتمل الربط.",
              "Saving the schedule isn't enabled yet: linking the group to the course is still being connected. You can prepare the schedule now; it won't be saved until the link is ready.",
            )}
          </p>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="gc-max">{bi("الحد الأقصى للطلاب", "Max students")}</Label>
            <Input
              id="gc-max"
              inputMode="numeric"
              value={values.maxStudents}
              onChange={(e) => setField("maxStudents", e.target.value)}
              aria-invalid={show(["capacity_invalid"]).length > 0 || undefined}
            />
            {fieldErrors(show(["capacity_invalid"]))}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="gc-duration">{bi("مدة الدرس الافتراضية (دقيقة)", "Default lesson duration (min)")}</Label>
            <Input
              id="gc-duration"
              inputMode="numeric"
              value={values.defaultLessonDurationMinutes}
              onChange={(e) => setField("defaultLessonDurationMinutes", e.target.value)}
              aria-invalid={show(["duration_invalid"]).length > 0 || undefined}
            />
            {fieldErrors(show(["duration_invalid"]))}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="gc-start">{bi("بداية الكورس", "Course start")}</Label>
            <Input
              id="gc-start"
              type="date"
              value={values.courseStartDate}
              onChange={(e) => setField("courseStartDate", e.target.value)}
              aria-invalid={show(["start_date_invalid"]).length > 0 || undefined}
            />
            {fieldErrors(show(["start_date_invalid"]))}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="gc-end">{bi("نهاية الكورس", "Course end")}</Label>
            <Input
              id="gc-end"
              type="date"
              value={values.courseEndDate}
              onChange={(e) => setField("courseEndDate", e.target.value)}
              aria-invalid={show(["end_date_invalid", "end_before_start"]).length > 0 || undefined}
            />
            {fieldErrors(show(["end_date_invalid", "end_before_start"]))}
          </div>
        </div>

        <div className="space-y-3">
          <Label>{bi("أيام الحضور", "Meeting days")}</Label>
          {fieldErrors(show(["days_required"]))}
          {values.days.map((row, index) => {
            const rowErrors = show(["day_invalid", "day_duplicate", "time_invalid"], index);
            return (
              <div key={row.key} className="rounded-xl border border-border p-3">
                <div className="grid gap-3 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
                  <div className="space-y-1.5">
                    <Label htmlFor={`gc-day-${row.key}`}>{bi("اليوم", "Day")}</Label>
                    <select
                      id={`gc-day-${row.key}`}
                      className={SELECT_CLASS}
                      value={row.dayOfWeek}
                      onChange={(e) => setDay(row.key, { dayOfWeek: e.target.value })}
                    >
                      <option value="">{bi("اختر اليوم", "Choose a day")}</option>
                      {WEEK_DISPLAY_ORDER.map((day) => (
                        <option key={day} value={day}>
                          {dayOfWeekLabel(day, bi)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor={`gc-time-${row.key}`}>{bi("وقت البدء", "Start time")}</Label>
                    <Input
                      id={`gc-time-${row.key}`}
                      type="time"
                      value={row.startTime}
                      onChange={(e) => setDay(row.key, { startTime: e.target.value })}
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={values.days.length <= 1}
                    onClick={() =>
                      setValues((previous) => ({
                        ...previous,
                        days: previous.days.filter((d) => d.key !== row.key),
                      }))
                    }
                  >
                    {bi("حذف", "Remove")}
                  </Button>
                </div>
                {fieldErrors(rowErrors)}
              </div>
            );
          })}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setValues((previous) => ({ ...previous, days: [...previous.days, newDayRow()] }))}
          >
            {bi("إضافة يوم", "Add a day")}
          </Button>
        </div>

        {error && (
          <p role="alert" className="rounded-xl bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </p>
        )}

        <Button
          type="button"
          loading={save.isPending}
          disabled={groupId === null}
          onClick={() => {
            setAttempted(true);
            setError(null);
            if (issues.length === 0) save.mutate();
          }}
        >
          {bi("حفظ جدول المجموعة", "Save group schedule")}
        </Button>
      </div>
    </Panel>
  );
}
