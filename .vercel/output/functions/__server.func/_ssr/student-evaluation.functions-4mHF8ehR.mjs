import { c as createServerFn } from "./createServerFn-TbS7u0_2.mjs";
import { t as createSsrRpc } from "./createSsrRpc-DYGk39x2.mjs";
import { t as requireAuth } from "./auth-middleware-DukBAMOp.mjs";
import { a as numberType, n as booleanType, o as objectType, r as enumType, s as stringType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/student-evaluation.functions-4mHF8ehR.js
var listMockExams = createServerFn({ method: "GET" }).middleware([requireAuth]).handler(createSsrRpc("01b4b38b290ec4f0c228ccf6fa465f0271138e65c8a3a034d2e56b30c7e21592"));
var saveMockExam = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({
	id: stringType().optional(),
	title: stringType().trim().min(2, "العنوان مطلوب"),
	questionsCount: numberType().int().min(1),
	minutesLimit: numberType().int().min(1)
}).parse(input)).handler(createSsrRpc("bce7cbd8d456443d3108ffdb7717f92294be712c707897e2f62946bf50218fb4"));
var deleteMockExam = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({ id: stringType() }).parse(input)).handler(createSsrRpc("75b51c1700489c67a9f42d44c24d6453e0a5fd6e33142b55e64c66be139a4b1a"));
var listExamAttempts = createServerFn({ method: "GET" }).middleware([requireAuth]).handler(createSsrRpc("2e8a1e2d6a5ac6cc952a211df608f4bc11a0220942009d541b90c219f64ecffc"));
var saveExamAttempt = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({
	id: stringType().optional(),
	examTitle: stringType().trim().min(2, "اسم الامتحان مطلوب"),
	dateLabel: stringType().trim().min(1, "التاريخ مطلوب"),
	scorePercent: numberType().min(0).max(100),
	minutesTaken: numberType().int().min(0)
}).parse(input)).handler(createSsrRpc("fd3f8856e18c0531faead66053f0abf0250c621b380502c4b7741f9db76122db"));
var deleteExamAttempt = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({ id: stringType() }).parse(input)).handler(createSsrRpc("c1e8c448e2a2a2dd953830cda84818456adf43eb74b08e3d5b2ff21dd95e5cd2"));
var listMistakes = createServerFn({ method: "GET" }).middleware([requireAuth]).handler(createSsrRpc("d1f564b66ffb74be362e9a8061f9a25882969ff1a6a17ffa77ceef15ae6e20fb"));
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
}).parse(input)).handler(createSsrRpc("ee61da048e39adc5e4bea8de9656d5b8604a79f26d6855c016c92c892ee2a5a6"));
var deleteMistake = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({ id: stringType() }).parse(input)).handler(createSsrRpc("27f6a1974f6c0ce015b01a8d6a55e178f8925b1397cfb0192e0ee019fa8b6f14"));
var listBadges = createServerFn({ method: "GET" }).middleware([requireAuth]).handler(createSsrRpc("91ad62af6b8d295f62a87a904d573184825ae3464eb755c0e0aa930e4cd55e48"));
var saveBadge = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({
	id: stringType().optional(),
	title: stringType().trim().min(2, "العنوان مطلوب"),
	subtitle: stringType().trim().min(1, "الوصف مطلوب"),
	unlocked: booleanType()
}).parse(input)).handler(createSsrRpc("945fc542d0be400d54cc6a72f54d7338a794e0b6c7039394b943cbc5c8239271"));
var deleteBadge = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({ id: stringType() }).parse(input)).handler(createSsrRpc("418b07ce79b342a649fe30b3140667e82a3a02c6e14dbb0b84b49c40d4953e73"));
var listCertificates = createServerFn({ method: "GET" }).middleware([requireAuth]).handler(createSsrRpc("9a5b63325de13a5610393f496963c564fc79b1295b9e3bee718459ae63860e75"));
var saveCertificate = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({
	id: stringType().optional(),
	courseTitle: stringType().trim().min(2, "اسم الكورس مطلوب"),
	code: stringType().trim().min(2, "الرمز مطلوب"),
	status: enumType(["صادرة", "قيد الإصدار"]),
	shareCount: numberType().int().min(0)
}).parse(input)).handler(createSsrRpc("2da25a012327275c20e5155f1253847d7e3a65bb7b65df80ab296575333cd8df"));
var deleteCertificate = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({ id: stringType() }).parse(input)).handler(createSsrRpc("695cad4d1c8a806b887eaeac011a814b9a0cca773e8f1a6d2c75e67e0e0153ac"));
//#endregion
export { deleteMockExam as a, listExamAttempts as c, saveBadge as d, saveCertificate as f, saveMockExam as h, deleteMistake as i, listMistakes as l, saveMistake as m, deleteCertificate as n, listBadges as o, saveExamAttempt as p, deleteExamAttempt as r, listCertificates as s, deleteBadge as t, listMockExams as u };
