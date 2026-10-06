import { Toaster as Sonner } from "sonner";
import { CircleCheck, CircleX, Info, TriangleAlert, X } from "lucide-react";
import { usePreferences } from "@/hooks/use-preferences";

type ToasterProps = React.ComponentProps<typeof Sonner>;

/**
 * الإشعارات الموحّدة — Warm Neo-Brutalism:
 * حد صلب 2px + ظل صلب بلا ضبابية (نفس توكنز الأزرار والبطاقات)، شريط لون
 * جانبي يدل على النوع، أيقونة ثابتة لكل نوع، وزر إغلاق دائم (+ سحب للإغلاق).
 * المكان: أسفل الشاشة — على الموبايل بكامل العرض فوق الحافة، وعلى الديسكتوب
 * بزاوية "نهاية" السطر (يسار بالعربي، يمين بالإنجليزي) بعيدًا عن الهيدر
 * وأزرار الأعلى. تحويل الـRTL/LTR تلقائي من تفضيلات اللغة.
 */
const Toaster = (props: ToasterProps) => {
  const { dir } = usePreferences();
  return (
    <Sonner
      dir={dir}
      position={dir === "rtl" ? "bottom-left" : "bottom-right"}
      closeButton
      visibleToasts={3}
      gap={12}
      offset={{ bottom: 24, left: 24, right: 24 }}
      mobileOffset={{ bottom: "calc(12px + env(safe-area-inset-bottom))", left: 12, right: 12 }}
      icons={{
        success: <CircleCheck className="size-5" aria-hidden />,
        error: <CircleX className="size-5" aria-hidden />,
        warning: <TriangleAlert className="size-5" aria-hidden />,
        info: <Info className="size-5" aria-hidden />,
        close: <X className="size-4" aria-hidden />,
      }}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "academia-toast group/toast relative flex w-full items-start gap-3 rounded-xl border-2 border-s-[8px] " +
            "border-[var(--border-strong)] bg-card p-4 pe-10 text-card-foreground " +
            "shadow-[var(--shadow-brutal)] font-sans " +
            "data-[type=success]:border-s-success data-[type=error]:border-s-destructive " +
            "data-[type=warning]:border-s-[var(--toast-warning)] data-[type=info]:border-s-info " +
            "data-[type=default]:border-s-primary",
          icon:
            "mt-0.5 shrink-0 " +
            "group-data-[type=success]/toast:text-success group-data-[type=error]/toast:text-destructive " +
            "group-data-[type=warning]/toast:text-[var(--toast-warning)] group-data-[type=info]/toast:text-info",
          content: "flex-1 min-w-0",
          title: "text-sm font-bold leading-6 text-foreground",
          description: "mt-0.5 text-sm text-muted-foreground",
          closeButton:
            "academia-toast-close absolute end-2 top-2 inline-flex size-7 items-center justify-center rounded-md " +
            "border-2 border-transparent text-muted-foreground transition-colors " +
            "hover:border-[var(--border-strong)] hover:bg-secondary hover:text-foreground " +
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
          actionButton:
            "rounded-md border-2 border-[var(--border-strong)] bg-primary px-3 py-1 text-sm font-bold text-primary-foreground",
          cancelButton:
            "rounded-md border-2 border-[var(--border-strong)] bg-secondary px-3 py-1 text-sm font-bold text-secondary-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
