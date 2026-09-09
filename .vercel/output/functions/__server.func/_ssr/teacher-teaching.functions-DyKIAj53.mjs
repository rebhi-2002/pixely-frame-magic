import { r as createServerFn } from "./server-W5G339kS.mjs";
import { t as requireAuth } from "./auth-middleware-DGfc1vT7.mjs";
import { a as numberType, o as objectType, r as enumType, s as stringType } from "../_libs/zod.mjs";
import { o as requirePageAction, t as createServerRpc } from "./rbac.server-Bvw9iJh5.mjs";
import { n as COMMUNITY_QUESTIONS } from "./student-social-data-NYvD98SY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/teacher-teaching.functions-DyKIAj53.js
var TEACHER_COURSES = [
	{
		id: "tc-1",
		title: "تفاضل وتكامل — الوزاري",
		price: 45,
		enrolledCount: 0,
		status: "منشور"
	},
	{
		id: "tc-2",
		title: "مراجعة ليلة الامتحان",
		price: 15,
		enrolledCount: 0,
		status: "منشور"
	},
	{
		id: "tc-3",
		title: "أساسيات الجبر",
		price: 0,
		enrolledCount: 0,
		status: "مسوّدة"
	}
];
var CONTENT_ITEMS = [
	{
		id: "ci-1",
		title: "الدوال — شرح كامل",
		subjectName: "رياضيات",
		status: "قيد المراجعة",
		viewsCount: 0
	},
	{
		id: "ci-2",
		title: "قوانين نيوتن",
		subjectName: "فيزياء",
		status: "منشور",
		viewsCount: 0
	},
	{
		id: "ci-3",
		title: "ورقة تدريب المشتقات",
		subjectName: "رياضيات",
		status: "مسوّدة",
		viewsCount: 0
	},
	{
		id: "ci-4",
		title: "التفاعلات الكيميائية",
		subjectName: "كيمياء",
		status: "منشور",
		viewsCount: 0
	}
];
var QUIZ_ITEMS = [
	{
		id: "qz-1",
		title: "رياضيات — وحدة 4",
		questionsCount: 20,
		attemptsCount: 0,
		avgScore: 0,
		status: "نشط"
	},
	{
		id: "qz-2",
		title: "فيزياء — الحركة",
		questionsCount: 15,
		attemptsCount: 0,
		avgScore: 0,
		status: "نشط"
	},
	{
		id: "qz-3",
		title: "كيمياء — تدريب سريع",
		questionsCount: 10,
		attemptsCount: 0,
		avgScore: 0,
		status: "مسوّدة"
	}
];
function nextTeachingId(prefix) {
	return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}
