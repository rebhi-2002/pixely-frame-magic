import { createSeoHead, localeFromSearch } from "@/lib/seo";
import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PageHeader } from "@/components/site/page-header";
import { PublicLayout } from "@/components/site/public-layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/help")({
  head: (ctx) => createSeoHead("/help", localeFromSearch(ctx.match.search)),
  component: HelpPage,
});

type Topic = { t: string; items: { q: string; a: string }[] };

/* دورة اللوحة 14: ذهبي / سماوي / صدأ — حدّ علوي لبطاقة كل موضوع + مربع عنوانه */
const TOP_BORDERS = [
  "border-t-[var(--brand)]",
  "border-t-[var(--accent-2)]",
  "border-t-primary",
] as const;
const SQUARES = ["bg-[var(--brand)]", "bg-[var(--accent-2)]", "bg-primary"] as const;

/** تطبيع للبحث: حروف صغيرة، بدون تشكيل، وتوحيد الهمزات والياء/الألف المقصورة والتاء المربوطة. */
function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[\u064B-\u065F\u0670\u0640]/g, "")
    .replace(/[أإآ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه");
}

function HelpPage() {
  const { t } = useTranslation();
  const topics = t("help.topics", { returnObjects: true }) as Topic[];
  const [query, setQuery] = useState("");

  const q = normalize(query.trim());
  const filtered = topics
    .map((topic, index) => ({
      ...topic,
      index,
      items: q
        ? topic.items.filter((i) => normalize(i.q).includes(q) || normalize(i.a).includes(q))
        : topic.items,
    }))
    .filter((topic) => topic.items.length > 0);

  return (
    <PublicLayout>
      <PageHeader title={t("help.h1")} highlight={t("help.h1Hl")} sub={t("help.sub")}>
        <div className="relative mt-7 max-w-2xl">
          <Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("help.searchPlaceholder")}
            aria-label={t("help.searchPlaceholder")}
            className="h-12 w-full rounded-xl border-2 border-[var(--border-strong)] bg-background ps-9 pe-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
          />
        </div>
      </PageHeader>

      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-14 lg:grid-cols-[240px_1fr]">
        <nav aria-label={t("help.h1")} className="hidden lg:block">
          <ul className="sticky top-24 space-y-1">
            {topics.map((tp, i) => (
              <li key={tp.t}>
                <a
                  href={`#topic-${i}`}
                  className="flex items-center gap-3 rounded-xl border-2 border-transparent px-3 py-2 text-sm font-bold text-foreground hover:border-[var(--border-strong)] hover:bg-card"
                >
                  <span
                    aria-hidden
                    className={cn(
                      "size-3 shrink-0 rounded-[3px] border-2 border-[var(--border-strong)]",
                      SQUARES[i % SQUARES.length],
                    )}
                  />
                  {tp.t}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        {filtered.length === 0 ? (
          <p className="rounded-2xl border-2 border-[var(--border-strong)] bg-card p-8 text-center text-sm text-muted-foreground">
            {t("help.empty")}
          </p>
        ) : (
          <div className="space-y-10">
            {filtered.map((topic) => (
              <div key={topic.t} id={`topic-${topic.index}`} className="scroll-mt-24">
                <h2 className="flex items-center gap-3 text-xl font-extrabold text-foreground">
                  <span
                    aria-hidden
                    className={cn(
                      "size-3 shrink-0 rounded-[3px] border-2 border-[var(--border-strong)]",
                      SQUARES[topic.index % SQUARES.length],
                    )}
                  />
                  {topic.t}
                </h2>
                <Accordion
                  type="single"
                  collapsible
                  className={cn(
                    "mt-4 rounded-2xl border-2 border-t-[8px] border-[var(--border-strong)] bg-card px-5 shadow-[var(--shadow-brutal)]",
                    TOP_BORDERS[topic.index % TOP_BORDERS.length],
                  )}
                >
                  {topic.items.map((item, i) => (
                    <AccordionItem
                      key={item.q}
                      value={`${topic.index}-${i}`}
                      className="border-border last:border-b-0"
                    >
                      <AccordionTrigger className="text-start text-sm font-bold text-foreground hover:no-underline">
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="border-t-2 border-[var(--border-strong)] bg-primary text-primary-foreground">
        <div aria-hidden className="stripe-tri" />
        <div className="mx-auto max-w-3xl px-5 py-16 text-center">
          <h2 className="text-2xl font-extrabold md:text-3xl">{t("help.contactTitle")}</h2>
          <p className="mt-2 text-primary-foreground/85">{t("help.contactSub")}</p>
          <Link
            to="/contact"
            className={buttonVariants({
              variant: "outline",
              className:
                "mt-6 h-auto bg-card px-7 py-3.5 text-sm font-bold text-foreground shadow-[4px_4px_0_0_var(--shadow-brutal-color)] hover:bg-secondary",
            })}
          >
            {t("help.contactCta")}
          </Link>
          <p className="mt-5 text-xs text-primary-foreground/80">
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
