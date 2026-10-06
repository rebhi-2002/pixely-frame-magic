/**
 * علامة Academia — قبعة تخرج فوق حرف A بأسلوب Warm Neo-Brutalism (ذهبي + كحلي،
 * أسطح مسطّحة وظل صلب). SVG حقيقي (public/brand/logo-mark.svg، ~2.6KB) مُتتبَّع
 * من الصورة المعتمدة — يكبّر بدون تبكسل، وبنفس الألوان بكل الثيمات: الذهبي والكحلي
 * جزء من الهوية نفسها فما بيتبدّلوا مع الثيم. النص المرافق (BrandLockup) هو يلي
 * بيتبع لون الصفحة.
 *
 * على الخلفيات الكحلية (القائمة الجانبية) الجزء الكحلي من العلامة بيضيع، فبنحطها
 * على لوح كريمي بحد صلب (`plate`) — نفس لغة الأزرار والبطاقات.
 */
export function BrandLogo({
  className = "size-9",
  plate = false,
}: {
  className?: string;
  /** لوح كريمي خلف العلامة — للخلفيات الغامقة (القائمة الجانبية). */
  plate?: boolean;
}) {
  const img = (
    <img
      src="/brand/logo-mark.svg"
      alt=""
      width={1111}
      height={1061}
      className={`${plate ? "size-full" : className} object-contain`}
    />
  );
  if (!plate) return img;
  return (
    <span
      className={`inline-grid shrink-0 place-items-center rounded-lg border-2 border-[var(--border-strong)] bg-[#f7f1e4] p-1 ${className}`}
    >
      {img}
    </span>
  );
}

/** العلامة + الاسم الرسمي الثابت — عرض بسيط بدون حركة hover. */
export function BrandLockup({
  className = "",
  tone = "page",
}: {
  className?: string;
  /** "page": يتبع لون نص الصفحة (الهيدر العام). "sidebar": يتبع لون نص القائمة
   *  الجانبية الثابت، والعلامة على لوح كريمي لأن خلفيتها كحلية. */
  tone?: "page" | "sidebar";
}) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <BrandLogo className="size-9 lg:size-8" plate={tone === "sidebar"} />
      <span
        className={`font-display text-lg font-extrabold ${
          tone === "sidebar" ? "text-sidebar-foreground" : "text-foreground"
        }`}
      >
        Academia
      </span>
    </span>
  );
}
