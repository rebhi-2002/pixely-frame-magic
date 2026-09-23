import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { DynamicIcon } from "@/components/admin/dynamic-icon";
import { PageHeader } from "@/components/admin/page-header";
import { Reveal } from "@/components/ui/reveal";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { EmptyIllustration } from "@/components/site/illustrations";
import { cn } from "@/lib/utils";

/** يفصل رقم القيمة عن البادئة/اللاحقة النصية — مثال: "86%" → {prefix:"", num:86, suffix:"%"} */
function parseStatValue(value: string) {
  const match = value.match(/^([^\d-]*)(-?[\d.,]+)(.*)$/);
  if (!match) return null;
  const [, prefix, numRaw, suffix] = match;
  const num = Number(numRaw.replace(/,/g, ""));
  if (Number.isNaN(num)) return null;
  return { prefix, num, suffix };
}

/** غلاف موحّد لكل صفحات المنصة بعد تسجيل الدخول (القسم 07 — الشِل). */
export function AppPage({
  title,
  icon,
  subtitle,
  actions,
  children,
}: {
  title: string;
  icon: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="app-canvas min-h-screen pb-10">
      <PageHeader title={title} icon={icon} actions={actions} />
      <div className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 sm:py-7 lg:px-8">
        <div className="mb-6 hidden items-center justify-between border-b border-border pb-3 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-muted-foreground sm:flex">
          <span>Academia / workspace</span>
          <span className="text-primary">Focused learning</span>
        </div>
        {subtitle && (
          <p className="max-w-3xl text-sm leading-6 text-muted-foreground">{subtitle}</p>
        )}
        <div className="mt-6 space-y-6">{children}</div>
      </div>
    </div>
  );
}

