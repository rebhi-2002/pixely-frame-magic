import { a as numberType, o as objectType, r as enumType, s as stringType } from "../_libs/zod.mjs";
import { r as createServerFn } from "./server-oWHHg8-O.mjs";
import { t as requireAuth } from "./auth-middleware-DygD5oX-.mjs";
import { s as requirePermission, t as createServerRpc } from "./rbac.server-Da2HCyeN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-curriculum.functions-CHLE8cJX.js
var PAYMENTS = [];
var CURRICULUM_SUBJECTS = [
	{
		id: "cur-1",
		grade: "الثاني عشر",
		group: "العلمي",
		subject: "الفيزياء",
		coursesCount: 0
	},
	{
		id: "cur-2",
		grade: "الثاني عشر",
		group: "العلمي",
		subject: "الرياضيات",
		coursesCount: 0
	},
	{
		id: "cur-3",
		grade: "الحادي عشر",
		group: "الأدبي",
		subject: "اللغة العربية",
		coursesCount: 0
	}
];
var CURRICULUM_REQUESTS = [];
function nextCurriculumId(prefix) {
	return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}
var listPayments_createServerFn_handler = createServerRpc({
	id: "36a8e7d90d5348651f19caedef1e6f85c726796880875c08195ff27478e958f9",
	name: "listPayments",
	filename: "src/lib/admin-curriculum.functions.ts"
}, (opts) => listPayments.__executeServer(opts));
var listPayments = createServerFn({ method: "GET" }).middleware([requireAuth]).handler(listPayments_createServerFn_handler, async ({ context }) => {
	await requirePermission(context.userId, "admin_payments", "view_list");
	return PAYMENTS;
});
var savePayment_createServerFn_handler = createServerRpc({
	id: "1aa2c603834f631d21aa55beb8f31f4cad7b25015ab0ba458e6e8037d643cfa0",
	name: "savePayment",
	filename: "src/lib/admin-curriculum.functions.ts"
}, (opts) => savePayment.__executeServer(opts));
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
}).parse(input)).handler(savePayment_createServerFn_handler, async ({ data, context }) => {
	await requirePermission(context.userId, "admin_payments", data.id ? "edit" : "execute_add");
	if (data.id) {
		const row = PAYMENTS.find((r) => r.id === data.id);
		if (!row) throw new Error("العملية غير موجودة");
		row.userName = data.userName;
		row.amount = data.amount;
		row.status = data.status;
	} else {
		const row = {
			id: nextCurriculumId("pay"),
			code: `#PAY-${Math.floor(9e3 + Math.random() * 999)}`,
			userName: data.userName,
			amount: data.amount,
			status: data.status
		};
		PAYMENTS.push(row);
	}
	return { ok: true };
});
var deletePayment_createServerFn_handler = createServerRpc({
	id: "034b2c7e0457f7f9fe084fe9c10a268ed12ece6f6759483be1d0fb7626214e9e",
	name: "deletePayment",
	filename: "src/lib/admin-curriculum.functions.ts"
}, (opts) => deletePayment.__executeServer(opts));
var deletePayment = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({ id: stringType() }).parse(input)).handler(deletePayment_createServerFn_handler, async ({ data, context }) => {
	await requirePermission(context.userId, "admin_payments", "delete");
	const idx = PAYMENTS.findIndex((r) => r.id === data.id);
	if (idx !== -1) PAYMENTS.splice(idx, 1);
	return { ok: true };
});
var listCurriculumSubjects_createServerFn_handler = createServerRpc({
	id: "67db82ff34958c94d174d9ffd634e4353214393ef2c611406ffd6e1640ad5a50",
	name: "listCurriculumSubjects",
	filename: "src/lib/admin-curriculum.functions.ts"
}, (opts) => listCurriculumSubjects.__executeServer(opts));
var listCurriculumSubjects = createServerFn({ method: "GET" }).middleware([requireAuth]).handler(listCurriculumSubjects_createServerFn_handler, async ({ context }) => {
	await requirePermission(context.userId, "admin_curriculum", "view_list");
	return CURRICULUM_SUBJECTS;
});
var saveCurriculumSubject_createServerFn_handler = createServerRpc({
	id: "2dcce702ae8e9d1d5bcd639f6df6f6770645e2b85d5defa21c2cd96c75e403b9",
	name: "saveCurriculumSubject",
	filename: "src/lib/admin-curriculum.functions.ts"
}, (opts) => saveCurriculumSubject.__executeServer(opts));
var saveCurriculumSubject = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({
	id: stringType().optional(),
	grade: stringType().trim().min(2, "الصف مطلوب"),
	group: stringType().trim().min(2, "المجموعة مطلوبة"),
	subject: stringType().trim().min(2, "المادة مطلوبة"),
	coursesCount: numberType().int().min(0)
}).parse(input)).handler(saveCurriculumSubject_createServerFn_handler, async ({ data, context }) => {
	await requirePermission(context.userId, "admin_curriculum", data.id ? "edit" : "execute_add");
	if (data.id) {
		const row = CURRICULUM_SUBJECTS.find((r) => r.id === data.id);
		if (!row) throw new Error("المادة غير موجودة");
		row.grade = data.grade;
		row.group = data.group;
		row.subject = data.subject;
		row.coursesCount = data.coursesCount;
	} else {
		const row = {
			id: nextCurriculumId("cur"),
			grade: data.grade,
			group: data.group,
			subject: data.subject,
			coursesCount: data.coursesCount
		};
		CURRICULUM_SUBJECTS.push(row);
	}
	return { ok: true };
});
var deleteCurriculumSubject_createServerFn_handler = createServerRpc({
	id: "24b7fee05f05712113783e48c2588dd641918416675f8198d5edc201cae7e5c4",
	name: "deleteCurriculumSubject",
	filename: "src/lib/admin-curriculum.functions.ts"
}, (opts) => deleteCurriculumSubject.__executeServer(opts));
var deleteCurriculumSubject = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({ id: stringType() }).parse(input)).handler(deleteCurriculumSubject_createServerFn_handler, async ({ data, context }) => {
	await requirePermission(context.userId, "admin_curriculum", "delete");
	const idx = CURRICULUM_SUBJECTS.findIndex((r) => r.id === data.id);
	if (idx !== -1) CURRICULUM_SUBJECTS.splice(idx, 1);
	return { ok: true };
});
var listCurriculumRequests_createServerFn_handler = createServerRpc({
	id: "617da2fce10778a130663075e1c4855b64c29e398152cf902261d45e10f33abe",
	name: "listCurriculumRequests",
	filename: "src/lib/admin-curriculum.functions.ts"
}, (opts) => listCurriculumRequests.__executeServer(opts));
var listCurriculumRequests = createServerFn({ method: "GET" }).middleware([requireAuth]).handler(listCurriculumRequests_createServerFn_handler, async ({ context }) => {
	await requirePermission(context.userId, "admin_curriculum_requests", "view_list");
	return CURRICULUM_REQUESTS;
});
var saveCurriculumRequest_createServerFn_handler = createServerRpc({
	id: "8dd3b6c45a9fa119db1efc19b61bbc7d694b6a41d1131f75bc982368db282a4b",
	name: "saveCurriculumRequest",
	filename: "src/lib/admin-curriculum.functions.ts"
}, (opts) => saveCurriculumRequest.__executeServer(opts));
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
}).parse(input)).handler(saveCurriculumRequest_createServerFn_handler, async ({ data, context }) => {
	await requirePermission(context.userId, "admin_curriculum_requests", data.id ? "edit" : "execute_add");
	if (data.id) {
		const row = CURRICULUM_REQUESTS.find((r) => r.id === data.id);
		if (!row) throw new Error("الطلب غير موجود");
		row.title = data.title;
		row.requesterName = data.requesterName;
		row.entityType = data.entityType;
		row.status = data.status;
	} else {
		const row = {
			id: nextCurriculumId("creq"),
			title: data.title,
			requesterName: data.requesterName,
			entityType: data.entityType,
			status: data.status
		};
		CURRICULUM_REQUESTS.push(row);
	}
	return { ok: true };
});
var deleteCurriculumRequest_createServerFn_handler = createServerRpc({
	id: "14dfeae8f7c297e388b050fbeac55256ab956a86fd37cf51a12393eb41b8ee71",
	name: "deleteCurriculumRequest",
	filename: "src/lib/admin-curriculum.functions.ts"
}, (opts) => deleteCurriculumRequest.__executeServer(opts));
var deleteCurriculumRequest = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({ id: stringType() }).parse(input)).handler(deleteCurriculumRequest_createServerFn_handler, async ({ data, context }) => {
	await requirePermission(context.userId, "admin_curriculum_requests", "delete");
	const idx = CURRICULUM_REQUESTS.findIndex((r) => r.id === data.id);
	if (idx !== -1) CURRICULUM_REQUESTS.splice(idx, 1);
	return { ok: true };
});
//#endregion
export { deleteCurriculumRequest_createServerFn_handler, deleteCurriculumSubject_createServerFn_handler, deletePayment_createServerFn_handler, listCurriculumRequests_createServerFn_handler, listCurriculumSubjects_createServerFn_handler, listPayments_createServerFn_handler, saveCurriculumRequest_createServerFn_handler, saveCurriculumSubject_createServerFn_handler, savePayment_createServerFn_handler };
