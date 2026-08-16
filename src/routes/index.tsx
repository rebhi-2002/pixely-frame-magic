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
  LayoutDashboard,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { PublicLayout } from "@/components/site/public-layout";
import { SessionCta } from "@/components/site/session-cta";
import { TestimonialsSection } from "@/components/site/testimonials-section";
import { HeroMockup } from "@/components/site/hero-mockup";
import { Reveal } from "@/components/ui/reveal";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { useSession } from "@/hooks/use-session";
import { blogPosts } from "@/content/blog-posts";
import { cn } from "@/lib/utils";

const title = "Academia | منصة الطالب للتنظيم والإنجاز";
const description =
  "Academia: مكتبة ذكية مرتبة، مجتمعات مواد، متابعة إنجاز، بنك أخطاء ومحاكي امتحان وزاري — كل دراستك بمكان واحد.";

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
  { icon: BookOpenCheck, key: "library", span: "lg:col-span-2 lg:row-span-2", flagship: true },
  { icon: Bot, key: "simulator", span: "lg:col-span-2", flagship: false },
  { icon: MessagesSquare, key: "community", span: "", flagship: false },
  { icon: LineChart, key: "tracker", span: "", flagship: false },
  { icon: XCircle, key: "mistakes", span: "lg:col-span-2", flagship: false },
  { icon: Timer, key: "review", span: "lg:col-span-2", flagship: false },
] as const;

/* القسم 08 — أرقام عربية غربية (1، 2، 3) في كل الواجهة */
const stats = [
  { prefix: "", value: 4, suffix: "", key: "levels" },
  { prefix: "", value: 100, suffix: "%", key: "rtl" },
  { prefix: "", value: 3, suffix: "", key: "spaces" },
] as const;

const roles = [
  { icon: Users, key: "student" },
  { icon: BookOpenCheck, key: "teacher" },
  { icon: LineChart, key: "parent" },
] as const;

const latestPosts = blogPosts.slice(-2).reverse();

