// تبويب «الطلاب» (WP-T3 / T3-01..04) — العقد C-01: props { course, onChanged }.
// Course/GetGroupStudents?groupId&keyword → GroupStudentRow[] (اسم/هاتف/موقع فقط).
// ⛔ B-2: الكورس لا يحمل groupId (resolveGroupId = null) فنعرض شرحًا صادقًا بدل قائمة فارغة مضلّلة؛ يعمل تلقائيًا عند توفره.
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { DataTable, EmptyState, Panel } from "@/components/app/kit";
import { ErrorState, LoadingState, RetryButton } from "@/components/app/feedback-states";
import { resolveGroupId } from "@/components/teacher/course-seams";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getGroupStudents, type TeacherCourseDetail } from "@/integrations/backend/courses";
import { useBi } from "@/lib/bi";
import { withLoadErrorDetail } from "@/lib/load-error";
import { qk } from "@/lib/query-keys";

export interface GroupStudentsTabProps {
  course: TeacherCourseDetail;
  onChanged: () => void;
}

export function GroupStudentsTab({ course }: GroupStudentsTabProps) {
  const bi = useBi();
  const groupId = resolveGroupId(course);
  const [draft, setDraft] = useState("");
  const [keyword, setKeyword] = useState("");

  const query = useQuery({
    queryKey: qk.teacherGroupStudents(groupId ?? 0, keyword || undefined),
    queryFn: () => getGroupStudents(groupId as number, keyword || undefined),
    enabled: groupId !== null,
  });

  if (groupId === null) {
    return (
      <EmptyState
        icon="Users"
        title={bi("طلاب المجموعة", "Group students")}
        description={bi(
          "قائمة الطلاب تحتاج رقم مجموعة الكورس، وهو غير متوفر حاليًا من الخادم. ستظهر القائمة تلقائيًا بمجرد توفره.",
          "The student list needs the course's group number, which the server doesn't provide yet. The list will appear automatically once it does.",
        )}
      />
    );
  }

  return (
    <Panel title={bi("طلاب المجموعة", "Group students")} icon="Users">
      <div className="mb-4 flex flex-wrap items-end gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="gs-search">{bi("بحث بالاسم", "Search by name")}</Label>
          <Input id="gs-search" value={draft} onChange={(e) => setDraft(e.target.value)} />
        </div>
        <Button type="button" variant="outline" onClick={() => setKeyword(draft.trim())}>
          {bi("بحث", "Search")}
        </Button>
        {keyword && (
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              setDraft("");
              setKeyword("");
            }}
          >
            {bi("مسح", "Clear")}
          </Button>
        )}
      </div>
      {query.isError ? (
        <ErrorState
          title={bi("ما قدرنا نحمّل الطلاب", "We couldn't load the students")}
          description={withLoadErrorDetail(
            bi("جرّب مرة ثانية.", "Try again."),
            query.error,
            bi,
          )}
          action={
            <RetryButton label={bi("إعادة المحاولة", "Try again")} onClick={() => void query.refetch()} />
          }
        />
      ) : !query.data ? (
        <LoadingState label={bi("جارٍ التحميل…", "Loading…")} className="border-none bg-transparent" />
      ) : query.data.length === 0 ? (
        <EmptyState
          icon="Users"
          text={
            keyword
              ? bi("لا توجد نتائج مطابقة.", "No matching students.")
              : bi("لا يوجد طلاب مسجّلون بالمجموعة بعد.", "No students are enrolled in this group yet.")
          }
        />
      ) : (
        <DataTable
          caption={bi("طلاب المجموعة", "Group students")}
          head={[bi("الاسم", "Name"), bi("الهاتف", "Phone"), bi("الموقع", "Location")]}
          rows={query.data.map((s) => [s.name, s.phoneNumber || "—", s.location?.trim() || "—"])}
        />
      )}
    </Panel>
  );
}
