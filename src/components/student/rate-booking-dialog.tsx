// نافذة تقييم المعلم (WP-S4 / S4-01 — العقد C-06): { booking, open, onOpenChange }.
// Booking/Rate {bookingId, ratingValue (1..5), review?}. أهلية التقييم (Completed ولم يُقيَّم) مرجعها
// الباك اند: لو رفض بنعرض رسالته. إخفاء الزر لو «مُقيَّم سابقًا» (S4-02) وتحديث ملف المعلم (S4-03)
// بيحتاجوا حقولًا من GetBooking (JSON، Q-10) — مؤجَّلين لـWP-J.
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
import { StarRating } from "@/components/ui/star-rating";
import { Textarea } from "@/components/ui/textarea";
import { rateBooking } from "@/integrations/backend/bookings";
import type { StudentBookingDetail } from "@/integrations/backend/student";
import { getErrorMessage } from "@/integrations/backend/client";
import { assertOk } from "@/integrations/backend/op-result";
import { useBi } from "@/lib/bi";
import { invalidateBookingQueries } from "@/lib/query-keys";
import { MAX_REVIEW_LENGTH, isValidRating, normalizeReview } from "@/lib/rating";

export interface RateBookingDialogProps {
  booking: StudentBookingDetail;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RateBookingDialog({ booking, open, onOpenChange }: RateBookingDialogProps) {
  const bi = useBi();
  const queryClient = useQueryClient();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setRating(0);
      setReview("");
      setError(null);
    }
  }, [open]);

  const submit = useMutation({
    mutationFn: async () => {
      const bookingId = booking.id;
      if (typeof bookingId !== "number") {
        throw new Error(bi("رقم الحجز غير متوفر", "The booking number is unavailable"));
      }
      if (!isValidRating(rating)) {
        throw new Error(bi("اختر تقييمًا من 1 إلى 5 نجوم", "Choose a rating from 1 to 5 stars"));
      }
      const result = await rateBooking(bookingId, rating, normalizeReview(review));
      assertOk(result, "تعذّر إرسال التقييم", "Couldn't submit your rating");
      return bookingId;
    },
    onSuccess: (bookingId: number) => {
      invalidateBookingQueries(queryClient, bookingId);
      toast.success(bi("شكرًا! تم تسجيل تقييمك.", "Thanks! Your rating was recorded."));
      onOpenChange(false);
    },
    onError: (e: unknown) =>
      setError(getErrorMessage(e, bi("تعذّر إرسال التقييم", "Couldn't submit your rating"))),
  });

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => (submit.isPending ? undefined : onOpenChange(next))}
    >
      <DialogContent className="text-start">
        <DialogHeader>
          <DialogTitle>{bi("قيّم المعلم", "Rate your teacher")}</DialogTitle>
          <DialogDescription>
            {bi(
              "تقييمك يساعد الطلاب الآخرين. يمكن تقييم الحصة المكتملة مرة واحدة فقط.",
              "Your rating helps other students. A completed session can be rated once.",
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-1.5">
          <Label>{bi("التقييم", "Rating")}</Label>
          <StarRating value={rating} onChange={setRating} />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="rating-review">{bi("مراجعة (اختياري)", "Review (optional)")}</Label>
          <Textarea
            id="rating-review"
            value={review}
            maxLength={MAX_REVIEW_LENGTH}
            onChange={(e) => setReview(e.target.value)}
            disabled={submit.isPending}
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
            loading={submit.isPending}
            disabled={!isValidRating(rating) || typeof booking.id !== "number"}
            onClick={() => {
              setError(null);
              submit.mutate();
            }}
          >
            {bi("إرسال التقييم", "Submit rating")}
          </Button>
          <Button variant="outline" disabled={submit.isPending} onClick={() => onOpenChange(false)}>
            {bi("إلغاء", "Cancel")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
