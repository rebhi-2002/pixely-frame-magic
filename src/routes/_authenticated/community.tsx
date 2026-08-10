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

const title = "مجتمع المواد | أكاديميا";
const description = "اسأل في مجتمع المادة، وجاوب زملاءك — إجابات المعلم تُميّز تلقائياً.";

export const Route = createFileRoute("/_authenticated/community")({
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
    <Guard pageKey="student_community">
      <Body />
    </Guard>
  );
}

function Body() {
  const bi = useBi();
  return (
    <AppPage
      title={bi("مجتمع المواد", "Subject community")}
      icon="MessagesSquare"
      subtitle={bi(
        "اسأل في مجتمع المادة، وجاوب زملاءك — إجابات المعلم تُميّز تلقائياً.",
        "Ask in your subject community and answer classmates — teacher answers are highlighted.",
      )}
    >
      <StatGrid
        items={[
          {
            icon: "MessagesSquare",
            label: bi("أسئلة هذا الأسبوع", "Questions this week"),
            value: "48",
          },
          { icon: "CheckCheck", label: bi("إجابات معتمدة", "Verified answers"), value: "31" },
          { icon: "Users", label: bi("أعضاء مادّتك", "Members"), value: "312" },
          { icon: "Star", label: bi("سمعتك", "Your reputation"), value: "150" },
        ]}
      />
      <Panel title={bi("أحدث الأسئلة", "Latest questions")} icon="MessagesSquare">
        <RowList
          rows={[
            {
              title: bi("كيف نحلّ تكامل بالتجزيء؟", "How to solve integration by parts?"),
              meta: bi("رياضيات · 6 إجابات", "Math · 6 answers"),
              value: bi("إجابة معلم", "Teacher answer"),
              tone: "success",
            },
            {
              title: bi("فرق الجهد في التوالي والتوازي", "Voltage in series vs parallel"),
              meta: bi("فيزياء · 3 إجابات", "Physics · 3 answers"),
              value: bi("مفتوح", "Open"),
              tone: "primary",
            },
            {
              title: bi("مراجعة قواعد الهمزة", "Hamza rules review"),
              meta: bi("عربي · 9 إجابات", "Arabic · 9 answers"),
              value: bi("مُغلق", "Closed"),
              tone: "muted",
            },
          ]}
        />
      </Panel>
    </AppPage>
  );
}
