// STUB (WP-00 / 00-15) — يملكه WP-T4. العقد C-01: props ثابتة { course, onChanged }؛ لا تغيّر
// التوقيع بدون CR. الـshell (WP-T1) هو الذي يجلب الكورس ويمرّره.
import { EmptyState } from "@/components/app/kit";
import type { TeacherCourseDetail } from "@/integrations/backend/courses";
import { useBi } from "@/lib/bi";

export interface LessonsTabProps {
  course: TeacherCourseDetail;
  onChanged: () => void;
}

export function LessonsTab(_props: LessonsTabProps) {
  const bi = useBi();
  return (
    <EmptyState
      icon="Construction"
      title={bi("الدروس", "Lessons")}
      description={bi("قيد البناء (WP-T4).", "Under construction (WP-T4).")}
    />
  );
}
