import { r as createServerFn } from "./server-W5G339kS.mjs";
import { t as createSsrRpc } from "./createSsrRpc-C7KQUoXf.mjs";
import { t as requireAuth } from "./auth-middleware-DGfc1vT7.mjs";
import { a as numberType, o as objectType, s as stringType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/public-catalog.functions-BgUbIkYN.js
/** قراءة عامة — بدون تسجيل دخول، تُستخدم بصفحة /courses قبل الاشتراك. */
var listPublicCourses = createServerFn({ method: "GET" }).handler(createSsrRpc("3f055e19d59ef7ee3242d2528d082d04ec25586910b3058202e18d231eee5275"));
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
}).parse(input)).handler(createSsrRpc("771723592d3a8f99cc3b54154ca1f08f067cd1830410556fb9a97d7e25e2420d"));
var deleteCourse = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({ id: stringType() }).parse(input)).handler(createSsrRpc("87f7c469a8296891751747f5b6e157ce2457564493c974dcf0aa78d1d8153ba8"));
//#endregion
export { listPublicCourses as n, saveCourse as r, deleteCourse as t };
