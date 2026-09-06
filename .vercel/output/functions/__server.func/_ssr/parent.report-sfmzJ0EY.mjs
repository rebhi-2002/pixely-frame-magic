import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { k as useBi } from "./rbac-static-data-Bv6QEjHq.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { H as LoaderCircle } from "../_libs/lucide-react.mjs";
import { v as description$16 } from "./router-D9hWsH17.mjs";
import { n as useServerFn } from "./createSsrRpc-Deneh4is.mjs";
import { n as Guard } from "./guard-Dpfucbbc.mjs";
import { a as Panel, c as RowList, i as EmptyState, l as StatGrid, o as Progress, t as AppPage } from "./kit-DhXVWrh8.mjs";
import { i as WelcomeBanner, r as TrendChart } from "./charts-DyUNAwSg.mjs";
import { i as getChildReport } from "./supervisor-oversight.functions-BQYJ6ek4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/parent.report-sfmzJ0EY.js
var import_jsx_runtime = require_jsx_runtime();
function PageRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Guard, {
		pageKey: "parent_report",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, {})
	});
}
function Body() {
	const bi = useBi();
	const fetchReport = useServerFn(getChildReport);
	const { data: report, isLoading } = useQuery({
		queryKey: ["child-report"],
		queryFn: () => fetchReport()
	});
	if (isLoading || !report) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppPage, {
		title: bi("تقرير الابن", "Child report"),
		icon: "FileBarChart",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex justify-center py-16",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-6 animate-spin text-primary" })
		})
	});
	const avgExamScore = report.examAttempts.length ? Math.round(report.examAttempts.reduce((s, a) => s + a.scorePercent, 0) / report.examAttempts.length) : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppPage, {
		title: bi("تقرير الابن", "Child report"),
		icon: "FileBarChart",
		subtitle: bi(description$16, "A clear weekly report: consistency, mastery and weak spots — no vanity metrics."),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WelcomeBanner, {
				subtitle: ["تابع التزام ابنك وإتقانه أسبوعيًا، بدون أرقام مضلّلة — بس الصورة الواقعية.", "Follow your child's consistency and mastery weekly — no vanity metrics, just the real picture."],
				tip: ["تقرير هالأسبوع جاهز", "This week's report is ready"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatGrid, { items: [
				{
					icon: "User",
					label: bi("الابن المتابَع", "Child"),
					value: report.childName
				},
				{
					icon: "Flame",
					label: bi("أيام دراسة", "Study days"),
					value: `${report.studyDaysCount}/7`
				},
				{
					icon: "Percent",
					label: bi("متوسط الإتقان", "Avg. mastery"),
					value: `${report.avgMastery}%`
				},
				{
					icon: "AlertTriangle",
					label: bi("مواد تحتاج دعم", "Needs support"),
					value: String(report.weakSubjectsCount)
				}
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: bi("دقائق الدراسة هذا الأسبوع", "Study minutes this week"),
				icon: "ChartSpline",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendChart, { data: report.weeklyLog.map((d) => ({
					label: bi(...d.day),
					value: d.minutes
				})) })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: bi("إتقان المواد", "Subject mastery"),
				icon: "LineChart",
				children: report.subjects.length ? report.subjects.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
					label: s.subjectName,
					value: s.progressPercent
				}, s.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					icon: "LineChart",
					text: bi("لا مواد مسجّلة بعد.", "No subjects logged yet.")
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: bi("ملخّص الأسبوع", "Week summary"),
				icon: "Activity",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowList, { rows: [
					{
						title: bi("دقائق الدراسة", "Study minutes"),
						meta: bi(`${report.totalMinutes} دقيقة هذا الأسبوع`, `${report.totalMinutes} minutes this week`),
						value: `${report.studyDaysCount}/7`,
						tone: "success"
					},
					{
						title: bi("امتحانات تدريبية", "Mock exams"),
						meta: bi(`${report.examAttempts.length} امتحانات`, `${report.examAttempts.length} exams`),
						value: `${avgExamScore}%`,
						tone: "primary"
					},
					...report.priorityMistakes.map((m) => ({
						title: bi(`${m.subjectName} تحتاج متابعة`, `${m.subjectName} needs attention`),
						meta: m.questionTitle,
						value: bi("تنبيه", "Alert"),
						tone: "danger"
					}))
				] })
			})
		]
	});
}
//#endregion
export { PageRoute as component };
