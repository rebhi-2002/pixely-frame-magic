import { usePreferences } from "@/components/providers/preferences-provider";

/** Bilingual inline text helper (ar primary, en secondary) — القسم 08. */
export function useBi() {
  const { locale } = usePreferences();
  return (ar: string, en: string) => (locale === "en" ? en : ar);
}

export type RoleKey = "student" | "teacher" | "parent" | "supervisor" | "admin";

const ROLE_BY_NAME: Record<string, RoleKey> = {
  "طالب": "student",
  "معلم": "teacher",
  "ولي أمر": "parent",
  "مشرف أكاديمي": "supervisor",
  "مدير عام": "admin",
};

export function roleKeyFromName(name?: string | null, isAdmin = false): RoleKey {
  if (name && ROLE_BY_NAME[name]) return ROLE_BY_NAME[name];
  return isAdmin ? "admin" : "student";
}

export const ROLE_HOME: Record<RoleKey, string> = {
  student: "/dashboard",
  teacher: "/teacher/dashboard",
  parent: "/parent/report",
  supervisor: "/supervisor/dashboard",
  admin: "/admin/dashboard",
};

export function roleHome(name?: string | null, isAdmin = false): string {
  return ROLE_HOME[roleKeyFromName(name, isAdmin)];
}
