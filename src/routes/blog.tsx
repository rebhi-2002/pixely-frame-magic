import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarDays, Clock3, NotebookPen } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PublicLayout } from "@/components/site/public-layout";
import { Reveal } from "@/components/ui/reveal";
import { blogPosts } from "@/content/blog-posts";
import { usePreferences } from "@/components/providers/preferences-provider";
import { useBi } from "@/lib/bi";

const title = "مدونة أكاديميا | نصائح دراسة وتحضير للامتحان الوزاري";
const description =
  "مقالات عملية عن تنظيم وقت المذاكرة، تقنيات الاستدعاء النشط، والتحضير للامتحان الوزاري — من فريق أكاديميا.";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
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
      <section className="surface-mesh border-b border-border">
        <div className="mx-auto max-w-5xl px-5 py-16">
          <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/12 text-primary">
            <NotebookPen className="size-6" />
          </span>
          <h1 className="mt-5 text-4xl font-bold text-foreground">{t("blog.h1")}</h1>
          <p className="mt-3 max-w-xl text-lg text-muted-foreground">{t("blog.sub")}</p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-16">
        <div className="grid gap-5 md:grid-cols-2">
          {blogPosts
            .slice()
            .reverse()
            .map((post, i) => (
              <Reveal key={post.slug} delay={(i % 2) * 0.08}>
                <Link
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  className="hover-lift shadow-elevation-1 flex h-full flex-col rounded-2xl border border-border bg-card p-6"
                >
                  <span className="w-fit rounded-full bg-primary/12 px-3 py-1 text-xs font-bold text-primary">
                    {bi(post.category, post.categoryEn)}
                  </span>
                  <h2 className="mt-4 text-lg font-bold leading-snug text-foreground">
                    {bi(post.title, post.titleEn)}
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {bi(post.excerpt, post.excerptEn)}
                  </p>
                  <div className="mt-5 flex items-center gap-4 border-t border-border pt-4 text-xs text-muted-foreground">
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
              </Reveal>
            ))}
        </div>
      </section>
    </PublicLayout>
  );
}
