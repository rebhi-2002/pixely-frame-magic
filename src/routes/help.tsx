import { createSeoHead, localeFromSearch } from "@/lib/seo";
import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { LifeBuoy, Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PublicLayout } from "@/components/site/public-layout";
import { buttonVariants } from "@/components/ui/button-variants";

export const Route = createFileRoute("/help")({
  head: (ctx) => createSeoHead("/help", localeFromSearch(ctx.match.search)),
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
      <section className="border-b-2 border-[var(--border-strong)] bg-card">
        <div className="mx-auto max-w-3xl px-5 py-16">
          <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/12 text-primary">
            <LifeBuoy className="size-6" />
          </span>
          <h1 className="mt-5 text-4xl font-extrabold text-foreground">{t("help.h1")}</h1>
          <p className="mt-3 text-lg text-muted-foreground">{t("help.sub")}</p>
          <div className="relative mt-7">
            <Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("help.searchPlaceholder")}
              aria-label={t("help.searchPlaceholder")}
              className="h-12 w-full rounded-xl border-2 border-[var(--border-strong)] bg-background ps-9 pe-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-14">
        {filtered.length === 0 ? (
          <p className="rounded-2xl border-2 border-[var(--border-strong)] bg-card p-8 text-center text-sm text-muted-foreground">
            {t("help.empty")}
          </p>
        ) : (
          <div className="space-y-10">
            {filtered.map((topic) => (
              <div key={topic.t}>
                <h2 className="text-xl font-extrabold text-foreground">{topic.t}</h2>
                <div className="mt-4 space-y-3">
                  {topic.items.map((item) => (
                    <details
                      key={item.q}
                      className="group rounded-2xl border-2 border-[var(--border-strong)] bg-card p-5 shadow-[var(--shadow-brutal)] open:border-primary"
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

        <div className="mt-14 rounded-2xl border-2 border-[var(--border-strong)] bg-card p-8 text-center shadow-[var(--shadow-brutal)]">
          <h2 className="text-xl font-extrabold text-foreground">{t("help.contactTitle")}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{t("help.contactSub")}</p>
          <Link
            to="/contact"
            className={buttonVariants({ variant: "default", className: "mt-5 h-auto px-6 py-3 text-sm" })}
          >
            {t("help.contactCta")}
          </Link>
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
