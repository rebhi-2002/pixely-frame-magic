import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { roleHome, roleKeyFromName, type RoleKey } from "@/lib/bi";

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

async function fetchSession(): Promise<PublicSession | null> {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return null;

  const [{ data: profile }, { data: admin }] = await Promise.all([
    supabase
      .from("profiles")
      .select("full_name, email, avatar_url, role_id, roles(name)")
      .eq("user_id", data.user.id)
      .maybeSingle(),
    supabase.rpc("has_role", { _user_id: data.user.id, _role: "admin" }),
  ]);

  const roleName = (profile as { roles?: { name: string } | null } | null)?.roles?.name ?? null;
  const isAdmin = Boolean(admin);

  return {
    userId: data.user.id,
    email: profile?.email ?? data.user.email ?? null,
    fullName: profile?.full_name || (data.user.email ?? "").split("@")[0] || "",
    avatarUrl: profile?.avatar_url ?? null,
    roleName,
    roleKey: roleKeyFromName(roleName, isAdmin),
    isAdmin,
    home: roleHome(roleName, isAdmin),
  };
}

/** جلسة المستخدم للصفحات العامة — تُستخدم لتبديل محتوى الهيدر والأزرار. */
export function useSession() {
  const query = useQuery({
    queryKey: ["public-session"],
    queryFn: fetchSession,
    staleTime: 60_000,
  });

  return {
    session: query.data ?? null,
    isSignedIn: Boolean(query.data),
    isLoading: query.isLoading,
  };
}
