import { c as createServerFn } from "./createServerFn-TbS7u0_2.mjs";
import { t as requireAuth } from "./auth-middleware-DYL_GR_y.mjs";
import { i as literalType, o as objectType, r as enumType, s as stringType } from "../_libs/zod.mjs";
import { s as requirePermission, t as createServerRpc } from "./rbac.server-COlLO8eJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-moderation.functions-CtbE0TNx.js
var TEACHER_VERIFICATIONS = [
	{
		id: "tv-1",
		teacherName: "سارة الحسن",
		specialty: "رياضيات",
		requestedOn: "2026-08-05",
		status: "قيد المراجعة",
		notes: null
	},
	{
		id: "tv-2",
		teacherName: "محمد العلي",
		specialty: "فيزياء",
		requestedOn: "2026-08-04",
		status: "مكتمل",
		notes: null
	},
	{
		id: "tv-3",
		teacherName: "ريم خالد",
		specialty: "لغة عربية",
		requestedOn: "2026-08-04",
		status: "ينقص مستند",
		notes: "ينقص إثبات المؤهل الجامعي"
	},
	{
		id: "tv-4",
		teacherName: "أحمد يوسف",
		specialty: "كيمياء",
		requestedOn: "2026-08-02",
		status: "قيد المراجعة",
		notes: null
	}
];
var CONTENT_SUBMISSIONS = [
	{
		id: "cs-1",
		title: "التفاضل — الوحدة الثانية",
		teacherName: "أحمد يوسف",
		type: "درس",
		status: "جديد"
	},
	{
		id: "cs-2",
		title: "اختبار الكهرباء",
		teacherName: "لينا سمير",
		type: "اختبار",
		status: "مراجعة ثانية"
	},
	{
		id: "cs-3",
		title: "الكيمياء العضوية",
		teacherName: "ياسر علي",
		type: "كورس",
		status: "جاهز للاعتماد"
	}
];
var COMMUNITY_REPORTS = [
	{
		id: "cr-1",
		code: "#R-1042",
		community: "رياضيات الثانوية",
		reason: "محتوى غير مناسب",
		priority: "عالية",
		status: "مفتوح"
	},
	{
		id: "cr-2",
		code: "#R-1041",
		community: "مجتمع الفيزياء",
		reason: "إزعاج متكرر",
		priority: "متوسطة",
		status: "مفتوح"
	},
	{
		id: "cr-3",
		code: "#R-1038",
		community: "اللغة العربية",
		reason: "معلومة مضللة",
		priority: "متوسطة",
		status: "مؤجل"
	}
];
function nextModId(prefix) {
	return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}
