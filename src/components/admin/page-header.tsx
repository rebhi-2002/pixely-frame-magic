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
    <header className="flex items-center justify-between gap-4 border-b border-border bg-card px-5 py-4">
      <div className="flex items-center gap-3">
        {onBack && (
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={onBack}
            aria-label="رجوع"
            className="text-muted-foreground"
          >
            <ChevronLeft className="size-4 rotate-180" />
          </Button>
        )}
        <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <DynamicIcon name={icon} className="size-5" />
        </span>
        <h1 className="text-lg font-bold text-foreground">{title}</h1>
      </div>
      {actions}
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
