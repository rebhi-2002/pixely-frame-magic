import { a as numberType, o as objectType, r as enumType, s as stringType } from "../_libs/zod.mjs";
import { r as createServerFn } from "./server-oWHHg8-O.mjs";
import { t as createSsrRpc } from "./createSsrRpc-UbjxkEih.mjs";
import { t as requireAuth } from "./auth-middleware-DygD5oX-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/supervisor-oversight.functions-BXykZG7E.js
var listTeacherPerformance = createServerFn({ method: "GET" }).middleware([requireAuth]).handler(createSsrRpc("f027f64d8a207bbb87f4d0241e5ea4d1374ab9953b3df1434543a8900b9aed4c"));
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
}).parse(input)).handler(createSsrRpc("bc19afe533630993a35b2580eb20abae8d24705044700e86ea272d7877e47af3"));
var deleteTeacherPerformance = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({ id: stringType() }).parse(input)).handler(createSsrRpc("f107cac690a5ad32f574e49b8124e1269d8a7bd2e373ce5032c6d009b1f183e8"));
var listStudentRisk = createServerFn({ method: "GET" }).middleware([requireAuth]).handler(createSsrRpc("8757c19909a3789cf49325ae9b1f6d5008611e71dc1e861044f89b54dcc6cc4e"));
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
}).parse(input)).handler(createSsrRpc("d43a5536b8b0831eafa3dd55c91132eab5b9d8f8298ce50a947b54bff73517a5"));
var deleteStudentRisk = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({ id: stringType() }).parse(input)).handler(createSsrRpc("3fc9e9f8f165e07fe10c0170b509dc237ac625756a32d7da9df160b884493c5e"));
var listSupervisionReports = createServerFn({ method: "GET" }).middleware([requireAuth]).handler(createSsrRpc("32fa234b43f653a6f6f6fdb24dfba669ef2d49febce159afc7d77882cdaa6fdc"));
var recordReportDownload = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({ id: stringType() }).parse(input)).handler(createSsrRpc("b3bed09f94cbcba2141a2d263cd5c7527032701f0230e0c4c57883f4c1b2488a"));
var deleteSupervisionReport = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({ id: stringType() }).parse(input)).handler(createSsrRpc("76615f39a65645059581a7acd26807300338fcbc90e88a0c6b07e4c28d56e4d5"));
var getSupervisionSettings = createServerFn({ method: "GET" }).middleware([requireAuth]).handler(createSsrRpc("f5108c2b2611057eecd4b968a8af89320a3838a1182735654927c89f893a2b31"));
var getChildReport = createServerFn({ method: "GET" }).middleware([requireAuth]).handler(createSsrRpc("47a5e496452f06b7f9c21934e87de85c2fb6dc59bf335eb3f56d9e0c9756d3fc"));
//#endregion
export { getSupervisionSettings as a, listTeacherPerformance as c, saveTeacherPerformance as d, getChildReport as i, recordReportDownload as l, deleteSupervisionReport as n, listStudentRisk as o, deleteTeacherPerformance as r, listSupervisionReports as s, deleteStudentRisk as t, saveStudentRisk as u };
