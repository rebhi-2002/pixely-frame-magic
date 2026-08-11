import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Guard } from "@/components/app/guard";
import { AppPage, Badge, DataTable, Panel, StatGrid } from "@/components/app/kit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useBi } from "@/lib/bi";
import { ComparisonChart, SplitChart, TrendChart } from "@/components/app/charts";

export type AdminFeature =
  | "dashboard"
  | "teachers"
  | "content-review"
  | "community-reports"
  | "users"
  | "payments"
  | "roles"
  | "curriculum"
  | "curriculum-requests"
  | "settings";

type Config = {
  pageKey: string;
  icon: string;
  title: [string, string];
  subtitle: [string, string];
  stats: Array<[string, string, string, string]>;
  headers: Array<[string, string]>;
  rows: string[][];
  rowsEn: string[][];
  chart: { kind: "trend" | "bar" | "split"; data: Array<[string, string, number]> };
};

const CONFIG: Record<AdminFeature, Config> = {
  dashboard: {
    pageKey: "admin_dashboard",
    icon: "LayoutDashboard",
    title: ["لوحة إدارة Academia", "Academia admin dashboard"],
    subtitle: [
      "مؤشرات تشغيل المنصة والمراجعات التي تحتاج قراراً.",
      "Platform operations and reviews requiring a decision.",
    ],
    stats: [
      ["Users", "المستخدمون", "Users", "18,420"],
      ["Presentation", "المعلمون الموثقون", "Verified teachers", "326"],
      ["BookOpenCheck", "الكورسات النشطة", "Active courses", "184"],
      ["Flag", "بلاغات مفتوحة", "Open reports", "12"],
    ],
    headers: [
      ["المهمة", "Task"],
      ["القسم", "Area"],
      ["الحالة", "Status"],
    ],
    rows: [
      ["مراجعة 8 طلبات توثيق", "المعلمون", "بانتظار القرار"],
      ["اعتماد تحديث منهاج الفيزياء", "المنهاج", "جديد"],
      ["تدقيق 4 بلاغات مجتمع", "الأمان", "عاجل"],
    ],
    rowsEn: [
      ["Review 8 verification requests", "Teachers", "Awaiting decision"],
      ["Approve physics curriculum update", "Curriculum", "New"],
      ["Triage 4 community reports", "Safety", "Urgent"],
    ],
    chart: {
      kind: "trend",
      data: [
        ["يناير", "Jan", 1240],
        ["فبراير", "Feb", 1680],
        ["مارس", "Mar", 2140],
        ["أبريل", "Apr", 2620],
        ["مايو", "May", 3180],
        ["يونيو", "Jun", 3910],
      ],
    },
  },
  teachers: {
    pageKey: "admin_teachers",
    icon: "BadgeCheck",
    title: ["توثيق المعلمين", "Teacher verification"],
    subtitle: [
      "مراجعة هوية المعلم وتخصصه ووثائقه قبل تفعيل النشر.",
      "Review teacher identity, specialty, and documents before publishing is enabled.",
    ],
    stats: [
      ["Inbox", "طلبات جديدة", "New requests", "8"],
      ["BadgeCheck", "موثقون", "Verified", "326"],
      ["Clock", "متوسط المراجعة", "Average review", "18h"],
      ["ShieldAlert", "تحتاج استكمال", "Need details", "3"],
    ],
    headers: [
      ["المعلم", "Teacher"],
      ["التخصص", "Specialty"],
      ["تاريخ الطلب", "Requested"],
      ["الحالة", "Status"],
    ],
    rows: [
      ["سارة الحسن", "رياضيات", "5 أغسطس 2026", "قيد المراجعة"],
      ["محمد العلي", "فيزياء", "4 أغسطس 2026", "مكتمل"],
      ["ريم خالد", "لغة عربية", "4 أغسطس 2026", "ينقص مستند"],
    ],
    rowsEn: [
      ["Sara Al-Hasan", "Mathematics", "Aug 5, 2026", "In review"],
      ["Mohammed Al-Ali", "Physics", "Aug 4, 2026", "Complete"],
      ["Reem Khaled", "Arabic", "Aug 4, 2026", "Missing document"],
    ],
    chart: {
      kind: "bar",
      data: [
        ["جديدة", "New", 8],
        ["مكتملة", "Complete", 21],
        ["ناقصة", "Incomplete", 3],
        ["مرفوضة", "Rejected", 2],
      ],
    },
  },
  "content-review": {
    pageKey: "admin_content_review",
    icon: "FileSearch",
    title: ["مراجعة المحتوى", "Content review"],
    subtitle: [
      "مراجعة الكورسات والدروس والاختبارات قبل إتاحتها للطلاب.",
      "Review courses, lessons, and quizzes before student release.",
    ],
    stats: [
      ["FileStack", "بالطابور", "In queue", "23"],
      ["BookOpenCheck", "كورسات", "Courses", "7"],
      ["ListChecks", "اختبارات", "Quizzes", "11"],
      ["CircleCheck", "اعتمد اليوم", "Approved today", "18"],
    ],
    headers: [
      ["المحتوى", "Content"],
      ["المعلم", "Teacher"],
      ["النوع", "Type"],
      ["الحالة", "Status"],
    ],
    rows: [
      ["التفاضل — الوحدة الثانية", "أحمد يوسف", "درس", "جديد"],
      ["اختبار الكهرباء", "لينا سمير", "اختبار", "مراجعة ثانية"],
      ["الكيمياء العضوية", "ياسر علي", "كورس", "جاهز للاعتماد"],
    ],
    rowsEn: [
      ["Calculus — Unit 2", "Ahmed Youssef", "Lesson", "New"],
      ["Electricity quiz", "Lina Samir", "Quiz", "Second review"],
      ["Organic chemistry", "Yasser Ali", "Course", "Ready to approve"],
    ],
    chart: {
      kind: "bar",
      data: [
        ["دروس", "Lessons", 12],
        ["اختبارات", "Quizzes", 11],
        ["كورسات", "Courses", 7],
        ["ملفات", "Files", 9],
      ],
    },
  },
  "community-reports": {
    pageKey: "admin_community_reports",
    icon: "Flag",
    title: ["بلاغات المجتمع", "Community reports"],
    subtitle: [
      "فرز البلاغات وحماية مساحات النقاش التعليمية.",
      "Triage reports and protect educational discussions.",
    ],
    stats: [
      ["Flag", "مفتوحة", "Open", "12"],
      ["ShieldAlert", "عالية الأولوية", "High priority", "2"],
      ["CircleCheck", "أغلقت اليوم", "Closed today", "9"],
      ["Timer", "متوسط الاستجابة", "Response time", "42m"],
    ],
    headers: [
      ["البلاغ", "Report"],
      ["المجتمع", "Community"],
      ["السبب", "Reason"],
      ["الأولوية", "Priority"],
    ],
    rows: [
      ["#R-1042", "رياضيات الثانوية", "محتوى غير مناسب", "عالية"],
      ["#R-1041", "مجتمع الفيزياء", "إزعاج متكرر", "متوسطة"],
      ["#R-1038", "اللغة العربية", "معلومة مضللة", "متوسطة"],
    ],
    rowsEn: [
      ["#R-1042", "High-school math", "Inappropriate content", "High"],
      ["#R-1041", "Physics community", "Repeated spam", "Medium"],
      ["#R-1038", "Arabic language", "Misleading information", "Medium"],
    ],
    chart: {
      kind: "split",
      data: [
        ["مفتوحة", "Open", 12],
        ["مغلقة", "Closed", 34],
        ["مؤجلة", "Deferred", 5],
      ],
    },
  },
  users: {
    pageKey: "admin_users",
    icon: "Users2",
    title: ["المستخدمون", "Users"],
    subtitle: [
      "إدارة حسابات الطلاب والمعلمين وأولياء الأمور وحالتها.",
      "Manage student, teacher, and parent accounts and status.",
    ],
    stats: [
      ["Users", "الإجمالي", "Total", "18,420"],
      ["GraduationCap", "طلاب", "Students", "15,770"],
      ["Presentation", "معلمون", "Teachers", "412"],
      ["UsersRound", "أولياء أمور", "Parents", "2,238"],
    ],
    headers: [
      ["المستخدم", "User"],
      ["الدور", "Role"],
      ["آخر نشاط", "Last active"],
      ["الحالة", "Status"],
    ],
    rows: [
      ["نور الخطيب", "طالب", "منذ 4 دقائق", "نشط"],
      ["محمود سليمان", "معلم", "منذ ساعة", "نشط"],
      ["هدى كريم", "ولي أمر", "أمس", "موقوف"],
    ],
    rowsEn: [
      ["Nour Al-Khatib", "Student", "4 minutes ago", "Active"],
      ["Mahmoud Sulaiman", "Teacher", "1 hour ago", "Active"],
      ["Huda Karim", "Parent", "Yesterday", "Suspended"],
    ],
    chart: {
      kind: "split",
      data: [
        ["طلاب", "Students", 15770],
        ["معلمون", "Teachers", 412],
        ["أولياء أمور", "Parents", 2238],
      ],
    },
  },
  payments: {
    pageKey: "admin_payments",
    icon: "CreditCard",
    title: ["المدفوعات", "Payments"],
    subtitle: [
      "متابعة الاشتراكات ومبيعات الكورسات ومستحقات المعلمين.",
      "Track subscriptions, course sales, and teacher payouts.",
    ],
    stats: [
      ["Wallet", "إيراد الشهر", "Monthly revenue", "$48,260"],
      ["Receipt", "عمليات ناجحة", "Successful", "1,284"],
      ["RotateCcw", "مستردة", "Refunded", "14"],
      ["Clock", "دفعات معلقة", "Pending payouts", "21"],
    ],
    headers: [
      ["العملية", "Transaction"],
      ["المستخدم", "User"],
      ["القيمة", "Amount"],
      ["الحالة", "Status"],
    ],
    rows: [
      ["#PAY-9281", "عمر سليم", "$49", "ناجحة"],
      ["#PAY-9280", "سارة كامل", "$89", "قيد المعالجة"],
      ["#PAY-9274", "ليان أحمد", "$29", "مستردة"],
    ],
    rowsEn: [
      ["#PAY-9281", "Omar Salim", "$49", "Successful"],
      ["#PAY-9280", "Sara Kamel", "$89", "Processing"],
      ["#PAY-9274", "Layan Ahmed", "$29", "Refunded"],
    ],
    chart: {
      kind: "trend",
      data: [
        ["مارس", "Mar", 28400],
        ["أبريل", "Apr", 33900],
        ["مايو", "May", 41200],
        ["يونيو", "Jun", 44800],
        ["يوليو", "Jul", 48260],
      ],
    },
  },
  roles: {
    pageKey: "admin_roles",
    icon: "ShieldCheck",
    title: ["الأدوار والصلاحيات", "Roles and permissions"],
    subtitle: [
      "الأدوار الخمسة المعتمدة ومساحات الوصول المنفصلة لكل دور.",
      "The five approved roles and their isolated access spaces.",
    ],
    stats: [
      ["Shield", "الأدوار", "Roles", "5"],
      ["PanelLeft", "مساحات منفصلة", "Isolated spaces", "5"],
      ["KeyRound", "أدوات صلاحية", "Permission actions", "9"],
      ["CircleCheck", "العزل", "Isolation", "مفعّل"],
    ],
    headers: [
      ["الدور", "Role"],
      ["المساحة", "Space"],
      ["المستخدمون", "Users"],
      ["الحالة", "Status"],
    ],
    rows: [
      ["طالب", "/dashboard", "15,770", "مفعّل"],
      ["معلم", "/teacher/dashboard", "412", "مفعّل"],
      ["ولي أمر", "/parent/report", "2,238", "مفعّل"],
      ["مشرف أكاديمي", "/supervisor/dashboard", "14", "مفعّل"],
      ["مدير عام", "/admin/dashboard", "3", "مفعّل"],
    ],
    rowsEn: [
      ["Student", "/dashboard", "15,770", "Enabled"],
      ["Teacher", "/teacher/dashboard", "412", "Enabled"],
      ["Parent", "/parent/report", "2,238", "Enabled"],
      ["Academic supervisor", "/supervisor/dashboard", "14", "Enabled"],
      ["Administrator", "/admin/dashboard", "3", "Enabled"],
    ],
    chart: {
      kind: "bar",
      data: [
        ["طالب", "Student", 15770],
        ["معلم", "Teacher", 412],
        ["ولي أمر", "Parent", 2238],
        ["مشرف", "Supervisor", 14],
        ["مدير", "Admin", 3],
      ],
    },
  },
  curriculum: {
    pageKey: "admin_curriculum",
    icon: "BookMarked",
    title: ["المنهاج الأكاديمي", "Academic curriculum"],
    subtitle: [
      "هيكل الصفوف والمجموعات والمواد والكورسات والوحدات وفق مخطط البيانات.",
      "Grades, groups, subjects, courses, and modules aligned with the data model.",
    ],
    stats: [
      ["School", "الصفوف", "Grades", "12"],
      ["UsersRound", "المجموعات", "Groups", "36"],
      ["BookMarked", "المواد", "Subjects", "42"],
      ["FileStack", "الوحدات", "Modules", "684"],
    ],
    headers: [
      ["الصف", "Grade"],
      ["المجموعة", "Group"],
      ["المادة", "Subject"],
      ["الكورسات", "Courses"],
    ],
    rows: [
      ["الثاني عشر", "العلمي", "الفيزياء", "8"],
      ["الثاني عشر", "العلمي", "الرياضيات", "11"],
      ["الحادي عشر", "الأدبي", "اللغة العربية", "6"],
    ],
    rowsEn: [
      ["Grade 12", "Science", "Physics", "8"],
      ["Grade 12", "Science", "Mathematics", "11"],
      ["Grade 11", "Literary", "Arabic", "6"],
    ],
    chart: {
      kind: "bar",
      data: [
        ["الصفوف", "Grades", 12],
        ["المجموعات", "Groups", 36],
        ["المواد", "Subjects", 42],
        ["الوحدات", "Modules", 684],
      ],
    },
  },
  "curriculum-requests": {
    pageKey: "admin_curriculum_requests",
    icon: "Inbox",
    title: ["طلبات المنهاج", "Curriculum requests"],
    subtitle: [
      "طلبات إضافة أو تعديل الصفوف والمواد والوحدات التعليمية.",
      "Requests to add or amend grades, subjects, and learning modules.",
    ],
    stats: [
      ["Inbox", "جديدة", "New", "9"],
      ["FileSearch", "قيد الدراسة", "In review", "6"],
      ["CircleCheck", "معتمدة", "Approved", "31"],
      ["XCircle", "مرفوضة", "Rejected", "4"],
    ],
    headers: [
      ["الطلب", "Request"],
      ["مقدّم الطلب", "Requester"],
      ["الكيان", "Entity"],
      ["الحالة", "Status"],
    ],
    rows: [
      ["إضافة وحدة الموجات", "د. خالد عمر", "وحدة", "جديد"],
      ["تحديث ترتيب الكيمياء", "سلمى حسن", "مادة", "قيد الدراسة"],
      ["إضافة مجموعة أدبي", "المشرف الأكاديمي", "مجموعة", "جاهز للاعتماد"],
    ],
    rowsEn: [
      ["Add waves module", "Dr. Khaled Omar", "Module", "New"],
      ["Reorder chemistry units", "Salma Hasan", "Subject", "In review"],
      ["Add literary group", "Academic supervisor", "Group", "Ready to approve"],
    ],
    chart: {
      kind: "split",
      data: [
        ["جديدة", "New", 9],
        ["قيد الدراسة", "In review", 6],
        ["معتمدة", "Approved", 31],
        ["مرفوضة", "Rejected", 4],
      ],
    },
  },
  settings: {
    pageKey: "admin_settings",
    icon: "SlidersHorizontal",
    title: ["إعدادات المنصة", "Platform settings"],
    subtitle: [
      "سياسات التسجيل والمحتوى والإشعارات على مستوى Academia.",
      "Academia-wide registration, content, and notification policies.",
    ],
    stats: [
      ["Languages", "اللغات", "Languages", "2"],
      ["Palette", "الثيمات", "Themes", "3"],
      ["Timer", "مهلة الخمول", "Idle timeout", "2h"],
      ["ShieldCheck", "توثيق المعلم", "Teacher review", "مطلوب"],
    ],
    headers: [
      ["الإعداد", "Setting"],
      ["النطاق", "Scope"],
      ["القيمة", "Value"],
      ["الحالة", "Status"],
    ],
    rows: [
      ["تأكيد البريد", "الحسابات", "إلزامي", "مفعّل"],
      ["مراجعة محتوى المعلم", "النشر", "قبل الإتاحة", "مفعّل"],
      ["لغة الواجهة الافتراضية", "الواجهة", "العربية", "مفعّل"],
    ],
    rowsEn: [
      ["Email confirmation", "Accounts", "Required", "Enabled"],
      ["Teacher content review", "Publishing", "Before release", "Enabled"],
      ["Default interface language", "Interface", "Arabic", "Enabled"],
    ],
    chart: {
      kind: "bar",
      data: [
        ["الحسابات", "Accounts", 6],
        ["النشر", "Publishing", 4],
        ["الإشعارات", "Notifications", 5],
        ["الأمان", "Security", 7],
      ],
    },
  },
};

