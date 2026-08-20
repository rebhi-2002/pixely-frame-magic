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

/**
 * سابقاً كان هذا يحفظ التفضيل بجدول profiles على Supabase أيضاً. الباك اند
 * الجديد ما عنده endpoint مكافئ بعد، فـ localStorage هو المصدر الوحيد للحقيقة
 * حالياً — التفضيل بيضل شغال محلياً وبس. أعد الربط هنا لما يتوفر endpoint.
 */
function persistToProfile(_patch: { theme_pref?: ThemePref; locale?: Locale }) {
  /* no-op مؤقتاً — راجع التعليق أعلاه */
}

function readStoredTheme(): ThemePref {
  if (typeof window === "undefined") return "auto";
  const stored = localStorage.getItem(THEME_STORAGE_KEY) as ThemePref | null;
  return stored === "light" || stored === "dark" || stored === "auto" ? stored : "auto";
}

function readStoredLocale(): Locale {
  if (typeof window === "undefined") return "ar";
  const stored = localStorage.getItem(LOCALE_STORAGE_KEY) as Locale | null;
  return stored && SUPPORTED_LOCALES.includes(stored) ? stored : "ar";
}

function PreferencesState({ children }: { children: ReactNode }) {
  const { i18n: instance } = useTranslation();
  // القراءة المباشرة (lazy initializer) بدل useEffect منفصل — كان في سباق (race)
  // بين effect قراءة localStorage وeffect متابعة تفضيل نظام التشغيل: كلاهما
  // يعمل بنفس الـ commit الأول، وeffect النظام كان يكتب فوق القيمة المحفوظة
  // الصحيحة قبل ما توصل، فيرجع الثيم لـdark حتى لو localStorage فيها "light".
  const [theme, setThemeState] = useState<ThemePref>(readStoredTheme);
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">(() =>
    resolveDark(readStoredTheme()) ? "dark" : "light",
  );
  const [locale, setLocaleState] = useState<Locale>(readStoredLocale);
  const [switchingLocale, setSwitchingLocale] = useState(false);

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

  /* القسم 06 — تبديل اللغة بانتقال ناعم (تلاشٍ) بدل التغيير المفاجئ.
     يُحترم prefers-reduced-motion فيُطبَّق فوراً بلا حركة. */
  const setLocale = useCallback((next: Locale) => {
    const persist = (value: Locale) => {
      localStorage.setItem(LOCALE_STORAGE_KEY, value);
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

export function usePreferences() {
  const ctx = useContext(PreferencesContext);
  if (!ctx) throw new Error("usePreferences must be used inside PreferencesProvider");
  return ctx;
}
