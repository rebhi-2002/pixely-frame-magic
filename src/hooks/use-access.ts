import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getMyAccess } from "@/lib/rbac.functions";
import { buildFullAdminAccess, emptyAccess } from "@/lib/rbac-client";
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

      // نوع مستخدم حقيقي تاني (أو تعذّر تحديده) — لسا ما فيه عقد أدوار
      // حقيقي غير الأدمن، فما منخترع صلاحيات. راجع الـ TODO بـ rbac-client.ts.
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
