//#region node_modules/.nitro/vite/services/ssr/assets/public-catalog-data-DnNc15I2.js
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
//#endregion
export { courseCoverPath as n, teacherPhotoPath as r, COURSE_FORMAT_LABELS as t };
