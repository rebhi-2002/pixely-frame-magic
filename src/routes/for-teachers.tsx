import { createSeoHead, localeFromSearch } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { BadgeCheck, Coins, LineChart, Upload } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PublicLayout } from "@/components/site/public-layout";
import { SessionCta } from "@/components/site/session-cta";
import { FAQSection } from "@/components/site/faq-section";
import { TestimonialsSection } from "@/components/site/testimonials-section";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/for-teachers")({
  head: (ctx) => createSeoHead("/for-teachers", localeFromSearch(ctx.match.search)),
  component: ForTeachers,
});

const benefits = [
  { icon: Upload, key: "upload" },
  { icon: LineChart, key: "analytics" },
  { icon: Coins, key: "income" },
  { icon: BadgeCheck, key: "verified" },
] as const;

function ForTeachers() {
  const { t } = useTranslation();

  return (
    <PublicLayout>
      <section className="border-b-2 border-[var(--border-strong)] bg-card">
        {" "}
        <div className="mx-auto max-w-5xl px-5 py-20">
          <h1 className="max-w-2xl text-4xl font-extrabold leading-tight text-foreground sm:text-5xl">
            {t("forTeachers.h1")}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{t("forTeachers.sub")}</p>
          <SessionCta
            to="/signup"
            label={t("forTeachers.cta")}
            className={buttonVariants({
              variant: "default",
              className: "mt-8 h-auto px-7 py-3.5 text-sm",
            })}
          />
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-16">
        <div className="space-y-3">
          {benefits.map((b, i) => (
            <div
              key={b.key}
              className={cn(
                "flex flex-col items-start gap-5 rounded-2xl border-2 border-[var(--border-strong)] bg-card p-6 shadow-[var(--shadow-brutal)] sm:flex-row sm:items-center",
                i % 2 === 1 && "sm:flex-row-reverse",
              )}
            >
              <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl border-2 border-[var(--border-strong)] bg-success/12 text-success">
                <b.icon className="size-6" />
              </span>
              <div className={cn(i % 2 === 1 && "sm:text-end")}>
                <h2 className="text-lg font-extrabold text-foreground">
                  {t(`forTeachers.benefits.${b.key}.t`)}
                </h2>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {t(`forTeachers.benefits.${b.key}.d`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <TestimonialsSection className="border-y-2 border-[var(--border-strong)] bg-card/60" />
      <FAQSection i18nKey="forTeachers.faq" />
    </PublicLayout>
  );
}
