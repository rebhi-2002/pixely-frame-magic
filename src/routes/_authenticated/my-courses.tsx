import { createFileRoute } from "@tanstack/react-router";
import { AppPage } from "@/components/app/kit";
import { Guard } from "@/components/app/guard";
import { WelcomeBanner } from "@/components/app/welcome-banner";
import { EnrolledCoursesPanel } from "@/components/student/my-courses/enrolled-courses-panel";
import { ConfirmedBookingsPanel } from "@/components/student/my-courses/confirmed-bookings-panel";
import { PendingRequestsPanel } from "@/components/student/my-courses/pending-requests-panel";
import { RescheduleRequestsPanel } from "@/components/student/my-courses/reschedule-requests-panel";
import { useBi } from "@/lib/bi";
import { authPageHead } from "@/lib/seo";

const description = "كل الدروس والحجوزات المؤكّدة، والطلبات بانتظار موافقة المعلم.";

// WP-00 / 00-16: الصفحة مُركَّبة من لوحات (C-07/C-08/C-09) — كل لوحة تجلب بياناتها وتعالج
// حالات التحميل/الخطأ/الفراغ بنفسها. بعد إغلاق WP-00 هذا الملف مجمّد: أصحاب اللوحات
// (WP-S2/S3/S6) يعدّلون ملفات اللوحات فقط.
export const Route = createFileRoute("/_authenticated/my-courses")({
  head: () =>
    authPageHead(
      { title: "كورساتي | أكاديميا", description },
      {
        title: "My courses | Academia",
        description:
          "All your confirmed lessons and bookings, and requests awaiting a teacher's approval.",
      },
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
    <AppPage
      title={bi("كورساتي", "My courses")}
      icon="BookOpen"
      subtitle={bi(
        description,
        "All your confirmed lessons and bookings, and requests awaiting approval.",
      )}
    >
      <WelcomeBanner
        subtitle={["متابعة دروسك وحجوزاتك.", "Keep track of your lessons and bookings."]}
      />
      <EnrolledCoursesPanel />
      <ConfirmedBookingsPanel />
      <PendingRequestsPanel />
      <RescheduleRequestsPanel />
    </AppPage>
  );
}
