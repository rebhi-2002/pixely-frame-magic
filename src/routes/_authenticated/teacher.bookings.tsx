// STUB (WP-00 / 00-14) — يملكه WP-T5. استبدل المحتوى كاملًا؛ أبقِ الـGuard ومفتاح الصلاحية كما هما
// (العقد C-17/C-18). ممنوع إضافة مفاتيح PAGES جديدة أو تعديل routeTree.gen.ts.
import { createFileRoute } from "@tanstack/react-router";
import { AppPage, EmptyState } from "@/components/app/kit";
import { Guard } from "@/components/app/guard";
import { useBi } from "@/lib/bi";
import { authPageHead } from "@/lib/seo";

export const Route = createFileRoute("/_authenticated/teacher/bookings")({
  head: () =>
    authPageHead(
      { title: "طلبات الحجز | أكاديميا", description: "طلبات الحجز — قيد البناء." },
      {
        title: "Booking requests | Academia",
        description: "Booking requests — under construction.",
      },
    ),
  component: () => (
    <Guard pageKey="teacher_bookings">
      <Body />
    </Guard>
  ),
});

function Body() {
  const bi = useBi();
  return (
    <AppPage title={bi("طلبات الحجز", "Booking requests")} icon="CalendarCheck">
      <EmptyState
        icon="Construction"
        title={bi("قيد البناء", "Under construction")}
        description={bi(
          "هذه الصفحة قيد البناء (WP-T5).",
          "This page is under construction (WP-T5).",
        )}
      />
    </AppPage>
  );
}
