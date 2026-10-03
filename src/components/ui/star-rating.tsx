// نجوم التقييم 1..5 (WP-00 — العقد C-11). props: { value, onChange?, readOnly? }.
// - مع onChange وبدون readOnly: إدخال بلوحة المفاتيح والماوس (radiogroup).
// - بدونه أو مع readOnly: عرض فقط. تُقرَّب القيمة المعروضة للأقرب (4.6 → 5 نجوم ممتلئة).
import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useBi } from "@/lib/bi";

const STARS = [1, 2, 3, 4, 5] as const;

export function StarRating({
  value,
  onChange,
  readOnly,
  className,
}: {
  value: number;
  onChange?: (v: number) => void;
  readOnly?: boolean;
  className?: string;
}) {
  const bi = useBi();
  const [hover, setHover] = useState<number | null>(null);
  const interactive = Boolean(onChange) && !readOnly;
  const safe = Number.isFinite(value) ? Math.min(5, Math.max(0, value)) : 0;
  const shown = hover ?? Math.round(safe);

  if (!interactive) {
    return (
      <span
        role="img"
        aria-label={bi(`${safe} من 5`, `${safe} out of 5`)}
        className={cn("inline-flex items-center gap-0.5", className)}
      >
        {STARS.map((n) => (
          <Star
            key={n}
            aria-hidden="true"
            className={cn(
              "size-4",
              n <= shown ? "fill-primary text-primary" : "text-muted-foreground/40",
            )}
          />
        ))}
      </span>
    );
  }

  return (
    <div
      role="radiogroup"
      aria-label={bi("التقييم", "Rating")}
      className={cn("inline-flex items-center gap-1", className)}
      onMouseLeave={() => setHover(null)}
    >
      {STARS.map((n) => (
        <button
          key={n}
          type="button"
          role="radio"
          aria-checked={Math.round(safe) === n}
          aria-label={bi(`${n} من 5`, `${n} out of 5`)}
          onClick={() => onChange?.(n)}
          onMouseEnter={() => setHover(n)}
          onFocus={() => setHover(n)}
          onBlur={() => setHover(null)}
          className="rounded p-0.5 transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Star
            aria-hidden="true"
            className={cn(
              "size-6",
              n <= shown ? "fill-primary text-primary" : "text-muted-foreground/40",
            )}
          />
        </button>
      ))}
    </div>
  );
}
