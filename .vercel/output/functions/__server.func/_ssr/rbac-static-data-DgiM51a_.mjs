import { i as __toESM } from "../_runtime.mjs";
import { t as env } from "./ssr.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/rbac-static-data-DgiM51a_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var API_BASE_URL = env.API_BASE_URL;
var REQUEST_TIMEOUT_MS = 3e4;
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
function friendlyMessageFor(kind, status) {
	const ar = currentLang() === "ar";
	if (kind === "network") return ar ? "تعذّر الاتصال بالخادم. تأكد من اتصالك بالإنترنت وحاول مجددًا — إذا استمرت المشكلة، الخادم قد يكون متوقفًا مؤقتًا." : "Couldn't reach the server. Check your internet connection and try again — the server may be temporarily down.";
	if (kind === "timeout") return ar ? "استغرق الطلب وقتًا أطول من المتوقع. حاول مرة أخرى." : "The request took too long. Please try again.";
	if (kind === "parse") return ar ? "وصل ردّ غير متوقع من الخادم. حاول مجددًا، وإذا تكررت المشكلة بلّغ الدعم الفني." : "Received an unexpected response from the server. Try again, and contact support if it keeps happening.";
	switch (status) {
		case 400: return ar ? "البيانات المُرسلة غير صحيحة. راجع الحقول وحاول مجددًا." : "The submitted data isn't valid. Please check the fields and try again.";
		case 401: return ar ? "انتهت جلستك أو لم يتم تسجيل الدخول. سجّل الدخول مجددًا للمتابعة." : "Your session has ended or you're not signed in. Please sign in again to continue.";
		case 403: return ar ? "ليس لديك صلاحية للقيام بهذا الإجراء." : "You don't have permission to do this.";
		case 404: return ar ? "لم يتم العثور على البيانات المطلوبة." : "The requested data couldn't be found.";
		case 409: return ar ? "تعارض في البيانات — قد يكون هذا العنصر معدّلاً من مكان آخر. حدّث الصفحة وحاول مجددًا." : "Data conflict — this item may have been changed elsewhere. Refresh the page and try again.";
		case 422: return ar ? "تعذّر معالجة البيانات المُرسلة. راجع الحقول وحاول مجددًا." : "The submitted data couldn't be processed. Please check the fields and try again.";
		case 429: return ar ? "طلبات كثيرة خلال وقت قصير. انتظر قليلًا وحاول مجددًا." : "Too many requests in a short time. Please wait a moment and try again.";
		default:
			if (status >= 500) return ar ? "حدث خطأ من جهة الخادم. حاول لاحقًا، وإذا استمرت المشكلة بلّغ الدعم الفني." : "A server error occurred. Please try again later, and contact support if it persists.";
			return ar ? "حدث خطأ غير متوقع. حاول مجددًا." : "An unexpected error occurred. Please try again.";
	}
}
async function request(path, init = {}) {
	const { json, headers, ...rest } = init;
	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
	let res;
	try {
		res = await fetch(`${API_BASE_URL}${path}`, {
			...rest,
			credentials: "include",
			signal: controller.signal,
			headers: {
				Accept: "application/json, text/plain, */*",
				...json !== void 0 ? { "Content-Type": "application/json" } : {},
				...headers
			},
			body: json !== void 0 ? JSON.stringify(json) : rest.body
		});
	} catch (err) {
		const kind = err instanceof DOMException && err.name === "AbortError" ? "timeout" : "network";
		throw new ApiError(err instanceof Error ? err.message : String(err), 0, kind, friendlyMessageFor(kind, 0));
	} finally {
		clearTimeout(timeoutId);
	}
	const text = await res.text();
	let data = null;
	if (text) try {
		data = JSON.parse(text);
	} catch {
		if (!res.ok) throw new ApiError(text || res.statusText, res.status, "parse", friendlyMessageFor("parse", res.status));
		data = text;
	}
	if (!res.ok) {
		const backendMessage = data && typeof data === "object" && "message" in data ? data.message : void 0;
		const technicalMessage = backendMessage || `${res.status} ${res.statusText}`;
		const userMessage = backendMessage?.trim() || friendlyMessageFor("http", res.status);
		throw new ApiError(technicalMessage, res.status, "http", userMessage);
	}
	return data;
}
var apiClient = {
	get: (path) => request(path, { method: "GET" }),
	post: (path, json) => request(path, {
		method: "POST",
		json
	}),
	delete: (path) => request(path, { method: "DELETE" }),
	/** لـ endpoints [FromForm] (زي رفع الملفات) — بدون Content-Type يدوي حتى
	* يحدد المتصفح boundary الـ multipart تلقائيًا. */
	postForm: (path, formData) => request(path, {
		method: "POST",
		body: formData
	}),
	baseUrl: API_BASE_URL
};
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
/** يرمي رسالة تحقق مطابقة للغة الواجهة الحالية — للاستخدام بملفات التكامل
* العادية (admin-users.ts وغيرها) يلي مش مكوّنات React وما فيها useTranslation. */
function throwBilingual(ar, en) {
	throw new Error(currentLang() === "ar" ? ar : en);
}
var AUTH_STORAGE_KEY = "academia.auth";
var AUTH_EVENT = "academia-auth-changed";
var DEMO_USER_COOKIE = "academia_demo_user";
function readStoredSession() {
	if (typeof window === "undefined") return null;
	try {
		const raw = localStorage.getItem(AUTH_STORAGE_KEY);
		return raw ? JSON.parse(raw) : null;
	} catch {
		return null;
	}
}
/** يحدّث بيانات الجلسة المخزّنة محليًا بعد نجاح تعديل حقيقي (تعديل ملف
* شخصي، تحديد نوع مستخدم بعد fetchUserType...) — بدون ما نصدّر
* writeStoredSession/readStoredSession أنفسهم لتبقى إدارة الجلسة مركزية
* بهالملف. */
function patchStoredProfile(patch) {
	const session = readStoredSession();
	if (!session?.profile) return;
	writeStoredSession({
		...session,
		profile: {
			...session.profile,
			...patch
		}
	});
}
/** تعديل الملف الشخصي الحقيقي — POST /api/User/MyProfile. متاح فقط
* لجلسة حقيقية (مو ديمو)؛ بعد النجاح نحدّث الجلسة المخزّنة محليًا حتى
* تنعكس فورًا بكل مكان بيقرأ StoredProfile (القائمة الجانبية، الإعدادات...). */
async function updateMyProfile(input) {
	const result = await apiClient.post("/api/User/MyProfile", {
		id: input.id,
		name: input.name,
		email: input.email,
		phoneNumber: input.phoneNumber,
		genderId: input.genderId
	});
	if (!result?.success) throw new Error(result?.message || "تعذّر حفظ التعديلات");
	patchStoredProfile({
		name: input.name,
		email: input.email,
		phoneNumber: input.phoneNumber,
		genderId: input.genderId
	});
}
/** تغيير كلمة المرور الحقيقي — POST /api/User/ChangePassword. الباك اند
* نفسه بيتحقق من تطابق newPassword/confirmPassword (Compare attribute)
* وصحة currentPassword — رسالة الخطأ (مثلاً "كلمة المرور الحالية غير
* صحيحة") جاية من الباك اند مباشرة. */
async function changeMyPassword(input) {
	const result = await apiClient.post("/api/User/ChangePassword", {
		currentPassword: input.currentPassword,
		newPassword: input.newPassword,
		confirmPassword: input.confirmPassword
	});
	if (!result?.success) throw new Error(result?.message || "تعذّر تغيير كلمة المرور");
}
function writeStoredSession(session) {
	if (typeof window === "undefined") return;
	if (session) {
		localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
		document.cookie = `${DEMO_USER_COOKIE}=${encodeURIComponent(session.userId)}; path=/; max-age=86400; samesite=lax`;
	} else {
		localStorage.removeItem(AUTH_STORAGE_KEY);
		document.cookie = `${DEMO_USER_COOKIE}=; path=/; max-age=0; samesite=lax`;
	}
	window.dispatchEvent(new Event(AUTH_EVENT));
}
function normalizeProfile(payload) {
	const raw = payload?.myProfileDto ?? payload?.MyProfileDto;
	if (!raw || typeof raw !== "object") return null;
	const id = typeof raw.id === "string" ? raw.id : "";
	const name = typeof raw.name === "string" ? raw.name : "";
	const email = typeof raw.email === "string" ? raw.email : "";
	if (!id || !name || !email) return null;
	return {
		id,
		name,
		email,
		phoneNumber: typeof raw.phoneNumber === "string" ? raw.phoneNumber : null,
		genderId: typeof raw.genderId === "number" ? raw.genderId : null,
		avatar: typeof raw.avatar === "string" ? raw.avatar : null,
		roleId: raw.roleId ?? null,
		roleName: typeof raw.roleName === "string" ? raw.roleName : null
	};
}
/**
* MyProfileModal ما بيرجع نوع المستخدم (UserTypeId/UserType.Name) — لسا ما
* انضافت لـ MyProfileDto بالباك اند، وما في أي مصدر بديل (لا claim ولا حقل
* بنتيجة تسجيل الدخول) — هاد النداء هو المصدر الوحيد لمعرفة الدور. بالانتظار،
* نجيبها من /api/User/CreateEditModal?id=... (نفس الـ endpoint يلي شاشة
* تعديل المستخدم بتستخدمه). إذا فشل النداء منرجع null وبيضل تسجيل الدخول
* نفسه ناجح — بس الراوتينغ بيوجّه لصفحة طالب افتراضية بدل الدور الحقيقي.
* لهيك بنسجّل الخطأ بالكونسول بدل ما نبلعه بصمت — لو صرت تشوف مستخدم حقيقي
* (وخصوصًا الأدمن) بينوجّه لمساحة غلط بعد الدخول، افتح Console وشوف رسالة
* "fetchUserType failed" هون: غالبًا الاستجابة من CreateEditModal رجعت خطأ
* أو شكل مختلف عن المتوقع.
*/
async function fetchUserType(userId) {
	try {
		const modal = await apiClient.get(`/api/User/CreateEditModal?id=${encodeURIComponent(userId)}`);
		const u = modal?.user ?? modal?.User;
		const roleId = typeof u?.userTypeId === "number" ? u.userTypeId : null;
		const roleName = typeof u?.userType?.name === "string" ? u.userType.name : null;
		if (roleId == null) console.warn("[auth] fetchUserType: userTypeId غير موجود بالاستجابة — تحقق من شكل الـJSON الفعلي:", modal);
		return {
			roleId,
			roleName
		};
	} catch (err) {
		console.error("[auth] fetchUserType failed — سيتم التعامل مع المستخدم كطالب افتراضيًا:", err);
		return {
			roleId: null,
			roleName: null
		};
	}
}
async function login(email, password) {
	const result = await apiClient.post("/api/Auth/Login", {
		email,
		password,
		returnUrl: ""
	});
	if (!result?.success) throw new Error(result?.message || "تعذّر تسجيل الدخول");
	const payload = await apiClient.get("/api/User/MyProfileModal");
	const profile = normalizeProfile(payload);
	if (!profile) {
		console.error("MyProfileModal payload لم يطابق الشكل المتوقع:", payload);
		throw new Error("تم تسجيل الدخول، لكن تعذّر التحقق من الملف الشخصي");
	}
	const userType = await fetchUserType(profile.id);
	profile.roleId = userType.roleId;
	profile.roleName = userType.roleName;
	writeStoredSession({
		email: profile.email,
		loggedInAt: Date.now(),
		userId: profile.id,
		isDemo: false,
		profile
	});
}
/** الباك اند بينشئ الحساب، ينشئ Wallet تلقائيًا، ويسجّل الدخول فورًا لو نجح
* (SignInManager.SignInAsync)، فمنجيب البروفايل فورًا بعدها متل login(). */
async function register(input) {
	const result = await apiClient.post("/api/Auth/Register", {
		name: input.name,
		email: input.email,
		phoneNumber: input.phoneNumber,
		password: input.password,
		confirmPassword: input.confirmPassword,
		genderId: input.genderId,
		userTypeId: input.userTypeId
	});
	if (!result?.success) throw new Error(result?.message || "تعذّر إنشاء الحساب");
	const profile = normalizeProfile(await apiClient.get("/api/User/MyProfileModal"));
	if (!profile) throw new Error("تم إنشاء الحساب، لكن تعذّر التحقق من الملف الشخصي");
	const userType = await fetchUserType(profile.id);
	profile.roleId = userType.roleId;
	profile.roleName = userType.roleName;
	writeStoredSession({
		email: profile.email,
		loggedInAt: Date.now(),
		userId: profile.id,
		isDemo: false,
		profile,
		justRegistered: true
	});
}
/** دخول محلي مؤقت لاختبار الأدوار التي لم يدعمها الباك إند بعد.
* نفس شرط الظهور بالضبط يلي بيتحكم بظهور أزرار الدخول التجريبي بـlogin.tsx
* (demoEnabled) — لازم يضلوا متطابقين وإلا الزر بيظهر بس الضغط عليه بيفشل. */
function loginAsDemo(userId) {
	if (!env.ENABLE_DEMO_LOGIN) throw new Error("الدخول التجريبي متاح في بيئة التطوير فقط");
	writeStoredSession({
		email: null,
		loggedInAt: Date.now(),
		userId,
		isDemo: true,
		profile: null
	});
}
function isDemoSession() {
	return readStoredSession()?.isDemo === true;
}
/** يتحقق من جلسة ASP.NET Identity من خلال endpoint الخادم. */
async function verifyServerSession() {
	if (typeof window === "undefined" || isDemoSession()) return false;
	try {
		const profile = normalizeProfile(await apiClient.get("/api/User/MyProfileModal"));
		if (!profile) return false;
		const current = readStoredSession();
		writeStoredSession({
			email: profile.email,
			loggedInAt: current?.loggedInAt ?? Date.now(),
			userId: profile.id,
			isDemo: false,
			profile
		});
		return true;
	} catch (err) {
		if (err instanceof ApiError && [401, 403].includes(err.status)) writeStoredSession(null);
		return false;
	}
}
async function logout() {
	const wasDemo = readStoredSession()?.isDemo;
	try {
		if (!wasDemo) await apiClient.post("/api/Auth/Logout");
	} catch (err) {
		if (!(err instanceof ApiError)) console.error(err);
	} finally {
		writeStoredSession(null);
	}
}
/** فحص محلي للواجهة فقط؛ التحقق الأمني يجب أن يبقى في الباك إند. */
function isAuthenticated() {
	return readStoredSession() !== null;
}
function getStoredEmail() {
	return readStoredSession()?.email ?? null;
}
function getStoredUserId() {
	return readStoredSession()?.userId ?? null;
}
function getStoredProfile() {
	return readStoredSession()?.profile ?? null;
}
/** true فقط لأول جلسة بعد نجاح التسجيل — إشارة ابتدائية لعرض قائمة
* "خطواتك الأولى" تلقائيًا أول مرة. لا تُستهلك/تُطفى هون عمدًا (القرار
* الدائم لعرض/إخفاء القائمة عبر عمر الحساب بيتحكم فيه onboarding.ts
* بعلم منفصل مربوط بـuserId، مش بهالعلم المؤقت). */
function wasJustRegistered() {
	return readStoredSession()?.justRegistered === true;
}
/** UserTypeId=1 ("مدير النظام") — الوحيد المتاح فعليًا على الباك اند حاليًا. */
function isRealAdmin() {
	const session = readStoredSession();
	return session?.isDemo === false && session.profile?.roleId === 1;
}
var PreferencesContext = (0, import_react.createContext)(null);
function usePreferences() {
	const ctx = (0, import_react.useContext)(PreferencesContext);
	if (!ctx) throw new Error("usePreferences must be used inside PreferencesProvider");
	return ctx;
}
/** Bilingual inline text helper (ar primary, en secondary) — القسم 08. */
function useBi() {
	const { locale } = usePreferences();
	return (ar, en) => locale === "en" ? en : ar;
}
var ROLE_BY_NAME = {
	طالب: "student",
	معلم: "teacher",
	"ولي أمر": "parent",
	"مشرف أكاديمي": "supervisor",
	"مدير عام": "admin",
	الطالب: "student",
	المعلم: "teacher",
	"ولي الامر": "parent",
	"مدير النظام": "admin"
};
var ROLE_PAGE_PREFIXES = {
	student: [
		"student_",
		"notifications",
		"account_settings"
	],
	teacher: [
		"teacher_",
		"notifications",
		"account_settings"
	],
	parent: [
		"parent_",
		"notifications",
		"account_settings"
	],
	supervisor: [
		"supervisor_",
		"notifications",
		"account_settings"
	],
	admin: [
		"admin_",
		"notifications",
		"account_settings"
	]
};
function pageMatchesRole(pageKey, role) {
	return ROLE_PAGE_PREFIXES[role].some((prefix) => pageKey === prefix || pageKey.startsWith(prefix));
}
function roleKeyFromName(name, isAdmin = false) {
	if (name && ROLE_BY_NAME[name]) return ROLE_BY_NAME[name];
	return isAdmin ? "admin" : "student";
}
var ROLE_HOME = {
	student: "/dashboard",
	teacher: "/teacher/dashboard",
	parent: "/parent/report",
	supervisor: "/supervisor/dashboard",
	admin: "/admin/dashboard"
};
function roleHome(name, isAdmin = false) {
	return ROLE_HOME[roleKeyFromName(name, isAdmin)];
}
/**
* البند 9 — الروابط العامة المسموحة لكل دور بعد تسجيل الدخول.
* لا نعرض رابطاً يؤدي إلى صفحة خارج مساحة الدور (سوق الكورسات للطالب فقط… إلخ).
*/
var PUBLIC_NAV_FOR_ROLE = {
	student: [
		"/",
		"/courses",
		"/how-it-works",
		"/pricing",
		"/blog"
	],
	teacher: [
		"/",
		"/for-teachers",
		"/how-it-works",
		"/blog"
	],
	parent: [
		"/",
		"/for-parents",
		"/how-it-works",
		"/pricing",
		"/blog"
	],
	supervisor: [
		"/",
		"/how-it-works",
		"/blog"
	],
	admin: ["/", "/blog"]
};
function allowedPublicPaths(role) {
	return role ? PUBLIC_NAV_FOR_ROLE[role] : null;
}
var PERMISSION_KEYS = [
	{
		key: "view_list",
		label: "عرض بيانات الجدول",
		sort_order: 1
	},
	{
		key: "show_add_form",
		label: "عرض واجهة الإضافة",
		sort_order: 2
	},
	{
		key: "execute_add",
		label: "تنفيذ الإضافة",
		sort_order: 3
	},
	{
		key: "edit",
		label: "تعديل",
		sort_order: 4
	},
	{
		key: "delete",
		label: "حذف",
		sort_order: 5
	},
	{
		key: "view_profile",
		label: "عرض الملف الشخصي",
		sort_order: 6
	},
	{
		key: "edit_profile",
		label: "تعديل الملف الشخصي",
		sort_order: 7
	},
	{
		key: "show_password_form",
		label: "عرض واجهة تغيير كلمة المرور",
		sort_order: 8
	},
	{
		key: "change_password",
		label: "تنفيذ تغيير كلمة المرور",
		sort_order: 9
	}
];
var MODULES = [
	{
		id: "m-student",
		key: "student",
		name: "مساحة الطالب",
		nameEn: "Student space",
		icon: "GraduationCap",
		enabled: true,
		sort_order: 1
	},
	{
		id: "m-teacher",
		key: "teacher",
		name: "مساحة المعلم",
		nameEn: "Teacher space",
		icon: "Presentation",
		enabled: true,
		sort_order: 2
	},
	{
		id: "m-supervisor",
		key: "supervisor",
		name: "الإشراف الأكاديمي",
		nameEn: "Academic supervision",
		icon: "ClipboardCheck",
		enabled: true,
		sort_order: 3
	},
	{
		id: "m-parent",
		key: "parent",
		name: "مساحة ولي الأمر",
		nameEn: "Parent space",
		icon: "Users",
		enabled: true,
		sort_order: 4
	},
	{
		id: "m-admin",
		key: "administration",
		name: "الإدارة",
		nameEn: "Administration",
		icon: "ShieldCheck",
		enabled: true,
		sort_order: 5
	},
	{
		id: "m-academic",
		key: "academic",
		name: "الشؤون الأكاديمية",
		nameEn: "Academic",
		icon: "GraduationCap",
		enabled: true,
		sort_order: 6
	},
	{
		id: "m-account",
		key: "account",
		name: "الحساب",
		nameEn: "Account",
		icon: "Settings",
		enabled: true,
		sort_order: 7
	}
];
var PAGES = [
	{
		id: "p-student-dashboard",
		module_id: "m-student",
		parent_id: null,
		key: "student_dashboard",
		name: "لوحة المعلومات",
		name_en: "Dashboard",
		icon: "LayoutDashboard",
		path: "/dashboard",
		sort_order: 1
	},
	{
		id: "p-student-group-study",
		module_id: "m-student",
		parent_id: null,
		key: "student_group_study",
		name: "أدوات الدراسة",
		name_en: "Study tools",
		icon: "BookOpen",
		path: null,
		sort_order: 2
	},
	{
		id: "p-student-my-courses",
		module_id: "m-student",
		parent_id: "p-student-group-study",
		key: "student_my_courses",
		name: "كورساتي",
		name_en: "My courses",
		icon: "BookOpen",
		path: "/my-courses",
		sort_order: 1
	},
	{
		id: "p-student-library",
		module_id: "m-student",
		parent_id: "p-student-group-study",
		key: "student_library",
		name: "المكتبة",
		name_en: "Library",
		icon: "Library",
		path: "/library",
		sort_order: 2
	},
	{
		id: "p-student-flashcards",
		module_id: "m-student",
		parent_id: "p-student-group-study",
		key: "student_flashcards",
		name: "البطاقات التعليمية",
		name_en: "Flashcards",
		icon: "Layers",
		path: "/flashcards",
		sort_order: 3
	},
	{
		id: "p-student-exam",
		module_id: "m-student",
		parent_id: "p-student-group-study",
		key: "student_exam",
		name: "امتحاناتي التجريبية",
		name_en: "My practice exams",
		icon: "FileQuestion",
		path: "/exam-simulator",
		sort_order: 4
	},
	{
		id: "p-student-mistakes",
		module_id: "m-student",
		parent_id: "p-student-group-study",
		key: "student_mistakes",
		name: "بنك الأخطاء",
		name_en: "Mistakes bank",
		icon: "AlertTriangle",
		path: "/mistakes-bank",
		sort_order: 5
	},
	{
		id: "p-student-bookmarks",
		module_id: "m-student",
		parent_id: "p-student-group-study",
		key: "student_bookmarks",
		name: "المفضلة",
		name_en: "Bookmarks",
		icon: "Bookmark",
		path: "/bookmarks",
		sort_order: 6
	},
	{
		id: "p-student-group-progress",
		module_id: "m-student",
		parent_id: null,
		key: "student_group_progress",
		name: "التقدّم والجدول",
		name_en: "Progress & schedule",
		icon: "TrendingUp",
		path: null,
		sort_order: 3
	},
	{
		id: "p-student-schedule",
		module_id: "m-student",
		parent_id: "p-student-group-progress",
		key: "student_schedule",
		name: "الجدول",
		name_en: "Schedule",
		icon: "Calendar",
		path: "/schedule",
		sort_order: 1
	},
	{
		id: "p-student-achievements",
		module_id: "m-student",
		parent_id: "p-student-group-progress",
		key: "student_achievements",
		name: "الإنجازات",
		name_en: "Achievements",
		icon: "Trophy",
		path: "/achievements",
		sort_order: 2
	},
	{
		id: "p-student-certificates",
		module_id: "m-student",
		parent_id: "p-student-group-progress",
		key: "student_certificates",
		name: "شهاداتي",
		name_en: "My certificates",
		icon: "Award",
		path: "/my-certificates",
		sort_order: 3
	},
	{
		id: "p-student-group-community",
		module_id: "m-student",
		parent_id: null,
		key: "student_group_community",
		name: "المجتمع والمكافآت",
		name_en: "Community & rewards",
		icon: "Gift",
		path: null,
		sort_order: 4
	},
	{
		id: "p-student-community",
		module_id: "m-student",
		parent_id: "p-student-group-community",
		key: "student_community",
		name: "أسئلتي",
		name_en: "My questions",
		icon: "MessagesSquare",
		path: "/community",
		sort_order: 1
	},
	{
		id: "p-student-referrals",
		module_id: "m-student",
		parent_id: "p-student-group-community",
		key: "student_referrals",
		name: "الإحالات",
		name_en: "Referrals",
		icon: "Gift",
		path: "/referrals",
		sort_order: 2
	},
	{
		id: "p-student-wallet",
		module_id: "m-student",
		parent_id: "p-student-group-community",
		key: "student_wallet",
		name: "محفظتي",
		name_en: "My wallet",
		icon: "Wallet",
		path: "/wallet",
		sort_order: 3
	},
	{
		id: "p-teacher-dashboard",
		module_id: "m-teacher",
		parent_id: null,
		key: "teacher_dashboard",
		name: "لوحة المعلم",
		name_en: "Teacher dashboard",
		icon: "LayoutDashboard",
		path: "/teacher/dashboard",
		sort_order: 1
	},
	{
		id: "p-teacher-group-teaching",
		module_id: "m-teacher",
		parent_id: null,
		key: "teacher_group_teaching",
		name: "التدريس",
		name_en: "Teaching",
		icon: "BookOpen",
		path: null,
		sort_order: 2
	},
	{
		id: "p-teacher-courses",
		module_id: "m-teacher",
		parent_id: "p-teacher-group-teaching",
		key: "teacher_courses",
		name: "كورساتي",
		name_en: "My courses",
		icon: "BookOpen",
		path: "/teacher/courses",
		sort_order: 1
	},
	{
		id: "p-teacher-content",
		module_id: "m-teacher",
		parent_id: "p-teacher-group-teaching",
		key: "teacher_content",
		name: "المحتوى",
		name_en: "Content",
		icon: "FileText",
		path: "/teacher/content",
		sort_order: 2
	},
	{
		id: "p-teacher-quizzes",
		module_id: "m-teacher",
		parent_id: "p-teacher-group-teaching",
		key: "teacher_quizzes",
		name: "الاختبارات",
		name_en: "Quizzes",
		icon: "FileQuestion",
		path: "/teacher/quizzes",
		sort_order: 3
	},
	{
		id: "p-teacher-grading",
		module_id: "m-teacher",
		parent_id: "p-teacher-group-teaching",
		key: "teacher_grading",
		name: "التصحيح",
		name_en: "Grading",
		icon: "CheckSquare",
		path: "/teacher/grading",
		sort_order: 4
	},
	{
		id: "p-teacher-group-performance",
		module_id: "m-teacher",
		parent_id: null,
		key: "teacher_group_performance",
		name: "الأداء",
		name_en: "Performance",
		icon: "BarChart3",
		path: null,
		sort_order: 3
	},
	{
		id: "p-teacher-analytics",
		module_id: "m-teacher",
		parent_id: "p-teacher-group-performance",
		key: "teacher_analytics",
		name: "التحليلات",
		name_en: "Analytics",
		icon: "BarChart3",
		path: "/teacher/analytics",
		sort_order: 1
	},
	{
		id: "p-teacher-earnings",
		module_id: "m-teacher",
		parent_id: "p-teacher-group-performance",
		key: "teacher_earnings",
		name: "الأرباح",
		name_en: "Earnings",
		icon: "Wallet",
		path: "/teacher/earnings",
		sort_order: 2
	},
	{
		id: "p-teacher-group-profile",
		module_id: "m-teacher",
		parent_id: null,
		key: "teacher_group_profile",
		name: "ملفي المهني",
		name_en: "My professional profile",
		icon: "UserCog",
		path: null,
		sort_order: 4
	},
	{
		id: "p-teacher-community",
		module_id: "m-teacher",
		parent_id: "p-teacher-group-profile",
		key: "teacher_community",
		name: "أسئلة طلابي",
		name_en: "My students' questions",
		icon: "MessagesSquare",
		path: "/teacher/community",
		sort_order: 1
	},
	{
		id: "p-teacher-profile-edit",
		module_id: "m-teacher",
		parent_id: "p-teacher-group-profile",
		key: "teacher_profile_edit",
		name: "تعديل الملف الشخصي",
		name_en: "Edit profile",
		icon: "UserCog",
		path: "/teacher/profile/edit",
		sort_order: 2
	},
	{
		id: "p-teacher-settings",
		module_id: "m-teacher",
		parent_id: "p-teacher-group-profile",
		key: "teacher_settings",
		name: "الإعدادات",
		name_en: "Settings",
		icon: "Settings",
		path: "/teacher/settings",
		sort_order: 3
	},
	{
		id: "p-supervisor-dashboard",
		module_id: "m-supervisor",
		parent_id: null,
		key: "supervisor_dashboard",
		name: "لوحة المشرف",
		name_en: "Supervisor dashboard",
		icon: "LayoutDashboard",
		path: "/supervisor/dashboard",
		sort_order: 1
	},
	{
		id: "p-supervisor-teachers",
		module_id: "m-supervisor",
		parent_id: null,
		key: "supervisor_teachers",
		name: "المعلمون",
		name_en: "Teachers",
		icon: "Users",
		path: "/supervisor/teachers",
		sort_order: 2
	},
	{
		id: "p-supervisor-students",
		module_id: "m-supervisor",
		parent_id: null,
		key: "supervisor_students",
		name: "نظرة عامة على الطلاب",
		name_en: "Students overview",
		icon: "GraduationCap",
		path: "/supervisor/students-overview",
		sort_order: 3
	},
	{
		id: "p-supervisor-reports",
		module_id: "m-supervisor",
		parent_id: null,
		key: "supervisor_reports",
		name: "التقارير",
		name_en: "Reports",
		icon: "FileBarChart",
		path: "/supervisor/reports",
		sort_order: 4
	},
	{
		id: "p-parent-report",
		module_id: "m-parent",
		parent_id: null,
		key: "parent_report",
		name: "تقرير الأبناء",
		name_en: "Children report",
		icon: "FileBarChart",
		path: "/parent/report",
		sort_order: 1
	},
	{
		id: "p-parent-settings",
		module_id: "m-parent",
		parent_id: null,
		key: "parent_settings",
		name: "الإعدادات",
		name_en: "Settings",
		icon: "Settings",
		path: "/parent/settings",
		sort_order: 2
	},
	{
		id: "p-system-modules",
		module_id: "m-admin",
		parent_id: null,
		key: "admin_settings",
		name: "وحدات النظام",
		name_en: "System modules",
		icon: "ToggleRight",
		path: "/system-modules",
		sort_order: 1
	},
	{
		id: "p-user-mgmt",
		module_id: "m-admin",
		parent_id: null,
		key: "admin_users",
		name: "إدارة المستخدمين",
		name_en: "User management",
		icon: "UsersRound",
		path: null,
		sort_order: 2
	},
	{
		id: "p-user-types",
		module_id: "m-admin",
		parent_id: "p-user-mgmt",
		key: "admin_roles",
		name: "الأدوار والصلاحيات",
		name_en: "Roles",
		icon: "IdCard",
		path: "/admin/roles",
		sort_order: 1
	},
	{
		id: "p-users",
		module_id: "m-admin",
		parent_id: "p-user-mgmt",
		key: "admin_users",
		name: "المستخدمون",
		name_en: "Users",
		icon: "User",
		path: "/admin/users",
		sort_order: 2
	},
	{
		id: "p-permissions",
		module_id: "m-admin",
		parent_id: "p-user-mgmt",
		key: "admin_roles",
		name: "مصفوفة الصلاحيات",
		name_en: "Permission matrix",
		icon: "Settings2",
		path: "/admin/permissions",
		sort_order: 3
	},
	{
		id: "p-content-mgmt",
		module_id: "m-admin",
		parent_id: null,
		key: "admin_content",
		name: "محتوى النظام",
		name_en: "System content",
		icon: "FolderTree",
		path: null,
		sort_order: 3
	},
	{
		id: "p-pages",
		module_id: "m-admin",
		parent_id: "p-content-mgmt",
		key: "admin_pages",
		name: "الصفحات",
		name_en: "Pages",
		icon: "FileText",
		path: "/admin/pages",
		sort_order: 1
	},
	{
		id: "p-constants",
		module_id: "m-admin",
		parent_id: "p-content-mgmt",
		key: "admin_constants",
		name: "الثوابت",
		name_en: "Constants",
		icon: "ListTree",
		path: "/admin/constants",
		sort_order: 2
	},
	{
		id: "p-backend-permissions",
		module_id: "m-admin",
		parent_id: "p-content-mgmt",
		key: "admin_backend_permissions",
		name: "صلاحيات الباك اند",
		name_en: "Backend permissions",
		icon: "ShieldCheck",
		path: "/admin/backend-permissions",
		sort_order: 3
	},
	{
		id: "p-admin-dashboard",
		module_id: "m-academic",
		parent_id: null,
		key: "admin_dashboard",
		name: "نظرة عامة",
		name_en: "Overview",
		icon: "LayoutDashboard",
		path: "/admin/dashboard",
		sort_order: 1
	},
	{
		id: "p-academic-group-curriculum",
		module_id: "m-academic",
		parent_id: null,
		key: "academic_group_curriculum",
		name: "المنهج والمحتوى",
		name_en: "Curriculum & content",
		icon: "BookOpen",
		path: null,
		sort_order: 2
	},
	{
		id: "p-admin-curriculum",
		module_id: "m-academic",
		parent_id: "p-academic-group-curriculum",
		key: "admin_curriculum",
		name: "المنهج",
		name_en: "Curriculum",
		icon: "BookOpen",
		path: "/admin/curriculum",
		sort_order: 1
	},
	{
		id: "p-admin-curriculum-req",
		module_id: "m-academic",
		parent_id: "p-academic-group-curriculum",
		key: "admin_curriculum_requests",
		name: "طلبات المنهج",
		name_en: "Curriculum requests",
		icon: "FileCheck",
		path: "/admin/curriculum-requests",
		sort_order: 2
	},
	{
		id: "p-admin-content-review",
		module_id: "m-academic",
		parent_id: "p-academic-group-curriculum",
		key: "admin_content_review",
		name: "مراجعة المحتوى",
		name_en: "Content review",
		icon: "FileSearch",
		path: "/admin/content-review",
		sort_order: 3
	},
	{
		id: "p-admin-course-catalog",
		module_id: "m-academic",
		parent_id: "p-academic-group-curriculum",
		key: "admin_course_catalog",
		name: "كتالوج الكورسات العام",
		name_en: "Public course catalog",
		icon: "Store",
		path: "/admin/course-catalog",
		sort_order: 4
	},
	{
		id: "p-academic-group-oversight",
		module_id: "m-academic",
		parent_id: null,
		key: "academic_group_oversight",
		name: "الإشراف والمالية",
		name_en: "Oversight & finance",
		icon: "ShieldCheck",
		path: null,
		sort_order: 3
	},
	{
		id: "p-admin-teachers",
		module_id: "m-academic",
		parent_id: "p-academic-group-oversight",
		key: "admin_teachers",
		name: "المعلمون",
		name_en: "Teachers",
		icon: "Users",
		path: "/admin/teachers",
		sort_order: 1
	},
	{
		id: "p-admin-community-reports",
		module_id: "m-academic",
		parent_id: "p-academic-group-oversight",
		key: "admin_community_reports",
		name: "بلاغات المجتمع",
		name_en: "Community reports",
		icon: "MessageSquareWarning",
		path: "/admin/community-reports",
		sort_order: 2
	},
	{
		id: "p-admin-payments",
		module_id: "m-academic",
		parent_id: "p-academic-group-oversight",
		key: "admin_payments",
		name: "المدفوعات",
		name_en: "Payments",
		icon: "CreditCard",
		path: "/admin/payments",
		sort_order: 3
	},
	{
		id: "p-notifications",
		module_id: "m-account",
		parent_id: null,
		key: "notifications",
		name: "الإشعارات",
		name_en: "Notifications",
		icon: "Bell",
		path: "/notifications",
		sort_order: 1
	},
	{
		id: "p-account-settings",
		module_id: "m-account",
		parent_id: null,
		key: "account_settings",
		name: "إعدادات الحساب",
		name_en: "Account settings",
		icon: "Settings",
		path: "/settings",
		sort_order: 2
	}
];
var ROLES = [
	{
		id: "r-admin",
		name: "مدير عام",
		description: "صلاحيات كاملة على المنصة",
		created_at: (/* @__PURE__ */ new Date()).toISOString()
	},
	{
		id: "r-supervisor",
		name: "مشرف أكاديمي",
		description: "متابعة المعلمين والطلاب والتقارير",
		created_at: (/* @__PURE__ */ new Date()).toISOString()
	},
	{
		id: "r-teacher",
		name: "معلم",
		description: "إدارة المحتوى والاختبارات والطلاب",
		created_at: (/* @__PURE__ */ new Date()).toISOString()
	},
	{
		id: "r-parent",
		name: "ولي أمر",
		description: "متابعة تقارير الأبناء",
		created_at: (/* @__PURE__ */ new Date()).toISOString()
	},
	{
		id: "r-student",
		name: "طالب",
		description: "مساحة الطالب: مكتبة، إنجاز، امتحانات",
		created_at: (/* @__PURE__ */ new Date()).toISOString()
	}
];
function pagesForModule(moduleId) {
	return PAGES.filter((p) => p.module_id === moduleId);
}
function fullGrant(pages) {
	return pages.flatMap((p) => PERMISSION_KEYS.map((k) => `${p.id}:${k.key}`));
}
/**
* مصفوفة الصلاحيات الفعلية لكل دور — بديل جدول role_permissions بـ Supabase.
* المفتاح: roleId، القيمة: مجموعة "pageId:permissionKey" الممنوحة.
*
* - "مدير عام" دايماً كل الصلاحيات على كل شي (بايباس، متل ما كان بالـ SQL
*   الأصلي: "super admin gets everything").
* - باقي الأدوار (مشرف/معلم/ولي أمر/طالب) مبدئياً عندها كل الصلاحيات على
*   مساحتها الخاصة بس (نفس المبدأ يلي كان بالـ seed الأصلي: كل دور له مساحته
*   المستقلة بالكامل). الأدمن يقدر يقيّدها لاحقاً من شاشة "مصفوفة الصلاحيات"
*   وبتنحفظ فعلياً (راجع rbac.functions.ts::saveRolePermissions).
*/
var ROLE_PERMISSION_GRANTS = {
	"r-admin": new Set(fullGrant(PAGES)),
	"r-supervisor": new Set(fullGrant([...pagesForModule("m-supervisor"), ...pagesForModule("m-account")])),
	"r-teacher": new Set(fullGrant([...pagesForModule("m-teacher"), ...pagesForModule("m-account")])),
	"r-parent": new Set(fullGrant([...pagesForModule("m-parent"), ...pagesForModule("m-account")])),
	"r-student": new Set(fullGrant([...pagesForModule("m-student"), ...pagesForModule("m-account")]))
};
var USERS = [
	{
		id: "u-admin",
		full_name: "الأدمن",
		email: "admin@Academia.com",
		phone: null,
		gender: "male",
		avatar_url: null,
		is_active: true,
		role_id: "r-admin",
		role_name: "مدير عام"
	},
	{
		id: "u-demo-supervisor",
		full_name: "مشرف (تجريبي)",
		email: null,
		phone: null,
		gender: "male",
		avatar_url: null,
		is_active: true,
		role_id: "r-supervisor",
		role_name: "مشرف أكاديمي"
	},
	{
		id: "u-demo-teacher",
		full_name: "معلم (تجريبي)",
		email: null,
		phone: null,
		gender: "male",
		avatar_url: null,
		is_active: true,
		role_id: "r-teacher",
		role_name: "معلم"
	},
	{
		id: "u-demo-parent",
		full_name: "ولي أمر (تجريبي)",
		email: null,
		phone: null,
		gender: "male",
		avatar_url: null,
		is_active: true,
		role_id: "r-parent",
		role_name: "ولي أمر"
	},
	{
		id: "u-demo-student",
		full_name: "طالب (تجريبي)",
		email: null,
		phone: null,
		gender: "male",
		avatar_url: null,
		is_active: true,
		role_id: "r-student",
		role_name: "طالب"
	}
];
function nextId(prefix) {
	return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}
//#endregion
export { useBi as A, nextId as C, roleKeyFromName as D, roleHome as E, verifyServerSession as M, wasJustRegistered as N, throwBilingual as O, logout as S, register as T, isAuthenticated as _, PERMISSION_KEYS as a, login as b, ROLE_PERMISSION_GRANTS as c, apiClient as d, changeMyPassword as f, getStoredUserId as g, getStoredProfile as h, PAGES as i, usePreferences as j, updateMyProfile as k, USERS as l, getStoredEmail as m, DEMO_USER_COOKIE as n, PreferencesContext as o, getErrorMessage as p, MODULES as r, ROLES as s, AUTH_EVENT as t, allowedPublicPaths as u, isDemoSession as v, pageMatchesRole as w, loginAsDemo as x, isRealAdmin as y };
