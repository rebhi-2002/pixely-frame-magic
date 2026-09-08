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

/**
 * رسمة "المكتبة الذكية" — تصنيف شجري (فصل ← مادة ← وحدة ← درس) بشكل بصري،
 * بدل أيقونة كتاب عامة. تُستخدم بالبطاقة الرئيسية (Flagship) بقسم مزايا الرئيسية.
 */
export function LibraryTreeIllustration({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 220 150" fill="none" className={className} aria-hidden>
      <rect x="18" y="18" width="70" height="24" rx="8" className="fill-primary/15" />
      <text x="53" y="34" textAnchor="middle" className="fill-primary text-[10px] font-bold">
        الفصل
      </text>
      <path d="M53 42 L53 56" className="stroke-border" strokeWidth="2" />
      <path d="M53 56 H150" className="stroke-border" strokeWidth="2" />
      <path d="M78 56 V66 M126 56 V66 M150 56 V66" className="stroke-border" strokeWidth="2" />

      <rect x="46" y="66" width="64" height="22" rx="7" className="fill-card stroke-border" strokeWidth="1.5" />
      <text x="78" y="80" textAnchor="middle" className="fill-foreground text-[9px] font-semibold">
        رياضيات
      </text>
      <rect x="120" y="66" width="64" height="22" rx="7" className="fill-card stroke-border" strokeWidth="1.5" />
      <text x="152" y="80" textAnchor="middle" className="fill-foreground text-[9px] font-semibold">
        علوم
      </text>

      <path d="M78 88 V98" className="stroke-border" strokeWidth="1.5" />
      <rect x="52" y="98" width="52" height="18" rx="6" className="fill-primary/10" />
      <text x="78" y="110" textAnchor="middle" className="fill-primary text-[8px] font-medium">
        وحدة 3
      </text>

      <path d="M152 88 V98" className="stroke-border" strokeWidth="1.5" />
      <rect x="126" y="98" width="52" height="18" rx="6" className="fill-success/10" />
      <text x="152" y="110" textAnchor="middle" className="fill-success text-[8px] font-medium">
        وحدة 1
      </text>

      <circle cx="192" cy="30" r="12" className="fill-info/15" />
      <circle cx="24" cy="120" r="8" className="fill-success/15" />
    </svg>
  );
}

/**
 * رسمة "محاكي الامتحان" — ورقة امتحان بمؤقّت وعلامة صح، بدل أيقونة روبوت عامة.
 * تُستخدم بالبطاقة العريضة الخاصة بمحاكي الامتحان الوزاري بقسم مزايا الرئيسية.
 */
export function ExamSimIllustration({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 220 120" fill="none" className={className} aria-hidden>
      <rect x="24" y="14" width="98" height="94" rx="10" className="fill-card stroke-border" strokeWidth="2" />
      <rect x="38" y="30" width="70" height="6" rx="3" className="fill-foreground/15" />
      <rect x="38" y="44" width="52" height="6" rx="3" className="fill-foreground/10" />
      <circle cx="42" cy="62" r="5" className="fill-success/20 stroke-success" strokeWidth="1.5" />
      <path d="M39.5 62 L41.5 64 L45 59.5" className="stroke-success" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <rect x="52" y="59" width="48" height="6" rx="3" className="fill-foreground/10" />
      <circle cx="42" cy="80" r="5" className="fill-destructive/15 stroke-destructive/60" strokeWidth="1.5" />
      <rect x="52" y="77" width="40" height="6" rx="3" className="fill-foreground/10" />

      <circle cx="164" cy="46" r="34" className="fill-primary/8 stroke-primary/40" strokeWidth="2" />
      <path d="M164 46 L164 26 M164 46 L180 54" className="stroke-primary" strokeWidth="3" strokeLinecap="round" />
      <circle cx="164" cy="46" r="3" className="fill-primary" />

      <rect x="140" y="88" width="48" height="20" rx="10" className="fill-success/15" />
      <text x="164" y="101" textAnchor="middle" className="fill-success text-[9px] font-bold">
        92%
      </text>
    </svg>
  );
}

