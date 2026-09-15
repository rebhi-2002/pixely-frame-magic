import { r as createServerFn } from "./server-CA7E05d5.mjs";
import { t as createSsrRpc } from "./createSsrRpc-ByxigA6S.mjs";
import { t as requireAuth } from "./auth-middleware-qbhkJF0k.mjs";
import { a as numberType, n as booleanType, o as objectType, r as enumType, s as stringType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/teacher-followup.functions-DJjua4hP.js
var listGradingItems = createServerFn({ method: "GET" }).middleware([requireAuth]).handler(createSsrRpc("294ec8e2d8f9e5df14c50f019e0209a9b06c5af393a22951f9bca7c298ede5bd"));
var saveGradingItem = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({
	id: stringType().optional(),
	studentName: stringType().trim().min(2, "اسم الطالب مطلوب"),
	itemTitle: stringType().trim().min(2, "العنوان مطلوب"),
	submittedLabel: stringType().trim().min(1),
	status: enumType(["بانتظار", "مُصحّح"]),
	overdue: booleanType()
}).parse(input)).handler(createSsrRpc("921deed49d145b5eb4ffac69340f9a6fed4ee5ad703f1f51f2719311dc6ff74d"));
var deleteGradingItem = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({ id: stringType() }).parse(input)).handler(createSsrRpc("9203fa811ec2ac027652c40c776c72cf6ce7147fcef0bb4ec8adb8b036391504"));
var listMissedQuestions = createServerFn({ method: "GET" }).middleware([requireAuth]).handler(createSsrRpc("0e9225b5d4ead44c6d2f6c3224ab114f0d9551a98bbba1412844bfcab1960886"));
var saveMissedQuestion = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({
	id: stringType().optional(),
	questionTitle: stringType().trim().min(2, "السؤال مطلوب"),
	wrongPercent: numberType().min(0).max(100),
	priority: enumType(["أولوية", "مراجعة"])
}).parse(input)).handler(createSsrRpc("134b6e150577acc595975e0bb5061b772ebcf7f0dd92ea5ff0727cbeb0301c3b"));
var deleteMissedQuestion = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({ id: stringType() }).parse(input)).handler(createSsrRpc("d80caf0f098c78aa31057f108a5036656499fffe79d5b70cadf485c32ab37432"));
createServerFn({ method: "GET" }).middleware([requireAuth]).handler(createSsrRpc("e85e65d08be80a40f13d7d67fe76b58f651e36f9498cfe7896f283cab10cfe15"));
createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({
	id: stringType().optional(),
	dateLabel: stringType().trim().min(1, "التاريخ مطلوب"),
	description: stringType().trim().min(2, "الوصف مطلوب"),
	amount: numberType(),
	status: enumType(["مؤكد", "قيد التنفيذ"])
}).parse(input)).handler(createSsrRpc("28ea03d2a77b25a144e20c579c47d14356ecd05d2fc28f26d945872a790f27e2"));
createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({ id: stringType() }).parse(input)).handler(createSsrRpc("acb22b735a6fb0cbf09ef91baa2afd1036a7b029a71bc38dd10cd11057cc08ec"));
createServerFn({ method: "GET" }).middleware([requireAuth]).handler(createSsrRpc("68a81ce4253f3fa0977094bd590deebe808b79a5ac367ce3021b1b8201e1aa71"));
var listClassQuestions = createServerFn({ method: "GET" }).middleware([requireAuth]).handler(createSsrRpc("c0f30b4ddc2906ecbdfbd3d966737a517ff1e17a7cf74945adf1f3fb7e645555"));
var answerClassQuestion = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({ id: stringType() }).parse(input)).handler(createSsrRpc("43034ba5488c5d32e01aa75ef9f1e1e1ee98c15f764a228306aeec19f47a675e"));
//#endregion
export { listGradingItems as a, saveMissedQuestion as c, listClassQuestions as i, deleteGradingItem as n, listMissedQuestions as o, deleteMissedQuestion as r, saveGradingItem as s, answerClassQuestion as t };
