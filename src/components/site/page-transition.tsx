import { useEffect, useState, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";

/**
 * انتقال ناعم بين الصفحات (الهيدر/الفوتر) بدل التغيير المفاجئ.
 * يُلغى تلقائياً عند prefers-reduced-motion عبر styles.css.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [shown, setShown] = useState(pathname);
  const [phase, setPhase] = useState<"in" | "out">("in");

  useEffect(() => {
    if (pathname === shown) return;
    setPhase("out");
    const id = window.setTimeout(() => {
      setShown(pathname);
      setPhase("in");
    }, 170);
    return () => window.clearTimeout(id);
  }, [pathname, shown]);

  return (
    <div className="route-fade" data-phase={phase}>
      {children}
    </div>
  );
}
