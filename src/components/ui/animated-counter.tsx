import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * AnimatedCounter — يصعّد رقم من 0 للقيمة المستهدفة بأنيميشن GSAP لما يظهر بالشاشة.
 * يدعم بادئة/لاحقة (%، +، إلخ) ويحترم prefers-reduced-motion (يعرض القيمة النهائية مباشرة).
 */
export function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  duration = 1.1,
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      el.textContent = `${prefix}${value}${suffix}`;
      return;
    }

    const counter = { n: 0 };
    const tween = gsap.to(counter, {
      n: value,
      duration,
      ease: "power2.out",
      onUpdate: () => {
        el.textContent = `${prefix}${Math.round(counter.n)}${suffix}`;
      },
    });

    return () => {
      tween.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}
