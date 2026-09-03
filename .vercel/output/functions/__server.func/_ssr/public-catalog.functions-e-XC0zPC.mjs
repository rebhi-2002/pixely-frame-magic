import { c as createServerFn } from "./createServerFn-TbS7u0_2.mjs";
import { t as requireAuth } from "./auth-middleware-DukBAMOp.mjs";
import { a as numberType, o as objectType, s as stringType } from "../_libs/zod.mjs";
import { s as requirePermission, t as createServerRpc } from "./rbac.server-D6J8GVoF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/public-catalog.functions-e-XC0zPC.js
var PUBLIC_COURSES = [
	{
		id: "math-tawjihi",
		title: ["الرياضيات — تفاضل وتكامل", "Mathematics — Calculus"],
		teacher: ["أ. سامي خليل", "Sami Khalil"],
		teacherId: "sami-khalil",
		subject: ["رياضيات", "Math"],
		level: ["توجيهي علمي", "Science track"],
		lessons: 42,
		price: 35
	},
	{
		id: "physics-mechanics",
		title: ["الفيزياء — الميكانيكا الكاملة", "Physics — Full mechanics"],
		teacher: ["أ. رنا حدّاد", "Rana Haddad"],
		teacherId: "rana-haddad",
		subject: ["فيزياء", "Physics"],
		level: ["توجيهي علمي", "Science track"],
		lessons: 36,
		price: 30
	},
	{
		id: "arabic-grammar",
		title: ["اللغة العربية — النحو والبلاغة", "Arabic — Grammar & rhetoric"],
		teacher: ["أ. مها زيدان", "Maha Zeidan"],
		teacherId: "maha-zeidan",
		subject: ["عربي", "Arabic"],
		level: ["توجيهي عام", "General track"],
		lessons: 28,
		price: 0
	},
	{
		id: "english-exam",
		title: ["الإنجليزية — تحضير الامتحان", "English — Exam preparation"],
		teacher: ["أ. لؤي درويش", "Luay Darwish"],
		teacherId: "luay-darwish",
		subject: ["إنجليزي", "English"],
		level: ["توجيهي عام", "General track"],
		lessons: 24,
		price: 25
	},
	{
		id: "chem-organic",
		title: ["الكيمياء العضوية من الصفر", "Organic chemistry from zero"],
		teacher: ["أ. نور عابد", "Noor Abed"],
		teacherId: "noor-abed",
		subject: ["كيمياء", "Chemistry"],
		level: ["توجيهي علمي", "Science track"],
		lessons: 31,
		price: 28
	},
	{
		id: "islamic-studies",
		title: ["التربية الإسلامية — مراجعة شاملة", "Islamic studies — Full review"],
		teacher: ["أ. عمر الشريف", "Omar Sharif"],
		teacherId: "omar-sharif",
		subject: ["إسلامية", "Islamic"],
		level: ["توجيهي عام", "General track"],
		lessons: 18,
		price: 0
	}
];
function nextCatalogId(prefix) {
	return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}
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
	teacherAr: stringType().trim().min(2, "اسم المعلم بالعربي مطلوب"),
	teacherEn: stringType().trim().min(2, "اسم المعلم بالإنجليزي مطلوب"),
	teacherId: stringType().trim().min(2, "معرّف المعلم مطلوب"),
	subjectAr: stringType().trim().min(1, "المادة بالعربي مطلوبة"),
	subjectEn: stringType().trim().min(1, "المادة بالإنجليزي مطلوبة"),
	levelAr: stringType().trim().min(1, "المستوى بالعربي مطلوب"),
	levelEn: stringType().trim().min(1, "المستوى بالإنجليزي مطلوب"),
	lessons: numberType().int().min(0),
	price: numberType().min(0)
}).parse(input)).handler(saveCourse_createServerFn_handler, async ({ data, context }) => {
	await requirePermission(context.userId, "admin_course_catalog", data.id ? "edit" : "execute_add");
	const shaped = {
		title: [data.titleAr, data.titleEn],
		teacher: [data.teacherAr, data.teacherEn],
		teacherId: data.teacherId,
		subject: [data.subjectAr, data.subjectEn],
		level: [data.levelAr, data.levelEn],
		lessons: data.lessons,
		price: data.price
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
