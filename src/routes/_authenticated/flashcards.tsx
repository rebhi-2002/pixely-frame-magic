import { createFileRoute } from "@tanstack/react-router";
import { AppPage, StatGrid, Panel, RowList, Progress, DataTable, QuickLinks, Badge, EmptyState } from "@/components/app/kit";
import { Guard } from "@/components/app/guard";
import { useBi } from "@/lib/bi";

const title = "البطاقات | أكاديميا";
const description = "مراجعة متباعدة (Spaced repetition): البطاقة ترجع لك في الوقت الذي تنساها فيه بالضبط.";

export const Route = createFileRoute("/_authenticated/flashcards")({
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
    <Guard pageKey="student_flashcards">
      <Body />
    </Guard>
  );
}

function Body() {
  const bi = useBi();
  return (
    <AppPage
      title={bi("البطاقات", "Flashcards")}
      icon="Layers"
      subtitle={bi("مراجعة متباعدة (Spaced repetition): البطاقة ترجع لك في الوقت الذي تنساها فيه بالضبط.", "Spaced repetition: each card returns exactly when you're about to forget it.")}
    >
      <StatGrid
        items={[
          { icon: "Layers", label: bi("بطاقات اليوم", "Due today"), value: "34" },
          { icon: "Flame", label: bi("أيام متتالية", "Streak"), value: "12" },
          { icon: "CheckCircle2", label: bi("بطاقات مُتقنة", "Mastered"), value: "212" },
          { icon: "Percent", label: bi("دقّة التذكّر", "Recall accuracy"), value: "86%" },
        ]}
      />
      <Panel title={bi("مجموعاتك", "Your decks")} icon="Layers">
        <RowList
          rows={[
            { title: bi("رياضيات — مشتقات", "Math — derivatives"), meta: bi("48 بطاقة · 12 مستحقة", "48 cards · 12 due"), value: bi("ابدأ", "Start"), tone: "primary" },
            { title: bi("فيزياء — الحركة", "Physics — motion"), meta: bi("36 بطاقة · 14 مستحقة", "36 cards · 14 due"), value: bi("ابدأ", "Start"), tone: "primary" },
            { title: bi("عربي — بلاغة", "Arabic — rhetoric"), meta: bi("60 بطاقة · 8 مستحقة", "60 cards · 8 due"), value: bi("ابدأ", "Start"), tone: "primary" },
          ]}
        />
      </Panel>
    </AppPage>
  );
}
