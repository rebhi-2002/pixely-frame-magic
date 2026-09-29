/**
 * مكتبة رسومات SVG خفيفة مبنية بهوية الموقع (ألوان عبر currentColor/CSS vars
 * فبتتبدّل تلقائيًا مع dark/light) — بديل عن الصور الفوتوغرافية الحقيقية غير
 * المتوفرة حاليًا. كل رسمة عبارة عن مكوّن React بسيط، صفر طلبات شبكة إضافية.
 *
 * أي نص داخل هالرسومات (عبر <text>) لازم يمر بـt("illustrations.xxx") —
 * مش نص عربي ثابت — وإلا بيضل عربي حتى بالوضع الإنجليزي (باگ صار مصلّح
 * 2026-09-18، راجع docs/operations لنفس التاريخ).
 */
import { useTranslation } from "react-i18next";

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

/** رسمة "من الرفع للنشر" — تدفق مرئي (رفع → مراجعة → منشور) لصفحة "للمعلمين". */
export function ContentFlowIllustration({ className }: IllustrationProps) {
  const { t } = useTranslation();
  return (
    <svg viewBox="0 0 320 140" fill="none" className={className} aria-hidden>
      <rect
        x="10"
        y="44"
        width="84"
        height="60"
        rx="12"
        className="fill-card stroke-border"
        strokeWidth="2"
      />
      <path
        d="M52 66 V86 M42 76 L52 66 L62 76"
        className="stroke-primary"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <text
        x="52"
        y="118"
        textAnchor="middle"
        className="fill-muted-foreground text-[9px] font-medium"
      >
        {t("illustrations.uploadContent")}
      </text>

      <path d="M100 74 H128" className="stroke-border" strokeWidth="2" strokeDasharray="4 4" />
      <path d="M120 68 L128 74 L120 80" className="stroke-border" strokeWidth="2" fill="none" />

      <rect
        x="132"
        y="34"
        width="84"
        height="70"
        rx="12"
        className="fill-info/8 stroke-info/40"
        strokeWidth="2"
      />
      <circle cx="174" cy="60" r="14" className="fill-info/15" />
      <path
        d="M168 60 h12 M168 66 h8"
        className="stroke-info"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <text
        x="174"
        y="118"
        textAnchor="middle"
        className="fill-muted-foreground text-[9px] font-medium"
      >
        {t("illustrations.basicReview")}
      </text>

      <path d="M222 74 H250" className="stroke-border" strokeWidth="2" strokeDasharray="4 4" />
      <path d="M242 68 L250 74 L242 80" className="stroke-border" strokeWidth="2" fill="none" />

      <rect
        x="254"
        y="44"
        width="60"
        height="60"
        rx="12"
        className="fill-success/10 stroke-success/40"
        strokeWidth="2"
      />
      <path
        d="M270 74 L280 84 L298 64"
        className="stroke-success"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <text
        x="284"
        y="118"
        textAnchor="middle"
        className="fill-muted-foreground text-[9px] font-medium"
      >
        {t("illustrations.published")}
      </text>
    </svg>
  );
}

/**
 * رسمة "تقرير ولي الأمر" — بطاقة تقرير أسبوعي مختصر + رمز خصوصية (قفل)،
 * تجسّد الفكرتين الأساسيتين لصفحة أولياء الأمور: ملخص واضح + خصوصية الطالب.
 */
export function ParentReportIllustration({ className }: IllustrationProps) {
  const { t } = useTranslation();
  return (
    <svg viewBox="0 0 260 120" fill="none" className={className} aria-hidden>
      <rect
        x="16"
        y="14"
        width="150"
        height="92"
        rx="14"
        className="fill-card stroke-border"
        strokeWidth="2"
      />
      <rect x="32" y="30" width="60" height="7" rx="3.5" className="fill-foreground/15" />
      <rect x="32" y="46" width="118" height="10" rx="5" className="fill-success/12" />
      <rect x="32" y="46" width="82" height="10" rx="5" className="fill-success/45" />
      <rect x="32" y="64" width="118" height="10" rx="5" className="fill-primary/10" />
      <rect x="32" y="64" width="54" height="10" rx="5" className="fill-primary/45" />
      <rect x="32" y="84" width="46" height="14" rx="7" className="fill-info/12" />
      <text x="55" y="94" textAnchor="middle" className="fill-info text-[8px] font-bold">
        {t("illustrations.weekly")}
      </text>

      <circle
        cx="210"
        cy="60"
        r="36"
        className="fill-success/8 stroke-success/30"
        strokeWidth="2"
      />
      <path
        d="M210 42 a12 12 0 0 0-12 12 v6 h24 v-6 a12 12 0 0 0-12-12 Z"
        className="fill-none stroke-success"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <rect
        x="196"
        y="58"
        width="28"
        height="20"
        rx="4"
        className="fill-success/20 stroke-success"
        strokeWidth="2"
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
