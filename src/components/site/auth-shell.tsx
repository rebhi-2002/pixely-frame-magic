import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { BookOpenCheck, LineChart, XCircle } from "lucide-react";
import { BrandMark } from "@/components/site/public-layout";
import { PreferenceToggles } from "@/components/site/preference-toggles";
import { WelcomeIllustration } from "@/components/site/illustrations";
import { useBi } from "@/lib/bi";

const sidePoints = [
  {
    icon: BookOpenCheck,
    ar: "مكتبة ذكية منظّمة حسب المنهاج",
    en: "A smart library organized by curriculum",
  },
  { icon: LineChart, ar: "متابعة تقدّم يومية بدون تعقيد", en: "Simple daily progress tracking" },
  {
    icon: XCircle,
    ar: "بنك أخطاء يذكّرك بنقاط ضعفك",
    en: "A mistake bank that flags your weak spots",
  },
] as const;

/** غلاف موحّد لكل صفحات المصادقة (هوية أكاديميا: سطح داكن + شبكة خفيفة). */
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
    <div className="surface-mesh flex min-h-screen flex-col bg-background">
      <header className="flex items-center justify-between px-5 py-4">
        <BrandMark />
        <PreferenceToggles />
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-8">
        <div className="mx-auto grid w-full max-w-5xl items-center gap-10 lg:grid-cols-2">
          {/* لوحة زخرفية — تظهر بالشاشات الكبيرة بس، تعطي إحساس منتج حقيقي بدل
              فراغ حوالين الفورم */}
          <div className="hidden lg:block">
            <WelcomeIllustration className="h-40 w-auto" />
            <h2 className="mt-6 max-w-sm text-2xl font-bold leading-snug text-foreground">
              {bi(
                "كل أدوات التنظيم والتحضير بمكان واحد",
                "Every study and exam-prep tool, in one place",
              )}
            </h2>
            <ul className="mt-6 space-y-4">
              {sidePoints.map((p) => (
                <li key={p.ar} className="flex items-center gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-primary">
                    <p.icon className="size-4" />
                  </span>
                  <span className="text-sm text-muted-foreground">{bi(p.ar, p.en)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className={`shadow-elevation-2 mx-auto w-full rounded-2xl border border-border bg-card p-6 sm:p-8 ${
              wide ? "max-w-2xl lg:max-w-none" : "max-w-md lg:max-w-md"
            }`}
          >
            <div className="mb-6 flex items-start gap-3">
              {icon && (
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-primary">
                  {icon}
                </span>
              )}
              <div className="min-w-0">
                <h1 className="font-display text-xl font-bold text-foreground">{title}</h1>
                {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
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
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  hint?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-semibold text-foreground">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary"
      />
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}
