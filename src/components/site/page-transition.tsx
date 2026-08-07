import type { ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";

/**
 * انتقال ناعم بين الصفحات بدل التغيير المفاجئ.
 * يُلغى تلقائياً عند prefers-reduced-motion عبر styles.css.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div key={pathname} className="route-fade">
      {children}
    </div>
  );
}
