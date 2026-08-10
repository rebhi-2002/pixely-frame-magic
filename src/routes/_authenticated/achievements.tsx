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

const title = "الإنجاز | أكاديميا";
const description = "تقدّمك يُقاس بالإتقان لا بالساعات: شارات، سلاسل أيام، ونسب إتقان لكل مادة.";

export const Route = createFileRoute("/_authenticated/achievements")({
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
    <Guard pageKey="student_achievements">
      <Body />
    </Guard>
  );
}

function Body() {
  const bi = useBi();
  return (
    <AppPage
      title={bi("الإنجاز", "Achievements")}
      icon="Trophy"
      subtitle={bi(
        "تقدّمك يُقاس بالإتقان لا بالساعات: شارات، سلاسل أيام، ونسب إتقان لكل مادة.",
        "Progress measured by mastery, not hours: badges, streaks and per-subject mastery.",
      )}
    >
      <StatGrid
        items={[
          { icon: "Trophy", label: bi("نقاط الإنجاز", "Points"), value: "1,240" },
          { icon: "Medal", label: bi("شارات", "Badges"), value: "9" },
          { icon: "Flame", label: bi("أطول سلسلة", "Longest streak"), value: "21" },
          { icon: "TrendingUp", label: bi("تحسّن الشهر", "Monthly gain"), value: "+18%" },
        ]}
      />
      <Panel title={bi("شاراتك", "Your badges")} icon="Medal">
        <RowList
          rows={[
            {
              title: bi("مُتقن المشتقات", "Derivatives master"),
              meta: bi("رياضيات · وحدة 4", "Math · unit 4"),
              value: bi("مفتوحة", "Unlocked"),
              tone: "success",
            },
            {
              title: bi("21 يوم متتالي", "21-day streak"),
              meta: bi("انتظام", "Consistency"),
              value: bi("مفتوحة", "Unlocked"),
              tone: "success",
            },
            {
              title: bi("صائد الأخطاء", "Mistake hunter"),
              meta: bi("أتقن 50 خطأ", "Master 50 mistakes"),
              value: bi("قريباً", "Almost"),
              tone: "primary",
            },
          ]}
        />
      </Panel>
      <Panel title={bi("إتقان المواد", "Subject mastery")} icon="LineChart">
        <Progress label={bi("الرياضيات", "Math")} value={78} />
        <Progress label={bi("الفيزياء", "Physics")} value={54} />
        <Progress label={bi("الكيمياء", "Chemistry")} value={40} />
        <Progress label={bi("اللغة العربية", "Arabic")} value={91} />
      </Panel>
    </AppPage>
  );
}
