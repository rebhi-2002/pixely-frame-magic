// تبويب «تفاصيل الكورس» (WP-T1 / T1-03 · T1-04 · T1-06). العقد C-01 موسَّع بشكل متوافق:
// { course: TeacherCourseDetail | null (null = إنشاء)؛ onChanged؛ defaultDeliveryType? (من ?type=1|2) }.
//
// المنفَّذ الآن (بلا JSON): نموذج الإنشاء كاملًا — الحقول والتحقق وجسم Course/CreateEdit ومسودة/نشر والانتقال
// لـ/teacher/course/{returnId} بعد النجاح. صفوف الصف الدراسي حقيقية (getGradesList).
// ⛔ معلّق على الباك اند (لا نخمّن): قوائم المادة/التصنيف (Q-04 → NE-13) — الحفظ معطّل بنص صادق لحدها؛
// وتعبئة نموذج التعديل (J-05 → courseToDraft) — التعديل معطّل بنص صادق ولا نسمح بحفظ فوق بيانات لا نعرفها.
import { useState, type ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { EmptyState, Panel } from "@/components/app/kit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  COURSE_LOOKUPS_UNAVAILABLE,
  courseToDraft,
  type CourseLookups,
} from "@/components/teacher/course-seams";
import {
  COURSE_DESCRIPTION_MAX,
  COURSE_GROUP_NAME_MAX,
  COURSE_TITLE_MAX,
  emptyCourseValues,
  hasCourseErrors,
  toCourseInput,
  validateCourseForm,
  type CourseFormErrorCode,
  type CourseFormField,
  type CourseFormValues,
} from "@/components/teacher/course-form-schema";
import { createEditCourse, type TeacherCourseDetail } from "@/integrations/backend/courses";
import { getErrorMessage } from "@/integrations/backend/client";
import { assertOk, getReturnId } from "@/integrations/backend/op-result";
import { getGradesList } from "@/integrations/backend/teachers";
import { useBi } from "@/lib/bi";
import { DeliveryType, deliveryTypeLabel, type Bi } from "@/lib/enums";
import { qk } from "@/lib/query-keys";

export interface CourseDetailsTabProps {
  /** null = إنشاء كورس جديد. */
  course: TeacherCourseDetail | null;
  onChanged: () => void;
  /** النوع الافتراضي عند الإنشاء (?type=1|2). */
  defaultDeliveryType?: DeliveryType;
}

// مفتاح محلي: ما بنعدّل query-keys.ts (مجمّد بعد WP-00). لو احتاجه WP آخر يُنقل بـCR.
const GRADES_QUERY_KEY = ["teacher-grades"] as const;

const SELECT_CLASS =
  "h-10 w-full rounded-md border border-input bg-transparent px-3 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-60";

function errorText(code: CourseFormErrorCode, bi: Bi): string {
  switch (code) {
    case "title_required":
      return bi("اسم الكورس مطلوب", "The course name is required");
    case "title_too_long":
      return bi(`الاسم طويل (الحد ${COURSE_TITLE_MAX} حرفًا)`, `The name is too long (max ${COURSE_TITLE_MAX})`);
    case "description_too_long":
      return bi(
        `الوصف طويل (الحد ${COURSE_DESCRIPTION_MAX} حرفًا)`,
        `The description is too long (max ${COURSE_DESCRIPTION_MAX})`,
      );
    case "subject_required":
      return bi("اختر المادة", "Choose a subject");
    case "category_required":
      return bi("اختر التصنيف", "Choose a category");
    case "grade_required":
      return bi("اختر الصف", "Choose a grade");
    case "price_invalid":
      return bi("أدخل سعرًا صحيحًا (صفر أو أكثر، حتى منزلتين عشريتين)", "Enter a valid price (0 or more, up to 2 decimals)");
    case "capacity_invalid":
      return bi("الحد الأقصى للطلاب لازم يكون عددًا صحيحًا 1 أو أكثر", "Max students must be a whole number, 1 or more");
    case "group_name_required":
      return bi("اسم/رقم المجموعة مطلوب", "The group name/number is required");
    case "group_name_too_long":
      return bi(
        `اسم المجموعة طويل (الحد ${COURSE_GROUP_NAME_MAX} حرفًا)`,
        `The group name is too long (max ${COURSE_GROUP_NAME_MAX})`,
      );
  }
}

