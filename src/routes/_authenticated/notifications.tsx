import { createFileRoute } from "@tanstack/react-router";
import { AppPage, Badge, Panel, RowList } from "@/components/app/kit";
import { Guard } from "@/components/app/guard";
import { useBi } from "@/lib/bi";

export const Route = createFileRoute("/_authenticated/notifications")({
  head: () => ({ meta: [{ title: "الإشعارات | Academia" }, { name: "description", content: "إشعارات الحساب والمهام التعليمية." }, { property: "og:title", content: "الإشعارات | Academia" }, { property: "og:description", content: "إشعارات الحساب والمهام التعليمية." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }, { name: "robots", content: "noindex" }] }),
  component: NotificationsPage,
});

function NotificationsPage() {
  const bi = useBi();
  return (
    <Guard pageKey="notifications">
      <AppPage title={bi("الإشعارات", "Notifications")} icon="Bell" subtitle={bi("تنبيهات الدراسة والحساب والمراجعات في مكان واحد.", "Study, account, and review alerts in one place.")}>
        <Panel title={bi("اليوم", "Today")} icon="Bell" action={<Badge tone="primary">3</Badge>}>
          <RowList rows={[
            { title: bi("تم نشر نتيجة اختبار الفيزياء", "Physics quiz result is available"), meta: bi("منذ 12 دقيقة", "12 minutes ago"), value: bi("جديد", "New"), tone: "primary" },
            { title: bi("موعد مراجعة الرياضيات غداً", "Math review is tomorrow"), meta: bi("منذ ساعة", "1 hour ago"), value: bi("تذكير", "Reminder"), tone: "success" },
            { title: bi("تم تحديث إعدادات الأمان", "Security settings were updated"), meta: bi("منذ 3 ساعات", "3 hours ago") },
          ]} />
        </Panel>
        <Panel title={bi("سابقاً", "Earlier")} icon="History">
          <RowList rows={[
            { title: bi("أضيف درس جديد إلى مكتبتك", "A new lesson was added to your library"), meta: bi("أمس", "Yesterday") },
            { title: bi("اكتملت سلسلة إنجاز 12 يوماً", "Your 12-day achievement streak is complete"), meta: bi("منذ يومين", "2 days ago"), value: bi("إنجاز", "Achievement"), tone: "success" },
          ]} />
        </Panel>
      </AppPage>
    </Guard>
  );
}