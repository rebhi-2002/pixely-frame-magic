import { createFileRoute } from "@tanstack/react-router";
import { AppPage, StatGrid, Panel, RowList, Progress, DataTable, QuickLinks, Badge, EmptyState } from "@/components/app/kit";
import { Guard } from "@/components/app/guard";
import { useBi } from "@/lib/bi";

const title = "مجتمع الصف | أكاديميا";
const description = "أسئلة طلابك في مكان واحد؛ إجابتك تُميّز كـ«إجابة معلم» تلقائياً.";

export const Route = createFileRoute("/_authenticated/teacher/community")({
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
    <Guard pageKey="teacher_community">
      <Body />
    </Guard>
  );
}

function Body() {
  const bi = useBi();
  return (
    <AppPage
      title={bi("مجتمع الصف", "Class community")}
      icon="MessagesSquare"
      subtitle={bi("أسئلة طلابك في مكان واحد؛ إجابتك تُميّز كـ«إجابة معلم» تلقائياً.", "Your students' questions in one place; your answer is marked as a verified teacher answer.")}
    >
      <StatGrid
        items={[
          {{ icon: "MessagesSquare", label: bi("أسئلة مفتوحة", "Open questions"), value: "7" }},
          {{ icon: "CheckCheck", label: bi("أجبت هذا الأسبوع", "Answered this week"), value: "23" }},
          {{ icon: "Flag", label: bi("بلاغات", "Reports"), value: "1" }},
          {{ icon: "Clock", label: bi("متوسط زمن الرد", "Avg. response"), value: "4 س" }},
        ]}
      />
      <Panel title={bi("بانتظار جوابك", "Awaiting your answer")} icon="MessagesSquare">
        <RowList
          rows={[
            {{ title: bi("كيف نفرّق بين المتسلسلة المتقاربة والمتباعدة؟", "Convergent vs divergent series?"), meta: bi("رياضيات · منذ 3 ساعات", "Math · 3h ago"), value: bi("مفتوح", "Open"), tone: "primary" }},
            {{ title: bi("خطأ في حلّ تمرين 12", "Mistake in exercise 12"), meta: bi("رياضيات · أمس", "Math · yesterday"), value: bi("مفتوح", "Open"), tone: "primary" }},
            {{ title: bi("محتوى غير لائق في نقاش", "Inappropriate content in a thread"), meta: bi("بلاغ", "Report"), value: bi("بلاغ", "Report"), tone: "danger" }},
          ]}
        />
      </Panel>
    </AppPage>
  );
}
