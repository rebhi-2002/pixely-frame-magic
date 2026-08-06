import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Guard } from "@/components/app/guard";
import { AppPage, Badge, DataTable, Panel, StatGrid } from "@/components/app/kit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useBi } from "@/lib/bi";

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
};

const CONFIG: Record<AdminFeature, Config> = {
  dashboard: {
    pageKey: "admin_dashboard", icon: "LayoutDashboard",
    title: ["لوحة إدارة Academia", "Academia admin dashboard"],
    subtitle: ["مؤشرات تشغيل المنصة والمراجعات التي تحتاج قراراً.", "Platform operations and reviews requiring a decision."],
    stats: [["Users", "المستخدمون", "Users", "18,420"], ["Presentation", "المعلمون الموثقون", "Verified teachers", "326"], ["BookOpenCheck", "الكورسات النشطة", "Active courses", "184"], ["Flag", "بلاغات مفتوحة", "Open reports", "12"]],
    headers: [["المهمة", "Task"], ["القسم", "Area"], ["الحالة", "Status"]],
    rows: [["مراجعة 8 طلبات توثيق", "المعلمون", "بانتظار القرار"], ["اعتماد تحديث منهاج الفيزياء", "المنهاج", "جديد"], ["تدقيق 4 بلاغات مجتمع", "الأمان", "عاجل"]],
  },
  teachers: {
    pageKey: "admin_teachers", icon: "BadgeCheck",
    title: ["توثيق المعلمين", "Teacher verification"],
    subtitle: ["مراجعة هوية المعلم وتخصصه ووثائقه قبل تفعيل النشر.", "Review teacher identity, specialty, and documents before publishing is enabled."],
    stats: [["Inbox", "طلبات جديدة", "New requests", "8"], ["BadgeCheck", "موثقون", "Verified", "326"], ["Clock", "متوسط المراجعة", "Average review", "18h"], ["ShieldAlert", "تحتاج استكمال", "Need details", "3"]],
    headers: [["المعلم", "Teacher"], ["التخصص", "Specialty"], ["تاريخ الطلب", "Requested"], ["الحالة", "Status"]],
    rows: [["سارة الحسن", "رياضيات", "5 أغسطس 2026", "قيد المراجعة"], ["محمد العلي", "فيزياء", "4 أغسطس 2026", "مكتمل"], ["ريم خالد", "لغة عربية", "4 أغسطس 2026", "ينقص مستند"]],
  },
  "content-review": {
    pageKey: "admin_content_review", icon: "FileSearch",
    title: ["مراجعة المحتوى", "Content review"],
    subtitle: ["مراجعة الكورسات والدروس والاختبارات قبل إتاحتها للطلاب.", "Review courses, lessons, and quizzes before student release."],
    stats: [["FileStack", "بالطابور", "In queue", "23"], ["BookOpenCheck", "كورسات", "Courses", "7"], ["ListChecks", "اختبارات", "Quizzes", "11"], ["CircleCheck", "اعتمد اليوم", "Approved today", "18"]],
    headers: [["المحتوى", "Content"], ["المعلم", "Teacher"], ["النوع", "Type"], ["الحالة", "Status"]],
    rows: [["التفاضل — الوحدة الثانية", "أحمد يوسف", "درس", "جديد"], ["اختبار الكهرباء", "لينا سمير", "اختبار", "مراجعة ثانية"], ["الكيمياء العضوية", "ياسر علي", "كورس", "جاهز للاعتماد"]],
  },
  "community-reports": {
    pageKey: "admin_community_reports", icon: "Flag",
    title: ["بلاغات المجتمع", "Community reports"],
    subtitle: ["فرز البلاغات وحماية مساحات النقاش التعليمية.", "Triage reports and protect educational discussions."],
    stats: [["Flag", "مفتوحة", "Open", "12"], ["ShieldAlert", "عالية الأولوية", "High priority", "2"], ["CircleCheck", "أغلقت اليوم", "Closed today", "9"], ["Timer", "متوسط الاستجابة", "Response time", "42m"]],
    headers: [["البلاغ", "Report"], ["المجتمع", "Community"], ["السبب", "Reason"], ["الأولوية", "Priority"]],
    rows: [["#R-1042", "رياضيات الثانوية", "محتوى غير مناسب", "عالية"], ["#R-1041", "مجتمع الفيزياء", "إزعاج متكرر", "متوسطة"], ["#R-1038", "اللغة العربية", "معلومة مضللة", "متوسطة"]],
  },
  users: {
    pageKey: "admin_users", icon: "Users2",
    title: ["المستخدمون", "Users"],
    subtitle: ["إدارة حسابات الطلاب والمعلمين وأولياء الأمور وحالتها.", "Manage student, teacher, and parent accounts and status."],
    stats: [["Users", "الإجمالي", "Total", "18,420"], ["GraduationCap", "طلاب", "Students", "15,770"], ["Presentation", "معلمون", "Teachers", "412"], ["UsersRound", "أولياء أمور", "Parents", "2,238"]],
    headers: [["المستخدم", "User"], ["الدور", "Role"], ["آخر نشاط", "Last active"], ["الحالة", "Status"]],
    rows: [["نور الخطيب", "طالب", "منذ 4 دقائق", "نشط"], ["محمود سليمان", "معلم", "منذ ساعة", "نشط"], ["هدى كريم", "ولي أمر", "أمس", "موقوف"]],
  },
  payments: {
    pageKey: "admin_payments", icon: "CreditCard",
    title: ["المدفوعات", "Payments"],
    subtitle: ["متابعة الاشتراكات ومبيعات الكورسات ومستحقات المعلمين.", "Track subscriptions, course sales, and teacher payouts."],
    stats: [["Wallet", "إيراد الشهر", "Monthly revenue", "$48,260"], ["Receipt", "عمليات ناجحة", "Successful", "1,284"], ["RotateCcw", "مستردة", "Refunded", "14"], ["Clock", "دفعات معلقة", "Pending payouts", "21"]],
    headers: [["العملية", "Transaction"], ["المستخدم", "User"], ["القيمة", "Amount"], ["الحالة", "Status"]],
    rows: [["#PAY-9281", "عمر سليم", "$49", "ناجحة"], ["#PAY-9280", "سارة كامل", "$89", "قيد المعالجة"], ["#PAY-9274", "ليان أحمد", "$29", "مستردة"]],
  },
  roles: {
    pageKey: "admin_roles", icon: "ShieldCheck",
    title: ["الأدوار والصلاحيات", "Roles and permissions"],
    subtitle: ["الأدوار الخمسة المعتمدة ومساحات الوصول المنفصلة لكل دور.", "The five approved roles and their isolated access spaces."],
    stats: [["Shield", "الأدوار", "Roles", "5"], ["PanelLeft", "مساحات منفصلة", "Isolated spaces", "5"], ["KeyRound", "أدوات صلاحية", "Permission actions", "9"], ["CircleCheck", "العزل", "Isolation", "مفعّل"]],
    headers: [["الدور", "Role"], ["المساحة", "Space"], ["المستخدمون", "Users"], ["الحالة", "Status"]],
    rows: [["طالب", "/dashboard", "15,770", "مفعّل"], ["معلم", "/teacher/dashboard", "412", "مفعّل"], ["ولي أمر", "/parent/report", "2,238", "مفعّل"], ["مشرف أكاديمي", "/supervisor/dashboard", "14", "مفعّل"], ["مدير عام", "/admin/dashboard", "3", "مفعّل"]],
  },
  curriculum: {
    pageKey: "admin_curriculum", icon: "BookMarked",
    title: ["المنهاج الأكاديمي", "Academic curriculum"],
    subtitle: ["هيكل الصفوف والمجموعات والمواد والكورسات والوحدات وفق مخطط البيانات.", "Grades, groups, subjects, courses, and modules aligned with the data model."],
    stats: [["School", "الصفوف", "Grades", "12"], ["UsersRound", "المجموعات", "Groups", "36"], ["BookMarked", "المواد", "Subjects", "42"], ["FileStack", "الوحدات", "Modules", "684"]],
    headers: [["الصف", "Grade"], ["المجموعة", "Group"], ["المادة", "Subject"], ["الكورسات", "Courses"]],
    rows: [["الثاني عشر", "العلمي", "الفيزياء", "8"], ["الثاني عشر", "العلمي", "الرياضيات", "11"], ["الحادي عشر", "الأدبي", "اللغة العربية", "6"]],
  },
  "curriculum-requests": {
    pageKey: "admin_curriculum_requests", icon: "Inbox",
    title: ["طلبات المنهاج", "Curriculum requests"],
    subtitle: ["طلبات إضافة أو تعديل الصفوف والمواد والوحدات التعليمية.", "Requests to add or amend grades, subjects, and learning modules."],
    stats: [["Inbox", "جديدة", "New", "9"], ["FileSearch", "قيد الدراسة", "In review", "6"], ["CircleCheck", "معتمدة", "Approved", "31"], ["XCircle", "مرفوضة", "Rejected", "4"]],
    headers: [["الطلب", "Request"], ["مقدّم الطلب", "Requester"], ["الكيان", "Entity"], ["الحالة", "Status"]],
    rows: [["إضافة وحدة الموجات", "د. خالد عمر", "وحدة", "جديد"], ["تحديث ترتيب الكيمياء", "سلمى حسن", "مادة", "قيد الدراسة"], ["إضافة مجموعة أدبي", "المشرف الأكاديمي", "مجموعة", "جاهز للاعتماد"]],
  },
  settings: {
    pageKey: "admin_settings", icon: "SlidersHorizontal",
    title: ["إعدادات المنصة", "Platform settings"],
    subtitle: ["سياسات التسجيل والمحتوى والإشعارات على مستوى Academia.", "Academia-wide registration, content, and notification policies."],
    stats: [["Languages", "اللغات", "Languages", "2"], ["Palette", "الثيمات", "Themes", "3"], ["Timer", "مهلة الخمول", "Idle timeout", "2h"], ["ShieldCheck", "توثيق المعلم", "Teacher review", "مطلوب"]],
    headers: [["الإعداد", "Setting"], ["النطاق", "Scope"], ["القيمة", "Value"], ["الحالة", "Status"]],
    rows: [["تأكيد البريد", "الحسابات", "إلزامي", "مفعّل"], ["مراجعة محتوى المعلم", "النشر", "قبل الإتاحة", "مفعّل"], ["لغة الواجهة الافتراضية", "الواجهة", "العربية", "مفعّل"]],
  },
};

export function AdminFeaturePage({ feature }: { feature: AdminFeature }) {
  const bi = useBi();
  const config = CONFIG[feature];
  const [query, setQuery] = useState("");
  const visibleRows = useMemo(
    () => config.rows.filter((row) => row.some((cell) => cell.toLowerCase().includes(query.trim().toLowerCase()))),
    [config.rows, query],
  );

  return (
    <Guard pageKey={config.pageKey}>
      <AppPage title={bi(...config.title)} icon={config.icon} subtitle={bi(...config.subtitle)}>
        <StatGrid items={config.stats.map(([icon, ar, en, value]) => ({ icon, label: bi(ar, en), value }))} />
        <Panel
          title={bi("السجل التشغيلي", "Operational records")}
          icon={config.icon}
          action={<Badge tone="success">{bi("محدّث", "Current")}</Badge>}
        >
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <div className="relative min-w-52 flex-1">
              <Search className="pointer-events-none absolute inset-inline-start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={bi("بحث في السجل", "Search records")} className="ps-9" />
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