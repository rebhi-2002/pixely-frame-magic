import type { ReactNode } from "react";
import { DynamicIcon } from "./dynamic-icon";

export function PageHeader({
  title,
  icon,
  actions,
}: {
  title: string;
  icon: string;
  actions?: ReactNode;
}) {
  return (
    <header className="flex items-center justify-between gap-4 border-b border-border bg-card px-5 py-4">
      <div className="flex items-center gap-3">
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