function Landing() {
  const { t } = useTranslation();
  const { session } = useSession();
  const role = session?.roleKey;

  return (
    <PublicLayout>
      <section className="surface-mesh surface-mesh-fade relative overflow-hidden border-b border-border">
        <div className="relative mx-auto max-w-6xl px-5 py-20 md:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <span className="glass-surface inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold text-primary shadow-elevation-1">
                <Trophy className="size-4" />
                {session ? t("home.signedIn.welcome", { name: session.fullName }) : t("home.badge")}
              </span>

              {session && role ? (
                <>
                  <h1 className="mt-6 text-4xl font-bold leading-[1.25] text-foreground sm:text-5xl md:text-6xl">
                    {t(`home.signedIn.${role}.h1`)}
                  </h1>
                  <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                    {t(`home.signedIn.${role}.sub`)}
                  </p>
                  <div className="mt-9 flex flex-wrap gap-3">
                    <Link
                      to={session.home}
                      className="glow-primary hover-press inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground"
                    >
                      <LayoutDashboard className="size-4" />
                      {t("home.signedIn.cta")}
                    </Link>
                    <Link
                      to="/courses"
                      className="hover-press inline-flex items-center justify-center rounded-xl border border-border bg-card px-7 py-3.5 text-sm font-bold text-foreground hover:bg-secondary"
                    >
                      {t("home.signedIn.browse")}
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <h1 className="mt-6 text-4xl font-bold leading-[1.2] text-foreground sm:text-5xl md:text-6xl">
                    {t("home.h1a")} <span className="text-gradient">{t("home.h1b")}</span>{" "}
                    {t("home.h1c")}
                  </h1>
                  <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                    {t("home.sub")}
                  </p>
                  <div className="mt-9 flex flex-wrap gap-3">
                    <Link
                      to="/signup"
                      className="btn-shine glow-primary hover-press inline-flex items-center justify-center rounded-xl bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground"
                    >
                      {t("home.ctaPrimary")}
                    </Link>
                    <Link
                      to="/how-it-works"
                      className="hover-press inline-flex items-center justify-center rounded-xl border border-border bg-card px-7 py-3.5 text-sm font-bold text-foreground hover:bg-secondary"
                    >
                      {t("home.ctaSecondary")}
                    </Link>
                  </div>
                </>
              )}

              <div className="mt-14 grid items-stretch gap-4 sm:grid-cols-3">
                {stats.map((s, i) => (
                  <Reveal key={s.key} delay={i * 0.08} className="h-full">
                    <div className="hover-lift shadow-elevation-1 flex h-full flex-col justify-center rounded-2xl border border-border bg-card p-5">
                      <p className="font-display text-3xl font-bold text-primary">
                        <AnimatedCounter prefix={s.prefix} value={s.value} suffix={s.suffix} />
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {t(`home.stats.${s.key}`)}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <Reveal delay={0.15} y={16}>
              <HeroMockup />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <h2 className="text-3xl font-bold text-foreground">{t("home.featuresTitle")}</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">{t("home.featuresSub")}</p>

        {/* Bento grid — بطاقة رئيسية أكبر (المكتبة) + بطاقة عريضة للميزة الفارقة
            (المحاكي بالذكاء الاصطناعي) + بطاقات عادية للباقي. يتفكك لعمود/عمودين
            بالشاشات الصغيرة عبر md:grid-cols-2، وبيصير Bento فعلي من lg وفوق. */}
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:auto-rows-fr lg:grid-cols-4">
          {features.map((f, i) => (
            <Reveal key={f.key} delay={(i % 3) * 0.08} className={f.span}>
              <article
                className={cn(
                  "hover-lift shadow-elevation-1 flex h-full flex-col rounded-2xl border p-6",
                  f.flagship
                    ? "surface-mesh border-primary/30 bg-primary/5"
                    : "border-border bg-card",
                )}
              >
                <span
                  className={cn(
                    "flex size-11 items-center justify-center rounded-xl",
                    f.flagship
                      ? "bg-primary text-primary-foreground"
                      : "bg-primary/12 text-primary",
                  )}
                >
                  <f.icon className="size-5" />
                </span>
                <h3
                  className={cn(
                    "mt-4 font-bold text-foreground",
                    f.flagship ? "text-lg" : "text-base",
                  )}
                >
                  {t(`home.features.${f.key}.title`)}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {t(`home.features.${f.key}.text`)}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-card/40">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 py-16 md:grid-cols-3">
          {roles.map((r) => (
            <div
              key={r.key}
              className="hover-lift rounded-2xl border border-border bg-background p-6"
            >
              <r.icon className="size-6 text-success" />
              <h3 className="mt-3 font-bold text-foreground">{t(`home.roles.${r.key}.t`)}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{t(`home.roles.${r.key}.d`)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-foreground">{t("blog.teaserTitle")}</h2>
            <p className="mt-2 max-w-xl text-muted-foreground">{t("blog.teaserSub")}</p>
          </div>
          <Link
            to="/blog"
            className="hover-press inline-flex items-center rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-bold text-foreground hover:bg-secondary"
          >
            {t("blog.teaserCta")}
          </Link>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {latestPosts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.08}>
              <Link
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="hover-lift shadow-elevation-1 flex h-full flex-col rounded-2xl border border-border bg-card p-6"
              >
                <span className="w-fit rounded-full bg-primary/12 px-3 py-1 text-xs font-bold text-primary">
                  {bi(post.category, post.categoryEn)}
                </span>
                <h3 className="mt-4 text-base font-bold leading-snug text-foreground">
                  {bi(post.title, post.titleEn)}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{bi(post.excerpt, post.excerptEn)}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-20 text-center">
        <h2 className="text-3xl font-bold text-foreground">{t("home.ctaTitle")}</h2>
        <p className="mt-3 text-muted-foreground">{t("home.ctaSub")}</p>
        <SessionCta
          to="/signup"
          label={t("home.ctaButton")}
          className="btn-shine glow-primary hover-press mt-7 inline-flex items-center justify-center rounded-xl bg-primary px-8 py-3.5 text-sm font-bold text-primary-foreground"
        />
      </section>

      <TestimonialsSection className="border-t border-border bg-card/40" />
    </PublicLayout>
  );
}
