import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getMyAccess } from "@/lib/rbac.functions";
import { buildFullAdminAccess, buildRoleAccess, emptyAccess } from "@/lib/rbac-client";
import { roleKeyFromName } from "@/lib/bi";
import {
  getStoredProfile,
  getStoredUserId,
  isDemoSession,
  isRealAdmin,
} from "@/integrations/backend/auth";
import type { MyAccess } from "@/lib/rbac-types";

export const ACCESS_QUERY_KEY = ["my-access"] as const;

export function useAccess() {
  const fetchAccess = useServerFn(getMyAccess);

  const query = useQuery<MyAccess>({
    queryKey: ACCESS_QUERY_KEY,
    queryFn: async () => {
      // جلسة demo (تطوير محلي فقط): متل ما كانت — عبر server function.
      if (isDemoSession()) return fetchAccess();

      // جلسة حقيقية من الباك اند: getMyAccess (server function) ما بتقدر
      // تتحقق من كوكي الباك اند (دومين منفصل) — راجع rbac-client.ts.
      // نبني الصلاحيات محليًا بالمتصفح بدل ما نعتمد على نداء سيرفري
      // بيفشل دايمًا بره وضع dev.
      const userId = getStoredUserId();
      if (!userId) return emptyAccess("");

      if (isRealAdmin()) {
        const profile = getStoredProfile();
        return buildFullAdminAccess(userId, {
          name: profile?.name ?? "",
          email: profile?.email ?? "",
          avatar: profile?.avatar ?? null,
        });
      }

      const profile = getStoredProfile();
      // roleId معروف فعليًا (جاي من fetchUserType بـauth.ts) — منطي وصول
      // لمساحة هالدور فقط، بغض النظر شو نوعه (طالب/معلم/ولي أمر...).
      if (profile?.roleId != null && typeof profile.roleId === "number") {
        const roleKey = roleKeyFromName(profile.roleName, false);
        return buildRoleAccess(
          userId,
          { name: profile.name, email: profile.email, avatar: profile.avatar ?? null },
          profile.roleId,
          profile.roleName ?? "",
          roleKey,
        );
      }

      // تعذّر تحديد الدور فعليًا (roleId=null) — ما منخترع صلاحيات، برجع
      // access فاضي. راجع تحذير login.tsx/signup.tsx للمستخدم بهالحالة.
      return emptyAccess(userId);
    },
    staleTime: 30_000,
  });

  const access = query.data;

  const can = (pageKey: string, permission: string) =>
    Boolean(access?.permissions[pageKey]?.includes(permission));

  return { ...query, access, can };
}

export function useInvalidateAccess() {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: ACCESS_QUERY_KEY });
}
