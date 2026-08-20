import { isAuthenticated } from "@/integrations/backend/auth";
import { roleHome } from "@/lib/bi";

/**
 * حالياً كل جلسة مسجّلة = أدمن (راجع src/integrations/backend/auth.ts).
 */
export async function currentUserHome(): Promise<string | null> {
  if (!isAuthenticated()) return null;
  return roleHome("مدير عام", true);
}
