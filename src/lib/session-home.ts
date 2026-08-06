import { supabase } from "@/integrations/supabase/client";
import { roleHome } from "@/lib/bi";

export async function currentUserHome(): Promise<string | null> {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("role_id, roles(name)")
    .eq("user_id", data.user.id)
    .maybeSingle();

  const roleName = (profile as { roles?: { name: string } | null } | null)?.roles?.name;
  const { data: admin } = await supabase.rpc("has_role", {
    _user_id: data.user.id,
    _role: "admin",
  });

  return roleHome(roleName, Boolean(admin));
}