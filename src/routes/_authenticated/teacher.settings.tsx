import { createFileRoute } from "@tanstack/react-router";
import {
  AppPage,
  StatGrid,
  Panel,
  RowList,
  Progress,
  DataTable,
  QuickLinks,
  Badge,
  EmptyState,
} from "@/components/app/kit";
import { Guard } from "@/components/app/guard";
import { useBi } from "@/lib/bi";

const title = "إعدادات المعلم | أكاديميا";
const description = "التسعير، أوقات التوفّر، بيانات الدفع، وتفضيلات الإشعارات.";

export const Route = createFileRoute("/_authenticated/teacher/settings")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: PageRoute,
});

function PageRoute() {
  return (
    <Guard pageKey="teacher_settings">
      <Body />
    </Guard>
  );
}

function Body() {
  const bi = useBi();
  return (
    <AppPage
      title={bi("إعدادات المعلم", "Teacher settings")}
      icon="Settings"
      subtitle={bi(
        "التسعير، أوقات التوفّر، بيانات الدفع، وتفضيلات الإشعارات.",
        "Pricing, availability, payout details and notification preferences.",
      )}
    >
      <StatGrid
        items={[
          { icon: "BadgePercent", label: bi("نموذج التسعير", "Pricing model"), value: bi("لكل كورس", "Per course") },
          { icon: "CalendarClock", label: bi("أوقات التوفّر", "Availability"), value: "5 فترات" },
          { icon: "Banknote", label: bi("طريقة السحب", "Payout method"), value: bi("حوالة بنكية", "Bank transfer") },
          { icon: "BellRing", label: bi("الإشعارات", "Notifications"), value: bi("مفعّلة", "On") },
        ]}
      />
      <Panel title={bi("الإعدادات", "Settings")} icon="Settings">
        <RowList
          rows={[
            {
              title: bi("سعر الحصة الخاصة", "Private session price"),
              meta: bi("20 ₪ / ساعة", "20 ILS / hour"),
              value: bi("تعديل", "Edit"),
              tone: "primary",
            },
            {
              title: bi("أوقات التوفّر", "Availability"),
              meta: bi("أحد-خميس 17:00-21:00", "Sun-Thu 17:00-21:00"),
              value: bi("تعديل", "Edit"),
              tone: "primary",
            },
            {
              title: bi("بيانات الحوالة", "Bank details"),
              meta: bi("محفوظة ومشفّرة", "Stored encrypted"),
              value: bi("تعديل", "Edit"),
              tone: "primary",
            },
            {
              title: bi("إشعار سؤال جديد", "New question alert"),
              meta: bi("فوري", "Instant"),
              value: bi("مفعّل", "On"),
              tone: "success",
            },
          ]}
        />
      </Panel>
      <Panel title={bi("روابط سريعة", "Quick links")} icon="Settings">
        <QuickLinks
          items={[
            {
              to: "/teacher/profile/edit",
              label: bi("ملفي العام", "Public profile"),
              icon: "UserCog",
            },
            { to: "/teacher/earnings", label: bi("الأرباح", "Earnings"), icon: "Wallet" },
            { to: "/settings", label: bi("اللغة والثيم", "Language & theme"), icon: "Palette" },
          ]}
        />
      </Panel>
    </AppPage>
  );
}
