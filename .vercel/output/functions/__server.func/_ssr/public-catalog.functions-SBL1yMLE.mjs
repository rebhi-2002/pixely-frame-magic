import { r as createServerFn } from "./server-CA7E05d5.mjs";
import { t as requireAuth } from "./auth-middleware-qbhkJF0k.mjs";
import { a as numberType, o as objectType, s as stringType } from "../_libs/zod.mjs";
import { s as requirePermission, t as createServerRpc } from "./rbac.server-BJR7pVOa.mjs";
import { r as nextCatalogId, t as PUBLIC_COURSES } from "./public-catalog-data-BAVu8ehh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/public-catalog.functions-SBL1yMLE.js
/** قراءة عامة — بدون تسجيل دخول، تُستخدم بصفحة /courses قبل الاشتراك. */
var listPublicCourses_createServerFn_handler = createServerRpc({
	id: "3f055e19d59ef7ee3242d2528d082d04ec25586910b3058202e18d231eee5275",
	name: "listPublicCourses",
	filename: "src/lib/public-catalog.functions.ts"
}, (opts) => listPublicCourses.__executeServer(opts));
var listPublicCourses = createServerFn({ method: "GET" }).handler(listPublicCourses_createServerFn_handler, async () => {
	return PUBLIC_COURSES;
});
var saveCourse_createServerFn_handler = createServerRpc({
	id: "771723592d3a8f99cc3b54154ca1f08f067cd1830410556fb9a97d7e25e2420d",
	name: "saveCourse",
	filename: "src/lib/public-catalog.functions.ts"
}, (opts) => saveCourse.__executeServer(opts));
var saveCourse = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({
	id: stringType().optional(),
	titleAr: stringType().trim().min(2, "العنوان بالعربي مطلوب"),
	titleEn: stringType().trim().min(2, "العنوان بالإنجليزي مطلوب"),
	descriptionAr: stringType().trim().min(10, "الوصف بالعربي مطلوب (10 أحرف ع الأقل)"),
	descriptionEn: stringType().trim().min(10, "الوصف بالإنجليزي مطلوب (10 أحرف ع الأقل)"),
	teacherAr: stringType().trim().min(2, "اسم المعلم بالعربي مطلوب"),
	teacherEn: stringType().trim().min(2, "اسم المعلم بالإنجليزي مطلوب"),
	teacherId: stringType().trim().min(2, "معرّف المعلم مطلوب"),
	subjectAr: stringType().trim().min(1, "المادة بالعربي مطلوبة"),
	subjectEn: stringType().trim().min(1, "المادة بالإنجليزي مطلوبة"),
	levelAr: stringType().trim().min(1, "المستوى بالعربي مطلوب"),
	levelEn: stringType().trim().min(1, "المستوى بالإنجليزي مطلوب"),
	lessons: numberType().int().min(0),
	price: numberType().min(0),
	rating: numberType().min(0).max(5).optional(),
	studentsCount: numberType().int().min(0).optional(),
	durationHours: numberType().min(0).optional(),
	/** وسوم مفصولة بفاصلة، بنفس الترتيب باللغتين (تاغ 1 عربي = تاغ 1 إنجليزي). */
	tagsAr: stringType().optional(),
	tagsEn: stringType().optional()
}).parse(input)).handler(saveCourse_createServerFn_handler, async ({ data, context }) => {
	await requirePermission(context.userId, "admin_course_catalog", data.id ? "edit" : "execute_add");
	const tagsArList = (data.tagsAr ?? "").split(",").map((s) => s.trim()).filter(Boolean);
	const tagsEnList = (data.tagsEn ?? "").split(",").map((s) => s.trim()).filter(Boolean);
	const tags = tagsArList.length > 0 ? tagsArList.map((ar, i) => [ar, tagsEnList[i] ?? ar]) : void 0;
	const shaped = {
		title: [data.titleAr, data.titleEn],
		description: [data.descriptionAr, data.descriptionEn],
		teacher: [data.teacherAr, data.teacherEn],
		teacherId: data.teacherId,
		subject: [data.subjectAr, data.subjectEn],
		level: [data.levelAr, data.levelEn],
		lessons: data.lessons,
		price: data.price,
		rating: data.rating,
		studentsCount: data.studentsCount,
		durationHours: data.durationHours,
		tags,
		updatedAt: (/* @__PURE__ */ new Date()).toISOString()
	};
	if (data.id) {
		const row = PUBLIC_COURSES.find((r) => r.id === data.id);
		if (!row) throw new Error("الكورس غير موجود");
		Object.assign(row, shaped);
	} else {
		const row = {
			id: nextCatalogId("crs"),
			...shaped
		};
		PUBLIC_COURSES.push(row);
	}
	return { ok: true };
});
var deleteCourse_createServerFn_handler = createServerRpc({
	id: "87f7c469a8296891751747f5b6e157ce2457564493c974dcf0aa78d1d8153ba8",
	name: "deleteCourse",
	filename: "src/lib/public-catalog.functions.ts"
}, (opts) => deleteCourse.__executeServer(opts));
var deleteCourse = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({ id: stringType() }).parse(input)).handler(deleteCourse_createServerFn_handler, async ({ data, context }) => {
	await requirePermission(context.userId, "admin_course_catalog", "delete");
	const idx = PUBLIC_COURSES.findIndex((r) => r.id === data.id);
	if (idx !== -1) PUBLIC_COURSES.splice(idx, 1);
	return { ok: true };
});
//#endregion
export { deleteCourse_createServerFn_handler, listPublicCourses_createServerFn_handler, saveCourse_createServerFn_handler };
