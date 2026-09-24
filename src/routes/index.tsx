import { createSeoHead, localeFromSearch } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Check, LayoutDashboard } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PublicLayout } from "@/components/site/public-layout";
import { SessionCta } from "@/components/site/session-cta";
import { Reveal } from "@/components/ui/reveal";
import { useSession } from "@/hooks/use-session";
import { cn } from "@/lib/utils";
import { allowedPublicPaths, useBi } from "@/lib/bi";
import studentImg from "@/assets/home/student-study.jpg";
import teacherImg from "@/assets/home/teacher.jpg";
import parentImg from "@/assets/home/parent.jpg";
import mistakesImg from "@/assets/home/mistakes-desk.jpg";

export const Route = createFileRoute("/")({
  head: (ctx) => createSeoHead("/", localeFromSearch(ctx.match.search)),
  component: Landing,
});

/* شكل هندسي واحد لكل محطة — لغة Playful Geometric بألوان الهوية فقط */
function Shape({ kind, className }: { kind: number; className?: string }) {
  const c = cn("size-6", className);
  if (kind === 0) return <span className={cn(c, "rounded-full bg-primary")} />;
  if (kind === 1) return <span className={cn(c, "rounded-md bg-success")} />;
  if (kind === 2)
    return (
      <svg viewBox="0 0 24 24" className={c} aria-hidden>
        <path d="M12 2 23 22H1Z" className="fill-primary" />
      </svg>
    );
  return <span className={cn(c, "rotate-45 rounded-sm border-[3px] border-foreground")} />;
}

