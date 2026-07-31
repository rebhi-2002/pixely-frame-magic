import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { BrandMark } from "@/components/site/public-layout";
import { PreferenceToggles } from "@/components/site/preference-toggles";

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
  return (
    <div className="surface-grid flex min-h-screen flex-col bg-background">
      <header className="flex items-center justify-between px-5 py-4">
        <BrandMark />
        <PreferenceToggles />
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-8">
        <div
          className={`w-full rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8 ${
            wide ? "max-w-2xl" : "max-w-md"
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
