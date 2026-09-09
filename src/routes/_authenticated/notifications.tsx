import { useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Check, Loader2, Trash2, X } from "lucide-react";
import { AppPage, Badge, Panel, RowList, EmptyState } from "@/components/app/kit";
import { Guard } from "@/components/app/guard";
import { Button } from "@/components/ui/button";
import {
  deleteNotification,
  listNotifications,
  markAllNotificationsRead,
  markNotificationRead,
} from "@/lib/account-pages.functions";
import { useAccess } from "@/hooks/use-access";
import { useBi } from "@/lib/bi";
import { getErrorMessage } from "@/integrations/backend/client";

export const Route = createFileRoute("/_authenticated/notifications")({
  head: () => ({
    meta: [
      { title: "الإشعارات | Academia" },
      { name: "description", content: "إشعارات الحساب والمهام التعليمية." },
      { property: "og:title", content: "الإشعارات | Academia" },
      { property: "og:description", content: "إشعارات الحساب والمهام التعليمية." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
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
  const { can } = useAccess();
  const fetchRows = useServerFn(listNotifications);
  const markOne = useServerFn(markNotificationRead);
  const markAll = useServerFn(markAllNotificationsRead);
  const remove = useServerFn(deleteNotification);

  const { data: rows, isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => fetchRows(),
  });
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["notifications"] });

  const list = rows ?? [];
  const today = useMemo(() => list.filter((r) => r.category === "اليوم"), [list]);
  const earlier = useMemo(() => list.filter((r) => r.category === "سابقاً"), [list]);
  const newCount = list.filter((r) => r.isNew).length;

  const markOneMutation = useMutation({
    mutationFn: (id: string) => markOne({ data: { id } }),
    onSuccess: invalidate,
    onError: (e) => toast.error(getErrorMessage(e, bi("تعذّر التحديث", "Failed to update"))),
  });

  const markAllMutation = useMutation({
    mutationFn: () => markAll(),
    onSuccess: () => {
      invalidate();
      toast.success(bi("تم تعليم الكل كمقروء", "All marked as read"));
    },
    onError: (e) => toast.error(getErrorMessage(e, bi("تعذّر التحديث", "Failed to update"))),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => remove({ data: { id } }),
    onSuccess: invalidate,
    onError: (e) => toast.error(getErrorMessage(e, bi("تعذّر الحذف", "Failed to delete"))),
  });

  return (
    <AppPage
      title={bi("الإشعارات", "Notifications")}
      icon="Bell"
      subtitle={bi(
        "تنبيهات الدراسة والحساب والمراجعات في مكان واحد.",
        "Study, account, and review alerts in one place.",
      )}
    >
      {isLoading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="size-6 animate-spin text-primary" />
        </div>
      ) : (
        <>
          <Panel
            title={bi("اليوم", "Today")}
            icon="Bell"
            action={
              <div className="flex items-center gap-2">
                <Badge tone="primary">{newCount}</Badge>
                {can("notifications", "edit") && newCount > 0 && (
                  <Button size="sm" variant="outline" onClick={() => markAllMutation.mutate()}>
                    <Check className="size-4" />
                    {bi("تعليم الكل كمقروء", "Mark all read")}
                  </Button>
                )}
              </div>
            }
          >
            {today.length ? (
              <RowList
                rows={today.map((n) => ({
                  title: n.title,
                  meta: n.meta,
                  value: n.isNew ? bi("جديد", "New") : undefined,
                  tone: n.tone,
                  actions: (
                    <div className="flex items-center gap-1">
                      {can("notifications", "edit") && n.isNew && (
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => markOneMutation.mutate(n.id)}
                        >
                          <Check className="size-4" />
                        </Button>
                      )}
                      {can("notifications", "delete") && (
                        <Button
                          size="icon"
                          variant="ghost"
                          className="text-destructive"
                          onClick={() => deleteMutation.mutate(n.id)}
                        >
                          <X className="size-4" />
                        </Button>
                      )}
                    </div>
                  ),
                }))}
              />
            ) : (
              <EmptyState icon="Bell" text={bi("لا إشعارات اليوم.", "No notifications today.")} />
            )}
          </Panel>

          <Panel title={bi("سابقاً", "Earlier")} icon="History">
            {earlier.length ? (
              <RowList
                rows={earlier.map((n) => ({
                  title: n.title,
                  meta: n.meta,
                  value: n.tone === "success" ? bi("إنجاز", "Achievement") : undefined,
                  tone: n.tone,
                  actions: can("notifications", "delete") ? (
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-destructive"
                      onClick={() => deleteMutation.mutate(n.id)}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  ) : undefined,
                }))}
              />
            ) : (
              <EmptyState
                icon="History"
                text={bi("لا إشعارات سابقة.", "No earlier notifications.")}
              />
            )}
          </Panel>
        </>
      )}
    </AppPage>
  );
}
