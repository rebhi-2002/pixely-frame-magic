import { usePreferences } from "@/components/providers/preferences-provider";

/** Bilingual inline text helper (ar primary, en secondary) — القسم 08. */
export function useBi() {
  const { locale } = usePreferences();
  return <T>(ar: T, en: T): T => (locale === "en" ? en : ar);
}

export type RoleKey = "student" | "teacher" | "parent" | "supervisor" | "admin";

const ROLE_BY_NAME: Record<string, RoleKey> = {
  طالب: "student",
  معلم: "teacher",
  "ولي أمر": "parent",
  "مشرف أكاديمي": "supervisor",
  "مدير عام": "admin",
};

export const ROLE_PAGE_PREFIXES: Record<RoleKey, readonly string[]> = {
  student: ["student_", "notifications", "account_settings"],
  teacher: ["teacher_", "notifications", "account_settings"],
  parent: ["parent_", "notifications", "account_settings"],
  supervisor: ["supervisor_", "notifications", "account_settings"],
  admin: ["admin_", "notifications", "account_settings"],
};

export function pageMatchesRole(pageKey: string, role: RoleKey): boolean {
  return ROLE_PAGE_PREFIXES[role].some(
    (prefix) => pageKey === prefix || pageKey.startsWith(prefix),
  );
}

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

/**
 * البند 9 — الروابط العامة المسموحة لكل دور بعد تسجيل الدخول.
 * لا نعرض رابطاً يؤدي إلى صفحة خارج مساحة الدور (سوق الكورسات للطالب فقط… إلخ).
 */
export const PUBLIC_NAV_FOR_ROLE: Record<RoleKey, readonly string[]> = {
  student: ["/", "/courses", "/how-it-works", "/pricing", "/blog"],
  teacher: ["/", "/for-teachers", "/how-it-works", "/blog"],
  parent: ["/", "/how-it-works", "/pricing", "/blog"],
  supervisor: ["/", "/how-it-works", "/blog"],
  admin: ["/", "/blog"],
};

export function allowedPublicPaths(role: RoleKey | null): readonly string[] | null {
  return role ? PUBLIC_NAV_FOR_ROLE[role] : null;
}
