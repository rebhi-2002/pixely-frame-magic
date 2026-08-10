import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Gift } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PublicLayout } from "@/components/site/public-layout";
import { SessionCta } from "@/components/site/session-cta";

export const Route = createFileRoute("/invite/$code")({
  head: () => ({
    meta: [
      { title: "دعوة إلى أكاديميا" },
      { name: "description", content: "انضم إلى أكاديميا عبر رابط دعوة واحصل على مزايا البداية." },
      { property: "og:title", content: "دعوة إلى أكاديميا" },
      { property: "og:description", content: "انضم عبر رابط صديقك واحصل على شهر بريميوم تجريبي." },
    ],
  }),
  component: InvitePage,
});

function InvitePage() {
  const { code } = Route.useParams();
  const { t } = useTranslation();
  const perks = t("invite.perks", { returnObjects: true }) as string[];

  return (
    <PublicLayout>
      <section className="mx-auto max-w-2xl px-5 py-20">
        <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/12 text-primary">
          <Gift className="size-6" />
        </span>
        <h1 className="mt-5 text-3xl font-bold text-foreground">{t("invite.h1")}</h1>
        <p className="mt-3 text-muted-foreground">{t("invite.sub")}</p>

        <div className="mt-7 rounded-2xl border border-border bg-card p-5">
          <p className="text-xs text-muted-foreground">{t("invite.codeLabel")}</p>
          <p className="mt-1 font-mono text-lg font-bold tracking-widest text-primary">{code}</p>
        </div>

        <ul className="mt-7 space-y-3">
          {perks.map((p) => (
            <li key={p} className="flex items-start gap-2.5 text-sm text-foreground">
              <Check className="mt-0.5 size-4 shrink-0 text-success" />
              {p}
            </li>
          ))}
        </ul>

        <div className="mt-9 flex flex-wrap gap-3">
          <Link
            to="/signup"
            search={{ invite: code }}
            className="glow-primary inline-flex rounded-xl bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
          >
            {t("invite.cta")}
          </Link>
          <Link
            to="/login"
            className="inline-flex rounded-xl border border-border bg-card px-7 py-3.5 text-sm font-bold text-foreground transition-colors hover:bg-secondary"
          >
            {t("invite.login")}
          </Link>
        </div>

        <p className="mt-6 text-xs text-muted-foreground">{t("invite.disclaimer")}</p>
      </section>
    </PublicLayout>
  );
}
