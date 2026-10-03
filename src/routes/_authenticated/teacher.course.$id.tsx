// STUB (WP-00 / 00-14) — يملكه WP-T1. استبدل المحتوى كاملًا؛ أبقِ الـGuard ومفتاح الصلاحية كما هما
// (العقد C-17/C-18). ممنوع إضافة مفاتيح PAGES جديدة أو تعديل routeTree.gen.ts.
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { AppPage, EmptyState } from "@/components/app/kit";
import { Guard } from "@/components/app/guard";
import { useBi } from "@/lib/bi";
import { authPageHead } from "@/lib/seo";

// T1-02: نوع الكورس عند الإنشاء (/teacher/course/new?type=1|2) — 1 حضوري، 2 أونلاين.
// أي قيمة غير صالحة بتتجاهلها الصفحة (undefined) بدل ما تكسر التنقّل.
const searchSchema = z.object({
  type: z
    .preprocess(
      (v) => (typeof v === "string" ? Number(v) : v),
      z.union([z.literal(1), z.literal(2)]),
    )
    .optional()
    .catch(undefined),
});

export const Route = createFileRoute("/_authenticated/teacher/course/$id")({
  validateSearch: (search) => searchSchema.parse(search),
  head: () =>
    authPageHead(
      { title: "الكورس | أكاديميا", description: "الكورس — قيد البناء." },
      { title: "Course | Academia", description: "Course — under construction." },
    ),
  component: () => (
    <Guard pageKey="teacher_courses">
      <Body />
    </Guard>
  ),
});

function Body() {
  const bi = useBi();
  return (
    <AppPage title={bi("الكورس", "Course")} icon="BookOpen">
      <EmptyState
        icon="Construction"
        title={bi("قيد البناء", "Under construction")}
        description={bi(
          "هذه الصفحة قيد البناء (WP-T1).",
          "This page is under construction (WP-T1).",
        )}
      />
    </AppPage>
  );
}
