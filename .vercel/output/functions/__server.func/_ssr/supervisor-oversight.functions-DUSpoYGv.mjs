import { a as numberType, o as objectType, r as enumType, s as stringType } from "../_libs/zod.mjs";
import { r as createServerFn } from "./server-oWHHg8-O.mjs";
import { t as requireAuth } from "./auth-middleware-DygD5oX-.mjs";
import { o as requirePageAction, t as createServerRpc } from "./rbac.server-Da2HCyeN.mjs";
import { t as LINKED_CHILDREN } from "./account-pages-data-Xw-6PmGW.mjs";
import { i as MISTAKES, r as EXAM_ATTEMPTS } from "./student-evaluation-data-z7p3-_Ty.mjs";
import { o as WEEKLY_STUDY_LOG, r as LIBRARY_SUBJECTS } from "./student-learning-data-D1MitbQK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/supervisor-oversight.functions-DUSpoYGv.js
var TEACHER_PERFORMANCE = [];
var STUDENT_RISK = [];
var SUPERVISION_REPORTS = [
	{
		id: "rp-1",
		title: "تقرير جودة التدريس — يوليو",
		formatLabel: "PDF · 12 صفحة",
		downloadsCount: 0
	},
	{
		id: "rp-2",
		title: "تقرير الإتقان بالمواد",
		formatLabel: "XLSX",
		downloadsCount: 0
	},
	{
		id: "rp-3",
		title: "تقرير الالتزام الأسبوعي",
		formatLabel: "PDF · 6 صفحات",
		downloadsCount: 0
	}
];
var SUPERVISION_SETTINGS = {
	reportFrequencyLabel: "أسبوعي",
	dataAnonymised: true,
	improvedThisMonth: 0
};
function nextOversightId(prefix) {
	return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}
