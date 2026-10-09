import { createSeoHead, localeFromSearch } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Eye, ShieldCheck, Languages, Receipt, Code2, ServerCog } from "lucide-react";
import { PhotoAvatar } from "@/components/site/photo-avatar";
import { useTranslation } from "react-i18next";
import { PageHeader } from "@/components/site/page-header";
import { cn } from "@/lib/utils";
import { PublicLayout } from "@/components/site/public-layout";
import { SessionCta } from "@/components/site/session-cta";
import { buttonVariants } from "@/components/ui/button-variants";
import { useSession } from "@/hooks/use-session";

export const Route = createFileRoute("/about")({
  head: (ctx) => createSeoHead("/about", localeFromSearch(ctx.match.search)),
  component: AboutPage,
});

/* كل أيقونة بتطابق معنى القيمة الفعلي (مو زخرفة عامة):
   الوضوح قبل الكمّية → وضوح/شفافية بصرية، خصوصية الطالب → حماية صلاحيات
   القراءة فقط، عربي أولاً → اللغة، شفافية مالية → سجل معاملات واضح. */
const valueIcons = [Eye, ShieldCheck, Languages, Receipt];

/* دورة الألوان الموحّدة للوحة 14: ذهبي / سماوي / صدأ */
const TILES = [
  "bg-[var(--brand)] text-[var(--ink)]",
  "bg-[var(--accent-2)] text-white",
  "bg-primary text-primary-foreground",
] as const;
const TOP_BORDERS = [
  "border-t-[var(--brand)]",
  "border-t-[var(--accent-2)]",
  "border-t-primary",
] as const;
const TILE_FRAME =
  "flex shrink-0 items-center justify-center border-2 border-[var(--border-strong)] shadow-[2px_2px_0_0_var(--shadow-brutal-color)]";

/* صورة + أيقونة احتياطية لكل عضو فريق، بالترتيب: فرونت، باك اند 1، باك اند 2.
   حط صورة حقيقية بنفس الاسم داخل public/team/ وبتظهر تلقائياً — عبر
   PhotoAvatar المشترك (نفس المكوّن المستخدم لصور المعلمين بصفحة الكورسات). */
const teamMembers = [
  { photo: "/team/frontend.jpg", icon: Code2 },
  { photo: "/team/backend-1.jpg", icon: ServerCog },
  { photo: "/team/backend-2.jpg", icon: ServerCog },
];

function AboutPage() {
  const { t } = useTranslation();
  const { isSignedIn } = useSession();
  const values = t("about.values", { returnObjects: true }) as { t: string; d: string }[];
  const team = t("about.team", { returnObjects: true }) as { n: string; t: string; d: string }[];

  return (
    <PublicLayout>
      <PageHeader title={t("about.h1")} highlight={t("about.h1b")} sub={t("about.sub")} />

      <section className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="text-2xl font-extrabold text-foreground">{t("about.missionTitle")}</h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">{t("about.mission")}</p>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => {
            const Icon = valueIcons[i % valueIcons.length];
            return (
              <article
                key={v.t}
                className={cn(
                  "h-full rounded-2xl border-2 border-t-[8px] border-[var(--border-strong)] bg-card p-6 shadow-[var(--shadow-brutal)]",
                  TOP_BORDERS[i % TOP_BORDERS.length],
                )}
              >
                <span className={cn(TILE_FRAME, "size-11 rounded-xl", TILES[i % TILES.length])}>
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-4 font-bold text-foreground">{v.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.d}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="border-y-2 border-[var(--border-strong)] bg-card/60">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="text-2xl font-extrabold text-foreground">{t("about.teamTitle")}</h2>
          <p className="mt-2 text-muted-foreground">{t("about.teamSub")}</p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {team.map((m, i) => {
              const member = teamMembers[i % teamMembers.length];
              return (
                <div
                  key={member.photo}
                  className={cn(
                    "h-full rounded-2xl border-2 border-t-[8px] border-[var(--border-strong)] bg-background p-6 shadow-[var(--shadow-brutal)]",
                    TOP_BORDERS[i % TOP_BORDERS.length],
                  )}
                >
                  <PhotoAvatar
                    src={member.photo}
                    icon={member.icon}
                    className={cn(
                      "size-16 rounded-2xl shadow-[2px_2px_0_0_var(--shadow-brutal-color)]",
                      TILES[i % TILES.length],
                    )}
                  />
                  <h3 className="mt-4 font-bold text-foreground">{m.n}</h3>
                  <p className="mt-1 text-xs font-bold text-primary">{m.t}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.d}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t-2 border-[var(--border-strong)] bg-primary text-primary-foreground">
        <div aria-hidden className="stripe-tri" />
        <div className="mx-auto max-w-3xl px-5 py-16 text-center md:py-20">
          <h2 className="text-3xl font-extrabold md:text-4xl">{t("about.ctaTitle")}</h2>
          <p className="mt-3 text-primary-foreground/85">{t("about.ctaSub")}</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <SessionCta
              to="/signup"
              label={t("about.ctaPrimary")}
              className={buttonVariants({
                variant: "outline",
                className:
                  "h-auto bg-card px-7 py-3.5 text-sm font-bold text-foreground shadow-[4px_4px_0_0_var(--shadow-brutal-color)] hover:bg-secondary",
              })}
            />
            {!isSignedIn && (
              <Link
                to="/teacher/register"
                className={buttonVariants({
                  variant: "outline",
                  className:
                    "h-auto border-primary-foreground bg-transparent px-7 py-3.5 text-sm font-bold text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground",
                })}
              >
                {t("about.ctaSecondary")}
              </Link>
            )}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
