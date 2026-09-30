import { useQuery, useQueryClient } from "@tanstack/react-query";
import { buildFullAdminAccess, buildRoleAccess, emptyAccess } from "@/lib/rbac-client";
import { resolveRoleKey } from "@/lib/bi";
import { getStoredProfile, getStoredUserId, isRealAdmin } from "@/integrations/backend/auth";
import type { MyAccess } from "@/lib/rbac-types";

export const ACCESS_QUERY_KEY = ["my-access"] as const;

export function useAccess() {
  const query = useQuery<MyAccess>({
    queryKey: ACCESS_QUERY_KEY,
    queryFn: async () => {
      // الصلاحيات تُبنى محليًا بالمتصفح من نوع المستخدم الحقيقي (roleId جاي من
      // fetchUserType بـauth.ts) — راجع rbac-client.ts لتفاصيل بنية الشجرة.
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
      if (profile?.roleKey || (profile?.roleId != null && typeof profile.roleId === "number")) {
        const roleKey = resolveRoleKey(profile);
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
