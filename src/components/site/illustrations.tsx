/**
 * مكتبة رسومات SVG خفيفة مبنية بهوية الموقع (ألوان عبر currentColor/CSS vars
 * فبتتبدّل تلقائيًا مع dark/light) — بديل عن الصور الفوتوغرافية الحقيقية غير
 * المتوفرة حاليًا. كل رسمة عبارة عن مكوّن React بسيط، صفر طلبات شبكة إضافية.
 */

type IllustrationProps = { className?: string };

/** رسمة ترحيبية عامة — سطح مكتب + رسم بياني صاعد. تُستخدم ببانرات لوحات التحكم. */
export function WelcomeIllustration({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 160" fill="none" className={className} aria-hidden>
      <ellipse cx="100" cy="146" rx="72" ry="8" className="fill-foreground/5" />
      <rect
        x="34"
        y="34"
        width="132"
        height="88"
        rx="12"
        className="fill-card stroke-border"
        strokeWidth="2"
      />
      <rect x="34" y="34" width="132" height="22" rx="12" className="fill-secondary" />
      <circle cx="46" cy="45" r="3" className="fill-destructive/60" />
      <circle cx="56" cy="45" r="3" className="fill-primary/60" />
      <circle cx="66" cy="45" r="3" className="fill-success/60" />
      <path
        d="M52 100 L74 82 L94 96 L120 66 L146 78"
        className="stroke-primary"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="146" cy="78" r="5" className="fill-primary" />
      <rect x="52" y="104" width="20" height="10" rx="3" className="fill-info/25" />
      <rect x="78" y="104" width="20" height="10" rx="3" className="fill-success/25" />
      <rect x="104" y="104" width="20" height="10" rx="3" className="fill-primary/25" />
      <circle cx="164" cy="30" r="14" className="fill-primary/15" />
      <circle cx="26" cy="120" r="10" className="fill-success/15" />
    </svg>
  );
}

/** رسمة "صندوق فاضي" — لحالات عدم وجود بيانات (EmptyState). */
export function EmptyIllustration({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 160 120" fill="none" className={className} aria-hidden>
      <ellipse cx="80" cy="100" rx="46" ry="7" className="fill-foreground/5" />
      <path
        d="M40 44 L80 28 L120 44 L120 84 L80 100 L40 84 Z"
        className="fill-card stroke-border"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M40 44 L80 60 L120 44" className="stroke-border" strokeWidth="2" fill="none" />
      <path d="M80 60 L80 100" className="stroke-border" strokeWidth="2" />
      <circle cx="80" cy="60" r="16" className="fill-primary/12" />
      <path
        d="M73 60 L78 65 L88 54"
        className="stroke-primary"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.4"
      />
    </svg>
  );
}

/** رسمة 404 — بوصلة ضائعة. لصفحة "غير موجود". */
export function NotFoundIllustration({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 160" fill="none" className={className} aria-hidden>
      <ellipse cx="100" cy="146" rx="60" ry="7" className="fill-foreground/5" />
      <circle cx="100" cy="80" r="52" className="fill-card stroke-border" strokeWidth="2" />
      <circle cx="100" cy="80" r="38" className="stroke-border" strokeWidth="1.5" fill="none" />
      <path d="M84 96 L92 68 L120 60 L108 92 Z" className="fill-primary/70" />
      <circle cx="100" cy="80" r="5" className="fill-primary" />
      <circle cx="150" cy="40" r="10" className="fill-info/20" />
      <circle cx="42" cy="112" r="8" className="fill-success/20" />
      <path
        d="M100 20 L100 28 M100 132 L100 140 M40 80 L48 80 M152 80 L160 80"
        className="stroke-muted-foreground"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** رسمة "غير مصرح" — قفل. لصفحة Forbidden. */
export function ForbiddenIllustration({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 160 140" fill="none" className={className} aria-hidden>
      <ellipse cx="80" cy="122" rx="50" ry="7" className="fill-foreground/5" />
      <rect
        x="46"
        y="62"
        width="68"
        height="52"
        rx="10"
        className="fill-card stroke-border"
        strokeWidth="2"
      />
      <path
        d="M58 62 V46 a22 22 0 0 1 44 0 V62"
        className="stroke-border"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="80" cy="86" r="8" className="fill-destructive/70" />
      <rect x="76" y="90" width="8" height="14" rx="3" className="fill-destructive/70" />
      <circle cx="130" cy="34" r="9" className="fill-primary/15" />
      <circle cx="28" cy="100" r="7" className="fill-info/15" />
    </svg>
  );
}
