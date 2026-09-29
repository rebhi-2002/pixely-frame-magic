import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AppPage, StatGrid, Panel, EmptyState, QuickLinks } from "@/components/app/kit";
import { Guard } from "@/components/app/guard";
import { WelcomeBanner } from "@/components/app/welcome-banner";
import { getMyWallet } from "@/integrations/backend/wallet";
import { useBi } from "@/lib/bi";
import { authPageHead } from "@/lib/seo";
import { ErrorState, LoadingState, RetryButton } from "@/components/app/feedback-states";

const description = "رصيد محفظتك، ووصلات سريعة لملفك وجدولك.";

export const Route = createFileRoute("/_authenticated/teacher/dashboard")({
  head: () =>
    authPageHead(
      { title: "لوحة المعلم | أكاديميا", description },
      {
        title: "Teacher dashboard | Academia",
        description: "Your wallet balance, and quick links to your profile and schedule.",
      },
    ),
  component: () => (
    <Guard pageKey="teacher_dashboard">
      <Body />
    </Guard>
  ),
});

function Body() {
  const bi = useBi();
  const queryClient = useQueryClient();

  const wallet = useQuery({ queryKey: ["teacher-wallet"], queryFn: getMyWallet });

  if (wallet.isError) {
    return (
      <AppPage title={bi("لوحة المعلم", "Teacher dashboard")} icon="LayoutDashboard">
        <ErrorState
          title={bi("ما قدرنا نحمّل اللوحة", "We couldn't load the dashboard")}
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

  if (wallet.isLoading) {
    return (
      <AppPage title={bi("لوحة المعلم", "Teacher dashboard")} icon="LayoutDashboard">
        <LoadingState
          label={bi("جارٍ التحميل…", "Loading…")}
          className="border-none bg-transparent"
        />
      </AppPage>
    );
  }

  return (
    <AppPage
      title={bi("لوحة المعلم", "Teacher dashboard")}
      icon="LayoutDashboard"
      subtitle={bi(description, description)}
    >
      <WelcomeBanner subtitle={[bi("أهلاً بك 👋", "Welcome 👋")]} />

      <StatGrid
        items={[
          {
            icon: "Wallet",
            label: bi("رصيد المحفظة", "Wallet balance"),
            value: `${wallet.data?.balance ?? 0} ₪`,
          },
        ]}
      />

      <Panel title={bi("طلبات الحجز", "Booking requests")} icon="Clock">
        <EmptyState
          icon="ShieldAlert"
          text={bi(
            "عرض طلبات الحجز هون معطّل مؤقتاً بقصد — الباك اند لسا ما فيه تحقق صلاحيات على Booking/Teacher (P0-1) وربط المعلم بحسابه (P1-1)، فعرضها الآن خطر أمني حقيقي مش نقص تقني بسيط. رح تُفعّل فور ما ينحلّوا.",
            "Booking requests are intentionally hidden here for now — the backend still has no auth checks on Booking/Teacher (P0-1) and no teacher-to-account link (P1-1), so showing this now is a real security risk, not a small gap. It'll switch on the moment those are fixed.",
          )}
        />
      </Panel>

      <QuickLinks
        items={[
          {
            icon: "UserCog",
            label: bi("تعديل ملفي", "Edit my profile"),
            to: "/teacher/profile/edit",
          },
          {
            icon: "CalendarClock",
            label: bi("جدول توفّري", "My availability"),
            to: "/teacher/settings",
          },
          { icon: "Wallet", label: bi("الأرباح", "Earnings"), to: "/teacher/earnings" },
        ]}
      />
    </AppPage>
  );
}
