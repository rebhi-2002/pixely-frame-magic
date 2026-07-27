import * as Icons from "lucide-react";
import type { LucideProps } from "lucide-react";

const registry = Icons as unknown as Record<string, React.ComponentType<LucideProps>>;

export function DynamicIcon({ name, ...props }: { name: string } & LucideProps) {
  const Cmp = registry[name] ?? Icons.Circle;
  return <Cmp {...props} />;
}
