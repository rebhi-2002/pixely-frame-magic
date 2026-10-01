import { useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AppPage, Badge, DataTable, Panel, StatGrid } from "@/components/app/kit";
import { WelcomeBanner } from "@/components/app/welcome-banner";
import { ComparisonChart, SplitChart } from "@/components/app/charts";
import { listBackendUsers, loadBackendUserOptions } from "@/integrations/backend/admin-users";
import {
  getPendingTopUpRequests,
  getPendingWithdrawalRequests,
  TopUpRequestStatus,
  WithdrawalRequestStatus,
} from "@/integrations/backend/wallet";
import { listAllCoursesForAdminFull } from "@/integrations/backend/courses";
import { useBi } from "@/lib/bi";
import { roleKeyOfUserType } from "@/integrations/backend/user-types";
import { ErrorState, LoadingState, RetryButton } from "@/components/app/feedback-states";

// أسماء العرض حسب مفتاح الدور الثابت (code) — الأرقام بتيجي من الباك اند وبتختلف بين البيئات.
const USER_TYPE_LABELS: Record<string, { nameAr: string; nameEn: string }> = {
  admin: { nameAr: "مدير النظام", nameEn: "System admin" },
  student: { nameAr: "الطالب", nameEn: "Student" },
  teacher: { nameAr: "المعلم", nameEn: "Teacher" },
  parent: { nameAr: "ولي الامر", nameEn: "Parent" },
};

const COURSE_STATUS_LABEL: Record<number, [string, string]> = {
  1: ["مسودة", "Draft"],
  2: ["منشور", "Published"],
  3: ["مؤرشف", "Archived"],
};

