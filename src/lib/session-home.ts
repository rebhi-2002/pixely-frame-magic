import { getStoredProfile, isAuthenticated } from "@/integrations/backend/auth";
import { resolveRoleKey, roleHomeForKey } from "@/lib/bi";

export async function currentUserHome(): Promise<string | null> {
  if (!isAuthenticated()) return null;
  return roleHomeForKey(resolveRoleKey(getStoredProfile()));
}
