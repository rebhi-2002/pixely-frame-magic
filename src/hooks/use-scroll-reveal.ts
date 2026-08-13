import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type RevealOptions = {
  /** تأخير الحركة بالثواني — مفيد لتتابع البطاقات (stagger يدوي) */
  delay?: number;
  /** المسافة الرأسية التي يتحرك منها العنصر (px) */
  y?: number;
  /** مدة الحركة بالثواني */
  duration?: number;
  /** تعطيل الأنيميشن (مثلاً لعنصر داخل قائمة طويلة جداً) */
  disabled?: boolean;
};

/**
 * useScrollReveal — يكشف العنصر بأنيميشن fade+slide عند دخوله الشاشة عبر GSAP ScrollTrigger.
 * يحترم prefers-reduced-motion تلقائياً (العنصر يبقى ظاهراً بدون حركة).
 * يعتمد على data-reveal / data-revealed في styles.css كحالة أولية بدون وميض (FOUC).
 */
export function useScrollReveal<T extends HTMLElement>(options: RevealOptions = {}) {
  const ref = useRef<T | null>(null);
  const { delay = 0, y = 24, duration = 0.7, disabled = false } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el || disabled) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      el.setAttribute("data-revealed", "true");
      return;
    }

    el.setAttribute("data-reveal", "");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: "power3.out",
          onStart: () => el.setAttribute("data-revealed", "true"),
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        },
      );
    }, el);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}
