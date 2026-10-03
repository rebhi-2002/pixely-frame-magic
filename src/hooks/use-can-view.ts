import { useAccess } from "@/hooks/use-access";
import { pageMatchesRole, resolveRoleKey } from "@/lib/bi";

/** حراسة الصفحة على الواجهة — تبني القائمة/الأذونات محلياً من rbac-client.ts. */
export function useCanView(pageKey: string) {
  const { access, can, isLoading } = useAccess();
  const role = access?.isAdmin
    ? "admin"
    : resolveRoleKey({
        roleKey: access?.profile?.role_key,
        roleId: access?.profile?.role_id,
        roleName: access?.profile?.role_name,
      });
  return {
    loading: isLoading,
    allowed: can(pageKey, "view_list") && pageMatchesRole(pageKey, role),
    access,
  };
}
