import { createFileRoute, Link } from "@tanstack/react-router";
import { BadgeCheck, Coins, LineChart, Upload } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PublicLayout } from "@/components/site/public-layout";
import { SessionCta } from "@/components/site/session-cta";
import { FAQSection } from "@/components/site/faq-section";
import { TestimonialsSection } from "@/components/site/testimonials-section";
import { Reveal } from "@/components/ui/reveal";

const title = "للمعلمين | انشر محتواك واربح مع أكاديميا";
const description =
  "ارفع محتواك التعليمي، جهّز بنوك أسئلة، تابع أداء طلابك بتحليلات دقيقة، واحصل على دخل من اشتراكات المنصة.";

export const Route = createFileRoute("/for-teachers")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
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
      <section className="surface-mesh border-b border-border">
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
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-4 px-5 py-16 md:grid-cols-2">
        {benefits.map((b, i) => (
          <Reveal key={b.key} delay={i * 0.06}>
            <article className="hover-lift shadow-elevation-1 h-full rounded-2xl border border-border bg-card p-6">
              <span className="flex size-11 items-center justify-center rounded-xl bg-success/12 text-success">
                <b.icon className="size-5" />
              </span>
              <h2 className="mt-4 text-base font-bold text-foreground">
                {t(`forTeachers.benefits.${b.key}.t`)}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {t(`forTeachers.benefits.${b.key}.d`)}
              </p>
            </article>
          </Reveal>
        ))}
      </section>

      <TestimonialsSection className="border-y border-border bg-card/40" />
      <FAQSection i18nKey="forTeachers.faq" />
    </PublicLayout>
  );
}
