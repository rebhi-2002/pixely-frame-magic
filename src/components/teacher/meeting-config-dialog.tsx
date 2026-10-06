// نافذة تعديل بيانات اجتماع درس أونلاين فقط (WP-T4 / T4-05) — Lesson/ConfigureMeeting.
// مكوّن مستقل بـprops صريحة (lessonId + القيم الحالية اختيارية) كي ما يقرأ حقول ردود غير موثّقة؛ وضعه كإجراء
// سريع داخل قائمة الدروس (lessons-tab) ينتظر قائمة الدروس T4-01 (NE-12). الرابط http/https فقط.
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
import { Textarea } from "@/components/ui/textarea";
import {
  MEETING_INSTRUCTIONS_MAX,
  emptyMeetingValues,
  hasMeetingErrors,
  toMeetingArgs,
  validateMeetingForm,
  type MeetingFormErrorCode,
  type MeetingFormValues,
} from "@/components/teacher/meeting-config-schema";
import { getErrorMessage } from "@/integrations/backend/client";
import { configureLessonMeeting } from "@/integrations/backend/lessons";
import { assertOk } from "@/integrations/backend/op-result";
import { useBi } from "@/lib/bi";
import { MeetingPlatform, meetingPlatformLabel, type Bi } from "@/lib/enums";

