import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { Loader2 } from "lucide-react";
import { type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button-variants";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, loading = false, disabled, children, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        aria-busy={loading || undefined}
        disabled={disabled || loading}
        {...props}
      >
        {asChild ? (
          // Slot (Radix) يقبل عنصر React واحد بالضبط كـ children. لو ضفنا
          // أي عنصر شقيق (حتى لو شرطي وناتجه false)، بيرمي:
          // "Slot failed to slot onto its children" ويوقف الصفحة كلها.
          // فلما asChild=true منمرر children كما هي بدون أي إخوة.
          children
        ) : (
          <>
            {loading && <Loader2 aria-hidden="true" className="size-4 animate-spin" />}
            {children}
          </>
        )}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button };
