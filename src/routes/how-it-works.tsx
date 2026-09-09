import { createSeoHead, localeFromSearch } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { PublicLayout } from "@/components/site/public-layout";
import { SessionCta } from "@/components/site/session-cta";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

const title = "كيف تعمل أكاديميا؟ | خطوات البداية";
const description =
  "أربع خطوات فقط: سجّل واختر دورك، حدّد نظامك وصفك وموادك، ابدأ من المكتبة المرتّبة، وتابع إنجازك أسبوعياً.";

export const Route = createFileRoute("/how-it-works")({
  head: (ctx) => createSeoHead("/how-it-works", localeFromSearch(ctx.match.search)),
  component: HowItWorks,
});

/* القسم 08 — أرقام عربية غربية */
const steps = ["role", "system", "subjects", "goal"] as const;

function HowItWorks() {
  const { t } = useTranslation();
  const next = t("howItWorks.next", { returnObjects: true }) as string[];

  return (
    <PublicLayout>
      <section className="surface-mesh border-b border-border">
        <div className="mx-auto max-w-4xl px-5 py-16 text-center">
          <h1 className="text-4xl font-bold text-foreground">{t("howItWorks.h1")}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{t("howItWorks.sub")}</p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-16">
        <ol className="relative space-y-4">
          {/* خط المسار الموصل بين الخطوات — يحوّل القائمة من نص عادي إلى تدفّق
              بصري واحد، بدل أربع بطاقات منفصلة بلا رابط. */}
          <div
            aria-hidden
            className="absolute top-6 bottom-6 w-0.5 bg-border ltr:left-6 rtl:right-6"
          />
          {steps.map((s, i) => (
            <Reveal key={s} as="li" delay={i * 0.08} className="relative">
              <div className="shadow-elevation-1 flex gap-5 rounded-2xl border border-border bg-card p-6">
                {/* بدون hover-lift: خطوة معلوماتية بمسار ثابت، مش عنصر قابل للنقر. */}
                <span
                  className={cn(
                    "relative z-10 flex size-12 shrink-0 items-center justify-center rounded-xl font-display text-xl font-bold",
                    i === 0 ? "bg-primary text-primary-foreground" : "bg-primary/12 text-primary",
                  )}
                >
                  {i + 1}
                </span>
                <div>
                  <h2 className="text-lg font-bold text-foreground">
                    {t(`howItWorks.steps.${s}.t`)}
                  </h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {t(`howItWorks.steps.${s}.d`)}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={0.15}>
          <div className="shadow-elevation-2 mt-12 rounded-2xl border border-border bg-card/50 p-7">
            <h2 className="text-xl font-bold text-foreground">{t("howItWorks.nextTitle")}</h2>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              {next.map((line) => (
                <li key={line}>• {line}</li>
              ))}
            </ul>
            <SessionCta
              to="/signup"
              label={t("howItWorks.cta")}
              className="btn-shine hover-press mt-7 inline-flex rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground"
            />
          </div>
        </Reveal>
      </section>
    </PublicLayout>
  );
}
