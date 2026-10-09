import { useState, type CSSProperties } from "react";
import { createSeoHead, localeFromSearch } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  BookOpenCheck,
  LineChart,
  Users,
  LayoutDashboard,
  Check,
  ClipboardCheck,
  ListChecks,
  UsersRound,
  Search,
  UserRound,
  CalendarDays,
  Video,
  Wallet,
  ArrowRight,
  Clock3,
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

/* Store كانت بترمز لمتجر/تسوّق، وما إلها علاقة بـ"كورسات بمجموعات" — UsersRound
   بيكمّل العائلة البصرية مع UserRound (ملف معلم فردي) ليعبّر عن مجموعة طلاب. */

/** لون هوية كل ميزة رئيسية — نفس ألوان تبويبات الهيرو (ذهبي/أزرق/صدئي). */
const featureTone = {
  gold: { "--feat": "var(--brand)", "--feat-fg": "var(--ink)" },
  sky: { "--feat": "var(--accent-2)", "--feat-fg": "#ffffff" },
  rust: { "--feat": "var(--primary)", "--feat-fg": "var(--primary-foreground)" },
} as const;

const features = [
  { icon: Search, key: "library", flagship: true, tone: "gold" },
  { icon: UserRound, key: "community", flagship: false },
  { icon: CalendarDays, key: "tracker", flagship: true, tone: "sky" },
  { icon: Video, key: "simulator", flagship: false },
  { icon: Wallet, key: "mistakes", flagship: true, tone: "rust" },
  { icon: UsersRound, key: "courses", flagship: false },
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
    <div className="mt-5 w-full max-w-xs rounded-xl border-2 border-[var(--border-strong)] bg-background p-3">
      <div className="flex items-center gap-2 rounded-lg border border-[var(--border-strong)]/40 bg-secondary px-2.5 py-1.5">
        <Search className="size-3.5 text-muted-foreground" />
        <div className="h-2 w-2/3 rounded-full bg-muted-foreground/30" />
        <span aria-hidden className="caret-blink -ms-1 h-3.5 w-px bg-foreground" />
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
                ? "border-[var(--border-strong)] bg-[var(--feat)] text-[var(--feat-fg)]"
                : "border-[var(--border-strong)]/40 text-muted-foreground",
            )}
          >
            {f === "online" ? bi("أونلاين", "Online") : bi("وجاهي", "In-person")}
          </button>
        ))}
      </div>
      {[0, 1].map((i) => (
        <div
          key={`${filter}-${i}`}
          style={{ "--i": i } as CSSProperties}
          className={cn(
            "row-in mt-2 flex items-center gap-2 rounded-lg bg-secondary/60 px-2.5 py-2 transition-opacity",
            (filter === "online") === (i === 0) ? "opacity-100" : "opacity-40",
          )}
        >
          <span className="size-6 shrink-0 rounded-full bg-[var(--feat)]" />
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
    <div className="mt-5 w-full max-w-xs rounded-xl border-2 border-[var(--border-strong)] bg-background p-3">
      <div className="flex gap-1.5">
        {(["today", "week"] as const).map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setRange(r)}
            className={cn(
              "rounded-md border px-2 py-0.5 text-[9px] font-bold transition-colors",
              range === r
                ? "border-[var(--border-strong)] bg-[var(--feat)] text-[var(--feat-fg)]"
                : "border-[var(--border-strong)]/40 text-muted-foreground",
            )}
          >
            {r === "today" ? bi("اليوم", "Today") : bi("الأسبوع", "This week")}
          </button>
        ))}
      </div>
      <div className="mt-2 space-y-2">
        {rows.map((row, i) => (
          <div
            key={`${range}-${i}`}
            style={{ "--i": i } as CSSProperties}
            className="row-in flex items-center gap-2"
          >
            <span className="flex size-6 items-center justify-center rounded-md border border-[var(--border-strong)] bg-[var(--feat)] text-[var(--feat-fg)]">
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
    <div className="mt-5 w-full max-w-xs rounded-xl border-2 border-[var(--border-strong)] bg-background p-3">
      <div className="flex gap-1.5">
        {(["balance", "history"] as const).map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => setView(v)}
            className={cn(
              "rounded-md border px-2 py-0.5 text-[9px] font-bold transition-colors",
              view === v
                ? "border-[var(--border-strong)] bg-[var(--feat)] text-[var(--feat-fg)]"
                : "border-[var(--border-strong)]/40 text-muted-foreground",
            )}
          >
            {v === "balance" ? bi("الرصيد", "Balance") : bi("السجل", "History")}
          </button>
        ))}
      </div>
      {view === "balance" ? (
        <div className="mt-2 flex items-center justify-between rounded-lg bg-[var(--feat)]/25 p-3">
          <span className="flex size-9 items-center justify-center rounded-full border-2 border-[var(--border-strong)] bg-background text-foreground">
            <Wallet className="size-4" />
          </span>
          <div className="bar-grow h-2.5 w-16 rounded-full bg-[var(--feat)]" />
        </div>
      ) : (
        <div className="mt-2 space-y-1.5">
          {[0, 1].map((i) => (
            <div
              key={i}
              style={{ "--i": i } as CSSProperties}
              className="row-in flex items-center gap-2"
            >
              <span className="size-5 shrink-0 rounded-full bg-[var(--feat)]/60" />
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
      <section className="band-hero relative overflow-hidden border-b-2 border-[var(--border-strong)]">
        <div aria-hidden className="stripe-tri" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-[0.85fr_1.15fr] lg:px-8 xl:px-5">
          <Reveal delay={0}>
            <span className="inline-flex items-center gap-2.5 text-sm font-extrabold text-[var(--accent-2-text)]">
              <span aria-hidden className="h-[3px] w-4 rounded-full bg-[var(--brand)]" />
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
                <h1 className="mt-6 text-4xl font-extrabold leading-[1.2] text-foreground sm:text-5xl md:text-6xl ltr:md:text-5xl ltr:leading-[1.3]">
                  {/* {t("home.h1a")} {t("home.h1b")} {t("home.h1c")} */}
                  {t("home.h1a")} <span className="text-highlight">{t("home.h1b")}</span>{" "}
                  {t("home.h1c")}
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
      <section className="bg-card">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-extrabold text-foreground">
              {t("home.startTitleA")}{" "}
              <span className="text-highlight">{t("home.startTitleB")}</span>
            </h2>
            <p className="mt-3 text-muted-foreground">{t("home.startSub")}</p>
          </div>
          {/* خط زمني: أفقي من lg (7 أعمدة)، وعمودي تحتها. الخط مقاطع قصيرة بين كل رقم
            والتالي (لا خط واحد طويل) فيبدأ من مركز الرقم الأول وينتهي عند الأخير. */}
          <ol className="mt-12 grid gap-7 lg:grid-cols-7 lg:gap-4">
            {journeySteps.map((Icon, i) => (
              <li key={i} className="relative flex gap-4 lg:block">
                {i < journeySteps.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute start-[23px] top-6 h-[calc(100%+1.75rem)] w-0.5 bg-[var(--border-strong)] lg:top-[23px] lg:start-6 lg:h-0.5 lg:w-[calc(100%+1rem)]"
                  />
                )}
                {/* على الشاشات الكبيرة الخط أفقي واحد متصل: يمتد قبل الرقم 1 وبعد الرقم 7 إلى حافتي الحاوية. */}
                {i === 0 && (
                  <span
                    aria-hidden
                    className="absolute start-0 top-[23px] hidden h-0.5 w-6 bg-[var(--border-strong)] lg:block"
                  />
                )}
                {i === journeySteps.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute start-6 end-0 top-[23px] hidden h-0.5 bg-[var(--border-strong)] lg:block"
                  />
                )}
                <span
                  className={cn(
                    "relative z-10 grid size-12 shrink-0 place-items-center rounded-xl border-2 border-[var(--border-strong)] font-display text-lg font-extrabold shadow-[3px_3px_0_0_var(--shadow-brutal-color)]",
                    i === 0
                      ? "bg-primary text-primary-foreground"
                      : "bg-[var(--brand)] text-[var(--ink)]",
                  )}
                >
                  {i + 1}
                </span>
                <div className="pt-0.5 lg:pt-0">
                  <h3 className="flex items-center gap-1.5 text-sm font-extrabold text-foreground lg:mt-4">
                    <Icon aria-hidden className="size-4 shrink-0 text-primary" />
                    <Link
                      to="/how-it-works"
                      hash={`step-${i + 1}`}
                      className="hover:text-primary hover:underline"
                    >
                      {t(`home.startSteps.${i}.title`)}
                    </Link>
                  </h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground lg:text-xs">
                    {t(`home.startSteps.${i}.text`)}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-10">
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
        </div>
      </section>

      {/* المجاني — العنصر الوحيد هنا تحويلي فعليًا، فيحمل الصندوق ذا الحد
          السميك. النص المجاور يبقى بلا صندوق حتى يحتفظ الصندوق بمعناه. */}
      <section className="band-sun border-y-2 border-[var(--border-strong)]">
        <div className="mx-auto grid max-w-6xl gap-7 px-5 py-16 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-x-12 lg:gap-y-6">
          <div>
            <h2 className="text-3xl font-extrabold leading-snug text-foreground">
              <span className="text-highlight">{t("home.freeTitleHl")}</span>{" "}
              {t("home.freeTitleRest")}
            </h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
              {t("home.freeSub")}
            </p>
          </div>
          {/* القائمة: بطاقات منفصلة على الموبايل، وبطاقة واحدة جامعة من lg */}
          <div className="lg:row-span-2 lg:row-start-1 lg:col-start-2 lg:min-w-80 lg:rounded-2xl lg:border-2 lg:border-[var(--border-strong)] lg:bg-card lg:p-6 lg:shadow-[var(--shadow-brutal)]">
            <p className="mb-4 hidden font-bold text-foreground lg:block">
              {t("home.freeListTitle")}
            </p>
            <ul className="grid gap-3.5 lg:gap-3">
              {[0, 1, 2, 3, 4].map((i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 rounded-xl border-2 border-[var(--border-strong)] bg-card p-3.5 text-sm font-semibold text-foreground shadow-[3px_3px_0_0_var(--shadow-brutal-color)] lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 lg:font-normal lg:text-muted-foreground lg:shadow-none"
                >
                  <span
                    aria-hidden
                    className="grid size-[22px] shrink-0 place-items-center rounded-md border-2 border-[var(--border-strong)] bg-[var(--brand)] text-[var(--ink)] shadow-[2px_2px_0_0_var(--shadow-brutal-color)]"
                  >
                    <Check className="size-3" strokeWidth={3.5} />
                  </span>
                  <span>{t(`home.freeItems.${i}`)}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            {!session && (
              <Link
                to="/signup"
                className={buttonVariants({
                  variant: "default",
                  className: "h-auto px-7 py-3.5 text-sm",
                })}
              >
                {t("home.ctaPrimary")}
              </Link>
            )}
            <ul className="mt-5 flex flex-wrap gap-2">
              {[0, 1, 2].map((i) => (
                <li
                  key={i}
                  className="rounded-full border-[1.5px] border-[var(--border-strong)] bg-card px-3 py-1 text-xs font-bold text-foreground"
                >
                  {t(`home.trustItems.${i}`)}
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
                style={featureTone[f.tone] as CSSProperties}
                className="flex flex-col rounded-2xl border-2 border-t-8 border-[var(--border-strong)] border-t-[var(--feat)] bg-card p-6 shadow-[var(--shadow-brutal)]"
              >
                <span className="flex size-11 items-center justify-center rounded-xl border-2 border-[var(--border-strong)] bg-[var(--feat)] text-[var(--feat-fg)] shadow-[2px_2px_0_0_var(--shadow-brutal-color)]">
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

        <div className="mt-4 grid gap-3 rounded-2xl border-2 border-[var(--border-strong)] bg-card px-6 py-5 shadow-[3px_3px_0_0_var(--shadow-brutal-color)] sm:grid-cols-2 lg:grid-cols-4">
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
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border-2 border-[var(--border-strong)] bg-[var(--brand)] text-[var(--ink)] shadow-[2px_2px_0_0_var(--shadow-brutal-color)]">
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

      {/* فاصل القيمة — جملة واحدة كبيرة تكسر إيقاع الأقسام النصية المتتالية، ومن نفس
          نصوص الموقع (قيمة "الوضوح قبل الكمّية" بصفحة عنّا) فما في ادّعاء جديد.
          text-highlight = نفس الماركر بعنوان الـHero. */}
      <section className="scope-ink relative overflow-hidden border-y-2 border-[var(--border-strong)]">
        <div aria-hidden className="stripe-tri absolute inset-x-0 bottom-0" />
        <div className="mx-auto max-w-4xl px-5 py-16 text-center md:py-20">
          <Reveal>
            <p className="font-display text-4xl font-extrabold leading-snug text-foreground md:text-6xl">
              <span className="text-highlight">{t("home.statement.title")}</span>
            </p>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              {t("home.statement.sub")}
            </p>
            <Link
              to="/about"
              className={buttonVariants({
                variant: "default",
                className: "mt-8 h-auto px-7 py-3.5 text-sm",
              })}
            >
              {t("home.statement.cta")}
              <ArrowRight className="size-4 rtl:rotate-180" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* الأدوار — ثلاث بطاقات بحبر وظلّ. بطاقة المعلّم أكبرها لأنها وحدها تحمل
          معاينة حقيقية من الباك اند (لا ادّعاء "دور أساسي"). روابط الطالب وولي
          الأمر ظاهرة للجميع (صفحات عامة، بلا تصفية حسب الدور). */}
      <section className="band-sky border-y-2 border-[var(--border-strong)]">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <h2 className="max-w-2xl text-3xl font-extrabold text-foreground">
            {t("home.roles.titleA")}{" "}
            <span className="text-highlight">{t("home.roles.titleHl")}</span>
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-[2fr_1fr]">
            <div className="rounded-2xl border-2 border-[var(--border-strong)] border-t-[8px] border-t-[var(--brand)] bg-card p-6 shadow-[4px_4px_0_0_var(--shadow-brutal-color)] md:row-span-2">
              <div className="flex items-center gap-3">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl border-2 border-[var(--border-strong)] bg-[var(--brand)] text-[var(--ink)] shadow-[2px_2px_0_0_var(--shadow-brutal-color)]">
                  <teacherRole.icon className="size-5" />
                </span>
                <h3 className="text-lg font-bold text-foreground">{t("home.roles.teacher.t")}</h3>
              </div>
              <p className="mt-3 max-w-md text-sm text-muted-foreground">
                {t("home.roles.teacher.d")}
              </p>
              <TeacherPreview />
            </div>
            {otherRoles.map((r) => {
              const isStudent = r.key === "student";
              const link = isStudent
                ? session
                  ? { to: "/courses", label: t("home.signedIn.browse") }
                  : { to: "/signup", label: t("home.ctaPrimary") }
                : { to: "/for-parents", label: t("nav.forParents") };
              return (
                <div
                  key={r.key}
                  className="flex flex-col rounded-2xl border-2 border-[var(--border-strong)] bg-card p-6 shadow-[4px_4px_0_0_var(--shadow-brutal-color)]"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "grid size-11 shrink-0 place-items-center rounded-xl border-2 border-[var(--border-strong)] shadow-[2px_2px_0_0_var(--shadow-brutal-color)]",
                        isStudent
                          ? "bg-[var(--accent-2)] text-white"
                          : "bg-primary text-primary-foreground",
                      )}
                    >
                      <r.icon className="size-5" />
                    </span>
                    <h3 className="text-lg font-bold text-foreground">
                      {t(`home.roles.${r.key}.t`)}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{t(`home.roles.${r.key}.d`)}</p>
                  {link && (
                    <Link
                      to={link.to}
                      className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-bold text-primary hover:underline"
                    >
                      {link.label}
                      <ArrowRight className="size-4 rtl:rotate-180" />
                    </Link>
                  )}
                </div>
              );
            })}
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
          {latestPosts.map((post, idx) => (
            <Link
              key={post.slug}
              to="/blog/$slug"
              params={{ slug: post.slug }}
              className={cn(
                brutalCard,
                "flex flex-col border-t-[8px]",
                idx === 0 ? "border-t-[var(--brand)]" : "border-t-[var(--accent-2)]",
                brutalInteractive,
              )}
            >
              <span className="w-fit rounded-full border-2 border-[var(--border-strong)] bg-background px-3 py-0.5 text-xs font-bold text-foreground">
                {bi(post.category, post.categoryEn)}
              </span>
              <h3 className="mt-4 text-base font-bold leading-snug text-foreground">
                {bi(post.title, post.titleEn)}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                {bi(post.excerpt, post.excerptEn)}
              </p>
              <span className="mt-auto flex items-center justify-between gap-2 pt-5 text-xs font-semibold text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Clock3 className="size-3.5" />
                  {t("blog.readMinutes", { count: post.readMinutes })}
                </span>
                <ArrowRight className="size-4 text-primary rtl:rotate-180" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* الترتيب: المدونة ← قصص الطلاب ← بلوك الدعوة ← الفوتر. الدعوة هي ختام الصفحة،
          وقسم القصص (بانتظار محتوى حقيقي) بوسط الصفحة مو بآخرها. */}
      <TestimonialsSection className="border-t-2 border-[var(--border-strong)] bg-card" />

      {/* الدعوة الختامية: شريط عريض بلون الصدئي (الأساسي) بشريط ثلاثي علوي، بلا
          زخارف — نفس لغة شريط البيان الداكن. الزر بلون البطاقة ليبرز على الصدئي. */}
      <section className="border-y-2 border-[var(--border-strong)] bg-primary text-primary-foreground">
        <div aria-hidden className="stripe-tri" />
        <div className="mx-auto max-w-3xl px-5 py-16 text-center md:py-20">
          <h2 className="text-3xl font-extrabold md:text-5xl">
            {session && role ? t(`home.signedIn.${role}.h1`) : t("home.ctaTitle")}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-primary-foreground/85 md:text-lg">
            {session && role ? t(`home.signedIn.${role}.sub`) : t("home.ctaSub")}
          </p>
          <SessionCta
            to="/signup"
            label={t("home.ctaButton")}
            className={buttonVariants({
              variant: "outline",
              className:
                "mt-8 h-auto bg-card px-8 py-3.5 text-sm font-bold text-foreground shadow-[4px_4px_0_0_var(--shadow-brutal-color)] hover:bg-secondary",
            })}
          />
        </div>
      </section>
    </PublicLayout>
  );
}

/** معاينة حقيقية لثلاثة معلمين — بيانات فعلية من نفس مصدر /teachers، لا
 * صور أو أسماء وهمية. تفشل بصمت (بدون بطاقة خطأ) لأنها معاينة تكميلية،
 * لا وظيفة أساسية بالصفحة. */
function TeacherPreview() {
  const { t } = useTranslation();
  const bi = useBi();
  // ما منعتمد على isError هون: الديفولت العام (router.tsx) ما عنده
  // staleTime، يعني أي refetch خلفي (رجوع فوكس للتاب، إعادة اتصال شبكة —
  // شائع بالموبايل) ممكن يفشل بعد نجاح أول تحميل. React Query ما بيصفّر
  // data لما الـrefetch يفشل، فlist المعلمين القديمة الناجحة تبقى موجودة —
  // بس كنا منخفيها كمان لمجرد ظهور isError، فالبطاقات الثلاث كانت
  // "تظهر لحظة ثم تختفي" مع أي هفوة شبكة عابرة بعد أول عرض ناجح.
  const { data, isLoading } = useQuery({
    queryKey: ["backend-teachers-search", { skip: 0, pageSize: 3 }],
    queryFn: () => searchTeachers({ skip: 0, pageSize: 3 }),
    retry: 1,
  });
  const teachers = data?.data ?? [];

  // بلا معلمين (أو فشل الطلب): لا نعرض بطاقات ولا أسماء وهمية، بل جملة تصف صفحة
  // /teachers كما هي فعلًا + الرابط. الجملة صحيحة سواء غابت البيانات أو فشلت الشبكة.
  if (!isLoading && teachers.length === 0) {
    return (
      <div className="mt-6">
        <p className="max-w-md text-sm text-muted-foreground">{t("home.roles.teacher.browse")}</p>
        <Link
          to="/teachers"
          className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline"
        >
          {t("home.roles.teacher.cta")}
          <ArrowRight className="size-4 rtl:rotate-180" />
        </Link>
      </div>
    );
  }

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
