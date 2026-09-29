import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Check } from "lucide-react";
import { AppPage, Badge, Panel, RowList, EmptyState } from "@/components/app/kit";
import { Guard } from "@/components/app/guard";
import { Button } from "@/components/ui/button";
import {
  getStudentNotifications,
  markStudentNotificationRead,
} from "@/integrations/backend/student";
import { useSession } from "@/hooks/use-session";
import { useBi } from "@/lib/bi";
import { getErrorMessage } from "@/integrations/backend/client";
import { authPageHead } from "@/lib/seo";
import { ErrorState, LoadingState, RetryButton } from "@/components/app/feedback-states";

export const Route = createFileRoute("/_authenticated/notifications")({
  head: () =>
    authPageHead(
      { title: "الإشعارات | Academia", description: "إشعاراتك على المنصة." },
      { title: "Notifications | Academia", description: "Your platform notifications." },
    ),
  component: NotificationsPage,
});

function NotificationsPage() {
  return (
    <Guard pageKey="notifications">
      <Body />
    </Guard>
  );
}

function Body() {
  const bi = useBi();
  const queryClient = useQueryClient();
  const { session } = useSession();

  // ⚠️ الباك اند الحقيقي عنده endpoint إشعارات للطالب فقط (/api/Student/Notifications)
  // حالياً. للأدوار التانية (معلم/ولي أمر/أدمن) ما في endpoint إشعارات بعد.
  const isStudent = session?.roleKey === "student";

  const { data, isLoading, isError } = useQuery({
    queryKey: ["student-notifications"],
    queryFn: () => getStudentNotifications({ pageSize: 50 }),
    enabled: isStudent,
  });

  const markReadMutation = useMutation({
    mutationFn: (id: number) => markStudentNotificationRead(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["student-notifications"] }),
    onError: (e) => toast.error(getErrorMessage(e, bi("تعذّر التحديث", "Failed to update"))),
  });

  if (!isStudent) {
    return (
      <AppPage title={bi("الإشعارات", "Notifications")} icon="Bell">
        <EmptyState
          icon="Bell"
          title={bi("لسا ما بنيت الإشعارات لدورك", "Notifications aren't built for your role yet")}
          description={bi(
            "الباك اند حالياً بيدعم إشعارات الطالب بس. لما توصل إشعارات المعلم/ولي الأمر/الأدمن، رح تظهر هون تلقائياً.",
            "The backend currently supports student notifications only. Once teacher/parent/admin notifications ship, they'll appear here automatically.",
          )}
        />
      </AppPage>
    );
  }

  if (isError) {
    return (
      <AppPage title={bi("الإشعارات", "Notifications")} icon="Bell">
        <ErrorState
          title={bi("ما قدرنا نحمّل الإشعارات", "We couldn't load your notifications")}
          description={bi(
            "جرّب التحديث مرة ثانية. إذا استمرت المشكلة، تأكد من اتصالك أو ارجع لاحقاً.",
            "Try again. If the problem continues, check your connection or come back later.",
          )}
          action={
            <RetryButton
              label={bi("إعادة المحاولة", "Try again")}
              onClick={() => void queryClient.invalidateQueries()}
            />
          }
        />
      </AppPage>
    );
  }

  if (isLoading) {
    return (
      <AppPage title={bi("الإشعارات", "Notifications")} icon="Bell">
        <LoadingState
          label={bi("جارٍ التحميل…", "Loading…")}
          className="border-none bg-transparent"
        />
      </AppPage>
    );
  }

  const rows = data?.data ?? [];
  const unreadCount = rows.filter((n) => !n.isRead).length;

  return (
    <AppPage
      title={bi("الإشعارات", "Notifications")}
      icon="Bell"
      subtitle={bi("كل إشعاراتك في مكان واحد.", "All your notifications in one place.")}
    >
      <Panel
        title={bi("الإشعارات", "Notifications")}
        icon="Bell"
        action={<Badge tone="primary">{unreadCount}</Badge>}
      >
        {rows.length ? (
          <RowList
            rows={rows.map((n) => ({
              title: n.title,
              meta: bi(
                `${n.message} — ${new Date(n.createdOn).toLocaleDateString()}`,
                `${n.message} — ${new Date(n.createdOn).toLocaleDateString()}`,
              ),
              value: !n.isRead ? bi("جديد", "New") : undefined,
              tone: n.isRead ? "muted" : "primary",
              actions: !n.isRead ? (
                <Button size="icon" variant="ghost" onClick={() => markReadMutation.mutate(n.id)}>
                  <Check className="size-4" />
                </Button>
              ) : undefined,
            }))}
          />
        ) : (
          <EmptyState icon="Bell" text={bi("لا إشعارات حالياً.", "No notifications right now.")} />
        )}
      </Panel>
    </AppPage>
  );
}
