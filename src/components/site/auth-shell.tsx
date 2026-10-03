import { useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Search, CalendarDays, Wallet, Eye, EyeOff } from "lucide-react";
import { BrandMark } from "@/components/site/public-layout";
import { PreferenceToggles } from "@/components/site/preference-toggles";
import { useBi } from "@/lib/bi";

/* محدَّثة لتطابق المنتج الحقيقي الحالي (سوق معلمين) بدل المنتج القديم
   المحذوف (مكتبة ذاتية، بنك أخطاء) الذي كان هنا بالغلط. */
const sidePoints = [
  {
    icon: Search,
    ar: "دليل معلمين حقيقي بالمادة والسعر والتوفّر",
    en: "A real teacher directory by subject, price and availability",
  },
  {
    icon: CalendarDays,
    ar: "جدول دروسك وحجوزاتك بمكان واحد",
    en: "Your lessons and bookings schedule, in one place",
  },
  {
    icon: Wallet,
    ar: "محفظة داخلية بسجل معاملات واضح",
    en: "An in-app wallet with a clear transaction history",
  },
] as const;

/** غلاف موحّد لكل صفحات المصادقة (هوية أكاديميا: خلفية كريمية + حدود صلبة). */
export function AuthShell({
  icon,
  title,
  subtitle,
  children,
  wide = false,
}: {
  icon?: ReactNode;
  title: string;
  subtitle?: string;
  children: ReactNode;
  wide?: boolean;
}) {
  const { t } = useTranslation();
  const bi = useBi();
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="flex items-center justify-between px-5 py-4">
        <BrandMark />
        <PreferenceToggles />
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-8 sm:py-12">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          {/* لوحة جانبية — تظهر بالشاشات الكبيرة بس، تعطي إحساس منتج حقيقي بدل
              فراغ حوالين الفورم. تايبوغرافيا فقط، بلا رسم زخرفي (Visual Budget). */}
          <div className="hidden lg:block">
            <h2 className="max-w-sm text-2xl font-extrabold leading-snug text-foreground">
              {bi(
                "لاقِ المعلم المناسب وابدأ بثقة",
                "Find the right teacher and start with confidence",
              )}
            </h2>
            <ul className="mt-6 space-y-4">
              {sidePoints.map((p) => (
                <li key={p.ar} className="flex items-center gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border-2 border-[var(--border-strong)] bg-primary/12 text-primary">
                    <p.icon className="size-4" />
                  </span>
                  <span className="text-sm text-muted-foreground">{bi(p.ar, p.en)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className={`mx-auto w-full rounded-2xl border-2 border-[var(--border-strong)] bg-card p-6 shadow-[var(--shadow-brutal)] sm:p-8 ${
              wide ? "max-w-md sm:max-w-2xl lg:max-w-none" : "max-w-md lg:max-w-md"
            }`}
          >
            <div className="mb-6 flex items-start gap-3">
              {icon && (
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border-2 border-[var(--border-strong)] bg-primary/12 text-primary">
                  {icon}
                </span>
              )}
              <div className="min-w-0">
                <h1 className="font-display text-xl font-extrabold text-foreground">{title}</h1>
                {subtitle && (
                  <p className="mt-1 max-w-md text-sm leading-6 text-muted-foreground">
                    {subtitle}
                  </p>
                )}
              </div>
            </div>
            {children}
          </div>
        </div>
      </main>

      <footer className="px-5 py-6 text-center text-xs text-muted-foreground">
        <Link to="/" className="hover:text-foreground">
          {t("errors.backHome")}
        </Link>
      </footer>
    </div>
  );
}

export function AuthField({
  id,
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  autoComplete,
  hint,
  error,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  hint?: string;
  error?: string;
}) {
  const bi = useBi();
  const [visible, setVisible] = useState(false);
  const isPassword = type === "password";
  const describedBy =
    [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(" ") || undefined;

  return (
    <div className="min-w-0 space-y-1.5">
      <label htmlFor={id} className="block text-sm font-semibold text-foreground">
        {label}
      </label>
      <div className="relative min-w-0">
        <input
          id={id}
          type={isPassword && visible ? "text" : type}
          value={value}
          placeholder={placeholder}
          autoComplete={autoComplete}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className="h-11 w-full min-w-0 rounded-xl border-2 border-[var(--border-strong)] bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition-[border-color,box-shadow] placeholder:text-muted-foreground focus:border-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20"
        />
        {isPassword && (
          <button
            type="button"
            aria-label={bi("إظهار كلمة المرور", "Show password")}
            title={bi("إظهار كلمة المرور", "Show password")}
            onClick={() => setVisible((current) => !current)}
            className="absolute end-2 top-1/2 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground focus-visible:outline-none"
          >
            {visible ? (
              <EyeOff aria-hidden="true" className="size-4" />
            ) : (
              <Eye aria-hidden="true" className="size-4" />
            )}
          </button>
        )}
      </div>
      {hint && (
        <p id={`${id}-hint`} className="text-xs text-muted-foreground">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs font-semibold text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
