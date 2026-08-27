import { c as createServerFn } from "./createServerFn-TbS7u0_2.mjs";
import { t as requireAuth } from "./auth-middleware-DYL_GR_y.mjs";
import { a as numberType, o as objectType, r as enumType, s as stringType } from "../_libs/zod.mjs";
import { o as requirePageAction, t as createServerRpc } from "./rbac.server-COlLO8eJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/student-learning.functions-WW104-cy.js
var ENROLLMENTS = [
	{
		id: "enr-1",
		courseTitle: "تفاضل وتكامل",
		teacherName: "أ. سامي",
		progressPercent: 62,
		nextSessionLabel: "الأحد 18:00",
		status: "قيد الدراسة"
	},
	{
		id: "enr-2",
		courseTitle: "فيزياء الوزاري",
		teacherName: "أ. ريم",
		progressPercent: 45,
		nextSessionLabel: "الثلاثاء 19:30",
		status: "قيد الدراسة"
	},
	{
		id: "enr-3",
		courseTitle: "عربي — بلاغة وتحليل",
		teacherName: "أ. لينا",
		progressPercent: 88,
		nextSessionLabel: "مسجّل مسبقاً",
		status: "قيد الدراسة"
	},
	{
		id: "enr-4",
		courseTitle: "مهارات المراجعة الذكية",
		teacherName: "أ. خالد",
		progressPercent: 100,
		nextSessionLabel: "—",
		status: "مكتمل"
	},
	{
		id: "enr-5",
		courseTitle: "أساسيات الكيمياء",
		teacherName: "أ. ياسر",
		progressPercent: 100,
		nextSessionLabel: "—",
		status: "مكتمل"
	}
];
var LIBRARY_SUBJECTS = [
	{
		id: "lib-1",
		subjectName: "الرياضيات",
		termLabel: "الفصل الأول",
		unitsCount: 6,
		lessonsCount: 32,
		progressPercent: 78
	},
	{
		id: "lib-2",
		subjectName: "الفيزياء",
		termLabel: "الفصل الأول",
		unitsCount: 5,
		lessonsCount: 26,
		progressPercent: 54
	},
	{
		id: "lib-3",
		subjectName: "الكيمياء",
		termLabel: "الفصل الأول",
		unitsCount: 4,
		lessonsCount: 21,
		progressPercent: 40
	},
	{
		id: "lib-4",
		subjectName: "اللغة العربية",
		termLabel: "الفصل الأول",
		unitsCount: 5,
		lessonsCount: 30,
		progressPercent: 91
	}
];
var FLASHCARD_DECKS = [
	{
		id: "deck-1",
		deckName: "رياضيات — مشتقات",
		totalCards: 48,
		dueCards: 12,
		masteredCards: 30
	},
	{
		id: "deck-2",
		deckName: "فيزياء — الحركة",
		totalCards: 36,
		dueCards: 14,
		masteredCards: 18
	},
	{
		id: "deck-3",
		deckName: "عربي — بلاغة",
		totalCards: 60,
		dueCards: 8,
		masteredCards: 45
	}
];
var WEEKLY_STUDY_LOG = [
	{
		day: ["سبت", "Sat"],
		minutes: 35
	},
	{
		day: ["أحد", "Sun"],
		minutes: 50
	},
	{
		day: ["اثنين", "Mon"],
		minutes: 42
	},
	{
		day: ["ثلاثاء", "Tue"],
		minutes: 68
	},
	{
		day: ["أربعاء", "Wed"],
		minutes: 55
	},
	{
		day: ["خميس", "Thu"],
		minutes: 72
	},
	{
		day: ["جمعة", "Fri"],
		minutes: 30
	}
];
var UPCOMING_TASKS = [
	{
		id: "up-1",
		title: "امتحان فيزياء — وحدة 3",
		whenLabel: "غداً 9:00",
		type: "امتحان"
	},
	{
		id: "up-2",
		title: "تسليم ورقة عمل رياضيات",
		whenLabel: "بعد يومين",
		type: "واجب"
	},
	{
		id: "up-3",
		title: "مراجعة بطاقات كيمياء",
		whenLabel: "اليوم",
		type: "مراجعة"
	}
];
var STUDY_STATS = {
	streakDays: 12,
	achievementPoints: 1240,
	longestStreak: 21
};
function nextStudentId(prefix) {
	return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}
