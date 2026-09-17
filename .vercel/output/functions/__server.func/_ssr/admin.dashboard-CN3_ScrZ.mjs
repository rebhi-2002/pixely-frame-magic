import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { $ as LoaderCircle } from "../_libs/lucide-react.mjs";
import { yt as useBi } from "./router-DK5KNs7n.mjs";
import { n as useServerFn } from "./createSsrRpc-572OBH4c.mjs";
import { a as listRoles, o as listUsers } from "./use-access-KQVg7Dvq.mjs";
import { n as Guard } from "./guard-BP3o1aU5.mjs";
import { n as Badge, o as Panel, r as DataTable, t as AppPage, u as StatGrid } from "./kit-DhMq0cTG.mjs";
import { a as listContentSubmissions, i as listCommunityReports, o as listTeacherVerifications } from "./admin-moderation.functions-BfI-XPiZ.mjs";
import { a as listPayments, i as listCurriculumSubjects, r as listCurriculumRequests } from "./admin-curriculum.functions-wx6HL5eQ.mjs";
import { i as WelcomeBanner, n as SplitChart, t as ComparisonChart } from "./charts-B35uflzK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.dashboard-CN3_ScrZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminDashboardPage() {
	const bi = useBi();
	const teacherVerifications = useServerFn(listTeacherVerifications);
	const contentSubmissions = useServerFn(listContentSubmissions);
	const communityReports = useServerFn(listCommunityReports);
	const payments = useServerFn(listPayments);
	const curriculumSubjects = useServerFn(listCurriculumSubjects);
	const curriculumRequests = useServerFn(listCurriculumRequests);
	const users = useServerFn(listUsers);
	const roles = useServerFn(listRoles);
	const q1 = useQuery({
		queryKey: ["teacher-verifications"],
		queryFn: () => teacherVerifications()
	});
	const q2 = useQuery({
		queryKey: ["content-submissions"],
		queryFn: () => contentSubmissions()
	});
	const q3 = useQuery({
		queryKey: ["community-reports"],
		queryFn: () => communityReports()
	});
	const q4 = useQuery({
		queryKey: ["payments"],
		queryFn: () => payments()
	});
	const q5 = useQuery({
		queryKey: ["curriculum-subjects"],
		queryFn: () => curriculumSubjects()
	});
	const q6 = useQuery({
		queryKey: ["curriculum-requests"],
		queryFn: () => curriculumRequests()
	});
	const q7 = useQuery({
		queryKey: ["rbac-users"],
		queryFn: () => users()
	});
	const q8 = useQuery({
		queryKey: ["rbac-roles"],
		queryFn: () => roles()
	});
	const verifications = (0, import_react.useMemo)(() => q1.data ?? [], [q1.data]);
	const content = (0, import_react.useMemo)(() => q2.data ?? [], [q2.data]);
	const reports = (0, import_react.useMemo)(() => q3.data ?? [], [q3.data]);
	const payoutRows = (0, import_react.useMemo)(() => q4.data ?? [], [q4.data]);
	const subjects = (0, import_react.useMemo)(() => q5.data ?? [], [q5.data]);
	const requests = (0, import_react.useMemo)(() => q6.data ?? [], [q6.data]);
	const allUsers = (0, import_react.useMemo)(() => q7.data ?? [], [q7.data]);
	const allRoles = (0, import_react.useMemo)(() => q8.data ?? [], [q8.data]);
	if ([
		q1,
		q2,
		q3,
		q4,
		q5,
		q6,
		q7,
		q8
	].some((q) => q.isLoading)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppPage, {
		title: bi("لوحة إدارة Academia", "Academia admin dashboard"),
		icon: "LayoutDashboard",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex justify-center py-16",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-6 animate-spin text-primary" })
		})
	});
	const verifiedTeachers = verifications.filter((r) => r.status === "مكتمل").length;
	const totalCourses = subjects.reduce((sum, s) => sum + s.coursesCount, 0);
	const openReports = reports.filter((r) => r.status === "مفتوح").length;
	const tasks = [];
	const pendingVerifications = verifications.filter((r) => r.status === "قيد المراجعة").length;
	if (pendingVerifications > 0) tasks.push({
		title: [`مراجعة ${pendingVerifications} طلب توثيق`, `Review ${pendingVerifications} verification requests`],
		area: ["المعلمون", "Teachers"],
		tone: "primary"
	});
	const newContent = content.filter((r) => r.status === "جديد").length;
	if (newContent > 0) tasks.push({
		title: [`مراجعة ${newContent} محتوى جديد`, `Review ${newContent} new content items`],
		area: ["المحتوى", "Content"],
		tone: "muted"
	});
	if (openReports > 0) tasks.push({
		title: [`تدقيق ${openReports} بلاغ مجتمع مفتوح`, `Triage ${openReports} open community reports`],
		area: ["الأمان", "Safety"],
		tone: "danger"
	});
	const reviewRequests = requests.filter((r) => r.status === "قيد الدراسة" || r.status === "جاهز للاعتماد").length;
	if (reviewRequests > 0) tasks.push({
		title: [`${reviewRequests} طلب منهاج بانتظار القرار`, `${reviewRequests} curriculum requests awaiting decision`],
		area: ["المنهاج", "Curriculum"],
		tone: "primary"
	});
	const pendingPayments = payoutRows.filter((r) => r.status === "قيد المعالجة").length;
	if (pendingPayments > 0) tasks.push({
		title: [`${pendingPayments} دفعة قيد المعالجة`, `${pendingPayments} payments processing`],
		area: ["المدفوعات", "Payments"],
		tone: "muted"
	});
	const roleDistribution = allRoles.map((r) => ({
		label: r.name,
		value: allUsers.filter((u) => u.role_id === r.id).length
	}));
	const paymentsByStatus = [
		"ناجحة",
		"قيد المعالجة",
		"مستردة",
		"فاشلة"
	].map((status) => ({
		labelAr: status,
		labelEn: status === "ناجحة" ? "Successful" : status === "قيد المعالجة" ? "Processing" : status === "مستردة" ? "Refunded" : "Failed",
		value: payoutRows.filter((p) => p.status === status).length
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppPage, {
		title: bi("لوحة إدارة Academia", "Academia admin dashboard"),
		icon: "LayoutDashboard",
		subtitle: bi("مؤشرات تشغيل المنصة والمراجعات التي تحتاج قراراً — كل رقم محسوب من بيانات حقيقية.", "Platform operations and reviews requiring a decision — every number is computed from real data."),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WelcomeBanner, { subtitle: ["مؤشرات تشغيل المنصة اليوم.", "Today's platform operations at a glance."] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatGrid, { items: [
				{
					icon: "Users",
					label: bi("المستخدمون", "Users"),
					value: String(allUsers.length)
				},
				{
					icon: "Presentation",
					label: bi("المعلمون الموثقون", "Verified teachers"),
					value: String(verifiedTeachers)
				},
				{
					icon: "BookOpenCheck",
					label: bi("الكورسات بالمنهاج", "Courses in curriculum"),
					value: String(totalCourses)
				},
				{
					icon: "Flag",
					label: bi("بلاغات مفتوحة", "Open reports"),
					value: String(openReports)
				}
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: bi("مهام بانتظار القرار", "Tasks awaiting a decision"),
				icon: "ListChecks",
				children: tasks.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
					head: [
						bi("المهمة", "Task"),
						bi("القسم", "Area"),
						bi("الحالة", "Status")
					],
					rows: tasks.map((t) => [
						bi(...t.title),
						bi(...t.area),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: t.tone,
							children: bi("بانتظار القرار", "Pending")
						}, t.title[0])
					])
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "py-6 text-center text-sm text-muted-foreground",
					children: bi("لا توجد مهام بانتظار القرار حالياً 🎉", "No tasks awaiting a decision right now 🎉")
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-5 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: bi("المستخدمون حسب الدور", "Users by role"),
					icon: "Users",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComparisonChart, { data: roleDistribution })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: bi("المدفوعات حسب الحالة", "Payments by status"),
					icon: "Wallet",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SplitChart, { data: paymentsByStatus.map((p) => ({
						label: bi(p.labelAr, p.labelEn),
						value: p.value
					})) })
				})]
			})
		]
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Guard, {
	pageKey: "admin_dashboard",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminDashboardPage, {})
});
//#endregion
export { SplitComponent as component };
