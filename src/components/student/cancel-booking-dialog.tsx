// نافذة إلغاء حجز الطالب (WP-S2 / S2-03 — العقد C-04): { booking, open, onOpenChange }.
// Student/CancelBooking {bookingId, reason}. المسموح من الـ booking هنا `id` فقط (PendingResponse)؛
// رسائل سياسة الإلغاء بتجي من الباك اند وبتُعرض كما هي (Q-08) — ما منخمّن موعدًا نهائيًا ولا استرجاعًا.
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
import { getErrorMessage } from "@/integrations/backend/client";
import { assertOk } from "@/integrations/backend/op-result";
import { studentCancelBooking, type StudentBookingDetail } from "@/integrations/backend/student";
import { useBi } from "@/lib/bi";
import { invalidateBookingQueries } from "@/lib/query-keys";

export interface CancelBookingDialogProps {
  booking: StudentBookingDetail;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CancelBookingDialog({ booking, open, onOpenChange }: CancelBookingDialogProps) {
  const bi = useBi();
  const queryClient = useQueryClient();
  const [reason, setReason] = useState("");
  const [error, setError] = useState<string | null>(null);

  // كل مرة تنفتح النافذة منبدأ من حالة نظيفة (ما نورّث سبب/خطأ من محاولة سابقة).
  useEffect(() => {
    if (open) {
      setReason("");
      setError(null);
    }
  }, [open]);

  const cancel = useMutation({
    mutationFn: async () => {
      const bookingId = booking.id;
      if (typeof bookingId !== "number") {
        throw new Error(bi("رقم الحجز غير متوفر", "The booking number is unavailable"));
      }
      const result = await studentCancelBooking(bookingId, reason.trim() || null);
      assertOk(result, "تعذّر إلغاء الحجز", "Couldn't cancel the booking");
      return bookingId;
    },
    onSuccess: (bookingId: number) => {
      invalidateBookingQueries(queryClient, bookingId);
      toast.success(bi("تم إلغاء الحجز.", "The booking was cancelled."));
      onOpenChange(false);
    },
    onError: (e: unknown) =>
      setError(getErrorMessage(e, bi("تعذّر إلغاء الحجز", "Couldn't cancel the booking"))),
  });

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => (cancel.isPending ? undefined : onOpenChange(next))}
    >
      <DialogContent className="text-start">
        <DialogHeader>
          <DialogTitle>{bi("إلغاء الحجز", "Cancel booking")}</DialogTitle>
          <DialogDescription>
            {bi(
              "سيُلغى الحجز ويبقى ضمن سجلّك بحالة «ملغى». قد تنطبق سياسة الإلغاء، وإن لم يكن الإلغاء مسموحًا ستظهر لك رسالة بالسبب.",
              "The booking will be cancelled and stay in your history as “Cancelled”. A cancellation policy may apply; if cancelling isn't allowed you'll see the reason.",
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-1.5">
          <Label htmlFor="cancel-reason">{bi("سبب الإلغاء (اختياري)", "Reason (optional)")}</Label>
          <Textarea
            id="cancel-reason"
            value={reason}
            maxLength={500}
            onChange={(e) => setReason(e.target.value)}
            disabled={cancel.isPending}
          />
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
            variant="destructive"
            loading={cancel.isPending}
            disabled={typeof booking.id !== "number"}
            onClick={() => {
              setError(null);
              cancel.mutate();
            }}
          >
            {bi("تأكيد الإلغاء", "Confirm cancellation")}
          </Button>
          <Button variant="outline" disabled={cancel.isPending} onClick={() => onOpenChange(false)}>
            {bi("رجوع", "Back")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
