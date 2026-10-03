// تبويبات مقسّمة (WP-00 — العقد C-12) — لا يوجد Tabs بالمشروع. تتحكم بها الأم بالكامل:
// props: { value, onChange, items: {value, label, disabled?}[] }. بدون محتوى: الأم بتعرض
// اللوحة المناسبة بنفسها. تنقّل بالأسهم (RTL-aware عبر الاتجاه المنطقي للمتصفح).
import { useRef } from "react";
import { cn } from "@/lib/utils";

export interface SegmentedTabItem {
  value: string;
  label: string;
  disabled?: boolean;
}

export function SegmentedTabs({
  value,
  onChange,
  items,
  className,
  ariaLabel,
}: {
  value: string;
  onChange: (v: string) => void;
  items: SegmentedTabItem[];
  className?: string;
  ariaLabel?: string;
}) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  function move(from: number, step: 1 | -1) {
    const enabled = items.map((it, i) => (it.disabled ? -1 : i)).filter((i) => i >= 0);
    if (enabled.length === 0) return;
    const pos = enabled.indexOf(from);
    const next = enabled[(pos + step + enabled.length) % enabled.length];
    onChange(items[next].value);
    refs.current[next]?.focus();
  }

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={cn(
        "inline-flex max-w-full items-center gap-1 overflow-x-auto rounded-xl border border-border bg-secondary/30 p-1",
        className,
      )}
    >
      {items.map((item, i) => {
        const selected = item.value === value;
        return (
          <button
            key={item.value}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="tab"
            aria-selected={selected}
            tabIndex={selected ? 0 : -1}
            disabled={item.disabled}
            onClick={() => onChange(item.value)}
            onKeyDown={(e) => {
              const rtl = typeof document !== "undefined" && document.dir === "rtl";
              if (e.key === "ArrowRight") move(i, rtl ? -1 : 1);
              else if (e.key === "ArrowLeft") move(i, rtl ? 1 : -1);
              else return;
              e.preventDefault();
            }}
            className={cn(
              "shrink-0 whitespace-nowrap rounded-lg px-3.5 py-1.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              selected
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:bg-accent/40 hover:text-foreground",
              item.disabled && "cursor-not-allowed opacity-50 hover:bg-transparent",
            )}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
