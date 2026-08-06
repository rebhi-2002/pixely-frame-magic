/** علامة Academia الأحادية — حرف A وصفحة كتاب، بدون العارضة الخضراء السابقة. */
export function BrandLogo({ className = "size-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false" className={className}>
      <path d="M24 4 43 42h-8.3L24 20.1 13.3 42H5L24 4Z" className="fill-primary" />
      <path d="M14.7 33.4c3.3-1.9 6.4-2.7 9.3-2.7s6 .8 9.3 2.7v6.4c-3.4-1.8-6.5-2.6-9.3-2.6s-5.9.8-9.3 2.6v-6.4Z" className="fill-background" />
      <path d="M24 31.3v6.1" className="stroke-primary-foreground" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

/** العلامة + الاسم الرسمي الثابت. */
export function BrandLockup({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <BrandLogo className="size-8" />
      <span className="font-display text-lg font-extrabold text-foreground">Academia</span>
    </span>
  );
}
