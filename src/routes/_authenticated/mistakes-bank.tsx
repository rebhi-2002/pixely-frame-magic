import { createFileRoute } from "@tanstack/react-router";
import { AppPage, StatGrid, Panel, RowList, Progress, DataTable, QuickLinks, Badge, EmptyState } from "@/components/app/kit";
import { Guard } from "@/components/app/guard";
import { useBi } from "@/lib/bi";

const title = "بنك الأخطاء | أكاديميا";
const description = "كل سؤال أخطأت فيه يُحفظ هنا تلقائياً، ويُعاد عليك حتى تُتقنه.";

export const Route = createFileRoute("/_authenticated/mistakes-bank")({
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
    <Guard pageKey="student_mistakes">
      <Body />
    </Guard>
  );
}

function Body() {
  const bi = useBi();
  return (
    <AppPage
      title={bi("بنك الأخطاء", "Mistakes bank")}
      icon="XCircle"
      subtitle={bi("كل سؤال أخطأت فيه يُحفظ هنا تلقائياً، ويُعاد عليك حتى تُتقنه.", "Every question you got wrong is saved here and repeated until you master it.")}
    >
      <StatGrid
        items={[
          {{ icon: "XCircle", label: bi("أخطاء مفتوحة", "Open mistakes"), value: "23" }},
          {{ icon: "RefreshCw", label: bi("قيد التكرار", "In rotation"), value: "9" }},
          {{ icon: "CheckCircle2", label: bi("أُتقنت", "Mastered"), value: "57" }},
          {{ icon: "TrendingDown", label: bi("تراجع الأخطاء", "Mistakes trend"), value: "-32%" }},
        ]}
      />
      <Panel title={bi("الأكثر تكراراً", "Most repeated")} icon="XCircle">
        <RowList
          rows={[
            {{ title: bi("قوانين نيوتن — الاحتكاك", "Newton's laws — friction"), meta: bi("الفيزياء · أخطأت 4 مرات", "Physics · wrong 4 times"), value: bi("أولوية", "Priority"), tone: "danger" }},
            {{ title: bi("المعادلات التربيعية", "Quadratic equations"), meta: bi("الرياضيات · أخطأت 3 مرات", "Math · wrong 3 times"), value: bi("أولوية", "Priority"), tone: "danger" }},
            {{ title: bi("التفاعلات الطاردة", "Exothermic reactions"), meta: bi("الكيمياء · أخطأت مرتين", "Chemistry · wrong twice"), value: bi("مراجعة", "Review"), tone: "primary" }},
          ]}
        />
      </Panel>
      <Panel title={bi("توزيع الأخطاء بالمواد", "Mistakes by subject")} icon="PieChart">
        <Progress label={bi("الفيزياء", "Physics")} value={44} />
        <Progress label={bi("الرياضيات", "Math")} value={31} />
        <Progress label={bi("الكيمياء", "Chemistry")} value={18} />
        <Progress label={bi("اللغة العربية", "Arabic")} value={7} />
      </Panel>
    </AppPage>
  );
}
