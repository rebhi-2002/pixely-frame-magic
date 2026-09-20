/**
 * روابط السوشال ميديا وقناة الدعم — مركزية بملف واحد عشان تضيف/تبدّل رابط
 * حقيقي بسطر واحد بس، بدون ما تلمس أي مكوّن واجهة.
 *
 * مبدأ التصميم (نفس مبدأ "قريباً" المستخدم بقسم الآراء وكتالوج الكورسات):
 * الحساب لسا مش موجود فعليًا (`url: null`) → الأيقونة **ما بتظهر إطلاقًا**
 * بالفوتر، بدل ما تظهر كرابط ميت يوصّل لصفحة 404 أو حساب غير موجود. أول ما
 * تنشئ الحساب الفعلي، بدّل `null` برابطه الحقيقي وبيظهر تلقائيًا — صفر
 * تعديل كود إضافي.
 */

export interface SocialLink {
  /** اسم أيقونة lucide-react (راجع src/components/site/public-layout.tsx). */
  icon: "Instagram" | "Facebook" | "Youtube";
  labelAr: string;
  labelEn: string;
  /** null = الحساب لسا مش موجود، الأيقونة بتختفي تلقائيًا. */
  url: string | null;
}

export const SOCIAL_LINKS: SocialLink[] = [
  { icon: "Instagram", labelAr: "إنستغرام", labelEn: "Instagram", url: null },
  { icon: "Facebook", labelAr: "فيسبوك", labelEn: "Facebook", url: null },
  { icon: "Youtube", labelAr: "يوتيوب", labelEn: "YouTube", url: null },
];

/**
 * رقم واتساب الدعم الفني — بصيغة دولية بدون + أو مسافات أو أصفار بادئة
 * (مثال فلسطين: "970599XXXXXX"). null = القناة مش مفعّلة بعد.
 */
export const SUPPORT_WHATSAPP_NUMBER: string | null = null;

export function whatsappLink(message?: string): string | null {
  if (!SUPPORT_WHATSAPP_NUMBER) return null;
  const base = `https://wa.me/${SUPPORT_WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
