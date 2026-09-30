import { useEffect, useState } from "react";
import {
  AUTH_EVENT,
  getStoredEmail,
  getStoredProfile,
  getStoredUserId,
  isAuthenticated,
} from "@/integrations/backend/auth";
import { resolveRoleKey, roleHomeForKey, type RoleKey } from "@/lib/bi";

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

function buildSession(): PublicSession | null {
  if (!isAuthenticated()) return null;
  const userId = getStoredUserId() ?? "";
  const profile = getStoredProfile();
  if (!profile) return null;

  const roleKey = resolveRoleKey(profile);
  const isAdmin = roleKey === "admin";
  return {
    userId,
    email: profile.email ?? getStoredEmail(),
    fullName: profile.name,
    avatarUrl: profile.avatar ?? null,
    roleName: profile.roleName ?? null,
    roleKey,
    isAdmin,
    home: roleHomeForKey(roleKey),
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
