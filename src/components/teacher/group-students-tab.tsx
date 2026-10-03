// STUB (WP-00 / 00-15) — يملكه WP-T3. العقد C-01: props ثابتة { course, onChanged }؛ لا تغيّر
// التوقيع بدون CR. الـshell (WP-T1) هو الذي يجلب الكورس ويمرّره.
import { EmptyState } from "@/components/app/kit";
import type { TeacherCourseDetail } from "@/integrations/backend/courses";
import { useBi } from "@/lib/bi";

export interface GroupStudentsTabProps {
  course: TeacherCourseDetail;
  onChanged: () => void;
}

export function GroupStudentsTab(_props: GroupStudentsTabProps) {
  const bi = useBi();
  return (
    <EmptyState
      icon="Construction"
      title={bi("طلاب المجموعة", "Group students")}
      description={bi("قيد البناء (WP-T3).", "Under construction (WP-T3).")}
    />
  );
}