var listEnrollments_createServerFn_handler = createServerRpc({
	id: "880d84d5348c2f7975a29fbf73c7e06d87e01c9da62dac172b6c8f6683fc4683",
	name: "listEnrollments",
	filename: "src/lib/student-learning.functions.ts"
}, (opts) => listEnrollments.__executeServer(opts));
var listEnrollments = createServerFn({ method: "GET" }).middleware([requireAuth]).handler(listEnrollments_createServerFn_handler, async ({ context }) => {
	await requirePageAction(context.userId, "student_my_courses", "view_list");
	return ENROLLMENTS;
});
var saveEnrollment_createServerFn_handler = createServerRpc({
	id: "975a6af34bcd3d88da0dbc7efed6c296902ac84412a8fbe7628a1879a58ff09a",
	name: "saveEnrollment",
	filename: "src/lib/student-learning.functions.ts"
}, (opts) => saveEnrollment.__executeServer(opts));
var saveEnrollment = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({
	id: stringType().optional(),
	courseTitle: stringType().trim().min(2, "اسم الكورس مطلوب"),
	teacherName: stringType().trim().min(2, "اسم المعلم مطلوب"),
	progressPercent: numberType().min(0).max(100),
	nextSessionLabel: stringType().trim().max(100),
	status: enumType(["قيد الدراسة", "مكتمل"])
}).parse(input)).handler(saveEnrollment_createServerFn_handler, async ({ data, context }) => {
	await requirePageAction(context.userId, "student_my_courses", data.id ? "edit" : "execute_add");
	if (data.id) {
		const row = ENROLLMENTS.find((r) => r.id === data.id);
		if (!row) throw new Error("الكورس غير موجود");
		Object.assign(row, data);
	} else {
		const row = {
			id: nextStudentId("enr"),
			...data
		};
		ENROLLMENTS.push(row);
	}
	return { ok: true };
});
var deleteEnrollment_createServerFn_handler = createServerRpc({
	id: "3135a58c264c08fb1d1d2fff6121fc4cb2986b006b5e0e299ab2424173ef295d",
	name: "deleteEnrollment",
	filename: "src/lib/student-learning.functions.ts"
}, (opts) => deleteEnrollment.__executeServer(opts));
var deleteEnrollment = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({ id: stringType() }).parse(input)).handler(deleteEnrollment_createServerFn_handler, async ({ data, context }) => {
	await requirePageAction(context.userId, "student_my_courses", "delete");
	const idx = ENROLLMENTS.findIndex((r) => r.id === data.id);
	if (idx !== -1) ENROLLMENTS.splice(idx, 1);
	return { ok: true };
});
var listLibrarySubjects_createServerFn_handler = createServerRpc({
	id: "32e9506416f5fbfa8f5b142681452b4cd45713ea70fbd2537897f4e955780c21",
	name: "listLibrarySubjects",
	filename: "src/lib/student-learning.functions.ts"
}, (opts) => listLibrarySubjects.__executeServer(opts));
var listLibrarySubjects = createServerFn({ method: "GET" }).middleware([requireAuth]).handler(listLibrarySubjects_createServerFn_handler, async ({ context }) => {
	await requirePageAction(context.userId, "student_library", "view_list");
	return LIBRARY_SUBJECTS;
});
var saveLibrarySubject_createServerFn_handler = createServerRpc({
	id: "23bd70e9a43ef675e2efe1a1ca45758bd63597d04b36b2ee5e6293e0dc1ed0e7",
	name: "saveLibrarySubject",
	filename: "src/lib/student-learning.functions.ts"
}, (opts) => saveLibrarySubject.__executeServer(opts));
var saveLibrarySubject = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({
	id: stringType().optional(),
	subjectName: stringType().trim().min(2, "اسم المادة مطلوب"),
	termLabel: stringType().trim().min(2, "الفصل مطلوب"),
	unitsCount: numberType().int().min(0),
	lessonsCount: numberType().int().min(0),
	progressPercent: numberType().min(0).max(100)
}).parse(input)).handler(saveLibrarySubject_createServerFn_handler, async ({ data, context }) => {
	await requirePageAction(context.userId, "student_library", data.id ? "edit" : "execute_add");
	if (data.id) {
		const row = LIBRARY_SUBJECTS.find((r) => r.id === data.id);
		if (!row) throw new Error("المادة غير موجودة");
		Object.assign(row, data);
	} else {
		const row = {
			id: nextStudentId("lib"),
			...data
		};
		LIBRARY_SUBJECTS.push(row);
	}
	return { ok: true };
});
var deleteLibrarySubject_createServerFn_handler = createServerRpc({
	id: "5ae6d09dddffb12804232064fd79c690cf50804e6923694cc19f09f45829d285",
	name: "deleteLibrarySubject",
	filename: "src/lib/student-learning.functions.ts"
}, (opts) => deleteLibrarySubject.__executeServer(opts));
var deleteLibrarySubject = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({ id: stringType() }).parse(input)).handler(deleteLibrarySubject_createServerFn_handler, async ({ data, context }) => {
	await requirePageAction(context.userId, "student_library", "delete");
	const idx = LIBRARY_SUBJECTS.findIndex((r) => r.id === data.id);
	if (idx !== -1) LIBRARY_SUBJECTS.splice(idx, 1);
	return { ok: true };
});
var listFlashcardDecks_createServerFn_handler = createServerRpc({
	id: "8a092248563a0624c12b7211096bcd8cb71825e6b0b2ae926d887fb17da6b414",
	name: "listFlashcardDecks",
	filename: "src/lib/student-learning.functions.ts"
}, (opts) => listFlashcardDecks.__executeServer(opts));
var listFlashcardDecks = createServerFn({ method: "GET" }).middleware([requireAuth]).handler(listFlashcardDecks_createServerFn_handler, async ({ context }) => {
	await requirePageAction(context.userId, "student_flashcards", "view_list");
	return FLASHCARD_DECKS;
});
var saveFlashcardDeck_createServerFn_handler = createServerRpc({
	id: "17c7cbcadacddb13cfafcc34b88860581e6f1fc69fe080f1de912d31a302243e",
	name: "saveFlashcardDeck",
	filename: "src/lib/student-learning.functions.ts"
}, (opts) => saveFlashcardDeck.__executeServer(opts));
var saveFlashcardDeck = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({
	id: stringType().optional(),
	deckName: stringType().trim().min(2, "اسم المجموعة مطلوب"),
	totalCards: numberType().int().min(0),
	dueCards: numberType().int().min(0),
	masteredCards: numberType().int().min(0)
}).parse(input)).handler(saveFlashcardDeck_createServerFn_handler, async ({ data, context }) => {
	await requirePageAction(context.userId, "student_flashcards", data.id ? "edit" : "execute_add");
	if (data.id) {
		const row = FLASHCARD_DECKS.find((r) => r.id === data.id);
		if (!row) throw new Error("المجموعة غير موجودة");
		Object.assign(row, data);
	} else {
		const row = {
			id: nextStudentId("deck"),
			...data
		};
		FLASHCARD_DECKS.push(row);
	}
	return { ok: true };
});
var deleteFlashcardDeck_createServerFn_handler = createServerRpc({
	id: "aa0a571bc86e80be05d767f95c87a6bb94ab2cd296490445172b40de5e0d37dd",
	name: "deleteFlashcardDeck",
	filename: "src/lib/student-learning.functions.ts"
}, (opts) => deleteFlashcardDeck.__executeServer(opts));
var deleteFlashcardDeck = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({ id: stringType() }).parse(input)).handler(deleteFlashcardDeck_createServerFn_handler, async ({ data, context }) => {
	await requirePageAction(context.userId, "student_flashcards", "delete");
	const idx = FLASHCARD_DECKS.findIndex((r) => r.id === data.id);
	if (idx !== -1) FLASHCARD_DECKS.splice(idx, 1);
	return { ok: true };
});
var listWeeklyStudyLog_createServerFn_handler = createServerRpc({
	id: "adce39325e1c64c7b0acbdc771158a4072d80020fc7e1976b4f4d17527097faa",
	name: "listWeeklyStudyLog",
	filename: "src/lib/student-learning.functions.ts"
}, (opts) => listWeeklyStudyLog.__executeServer(opts));
var listWeeklyStudyLog = createServerFn({ method: "GET" }).middleware([requireAuth]).handler(listWeeklyStudyLog_createServerFn_handler, async ({ context }) => {
	await requirePageAction(context.userId, "student_dashboard", "view_list");
	return WEEKLY_STUDY_LOG;
});
var updateWeeklyStudyMinutes_createServerFn_handler = createServerRpc({
	id: "18921d0291e054a436a3fdac83fdf6ce46560a1f81db9dc3b0ba99f144c45a67",
	name: "updateWeeklyStudyMinutes",
	filename: "src/lib/student-learning.functions.ts"
}, (opts) => updateWeeklyStudyMinutes.__executeServer(opts));
var updateWeeklyStudyMinutes = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({
	dayAr: stringType(),
	minutes: numberType().int().min(0).max(1440)
}).parse(input)).handler(updateWeeklyStudyMinutes_createServerFn_handler, async ({ data, context }) => {
	await requirePageAction(context.userId, "student_dashboard", "edit");
	const row = WEEKLY_STUDY_LOG.find((r) => r.day[0] === data.dayAr);
	if (!row) throw new Error("اليوم غير موجود");
	row.minutes = data.minutes;
	return { ok: true };
});
var listUpcomingTasks_createServerFn_handler = createServerRpc({
	id: "3139661caaef153ba0d6829a4c6c31f270780dfaa05b786e2c56963a9de9151f",
	name: "listUpcomingTasks",
	filename: "src/lib/student-learning.functions.ts"
}, (opts) => listUpcomingTasks.__executeServer(opts));
var listUpcomingTasks = createServerFn({ method: "GET" }).middleware([requireAuth]).handler(listUpcomingTasks_createServerFn_handler, async ({ context }) => {
	await requirePageAction(context.userId, "student_dashboard", "view_list");
	return UPCOMING_TASKS;
});
var saveUpcomingTask_createServerFn_handler = createServerRpc({
	id: "189774937f1fa56f68657bdb563f59a3756b357f2b51b6d6cd10ca3a7a6a4b36",
	name: "saveUpcomingTask",
	filename: "src/lib/student-learning.functions.ts"
}, (opts) => saveUpcomingTask.__executeServer(opts));
var saveUpcomingTask = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({
	id: stringType().optional(),
	title: stringType().trim().min(2, "العنوان مطلوب"),
	whenLabel: stringType().trim().min(1, "الموعد مطلوب"),
	type: enumType([
		"امتحان",
		"واجب",
		"مراجعة"
	])
}).parse(input)).handler(saveUpcomingTask_createServerFn_handler, async ({ data, context }) => {
	await requirePageAction(context.userId, "student_dashboard", data.id ? "edit" : "execute_add");
	if (data.id) {
		const row = UPCOMING_TASKS.find((r) => r.id === data.id);
		if (!row) throw new Error("المهمة غير موجودة");
		Object.assign(row, data);
	} else {
		const row = {
			id: nextStudentId("up"),
			...data
		};
		UPCOMING_TASKS.push(row);
	}
	return { ok: true };
});
var deleteUpcomingTask_createServerFn_handler = createServerRpc({
	id: "b7cb1a3f7592e36e568f411004c7b24d00eabcea5bddd9205b79dd2345bdc404",
	name: "deleteUpcomingTask",
	filename: "src/lib/student-learning.functions.ts"
}, (opts) => deleteUpcomingTask.__executeServer(opts));
var deleteUpcomingTask = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({ id: stringType() }).parse(input)).handler(deleteUpcomingTask_createServerFn_handler, async ({ data, context }) => {
	await requirePageAction(context.userId, "student_dashboard", "delete");
	const idx = UPCOMING_TASKS.findIndex((r) => r.id === data.id);
	if (idx !== -1) UPCOMING_TASKS.splice(idx, 1);
	return { ok: true };
});
var getStudyStats_createServerFn_handler = createServerRpc({
	id: "d6f5561f5441032e7ce521f2939173399511517937e839dfc8dcf87c24467c30",
	name: "getStudyStats",
	filename: "src/lib/student-learning.functions.ts"
}, (opts) => getStudyStats.__executeServer(opts));
var getStudyStats = createServerFn({ method: "GET" }).middleware([requireAuth]).handler(getStudyStats_createServerFn_handler, async ({ context }) => {
	await requirePageAction(context.userId, "student_dashboard", "view_list");
	return STUDY_STATS;
});
var saveStudyStats_createServerFn_handler = createServerRpc({
	id: "20d2ec7f510038d4c04059c87f2181a2b6f87cb06d11bb0af0855a917f5e4456",
	name: "saveStudyStats",
	filename: "src/lib/student-learning.functions.ts"
}, (opts) => saveStudyStats.__executeServer(opts));
var saveStudyStats = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({
	streakDays: numberType().int().min(0),
	achievementPoints: numberType().int().min(0),
	longestStreak: numberType().int().min(0).optional()
}).parse(input)).handler(saveStudyStats_createServerFn_handler, async ({ data, context }) => {
	await requirePageAction(context.userId, "student_dashboard", "edit");
	Object.assign(STUDY_STATS, data);
	return { ok: true };
});
//#endregion
export { deleteEnrollment_createServerFn_handler, deleteFlashcardDeck_createServerFn_handler, deleteLibrarySubject_createServerFn_handler, deleteUpcomingTask_createServerFn_handler, getStudyStats_createServerFn_handler, listEnrollments_createServerFn_handler, listFlashcardDecks_createServerFn_handler, listLibrarySubjects_createServerFn_handler, listUpcomingTasks_createServerFn_handler, listWeeklyStudyLog_createServerFn_handler, saveEnrollment_createServerFn_handler, saveFlashcardDeck_createServerFn_handler, saveLibrarySubject_createServerFn_handler, saveStudyStats_createServerFn_handler, saveUpcomingTask_createServerFn_handler, updateWeeklyStudyMinutes_createServerFn_handler };
