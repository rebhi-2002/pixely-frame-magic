import { useEffect, useState } from "react";

/** useScrolled — true بمجرد ما يتجاوز المستخدم عتبة السكرول المحددة (افتراضياً 24px). */
export function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return scrolled;
}
