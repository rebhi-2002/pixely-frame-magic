import { toast as sonnerToast } from "sonner";

/**
 * نقطة الدخول الوحيدة للإشعارات (Toasts) بكل المنصة.
 * - نفس الشكل/المكان/الإغلاق اليدوي يُضبط مرة وحدة بـ`components/ui/sonner.tsx`.
 * - هون بنوحّد المدّة حسب النوع: الأخطاء أطول لأن المستخدم يحتاج يقرأها ويتصرف.
 * - `id` ثابت لكل رسالة (نوع + نص) فلا تتكدّس نسخ مكررة لو انضغط الزر مرتين.
 * ممنوع `import { toast } from "sonner"` خارج هذا الملف (قاعدة ESLint).
 */
type Message = string;

const DURATION = {
  success: 4000,
  info: 5000,
  warning: 6000,
  error: 8000,
} as const;

type Kind = keyof typeof DURATION;

function show(kind: Kind, message: Message) {
  return sonnerToast[kind](message, {
    id: `${kind}:${message}`,
    duration: DURATION[kind],
  });
}

export const toast = {
  success: (message: Message) => show("success", message),
  error: (message: Message) => show("error", message),
  warning: (message: Message) => show("warning", message),
  info: (message: Message) => show("info", message),
  dismiss: (id?: string | number) => sonnerToast.dismiss(id),
};
