import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border-border text-foreground",
        /** خلفية شفافة بلون دلالي — الأكثر استخداماً بواجهات SaaS الحديثة (حالات/تصنيفات) */
        soft: "border-transparent bg-primary/12 text-primary",
        success: "border-transparent bg-success/14 text-success",
        info: "border-transparent bg-info/14 text-info",
        warning: "border-transparent bg-destructive/14 text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {
  /** يعرض نقطة نابضة قبل النص — لمؤشرات "مباشر / نشط الآن" */
  pulse?: boolean;
}

function Badge({ className, variant, pulse, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      {pulse && <span className="pulse-dot size-1.5 rounded-full bg-current" />}
      {children}
    </div>
  );
}

export { Badge, badgeVariants };
