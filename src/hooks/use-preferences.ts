import { createContext, useContext } from "react";
import type { Locale } from "@/i18n";
import type { ThemePref } from "@/components/providers/preferences-provider";

export type PreferencesValue = {
  theme: ThemePref;
  resolvedTheme: "light" | "dark";
  setTheme: (pref: ThemePref) => void;
  toggleTheme: () => void;
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  dir: "rtl" | "ltr";
  /** true أثناء انتقال تبديل اللغة (تلاشٍ ناعم بدل القفزة) */
  switchingLocale: boolean;
};

export const PreferencesContext = createContext<PreferencesValue | null>(null);

export function usePreferences() {
  const ctx = useContext(PreferencesContext);
  if (!ctx) throw new Error("usePreferences must be used inside PreferencesProvider");
  return ctx;
}
