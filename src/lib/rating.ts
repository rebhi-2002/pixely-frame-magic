// تحقق نقي لنافذة تقييم المعلم (WP-S4: S4-01 / S4-04).
// Swagger: Booking/Rate {bookingId, ratingValue (مثال 5 = الحد الأقصى), review}.
// أهلية التقييم (Completed ولم يُقيَّم) مرجعها الباك اند؛ lib/booking-rules.ts بس لإخفاء الزر.

export const MIN_RATING = 1;
export const MAX_RATING = 5;
/** حد أعلى واجهي للمراجعة — افتراض (غير موثّق بالباك اند). */
export const MAX_REVIEW_LENGTH = 1000;

export function isValidRating(value: unknown): value is number {
  return (
    typeof value === "number" &&
    Number.isInteger(value) &&
    value >= MIN_RATING &&
    value <= MAX_RATING
  );
}

/** مراجعة اختيارية: تُقصّ، والفاضية = null. */
export function normalizeReview(review: string): string | null {
  const trimmed = review.trim();
  return trimmed ? trimmed : null;
}

export type RatingError = "rating" | "review";

export function validateRating(value: number, review: string): RatingError[] {
  const errors: RatingError[] = [];
  if (!isValidRating(value)) errors.push("rating");
  if (review.length > MAX_REVIEW_LENGTH) errors.push("review");
  return errors;
}
