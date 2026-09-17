import { useEffect } from "react";
import { useLocation } from "@tanstack/react-router";
import { usePreferences } from "@/hooks/use-preferences";
import { applySeo, getSeoForPath } from "@/lib/seo";

/** Keeps the document head aligned with the current route and selected locale. */
export function SeoManager() {
  const location = useLocation();
  const { locale } = usePreferences();

  useEffect(() => {
    applySeo(getSeoForPath(location.pathname, locale));
  }, [location.pathname, locale]);

  return null;
}