export function AdminFeaturePage({ feature }: { feature: AdminFeature }) {
  const bi = useBi();
  const config = CONFIG[feature];
  const [query, setQuery] = useState("");
  const sourceRows = bi(config.rows, config.rowsEn);
  const visibleRows = useMemo(
    () =>
      sourceRows.filter((row) =>
        row.some((cell) => cell.toLowerCase().includes(query.trim().toLowerCase())),
      ),
    [sourceRows, query],
  );
  const chartData = config.chart.data.map(([ar, en, value]) => ({ label: bi(ar, en), value }));

  return (
    <Guard pageKey={config.pageKey}>
      <AppPage title={bi(...config.title)} icon={config.icon} subtitle={bi(...config.subtitle)}>
        <StatGrid
          items={config.stats.map(([icon, ar, en, value]) => ({ icon, label: bi(ar, en), value }))}
        />
        <Panel
          title={bi("مؤشرات مرئية", "Visual insights")}
          icon="ChartSpline"
          action={<Badge tone="primary">{bi("آخر 6 فترات", "Last 6 periods")}</Badge>}
        >
          {config.chart.kind === "trend" && <TrendChart data={chartData} />}
          {config.chart.kind === "bar" && <ComparisonChart data={chartData} />}
          {config.chart.kind === "split" && <SplitChart data={chartData} />}
        </Panel>
        <Panel
          title={bi("السجل التشغيلي", "Operational records")}
          icon={config.icon}
          action={<Badge tone="success">{bi("محدّث", "Current")}</Badge>}
        >
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <div className="relative min-w-52 flex-1">
              <Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={bi("بحث في السجل", "Search records")}
                className="ps-9"
              />
            </div>
            <Button variant="outline" size="icon" title={bi("الفلاتر", "Filters")}>
              <SlidersHorizontal className="size-4" />
            </Button>
          </div>
          <DataTable head={config.headers.map(([ar, en]) => bi(ar, en))} rows={visibleRows} />
        </Panel>
      </AppPage>
    </Guard>
  );
}
