import { useAccess } from "@/hooks/use-access";
import { pageMatchesRole, roleKeyFromName } from "@/lib/bi";

/** حراسة الصفحة على الواجهة (الحراسة الحقيقية على السيرفر في rbac.server.ts). */
export function useCanView(pageKey: string) {
  const { access, can, isLoading } = useAccess();
  const role = roleKeyFromName(access?.profile?.role_name, access?.isAdmin);
  return {
    loading: isLoading,
    allowed: can(pageKey, "view_list") && pageMatchesRole(pageKey, role),
    access,
  };
}
