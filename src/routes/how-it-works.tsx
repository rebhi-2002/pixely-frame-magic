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
import { PageHeader } from "@/components/site/page-header";
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
// لون بلاط الرقم من لوحة 14 (ذهبي/أزرق/صدئي) بالتناوب — تمييز بصري فقط.
const TILES = [
  "bg-[var(--brand)] text-[var(--ink)]",
  "bg-[var(--accent-2)] text-white",
  "bg-primary text-primary-foreground",
] as const;

const steps = [Search, ListChecks, ClipboardCheck, CalendarDays, Wallet, Video, Star] as const;

function HowItWorks() {
  const { t } = useTranslation();
  const next = t("howItWorks.next", { returnObjects: true }) as string[];
  const details = t("howItWorks.details", { returnObjects: true }) as string[];

  return (
    <PublicLayout>
      <PageHeader
        title={t("howItWorks.h1")}
        highlight={t("howItWorks.h1Hl")}
        sub={t("howItWorks.sub")}
      />

      <section className="mx-auto max-w-3xl px-5 py-14">
        <ol className="relative space-y-4">
          {/* خط المسار الموصل بين الخطوات — يحوّل القائمة من نص عادي إلى تدفّق
              بصري واحد، بدل سبع بطاقات منفصلة بلا رابط. */}
          <div
            aria-hidden
            className="absolute top-6 bottom-6 w-0.5 bg-[var(--border-strong)] ltr:left-[47px] rtl:right-[47px]"
          />
          {steps.map((Icon, i) => (
            <li key={i} id={`step-${i + 1}`} className="relative scroll-mt-24">
              <div className="flex gap-5 rounded-2xl border-2 border-[var(--border-strong)] bg-card p-6 shadow-[var(--shadow-brutal)]">
                <span
                  className={cn(
                    "relative z-10 flex size-12 shrink-0 items-center justify-center rounded-xl border-2 border-[var(--border-strong)] font-display text-xl font-bold shadow-[2px_2px_0_0_var(--shadow-brutal-color)]",
                    TILES[i % TILES.length],
                  )}
                >
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="inline-flex items-center gap-2 text-lg font-extrabold text-foreground">
                    <Icon className="size-4 text-primary" />
                    {t(`home.startSteps.${i}.title`)}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {t(`home.startSteps.${i}.text`)}
                  </p>
                  {details[i] && (
                    <p className="mt-2 border-t-2 border-dashed border-[var(--border-strong)]/25 pt-2 text-sm leading-relaxed text-foreground">
                      {details[i]}
                    </p>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-12 rounded-2xl border-2 border-t-[8px] border-[var(--border-strong)] border-t-[var(--brand)] bg-card p-7 shadow-[var(--shadow-brutal)]">
          <h2 className="text-xl font-extrabold text-foreground">{t("howItWorks.nextTitle")}</h2>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            {next.map((line) => (
              <li key={line} className="flex items-start gap-2.5">
                <span
                  aria-hidden
                  className="mt-1.5 size-2 shrink-0 rounded-[2px] border border-[var(--border-strong)] bg-[var(--brand)]"
                />
                {line}
              </li>
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
