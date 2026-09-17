import { i as literalType, o as objectType, r as enumType, s as stringType } from "../_libs/zod.mjs";
import { r as createServerFn } from "./server-tMaTfkv1.mjs";
import { t as createSsrRpc } from "./createSsrRpc-D3FH_hmA.mjs";
import { t as requireAuth } from "./auth-middleware-Dsbad7Ma.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-moderation.functions-wEaYwttD.js
var listTeacherVerifications = createServerFn({ method: "GET" }).middleware([requireAuth]).handler(createSsrRpc("5e034e2b9bae15a26f5324baca2f4a6915697dc45ebeb982f732a1444befc849"));
var saveTeacherVerification = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({
	id: stringType().optional(),
	teacherName: stringType().trim().min(2, "الاسم قصير جداً"),
	specialty: stringType().trim().min(2, "التخصص مطلوب"),
	status: enumType([
		"قيد المراجعة",
		"مكتمل",
		"ينقص مستند",
		"مرفوض"
	]),
	notes: stringType().trim().max(300).optional().or(literalType(""))
}).parse(input)).handler(createSsrRpc("aa265f9d4c077270743ab7809e89b2d6f54749945fb3c7c7f1538e3820e3503a"));
var deleteTeacherVerification = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({ id: stringType() }).parse(input)).handler(createSsrRpc("0056f1cd0bc28e715f0f35fa23b4e00d7d6a23a774345fe9d9f44aecda5963d4"));
var listContentSubmissions = createServerFn({ method: "GET" }).middleware([requireAuth]).handler(createSsrRpc("c4b0431606debfd6b50d9bfaab48d0a2173b3461778937a3dcd195e0deb82bb1"));
var saveContentSubmission = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({
	id: stringType().optional(),
	title: stringType().trim().min(2, "العنوان قصير جداً"),
	teacherName: stringType().trim().min(2, "اسم المعلم مطلوب"),
	type: enumType([
		"درس",
		"اختبار",
		"كورس"
	]),
	status: enumType([
		"جديد",
		"مراجعة ثانية",
		"جاهز للاعتماد",
		"معتمد",
		"مرفوض"
	])
}).parse(input)).handler(createSsrRpc("880e3c7e8bdcd6b1b71db7ba795b6e623dfd7e47825b69a1171bbe29ed7122ad"));
var deleteContentSubmission = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({ id: stringType() }).parse(input)).handler(createSsrRpc("f6dcac01ced5230590267980c1d93efb04e4ad7c50d9adb484968a53f393a7ed"));
var listCommunityReports = createServerFn({ method: "GET" }).middleware([requireAuth]).handler(createSsrRpc("58caf1642e477caa9f144b44893444d4adf0e9d4e15261042d27f0da4ebcf27d"));
var saveCommunityReport = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({
	id: stringType().optional(),
	community: stringType().trim().min(2, "اسم المجتمع مطلوب"),
	reason: stringType().trim().min(2, "السبب مطلوب"),
	priority: enumType([
		"عالية",
		"متوسطة",
		"منخفضة"
	]),
	status: enumType([
		"مفتوح",
		"مغلق",
		"مؤجل"
	])
}).parse(input)).handler(createSsrRpc("1cdea0c6b97188d8d558dc354bc6ed656352fa07c64b92fa0f699e16bdec494b"));
var deleteCommunityReport = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({ id: stringType() }).parse(input)).handler(createSsrRpc("73b78955938e6442c81848075d1b3db3c7ad5a49357629db5d4635ee5ff4c96f"));
//#endregion
export { listContentSubmissions as a, saveContentSubmission as c, listCommunityReports as i, saveTeacherVerification as l, deleteContentSubmission as n, listTeacherVerifications as o, deleteTeacherVerification as r, saveCommunityReport as s, deleteCommunityReport as t };
