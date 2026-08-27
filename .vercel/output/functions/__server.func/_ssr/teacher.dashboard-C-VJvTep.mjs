import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { x as useBi } from "./rbac-static-data-BkN8GGlQ.mjs";
import { n as Guard } from "./guard-BhjB-ZLB.mjs";
import { a as Panel, c as RowList, l as StatGrid, s as QuickLinks, t as AppPage } from "./kit-D87c2tkb.mjs";
import { i as WelcomeBanner, t as ComparisonChart } from "./charts-B-LArutN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/teacher.dashboard-C-VJvTep.js
var import_jsx_runtime = require_jsx_runtime();
function PageRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Guard, {
		pageKey: "teacher_dashboard",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, {})
	});
}
function Body() {
	const bi = useBi();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppPage, {
		title: bi("لوحة المعلم", "Teacher dashboard"),
		icon: "LayoutDashboard",
		subtitle: bi("صفوفك اليوم: ما يحتاج تصحيحاً، أسئلة تنتظر جوابك، وأداء طلابك.", "Your classes today: what needs grading, questions awaiting you, and student performance."),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WelcomeBanner, {
				subtitle: ["عندك أسئلة بانتظار الرد وطلاب بانتظار تصحيح — خلّي صفوفك بأفضل حال.", "You have questions waiting and grading pending — keep your classes running smoothly."],
				tip: ["3 أسئلة جديدة بمجتمع الصف", "3 new questions in the class community"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatGrid, { items: [
				{
					icon: "Users",
					label: bi("طلابك", "Students"),
					value: "126"
				},
				{
					icon: "PenSquare",
					label: bi("بانتظار التصحيح", "Awaiting grading"),
					value: "18"
				},
				{
					icon: "MessagesSquare",
					label: bi("أسئلة بلا جواب", "Unanswered questions"),
					value: "7"
				},
				{
					icon: "Wallet",
					label: bi("أرباح الشهر", "This month"),
					value: bi("820 ₪", "820 ILS")
				}
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: bi("تفاعل الطلاب بالمادة", "Student engagement by subject"),
				icon: "ChartSpline",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComparisonChart, { data: [
					{
						label: bi("رياضيات", "Math"),
						value: 320
					},
					{
						label: bi("فيزياء", "Physics"),
						value: 245
					},
					{
						label: bi("كيمياء", "Chemistry"),
						value: 180
					},
					{
						label: bi("عربي", "Arabic"),
						value: 210
					}
				] })
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
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowList, { rows: [
					{
						title: bi("18 ورقة رياضيات بانتظار التصحيح", "18 math papers to grade"),
						meta: bi("الصف الحادي عشر", "Grade 11"),
						value: bi("عاجل", "Urgent"),
						tone: "danger"
					},
					{
						title: bi("7 أسئلة في مجتمع الفيزياء", "7 questions in physics community"),
						meta: bi("منذ يومين", "2 days ago"),
						value: bi("متابعة", "Follow up"),
						tone: "primary"
					},
					{
						title: bi("درس «الدوال» بانتظار مراجعة المحتوى", "Functions lesson pending review"),
						meta: bi("أُرسل 2026/07/29", "Sent 2026/07/29"),
						value: bi("قيد المراجعة", "In review"),
						tone: "muted"
					}
				] })
			})
		]
	});
}
//#endregion
export { PageRoute as component };
