import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AppPage, Panel, DataTable, Badge, EmptyState, Pagination } from "@/components/app/kit";
import { listAllCoursesForAdmin, type BackendCourseStatus } from "@/integrations/backend/courses";
import { useBi } from "@/lib/bi";
import { ErrorState, LoadingState, RetryButton } from "@/components/app/feedback-states";

const STATUS_LABEL: Record<BackendCourseStatus, [string, string]> = {
  1: ["مسودة", "Draft"],
  2: ["منشور", "Published"],
  3: ["مؤرشف", "Archived"],
};

const PAGE_SIZE = 20;

export function CourseCatalogPage() {
  const bi = useBi();
  const queryClient = useQueryClient();
  const [page, setPage] = useState(0);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin-courses", page],
    queryFn: () => listAllCoursesForAdmin({ skip: page * PAGE_SIZE, pageSize: PAGE_SIZE }),
  });

  if (isError) {
    return (
      <AppPage title={bi("كتالوج الكورسات", "Course catalog")} icon="Store">
        <ErrorState
          title={bi("ما قدرنا نحمّل الكورسات", "We couldn't load the courses")}
          description={bi(
            "جرّب التحديث مرة ثانية. إذا استمرت المشكلة، تأكد من اتصالك أو ارجع لاحقاً.",
            "Try again. If the problem continues, check your connection or come back later.",
          )}
          action={
            <RetryButton
              label={bi("إعادة المحاولة", "Try again")}
              onClick={() => void queryClient.invalidateQueries()}
            />
          }
        />
      </AppPage>
    );
  }

  if (isLoading) {
    return (
      <AppPage title={bi("كتالوج الكورسات", "Course catalog")} icon="Store">
        <LoadingState
          label={bi("جارٍ التحميل…", "Loading…")}
          className="border-none bg-transparent"
        />
      </AppPage>
    );
  }

  const rows = data?.data ?? [];
  const totalCount = data?.totalCount ?? 0;

  return (
    <AppPage
      title={bi("كتالوج الكورسات", "Course catalog")}
      icon="Store"
      subtitle={bi(
        "كل الكورسات (مسودة/منشور/مؤرشف) مباشرة من الباك اند.",
        "All courses (draft/published/archived), straight from the backend.",
      )}
    >
      <Panel title={bi("إنشاء كورس جديد", "Create a new course")} icon="Plus">
        <EmptyState
          icon="ShieldAlert"
          text={bi(
            "معطّل مؤقتاً بقصد: الباك اند ما عنده مصدر بيانات حقيقي للمواد/الصفوف/فئات الكورس بعد (لا seed ولا endpoint) — أي نموذج إنشاء رح تكون قوائمه فاضية وبلا فايدة. رح يُفعّل فور ما تضاف هالبيانات.",
            "Intentionally disabled for now: the backend has no real subject/grade/category data source yet (no seed, no endpoint) — a creation form would just have empty dropdowns. It'll turn on once that data exists.",
          )}
        />
      </Panel>

      <Panel title={bi("كل الكورسات", "All courses")} icon="Store">
        {rows.length ? (
          <>
            <DataTable
              head={[
                bi("العنوان", "Title"),
                bi("المعلم", "Teacher"),
                bi("المادة", "Subject"),
                bi("السعر", "Price"),
                bi("الحالة", "Status"),
              ]}
              rows={rows.map((c) => [
                c.title,
                c.teacherName ?? "—",
                c.subjectName ?? "—",
                `${c.price} ₪`,
                <Badge
                  key={c.id}
                  tone={c.status === 2 ? "success" : c.status === 1 ? "muted" : "danger"}
                >
                  {bi(...STATUS_LABEL[c.status])}
                </Badge>,
              ])}
            />
            <Pagination
              page={page}
              pageSize={PAGE_SIZE}
              totalCount={totalCount}
              onPageChange={setPage}
              summary={bi(
                `${Math.min(page * PAGE_SIZE + 1, totalCount)}–${Math.min((page + 1) * PAGE_SIZE, totalCount)} من ${totalCount}`,
                `${Math.min(page * PAGE_SIZE + 1, totalCount)}–${Math.min((page + 1) * PAGE_SIZE, totalCount)} of ${totalCount}`,
              )}
              previousLabel={bi("السابق", "Previous")}
              nextLabel={bi("التالي", "Next")}
            />
          </>
        ) : (
          <EmptyState icon="Store" text={bi("لا يوجد كورسات بعد.", "No courses yet.")} />
        )}
      </Panel>
    </AppPage>
  );
}
