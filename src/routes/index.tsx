import { createSeoHead, localeFromSearch } from "@/lib/seo";
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
  Check,
  Compass,
  ClipboardCheck,
  ListChecks,
  Store,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { PublicLayout } from "@/components/site/public-layout";
import { SessionCta } from "@/components/site/session-cta";
import { TestimonialsSection } from "@/components/site/testimonials-section";
import { HeroMockup } from "@/components/site/hero-mockup";
import {
  LibraryTreeIllustration,
  ExamSimIllustration,
  MistakeBankIllustration,
  ReviewSessionIllustration,
} from "@/components/site/illustrations";
import { Reveal } from "@/components/ui/reveal";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { useSession } from "@/hooks/use-session";
import { blogPosts } from "@/content/blog-posts";
import { allowedPublicPaths, useBi } from "@/lib/bi";

export const Route = createFileRoute("/")({
  head: (ctx) => createSeoHead("/", localeFromSearch(ctx.match.search)),
  component: Landing,
});

const features = [
  {
    icon: BookOpenCheck,
    key: "library",
    span: "lg:col-span-2 lg:row-span-2",
    flagship: true,
    Illustration: LibraryTreeIllustration,
  },
  {
    icon: Bot,
    key: "simulator",
    span: "lg:col-span-2",
    flagship: false,
    Illustration: ExamSimIllustration,
  },
  { icon: MessagesSquare, key: "community", span: "", flagship: false, Illustration: null },
  { icon: LineChart, key: "tracker", span: "", flagship: false, Illustration: null },
  {
    icon: XCircle,
    key: "mistakes",
    span: "lg:col-span-2",
    flagship: false,
    Illustration: MistakeBankIllustration,
  },
  {
    icon: Timer,
    key: "review",
    span: "lg:col-span-2",
    flagship: false,
    Illustration: ReviewSessionIllustration,
  },
  {
    icon: Store,
    key: "courses",
    span: "lg:col-span-2",
    flagship: false,
    Illustration: null,
  },
] as const;

/* القسم 08 — أرقام عربية غربية (1، 2، 3) في كل الواجهة */
const stats = [
  { prefix: "", value: 4, suffix: "", key: "levels" },
  { prefix: "", value: 100, suffix: "%", key: "rtl" },
  { prefix: "", value: 3, suffix: "", key: "spaces" },
] as const;

const roles = [
  { icon: Users, key: "student", image: "/visuals/role-student.png" },
  { icon: BookOpenCheck, key: "teacher", image: "/visuals/role-teacher.png" },
  { icon: LineChart, key: "parent", image: "/visuals/role-parent.png" },
] as const;

const latestPosts = blogPosts.slice(-2).reverse();

