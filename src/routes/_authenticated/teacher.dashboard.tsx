import { Link, createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AppPage, StatGrid, Panel, QuickLinks } from "@/components/app/kit";
import { Guard } from "@/components/app/guard";
import { Button } from "@/components/ui/button";
import { listTeacherBookings } from "@/integrations/backend/bookings";
import { BookingStatus } from "@/lib/enums";
import { qk } from "@/lib/query-keys";
import { WelcomeBanner } from "@/components/app/welcome-banner";
import { getMyWallet } from "@/integrations/backend/wallet";
import { useBi } from "@/lib/bi";
import { withLoadErrorDetail } from "@/lib/load-error";
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
  // T5-05: عدد الطلبات المعلّقة = طول القائمة المفلترة بالحالة 1 (Pending) — لا نقرأ أي حقل من الصفوف.
  const pending = useQuery({
    queryKey: qk.teacherBookings(BookingStatus.Pending),
    queryFn: () => listTeacherBookings(BookingStatus.Pending),
  });

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
      <WelcomeBanner subtitle={["أهلاً بك 👋", "Welcome 👋"]} />

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
        {pending.isError ? (
          // فشل هذا الجزء ما بيكسر اللوحة — بنعرض رسالة محلية وإعادة محاولة، وبلا رقم.
          <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
            <span>
              {withLoadErrorDetail(
                bi("تعذّر تحميل عدد الطلبات المعلّقة.", "Couldn't load the pending requests count."),
                pending.error,
                bi,
              )}
            </span>
            <RetryButton
              label={bi("إعادة المحاولة", "Try again")}
              onClick={() => void pending.refetch()}
            />
          </div>
        ) : pending.isLoading ? (
          <LoadingState
            label={bi("جارٍ التحميل…", "Loading…")}
            className="border-none bg-transparent"
          />
        ) : (
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-foreground">
              {pending.data && pending.data.length > 0
                ? bi(
                    `لديك ${pending.data.length} طلب حجز بانتظار ردّك.`,
                    `You have ${pending.data.length} booking request(s) awaiting your response.`,
                  )
                : bi("لا توجد طلبات حجز معلّقة حالياً.", "No pending booking requests right now.")}
            </p>
            <Button asChild size="sm">
              <Link to="/teacher/bookings">{bi("عرض طلبات الحجز", "View booking requests")}</Link>
            </Button>
          </div>
        )}
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
          { icon: "BookOpen", label: bi("كورساتي", "My courses"), to: "/teacher/courses" },
          {
            icon: "CalendarCheck",
            label: bi("طلبات الحجز", "Booking requests"),
            to: "/teacher/bookings",
          },
          { icon: "Wallet", label: bi("الأرباح", "Earnings"), to: "/teacher/earnings" },
        ]}
      />
    </AppPage>
  );
}
