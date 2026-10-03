// شارة حالة الحجز (WP-00 — العقد C-10). props: { status: number } بقيم 1..6.
import { Badge } from "@/components/app/kit";
import { bookingStatusLabel, bookingStatusTone } from "@/lib/enums";
import { useBi } from "@/lib/bi";

export function BookingStatusBadge({ status }: { status: number }) {
  const bi = useBi();
  return <Badge tone={bookingStatusTone(status)}>{bookingStatusLabel(status, bi)}</Badge>;
}
