import { getStoredUserId, isAuthenticated } from "@/integrations/backend/auth";
import { roleHome } from "@/lib/bi";
import { ROLES, USERS } from "@/lib/rbac-static-data";

export async function currentUserHome(): Promise<string | null> {
  if (!isAuthenticated()) return null;
  const userId = getStoredUserId() ?? "u-admin";
  const user = USERS.find((u) => u.id === userId);
  const role = user ? ROLES.find((r) => r.id === user.role_id) : null;
  const isAdmin = role?.name === "مدير عام";
  return roleHome(role?.name, isAdmin);
}