function Landing() {
  const { t } = useTranslation();
  const bi = useBi();
  const { session } = useSession();
  const role = session?.roleKey;
  // زر "تصفح الكورسات" مخصص للطالب بس — لباقي الأدوار (معلم/ولي أمر/مشرف/أدمن)
  // صفحة /courses مو من صلاحياتهم، فما لازم يظهرلهم زر يودّيهم لصفحة "غير مصرح".
  const canBrowseCourses = role ? (allowedPublicPaths(role) ?? []).includes("/courses") : false;

  return (
    <PublicLayout>
      <section className="relative overflow-hidden border-b border-border bg-background">
        <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-8 md:py-24 lg:px-10">
          <div className="grid items-start gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(20rem,0.8fr)]">
            <div>
              <span className="inline-flex items-center gap-2 border-y border-primary/50 py-2 text-xs font-bold uppercase tracking-[0.16em] text-primary">
                <Trophy className="size-4" />
                {session ? t("home.signedIn.welcome", { name: session.fullName }) : t("home.badge")}
              </span>

              {session && role ? (
                <>
                  <h1 className="mt-7 max-w-3xl text-5xl font-black leading-[1.08] tracking-[-0.04em] text-foreground sm:text-6xl md:text-7xl">
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
                    {canBrowseCourses && (
                      <Link
                        to="/courses"
                        className="hover-press inline-flex items-center justify-center rounded-xl border border-border bg-card px-7 py-3.5 text-sm font-bold text-foreground hover:bg-secondary"
                      >
                        {t("home.signedIn.browse")}
                      </Link>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <h1 className="mt-7 max-w-3xl text-5xl font-black leading-[1.08] tracking-[-0.04em] text-foreground sm:text-6xl md:text-7xl">
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
                  <p className="mt-4 text-sm text-muted-foreground">{t("home.trustNote")}</p>
                </>
              )}


              <div className="mt-12 grid max-w-2xl grid-cols-3 divide-x divide-border border-y border-border py-5 rtl:divide-x-reverse">
                {stats.map((s, i) => (
                  <Reveal key={s.key} variant="stat" delay={i * 0.08} className="h-full">
                    <div className="flex h-full flex-col justify-center px-4 first:ps-0 last:pe-0">
                      {/* بدون hover-lift: بطاقة إحصائية ثابتة، مش عنصر قابل للنقر —
                          حركة "ارتفاع عند التحويم" بتوحي بتفاعل مش موجود فعليًا. */}
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
              <HeroMockup session={session} />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="max-w-2xl">
          <span className="text-sm font-bold text-primary">01 · {t("home.startEyebrow")}</span>
          <h2 className="mt-2 text-3xl font-bold text-foreground">{t("home.startTitle")}</h2>
          <p className="mt-3 text-muted-foreground">{t("home.startSub")}</p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-4">
          {([Compass, ListChecks, ClipboardCheck, Check] as const).map((Icon, i) => (
            <Reveal key={i} delay={i * 0.07}>
              <article className="relative h-full rounded-2xl border border-border bg-card p-6 shadow-elevation-1">
                <span className="flex size-11 items-center justify-center rounded-xl bg-primary/12 text-primary">
                  <Icon className="size-5" />
                </span>
                <span className="mt-5 block text-xs font-bold text-muted-foreground">0{i + 1}</span>
                <h3 className="mt-2 font-bold text-foreground">
                  {t(`home.startSteps.${i}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {t(`home.startSteps.${i}.text`)}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-primary/[0.04]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <span className="text-sm font-bold text-primary">02 · {t("home.freeEyebrow")}</span>
            <h2 className="mt-2 text-3xl font-bold text-foreground">{t("home.freeTitle")}</h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
              {t("home.freeSub")}
            </p>
            <p className="mt-5 text-sm font-semibold text-foreground">{t("home.trustNote")}</p>
          </div>
          <div className="rounded-2xl border border-primary/20 bg-background p-6 shadow-elevation-1 lg:min-w-80">
            <p className="mb-4 font-bold text-foreground">{t("home.freeListTitle")}</p>
            <ul className="space-y-3">
              {[0, 1, 2, 3, 4].map((i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="mt-0.5 size-4 shrink-0 text-success" />
                  <span>{t(`home.freeItems.${i}`)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <h2 className="text-3xl font-bold text-foreground">{t("home.featuresTitle")}</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">{t("home.featuresSub")}</p>

        <div className="mt-10 divide-y divide-border border-y border-border">
          {features.map((f, i) => (
            <Reveal key={f.key} delay={(i % 3) * 0.08}>
              <article className="group grid gap-6 py-8 md:grid-cols-[5rem_minmax(12rem,0.7fr)_minmax(0,1fr)] md:items-center md:gap-10">
                <span className="font-mono text-3xl font-light text-primary/70">{String(i + 1).padStart(2, "0")}</span>
                <div className="flex items-start gap-4">
                  <span className="mt-1 flex size-9 shrink-0 items-center justify-center border border-primary/40 text-primary">
                    <f.icon className="size-4" aria-hidden="true" />
                  </span>
                  <h3 className="text-xl font-bold leading-tight text-foreground">{t(`home.features.${f.key}.title`)}</h3>
                </div>
                <div className="flex items-center gap-6">
                  <p className="max-w-xl text-sm leading-7 text-muted-foreground">{t(`home.features.${f.key}.text`)}</p>
                  {f.Illustration && <f.Illustration className="hidden h-16 w-28 shrink-0 md:block" />}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-card/40">
        <div className="mx-auto grid max-w-6xl divide-y divide-border px-5 py-16 md:grid-cols-3 md:divide-x md:divide-y-0 rtl:md:divide-x-reverse">
          {roles.map((r) => (
            <article
              key={r.key}
              className="overflow-hidden border-border py-4 first:pt-0 last:pb-0 md:px-7 md:py-0 md:first:ps-0 md:last:pe-0"
            >
              <img
                src={r.image}
                alt={t(`home.roles.${r.key}.t`)}
                className="aspect-[16/9] w-full object-cover grayscale contrast-110 transition duration-500 group-hover:grayscale-0"
                loading="lazy"
              />
              <div className="pt-5">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-success/12 text-success">
                    <r.icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="font-bold text-foreground">{t(`home.roles.${r.key}.t`)}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t(`home.roles.${r.key}.d`)}</p>
              </div>
            </article>
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
                className="group flex h-full flex-col border-t border-border py-6 transition-colors hover:border-primary"
              >
                <span className="w-fit rounded-full bg-primary/12 px-3 py-1 text-xs font-bold text-primary">
                  {bi(post.category, post.categoryEn)}
                </span>
                <h3 className="mt-4 text-base font-bold leading-snug text-foreground">
                  {bi(post.title, post.titleEn)}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                  {bi(post.excerpt, post.excerptEn)}
                </p>
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
