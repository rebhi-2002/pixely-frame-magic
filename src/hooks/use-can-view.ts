import { useAccess } from "@/hooks/use-access";
import { pageMatchesRole, roleKeyFromName } from "@/lib/bi";

/** حراسة الصفحة على الواجهة — تبني القائمة/الأذونات محلياً من rbac-client.ts. */
export function useCanView(pageKey: string) {
  const { access, can, isLoading } = useAccess();
  const role =
    access?.profile?.role_key ?? roleKeyFromName(access?.profile?.role_name, access?.isAdmin);
  return {
    loading: isLoading,
    allowed: can(pageKey, "view_list") && pageMatchesRole(pageKey, role),
    access,
  };
}
