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
import { cn } from "@/lib/utils";
import { allowedPublicPaths, useBi } from "@/lib/bi";

const title = "Academia | منصة الطالب للتنظيم والإنجاز";
const description =
  "Academia: مكتبة ذكية مرتبة، مجتمعات مواد، متابعة إنجاز، بنك أخطاء ومحاكي امتحان وزاري — كل دراستك بمكان واحد.";

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
  const bi = useBi();
  const { session } = useSession();
  const role = session?.roleKey;
  // زر "تصفح الكورسات" مخصص للطالب بس — لباقي الأدوار (معلم/ولي أمر/مشرف/أدمن)
  // صفحة /courses مو من صلاحياتهم، فما لازم يظهرلهم زر يودّيهم لصفحة "غير مصرح".
  const canBrowseCourses = role ? (allowedPublicPaths(role) ?? []).includes("/courses") : false;

  return (
    <PublicLayout>
      <section className="relative overflow-hidden border-b border-white/10 bg-[#0A0F1C] text-[#F3F1EA]">
        <div aria-hidden="true" className="pointer-events-none absolute -end-24 -top-24 size-72 rounded-full border border-[#F0A62E]/25 sm:size-96" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-20 start-[42%] size-44 rounded-full bg-[#F0A62E]/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 sm:px-8 md:py-24 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:px-10">
          <div className="max-w-2xl">
            <div className="mb-7 flex items-center gap-3 text-sm font-semibold text-[#F0A62E]">
              <span aria-hidden="true" className="h-px w-10 bg-[#F0A62E]" />
              <Trophy className="size-4" />
              {session ? t("home.signedIn.welcome", { name: session.fullName }) : t("home.badge")}
            </div>

            {session && role ? (
              <>
                <h1 className="font-display text-4xl font-bold leading-[1.18] tracking-tight sm:text-5xl md:text-6xl">
                  {t(`home.signedIn.${role}.h1`)}
                </h1>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#A6B0C3]">
                  {t(`home.signedIn.${role}.sub`)}
                </p>
                <div className="mt-9 flex flex-wrap gap-3">
                  <Link to={session.home} className="hover-press inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#F0A62E] px-6 py-3 text-sm font-bold text-[#0A0F1C]">
                    <LayoutDashboard className="size-4" />
                    {t("home.signedIn.cta")}
                  </Link>
                  {canBrowseCourses && <Link to="/courses" className="hover-press inline-flex min-h-12 items-center justify-center rounded-lg border border-white/20 px-6 py-3 text-sm font-bold text-[#F3F1EA] hover:bg-white/10">{t("home.signedIn.browse")}</Link>}
                </div>
              </>
            ) : (
              <>
                <h1 className="font-display text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl md:text-7xl">
                  {t("home.h1a")} <span className="text-[#F0A62E]">{t("home.h1b")}</span>{" "}{t("home.h1c")}
                </h1>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#A6B0C3]">{t("home.sub")}</p>
                <div className="mt-9 flex flex-wrap gap-3">
                  <Link to="/signup" className="hover-press inline-flex min-h-12 items-center justify-center rounded-lg bg-[#F0A62E] px-7 py-3 text-sm font-bold text-[#0A0F1C]">{t("home.ctaPrimary")}</Link>
                  <Link to="/how-it-works" className="hover-press inline-flex min-h-12 items-center justify-center rounded-lg border border-white/20 px-7 py-3 text-sm font-bold text-[#F3F1EA] hover:bg-white/10">{t("home.ctaSecondary")}</Link>
                </div>
              </>
            )}

            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4 border-t border-white/10 pt-6">
              {stats.map((s) => (
                <div key={s.key}>
                  <p className="font-display text-2xl font-bold text-[#F3F1EA]"><AnimatedCounter prefix={s.prefix} value={s.value} suffix={s.suffix} /></p>
                  <p className="mt-1 text-xs text-[#A6B0C3]">{t(`home.stats.${s.key}`)}</p>
                </div>
              ))}
            </div>
          </div>

          <Reveal delay={0.15} y={16}>
            <div className="relative lg:-me-8">
              <div aria-hidden="true" className="absolute -end-5 top-8 h-32 w-32 rounded-full border border-[#3E8EDE]/40" />
              <HeroMockup session={session} />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div className="max-w-xl">
            <span className="text-sm font-bold text-primary">01 · {t("home.startEyebrow", { defaultValue: "خطوتك الأولى" })}</span>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-foreground sm:text-4xl">{t("home.startTitle")}</h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground lg:pb-1">{t("home.startSub")}</p>
        </div>
        <div className="mt-12 grid divide-y divide-border border-y border-border md:grid-cols-4 md:divide-x md:divide-y-0 rtl:md:divide-x-reverse">
          {([Compass, ListChecks, ClipboardCheck, Check] as const).map((Icon, i) => (
            <Reveal key={i} delay={i * 0.07}>
              <article className="group h-full px-1 py-7 md:px-6 md:first:ps-0 md:last:pe-0">
                <div className="flex items-start justify-between gap-4">
                  <span className="font-mono text-xs font-bold text-muted-foreground">0{i + 1}</span>
                  <Icon aria-hidden="true" className="size-5 text-primary transition-transform group-hover:-translate-y-1" />
                </div>
                <h3 className="mt-8 font-bold text-foreground">{t(`home.startSteps.${i}.title`)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(`home.startSteps.${i}.text`)}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-section">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-center lg:px-10">
          <div>
            <span className="text-sm font-bold text-primary">02 · {t("home.freeEyebrow", { defaultValue: "ابدأ بدون مخاطرة" })}</span>
            <h2 className="mt-2 text-3xl font-bold text-foreground">{t("home.freeTitle")}</h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">{t("home.freeSub")}</p>
            <p className="mt-5 text-sm font-semibold text-foreground">{t("home.trustNote")}</p>
          </div>
          <div className="border-s-4 border-primary bg-background p-6 lg:min-w-80">
            <p className="mb-4 font-bold text-foreground">{t("home.freeListTitle", { defaultValue: "يتضمن البدء المجاني:" })}</p>
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
        <div className="grid gap-4 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
          <h2 className="text-3xl font-bold leading-tight text-foreground sm:text-4xl">{t("home.featuresTitle")}</h2>
          <p className="max-w-2xl text-muted-foreground lg:pb-1">{t("home.featuresSub")}</p>
        </div>

        {/* Bento grid — بطاقة رئيسية أكبر (المكتبة) + بطاقة عريضة للميزة الفارقة
            (المحاكي بالذكاء الاصطناعي) + بطاقات عادية للباقي. يتفكك لعمود/عمودين
            بالشاشات الصغيرة عبر md:grid-cols-2، وبيصير Bento فعلي من lg وفوق. */}
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:auto-rows-fr lg:grid-cols-4">
          {features.map((f, i) => (
            <Reveal key={f.key} delay={(i % 3) * 0.08} className={f.span}>
              <article
                className={cn(
                  // بدون hover-lift: بطاقات مزايا معلوماتية، مش روابط —
                  // نفس منطق تصحيح الإحصائيات فوق.
                  "flex h-full flex-col border p-6",
                  f.flagship
                    ? "surface-mesh border-primary/30 bg-primary/5"
                    : "border-border bg-card",
                )}
              >
                {f.Illustration ? (
                  <f.Illustration className={cn("w-full", f.flagship ? "h-32" : "h-20")} />
                ) : (
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
                )}
                <h3
                  className={cn(
                    "font-bold text-foreground",
                    f.Illustration ? "mt-3" : "mt-4",
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
        <div className="mx-auto grid max-w-7xl gap-0 px-5 py-12 sm:px-8 md:grid-cols-3 lg:px-10">
          {roles.map((r) => (
            <div
              key={r.key}
              className="border-s border-border bg-background px-6 py-7 first:border-s-0"
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
                className="hover-lift flex h-full flex-col border border-border bg-card p-6"
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

      <section className="relative mx-auto max-w-7xl overflow-hidden px-5 py-20 sm:px-8 lg:px-10">
        <div aria-hidden="true" className="pointer-events-none absolute -end-16 top-10 size-40 rounded-full border border-primary/25" />
        <div className="relative max-w-2xl">
        <span className="text-sm font-bold text-primary">08 · {t("home.ctaEyebrow", { defaultValue: "خطوتك القادمة" })}</span>
        <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">{t("home.ctaTitle")}</h2>
        <p className="mt-3 text-muted-foreground">{t("home.ctaSub")}</p>
        <SessionCta
          to="/signup"
          label={t("home.ctaButton")}
          className="btn-shine glow-primary hover-press mt-7 inline-flex items-center justify-center rounded-xl bg-primary px-8 py-3.5 text-sm font-bold text-primary-foreground"
        />
        </div>
      </section>

      <TestimonialsSection className="border-t border-border bg-card/40" />
    </PublicLayout>
  );
}
