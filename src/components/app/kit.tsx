import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { DynamicIcon } from "@/components/admin/dynamic-icon";
import { PageHeader } from "@/components/admin/page-header";
import { cn } from "@/lib/utils";

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
    <div className="min-h-screen">
      <PageHeader title={title} icon={icon} actions={actions} />
      <div className="mx-auto max-w-6xl px-5 py-6">
        {subtitle && <p className="max-w-2xl text-sm text-muted-foreground">{subtitle}</p>}
        <div className="mt-5 space-y-5">{children}</div>
      </div>
    </div>
  );
}

export function StatGrid({ items }: { items: { icon: string; label: string; value: string }[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((s) => (
        <div key={s.label} className="rounded-2xl border border-border bg-card p-4">
          <span className="inline-flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <DynamicIcon name={s.icon} className="size-4" />
          </span>
          <p className="mt-3 font-display text-2xl font-bold text-foreground">{s.value}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">{s.label}</p>
        </div>
      ))}
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
    <section className="rounded-2xl border border-border bg-card">
      <header className="flex items-center justify-between gap-3 border-b border-border px-5 py-3.5">
        <h2 className="inline-flex items-center gap-2 font-display text-sm font-bold text-foreground">
          {icon && <DynamicIcon name={icon} className="size-4 text-primary" />}
          {title}
        </h2>
        {action}
      </header>
      <div className="p-5">{children}</div>
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
        "inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold",
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
            {r.value && <Badge tone={r.tone ?? "muted"}>{r.value}</Badge>}
          </div>
        );
        return (
          <li key={`${r.title}-${i}`} className={i === 0 ? "-mt-3" : undefined}>
            {to ? (
              <Link to={to} className="block transition-colors hover:bg-accent/40">
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

export function DataTable({ head, rows }: { head: string[]; rows: (string | ReactNode)[][] }) {
  return (
    <div className="-mx-5 overflow-x-auto px-5">
      <table className="w-full min-w-[520px] text-right text-sm">
        <thead>
          <tr className="border-b border-border text-xs text-muted-foreground">
            {head.map((h) => (
              <th key={h} className="px-2 pb-2 font-semibold ltr:text-left rtl:text-right">
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
  return (
    <div className="py-2">
      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold text-foreground">{label}</span>
        <span className="font-mono text-muted-foreground">{value}%</span>
      </div>
      <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-success transition-all duration-500"
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
    </div>
  );
}

export function EmptyState({ text, icon = "Inbox" }: { text: string; icon?: string }) {
  return (
    <div className="flex flex-col items-center gap-2 py-8 text-center">
      <DynamicIcon name={icon} className="size-6 text-muted-foreground" />
      <p className="text-sm text-muted-foreground">{text}</p>
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
          className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-accent/40"
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