function ProductPreview() {
  const bi = useBi();
  const subjects = [
    { ar: "اللغة العربية", en: "Arabic", v: 72 },
    { ar: "الرياضيات", en: "Mathematics", v: 58 },
    { ar: "الفيزياء", en: "Physics", v: 41 },
  ];
  return (
    <div className="relative">
      {/* بقعة ضوء كهرمانية خلف المعاينة فقط + دائرة هندسية واحدة */}
      <div aria-hidden className="absolute -inset-10 rounded-full bg-primary/15 blur-3xl" />
      <div
        aria-hidden
        className="absolute -top-8 size-40 rounded-full border-[10px] border-primary/70 ltr:-right-8 rtl:-left-8"
      />
      <div className="relative rounded-3xl border-2 border-foreground/90 bg-card p-6 shadow-[8px_8px_0_0_var(--color-foreground)] rtl:shadow-[-8px_8px_0_0_var(--color-foreground)]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">{bi("مساء الخير", "Good evening")}</p>
            <p className="font-display text-lg font-bold text-foreground">
              {bi("سارة · علمي", "Sara · Science")}
            </p>
          </div>
          <span className="rounded-full bg-success/15 px-3 py-1 text-xs font-bold text-success">
            {bi("التوجيهي 2026", "Tawjihi 2026")}
          </span>
        </div>
        <div className="mt-6 space-y-4">
          {subjects.map((s) => (
            <div key={s.en}>
              <div className="flex justify-between text-sm">
                <span className="font-semibold text-foreground">{bi(s.ar, s.en)}</span>
                <span className="font-mono text-muted-foreground">{s.v}%</span>
              </div>
              <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-secondary">
                <div className="h-full rounded-full bg-primary" style={{ width: `${s.v}%` }} />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex items-center justify-between gap-3 rounded-2xl border border-border bg-background p-4">
          <div>
            <p className="text-xs font-bold text-primary">{bi("خطوتك التالية", "Your next step")}</p>
            <p className="mt-0.5 text-sm font-semibold text-foreground">
              {bi("راجع 6 أخطاء في الفيزياء", "Review 6 physics mistakes")}
            </p>
          </div>
          <ArrowLeft className="size-5 shrink-0 text-primary ltr:rotate-180" />
        </div>
      </div>
    </div>
  );
}

const roles = [
  {
    key: "student",
    img: studentImg,
    ar: ["الطالب", "خطة واضحة كل يوم", "تعرف ماذا تدرس الآن، تختبر نفسك، وترجع لأخطائك قبل الامتحان."],
    en: ["Student", "A clear plan every day", "Know what to study now, test yourself, and revisit your mistakes before the exam."],
    outcome: ["تقدّم ملموس في كل مادة", "Visible progress in every subject"],
  },
  {
    key: "teacher",
    img: teacherImg,
    ar: ["المعلّم", "صفّك في مكان واحد", "انشر دروسك وكورساتك، صحّح الاختبارات، وتابع من يحتاج مساعدة."],
    en: ["Teacher", "Your class in one place", "Publish lessons and courses, grade quizzes, and see who needs help."],
    outcome: ["وقت أقل في الإدارة", "Less time on admin"],
  },
  {
    key: "parent",
    img: parentImg,
    ar: ["ولي الأمر", "اطمئنان بدون ضغط", "تقرير أسبوعي مختصر عن تقدّم ابنك أو ابنتك، بدون مراقبة مزعجة."],
    en: ["Parent", "Peace of mind, no pressure", "A short weekly report on your child's progress — no intrusive monitoring."],
    outcome: ["تقرير أسبوعي واضح", "A clear weekly report"],
  },
] as const;

function Landing() {
  const { t } = useTranslation();
  const bi = useBi();
  const { session } = useSession();
  const role = session?.roleKey;
  const canBrowseCourses = role ? (allowedPublicPaths(role) ?? []).includes("/courses") : false;
  const [activeRole, setActiveRole] = useState(0);
  const r = roles[activeRole];

  return (
    <PublicLayout>
      {/* 01 — HERO */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 py-20 md:py-28 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div>
            <p className="flex items-center gap-3 text-sm font-bold text-primary">
              <span className="h-0.5 w-8 bg-primary" />
              {session ? t("home.signedIn.welcome", { name: session.fullName }) : t("home.badge")}
            </p>
            {session && role ? (
              <>
                <h1 className="mt-6 font-display text-4xl font-bold leading-[1.25] text-foreground sm:text-5xl md:text-6xl">
                  {t(`home.signedIn.${role}.h1`)}
                </h1>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                  {t(`home.signedIn.${role}.sub`)}
                </p>
                <div className="mt-10 flex flex-wrap gap-3">
                  <Link
                    to={session.home}
                    className="hover-press inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground"
                  >
                    <LayoutDashboard className="size-4" />
                    {t("home.signedIn.cta")}
                  </Link>
                  {canBrowseCourses && (
                    <Link
                      to="/courses"
                      className="hover-press inline-flex items-center rounded-full border-2 border-foreground px-7 py-3.5 text-sm font-bold text-foreground"
                    >
                      {t("home.signedIn.browse")}
                    </Link>
                  )}
                </div>
              </>
            ) : (
              <>
                <h1 className="mt-6 font-display text-4xl font-bold leading-[1.3] text-foreground sm:text-5xl md:text-6xl">
                  {bi("رتّب دراسة التوجيهي", "Organize your Tawjihi study")}
                  <br />
                  <span className="relative inline-block">
                    {bi("وابدأ بثقة مع أكاديميا.", "and start with confidence.")}
                    <svg
                      aria-hidden
                      viewBox="0 0 300 12"
                      preserveAspectRatio="none"
                      className="absolute -bottom-2 start-0 h-3 w-full"
                    >
                      <path d="M2 9 Q150 -2 298 9" strokeWidth="5" fill="none" strokeLinecap="round" className="stroke-primary" />
                    </svg>
                  </span>
                </h1>
                <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
                  {bi(
                    "كل موادك، اختباراتك، أخطاؤك وتقدّمك في مكان واحد — لتعرف ماذا تدرس الآن، وما الذي يحتاج إلى مراجعة.",
                    "All your subjects, quizzes, mistakes and progress in one place — so you know what to study now and what needs review.",
                  )}
                </p>
                <div className="mt-10 flex flex-wrap gap-3">
                  <Link
                    to="/signup"
                    className="hover-press inline-flex items-center rounded-full bg-primary px-8 py-3.5 text-sm font-bold text-primary-foreground"
                  >
                    {t("home.ctaPrimary")}
                  </Link>
                  <a
                    href="#journey"
                    className="hover-press inline-flex items-center rounded-full border-2 border-foreground px-7 py-3.5 text-sm font-bold text-foreground"
                  >
                    {bi("كيف تعمل أكاديميا؟", "How does it work?")}
                  </a>
                </div>
              </>
            )}
          </div>
          <Reveal delay={0.1} y={16}>
            <ProductPreview />
          </Reveal>
        </div>
      </section>

      {/* 02 — LEARNING JOURNEY: مسار واحد متصل بدل أربع بطاقات */}
      <section id="journey" className="scroll-mt-24 mx-auto max-w-6xl px-5 py-24">
        <p className="font-mono text-sm font-bold text-primary">01</p>
        <h2 className="mt-2 font-display text-3xl font-bold text-foreground md:text-4xl">
          {t("home.startTitle")}
        </h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">{t("home.startSub")}</p>
        <ol className="relative mt-16 grid gap-12 md:grid-cols-4 md:gap-6">
          <span
            aria-hidden
            className="absolute top-3 hidden h-0 w-full border-t-2 border-dashed border-border md:block"
          />
          {[0, 1, 2, 3].map((i) => (
            <Reveal key={i} delay={i * 0.08}>
              <li className={cn("relative", i % 2 === 1 && "md:mt-14")}>
                <span className="relative z-10 flex size-12 items-center justify-center rounded-full border-2 border-foreground bg-background">
                  <Shape kind={i} className="size-5" />
                </span>
                <p className="mt-5 font-display text-5xl font-bold text-foreground/15">0{i + 1}</p>
                <h3 className="-mt-3 text-lg font-bold text-foreground">
                  {t(`home.startSteps.${i}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {t(`home.startSteps.${i}.text`)}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* 03 — CORE CAPABILITIES: أربع قدرات مجمّعة بتركيب غير متماثل */}
      <section className="border-y border-border bg-card/40">
        <div className="mx-auto max-w-6xl px-5 py-24">
          <p className="font-mono text-sm font-bold text-primary">02</p>
          <h2 className="mt-2 font-display text-3xl font-bold text-foreground md:text-4xl">
            {bi("ما الذي ستجده في أكاديميا؟", "What you'll find in Academia")}
          </h2>
          <div className="mt-12 grid gap-5 lg:grid-cols-6">
            <Reveal className="lg:col-span-4">
              <article className="grid h-full overflow-hidden rounded-3xl border-2 border-foreground bg-background md:grid-cols-2">
                <div className="p-8">
                  <Shape kind={0} />
                  <h3 className="mt-5 font-display text-2xl font-bold text-foreground">
                    {bi("تعلّم منظّم", "Organized learning")}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {bi(
                      "مكتبة مرتّبة حسب فرعك ومادتك ووحدتك، مع دروس ومراجعات مجدولة — تعرف دائماً أين وصلت.",
                      "A library sorted by stream, subject and unit, with lessons and scheduled reviews — always know where you are.",
                    )}
                  </p>
                </div>
                <img src={studentImg} alt={bi("طالبة تدرس على مكتبها مساءً", "A student studying at her desk")} loading="lazy" width={1280} height={960} className="h-64 w-full object-cover md:h-full" />
              </article>
            </Reveal>
            <Reveal delay={0.08} className="lg:col-span-2">
              <article className="flex h-full flex-col rounded-3xl bg-primary p-8 text-primary-foreground">
                <span className="size-6 rounded-md bg-primary-foreground" />
                <h3 className="mt-5 font-display text-2xl font-bold">{bi("اعرف مستواك", "Know your level")}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed opacity-85">
                  {bi("اختبار تشخيصي ومحاكي امتحانات بنظام التوجيهي يوضح نقاط قوتك وضعفك.", "A diagnostic test and Tawjihi-style exam simulator that show your strengths and gaps.")}
                </p>
                <p className="mt-6 font-display text-5xl font-bold">85<span className="text-2xl">/100</span></p>
              </article>
            </Reveal>
            <Reveal delay={0.05} className="lg:col-span-3">
              <article className="relative h-full overflow-hidden rounded-3xl border border-border">
                <img src={mistakesImg} alt={bi("ورقة اختبار مصحّحة على مكتب دراسة", "A corrected practice test on a study desk")} loading="lazy" width={1280} height={960} className="absolute inset-0 size-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
                <div className="relative flex h-full min-h-72 flex-col justify-end p-8">
                  <Shape kind={2} />
                  <h3 className="mt-4 font-display text-2xl font-bold text-foreground">{bi("تعلّم من أخطائك", "Learn from mistakes")}</h3>
                  <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                    {bi("كل خطأ يُحفظ في بنك الأخطاء ويعود إليك في المراجعة حتى تتقنه.", "Every mistake is saved to your mistake bank and returns in reviews until you master it.")}
                  </p>
                </div>
              </article>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-3">
              <article className="flex h-full flex-col justify-between rounded-3xl border-2 border-dashed border-border bg-background p-8">
                <div>
                  <Shape kind={3} />
                  <h3 className="mt-5 font-display text-2xl font-bold text-foreground">{bi("تعلّم مع الآخرين", "Learn with others")}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {bi("مدرّسون موثّقون، كورسات مختارة، ومجتمع لكل مادة تسأل فيه وتساعد غيرك.", "Verified teachers, curated courses, and a community per subject to ask and help.")}
                  </p>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  <Link to="/teachers" className="rounded-full bg-secondary px-4 py-2 text-xs font-bold text-foreground hover:bg-secondary/70">{t("nav.teachers")}</Link>
                  <Link to="/courses" className="rounded-full bg-secondary px-4 py-2 text-xs font-bold text-foreground hover:bg-secondary/70">{t("nav.courses")}</Link>
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 04 — ROLES: مبدّل أدوار، الطالب أولاً */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <p className="font-mono text-sm font-bold text-primary">03</p>
        <h2 className="mt-2 font-display text-3xl font-bold text-foreground md:text-4xl">
          {bi("من يستخدم أكاديميا؟", "Who uses Academia?")}
        </h2>
        <div role="tablist" className="mt-8 inline-flex gap-1 rounded-full border-2 border-foreground p-1">
          {roles.map((x, i) => (
            <button
              key={x.key}
              role="tab"
              aria-selected={i === activeRole}
              onClick={() => setActiveRole(i)}
              className={cn(
                "rounded-full px-5 py-2 text-sm font-bold transition-colors",
                i === activeRole ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {bi(x.ar[0], x.en[0])}
            </button>
          ))}
        </div>
        <div key={r.key} role="tabpanel" className="mt-10 grid items-center gap-10 animate-in fade-in duration-500 md:grid-cols-2">
          <div className="relative">
            <div aria-hidden className="absolute -bottom-4 size-full rounded-3xl bg-primary ltr:-right-4 rtl:-left-4" />
            <img src={r.img} alt={bi(r.ar[1], r.en[1])} loading="lazy" width={1280} height={960} className="relative aspect-[4/3] w-full rounded-3xl object-cover" />
          </div>
          <div>
            <h3 className="font-display text-3xl font-bold text-foreground">{bi(r.ar[1], r.en[1])}</h3>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{bi(r.ar[2], r.en[2])}</p>
            <p className="mt-6 flex items-center gap-2 font-bold text-success">
              <Check className="size-5" />
              {bi(r.outcome[0], r.outcome[1])}
            </p>
          </div>
        </div>
      </section>

      {/* 05 — FREE START: بيان + قائمة مختصرة */}
      <section className="border-y border-border bg-primary/5">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="font-display text-4xl font-bold leading-tight text-foreground md:text-5xl">
              {t("home.freeTitle")}
            </h2>
            <span aria-hidden className="mt-6 block h-1.5 w-20 rounded-full bg-success" />
            <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">{t("home.freeSub")}</p>
          </div>
          <ul className="space-y-4">
            {[0, 1, 2, 3, 4].map((i) => (
              <li key={i} className="flex items-start gap-3 border-b border-border pb-4 text-foreground">
                <Check className="mt-0.5 size-5 shrink-0 text-success" />
                <span>{t(`home.freeItems.${i}`)}</span>
              </li>
            ))}
            <li className="pt-2 text-sm text-muted-foreground">{t("home.trustNote")}</li>
          </ul>
        </div>
      </section>

      {/* 06 — FINAL CTA: خاتمة القصة */}
      <section className="mx-auto max-w-4xl px-5 py-24 text-center">
        <div className="flex justify-center gap-3" aria-hidden>
          <Shape kind={0} className="size-4" />
          <Shape kind={1} className="size-4" />
          <Shape kind={2} className="size-4" />
        </div>
        <h2 className="mt-6 font-display text-3xl font-bold text-foreground md:text-4xl">{t("home.ctaTitle")}</h2>
        <p className="mt-3 text-muted-foreground">{t("home.ctaSub")}</p>
        <SessionCta
          to="/signup"
          label={t("home.ctaButton")}
          className="hover-press mt-8 inline-flex items-center justify-center rounded-full bg-primary px-9 py-4 text-sm font-bold text-primary-foreground"
        />
      </section>
    </PublicLayout>
  );
}
