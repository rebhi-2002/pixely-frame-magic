import { useCallback, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { logout } from "@/integrations/backend/auth";
import { trackEvent } from "@/lib/analytics";

/**
 * خروج موحّد مع تغذية بصرية: إلغاء الاستعلامات ← تفريغ الكاش ← إنهاء الجلسة ←
 * تنقّل. `pending` يُستخدم لعرض <SignOutOverlay /> أثناء العملية.
 */
export function useSignOut(to = "/") {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [pending, setPending] = useState(false);

  const signOut = useCallback(async () => {
    if (pending) return;
    setPending(true);
    try {
      await queryClient.cancelQueries();
      queryClient.clear();
      await logout();
      trackEvent("logout");
      navigate({ to, replace: true });
    } finally {
      // نُبقي الطبقة ظاهرة لحظة قصيرة حتى يكتمل التنقّل بسلاسة
      window.setTimeout(() => setPending(false), 400);
    }
  }, [navigate, pending, queryClient, to]);

  return { signOut, pending };
}
