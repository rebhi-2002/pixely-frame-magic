import { createSeoHead, localeFromSearch } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";
import { BadgeCheck, Coins, LineChart, Upload } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PublicLayout } from "@/components/site/public-layout";
import { SessionCta } from "@/components/site/session-cta";
import { FAQSection } from "@/components/site/faq-section";
import { TestimonialsSection } from "@/components/site/testimonials-section";
import { Reveal } from "@/components/ui/reveal";
import { ContentFlowIllustration } from "@/components/site/illustrations";
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
      <section className="surface-mesh-quiet border-b border-border">
        <div className="mx-auto max-w-5xl px-5 py-20">
          <h1 className="max-w-2xl text-4xl font-bold leading-tight text-foreground sm:text-5xl">
            {t("forTeachers.h1")}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{t("forTeachers.sub")}</p>
          <SessionCta
            to="/signup"
            label={t("forTeachers.cta")}
            className="btn-shine glow-primary hover-press mt-8 inline-flex rounded-xl bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground"
          />
          <ContentFlowIllustration className="mt-12 h-28 w-full max-w-xl" />
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-16">
        <div className="space-y-3">
          {benefits.map((b, i) => (
            <Reveal key={b.key} delay={i * 0.06}>
              <div
                className={cn(
                  "shadow-elevation-1 flex flex-col items-start gap-5 rounded-2xl border border-border bg-card p-6 sm:flex-row sm:items-center",
                  i % 2 === 1 && "sm:flex-row-reverse",
                )}
              >
                <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-success/12 text-success">
                  <b.icon className="size-6" />
                </span>
                <div className={cn(i % 2 === 1 && "sm:text-end")}>
                  <h2 className="text-lg font-bold text-foreground">
                    {t(`forTeachers.benefits.${b.key}.t`)}
                  </h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {t(`forTeachers.benefits.${b.key}.d`)}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <TestimonialsSection className="border-y border-border bg-card/40" />
      <FAQSection i18nKey="forTeachers.faq" />
    </PublicLayout>
  );
}
