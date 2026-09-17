import { a as numberType, n as booleanType, o as objectType, r as enumType, s as stringType } from "../_libs/zod.mjs";
import { r as createServerFn } from "./server-CAmRZeTC.mjs";
import { t as requireAuth } from "./auth-middleware-BfmUN0Xt.mjs";
import { o as requirePageAction, t as createServerRpc } from "./rbac.server-ByRGwVyn.mjs";
import { a as MOCK_EXAMS, i as MISTAKES, n as CERTIFICATES, o as nextEvalId, r as EXAM_ATTEMPTS, t as BADGES } from "./student-evaluation-data-z7p3-_Ty.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/student-evaluation.functions-7I69RaqK.js
var listMockExams_createServerFn_handler = createServerRpc({
	id: "01b4b38b290ec4f0c228ccf6fa465f0271138e65c8a3a034d2e56b30c7e21592",
	name: "listMockExams",
	filename: "src/lib/student-evaluation.functions.ts"
}, (opts) => listMockExams.__executeServer(opts));
var listMockExams = createServerFn({ method: "GET" }).middleware([requireAuth]).handler(listMockExams_createServerFn_handler, async ({ context }) => {
	await requirePageAction(context.userId, "student_exam", "view_list");
	return MOCK_EXAMS;
});
var saveMockExam_createServerFn_handler = createServerRpc({
	id: "bce7cbd8d456443d3108ffdb7717f92294be712c707897e2f62946bf50218fb4",
	name: "saveMockExam",
	filename: "src/lib/student-evaluation.functions.ts"
}, (opts) => saveMockExam.__executeServer(opts));
var saveMockExam = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({
	id: stringType().optional(),
	title: stringType().trim().min(2, "العنوان مطلوب"),
	questionsCount: numberType().int().min(1),
	minutesLimit: numberType().int().min(1)
}).parse(input)).handler(saveMockExam_createServerFn_handler, async ({ data, context }) => {
	await requirePageAction(context.userId, "student_exam", data.id ? "edit" : "execute_add");
	if (data.id) {
		const row = MOCK_EXAMS.find((r) => r.id === data.id);
		if (!row) throw new Error("الامتحان غير موجود");
		Object.assign(row, data);
	} else {
		const row = {
			id: nextEvalId("mex"),
			...data
		};
		MOCK_EXAMS.push(row);
	}
	return { ok: true };
});
var deleteMockExam_createServerFn_handler = createServerRpc({
	id: "75b51c1700489c67a9f42d44c24d6453e0a5fd6e33142b55e64c66be139a4b1a",
	name: "deleteMockExam",
	filename: "src/lib/student-evaluation.functions.ts"
}, (opts) => deleteMockExam.__executeServer(opts));
var deleteMockExam = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({ id: stringType() }).parse(input)).handler(deleteMockExam_createServerFn_handler, async ({ data, context }) => {
	await requirePageAction(context.userId, "student_exam", "delete");
	const idx = MOCK_EXAMS.findIndex((r) => r.id === data.id);
	if (idx !== -1) MOCK_EXAMS.splice(idx, 1);
	return { ok: true };
});
var listExamAttempts_createServerFn_handler = createServerRpc({
	id: "2e8a1e2d6a5ac6cc952a211df608f4bc11a0220942009d541b90c219f64ecffc",
	name: "listExamAttempts",
	filename: "src/lib/student-evaluation.functions.ts"
}, (opts) => listExamAttempts.__executeServer(opts));
var listExamAttempts = createServerFn({ method: "GET" }).middleware([requireAuth]).handler(listExamAttempts_createServerFn_handler, async ({ context }) => {
	await requirePageAction(context.userId, "student_exam", "view_list");
	return EXAM_ATTEMPTS;
});
var saveExamAttempt_createServerFn_handler = createServerRpc({
	id: "fd3f8856e18c0531faead66053f0abf0250c621b380502c4b7741f9db76122db",
	name: "saveExamAttempt",
	filename: "src/lib/student-evaluation.functions.ts"
}, (opts) => saveExamAttempt.__executeServer(opts));
var saveExamAttempt = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({
	id: stringType().optional(),
	examTitle: stringType().trim().min(2, "اسم الامتحان مطلوب"),
	dateLabel: stringType().trim().min(1, "التاريخ مطلوب"),
	scorePercent: numberType().min(0).max(100),
	minutesTaken: numberType().int().min(0)
}).parse(input)).handler(saveExamAttempt_createServerFn_handler, async ({ data, context }) => {
	await requirePageAction(context.userId, "student_exam", data.id ? "edit" : "execute_add");
	if (data.id) {
		const row = EXAM_ATTEMPTS.find((r) => r.id === data.id);
		if (!row) throw new Error("النتيجة غير موجودة");
		Object.assign(row, data);
	} else {
		const row = {
			id: nextEvalId("att"),
			...data
		};
		EXAM_ATTEMPTS.push(row);
	}
	return { ok: true };
});
var deleteExamAttempt_createServerFn_handler = createServerRpc({
	id: "c1e8c448e2a2a2dd953830cda84818456adf43eb74b08e3d5b2ff21dd95e5cd2",
	name: "deleteExamAttempt",
	filename: "src/lib/student-evaluation.functions.ts"
}, (opts) => deleteExamAttempt.__executeServer(opts));
var deleteExamAttempt = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({ id: stringType() }).parse(input)).handler(deleteExamAttempt_createServerFn_handler, async ({ data, context }) => {
	await requirePageAction(context.userId, "student_exam", "delete");
	const idx = EXAM_ATTEMPTS.findIndex((r) => r.id === data.id);
	if (idx !== -1) EXAM_ATTEMPTS.splice(idx, 1);
	return { ok: true };
});
var listMistakes_createServerFn_handler = createServerRpc({
	id: "d1f564b66ffb74be362e9a8061f9a25882969ff1a6a17ffa77ceef15ae6e20fb",
	name: "listMistakes",
	filename: "src/lib/student-evaluation.functions.ts"
}, (opts) => listMistakes.__executeServer(opts));
var listMistakes = createServerFn({ method: "GET" }).middleware([requireAuth]).handler(listMistakes_createServerFn_handler, async ({ context }) => {
	await requirePageAction(context.userId, "student_mistakes", "view_list");
	return MISTAKES;
});
var saveMistake_createServerFn_handler = createServerRpc({
	id: "ee61da048e39adc5e4bea8de9656d5b8604a79f26d6855c016c92c892ee2a5a6",
	name: "saveMistake",
	filename: "src/lib/student-evaluation.functions.ts"
}, (opts) => saveMistake.__executeServer(opts));
var saveMistake = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({
	id: stringType().optional(),
	questionTitle: stringType().trim().min(2, "السؤال مطلوب"),
	subjectName: stringType().trim().min(2, "المادة مطلوبة"),
	wrongCount: numberType().int().min(1),
	status: enumType([
		"أولوية",
		"مراجعة",
		"مُتقن"
	])
}).parse(input)).handler(saveMistake_createServerFn_handler, async ({ data, context }) => {
	await requirePageAction(context.userId, "student_mistakes", data.id ? "edit" : "execute_add");
	if (data.id) {
		const row = MISTAKES.find((r) => r.id === data.id);
		if (!row) throw new Error("الخطأ غير موجود");
		Object.assign(row, data);
	} else {
		const row = {
			id: nextEvalId("mis"),
			...data
		};
		MISTAKES.push(row);
	}
	return { ok: true };
});
var deleteMistake_createServerFn_handler = createServerRpc({
	id: "27f6a1974f6c0ce015b01a8d6a55e178f8925b1397cfb0192e0ee019fa8b6f14",
	name: "deleteMistake",
	filename: "src/lib/student-evaluation.functions.ts"
}, (opts) => deleteMistake.__executeServer(opts));
var deleteMistake = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({ id: stringType() }).parse(input)).handler(deleteMistake_createServerFn_handler, async ({ data, context }) => {
	await requirePageAction(context.userId, "student_mistakes", "delete");
	const idx = MISTAKES.findIndex((r) => r.id === data.id);
	if (idx !== -1) MISTAKES.splice(idx, 1);
	return { ok: true };
});
var listBadges_createServerFn_handler = createServerRpc({
	id: "91ad62af6b8d295f62a87a904d573184825ae3464eb755c0e0aa930e4cd55e48",
	name: "listBadges",
	filename: "src/lib/student-evaluation.functions.ts"
}, (opts) => listBadges.__executeServer(opts));
var listBadges = createServerFn({ method: "GET" }).middleware([requireAuth]).handler(listBadges_createServerFn_handler, async ({ context }) => {
	await requirePageAction(context.userId, "student_achievements", "view_list");
	return BADGES;
});
var saveBadge_createServerFn_handler = createServerRpc({
	id: "945fc542d0be400d54cc6a72f54d7338a794e0b6c7039394b943cbc5c8239271",
	name: "saveBadge",
	filename: "src/lib/student-evaluation.functions.ts"
}, (opts) => saveBadge.__executeServer(opts));
var saveBadge = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({
	id: stringType().optional(),
	title: stringType().trim().min(2, "العنوان مطلوب"),
	subtitle: stringType().trim().min(1, "الوصف مطلوب"),
	unlocked: booleanType()
}).parse(input)).handler(saveBadge_createServerFn_handler, async ({ data, context }) => {
	await requirePageAction(context.userId, "student_achievements", data.id ? "edit" : "execute_add");
	if (data.id) {
		const row = BADGES.find((r) => r.id === data.id);
		if (!row) throw new Error("الشارة غير موجودة");
		Object.assign(row, data);
	} else {
		const row = {
			id: nextEvalId("bdg"),
			...data
		};
		BADGES.push(row);
	}
	return { ok: true };
});
var deleteBadge_createServerFn_handler = createServerRpc({
	id: "418b07ce79b342a649fe30b3140667e82a3a02c6e14dbb0b84b49c40d4953e73",
	name: "deleteBadge",
	filename: "src/lib/student-evaluation.functions.ts"
}, (opts) => deleteBadge.__executeServer(opts));
var deleteBadge = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({ id: stringType() }).parse(input)).handler(deleteBadge_createServerFn_handler, async ({ data, context }) => {
	await requirePageAction(context.userId, "student_achievements", "delete");
	const idx = BADGES.findIndex((r) => r.id === data.id);
	if (idx !== -1) BADGES.splice(idx, 1);
	return { ok: true };
});
var listCertificates_createServerFn_handler = createServerRpc({
	id: "9a5b63325de13a5610393f496963c564fc79b1295b9e3bee718459ae63860e75",
	name: "listCertificates",
	filename: "src/lib/student-evaluation.functions.ts"
}, (opts) => listCertificates.__executeServer(opts));
var listCertificates = createServerFn({ method: "GET" }).middleware([requireAuth]).handler(listCertificates_createServerFn_handler, async ({ context }) => {
	await requirePageAction(context.userId, "student_certificates", "view_list");
	return CERTIFICATES;
});
var saveCertificate_createServerFn_handler = createServerRpc({
	id: "2da25a012327275c20e5155f1253847d7e3a65bb7b65df80ab296575333cd8df",
	name: "saveCertificate",
	filename: "src/lib/student-evaluation.functions.ts"
}, (opts) => saveCertificate.__executeServer(opts));
var saveCertificate = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({
	id: stringType().optional(),
	courseTitle: stringType().trim().min(2, "اسم الكورس مطلوب"),
	code: stringType().trim().min(2, "الرمز مطلوب"),
	status: enumType(["صادرة", "قيد الإصدار"]),
	shareCount: numberType().int().min(0)
}).parse(input)).handler(saveCertificate_createServerFn_handler, async ({ data, context }) => {
	await requirePageAction(context.userId, "student_certificates", data.id ? "edit" : "execute_add");
	if (data.id) {
		const row = CERTIFICATES.find((r) => r.id === data.id);
		if (!row) throw new Error("الشهادة غير موجودة");
		Object.assign(row, data);
	} else {
		const row = {
			id: nextEvalId("cert"),
			...data
		};
		CERTIFICATES.push(row);
	}
	return { ok: true };
});
var deleteCertificate_createServerFn_handler = createServerRpc({
	id: "695cad4d1c8a806b887eaeac011a814b9a0cca773e8f1a6d2c75e67e0e0153ac",
	name: "deleteCertificate",
	filename: "src/lib/student-evaluation.functions.ts"
}, (opts) => deleteCertificate.__executeServer(opts));
var deleteCertificate = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({ id: stringType() }).parse(input)).handler(deleteCertificate_createServerFn_handler, async ({ data, context }) => {
	await requirePageAction(context.userId, "student_certificates", "delete");
	const idx = CERTIFICATES.findIndex((r) => r.id === data.id);
	if (idx !== -1) CERTIFICATES.splice(idx, 1);
	return { ok: true };
});
//#endregion
export { deleteBadge_createServerFn_handler, deleteCertificate_createServerFn_handler, deleteExamAttempt_createServerFn_handler, deleteMistake_createServerFn_handler, deleteMockExam_createServerFn_handler, listBadges_createServerFn_handler, listCertificates_createServerFn_handler, listExamAttempts_createServerFn_handler, listMistakes_createServerFn_handler, listMockExams_createServerFn_handler, saveBadge_createServerFn_handler, saveCertificate_createServerFn_handler, saveExamAttempt_createServerFn_handler, saveMistake_createServerFn_handler, saveMockExam_createServerFn_handler };
