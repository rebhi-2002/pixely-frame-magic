// STUB (WP-00 / 00-14) — يملكه WP-S6. استبدل المحتوى كاملًا؛ أبقِ الـGuard ومفتاح الصلاحية كما هما
// (العقد C-17/C-18). ممنوع إضافة مفاتيح PAGES جديدة أو تعديل routeTree.gen.ts.
import { createFileRoute } from "@tanstack/react-router";
import { AppPage, EmptyState } from "@/components/app/kit";
import { Guard } from "@/components/app/guard";
import { useBi } from "@/lib/bi";
import { authPageHead } from "@/lib/seo";

export const Route = createFileRoute("/_authenticated/enrolled-course/$id")({
  head: () =>
    authPageHead(
      { title: "تفاصيل الكورس | أكاديميا", description: "تفاصيل الكورس — قيد البناء." },
      { title: "Course details | Academia", description: "Course details — under construction." },
    ),
  component: () => (
    <Guard pageKey="student_my_courses">
      <Body />
    </Guard>
  ),
});

function Body() {
  const bi = useBi();
  return (
    <AppPage title={bi("تفاصيل الكورس", "Course details")} icon="GraduationCap">
      <EmptyState
        icon="Construction"
        title={bi("قيد البناء", "Under construction")}
        description={bi(
          "هذه الصفحة قيد البناء (WP-S6).",
          "This page is under construction (WP-S6).",
        )}
      />
    </AppPage>
  );
}
