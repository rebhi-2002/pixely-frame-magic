// STUB (WP-00 / 00-14) — يملكه WP-S8. استبدل المحتوى كاملًا؛ أبقِ الـGuard ومفتاح الصلاحية كما هما
// (العقد C-17/C-18). ممنوع إضافة مفاتيح PAGES جديدة أو تعديل routeTree.gen.ts.
import { createFileRoute } from "@tanstack/react-router";
import { AppPage, EmptyState } from "@/components/app/kit";
import { Guard } from "@/components/app/guard";
import { useBi } from "@/lib/bi";
import { authPageHead } from "@/lib/seo";

export const Route = createFileRoute("/_authenticated/exam-results")({
  head: () =>
    authPageHead(
      { title: "نتائج الامتحانات | أكاديميا", description: "نتائج الامتحانات — قيد البناء." },
      { title: "Exam results | Academia", description: "Exam results — under construction." },
    ),
  component: () => (
    <Guard pageKey="student_exam_results">
      <Body />
    </Guard>
  ),
});

function Body() {
  const bi = useBi();
  return (
    <AppPage title={bi("نتائج الامتحانات", "Exam results")} icon="ClipboardCheck">
      <EmptyState
        icon="Construction"
        title={bi("قيد البناء", "Under construction")}
        description={bi(
          "هذه الصفحة قيد البناء (WP-S8).",
          "This page is under construction (WP-S8).",
        )}
      />
    </AppPage>
  );
}
