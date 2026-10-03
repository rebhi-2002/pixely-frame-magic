// صفّ موحّد (رابط لصفحة التفاصيل) للوحات «كورساتي» (WP-S2). درس → /lesson/$id، حجز → /booking/$id.
// مسارا التفاصيل مسجّلان بالعقد C-18. بنفرّع بـ if بدل union على `to` كي تبقى أنواع الـLink دقيقة.
import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/app/kit";
import type { StudentScheduleItemDto } from "@/integrations/backend/student";

type Tone = "muted" | "primary" | "success" | "danger";

export function ScheduleRow({
  item,
  meta,
  value,
  tone,
}: {
  item: Pick<StudentScheduleItemDto, "kind" | "id" | "topic">;
  meta: string;
  value: string;
  tone: Tone;
}) {
  const body = (
    <div className="flex items-center justify-between gap-3 py-3">
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-foreground">{item.topic}</p>
        {meta && <p className="mt-0.5 truncate text-xs text-muted-foreground">{meta}</p>}
      </div>
      <Badge tone={tone}>{value}</Badge>
    </div>
  );
  const cls = "block rounded-xl px-2 transition-colors hover:bg-accent/40";
  return item.kind === "Booking" ? (
    <Link to="/booking/$id" params={{ id: String(item.id) }} className={cls}>
      {body}
    </Link>
  ) : (
    <Link to="/lesson/$id" params={{ id: String(item.id) }} className={cls}>
      {body}
    </Link>
  );
}
