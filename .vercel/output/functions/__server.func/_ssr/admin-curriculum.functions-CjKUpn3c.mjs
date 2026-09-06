import { r as createServerFn } from "./server-EBKWEHZn.mjs";
import { t as createSsrRpc } from "./createSsrRpc-Deneh4is.mjs";
import { t as requireAuth } from "./auth-middleware-yb1wlLWh.mjs";
import { a as numberType, o as objectType, r as enumType, s as stringType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-curriculum.functions-CjKUpn3c.js
var listPayments = createServerFn({ method: "GET" }).middleware([requireAuth]).handler(createSsrRpc("36a8e7d90d5348651f19caedef1e6f85c726796880875c08195ff27478e958f9"));
var savePayment = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({
	id: stringType().optional(),
	userName: stringType().trim().min(2, "اسم المستخدم مطلوب"),
	amount: numberType().positive("القيمة يجب أن تكون أكبر من صفر"),
	status: enumType([
		"ناجحة",
		"قيد المعالجة",
		"مستردة",
		"فاشلة"
	])
}).parse(input)).handler(createSsrRpc("1aa2c603834f631d21aa55beb8f31f4cad7b25015ab0ba458e6e8037d643cfa0"));
var deletePayment = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({ id: stringType() }).parse(input)).handler(createSsrRpc("034b2c7e0457f7f9fe084fe9c10a268ed12ece6f6759483be1d0fb7626214e9e"));
var listCurriculumSubjects = createServerFn({ method: "GET" }).middleware([requireAuth]).handler(createSsrRpc("67db82ff34958c94d174d9ffd634e4353214393ef2c611406ffd6e1640ad5a50"));
var saveCurriculumSubject = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({
	id: stringType().optional(),
	grade: stringType().trim().min(2, "الصف مطلوب"),
	group: stringType().trim().min(2, "المجموعة مطلوبة"),
	subject: stringType().trim().min(2, "المادة مطلوبة"),
	coursesCount: numberType().int().min(0)
}).parse(input)).handler(createSsrRpc("2dcce702ae8e9d1d5bcd639f6df6f6770645e2b85d5defa21c2cd96c75e403b9"));
var deleteCurriculumSubject = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({ id: stringType() }).parse(input)).handler(createSsrRpc("24b7fee05f05712113783e48c2588dd641918416675f8198d5edc201cae7e5c4"));
var listCurriculumRequests = createServerFn({ method: "GET" }).middleware([requireAuth]).handler(createSsrRpc("617da2fce10778a130663075e1c4855b64c29e398152cf902261d45e10f33abe"));
var saveCurriculumRequest = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({
	id: stringType().optional(),
	title: stringType().trim().min(2, "العنوان مطلوب"),
	requesterName: stringType().trim().min(2, "اسم مقدّم الطلب مطلوب"),
	entityType: enumType([
		"وحدة",
		"مادة",
		"مجموعة",
		"صف",
		"كورس"
	]),
	status: enumType([
		"جديد",
		"قيد الدراسة",
		"جاهز للاعتماد",
		"معتمد",
		"مرفوض"
	])
}).parse(input)).handler(createSsrRpc("8dd3b6c45a9fa119db1efc19b61bbc7d694b6a41d1131f75bc982368db282a4b"));
var deleteCurriculumRequest = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({ id: stringType() }).parse(input)).handler(createSsrRpc("14dfeae8f7c297e388b050fbeac55256ab956a86fd37cf51a12393eb41b8ee71"));
//#endregion
export { listCurriculumSubjects as a, saveCurriculumSubject as c, listCurriculumRequests as i, savePayment as l, deleteCurriculumSubject as n, listPayments as o, deletePayment as r, saveCurriculumRequest as s, deleteCurriculumRequest as t };
