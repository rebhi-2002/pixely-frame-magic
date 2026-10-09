import { createSeoHead, localeFromSearch } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import {
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
import { PageHeader } from "@/components/site/page-header";
import { SessionCta } from "@/components/site/session-cta";
import { FAQSection } from "@/components/site/faq-section";
import { TestimonialsSection } from "@/components/site/testimonials-section";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/for-parents")({
  head: (ctx) => createSeoHead("/for-parents", localeFromSearch(ctx.match.search)),
  component: ForParents,
});

// بلاط الأيقونات من لوحة 14 (ذهبي/أزرق/صدئي) بالتناوب — تمييز بصري فقط.
const TILES = [
  "bg-[var(--brand)] text-[var(--ink)]",
  "bg-[var(--accent-2)] text-white",
  "bg-primary text-primary-foreground",
] as const;
const TILE_FRAME =
  "flex shrink-0 items-center justify-center border-2 border-[var(--border-strong)] shadow-[2px_2px_0_0_var(--shadow-brutal-color)]";

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
      <PageHeader
        title={t("forParents.h1")}
        highlight={t("forParents.h1b")}
        sub={t("forParents.sub")}
      >
        <SessionCta
          to="/signup"
          label={t("forParents.cta")}
          className={buttonVariants({
            variant: "default",
            className: "mt-8 h-auto px-7 py-3.5 text-sm",
          })}
        />
      </PageHeader>

      {/* كيف يُربط ابنك بحسابك — FR-P09/FR-P10: الربط من الإدارة، لا ذاتيًا،
          نوضّحه كخطوة مصمَّمة مقصودة لا نقصًا تقنيًا. */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="text-2xl font-extrabold text-foreground">{t("forParents.linkingTitle")}</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">{t("forParents.linkingSub")}</p>

        <ol className="relative mt-10 max-w-3xl space-y-4">
          <div
            aria-hidden
            className="absolute top-6 bottom-6 w-0.5 bg-[var(--border-strong)] ltr:left-[47px] rtl:right-[47px]"
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
                    TILE_FRAME,
                    "relative z-10 size-12 rounded-xl font-display text-xl font-bold",
                    TILES[i % TILES.length],
                  )}
                >
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
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
      <section className="band-sky border-y-2 border-[var(--border-strong)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 lg:grid-cols-2 lg:items-center">
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
                    <span className={cn(TILE_FRAME, "size-9 rounded-lg", TILES[i % TILES.length])}>
                      <Icon className="size-4" />
                    </span>
                    <div>
                      <p className="text-sm font-extrabold text-foreground">{item.t}</p>
                      <p className="text-[13px] leading-relaxed text-muted-foreground">{item.d}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="rounded-2xl border-2 border-[var(--border-strong)] bg-card p-5 shadow-[var(--shadow-brutal)]">
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
                  className="rounded-xl border-2 border-[var(--border-strong)] bg-background p-3"
                >
                  <Icon className="size-4 text-primary" />
                  <div className="mx-auto mt-2 h-2 w-10 rounded-full bg-primary/30" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* الحضور والامتحانات بالتفصيل — FR-P04/FR-P05: تفصيل لعنصرَي نسبة الحضور ومتوسط الامتحانات أعلاه */}
        <div className="mx-auto max-w-6xl px-5 pb-16">
          <div className="grid gap-4 md:grid-cols-2">
            {(
              [
                { icon: CalendarCheck, title: "attendanceTitle", sub: "attendanceSub" },
                { icon: Award, title: "examsTitle", sub: "examsSub" },
              ] as const
            ).map((c, i) => (
              <div
                key={c.title}
                className={cn(
                  "rounded-2xl border-2 border-t-[8px] border-[var(--border-strong)] bg-card p-6 shadow-[var(--shadow-brutal)]",
                  i === 0 ? "border-t-[var(--brand)]" : "border-t-[var(--accent-2)]",
                )}
              >
                <span className={cn(TILE_FRAME, "size-11 rounded-xl", TILES[i % TILES.length])}>
                  <c.icon className="size-5" />
                </span>
                <h3 className="mt-4 text-lg font-extrabold text-foreground">
                  {t(`forParents.${c.title}`)}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {t(`forParents.${c.sub}`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ضمان القراءة فقط — FR-P12، مؤطَّر كضمان ثقة لا كقيد */}
      <section className="scope-ink relative overflow-hidden border-y-2 border-[var(--border-strong)]">
        <div aria-hidden className="stripe-tri absolute inset-x-0 bottom-0" />
        <div className="mx-auto flex max-w-6xl items-start gap-5 px-5 py-14">
          <span
            className={cn(TILE_FRAME, "size-14 rounded-2xl bg-[var(--brand)] text-[var(--ink)]")}
          >
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

      <TestimonialsSection className="border-y-2 border-[var(--border-strong)] bg-card/60" />
      <FAQSection i18nKey="forParents.faq" />
    </PublicLayout>
  );
}
