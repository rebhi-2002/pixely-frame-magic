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
import { Reveal } from "@/components/ui/reveal";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { useSession } from "@/hooks/use-session";
import { blogPosts } from "@/content/blog-posts";
import { cn } from "@/lib/utils";
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
  },
  {
    icon: Bot,
    key: "simulator",
    span: "lg:col-span-2",
    flagship: false,
  },
  { icon: MessagesSquare, key: "community", span: "", flagship: false },
  { icon: LineChart, key: "tracker", span: "", flagship: false },
  {
    icon: XCircle,
    key: "mistakes",
    span: "lg:col-span-2",
    flagship: false,
  },
  {
    icon: Timer,
    key: "review",
    span: "lg:col-span-2",
    flagship: false,
  },
  {
    icon: Store,
    key: "courses",
    span: "lg:col-span-2",
    flagship: false,
  },
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

function EditorialHero({ session, role }: { session: ReturnType<typeof useSession>["session"]; role?: string }) {
  const { t } = useTranslation();
  const signedIn = Boolean(session && role);

  return (
    <section className="editorial-hero" aria-labelledby="home-hero-title">
      <div className="editorial-hero__rail">
        <span className="editorial-hero__index">01</span>
        <span className="editorial-hero__line" />
        <span className="editorial-hero__rail-label">مساحتك الدراسية</span>
      </div>
      <div className="editorial-hero__copy">
        <p className="eyebrow editorial-hero__eyebrow">أكاديميا / نظام تعلّم فلسطيني</p>
        <h1 id="home-hero-title">
          {signedIn && role ? t(`home.signedIn.${role}.h1`) : <>رتّب دراستك<br /><em>وابدأ بثقة.</em></>}
        </h1>
        <p className="editorial-hero__lede">
          {signedIn && role ? t(`home.signedIn.${role}.sub`) : t("home.sub")}
        </p>
        <div className="editorial-hero__actions">
          <Link to={signedIn && session ? session.home : "/signup"} className="button button--solid">
            {signedIn ? t("home.signedIn.cta") : t("home.ctaPrimary")}
          </Link>
          <Link to="/how-it-works" className="button button--text">كيف تعمل أكاديميا <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
      <div className="editorial-hero__manifesto">
        <div className="editorial-hero__art" aria-hidden="true"><span>أ</span></div>
        <p className="editorial-hero__quote">من أول سؤال<br />إلى فهم حقيقي.</p>
        <div className="editorial-hero__meta"><span>فلسطين</span><span>2026</span><span>RTL / 100%</span></div>
      </div>
    </section>
  );
}