export function StatGrid({ items }: { items: { icon: string; label: string; value: string }[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((s, i) => {
        const parsed = parseStatValue(s.value);
        return (
          <Reveal key={s.label} variant="stat" delay={i * 0.05}>
            <div className="shadow-elevation-1 h-full rounded-lg border border-border bg-card p-4 sm:p-5">
              {/* بدون hover-lift (لا interactive-card): بطاقة إحصائية ثابتة
                  بكل صفحات المنصة، مش رابط أو زر — حركة الرفع عند التحويم
                  بتوحي بتفاعل غير موجود فعليًا. نفس المبدأ مطبّق بالصفحة
                  الرئيسية على بطاقات الإحصائيات هناك. */}
              <span className="inline-flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <DynamicIcon name={s.icon} className="size-4" />
              </span>
              <p className="mt-3 font-display text-2xl font-bold text-foreground">
                {parsed ? (
                  <AnimatedCounter
                    prefix={parsed.prefix}
                    value={parsed.num}
                    suffix={parsed.suffix}
                  />
                ) : (
                  s.value
                )}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">{s.label}</p>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}

export function Panel({
  title,
  icon,
  action,
  children,
}: {
  title: string;
  icon?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="shadow-elevation-1 overflow-hidden rounded-lg border border-border bg-card">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-card/70 px-4 py-4 sm:px-5">
        <h2 className="inline-flex items-center gap-2 font-display text-sm font-bold text-foreground">
          {icon && <DynamicIcon name={icon} className="size-4 text-primary" />}
          {title}
        </h2>
        {action}
      </header>
      <div className="p-4 sm:p-5">{children}</div>
    </section>
  );
}

export function Badge({
  children,
  tone = "muted",
}: {
  children: ReactNode;
  tone?: "muted" | "primary" | "success" | "danger";
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-micro font-bold",
        tone === "primary" && "bg-primary/15 text-primary",
        tone === "success" && "bg-success/15 text-success",
        tone === "danger" && "bg-destructive/15 text-destructive",
        tone === "muted" && "bg-muted text-muted-foreground",
      )}
    >
      {children}
    </span>
  );
}

export type Row = {
  title: string;
  meta?: string;
  value?: string;
  tone?: "muted" | "primary" | "success" | "danger";
  /** أزرار إجراءات اختيارية (تعديل/حذف...) تظهر بجانب القيمة — لا تُستخدم مع `to` بنفس الصف. */
  actions?: ReactNode;
};

export function RowList({ rows, to }: { rows: Row[]; to?: string }) {
  if (rows.length === 0) return <EmptyState text="—" />;
  return (
    <ul className="divide-y divide-border">
      {rows.map((r, i) => {
        const body = (
          <div className="flex items-center justify-between gap-3 py-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-foreground">{r.title}</p>
              {r.meta && <p className="mt-0.5 truncate text-xs text-muted-foreground">{r.meta}</p>}
            </div>
            <div className="flex shrink-0 items-center gap-2">
              {r.value && <Badge tone={r.tone ?? "muted"}>{r.value}</Badge>}
              {r.actions}
            </div>
          </div>
        );
        return (
          <li key={`${r.title}-${i}`} className={i === 0 ? "-mt-3" : undefined}>
            {to ? (
              <Link to={to} className="block rounded-xl px-2 transition-colors hover:bg-accent/40">
                {body}
              </Link>
            ) : (
              body
            )}
          </li>
        );
      })}
    </ul>
  );
}

export function DataTable({
  head,
  rows,
  caption,
}: {
  head: string[];
  rows: (string | ReactNode)[][];
  caption?: string;
}) {
  return (
    <div className="-mx-5 overflow-x-auto px-5" role="region" aria-label={caption}>
      <table className="w-full min-w-[520px] text-right text-sm" aria-label={caption}>
        <thead>
          <tr className="border-b border-border text-xs text-muted-foreground">
            {head.map((h) => (
              <th
                scope="col"
                key={h}
                className="px-2 pb-2 font-semibold ltr:text-left rtl:text-right"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((r, i) => (
            <tr key={i} className="transition-colors hover:bg-accent/30">
              {r.map((c, j) => (
                <td key={j} className="px-2 py-3 text-foreground ltr:text-left rtl:text-right">
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Progress({ label, value }: { label: string; value: number }) {
  const pct = Math.min(100, Math.max(0, value));
  const tone = pct >= 70 ? "bg-success" : pct >= 40 ? "bg-primary" : "bg-destructive";
  return (
    <div className="py-2">
      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold text-foreground">{label}</span>
        <span className="font-mono text-muted-foreground">{value}%</span>
      </div>
      <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-muted">
        <div
          className={cn("h-full rounded-full transition-all duration-700 ease-out", tone)}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export function EmptyState({
  text,
  icon,
  title,
  description,
  action,
}: {
  text?: string;
  icon?: string;
  title?: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex min-h-48 flex-col items-center justify-center gap-1 rounded-2xl border border-dashed border-border bg-secondary/20 p-6 text-center">
      {icon ? (
        <span className="flex size-11 items-center justify-center rounded-full bg-muted text-muted-foreground">
          <DynamicIcon name={icon} className="size-5" />
        </span>
      ) : (
        <EmptyIllustration className="h-20 w-auto" />
      )}
      {title && <h3 className="mt-1 font-display text-sm font-bold text-foreground">{title}</h3>}
      {(description ?? text) && (
        <p className="mt-1 max-w-md text-sm text-muted-foreground">{description ?? text}</p>
      )}
      {action && <div className="mt-3">{action}</div>}
    </div>
  );
}

export function QuickLinks({ items }: { items: { to: string; label: string; icon: string }[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((i) => (
        <Link
          key={i.to}
          to={i.to}
          className="interactive-card flex min-h-16 items-center gap-3 rounded-lg border border-border bg-card p-4 hover:border-primary/50"
        >
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <DynamicIcon name={i.icon} className="size-4" />
          </span>
          <span className="text-sm font-semibold text-foreground">{i.label}</span>
        </Link>
      ))}
    </div>
  );
}

/**
 * ترقيم صفحات موحّد — أرشيتايب List/Management (راجع
 * docs/design/component-catalog.md). زر "السابق/التالي" بس (بدون أرقام
 * صفحات مفردة) عمدًا — أبسط وأصح لـRTL، وكافي لجداول الأدمن الحالية.
 * كل النصوص تجي جاهزة من المستدعي (نفس نمط EmptyState) — المكوّن هون
 * عرض بس، بدون منطق ترجمة داخلي.
 */
export function Pagination({
  page,
  pageSize,
  totalCount,
  onPageChange,
  summary,
  previousLabel,
  nextLabel,
}: {
  /** 0-indexed — أول صفحة = 0 (نفس مفهوم skip/pageSize بالباك اند). */
  page: number;
  pageSize: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  /** نص جاهز زي "21–40 من 340" — مركّب من المستدعي عبر bi(). */
  summary: string;
  previousLabel: string;
  nextLabel: string;
}) {
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const canPrev = page > 0;
  const canNext = page + 1 < totalPages;

  if (totalCount <= pageSize) return null;

  return (
    <nav
      aria-label={summary}
      className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-4 py-3"
    >
      <p className="text-xs text-muted-foreground">{summary}</p>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => canPrev && onPageChange(page - 1)}
          disabled={!canPrev}
          className="tap-target inline-flex items-center gap-1 rounded-xl border border-border px-3 text-xs font-semibold text-foreground hover:bg-secondary disabled:pointer-events-none disabled:opacity-40"
        >
          <DynamicIcon name="ChevronLeft" className="size-3.5 rtl:rotate-180" />
          {previousLabel}
        </button>
        <button
          type="button"
          onClick={() => canNext && onPageChange(page + 1)}
          disabled={!canNext}
          className="tap-target inline-flex items-center gap-1 rounded-xl border border-border px-3 text-xs font-semibold text-foreground hover:bg-secondary disabled:pointer-events-none disabled:opacity-40"
        >
          {nextLabel}
          <DynamicIcon name="ChevronRight" className="size-3.5 rtl:rotate-180" />
        </button>
      </div>
    </nav>
  );
}
