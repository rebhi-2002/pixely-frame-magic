import { cva } from "class-variance-authority";

/**
 * أزرار Neo-Brutalism الدافئ: حدّ صلب + ظل بإزاحة بلا ضبابية (لا glow/شفافية/لمعان).
 * تفاعل الضغط: الزر "يتحرك" فوق ظلّه بدل الظل يتوهّج تحته — hover يبعده عن الظل
 * (يكبر الظل ظاهريًا)، active يدفعه داخل الظل تمامًا فيختفي (إحساس ضغط زر حقيقي).
 */
const brutalPress =
  "translate-x-0 translate-y-0 shadow-[var(--shadow-brutal)] " +
  "hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--shadow-brutal-color)] " +
  "active:translate-x-1 active:translate-y-1 active:shadow-none";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-bold cursor-pointer transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: `border-2 border-[var(--border-strong)] bg-primary text-primary-foreground ${brutalPress}`,
        destructive: `border-2 border-[var(--border-strong)] bg-destructive text-destructive-foreground ${brutalPress}`,
        outline: `border-2 border-[var(--border-strong)] bg-card text-foreground ${brutalPress}`,
        secondary: `border-2 border-[var(--border-strong)] bg-secondary text-secondary-foreground ${brutalPress}`,
        soft: "border-2 border-transparent bg-primary/12 text-primary hover:bg-primary/18",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline font-semibold",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 rounded-lg px-3.5 text-xs",
        lg: "h-12 px-7 text-[0.95rem]",
        xl: "h-14 px-8 text-base rounded-2xl",
        icon: "h-10 w-10 shrink-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);
