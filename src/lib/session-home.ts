import {
  getStoredProfile,
  getStoredUserId,
  isAuthenticated,
  isDemoSession,
} from "@/integrations/backend/auth";
import { roleHome } from "@/lib/bi";
import { ROLES, USERS } from "@/lib/rbac-static-data";

export async function currentUserHome(): Promise<string | null> {
  if (!isAuthenticated()) return null;

  if (!isDemoSession()) {
    // جلسة حقيقية من الباك اند: roleId=1 ("مدير النظام") هو النوع الوحيد
    // المتاح فعليًا حاليًا — راجع fetchUserType بـ auth.ts. أي نوع تاني
    // (أو تعذّر تحديده) بيرجع لصفحة طالب افتراضية مؤقتًا.
    const profile = getStoredProfile();
    return roleHome(profile?.roleName ?? null, profile?.roleId === 1);
  }

  const userId = getStoredUserId();
  if (!userId) return "/";
  const user = USERS.find((u) => u.id === userId);
  const role = user ? ROLES.find((r) => r.id === user.role_id) : null;
  const isAdmin = role?.name === "مدير عام";
  return roleHome(role?.name, isAdmin);
}
