// نافذة إلغاء درس (WP-T4 / T4-06): تأكيد + سبب اختياري → Lesson/Cancel.
// الدرس بيبقى بالسجل بحالة «ملغى» (مش بيُحذف). رسالة الباك اند بتظهر داخل النافذة لو فشل الإلغاء.
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/lib/notify";
import { ConfirmDialog } from "@/components/app/confirm-dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getErrorMessage } from "@/integrations/backend/client";
import { cancelLesson } from "@/integrations/backend/lessons";
import { assertOk } from "@/integrations/backend/op-result";
import { useBi } from "@/lib/bi";

export interface LessonCancelDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lessonId: number;
  /** عنوان الدرس للعرض بالتأكيد (اختياري — يمرّره الأب بعد معرفة شكل الصف). */
  lessonTitle?: string;
  onCancelled?: () => void;
}

export function LessonCancelDialog({
  open,
  onOpenChange,
  lessonId,
  lessonTitle,
  onCancelled,
}: LessonCancelDialogProps) {
  const bi = useBi();
  const queryClient = useQueryClient();
  const [reason, setReason] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setReason("");
      setError(null);
    }
  }, [open]);

  const cancel = useMutation({
    mutationFn: async () => {
      const result = await cancelLesson(lessonId, reason.trim() || null);
      assertOk(result, "تعذّر إلغاء الدرس", "Couldn't cancel the lesson");
    },
    onSuccess: () => {
      toast.success(bi("تم إلغاء الدرس", "Lesson cancelled"));
      void queryClient.invalidateQueries({ queryKey: ["teacher-lessons"] });
      onCancelled?.();
      onOpenChange(false);
    },
    onError: (err) =>
      setError(getErrorMessage(err, bi("تعذّر إلغاء الدرس", "Couldn't cancel the lesson"))),
  });

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title={bi("إلغاء الدرس", "Cancel lesson")}
      description={
        <span className="block space-y-3 text-start">
          <span className="block">
            {lessonTitle
              ? bi(
                  `سيُلغى «${lessonTitle}» ويبقى ظاهرًا في السجل بحالة «ملغى».`,
                  `"${lessonTitle}" will be cancelled and stay in the history as «Cancelled».`,
                )
              : bi(
                  "سيُلغى الدرس ويبقى ظاهرًا في السجل بحالة «ملغى».",
                  "The lesson will be cancelled and stay in the history as «Cancelled».",
                )}
          </span>
          <span className="block space-y-1.5">
            <Label htmlFor="lesson-cancel-reason">
              {bi("السبب (اختياري)", "Reason (optional)")}
            </Label>
            <Textarea
              id="lesson-cancel-reason"
              rows={3}
              value={reason}
              disabled={cancel.isPending}
              onChange={(e) => setReason(e.target.value)}
            />
          </span>
          {error && (
            <span role="alert" className="block text-sm text-destructive">
              {error}
            </span>
          )}
        </span>
      }
      confirmLabel={bi("تأكيد الإلغاء", "Confirm cancellation")}
      onConfirm={() => cancel.mutate()}
      loading={cancel.isPending}
      destructive
    />
  );
}
