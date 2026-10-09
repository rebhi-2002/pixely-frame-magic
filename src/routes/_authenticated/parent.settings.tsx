import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AppPage, StatGrid, Panel, RowList, QuickLinks, EmptyState } from "@/components/app/kit";
import { Guard } from "@/components/app/guard";
import { getMyChildren } from "@/integrations/backend/parent";
import { useBi } from "@/lib/bi";
import { authPageHead } from "@/lib/seo";
import { qk } from "@/lib/query-keys";
import { parseUnreadCount } from "@/lib/parent-report";
import { ErrorState, LoadingState, RetryButton } from "@/components/app/feedback-states";

const description = "الأبناء المرتبطون بحسابك — القراءة فقط حالياً.";

export const Route = createFileRoute("/_authenticated/parent/settings")({
  head: () =>
    authPageHead(
      { title: "إعدادات ولي الأمر | أكاديميا", description },
      {
        title: "Parent settings | Academia",
        description: "Children linked to your account — read-only for now.",
      },
    ),
  component: PageRoute,
});

function PageRoute() {
  return (
    <Guard pageKey="parent_settings">
      <Body />
    </Guard>
  );
}

function Body() {
  const bi = useBi();
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: qk.parentChildren(),
    queryFn: getMyChildren,
  });
  const children = data ?? [];

  if (isError) {
    return (
      <AppPage title={bi("إعدادات ولي الأمر", "Parent settings")} icon="Settings">
        <ErrorState
          title={bi("تعذّر تحميل الصفحة", "We couldn't load the page")}
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
      <AppPage title={bi("إعدادات ولي الأمر", "Parent settings")} icon="Settings">
        <LoadingState
          label={bi("جارٍ التحميل…", "Loading…")}
          className="border-none bg-transparent"
        />
      </AppPage>
    );
  }

  return (
    <AppPage
      title={bi("إعدادات ولي الأمر", "Parent settings")}
      icon="Settings"
      subtitle={bi(description, description)}
    >
      <StatGrid
        items={[
          {
            icon: "Users",
            label: bi("أبناء مرتبطون", "Linked children"),
            value: String(children.length),
          },
        ]}
      />

      <Panel title={bi("الأبناء المرتبطون", "Linked children")} icon="Users">
        {children.length ? (
          <RowList
            rows={children.map((c) => {
              // P1-06 (Q-11): العدد من بيانات كل ابن؛ ما بنعرض شي لو ناقص.
              const unread = parseUnreadCount(c.unreadNotificationsCount);
              return {
                title: c.studentName,
                meta: c.gradeName ?? "",
                value:
                  unread === null ? undefined : bi(`${unread} إشعار غير مقروء`, `${unread} unread`),
                tone: "primary" as const,
              };
            })}
          />
        ) : (
          <EmptyState
            icon="Users"
            title={bi("ولا ابن مرتبط بعد", "No linked children yet")}
            description={bi(
              "ربط/فك ربط ابن من هالصفحة مش متاح حالياً — الباك اند ما عنده endpoint لهيك (لا Link ولا Unlink). ربط الابن حالياً بيصير من طرف الأدمن مباشرة.",
              "Linking/unlinking a child from here isn't available yet — the backend has no endpoint for it (no Link, no Unlink). Linking a child currently has to be done by an admin directly.",
            )}
          />
        )}
      </Panel>

      <Panel title={bi("الإشعارات والتقارير", "Notifications & reports")} icon="BellRing">
        <EmptyState
          icon="BellRing"
          text={bi(
            "تفضيلات التقرير الأسبوعي والتنبيهات الفورية غير متاحة بعد — لا يوجد لها endpoint بالباك اند حتى الآن.",
            "Weekly report and instant alert preferences aren't available yet — there's no backend endpoint for them.",
          )}
        />
      </Panel>

      <Panel title={bi("روابط سريعة", "Quick links")} icon="Settings">
        <QuickLinks
          items={[
            {
              to: "/parent/report",
              label: bi("تقرير الابن", "Child report"),
              icon: "FileBarChart",
            },
            { to: "/notifications", label: bi("الإشعارات", "Notifications"), icon: "Bell" },
            { to: "/settings", label: bi("اللغة والثيم", "Language & theme"), icon: "Palette" },
          ]}
        />
      </Panel>
    </AppPage>
  );
}
