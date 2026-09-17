/**
 * علامة Academia — قبعة تخرج فوق جبل/حرف A (الشعار المعتمد، راجع
 * docs/design/brand-guidelines.md). هاي هي الصورة الرسمية الأصلية نفسها
 * (public/brand/logo-mark.png) مش رسمة SVG معاد بناؤها — عشان تطلع مطابقة
 * 100% للهوية البصرية المعتمدة بألوانها وتدرّجها الذهبي الأصلي بالضبط.
 *
 * ليش <img> مش SVG بـ currentColor متل الشعار القديم؟ لأن هالشعار قرار
 * تصميم بتدرّج ذهبي ثابت (راجع لوحة الهوية) — بيبقى نفسه بالضبط بالوضع
 * الغامق والفاتح عمداً (الذهبي واضح على الاثنين)، عكس الشعار القديم يلي كان
 * لونه الواحد يتغيّر مع الثيم. النص المرافق (Academia بـBrandLockup) هو
 * يلي بيتغيّر لونه مع الثيم (`text-foreground`)، مش الأيقونة.
 *
 * الملف الأصلي بدقة كافية (320×299px) تغطي أي حجم عرض واقعي بالتطبيق
 * (هيدر/سايدبار حتى ~110px على شاشات retina) بدون تكبير يسبب تبكسل —
 * المتصفح بيصغّرها بس (downscale)، وهاي عملية آمنة بصرياً دائماً.
 */
export function BrandLogo({ className = "size-9" }: { className?: string }) {
  return <img src="/brand/logo-mark.png" alt="" className={`${className} object-contain`} />;
}

/** العلامة + الاسم الرسمي الثابت.
 *  الأيقونة بتاخد كامل مساحة صندوقها بأي حجم (بدون تجاوز حدوده) — هيك
 *  بتضمن نفس النسبة البصرية بالضبط عبر كل breakpoints، فما بترجع تكبر
 *  بشاشة وتصغر بشاشة تانية بشكل غير متوقّع. */
export function BrandLockup({ className = "" }: { className?: string }) {
  return (
    <span className={`group inline-flex items-center gap-3 ${className}`}>
      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/12 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105 lg:size-9">
        <BrandLogo className="size-7 lg:size-6" />
      </span>
      <span className="font-display text-lg font-extrabold text-foreground">Academia</span>
    </span>
  );
}
