import { useState } from "react";
import { createSeoHead, localeFromSearch } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  BookOpenCheck,
  LineChart,
  Trophy,
  Users,
  LayoutDashboard,
  Check,
  ClipboardCheck,
  ListChecks,
  Store,
  Search,
  UserRound,
  CalendarDays,
  Video,
  Wallet,
  ArrowRight,
  Star,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { PublicLayout } from "@/components/site/public-layout";
import { SessionCta } from "@/components/site/session-cta";
import { TestimonialsSection } from "@/components/site/testimonials-section";
import { HeroMockup } from "@/components/site/hero-mockup";
import { PhotoAvatar } from "@/components/site/photo-avatar";
import { Reveal } from "@/components/ui/reveal";
import { useSession } from "@/hooks/use-session";
import { blogPosts } from "@/content/blog-posts";
import { cn } from "@/lib/utils";
import { allowedPublicPaths, useBi } from "@/lib/bi";
import { searchTeachers } from "@/integrations/backend/teachers";
import { buttonVariants } from "@/components/ui/button-variants";

/** بطاقة الحد الصلب + الظل بلا ضبابية — نمط Neo-Brutalism الدافئ الموحّد لكل
 * بطاقات الرئيسية غير القابلة للنقر (إحصائية/توضيحية). */
const brutalCard =
  "rounded-2xl border-2 border-[var(--border-strong)] bg-card p-6 shadow-[var(--shadow-brutal)]";
/** تفاعل الضغط لأي عنصر قابل للنقر يحمل brutalCard — نفس منطق الزر: يرتفع
 * عند التحويم ويغوص بظلّه عند الضغط. */
const brutalInteractive =
  "transition-all duration-150 ease-out hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--shadow-brutal-color)] active:translate-x-1 active:translate-y-1 active:shadow-none";

export const Route = createFileRoute("/")({
  head: (ctx) => createSeoHead("/", localeFromSearch(ctx.match.search)),
  component: Landing,
});

const features = [
  { icon: Search, key: "library", flagship: true },
  { icon: UserRound, key: "community", flagship: false },
  { icon: CalendarDays, key: "tracker", flagship: true },
  { icon: Video, key: "simulator", flagship: false },
  { icon: Wallet, key: "mistakes", flagship: true },
  { icon: Store, key: "courses", flagship: false },
  { icon: ClipboardCheck, key: "review", flagship: false },
] as const;

/** معاينات مصغّرة تفاعلية فعليًا (لا سكون)، بنفس مبدأ HeroMockup: كل واحدة
 * تعكس سلوكًا حقيقيًا من الـSRS، لا رسمًا ثابتًا. تُعرض فقط لـ2-3 ميزات
 * رئيسية حسب "Visual Budget" بملفات Claude، لا لكل الميزات. مكوّن منفصل
 * لكل حالة (لا شرط واحد يستدعي Hooks بترتيب متغيّر) — يحترم قواعد Hooks. */
function FeatureMiniPreview({ variant }: { variant: "library" | "tracker" | "mistakes" }) {
  if (variant === "library") return <LibraryPreview />;
  if (variant === "tracker") return <TrackerPreview />;
  return <WalletPreview />;
}

function LibraryPreview() {
  const bi = useBi();
  // FR-T02: فلترة المعلمين — الفلتر النشط يبرز صفًا ويُخفت الآخر فعليًا.
  const [filter, setFilter] = useState<"online" | "inperson">("online");
  return (
    <div className="mt-4 w-full max-w-xs rounded-xl border-2 border-[var(--border-strong)] bg-background p-3 lg:mt-0">
      <div className="flex items-center gap-2 rounded-lg border border-[var(--border-strong)]/40 bg-secondary px-2.5 py-1.5">
        <Search className="size-3.5 text-muted-foreground" />
        <div className="h-2 w-2/3 rounded-full bg-muted-foreground/30" />
      </div>
      <div className="mt-2 flex gap-1.5">
        {(["online", "inperson"] as const).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-md border px-2 py-0.5 text-[9px] font-bold transition-colors",
              filter === f
                ? "border-primary bg-primary text-primary-foreground"
                : "border-[var(--border-strong)]/40 text-muted-foreground",
            )}
          >
            {f === "online" ? bi("أونلاين", "Online") : bi("وجاهي", "In-person")}
          </button>
        ))}
      </div>
      {[0, 1].map((i) => (
        <div
          key={i}
          className={cn(
            "mt-2 flex items-center gap-2 rounded-lg bg-secondary/60 px-2.5 py-2 transition-opacity",
            (filter === "online") === (i === 0) ? "opacity-100" : "opacity-40",
          )}
        >
          <span className="size-6 shrink-0 rounded-full bg-primary/20" />
          <div className="h-2 flex-1 rounded-full bg-muted-foreground/25" />
        </div>
      ))}
    </div>
  );
}

