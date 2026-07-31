import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { I18nextProvider, useTranslation } from "react-i18next";
import i18n, { LOCALE_DIR, SUPPORTED_LOCALES, type Locale } from "@/i18n";

export type ThemePref = "auto" | "light" | "dark";

export const THEME_STORAGE_KEY = "acadimia.theme";
export const LOCALE_STORAGE_KEY = "acadimia.locale";

/** Inline, runs before hydration so there is no flash of the wrong theme/dir. */
export const preferencesBootScript = `(function(){try{
var t=localStorage.getItem("${THEME_STORAGE_KEY}")||"auto";
var d=t==="dark"||(t!=="light"&&window.matchMedia("(prefers-color-scheme: dark)").matches);
var r=document.documentElement;
r.setAttribute("data-theme",d?"dark":"light");
r.classList.toggle("dark",d);
var l=localStorage.getItem("${LOCALE_STORAGE_KEY}")||"ar";
if(l!=="ar"&&l!=="en")l="ar";
r.setAttribute("lang",l);
r.setAttribute("dir",l==="en"?"ltr":"rtl");
}catch(e){}})();`;

function resolveDark(pref: ThemePref) {
  if (pref === "dark") return true;
  if (pref === "light") return false;
  return typeof window !== "undefined"
    ? window.matchMedia("(prefers-color-scheme: dark)").matches
    : true;
}

type PreferencesValue = {
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


const PreferencesContext = createContext<PreferencesValue | null>(null);

/** Persist to the signed-in user's profile (theme_pref / locale). Silent no-op when signed out. */
async function persistToProfile(patch: { theme_pref?: ThemePref; locale?: Locale }) {
  try {
    const { supabase } = await import("@/integrations/supabase/client");
    const { data } = await supabase.auth.getUser();
    if (!data.user) return;
    await supabase.from("profiles").update(patch).eq("user_id", data.user.id);
  } catch {
    /* preferences are best-effort; local storage remains the source of truth */
  }
}

function PreferencesState({ children }: { children: ReactNode }) {
  const { i18n: instance } = useTranslation();
  const [theme, setThemeState] = useState<ThemePref>("auto");
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("dark");
  const [locale, setLocaleState] = useState<Locale>("ar");

  // Read the persisted values written by the boot script (client only).
  useEffect(() => {
    const storedTheme = (localStorage.getItem(THEME_STORAGE_KEY) as ThemePref | null) ?? "auto";
    const storedLocale = localStorage.getItem(LOCALE_STORAGE_KEY) as Locale | null;
    setThemeState(storedTheme);
    setResolvedTheme(resolveDark(storedTheme) ? "dark" : "light");
    if (storedLocale && SUPPORTED_LOCALES.includes(storedLocale)) setLocaleState(storedLocale);
  }, []);

  // Follow the device when the user never chose manually.
  useEffect(() => {
    if (theme !== "auto") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = () => setResolvedTheme(mq.matches ? "dark" : "light");
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", resolvedTheme);
    root.classList.toggle("dark", resolvedTheme === "dark");
  }, [resolvedTheme]);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("lang", locale);
    root.setAttribute("dir", LOCALE_DIR[locale]);
    if (instance.language !== locale) void instance.changeLanguage(locale);
  }, [locale, instance]);

  const setTheme = useCallback((pref: ThemePref) => {
    setThemeState(pref);
    setResolvedTheme(resolveDark(pref) ? "dark" : "light");
    localStorage.setItem(THEME_STORAGE_KEY, pref);
    void persistToProfile({ theme_pref: pref });
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    localStorage.setItem(LOCALE_STORAGE_KEY, next);
    void persistToProfile({ locale: next });
  }, []);

  const value = useMemo<PreferencesValue>(
    () => ({
      theme,
      resolvedTheme,
      setTheme,
      toggleTheme: () => setTheme(resolvedTheme === "dark" ? "light" : "dark"),
      locale,
      setLocale,
      toggleLocale: () => setLocale(locale === "ar" ? "en" : "ar"),
      dir: LOCALE_DIR[locale],
    }),
    [theme, resolvedTheme, setTheme, locale, setLocale],
  );

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}

export function PreferencesProvider({ children }: { children: ReactNode }) {
  return (
    <I18nextProvider i18n={i18n}>
      <PreferencesState>{children}</PreferencesState>
    </I18nextProvider>
  );
}

export function usePreferences() {
  const ctx = useContext(PreferencesContext);
  if (!ctx) throw new Error("usePreferences must be used inside PreferencesProvider");
  return ctx;
}
