import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { PageHeader } from "@/components/site/page-header";
import { PublicLayout } from "@/components/site/public-layout";
import { cn } from "@/lib/utils";

/* دورة اللوحة 14: ذهبي / سماوي / صدأ */
const TOP_BORDERS = [
  "border-t-[var(--brand)]",
  "border-t-[var(--accent-2)]",
  "border-t-primary",
] as const;
const TILES = [
  "bg-[var(--brand)] text-[var(--ink)]",
  "bg-[var(--accent-2)] text-white",
  "bg-primary text-primary-foreground",
] as const;
const NUM =
  "flex shrink-0 items-center justify-center border-2 border-[var(--border-strong)] font-extrabold shadow-[2px_2px_0_0_var(--shadow-brutal-color)]";

/** صفحة قانونية مشتركة (الخصوصية / الشروط): رأس + فهرس جانبي ثابت + بطاقات مرقّمة. */
export function LegalPage({ ns }: { ns: "privacy" | "terms" }) {
  const { t } = useTranslation();
  const sections = t(`${ns}.sections`, { returnObjects: true }) as { t: string; d: string }[];
  const other = ns === "privacy" ? "terms" : "privacy";

  return (
    <PublicLayout>
      <PageHeader title={t(`${ns}.h1`)} highlight={t(`${ns}.h1Hl`)} sub={t(`${ns}.intro`)} />

      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-14 lg:grid-cols-[260px_1fr]">
        <nav aria-label={t(`${ns}.h1`)} className="hidden lg:block">
          <ul className="sticky top-24 space-y-1">
            {sections.map((s, i) => (
              <li key={s.t}>
                <a
                  href={`#section-${i}`}
                  className="flex items-center gap-3 rounded-xl border-2 border-transparent px-3 py-2 text-sm font-bold text-foreground hover:border-[var(--border-strong)] hover:bg-card"
                >
                  <span className="w-5 shrink-0 text-xs text-muted-foreground tabular-nums">
                    {i + 1}
                  </span>
                  {s.t}
                </a>
              </li>
            ))}
            <li className="pt-3">
              <Link
                to={`/${other}`}
                className="block rounded-xl border-t-2 border-border px-3 py-2 text-sm font-bold text-primary hover:underline"
              >
                {t(`nav.${other}`)}
              </Link>
            </li>
          </ul>
        </nav>

        <div className="space-y-6">
          {sections.map((s, i) => (
            <article
              key={s.t}
              id={`section-${i}`}
              className={cn(
                "scroll-mt-24 rounded-2xl border-2 border-t-[8px] border-[var(--border-strong)] bg-card p-6 shadow-[var(--shadow-brutal)] sm:p-7",
                TOP_BORDERS[i % TOP_BORDERS.length],
              )}
            >
              <h2 className="flex items-center gap-3 text-lg font-extrabold text-foreground">
                <span
                  aria-hidden
                  className={cn(NUM, "size-9 rounded-xl text-sm", TILES[i % TILES.length])}
                >
                  {i + 1}
                </span>
                {s.t}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
            </article>
          ))}
        </div>
      </section>
    </PublicLayout>
  );
}
