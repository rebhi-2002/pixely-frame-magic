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

const title = "إعدادات ولي الأمر | أكاديميا";
const description = "الأبناء المرتبطون بحسابك، فك الربط، وتفضيلات الإشعارات والتقارير.";

export const Route = createFileRoute("/_authenticated/parent/settings")({
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
    <Guard pageKey="parent_settings">
      <Body />
    </Guard>
  );
}

function Body() {
  const bi = useBi();
  return (
    <AppPage
      title={bi("إعدادات ولي الأمر", "Parent settings")}
      icon="Settings"
      subtitle={bi(
        "الأبناء المرتبطون بحسابك، فك الربط، وتفضيلات الإشعارات والتقارير.",
        "Linked children, unlinking, and notification/report preferences.",
      )}
    >
      <StatGrid
        items={[
          { icon: "Users", label: bi("أبناء مرتبطون", "Linked children"), value: "2" },
          { icon: "Mail", label: bi("تقرير أسبوعي", "Weekly report"), value: bi("مفعّل", "On") },
          { icon: "BellRing", label: bi("تنبيهات فورية", "Instant alerts"), value: bi("مفعّلة", "On") },
          { icon: "ShieldCheck", label: bi("حالة الحساب", "Account status"), value: bi("موثّق", "Verified") },
        ]}
      />
      <Panel title={bi("الأبناء المرتبطون", "Linked children")} icon="Users">
        <RowList
          rows={[
            {
              title: bi("أحمد — الصف الحادي عشر", "Ahmad — grade 11"),
              meta: bi("ارتبط 2026/03/02", "Linked 2026/03/02"),
              value: bi("فك الربط", "Unlink"),
              tone: "danger",
            },
            {
              title: bi("سارة — الصف التاسع", "Sara — grade 9"),
              meta: bi("ارتبط 2026/04/18", "Linked 2026/04/18"),
              value: bi("فك الربط", "Unlink"),
              tone: "danger",
            },
          ]}
        />
      </Panel>
      <Panel title={bi("الإشعارات", "Notifications")} icon="BellRing">
        <RowList
          rows={[
            {
              title: bi("تقرير أسبوعي بالإيميل", "Weekly email report"),
              meta: bi("كل أحد 8:00", "Every Sunday 8:00"),
              value: bi("مفعّل", "On"),
              tone: "success",
            },
            {
              title: bi("تنبيه تراجع الإتقان", "Mastery drop alert"),
              meta: bi("فوري", "Instant"),
              value: bi("مفعّل", "On"),
              tone: "success",
            },
            {
              title: bi("رسائل المعلمين", "Teacher messages"),
              meta: bi("ملخّص يومي", "Daily digest"),
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