function Landing() {
  const { t } = useTranslation();
  const bi = useBi();
  const { session } = useSession();
  const role = session?.roleKey;
  const canBrowseCourses = role ? (allowedPublicPaths(role) ?? []).includes("/courses") : false;

  return (
    <PublicLayout>
      <EditorialHero session={session} role={role} />
      {/* Previous hero retained below for signed-in compatibility but removed from visual flow. */}
      <section className="legacy-hero hidden" aria-hidden="true">
        {/* Decorative gradient orbs */}
        <div className="absolute -top-40 -start-40 h-96 w-96 rounded-full bg-gradient-to-br from-[#0066cc]/20 to-transparent blur-3xl opacity-40" />
        <div className="absolute -bottom-20 -end-20 h-80 w-80 rounded-full bg-gradient-to-tl from-[#ff6b35]/10 to-transparent blur-3xl opacity-30" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12">
          {/* Header label */}
          <div className="mb-20 flex items-center gap-3">
            <span className="h-px w-6 bg-[#0066cc]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#0066cc]">
              لطلاب التوجيهي في فلسطين
            </span>
          </div>

          {/* Split content */}
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            {/* Left: Content */}
            <div className="flex flex-col space-y-8">
              {session && role ? (
                <>
                  <div className="space-y-6">
                    <p className="text-sm font-bold uppercase tracking-widest text-[#0066cc]">
                      {t("home.signedIn.welcome", { name: session.fullName })}
                    </p>
                    <h1 className="font-display max-w-2xl text-5xl font-bold leading-[1.15] tracking-tight text-white sm:text-6xl md:text-7xl">
                      {t(`home.signedIn.${role}.h1`)}
                    </h1>
                    <p className="max-w-xl text-lg leading-relaxed text-gray-300">
                      {t(`home.signedIn.${role}.sub`)}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <Link
                      to={session.home}
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0066cc] px-8 py-3.5 text-sm font-bold text-white transition-all hover:bg-[#0052a3] active:scale-95"
                    >
                      <LayoutDashboard className="size-5" />
                      {t("home.signedIn.cta")}
                    </Link>
                    {canBrowseCourses && (
                      <Link
                        to="/courses"
                        className="inline-flex items-center justify-center rounded-lg border border-gray-600 px-8 py-3.5 text-sm font-bold text-white transition-all hover:border-gray-400 hover:bg-gray-900/50"
                      >
                        {t("home.signedIn.browse")}
                      </Link>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-6">
                    <p className="text-sm font-bold uppercase tracking-widest text-[#0066cc]">
                      نظام الدراسة الذكي
                    </p>
                    <h1 className="font-display max-w-3xl text-5xl font-bold leading-[1.15] tracking-tight text-white sm:text-6xl md:text-7xl">
                      رتّب <span className="text-[#ff6b35]">دراستك</span> وابدأ <span className="text-[#0066cc]">بثقة</span>
                    </h1>
                    <p className="max-w-xl text-lg leading-relaxed text-gray-300">
                      {t("home.sub")}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <Link
                      to="/signup"
                      className="inline-flex items-center justify-center rounded-lg bg-[#0066cc] px-8 py-3.5 text-sm font-bold text-white transition-all hover:bg-[#0052a3] active:scale-95"
                    >
                      {t("home.ctaPrimary")}
                    </Link>
                    <Link
                      to="/how-it-works"
                      className="inline-flex items-center justify-center rounded-lg border border-gray-600 px-8 py-3.5 text-sm font-bold text-white transition-all hover:border-gray-400 hover:bg-gray-900/50"
                    >
                      {t("home.ctaSecondary")}
                    </Link>
                  </div>
                </>
              )}

              {/* Stats grid */}
              <div className="mt-8 grid grid-cols-3 gap-4 border-t border-gray-800 pt-8">
                {stats.map((s) => (
                  <div key={s.key} className="space-y-2">
                    <p className="text-3xl font-bold text-[#0066cc]">
                      <AnimatedCounter prefix={s.prefix} value={s.value} suffix={s.suffix} />
                    </p>
                    <p className="text-xs text-gray-400">{t(`home.stats.${s.key}`)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Visual element */}
            <Reveal delay={0.15} className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-sm">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#0066cc]/20 to-[#ff6b35]/10 blur-2xl opacity-50" />
                <div className="relative overflow-hidden rounded-2xl border border-gray-700 bg-gradient-to-br from-gray-900 to-gray-950 p-8 shadow-2xl">
                  <img
                    src="/media/editorial/study-desk.png"
                    alt={t("home.editorialImageAlt", "A student studying with an open textbook and notebook")}
                    className="w-full rounded-lg object-cover"
                  />
                  <div className="mt-6 space-y-4 border-t border-gray-800 pt-6">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-[#0066cc]">
                        Academia / Study
                      </p>
                      <p className="mt-2 text-lg font-bold text-white">
                        {t("home.editorialCaption", "Study with intention")}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-bold text-green-400">
                      <Check className="size-5" />
                      {t("home.editorialStatus", "On track")}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="home-section mx-auto max-w-6xl px-5 py-24">
        <div className="max-w-2xl">
          <span className="text-sm font-bold text-primary">01 · {t("home.startEyebrow")}</span>
          <h2 className="mt-2 text-3xl font-bold text-foreground">{t("home.startTitle")}</h2>
          <p className="mt-3 text-muted-foreground">{t("home.startSub")}</p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-4">
          {([Compass, ListChecks, ClipboardCheck, Check] as const).map((Icon, i) => (
            <Reveal key={i} delay={i * 0.07}>
              <article className="playful-card relative h-full p-6">
                <span className="playful-icon">
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

      <section className="home-section playful-section-wash border-y-2 border-foreground">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <span className="text-sm font-bold text-primary">02 · {t("home.freeEyebrow")}</span>
            <h2 className="mt-2 text-3xl font-bold text-foreground">{t("home.freeTitle")}</h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
              {t("home.freeSub")}
            </p>
            <p className="mt-5 text-sm font-semibold text-foreground">{t("home.trustNote")}</p>
          </div>
          <div className="border-s-2 border-primary bg-background p-6 lg:min-w-80">
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

      <section className="home-section mx-auto max-w-6xl px-5 py-24">
        <h2 className="text-3xl font-bold text-foreground">{t("home.featuresTitle")}</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">{t("home.featuresSub")}</p>

        {/* Bento grid — بطاقة ر��يسية أكبر (المكتبة) + بطاقة عريضة للميزة الفارقة
            (المحاكي بالذكاء الاصطناعي) + بطاقات عادية للباقي. يتفكك لعمود/عمودين
            بالشاشات الصغيرة عبر md:grid-cols-2، وبيصير Bento فعلي من lg وفوق. */}
        <div className="editorial-rule mt-10 grid gap-x-6 gap-y-0 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.key} delay={(i % 3) * 0.08} className={f.span}>
              <article
                className={cn(
                  "playful-card flex h-full flex-col p-6 md:min-h-64 md:px-4",
                  f.flagship ? "bg-primary/10" : "bg-card",
                )}
              >
                  <span
                    className={cn(
                      "playful-icon",
                      f.flagship
                        ? "bg-primary text-primary-foreground"
                        : "bg-primary/10 text-primary",
                    )}
                    aria-hidden="true"
                  >
                    <f.icon className="size-5" strokeWidth={1.8} />
                  </span>
                <h3
                  className={cn(
                    "font-bold text-foreground",
                      f.flagship ? "mt-3" : "mt-4",
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
              className="playful-card bg-background p-6"
              // بدون hover-lift: بطاقة توضيحية عن دور (طالب/معلم/ولي أمر)،
              // مش رابط ولا زر — نفس المبدأ بكل الملف.
            >
              <span className="playful-icon"><r.icon className="size-5" /></span>
              <h3 className="mt-3 font-bold text-foreground">{t(`home.roles.${r.key}.t`)}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{t(`home.roles.${r.key}.d`)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="home-section mx-auto max-w-6xl px-5 py-24">
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
                className="playful-card group flex h-full flex-col p-6 transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <span className="w-fit border-s-2 border-primary px-3 py-1 text-xs font-bold text-primary group-hover:text-primary-foreground">
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

      <section className="home-section playful-section-wash mx-auto max-w-4xl rounded-[2rem] px-5 py-24 text-center md:my-12 md:border-2 md:border-foreground md:shadow-[8px_8px_0_var(--color-primary)]">
        <h2 className="text-3xl font-bold text-foreground">{t("home.ctaTitle")}</h2>
        <p className="mt-3 text-muted-foreground">{t("home.ctaSub")}</p>
        <SessionCta
          to="/signup"
          label={t("home.ctaButton")}
          className="btn-shine glow-primary hover-press mt-7 inline-flex min-h-12 items-center justify-center rounded-full border-2 border-foreground bg-primary px-8 py-3.5 text-sm font-bold text-primary-foreground shadow-[4px_4px_0_var(--color-foreground)]"
        />
      </section>

      <TestimonialsSection className="border-t border-border bg-card/40" />
    </PublicLayout>
  );
}
