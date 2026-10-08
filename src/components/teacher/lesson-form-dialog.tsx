// نموذج الدرس (WP-T4: T4-02 حضوري، T4-03 أونلاين، T4-04 تعديل، T4-07 عرض أخطاء الباك اند).
// - إنشاء: Lesson/Create، تعديل: Lesson/Update (لدرس لم يبدأ وغير ملغى فقط).
// - نوع التوصيل (deliveryType) بيجي من الأب (lessons-tab) — بيحدد حقول القاعة/المنصة/الرابط.
// - اليوم بيُشتق من التاريخ ويُعرض ولا يُدخل. رابط الاجتماع http/https فقط.
// - رسائل الباك اند (تعارض درس، تاريخ/وقت غير صالح) بتظهر داخل النموذج وبتمنع الإغلاق.
// props جديدة لـlessons-tab (B/C): lesson (للتعديل)، values تُبنى من صف الجدول بعد وصول JSON.
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/lib/notify";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { getErrorMessage } from "@/integrations/backend/client";
import { createLesson, updateLesson } from "@/integrations/backend/lessons";
import { assertOk, getReturnId } from "@/integrations/backend/op-result";
import { useBi } from "@/lib/bi";
import { DeliveryType, MeetingPlatform, meetingPlatformLabel } from "@/lib/enums";
import type { Lang } from "@/lib/format";
import { qk } from "@/lib/query-keys";
import {
  LESSON_DURATION_MAX,
  LESSON_DURATION_MIN,
  LESSON_TITLE_MAX,
  LESSON_TITLE_MIN,
  canEditLesson,
  deriveLessonDay,
  emptyLessonValues,
  hasErrors,
  toLessonInput,
  validateLessonForm,
  type LessonFormErrorCode,
  type LessonFormErrors,
  type LessonFormValues,
} from "./lesson-form-schema";

export type { LessonFormValues } from "./lesson-form-schema";

export interface LessonFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  courseId: number;
  /** اختياري (Q-02b): الدرس يُنشأ بـcourseId وحده؛ مرّره فقط لو معروفًا. */
  groupId?: number | null;
  /** حضوري/أونلاين — من بيانات الكورس عند الأب. */
  deliveryType: DeliveryType;
  /** موجود = تعديل درس، غايب = إنشاء. القيم تبنيها lessons-tab من صف الجدول (بعد JSON). */
  lesson?: { id: number; values: LessonFormValues; cancelled?: boolean };
  /** اقتراح رقم الدرس التالي عند الإنشاء. */
  nextOrderIndex?: number;
  onSaved?: (lessonId: number | null) => void;
}

const PLATFORMS = [
  MeetingPlatform.Zoom,
  MeetingPlatform.GoogleMeet,
  MeetingPlatform.MicrosoftTeams,
  MeetingPlatform.Other,
] as const;

