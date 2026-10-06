import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { I18nextProvider, useTranslation } from "react-i18next";
import i18n, { LOCALE_DIR, SUPPORTED_LOCALES, type Locale } from "@/i18n";
import { PreferencesContext, type PreferencesValue } from "@/hooks/use-preferences";

export type ThemePref = "auto" | "light" | "dark";

/** الثيم الافتراضي: فاتح (مو "auto" ومو غامق) — لغة افتراضية: عربي. */
export const DEFAULT_THEME: ThemePref = "light";
export const DEFAULT_LOCALE: Locale = "ar";
/** لون شريط المتصفح بالموبايل = خلفية الثيم الفعلية (أريح للعين وبدون حد غريب). */
export const THEME_COLORS = { light: "#F7F1E4", dark: "#D0E0FB" } as const;

export const THEME_STORAGE_KEY = "academia.theme";
export const LOCALE_STORAGE_KEY = "academia.locale";

/** Inline, runs before hydration so there is no flash of the wrong theme/dir. */
export const preferencesBootScript = `(function(){try{
var t=localStorage.getItem("${THEME_STORAGE_KEY}")||"light";
var d=t==="dark"||(t==="auto"&&window.matchMedia("(prefers-color-scheme: dark)").matches);
var r=document.documentElement;
r.setAttribute("data-theme",d?"dark":"light");
r.classList.toggle("dark",d);
var m=document.querySelector('meta[name="theme-color"]');
if(m)m.setAttribute("content",d?"${THEME_COLORS.dark}":"${THEME_COLORS.light}");
var q=new URLSearchParams(window.location.search).get("lang");
var l=q==="ar"||q==="en"?q:(localStorage.getItem("${LOCALE_STORAGE_KEY}")||"ar");
if(l!=="ar"&&l!=="en")l="ar";
r.setAttribute("lang",l);
r.setAttribute("dir",l==="en"?"ltr":"rtl");
}catch(e){}})();`;

function resolveDark(pref: ThemePref) {
  if (pref === "dark") return true;
  if (pref === "light") return false;
  return typeof window !== "undefined"
    ? window.matchMedia("(prefers-color-scheme: dark)").matches
    : false;
}

/**
 * سابقاً كان هذا يحفظ التفضيل بجدول profiles على Supabase أيضاً. الباك اند
 * الجديد ما عنده endpoint مكافئ بعد، فـ localStorage هو المصدر الوحيد للحقيقة
 * حالياً — التفضيل بيضل شغال محلياً وبس. أعد الربط هنا لما يتوفر endpoint.
 */
function persistToProfile(_patch: { theme_pref?: ThemePref; locale?: Locale }) {
  /* no-op مؤقتاً — راجع التعليق أعلاه */
}

function syncLocaleUrl(locale: Locale) {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  if (locale === "en") url.searchParams.set("lang", "en");
  else url.searchParams.delete("lang");
  window.history.replaceState(window.history.state, "", url);
}

function readStoredTheme(): ThemePref {
  if (typeof window === "undefined") return DEFAULT_THEME;
  const stored = localStorage.getItem(THEME_STORAGE_KEY) as ThemePref | null;
  return stored === "light" || stored === "dark" || stored === "auto" ? stored : DEFAULT_THEME;
}

function readStoredLocale(): Locale {
  if (typeof window === "undefined") return DEFAULT_LOCALE;
  const queryLocale = new URLSearchParams(window.location.search).get("lang");
  if (queryLocale && SUPPORTED_LOCALES.includes(queryLocale as Locale)) {
    return queryLocale as Locale;
  }
  const stored = localStorage.getItem(LOCALE_STORAGE_KEY) as Locale | null;
  return stored && SUPPORTED_LOCALES.includes(stored) ? stored : DEFAULT_LOCALE;
}

function PreferencesState({ children }: { children: ReactNode }) {
  const { i18n: instance } = useTranslation();
  // أول render لازم يطابق HTML السيرفر حرفيًا (ثيم فاتح + عربي)، وإلا React بيرمي
  // خطأ hydration #418 ويعيد رسم الصفحة كلها. فما بنقرأ localStorage/matchMedia
  // أثناء الـrender: بنبدأ بالافتراضي ونزامن بعد الـmount بـeffect واحد (يحدّد
  // الثيم واللغة المحفوظين سوا — فما في سباق بين effects). الـboot script
  // بيطبّق data-theme/lang/dir الصحيحة قبل أي رسم، فما في وميض بصري.
  const [theme, setThemeState] = useState<ThemePref>(DEFAULT_THEME);
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
  const [switchingLocale, setSwitchingLocale] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const storedTheme = readStoredTheme();
    setThemeState(storedTheme);
    setResolvedTheme(resolveDark(storedTheme) ? "dark" : "light");
    setLocaleState(readStoredLocale());
    setHydrated(true);
  }, []);

  // Follow the device when the user never chose manually.
  useEffect(() => {
    if (!hydrated || theme !== "auto") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = () => setResolvedTheme(mq.matches ? "dark" : "light");
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [theme, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    const root = document.documentElement;
    root.setAttribute("data-theme", resolvedTheme);
    root.classList.toggle("dark", resolvedTheme === "dark");
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", THEME_COLORS[resolvedTheme]);
  }, [resolvedTheme, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    const root = document.documentElement;
    root.setAttribute("lang", locale);
    root.setAttribute("dir", LOCALE_DIR[locale]);
    if (instance.language !== locale) void instance.changeLanguage(locale);
  }, [locale, instance, hydrated]);

  const setTheme = useCallback((pref: ThemePref) => {
    setThemeState(pref);
    setResolvedTheme(resolveDark(pref) ? "dark" : "light");
    localStorage.setItem(THEME_STORAGE_KEY, pref);
    void persistToProfile({ theme_pref: pref });
  }, []);

  /* القسم 06 — تبديل اللغة بانتقال ناعم (تلاشٍ) بدل التغيير المفاجئ.
     يُحترم prefers-reduced-motion فيُطبَّق فوراً بلا حركة. */
  const setLocale = useCallback((next: Locale) => {
    const persist = (value: Locale) => {
      localStorage.setItem(LOCALE_STORAGE_KEY, value);
      syncLocaleUrl(value);
      void persistToProfile({ locale: value });
    };

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      setLocaleState(next);
      persist(next);
      return;
    }

    setSwitchingLocale(true);
    window.setTimeout(() => {
      setLocaleState(next);
      persist(next);
      window.setTimeout(() => setSwitchingLocale(false), 240);
    }, 220);
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
      switchingLocale,
    }),
    [theme, resolvedTheme, setTheme, locale, setLocale, switchingLocale],
  );

  return (
    <PreferencesContext.Provider value={value}>
      <div data-locale-switching={switchingLocale ? "true" : "false"} className="locale-fade">
        {children}
      </div>

      {switchingLocale && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[80] flex items-center justify-center bg-background/45 backdrop-blur-[2px]"
        >
          <span className="size-6 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
        </div>
      )}
    </PreferencesContext.Provider>
  );
}

export function PreferencesProvider({ children }: { children: ReactNode }) {
  return (
    <I18nextProvider i18n={i18n}>
      <PreferencesState>{children}</PreferencesState>
    </I18nextProvider>
  );
}
