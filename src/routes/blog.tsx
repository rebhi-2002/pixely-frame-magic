import { createSeoHead, localeFromSearch } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarDays, Clock3, NotebookPen } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PublicLayout } from "@/components/site/public-layout";
import { blogPosts } from "@/content/blog-posts";
import { usePreferences } from "@/hooks/use-preferences";
import { useBi } from "@/lib/bi";

export const Route = createFileRoute("/blog")({
  head: (ctx) => createSeoHead("/blog", localeFromSearch(ctx.match.search)),
  component: BlogIndex,
});

function BlogIndex() {
  const { t } = useTranslation();
  const { locale } = usePreferences();
  const bi = useBi();
  const fmt = new Intl.DateTimeFormat(locale === "en" ? "en-US" : "ar", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <PublicLayout>
      <section className="border-b-2 border-[var(--border-strong)] bg-card">
        <div className="mx-auto max-w-5xl px-5 py-16">
          <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/12 text-primary">
            <NotebookPen className="size-6" />
          </span>
          <h1 className="mt-5 text-4xl font-extrabold text-foreground">{t("blog.h1")}</h1>
          <p className="mt-3 max-w-xl text-lg text-muted-foreground">{t("blog.sub")}</p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-16">
        <div className="grid gap-5 md:grid-cols-2">
          {blogPosts
            .slice()
            .reverse()
            .map((post) => (
              <Link
                key={post.slug}
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="flex h-full flex-col rounded-2xl border-2 border-[var(--border-strong)] bg-card p-6 shadow-[var(--shadow-brutal)] transition-all duration-150 ease-out hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--shadow-brutal-color)]"
              >
                <span className="w-fit rounded-full border border-[var(--border-strong)]/40 bg-primary/12 px-3 py-1 text-xs font-semibold text-primary">
                  {bi(post.category, post.categoryEn)}
                </span>
                <h2 className="mt-4 text-lg font-extrabold leading-snug text-foreground">
                  {bi(post.title, post.titleEn)}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {bi(post.excerpt, post.excerptEn)}
                </p>
                <div className="mt-5 flex items-center gap-4 border-t-2 border-[var(--border-strong)]/30 pt-4 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="size-3.5" />
                    {fmt.format(new Date(post.publishedAt))}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock3 className="size-3.5" />
                    {t("blog.readMinutes", { count: post.readMinutes })}
                  </span>
                </div>
              </Link>
            ))}
        </div>
      </section>
    </PublicLayout>
  );
}
