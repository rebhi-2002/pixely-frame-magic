import { createFileRoute, Link } from "@tanstack/react-router";
import { Compass, HeartHandshake, Languages, Target } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PublicLayout } from "@/components/site/public-layout";
import { SessionCta } from "@/components/site/session-cta";
import { Reveal } from "@/components/ui/reveal";
import { useSession } from "@/hooks/use-session";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "من نحن | أكاديميا" },
      {
        name: "description",
        content:
          "قصة أكاديميا: فريق عربي يبني منصة تنظيم وإنجاز لطلاب الثانوية بدل فوضى مجموعات الواتساب.",
      },
      { property: "og:title", content: "من نحن | أكاديميا" },
      {
        property: "og:description",
        content:
          "قصة أكاديميا ومهمتنا وقيمنا: الوضوح، خصوصية الطالب، عربي أولاً، وإنجاز قابل للقياس.",
      },
    ],
  }),
  component: AboutPage,
});

const valueIcons = [Compass, HeartHandshake, Languages, Target];

function AboutPage() {
  const { t } = useTranslation();
  const { isSignedIn } = useSession();
  const values = t("about.values", { returnObjects: true }) as { t: string; d: string }[];
  const team = t("about.team", { returnObjects: true }) as { t: string; d: string }[];

  return (
    <PublicLayout>
      <section className="surface-mesh border-b border-border">
        <div className="mx-auto max-w-4xl px-5 py-20">
          <h1 className="text-4xl font-bold leading-[1.25] text-foreground md:text-5xl">
            {t("about.h1")}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{t("about.sub")}</p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-16">
        <h2 className="text-2xl font-bold text-foreground">{t("about.missionTitle")}</h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">{t("about.mission")}</p>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {values.map((v, i) => {
            const Icon = valueIcons[i % valueIcons.length];
            return (
              <Reveal key={v.t} delay={i * 0.06}>
                <article className="hover-lift shadow-elevation-1 h-full rounded-2xl border border-border bg-card p-6">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-primary/12 text-primary">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-4 font-bold text-foreground">{v.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.d}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="border-y border-border bg-card/40">
        <div className="mx-auto max-w-4xl px-5 py-16">
          <h2 className="text-2xl font-bold text-foreground">{t("about.teamTitle")}</h2>
          <p className="mt-2 text-muted-foreground">{t("about.teamSub")}</p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {team.map((m, i) => (
              <Reveal key={m.t} delay={i * 0.06}>
                <div className="shadow-elevation-1 h-full rounded-2xl border border-border bg-background p-6">
                  <h3 className="font-bold text-foreground">{m.t}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{m.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-20 text-center">
        <h2 className="text-3xl font-bold text-foreground">{t("about.ctaTitle")}</h2>
        <p className="mt-3 text-muted-foreground">{t("about.ctaSub")}</p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <SessionCta
            to="/signup"
            label={t("about.ctaPrimary")}
            className="btn-shine glow-primary hover-press inline-flex items-center justify-center rounded-xl bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground"
          />
          {!isSignedIn && (
            <Link
              to="/teacher/register"
              className="hover-press inline-flex items-center justify-center rounded-xl border border-border bg-card px-7 py-3.5 text-sm font-bold text-foreground hover:bg-secondary"
            >
              {t("about.ctaSecondary")}
            </Link>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}
