import { createSeoHead, localeFromSearch } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import {
  Search,
  ListChecks,
  ClipboardCheck,
  CalendarDays,
  Wallet,
  Video,
  Star,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { PublicLayout } from "@/components/site/public-layout";
import { SessionCta } from "@/components/site/session-cta";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/how-it-works")({
  head: (ctx) => createSeoHead("/how-it-works", localeFromSearch(ctx.match.search)),
  component: HowItWorks,
});

/* نفس رحلة الطالب الحقيقية المعروضة بالرئيسية (7 خطوات من العرض التقديمي
   الرسمي: بحث→مقارنة→اختيار→حجز→دفع→حضور→تقييم)، ونعيد استخدام نفس مفاتيح
   الترجمة home.startSteps بدل تكرار المحتوى — صفحة واحدة للحقيقة، لا نسختان
   قد تتعارضان لاحقًا. */
const steps = [Search, ListChecks, ClipboardCheck, CalendarDays, Wallet, Video, Star] as const;

function HowItWorks() {
  const { t } = useTranslation();
  const next = t("howItWorks.next", { returnObjects: true }) as string[];

  return (
    <PublicLayout>
      <section className="border-b-2 border-[var(--border-strong)] bg-card">
        <div className="mx-auto max-w-4xl px-5 py-16 text-center">
          <h1 className="text-4xl font-extrabold text-foreground">{t("howItWorks.h1")}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{t("howItWorks.sub")}</p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-16">
        <ol className="relative space-y-4">
          {/* خط المسار الموصل بين الخطوات — يحوّل القائمة من نص عادي إلى تدفّق
              بصري واحد، بدل سبع بطاقات منفصلة بلا رابط. */}
          <div
            aria-hidden
            className="absolute top-6 bottom-6 w-0.5 bg-[var(--border-strong)] ltr:left-6 rtl:right-6"
          />
          {steps.map((Icon, i) => (
            <li key={i} className="relative">
              <div className="flex gap-5 rounded-2xl border-2 border-[var(--border-strong)] bg-card p-6 shadow-[var(--shadow-brutal)]">
                <span
                  className={cn(
                    "relative z-10 flex size-12 shrink-0 items-center justify-center rounded-xl border-2 border-[var(--border-strong)] font-display text-xl font-bold",
                    i === 0
                      ? "bg-primary text-primary-foreground"
                      : "bg-background text-foreground",
                  )}
                >
                  {i + 1}
                </span>
                <div>
                  <h3 className="inline-flex items-center gap-2 text-lg font-extrabold text-foreground">
                    <Icon className="size-4 text-primary" />
                    {t(`home.startSteps.${i}.title`)}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {t(`home.startSteps.${i}.text`)}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-12 rounded-2xl border-2 border-[var(--border-strong)] bg-card p-7 shadow-[var(--shadow-brutal)]">
          <h2 className="text-xl font-extrabold text-foreground">{t("howItWorks.nextTitle")}</h2>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            {next.map((line) => (
              <li key={line}>• {line}</li>
            ))}
          </ul>
          <SessionCta
            to="/signup"
            label={t("howItWorks.cta")}
            className={buttonVariants({
              variant: "default",
              className: "mt-7 h-auto px-6 py-3 text-sm",
            })}
          />
        </div>
      </section>
    </PublicLayout>
  );
}
