import { r as createServerFn } from "./server-W5G339kS.mjs";
import { t as createSsrRpc } from "./createSsrRpc-C7KQUoXf.mjs";
import { t as requireAuth } from "./auth-middleware-DGfc1vT7.mjs";
import { a as numberType, o as objectType, r as enumType, s as stringType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/student-learning.functions-CV2mHTOR.js
var listEnrollments = createServerFn({ method: "GET" }).middleware([requireAuth]).handler(createSsrRpc("880d84d5348c2f7975a29fbf73c7e06d87e01c9da62dac172b6c8f6683fc4683"));
var saveEnrollment = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({
	id: stringType().optional(),
	courseTitle: stringType().trim().min(2, "اسم الكورس مطلوب"),
	teacherName: stringType().trim().min(2, "اسم المعلم مطلوب"),
	progressPercent: numberType().min(0).max(100),
	nextSessionLabel: stringType().trim().max(100),
	status: enumType(["قيد الدراسة", "مكتمل"])
}).parse(input)).handler(createSsrRpc("975a6af34bcd3d88da0dbc7efed6c296902ac84412a8fbe7628a1879a58ff09a"));
var deleteEnrollment = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({ id: stringType() }).parse(input)).handler(createSsrRpc("3135a58c264c08fb1d1d2fff6121fc4cb2986b006b5e0e299ab2424173ef295d"));
var listLibrarySubjects = createServerFn({ method: "GET" }).middleware([requireAuth]).handler(createSsrRpc("32e9506416f5fbfa8f5b142681452b4cd45713ea70fbd2537897f4e955780c21"));
var saveLibrarySubject = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({
	id: stringType().optional(),
	subjectName: stringType().trim().min(2, "اسم المادة مطلوب"),
	termLabel: stringType().trim().min(2, "الفصل مطلوب"),
	unitsCount: numberType().int().min(0),
	lessonsCount: numberType().int().min(0),
	progressPercent: numberType().min(0).max(100)
}).parse(input)).handler(createSsrRpc("23bd70e9a43ef675e2efe1a1ca45758bd63597d04b36b2ee5e6293e0dc1ed0e7"));
var deleteLibrarySubject = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({ id: stringType() }).parse(input)).handler(createSsrRpc("5ae6d09dddffb12804232064fd79c690cf50804e6923694cc19f09f45829d285"));
var listFlashcardDecks = createServerFn({ method: "GET" }).middleware([requireAuth]).handler(createSsrRpc("8a092248563a0624c12b7211096bcd8cb71825e6b0b2ae926d887fb17da6b414"));
var saveFlashcardDeck = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({
	id: stringType().optional(),
	deckName: stringType().trim().min(2, "اسم المجموعة مطلوب"),
	totalCards: numberType().int().min(0),
	dueCards: numberType().int().min(0),
	masteredCards: numberType().int().min(0)
}).parse(input)).handler(createSsrRpc("17c7cbcadacddb13cfafcc34b88860581e6f1fc69fe080f1de912d31a302243e"));
var deleteFlashcardDeck = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({ id: stringType() }).parse(input)).handler(createSsrRpc("aa0a571bc86e80be05d767f95c87a6bb94ab2cd296490445172b40de5e0d37dd"));
var listWeeklyStudyLog = createServerFn({ method: "GET" }).middleware([requireAuth]).handler(createSsrRpc("adce39325e1c64c7b0acbdc771158a4072d80020fc7e1976b4f4d17527097faa"));
var updateWeeklyStudyMinutes = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({
	dayAr: stringType(),
	minutes: numberType().int().min(0).max(1440)
}).parse(input)).handler(createSsrRpc("18921d0291e054a436a3fdac83fdf6ce46560a1f81db9dc3b0ba99f144c45a67"));
var listUpcomingTasks = createServerFn({ method: "GET" }).middleware([requireAuth]).handler(createSsrRpc("3139661caaef153ba0d6829a4c6c31f270780dfaa05b786e2c56963a9de9151f"));
var saveUpcomingTask = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({
	id: stringType().optional(),
	title: stringType().trim().min(2, "العنوان مطلوب"),
	whenLabel: stringType().trim().min(1, "الموعد مطلوب"),
	type: enumType([
		"امتحان",
		"واجب",
		"مراجعة"
	])
}).parse(input)).handler(createSsrRpc("189774937f1fa56f68657bdb563f59a3756b357f2b51b6d6cd10ca3a7a6a4b36"));
var deleteUpcomingTask = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({ id: stringType() }).parse(input)).handler(createSsrRpc("b7cb1a3f7592e36e568f411004c7b24d00eabcea5bddd9205b79dd2345bdc404"));
var getStudyStats = createServerFn({ method: "GET" }).middleware([requireAuth]).handler(createSsrRpc("d6f5561f5441032e7ce521f2939173399511517937e839dfc8dcf87c24467c30"));
var saveStudyStats = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({
	streakDays: numberType().int().min(0),
	achievementPoints: numberType().int().min(0),
	longestStreak: numberType().int().min(0).optional()
}).parse(input)).handler(createSsrRpc("20d2ec7f510038d4c04059c87f2181a2b6f87cb06d11bb0af0855a917f5e4456"));
//#endregion
export { getStudyStats as a, listLibrarySubjects as c, saveEnrollment as d, saveFlashcardDeck as f, updateWeeklyStudyMinutes as g, saveUpcomingTask as h, deleteUpcomingTask as i, listUpcomingTasks as l, saveStudyStats as m, deleteFlashcardDeck as n, listEnrollments as o, saveLibrarySubject as p, deleteLibrarySubject as r, listFlashcardDecks as s, deleteEnrollment as t, listWeeklyStudyLog as u };
