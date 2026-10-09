import { createSeoHead, localeFromSearch } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, Clock3 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PublicLayout } from "@/components/site/public-layout";
import { PageHeader } from "@/components/site/page-header";
import { blogPosts } from "@/content/blog-posts";
import { usePreferences } from "@/hooks/use-preferences";
import { useBi } from "@/lib/bi";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/blog/")({
  head: (ctx) => createSeoHead("/blog", localeFromSearch(ctx.match.search)),
  component: BlogIndex,
});

// لون الحدّ العلوي من لوحة 14 (ذهبي/أزرق/صدئي) بالتناوب بحسب ترتيب البطاقة — تمييز بصري فقط.
const TOP_BORDERS = [
  "border-t-[var(--brand)]",
  "border-t-[var(--accent-2)]",
  "border-t-primary",
] as const;

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
      <PageHeader title={t("blog.h1")} highlight={t("blog.h1Hl")} sub={t("blog.sub")} />

      <section className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-5 md:grid-cols-2">
          {blogPosts
            .slice()
            .reverse()
            .map((post, idx) => (
              <Link
                key={post.slug}
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className={cn(
                  "flex h-full flex-col rounded-2xl border-2 border-t-[8px] border-[var(--border-strong)] bg-card p-6 shadow-[var(--shadow-brutal)] transition-all duration-150 ease-out hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--shadow-brutal-color)]",
                  TOP_BORDERS[idx % TOP_BORDERS.length],
                )}
              >
                <span className="w-fit rounded-full border-2 border-[var(--border-strong)] bg-background px-3 py-0.5 text-xs font-bold text-foreground">
                  {bi(post.category, post.categoryEn)}
                </span>
                <h3 className="mt-4 text-lg font-extrabold leading-snug text-foreground">
                  {bi(post.title, post.titleEn)}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {bi(post.excerpt, post.excerptEn)}
                </p>
                <div className="mt-5 flex items-center justify-between gap-4 border-t-2 border-[var(--border-strong)]/30 pt-4 text-xs font-semibold text-muted-foreground">
                  <span className="flex items-center gap-4">
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays className="size-3.5" />
                      {fmt.format(new Date(post.publishedAt))}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock3 className="size-3.5" />
                      {t("blog.readMinutes", { count: post.readMinutes })}
                    </span>
                  </span>
                  <ArrowRight className="size-4 text-primary rtl:rotate-180" />
                </div>
              </Link>
            ))}
        </div>
      </section>
    </PublicLayout>
  );
}
