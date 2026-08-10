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

const title = "شهاداتي | أكاديميا";
const description = "شهاداتك القابلة للتحقّق — شارك الرابط، وأي شخص يتأكد من صحّتها.";

export const Route = createFileRoute("/_authenticated/my-certificates")({
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
    <Guard pageKey="student_certificates">
      <Body />
    </Guard>
  );
}

function Body() {
  const bi = useBi();
  return (
    <AppPage
      title={bi("شهاداتي", "My certificates")}
      icon="Award"
      subtitle={bi(
        "شهاداتك القابلة للتحقّق — شارك الرابط، وأي شخص يتأكد من صحّتها.",
        "Your verifiable certificates — share the link and anyone can validate it.",
      )}
    >
      <StatGrid
        items={[
          { icon: "Award", label: bi("شهادات", "Certificates"), value: "2" },
          { icon: "ShieldCheck", label: bi("قابلة للتحقّق", "Verifiable"), value: "2" },
          { icon: "Share2", label: bi("مشاركات", "Shares"), value: "5" },
          { icon: "Clock", label: bi("قيد الإصدار", "Pending"), value: "1" },
        ]}
      />
      <Panel title={bi("شهاداتك", "Your certificates")} icon="Award">
        <RowList
          to="/certificate/ACD-2026-0142"
          rows={[
            {
              title: bi("مهارات المراجعة الذكية", "Smart revision skills"),
              meta: bi("ACD-2026-0142", "ACD-2026-0142"),
              value: bi("تحقّق", "Verify"),
              tone: "success",
            },
            {
              title: bi("أساسيات الكيمياء", "Chemistry basics"),
              meta: bi("ACD-2026-0091", "ACD-2026-0091"),
              value: bi("تحقّق", "Verify"),
              tone: "success",
            },
          ]}
        />
      </Panel>
    </AppPage>
  );
}
