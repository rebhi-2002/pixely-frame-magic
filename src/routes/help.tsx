import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { LifeBuoy, Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PublicLayout } from "@/components/site/public-layout";

export const Route = createFileRoute("/help")({
  head: () => ({
    meta: [
      { title: "مركز المساعدة | أكاديميا" },
      {
        name: "description",
        content: "إجابات سريعة عن الحساب، الاشتراك، المكتبة، والخصوصية في أكاديميا.",
      },
      { property: "og:title", content: "مركز المساعدة | أكاديميا" },
      { property: "og:description", content: "أجوبة مختصرة لأكثر الأسئلة تكراراً على منصة أكاديميا." },
    ],
  }),
  component: HelpPage,
});

type Topic = { t: string; items: { q: string; a: string }[] };

function HelpPage() {
  const { t } = useTranslation();
  const topics = t("help.topics", { returnObjects: true }) as Topic[];
  const [query, setQuery] = useState("");

  const q = query.trim();
  const filtered = topics
    .map((topic) => ({
      ...topic,
      items: q ? topic.items.filter((i) => i.q.includes(q) || i.a.includes(q)) : topic.items,
    }))
    .filter((topic) => topic.items.length > 0);

  return (
    <PublicLayout>
      <section className="surface-grid border-b border-border">
        <div className="mx-auto max-w-3xl px-5 py-16">
          <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/12 text-primary">
            <LifeBuoy className="size-6" />
          </span>
          <h1 className="mt-5 text-4xl font-bold text-foreground">{t("help.h1")}</h1>
          <p className="mt-3 text-lg text-muted-foreground">{t("help.sub")}</p>
          <div className="relative mt-7">
            <Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("help.searchPlaceholder")}
              aria-label={t("help.searchPlaceholder")}
              className="h-12 w-full rounded-xl border border-border bg-card ps-9 pe-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-14">
        {filtered.length === 0 ? (
          <p className="rounded-2xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">
            {t("help.empty")}
          </p>
        ) : (
          <div className="space-y-10">
            {filtered.map((topic) => (
              <div key={topic.t}>
                <h2 className="text-xl font-bold text-foreground">{topic.t}</h2>
                <div className="mt-4 space-y-3">
                  {topic.items.map((item) => (
                    <details
                      key={item.q}
                      className="group rounded-2xl border border-border bg-card p-5 open:border-primary/40"
                    >
                      <summary className="cursor-pointer text-sm font-bold text-foreground">
                        {item.q}
                      </summary>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-14 rounded-2xl border border-border bg-card/60 p-8 text-center">
          <h2 className="text-xl font-bold text-foreground">{t("help.contactTitle")}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{t("help.contactSub")}</p>
          <a
            href="mailto:support@academia.app"
            className="mt-5 inline-flex rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
          >
            {t("help.contactCta")}
          </a>
          <p className="mt-4 text-xs text-muted-foreground">
            <Link to="/privacy" className="hover:underline">
              {t("nav.privacy")}
            </Link>
            {" · "}
            <Link to="/terms" className="hover:underline">
              {t("nav.terms")}
            </Link>
          </p>
        </div>
      </section>
    </PublicLayout>
  );
}