function TrackerPreview() {
  const bi = useBi();
  // FR-S05: عرض الجدول — تبديل اليوم/الأسبوع يغيّر فعليًا عدد الصفوف الظاهرة.
  const [range, setRange] = useState<"today" | "week">("today");
  const rows =
    range === "today" ? [{ w: "w-4/5" }] : [{ w: "w-4/5" }, { w: "w-3/5" }, { w: "w-2/3" }];
  return (
    <div className="mt-4 w-full max-w-xs rounded-xl border-2 border-[var(--border-strong)] bg-background p-3 lg:mt-0">
      <div className="flex gap-1.5">
        {(["today", "week"] as const).map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setRange(r)}
            className={cn(
              "rounded-md border px-2 py-0.5 text-[9px] font-bold transition-colors",
              range === r
                ? "border-primary bg-primary text-primary-foreground"
                : "border-[var(--border-strong)]/40 text-muted-foreground",
            )}
          >
            {r === "today" ? bi("اليوم", "Today") : bi("الأسبوع", "This week")}
          </button>
        ))}
      </div>
      <div className="mt-2 space-y-2">
        {rows.map((row, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="flex size-6 items-center justify-center rounded-md border border-[var(--border-strong)] bg-primary/15 text-primary">
              <CalendarDays className="size-3.5" />
            </span>
            <div className={cn("h-2 rounded-full bg-secondary", row.w)} />
          </div>
        ))}
      </div>
    </div>
  );
}

