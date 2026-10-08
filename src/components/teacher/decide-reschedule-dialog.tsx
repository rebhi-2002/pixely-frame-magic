// نافذة قرار المعلم على طلب إعادة جدولة: موافقة أو رفض (WP-T5 / T5-06) — Booking/DecideReschedule.
// props صريحة (requestId + decision). الرفض يتطلب سببًا. رسالة رفض الباك اند (تعارض…) تُعرض داخل النافذة.
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { decideReschedule } from "@/integrations/backend/bookings";
import { getErrorMessage } from "@/integrations/backend/client";
import { assertOk } from "@/integrations/backend/op-result";
import { useBi } from "@/lib/bi";
import { MAX_REJECTION_REASON, type DecisionKind } from "@/lib/booking-decision";
import { invalidateBookingQueries } from "@/lib/query-keys";
import { toRescheduleArgs, validateRescheduleDecision } from "@/lib/teacher-bookings";

export interface DecideRescheduleDialogProps {
  requestId: number | null | undefined;
  decision: DecisionKind;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDone?: () => void;
}

export function DecideRescheduleDialog({
  requestId,
  decision,
  open,
  onOpenChange,
  onDone,
}: DecideRescheduleDialogProps) {
  const bi = useBi();
  const queryClient = useQueryClient();
  const [reason, setReason] = useState("");
  const [attempted, setAttempted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setReason("");
      setAttempted(false);
      setError(null);
    }
  }, [open]);

  const approving = decision === "accept";
  const errors = validateRescheduleDecision(decision, reason);

  const submit = useMutation({
    mutationFn: async () => {
      if (typeof requestId !== "number") {
        throw new Error(bi("رقم الطلب غير متوفر", "The request number is unavailable"));
      }
      const result = await decideReschedule({ requestId, ...toRescheduleArgs(decision, reason) });
      assertOk(
        result,
        approving ? "تعذّرت الموافقة على الطلب" : "تعذّر رفض الطلب",
        approving ? "Couldn't approve the request" : "Couldn't reject the request",
      );
      return requestId;
    },
    onSuccess: () => {
      invalidateBookingQueries(queryClient);
      toast.success(
        approving
          ? bi("تمت الموافقة على إعادة الجدولة.", "The reschedule was approved.")
          : bi("تم رفض طلب إعادة الجدولة.", "The reschedule request was rejected."),
      );
      onDone?.();
      onOpenChange(false);
    },
    onError: (e: unknown) =>
      setError(
        getErrorMessage(
          e,
          approving
            ? bi("تعذّرت الموافقة على الطلب", "Couldn't approve the request")
            : bi("تعذّر رفض الطلب", "Couldn't reject the request"),
        ),
      ),
  });

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => (submit.isPending ? undefined : onOpenChange(next))}
    >
      <DialogContent className="text-start">
        <DialogHeader>
          <DialogTitle>
            {approving
              ? bi("الموافقة على إعادة الجدولة", "Approve reschedule")
              : bi("رفض إعادة الجدولة", "Reject reschedule")}
          </DialogTitle>
          <DialogDescription>
            {approving
              ? bi(
                  "عند الموافقة ينتقل الحجز إلى الموعد الجديد. إن تعارض مع موعد آخر ستظهر رسالة ولن يتغيّر شيء.",
                  "On approval the booking moves to the new time. If it conflicts with another slot you'll see a message and nothing changes.",
                )
              : bi(
                  "اكتب سبب الرفض ليظهر للطالب.",
                  "Write the reason for rejecting; it will be shown to the student.",
                )}
          </DialogDescription>
        </DialogHeader>

        {!approving && (
          <div className="space-y-1.5">
            <Label htmlFor="resched-reason">{bi("سبب الرفض", "Rejection reason")}</Label>
            <Textarea
              id="resched-reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              aria-invalid={(attempted && errors.length > 0) || undefined}
              disabled={submit.isPending}
            />
            {attempted && errors.includes("reason_required") && (
              <p role="alert" className="text-xs text-destructive">
                {bi("اكتب سبب الرفض", "Write the rejection reason")}
              </p>
            )}
            {attempted && errors.includes("reason_too_long") && (
              <p role="alert" className="text-xs text-destructive">
                {bi(
                  `السبب طويل (الحد ${MAX_REJECTION_REASON} حرفًا)`,
                  `The reason is too long (max ${MAX_REJECTION_REASON})`,
                )}
              </p>
            )}
          </div>
        )}

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
            variant={approving ? "default" : "destructive"}
            loading={submit.isPending}
            disabled={typeof requestId !== "number"}
            onClick={() => {
              setAttempted(true);
              setError(null);
              if (errors.length === 0) submit.mutate();
            }}
          >
            {approving
              ? bi("تأكيد الموافقة", "Confirm approval")
              : bi("تأكيد الرفض", "Confirm rejection")}
          </Button>
          <Button variant="outline" disabled={submit.isPending} onClick={() => onOpenChange(false)}>
            {bi("رجوع", "Back")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
