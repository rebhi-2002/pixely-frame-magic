// STUB (WP-00 / 00-14) — يملكه WP-S5. استبدل المحتوى كاملًا؛ أبقِ الـGuard ومفتاح الصلاحية كما هما
// (العقد C-17/C-18). ممنوع إضافة مفاتيح PAGES جديدة أو تعديل routeTree.gen.ts.
import { createFileRoute } from "@tanstack/react-router";
import { AppPage, EmptyState } from "@/components/app/kit";
import { Guard } from "@/components/app/guard";
import { useBi } from "@/lib/bi";
import { authPageHead } from "@/lib/seo";

export const Route = createFileRoute("/_authenticated/lesson/$id")({
  head: () =>
    authPageHead(
      { title: "تفاصيل الدرس | أكاديميا", description: "تفاصيل الدرس — قيد البناء." },
      { title: "Lesson details | Academia", description: "Lesson details — under construction." },
    ),
  component: () => (
    <Guard pageKey="student_schedule">
      <Body />
    </Guard>
  ),
});

function Body() {
  const bi = useBi();
  return (
    <AppPage title={bi("تفاصيل الدرس", "Lesson details")} icon="Presentation">
      <EmptyState
        icon="Construction"
        title={bi("قيد البناء", "Under construction")}
        description={bi(
          "هذه الصفحة قيد البناء (WP-S5).",
          "This page is under construction (WP-S5).",
        )}
      />
    </AppPage>
  );
}
