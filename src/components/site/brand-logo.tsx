/**
 * شعار «أكاديميا / Academia» — علامة هندسية خاصة بالمنصة:
 * كتاب مفتوح (المكتبة المرتّبة) + سهم صاعد (الإنجاز).
 * الألوان توكِنز فقط (القسم 04/06) — لا لون ثابت.
 */
export function BrandLogo({ className = "size-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false" className={className}>
      <rect width="48" height="48" rx="13" className="fill-primary" />
      <g
        fill="none"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-primary-foreground"
      >
        <path d="M24 22.4c-3.4-2.4-7.2-3-11.3-1.9v13.1c4.1-1.1 7.9-.5 11.3 1.9 3.4-2.4 7.2-3 11.3-1.9V20.5c-4.1-1.1-7.9-.5-11.3 1.9z" />
        <path d="M24 22.4v13.1" />
      </g>
      <path
        d="M17.4 15.8 24 9.6l6.6 6.2"
        fill="none"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-success"
      />
    </svg>
  );
}
