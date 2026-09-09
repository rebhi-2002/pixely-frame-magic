import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { k as useBi } from "./rbac-static-data-JRz-nJtL.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { Y as LoaderCircle } from "../_libs/lucide-react.mjs";
import { h as description$14 } from "./router-B49B_5De.mjs";
import { n as useServerFn } from "./createSsrRpc-C7KQUoXf.mjs";
import { n as Guard } from "./guard-DJBJLisT.mjs";
import { a as Panel, c as RowList, i as EmptyState, l as StatGrid, s as QuickLinks, t as AppPage } from "./kit-BNtAyy6W.mjs";
import { i as WelcomeBanner, t as ComparisonChart } from "./charts-V7h_Csbr.mjs";
import { c as listTeacherPerformance, o as listStudentRisk, s as listSupervisionReports } from "./supervisor-oversight.functions-BdW2KnWU.mjs";
import { i as listContentItems } from "./teacher-teaching.functions-BLTg4uZU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/supervisor.dashboard-BAYft_Rk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PageRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Guard, {
		pageKey: "supervisor_dashboard",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, {})
	});
}
function Body() {
	const bi = useBi();
	const fetchTeachers = useServerFn(listTeacherPerformance);
	const fetchStudents = useServerFn(listStudentRisk);
	const fetchContent = useServerFn(listContentItems);
	const fetchReports = useServerFn(listSupervisionReports);
	const teachersQuery = useQuery({
		queryKey: ["teacher-performance"],
		queryFn: () => fetchTeachers()
	});
	const studentsQuery = useQuery({
		queryKey: ["student-risk"],
		queryFn: () => fetchStudents()
	});
	const contentQuery = useQuery({
		queryKey: ["teacher-content"],
		queryFn: () => fetchContent()
	});
	const reportsQuery = useQuery({
		queryKey: ["supervision-reports"],
		queryFn: () => fetchReports()
	});
	const isLoading = teachersQuery.isLoading || studentsQuery.isLoading || contentQuery.isLoading || reportsQuery.isLoading;
	const teachers = teachersQuery.data ?? [];
	const students = studentsQuery.data ?? [];
	const content = contentQuery.data ?? [];
	const totalStudents = teachers.reduce((s, t) => s + t.studentsCount, 0);
	const delayedTeachers = teachers.filter((t) => t.status === "تأخر تصحيح");
	const atRiskStudents = students.filter((s) => s.status === "متعثّر");
	const pendingContent = content.filter((c) => c.status === "قيد المراجعة");
	const qualityAlerts = delayedTeachers.length + atRiskStudents.length;
	const avgMastery = students.length ? Math.round(100 - students.reduce((s, r) => s + r.weakestPercent, 0) / students.length) : 0;
	const byGrade = (0, import_react.useMemo)(() => {
		const totals = /* @__PURE__ */ new Map();
		for (const s of students) {
			const cur = totals.get(s.gradeLabel) ?? {
				sum: 0,
				count: 0
			};
			cur.sum += s.weakestPercent;
			cur.count += 1;
			totals.set(s.gradeLabel, cur);
		}
		return Array.from(totals.entries()).map(([label, v]) => ({
			label,
			value: Math.round(v.sum / v.count)
		}));
	}, [students]);
	const alerts = [];
	for (const t of delayedTeachers) alerts.push({
		title: [`تأخّر تصحيح لدى ${t.teacherName}`, `Grading delay — ${t.teacherName}`],
		meta: [`${t.gradingDays} يوم`, `${t.gradingDays} days`],
		tone: "danger"
	});
	for (const s of atRiskStudents) alerts.push({
		title: [`إتقان منخفض — ${s.weakestSubject} (${s.studentName})`, `Low mastery — ${s.weakestSubject} (${s.studentName})`],
		meta: [`${s.weakestPercent}%`, `${s.weakestPercent}%`],
		tone: "primary"
	});
	if (pendingContent.length) alerts.push({
		title: [`محتوى بانتظار المراجعة`, `Content pending review`],
		meta: [`${pendingContent.length} عناصر`, `${pendingContent.length} items`],
		tone: "muted"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppPage, {
		title: bi("لوحة الإشراف", "Supervision dashboard"),
		icon: "LayoutDashboard",
		subtitle: bi(description$14, "Teaching quality across teachers and classes: alerts, follow-ups and mastery signals."),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WelcomeBanner, {
			subtitle: ["نظرة شاملة على جودة التعليم عبر كل المعلمين والصفوف اليوم.", "A full overview of teaching quality across every teacher and class today."],
			tip: [`${qualityAlerts} تنبيه يحتاج متابعتك`, `${qualityAlerts} alerts need your attention`]
		}), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex justify-center py-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-6 animate-spin text-primary" })
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatGrid, { items: [
				{
					icon: "Presentation",
					label: bi("معلمون", "Teachers"),
					value: String(teachers.length)
				},
				{
					icon: "Users",
					label: bi("طلاب", "Students"),
					value: String(totalStudents)
				},
				{
					icon: "AlertTriangle",
					label: bi("تنبيهات جودة", "Quality alerts"),
					value: String(qualityAlerts)
				},
				{
					icon: "Percent",
					label: bi("متوسط الإتقان", "Avg. mastery"),
					value: students.length ? `${avgMastery}%` : "—"
				}
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: bi("متوسط الإتقان بالصفوف", "Average mastery by grade"),
				icon: "ChartSpline",
				children: byGrade.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComparisonChart, { data: byGrade.map((g) => ({
					label: bi(`صف ${g.label}`, `Grade ${g.label}`),
					value: g.value
				})) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					icon: "ChartSpline",
					text: bi("لا بيانات كافية بعد.", "Not enough data yet.")
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: bi("إجراءات", "Actions"),
				icon: "Zap",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickLinks, { items: [
					{
						to: "/supervisor/teachers",
						label: bi("المعلمون", "Teachers"),
						icon: "Presentation"
					},
					{
						to: "/supervisor/students-overview",
						label: bi("نظرة الطلاب", "Students overview"),
						icon: "Users"
					},
					{
						to: "/supervisor/reports",
						label: bi("التقارير", "Reports"),
						icon: "FileBarChart"
					}
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: bi("تنبيهات تحتاج متابعة", "Alerts to follow up"),
				icon: "AlertTriangle",
				children: alerts.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowList, { rows: alerts.map((a) => ({
					title: bi(...a.title),
					meta: bi(...a.meta),
					tone: a.tone
				})) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					icon: "AlertTriangle",
					text: bi("ولا تنبيه حالياً 🎉", "No alerts right now 🎉")
				})
			})
		] })]
	});
}
//#endregion
export { PageRoute as component };