export function CourseDetailsTab({ course, onChanged, defaultDeliveryType }: CourseDetailsTabProps) {
  const bi = useBi();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const editing = course !== null;
  const draft = courseToDraft(course);

  const [deliveryType, setDeliveryType] = useState<DeliveryType>(
    draft?.deliveryType ?? defaultDeliveryType ?? DeliveryType.InPerson,
  );
  const [values, setValues] = useState<CourseFormValues>(() =>
    draft
      ? {
          title: draft.title,
          description: draft.description,
          subjectId: draft.subjectId === null ? "" : String(draft.subjectId),
          categoryId: draft.categoryId === null ? "" : String(draft.categoryId),
          gradeId: draft.gradeId === null ? "" : String(draft.gradeId),
          price: String(draft.price),
          maxStudents: String(draft.maxStudents),
          groupName: draft.groupName,
        }
      : emptyCourseValues(),
  );
  const [attempted, setAttempted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // الصفوف حقيقية من الباك اند. قائمة فاضية = لسا ما انزرعت صفوف (P1-3) — بنقول ذلك بصدق.
  const gradesQuery = useQuery({ queryKey: GRADES_QUERY_KEY, queryFn: getGradesList });
  const grades = gradesQuery.data ?? [];
  // Q-04: مصدر المادة/التصنيف غير محسوم بعد.
  const lookups: CourseLookups = COURSE_LOOKUPS_UNAVAILABLE;

  const errors = validateCourseForm(values);
  const showError = (field: CourseFormField): string | null =>
    attempted && errors[field] ? errorText(errors[field] as CourseFormErrorCode, bi) : null;
  const set = (field: keyof CourseFormValues, value: string) =>
    setValues((previous) => ({ ...previous, [field]: value }));

  const save = useMutation({
    mutationFn: async (saveAsDraft: boolean) => {
      const input = toCourseInput(values, deliveryType, saveAsDraft, {
        courseId: editing && typeof course?.id === "number" ? course.id : undefined,
      });
      const result = await createEditCourse(input);
      assertOk(result, "تعذّر حفظ الكورس", "Couldn't save the course");
      return { courseId: getReturnId(result), saveAsDraft };
    },
    onSuccess: ({ courseId, saveAsDraft }: { courseId: number | null; saveAsDraft: boolean }) => {
      void queryClient.invalidateQueries({ queryKey: qk.teacherCourses() });
      if (courseId !== null) void queryClient.invalidateQueries({ queryKey: qk.teacherCourse(courseId) });
      toast.success(
        saveAsDraft
          ? bi("تم حفظ الكورس كمسودة.", "The course was saved as a draft.")
          : bi("تم حفظ الكورس ونشره.", "The course was saved and published."),
      );
      onChanged();
      if (!editing && courseId !== null) {
        void navigate({ to: "/teacher/course/$id", params: { id: String(courseId) } });
      }
    },
    onError: (e: unknown) => setError(getErrorMessage(e, bi("تعذّر حفظ الكورس", "Couldn't save the course"))),
  });

  if (editing && draft === null) {
    return (
      <Panel title={bi("تفاصيل الكورس", "Course details")} icon="BookOpen">
        <EmptyState
          icon="Construction"
          title={bi("تعديل التفاصيل غير متاح بعد", "Editing details isn't available yet")}
          description={bi(
            "تعديل الكورس سيُفعَّل عند ربط بيانات الكورس الحالية، حتى لا نحفظ فوق بيانات لا نعرضها لك.",
            "Editing will be enabled once the current course data is connected, so we don't save over data we can't show you.",
          )}
        />
      </Panel>
    );
  }

  const submit = (saveAsDraft: boolean) => {
    setAttempted(true);
    setError(null);
    if (hasCourseErrors(errors) || !lookups.available) return;
    save.mutate(saveAsDraft);
  };

  const field = (
    id: string,
    label: string,
    key: CourseFormField,
    input: ReactNode,
    hint?: string,
  ) => (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      {input}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      {showError(key) && (
        <p role="alert" className="text-xs text-destructive">
          {showError(key)}
        </p>
      )}
    </div>
  );

  return (
    <Panel title={bi("تفاصيل الكورس", "Course details")} icon="BookOpen">
      <div className="space-y-5">
        {!editing && (
          <div className="space-y-1.5">
            <Label>{bi("نوع الكورس", "Course type")}</Label>
            <div className="flex flex-wrap gap-2" role="group">
              {[DeliveryType.InPerson, DeliveryType.Online].map((type) => (
                <Button
                  key={type}
                  type="button"
                  size="sm"
                  variant={type === deliveryType ? "default" : "outline"}
                  aria-pressed={type === deliveryType}
                  onClick={() => setDeliveryType(type)}
                >
                  {deliveryTypeLabel(type, bi)}
                </Button>
              ))}
            </div>
            {deliveryType === DeliveryType.Online && (
              <p className="text-xs text-muted-foreground">
                {bi(
                  "منصة الاجتماع ورابطه تُحدَّد لكل درس عند جدولة الدروس.",
                  "The meeting platform and link are set per lesson when you schedule lessons.",
                )}
              </p>
            )}
          </div>
        )}

        {field(
          "course-title",
          bi("اسم الكورس", "Course name"),
          "title",
          <Input
            id="course-title"
            value={values.title}
            maxLength={COURSE_TITLE_MAX + 20}
            onChange={(e) => set("title", e.target.value)}
            aria-invalid={Boolean(showError("title")) || undefined}
          />,
        )}

        {field(
          "course-description",
          bi("الوصف (اختياري)", "Description (optional)"),
          "description",
          <Textarea
            id="course-description"
            value={values.description}
            onChange={(e) => set("description", e.target.value)}
            aria-invalid={Boolean(showError("description")) || undefined}
          />,
        )}

        <div className="grid gap-4 sm:grid-cols-3">
          {field(
            "course-subject",
            bi("المادة", "Subject"),
            "subjectId",
            <select
              id="course-subject"
              className={SELECT_CLASS}
              value={values.subjectId}
              disabled={!lookups.available}
              onChange={(e) => set("subjectId", e.target.value)}
            >
              <option value="">{bi("اختر المادة", "Choose a subject")}</option>
              {lookups.subjects.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>,
          )}
          {field(
            "course-category",
            bi("التصنيف", "Category"),
            "categoryId",
            <select
              id="course-category"
              className={SELECT_CLASS}
              value={values.categoryId}
              disabled={!lookups.available}
              onChange={(e) => set("categoryId", e.target.value)}
            >
              <option value="">{bi("اختر التصنيف", "Choose a category")}</option>
              {lookups.categories.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>,
          )}
          {field(
            "course-grade",
            bi("الصف", "Grade"),
            "gradeId",
            <select
              id="course-grade"
              className={SELECT_CLASS}
              value={values.gradeId}
              onChange={(e) => set("gradeId", e.target.value)}
            >
              <option value="">{bi("اختر الصف", "Choose a grade")}</option>
              {grades.map((grade) => (
                <option key={grade.id} value={grade.id}>
                  {grade.section ? `${grade.name} — ${grade.section}` : grade.name}
                </option>
              ))}
            </select>,
            !gradesQuery.isLoading && grades.length === 0
              ? bi("لا توجد صفوف مسجّلة بالنظام بعد.", "No grades are registered in the system yet.")
              : undefined,
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {field(
            "course-price",
            bi("السعر", "Price"),
            "price",
            <Input
              id="course-price"
              inputMode="decimal"
              value={values.price}
              onChange={(e) => set("price", e.target.value)}
              aria-invalid={Boolean(showError("price")) || undefined}
            />,
          )}
          {field(
            "course-max",
            bi("الحد الأقصى للطلاب", "Max students"),
            "maxStudents",
            <Input
              id="course-max"
              inputMode="numeric"
              value={values.maxStudents}
              onChange={(e) => set("maxStudents", e.target.value)}
              aria-invalid={Boolean(showError("maxStudents")) || undefined}
            />,
          )}
          {field(
            "course-group",
            bi("اسم/رقم المجموعة", "Group name/number"),
            "groupName",
            <Input
              id="course-group"
              value={values.groupName}
              onChange={(e) => set("groupName", e.target.value)}
              aria-invalid={Boolean(showError("groupName")) || undefined}
            />,
          )}
        </div>

        {!lookups.available && (
          <p
            role="note"
            className="rounded-xl border border-border bg-secondary/30 px-4 py-3 text-sm text-muted-foreground"
          >
            {bi(
              "حفظ الكورس غير مفعّل بعد: قوائم المادة والتصنيف قيد الربط مع النظام. يمكنك تعبئة بقية الحقول الآن.",
              "Saving the course isn't enabled yet: the subject and category lists are still being connected. You can fill in the other fields now.",
            )}
          </p>
        )}

        {error && (
          <p role="alert" className="rounded-xl bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </p>
        )}

        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="outline"
            loading={save.isPending}
            disabled={!lookups.available}
            onClick={() => submit(true)}
          >
            {bi("حفظ كمسودة", "Save as draft")}
          </Button>
          <Button type="button" loading={save.isPending} disabled={!lookups.available} onClick={() => submit(false)}>
            {bi("حفظ ونشر", "Save & publish")}
          </Button>
        </div>
      </div>
    </Panel>
  );
}
