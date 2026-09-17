import { a as numberType, n as booleanType, o as objectType, r as enumType, s as stringType } from "../_libs/zod.mjs";
import { r as createServerFn } from "./server-CAmRZeTC.mjs";
import { t as requireAuth } from "./auth-middleware-BfmUN0Xt.mjs";
import { o as requirePageAction, t as createServerRpc } from "./rbac.server-ByRGwVyn.mjs";
import { n as COMMUNITY_QUESTIONS } from "./student-social-data-NYvD98SY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/teacher-followup.functions-DKi1wrs-.js
var GRADING_ITEMS = [];
var MISSED_QUESTIONS = [];
var EARNING_TRANSACTIONS = [];
var EARNINGS_SETTINGS = { platformFeePercent: null };
function nextFollowUpId(prefix) {
	return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}
var listGradingItems_createServerFn_handler = createServerRpc({
	id: "294ec8e2d8f9e5df14c50f019e0209a9b06c5af393a22951f9bca7c298ede5bd",
	name: "listGradingItems",
	filename: "src/lib/teacher-followup.functions.ts"
}, (opts) => listGradingItems.__executeServer(opts));
var listGradingItems = createServerFn({ method: "GET" }).middleware([requireAuth]).handler(listGradingItems_createServerFn_handler, async ({ context }) => {
	await requirePageAction(context.userId, "teacher_grading", "view_list");
	return GRADING_ITEMS;
});
var saveGradingItem_createServerFn_handler = createServerRpc({
	id: "921deed49d145b5eb4ffac69340f9a6fed4ee5ad703f1f51f2719311dc6ff74d",
	name: "saveGradingItem",
	filename: "src/lib/teacher-followup.functions.ts"
}, (opts) => saveGradingItem.__executeServer(opts));
var saveGradingItem = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({
	id: stringType().optional(),
	studentName: stringType().trim().min(2, "اسم الطالب مطلوب"),
	itemTitle: stringType().trim().min(2, "العنوان مطلوب"),
	submittedLabel: stringType().trim().min(1),
	status: enumType(["بانتظار", "مُصحّح"]),
	overdue: booleanType()
}).parse(input)).handler(saveGradingItem_createServerFn_handler, async ({ data, context }) => {
	await requirePageAction(context.userId, "teacher_grading", data.id ? "edit" : "execute_add");
	if (data.id) {
		const row = GRADING_ITEMS.find((r) => r.id === data.id);
		if (!row) throw new Error("العنصر غير موجود");
		Object.assign(row, data);
	} else {
		const row = {
			id: nextFollowUpId("gr"),
			...data
		};
		GRADING_ITEMS.push(row);
	}
	return { ok: true };
});
var deleteGradingItem_createServerFn_handler = createServerRpc({
	id: "9203fa811ec2ac027652c40c776c72cf6ce7147fcef0bb4ec8adb8b036391504",
	name: "deleteGradingItem",
	filename: "src/lib/teacher-followup.functions.ts"
}, (opts) => deleteGradingItem.__executeServer(opts));
var deleteGradingItem = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({ id: stringType() }).parse(input)).handler(deleteGradingItem_createServerFn_handler, async ({ data, context }) => {
	await requirePageAction(context.userId, "teacher_grading", "delete");
	const idx = GRADING_ITEMS.findIndex((r) => r.id === data.id);
	if (idx !== -1) GRADING_ITEMS.splice(idx, 1);
	return { ok: true };
});
var listMissedQuestions_createServerFn_handler = createServerRpc({
	id: "0e9225b5d4ead44c6d2f6c3224ab114f0d9551a98bbba1412844bfcab1960886",
	name: "listMissedQuestions",
	filename: "src/lib/teacher-followup.functions.ts"
}, (opts) => listMissedQuestions.__executeServer(opts));
var listMissedQuestions = createServerFn({ method: "GET" }).middleware([requireAuth]).handler(listMissedQuestions_createServerFn_handler, async ({ context }) => {
	await requirePageAction(context.userId, "teacher_analytics", "view_list");
	return MISSED_QUESTIONS;
});
var saveMissedQuestion_createServerFn_handler = createServerRpc({
	id: "134b6e150577acc595975e0bb5061b772ebcf7f0dd92ea5ff0727cbeb0301c3b",
	name: "saveMissedQuestion",
	filename: "src/lib/teacher-followup.functions.ts"
}, (opts) => saveMissedQuestion.__executeServer(opts));
var saveMissedQuestion = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({
	id: stringType().optional(),
	questionTitle: stringType().trim().min(2, "السؤال مطلوب"),
	wrongPercent: numberType().min(0).max(100),
	priority: enumType(["أولوية", "مراجعة"])
}).parse(input)).handler(saveMissedQuestion_createServerFn_handler, async ({ data, context }) => {
	await requirePageAction(context.userId, "teacher_analytics", data.id ? "edit" : "execute_add");
	if (data.id) {
		const row = MISSED_QUESTIONS.find((r) => r.id === data.id);
		if (!row) throw new Error("السؤال غير موجود");
		Object.assign(row, data);
	} else {
		const row = {
			id: nextFollowUpId("mq"),
			...data
		};
		MISSED_QUESTIONS.push(row);
	}
	return { ok: true };
});
var deleteMissedQuestion_createServerFn_handler = createServerRpc({
	id: "d80caf0f098c78aa31057f108a5036656499fffe79d5b70cadf485c32ab37432",
	name: "deleteMissedQuestion",
	filename: "src/lib/teacher-followup.functions.ts"
}, (opts) => deleteMissedQuestion.__executeServer(opts));
var deleteMissedQuestion = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({ id: stringType() }).parse(input)).handler(deleteMissedQuestion_createServerFn_handler, async ({ data, context }) => {
	await requirePageAction(context.userId, "teacher_analytics", "delete");
	const idx = MISSED_QUESTIONS.findIndex((r) => r.id === data.id);
	if (idx !== -1) MISSED_QUESTIONS.splice(idx, 1);
	return { ok: true };
});
var listEarningTransactions_createServerFn_handler = createServerRpc({
	id: "e85e65d08be80a40f13d7d67fe76b58f651e36f9498cfe7896f283cab10cfe15",
	name: "listEarningTransactions",
	filename: "src/lib/teacher-followup.functions.ts"
}, (opts) => listEarningTransactions.__executeServer(opts));
var listEarningTransactions = createServerFn({ method: "GET" }).middleware([requireAuth]).handler(listEarningTransactions_createServerFn_handler, async ({ context }) => {
	await requirePageAction(context.userId, "teacher_earnings", "view_list");
	return EARNING_TRANSACTIONS;
});
var saveEarningTransaction_createServerFn_handler = createServerRpc({
	id: "28ea03d2a77b25a144e20c579c47d14356ecd05d2fc28f26d945872a790f27e2",
	name: "saveEarningTransaction",
	filename: "src/lib/teacher-followup.functions.ts"
}, (opts) => saveEarningTransaction.__executeServer(opts));
var saveEarningTransaction = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({
	id: stringType().optional(),
	dateLabel: stringType().trim().min(1, "التاريخ مطلوب"),
	description: stringType().trim().min(2, "الوصف مطلوب"),
	amount: numberType(),
	status: enumType(["مؤكد", "قيد التنفيذ"])
}).parse(input)).handler(saveEarningTransaction_createServerFn_handler, async ({ data, context }) => {
	await requirePageAction(context.userId, "teacher_earnings", data.id ? "edit" : "execute_add");
	if (data.id) {
		const row = EARNING_TRANSACTIONS.find((r) => r.id === data.id);
		if (!row) throw new Error("الحركة غير موجودة");
		Object.assign(row, data);
	} else {
		const row = {
			id: nextFollowUpId("et"),
			...data
		};
		EARNING_TRANSACTIONS.push(row);
	}
	return { ok: true };
});
var deleteEarningTransaction_createServerFn_handler = createServerRpc({
	id: "acb22b735a6fb0cbf09ef91baa2afd1036a7b029a71bc38dd10cd11057cc08ec",
	name: "deleteEarningTransaction",
	filename: "src/lib/teacher-followup.functions.ts"
}, (opts) => deleteEarningTransaction.__executeServer(opts));
var deleteEarningTransaction = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({ id: stringType() }).parse(input)).handler(deleteEarningTransaction_createServerFn_handler, async ({ data, context }) => {
	await requirePageAction(context.userId, "teacher_earnings", "delete");
	const idx = EARNING_TRANSACTIONS.findIndex((r) => r.id === data.id);
	if (idx !== -1) EARNING_TRANSACTIONS.splice(idx, 1);
	return { ok: true };
});
var getEarningsSettings_createServerFn_handler = createServerRpc({
	id: "68a81ce4253f3fa0977094bd590deebe808b79a5ac367ce3021b1b8201e1aa71",
	name: "getEarningsSettings",
	filename: "src/lib/teacher-followup.functions.ts"
}, (opts) => getEarningsSettings.__executeServer(opts));
var getEarningsSettings = createServerFn({ method: "GET" }).middleware([requireAuth]).handler(getEarningsSettings_createServerFn_handler, async ({ context }) => {
	await requirePageAction(context.userId, "teacher_earnings", "view_list");
	return EARNINGS_SETTINGS;
});
var listClassQuestions_createServerFn_handler = createServerRpc({
	id: "c0f30b4ddc2906ecbdfbd3d966737a517ff1e17a7cf74945adf1f3fb7e645555",
	name: "listClassQuestions",
	filename: "src/lib/teacher-followup.functions.ts"
}, (opts) => listClassQuestions.__executeServer(opts));
var listClassQuestions = createServerFn({ method: "GET" }).middleware([requireAuth]).handler(listClassQuestions_createServerFn_handler, async ({ context }) => {
	await requirePageAction(context.userId, "teacher_community", "view_list");
	return COMMUNITY_QUESTIONS;
});
var answerClassQuestion_createServerFn_handler = createServerRpc({
	id: "43034ba5488c5d32e01aa75ef9f1e1e1ee98c15f764a228306aeec19f47a675e",
	name: "answerClassQuestion",
	filename: "src/lib/teacher-followup.functions.ts"
}, (opts) => answerClassQuestion.__executeServer(opts));
var answerClassQuestion = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({ id: stringType() }).parse(input)).handler(answerClassQuestion_createServerFn_handler, async ({ data, context }) => {
	await requirePageAction(context.userId, "teacher_community", "edit");
	const row = COMMUNITY_QUESTIONS.find((r) => r.id === data.id);
	if (!row) throw new Error("السؤال غير موجود");
	row.status = "إجابة معلم";
	row.answersCount += 1;
	return { ok: true };
});
//#endregion
export { answerClassQuestion_createServerFn_handler, deleteEarningTransaction_createServerFn_handler, deleteGradingItem_createServerFn_handler, deleteMissedQuestion_createServerFn_handler, getEarningsSettings_createServerFn_handler, listClassQuestions_createServerFn_handler, listEarningTransactions_createServerFn_handler, listGradingItems_createServerFn_handler, listMissedQuestions_createServerFn_handler, saveEarningTransaction_createServerFn_handler, saveGradingItem_createServerFn_handler, saveMissedQuestion_createServerFn_handler };