export function LessonFormDialog({
  open,
  onOpenChange,
  courseId,
  groupId,
  deliveryType,
  lesson,
  nextOrderIndex,
  onSaved,
}: LessonFormDialogProps) {
  const bi = useBi();
  const lang = bi<Lang>("ar", "en");
  const queryClient = useQueryClient();
  const isEdit = lesson !== undefined;
  const online = deliveryType === DeliveryType.Online;

  const [values, setValues] = useState<LessonFormValues>(emptyLessonValues(nextOrderIndex));
  const [errors, setErrors] = useState<LessonFormErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setValues(lesson?.values ?? emptyLessonValues(nextOrderIndex));
      setErrors({});
      setServerError(null);
    }
  }, [open, lesson, nextOrderIndex]);

  const editable = lesson
    ? canEditLesson({
        scheduledDate: lesson.values.scheduledDate,
        startTime: lesson.values.startTime,
        cancelled: lesson.cancelled,
      })
    : true;

  const save = useMutation({
    mutationFn: async () => {
      const input = toLessonInput(
        values,
        { courseId, groupId, lessonId: lesson?.id },
        deliveryType,
      );
      const result =
        isEdit && lesson
          ? await updateLesson({ ...input, id: lesson.id })
          : await createLesson(input);
      assertOk(result, "تعذّر حفظ الدرس", "Couldn't save the lesson");
      return getReturnId(result);
    },
    onSuccess: (lessonId) => {
      toast.success(
        bi(
          isEdit ? "تم تعديل الدرس" : "تمت إضافة الدرس",
          isEdit ? "Lesson updated" : "Lesson added",
        ),
      );
      void queryClient.invalidateQueries({ queryKey: ["teacher-lessons"] });
      void queryClient.invalidateQueries({ queryKey: qk.teacherCourse(courseId) });
      onSaved?.(lessonId);
      onOpenChange(false);
    },
    // T4-07: رسالة الباك اند (تعارض/تاريخ غير صالح) تبقى داخل النموذج وتمنع الإغلاق.
    onError: (err) =>
      setServerError(getErrorMessage(err, bi("تعذّر حفظ الدرس", "Couldn't save the lesson"))),
  });

  function set<K extends keyof LessonFormValues>(key: K, value: LessonFormValues[K]) {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
    setServerError(null);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!editable) return;
    const found = validateLessonForm(values, deliveryType, { editing: isEdit });
    setErrors(found);
    if (hasErrors(found)) return;
    save.mutate();
  }

  function message(code: LessonFormErrorCode | undefined): string | null {
    switch (code) {
      case "title_required":
        return bi("موضوع الدرس مطلوب", "Lesson title is required");
      case "title_length":
        return bi(
          `عنوان الدرس بين ${LESSON_TITLE_MIN} و${LESSON_TITLE_MAX} حرفًا`,
          `The title must be ${LESSON_TITLE_MIN}–${LESSON_TITLE_MAX} characters`,
        );
      case "date_invalid":
        return bi("التاريخ غير صالح", "Invalid date");
      case "time_invalid":
        return bi("وقت البدء غير صالح", "Invalid start time");
      case "duration_range":
        return bi(
          `المدة بين ${LESSON_DURATION_MIN} و${LESSON_DURATION_MAX} دقيقة`,
          `Duration must be between ${LESSON_DURATION_MIN} and ${LESSON_DURATION_MAX} minutes`,
        );
      case "order_invalid":
        return bi("رقم الدرس يجب أن يكون 1 أو أكثر", "Lesson number must be 1 or more");
      case "platform_required":
        return bi("اختر منصة الاجتماع", "Choose a meeting platform");
      case "url_required":
        return bi("رابط الاجتماع مطلوب", "Meeting link is required");
      case "url_invalid":
        return bi(
          "الرابط يجب أن يبدأ بـ http:// أو https://",
          "The link must start with http:// or https://",
        );
      default:
        return null;
    }
  }

  const fieldError = (code: LessonFormErrorCode | undefined) => {
    const text = message(code);
    return text ? (
      <p role="alert" className="text-xs text-destructive">
        {text}
      </p>
    ) : null;
  };

  const day = deriveLessonDay(values.scheduledDate, lang);

  return (
    <Dialog open={open} onOpenChange={(next) => (save.isPending ? undefined : onOpenChange(next))}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? bi("تعديل الدرس", "Edit lesson") : bi("إضافة درس", "Add a lesson")}
          </DialogTitle>
          <DialogDescription>
            {online
              ? isEdit
                ? bi(
                    "درس أونلاين — اترك المنصة والرابط فارغين للإبقاء على بيانات الاجتماع الحالية.",
                    "Online lesson — leave platform and link empty to keep the current meeting details.",
                  )
                : bi("درس أونلاين — أضف رابط الاجتماع.", "Online lesson — add the meeting link.")
              : bi("درس حضوري.", "In-person lesson.")}
          </DialogDescription>
        </DialogHeader>

        {!editable && (
          <p
            role="status"
            className="rounded-xl bg-secondary/40 px-4 py-3 text-sm text-muted-foreground"
          >
            {bi(
              "لا يمكن تعديل هذا الدرس: إما بدأ موعده أو أُلغي.",
              "This lesson can't be edited: it has either started or been cancelled.",
            )}
          </p>
        )}

        <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2" noValidate>
          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="lesson-title">{bi("موضوع الدرس", "Lesson title")}</Label>
            <Input
              id="lesson-title"
              value={values.title}
              disabled={!editable}
              onChange={(e) => set("title", e.target.value)}
            />
            {fieldError(errors.title)}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="lesson-order">{bi("رقم الدرس", "Lesson number")}</Label>
            <Input
              id="lesson-order"
              inputMode="numeric"
              value={values.orderIndex}
              disabled={!editable}
              onChange={(e) => set("orderIndex", e.target.value)}
            />
            {fieldError(errors.orderIndex)}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="lesson-duration">{bi("المدة (دقيقة)", "Duration (minutes)")}</Label>
            <Input
              id="lesson-duration"
              inputMode="numeric"
              value={values.durationMinutes}
              disabled={!editable}
              onChange={(e) => set("durationMinutes", e.target.value)}
            />
            {fieldError(errors.durationMinutes)}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="lesson-date">{bi("التاريخ", "Date")}</Label>
            <Input
              id="lesson-date"
              type="date"
              value={values.scheduledDate}
              disabled={!editable}
              onChange={(e) => set("scheduledDate", e.target.value)}
            />
            {fieldError(errors.scheduledDate)}
            {/* اليوم مشتق من التاريخ — للعرض فقط. */}
            <p className="text-xs text-muted-foreground">
              {bi("اليوم", "Day")}: {day}
            </p>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="lesson-time">{bi("وقت البدء", "Start time")}</Label>
            <Input
              id="lesson-time"
              type="time"
              value={values.startTime}
              disabled={!editable}
              onChange={(e) => set("startTime", e.target.value)}
            />
            {fieldError(errors.startTime)}
          </div>

          {online ? (
            <>
              <div className="space-y-1.5">
                <Label htmlFor="lesson-platform">{bi("منصة الاجتماع", "Meeting platform")}</Label>
                <Select
                  value={values.meetingPlatform}
                  disabled={!editable}
                  onValueChange={(v) => set("meetingPlatform", v)}
                >
                  <SelectTrigger id="lesson-platform">
                    <SelectValue placeholder={bi("اختر المنصة", "Choose a platform")} />
                  </SelectTrigger>
                  <SelectContent>
                    {PLATFORMS.map((p) => (
                      <SelectItem key={p} value={String(p)}>
                        {meetingPlatformLabel(p, bi)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldError(errors.meetingPlatform)}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="lesson-url">{bi("رابط الاجتماع", "Meeting link")}</Label>
                <Input
                  id="lesson-url"
                  type="url"
                  dir="ltr"
                  placeholder="https://"
                  value={values.meetingUrl}
                  disabled={!editable}
                  onChange={(e) => set("meetingUrl", e.target.value)}
                />
                {fieldError(errors.meetingUrl)}
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="lesson-instructions">
                  {bi("تعليمات (اختياري)", "Instructions (optional)")}
                </Label>
                <Textarea
                  id="lesson-instructions"
                  rows={3}
                  value={values.meetingInstructions}
                  disabled={!editable}
                  onChange={(e) => set("meetingInstructions", e.target.value)}
                />
              </div>
            </>
          ) : (
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="lesson-room">{bi("القاعة (اختياري)", "Room (optional)")}</Label>
              <Input
                id="lesson-room"
                value={values.room}
                disabled={!editable}
                onChange={(e) => set("room", e.target.value)}
              />
            </div>
          )}

          {serverError && (
            <p
              role="alert"
              className="rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive sm:col-span-2"
            >
              {serverError}
            </p>
          )}

          <DialogFooter className="sm:col-span-2">
            <Button
              type="button"
              variant="outline"
              disabled={save.isPending}
              onClick={() => onOpenChange(false)}
            >
              {bi("إلغاء", "Cancel")}
            </Button>
            <Button type="submit" loading={save.isPending} disabled={!editable}>
              {isEdit ? bi("حفظ التعديلات", "Save changes") : bi("إضافة الدرس", "Add lesson")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