export function AdminDashboardPage() {
  const bi = useBi();
  const queryClient = useQueryClient();

  // عدد كل نوع مستخدم — نداء خفيف واحد بـ pageSize=1 لكل نوع، الاعتماد فقط على totalCount.
  const usersByType = useQuery({
    queryKey: ["admin-dashboard", "users-by-type"],
    queryFn: async () => {
      const { roles } = await loadBackendUserOptions();
      return Promise.all(
        roles.map(async (t) => {
          const code = roleKeyOfUserType(t) ?? "";
          const labels = USER_TYPE_LABELS[code] ?? { nameAr: t.name, nameEn: t.name };
          return {
            id: t.id,
            code,
            ...labels,
            count: (await listBackendUsers({ userTypeId: t.id, pageSize: 1 })).totalCount,
          };
        }),
      );
    },
  });

  // الجنس والحالة (نشط/موقوف) — نفس أسلوب "عدّ عبر فلتر السيرفر"، بأسماء
  // الجنس الحقيقية من الباك اند (بدون تخمين أرقامها).
  const genderOptions = useQuery({
    queryKey: ["admin-dashboard", "gender-options"],
    queryFn: () => loadBackendUserOptions(),
  });
  const usersByGender = useQuery({
    queryKey: ["admin-dashboard", "users-by-gender", genderOptions.data?.genders],
    enabled: !!genderOptions.data,
    queryFn: () =>
      Promise.all(
        (genderOptions.data?.genders ?? []).map(async (g) => ({
          ...g,
          count: (await listBackendUsers({ genderId: g.id, pageSize: 1 })).totalCount,
        })),
      ),
  });
  const usersByStatus = useQuery({
    queryKey: ["admin-dashboard", "users-by-status"],
    queryFn: async () => ({
      active: (await listBackendUsers({ isActiveSearch: true, pageSize: 1 })).totalCount,
      inactive: (await listBackendUsers({ isActiveSearch: false, pageSize: 1 })).totalCount,
    }),
  });

  const pendingTopUps = useQuery({
    queryKey: ["admin-dashboard", "pending-topups"],
    queryFn: getPendingTopUpRequests,
  });

  const pendingWithdrawals = useQuery({
    queryKey: ["admin-dashboard", "pending-withdrawals"],
    queryFn: getPendingWithdrawalRequests,
  });

  const courses = useQuery({
    queryKey: ["admin-dashboard", "all-courses"],
    queryFn: () => listAllCoursesForAdminFull(),
  });

  const queries = [
    usersByType,
    genderOptions,
    usersByGender,
    usersByStatus,
    pendingTopUps,
    pendingWithdrawals,
    courses,
  ];
  const isLoading = queries.some((q) => q.isLoading);

  // const hasError = queries.some((q) => q.isError);

  // الكورسات ثانوية بهالصفحة: لو Course/GetAll فشل (500) بنعرض باقي اللوحة بدل ما نخفيها كلها.
  const hasError = queries.filter((q) => q !== courses).some((q) => q.isError);

  const roleDistribution = useMemo(
    () => (usersByType.data ?? []).map((t) => ({ label: bi(t.nameAr, t.nameEn), value: t.count })),
    [usersByType.data, bi],
  );
  const totalUsers = useMemo(
    () => (usersByType.data ?? []).reduce((sum, t) => sum + t.count, 0),
    [usersByType.data],
  );
  const teacherCount = usersByType.data?.find((t) => t.code === "teacher")?.count ?? 0;
  const studentCount = usersByType.data?.find((t) => t.code === "student")?.count ?? 0;
  const parentCount = usersByType.data?.find((t) => t.code === "parent")?.count ?? 0;

  const genderDistribution = useMemo(
    () => (usersByGender.data ?? []).map((g) => ({ label: g.name, value: g.count })),
    [usersByGender.data],
  );
  const statusDistribution = useMemo(
    () => [
      { label: bi("نشط", "Active"), value: usersByStatus.data?.active ?? 0 },
      { label: bi("موقوف", "Suspended"), value: usersByStatus.data?.inactive ?? 0 },
    ],
    [usersByStatus.data, bi],
  );

  const pendingTopUpCount = (pendingTopUps.data ?? []).filter(
    (r) => r.status === TopUpRequestStatus.PendingVerification,
  ).length;
  const pendingWithdrawalCount = (pendingWithdrawals.data ?? []).filter(
    (r) => r.status === WithdrawalRequestStatus.PendingApproval,
  ).length;
  // مبالغ الطلبات المعلّقة — محسوبة ديناميكياً بالفرونت من نفس القوائم الحقيقية
  // المجلوبة فوق (مش رقم إضافي من الباك اند).
  const pendingTopUpAmount = (pendingTopUps.data ?? [])
    .filter((r) => r.status === TopUpRequestStatus.PendingVerification)
    .reduce((sum, r) => sum + r.amount, 0);
  const pendingWithdrawalAmount = (pendingWithdrawals.data ?? [])
    .filter((r) => r.status === WithdrawalRequestStatus.PendingApproval)
    .reduce((sum, r) => sum + r.amount, 0);

  const paymentsByStatus = [
    {
      label: bi("طلبات شحن بانتظار التحقق", "Top-ups awaiting verification"),
      value: pendingTopUpCount,
    },
    {
      label: bi("طلبات سحب بانتظار القرار", "Withdrawals awaiting a decision"),
      value: pendingWithdrawalCount,
    },
  ];

  // إحصائيات الكورسات — كلها محسوبة بالفرونت من القائمة الحقيقية الكاملة
  // (Course/GetAll)، بما إن الباك اند ما بيرجّع الإحصائية جاهزة.
  const courseRows = courses.data?.items ?? [];
  const coursesByStatus = useMemo(() => {
    const counts = new Map<number, number>();
    for (const c of courseRows) counts.set(c.status, (counts.get(c.status) ?? 0) + 1);
    return Array.from(counts.entries()).map(([status, value]) => ({
      label: bi(...(COURSE_STATUS_LABEL[status] ?? [String(status), String(status)])),
      value,
    }));
  }, [courseRows, bi]);
  const publishedCount = courseRows.filter((c) => c.status === 2).length;
  const coursesByDelivery = useMemo(() => {
    const online = courseRows.filter((c) => c.deliveryType === 2).length;
    const inPerson = courseRows.filter((c) => c.deliveryType === 1).length;
    return [
      { label: bi("أونلاين", "Online"), value: online },
      { label: bi("حضوري", "In-person"), value: inPerson },
    ];
  }, [courseRows, bi]);
  const averageCoursePrice = courseRows.length
    ? Math.round(courseRows.reduce((sum, c) => sum + c.price, 0) / courseRows.length)
    : 0;

  const tasks: { title: [string, string]; area: [string, string] }[] = [];
  if (pendingTopUpCount > 0) {
    tasks.push({
      title: [
        `${pendingTopUpCount} طلب شحن رصيد بانتظار التحقق (${pendingTopUpAmount} ₪)`,
        `${pendingTopUpCount} top-up requests awaiting verification (${pendingTopUpAmount} ₪)`,
      ],
      area: [bi("المحفظة", "Wallet"), "Wallet"],
    });
  }
  if (pendingWithdrawalCount > 0) {
    tasks.push({
      title: [
        `${pendingWithdrawalCount} طلب سحب بانتظار القرار (${pendingWithdrawalAmount} ₪)`,
        `${pendingWithdrawalCount} withdrawal requests awaiting a decision (${pendingWithdrawalAmount} ₪)`,
      ],
      area: [bi("المحفظة", "Wallet"), "Wallet"],
    });
  }

  if (hasError) {
    return (
      <AppPage title={bi("لوحة إدارة Academia", "Academia admin dashboard")} icon="LayoutDashboard">
        <ErrorState
          title={bi("ما قدرنا نحمّل اللوحة", "We couldn't load the dashboard")}
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
      <AppPage title={bi("لوحة إدارة Academia", "Academia admin dashboard")} icon="LayoutDashboard">
        <LoadingState
          label={bi("جارٍ التحميل…", "Loading…")}
          className="border-none bg-transparent"
        />
      </AppPage>
    );
  }

  return (
    <AppPage
      title={bi("لوحة إدارة Academia", "Academia admin dashboard")}
      icon="LayoutDashboard"
      subtitle={bi(
        "كل رقم هون جاي مباشرة من الباك اند الحقيقي (User وWallet وCourse) — بعضها محسوب ديناميكياً بالفرونت من نفس البيانات.",
        "Every number here comes directly from the real backend (User, Wallet, Course) — some are computed dynamically on the frontend from the same data.",
      )}
    >
      <WelcomeBanner
        subtitle={["مؤشرات تشغيل المنصة اليوم.", "Today's platform operations at a glance."]}
      />

      <div>
        <h2 className="mb-2 font-display text-sm font-bold text-muted-foreground">
          {bi("المستخدمون", "Users")}
        </h2>
        <StatGrid
          items={[
            { icon: "Users", label: bi("المستخدمون", "Users"), value: String(totalUsers) },
            { icon: "GraduationCap", label: bi("الطلاب", "Students"), value: String(studentCount) },
            {
              icon: "Presentation",
              label: bi("المعلمون", "Teachers"),
              value: String(teacherCount),
            },
            {
              icon: "UserRound",
              label: bi("أولياء الأمور", "Parents"),
              value: String(parentCount),
            },
          ]}
        />
      </div>

      <div>
        <h2 className="mb-2 font-display text-sm font-bold text-muted-foreground">
          {bi("الكورسات والمحفظة", "Courses & wallet")}
        </h2>
        <StatGrid
          items={[
            {
              icon: "BookOpenCheck",
              label: bi("الكورسات المنشورة", "Published courses"),
              value: String(publishedCount),
            },
            {
              icon: "BookCopy",
              label: bi("كل الكورسات", "All courses"),
              value: String(courses.data?.totalCount ?? 0),
            },
            {
              icon: "Tag",
              label: bi("متوسط سعر الكورس", "Avg. course price"),
              value: `${averageCoursePrice} ₪`,
            },
            {
              icon: "Wallet",
              label: bi("طلبات محفظة معلّقة", "Pending wallet requests"),
              value: String(pendingTopUpCount + pendingWithdrawalCount),
            },
          ]}
        />
      </div>

      <Panel title={bi("مهام بانتظار القرار", "Tasks awaiting a decision")} icon="ListChecks">
        {tasks.length ? (
          <DataTable
            head={[bi("المهمة", "Task"), bi("القسم", "Area")]}
            rows={tasks.map((t) => [
              bi(...t.title),
              <Badge key={t.title[0]} tone="primary">
                {bi(t.area[0], t.area[1])}
              </Badge>,
            ])}
          />
        ) : (
          <p className="py-6 text-center text-sm text-muted-foreground">
            {bi(
              "لا توجد مهام بانتظار القرار حالياً 🎉",
              "No tasks awaiting a decision right now 🎉",
            )}
          </p>
        )}
      </Panel>

      <div className="grid gap-5 lg:grid-cols-2">
        <Panel title={bi("المستخدمون حسب نوع الحساب", "Users by account type")} icon="Users">
          <ComparisonChart data={roleDistribution} />
        </Panel>
        <Panel title={bi("طلبات المحفظة المعلّقة", "Pending wallet requests")} icon="Wallet">
          <SplitChart data={paymentsByStatus} />
        </Panel>
        <Panel title={bi("المستخدمون حسب الجنس", "Users by gender")} icon="Users">
          <SplitChart data={genderDistribution} />
        </Panel>
        <Panel title={bi("المستخدمون حسب الحالة", "Users by status")} icon="ShieldCheck">
          <SplitChart data={statusDistribution} />
        </Panel>
        <Panel title={bi("الكورسات حسب الحالة", "Courses by status")} icon="BookOpenCheck">
          <ComparisonChart data={coursesByStatus} />
        </Panel>
        <Panel
          title={bi("الكورسات حسب طريقة التدريس", "Courses by delivery mode")}
          icon="Presentation"
        >
          <SplitChart data={coursesByDelivery} />
        </Panel>
      </div>
    </AppPage>
  );
}