var listTeacherVerifications_createServerFn_handler = createServerRpc({
	id: "5e034e2b9bae15a26f5324baca2f4a6915697dc45ebeb982f732a1444befc849",
	name: "listTeacherVerifications",
	filename: "src/lib/admin-moderation.functions.ts"
}, (opts) => listTeacherVerifications.__executeServer(opts));
var listTeacherVerifications = createServerFn({ method: "GET" }).middleware([requireAuth]).handler(listTeacherVerifications_createServerFn_handler, async ({ context }) => {
	await requirePermission(context.userId, "admin_teachers", "view_list");
	return TEACHER_VERIFICATIONS;
});
var saveTeacherVerification_createServerFn_handler = createServerRpc({
	id: "aa265f9d4c077270743ab7809e89b2d6f54749945fb3c7c7f1538e3820e3503a",
	name: "saveTeacherVerification",
	filename: "src/lib/admin-moderation.functions.ts"
}, (opts) => saveTeacherVerification.__executeServer(opts));
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
}).parse(input)).handler(saveTeacherVerification_createServerFn_handler, async ({ data, context }) => {
	await requirePermission(context.userId, "admin_teachers", data.id ? "edit" : "execute_add");
	if (data.id) {
		const row = TEACHER_VERIFICATIONS.find((r) => r.id === data.id);
		if (!row) throw new Error("الطلب غير موجود");
		row.teacherName = data.teacherName;
		row.specialty = data.specialty;
		row.status = data.status;
		row.notes = data.notes || null;
	} else {
		const row = {
			id: nextModId("tv"),
			teacherName: data.teacherName,
			specialty: data.specialty,
			requestedOn: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
			status: data.status,
			notes: data.notes || null
		};
		TEACHER_VERIFICATIONS.push(row);
	}
	return { ok: true };
});
var deleteTeacherVerification_createServerFn_handler = createServerRpc({
	id: "0056f1cd0bc28e715f0f35fa23b4e00d7d6a23a774345fe9d9f44aecda5963d4",
	name: "deleteTeacherVerification",
	filename: "src/lib/admin-moderation.functions.ts"
}, (opts) => deleteTeacherVerification.__executeServer(opts));
var deleteTeacherVerification = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({ id: stringType() }).parse(input)).handler(deleteTeacherVerification_createServerFn_handler, async ({ data, context }) => {
	await requirePermission(context.userId, "admin_teachers", "delete");
	const idx = TEACHER_VERIFICATIONS.findIndex((r) => r.id === data.id);
	if (idx !== -1) TEACHER_VERIFICATIONS.splice(idx, 1);
	return { ok: true };
});
var listContentSubmissions_createServerFn_handler = createServerRpc({
	id: "c4b0431606debfd6b50d9bfaab48d0a2173b3461778937a3dcd195e0deb82bb1",
	name: "listContentSubmissions",
	filename: "src/lib/admin-moderation.functions.ts"
}, (opts) => listContentSubmissions.__executeServer(opts));
var listContentSubmissions = createServerFn({ method: "GET" }).middleware([requireAuth]).handler(listContentSubmissions_createServerFn_handler, async ({ context }) => {
	await requirePermission(context.userId, "admin_content_review", "view_list");
	return CONTENT_SUBMISSIONS;
});
var saveContentSubmission_createServerFn_handler = createServerRpc({
	id: "880e3c7e8bdcd6b1b71db7ba795b6e623dfd7e47825b69a1171bbe29ed7122ad",
	name: "saveContentSubmission",
	filename: "src/lib/admin-moderation.functions.ts"
}, (opts) => saveContentSubmission.__executeServer(opts));
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
}).parse(input)).handler(saveContentSubmission_createServerFn_handler, async ({ data, context }) => {
	await requirePermission(context.userId, "admin_content_review", data.id ? "edit" : "execute_add");
	if (data.id) {
		const row = CONTENT_SUBMISSIONS.find((r) => r.id === data.id);
		if (!row) throw new Error("العنصر غير موجود");
		row.title = data.title;
		row.teacherName = data.teacherName;
		row.type = data.type;
		row.status = data.status;
	} else {
		const row = {
			id: nextModId("cs"),
			title: data.title,
			teacherName: data.teacherName,
			type: data.type,
			status: data.status
		};
		CONTENT_SUBMISSIONS.push(row);
	}
	return { ok: true };
});
var deleteContentSubmission_createServerFn_handler = createServerRpc({
	id: "f6dcac01ced5230590267980c1d93efb04e4ad7c50d9adb484968a53f393a7ed",
	name: "deleteContentSubmission",
	filename: "src/lib/admin-moderation.functions.ts"
}, (opts) => deleteContentSubmission.__executeServer(opts));
var deleteContentSubmission = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({ id: stringType() }).parse(input)).handler(deleteContentSubmission_createServerFn_handler, async ({ data, context }) => {
	await requirePermission(context.userId, "admin_content_review", "delete");
	const idx = CONTENT_SUBMISSIONS.findIndex((r) => r.id === data.id);
	if (idx !== -1) CONTENT_SUBMISSIONS.splice(idx, 1);
	return { ok: true };
});
var listCommunityReports_createServerFn_handler = createServerRpc({
	id: "58caf1642e477caa9f144b44893444d4adf0e9d4e15261042d27f0da4ebcf27d",
	name: "listCommunityReports",
	filename: "src/lib/admin-moderation.functions.ts"
}, (opts) => listCommunityReports.__executeServer(opts));
var listCommunityReports = createServerFn({ method: "GET" }).middleware([requireAuth]).handler(listCommunityReports_createServerFn_handler, async ({ context }) => {
	await requirePermission(context.userId, "admin_community_reports", "view_list");
	return COMMUNITY_REPORTS;
});
var saveCommunityReport_createServerFn_handler = createServerRpc({
	id: "1cdea0c6b97188d8d558dc354bc6ed656352fa07c64b92fa0f699e16bdec494b",
	name: "saveCommunityReport",
	filename: "src/lib/admin-moderation.functions.ts"
}, (opts) => saveCommunityReport.__executeServer(opts));
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
}).parse(input)).handler(saveCommunityReport_createServerFn_handler, async ({ data, context }) => {
	await requirePermission(context.userId, "admin_community_reports", data.id ? "edit" : "execute_add");
	if (data.id) {
		const row = COMMUNITY_REPORTS.find((r) => r.id === data.id);
		if (!row) throw new Error("البلاغ غير موجود");
		row.community = data.community;
		row.reason = data.reason;
		row.priority = data.priority;
		row.status = data.status;
	} else {
		const row = {
			id: nextModId("cr"),
			code: `#R-${Math.floor(1e3 + Math.random() * 9e3)}`,
			community: data.community,
			reason: data.reason,
			priority: data.priority,
			status: data.status
		};
		COMMUNITY_REPORTS.push(row);
	}
	return { ok: true };
});
var deleteCommunityReport_createServerFn_handler = createServerRpc({
	id: "73b78955938e6442c81848075d1b3db3c7ad5a49357629db5d4635ee5ff4c96f",
	name: "deleteCommunityReport",
	filename: "src/lib/admin-moderation.functions.ts"
}, (opts) => deleteCommunityReport.__executeServer(opts));
var deleteCommunityReport = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({ id: stringType() }).parse(input)).handler(deleteCommunityReport_createServerFn_handler, async ({ data, context }) => {
	await requirePermission(context.userId, "admin_community_reports", "delete");
	const idx = COMMUNITY_REPORTS.findIndex((r) => r.id === data.id);
	if (idx !== -1) COMMUNITY_REPORTS.splice(idx, 1);
	return { ok: true };
});
//#endregion
export { deleteCommunityReport_createServerFn_handler, deleteContentSubmission_createServerFn_handler, deleteTeacherVerification_createServerFn_handler, listCommunityReports_createServerFn_handler, listContentSubmissions_createServerFn_handler, listTeacherVerifications_createServerFn_handler, saveCommunityReport_createServerFn_handler, saveContentSubmission_createServerFn_handler, saveTeacherVerification_createServerFn_handler };
