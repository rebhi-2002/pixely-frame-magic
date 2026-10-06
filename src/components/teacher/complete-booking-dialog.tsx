// نافذة إنهاء حصة مؤكَّدة (Confirmed → Completed) — WP-T5 / T5-03 — Booking/Complete.
// props صريحة (bookingId)؛ وضعها بصف قائمة الطلبات ينتظر T5-01 (NE-01). أي رفض من الباك اند يُعرض داخل النافذة.
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
import { completeBooking } from "@/integrations/backend/bookings";
import { getErrorMessage } from "@/integrations/backend/client";
import { assertOk } from "@/integrations/backend/op-result";
import { useBi } from "@/lib/bi";
import { invalidateBookingQueries } from "@/lib/query-keys";

export interface CompleteBookingDialogProps {
  bookingId: number | null | undefined;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDone?: () => void;
}

export function CompleteBookingDialog({
  bookingId,
  open,
  onOpenChange,
  onDone,
}: CompleteBookingDialogProps) {
  const bi = useBi();
  const queryClient = useQueryClient();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) setError(null);
  }, [open]);

  const complete = useMutation({
    mutationFn: async () => {
      if (typeof bookingId !== "number") {
        throw new Error(bi("رقم الحجز غير متوفر", "The booking number is unavailable"));
      }
      const result = await completeBooking(bookingId);
      assertOk(result, "تعذّر إنهاء الحصة", "Couldn't complete the session");
      return bookingId;
    },
    onSuccess: (id: number) => {
      invalidateBookingQueries(queryClient, id);
      toast.success(
        bi(
          "تم إنهاء الحصة. يمكن للطالب الآن تقييمها.",
          "The session was completed. The student can now rate it.",
        ),
      );
      onDone?.();
      onOpenChange(false);
    },
    onError: (e: unknown) =>
      setError(getErrorMessage(e, bi("تعذّر إنهاء الحصة", "Couldn't complete the session"))),
  });

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => (complete.isPending ? undefined : onOpenChange(next))}
    >
      <DialogContent className="text-start">
        <DialogHeader>
          <DialogTitle>{bi("إنهاء الحصة", "Complete session")}</DialogTitle>
          <DialogDescription>
            {bi(
              "هل أُجريت هذه الحصة؟ سيتغير الحجز إلى «مكتمل» ولا يمكن التراجع عن ذلك.",
              "Did this session take place? The booking will change to “Completed” and this can't be undone.",
            )}
          </DialogDescription>
        </DialogHeader>

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
            loading={complete.isPending}
            disabled={typeof bookingId !== "number"}
            onClick={() => {
              setError(null);
              complete.mutate();
            }}
          >
            {bi("نعم، أُنهيت", "Yes, complete it")}
          </Button>
          <Button
            variant="outline"
            disabled={complete.isPending}
            onClick={() => onOpenChange(false)}
          >
            {bi("رجوع", "Back")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
