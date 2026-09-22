import { useState } from "react";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";

interface PhotoAvatarProps {
  /** مسار الصورة المتوقّع، مثلاً /team/teachers/sami-khalil.jpg. null/فاضي
   *  (بيانات حقيقية من الباك اند ما رفعت صورة بعد) → الأيقونة البديلة مباشرة
   *  بدون محاولة تحميل فاشلة. */
  src?: string | null;
  alt?: string;
  /** أيقونة بديلة تظهر تلقائياً لو الصورة غير موجودة بعد (fallback). */
  icon?: typeof User;
  className?: string;
  iconClassName?: string;
}

/**
 * أفاتار بصورة حقيقية مع Fallback تلقائي لأيقونة لو الملف غير موجود —
 * هيك تقدر تحط اسم مسار صورة بأي مكان بالمشروع (فريق، معلم، طالب) من الآن،
 * ولما تتوفر الصورة الحقيقية تحطها بنفس الاسم بدون أي تعديل كود.
 */
export function PhotoAvatar({
  src,
  alt = "",
  icon: Icon = User,
  className,
  iconClassName,
}: PhotoAvatarProps) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <span
        className={cn(
          "flex shrink-0 items-center justify-center rounded-full bg-primary/12 text-primary",
          className,
        )}
      >
        <Icon className={cn("size-1/2", iconClassName)} />
      </span>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      className={cn("shrink-0 rounded-full border border-border object-cover", className)}
    />
  );
}
