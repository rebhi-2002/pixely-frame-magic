import { MessageCircleHeart, Quote } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Reveal } from "@/components/ui/reveal";

/**
 * TestimonialsSection — قسم "آراء" توضيحي بانتظار محتوى حقيقي من مستخدمين فعليين.
 * لا يحتوي على أي اقتباس أو اسم مُختلق؛ بطاقات skeleton صريحة + شارة "قريباً".
 * عند توفر آراء حقيقية، استبدل هذا المكون ببطاقات فعلية (نفس تركيب Card الحالي).
 */
export function TestimonialsSection({ className }: { className?: string }) {
  const { t } = useTranslation();

  return (
    <section className={className}>
      <div className="mx-auto max-w-5xl px-5 py-16 text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/12 px-4 py-1.5 text-sm font-bold text-primary">
            <MessageCircleHeart className="size-4" />
            {t("testimonials.badge")}
          </span>
          <h2 className="mt-4 text-2xl font-bold text-foreground sm:text-3xl">
            {t("testimonials.title")}
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
            {t("testimonials.sub")}
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="flex h-full flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-card/40 p-8">
                <Quote className="size-6 text-muted-foreground/50" />
                <p className="text-xs text-muted-foreground">{t("testimonials.placeholder")}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
