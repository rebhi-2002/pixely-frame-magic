import { usePreferences } from "@/components/providers/preferences-provider";

/**
 * شعار «أكاديميا / Academia» — علامة أصلية مبنية على شبكة 48×48:
 *  • هيكل حرف A (وأيضاً سقف/قمة الإنجاز) باللون الكهرماني — القسم 04.
 *  • عارضة زمردية = الإتقان/الاجتياز — القسم 04.
 *  • قاعدة أفقية = رفّ المكتبة المرتّبة (الوعد الأساسي للمنصة) — القسم 02.
 * كل الألوان توكِنز، ولا أي لون ثابت.
 */
export function BrandLogo({ className = "size-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false" className={className}>
      {/* هيكل A */}
      <path
        d="M24 5.5 41.5 39.5h-7.6L24 20.6 14.1 39.5H6.5L24 5.5z"
        className="fill-primary"
      />
      {/* عارضة الإتقان */}
      <rect x="15.5" y="27.2" width="17" height="4.6" rx="2.3" className="fill-success" />
      {/* رفّ المكتبة */}
      <rect x="9" y="42.4" width="30" height="3.2" rx="1.6" className="fill-primary/45" />
    </svg>
  );
}

/** العلامة + الاسم اللفظي (عربي: أكاديميا، إنجليزي: Academia). */
export function BrandLockup({ className = "" }: { className?: string }) {
  const { locale } = usePreferences();
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <BrandLogo className="size-8" />
      <span className="font-display text-lg font-extrabold tracking-tight text-foreground">
        {locale === "en" ? "Academia" : "أكاديميا"}
      </span>
    </span>
  );
}
