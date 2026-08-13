import type { ElementType, ReactNode } from "react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  /** العنصر HTML المستخدم (div افتراضياً) */
  as?: ElementType;
  className?: string;
  /** تأخير بالثواني — استخدمه يدوياً لتتابع بطاقات (0, 0.08, 0.16...) */
  delay?: number;
  y?: number;
  duration?: number;
};

/**
 * <Reveal> — غلاف لأي محتوى ليظهر بأنيميشن fade+slide عند وصول المستخدم إليه بالسكرول.
 * مثال للتتابع:
 *   {items.map((item, i) => (
 *     <Reveal key={item.id} delay={i * 0.08}><Card>...</Card></Reveal>
 *   ))}
 */
export function Reveal({ children, as: Tag = "div", className, delay, y, duration }: RevealProps) {
  const ref = useScrollReveal<HTMLDivElement>({ delay, y, duration });
  return (
    <Tag ref={ref} className={cn(className)}>
      {children}
    </Tag>
  );
}
