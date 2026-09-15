import type { ElementType, ReactNode } from "react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { cn } from "@/lib/utils";

/**
 * لغة حركة الدخول (entrance motion) — 3 أنماط مسمّاة بس، مو أرقام حرة بكل
 * ملف. كل نمط مرتبط بنوع المحتوى (نية الاستخدام) مش اختيار عشوائي:
 *
 * - "content"  (افتراضي): بطاقات/أقسام مستقلة (مزايا، تدوينات، خطوات).
 *   انزلاق واضح (24px) ومدة كاملة (0.7s) — المحتوى نفسه هو نقطة التركيز.
 * - "stat"     : بطاقات أرقام/إحصائيات (AnimatedCounter). انزلاق أخف
 *   (12px) ومدة أقصر (0.5s) عمدًا — الرقم نفسه عم "يعد" بصريًا أصلاً،
 *   فحركة دخول قوية زيادة بتنافس الانتباه بدل ما تخدمه.
 * - "compact"  : عناصر شبكة صغيرة/كثيرة (تايلز لوحة تحكم مضغوطة). انزلاق
 *   ومدة بينية (16px / 0.55s) — أخف من content لأنها أصغر حجمًا وأكتر عددًا،
 *   فحركة كاملة الحجم بتصير مزعجة ومكررة بسرعة.
 *
 * القاعدة: أضف نمط جديد هون فقط لو نوع محتوى فعليًا مختلف محتاجه — مش رقم
 * حر بملف الصفحة. هيك الحركة تبقى نظام موحّد قابل للصيانة، مو تنويع عشوائي.
 */
const REVEAL_VARIANTS = {
  content: { y: 24, duration: 0.7 },
  stat: { y: 12, duration: 0.5 },
  compact: { y: 16, duration: 0.55 },
} as const;

export type RevealVariant = keyof typeof REVEAL_VARIANTS;

type RevealProps = {
  children: ReactNode;
  /** العنصر HTML المستخدم (div افتراضياً) */
  as?: ElementType;
  className?: string;
  /** تأخير بالثواني — استخدمه يدوياً لتتابع بطاقات (0, 0.08, 0.16...) */
  delay?: number;
  /** نمط الحركة المسمّى — يحدد y وduration معًا. راجع REVEAL_VARIANTS أعلاه.
   * افتراضي "content" (نفس السلوك القديم تمامًا). */
  variant?: RevealVariant;
  /** تجاوز يدوي نادر لحالة استثنائية فعلية — يتفوّق على variant لو انحط.
   * تجنّبه إلا لضرورة؛ فضّل إضافة variant جديد بدل رقم حر متكرر. */
  y?: number;
  duration?: number;
};

/**
 * <Reveal> — غلاف لأي محتوى ليظهر بأنيميشن fade+slide عند وصول المستخدم إليه بالسكرول.
 * مثال للتتابع:
 *   {items.map((item, i) => (
 *     <Reveal key={item.id} delay={i * 0.08}><Card>...</Card></Reveal>
 *   ))}
 * مثال ببطاقة إحصائية:
 *   <Reveal variant="stat" delay={i * 0.08}><StatCard .../></Reveal>
 */
export function Reveal({
  children,
  as: Tag = "div",
  className,
  delay,
  variant = "content",
  y,
  duration,
}: RevealProps) {
  const preset = REVEAL_VARIANTS[variant];
  const ref = useScrollReveal<HTMLDivElement>({
    delay,
    y: y ?? preset.y,
    duration: duration ?? preset.duration,
  });
  return (
    <Tag ref={ref} className={cn(className)}>
      {children}
    </Tag>
  );
}
