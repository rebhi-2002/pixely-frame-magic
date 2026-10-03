// منتقي وقت البدء (WP-S1 / S1-02): يعرض أوقات البدء المتاحة لتاريخ + وضع + مدة ضمن فترات توفّر المعلم.
// داخلي لشاشة الحجز (لا عقد خارجي). المنطق بـlib/booking-slots.ts (نقي ومُختبَر).
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import type { AvailabilitySlot } from "@/integrations/backend/teachers";
import { useBi } from "@/lib/bi";
import type { DeliveryType } from "@/lib/enums";
import { filterFutureTimes, generateStartTimes, slotsForDate } from "@/lib/booking-slots";

export interface BookingSlotPickerProps {
  slots: ReadonlyArray<AvailabilitySlot>;
  mode: DeliveryType;
  /** "YYYY-MM-DD" أو فاضي لو لم يُختر بعد. */
  date: string;
  durationMinutes: number;
  /** وقت البدء المختار "HH:mm" أو فاضي. */
  value: string;
  onChange: (startTime: string) => void;
}

export function BookingSlotPicker({
  slots,
  mode,
  date,
  durationMinutes,
  value,
  onChange,
}: BookingSlotPickerProps) {
  const bi = useBi();
  const times = useMemo(
    () =>
      filterFutureTimes(date, generateStartTimes(slotsForDate(slots, date, mode), durationMinutes)),
    [slots, date, mode, durationMinutes],
  );

  if (!date) {
    return (
      <p className="text-sm text-muted-foreground">
        {bi(
          "اختر التاريخ أولاً لتظهر الأوقات المتاحة.",
          "Pick a date first to see available times.",
        )}
      </p>
    );
  }

  if (times.length === 0) {
    return (
      <p role="status" className="text-sm text-muted-foreground">
        {bi(
          "لا توجد أوقات متاحة لهذا اليوم بهذه المدة والوضع. جرّب تاريخًا أو مدة أخرى.",
          "No times are available for this day with this duration and mode. Try another date or duration.",
        )}
      </p>
    );
  }

  return (
    <div
      className="flex flex-wrap gap-2"
      role="group"
      aria-label={bi("أوقات البدء المتاحة", "Available start times")}
    >
      {times.map((time) => (
        <Button
          key={time}
          type="button"
          size="sm"
          variant={time === value ? "default" : "outline"}
          aria-pressed={time === value}
          onClick={() => onChange(time)}
        >
          {time}
        </Button>
      ))}
    </div>
  );
}
