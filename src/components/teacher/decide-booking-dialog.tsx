// نافذة قرار المعلم على طلب حجز: قبول أو رفض (WP-T5 / T5-02) — Booking/Decide.
// props صريحة (bookingId + decision) كي ما تقرأ حقول ردود غير موثّقة؛ وضعها كأزرار بكل صف بقائمة الطلبات ينتظر
// قائمة teacher.bookings (T5-01 / NE-01). الرفض يتطلب سببًا. فشل الخصم (رصيد الطالب غير كافٍ…) = رسالة الباك اند
// داخل النافذة ولا يُؤكَّد الحجز.
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
import { decideBooking } from "@/integrations/backend/bookings";
import { getErrorMessage } from "@/integrations/backend/client";
import { assertOk } from "@/integrations/backend/op-result";
import { useBi } from "@/lib/bi";
import {
  MAX_REJECTION_REASON,
  toDecisionArgs,
  validateDecision,
  type DecisionKind,
} from "@/lib/booking-decision";
import { invalidateBookingQueries } from "@/lib/query-keys";

export interface DecideBookingDialogProps {
  bookingId: number | null | undefined;
  decision: DecisionKind;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDone?: () => void;
}

export function DecideBookingDialog({
  bookingId,
  decision,
  open,
  onOpenChange,
  onDone,
}: DecideBookingDialogProps) {
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

  const accepting = decision === "accept";
  const errors = validateDecision(decision, reason);

  const submit = useMutation({
    mutationFn: async () => {
      if (typeof bookingId !== "number") {
        throw new Error(bi("رقم الحجز غير متوفر", "The booking number is unavailable"));
      }
      const args = toDecisionArgs(decision, reason);
      const result = await decideBooking(bookingId, args.accept, args.rejectionReason);
      assertOk(
        result,
        accepting ? "تعذّر قبول الطلب" : "تعذّر رفض الطلب",
        accepting ? "Couldn't accept the request" : "Couldn't reject the request",
      );
      return bookingId;
    },
    onSuccess: (id: number) => {
      invalidateBookingQueries(queryClient, id);
      toast.success(
        accepting
          ? bi("تم قبول الطلب.", "The request was accepted.")
          : bi("تم رفض الطلب.", "The request was rejected."),
      );
      onDone?.();
      onOpenChange(false);
    },
    onError: (e: unknown) =>
      setError(
        getErrorMessage(
          e,
          accepting
            ? bi("تعذّر قبول الطلب", "Couldn't accept the request")
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
            {accepting
              ? bi("قبول طلب الحجز", "Accept booking request")
              : bi("رفض طلب الحجز", "Reject booking request")}
          </DialogTitle>
          <DialogDescription>
            {accepting
              ? bi(
                  "وفق مواصفات المنصة، يُخصم المبلغ من محفظة الطالب عند القبول ويصبح الحجز مؤكدًا. إن تعذّر الخصم (مثلًا رصيد غير كافٍ) ستظهر رسالة ولن يُؤكَّد الحجز.",
                  "Per the platform spec, the amount is deducted from the student's wallet on acceptance and the booking is confirmed. If the deduction fails (e.g. insufficient balance) you'll see a message and the booking won't be confirmed.",
                )
              : bi(
                  "اكتب سبب الرفض ليظهر للطالب.",
                  "Write the reason for rejecting; it will be shown to the student.",
                )}
          </DialogDescription>
        </DialogHeader>

        {!accepting && (
          <div className="space-y-1.5">
            <Label htmlFor="decide-reason">{bi("سبب الرفض", "Rejection reason")}</Label>
            <Textarea
              id="decide-reason"
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
            variant={accepting ? "default" : "destructive"}
            loading={submit.isPending}
            disabled={typeof bookingId !== "number"}
            onClick={() => {
              setAttempted(true);
              setError(null);
              if (errors.length === 0) submit.mutate();
            }}
          >
            {accepting
              ? bi("تأكيد القبول", "Confirm acceptance")
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
