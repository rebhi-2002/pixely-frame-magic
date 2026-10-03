// نافذة تأكيد فوق alert-dialog (WP-00 — العقد C-13).
// props: { open, onOpenChange, title, description, confirmLabel, onConfirm, loading?, destructive? }
// ملاحظة: AlertDialogAction بيسكّر النافذة تلقائيًا؛ منمنع ذلك (preventDefault) لحد ما
// تخلص العملية، كي يبقى المستخدم يشوف حالة التحميل وتبقى النافذة لو فشلت العملية.
// الأم هي المسؤولة عن onOpenChange(false) بعد النجاح.
import type { ReactNode } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { useBi } from "@/lib/bi";

export interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: ReactNode;
  confirmLabel: string;
  onConfirm: () => void | Promise<void>;
  loading?: boolean;
  destructive?: boolean;
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel,
  onConfirm,
  loading = false,
  destructive = false,
}: ConfirmDialogProps) {
  const bi = useBi();
  return (
    <AlertDialog open={open} onOpenChange={(next) => (loading ? undefined : onOpenChange(next))}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description && <AlertDialogDescription>{description}</AlertDialogDescription>}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>{bi("إلغاء", "Cancel")}</AlertDialogCancel>
          <AlertDialogAction
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              void onConfirm();
            }}
            className={cn(
              destructive && "bg-destructive text-destructive-foreground hover:bg-destructive/90",
            )}
          >
            {loading ? bi("جارٍ التنفيذ…", "Working…") : confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
