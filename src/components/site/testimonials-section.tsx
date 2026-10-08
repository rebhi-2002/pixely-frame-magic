import { Quote } from "lucide-react";
import { useTranslation } from "react-i18next";
import { testimonials } from "@/content/testimonials";
import { useBi } from "@/lib/bi";

/**
 * TestimonialsSection — "قصص الطلاب والمعلّمين".
 * بدون آراء حقيقية (src/content/testimonials.ts فاضي): شريط مضغوط صادق بشارة
 * "قريباً" — لا اقتباس ولا اسم مُختلق. أول ما تنضاف آراء حقيقية يعرضها كبطاقات تلقائيًا.
 */
const QUOTE_TILE =
  "grid size-12 shrink-0 place-items-center rounded-xl border-2 border-[var(--border-strong)] bg-[var(--brand)] text-[var(--ink)] shadow-[2px_2px_0_0_var(--shadow-brutal-color)]";

export function TestimonialsSection({ className }: { className?: string }) {
  const { t } = useTranslation();
  const bi = useBi();

  return (
    <section className={className}>
      <div className="mx-auto max-w-6xl px-5 py-12">
        {testimonials.length === 0 ? (
          <div className="flex flex-wrap items-center gap-x-5 gap-y-4 rounded-2xl border-2 border-[var(--border-strong)] bg-background p-5 shadow-[4px_4px_0_0_var(--shadow-brutal-color)] sm:p-6">
            <span className={QUOTE_TILE}>
              <Quote aria-hidden="true" className="size-5" />
            </span>
            <div className="min-w-0 flex-1 basis-60">
              <h2 className="text-xl font-extrabold text-foreground">{t("testimonials.title")}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{t("testimonials.sub")}</p>
            </div>
            <span className="rounded-full border-2 border-[var(--border-strong)] bg-card px-3.5 py-1 text-xs font-bold text-foreground">
              {t("testimonials.badge")}
            </span>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-extrabold text-foreground sm:text-3xl">
              {t("testimonials.title")}
            </h2>
            <ul className="mt-8 grid gap-6 md:grid-cols-3">
              {testimonials.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-col rounded-2xl border-2 border-[var(--border-strong)] bg-background p-6 shadow-[4px_4px_0_0_var(--shadow-brutal-color)]"
                >
                  <span className={QUOTE_TILE}>
                    <Quote aria-hidden="true" className="size-5" />
                  </span>
                  <blockquote className="mt-4 text-sm leading-relaxed text-foreground">
                    {bi(item.quote, item.quoteEn)}
                  </blockquote>
                  <p className="mt-auto pt-5 text-sm font-bold text-foreground">
                    {bi(item.name, item.nameEn)}
                    <span className="ms-2 font-semibold text-muted-foreground">
                      {t(`home.roles.${item.role}.t`)}
                    </span>
                  </p>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </section>
  );
}
