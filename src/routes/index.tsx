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
  FlaskConical,
  Calculator,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { PublicLayout } from "@/components/site/public-layout";
import { SessionCta } from "@/components/site/session-cta";
import { TestimonialsSection } from "@/components/site/testimonials-section";
import {
  LibraryTreeIllustration,
  ExamSimIllustration,
  MistakeBankIllustration,
  ReviewSessionIllustration,
} from "@/components/site/illustrations";
import { Reveal } from "@/components/ui/reveal";
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

/* بطاقة "الدليل الحقيقي" فوق صورة الهيرو — مواد توجيهي فعلية (مو أيقونات
   صامتة)، بنفس ألوان النظام الدلالي (primary/info/success) المستخدمة
   بباقي الموقع، مش أزرق عام. الأرقام توضيحية (demo) لحد ما يتوفر مصدر
   بيانات حقيقي، نفس ملاحظة home.stats القديمة. */
const heroSubjects = [
  {
    key: "arabic",
    nameAr: "اللغة العربية",
    nameEn: "Arabic",
    pct: 78,
    icon: BookOpenCheck,
    chipClass: "bg-primary/12 text-primary",
    barClass: "bg-primary",
  },
  {
    key: "physics",
    nameAr: "الفيزياء",
    nameEn: "Physics",
    pct: 54,
    icon: FlaskConical,
    chipClass: "bg-info/12 text-info",
    barClass: "bg-info",
  },
  {
    key: "math",
    nameAr: "الرياضيات",
    nameEn: "Math",
    pct: 92,
    icon: Calculator,
    chipClass: "bg-success/12 text-success",
    barClass: "bg-success",
  },
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
      <section className="relative overflow-hidden border-b border-border">
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.95fr]">
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
              {/* لا صف إحصائيات هون عمدًا — كانت مكررة حرفيًا لبطاقة المواد
                  بجانبها، وأرقامها (4 مستويات، 3 مساحات) مش دليل ثقة مقنع.
                  الفراغ بعد الأزرار مقصود، مش نقص. */}
            </div>

            <Reveal delay={0.15} y={16}>
              <div className="relative mx-auto w-full max-w-md lg:max-w-none">
                {/* توهّج عنبري واحد خلف الصورة — بدل الشبكة + 3 دوائر تنافسية
                    اللي كانت بالنسخة القديمة. */}
                <div className="soft-glow relative overflow-hidden rounded-3xl border border-border">
                  <img
                    src="/images/home/hero-student.jpg"
                    alt={bi(
                      "طالب يذاكر على مكتبه، دفتر ملاحظات وكتب مواد التوجيهي وحاسوب محمول بجانبه",
                      "A student studying at their desk with notes, Tawjihi textbooks, and a laptop",
                    )}
                    width={1112}
                    height={941}
                    className="aspect-[1112/941] w-full object-cover"
                  />
                </div>

                {/* بطاقة تقدّم حقيقية — خلفية معتمة بالكامل (مش زجاجية)، وألوان
                    النظام الدلالي الفعلية. المواد الثلاث فعلية (توجيهي)، مش
                    أيقونات صامتة زي النسخة القديمة. موضعها ثابت فيزيائيًا على
                    الصورة (right- مش end-) لأنه ما بينعكس مع تبديل اللغة. */}
                <div className="shadow-elevation-2 absolute right-[4%] top-[8%] w-[54%] min-w-[15rem] rounded-2xl border border-border bg-card p-3.5">
                  <ul className="space-y-3">
                    {heroSubjects.map((s) => (
                      <li key={s.key} className="flex items-center gap-2.5">
                        <span
                          className={cn(
                            "flex size-8 shrink-0 items-center justify-center rounded-lg",
                            s.chipClass,
                          )}
                        >
                          <s.icon className="size-4" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <span className="truncate text-xs font-bold text-foreground">
                              {bi(s.nameAr, s.nameEn)}
                            </span>
                            <span className="text-xs font-bold text-muted-foreground">
                              {s.pct}%
                            </span>
                          </div>
                          <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-secondary">
                            <div
                              className={cn("h-full rounded-full", s.barClass)}
                              style={{ width: `${s.pct}%` }}
                            />
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-3 flex items-center gap-2 rounded-xl bg-success/10 px-3 py-2">
                    <Trophy className="size-3.5 shrink-0 text-success" />
                    <span className="text-xs font-bold text-success">
                      {bi("أحسنت! تقدّم رائع", "Nice! Great progress")}
                    </span>
                  </div>
                </div>
              </div>
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

      <section className="border-y border-border bg-primary/5">
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
                  "shadow-elevation-1 flex h-full flex-col rounded-2xl border p-6",
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
        <div className="mx-auto grid max-w-6xl gap-6 px-5 py-16 md:grid-cols-3">
          {roles.map((r) => (
            <div
              key={r.key}
              className="rounded-2xl border border-border bg-background p-6"
              // بدون hover-lift: بطاقة توضيحية عن دور (طالب/معلم/ولي أمر)،
              // مش رابط ولا زر — نفس المبدأ بكل الملف.
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