var listTeacherPerformance_createServerFn_handler = createServerRpc({
	id: "f027f64d8a207bbb87f4d0241e5ea4d1374ab9953b3df1434543a8900b9aed4c",
	name: "listTeacherPerformance",
	filename: "src/lib/supervisor-oversight.functions.ts"
}, (opts) => listTeacherPerformance.__executeServer(opts));
var listTeacherPerformance = createServerFn({ method: "GET" }).middleware([requireAuth]).handler(listTeacherPerformance_createServerFn_handler, async ({ context }) => {
	await requirePageAction(context.userId, "supervisor_teachers", "view_list");
	return TEACHER_PERFORMANCE;
});
var saveTeacherPerformance_createServerFn_handler = createServerRpc({
	id: "bc19afe533630993a35b2580eb20abae8d24705044700e86ea272d7877e47af3",
	name: "saveTeacherPerformance",
	filename: "src/lib/supervisor-oversight.functions.ts"
}, (opts) => saveTeacherPerformance.__executeServer(opts));
var saveTeacherPerformance = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({
	id: stringType().optional(),
	teacherName: stringType().trim().min(2, "اسم المعلم مطلوب"),
	subjectName: stringType().trim().min(2, "المادة مطلوبة"),
	studentsCount: numberType().int().min(0),
	responseHours: numberType().min(0),
	gradingDays: numberType().min(0),
	rating: numberType().min(0).max(5),
	status: enumType([
		"ممتاز",
		"جيد",
		"تأخر تصحيح"
	])
}).parse(input)).handler(saveTeacherPerformance_createServerFn_handler, async ({ data, context }) => {
	await requirePageAction(context.userId, "supervisor_teachers", data.id ? "edit" : "execute_add");
	if (data.id) {
		const row = TEACHER_PERFORMANCE.find((r) => r.id === data.id);
		if (!row) throw new Error("المعلم غير موجود");
		Object.assign(row, data);
	} else {
		const row = {
			id: nextOversightId("tp"),
			...data
		};
		TEACHER_PERFORMANCE.push(row);
	}
	return { ok: true };
});
var deleteTeacherPerformance_createServerFn_handler = createServerRpc({
	id: "f107cac690a5ad32f574e49b8124e1269d8a7bd2e373ce5032c6d009b1f183e8",
	name: "deleteTeacherPerformance",
	filename: "src/lib/supervisor-oversight.functions.ts"
}, (opts) => deleteTeacherPerformance.__executeServer(opts));
var deleteTeacherPerformance = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({ id: stringType() }).parse(input)).handler(deleteTeacherPerformance_createServerFn_handler, async ({ data, context }) => {
	await requirePageAction(context.userId, "supervisor_teachers", "delete");
	const idx = TEACHER_PERFORMANCE.findIndex((r) => r.id === data.id);
	if (idx !== -1) TEACHER_PERFORMANCE.splice(idx, 1);
	return { ok: true };
});
var listStudentRisk_createServerFn_handler = createServerRpc({
	id: "8757c19909a3789cf49325ae9b1f6d5008611e71dc1e861044f89b54dcc6cc4e",
	name: "listStudentRisk",
	filename: "src/lib/supervisor-oversight.functions.ts"
}, (opts) => listStudentRisk.__executeServer(opts));
var listStudentRisk = createServerFn({ method: "GET" }).middleware([requireAuth]).handler(listStudentRisk_createServerFn_handler, async ({ context }) => {
	await requirePageAction(context.userId, "supervisor_students", "view_list");
	return STUDENT_RISK;
});
var saveStudentRisk_createServerFn_handler = createServerRpc({
	id: "d43a5536b8b0831eafa3dd55c91132eab5b9d8f8298ce50a947b54bff73517a5",
	name: "saveStudentRisk",
	filename: "src/lib/supervisor-oversight.functions.ts"
}, (opts) => saveStudentRisk.__executeServer(opts));
var saveStudentRisk = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({
	id: stringType().optional(),
	studentName: stringType().trim().min(2, "اسم الطالب مطلوب"),
	gradeLabel: stringType().trim().min(1, "الصف مطلوب"),
	weakestSubject: stringType().trim().min(2, "المادة مطلوبة"),
	weakestPercent: numberType().min(0).max(100),
	status: enumType([
		"متعثّر",
		"مراقبة",
		"منتظم"
	])
}).parse(input)).handler(saveStudentRisk_createServerFn_handler, async ({ data, context }) => {
	await requirePageAction(context.userId, "supervisor_students", data.id ? "edit" : "execute_add");
	if (data.id) {
		const row = STUDENT_RISK.find((r) => r.id === data.id);
		if (!row) throw new Error("الطالب غير موجود");
		Object.assign(row, data);
	} else {
		const row = {
			id: nextOversightId("sr"),
			...data
		};
		STUDENT_RISK.push(row);
	}
	return { ok: true };
});
var deleteStudentRisk_createServerFn_handler = createServerRpc({
	id: "3fc9e9f8f165e07fe10c0170b509dc237ac625756a32d7da9df160b884493c5e",
	name: "deleteStudentRisk",
	filename: "src/lib/supervisor-oversight.functions.ts"
}, (opts) => deleteStudentRisk.__executeServer(opts));
var deleteStudentRisk = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({ id: stringType() }).parse(input)).handler(deleteStudentRisk_createServerFn_handler, async ({ data, context }) => {
	await requirePageAction(context.userId, "supervisor_students", "delete");
	const idx = STUDENT_RISK.findIndex((r) => r.id === data.id);
	if (idx !== -1) STUDENT_RISK.splice(idx, 1);
	return { ok: true };
});
var listSupervisionReports_createServerFn_handler = createServerRpc({
	id: "32fa234b43f653a6f6f6fdb24dfba669ef2d49febce159afc7d77882cdaa6fdc",
	name: "listSupervisionReports",
	filename: "src/lib/supervisor-oversight.functions.ts"
}, (opts) => listSupervisionReports.__executeServer(opts));
var listSupervisionReports = createServerFn({ method: "GET" }).middleware([requireAuth]).handler(listSupervisionReports_createServerFn_handler, async ({ context }) => {
	await requirePageAction(context.userId, "supervisor_reports", "view_list");
	return SUPERVISION_REPORTS;
});
var recordReportDownload_createServerFn_handler = createServerRpc({
	id: "b3bed09f94cbcba2141a2d263cd5c7527032701f0230e0c4c57883f4c1b2488a",
	name: "recordReportDownload",
	filename: "src/lib/supervisor-oversight.functions.ts"
}, (opts) => recordReportDownload.__executeServer(opts));
var recordReportDownload = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({ id: stringType() }).parse(input)).handler(recordReportDownload_createServerFn_handler, async ({ data, context }) => {
	await requirePageAction(context.userId, "supervisor_reports", "edit");
	const row = SUPERVISION_REPORTS.find((r) => r.id === data.id);
	if (!row) throw new Error("التقرير غير موجود");
	row.downloadsCount += 1;
	return { ok: true };
});
var deleteSupervisionReport_createServerFn_handler = createServerRpc({
	id: "76615f39a65645059581a7acd26807300338fcbc90e88a0c6b07e4c28d56e4d5",
	name: "deleteSupervisionReport",
	filename: "src/lib/supervisor-oversight.functions.ts"
}, (opts) => deleteSupervisionReport.__executeServer(opts));
var deleteSupervisionReport = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({ id: stringType() }).parse(input)).handler(deleteSupervisionReport_createServerFn_handler, async ({ data, context }) => {
	await requirePageAction(context.userId, "supervisor_reports", "delete");
	const idx = SUPERVISION_REPORTS.findIndex((r) => r.id === data.id);
	if (idx !== -1) SUPERVISION_REPORTS.splice(idx, 1);
	return { ok: true };
});
var getSupervisionSettings_createServerFn_handler = createServerRpc({
	id: "f5108c2b2611057eecd4b968a8af89320a3838a1182735654927c89f893a2b31",
	name: "getSupervisionSettings",
	filename: "src/lib/supervisor-oversight.functions.ts"
}, (opts) => getSupervisionSettings.__executeServer(opts));
var getSupervisionSettings = createServerFn({ method: "GET" }).middleware([requireAuth]).handler(getSupervisionSettings_createServerFn_handler, async ({ context }) => {
	await requirePageAction(context.userId, "supervisor_reports", "view_list");
	return SUPERVISION_SETTINGS;
});
var getChildReport_createServerFn_handler = createServerRpc({
	id: "47a5e496452f06b7f9c21934e87de85c2fb6dc59bf335eb3f56d9e0c9756d3fc",
	name: "getChildReport",
	filename: "src/lib/supervisor-oversight.functions.ts"
}, (opts) => getChildReport.__executeServer(opts));
var getChildReport = createServerFn({ method: "GET" }).middleware([requireAuth]).handler(getChildReport_createServerFn_handler, async ({ context }) => {
	await requirePageAction(context.userId, "parent_report", "view_list");
	if (LINKED_CHILDREN.length === 0) return null;
	const childName = LINKED_CHILDREN[0].childName;
	const studyDaysCount = WEEKLY_STUDY_LOG.filter((d) => d.minutes > 0).length;
	const totalMinutes = WEEKLY_STUDY_LOG.reduce((s, d) => s + d.minutes, 0);
	const avgMastery = LIBRARY_SUBJECTS.length ? Math.round(LIBRARY_SUBJECTS.reduce((s, sub) => s + sub.progressPercent, 0) / LIBRARY_SUBJECTS.length) : 0;
	const weakSubjects = LIBRARY_SUBJECTS.filter((s) => s.progressPercent < 50);
	const priorityMistakes = MISTAKES.filter((m) => m.status === "أولوية");
	return {
		childName,
		studyDaysCount,
		totalMinutes,
		avgMastery,
		weeklyLog: WEEKLY_STUDY_LOG,
		subjects: LIBRARY_SUBJECTS,
		weakSubjectsCount: weakSubjects.length,
		examAttempts: EXAM_ATTEMPTS,
		priorityMistakes
	};
});
//#endregion
export { deleteStudentRisk_createServerFn_handler, deleteSupervisionReport_createServerFn_handler, deleteTeacherPerformance_createServerFn_handler, getChildReport_createServerFn_handler, getSupervisionSettings_createServerFn_handler, listStudentRisk_createServerFn_handler, listSupervisionReports_createServerFn_handler, listTeacherPerformance_createServerFn_handler, recordReportDownload_createServerFn_handler, saveStudentRisk_createServerFn_handler, saveTeacherPerformance_createServerFn_handler };
