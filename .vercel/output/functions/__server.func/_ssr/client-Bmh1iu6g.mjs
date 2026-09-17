import { t as env } from "./env-FodiAD7N.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/client-Bmh1iu6g.js
env.API_BASE_URL;
var ApiError = class extends Error {
	status;
	kind;
	/** رسالة صالحة للعرض مباشرة للمستخدم (عربي/إنجليزي حسب رسالة الباك اند
	* إن وجدت، أو ترجمة عامة واضحة بدل نص تقني زي "Failed to fetch"). */
	userMessage;
	constructor(message, status, kind, userMessage) {
		super(message);
		this.name = "ApiError";
		this.status = status;
		this.kind = kind;
		this.userMessage = userMessage ?? message;
	}
};
/** رسائل عامة واضحة حسب نوع/كود الخطأ — تُستخدم فقط لو الباك اند نفسه ما
* رجّع رسالة واضحة بحقل message (رسائل الباك اند العربية دايمًا لها الأولوية). */
/** يقرأ لغة الواجهة الحالية من <html lang="..."> (تنعكس فورًا مع تبديل
* اللغة عبر preferences-provider). ما فيه "useTranslation" هون لأنه ملف
* عادي مش React component — بيشتغل برات وقت رندر. */
function currentLang() {
	if (typeof document === "undefined") return "ar";
	return document.documentElement.lang === "en" ? "en" : "ar";
}
/**
* استخرج رسالة مفهومة للمستخدم من أي خطأ ممسوك بـ catch. لو الخطأ جاي من
* apiClient (ApiError) بترجع userMessage المُترجمة (شبكة/مهلة/HTTP)، وإلا
* أي Error عادي بترجع نصه، وإلا fallback المُمرّرة. استخدمها بكل مكان
* بدل `err instanceof Error ? err.message : "..."` مباشرة، حتى ما توصل
* نصوص تقنية زي "Failed to fetch" للواجهة.
*/
/**
* جميع رسائل الخطأ العربية الثابتة يلي بترميها server functions لوحات
* الديمو (rbac.functions.ts وأخواتها). هاي الدوال تشتغل على السيرفر
* (TanStack Start) مش بالمتصفح، فما تقدر تقرأ document.documentElement.lang
* زي باقي الحلول — فبدل ما نمرر locale كـ parameter لكل نداء (تغيير كبير
* يلمس عشرات نقاط الاستدعاء)، منترجم هون على مستوى العرض بس، بدون أي لمس
* لتعريف الدوال نفسها أو أي مكان بينادها.
*/
var DEMO_ERROR_TRANSLATIONS = {
	"الإشعار غير موجود": "Notification not found",
	"الاختبار غير موجود": "Quiz not found",
	"الامتحان غير موجود": "Exam not found",
	"البلاغ غير موجود": "Report not found",
	"التقرير غير موجود": "Report not found",
	"الحدث غير موجود": "Event not found",
	"الحركة غير موجودة": "Transaction not found",
	"الخطأ غير موجود": "Mistake entry not found",
	"الدخول التجريبي متاح في بيئة التطوير فقط": "Demo login is only available in development",
	"الدعوة غير موجودة": "Invitation not found",
	"السؤال غير موجود": "Question not found",
	"الشارة غير موجودة": "Badge not found",
	"الشهادة غير موجودة": "Certificate not found",
	"الطالب غير موجود": "Student not found",
	"الطلب غير موجود": "Request not found",
	"العملية غير موجودة": "Operation not found",
	"العنصر غير موجود": "Item not found",
	"الكورس غير موجود": "Course not found",
	"المادة غير موجودة": "Subject not found",
	"المجموعة غير موجودة": "Group not found",
	"المستخدم غير موجود": "User not found",
	"المعلم غير موجود": "Teacher not found",
	"المهمة غير موجودة": "Task not found",
	"النتيجة غير موجودة": "Result not found",
	"الوحدة غير موجودة": "Module not found",
	"اليوم غير موجود": "Day not found",
	"تسجيل المعلّمين غير متاح حالياً — قيد الربط مع الباك اند الجديد.": "Teacher registration isn't available yet — being connected to the new backend.",
	"تم تسجيل الدخول، لكن تعذّر التحقق من الملف الشخصي": "Signed in, but couldn't verify your profile",
	"لا يوجد بريد إلكتروني لهذا المستخدم": "This user has no email address",
	"ليس لديك صلاحية لتنفيذ هذا الإجراء": "You don't have permission to do this",
	"نوع المستخدم غير موجود": "User type not found",
	"هذا الإجراء متاح لمدير النظام فقط": "This action is only available to the system admin",
	"إرسال رابط إعادة تعيين كلمة المرور غير متاح بعد — قيد ربطه بالباك اند الجديد": "Sending a password reset link isn't available yet — being connected to the new backend",
	"إنشاء حساب جديد غير متاح حالياً — قيد الربط مع الباك اند الجديد.": "Creating a new account isn't available yet — being connected to the new backend."
};
function getErrorMessage(err, fallback) {
	if (err instanceof ApiError) return err.userMessage;
	if (err instanceof Error) {
		if (currentLang() === "en" && DEMO_ERROR_TRANSLATIONS[err.message]) return DEMO_ERROR_TRANSLATIONS[err.message];
		return err.message;
	}
	return fallback;
}
//#endregion
export { getErrorMessage as t };