var listTeacherCourses_createServerFn_handler = createServerRpc({
	id: "a8e9734b27912223c1ab5ac1107a4b1a4d79b2f1c04158a6307a72ae8879c890",
	name: "listTeacherCourses",
	filename: "src/lib/teacher-teaching.functions.ts"
}, (opts) => listTeacherCourses.__executeServer(opts));
var listTeacherCourses = createServerFn({ method: "GET" }).middleware([requireAuth]).handler(listTeacherCourses_createServerFn_handler, async ({ context }) => {
	await requirePageAction(context.userId, "teacher_courses", "view_list");
	return TEACHER_COURSES;
});
var saveTeacherCourse_createServerFn_handler = createServerRpc({
	id: "046f4a6b8f538c8c0c556690c0f079e43d7ba75af1adb0d4be6f84f0895a4456",
	name: "saveTeacherCourse",
	filename: "src/lib/teacher-teaching.functions.ts"
}, (opts) => saveTeacherCourse.__executeServer(opts));
var saveTeacherCourse = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({
	id: stringType().optional(),
	title: stringType().trim().min(2, "اسم الكورس مطلوب"),
	price: numberType().min(0),
	enrolledCount: numberType().int().min(0),
	status: enumType(["منشور", "مسوّدة"])
}).parse(input)).handler(saveTeacherCourse_createServerFn_handler, async ({ data, context }) => {
	await requirePageAction(context.userId, "teacher_courses", data.id ? "edit" : "execute_add");
	if (data.id) {
		const row = TEACHER_COURSES.find((r) => r.id === data.id);
		if (!row) throw new Error("الكورس غير موجود");
		Object.assign(row, data);
	} else {
		const row = {
			id: nextTeachingId("tc"),
			...data
		};
		TEACHER_COURSES.push(row);
	}
	return { ok: true };
});
var deleteTeacherCourse_createServerFn_handler = createServerRpc({
	id: "d6af381603db71f94f0af681eb2954b73ea0ae1691448625d7dd532697fbd872",
	name: "deleteTeacherCourse",
	filename: "src/lib/teacher-teaching.functions.ts"
}, (opts) => deleteTeacherCourse.__executeServer(opts));
var deleteTeacherCourse = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({ id: stringType() }).parse(input)).handler(deleteTeacherCourse_createServerFn_handler, async ({ data, context }) => {
	await requirePageAction(context.userId, "teacher_courses", "delete");
	const idx = TEACHER_COURSES.findIndex((r) => r.id === data.id);
	if (idx !== -1) TEACHER_COURSES.splice(idx, 1);
	return { ok: true };
});
var listContentItems_createServerFn_handler = createServerRpc({
	id: "c4512e57d4bd724cf993c69271154a30b37fd0620f2700c1465af3269f8652f6",
	name: "listContentItems",
	filename: "src/lib/teacher-teaching.functions.ts"
}, (opts) => listContentItems.__executeServer(opts));
var listContentItems = createServerFn({ method: "GET" }).middleware([requireAuth]).handler(listContentItems_createServerFn_handler, async ({ context }) => {
	await requirePageAction(context.userId, "teacher_content", "view_list");
	return CONTENT_ITEMS;
});
var saveContentItem_createServerFn_handler = createServerRpc({
	id: "92f7d529f1688491c963e0c6895627bd639f6175431e448d9914e4049569ca9e",
	name: "saveContentItem",
	filename: "src/lib/teacher-teaching.functions.ts"
}, (opts) => saveContentItem.__executeServer(opts));
var saveContentItem = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({
	id: stringType().optional(),
	title: stringType().trim().min(2, "العنوان مطلوب"),
	subjectName: stringType().trim().min(2, "المادة مطلوبة"),
	status: enumType([
		"منشور",
		"قيد المراجعة",
		"مسوّدة"
	]),
	viewsCount: numberType().int().min(0)
}).parse(input)).handler(saveContentItem_createServerFn_handler, async ({ data, context }) => {
	await requirePageAction(context.userId, "teacher_content", data.id ? "edit" : "execute_add");
	if (data.id) {
		const row = CONTENT_ITEMS.find((r) => r.id === data.id);
		if (!row) throw new Error("العنصر غير موجود");
		Object.assign(row, data);
	} else {
		const row = {
			id: nextTeachingId("ci"),
			...data
		};
		CONTENT_ITEMS.push(row);
	}
	return { ok: true };
});
var deleteContentItem_createServerFn_handler = createServerRpc({
	id: "7aa0c62786e801bf45090326f7874dcf0ebf148acfccdb8ecafab77432e5ed58",
	name: "deleteContentItem",
	filename: "src/lib/teacher-teaching.functions.ts"
}, (opts) => deleteContentItem.__executeServer(opts));
var deleteContentItem = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({ id: stringType() }).parse(input)).handler(deleteContentItem_createServerFn_handler, async ({ data, context }) => {
	await requirePageAction(context.userId, "teacher_content", "delete");
	const idx = CONTENT_ITEMS.findIndex((r) => r.id === data.id);
	if (idx !== -1) CONTENT_ITEMS.splice(idx, 1);
	return { ok: true };
});
var listQuizItems_createServerFn_handler = createServerRpc({
	id: "9557ebe27b4fd4cb2c25977e801613e5afafd5dea29b2df87088ae1692668f00",
	name: "listQuizItems",
	filename: "src/lib/teacher-teaching.functions.ts"
}, (opts) => listQuizItems.__executeServer(opts));
var listQuizItems = createServerFn({ method: "GET" }).middleware([requireAuth]).handler(listQuizItems_createServerFn_handler, async ({ context }) => {
	await requirePageAction(context.userId, "teacher_quizzes", "view_list");
	return QUIZ_ITEMS;
});
var saveQuizItem_createServerFn_handler = createServerRpc({
	id: "f5e4b30d72e6b06c0c65f79225dac79e4526cfa3fc0be7dd27600b50f74640d6",
	name: "saveQuizItem",
	filename: "src/lib/teacher-teaching.functions.ts"
}, (opts) => saveQuizItem.__executeServer(opts));
var saveQuizItem = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({
	id: stringType().optional(),
	title: stringType().trim().min(2, "اسم الاختبار مطلوب"),
	questionsCount: numberType().int().min(1),
	attemptsCount: numberType().int().min(0),
	avgScore: numberType().min(0).max(100),
	status: enumType(["نشط", "مسوّدة"])
}).parse(input)).handler(saveQuizItem_createServerFn_handler, async ({ data, context }) => {
	await requirePageAction(context.userId, "teacher_quizzes", data.id ? "edit" : "execute_add");
	if (data.id) {
		const row = QUIZ_ITEMS.find((r) => r.id === data.id);
		if (!row) throw new Error("الاختبار غير موجود");
		Object.assign(row, data);
	} else {
		const row = {
			id: nextTeachingId("qz"),
			...data
		};
		QUIZ_ITEMS.push(row);
	}
	return { ok: true };
});
var deleteQuizItem_createServerFn_handler = createServerRpc({
	id: "b182f21002f6f80ec0bb69576c34e4d9c032903c4bd6e26622f6f31bac3586de",
	name: "deleteQuizItem",
	filename: "src/lib/teacher-teaching.functions.ts"
}, (opts) => deleteQuizItem.__executeServer(opts));
var deleteQuizItem = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({ id: stringType() }).parse(input)).handler(deleteQuizItem_createServerFn_handler, async ({ data, context }) => {
	await requirePageAction(context.userId, "teacher_quizzes", "delete");
	const idx = QUIZ_ITEMS.findIndex((r) => r.id === data.id);
	if (idx !== -1) QUIZ_ITEMS.splice(idx, 1);
	return { ok: true };
});
var listOpenClassQuestions_createServerFn_handler = createServerRpc({
	id: "4d222d1419ef7c2fd01976113e58b9162cc1f2c5d3c5f1315d516f8b156eb235",
	name: "listOpenClassQuestions",
	filename: "src/lib/teacher-teaching.functions.ts"
}, (opts) => listOpenClassQuestions.__executeServer(opts));
var listOpenClassQuestions = createServerFn({ method: "GET" }).middleware([requireAuth]).handler(listOpenClassQuestions_createServerFn_handler, async ({ context }) => {
	await requirePageAction(context.userId, "teacher_dashboard", "view_list");
	return COMMUNITY_QUESTIONS.filter((q) => q.status === "مفتوح");
});
//#endregion
export { deleteContentItem_createServerFn_handler, deleteQuizItem_createServerFn_handler, deleteTeacherCourse_createServerFn_handler, listContentItems_createServerFn_handler, listOpenClassQuestions_createServerFn_handler, listQuizItems_createServerFn_handler, listTeacherCourses_createServerFn_handler, saveContentItem_createServerFn_handler, saveQuizItem_createServerFn_handler, saveTeacherCourse_createServerFn_handler };
