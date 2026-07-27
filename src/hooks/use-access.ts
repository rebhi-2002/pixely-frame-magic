import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getMyAccess } from "@/lib/rbac.functions";
import type { MyAccess } from "@/lib/rbac-types";

export const ACCESS_QUERY_KEY = ["my-access"] as const;

export function useAccess() {
  const fetchAccess = useServerFn(getMyAccess);
  const query = useQuery<MyAccess>({
    queryKey: ACCESS_QUERY_KEY,
    queryFn: () => fetchAccess(),
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