/** رسمة "من الرفع للنشر" — تدفق مرئي (رفع → مراجعة → منشور) لصفحة "للمعلمين". */
export function ContentFlowIllustration({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 320 140" fill="none" className={className} aria-hidden>
      <rect x="10" y="44" width="84" height="60" rx="12" className="fill-card stroke-border" strokeWidth="2" />
      <path d="M52 66 V86 M42 76 L52 66 L62 76" className="stroke-primary" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <text x="52" y="118" textAnchor="middle" className="fill-muted-foreground text-[9px] font-medium">رفع المحتوى</text>

      <path d="M100 74 H128" className="stroke-border" strokeWidth="2" strokeDasharray="4 4" />
      <path d="M120 68 L128 74 L120 80" className="stroke-border" strokeWidth="2" fill="none" />

      <rect x="132" y="34" width="84" height="70" rx="12" className="fill-info/8 stroke-info/40" strokeWidth="2" />
      <circle cx="174" cy="60" r="14" className="fill-info/15" />
      <path d="M168 60 h12 M168 66 h8" className="stroke-info" strokeWidth="2" strokeLinecap="round" />
      <text x="174" y="118" textAnchor="middle" className="fill-muted-foreground text-[9px] font-medium">مراجعة أساسية</text>

      <path d="M222 74 H250" className="stroke-border" strokeWidth="2" strokeDasharray="4 4" />
      <path d="M242 68 L250 74 L242 80" className="stroke-border" strokeWidth="2" fill="none" />

      <rect x="254" y="44" width="60" height="60" rx="12" className="fill-success/10 stroke-success/40" strokeWidth="2" />
      <path d="M270 74 L280 84 L298 64" className="stroke-success" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <text x="284" y="118" textAnchor="middle" className="fill-muted-foreground text-[9px] font-medium">منشور</text>
    </svg>
  );
}

/** رسمة "اختيار الخطة" — مسارين (مجاني/بريميوم) يلتقيان بنفس الوجهة. لصفحة الأسعار. */
export function PlanChoiceIllustration({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 260 100" fill="none" className={className} aria-hidden>
      <path
        d="M20 80 Q90 80 130 50"
        className="stroke-border"
        strokeWidth="2.5"
        strokeDasharray="5 5"
        fill="none"
      />
      <path
        d="M20 20 Q90 20 130 50"
        className="stroke-primary/70"
        strokeWidth="2.5"
        fill="none"
      />
      <circle cx="20" cy="80" r="7" className="fill-card stroke-border" strokeWidth="2" />
      <circle cx="20" cy="20" r="7" className="fill-primary/15 stroke-primary" strokeWidth="2" />
      <circle cx="130" cy="50" r="10" className="fill-primary" />
      <path d="M126 50 L129 53 L135 46" className="stroke-primary-foreground" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M148 50 H230" className="stroke-border" strokeWidth="2" />
      <path d="M222 44 L230 50 L222 56" className="stroke-border" strokeWidth="2" fill="none" />
    </svg>
  );
}

/**
 * رسمة "بنك الأخطاء" — بطاقة سؤال مصغّرة عليها علامة خطأ وتاغ "محفوظ للمراجعة"،
 * بدل أيقونة X عامة. بيانات توضيحية (demo) فقط، مافي رقم حقيقي.
 */