function WalletPreview() {
  const bi = useBi();
  // FR-W06: المحفظة — تبديل بين الرصيد وسجل المعاملات، لا رقم ثابت وحيد.
  const [view, setView] = useState<"balance" | "history">("balance");
  return (
    <div className="mt-4 w-full max-w-xs rounded-xl border-2 border-[var(--border-strong)] bg-background p-3 lg:mt-0">
      <div className="flex gap-1.5">
        {(["balance", "history"] as const).map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => setView(v)}
            className={cn(
              "rounded-md border px-2 py-0.5 text-[9px] font-bold transition-colors",
              view === v
                ? "border-primary bg-primary text-primary-foreground"
                : "border-[var(--border-strong)]/40 text-muted-foreground",
            )}
          >
            {v === "balance" ? bi("الرصيد", "Balance") : bi("السجل", "History")}
          </button>
        ))}
      </div>
      {view === "balance" ? (
        <div className="mt-2 flex items-center justify-between rounded-lg bg-primary/10 p-3">
          <span className="flex size-9 items-center justify-center rounded-full border-2 border-[var(--border-strong)] bg-background text-primary">
            <Wallet className="size-4" />
          </span>
          <div className="h-2.5 w-16 rounded-full bg-primary/30" />
        </div>
      ) : (
        <div className="mt-2 space-y-1.5">
          {[0, 1].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="size-5 shrink-0 rounded-full bg-primary/15" />
              <div
                className={cn("h-2 flex-1 rounded-full bg-secondary", i === 0 ? "w-2/3" : "w-1/2")}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
const roles = [
  { icon: BookOpenCheck, key: "teacher" },
  { icon: Users, key: "student" },
  { icon: LineChart, key: "parent" },
] as const;

const teacherRole = roles[0];
const otherRoles = roles.slice(1);

/* رحلة الطالب الحقيقية كما بالعرض التقديمي الرسمي (Slide 5: How students use
   it) — بحث → مقارنة → اختيار → حجز → دفع → حضور → تقييم. 7 خطوات فعلية،
   لا 4 كما كان سابقاً. */
const journeySteps = [
  Search,
  ListChecks,
  ClipboardCheck,
  CalendarDays,
  Wallet,
  Video,
  Star,
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
      {/* Hero — اللحظة البصرية الوحيدة المتعمّدة بالصفحة. تسلسل دخول واحد
          منسّق (Reveal بمجموعة واحدة لا لكل عنصر على حدة)، ولا حركة سكرول
          متكررة بعدها. HeroMockup يحتل مساحة أكبر لأنه أصدق عنصر بالصفحة —
          حالة حقيقية من المنصة، لا رسم توضيحي. */}
      <section className="relative overflow-hidden border-b-2 border-[var(--border-strong)] bg-card">
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <Reveal delay={0}>
            <span className="inline-flex items-center gap-2 rounded-full border-2 border-[var(--border-strong)] bg-background px-4 py-1.5 text-sm font-semibold text-primary">
              <Trophy className="size-4" />
              {session ? t("home.signedIn.welcome", { name: session.fullName }) : t("home.badge")}
            </span>

            {session && role ? (
              <>
                <h1 className="mt-6 text-4xl font-extrabold leading-[1.25] text-foreground sm:text-5xl md:text-6xl">
                  {t(`home.signedIn.${role}.h1`)}
                </h1>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
                  {t(`home.signedIn.${role}.sub`)}
                </p>
                <div className="mt-9 flex flex-wrap gap-3">
                  <Link
                    to={session.home}
                    className={buttonVariants({
                      variant: "default",
                      className: "h-auto px-7 py-3.5 text-sm",
                    })}
                  >
                    <LayoutDashboard className="size-4" />
                    {t("home.signedIn.cta")}
                  </Link>
                  {canBrowseCourses && (
                    <Link
                      to="/courses"
                      className={buttonVariants({
                        variant: "outline",
                        className: "h-auto px-7 py-3.5 text-sm",
                      })}
                    >
                      {t("home.signedIn.browse")}
                    </Link>
                  )}
                </div>
              </>
            ) : (
              <>
                <h1 className="mt-6 text-4xl font-extrabold leading-[1.2] text-foreground sm:text-5xl md:text-6xl">
                  {t("home.h1a")} {t("home.h1b")} {t("home.h1c")}
                </h1>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
                  {t("home.sub")}
                </p>
                <div className="mt-9 flex flex-wrap gap-3">
                  <Link
                    to="/signup"
                    className={buttonVariants({
                      variant: "default",
                      className: "h-auto px-7 py-3.5 text-sm",
                    })}
                  >
                    {t("home.ctaPrimary")}
                  </Link>
                  <Link
                    to="/how-it-works"
                    className={buttonVariants({
                      variant: "outline",
                      className: "h-auto px-7 py-3.5 text-sm",
                    })}
                  >
                    {t("home.ctaSecondary")}
                  </Link>
                </div>
              </>
            )}
          </Reveal>

          <Reveal delay={0.12} y={16} className="lg:-me-6">
            <HeroMockup session={session} />
          </Reveal>
        </div>
      </section>

      {/* رحلة البداية — القسم الوحيد فعليًا متسلسل بالصفحة، لذا وحده يستحق
          ترقيمًا وخطًا بصريًا متصلاً يمثّل "رحلة" لا بطاقات منفصلة متطابقة. */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-extrabold text-foreground">{t("home.startTitle")}</h2>
          <p className="mt-3 text-muted-foreground">{t("home.startSub")}</p>
        </div>
        <div className="relative mt-12 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 lg:grid-cols-7 lg:gap-4">
          {/* الخط الواصل بين الخطوات — يظهر من lg فما فوق فقط حيث الصفوف تصطف بخط واحد */}
          <div
            aria-hidden
            className="absolute top-6 hidden h-0.5 w-full bg-[var(--border-strong)] lg:block"
            style={{ insetInlineStart: 0 }}
          />
          {journeySteps.map((Icon, i) => (
            <div key={i} className="relative flex flex-col items-start">
              <span
                className={cn(
                  "relative z-10 flex size-12 items-center justify-center rounded-full border-2 border-[var(--border-strong)] font-display text-base font-bold",
                  i === 0 ? "bg-primary text-primary-foreground" : "bg-background text-foreground",
                )}
              >
                {i + 1}
              </span>
              <Icon className="mt-4 size-5 text-primary" />
              <h3 className="mt-2 text-sm font-bold text-foreground">
                {t(`home.startSteps.${i}.title`)}
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                {t(`home.startSteps.${i}.text`)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* المجاني — العنصر الوحيد هنا تحويلي فعليًا، فيحمل الصندوق ذا الحد
          السميك. النص المجاور يبقى بلا صندوق حتى يحتفظ الصندوق بمعناه. */}
      <section className="border-y-2 border-[var(--border-strong)] bg-primary/8">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-foreground">{t("home.freeTitle")}</h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
              {t("home.freeSub")}
            </p>
            <p className="mt-5 text-sm font-semibold text-foreground">{t("home.trustNote")}</p>
          </div>
          <div className="rounded-2xl border-2 border-[var(--border-strong)] bg-background p-6 shadow-[var(--shadow-brutal)] lg:min-w-80">
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

      {/* المزايا — طبقتان صريحتان، لا 6 خلايا متوهّمة تساوي (كانت تبدو
        كجدول). الثلاث الرئيسية بطاقات حقيقية بمعاينة، والثلاث الثانوية
        صف مضغوط أيقونة+اسم فقط — الاختلاف البصري يعكس اختلاف الأهمية
        الفعلي بدل التظاهر بتساوي غير موجود. */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <h2 className="text-3xl font-extrabold text-foreground">{t("home.featuresTitle")}</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">{t("home.featuresSub")}</p>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {features
            .filter((f) => f.flagship)
            .map((f) => (
              <article
                key={f.key}
                className="flex flex-col rounded-2xl border-2 border-[var(--border-strong)] bg-card p-6 shadow-[var(--shadow-brutal)]"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <f.icon className="size-5" />
                </span>
                <h3 className="mt-4 text-lg font-bold text-foreground">
                  {t(`home.features.${f.key}.title`)}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {t(`home.features.${f.key}.text`)}
                </p>
                <FeatureMiniPreview variant={f.key as "library" | "tracker" | "mistakes"} />
              </article>
            ))}
        </div>

        <div className="mt-4 grid gap-3 border-2 border-[var(--border-strong)] bg-card/60 p-5 sm:grid-cols-2 lg:grid-cols-4">
          {features
            .filter((f) => !f.flagship)
            .map((f, i) => (
              <div
                key={f.key}
                className={cn(
                  "flex items-center gap-3 py-1",
                  i > 0 && "lg:border-s-2 lg:border-[var(--border-strong)]/40 lg:ps-3",
                )}
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border-2 border-[var(--border-strong)] bg-primary/12 text-primary">
                  <f.icon className="size-4" />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-foreground">
                    {t(`home.features.${f.key}.title`)}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {t(`home.features.${f.key}.text`)}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* الأدوار — بطاقة المعلّم وحدها تحمل معاينة حقيقية (بيانات فعلية من
          الباك اند)، فتستحق الصندوق البارز. الطالب موضّح أصلًا بالـHero
          (HeroMockup)، وولي الأمر بلا بيانات حقيقية متاحة اليوم (ربط الابن
          غير مطبّق)، فكلاهما يبقى وصفيًا هادئًا بلا صندوق مكرّر. */}
      <section className="border-y-2 border-[var(--border-strong)] bg-card/60">
        <div className="mx-auto max-w-6xl px-5 py-16">
          {/* شبكة 2 عمود واضحة (لا grid-cols-3 مع col-span-2 بيخلّي العنصر
              التالت يطفر لصف جديد نص فاضي) — المعلّم بعمود أساسي 2/3،
              والطالب وولي الأمر مكدّسين بعمود جانبي واحد 1/3. */}
          <div className="grid gap-10 md:grid-cols-[2fr_1fr]">
            <div className="md:border-e-2 md:border-[var(--border-strong)]/30 md:pe-10">
              <span className="mb-2 inline-block rounded-full border-2 border-[var(--border-strong)] bg-primary px-2.5 py-0.5 text-[11px] font-bold text-primary-foreground">
                {t("home.roles.primaryBadge")}
              </span>
              <teacherRole.icon className="block size-6 text-primary" />
              <h3 className="mt-3 font-bold text-foreground">{t("home.roles.teacher.t")}</h3>
              <p className="mt-1.5 max-w-md text-sm text-muted-foreground">
                {t("home.roles.teacher.d")}
              </p>
              <TeacherPreview />
            </div>
            <div className="flex flex-col gap-10">
              {otherRoles.map((r) => (
                <div key={r.key}>
                  <r.icon className="size-6 text-primary" />
                  <h3 className="mt-3 font-bold text-foreground">{t(`home.roles.${r.key}.t`)}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    {t(`home.roles.${r.key}.d`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-foreground">{t("blog.teaserTitle")}</h2>
            <p className="mt-2 max-w-xl text-muted-foreground">{t("blog.teaserSub")}</p>
          </div>
          <Link
            to="/blog"
            className={buttonVariants({
              variant: "outline",
              className: "h-auto px-5 py-2.5 text-sm",
            })}
          >
            {t("blog.teaserCta")}
          </Link>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {latestPosts.map((post) => (
            <Link
              key={post.slug}
              to="/blog/$slug"
              params={{ slug: post.slug }}
              className={cn(brutalCard, "flex flex-col", brutalInteractive)}
            >
              <span className="w-fit rounded-full bg-primary/12 px-3 py-1 text-xs font-semibold text-primary">
                {bi(post.category, post.categoryEn)}
              </span>
              <h3 className="mt-4 text-base font-bold leading-snug text-foreground">
                {bi(post.title, post.titleEn)}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                {bi(post.excerpt, post.excerptEn)}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-20 text-center">
        <h2 className="text-3xl font-extrabold text-foreground">{t("home.ctaTitle")}</h2>
        <p className="mt-3 text-muted-foreground">{t("home.ctaSub")}</p>
        <SessionCta
          to="/signup"
          label={t("home.ctaButton")}
          className={buttonVariants({
            variant: "default",
            className: "mt-7 h-auto px-8 py-3.5 text-sm",
          })}
        />
      </section>

      <TestimonialsSection className="border-t-2 border-[var(--border-strong)] bg-card/60" />
    </PublicLayout>
  );
}

/** معاينة حقيقية لثلاثة معلمين — بيانات فعلية من نفس مصدر /teachers، لا
 * صور أو أسماء وهمية. تفشل بصمت (بدون بطاقة خطأ) لأنها معاينة تكميلية،
 * لا وظيفة أساسية بالصفحة. */
function TeacherPreview() {
  const { t } = useTranslation();
  const bi = useBi();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["backend-teachers-search", { skip: 0, pageSize: 3 }],
    queryFn: () => searchTeachers({ skip: 0, pageSize: 3 }),
    retry: 1,
  });
  const teachers = data?.data ?? [];

  if (isError || (!isLoading && teachers.length === 0)) return null;

  return (
    <div className="mt-6 grid gap-3 sm:grid-cols-3">
      {isLoading
        ? Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-28 animate-pulse rounded-xl border-2 border-[var(--border-strong)] bg-background/60"
            />
          ))
        : teachers.map((teacher) => (
            <Link
              key={teacher.id}
              to="/teacher/$id"
              params={{ id: String(teacher.id) }}
              className={cn(
                "flex flex-col gap-2 rounded-xl border-2 border-[var(--border-strong)] bg-background p-4",
                brutalInteractive,
              )}
            >
              <PhotoAvatar src={teacher.profileImage} alt={teacher.name ?? ""} className="size-9" />
              <p className="truncate text-sm font-bold text-foreground">
                {teacher.name || bi("معلّم", "Teacher")}
              </p>
              <p className="truncate text-xs text-muted-foreground">{teacher.subjects[0]}</p>
            </Link>
          ))}
      <Link
        to="/teachers"
        className="col-span-full mt-1 inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline"
      >
        {t("home.roles.teacher.cta")}
        <ArrowRight className="size-4 rtl:rotate-180" />
      </Link>
    </div>
  );
}
