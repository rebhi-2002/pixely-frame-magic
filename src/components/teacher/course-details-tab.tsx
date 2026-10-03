// STUB (WP-00 / 00-15) — يملكه WP-T1. العقد C-01: props ثابتة { course, onChanged }؛ لا تغيّر
// التوقيع بدون CR. الـshell (WP-T1) هو الذي يجلب الكورس ويمرّره.
import { EmptyState } from "@/components/app/kit";
import type { TeacherCourseDetail } from "@/integrations/backend/courses";
import { useBi } from "@/lib/bi";

export interface CourseDetailsTabProps {
  course: TeacherCourseDetail;
  onChanged: () => void;
}

export function CourseDetailsTab(_props: CourseDetailsTabProps) {
  const bi = useBi();
  return (
    <EmptyState
      icon="Construction"
      title={bi("تفاصيل الكورس", "Course details")}
      description={bi("قيد البناء (WP-T1).", "Under construction (WP-T1).")}
    />
  );
}
