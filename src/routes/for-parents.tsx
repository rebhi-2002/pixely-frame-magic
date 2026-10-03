import { createSeoHead, localeFromSearch } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import {
  BarChart3,
  Lock,
  Users2,
  BellRing,
  UserPlus,
  Link2,
  LayoutDashboard,
  GraduationCap,
  Percent,
  Award,
  Bell,
  CalendarCheck,
  ShieldCheck,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { PublicLayout } from "@/components/site/public-layout";
import { SessionCta } from "@/components/site/session-cta";
import { FAQSection } from "@/components/site/faq-section";
import { TestimonialsSection } from "@/components/site/testimonials-section";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/for-parents")({
  head: (ctx) => createSeoHead("/for-parents", localeFromSearch(ctx.match.search)),
  component: ForParents,
});

const benefits = [
  { icon: BarChart3, key: "report" },
  { icon: Lock, key: "privacy" },
  { icon: Users2, key: "multiKids" },
  { icon: BellRing, key: "alerts" },
] as const;

const linkingIcons = [UserPlus, Link2, LayoutDashboard] as const;

const overviewIcons = [GraduationCap, Percent, Award, Bell] as const;

function ForParents() {
  const { t } = useTranslation();
  const linkingSteps = t("forParents.linkingSteps", { returnObjects: true }) as {
    t: string;
    d: string;
  }[];
  const overviewItems = t("forParents.overviewItems", { returnObjects: true }) as {
    t: string;
    d: string;
  }[];

  return (
    <PublicLayout>
      <section className="border-b-2 border-[var(--border-strong)] bg-card">
        <div className="mx-auto max-w-5xl px-5 py-20">
          <h1 className="max-w-2xl text-4xl font-extrabold leading-tight text-foreground sm:text-5xl">
            {t("forParents.h1")}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{t("forParents.sub")}</p>
          <SessionCta
            to="/signup"
            label={t("forParents.cta")}
            className={buttonVariants({
              variant: "default",
              className: "mt-8 h-auto px-7 py-3.5 text-sm",
            })}
          />
        </div>
      </section>

      {/* كيف يُربط ابنك بحسابك — FR-P09/FR-P10: الربط من الإدارة، لا ذاتيًا،
          نوضّحه كخطوة مصمَّمة مقصودة لا نقصًا تقنيًا. */}
      <section className="mx-auto max-w-4xl px-5 py-16">
        <h2 className="text-2xl font-extrabold text-foreground">{t("forParents.linkingTitle")}</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">{t("forParents.linkingSub")}</p>

        <ol className="relative mt-10 space-y-4">
          <div
            aria-hidden
            className="absolute top-6 bottom-6 w-0.5 bg-[var(--border-strong)] ltr:left-6 rtl:right-6"
          />
          {linkingSteps.map((step, i) => {
            const Icon = linkingIcons[i];
            return (
              <li
                key={step.t}
                className="relative flex gap-5 rounded-2xl border-2 border-[var(--border-strong)] bg-card p-6 shadow-[var(--shadow-brutal)]"
              >
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
                  <h3 className="inline-flex items-center gap-2 text-base font-extrabold text-foreground">
                    <Icon className="size-4 text-primary" />
                    {step.t}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{step.d}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      {/* النظرة العامة — FR-P03/P06/P07/P11/P13. معاينة حقيقية بـHTML/CSS
          (لا صورة، لا SVG زخرفي) توضّح البنية الفعلية، بلا أي رقم مختلق. */}
      <section className="border-y-2 border-[var(--border-strong)] bg-card/60">
        <div className="mx-auto grid max-w-5xl gap-10 px-5 py-16 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <h2 className="text-2xl font-extrabold text-foreground">
              {t("forParents.overviewTitle")}
            </h2>
            <p className="mt-2 text-muted-foreground">{t("forParents.overviewSub")}</p>
            <ul className="mt-6 space-y-4">
              {overviewItems.map((item, i) => {
                const Icon = overviewIcons[i];
                return (
                  <li key={item.t} className="flex items-start gap-3">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border-2 border-[var(--border-strong)] bg-primary/12 text-primary">
                      <Icon className="size-4" />
                    </span>
                    <div>
                      <p className="text-sm font-bold text-foreground">{item.t}</p>
                      <p className="text-xs text-muted-foreground">{item.d}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="rounded-2xl border-2 border-[var(--border-strong)] bg-background p-5 shadow-[var(--shadow-brutal)]">
            <div className="flex items-center justify-between border-b-2 border-[var(--border-strong)]/30 pb-3">
              <div className="h-3 w-24 rounded-full bg-secondary" />
              <span className="flex size-8 items-center justify-center rounded-full border-2 border-[var(--border-strong)] bg-secondary text-muted-foreground">
                <Bell className="size-4" />
              </span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {overviewIcons.slice(1).map((Icon, i) => (
                <div
                  key={i}
                  className="rounded-xl border-2 border-[var(--border-strong)] bg-card p-3"
                >
                  <Icon className="size-4 text-primary" />
                  <div className="mx-auto mt-2 h-2 w-10 rounded-full bg-primary/30" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* الحضور والامتحانات بالتفصيل — FR-P04/FR-P05 */}
      <section className="mx-auto max-w-5xl px-5 py-16">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border-2 border-[var(--border-strong)] bg-card p-6 shadow-[var(--shadow-brutal)]">
            <span className="flex size-11 items-center justify-center rounded-xl border-2 border-[var(--border-strong)] bg-primary/12 text-primary">
              <CalendarCheck className="size-5" />
            </span>
            <h3 className="mt-4 text-lg font-extrabold text-foreground">
              {t("forParents.attendanceTitle")}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              {t("forParents.attendanceSub")}
            </p>
          </div>
          <div className="rounded-2xl border-2 border-[var(--border-strong)] bg-card p-6 shadow-[var(--shadow-brutal)]">
            <span className="flex size-11 items-center justify-center rounded-xl border-2 border-[var(--border-strong)] bg-primary/12 text-primary">
              <Award className="size-5" />
            </span>
            <h3 className="mt-4 text-lg font-extrabold text-foreground">
              {t("forParents.examsTitle")}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              {t("forParents.examsSub")}
            </p>
          </div>
        </div>
      </section>

      {/* ضمان القراءة فقط — FR-P12، مؤطَّر كضمان ثقة لا كقيد */}
      <section className="border-y-2 border-[var(--border-strong)] bg-primary/8">
        <div className="mx-auto flex max-w-4xl items-start gap-5 px-5 py-14">
          <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl border-2 border-[var(--border-strong)] bg-background text-success">
            <ShieldCheck className="size-7" />
          </span>
          <div>
            <h2 className="text-xl font-extrabold text-foreground">
              {t("forParents.readOnlyTitle")}
            </h2>
            <p className="mt-2 max-w-2xl leading-relaxed text-muted-foreground">
              {t("forParents.readOnlySub")}
            </p>
          </div>
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
              <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl border-2 border-[var(--border-strong)] bg-info/12 text-info">
                <b.icon className="size-6" />
              </span>
              <div className={cn(i % 2 === 1 && "sm:text-end")}>
                <h2 className="text-lg font-extrabold text-foreground">
                  {t(`forParents.benefits.${b.key}.t`)}
                </h2>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {t(`forParents.benefits.${b.key}.d`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <TestimonialsSection className="border-y-2 border-[var(--border-strong)] bg-card/60" />
      <FAQSection i18nKey="forParents.faq" />
    </PublicLayout>
  );
}
