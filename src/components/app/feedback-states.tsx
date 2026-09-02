import type { ReactNode } from "react";
import { AlertCircle, Inbox, Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DynamicIcon } from "@/components/admin/dynamic-icon";
import { cn } from "@/lib/utils";

export function LoadingState({
  label = "جارٍ التحميل…",
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "flex min-h-40 flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-card/60 p-6 text-center",
        className,
      )}
    >
      <Loader2 aria-hidden="true" className="size-6 animate-spin text-primary" />
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
  );
}

export function ErrorState({
  title = "تعذّر تحميل المحتوى",
  description = "حدثت مشكلة مؤقتة. حاول مرة أخرى.",
  action,
  className,
}: {
  title?: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      role="alert"
      className={cn(
        "flex min-h-40 flex-col items-center justify-center gap-2 rounded-2xl border border-destructive/30 bg-destructive/5 p-6 text-center",
        className,
      )}
    >
      <span className="flex size-11 items-center justify-center rounded-full bg-destructive/12 text-destructive">
        <AlertCircle aria-hidden="true" className="size-5" />
      </span>
      <h2 className="font-display text-sm font-bold text-foreground">{title}</h2>
      <p className="max-w-md text-sm text-muted-foreground">{description}</p>
      {action}
    </div>
  );
}

export function RetryButton({
  label = "حاول مرة أخرى",
  onClick,
  loading = false,
}: {
  label?: string;
  onClick: () => void;
  loading?: boolean;
}) {
  return (
    <Button type="button" variant="outline" size="sm" onClick={onClick} loading={loading}>
      {!loading && <RefreshCw aria-hidden="true" className="size-4" />}
      {label}
    </Button>
  );
}

export function FeatureStatus({
  title,
  description,
  icon = "Sparkles",
  action,
  className,
}: {
  title: string;
  description: string;
  icon?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex min-h-40 flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border bg-secondary/20 p-6 text-center",
        className,
      )}
    >
      <span className="flex size-11 items-center justify-center rounded-full bg-primary/12 text-primary">
        <DynamicIcon name={icon} className="size-5" />
      </span>
      <h2 className="font-display text-sm font-bold text-foreground">{title}</h2>
      <p className="max-w-md text-sm text-muted-foreground">{description}</p>
      {action}
    </div>
  );
}

export function EmptyInbox({
  title = "لا توجد عناصر بعد",
  description = "ستظهر العناصر هنا عند توفرها.",
  action,
}: {
  title?: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex min-h-40 flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border bg-secondary/20 p-6 text-center">
      <span className="flex size-11 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <Inbox aria-hidden="true" className="size-5" />
      </span>
      <h2 className="font-display text-sm font-bold text-foreground">{title}</h2>
      <p className="max-w-md text-sm text-muted-foreground">{description}</p>
      {action}
    </div>
  );
}