export function MistakeBankIllustration({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 220 90" fill="none" className={className} aria-hidden>
      <rect x="14" y="14" width="130" height="62" rx="12" className="fill-card stroke-border" strokeWidth="2" />
      <rect x="28" y="28" width="70" height="6" rx="3" className="fill-foreground/15" />
      <rect x="28" y="42" width="90" height="6" rx="3" className="fill-foreground/10" />
      <circle cx="122" cy="31" r="9" className="fill-destructive/15 stroke-destructive/60" strokeWidth="1.5" />
      <path d="M118.5 27.5 L125.5 34.5 M125.5 27.5 L118.5 34.5" className="stroke-destructive" strokeWidth="1.6" strokeLinecap="round" />
      <rect x="28" y="56" width="46" height="14" rx="7" className="fill-primary/10" />
      <text x="51" y="66" textAnchor="middle" className="fill-primary text-[8px] font-bold">
        للمراجعة
      </text>

      <rect x="160" y="10" width="50" height="70" rx="10" className="fill-primary/6 stroke-primary/25" strokeWidth="1.5" strokeDasharray="3 3" />
      <path d="M175 30 v14 M168 37 h14" className="stroke-primary/50" strokeWidth="2" strokeLinecap="round" />
      <text x="185" y="66" textAnchor="middle" className="fill-muted-foreground text-[7px]">
        يتجمّع هنا
      </text>
    </svg>
  );
}

/**
 * رسمة "مراجعة 15 دقيقة" — قرص مؤقّت مقسوم لثلاث حصص قصيرة، بدل أيقونة ساعة عامة.
 * بيانات توضيحية (demo) فقط.
 */
export function ReviewSessionIllustration({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 220 90" fill="none" className={className} aria-hidden>
      <circle cx="45" cy="45" r="32" className="fill-card stroke-border" strokeWidth="2" />
      <path d="M45 45 L45 20 A25 25 0 0 1 66 57 Z" className="fill-primary/20" />
      <path d="M45 45 L45 20" className="stroke-primary" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M45 45 L66 57" className="stroke-primary" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="45" cy="45" r="3" className="fill-primary" />
      <text x="45" y="80" textAnchor="middle" className="fill-muted-foreground text-[8px] font-medium">
        15 دقيقة
      </text>

      <g>
        <rect x="98" y="18" width="108" height="14" rx="7" className="fill-success/12" />
        <rect x="98" y="18" width="70" height="14" rx="7" className="fill-success/40" />
        <rect x="98" y="38" width="108" height="14" rx="7" className="fill-primary/10" />
        <rect x="98" y="38" width="40" height="14" rx="7" className="fill-primary/40" />
        <rect x="98" y="58" width="108" height="14" rx="7" className="fill-border/60" />
      </g>
    </svg>
  );
}

/**
 * رسمة "تقرير ولي الأمر" — بطاقة تقرير أسبوعي مختصر + رمز خصوصية (قفل)،
 * تجسّد الفكرتين الأساسيتين لصفحة أولياء الأمور: ملخص واضح + خصوصية الطالب.
 */
export function ParentReportIllustration({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 260 120" fill="none" className={className} aria-hidden>
      <rect x="16" y="14" width="150" height="92" rx="14" className="fill-card stroke-border" strokeWidth="2" />
      <rect x="32" y="30" width="60" height="7" rx="3.5" className="fill-foreground/15" />
      <rect x="32" y="46" width="118" height="10" rx="5" className="fill-success/12" />
      <rect x="32" y="46" width="82" height="10" rx="5" className="fill-success/45" />
      <rect x="32" y="64" width="118" height="10" rx="5" className="fill-primary/10" />
      <rect x="32" y="64" width="54" height="10" rx="5" className="fill-primary/45" />
      <rect x="32" y="84" width="46" height="14" rx="7" className="fill-info/12" />
      <text x="55" y="94" textAnchor="middle" className="fill-info text-[8px] font-bold">
        أسبوعي
      </text>

      <circle cx="210" cy="60" r="36" className="fill-success/8 stroke-success/30" strokeWidth="2" />
      <path d="M210 42 a12 12 0 0 0-12 12 v6 h24 v-6 a12 12 0 0 0-12-12 Z" className="fill-none stroke-success" strokeWidth="2.5" strokeLinejoin="round" />
      <rect x="196" y="58" width="28" height="20" rx="4" className="fill-success/20 stroke-success" strokeWidth="2" />
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
