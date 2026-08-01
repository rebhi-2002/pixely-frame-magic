import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BookOpenCheck,
  MessagesSquare,
  LineChart,
  Timer,
  Trophy,
  Bot,
  XCircle,
  Users,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { PublicLayout } from "@/components/site/public-layout";

const title = "أكاديميا | منصة الطالب للتنظيم والإنجاز";
const description =
  "أكاديميا: مكتبة ذكية مرتبة، مجتمعات مواد، متابعة إنجاز، بنك أخطاء ومحاكي امتحان وزاري — كل دراستك بمكان واحد.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Landing,
});

const features = [
  { icon: BookOpenCheck, key: "library" },
  { icon: MessagesSquare, key: "community" },
  { icon: LineChart, key: "tracker" },
  { icon: Bot, key: "simulator" },
  { icon: XCircle, key: "mistakes" },
  { icon: Timer, key: "review" },
] as const;

/* القسم 08 — أرقام عربية غربية (1، 2، 3) في كل الواجهة */
const stats = [
  { value: "4", key: "levels" },
  { value: "100%", key: "rtl" },
  { value: "3", key: "spaces" },
] as const;

const roles = [
  { icon: Users, key: "student" },
  { icon: BookOpenCheck, key: "teacher" },
  { icon: LineChart, key: "parent" },
] as const;

function Landing() {
  const { t } = useTranslation();

  return (
    <PublicLayout>
      <section className="surface-grid border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm font-semibold text-primary">
            <Trophy className="size-4" />
            {t("home.badge")}
          </span>
          <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-[1.25] text-foreground sm:text-5xl md:text-6xl">
            {t("home.h1a")} <span className="text-primary">{t("home.h1b")}</span> {t("home.h1c")}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {t("home.sub")}
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              to="/signup"
              className="glow-primary inline-flex items-center justify-center rounded-xl bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
            >
              {t("home.ctaPrimary")}
            </Link>
            <Link
              to="/how-it-works"
              className="inline-flex items-center justify-center rounded-xl border border-border bg-card px-7 py-3.5 text-sm font-bold text-foreground transition-colors hover:bg-secondary"
            >
              {t("home.ctaSecondary")}
            </Link>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-3">
            {stats.map((s) => (
              <div key={s.key} className="rounded-2xl border border-border bg-card p-5">
                <p className="font-display text-3xl font-bold text-primary">{s.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{t(`home.stats.${s.key}`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <h2 className="text-3xl font-bold text-foreground">{t("home.featuresTitle")}</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">{t("home.featuresSub")}</p>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <article
              key={f.key}
              className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-primary/12 text-primary">
                <f.icon className="size-5" />
              </span>
              <h3 className="mt-4 text-base font-bold text-foreground">
                {t(`home.features.${f.key}.title`)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {t(`home.features.${f.key}.text`)}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-card/40">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 py-16 md:grid-cols-3">
          {roles.map((r) => (
            <div key={r.key} className="rounded-2xl border border-border bg-background p-6">
              <r.icon className="size-6 text-success" />
              <h3 className="mt-3 font-bold text-foreground">{t(`home.roles.${r.key}.t`)}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{t(`home.roles.${r.key}.d`)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-20 text-center">
        <h2 className="text-3xl font-bold text-foreground">{t("home.ctaTitle")}</h2>
        <p className="mt-3 text-muted-foreground">{t("home.ctaSub")}</p>
        <Link
          to="/signup"
          className="glow-primary mt-7 inline-flex items-center justify-center rounded-xl bg-primary px-8 py-3.5 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
        >
          {t("home.ctaButton")}
        </Link>
      </section>
    </PublicLayout>
  );
}
