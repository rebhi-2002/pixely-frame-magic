import type { ReactNode } from "react";
import { ChevronLeft } from "lucide-react";
import { DynamicIcon } from "./dynamic-icon";
import { Button } from "@/components/ui/button";

export function PageHeader({
  title,
  icon,
  actions,
  onBack,
}: {
  title: string;
  icon: string;
  actions?: ReactNode;
  onBack?: () => void;
}) {
  return (
    <header className="shadow-elevation-1 sticky top-0 z-20 flex min-h-16 flex-wrap items-center justify-between gap-3 border-b border-border bg-background/90 px-4 py-3 backdrop-blur sm:px-6 lg:px-8">
      <div className="flex min-w-0 items-center gap-3">
        {onBack && (
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={onBack}
            aria-label="رجوع"
            className="shrink-0 text-muted-foreground"
          >
            <ChevronLeft className="size-4 rotate-180" />
          </Button>
        )}
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-primary ring-1 ring-primary/10">
          <DynamicIcon name={icon} className="size-5" />
        </span>
        <h1 className="truncate text-base font-bold text-foreground sm:text-lg">{title}</h1>
      </div>
      {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
    </header>
  );
}

export function Toolbar({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-border bg-muted/40 px-5 py-3">
      {children}
    </div>
  );
}
