// STUB (WP-00 / 00-15) — يملكه WP-T2. العقد C-01: props ثابتة { course, onChanged }؛ لا تغيّر
// التوقيع بدون CR. الـshell (WP-T1) هو الذي يجلب الكورس ويمرّره.
import { EmptyState } from "@/components/app/kit";
import type { TeacherCourseDetail } from "@/integrations/backend/courses";
import { useBi } from "@/lib/bi";

// T2-03: التحقق من الجدول (نقي). النموذج الفعلي (T2-01، مرحلة B) هو اللي بيستهلكه.
export { validateGroupSchedule, isGroupScheduleValid } from "./group-schedule-validation";
export type { GroupScheduleIssue, GroupScheduleErrorCode } from "./group-schedule-validation";

export interface GroupConfigTabProps {
  course: TeacherCourseDetail;
  onChanged: () => void;
}

export function GroupConfigTab(_props: GroupConfigTabProps) {
  const bi = useBi();
  return (
    <EmptyState
      icon="Construction"
      title={bi("إعداد المجموعة", "Group setup")}
      description={bi("قيد البناء (WP-T2).", "Under construction (WP-T2).")}
    />
  );
}
