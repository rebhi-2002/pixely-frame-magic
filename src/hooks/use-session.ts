import { useEffect, useState } from "react";
import { AUTH_EVENT, getStoredEmail, isAuthenticated } from "@/integrations/backend/auth";
import { roleHome, type RoleKey } from "@/lib/bi";

export interface PublicSession {
  userId: string;
  email: string | null;
  fullName: string;
  avatarUrl: string | null;
  roleName: string | null;
  roleKey: RoleKey;
  isAdmin: boolean;
  home: string;
}

/**
 * حالياً كل جلسة مسجّلة = أدمن (راجع src/integrations/backend/auth.ts —
 * الباك اند لسا ما بيرجع بيانات مستخدم/دور). لما يتوفر endpoint حقيقي
 * لبيانات المستخدم الحالي، استبدل هذا ببناء الجلسة من استجابته.
 */
function buildSession(): PublicSession | null {
  if (!isAuthenticated()) return null;
  const email = getStoredEmail();
  return {
    userId: "u-admin",
    email,
    fullName: email?.split("@")[0] || "الأدمن",
    avatarUrl: null,
    roleName: "مدير عام",
    roleKey: "admin",
    isAdmin: true,
    home: roleHome("مدير عام", true),
  };
}

/** جلسة المستخدم للصفحات العامة — تُستخدم لتبديل محتوى الهيدر والأزرار. */
export function useSession() {
  const [session, setSession] = useState<PublicSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const sync = () => {
      setSession(buildSession());
      setIsLoading(false);
    };
    sync();
    window.addEventListener(AUTH_EVENT, sync);
    return () => window.removeEventListener(AUTH_EVENT, sync);
  }, []);

  return {
    session,
    isSignedIn: Boolean(session),
    isLoading,
  };
}
