//#region node_modules/.nitro/vite/services/ssr/assets/public-catalog-data-CsZRwh7H.js
/** تسميات ثنائية اللغة لكل صيغة — مصدر واحد مشترك بين صفحة الكورسات العامة
*  ولوحة إدارة الكتالوج، بدل تكرار نفس القائمة بملفين. */
var COURSE_FORMAT_LABELS = {
	live_online: ["أونلاين مباشر", "Live online"],
	onsite: ["وجاهي", "On-site"],
	recorded: ["مسجّل مسبقاً", "Recorded"]
};
/** مسار صورة المعلم — حسب teacherId، ثابت الاسم عشان تحط الصورة الحقيقية
*  لاحقاً بنفس الاسم بدون أي تعديل كود (نفس مبدأ صور الفريق). */
function teacherPhotoPath(teacherId) {
	return `/team/teachers/${teacherId}.jpg`;
}
/** مسار غلاف الكورس — حسب id الكورس، بنفس مبدأ صورة المعلم (fallback تلقائي
*  لتدرّج لوني + أيقونة المادة لو الملف غير موجود بعد). */
function courseCoverPath(courseId) {
	return `/courses/covers/${courseId}.jpg`;
}
/**
* فاضي عمداً — لسا ما في كورسات أو أساتذة حقيقيين على المنصة (قيد التطوير).
* صفحة /courses بتعرض حالة "قريباً" صادقة بدل بيانات وهمية (راجع
* emptyCatalog* بملفات الترجمة). أضف الكورسات الحقيقية هون فقط لما تتوفر —
* أو عبر لوحة الأدمن (saveCourse بـ public-catalog.functions.ts) — بدون أي
* تعديل كود إضافي بصفحة العرض.
*
* مثال البنية المتوقّعة لكل صف (مو نشط، للتوضيح فقط):
* {
*   id: "math-tawjihi",
*   title: ["الرياضيات — تفاضل وتكامل", "Mathematics — Calculus"],
*   description: ["...", "..."],
*   teacher: ["أ. اسم المعلم", "Teacher name"],
*   teacherId: "teacher-slug",
*   subject: ["رياضيات", "Math"],
*   level: ["توجيهي علمي", "Science track"],
*   format: "live_online", // أو "onsite" / "recorded"
*   lessons: 42,
*   price: 35,
* }
*/
var PUBLIC_COURSES = [];
function nextCatalogId(prefix) {
	return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}
//#endregion
export { teacherPhotoPath as a, nextCatalogId as i, PUBLIC_COURSES as n, courseCoverPath as r, COURSE_FORMAT_LABELS as t };
