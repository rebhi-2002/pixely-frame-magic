import { useEffect, useState } from "react";
import {
  AUTH_EVENT,
  getStoredEmail,
  getStoredProfile,
  getStoredUserId,
  isAuthenticated,
} from "@/integrations/backend/auth";
import { roleHome, type RoleKey } from "@/lib/bi";
import { ROLES, USERS } from "@/lib/rbac-static-data";

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

const ROLE_KEY_BY_ID: Record<string, RoleKey> = {
  "r-admin": "admin",
  "r-supervisor": "supervisor",
  "r-teacher": "teacher",
  "r-parent": "parent",
  "r-student": "student",
};

function buildSession(): PublicSession | null {
  if (!isAuthenticated()) return null;
  const userId = getStoredUserId() ?? "u-admin";
  const profile = getStoredProfile();
  const user = USERS.find((u) => u.id === userId) ?? USERS[0];
  const role = ROLES.find((r) => r.id === user.role_id);
  const isAdmin = role?.name === "مدير عام";
  const email = profile?.email ?? getStoredEmail() ?? user.email;
  return {
    userId,
    email,
    fullName: profile?.name ?? user.full_name,
    avatarUrl: profile?.avatar ?? user.avatar_url,
    roleName: role?.name ?? null,
    roleKey: (user.role_id && ROLE_KEY_BY_ID[user.role_id]) || "student",
    isAdmin,
    home: roleHome(role?.name, isAdmin),
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
