import { createFileRoute } from "@tanstack/react-router";
import { AppPage, StatGrid, Panel, RowList, Progress, DataTable, QuickLinks, Badge, EmptyState } from "@/components/app/kit";
import { Guard } from "@/components/app/guard";
import { useBi } from "@/lib/bi";

const title = "المحفوظات | أكاديميا";
const description = "كل ما حفظته: دروس، أسئلة، ونقاشات — بمكان واحد للرجوع السريع.";

export const Route = createFileRoute("/_authenticated/bookmarks")({
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
    <Guard pageKey="student_bookmarks">
      <Body />
    </Guard>
  );
}

function Body() {
  const bi = useBi();
  return (
    <AppPage
      title={bi("المحفوظات", "Bookmarks")}
      icon="Bookmark"
      subtitle={bi("كل ما حفظته: دروس، أسئلة، ونقاشات — بمكان واحد للرجوع السريع.", "Everything you saved: lessons, questions and threads — in one quick-access place.")}
    >
      <StatGrid
        items={[
          {{ icon: "Bookmark", label: bi("عناصر محفوظة", "Saved items"), value: "27" }},
          {{ icon: "FileText", label: bi("دروس", "Lessons"), value: "12" }},
          {{ icon: "HelpCircle", label: bi("أسئلة", "Questions"), value: "9" }},
          {{ icon: "MessagesSquare", label: bi("نقاشات", "Threads"), value: "6" }},
        ]}
      />
      <Panel title={bi("محفوظاتك", "Your bookmarks")} icon="Bookmark">
        <RowList to="/library"
          rows={[
            {{ title: bi("درس: تكامل بالتجزيء", "Lesson: integration by parts"), meta: bi("رياضيات", "Math"), value: bi("درس", "Lesson"), tone: "primary" }},
            {{ title: bi("سؤال: قانون أوم", "Question: Ohm's law"), meta: bi("فيزياء", "Physics"), value: bi("سؤال", "Question"), tone: "muted" }},
            {{ title: bi("نقاش: تنظيم وقت المراجعة", "Thread: planning review time"), meta: bi("عام", "General"), value: bi("نقاش", "Thread"), tone: "muted" }},
          ]}
        />
      </Panel>
    </AppPage>
  );
}
