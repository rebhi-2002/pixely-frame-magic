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

const title = "الأرباح | أكاديميا";
const description = "أرباحك، عمولة المنصة، وطلبات السحب — كل شي واضح بلا مفاجآت.";

export const Route = createFileRoute("/_authenticated/teacher/earnings")({
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
    <Guard pageKey="teacher_earnings">
      <Body />
    </Guard>
  );
}

function Body() {
  const bi = useBi();
  return (
    <AppPage
      title={bi("الأرباح", "Earnings")}
      icon="Wallet"
      subtitle={bi(
        "أرباحك، عمولة المنصة، وطلبات السحب — كل شي واضح بلا مفاجآت.",
        "Your earnings, platform fee and payout requests — all transparent.",
      )}
    >
      <StatGrid
        items={[
          { icon: "Wallet", label: bi("الرصيد المتاح", "Available"), value: "620 د.أ" },
          { icon: "Hourglass", label: bi("قيد التسوية", "Pending"), value: "200 د.أ" },
          { icon: "BadgePercent", label: bi("عمولة المنصة", "Platform fee"), value: "15%" },
          { icon: "Banknote", label: bi("إجمالي مسحوب", "Total paid out"), value: "3,450 د.أ" },
        ]}
      />
      <Panel title={bi("آخر الحركات", "Recent transactions")} icon="Receipt">
        <DataTable
          head={[
            bi("التاريخ", "Date"),
            bi("الوصف", "Description"),
            bi("المبلغ", "Amount"),
            bi("الحالة", "Status"),
          ]}
          rows={[
            [
              bi("2026/07/30", "2026/07/30"),
              bi("اشتراك كورس تفاضل", "Calculus enrollment"),
              bi("+45 د.أ", "+45 JOD"),
              <Badge tone="success">{bi("مؤكد", "Cleared")}</Badge>,
            ],
            [
              bi("2026/07/28", "2026/07/28"),
              bi("طلب سحب", "Payout request"),
              bi("-500 د.أ", "-500 JOD"),
              <Badge tone="primary">{bi("قيد التنفيذ", "Processing")}</Badge>,
            ],
            [
              bi("2026/07/25", "2026/07/25"),
              bi("اشتراك مراجعة", "Review enrollment"),
              bi("+15 د.أ", "+15 JOD"),
              <Badge tone="success">{bi("مؤكد", "Cleared")}</Badge>,
            ],
          ]}
        />
      </Panel>
    </AppPage>
  );
}
