import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { w as useBi } from "./rbac-static-data-g2eybyR5.mjs";
import { n as useServerFn } from "./createSsrRpc-wq0ICmoa.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as Guard } from "./guard-DmupFA9_.mjs";
import { H as LoaderCircle } from "../_libs/lucide-react.mjs";
import { a as Panel, c as RowList, i as EmptyState, l as StatGrid, s as QuickLinks, t as AppPage } from "./kit-DDkPK7fJ.mjs";
import { i as WelcomeBanner, t as ComparisonChart } from "./charts-BCp9Ywrh.mjs";
import { t as description } from "./teacher.dashboard-LJcUv6cG.mjs";
import { a as listOpenClassQuestions, i as listContentItems, o as listQuizItems, s as listTeacherCourses } from "./teacher-teaching.functions-1ie3qREh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/teacher.dashboard-kcwtCdft.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PageRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Guard, {
		pageKey: "teacher_dashboard",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, {})
	});
}
function Body() {
	const bi = useBi();
	const fetchCourses = useServerFn(listTeacherCourses);
	const fetchContent = useServerFn(listContentItems);
	const fetchQuizzes = useServerFn(listQuizItems);
	const fetchQuestions = useServerFn(listOpenClassQuestions);
	const coursesQuery = useQuery({
		queryKey: ["teacher-courses"],
		queryFn: () => fetchCourses()
	});
	const contentQuery = useQuery({
		queryKey: ["teacher-content"],
		queryFn: () => fetchContent()
	});
	const quizzesQuery = useQuery({
		queryKey: ["teacher-quizzes"],
		queryFn: () => fetchQuizzes()
	});
	const questionsQuery = useQuery({
		queryKey: ["open-class-questions"],
		queryFn: () => fetchQuestions()
	});
	const isLoading = coursesQuery.isLoading || contentQuery.isLoading || quizzesQuery.isLoading || questionsQuery.isLoading;
	const courses = coursesQuery.data ?? [];
	const content = contentQuery.data ?? [];
	const quizzes = quizzesQuery.data ?? [];
	const openQuestions = questionsQuery.data ?? [];
	const enrolled = courses.reduce((s, c) => s + c.enrolledCount, 0);
	const revenue = courses.reduce((s, c) => s + c.price * c.enrolledCount, 0);
	const pendingContent = content.filter((c) => c.status === "قيد المراجعة");
	const bySubject = (0, import_react.useMemo)(() => {
		const totals = /* @__PURE__ */ new Map();
		for (const c of content) totals.set(c.subjectName, (totals.get(c.subjectName) ?? 0) + c.viewsCount);
		return Array.from(totals.entries()).map(([label, value]) => ({
			label,
			value
		}));
	}, [content]);
	const tasks = [];
	for (const c of pendingContent) tasks.push({
		title: [`«${c.title}» بانتظار مراجعة المحتوى`, `"${c.title}" pending content review`],
		meta: [c.subjectName, c.subjectName],
		tone: "muted"
	});
	for (const q of openQuestions) tasks.push({
		title: [`سؤال بلا جواب: ${q.questionTitle}`, `Unanswered: ${q.questionTitle}`],
		meta: [q.subjectName, q.subjectName],
		tone: "primary"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppPage, {
		title: bi("لوحة المعلم", "Teacher dashboard"),
		icon: "LayoutDashboard",
		subtitle: bi(description, "Your classes today: what needs grading, questions awaiting you, and student performance."),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WelcomeBanner, {
			subtitle: ["عندك أسئلة بانتظار الرد ومحتوى بانتظار المراجعة — خلّي صفوفك بأفضل حال.", "You have questions waiting and content pending review — keep your classes running smoothly."],
			tip: [`${openQuestions.length} أسئلة جديدة بمجتمع الصف`, `${openQuestions.length} new questions in the class community`]
		}), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex justify-center py-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-6 animate-spin text-primary" })
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatGrid, { items: [
				{
					icon: "Users",
					label: bi("طلابك", "Students"),
					value: String(enrolled)
				},
				{
					icon: "ListChecks",
					label: bi("اختبارات نشطة", "Live quizzes"),
					value: String(quizzes.filter((q) => q.status === "نشط").length)
				},
				{
					icon: "MessagesSquare",
					label: bi("أسئلة بلا جواب", "Unanswered questions"),
					value: String(openQuestions.length)
				},
				{
					icon: "Wallet",
					label: bi("أرباح الشهر", "This month"),
					value: bi(`${revenue} ₪`, `${revenue} ILS`)
				}
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: bi("مشاهدات المحتوى بالمادة", "Content views by subject"),
				icon: "ChartSpline",
				children: bySubject.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComparisonChart, { data: bySubject }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					icon: "ChartSpline",
					text: bi("أضف محتوى عشان تظهر البيانات هون.", "Add content to see data here.")
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: bi("إجراءات سريعة", "Quick actions"),
				icon: "Zap",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickLinks, { items: [
					{
						to: "/teacher/content",
						label: bi("إضافة محتوى", "Add content"),
						icon: "FileStack"
					},
					{
						to: "/teacher/quizzes",
						label: bi("إنشاء اختبار", "Create quiz"),
						icon: "ListChecks"
					},
					{
						to: "/teacher/grading",
						label: bi("ابدأ التصحيح", "Start grading"),
						icon: "PenSquare"
					},
					{
						to: "/teacher/community",
						label: bi("مجتمع الصف", "Class community"),
						icon: "MessagesSquare"
					},
					{
						to: "/teacher/analytics",
						label: bi("التحليلات", "Analytics"),
						icon: "LineChart"
					},
					{
						to: "/teacher/earnings",
						label: bi("الأرباح", "Earnings"),
						icon: "Wallet"
					}
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: bi("يحتاج انتباهك", "Needs your attention"),
				icon: "Bell",
				children: tasks.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowList, { rows: tasks.map((t) => ({
					title: bi(...t.title),
					meta: bi(...t.meta),
					value: bi("متابعة", "Follow up"),
					tone: t.tone
				})) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					icon: "Bell",
					text: bi("ولا شي بانتظارك الآن 🎉", "Nothing needs your attention right now 🎉")
				})
			})
		] })]
	});
}
//#endregion
export { PageRoute as component };