export interface MeetingConfigDialogProps {
  lessonId: number | null | undefined;
  /** القيم الحالية لتعبئة النموذج (اختيارية — يمرّرها من يعرف صف الدرس). */
  initial?: {
    meetingPlatform?: number | null;
    meetingUrl?: string | null;
    meetingInstructions?: string | null;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaved?: () => void;
}

const SELECT_CLASS =
  "h-10 w-full rounded-md border border-input bg-transparent px-3 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring";

function errorText(code: MeetingFormErrorCode, bi: Bi): string {
  switch (code) {
    case "platform_required":
      return bi("اختر المنصة", "Choose a platform");
    case "url_required":
      return bi("رابط الاجتماع مطلوب", "The meeting link is required");
    case "url_invalid":
      return bi(
        "الرابط لازم يبدأ بـhttp:// أو https://",
        "The link must start with http:// or https://",
      );
    case "instructions_too_long":
      return bi(
        `التعليمات طويلة (الحد ${MEETING_INSTRUCTIONS_MAX} حرفًا)`,
        `The instructions are too long (max ${MEETING_INSTRUCTIONS_MAX})`,
      );
  }
}

export function MeetingConfigDialog({
  lessonId,
  initial,
  open,
  onOpenChange,
  onSaved,
}: MeetingConfigDialogProps) {
  const bi = useBi();
  const queryClient = useQueryClient();
  const [values, setValues] = useState<MeetingFormValues>(emptyMeetingValues);
  const [attempted, setAttempted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setValues({
        meetingPlatform: initial?.meetingPlatform ? String(initial.meetingPlatform) : "",
        meetingUrl: initial?.meetingUrl ?? "",
        meetingInstructions: initial?.meetingInstructions ?? "",
      });
      setAttempted(false);
      setError(null);
    }
    // نعيد التهيئة عند الفتح فقط (ما نريد مسح ما يكتبه المعلم لو تغيّر initial وهو مفتوح).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const errors = validateMeetingForm(values);
  const shown = (field: keyof typeof errors): string | null =>
    attempted && errors[field] ? errorText(errors[field] as MeetingFormErrorCode, bi) : null;
  const set = (field: keyof MeetingFormValues, value: string) =>
    setValues((previous) => ({ ...previous, [field]: value }));

  const save = useMutation({
    mutationFn: async () => {
      if (typeof lessonId !== "number") {
        throw new Error(bi("رقم الدرس غير متوفر", "The lesson number is unavailable"));
      }
      const args = toMeetingArgs(values);
      if (!args)
        throw new Error(bi("بيانات الاجتماع غير صالحة", "The meeting details aren't valid"));
      const result = await configureLessonMeeting(
        lessonId,
        args.meetingPlatform,
        args.meetingUrl,
        args.meetingInstructions,
      );
      assertOk(result, "تعذّر حفظ بيانات الاجتماع", "Couldn't save the meeting details");
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["teacher-lessons"] });
      void queryClient.invalidateQueries({ queryKey: ["student-schedule"] });
      toast.success(bi("تم حفظ بيانات الاجتماع.", "The meeting details were saved."));
      onSaved?.();
      onOpenChange(false);
    },
    onError: (e: unknown) =>
      setError(
        getErrorMessage(e, bi("تعذّر حفظ بيانات الاجتماع", "Couldn't save the meeting details")),
      ),
  });

  return (
    <Dialog open={open} onOpenChange={(next) => (save.isPending ? undefined : onOpenChange(next))}>
      <DialogContent className="text-start">
        <DialogHeader>
          <DialogTitle>{bi("بيانات الاجتماع", "Meeting details")}</DialogTitle>
          <DialogDescription>
            {bi(
              "حدّد المنصة ورابط الاجتماع لهذا الدرس. يظهر الرابط للطلاب المسجّلين فقط.",
              "Set the platform and meeting link for this lesson. The link is shown to enrolled students only.",
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-1.5">
          <Label htmlFor="mt-platform">{bi("المنصة", "Platform")}</Label>
          <select
            id="mt-platform"
            className={SELECT_CLASS}
            value={values.meetingPlatform}
            onChange={(e) => set("meetingPlatform", e.target.value)}
            aria-invalid={Boolean(shown("meetingPlatform")) || undefined}
            disabled={save.isPending}
          >
            <option value="">{bi("اختر المنصة", "Choose a platform")}</option>
            {[
              MeetingPlatform.Zoom,
              MeetingPlatform.GoogleMeet,
              MeetingPlatform.MicrosoftTeams,
              MeetingPlatform.Other,
            ].map((platform) => (
              <option key={platform} value={platform}>
                {meetingPlatformLabel(platform, bi)}
              </option>
            ))}
          </select>
          {shown("meetingPlatform") && (
            <p role="alert" className="text-xs text-destructive">
              {shown("meetingPlatform")}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="mt-url">{bi("رابط الاجتماع", "Meeting link")}</Label>
          <Input
            id="mt-url"
            dir="ltr"
            inputMode="url"
            value={values.meetingUrl}
            onChange={(e) => set("meetingUrl", e.target.value)}
            aria-invalid={Boolean(shown("meetingUrl")) || undefined}
            disabled={save.isPending}
          />
          {shown("meetingUrl") && (
            <p role="alert" className="text-xs text-destructive">
              {shown("meetingUrl")}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="mt-notes">{bi("تعليمات (اختياري)", "Instructions (optional)")}</Label>
          <Textarea
            id="mt-notes"
            value={values.meetingInstructions}
            onChange={(e) => set("meetingInstructions", e.target.value)}
            aria-invalid={Boolean(shown("meetingInstructions")) || undefined}
            disabled={save.isPending}
          />
          {shown("meetingInstructions") && (
            <p role="alert" className="text-xs text-destructive">
              {shown("meetingInstructions")}
            </p>
          )}
        </div>

        {error && (
          <p
            role="alert"
            className="rounded-xl bg-destructive/10 px-3 py-2 text-sm text-destructive"
          >
            {error}
          </p>
        )}

        <DialogFooter className="gap-2 sm:justify-start">
          <Button
            loading={save.isPending}
            disabled={typeof lessonId !== "number"}
            onClick={() => {
              setAttempted(true);
              setError(null);
              if (!hasMeetingErrors(errors)) save.mutate();
            }}
          >
            {bi("حفظ", "Save")}
          </Button>
          <Button variant="outline" disabled={save.isPending} onClick={() => onOpenChange(false)}>
            {bi("إلغاء", "Cancel")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
