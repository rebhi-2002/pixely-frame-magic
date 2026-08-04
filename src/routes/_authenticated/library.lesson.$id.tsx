import { createFileRoute } from "@tanstack/react-router";
import { AppPage, StatGrid, Panel, RowList, Progress, DataTable, QuickLinks, Badge, EmptyState } from "@/components/app/kit";
import { Guard } from "@/components/app/guard";
import { useBi } from "@/lib/bi";

const title = "صفحة الدرس | أكاديميا";
const description = "الدرس: ملف مرتّب + أسئلة تفاعلية + بطاقات مراجعة + إضافة أخطائك إلى بنك الأخطاء.";

export const Route = createFileRoute("/_authenticated/library/lesson/$id")({
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
    <Guard pageKey="student_library">
      <Body />
    </Guard>
  );
}

function Body() {
  const bi = useBi();
  return (
    <AppPage
      title={bi("صفحة الدرس", "Lesson page")}
      icon="FileText"
      subtitle={bi("الدرس: ملف مرتّب + أسئلة تفاعلية + بطاقات مراجعة + إضافة أخطائك إلى بنك الأخطاء.", "The lesson: tidy material + interactive questions + flashcards + push mistakes to your bank.")}
    >
      <StatGrid
        items={[
          { icon: "Clock", label: bi("مدة الدرس", "Duration"), value: "18 د" },
          { icon: "ListChecks", label: bi("أسئلة", "Questions"), value: "10" },
          { icon: "Layers", label: bi("بطاقات", "Flashcards"), value: "12" },
          { icon: "Target", label: bi("نتيجتك", "Your score"), value: "80%" },
        ]}
      />
      <Panel title={bi("محتوى الدرس", "Lesson content")} icon="FileStack">
        <RowList
          rows={[
            { title: bi("شرح مكتوب + ملخص", "Written explanation + summary"), meta: bi("PDF · 4 صفحات", "PDF · 4 pages"), value: bi("فتح", "Open"), tone: "primary" },
            { title: bi("فيديو الشرح", "Explainer video"), meta: bi("12 دقيقة", "12 minutes"), value: bi("مشاهدة", "Watch"), tone: "primary" },
            { title: bi("ورقة تدريب", "Practice sheet"), meta: bi("8 أسئلة", "8 questions"), value: bi("تحميل", "Download"), tone: "muted" },
          ]}
        />
      </Panel>
      <Panel title={bi("أسئلة الدرس", "Lesson questions")} icon="HelpCircle">
        <RowList
          rows={[
            { title: bi("سؤال 1 — اختيار متعدد", "Q1 — multiple choice"), meta: bi("أجبت صحيح", "Answered correctly"), value: bi("صحيح", "Correct"), tone: "success" },
            { title: bi("سؤال 2 — صح/خطأ", "Q2 — true/false"), meta: bi("أُضيف إلى بنك الأخطاء", "Added to mistakes bank"), value: bi("خطأ", "Wrong"), tone: "danger" },
            { title: bi("سؤال 3 — إكمال", "Q3 — fill in"), meta: bi("لم تُجب بعد", "Not answered yet"), value: bi("متاح", "Open"), tone: "muted" },
          ]}
        />
      </Panel>
    </AppPage>
  );
}
