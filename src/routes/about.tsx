import { createSeoHead, localeFromSearch } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Compass, HeartHandshake, Languages, Target, Code2, ServerCog } from "lucide-react";
import { PhotoAvatar } from "@/components/site/photo-avatar";
import { useTranslation } from "react-i18next";
import { PublicLayout } from "@/components/site/public-layout";
import { SessionCta } from "@/components/site/session-cta";
import { buttonVariants } from "@/components/ui/button-variants";
import { useSession } from "@/hooks/use-session";

export const Route = createFileRoute("/about")({
  head: (ctx) => createSeoHead("/about", localeFromSearch(ctx.match.search)),
  component: AboutPage,
});

const valueIcons = [Compass, HeartHandshake, Languages, Target];
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
      <section className="border-b-2 border-[var(--border-strong)] bg-card">
        <div className="mx-auto max-w-4xl px-5 py-20">
          <h1 className="text-4xl font-extrabold leading-[1.25] text-foreground md:text-5xl">
            {t("about.h1")}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{t("about.sub")}</p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-16">
        <h2 className="text-2xl font-extrabold text-foreground">{t("about.missionTitle")}</h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">{t("about.mission")}</p>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {values.map((v, i) => {
            const Icon = valueIcons[i % valueIcons.length];
            return (
              <article
                key={v.t}
                className="h-full rounded-2xl border-2 border-[var(--border-strong)] bg-card p-6 shadow-[var(--shadow-brutal)]"
              >
                <span className="flex size-11 items-center justify-center rounded-xl border-2 border-[var(--border-strong)] bg-primary/12 text-primary">
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
        <div className="mx-auto max-w-4xl px-5 py-16">
          <h2 className="text-2xl font-extrabold text-foreground">{t("about.teamTitle")}</h2>
          <p className="mt-2 text-muted-foreground">{t("about.teamSub")}</p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {team.map((m, i) => {
              const member = teamMembers[i % teamMembers.length];
              return (
                <div
                  key={member.photo}
                  className="flex h-full items-start gap-4 rounded-2xl border-2 border-[var(--border-strong)] bg-background p-6 shadow-[var(--shadow-brutal)]"
                >
                  <PhotoAvatar src={member.photo} icon={member.icon} className="size-14" />
                  <div>
                    <h3 className="font-bold text-foreground">{m.n}</h3>
                    <p className="text-xs font-semibold text-primary">{m.t}</p>
                    <p className="mt-1.5 text-sm text-muted-foreground">{m.d}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-20 text-center">
        <h2 className="text-3xl font-extrabold text-foreground">{t("about.ctaTitle")}</h2>
        <p className="mt-3 text-muted-foreground">{t("about.ctaSub")}</p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <SessionCta
            to="/signup"
            label={t("about.ctaPrimary")}
            className={buttonVariants({
              variant: "default",
              className: "h-auto px-7 py-3.5 text-sm",
            })}
          />
          {!isSignedIn && (
            <Link
              to="/teacher/register"
              className={buttonVariants({
                variant: "outline",
                className: "h-auto px-7 py-3.5 text-sm",
              })}
            >
              {t("about.ctaSecondary")}
            </Link>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}
