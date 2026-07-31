import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import ar from "./locales/ar.json";
import en from "./locales/en.json";
import arPages from "./locales/ar.pages.json";
import enPages from "./locales/en.pages.json";

export const SUPPORTED_LOCALES = ["ar", "en"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const LOCALE_DIR: Record<Locale, "rtl" | "ltr"> = { ar: "rtl", en: "ltr" };

type Dict = Record<string, unknown>;

/** Deep merge so page bundles can extend shared sections (e.g. `nav`). */
function merge(base: Dict, extra: Dict): Dict {
  const out: Dict = { ...base };
  for (const [key, value] of Object.entries(extra)) {
    const current = out[key];
    if (
      current &&
      typeof current === "object" &&
      !Array.isArray(current) &&
      value &&
      typeof value === "object" &&
      !Array.isArray(value)
    ) {
      out[key] = merge(current as Dict, value as Dict);
    } else {
      out[key] = value;
    }
  }
  return out;
}

if (!i18n.isInitialized) {
  void i18n.use(initReactI18next).init({
    resources: {
      ar: { translation: merge(ar as Dict, arPages as Dict) },
      en: { translation: merge(en as Dict, enPages as Dict) },
    },
    lng: "ar",
    fallbackLng: "ar",
    supportedLngs: SUPPORTED_LOCALES as unknown as string[],
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  });
}

export default i18n;
