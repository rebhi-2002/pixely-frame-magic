import { createSeoHead, localeFromSearch } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, Clock3 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PublicLayout } from "@/components/site/public-layout";
import { SessionCta } from "@/components/site/session-cta";
import { BlogRenderer } from "@/components/site/blog-renderer";
import { buttonVariants } from "@/components/ui/button-variants";
import { usePreferences } from "@/hooks/use-preferences";
import { blogPosts, getBlogPost } from "@/content/blog-posts";
import { useBi } from "@/lib/bi";

export const Route = createFileRoute("/blog/$slug")({
  head: (ctx) => {
    const { params } = ctx;
    return createSeoHead(
      `/blog/${encodeURIComponent(params.slug)}`,
      localeFromSearch(ctx.match.search),
    );
  },
  component: BlogPostPage,
});

function BlogPostPage() {
  const { slug } = Route.useParams();
  const { t } = useTranslation();
  const bi = useBi();
  const { locale } = usePreferences();
  const post = getBlogPost(slug);

  if (!post) {
    return (
      <PublicLayout>
        <section className="mx-auto max-w-2xl px-5 py-24 text-center">
          <h1 className="text-2xl font-extrabold text-foreground">{t("blog.notFound")}</h1>
          <p className="mt-3 text-muted-foreground">{t("blog.notFoundSub")}</p>
          <Link
            to="/blog"
            className={buttonVariants({
              variant: "default",
              className: "mt-7 h-auto px-6 py-3 text-sm",
            })}
          >
            {t("blog.backToBlog")}
          </Link>
        </section>
      </PublicLayout>
    );
  }

  const fmt = new Intl.DateTimeFormat(locale === "en" ? "en-US" : "ar", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const others = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <PublicLayout>
      <article className="mx-auto max-w-2xl px-5 py-14">
        <Link
          to="/blog"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-primary"
        >
          <ArrowRight className="size-4 rtl:rotate-180" />
          {t("blog.backToBlog")}
        </Link>

        <span className="mt-6 inline-block w-fit rounded-full border border-[var(--border-strong)]/40 bg-primary/12 px-3 py-1 text-xs font-semibold text-primary">
          {bi(post.category, post.categoryEn)}
        </span>
        <h1 className="mt-4 text-3xl font-extrabold leading-[1.35] text-foreground sm:text-4xl">
          {bi(post.title, post.titleEn)}
        </h1>
        <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="size-3.5" />
            {fmt.format(new Date(post.publishedAt))}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock3 className="size-3.5" />
            {t("blog.readMinutes", { count: post.readMinutes })}
          </span>
        </div>

        <div className="mt-9">
          <BlogRenderer blocks={post.body} />
        </div>

        <div className="mt-12 rounded-2xl border-2 border-[var(--border-strong)] bg-card p-6 text-center shadow-[var(--shadow-brutal)]">
          <h2 className="text-lg font-extrabold text-foreground">{t("blog.ctaTitle")}</h2>
          <p className="mt-1.5 text-sm text-muted-foreground">{t("blog.ctaSub")}</p>
          <SessionCta
            to="/signup"
            label={t("blog.ctaButton")}
            className={buttonVariants({
              variant: "default",
              className: "mt-5 h-auto px-6 py-3 text-sm",
            })}
          />
        </div>

        {others.length > 0 && (
          <div className="mt-14">
            <h2 className="text-lg font-extrabold text-foreground">{t("blog.moreTitle")}</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  to="/blog/$slug"
                  params={{ slug: o.slug }}
                  className="rounded-2xl border-2 border-[var(--border-strong)] bg-card p-5 shadow-[var(--shadow-brutal)]"
                >
                  <p className="text-sm font-bold leading-snug text-foreground">
                    {bi(o.title, o.titleEn)}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </PublicLayout>
  );
}
