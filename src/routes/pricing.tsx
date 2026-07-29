import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PublicLayout } from "@/components/site/public-layout";

const title = "الأسعار | أكاديميا مجاناً أو بريميوم";
const description =
  "ابدأ مجاناً بالمكتبة والمجتمعات ومتابعة الإنجاز، أو اشترك ببريميوم لمحاكي الامتحان الوزاري وبنك الأخطاء والتقارير.";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Pricing,
});

const plans = [
  { key: "free", highlight: false },
  { key: "plus", highlight: true },
] as const;

function Pricing() {
  const { t } = useTranslation();

  return (
    <PublicLayout>
      <section className="surface-grid border-b border-border">
        <div className="mx-auto max-w-4xl px-5 py-16 text-center">
          <h1 className="text-4xl font-bold text-foreground">{t("pricing.h1")}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{t("pricing.sub")}</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-4xl gap-5 px-5 py-16 md:grid-cols-2">
        {plans.map((p) => {
          const features = t(`pricing.${p.key}.features`, { returnObjects: true }) as string[];
          return (
            <div
              key={p.key}
              className={`flex flex-col rounded-2xl border p-7 ${
                p.highlight ? "glow-primary border-primary/50 bg-card" : "border-border bg-card/60"
              }`}
            >
              {p.highlight && (
                <span className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1 text-xs font-bold text-primary">
                  <Sparkles className="size-3.5" />
                  {t("pricing.plus.badge")}
                </span>
              )}
              <h2 className="text-xl font-bold text-foreground">{t(`pricing.${p.key}.name`)}</h2>
              <p className="mt-3 flex items-baseline gap-2">
                <span className="font-display text-4xl font-bold text-foreground">
                  {t(`pricing.${p.key}.price`)}
                </span>
                <span className="text-sm text-muted-foreground">
                  {t("pricing.currency")} / {t(`pricing.${p.key}.note`)}
                </span>
              </p>
              <ul className="mt-6 flex-1 space-y-3">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <Check className="mt-0.5 size-4 shrink-0 text-success" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/auth"
                className={`mt-7 inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-bold transition-opacity hover:opacity-90 ${
                  p.highlight
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-background text-foreground"
                }`}
              >
                {t(`pricing.${p.key}.cta`)}
              </Link>
            </div>
          );
        })}
      </section>
    </PublicLayout>
  );
}
