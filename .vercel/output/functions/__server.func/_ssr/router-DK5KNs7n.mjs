import { i as __toESM } from "../_runtime.mjs";
import { t as env } from "./env-FodiAD7N.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as index_server_exports, o as __exportAll, r as tanstackRouterBrowserTracingIntegration } from "./ssr.mjs";
import { t as instance } from "../_libs/i18next.mjs";
import { n as useTranslation, r as initReactI18next, t as I18nextProvider } from "../_libs/react-i18next.mjs";
import { _ as createFileRoute, b as useNavigate, d as useLocation, f as useRouterState, g as lazyRouteComponent, h as Outlet, l as Scripts, m as createRouter, u as HeadContent, v as createRootRouteWithContext, x as useRouter, y as Link, z as redirect } from "../_libs/@tanstack/react-router+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { i as useQueryClient, r as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { ht as Cookie } from "../_libs/lucide-react.mjs";
import { t as dd } from "../_libs/posthog-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/bi-f0YHgVBk.js
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
/** يرمي رسالة تحقق مطابقة للغة الواجهة الحالية — للاستخدام بملفات التكامل
* العادية (admin-users.ts وغيرها) يلي مش مكوّنات React وما فيها useTranslation. */
function throwBilingual(ar, en) {
	throw new Error(currentLang() === "ar" ? ar : en);
}
var PreferencesContext = (0, import_react.createContext)(null);
function usePreferences() {
	const ctx = (0, import_react.useContext)(PreferencesContext);
	if (!ctx) throw new Error("usePreferences must be used inside PreferencesProvider");
	return ctx;
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
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/blog-posts-CGNfBsVT.js
/**
* مقالات المدونة — محتوى أصلي كتبته أكاديميا لطلاب الثانوية العامة.
* لا يعتمد على مكتبة Markdown؛ كل مقال مصفوفة "بلوكات" مطبوعة عبر BlogRenderer.
*/
var blogPosts = [
	{
		slug: "جدول-مذاكرة-يضبط-فعلاً",
		title: "جدول المذاكرة يلي بيضبط، مش يلي بيبين حلو على الورقة",
		titleEn: "A study schedule that actually holds, not one that looks good on paper",
		excerpt: "أغلب جداول المذاكرة بتنكسر باليوم التالت. المشكلة مو فيك، المشكلة إنك بتبني الجدول على الوقت المتوفر مش على طاقتك الفعلية. هيك تبني جدول تلتزم فيه.",
		excerptEn: "Most study schedules break on day three. The problem isn't you — you built the plan around available hours instead of your real energy. Here's how to build one you'll stick to.",
		category: "تنظيم الوقت",
		categoryEn: "Time management",
		readMinutes: 6,
		publishedAt: "2026-06-02",
		body: [
			{
				type: "p",
				text: "كل سنة، تقريباً كل طالب بيقعد قبل الامتحانات بأسبوعين ويرسم جدول مذاكرة مثالي: من 8 الصبح لـ8 المسا، كل مادة ساعتين، واستراحة ربع ساعة بينهم. وبعد يومين أو تلاتة، الجدول هذا بيصير ورقة منسية بالدرج. مش لأنك كسول، ولا لأنك ما عندك إرادة. المشكلة إنك بنيت الجدول على افتراض غلط: إنك آلة بتشتغل بنفس الكفاءة من الصبح للمسا."
			},
			{
				type: "p",
				text: "الحقيقة إنه تركيزك مو ثابت طول اليوم. فيه ساعات إنت فيها في قمة صفاءك الذهني، وفيه ساعات تانية بتحس فيها إنك عم تقرأ نفس السطر عشر مرات بدون ما يدخل شي. أول خطوة صح مش إنك تحط جدول، أول خطوة إنك تراقب حالك أسبوع كامل بدون أي التزام — بس لاحظ: إيمتى بتحس إنك صاحي وقادر تركز؟ إيمتى بتحس إنك تعبان حتى لو نمت منيح؟"
			},
			{
				type: "h2",
				text: "قاعدة الساعتين الأول"
			},
			{
				type: "p",
				text: "أول ساعتين من جلسة المذاكرة عندك — أي جلسة، مش بس الصبح — هي أعلى ساعتين إنتاجية. فيهم بتقدر تفهم مفهوم جديد صعب، تحل مسائل معقدة، أو تراجع مادة بتحتاج تركيز عالي زي الفيزياء أو الكيمياء. بعد الساعتين هدول، مستوى التركيز بينزل تدريجياً. فبدل ما تحط أصعب مادة آخر اليوم لما تكون خلصان طاقة، اقلبها: ابدأ بالمادة يلي بتخوّفك أكتر شي."
			},
			{
				type: "p",
				text: "هيك كمان بتتخلص من أكبر عبء نفسي بأول الجلسة، وباقي اليوم بيصير أخف لأنك خلّصت يلي كان قاعد يوجعك راسك من الصبح."
			},
			{
				type: "h2",
				text: "بلوكات مش ساعات"
			},
			{
				type: "p",
				text: "بدل ما تقول \"من 4 لـ6 كيمياء\"، فكر بـ\"بلوكات\": بلوك = 50 دقيقة مذاكرة + 10 دقايق استراحة فعلية (قوم، تمشى، اشرب مي — مش تفتح الموبايل، لأنه هذا مش استراحة، هذا بداية تشتت تاني ساعة). أربع بلوكات باليوم يعني ساعتين و40 دقيقة مذاكرة فعلية مركّزة، وهاد أكتر بكتير من ست ساعات \"مذاكرة\" نصها سرحان."
			},
			{
				type: "list",
				items: [
					"حدد عدد البلوكات الواقعي يلي تقدر تلتزم فيه يومياً — 3 إلى 5 كافية جداً",
					"خصص أول بلوك دايماً للمادة الأصعب أو يلي مأجلها",
					"بعد كل بلوكين، خذ استراحة أطول (20-30 دقيقة) مش بس 10",
					"سجّل بآخر اليوم: كم بلوك خلصت فعلياً؟ هذا الرقم الصادق، مو الجدول"
				]
			},
			{
				type: "h2",
				text: "اليوم يلي بينكسر فيه الجدول — وهذا طبيعي"
			},
			{
				type: "p",
				text: "رح يجي يوم ما بتقدر تكمل الخطة. صرت متأخر، أو صار عندك شي عائلي، أو بكل بساطة تعبان. هون أكبر غلطة بيقع فيها الطلاب: يحسّوا إنه \"خربت الخطة\" فيبطلوا يتابعوها بالكامل. الجدول الصح مش يلي ما بينكسر، هو يلي فيه مساحة لليوم يلي بينكسر. خصص يوم بالأسبوع — الجمعة مثلاً — كـ\"يوم احتياطي\" مالوش مادة محددة، بس لتعويض أي بلوك فاتك."
			},
			{
				type: "quote",
				text: "الجدول أداة تساعدك تلتزم، مش عقد لازم تنفذه حرفياً. لما تحس إنه صار عبء بدل ما يكون مساعد، هذا مؤشر إنك لازم تبسّطه أكتر، مش إنك فاشل."
			}
		]
	},
	{
		slug: "الاستدعاء-النشط-وليش-القراءة-مش-كافية",
		title: "ليش تعيد قراءة الدرس مرتين ما بيثبته، والاستدعاء النشط بيثبته",
		titleEn: "Why rereading a lesson twice doesn't stick, but active recall does",
		excerpt: "بتحس إنك فاهم وقت بتقرأ، وبتنسى وقت الامتحان؟ هاي أشهر خدعة بيلعبها دماغك عليك. في طريقة أثبتت علمياً إنها أقوى بكتير — وهي أبسط مما تتخيل.",
		excerptEn: "Rereading feels productive and teaches you almost nothing. Active recall feels hard and is what actually moves knowledge into long-term memory.",
		category: "أساليب المذاكرة",
		categoryEn: "Study methods",
		readMinutes: 7,
		publishedAt: "2026-06-18",
		body: [
			{
				type: "p",
				text: "جرّب هالتجربة البسيطة: اقرأ فقرة من كتاب الأحياء مرتين متتاليتين، بتركيز كامل. أكيد رح تحس بعدها إنك \"فاهم\" الموضوع منيح. بس سكّر الكتاب هلق وحاول تكتب يلي فهمته من ذاكرتك بس، بدون ما تشوف الصفحة. غالباً رح تلاحظ إنه يلي قدرت تسترجعه أقل بكتير من الإحساس اللي كان عندك وإنت عم تقرا."
			},
			{
				type: "p",
				text: "هاد اسمه \"وهم الطلاقة\" (Fluency Illusion). لما بتعيد قراءة نفس النص، دماغك بيتعرف على الكلمات بسرعة أكبر في كل مرة، وهاي السرعة بتحسها كـ\"فهم\". بس التعرّف على المعلومة (recognition) شي، واسترجاعها من غير مساعدة (recall) شي تاني تماماً. والامتحان بيطلب منك recall، مش recognition."
			},
			{
				type: "h2",
				text: "الاستدعاء النشط: تخلي دماغك يشتغل، مش يقرأ بس"
			},
			{
				type: "p",
				text: "الاستدعاء النشط (Active Recall) معناه إنك تجبر نفسك تطلع المعلومة من ذاكرتك بنفسك، بدل ما تعيد قراءتها. بدل ما تقرا تعريف \"التنفس الخلوي\" عشر مرات، اقرأه مرة وحدة منيح، بعدين سكّر الكتاب واسأل حالك: \"شو هو التنفس الخلوي؟ وين بصير؟ شو بينتج؟\" وحاول تجاوب بصوت عالي أو مكتوب. لو ما قدرت تجاوب كامل، رجّع افتح الكتاب — بس بعد ما جرّبت، مش قبل."
			},
			{
				type: "p",
				text: "هاي الطريقة بتحس فيها إنها أصعب من القراءة، وفعلاً هي أصعب — لأنها بتشغّل دماغك فعلياً بدل ما تخليه يمر بشكل سلبي فوق الكلمات. وبالضبط هاد الصعوبة هي يلي بتخلي المعلومة تثبت. كل مرة بتحاول تسترجع معلومة وتنجح (أو حتى تحاول وتفشل بس بعدين تشوف الجواب)، بتقوّي الرابط العصبي المسؤول عنها."
			},
			{
				type: "h2",
				text: "كيف تطبقها من غير أدوات معقدة"
			},
			{
				type: "list",
				items: [
					"بعد كل درس، اقفل الكتاب واكتب من ذاكرتك أهم 5 نقاط فيه — بدون ما تشوف",
					"حوّل كل عنوان فرعي بالدرس لسؤال، وجاوب عليه بدون رجوع للنص",
					"اشرح الدرس لشخص تاني (أو حتى لنفسك بصوت عالي) وكأنك بتعلّمه لأول مرة",
					"بعد يوم أو يومين، ارجع اسأل نفس الأسئلة من غير ما تراجع الدرس قبلها"
				]
			},
			{
				type: "h2",
				text: "ليش بنك الأخطاء بالذات أداة قوية هون"
			},
			{
				type: "p",
				text: "كل مرة بتحاول تسترجع معلومة وتغلط فيها، هاي مش فشل — هاي بالضبط اللحظة يلي فيها دماغك بيتعلم أكتر شي. المشكلة إنه أغلب الطلاب بمجرد ما يغلطوا بسؤال، بيشوفوا الجواب الصح وبيكملوا، بدون ما يسجّلوا وين غلطوا وليش. بعد أسبوعين، بيرجعوا يغلطوا بنفس النقطة بالضبط. لو كنت تسجّل كل غلطة بمكان واحد وترجعلها بعد يومين تلاتة، رح تلاحظ إنه أغلب أخطائك متكررة حول نفس 3 أو 4 مفاهيم — وهذول بالضبط يلي لازم تركّز فيهم آخر أسبوعين قبل الامتحان."
			},
			{
				type: "quote",
				text: "الشعور بالصعوبة وإنت عم تحاول تتذكر مش علامة إنك ضعيف بالمادة. هو علامة إنك عم تذاكر صح."
			}
		]
	},
	{
		slug: "مادة-بتكرهها-كيف-تتحملها-لنهاية-السنة",
		title: "مادة بتكرهها بس لازم تذاكرها؟ هيك تتحمّلها لنهاية السنة",
		titleEn: "A subject you hate but still have to study? Here's how to survive it",
		excerpt: "كل طالب عنده مادة بتحس تجاهها بحائط. مش لازم تحبها عشان تنجح فيها، بس لازم تغيّر طريقة تعاملك معها. هاي خطوات عملية جربها طلاب كتير قبلك.",
		excerptEn: "You don't need to love the subject. You need a system that gets you through it without wrecking the rest of your schedule.",
		category: "الجانب النفسي",
		categoryEn: "Mindset",
		readMinutes: 5,
		publishedAt: "2026-07-05",
		body: [
			{
				type: "p",
				text: "فيه مادة — عند كل طالب تقريباً — بمجرد ما يفتح كتابها بحس بثقل بصدره. عندك أنت هاي المادة أكيد، وممكن تكون الفيزياء، أو النحو، أو الكيمياء العضوية. المشكلة إنه هاي المادة غالباً بتتأجل يوم ورا يوم، لحد ما تصير أكبر من حجمها الحقيقي، وبتصير مصدر توتر دائم حتى وإنت مش قاعد تذاكرها."
			},
			{
				type: "h2",
				text: "الخبر الجيد: ما لازم تحبها"
			},
			{
				type: "p",
				text: "في نصيحة شائعة بتقول \"لازم تحب المادة عشان تنجح فيها\"، وهاي نصيحة مو دقيقة. في ناس نجحوا وتفوقوا بمواد ما حبوها أبداً، لأنهم غيّروا علاقتهم فيها من \"عاطفة\" لـ\"مهمة\". إنت مش لازم تحب النحو، بس تقدر تتعامل معه كنظام قواعد له منطق، وتحل فيه متل ما بتحل لغز — بدون ما تحمّله مشاعر سلبية زايدة."
			},
			{
				type: "h2",
				text: "قسّمها لأصغر ما يمكن"
			},
			{
				type: "p",
				text: "أكبر سبب لتأجيل المادة يلي بتكرهها إنك بتفكر فيها كـ\"كتلة واحدة كبيرة\": \"لازم أذاكر كيمياء\" — وهاي جملة مرعبة ومبهمة بنفس الوقت، فدماغك بيهرب منها. بدلها بمهمة صغيرة محددة جداً: \"هلق رح أفهم بس معادلة الاتزان الكيميائي، مش أكتر\". لما تكون المهمة صغيرة وواضحة، مقاومة البدء بتنخفض كتير."
			},
			{
				type: "h2",
				text: "غيّر البيئة والوقت"
			},
			{
				type: "p",
				text: "لو دايماً بتأجل نفس المادة لآخر الجلسة (أو آخر اليوم)، جرّب تقلب الترتيب لأسبوع كامل: خلّيها أول شي بتذاكره وإنت طاقتك بأعلاها، مو آخر شي وإنت خلصان. كمان جرّب تغيّر مكان مذاكرتها بالذات — لو دايماً بتذاكرها بغرفتك وبتحس بضيق، جرب تاخدها عالمطبخ أو مكان تاني بالبيت. الدماغ بيربط أحياناً مكان معين بشعور سلبي متراكم."
			},
			{
				type: "h2",
				text: "كافئ نفسك — بس بشكل ذكي"
			},
			{
				type: "p",
				text: "مش لازم تكون مكافأة كبيرة. بعد ما تخلص بلوك مذاكرة كامل بالمادة يلي بتكرهها، اسمح لحالك بـ15 دقيقة الشي يلي بتحبه فعلاً — مو الموبايل بشكل عام (لأنه هذا بيصير مصدر تشتت لباقي اليوم)، بس شي محدد ومريح: أغنية، مقطع فيديو قصير، أو حتى قهوة برة الغرفة."
			},
			{
				type: "list",
				items: [
					"حدد مهمة صغيرة جداً بدل \"أذاكر المادة كلها\"",
					"غيّر ترتيب المادة بجدولك — حطها أول شي مش آخر شي",
					"جرب مكان مذاكرة مختلف لهاي المادة بالذات",
					"كافئ نفسك مباشرة بعد كل بلوك، مش بعد \"ما أخلص كل المنهاج\""
				]
			},
			{
				type: "quote",
				text: "ما حدا رح يقولك \"شكراً إنك حبيت المادة\" بيوم النتيجة. بس رح تشكر نفسك إنك ما هربت منها."
			}
		]
	},
	{
		slug: "بنك-الأخطاء-أذكى-أداة-ما-بتستخدمها",
		title: "بنك الأخطاء: أذكى أداة مذاكرة موجودة، وأغلب الطلاب ما بيستخدموها",
		titleEn: "The mistake bank: the smartest study tool out there, and most students skip it",
		excerpt: "مو كل المراجعة نفس القيمة. مراجعة عامة بتاخد وقت وبترجع فايدة قليلة، بينما ورقة صغيرة فيها أخطاءك الفعلية بتوفرلك أسابيع من التخبيط. هيك تبنيها من الصفر.",
		excerptEn: "Every wrong answer is a precise map of what you don't know yet. Logging mistakes turns them into your highest-return revision list.",
		category: "أساليب المذاكرة",
		categoryEn: "Study methods",
		readMinutes: 6,
		publishedAt: "2026-07-22",
		body: [
			{
				type: "p",
				text: "لما تحل نموذج امتحان وتغلط بسؤال، شو بتعمل عادة؟ أغلب الطلاب بيشوفوا الجواب الصح، يقولوا \"آه صح، فاهم\"، ويكملوا للسؤال يلي بعده. وبعد أسبوعين، بيجوا يحلوا نموذج تاني، وبيغلطوا بنفس النقطة بالضبط — أحياناً حتى بنفس السؤال تقريباً. المشكلة مش إنهم ما فهموا، المشكلة إنه ما في نظام يذكّرهم بيلي غلطوا فيه قبل ما ينسوه."
			},
			{
				type: "h2",
				text: "ليش المراجعة العامة مش كافية"
			},
			{
				type: "p",
				text: "لما تراجع كل المنهاج من الأول للآخر قبل الامتحان، إنت بتضيّع وقت متساوي على أشياء بتتقنها أصلاً وأشياء بتضعف فيها فعلاً. لو عندك 10 دروس وإنت متقن 7 منهم وضعيف بـ3، مراجعة عامة بتديك نفس الوقت للـ10 كلهم. بنك الأخطاء بيقلب المعادلة: بيوريك بالضبط وين نقاط ضعفك الحقيقية، فتقدر تركّز 80% من وقتك على الـ20% يلي فعلاً بيسبّبولك مشاكل."
			},
			{
				type: "h2",
				text: "كيف تبنيه — حتى بدون أي أداة إلكترونية"
			},
			{
				type: "p",
				text: "خصص دفتر صغير أو حتى ملف بسيط. كل مرة بتغلط بسؤال — بواجب، نموذج امتحان، أو حتى أثناء المذاكرة — سجّل ثلاث معلومات بس: السؤال (أو ملخص عنه)، ليش غلطت بالضبط (نسيت القانون؟ فهمت السؤال غلط؟ غلطة حسابية؟)، والجواب الصح مع تفسير قصير."
			},
			{
				type: "p",
				text: "الجزء الأهم هو خانة \"ليش غلطت\" — لأنها بتوريك نمط. لو لاحظت إنه أغلب أخطائك بمادة معينة سببها \"فهمت السؤال غلط\" مش \"ما بعرف المعلومة\"، فهذا معناه إنك محتاج تتمرن على قراءة الأسئلة أكتر من ما تحتاج تراجع المحتوى. هاي معلومة ما رح توصلها من مراجعة عادية."
			},
			{
				type: "h2",
				text: "متى ترجع لبنك الأخطاء"
			},
			{
				type: "list",
				items: [
					"بعد 3 أيام من أول ما سجّلت الغلطة — راجعها وشوف إذا لسا بتغلط فيها",
					"أسبوع قبل الامتحان — هذا وقتك الذهبي، راجع بنك الأخطاء كامل مرتين",
					"بليلة الامتحان — بدل ما تفتح الكتاب كامل، افتح بس بنك أخطائك"
				]
			},
			{
				type: "p",
				text: "أسبوع قبل الامتحان، بدل ما تحاول \"تراجع كل شي\" وتوتر حالك، افتح بنك الأخطاء وشوف: شو الأنماط يلي تكررت؟ رح تلاحظ إنه غالباً كل أخطائك دايرة حول 4 أو 5 مفاهيم بس، مش المنهاج كله. هاي الـ4 أو 5 مفاهيم هم بالضبط شو لازم يكون آخر تركيز عندك."
			},
			{
				type: "quote",
				text: "المراجعة الذكية مش يلي بتاخد وقت أطول، هي يلي بتعرف بالضبط وين تحط وقتك."
			}
		]
	}
];
function getBlogPost(slug) {
	return blogPosts.find((p) => p.slug === slug);
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/seo-B88_PKJ7.js
var ar_default = {
	common: {
		"brand": "أكاديميا",
		"signIn": "دخول",
		"startFree": "ابدأ مجاناً",
		"loading": "جارٍ التحميل…",
		"save": "حفظ",
		"cancel": "إلغاء",
		"search": "بحث",
		"back": "رجوع",
		"themeToggle": "تبديل الوضع (ليل/نهار)",
		"languageToggle": "تبديل اللغة",
		"skipToContent": "تخطَّ إلى المحتوى الرئيسي",
		"theme": {
			"light": "الوضع الفاتح",
			"dark": "الوضع الغامق",
			"auto": "تلقائي (حسب الجهاز)"
		},
		"language": {
			"ar": "العربية",
			"en": "English"
		},
		"more": "المزيد",
		"menu": "القائمة",
		"signOut": "تسجيل الخروج",
		"dashboard": "لوحة التحكم",
		"settings": "الإعدادات",
		"backToSite": "العودة للموقع",
		"account": "حسابي",
		"preferences": "التفضيلات",
		"navigation": "التنقّل",
		"searchPages": "ابحث في كل الصفحات...",
		"faqBadge": "أسئلة شائعة",
		"faqTitle": "عندك سؤال؟ يمكن جوابه هون",
		"signingOut": "جارٍ تسجيل الخروج…",
		"closeMenu": "إغلاق القائمة",
		"expandMenu": "توسيع القائمة",
		"collapseMenu": "طي القائمة",
		"openMenu": "فتح القائمة"
	},
	nav: {
		"home": "الرئيسية",
		"howItWorks": "كيف تعمل",
		"pricing": "الأسعار",
		"forTeachers": "للمعلمين",
		"forParents": "لأولياء الأمور",
		"platform": "المنصة",
		"legal": "قانوني",
		"privacy": "سياسة الخصوصية",
		"terms": "شروط الاستخدام",
		"tagline": "منصة عربية تساعد طلاب الثانوية ينظّموا موادهم، يتابعوا إنجازهم، ويجهّزوا للامتحان الوزاري بثقة.",
		"rights": "© {{year}} أكاديميا — جميع الحقوق محفوظة."
	},
	home: {
		"meta": {
			"title": "أكاديميا | منصة الطالب للتنظيم والإنجاز",
			"description": "أكاديميا: مكتبة ذكية مرتبة، مجتمعات مواد، متابعة إنجاز، بنك أخطاء ومحاكي امتحان وزاري — كل دراستك بمكان واحد."
		},
		"badge": "لطلاب التوجيهي في فلسطين",
		"h1a": "رتّب دراسة التوجيهي",
		"h1b": "وابدأ بثقة",
		"h1c": "مع أكاديميا.",
		"sub": "كل موادك، اختباراتك، أخطاؤك وتقدّمك في مكان واحد — لتعرف ماذا تدرس الآن وأين تحتاج إلى التحسين.",
		"ctaPrimary": "ابدأ مجاناً",
		"ctaSecondary": "شوف كيف بتبدأ",
		"stats": {
			"levels": "مستويات تصنيف للمحتوى",
			"rtl": "عربي وواجهة RTL",
			"spaces": "مساحات: طالب، معلم، ولي أمر"
		},
		"featuresTitle": "أدوات مرتبطة بطريقة دراستك",
		"featuresSub": "مش أرشيف ملفات — مسار واضح من أول سؤال إلى مراجعة نقاط ضعفك.",
		"features": {
			"library": {
				"title": "المكتبة الذكية",
				"text": "تصنيف شجري صارم: فصل ← مادة ← وحدة ← درس. بحث متقدم وحفظ للمفضلة."
			},
			"community": {
				"title": "مجتمعات المواد",
				"text": "قناة لكل مادة، سؤال وجواب مع تثبيت الإجابة الصحيحة، وساعات هدوء ليلاً."
			},
			"tracker": {
				"title": "متابعة الإنجاز",
				"text": "عدّاد إنجاز لكل مادة، جدول دراسي تفاعلي، وQuiz قصير بعد كل درس."
			},
			"simulator": {
				"title": "امتحاناتي التجريبية",
				"text": "سجّل نتيجة كل امتحان تجريبي تحله، وتابع نقاط ضعفك حسب الوحدة بمرور الوقت."
			},
			"mistakes": {
				"title": "بنك أخطائي",
				"text": "احفظ كل سؤال تخطئ فيه براحتك، وراجعه دوريًا حتى تتقنه."
			},
			"courses": {
				"title": "أساتذة من كل مكان، بالصيغة يلي تناسبك",
				"text": "كورسات أونلاين مباشرة، مسجّلة، أو حصص وجاهية — من معلّمين محليين وعالميين. اختر المعلّم والصيغة يلي تناسب جدولك."
			},
			"review": {
				"title": "مراجعة الـ15 دقيقة",
				"text": "بطاقات تعليمية لمراجعة سريعة قبل النوم أو قبل الامتحان."
			}
		},
		"roles": {
			"student": {
				"t": "طالب",
				"d": "Dashboard بمهام اليوم، إنجازك، وشاراتك."
			},
			"teacher": {
				"t": "معلّم",
				"d": "ارفع محتواك، جهّز Quizzes، وتابع أداء شُعبك."
			},
			"parent": {
				"t": "ولي أمر",
				"d": "تقرير أسبوعي مختصر عن الانتظام والإنجاز."
			}
		},
		"ctaTitle": "جاهز تبدأ أول جلسة دراسة؟",
		"ctaSub": "أنشئ حسابك مجاناً، اختر فرعك وموادك، وابدأ بأول اختبار خلال دقائق.",
		"ctaButton": "ابدأ أول جلسة مجاناً",
		"signedIn": {
			"welcome": "أهلاً {{name}} 👋",
			"cta": "اذهب إلى لوحة التحكم",
			"browse": "تصفّح الكورسات",
			"student": {
				"h1": "جاهز تكمل من حيث وقفت؟",
				"sub": "مكتبتك، جدولك، وبنك أخطائك بانتظارك — افتح لوحتك وأكمل خطة اليوم."
			},
			"teacher": {
				"h1": "طلابك بانتظار درسك الجديد",
				"sub": "أنشئ كورساً، صحّح التسليمات، وتابع أرباحك وتحليلات صفوفك من لوحتك."
			},
			"parent": {
				"h1": "تابع تقدّم أبنائك بلحظتها",
				"sub": "تقارير الإنجاز، الحضور، والدرجات — كلها في تقرير ولي الأمر."
			},
			"supervisor": {
				"h1": "نظرة شاملة على الأداء الأكاديمي",
				"sub": "راقب المعلمين والطلاب وجودة المحتوى من لوحة الإشراف."
			},
			"admin": {
				"h1": "تشغيل المنصة بين يديك",
				"sub": "المستخدمون، الصلاحيات، المنهاج، المدفوعات، ومراجعة المحتوى — من لوحة الإدارة."
			}
		},
		"startTitle": "ماذا يحدث بعد التسجيل؟",
		"startSub": "لا تبدأ من لوحة فارغة. جهّز مساحتك الدراسية وابدأ بخطوة واضحة.",
		"startSteps": [
			{
				"title": "اختر فرعك",
				"text": "حدد الفرع والمواد التي تدرسها لتظهر لك مساحة مناسبة."
			},
			{
				"title": "جهّز مساحتك",
				"text": "ستجد مكتبتك، جدولك، واختصارات المراجعة في مكان واحد."
			},
			{
				"title": "ابدأ اختباراً قصيراً",
				"text": "اعرف مستواك ونقاط ضعفك بدل الدراسة بشكل عشوائي."
			},
			{
				"title": "راجع بتركيز",
				"text": "حوّل أخطاءك إلى قائمة مراجعة واضحة تعرف ماذا تفعل بعدها."
			}
		],
		"freeTitle": "ابدأ مجاناً — وشوف قيمة أكاديميا بنفسك",
		"freeSub": "لا تحتاج إلى معلم للبدء. أنشئ مساحتك، جرّب أدوات الدراسة الأساسية، ثم قرر ما يناسبك.",
		"freeItems": [
			"إنشاء حساب وملف طالب",
			"اختيار الفرع والمواد",
			"متابعة الإنجاز الأساسي",
			"البدء باختبار تشخيصي",
			"حفظ الأخطاء للمراجعة"
		],
		"trustNote": "بدون بطاقة بنكية للبدء • عدّل موادك لاحقاً • مصمم بالعربية أولاً"
	},
	howItWorks: {
		"meta": {
			"title": "كيف تعمل أكاديميا؟ | خطوات البداية",
			"description": "أربع خطوات فقط: سجّل واختر دورك، حدّد نظامك وصفك وموادك، ابدأ من المكتبة المرتّبة، وتابع إنجازك أسبوعياً."
		},
		"h1": "كيف بتشتغل أكاديميا؟",
		"sub": "من أول تسجيل دخول، أربع خطوات سريعة (وبتقدر تتخطاها بأي وقت) وبتصير جاهز.",
		"steps": {
			"role": {
				"t": "اختر دورك",
				"d": "طالب، معلّم، أو ولي أمر — كل دور يفتح مساحة مختلفة كلياً بصلاحياتها الخاصة."
			},
			"system": {
				"t": "النظام والصف",
				"d": "فلسطيني أو أردني، الفرع (علمي/أدبي)، والصف — عشان يتخصّص لك المحتوى الصح."
			},
			"subjects": {
				"t": "اختر موادك",
				"d": "حدّد المواد اللي بتتابعها، وتنبني Dashboard ومكتبتك على أساسها مباشرة."
			},
			"goal": {
				"t": "أول هدف أسبوعي",
				"d": "هدف بسيط يشغّل عدّاد الإنجاز من أول لحظة، وتبدأ سلسلة الأيام (Streak)."
			}
		},
		"cta": "ابدأ الآن مجاناً",
		"nextTitle": "وبعدين؟",
		"next": [
			"كل درس تخلّصه بتضغط «تم الفهم» وبتحل Quiz قصير.",
			"كل غلطة بتنحفظ ببنك أخطائك لتراجعها لاحقاً.",
			"قبل الامتحان، سجّل نتائج امتحاناتك التجريبية وتابع تقدّمك.",
			"ولي أمرك بيوصله تقرير أسبوعي مختصر بدون ما ينبش بخصوصيتك اليومية."
		]
	},
	pricing: {
		"meta": {
			"title": "أسعار أكاديميا | ابدأ مجاناً",
			"description": "خطة مجانية كاملة للبداية، وخطة مميزة لمحاكي الامتحان وبنك الأخطاء والتقارير المتقدمة."
		},
		"h1": "خطط بسيطة، بدون تعقيد",
		"sub": "ابدأ مجاناً بالكامل. ارفع لبريميوم وقت ما تحس إنك بحاجة لأدوات التحضير للامتحان.",
		"perMonth": "/ شهرياً",
		"free": {
			"name": "المجاني",
			"price": "0",
			"note": "للأبد",
			"cta": "ابدأ مجاناً",
			"features": [
				"المكتبة الذكية وتصفح كل المواد",
				"حفظ الدروس بالمفضلة",
				"مجتمعات المواد وسؤال وجواب",
				"الجدول الدراسي التفاعلي",
				"عدّاد إنجاز أساسي"
			]
		},
		"plus": {
			"name": "بريميوم",
			"price": "29",
			"note": "شهرياً",
			"cta": "اشترك ببريميوم",
			"badge": "الأكثر اختياراً",
			"features": [
				"كل مزايا الخطة المجانية",
				"امتحانات تجريبية غير محدودة + بنك أخطاء لكل مادة",
				"بنك أخطائي الخاص لكل مادة",
				"مراجعة الـ15 دقيقة (بطاقات تعليمية)",
				"تقرير أسبوعي لولي الأمر",
				"شهادات رقمية عند إتمام مادة"
			]
		},
		"note": "الأسعار بالشيكل الإسرائيلي (₪). يمكنك الإلغاء بأي وقت.",
		"currency": "شيكل",
		"forever": "للأبد",
		"monthly": "شهرياً",
		"faq": [
			{
				"q": "هل أكاديميا مجانية فعلاً؟",
				"a": "أيوا، الخطة المجانية كاملة وبدون حد زمني: المكتبة، المجتمعات، الجدول، وعدّاد الإنجاز الأساسي. بريميوم اختياري لمن بده أدوات تحضير الامتحان المتقدمة."
			},
			{
				"q": "هل بقدر ألغي الاشتراك بأي وقت؟",
				"a": "أكيد. تقدر تلغي اشتراك بريميوم من إعدادات حسابك بأي لحظة بدون أي شرط أو رسوم إلغاء، وبتضل مشترك لحد نهاية الفترة المدفوعة."
			},
			{
				"q": "شو الفرق بين خطة الطالب وخطة المعلّم؟",
				"a": "خطة الطالب (مجاني/بريميوم) للوصول للمحتوى والأدوات. خطة المعلّم منفصلة وبتسمحلك ترفع محتوى، تجهّز اختبارات، وتتابع أداء طلابك."
			},
			{
				"q": "هل في خصم لمجموعات الطلاب أو المدارس؟",
				"a": "نشتغل حالياً على باقات خاصة للمدارس والمجموعات. تواصل معنا من صفحة المساعدة وبنرجعلك بالتفاصيل."
			},
			{
				"q": "وين بتنحفظ بياناتي وهل هي آمنة؟",
				"a": "بياناتك محفوظة بشكل آمن ومشفّر، وما منشاركها مع أي طرف ثالث لأغراض تسويقية. التفاصيل الكاملة بصفحة سياسة الخصوصية."
			}
		],
		"compare": {
			"title": "قارن الخطتين بالتفصيل",
			"sub": "شوف بالضبط شو بتاخد بكل خطة قبل ما تقرر.",
			"colFree": "المجاني",
			"colPlus": "بريميوم",
			"groups": [
				{
					"t": "المحتوى والتعلّم",
					"rows": [
						{
							"l": "المكتبة الذكية وتصفح كل المواد",
							"free": true,
							"plus": true
						},
						{
							"l": "حفظ الدروس بالمفضلة",
							"free": true,
							"plus": true
						},
						{
							"l": "مجتمعات المواد وسؤال وجواب",
							"free": true,
							"plus": true
						},
						{
							"l": "الجدول الدراسي التفاعلي",
							"free": true,
							"plus": true
						}
					]
				},
				{
					"t": "التحضير للامتحان",
					"rows": [
						{
							"l": "امتحانات تجريبية غير محدودة + بنك أخطاء لكل مادة",
							"free": false,
							"plus": true
						},
						{
							"l": "بنك أخطائي الخاص لكل مادة",
							"free": false,
							"plus": true
						},
						{
							"l": "مراجعة الـ15 دقيقة (بطاقات تعليمية)",
							"free": false,
							"plus": true
						}
					]
				},
				{
					"t": "المتابعة والتقارير",
					"rows": [
						{
							"l": "عدّاد إنجاز أساسي",
							"free": true,
							"plus": true
						},
						{
							"l": "تقرير أسبوعي مفصّل لولي الأمر",
							"free": false,
							"plus": true
						},
						{
							"l": "شهادات رقمية عند إتمام مادة",
							"free": false,
							"plus": true
						}
					]
				},
				{
					"t": "الدعم",
					"rows": [{
						"l": "الدعم عبر مركز المساعدة",
						"free": true,
						"plus": true
					}, {
						"l": "دعم أولوية عبر البريد الإلكتروني",
						"free": false,
						"plus": true
					}]
				}
			]
		}
	},
	forParents: {
		"meta": {
			"title": "أكاديميا لأولياء الأمور | ملخص واضح بدون تدخل زايد",
			"description": "تابع انتظام وإنجاز ابنك أو بنتك بتقرير أسبوعي مختصر، مع الحفاظ على خصوصية مساحتهم الشخصية."
		},
		"h1": "اطمئن على تقدّم ابنك، من غير ما تراقب كل خطوة.",
		"h1a": "اطمئن على تقدّم ابنك، ",
		"h1b": "من غير ما تراقب كل خطوة",
		"h1c": ".",
		"sub": "أكاديميا بتديك ملخص أسبوعي واضح عن انتظام وإنجاز ابنك أو بنتك، وبتحافظ بنفس الوقت على مساحتهم الشخصية بالتعلّم.",
		"cta": "أنشئ حساب ولي أمر",
		"benefits": {
			"report": {
				"t": "تقرير أسبوعي واضح",
				"d": "ملخص أسبوعي عن الانتظام والإنجاز العام، يوصلك بدون ما تحتاج تتابع كل يوم بنفسك."
			},
			"privacy": {
				"t": "خصوصية ابنك محفوظة",
				"d": "بتشوف ملخص عام بس — مش كل سؤال أخطأ فيه أو كل نقرة. مساحة الطالب الشخصية محفوظة بالتصميم."
			},
			"multiKids": {
				"t": "أكتر من ابن بحساب وحد",
				"d": "اربط كل أولادك بحساب واحد، وتابع كل واحد فيهم لحاله من مكان واحد."
			},
			"alerts": {
				"t": "تنبيه بس لما يهم فعلاً",
				"d": "إذا صار تراجع ملحوظ أو اقترب موعد اختبار مهم، بتوصلك رسالة — مش إشعارات مستمرة تضيّع وقتك."
			}
		},
		"faq": [
			{
				"q": "هل بقدر أشوف كل نشاط ابني بالتفصيل؟",
				"a": "لأ، بالتصميم — بتشوف ملخص عام (انتظام، إنجاز)، مش كل تفصيلة صغيرة. هيك منحافظ على مساحة الطالب الشخصية ونشجّعه يعتمد على حاله."
			},
			{
				"q": "كيف بربط حساب ابني بحسابي؟",
				"a": "من إعدادات حسابك كولي أمر، بتضيف اسم ابنك وصفّه الدراسي. (ربط تلقائي بحساب الطالب نفسه قادم لاحقًا)."
			},
			{
				"q": "هل في تكلفة إضافية لحساب ولي الأمر؟",
				"a": "حساب ولي الأمر نفسه مجاني. أي تكلفة مرتبطة باشتراك الطالب نفسه — راجع صفحة الأسعار للتفاصيل."
			},
			{
				"q": "شو بصير لو لاحظت مشكلة بمحتوى إشي؟",
				"a": "تقدر تتواصل معنا من صفحة \"تواصل معنا\" وفريقنا بيتابعها مباشرة."
			}
		]
	},
	forTeachers: {
		"meta": {
			"title": "أكاديميا للمعلمين | أدوات تنظيم وتقييم",
			"description": "ارفع محتواك مرة واحدة، جهّز Quizzes تُصحَّح تلقائياً، وتابع أداء طلابك بتقارير واضحة."
		},
		"h1": "علّم أكتر، صحّح أقل، ووصل لطلاب أكتر.",
		"h1a": "علّم أكتر، ",
		"h1b": "صحّح أقل",
		"h1c": "، ووصل لطلاب أكتر.",
		"sub": "أكاديميا بتعطيك مكان منظّم لمحتواك، تصحيح آلي للـQuizzes، وتحليلات تخليك تعرف بالضبط وين تركّز جهدك.",
		"cta": "سجّل كمعلّم",
		"benefits": {
			"upload": {
				"t": "محتواك مرتّب ومحفوظ",
				"d": "ارفع ملفاتك وفيديوهاتك مرة وحدة، وتنصنّف تلقائياً حسب الفصل والمادة والوحدة والدرس."
			},
			"analytics": {
				"t": "تحليلات لكل طالب وشعبة",
				"d": "شوف مين فهم ومين متعثّر، وأي وحدة بالضبط بتشكّل نقطة ضعف عند شعبتك."
			},
			"income": {
				"t": "دخل قادم من محتواك",
				"d": "جزء من نموذج دخل للمعلمين قيد الإعداد الآن، مبني على تفاعل الطلاب مع محتواك — التفاصيل والنسب تُعلن قبل الإطلاق الرسمي."
			},
			"verified": {
				"t": "حساب موثّق",
				"d": "توثيق الحساب برفع بطاقة/شهادة، وبعد الموافقة بيظهر توثيقك جنب اسمك."
			}
		},
		"faq": [
			{
				"q": "كيف بصير عندي حساب معلّم موثّق؟",
				"a": "سجّل من زر \"ابدأ كمعلّم\"، عبّي بياناتك ومؤهلاتك، وفريقنا بيراجع الطلب ويفعّل حسابك خلال أيام قليلة."
			},
			{
				"q": "كيف بوصلني الدخل من المنصة؟",
				"a": "نموذج الدخل قيد الإعداد الآن (النسب وطريقة الدفع لسا ما اتحددت رسمياً). حالما يجهز، رح يوصلك إشعار وتفاصيل واضحة قبل ما يُفعّل على حسابك."
			},
			{
				"q": "هل محتواي يظهر مباشرة للطلاب؟",
				"a": "أي محتوى ترفعه بيمر بمراجعة أساسية من فريقنا قبل ما يظهر للطلاب، للحفاظ على جودة المكتبة وموثوقيتها."
			},
			{
				"q": "شو أنواع المحتوى اللي بقدر أرفعها؟",
				"a": "دروس مكتوبة، ملفات PDF، بنوك أسئلة، واختبارات قصيرة (Quizzes) — كلها منظّمة حسب الفصل والمادة والوحدة."
			}
		]
	},
	legal: {
		"privacyTitle": "سياسة الخصوصية",
		"termsTitle": "شروط الاستخدام",
		"lastUpdated": "آخر تحديث: {{date}}"
	},
	auth: {
		"meta": {
			"title": "تسجيل الدخول | أكاديميا",
			"description": "سجّل الدخول أو أنشئ حساباً جديداً للوصول إلى مساحتك في أكاديميا."
		},
		"signInTitle": "تسجيل الدخول",
		"signUpTitle": "إنشاء حساب",
		"fullName": "الاسم الكامل",
		"email": "البريد الإلكتروني",
		"password": "كلمة المرور",
		"signInAction": "دخول",
		"signUpAction": "إنشاء حساب",
		"toSignUp": "ما عندك حساب؟ أنشئ واحداً",
		"toSignIn": "عندك حساب؟ سجّل الدخول",
		"google": "المتابعة عبر Google"
	},
	errors: {
		"notFoundTitle": "الصفحة غير موجودة",
		"notFoundText": "الصفحة التي تبحث عنها غير موجودة أو تم نقلها.",
		"backHome": "العودة للرئيسية",
		"crashTitle": "تعذّر تحميل الصفحة",
		"crashText": "حدث خطأ غير متوقع. يمكنك المحاولة مجدداً أو العودة للرئيسية.",
		"retry": "إعادة المحاولة",
		"forbiddenTitle": "لا تملك صلاحية الوصول",
		"forbiddenText": "هذه الصفحة تتطلب صلاحية غير متوفرة في حسابك."
	},
	privacy: {
		"h1": "سياسة الخصوصية",
		"intro": "مسودة أولية بانتظار المراجعة القانونية النهائية — نكتبها بلغة مفهومة لأنها تخصّك فعلاً.",
		"sections": [
			{
				"t": "البيانات التي نجمعها",
				"d": "بيانات الحساب (الاسم، البريد الإلكتروني، رقم الهاتف، الدور)، بيانات أكاديمية (الحضور، نتائج الاختبارات، سجل الكورسات)، بيانات مالية (سجل معاملات المحفظة فقط — لا نخزّن بيانات بطاقات بنكية، التحويل يدوي بإيصال)، وبيانات تقنية أساسية لأغراض الأمان."
			},
			{
				"t": "كيف نستخدم بياناتك",
				"d": "لتشغيل حسابك ومحفظتك، للتواصل بخصوص طلباتك وإشعاراتك، لتحسين الخدمة، وللامتثال القانوني عند الطلب الرسمي."
			},
			{
				"t": "مشاركة البيانات",
				"d": "لا نبيع بيانات المستخدمين لأي طرف ثالث. بيانات الطالب الأكاديمية والمالية تُعرَض للمعلّم المرتبط بدورته (بالحد اللازم فقط)، ولولي الأمر إن كان مرتبطًا بحسابه، وللمسؤولين لأغراض إدارية. [TBD: ذكر أي مزودي خدمة خارجيين بالاسم — استضافة، بريد إلكتروني...]"
			},
			{
				"t": "أمان البيانات",
				"d": "كلمات المرور مخزّنة بشكل مُشفَّر، وجلسات الدخول محمية بكوكيز آمنة. [TBD: تحديث هذا البند مع أي إجراء أمان إضافي فعلي بمجرد إضافته للمنصة]"
			},
			{
				"t": "بيانات القاصرين",
				"d": "[TBD — نقطة حرجة: إذا كان طلاب دون ١٨ عامًا يستخدمون المنصة مباشرة، هذا يحتاج بند خاص بموافقة الوالدين وحماية إضافية حسب القانون المحلي]"
			},
			{
				"t": "حقوقك",
				"d": "يمكنك طلب نسخة من بياناتك، تصحيحها، أو طلب حذف حسابك (مع مراعاة الاحتفاظ بالسجلات المالية للمدة القانونية المطلوبة)."
			},
			{
				"t": "ملفات تعريف الارتباط (Cookies)",
				"d": "تُستخدم كوكيز أساسية لتسجيل الدخول وحفظ تفضيلاتك (اللغة، الثيم)، بموافقتك عبر بانر الكوكيز بالموقع."
			},
			{
				"t": "تواصل معنا",
				"d": "[TBD: بريد إلكتروني أو جهة اتصال مخصصة لاستفسارات الخصوصية]"
			}
		]
	},
	terms: {
		"h1": "شروط الاستخدام",
		"intro": "باستخدامك منصة أكاديميا (والتطبيقات المرتبطة بها)، فإنك توافق على الشروط التالية. مسودة أولية بانتظار المراجعة القانونية النهائية — قابلة للتحديث.",
		"sections": [
			{
				"t": "القبول بالشروط",
				"d": "استخدامك المنصة يعني موافقتك الكاملة على هذه الشروط. إذا كنت دون سن ١٨ عامًا، يجب أن يوافق ولي أمرك عليها نيابة عنك. [TBD: تحديد السن بدقة حسب القانون المحلي]"
			},
			{
				"t": "وصف الخدمة",
				"d": "أكاديميا سوق تعليمي إلكتروني يربط الطلاب بالمعلمين والكورسات، ويوفر محفظة إلكترونية داخلية، وتتبع أكاديمي (حضور، اختبارات، نتائج)، ومتابعة اختيارية لولي الأمر. المنصة لا توفر حاليًا دردشة مباشرة، بث فيديو مباشر، تطبيق موبايل أصلي، أو دفع إلكتروني فوري — التحويلات البنكية تُعالَج يدويًا."
			},
			{
				"t": "الحسابات والأدوار",
				"d": "أنت مسؤول عن سرية بيانات دخولك. الأدوار المتاحة: طالب، معلّم، ولي أمر، مشرف، مسؤول نظام. يحق للمنصة تعليق أو إنهاء أي حساب يخالف هذه الشروط أو يُستخدم بشكل احتيالي."
			},
			{
				"t": "المحفظة والمعاملات المالية",
				"d": "الشحن عبر تحويل بنكي يدوي مع رفع إيصال، ويخضع لمراجعة المسؤول قبل إضافة الرصيد. خصم رسوم الالتحاق نهائي بمجرد اعتماد المعلّم للطلب، ما لم تُحدَّد سياسة استرداد مختلفة [TBD]. تُطبَّق عمولة منصة على كل عملية التحاق. طلبات سحب أرصدة المعلمين تخضع لمراجعة قبل التحويل الفعلي. [TBD: الحد الأدنى/الأقصى للشحن والسحب، مدة معالجة الطلبات]"
			},
			{
				"t": "سلوك المستخدم",
				"d": "يُحظر انتحال الشخصية، رفع محتوى مخالف للقانون أو حقوق الملكية الفكرية، محاولة الوصول غير المصرح به لحسابات أو بيانات أخرى، أو استخدام المنصة لأي غرض احتيالي."
			},
			{
				"t": "الملكية الفكرية",
				"d": "المحتوى التعليمي الذي يرفعه المعلّم يبقى ملكه، ويمنح المعلّم للمنصة ترخيصًا لعرضه للطلاب الملتحقين بدورته حصرًا."
			},
			{
				"t": "إخلاء المسؤولية",
				"d": "المنصة وسيط بين الطلاب والمعلمين، وليست مسؤولة عن جودة المحتوى التعليمي المقدَّم من المعلمين بشكل مباشر. [TBD: بند حدود المسؤولية المالية يحتاج صياغة قانونية دقيقة]"
			},
			{
				"t": "تعديل الشروط",
				"d": "يحق للمنصة تعديل هذه الشروط، مع إشعار المستخدمين بأي تغيير جوهري قبل مدة معقولة من سريانه."
			},
			{
				"t": "القانون الحاكم",
				"d": "[TBD — يُحدَّد مع المحامي حسب بلد التأسيس والتشغيل]"
			}
		]
	},
	forbidden: {
		"code": "403",
		"title": "هاد القسم مش إلك",
		"text": "صلاحيات حسابك ما بتسمح بالوصول لهذه الصفحة. ارجع للوحة تحكمك وكمّل من هناك.",
		"cta": "الرجوع للوحة التحكم"
	},
	testimonials: {
		"badge": "قريباً",
		"title": "قصص الطلاب والمعلّمين",
		"sub": "لسا عم نبني مجتمع أكاديميا. بعد أول دفعة من المستخدمين، رح نشارك هون تجاربهم الحقيقية.",
		"placeholder": "آراء طلابنا ومعلّمينا رح تنعرض هون قريباً."
	}
};
var en_default = {
	common: {
		"brand": "Academia",
		"signIn": "Sign in",
		"startFree": "Start free",
		"loading": "Loading…",
		"save": "Save",
		"cancel": "Cancel",
		"search": "Search",
		"back": "Back",
		"themeToggle": "Toggle theme (light/dark)",
		"languageToggle": "Toggle language",
		"skipToContent": "Skip to main content",
		"theme": {
			"light": "Light mode",
			"dark": "Dark mode",
			"auto": "Auto (system)"
		},
		"language": {
			"ar": "Arabic",
			"en": "English"
		},
		"more": "More",
		"menu": "Menu",
		"signOut": "Sign out",
		"dashboard": "Dashboard",
		"settings": "Settings",
		"backToSite": "Back to site",
		"account": "My account",
		"preferences": "Preferences",
		"navigation": "Navigation",
		"searchPages": "Search all pages...",
		"faqBadge": "FAQ",
		"faqTitle": "Have a question? It's probably answered here",
		"signingOut": "Signing out…",
		"closeMenu": "Close menu",
		"expandMenu": "Expand menu",
		"collapseMenu": "Collapse menu",
		"openMenu": "Open menu"
	},
	nav: {
		"home": "Home",
		"howItWorks": "How it works",
		"pricing": "Pricing",
		"forTeachers": "For teachers",
		"forParents": "For parents",
		"platform": "Platform",
		"legal": "Legal",
		"privacy": "Privacy policy",
		"terms": "Terms of use",
		"tagline": "An Arabic-first platform helping high-school students organize their subjects, track achievement, and prepare for the national exam with confidence.",
		"rights": "© {{year}} Academia — All rights reserved."
	},
	home: {
		"meta": {
			"title": "Academia | The student platform for focus and achievement",
			"description": "Academia: an organized library, subject communities, achievement tracking, a mistake bank and practice-exam logging — all your studying in one place."
		},
		"badge": "For Palestinian Tawjihi students",
		"h1a": "Organize your Tawjihi study",
		"h1b": "and start with confidence",
		"h1c": "with Academia.",
		"sub": "Your subjects, tests, mistakes and progress in one place — so you know what to study now and where to improve.",
		"ctaPrimary": "Start free",
		"ctaSecondary": "See how you start",
		"stats": {
			"levels": "content classification levels",
			"rtl": "Arabic-first with RTL interface",
			"spaces": "spaces: student, teacher, parent"
		},
		"featuresTitle": "Tools built around how you study",
		"featuresSub": "Not a file archive — a clear path from your first question to focused review.",
		"features": {
			"library": {
				"title": "Smart library",
				"text": "A strict tree: term → subject → unit → lesson. Advanced search and favorites."
			},
			"community": {
				"title": "Subject communities",
				"text": "A channel per subject, Q&A with a pinned correct answer, and quiet hours at night."
			},
			"tracker": {
				"title": "Achievement tracking",
				"text": "A progress counter per subject, an interactive study plan, and a short Quiz after every lesson."
			},
			"simulator": {
				"title": "My practice exams",
				"text": "Log the result of every practice exam you take, and track your weak points by unit over time."
			},
			"mistakes": {
				"title": "My mistake bank",
				"text": "Save every question you get wrong at your own pace, and review it until you master it."
			},
			"courses": {
				"title": "Teachers from anywhere, your way",
				"text": "Live online, recorded, or in-person sessions — from local and international teachers. Pick the teacher and format that fits your schedule."
			},
			"review": {
				"title": "15-minute review",
				"text": "Flashcards from your weakest points, before bed or before the exam."
			}
		},
		"roles": {
			"student": {
				"t": "Student",
				"d": "A Dashboard with today's tasks, your progress, and your badges."
			},
			"teacher": {
				"t": "Teacher",
				"d": "Upload your content, build Quizzes, and follow your sections' performance."
			},
			"parent": {
				"t": "Parent",
				"d": "A short weekly report on consistency and achievement."
			}
		},
		"ctaTitle": "Ready to start your first study session?",
		"ctaSub": "Create your free account, choose your track and subjects, and take your first test in minutes.",
		"ctaButton": "Start your first session free",
		"signedIn": {
			"welcome": "Welcome, {{name}} 👋",
			"cta": "Go to dashboard",
			"browse": "Browse courses",
			"student": {
				"h1": "Ready to pick up where you left off?",
				"sub": "Your library, schedule and mistakes bank are waiting — open your dashboard."
			},
			"teacher": {
				"h1": "Your students are waiting for the next lesson",
				"sub": "Create a course, grade submissions and track earnings from your dashboard."
			},
			"parent": {
				"h1": "Follow your children's progress live",
				"sub": "Progress, attendance and grades — all in the parent report."
			},
			"supervisor": {
				"h1": "A full view of academic performance",
				"sub": "Monitor teachers, students and content quality from the supervision panel."
			},
			"admin": {
				"h1": "Platform operations at your fingertips",
				"sub": "Users, permissions, curriculum, payments and content review — from the admin panel."
			}
		},
		"startTitle": "What happens after you sign up?",
		"startSub": "You do not land on an empty dashboard. Set up your study space and take a clear first step.",
		"startSteps": [
			{
				"title": "Choose your track",
				"text": "Select your track and subjects so your space fits your study."
			},
			{
				"title": "Set up your space",
				"text": "Your library, schedule and review shortcuts are in one place."
			},
			{
				"title": "Take a short test",
				"text": "See your level and weak spots instead of studying at random."
			},
			{
				"title": "Review with focus",
				"text": "Turn mistakes into a clear review list with a next step."
			}
		],
		"freeTitle": "Start free — see Academia in action",
		"freeSub": "You do not need a teacher to begin. Set up your space, try the core study tools, then decide what fits.",
		"freeItems": [
			"Create a student account",
			"Choose your track and subjects",
			"Track your core progress",
			"Take a diagnostic test",
			"Save mistakes for review"
		],
		"trustNote": "No card required to start • Change your subjects later • Arabic-first by design"
	},
	howItWorks: {
		"meta": {
			"title": "How Academia works | Getting started",
			"description": "Four steps only: sign up and pick your role, set your system, grade and subjects, start from the organized library, and track your progress weekly."
		},
		"h1": "How does Academia work?",
		"sub": "From your first sign-in, four quick steps (skippable anytime) and you're ready.",
		"steps": {
			"role": {
				"t": "Pick your role",
				"d": "Student, teacher, or parent — each role opens a completely different space with its own permissions."
			},
			"system": {
				"t": "System and grade",
				"d": "Palestinian or Jordanian, the track (scientific/literary), and the grade — so the right content is tailored to you."
			},
			"subjects": {
				"t": "Pick your subjects",
				"d": "Choose the subjects you follow, and your Dashboard and library are built around them right away."
			},
			"goal": {
				"t": "First weekly goal",
				"d": "A simple goal that starts the achievement counter from minute one, and kicks off your Streak."
			}
		},
		"cta": "Start now for free",
		"nextTitle": "And then?",
		"next": [
			"Finish a lesson, hit “Got it” and take a short Quiz.",
			"Every mistake is saved to your mistake bank for later review.",
			"Before the exam, log your practice results and track your progress.",
			"Your parent gets a short weekly report without digging into your daily privacy."
		]
	},
	pricing: {
		"meta": {
			"title": "Academia pricing | Start free",
			"description": "A fully free plan to start, and a premium plan for the exam simulator, mistake bank and advanced reports."
		},
		"h1": "Simple plans, no complexity",
		"sub": "Start completely free. Upgrade to Premium whenever you need the exam-prep tools.",
		"perMonth": "/ month",
		"free": {
			"name": "Free",
			"price": "0",
			"note": "forever",
			"cta": "Start free",
			"features": [
				"Smart library and access to every subject",
				"Save lessons to favorites",
				"Subject communities and Q&A",
				"Interactive study schedule",
				"Basic achievement counter"
			]
		},
		"plus": {
			"name": "Premium",
			"price": "29",
			"note": "per month",
			"cta": "Get Premium",
			"badge": "Most popular",
			"features": [
				"Everything in the free plan",
				"Unlimited practice exams + per-subject mistake bank",
				"Your own mistake bank for every subject",
				"15-minute review (flashcards)",
				"Weekly parent report",
				"Digital certificates on subject completion"
			]
		},
		"note": "Prices in Israeli shekels (ILS). Cancel anytime.",
		"currency": "ILS",
		"forever": "forever",
		"monthly": "per month",
		"faq": [
			{
				"q": "Is Academia really free?",
				"a": "Yes — the free plan is complete with no time limit: the library, communities, schedule, and basic achievement counter. Premium is optional for advanced exam-prep tools."
			},
			{
				"q": "Can I cancel anytime?",
				"a": "Absolutely. Cancel your Premium subscription anytime from your account settings, no conditions or cancellation fees, and you'll keep access until the end of your paid period."
			},
			{
				"q": "What's the difference between the student and teacher plans?",
				"a": "The student plan (free/premium) gives access to content and tools. The teacher plan is separate and lets you upload content, build quizzes, and track your students' performance."
			},
			{
				"q": "Do you offer discounts for school groups?",
				"a": "We're currently building special packages for schools and groups. Reach out via the Help page and we'll get back to you with details."
			},
			{
				"q": "Where is my data stored, and is it secure?",
				"a": "Your data is stored securely and encrypted, and we never share it with third parties for marketing purposes. Full details are on our Privacy Policy page."
			}
		],
		"compare": {
			"title": "Compare the plans in detail",
			"sub": "See exactly what you get with each plan before deciding.",
			"colFree": "Free",
			"colPlus": "Premium",
			"groups": [
				{
					"t": "Content & learning",
					"rows": [
						{
							"l": "Smart library across all subjects",
							"free": true,
							"plus": true
						},
						{
							"l": "Save lessons to favorites",
							"free": true,
							"plus": true
						},
						{
							"l": "Subject communities & Q&A",
							"free": true,
							"plus": true
						},
						{
							"l": "Interactive study schedule",
							"free": true,
							"plus": true
						}
					]
				},
				{
					"t": "Exam preparation",
					"rows": [
						{
							"l": "AI-powered ministerial exam simulator",
							"free": false,
							"plus": true
						},
						{
							"l": "Personal mistake bank for every subject",
							"free": false,
							"plus": true
						},
						{
							"l": "15-minute review (flashcards)",
							"free": false,
							"plus": true
						}
					]
				},
				{
					"t": "Tracking & reports",
					"rows": [
						{
							"l": "Basic achievement counter",
							"free": true,
							"plus": true
						},
						{
							"l": "Detailed weekly parent report",
							"free": false,
							"plus": true
						},
						{
							"l": "Digital certificates on subject completion",
							"free": false,
							"plus": true
						}
					]
				},
				{
					"t": "Support",
					"rows": [{
						"l": "Help center support",
						"free": true,
						"plus": true
					}, {
						"l": "Priority email support",
						"free": false,
						"plus": true
					}]
				}
			]
		}
	},
	forParents: {
		"meta": {
			"title": "Academia for parents | A clear summary, no micromanaging",
			"description": "Track your child's engagement and progress with a short weekly report, while their personal learning space stays private."
		},
		"h1": "Follow your child's progress, without watching every step.",
		"h1a": "Follow your child's progress, ",
		"h1b": "without watching every step",
		"h1c": ".",
		"sub": "Academia gives you a clear weekly summary of your child's engagement and progress, while keeping their personal learning space private.",
		"cta": "Create a parent account",
		"benefits": {
			"report": {
				"t": "A clear weekly report",
				"d": "A weekly summary of engagement and overall progress, delivered without you having to check in every day."
			},
			"privacy": {
				"t": "Your child's privacy is protected",
				"d": "You see a general summary only — not every question they got wrong or every click. The student's personal space stays private by design."
			},
			"multiKids": {
				"t": "More than one child, one account",
				"d": "Link all your children to a single account and follow each of them individually from one place."
			},
			"alerts": {
				"t": "Alerts only when it matters",
				"d": "If there's a noticeable drop or an important exam is coming up, you'll get a message — not constant notifications."
			}
		},
		"faq": [
			{
				"q": "Can I see every detail of my child's activity?",
				"a": "No, by design — you see a general summary (engagement, progress), not every small detail. This keeps the student's personal space intact and encourages independence."
			},
			{
				"q": "How do I link my child's account to mine?",
				"a": "From your parent account settings, add your child's name and grade. (Automatic linking to the student's own account is coming later)."
			},
			{
				"q": "Is there an extra cost for a parent account?",
				"a": "The parent account itself is free. Any cost is tied to the student's own subscription — see the pricing page for details."
			},
			{
				"q": "What if I notice an issue with some content?",
				"a": "You can reach us from the Contact page and our team will follow up directly."
			}
		]
	},
	forTeachers: {
		"meta": {
			"title": "Academia for teachers | Organizing and assessment tools",
			"description": "Upload your content once, build auto-graded Quizzes, and track your students with clear reports."
		},
		"h1": "Teach more, grade less, reach more students.",
		"h1a": "Teach more, ",
		"h1b": "grade less",
		"h1c": ", reach more students.",
		"sub": "Academia gives you an organized home for your content, auto-graded Quizzes, and analytics that show exactly where to focus.",
		"cta": "Sign up as a teacher",
		"benefits": {
			"upload": {
				"t": "Your content, organized",
				"d": "Upload files and videos once; they are classified automatically by term, subject, unit and lesson."
			},
			"analytics": {
				"t": "Analytics per student and section",
				"d": "See who understood and who is struggling, and exactly which unit is the weak point."
			},
			"income": {
				"t": "Income coming from your content",
				"d": "Part of a teacher income model currently being finalized, based on student engagement with your content — full details and rates will be announced before official launch."
			},
			"verified": {
				"t": "Verified account",
				"d": "Verify by uploading an ID/certificate; once approved your badge appears next to your name."
			}
		},
		"faq": [
			{
				"q": "How do I become a verified teacher?",
				"a": "Sign up via \"Start as a teacher\", fill in your details and qualifications, and our team reviews your application within a few days."
			},
			{
				"q": "How will teacher income work?",
				"a": "The income model is being finalized (rates and payout method are not yet official). Once ready, you'll get a clear notice with the details before it's enabled on your account."
			},
			{
				"q": "Does my content go live immediately?",
				"a": "Any content you upload goes through a basic review by our team before it appears to students, to keep the library's quality reliable."
			},
			{
				"q": "What kind of content can I upload?",
				"a": "Written lessons, PDF files, question banks, and short quizzes — all organized by grade, subject, and unit."
			}
		]
	},
	legal: {
		"privacyTitle": "Privacy policy",
		"termsTitle": "Terms of use",
		"lastUpdated": "Last updated: {{date}}"
	},
	auth: {
		"meta": {
			"title": "Sign in | Academia",
			"description": "Sign in or create a new account to reach your space in Academia."
		},
		"signInTitle": "Sign in",
		"signUpTitle": "Create an account",
		"fullName": "Full name",
		"email": "Email",
		"password": "Password",
		"signInAction": "Sign in",
		"signUpAction": "Create account",
		"toSignUp": "No account? Create one",
		"toSignIn": "Already have an account? Sign in",
		"google": "Continue with Google"
	},
	errors: {
		"notFoundTitle": "Page not found",
		"notFoundText": "The page you are looking for doesn't exist or has been moved.",
		"backHome": "Back to home",
		"crashTitle": "Couldn't load the page",
		"crashText": "An unexpected error occurred. You can retry or go back home.",
		"retry": "Retry",
		"forbiddenTitle": "You don't have access",
		"forbiddenText": "This page requires a permission your account doesn't have."
	},
	privacy: {
		"h1": "Privacy Policy",
		"intro": "Initial draft pending final legal review — written in plain language because it's genuinely about you.",
		"sections": [
			{
				"t": "Data We Collect",
				"d": "Account data (name, email, phone, role), academic data (attendance, exam results, course history), financial data (wallet transaction history only — we don't store bank card details, transfers are manual with a receipt), and basic technical data for security purposes."
			},
			{
				"t": "How We Use Your Data",
				"d": "To run your account and wallet, to communicate about your requests and notifications, to improve the service, and to comply with the law when officially required."
			},
			{
				"t": "Data Sharing",
				"d": "We do not sell user data to any third party. A student's academic and financial data is shown to the teacher of their course (limited to what's necessary), to a linked parent account, and to admins for administrative purposes. [TBD: name any external service providers — hosting, email, etc.]"
			},
			{
				"t": "Data Security",
				"d": "Passwords are stored hashed, and login sessions are protected with secure cookies. [TBD: update with any further security measure once actually added to the platform]"
			},
			{
				"t": "Minors' Data",
				"d": "[TBD — critical point: if students under 18 use the platform directly, this needs a dedicated parental-consent clause and extra protection per local law]"
			},
			{
				"t": "Your Rights",
				"d": "You may request a copy of your data, request corrections, or request account deletion (subject to retaining financial records for the legally required period)."
			},
			{
				"t": "Cookies",
				"d": "Essential cookies are used for sign-in and saving your preferences (language, theme), with your consent via the site's cookie banner."
			},
			{
				"t": "Contact Us",
				"d": "[TBD: a dedicated email or contact point for privacy inquiries]"
			}
		]
	},
	terms: {
		"h1": "Terms of Service",
		"intro": "By using Academia (and its related apps), you agree to the following terms. Initial draft pending final legal review — subject to updates.",
		"sections": [
			{
				"t": "Acceptance of Terms",
				"d": "Using the platform means you fully accept these terms. If you are under 18, a parent or guardian must accept on your behalf. [TBD: exact age per local law]"
			},
			{
				"t": "Service Description",
				"d": "Academia is an education marketplace connecting students with teachers and courses, offering an internal wallet, academic tracking (attendance, exams, results), and optional parent monitoring. The platform currently does not offer live chat, live video streaming, a native mobile app, or instant online payment — bank transfers are processed manually."
			},
			{
				"t": "Accounts & Roles",
				"d": "You're responsible for keeping your login credentials confidential. Available roles: student, teacher, parent, supervisor, system admin. The platform may suspend or terminate any account that violates these terms or is used fraudulently."
			},
			{
				"t": "Wallet & Financial Transactions",
				"d": "Top-ups happen via manual bank transfer plus a receipt upload, reviewed by an admin before the balance is credited. Enrollment fee deductions are final once a teacher approves the request, unless a different refund policy is set [TBD]. A platform commission applies to each enrollment. Teacher withdrawal requests are reviewed before the actual transfer. [TBD: min/max top-up and withdrawal amounts, processing time]"
			},
			{
				"t": "User Conduct",
				"d": "Impersonation, uploading content that violates the law or intellectual property rights, unauthorized access attempts to other accounts or data, and any fraudulent use of the platform are prohibited."
			},
			{
				"t": "Intellectual Property",
				"d": "Educational content uploaded by a teacher remains their property; the teacher grants the platform a license to display it exclusively to students enrolled in their course."
			},
			{
				"t": "Disclaimer",
				"d": "The platform is an intermediary between students and teachers and isn't directly responsible for the quality of teacher-provided educational content. [TBD: financial liability limits need precise legal wording]"
			},
			{
				"t": "Changes to These Terms",
				"d": "The platform may amend these terms, notifying users of any material change a reasonable time before it takes effect."
			},
			{
				"t": "Governing Law",
				"d": "[TBD — to be determined with legal counsel based on the country of incorporation/operation]"
			}
		]
	},
	forbidden: {
		"code": "403",
		"title": "This section isn't yours",
		"text": "Your account permissions don't allow access to this page. Head back to your Dashboard and continue from there.",
		"cta": "Back to Dashboard"
	},
	testimonials: {
		"badge": "Coming soon",
		"title": "Stories from students and teachers",
		"sub": "We're still building the Academia community. Once our first users are in, real stories will show up right here.",
		"placeholder": "Reviews from our students and teachers will appear here soon."
	}
};
var ar_pages_default = {
	nav: {
		"about": "من نحن",
		"courses": "الكورسات",
		"help": "المساعدة",
		"support": "الدعم",
		"certificateVerify": "التحقق من شهادة",
		"unsubscribe": "إلغاء الإشعارات",
		"contact": "تواصل معنا",
		"blog": "المدونة"
	},
	cookie: {
		"title": "نستخدم ملفات تعريف الارتباط",
		"text": "نستخدم ملفات تعريف الارتباط التحليلية لفهم كيف تُستخدم أكاديميا وتحسينها. لا نشغّل أي تتبّع قبل موافقتك.",
		"accept": "أوافق",
		"decline": "الضروري فقط",
		"more": "سياسة الخصوصية"
	},
	authPages: {
		"login": {
			"meta": {
				"title": "تسجيل الدخول | أكاديميا",
				"description": "سجّل الدخول إلى حسابك في أكاديميا وتابع دراستك من حيث توقفت."
			},
			"h1": "أهلاً بعودتك",
			"sub": "سجّل الدخول لتكمل من حيث وقفت.",
			"email": "البريد الإلكتروني",
			"password": "كلمة المرور",
			"submit": "تسجيل الدخول",
			"forgot": "نسيت كلمة المرور؟",
			"google": "المتابعة عبر Google",
			"or": "أو",
			"noAccount": "ما عندك حساب؟",
			"signupLink": "أنشئ حساباً جديداً",
			"teacherHint": "معلّم؟",
			"teacherLink": "سجّل من هنا",
			"success": "تم تسجيل الدخول"
		},
		"signup": {
			"meta": {
				"title": "إنشاء حساب | أكاديميا",
				"description": "أنشئ حسابك في أكاديميا واختر دورك: طالب، ولي أمر، أو معلّم."
			},
			"h1": "اختر دورك للبدء",
			"sub": "كل دور يفتح مساحة مختلفة كلياً بمحتواها وصلاحياتها.",
			"roles": {
				"student": {
					"t": "طالب",
					"d": "مكتبة مرتّبة، جدول دراسي، متابعة إنجاز، ومحاكي امتحان."
				},
				"parent": {
					"t": "ولي أمر",
					"d": "تقرير أسبوعي مختصر عن انتظام ابنك ونسبة إنجازه."
				},
				"teacher": {
					"t": "معلّم",
					"d": "ارفع محتواك، جهّز Quizzes، وتابع أداء شُعبك — تسجيل موسّع مع توثيق."
				}
			},
			"chosen": "الدور المختار",
			"change": "تغيير الدور",
			"fullName": "الاسم الكامل",
			"email": "البريد الإلكتروني",
			"password": "كلمة المرور",
			"passwordHint": "6 أحرف على الأقل.",
			"submit": "إنشاء الحساب",
			"haveAccount": "لديك حساب بالفعل؟",
			"loginLink": "تسجيل الدخول",
			"teacherHint": "معلّم؟",
			"teacherLink": "سجّل من هنا",
			"terms": "بإنشائك حساباً فأنت توافق على الشروط والأحكام وسياسة الخصوصية.",
			"success": "تم إنشاء الحساب — تفقّد بريدك لتفعيله."
		},
		"teacherRegister": {
			"meta": {
				"title": "تسجيل معلّم | أكاديميا",
				"description": "سجّل كمعلّم في أكاديميا وارفع وثيقة التوثيق لمراجعة فريق الإشراف."
			},
			"h1": "تسجيل معلّم",
			"sub": "بيانات إضافية لتوثيق حسابك قبل نشر محتواك.",
			"fullName": "الاسم الكامل",
			"email": "البريد الإلكتروني",
			"password": "كلمة المرور",
			"phone": "رقم الهاتف",
			"subject": "المادة الأساسية",
			"experience": "سنوات الخبرة",
			"bio": "نبذة قصيرة",
			"bioPlaceholder": "عرّف الطلاب بخبرتك وأسلوبك بالتدريس.",
			"document": "وثيقة التوثيق (بطاقة/شهادة)",
			"documentHint": "PDF أو صورة — تُراجع من فريق الإشراف خلال 48 ساعة.",
			"submit": "إرسال طلب التسجيل",
			"pending": "تم استلام طلبك، سيتم إعلامك بعد مراجعة التوثيق.",
			"back": "تسجيل كطالب أو ولي أمر بدلاً من ذلك"
		},
		"forgot": {
			"meta": {
				"title": "استعادة كلمة المرور | أكاديميا",
				"description": "أرسل رابط استعادة كلمة المرور إلى بريدك الإلكتروني."
			},
			"h1": "نسيت كلمة المرور؟",
			"sub": "اكتب بريدك وسنرسل لك رابط تعيين كلمة مرور جديدة.",
			"email": "البريد الإلكتروني",
			"submit": "أرسل رابط الاستعادة",
			"sent": "أرسلنا الرابط إلى بريدك إن كان مسجلاً لدينا.",
			"back": "العودة لتسجيل الدخول"
		},
		"reset": {
			"meta": {
				"title": "تعيين كلمة مرور جديدة | أكاديميا",
				"description": "اختر كلمة مرور جديدة لحسابك في أكاديميا."
			},
			"h1": "كلمة مرور جديدة",
			"sub": "اختر كلمة مرور قوية لن تستخدمها بمكان آخر.",
			"password": "كلمة المرور الجديدة",
			"confirm": "تأكيد كلمة المرور",
			"mismatch": "كلمتا المرور غير متطابقتين",
			"submit": "حفظ كلمة المرور",
			"success": "تم تحديث كلمة المرور",
			"invalid": "الرابط غير صالح أو منتهي. اطلب رابطاً جديداً.",
			"requestNew": "طلب رابط جديد"
		},
		"verify": {
			"meta": {
				"title": "تفعيل الحساب | أكاديميا",
				"description": "فعّل حسابك في أكاديميا من الرابط المرسل إلى بريدك."
			},
			"h1": "فعّل بريدك الإلكتروني",
			"sub": "أرسلنا رابط تفعيل إلى بريدك. افتحه لتفعيل حسابك ثم عُد إلى هنا.",
			"verified": "تم تفعيل حسابك بنجاح.",
			"goDashboard": "الذهاب للوحة التحكم",
			"resend": "إعادة إرسال الرابط",
			"resent": "أرسلنا رابطاً جديداً.",
			"emailPlaceholder": "بريدك الإلكتروني",
			"back": "العودة لتسجيل الدخول"
		}
	},
	about: {
		"meta": {
			"title": "من نحن | أكاديميا",
			"description": "قصة أكاديميا: فريق عربي يبني منصة تنظيم وإنجاز لطلاب الثانوية بدل فوضى مجموعات الواتساب."
		},
		"h1": "بنينا أكاديميا لأننا عشنا الفوضى",
		"h1a": "بنينا أكاديميا لأننا عشنا ",
		"h1b": "الفوضى",
		"sub": "ملفات ضايعة بمجموعات، أسئلة بلا إجابة، وامتحان وزاري بيقرب. قرّرنا نعمل المكان المرتّب اللي كنا نتمناه.",
		"missionTitle": "مهمتنا",
		"mission": "نساعد كل طالب عربي يحوّل مواده من كومة ملفات إلى خطة واضحة يقدر ينجزها خطوة خطوة.",
		"values": [
			{
				"t": "الوضوح قبل الكمّية",
				"d": "تصنيف صارم: فصل ← مادة ← وحدة ← درس. لا شي بيضيع، ولا شي بينحشر بمكان غلط."
			},
			{
				"t": "خصوصية الطالب",
				"d": "ولي الأمر يشوف ملخص الانتظام والإنجاز فقط — مش محادثاتك ولا تفاصيل يومك."
			},
			{
				"t": "عربي أولاً",
				"d": "واجهة RTL مصمّمة بالعربية من الصفر، وإنجليزية كاملة كخيار ثانٍ."
			},
			{
				"t": "الإنجاز قابل للقياس",
				"d": "عدّاد إنجاز، سلسلة أيام، وبنك أخطاء — تقدّم تشوفه بعينك لا تحسّه فقط."
			}
		],
		"teamTitle": "الفريق",
		"teamSub": "فريق مؤسس من 3 أشخاص، يبني المنصة بالكامل من الصفر — الواجهة والبنية التقنية معًا.",
		"team": [
			{
				"n": "ربحي إبراهيم",
				"t": "مؤسس مشارك — الواجهة الأمامية والمنتج",
				"d": "يبني تجربة الطالب والواجهات، من التصميم لآخر تفصيل بالتفاعل."
			},
			{
				"n": "أحمد الخالدي",
				"t": "مؤسس مشارك — البنية التقنية وقواعد البيانات",
				"d": "يبني البنية التقنية وقاعدة البيانات."
			},
			{
				"n": "زياد النميلات",
				"t": "مؤسس مشارك — الأمان والبنية التحتية",
				"d": "يبني الأمان والبنية التحتية للمنصة."
			}
		],
		"ctaTitle": "بدك تكون جزء من القصة؟",
		"ctaSub": "ابدأ مجاناً كطالب، أو سجّل كمعلّم وشارك محتواك.",
		"ctaPrimary": "ابدأ مجاناً",
		"ctaSecondary": "سجّل كمعلّم"
	},
	courses: {
		"meta": {
			"title": "الكورسات | أكاديميا",
			"description": "كورسات من معلّمين محليين وعالميين — أونلاين مباشر، وجاهي، أو مسجّل مسبقاً. تصفّح حسب المادة والفرع قبل إنشاء حسابك."
		},
		"h1": "سوق الكورسات",
		"sub": "معلّمون محليون وعالميون، بأي صيغة تناسبك — أونلاين مباشر، وجاهي، أو مسجّل مسبقاً. تصفّح بدون حساب، وسجّل عند الاشتراك.",
		"searchPlaceholder": "ابحث باسم الكورس أو المعلّم…",
		"all": "الكل",
		"branchLabel": "الفرع:",
		"empty": "لا نتائج مطابقة لبحثك.",
		"emptyCatalogTitle": "أول كورس بالطريق",
		"emptyCatalogBody": "نجهّز حالياً كورسات مع معلّمين حقيقيين (أونلاين، وجاهي، ومسجّل مسبقاً). أول ما ينشر أي كورس رح يظهر هون مباشرة.",
		"lessons": "درس",
		"hours": "ساعة",
		"free": "مجاني",
		"enroll": "التحقّق والاشتراك",
		"byTeacher": "المعلّم",
		"open": "افتح الكورس"
	},
	teacherProfile: {
		"meta": {
			"title": "ملف المعلّم | أكاديميا",
			"description": "تعرّف على المعلّم، كورساته، وتقييمات طلابه على أكاديميا."
		},
		"verified": "حساب موثّق",
		"students": "طالب",
		"courses": "كورس",
		"rating": "التقييم",
		"aboutTitle": "نبذة",
		"about": "معلّم على منصة أكاديميا، يرفع محتواه مصنّفاً حسب الفصل والمادة والوحدة والدرس، ويتابع أداء طلابه عبر Quizzes وتقارير دورية.",
		"coursesTitle": "كورسات المعلّم",
		"reviewsTitle": "آراء الطلاب",
		"reviews": [{
			"n": "طالب توجيهي علمي",
			"d": "الشرح مرتّب والأسئلة بعد كل درس خلّتني أثبت المعلومة."
		}, {
			"n": "طالبة توجيهي عام",
			"d": "أول مرة ما أضيع بين الملفات — كل وحدة بمكانها."
		}],
		"cta": "سجّل لمتابعة هذا المعلّم",
		"notFound": "لم نجد هذا المعلّم."
	},
	certificate: {
		"meta": {
			"title": "التحقق من شهادة | أكاديميا",
			"description": "تحقّق من صحة شهادة رقمية صادرة عن منصة أكاديميا برقم الشهادة."
		},
		"h1": "التحقق من الشهادة",
		"sub": "أدخل رقم الشهادة أو افتح رابط التحقق المطبوع عليها.",
		"placeholder": "رقم الشهادة (مثال: ACD-2026-00184)",
		"check": "تحقّق",
		"valid": "شهادة صحيحة وصادرة عن أكاديميا",
		"invalid": "لم نجد شهادة بهذا الرقم. تأكد من الرقم وحاول مجدداً.",
		"holder": "اسم الحامل",
		"course": "المادة / الكورس",
		"issued": "تاريخ الإصدار",
		"id": "رقم الشهادة",
		"note": "التحقق يتم مقابل سجل الشهادات الرسمي للمنصة."
	},
	invite: {
		"meta": {
			"title": "دعوة إلى أكاديميا",
			"description": "انضم إلى أكاديميا عبر رابط دعوة واحصل على مزايا البداية."
		},
		"h1": "وصلتك دعوة إلى أكاديميا",
		"sub": "صديقك يستخدم أكاديميا لينظّم دراسته. انضم عبر رابطه واحصل على شهر بريميوم تجريبي.",
		"codeLabel": "رمز الدعوة",
		"perks": [
			"شهر بريميوم تجريبي عند إتمام التسجيل",
			"موادك تنبني تلقائياً حسب نظامك وصفك",
			"تنضم لنفس مجتمعات المواد مع أصدقائك"
		],
		"cta": "اقبل الدعوة وسجّل",
		"login": "عندي حساب — تسجيل الدخول",
		"disclaimer": "المزايا تُفعَّل بعد تأكيد بريدك الإلكتروني."
	},
	help: {
		"meta": {
			"title": "مركز المساعدة | أكاديميا",
			"description": "إجابات سريعة عن الحساب، الاشتراك، المكتبة، والخصوصية في أكاديميا."
		},
		"h1": "مركز المساعدة",
		"sub": "أجوبة مختصرة لأكثر الأسئلة تكراراً. ما لقيت جوابك؟ راسلنا.",
		"searchPlaceholder": "ابحث في المساعدة…",
		"empty": "لا نتائج. جرّب كلمة أخرى أو راسل الدعم.",
		"contactTitle": "لسه محتاج مساعدة؟",
		"contactSub": "فريق الدعم يرد خلال يوم عمل واحد.",
		"contactCta": "راسل الدعم",
		"topics": [
			{
				"t": "الحساب والدخول",
				"items": [
					{
						"q": "كيف أنشئ حساباً؟",
						"a": "من صفحة إنشاء الحساب اختر دورك (طالب أو ولي أمر) ثم أكمل الاسم والبريد وكلمة المرور. المعلّم يسجّل من صفحة تسجيل المعلّم لأن حسابه يحتاج توثيقاً."
					},
					{
						"q": "نسيت كلمة المرور، ماذا أفعل؟",
						"a": "افتح صفحة استعادة كلمة المرور، أدخل بريدك، وسيصلك رابط لتعيين كلمة مرور جديدة."
					},
					{
						"q": "هل يبقى حسابي مسجّلاً بعد إغلاق المتصفح؟",
						"a": "نعم، جلستك محفوظة. لأمانك، يتم تسجيل الخروج تلقائياً بعد ساعتين من عدم النشاط."
					}
				]
			},
			{
				"t": "الاشتراك والدفع",
				"items": [{
					"q": "ما الفرق بين المجاني وبريميوم؟",
					"a": "المجاني يشمل المكتبة والمجتمعات والجدول وعدّاد الإنجاز. بريميوم يضيف محاكي الامتحان، بنك الأخطاء، مراجعة الـ15 دقيقة، وتقرير ولي الأمر."
				}, {
					"q": "هل أقدر ألغي الاشتراك؟",
					"a": "نعم بأي وقت، ويبقى الاشتراك فعّالاً حتى نهاية الفترة المدفوعة."
				}]
			},
			{
				"t": "المكتبة والمحتوى",
				"items": [{
					"q": "كيف يُصنَّف المحتوى؟",
					"a": "بتسلسل صارم: فصل ← مادة ← وحدة ← درس، مع بحث متقدم وحفظ بالمفضلة."
				}, {
					"q": "وجدت محتوى مخالفاً، ماذا أفعل؟",
					"a": "استخدم زر الإبلاغ على الدرس؛ فريق الإشراف يراجعه وقد يُحذف المحتوى المخالف."
				}]
			},
			{
				"t": "الخصوصية",
				"items": [{
					"q": "ماذا يرى ولي الأمر؟",
					"a": "ملخصاً أسبوعياً للانتظام ونسبة الإنجاز فقط — لا يرى محادثاتك في المجتمعات ولا تفاصيل نشاطك اليومي."
				}, {
					"q": "كيف أحذف حسابي؟",
					"a": "من صفحة الإعدادات، أو بمراسلة الدعم، ويُحذف حسابك وبياناتك المرتبطة به."
				}]
			}
		]
	},
	unsubscribe: {
		"meta": {
			"title": "إلغاء الإشعارات | أكاديميا",
			"description": "أوقف رسائل أكاديميا البريدية بدون الحاجة لتسجيل الدخول."
		},
		"h1": "إلغاء الاشتراك بالإشعارات",
		"sub": "اختر ما تريد إيقافه — لا حاجة لتسجيل الدخول.",
		"email": "البريد الإلكتروني",
		"options": {
			"weekly": "التقرير الأسبوعي",
			"reminders": "تذكيرات الجدول الدراسي",
			"community": "إشعارات مجتمعات المواد",
			"marketing": "رسائل المنصة والعروض"
		},
		"all": "إيقاف كل الرسائل البريدية",
		"submit": "حفظ التفضيلات",
		"done": "تم تحديث تفضيلات بريدك.",
		"note": "الرسائل الأمنية (استعادة كلمة المرور وتأكيد البريد) تبقى فعّالة دائماً.",
		"back": "العودة للرئيسية"
	},
	notFound: {
		"meta": {
			"title": "الصفحة غير موجودة | أكاديميا",
			"description": "الصفحة التي تبحث عنها غير موجودة أو تم نقلها."
		},
		"code": "404",
		"title": "الصفحة مش موجودة",
		"text": "يمكن الرابط قديم أو فيه خطأ مطبعي. جرّب تبدأ من الرئيسية أو من الكورسات.",
		"home": "العودة للرئيسية",
		"courses": "تصفّح الكورسات"
	},
	settings: {
		"meta": {
			"title": "الإعدادات | أكاديميا",
			"description": "اللغة، الثيم، وبيانات حسابك في أكاديميا."
		},
		"h1": "الإعدادات",
		"sub": "تفضيلاتك تُحفظ على جهازك وعلى حسابك معاً.",
		"langThemeTab": "اللغة والثيم",
		"accountTab": "الحساب",
		"theme": "الثيم",
		"language": "اللغة",
		"account": "بيانات الحساب",
		"role": "الدور",
		"email": "البريد الإلكتروني",
		"name": "الاسم",
		"signOut": "تسجيل الخروج",
		"security": "الأمان",
		"idleNote": "يتم تسجيل خروجك تلقائياً بعد ساعتين من عدم النشاط."
	},
	session: { "expired": "انتهت جلستك بعد ساعتين من عدم النشاط. سجّل الدخول مجدداً." },
	contact: {
		"meta": {
			"title": "تواصل معنا | أكاديميا",
			"description": "عندك سؤال، اقتراح، أو بدك تعمل شراكة مدرسية؟ فريق أكاديميا جاهز يسمعك."
		},
		"h1": "تواصل معنا",
		"sub": "سواء سؤال بسيط، اقتراح، أو مشروع شراكة مع مدرستك — راسلنا وبنرجعلك بأسرع وقت.",
		"form": {
			"name": "الاسم الكامل",
			"email": "البريد الإلكتروني",
			"topic": "موضوع الرسالة",
			"topics": {
				"student": "دعم طالب/حساب",
				"teacher": "الانضمام كمعلّم",
				"school": "شراكة مع مدرسة أو مجموعة",
				"press": "إعلام وتغطية صحفية",
				"other": "شي تاني"
			},
			"message": "الرسالة",
			"messagePlaceholder": "اكتب تفاصيل رسالتك هون…",
			"submit": "إرسال الرسالة",
			"sending": "جاري الإرسال…"
		},
		"errors": {
			"name": "الاسم لازم يكون حرفين على الأقل",
			"email": "بريد إلكتروني غير صالح",
			"message": "الرسالة قصيرة، أضف تفاصيل أكتر (10 أحرف على الأقل)"
		},
		"success": {
			"title": "وصلتنا رسالتك! ✅",
			"sub": "فريقنا رح يراجعها ويرجعلك على بريدك خلال يوم إلى يومين عمل.",
			"again": "إرسال رسالة ثانية"
		},
		"sidebar": {
			"emailTitle": "راسلنا مباشرة",
			"emailSub": "لأي استفسار عام",
			"responseTitle": "وقت الرد المتوقع",
			"responseSub": "خلال يوم إلى يومين عمل",
			"helpTitle": "بتدوّر جواب سريع؟",
			"helpSub": "شيك على مركز المساعدة، ممكن يكون سؤالك مجاوب فيه.",
			"helpCta": "زيارة مركز المساعدة"
		}
	},
	blog: {
		"meta": {
			"title": "مدونة أكاديميا | تنظيم المذاكرة والتحضير للامتحان",
			"description": "مقالات عملية عن تنظيم المذاكرة والتعلّم والتحضير للامتحان الوزاري لطلاب المرحلة الثانوية."
		},
		"h1": "مدونة أكاديميا",
		"sub": "مقالات عملية عن تنظيم المذاكرة والتحضير للامتحان الوزاري، من غير حشو.",
		"readMinutes_one": "دقيقة قراءة",
		"readMinutes_other": "{{count}} دقايق قراءة",
		"notFound": "ما لقينا هالمقال",
		"notFoundSub": "ممكن يكون الرابط غلط أو المقال انشال.",
		"backToBlog": "رجوع للمدونة",
		"ctaTitle": "بدك تطبق هالأفكار عملياً؟",
		"ctaSub": "أكاديميا فيها جدول دراسي، بنك أخطاء، ومحاكي امتحان يساعدوك تطبق كل هاد بشكل يومي.",
		"ctaButton": "جرّب أكاديميا مجاناً",
		"moreTitle": "مقالات تانية بتهمك",
		"teaserTitle": "من مدونتنا",
		"teaserSub": "نصائح عملية للمذاكرة والتحضير للامتحان.",
		"teaserCta": "زيارة المدونة"
	}
};
var en_pages_default = {
	nav: {
		"about": "About",
		"courses": "Courses",
		"help": "Help",
		"support": "Support",
		"certificateVerify": "Verify a certificate",
		"unsubscribe": "Email preferences",
		"contact": "Contact",
		"blog": "Blog"
	},
	cookie: {
		"title": "We use cookies",
		"text": "We use analytics cookies to understand how Academia is used and improve it. No tracking runs before you agree.",
		"accept": "Accept",
		"decline": "Essential only",
		"more": "Privacy policy"
	},
	authPages: {
		"login": {
			"meta": {
				"title": "Sign in | Academia",
				"description": "Sign in to your Academia account and pick up your studying where you left off."
			},
			"h1": "Welcome back",
			"sub": "Sign in to continue where you stopped.",
			"email": "Email",
			"password": "Password",
			"submit": "Sign in",
			"forgot": "Forgot your password?",
			"google": "Continue with Google",
			"or": "or",
			"noAccount": "No account yet?",
			"signupLink": "Create one",
			"teacherHint": "A teacher?",
			"teacherLink": "Register here",
			"success": "Signed in"
		},
		"signup": {
			"meta": {
				"title": "Create account | Academia",
				"description": "Create your Academia account and pick your role: student, parent, or teacher."
			},
			"h1": "Pick your role to start",
			"sub": "Each role opens a completely different space, content and permissions.",
			"roles": {
				"student": {
					"t": "Student",
					"d": "Tidy library, study schedule, achievement tracking, and an exam simulator."
				},
				"parent": {
					"t": "Parent",
					"d": "A short weekly report on your child's consistency and progress."
				},
				"teacher": {
					"t": "Teacher",
					"d": "Upload content, build quizzes, track your sections — extended sign-up with verification."
				}
			},
			"chosen": "Selected role",
			"change": "Change role",
			"fullName": "Full name",
			"email": "Email",
			"password": "Password",
			"passwordHint": "At least 6 characters.",
			"submit": "Create account",
			"haveAccount": "Already have an account?",
			"loginLink": "Sign in",
			"teacherHint": "A teacher?",
			"teacherLink": "Register here",
			"terms": "By creating an account you agree to the terms and the privacy policy.",
			"success": "Account created — check your inbox to activate it."
		},
		"teacherRegister": {
			"meta": {
				"title": "Teacher registration | Academia",
				"description": "Register as a teacher on Academia and upload your verification document for review."
			},
			"h1": "Teacher registration",
			"sub": "A few extra details so we can verify you before your content goes live.",
			"fullName": "Full name",
			"email": "Email",
			"password": "Password",
			"phone": "Phone number",
			"subject": "Main subject",
			"experience": "Years of experience",
			"bio": "Short bio",
			"bioPlaceholder": "Tell students about your experience and teaching style.",
			"document": "Verification document (ID/certificate)",
			"documentHint": "PDF or image — reviewed by our team within 48 hours.",
			"submit": "Submit registration",
			"pending": "Request received, we will notify you once verification is reviewed.",
			"back": "Register as a student or parent instead"
		},
		"forgot": {
			"meta": {
				"title": "Reset password | Academia",
				"description": "Send a password reset link to your email."
			},
			"h1": "Forgot your password?",
			"sub": "Enter your email and we'll send you a link to set a new password.",
			"email": "Email",
			"submit": "Send reset link",
			"sent": "If that email is registered, the link is on its way.",
			"back": "Back to sign in"
		},
		"reset": {
			"meta": {
				"title": "Set a new password | Academia",
				"description": "Choose a new password for your Academia account."
			},
			"h1": "New password",
			"sub": "Pick a strong password you don't use anywhere else.",
			"password": "New password",
			"confirm": "Confirm password",
			"mismatch": "Passwords do not match",
			"submit": "Save password",
			"success": "Password updated",
			"invalid": "This link is invalid or expired. Request a new one.",
			"requestNew": "Request a new link"
		},
		"verify": {
			"meta": {
				"title": "Verify your email | Academia",
				"description": "Activate your Academia account from the link sent to your inbox."
			},
			"h1": "Verify your email",
			"sub": "We sent an activation link to your inbox. Open it, then come back here.",
			"verified": "Your account is verified.",
			"goDashboard": "Go to dashboard",
			"resend": "Resend link",
			"resent": "A new link is on its way.",
			"emailPlaceholder": "Your email",
			"back": "Back to sign in"
		}
	},
	about: {
		"meta": {
			"title": "About us | Academia",
			"description": "The Academia story: an Arabic-first team building an organization and achievement platform for high-school students."
		},
		"h1": "We built Academia because we lived the chaos",
		"h1a": "We built Academia because we lived the ",
		"h1b": "chaos",
		"sub": "Files lost in group chats, questions with no answers, and a national exam getting closer. So we built the tidy place we wished we had.",
		"missionTitle": "Our mission",
		"mission": "Help every Arabic-speaking student turn a pile of files into a clear plan they can actually finish, step by step.",
		"values": [
			{
				"t": "Clarity over quantity",
				"d": "A strict tree: term → subject → unit → lesson. Nothing gets lost, nothing lands in the wrong place."
			},
			{
				"t": "Student privacy",
				"d": "Parents see consistency and progress summaries only — not your chats or your daily details."
			},
			{
				"t": "Arabic first",
				"d": "An RTL interface designed in Arabic from scratch, with full English as a second option."
			},
			{
				"t": "Measurable achievement",
				"d": "A progress counter, a day streak, and a mistake bank — progress you can see, not just feel."
			}
		],
		"teamTitle": "The team",
		"teamSub": "A 3-person founding team building the platform from scratch — frontend and backend together.",
		"team": [
			{
				"n": "Rebhe Ibrahim",
				"t": "Co-founder — Frontend & product",
				"d": "Builds the student experience and the interface, down to the last interaction detail."
			},
			{
				"n": "Ahmed Alkhaldi",
				"t": "Co-founder — Architecture & database",
				"d": "Builds the technical infrastructure and database."
			},
			{
				"n": "Ziad Alnumailat",
				"t": "Co-founder — Security & infrastructure",
				"d": "Builds platform security and infrastructure."
			}
		],
		"ctaTitle": "Want to be part of the story?",
		"ctaSub": "Start free as a student, or register as a teacher and share your content.",
		"ctaPrimary": "Start free",
		"ctaSecondary": "Register as a teacher"
	},
	courses: {
		"meta": {
			"title": "Courses | Academia",
			"description": "Courses from local and international teachers — live online, in-person, or recorded. Browse by subject and track before creating an account."
		},
		"h1": "Course marketplace",
		"sub": "Local and international teachers, in whatever format suits you — live online, in-person, or recorded. Browse without an account, sign up when you enroll.",
		"searchPlaceholder": "Search by course or teacher…",
		"all": "All",
		"branchLabel": "Track:",
		"empty": "No results match your search.",
		"emptyCatalogTitle": "The first course is on its way",
		"emptyCatalogBody": "We're setting up courses with real teachers (live online, on-site, and recorded). The moment one is published, it'll show up here.",
		"lessons": "lessons",
		"hours": "hours",
		"free": "Free",
		"enroll": "View & enroll",
		"byTeacher": "Teacher",
		"open": "Open course"
	},
	teacherProfile: {
		"meta": {
			"title": "Teacher profile | Academia",
			"description": "Meet the teacher, their courses, and student reviews on Academia."
		},
		"verified": "Verified account",
		"students": "students",
		"courses": "courses",
		"rating": "Rating",
		"aboutTitle": "About",
		"about": "An Academia teacher who uploads content classified by term, subject, unit and lesson, and tracks student performance through quizzes and periodic reports.",
		"coursesTitle": "Courses by this teacher",
		"reviewsTitle": "Student reviews",
		"reviews": [{
			"n": "Science-track student",
			"d": "The explanation is organized and the quizzes after each lesson made it stick."
		}, {
			"n": "General-track student",
			"d": "First time I'm not lost between files — every unit is where it should be."
		}],
		"cta": "Sign up to follow this teacher",
		"notFound": "We couldn't find this teacher."
	},
	certificate: {
		"meta": {
			"title": "Verify a certificate | Academia",
			"description": "Verify the authenticity of a digital certificate issued by Academia using its ID."
		},
		"h1": "Certificate verification",
		"sub": "Enter the certificate ID or open the verification link printed on it.",
		"placeholder": "Certificate ID (e.g. ACD-2026-00184)",
		"check": "Verify",
		"valid": "Valid certificate issued by Academia",
		"invalid": "No certificate found with this ID. Check it and try again.",
		"holder": "Holder name",
		"course": "Subject / course",
		"issued": "Issue date",
		"id": "Certificate ID",
		"note": "Verification runs against the platform's official certificate registry."
	},
	invite: {
		"meta": {
			"title": "An invite to Academia",
			"description": "Join Academia through an invite link and get starter perks."
		},
		"h1": "You've been invited to Academia",
		"sub": "Your friend uses Academia to organize their studying. Join through their link and get a free premium month.",
		"codeLabel": "Invite code",
		"perks": [
			"A free premium month once you finish signing up",
			"Your subjects are built automatically from your system and grade",
			"You join the same subject communities as your friends"
		],
		"cta": "Accept invite & sign up",
		"login": "I have an account — sign in",
		"disclaimer": "Perks activate after your email is confirmed."
	},
	help: {
		"meta": {
			"title": "Help center | Academia",
			"description": "Quick answers about accounts, subscriptions, the library, and privacy on Academia."
		},
		"h1": "Help center",
		"sub": "Short answers to the most common questions. Can't find yours? Contact us.",
		"searchPlaceholder": "Search help…",
		"empty": "No results. Try another word or contact support.",
		"contactTitle": "Still need help?",
		"contactSub": "Our support team replies within one business day.",
		"contactCta": "Contact support",
		"topics": [
			{
				"t": "Account & sign in",
				"items": [
					{
						"q": "How do I create an account?",
						"a": "On the sign-up page pick your role (student or parent) then fill in your name, email and password. Teachers register from the teacher page because their account needs verification."
					},
					{
						"q": "I forgot my password, what now?",
						"a": "Open the reset page, enter your email, and you'll get a link to set a new password."
					},
					{
						"q": "Do I stay signed in after closing the browser?",
						"a": "Yes, your session is saved. For your security you're signed out automatically after two hours of inactivity."
					}
				]
			},
			{
				"t": "Subscription & payment",
				"items": [{
					"q": "What's the difference between Free and Premium?",
					"a": "Free includes the library, communities, schedule and the progress counter. Premium adds the exam simulator, mistake bank, the 15-minute review, and the parent report."
				}, {
					"q": "Can I cancel?",
					"a": "Yes, any time. Your subscription stays active until the end of the paid period."
				}]
			},
			{
				"t": "Library & content",
				"items": [{
					"q": "How is content classified?",
					"a": "In a strict tree: term → subject → unit → lesson, with advanced search and favorites."
				}, {
					"q": "I found violating content, what do I do?",
					"a": "Use the report button on the lesson; our moderation team reviews it and violating content may be removed."
				}]
			},
			{
				"t": "Privacy",
				"items": [{
					"q": "What can a parent see?",
					"a": "A weekly summary of consistency and progress only — not your community chats or daily activity details."
				}, {
					"q": "How do I delete my account?",
					"a": "From the settings page, or by contacting support; your account and related data are removed."
				}]
			}
		]
	},
	unsubscribe: {
		"meta": {
			"title": "Unsubscribe | Academia",
			"description": "Stop Academia emails without signing in."
		},
		"h1": "Unsubscribe from notifications",
		"sub": "Pick what you want to stop — no sign-in needed.",
		"email": "Email",
		"options": {
			"weekly": "Weekly report",
			"reminders": "Study schedule reminders",
			"community": "Subject community notifications",
			"marketing": "Platform news and offers"
		},
		"all": "Stop all emails",
		"submit": "Save preferences",
		"done": "Your email preferences were updated.",
		"note": "Security emails (password reset and email confirmation) always stay on.",
		"back": "Back home"
	},
	notFound: {
		"meta": {
			"title": "Page not found | Academia",
			"description": "The page you're looking for doesn't exist or was moved."
		},
		"code": "404",
		"title": "This page doesn't exist",
		"text": "The link may be old or have a typo. Try starting from the home page or the courses.",
		"home": "Back home",
		"courses": "Browse courses"
	},
	settings: {
		"meta": {
			"title": "Settings | Academia",
			"description": "Language, theme, and your account details on Academia."
		},
		"h1": "Settings",
		"sub": "Your preferences are saved on this device and to your account.",
		"langThemeTab": "Language & theme",
		"accountTab": "Account",
		"theme": "Theme",
		"language": "Language",
		"account": "Account details",
		"role": "Role",
		"email": "Email",
		"name": "Name",
		"signOut": "Sign out",
		"security": "Security",
		"idleNote": "You're signed out automatically after two hours of inactivity."
	},
	session: { "expired": "Your session ended after two hours of inactivity. Please sign in again." },
	contact: {
		"meta": {
			"title": "Contact us | Academia",
			"description": "Have a question, a suggestion, or want a school partnership? The Academia team is ready to listen."
		},
		"h1": "Contact us",
		"sub": "Whether it's a quick question, a suggestion, or a partnership with your school — reach out and we'll get back to you fast.",
		"form": {
			"name": "Full name",
			"email": "Email address",
			"topic": "Subject",
			"topics": {
				"student": "Student support / account",
				"teacher": "Joining as a teacher",
				"school": "School or group partnership",
				"press": "Press & media",
				"other": "Something else"
			},
			"message": "Message",
			"messagePlaceholder": "Write the details of your message here…",
			"submit": "Send message",
			"sending": "Sending…"
		},
		"errors": {
			"name": "Name must be at least 2 characters",
			"email": "Invalid email address",
			"message": "Message is too short — add a bit more detail (10+ characters)"
		},
		"success": {
			"title": "Your message is in! ✅",
			"sub": "Our team will review it and reply to your email within 1–2 business days.",
			"again": "Send another message"
		},
		"sidebar": {
			"emailTitle": "Email us directly",
			"emailSub": "For any general inquiry",
			"responseTitle": "Expected response time",
			"responseSub": "Within 1–2 business days",
			"helpTitle": "Looking for a quick answer?",
			"helpSub": "Check the Help Center — your question might already be answered there.",
			"helpCta": "Visit the Help Center"
		}
	},
	blog: {
		"meta": {
			"title": "Academia Blog | Study organization and exam prep",
			"description": "Practical study organization, learning and national-exam preparation articles for high-school students."
		},
		"h1": "Academia Blog",
		"sub": "Practical articles on study organization and exam prep — no fluff.",
		"readMinutes_one": "{{count}} min read",
		"readMinutes_other": "{{count}} min read",
		"notFound": "We couldn't find that article",
		"notFoundSub": "The link might be wrong, or the article was removed.",
		"backToBlog": "Back to blog",
		"ctaTitle": "Want to put these ideas into practice?",
		"ctaSub": "Academia has a study schedule, a mistake bank, and an exam simulator to help you apply all this daily.",
		"ctaButton": "Try Academia for free",
		"moreTitle": "More articles you'll like",
		"teaserTitle": "From our blog",
		"teaserSub": "Practical tips for studying and exam prep.",
		"teaserCta": "Visit the blog"
	}
};
var SUPPORTED_LOCALES = ["ar", "en"];
var LOCALE_DIR = {
	ar: "rtl",
	en: "ltr"
};
/** Deep merge so page bundles can extend shared sections (e.g. `nav`). */
function merge(base, extra) {
	const out = { ...base };
	for (const [key, value] of Object.entries(extra)) {
		const current = out[key];
		if (current && typeof current === "object" && !Array.isArray(current) && value && typeof value === "object" && !Array.isArray(value)) out[key] = merge(current, value);
		else out[key] = value;
	}
	return out;
}
if (!instance.isInitialized) instance.use(initReactI18next).init({
	resources: {
		ar: { translation: merge(ar_default, ar_pages_default) },
		en: { translation: merge(en_default, en_pages_default) }
	},
	lng: "ar",
	fallbackLng: "ar",
	supportedLngs: SUPPORTED_LOCALES,
	interpolation: { escapeValue: false },
	react: { useSuspense: false }
});
var i18n_default = instance;
var SITE_URL = env.SITE_URL;
var PAGE_META_KEYS = {
	"/": "home",
	"/about": "about",
	"/courses": "courses",
	"/for-teachers": "forTeachers",
	"/for-parents": "forParents",
	"/how-it-works": "howItWorks",
	"/pricing": "pricing",
	"/contact": "contact",
	"/help": "help",
	"/privacy": "privacy",
	"/terms": "terms",
	"/blog": "blog",
	"/login": "authPages.login",
	"/signup": "authPages.signup",
	"/forgot-password": "authPages.forgot",
	"/reset-password": "authPages.reset",
	"/verify-email": "authPages.verify",
	"/teacher/register": "authPages.teacherRegister",
	"/invite": "invite",
	"/unsubscribe": "unsubscribe",
	"/settings": "settings"
};
var NOINDEX_PATHS = [
	"/403",
	"/login",
	"/signup",
	"/forgot-password",
	"/reset-password",
	"/verify-email",
	"/teacher/register",
	"/invite/",
	"/unsubscribe",
	"/certificate/",
	"/dashboard",
	"/admin/",
	"/teacher/dashboard",
	"/teacher/courses",
	"/teacher/quizzes",
	"/teacher/content",
	"/teacher/community",
	"/teacher/analytics",
	"/teacher/earnings",
	"/teacher/grading",
	"/teacher/settings",
	"/teacher/profile/edit",
	"/parent/",
	"/supervisor/",
	"/library",
	"/exam-simulator",
	"/mistakes-bank",
	"/my-courses",
	"/my-certificates",
	"/flashcards",
	"/bookmarks",
	"/achievements",
	"/notifications",
	"/referrals",
	"/schedule",
	"/settings",
	"/community",
	"/system-modules",
	"/role-permissions/"
];
function translateMeta(locale, key) {
	const t = i18n_default.getFixedT(locale);
	return {
		title: String(t(`${key}.meta.title`)),
		description: String(t(`${key}.meta.description`))
	};
}
function isNoIndex(pathname) {
	return NOINDEX_PATHS.some((prefix) => pathname === prefix || pathname.startsWith(prefix));
}
function localizedUrl(pathname, locale) {
	const url = new URL(pathname || "/", SITE_URL);
	if (locale === "en") url.searchParams.set("lang", "en");
	return url.toString();
}
function localeFromSearch(search) {
	if (search && typeof search === "object" && "lang" in search) {
		if (search.lang === "en") return "en";
	}
	return "ar";
}
function getSeoForPath(pathname, locale) {
	const normalizedPath = pathname || "/";
	const blogSlug = normalizedPath.startsWith("/blog/") ? decodeURIComponent(normalizedPath.slice(6)) : null;
	const post = blogSlug ? getBlogPost(blogSlug) : void 0;
	i18n_default.getFixedT(locale);
	let meta;
	let type = "website";
	let publishedTime;
	if (post) {
		meta = {
			title: `${locale === "en" ? post.titleEn : post.title} | ${locale === "en" ? "Academia Blog" : "مدونة أكاديميا"}`,
			description: locale === "en" ? post.excerptEn : post.excerpt
		};
		type = "article";
		publishedTime = post.publishedAt;
	} else if (blogSlug) meta = translateMeta(locale, "notFound");
	else if (normalizedPath.startsWith("/invite/")) meta = translateMeta(locale, "invite");
	else if (normalizedPath.startsWith("/certificate/")) meta = translateMeta(locale, "certificate");
	else if (normalizedPath.startsWith("/teacher/") && !isNoIndex(normalizedPath)) meta = translateMeta(locale, "teacherProfile");
	else meta = translateMeta(locale, PAGE_META_KEYS[normalizedPath] ?? "notFound");
	const canonical = localizedUrl(normalizedPath, locale);
	const alternate = localizedUrl(normalizedPath, locale === "ar" ? "en" : "ar");
	return {
		...meta,
		locale,
		pathname: normalizedPath,
		canonical,
		alternate,
		type,
		indexable: !isNoIndex(normalizedPath),
		image: `${SITE_URL}/og-image.svg`,
		publishedTime
	};
}
function createSeoHead(pathname, locale = "ar") {
	const payload = getSeoForPath(pathname, locale);
	const localeCode = locale === "en" ? "en_US" : "ar";
	const alternateLocale = locale === "en" ? "ar" : "en_US";
	const links = [
		{
			rel: "canonical",
			href: payload.canonical
		},
		{
			rel: "alternate",
			href: localizedUrl(payload.pathname, "ar"),
			hrefLang: "ar"
		},
		{
			rel: "alternate",
			href: localizedUrl(payload.pathname, "en"),
			hrefLang: "en"
		},
		{
			rel: "alternate",
			href: localizedUrl(payload.pathname, "ar"),
			hrefLang: "x-default"
		}
	];
	const jsonLd = payload.type === "article" ? {
		"@context": "https://schema.org",
		"@type": "Article",
		headline: payload.title,
		description: payload.description,
		datePublished: payload.publishedTime,
		inLanguage: payload.locale,
		mainEntityOfPage: payload.canonical,
		image: payload.image,
		publisher: {
			"@type": "Organization",
			name: "Academia",
			url: SITE_URL
		}
	} : {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: payload.locale === "en" ? "Academia" : "أكاديميا",
		description: payload.description,
		url: payload.canonical,
		inLanguage: payload.locale,
		publisher: {
			"@type": "Organization",
			name: "Academia",
			url: SITE_URL,
			logo: `${SITE_URL}/og-image.svg`
		}
	};
	return {
		meta: [
			{ title: payload.title },
			{
				name: "description",
				content: payload.description
			},
			{
				name: "robots",
				content: payload.indexable ? "index, follow" : "noindex, nofollow"
			},
			{
				property: "og:type",
				content: payload.type
			},
			{
				property: "og:title",
				content: payload.title
			},
			{
				property: "og:description",
				content: payload.description
			},
			{
				property: "og:url",
				content: payload.canonical
			},
			{
				property: "og:site_name",
				content: locale === "en" ? "Academia" : "أكاديميا"
			},
			{
				property: "og:locale",
				content: localeCode
			},
			{
				property: "og:locale:alternate",
				content: alternateLocale
			},
			{
				property: "og:image",
				content: payload.image
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:title",
				content: payload.title
			},
			{
				name: "twitter:description",
				content: payload.description
			},
			{
				name: "twitter:image",
				content: payload.image
			},
			...payload.publishedTime ? [{
				property: "article:published_time",
				content: payload.publishedTime
			}] : []
		],
		links,
		scripts: [{
			type: "application/ld+json",
			children: JSON.stringify(jsonLd)
		}]
	};
}
function upsertMeta(attribute, key, content) {
	const selector = `meta[data-academia-seo="true"][${attribute}="${key}"]`;
	let element = document.head.querySelector(selector);
	if (!element) {
		element = document.createElement("meta");
		element.setAttribute("data-academia-seo", "true");
		element.setAttribute(attribute, key);
		document.head.appendChild(element);
	}
	element.content = content;
}
function upsertLink(rel, href, hreflang) {
	const selector = `link[data-academia-seo="true"][rel="${rel}"]${hreflang ? `[hreflang="${hreflang}"]` : ""}`;
	let element = document.head.querySelector(selector);
	if (!element) {
		element = document.createElement("link");
		element.setAttribute("data-academia-seo", "true");
		element.rel = rel;
		if (hreflang) element.hreflang = hreflang;
		document.head.appendChild(element);
	}
	element.href = href;
}
function upsertJsonLd(payload) {
	const id = "academia-seo-jsonld";
	let element = document.getElementById(id);
	if (!element) {
		element = document.createElement("script");
		element.id = id;
		element.type = "application/ld+json";
		element.setAttribute("data-academia-seo", "true");
		document.head.appendChild(element);
	}
	const data = payload.type === "article" ? {
		"@context": "https://schema.org",
		"@type": "Article",
		headline: payload.title,
		description: payload.description,
		datePublished: payload.publishedTime,
		inLanguage: payload.locale,
		mainEntityOfPage: payload.canonical,
		image: payload.image,
		publisher: {
			"@type": "Organization",
			name: "Academia",
			url: SITE_URL
		}
	} : {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: payload.locale === "en" ? "Academia" : "أكاديميا",
		description: payload.description,
		url: payload.canonical,
		inLanguage: payload.locale
	};
	element.textContent = JSON.stringify(data);
}
function applySeo(payload) {
	if (typeof document === "undefined") return;
	document.title = payload.title;
	upsertMeta("name", "description", payload.description);
	upsertMeta("name", "robots", payload.indexable ? "index, follow" : "noindex, nofollow");
	upsertMeta("name", "theme-color", "#1E2761");
	upsertMeta("name", "application-name", "Academia");
	upsertMeta("property", "og:type", payload.type);
	upsertMeta("property", "og:title", payload.title);
	upsertMeta("property", "og:description", payload.description);
	upsertMeta("property", "og:url", payload.canonical);
	upsertMeta("property", "og:site_name", payload.locale === "en" ? "Academia" : "أكاديميا");
	upsertMeta("property", "og:locale", payload.locale === "en" ? "en_US" : "ar");
	upsertMeta("property", "og:locale:alternate", payload.locale === "en" ? "ar" : "en_US");
	upsertMeta("property", "og:image", payload.image);
	upsertMeta("name", "twitter:card", "summary_large_image");
	upsertMeta("name", "twitter:title", payload.title);
	upsertMeta("name", "twitter:description", payload.description);
	upsertMeta("name", "twitter:image", payload.image);
	if (payload.publishedTime) upsertMeta("property", "article:published_time", payload.publishedTime);
	upsertLink("canonical", payload.canonical);
	if (payload.indexable) {
		upsertLink("alternate", localizedUrl(payload.pathname, "ar"), "ar");
		upsertLink("alternate", localizedUrl(payload.pathname, "en"), "en");
		upsertLink("alternate", localizedUrl(payload.pathname, "ar"), "x-default");
	}
	upsertJsonLd(payload);
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/rbac-static-data-CrTs4qIY.js
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
new Set(fullGrant(PAGES)), new Set(fullGrant([...pagesForModule("m-supervisor"), ...pagesForModule("m-account")])), new Set(fullGrant([...pagesForModule("m-teacher"), ...pagesForModule("m-account")])), new Set(fullGrant([...pagesForModule("m-parent"), ...pagesForModule("m-account")])), new Set(fullGrant([...pagesForModule("m-student"), ...pagesForModule("m-account")]));
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
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-DK5KNs7n.js
var import_jsx_runtime = require_jsx_runtime();
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
var THEME_STORAGE_KEY = "academia.theme";
var LOCALE_STORAGE_KEY = "academia.locale";
/** Inline, runs before hydration so there is no flash of the wrong theme/dir. */
var preferencesBootScript = `(function(){try{
var t=localStorage.getItem("${THEME_STORAGE_KEY}")||"auto";
var d=t==="dark"||(t!=="light"&&window.matchMedia("(prefers-color-scheme: dark)").matches);
var r=document.documentElement;
r.setAttribute("data-theme",d?"dark":"light");
r.classList.toggle("dark",d);
var q=new URLSearchParams(window.location.search).get("lang");
var l=q==="ar"||q==="en"?q:(localStorage.getItem("${LOCALE_STORAGE_KEY}")||"ar");
if(l!=="ar"&&l!=="en")l="ar";
r.setAttribute("lang",l);
r.setAttribute("dir",l==="en"?"ltr":"rtl");
}catch(e){}})();`;
function resolveDark(pref) {
	if (pref === "dark") return true;
	if (pref === "light") return false;
	return typeof window !== "undefined" ? window.matchMedia("(prefers-color-scheme: dark)").matches : true;
}
function syncLocaleUrl(locale) {
	if (typeof window === "undefined") return;
	const url = new URL(window.location.href);
	if (locale === "en") url.searchParams.set("lang", "en");
	else url.searchParams.delete("lang");
	window.history.replaceState(window.history.state, "", url);
}
function readStoredTheme() {
	if (typeof window === "undefined") return "auto";
	const stored = localStorage.getItem(THEME_STORAGE_KEY);
	return stored === "light" || stored === "dark" || stored === "auto" ? stored : "auto";
}
function readStoredLocale() {
	if (typeof window === "undefined") return "ar";
	const queryLocale = new URLSearchParams(window.location.search).get("lang");
	if (queryLocale && SUPPORTED_LOCALES.includes(queryLocale)) return queryLocale;
	const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
	return stored && SUPPORTED_LOCALES.includes(stored) ? stored : "ar";
}
function PreferencesState({ children }) {
	const { i18n: instance } = useTranslation();
	const [theme, setThemeState] = (0, import_react.useState)(readStoredTheme);
	const [resolvedTheme, setResolvedTheme] = (0, import_react.useState)(() => resolveDark(readStoredTheme()) ? "dark" : "light");
	const [locale, setLocaleState] = (0, import_react.useState)(readStoredLocale);
	const [switchingLocale, setSwitchingLocale] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (theme !== "auto") return;
		const mq = window.matchMedia("(prefers-color-scheme: dark)");
		const apply = () => setResolvedTheme(mq.matches ? "dark" : "light");
		apply();
		mq.addEventListener("change", apply);
		return () => mq.removeEventListener("change", apply);
	}, [theme]);
	(0, import_react.useEffect)(() => {
		const root = document.documentElement;
		root.setAttribute("data-theme", resolvedTheme);
		root.classList.toggle("dark", resolvedTheme === "dark");
	}, [resolvedTheme]);
	(0, import_react.useEffect)(() => {
		const root = document.documentElement;
		root.setAttribute("lang", locale);
		root.setAttribute("dir", LOCALE_DIR[locale]);
		if (instance.language !== locale) instance.changeLanguage(locale);
	}, [locale, instance]);
	const setTheme = (0, import_react.useCallback)((pref) => {
		setThemeState(pref);
		setResolvedTheme(resolveDark(pref) ? "dark" : "light");
		localStorage.setItem(THEME_STORAGE_KEY, pref);
	}, []);
	const setLocale = (0, import_react.useCallback)((next) => {
		const persist = (value) => {
			localStorage.setItem(LOCALE_STORAGE_KEY, value);
			syncLocaleUrl(value);
		};
		if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			setLocaleState(next);
			persist(next);
			return;
		}
		setSwitchingLocale(true);
		window.setTimeout(() => {
			setLocaleState(next);
			persist(next);
			window.setTimeout(() => setSwitchingLocale(false), 240);
		}, 220);
	}, []);
	const value = (0, import_react.useMemo)(() => ({
		theme,
		resolvedTheme,
		setTheme,
		toggleTheme: () => setTheme(resolvedTheme === "dark" ? "light" : "dark"),
		locale,
		setLocale,
		toggleLocale: () => setLocale(locale === "ar" ? "en" : "ar"),
		dir: LOCALE_DIR[locale],
		switchingLocale
	}), [
		theme,
		resolvedTheme,
		setTheme,
		locale,
		setLocale,
		switchingLocale
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PreferencesContext.Provider, {
		value,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-locale-switching": switchingLocale ? "true" : "false",
			className: "locale-fade",
			children
		}), switchingLocale && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"aria-hidden": "true",
			className: "pointer-events-none fixed inset-0 z-[80] flex items-center justify-center bg-background/45 backdrop-blur-[2px]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-6 animate-spin rounded-full border-2 border-primary/30 border-t-primary" })
		})]
	});
}
function PreferencesProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(I18nextProvider, {
		i18n: i18n_default,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreferencesState, { children })
	});
}
var styles_default = "/assets/styles-Buy79RNa.css";
var LAST_ACTIVITY_KEY = "academia.lastActivity";
var ACTIVITY_EVENTS = [
	"pointerdown",
	"keydown",
	"scroll",
	"touchstart",
	"visibilitychange"
];
/**
* الجلسة نفسها محفوظة (persistSession) فتبقى بعد الريلود أو إغلاق المتصفح،
* لكن الخمول أكثر من ساعتين ينهيها فوراً عند العودة أو أثناء الجلسة.
*/
function useIdleLogout() {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const signingOut = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined") return;
		const touch = () => {
			if (document.visibilityState === "hidden") return;
			localStorage.setItem(LAST_ACTIVITY_KEY, String(Date.now()));
		};
		const expire = async () => {
			if (signingOut.current) return;
			signingOut.current = true;
			if (!isAuthenticated()) {
				signingOut.current = false;
				return;
			}
			localStorage.removeItem(LAST_ACTIVITY_KEY);
			await logout();
			toast.warning(t("session.expired"));
			navigate({
				to: "/login",
				replace: true
			});
			signingOut.current = false;
		};
		const check = () => {
			const raw = Number(localStorage.getItem("academia.lastActivity") ?? 0);
			if (!raw) {
				touch();
				return;
			}
			if (Date.now() - raw > 72e5) expire();
		};
		check();
		touch();
		ACTIVITY_EVENTS.forEach((e) => window.addEventListener(e, touch, { passive: true }));
		const timer = window.setInterval(check, 6e4);
		return () => {
			ACTIVITY_EVENTS.forEach((e) => window.removeEventListener(e, touch));
			window.clearInterval(timer);
		};
	}, [navigate, t]);
	(0, import_react.useEffect)(() => {
		if (typeof window !== "undefined") localStorage.setItem(LAST_ACTIVITY_KEY, String(Date.now()));
	}, [pathname]);
}
function IdleLogoutWatcher() {
	useIdleLogout();
	return null;
}
var CONSENT_KEY$1 = "academia.cookieConsent";
/** بانر الموافقة — يظهر أول زيارة فقط، ولا يُشغَّل أي تتبّع تحليلي قبل الموافقة. */
function CookieConsent() {
	const { t } = useTranslation();
	const [visible, setVisible] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!localStorage.getItem(CONSENT_KEY$1)) setVisible(true);
	}, []);
	const decide = (value) => {
		localStorage.setItem(CONSENT_KEY$1, value);
		window.dispatchEvent(new CustomEvent("academia:cookie-consent", { detail: value }));
		setVisible(false);
	};
	if (!visible) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "dialog",
		"aria-label": t("cookie.title"),
		className: "fixed inset-x-3 bottom-[calc(0.75rem+env(safe-area-inset-bottom))] z-[60] mx-auto max-h-[calc(100dvh-1.5rem)] max-w-3xl overflow-y-auto rounded-2xl border border-border bg-card/95 p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] shadow-lg backdrop-blur md:inset-x-6 md:bottom-6 md:pb-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-3 md:flex-row md:items-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-primary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cookie, { className: "size-4" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-bold text-foreground",
						children: t("cookie.title")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-xs leading-relaxed text-muted-foreground",
						children: [
							t("cookie.text"),
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/privacy",
								className: "font-semibold text-primary hover:underline",
								children: t("cookie.more")
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex shrink-0 gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => decide("declined"),
						className: "rounded-xl border border-border px-3 py-2 text-xs font-bold text-muted-foreground transition-colors hover:text-foreground",
						children: t("cookie.decline")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => decide("accepted"),
						className: "rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground transition-opacity hover:opacity-90",
						children: t("cookie.accept")
					})]
				})
			]
		})
	});
}
/** رسمة ترحيبية عامة — سطح مكتب + رسم بياني صاعد. تُستخدم ببانرات لوحات التحكم. */
function WelcomeIllustration({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 200 160",
		fill: "none",
		className,
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: "100",
				cy: "146",
				rx: "72",
				ry: "8",
				className: "fill-foreground/5"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "34",
				y: "34",
				width: "132",
				height: "88",
				rx: "12",
				className: "fill-card stroke-border",
				strokeWidth: "2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "34",
				y: "34",
				width: "132",
				height: "22",
				rx: "12",
				className: "fill-secondary"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "46",
				cy: "45",
				r: "3",
				className: "fill-destructive/60"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "56",
				cy: "45",
				r: "3",
				className: "fill-primary/60"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "66",
				cy: "45",
				r: "3",
				className: "fill-success/60"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M52 100 L74 82 L94 96 L120 66 L146 78",
				className: "stroke-primary",
				strokeWidth: "4",
				strokeLinecap: "round",
				strokeLinejoin: "round",
				fill: "none"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "146",
				cy: "78",
				r: "5",
				className: "fill-primary"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "52",
				y: "104",
				width: "20",
				height: "10",
				rx: "3",
				className: "fill-info/25"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "78",
				y: "104",
				width: "20",
				height: "10",
				rx: "3",
				className: "fill-success/25"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "104",
				y: "104",
				width: "20",
				height: "10",
				rx: "3",
				className: "fill-primary/25"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "164",
				cy: "30",
				r: "14",
				className: "fill-primary/15"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "26",
				cy: "120",
				r: "10",
				className: "fill-success/15"
			})
		]
	});
}
/** رسمة "صندوق فاضي" — لحالات عدم وجود بيانات (EmptyState). */
function EmptyIllustration({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 160 120",
		fill: "none",
		className,
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: "80",
				cy: "100",
				rx: "46",
				ry: "7",
				className: "fill-foreground/5"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M40 44 L80 28 L120 44 L120 84 L80 100 L40 84 Z",
				className: "fill-card stroke-border",
				strokeWidth: "2",
				strokeLinejoin: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M40 44 L80 60 L120 44",
				className: "stroke-border",
				strokeWidth: "2",
				fill: "none"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M80 60 L80 100",
				className: "stroke-border",
				strokeWidth: "2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "80",
				cy: "60",
				r: "16",
				className: "fill-primary/12"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M73 60 L78 65 L88 54",
				className: "stroke-primary",
				strokeWidth: "2.5",
				strokeLinecap: "round",
				strokeLinejoin: "round",
				fill: "none",
				opacity: "0.4"
			})
		]
	});
}
/** رسمة 404 — بوصلة ضائعة. لصفحة "غير موجود". */
function NotFoundIllustration({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 200 160",
		fill: "none",
		className,
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: "100",
				cy: "146",
				rx: "60",
				ry: "7",
				className: "fill-foreground/5"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "100",
				cy: "80",
				r: "52",
				className: "fill-card stroke-border",
				strokeWidth: "2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "100",
				cy: "80",
				r: "38",
				className: "stroke-border",
				strokeWidth: "1.5",
				fill: "none"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M84 96 L92 68 L120 60 L108 92 Z",
				className: "fill-primary/70"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "100",
				cy: "80",
				r: "5",
				className: "fill-primary"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "150",
				cy: "40",
				r: "10",
				className: "fill-info/20"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "42",
				cy: "112",
				r: "8",
				className: "fill-success/20"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M100 20 L100 28 M100 132 L100 140 M40 80 L48 80 M152 80 L160 80",
				className: "stroke-muted-foreground",
				strokeWidth: "2",
				strokeLinecap: "round"
			})
		]
	});
}
/**
* رسمة "المكتبة الذكية" — تصنيف شجري (فصل ← مادة ← وحدة ← درس) بشكل بصري،
* بدل أيقونة كتاب عامة. تُستخدم بالبطاقة الرئيسية (Flagship) بقسم مزايا الرئيسية.
*/
function LibraryTreeIllustration({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 220 150",
		fill: "none",
		className,
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "18",
				y: "18",
				width: "70",
				height: "24",
				rx: "8",
				className: "fill-primary/15"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "53",
				y: "34",
				textAnchor: "middle",
				className: "fill-primary text-[10px] font-bold",
				children: "الفصل"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M53 42 L53 56",
				className: "stroke-border",
				strokeWidth: "2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M53 56 H150",
				className: "stroke-border",
				strokeWidth: "2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M78 56 V66 M126 56 V66 M150 56 V66",
				className: "stroke-border",
				strokeWidth: "2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "46",
				y: "66",
				width: "64",
				height: "22",
				rx: "7",
				className: "fill-card stroke-border",
				strokeWidth: "1.5"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "78",
				y: "80",
				textAnchor: "middle",
				className: "fill-foreground text-[9px] font-semibold",
				children: "رياضيات"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "120",
				y: "66",
				width: "64",
				height: "22",
				rx: "7",
				className: "fill-card stroke-border",
				strokeWidth: "1.5"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "152",
				y: "80",
				textAnchor: "middle",
				className: "fill-foreground text-[9px] font-semibold",
				children: "علوم"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M78 88 V98",
				className: "stroke-border",
				strokeWidth: "1.5"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "52",
				y: "98",
				width: "52",
				height: "18",
				rx: "6",
				className: "fill-primary/10"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "78",
				y: "110",
				textAnchor: "middle",
				className: "fill-primary text-[8px] font-medium",
				children: "وحدة 3"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M152 88 V98",
				className: "stroke-border",
				strokeWidth: "1.5"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "126",
				y: "98",
				width: "52",
				height: "18",
				rx: "6",
				className: "fill-success/10"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "152",
				y: "110",
				textAnchor: "middle",
				className: "fill-success text-[8px] font-medium",
				children: "وحدة 1"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "192",
				cy: "30",
				r: "12",
				className: "fill-info/15"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "24",
				cy: "120",
				r: "8",
				className: "fill-success/15"
			})
		]
	});
}
/**
* رسمة "محاكي الامتحان" — ورقة امتحان بمؤقّت وعلامة صح، بدل أيقونة روبوت عامة.
* تُستخدم بالبطاقة العريضة الخاصة بمحاكي الامتحان الوزاري بقسم مزايا الرئيسية.
*/
function ExamSimIllustration({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 220 120",
		fill: "none",
		className,
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "24",
				y: "14",
				width: "98",
				height: "94",
				rx: "10",
				className: "fill-card stroke-border",
				strokeWidth: "2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "38",
				y: "30",
				width: "70",
				height: "6",
				rx: "3",
				className: "fill-foreground/15"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "38",
				y: "44",
				width: "52",
				height: "6",
				rx: "3",
				className: "fill-foreground/10"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "42",
				cy: "62",
				r: "5",
				className: "fill-success/20 stroke-success",
				strokeWidth: "1.5"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M39.5 62 L41.5 64 L45 59.5",
				className: "stroke-success",
				strokeWidth: "1.5",
				strokeLinecap: "round",
				fill: "none"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "52",
				y: "59",
				width: "48",
				height: "6",
				rx: "3",
				className: "fill-foreground/10"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "42",
				cy: "80",
				r: "5",
				className: "fill-destructive/15 stroke-destructive/60",
				strokeWidth: "1.5"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "52",
				y: "77",
				width: "40",
				height: "6",
				rx: "3",
				className: "fill-foreground/10"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "164",
				cy: "46",
				r: "34",
				className: "fill-primary/8 stroke-primary/40",
				strokeWidth: "2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M164 46 L164 26 M164 46 L180 54",
				className: "stroke-primary",
				strokeWidth: "3",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "164",
				cy: "46",
				r: "3",
				className: "fill-primary"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "140",
				y: "88",
				width: "48",
				height: "20",
				rx: "10",
				className: "fill-success/15"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "164",
				y: "101",
				textAnchor: "middle",
				className: "fill-success text-[9px] font-bold",
				children: "92%"
			})
		]
	});
}
/** رسمة "من الرفع للنشر" — تدفق مرئي (رفع → مراجعة → منشور) لصفحة "للمعلمين". */
function ContentFlowIllustration({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 320 140",
		fill: "none",
		className,
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "10",
				y: "44",
				width: "84",
				height: "60",
				rx: "12",
				className: "fill-card stroke-border",
				strokeWidth: "2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M52 66 V86 M42 76 L52 66 L62 76",
				className: "stroke-primary",
				strokeWidth: "3",
				strokeLinecap: "round",
				strokeLinejoin: "round",
				fill: "none"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "52",
				y: "118",
				textAnchor: "middle",
				className: "fill-muted-foreground text-[9px] font-medium",
				children: "رفع المحتوى"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M100 74 H128",
				className: "stroke-border",
				strokeWidth: "2",
				strokeDasharray: "4 4"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M120 68 L128 74 L120 80",
				className: "stroke-border",
				strokeWidth: "2",
				fill: "none"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "132",
				y: "34",
				width: "84",
				height: "70",
				rx: "12",
				className: "fill-info/8 stroke-info/40",
				strokeWidth: "2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "174",
				cy: "60",
				r: "14",
				className: "fill-info/15"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M168 60 h12 M168 66 h8",
				className: "stroke-info",
				strokeWidth: "2",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "174",
				y: "118",
				textAnchor: "middle",
				className: "fill-muted-foreground text-[9px] font-medium",
				children: "مراجعة أساسية"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M222 74 H250",
				className: "stroke-border",
				strokeWidth: "2",
				strokeDasharray: "4 4"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M242 68 L250 74 L242 80",
				className: "stroke-border",
				strokeWidth: "2",
				fill: "none"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "254",
				y: "44",
				width: "60",
				height: "60",
				rx: "12",
				className: "fill-success/10 stroke-success/40",
				strokeWidth: "2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M270 74 L280 84 L298 64",
				className: "stroke-success",
				strokeWidth: "3",
				strokeLinecap: "round",
				strokeLinejoin: "round",
				fill: "none"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "284",
				y: "118",
				textAnchor: "middle",
				className: "fill-muted-foreground text-[9px] font-medium",
				children: "منشور"
			})
		]
	});
}
/** رسمة "اختيار الخطة" — مسارين (مجاني/بريميوم) يلتقيان بنفس الوجهة. لصفحة الأسعار. */
function PlanChoiceIllustration({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 260 100",
		fill: "none",
		className,
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M20 80 Q90 80 130 50",
				className: "stroke-border",
				strokeWidth: "2.5",
				strokeDasharray: "5 5",
				fill: "none"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M20 20 Q90 20 130 50",
				className: "stroke-primary/70",
				strokeWidth: "2.5",
				fill: "none"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "20",
				cy: "80",
				r: "7",
				className: "fill-card stroke-border",
				strokeWidth: "2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "20",
				cy: "20",
				r: "7",
				className: "fill-primary/15 stroke-primary",
				strokeWidth: "2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "130",
				cy: "50",
				r: "10",
				className: "fill-primary"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M126 50 L129 53 L135 46",
				className: "stroke-primary-foreground",
				strokeWidth: "2",
				strokeLinecap: "round",
				strokeLinejoin: "round",
				fill: "none"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M148 50 H230",
				className: "stroke-border",
				strokeWidth: "2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M222 44 L230 50 L222 56",
				className: "stroke-border",
				strokeWidth: "2",
				fill: "none"
			})
		]
	});
}
/**
* رسمة "بنك الأخطاء" — بطاقة سؤال مصغّرة عليها علامة خطأ وتاغ "محفوظ للمراجعة"،
* بدل أيقونة X عامة. بيانات توضيحية (demo) فقط، مافي رقم حقيقي.
*/
function MistakeBankIllustration({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 220 90",
		fill: "none",
		className,
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "14",
				y: "14",
				width: "130",
				height: "62",
				rx: "12",
				className: "fill-card stroke-border",
				strokeWidth: "2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "28",
				y: "28",
				width: "70",
				height: "6",
				rx: "3",
				className: "fill-foreground/15"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "28",
				y: "42",
				width: "90",
				height: "6",
				rx: "3",
				className: "fill-foreground/10"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "122",
				cy: "31",
				r: "9",
				className: "fill-destructive/15 stroke-destructive/60",
				strokeWidth: "1.5"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M118.5 27.5 L125.5 34.5 M125.5 27.5 L118.5 34.5",
				className: "stroke-destructive",
				strokeWidth: "1.6",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "28",
				y: "56",
				width: "46",
				height: "14",
				rx: "7",
				className: "fill-primary/10"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "51",
				y: "66",
				textAnchor: "middle",
				className: "fill-primary text-[8px] font-bold",
				children: "للمراجعة"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "160",
				y: "10",
				width: "50",
				height: "70",
				rx: "10",
				className: "fill-primary/6 stroke-primary/25",
				strokeWidth: "1.5",
				strokeDasharray: "3 3"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M175 30 v14 M168 37 h14",
				className: "stroke-primary/50",
				strokeWidth: "2",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "185",
				y: "66",
				textAnchor: "middle",
				className: "fill-muted-foreground text-[7px]",
				children: "يتجمّع هنا"
			})
		]
	});
}
/**
* رسمة "مراجعة 15 دقيقة" — قرص مؤقّت مقسوم لثلاث حصص قصيرة، بدل أيقونة ساعة عامة.
* بيانات توضيحية (demo) فقط.
*/
function ReviewSessionIllustration({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 220 90",
		fill: "none",
		className,
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "45",
				cy: "45",
				r: "32",
				className: "fill-card stroke-border",
				strokeWidth: "2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M45 45 L45 20 A25 25 0 0 1 66 57 Z",
				className: "fill-primary/20"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M45 45 L45 20",
				className: "stroke-primary",
				strokeWidth: "2.5",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M45 45 L66 57",
				className: "stroke-primary",
				strokeWidth: "2.5",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "45",
				cy: "45",
				r: "3",
				className: "fill-primary"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "45",
				y: "80",
				textAnchor: "middle",
				className: "fill-muted-foreground text-[8px] font-medium",
				children: "15 دقيقة"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "98",
					y: "18",
					width: "108",
					height: "14",
					rx: "7",
					className: "fill-success/12"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "98",
					y: "18",
					width: "70",
					height: "14",
					rx: "7",
					className: "fill-success/40"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "98",
					y: "38",
					width: "108",
					height: "14",
					rx: "7",
					className: "fill-primary/10"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "98",
					y: "38",
					width: "40",
					height: "14",
					rx: "7",
					className: "fill-primary/40"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "98",
					y: "58",
					width: "108",
					height: "14",
					rx: "7",
					className: "fill-border/60"
				})
			] })
		]
	});
}
/**
* رسمة "تقرير ولي الأمر" — بطاقة تقرير أسبوعي مختصر + رمز خصوصية (قفل)،
* تجسّد الفكرتين الأساسيتين لصفحة أولياء الأمور: ملخص واضح + خصوصية الطالب.
*/
function ParentReportIllustration({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 260 120",
		fill: "none",
		className,
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "16",
				y: "14",
				width: "150",
				height: "92",
				rx: "14",
				className: "fill-card stroke-border",
				strokeWidth: "2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "32",
				y: "30",
				width: "60",
				height: "7",
				rx: "3.5",
				className: "fill-foreground/15"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "32",
				y: "46",
				width: "118",
				height: "10",
				rx: "5",
				className: "fill-success/12"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "32",
				y: "46",
				width: "82",
				height: "10",
				rx: "5",
				className: "fill-success/45"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "32",
				y: "64",
				width: "118",
				height: "10",
				rx: "5",
				className: "fill-primary/10"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "32",
				y: "64",
				width: "54",
				height: "10",
				rx: "5",
				className: "fill-primary/45"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "32",
				y: "84",
				width: "46",
				height: "14",
				rx: "7",
				className: "fill-info/12"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "55",
				y: "94",
				textAnchor: "middle",
				className: "fill-info text-[8px] font-bold",
				children: "أسبوعي"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "210",
				cy: "60",
				r: "36",
				className: "fill-success/8 stroke-success/30",
				strokeWidth: "2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M210 42 a12 12 0 0 0-12 12 v6 h24 v-6 a12 12 0 0 0-12-12 Z",
				className: "fill-none stroke-success",
				strokeWidth: "2.5",
				strokeLinejoin: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "196",
				y: "58",
				width: "28",
				height: "20",
				rx: "4",
				className: "fill-success/20 stroke-success",
				strokeWidth: "2"
			})
		]
	});
}
/** رسمة "غير مصرح" — قفل. لصفحة Forbidden. */
function ForbiddenIllustration({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 160 140",
		fill: "none",
		className,
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: "80",
				cy: "122",
				rx: "50",
				ry: "7",
				className: "fill-foreground/5"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "46",
				y: "62",
				width: "68",
				height: "52",
				rx: "10",
				className: "fill-card stroke-border",
				strokeWidth: "2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M58 62 V46 a22 22 0 0 1 44 0 V62",
				className: "stroke-border",
				strokeWidth: "6",
				fill: "none",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "80",
				cy: "86",
				r: "8",
				className: "fill-destructive/70"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "76",
				y: "90",
				width: "8",
				height: "14",
				rx: "3",
				className: "fill-destructive/70"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "130",
				cy: "34",
				r: "9",
				className: "fill-primary/15"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "28",
				cy: "100",
				r: "7",
				className: "fill-info/15"
			})
		]
	});
}
async function currentUserHome() {
	if (!isAuthenticated()) return null;
	if (!isDemoSession()) {
		const profile = getStoredProfile();
		return roleHome(profile?.roleName ?? null, profile?.roleId === 1);
	}
	const userId = getStoredUserId();
	if (!userId) return "/";
	const user = USERS.find((u) => u.id === userId);
	const role = user ? ROLES.find((r) => r.id === user.role_id) : null;
	const isAdmin = role?.name === "مدير عام";
	return roleHome(role?.name, isAdmin);
}
/** Keeps the document head aligned with the current route and selected locale. */
function SeoManager() {
	const location = useLocation();
	const { locale } = usePreferences();
	(0, import_react.useEffect)(() => {
		applySeo(getSeoForPath(location.pathname, locale));
	}, [location.pathname, locale]);
	return null;
}
var CONSENT_KEY = "academia.cookieConsent";
var consentGranted = false;
var initialized = false;
var listenerAttached = false;
function readConsent() {
	if (typeof window === "undefined") return false;
	return localStorage.getItem(CONSENT_KEY) === "accepted";
}
function tryInitPosthog() {
	if (!consentGranted) return;
	if (initialized) {
		if (dd.has_opted_out_capturing()) dd.opt_in_capturing();
		return;
	}
	const key = env.POSTHOG_KEY;
	if (!key) return;
	dd.init(key, {
		api_host: env.POSTHOG_HOST,
		person_profiles: "identified_only",
		capture_pageview: true,
		capture_pageleave: true
	});
	initialized = true;
}
function initAnalytics() {
	if (typeof window === "undefined") return;
	consentGranted = readConsent();
	if (consentGranted) tryInitPosthog();
	if (!listenerAttached) {
		window.addEventListener("academia:cookie-consent", (e) => {
			consentGranted = e.detail === "accepted";
			if (consentGranted) tryInitPosthog();
			else if (initialized) dd.opt_out_capturing();
		});
		listenerAttached = true;
	}
}
function trackEvent(name, props) {
	if (!consentGranted) return;
	if (env.DEV) console.info("[analytics]", name, props ?? {});
	if (initialized) dd.capture(name, props);
}
function identifyUser(userId, traits) {
	if (!consentGranted) return;
	if (env.DEV) console.info("[analytics] identify", userId, traits ?? {});
	if (initialized) dd.identify(userId, traits);
}
function NotFoundComponent() {
	const { t } = useTranslation();
	const [home, setHome] = (0, import_react.useState)("/");
	(0, import_react.useEffect)(() => {
		currentUserHome().then((next) => setHome(next ?? "/"));
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "surface-mesh flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "shadow-elevation-2 max-w-md rounded-3xl border border-border bg-card p-8 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotFoundIllustration, { className: "mx-auto h-32 w-auto" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-4 font-display text-6xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-3 text-xl font-bold text-foreground",
					children: t("errors.notFoundTitle")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: t("errors.notFoundText")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-7",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: home,
						className: "btn-shine hover-press inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground",
						children: t("errors.backHome")
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	const { t } = useTranslation();
	(0, import_react.useEffect)(() => {}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "shadow-elevation-2 max-w-md rounded-3xl border border-border bg-card p-8 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mx-auto flex size-14 items-center justify-center rounded-full bg-destructive/12 text-destructive",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
						viewBox: "0 0 24 24",
						fill: "none",
						className: "size-7",
						"aria-hidden": true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z",
							stroke: "currentColor",
							strokeWidth: "2",
							strokeLinecap: "round",
							strokeLinejoin: "round"
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-4 text-xl font-bold text-foreground",
					children: t("errors.crashTitle")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: t("errors.crashText")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-7 flex flex-wrap justify-center gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "hover-press inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground",
						children: t("errors.retry")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "hover-press inline-flex items-center justify-center rounded-xl border border-border bg-background px-6 py-3 text-sm font-bold text-foreground hover:bg-secondary",
						children: t("errors.backHome")
					})]
				})
			]
		})
	});
}
var Route$74 = createRootRouteWithContext()({
	head: (ctx) => {
		const seo = createSeoHead("/", localeFromSearch(ctx.match.search));
		return {
			meta: [
				{ charSet: "utf-8" },
				{
					name: "viewport",
					content: "width=device-width, initial-scale=1"
				},
				...seo.meta
			],
			links: [
				...seo.links,
				{
					rel: "manifest",
					href: "/manifest.json"
				},
				{
					rel: "stylesheet",
					href: styles_default
				},
				{
					rel: "preconnect",
					href: "https://fonts.googleapis.com"
				},
				{
					rel: "preconnect",
					href: "https://fonts.gstatic.com",
					crossOrigin: "anonymous"
				},
				{
					rel: "stylesheet",
					href: "https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800&family=Tajawal:wght@400;500;700;800;900&family=Reem+Kufi:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap"
				},
				{
					rel: "icon",
					href: "/favicon.svg",
					type: "image/svg+xml"
				},
				{
					rel: "apple-touch-icon",
					href: "/icons/icon-192.png"
				}
			],
			scripts: seo.scripts
		};
	},
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "ar",
		dir: "rtl",
		"data-theme": "dark",
		className: "dark",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("head", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", { dangerouslySetInnerHTML: { __html: preferencesBootScript } })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function AuthSync() {
	const router = useRouter();
	const queryClient = useQueryClient();
	(0, import_react.useEffect)(() => {
		const onAuthChanged = () => {
			router.invalidate();
			queryClient.invalidateQueries();
		};
		window.addEventListener(AUTH_EVENT, onAuthChanged);
		return () => window.removeEventListener(AUTH_EVENT, onAuthChanged);
	}, [router, queryClient]);
	return null;
}
function ServiceWorkerRegistrar() {
	(0, import_react.useEffect)(() => {
		if ("serviceWorker" in navigator) navigator.serviceWorker.register("/sw.js").catch(() => {});
	}, []);
	return null;
}
function RootComponent() {
	const { queryClient } = Route$74.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PreferencesProvider, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeoManager, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonitoringInit, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthSync, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceWorkerRegistrar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IdleLogoutWatcher, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CookieConsent, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {
				position: "top-center",
				richColors: true
			})
		] })
	});
}
/** تهيئة تتبّع الاستخدام (PostHog) مرة وحدة عند إقلاع التطبيق — Sentry صار
* يتهيأ تلقائيًا عبر src/instrument.client.ts (جهة العميل) وsrc/server.ts
* (جهة السيرفر)، ما بحتاج تهيئة يدوية هون. */
function MonitoringInit() {
	(0, import_react.useEffect)(() => {
		initAnalytics();
	}, []);
	return null;
}
var $$splitComponentImporter$72 = () => import("./routes-YYh0qxNo.mjs");
var Route$73 = createFileRoute("/")({
	head: (ctx) => createSeoHead("/", localeFromSearch(ctx.match.search)),
	component: lazyRouteComponent($$splitComponentImporter$72, "component")
});
var $$splitComponentImporter$71 = () => import("./403-jHwDVEFU.mjs");
var Route$72 = createFileRoute("/403")({
	head: (ctx) => createSeoHead("/403", localeFromSearch(ctx.match.search)),
	component: lazyRouteComponent($$splitComponentImporter$71, "component")
});
var $$splitComponentImporter$70 = () => import("./route-Djv4n6Px.mjs");
var Route$71 = createFileRoute("/_authenticated")({
	ssr: false,
	beforeLoad: async () => {
		if (env.ENABLE_DEMO_LOGIN && isDemoSession()) return { user: { id: getStoredUserId() ?? "u-demo" } };
		if (!isAuthenticated() || !await verifyServerSession()) throw redirect({ to: "/login" });
		const userId = getStoredUserId();
		if (!userId) throw redirect({ to: "/login" });
		return { user: { id: userId } };
	},
	component: lazyRouteComponent($$splitComponentImporter$70, "component")
});
var $$splitComponentImporter$69 = () => import("./about-BvIZs_xr.mjs");
var Route$70 = createFileRoute("/about")({
	head: (ctx) => createSeoHead("/about", localeFromSearch(ctx.match.search)),
	component: lazyRouteComponent($$splitComponentImporter$69, "component")
});
var $$splitComponentImporter$68 = () => import("./blog-BeNR5XLW.mjs");
var Route$69 = createFileRoute("/blog")({
	head: (ctx) => createSeoHead("/blog", localeFromSearch(ctx.match.search)),
	component: lazyRouteComponent($$splitComponentImporter$68, "component")
});
var $$splitComponentImporter$67 = () => import("./contact-CyQptF4B.mjs");
var Route$68 = createFileRoute("/contact")({
	head: (ctx) => createSeoHead("/contact", localeFromSearch(ctx.match.search)),
	component: lazyRouteComponent($$splitComponentImporter$67, "component")
});
var $$splitComponentImporter$66 = () => import("./courses-B-AssEw-.mjs");
var Route$67 = createFileRoute("/courses")({
	head: (ctx) => createSeoHead("/courses", localeFromSearch(ctx.match.search)),
	component: lazyRouteComponent($$splitComponentImporter$66, "component")
});
/**
* غلاف الكورس: يحاول عرض صورة حقيقية، ولو غير موجودة بعد يظهر تدرّج لوني
* حسب المادة + أول حرف من عنوانها — بديل صادق (مش placeholder عام بلا معنى)
* لحد ما تتوفر صور غلاف حقيقية بنفس المسار (courseCoverPath).
*/
var $$splitComponentImporter$65 = () => import("./for-parents-DuVpcQ63.mjs");
var Route$66 = createFileRoute("/for-parents")({
	head: (ctx) => createSeoHead("/for-parents", localeFromSearch(ctx.match.search)),
	component: lazyRouteComponent($$splitComponentImporter$65, "component")
});
var $$splitComponentImporter$64 = () => import("./for-teachers-Dwslw6R6.mjs");
var Route$65 = createFileRoute("/for-teachers")({
	head: (ctx) => createSeoHead("/for-teachers", localeFromSearch(ctx.match.search)),
	component: lazyRouteComponent($$splitComponentImporter$64, "component")
});
var $$splitComponentImporter$63 = () => import("./forgot-password-CVaJCCSv.mjs");
var Route$64 = createFileRoute("/forgot-password")({
	head: (ctx) => createSeoHead("/forgot-password", localeFromSearch(ctx.match.search)),
	component: lazyRouteComponent($$splitComponentImporter$63, "component")
});
var $$splitComponentImporter$62 = () => import("./help-t7lnbe5s.mjs");
var Route$63 = createFileRoute("/help")({
	head: (ctx) => createSeoHead("/help", localeFromSearch(ctx.match.search)),
	component: lazyRouteComponent($$splitComponentImporter$62, "component")
});
var $$splitComponentImporter$61 = () => import("./how-it-works-CWJqTu3h.mjs");
var Route$62 = createFileRoute("/how-it-works")({
	head: (ctx) => createSeoHead("/how-it-works", localeFromSearch(ctx.match.search)),
	component: lazyRouteComponent($$splitComponentImporter$61, "component")
});
var $$splitComponentImporter$60 = () => import("./login-DKVV0qGn.mjs");
var Route$61 = createFileRoute("/login")({
	ssr: false,
	beforeLoad: async () => {
		if (await currentUserHome()) throw redirect({ to: "/" });
	},
	head: (ctx) => createSeoHead("/login", localeFromSearch(ctx.match.search)),
	component: lazyRouteComponent($$splitComponentImporter$60, "component")
});
var $$splitComponentImporter$59 = () => import("./pricing-B-8oq-zq.mjs");
var Route$60 = createFileRoute("/pricing")({
	head: (ctx) => createSeoHead("/pricing", localeFromSearch(ctx.match.search)),
	component: lazyRouteComponent($$splitComponentImporter$59, "component")
});
var $$splitComponentImporter$58 = () => import("./privacy-DHySBOPN.mjs");
var Route$59 = createFileRoute("/privacy")({
	head: (ctx) => createSeoHead("/privacy", localeFromSearch(ctx.match.search)),
	component: lazyRouteComponent($$splitComponentImporter$58, "component")
});
var $$splitComponentImporter$57 = () => import("./reset-password-CUI--K7e.mjs");
var Route$58 = createFileRoute("/reset-password")({
	ssr: false,
	head: (ctx) => createSeoHead("/reset-password", localeFromSearch(ctx.match.search)),
	component: lazyRouteComponent($$splitComponentImporter$57, "component")
});
var $$splitComponentImporter$56 = () => import("./signup-DfRkUs6f.mjs");
var Route$57 = createFileRoute("/signup")({
	ssr: false,
	beforeLoad: async () => {
		if (await currentUserHome()) throw redirect({ to: "/" });
	},
	validateSearch: (search) => typeof search.invite === "string" ? { invite: search.invite } : {},
	head: (ctx) => createSeoHead("/signup", localeFromSearch(ctx.match.search)),
	component: lazyRouteComponent($$splitComponentImporter$56, "component")
});
var $$splitComponentImporter$55 = () => import("./terms-Dz11Wxgr.mjs");
var Route$56 = createFileRoute("/terms")({
	head: (ctx) => createSeoHead("/terms", localeFromSearch(ctx.match.search)),
	component: lazyRouteComponent($$splitComponentImporter$55, "component")
});
var $$splitComponentImporter$54 = () => import("./unsubscribe-DxIqx0Mj.mjs");
var Route$55 = createFileRoute("/unsubscribe")({
	head: (ctx) => createSeoHead("/unsubscribe", localeFromSearch(ctx.match.search)),
	component: lazyRouteComponent($$splitComponentImporter$54, "component")
});
var $$splitComponentImporter$53 = () => import("./verify-email-DeCycm6p.mjs");
var Route$54 = createFileRoute("/verify-email")({
	ssr: false,
	validateSearch: (search) => ({ email: typeof search.email === "string" ? search.email : void 0 }),
	head: (ctx) => createSeoHead("/verify-email", localeFromSearch(ctx.match.search)),
	component: lazyRouteComponent($$splitComponentImporter$53, "component")
});
var description$30 = "تقدّمك يُقاس بالإتقان لا بالساعات: شارات، سلاسل أيام، ونسب إتقان لكل مادة.";
var $$splitComponentImporter$52 = () => import("./achievements-B-rrFhMi.mjs");
var title$30 = "الإنجاز | أكاديميا";
var Route$53 = createFileRoute("/_authenticated/achievements")({
	head: () => ({ meta: [
		{ title: title$30 },
		{
			name: "description",
			content: description$30
		},
		{
			property: "og:title",
			content: title$30
		},
		{
			property: "og:description",
			content: description$30
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$52, "component")
});
var description$29 = "كل ما حفظته: دروس، أسئلة، ونقاشات — بمكان واحد للرجوع السريع.";
var $$splitComponentImporter$51 = () => import("./bookmarks-BQbJbcRb.mjs");
var title$29 = "المحفوظات | أكاديميا";
var Route$52 = createFileRoute("/_authenticated/bookmarks")({
	head: () => ({ meta: [
		{ title: title$29 },
		{
			name: "description",
			content: description$29
		},
		{
			property: "og:title",
			content: title$29
		},
		{
			property: "og:description",
			content: description$29
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$51, "component")
});
var description$28 = "سجّل أسئلتك بكل مادة، وتابع حالتها لحد ما توصلك إجابة.";
var $$splitComponentImporter$50 = () => import("./community-BCdqI3zo.mjs");
var title$28 = "أسئلتي | أكاديميا";
var Route$51 = createFileRoute("/_authenticated/community")({
	head: () => ({ meta: [
		{ title: title$28 },
		{
			name: "description",
			content: description$28
		},
		{
			property: "og:title",
			content: title$28
		},
		{
			property: "og:description",
			content: description$28
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$50, "component")
});
var description$27 = "كل دراستك بمكان واحد: تقدّمك اليوم، مهامك القريبة، والمواد التي تحتاج مراجعة.";
var $$splitComponentImporter$49 = () => import("./dashboard-BJQtgBUF.mjs");
var title$27 = "لوحة الطالب | أكاديميا";
var Route$50 = createFileRoute("/_authenticated/dashboard")({
	head: () => ({ meta: [
		{ title: title$27 },
		{
			name: "description",
			content: description$27
		},
		{
			property: "og:title",
			content: title$27
		},
		{
			property: "og:description",
			content: description$27
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$49, "component")
});
var description$26 = "خطّط لامتحاناتك التجريبية، وسجّل نتيجتك وتحسّنك بعد كل محاولة.";
var $$splitComponentImporter$48 = () => import("./exam-simulator-BvxDE8Tk.mjs");
var title$26 = "امتحاناتي التجريبية | أكاديميا";
var Route$49 = createFileRoute("/_authenticated/exam-simulator")({
	head: () => ({ meta: [
		{ title: title$26 },
		{
			name: "description",
			content: description$26
		},
		{
			property: "og:title",
			content: title$26
		},
		{
			property: "og:description",
			content: description$26
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$48, "component")
});
var description$25 = "دفتر متابعة مجموعات بطاقاتك: كم بطاقة عندك، كم مستحقة، وكم أتقنتها.";
var $$splitComponentImporter$47 = () => import("./flashcards-CwopBRNa.mjs");
var title$25 = "البطاقات | أكاديميا";
var Route$48 = createFileRoute("/_authenticated/flashcards")({
	head: () => ({ meta: [
		{ title: title$25 },
		{
			name: "description",
			content: description$25
		},
		{
			property: "og:title",
			content: title$25
		},
		{
			property: "og:description",
			content: description$25
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$47, "component")
});
var description$24 = "مكتبة مرتّبة: فصل ← مادة ← وحدة ← درس، لتتابع تقدّمك بكل مادة بمكان واحد.";
var $$splitComponentImporter$46 = () => import("./library-Ce9_xJVS.mjs");
var title$24 = "المكتبة | أكاديميا";
var Route$47 = createFileRoute("/_authenticated/library")({
	head: () => ({ meta: [
		{ title: title$24 },
		{
			name: "description",
			content: description$24
		},
		{
			property: "og:title",
			content: title$24
		},
		{
			property: "og:description",
			content: description$24
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$46, "component")
});
var description$23 = "سجّل الأسئلة يلي بتخطئ فيها بنفسك، وتابع تكرارها لحد ما تتقنها.";
var $$splitComponentImporter$45 = () => import("./mistakes-bank-BHXknKTn.mjs");
var title$23 = "بنك الأخطاء | أكاديميا";
var Route$46 = createFileRoute("/_authenticated/mistakes-bank")({
	head: () => ({ meta: [
		{ title: title$23 },
		{
			name: "description",
			content: description$23
		},
		{
			property: "og:title",
			content: title$23
		},
		{
			property: "og:description",
			content: description$23
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$45, "component")
});
var description$22 = "شهاداتك القابلة للتحقّق — شارك الرابط، وأي شخص يتأكد من صحّتها.";
var $$splitComponentImporter$44 = () => import("./my-certificates-BSu51GEt.mjs");
var title$22 = "شهاداتي | أكاديميا";
var Route$45 = createFileRoute("/_authenticated/my-certificates")({
	head: () => ({ meta: [
		{ title: title$22 },
		{
			name: "description",
			content: description$22
		},
		{
			property: "og:title",
			content: title$22
		},
		{
			property: "og:description",
			content: description$22
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$44, "component")
});
var description$21 = "الكورسات التي اشتركت فيها فعلياً — تقدّمك، الحصة القادمة، وشهادة الإتمام.";
var $$splitComponentImporter$43 = () => import("./my-courses-FJ7xrVoJ.mjs");
var title$21 = "كورساتي | أكاديميا";
var Route$44 = createFileRoute("/_authenticated/my-courses")({
	head: () => ({ meta: [
		{ title: title$21 },
		{
			name: "description",
			content: description$21
		},
		{
			property: "og:title",
			content: title$21
		},
		{
			property: "og:description",
			content: description$21
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$43, "component")
});
var $$splitComponentImporter$42 = () => import("./notifications-D1d_m_n1.mjs");
var Route$43 = createFileRoute("/_authenticated/notifications")({
	head: () => ({ meta: [
		{ title: "الإشعارات | Academia" },
		{
			name: "description",
			content: "إشعارات الحساب والمهام التعليمية."
		},
		{
			property: "og:title",
			content: "الإشعارات | Academia"
		},
		{
			property: "og:description",
			content: "إشعارات الحساب والمهام التعليمية."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$42, "component")
});
var description$20 = "ادعُ أصدقاءك برابطك الخاص، وتابع كم صديق سجّل فعلياً ومكافآتك.";
var $$splitComponentImporter$41 = () => import("./referrals-B2557q1M.mjs");
var title$20 = "الإحالات | أكاديميا";
var Route$42 = createFileRoute("/_authenticated/referrals")({
	head: () => ({ meta: [
		{ title: title$20 },
		{
			name: "description",
			content: description$20
		},
		{
			property: "og:title",
			content: title$20
		},
		{
			property: "og:description",
			content: description$20
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$41, "component")
});
var description$19 = "جدول دراسي بمكان واحد: حصص، واجبات، امتحانات، وجلسات مراجعة.";
var $$splitComponentImporter$40 = () => import("./schedule-DPZG83Vj.mjs");
var title$19 = "الجدول | أكاديميا";
var Route$41 = createFileRoute("/_authenticated/schedule")({
	head: () => ({ meta: [
		{ title: title$19 },
		{
			name: "description",
			content: description$19
		},
		{
			property: "og:title",
			content: title$19
		},
		{
			property: "og:description",
			content: description$19
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$40, "component")
});
var $$splitComponentImporter$39 = () => import("./settings-BgADew22.mjs");
var Route$40 = createFileRoute("/_authenticated/settings")({
	head: () => ({ meta: [
		{ title: "الإعدادات | أكاديميا" },
		{
			name: "description",
			content: "اللغة، الثيم، وبيانات حسابك في أكاديميا."
		},
		{
			property: "og:title",
			content: "الإعدادات | أكاديميا"
		},
		{
			property: "og:description",
			content: "تفضيلاتك تُحفظ على جهازك وعلى حسابك معاً."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$39, "component")
});
var $$splitComponentImporter$38 = () => import("./system-modules-DXygBjQb.mjs");
var Route$39 = createFileRoute("/_authenticated/system-modules")({
	head: () => ({ meta: [
		{ title: "وحدات النظام | Academia" },
		{
			name: "description",
			content: "تفعيل أو تعطيل وحدات النظام على مستوى كل المستخدمين بضغطة واحدة."
		},
		{
			property: "og:title",
			content: "وحدات النظام | Academia"
		},
		{
			property: "og:description",
			content: "التحكم العام بتفعيل وحدات النظام."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$38, "component")
});
var description$18 = "رصيدك الحالي، سجل حركاتك، وطلب شحن رصيد جديد.";
var $$splitComponentImporter$37 = () => import("./wallet-Cv0CqJOA.mjs");
var title$18 = "محفظتي | أكاديميا";
var Route$38 = createFileRoute("/_authenticated/wallet")({
	head: () => ({ meta: [
		{ title: title$18 },
		{
			name: "description",
			content: description$18
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$37, "component")
});
var $$splitComponentImporter$36 = () => import("./blog._slug-DAO_RO9y.mjs");
var Route$37 = createFileRoute("/blog/$slug")({
	head: (ctx) => {
		const { params } = ctx;
		return createSeoHead(`/blog/${encodeURIComponent(params.slug)}`, localeFromSearch(ctx.match.search));
	},
	component: lazyRouteComponent($$splitComponentImporter$36, "component")
});
var $$splitComponentImporter$35 = () => import("./certificate._id-C_DUSg15.mjs");
var Route$36 = createFileRoute("/certificate/$id")({
	head: (ctx) => {
		const { params } = ctx;
		return createSeoHead(`/certificate/${encodeURIComponent(params.id)}`, localeFromSearch(ctx.match.search));
	},
	component: lazyRouteComponent($$splitComponentImporter$35, "component")
});
/** رقم صالح شكلياً: ACD-YYYY-NNNNN (سجل الشهادات الحقيقي يأتي مع مرحلة الباك-إند). */
var $$splitComponentImporter$34 = () => import("./invite._code-BDhajzR_.mjs");
var Route$35 = createFileRoute("/invite/$code")({
	head: (ctx) => {
		const { params } = ctx;
		return createSeoHead(`/invite/${encodeURIComponent(params.code)}`, localeFromSearch(ctx.match.search));
	},
	component: lazyRouteComponent($$splitComponentImporter$34, "component")
});
var $$splitComponentImporter$33 = () => import("./teacher._id-PjZPPiAc.mjs");
var Route$34 = createFileRoute("/teacher/$id")({
	head: (ctx) => {
		const { params } = ctx;
		return createSeoHead(`/teacher/${encodeURIComponent(params.id)}`, localeFromSearch(ctx.match.search));
	},
	component: lazyRouteComponent($$splitComponentImporter$33, "component")
});
var $$splitComponentImporter$32 = () => import("./teacher.register-BWOJtT_Z.mjs");
var Route$33 = createFileRoute("/teacher/register")({
	ssr: false,
	beforeLoad: async () => {
		if (await currentUserHome()) throw redirect({ to: "/" });
	},
	head: (ctx) => createSeoHead("/teacher/register", localeFromSearch(ctx.match.search)),
	component: lazyRouteComponent($$splitComponentImporter$32, "component")
});
var $$splitComponentImporter$31 = () => import("./admin.backend-permissions-ntmyGoie.mjs");
var Route$32 = createFileRoute("/_authenticated/admin/backend-permissions")({
	head: () => ({ meta: [
		{ title: "صلاحيات الباك اند | Academia" },
		{
			name: "description",
			content: "إدارة صلاحيات أنواع المستخدمين الحقيقية على Academia."
		},
		{
			property: "og:title",
			content: "صلاحيات الباك اند"
		},
		{
			property: "og:description",
			content: "إدارة صلاحيات أنواع المستخدمين الحقيقية على Academia."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$31, "component")
});
var $$splitComponentImporter$30 = () => import("./admin.community-reports-B3Yhyj5O.mjs");
var Route$31 = createFileRoute("/_authenticated/admin/community-reports")({
	head: () => ({ meta: [
		{ title: "بلاغات المجتمع | Academia" },
		{
			name: "description",
			content: "إدارة بلاغات مجتمعات Academia."
		},
		{
			property: "og:title",
			content: "بلاغات المجتمع"
		},
		{
			property: "og:description",
			content: "إدارة بلاغات مجتمعات Academia."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$30, "component")
});
var $$splitComponentImporter$29 = () => import("./admin.constants-vXwEC_Hq.mjs");
var Route$30 = createFileRoute("/_authenticated/admin/constants")({
	head: () => ({ meta: [
		{ title: "الثوابت | Academia" },
		{
			name: "description",
			content: "إدارة الثوابت والتصنيفات العامة على Academia."
		},
		{
			property: "og:title",
			content: "الثوابت"
		},
		{
			property: "og:description",
			content: "إدارة الثوابت والتصنيفات العامة على Academia."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$29, "component")
});
var $$splitComponentImporter$28 = () => import("./admin.content-review-BmMB_EpA.mjs");
var Route$29 = createFileRoute("/_authenticated/admin/content-review")({
	head: () => ({ meta: [
		{ title: "مراجعة المحتوى | Academia" },
		{
			name: "description",
			content: "مراجعة محتوى Academia التعليمي."
		},
		{
			property: "og:title",
			content: "مراجعة المحتوى"
		},
		{
			property: "og:description",
			content: "مراجعة محتوى Academia التعليمي."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$28, "component")
});
var $$splitComponentImporter$27 = () => import("./admin.course-catalog-8KwgnLKd.mjs");
var Route$28 = createFileRoute("/_authenticated/admin/course-catalog")({
	head: () => ({ meta: [
		{ title: "كتالوج الكورسات العام | Academia" },
		{
			name: "description",
			content: "إدارة الكورسات المعروضة بصفحة الكورسات العامة."
		},
		{
			property: "og:title",
			content: "كتالوج الكورسات العام"
		},
		{
			property: "og:description",
			content: "إدارة الكورسات المعروضة بصفحة الكورسات العامة."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$27, "component")
});
var $$splitComponentImporter$26 = () => import("./admin.curriculum-cQeSsRxJ.mjs");
var Route$27 = createFileRoute("/_authenticated/admin/curriculum")({
	head: () => ({ meta: [
		{ title: "المنهاج | Academia" },
		{
			name: "description",
			content: "هيكل منهاج Academia."
		},
		{
			property: "og:title",
			content: "المنهاج"
		},
		{
			property: "og:description",
			content: "هيكل منهاج Academia."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$26, "component")
});
var $$splitComponentImporter$25 = () => import("./admin.curriculum-requests-CIslMbrK.mjs");
var Route$26 = createFileRoute("/_authenticated/admin/curriculum-requests")({
	head: () => ({ meta: [
		{ title: "طلبات المنهاج | Academia" },
		{
			name: "description",
			content: "إدارة طلبات منهاج Academia."
		},
		{
			property: "og:title",
			content: "طلبات المنهاج"
		},
		{
			property: "og:description",
			content: "إدارة طلبات منهاج Academia."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$25, "component")
});
var $$splitComponentImporter$24 = () => import("./admin.dashboard-CN3_ScrZ.mjs");
var Route$25 = createFileRoute("/_authenticated/admin/dashboard")({
	head: () => ({ meta: [
		{ title: "إدارة Academia" },
		{
			name: "description",
			content: "لوحة تشغيل منصة Academia."
		},
		{
			property: "og:title",
			content: "إدارة Academia"
		},
		{
			property: "og:description",
			content: "لوحة تشغيل منصة Academia."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$24, "component")
});
var $$splitComponentImporter$23 = () => import("./admin.pages-C6l96l5h.mjs");
var Route$24 = createFileRoute("/_authenticated/admin/pages")({
	head: () => ({ meta: [
		{ title: "الصفحات | Academia" },
		{
			name: "description",
			content: "إدارة صفحات وقوائم النظام على Academia."
		},
		{
			property: "og:title",
			content: "الصفحات"
		},
		{
			property: "og:description",
			content: "إدارة صفحات وقوائم النظام على Academia."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$23, "component")
});
var $$splitComponentImporter$22 = () => import("./admin.payments-BAZehPxJ.mjs");
var Route$23 = createFileRoute("/_authenticated/admin/payments")({
	head: () => ({ meta: [
		{ title: "طلبات المحفظة | Academia" },
		{
			name: "description",
			content: "مراجعة طلبات شحن وسحب المحفظة في Academia."
		},
		{
			property: "og:title",
			content: "طلبات المحفظة"
		},
		{
			property: "og:description",
			content: "مراجعة طلبات شحن وسحب المحفظة في Academia."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$22, "component")
});
var $$splitComponentImporter$21 = () => import("./admin.permissions-DtTqp_C-.mjs");
var title$17 = "مصفوفة الصلاحيات | Academia";
var description$17 = "اختر نوع المستخدم لتحرير شجرة صلاحياته في Academia.";
var Route$22 = createFileRoute("/_authenticated/admin/permissions")({
	head: () => ({ meta: [
		{ title: title$17 },
		{
			name: "description",
			content: description$17
		},
		{
			property: "og:title",
			content: "مصفوفة الصلاحيات"
		},
		{
			property: "og:description",
			content: description$17
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$21, "component")
});
var $$splitComponentImporter$20 = () => import("./admin.roles-tQ_SQ2t-.mjs");
var Route$21 = createFileRoute("/_authenticated/admin/roles")({
	head: () => ({ meta: [
		{ title: "الأدوار والصلاحيات | Academia" },
		{
			name: "description",
			content: "إدارة أدوار وصلاحيات Academia."
		},
		{
			property: "og:title",
			content: "الأدوار والصلاحيات"
		},
		{
			property: "og:description",
			content: "إدارة أدوار وصلاحيات Academia."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$20, "component")
});
var $$splitComponentImporter$19 = () => import("./admin.teachers-BvrN6ukd.mjs");
var Route$20 = createFileRoute("/_authenticated/admin/teachers")({
	head: () => ({ meta: [
		{ title: "توثيق المعلمين | Academia" },
		{
			name: "description",
			content: "مراجعة واعتماد طلبات المعلمين."
		},
		{
			property: "og:title",
			content: "توثيق المعلمين"
		},
		{
			property: "og:description",
			content: "مراجعة واعتماد طلبات المعلمين."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$19, "component")
});
var $$splitComponentImporter$18 = () => import("./admin.users-Bk3POZU7.mjs");
var Route$19 = createFileRoute("/_authenticated/admin/users")({
	head: () => ({ meta: [
		{ title: "المستخدمون | Academia" },
		{
			name: "description",
			content: "إدارة حسابات المستخدمين على Academia."
		},
		{
			property: "og:title",
			content: "المستخدمون"
		},
		{
			property: "og:description",
			content: "إدارة حسابات المستخدمين على Academia."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$18, "component")
});
var description$16 = "تقرير أسبوعي واضح: التزام، إتقان، ومواطن الضعف — بدون أرقام مضلّلة.";
var $$splitComponentImporter$17 = () => import("./parent.report-Bj2yPkV3.mjs");
var title$16 = "تقرير الابن | أكاديميا";
var Route$18 = createFileRoute("/_authenticated/parent/report")({
	head: () => ({ meta: [
		{ title: title$16 },
		{
			name: "description",
			content: description$16
		},
		{
			property: "og:title",
			content: title$16
		},
		{
			property: "og:description",
			content: description$16
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$17, "component")
});
var description$15 = "الأبناء المرتبطون بحسابك، فك الربط، وتفضيلات الإشعارات والتقارير.";
var $$splitComponentImporter$16 = () => import("./parent.settings-BbQEj3HV.mjs");
var title$15 = "إعدادات ولي الأمر | أكاديميا";
var Route$17 = createFileRoute("/_authenticated/parent/settings")({
	head: () => ({ meta: [
		{ title: title$15 },
		{
			name: "description",
			content: description$15
		},
		{
			property: "og:title",
			content: title$15
		},
		{
			property: "og:description",
			content: description$15
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$16, "component")
});
var $$splitComponentImporter$15 = () => import("./role-permissions._roleId-Dg704kwT.mjs");
var Route$16 = createFileRoute("/_authenticated/role-permissions/$roleId")({
	head: () => ({ meta: [
		{ title: "صلاحيات نوع المستخدم | نظام الصلاحيات" },
		{
			name: "description",
			content: "شجرة صلاحيات من ثلاث مستويات: الوحدة ثم الصفحة ثم أدوات العرض والإضافة والتعديل."
		},
		{
			property: "og:title",
			content: "صلاحيات نوع المستخدم"
		},
		{
			property: "og:description",
			content: "تحديد صلاحيات دقيقة لكل صفحة داخل النظام."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var description$14 = "جودة التعليم عبر المعلمين والصفوف: تنبيهات، متابعات، ومؤشرات إتقان.";
var $$splitComponentImporter$14 = () => import("./supervisor.dashboard-DpY4BpAf.mjs");
var title$14 = "لوحة الإشراف | أكاديميا";
var Route$15 = createFileRoute("/_authenticated/supervisor/dashboard")({
	head: () => ({ meta: [
		{ title: title$14 },
		{
			name: "description",
			content: description$14
		},
		{
			property: "og:title",
			content: title$14
		},
		{
			property: "og:description",
			content: description$14
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var description$13 = "تقارير دورية عن جودة التدريس، الإتقان، والالتزام.";
var $$splitComponentImporter$13 = () => import("./supervisor.reports-B6B-P1gL.mjs");
var title$13 = "تقارير الإشراف | أكاديميا";
var Route$14 = createFileRoute("/_authenticated/supervisor/reports")({
	head: () => ({ meta: [
		{ title: title$13 },
		{
			name: "description",
			content: description$13
		},
		{
			property: "og:title",
			content: title$13
		},
		{
			property: "og:description",
			content: description$13
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var description$12 = "الطلاب المتعثّرون أولاً: من يحتاج تدخّلاً الآن ولماذا.";
var $$splitComponentImporter$12 = () => import("./supervisor.students-overview-DIYP59QA.mjs");
var title$12 = "نظرة الطلاب | أكاديميا";
var Route$13 = createFileRoute("/_authenticated/supervisor/students-overview")({
	head: () => ({ meta: [
		{ title: title$12 },
		{
			name: "description",
			content: description$12
		},
		{
			property: "og:title",
			content: title$12
		},
		{
			property: "og:description",
			content: description$12
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var description$11 = "أداء كل معلم: سرعة الرد، زمن التصحيح، وإتقان طلابه.";
var $$splitComponentImporter$11 = () => import("./supervisor.teachers-_-THtSuw.mjs");
var title$11 = "المعلمون | أكاديميا";
var Route$12 = createFileRoute("/_authenticated/supervisor/teachers")({
	head: () => ({ meta: [
		{ title: title$11 },
		{
			name: "description",
			content: description$11
		},
		{
			property: "og:title",
			content: title$11
		},
		{
			property: "og:description",
			content: description$11
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var description$10 = "أين يتعثّر طلابك بالضبط: أسئلة يخطئ فيها الأكثر، وإتقان كل اختبار.";
var $$splitComponentImporter$10 = () => import("./teacher.analytics-r65ijqIv.mjs");
var title$10 = "التحليلات | أكاديميا";
var Route$11 = createFileRoute("/_authenticated/teacher/analytics")({
	head: () => ({ meta: [
		{ title: title$10 },
		{
			name: "description",
			content: description$10
		},
		{
			property: "og:title",
			content: title$10
		},
		{
			property: "og:description",
			content: description$10
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var description$9 = "أسئلة طلابك في مكان واحد، وسجّل جوابك عليها.";
var $$splitComponentImporter$9 = () => import("./teacher.community-BsrIiINf.mjs");
var title$9 = "أسئلة طلابي | أكاديميا";
var Route$10 = createFileRoute("/_authenticated/teacher/community")({
	head: () => ({ meta: [
		{ title: title$9 },
		{
			name: "description",
			content: description$9
		},
		{
			property: "og:title",
			content: title$9
		},
		{
			property: "og:description",
			content: description$9
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var description$8 = "دروسك وملفاتك: أضفها، رتّبها على شجرة المنهاج، وتابع حالة مراجعتها.";
var $$splitComponentImporter$8 = () => import("./teacher.content-AkZVU2wI.mjs");
var title$8 = "المحتوى | أكاديميا";
var Route$9 = createFileRoute("/_authenticated/teacher/content")({
	head: () => ({ meta: [
		{ title: title$8 },
		{
			name: "description",
			content: description$8
		},
		{
			property: "og:title",
			content: title$8
		},
		{
			property: "og:description",
			content: description$8
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var description$7 = "كورساتك المنشورة: الأسعار، المشتركون، والحصص القادمة.";
var $$splitComponentImporter$7 = () => import("./teacher.courses-CLSmLTv2.mjs");
var title$7 = "كورساتي (معلم) | أكاديميا";
var Route$8 = createFileRoute("/_authenticated/teacher/courses")({
	head: () => ({ meta: [
		{ title: title$7 },
		{
			name: "description",
			content: description$7
		},
		{
			property: "og:title",
			content: title$7
		},
		{
			property: "og:description",
			content: description$7
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var description$6 = "صفوفك اليوم: ما يحتاج تصحيحاً، أسئلة تنتظر جوابك، وأداء طلابك.";
var $$splitComponentImporter$6 = () => import("./teacher.dashboard-Cbv4bKGV.mjs");
var title$6 = "لوحة المعلم | أكاديميا";
var Route$7 = createFileRoute("/_authenticated/teacher/dashboard")({
	head: () => ({ meta: [
		{ title: title$6 },
		{
			name: "description",
			content: description$6
		},
		{
			property: "og:title",
			content: title$6
		},
		{
			property: "og:description",
			content: description$6
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var description$5 = "أرباحك من التدريس، وطلبات سحب رصيدك لحسابك البنكي.";
var $$splitComponentImporter$5 = () => import("./teacher.earnings-BpNEeS_B.mjs");
var title$5 = "الأرباح | أكاديميا";
var Route$6 = createFileRoute("/_authenticated/teacher/earnings")({
	head: () => ({ meta: [
		{ title: title$5 },
		{
			name: "description",
			content: description$5
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var description$4 = "قائمة التصحيح: الأسئلة المقالية والملفات المرفوعة، مع ملاحظات لكل طالب.";
var $$splitComponentImporter$4 = () => import("./teacher.grading-5lEOxi_R.mjs");
var title$4 = "التصحيح | أكاديميا";
var Route$5 = createFileRoute("/_authenticated/teacher/grading")({
	head: () => ({ meta: [
		{ title: title$4 },
		{
			name: "description",
			content: description$4
		},
		{
			property: "og:title",
			content: title$4
		},
		{
			property: "og:description",
			content: description$4
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var description$3 = "بنك أسئلتك واختباراتك: اختيار متعدد، صح/خطأ، ومقالي.";
var $$splitComponentImporter$3 = () => import("./teacher.quizzes-3SJ5gEcQ.mjs");
var title$3 = "الاختبارات | أكاديميا";
var Route$4 = createFileRoute("/_authenticated/teacher/quizzes")({
	head: () => ({ meta: [
		{ title: title$3 },
		{
			name: "description",
			content: description$3
		},
		{
			property: "og:title",
			content: title$3
		},
		{
			property: "og:description",
			content: description$3
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var description$2 = "التسعير، أوقات التوفّر، بيانات الدفع، وتفضيلات الإشعارات.";
var $$splitComponentImporter$2 = () => import("./teacher.settings-CnuNEvKb.mjs");
var title$2 = "إعدادات المعلم | أكاديميا";
var Route$3 = createFileRoute("/_authenticated/teacher/settings")({
	head: () => ({ meta: [
		{ title: title$2 },
		{
			name: "description",
			content: description$2
		},
		{
			property: "og:title",
			content: title$2
		},
		{
			property: "og:description",
			content: description$2
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./library.lesson._id-Cmmwwf4l.mjs");
var title$1 = "صفحة الدرس (معاينة تصميم) | أكاديميا";
var description$1 = "معاينة تصميم لشكل صفحة الدرس المستقبلية — لسا مش موصولة بمحتوى حقيقي.";
var Route$2 = createFileRoute("/_authenticated/library/lesson/$id")({
	head: () => ({ meta: [
		{ title: title$1 },
		{
			name: "description",
			content: description$1
		},
		{
			property: "og:title",
			content: title$1
		},
		{
			property: "og:description",
			content: description$1
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var description = "هذا ما يراه الطلاب وأولياء الأمور: نبذتك، موادك، وشهاداتك الموثّقة.";
var $$splitComponentImporter = () => import("./teacher.profile.edit-CHo3Hak9.mjs");
var title = "ملفي العام | أكاديميا";
var Route$1 = createFileRoute("/_authenticated/teacher/profile/edit")({
	head: () => ({ meta: [
		{ title },
		{
			name: "description",
			content: description
		},
		{
			property: "og:title",
			content: title
		},
		{
			property: "og:description",
			content: description
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$73.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$74
});
var R403Route = Route$72.update({
	id: "/403",
	path: "/403",
	getParentRoute: () => Route$74
});
var AuthenticatedRouteRoute = Route$71.update({
	id: "/_authenticated",
	getParentRoute: () => Route$74
});
var AboutRoute = Route$70.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$74
});
var BlogRoute = Route$69.update({
	id: "/blog",
	path: "/blog",
	getParentRoute: () => Route$74
});
var ContactRoute = Route$68.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route$74
});
var CoursesRoute = Route$67.update({
	id: "/courses",
	path: "/courses",
	getParentRoute: () => Route$74
});
var ForParentsRoute = Route$66.update({
	id: "/for-parents",
	path: "/for-parents",
	getParentRoute: () => Route$74
});
var ForTeachersRoute = Route$65.update({
	id: "/for-teachers",
	path: "/for-teachers",
	getParentRoute: () => Route$74
});
var ForgotPasswordRoute = Route$64.update({
	id: "/forgot-password",
	path: "/forgot-password",
	getParentRoute: () => Route$74
});
var HelpRoute = Route$63.update({
	id: "/help",
	path: "/help",
	getParentRoute: () => Route$74
});
var HowItWorksRoute = Route$62.update({
	id: "/how-it-works",
	path: "/how-it-works",
	getParentRoute: () => Route$74
});
var LoginRoute = Route$61.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$74
});
var PricingRoute = Route$60.update({
	id: "/pricing",
	path: "/pricing",
	getParentRoute: () => Route$74
});
var PrivacyRoute = Route$59.update({
	id: "/privacy",
	path: "/privacy",
	getParentRoute: () => Route$74
});
var ResetPasswordRoute = Route$58.update({
	id: "/reset-password",
	path: "/reset-password",
	getParentRoute: () => Route$74
});
var SignupRoute = Route$57.update({
	id: "/signup",
	path: "/signup",
	getParentRoute: () => Route$74
});
var TermsRoute = Route$56.update({
	id: "/terms",
	path: "/terms",
	getParentRoute: () => Route$74
});
var UnsubscribeRoute = Route$55.update({
	id: "/unsubscribe",
	path: "/unsubscribe",
	getParentRoute: () => Route$74
});
var VerifyEmailRoute = Route$54.update({
	id: "/verify-email",
	path: "/verify-email",
	getParentRoute: () => Route$74
});
var AuthenticatedAchievementsRoute = Route$53.update({
	id: "/achievements",
	path: "/achievements",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedBookmarksRoute = Route$52.update({
	id: "/bookmarks",
	path: "/bookmarks",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedCommunityRoute = Route$51.update({
	id: "/community",
	path: "/community",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedDashboardRoute = Route$50.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedExamSimulatorRoute = Route$49.update({
	id: "/exam-simulator",
	path: "/exam-simulator",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedFlashcardsRoute = Route$48.update({
	id: "/flashcards",
	path: "/flashcards",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedLibraryRoute = Route$47.update({
	id: "/library",
	path: "/library",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedMistakesBankRoute = Route$46.update({
	id: "/mistakes-bank",
	path: "/mistakes-bank",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedMyCertificatesRoute = Route$45.update({
	id: "/my-certificates",
	path: "/my-certificates",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedMyCoursesRoute = Route$44.update({
	id: "/my-courses",
	path: "/my-courses",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedNotificationsRoute = Route$43.update({
	id: "/notifications",
	path: "/notifications",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedReferralsRoute = Route$42.update({
	id: "/referrals",
	path: "/referrals",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedScheduleRoute = Route$41.update({
	id: "/schedule",
	path: "/schedule",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedSettingsRoute = Route$40.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedSystemModulesRoute = Route$39.update({
	id: "/system-modules",
	path: "/system-modules",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedWalletRoute = Route$38.update({
	id: "/wallet",
	path: "/wallet",
	getParentRoute: () => AuthenticatedRouteRoute
});
var BlogSlugRoute = Route$37.update({
	id: "/$slug",
	path: "/$slug",
	getParentRoute: () => BlogRoute
});
var CertificateIdRoute = Route$36.update({
	id: "/certificate/$id",
	path: "/certificate/$id",
	getParentRoute: () => Route$74
});
var InviteCodeRoute = Route$35.update({
	id: "/invite/$code",
	path: "/invite/$code",
	getParentRoute: () => Route$74
});
var TeacherIdRoute = Route$34.update({
	id: "/teacher/$id",
	path: "/teacher/$id",
	getParentRoute: () => Route$74
});
var TeacherRegisterRoute = Route$33.update({
	id: "/teacher/register",
	path: "/teacher/register",
	getParentRoute: () => Route$74
});
var AuthenticatedAdminBackendPermissionsRoute = Route$32.update({
	id: "/admin/backend-permissions",
	path: "/admin/backend-permissions",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAdminCommunityReportsRoute = Route$31.update({
	id: "/admin/community-reports",
	path: "/admin/community-reports",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAdminConstantsRoute = Route$30.update({
	id: "/admin/constants",
	path: "/admin/constants",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAdminContentReviewRoute = Route$29.update({
	id: "/admin/content-review",
	path: "/admin/content-review",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAdminCourseCatalogRoute = Route$28.update({
	id: "/admin/course-catalog",
	path: "/admin/course-catalog",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAdminCurriculumRoute = Route$27.update({
	id: "/admin/curriculum",
	path: "/admin/curriculum",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAdminCurriculumRequestsRoute = Route$26.update({
	id: "/admin/curriculum-requests",
	path: "/admin/curriculum-requests",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAdminDashboardRoute = Route$25.update({
	id: "/admin/dashboard",
	path: "/admin/dashboard",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAdminPagesRoute = Route$24.update({
	id: "/admin/pages",
	path: "/admin/pages",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAdminPaymentsRoute = Route$23.update({
	id: "/admin/payments",
	path: "/admin/payments",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAdminPermissionsRoute = Route$22.update({
	id: "/admin/permissions",
	path: "/admin/permissions",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAdminRolesRoute = Route$21.update({
	id: "/admin/roles",
	path: "/admin/roles",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAdminTeachersRoute = Route$20.update({
	id: "/admin/teachers",
	path: "/admin/teachers",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAdminUsersRoute = Route$19.update({
	id: "/admin/users",
	path: "/admin/users",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedParentReportRoute = Route$18.update({
	id: "/parent/report",
	path: "/parent/report",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedParentSettingsRoute = Route$17.update({
	id: "/parent/settings",
	path: "/parent/settings",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedRolePermissionsRoleIdRoute = Route$16.update({
	id: "/role-permissions/$roleId",
	path: "/role-permissions/$roleId",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedSupervisorDashboardRoute = Route$15.update({
	id: "/supervisor/dashboard",
	path: "/supervisor/dashboard",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedSupervisorReportsRoute = Route$14.update({
	id: "/supervisor/reports",
	path: "/supervisor/reports",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedSupervisorStudentsOverviewRoute = Route$13.update({
	id: "/supervisor/students-overview",
	path: "/supervisor/students-overview",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedSupervisorTeachersRoute = Route$12.update({
	id: "/supervisor/teachers",
	path: "/supervisor/teachers",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedTeacherAnalyticsRoute = Route$11.update({
	id: "/teacher/analytics",
	path: "/teacher/analytics",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedTeacherCommunityRoute = Route$10.update({
	id: "/teacher/community",
	path: "/teacher/community",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedTeacherContentRoute = Route$9.update({
	id: "/teacher/content",
	path: "/teacher/content",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedTeacherCoursesRoute = Route$8.update({
	id: "/teacher/courses",
	path: "/teacher/courses",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedTeacherDashboardRoute = Route$7.update({
	id: "/teacher/dashboard",
	path: "/teacher/dashboard",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedTeacherEarningsRoute = Route$6.update({
	id: "/teacher/earnings",
	path: "/teacher/earnings",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedTeacherGradingRoute = Route$5.update({
	id: "/teacher/grading",
	path: "/teacher/grading",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedTeacherQuizzesRoute = Route$4.update({
	id: "/teacher/quizzes",
	path: "/teacher/quizzes",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedTeacherSettingsRoute = Route$3.update({
	id: "/teacher/settings",
	path: "/teacher/settings",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedLibraryLessonIdRoute = Route$2.update({
	id: "/lesson/$id",
	path: "/lesson/$id",
	getParentRoute: () => AuthenticatedLibraryRoute
});
var AuthenticatedTeacherProfileEditRoute = Route$1.update({
	id: "/teacher/profile/edit",
	path: "/teacher/profile/edit",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedLibraryRouteChildren = { AuthenticatedLibraryLessonIdRoute };
var AuthenticatedRouteRouteChildren = {
	AuthenticatedAchievementsRoute,
	AuthenticatedBookmarksRoute,
	AuthenticatedCommunityRoute,
	AuthenticatedDashboardRoute,
	AuthenticatedExamSimulatorRoute,
	AuthenticatedFlashcardsRoute,
	AuthenticatedLibraryRoute: AuthenticatedLibraryRoute._addFileChildren(AuthenticatedLibraryRouteChildren),
	AuthenticatedMistakesBankRoute,
	AuthenticatedMyCertificatesRoute,
	AuthenticatedMyCoursesRoute,
	AuthenticatedNotificationsRoute,
	AuthenticatedReferralsRoute,
	AuthenticatedScheduleRoute,
	AuthenticatedSettingsRoute,
	AuthenticatedSystemModulesRoute,
	AuthenticatedWalletRoute,
	AuthenticatedAdminBackendPermissionsRoute,
	AuthenticatedAdminCommunityReportsRoute,
	AuthenticatedAdminConstantsRoute,
	AuthenticatedAdminContentReviewRoute,
	AuthenticatedAdminCourseCatalogRoute,
	AuthenticatedAdminCurriculumRoute,
	AuthenticatedAdminCurriculumRequestsRoute,
	AuthenticatedAdminDashboardRoute,
	AuthenticatedAdminPagesRoute,
	AuthenticatedAdminPaymentsRoute,
	AuthenticatedAdminPermissionsRoute,
	AuthenticatedAdminRolesRoute,
	AuthenticatedAdminTeachersRoute,
	AuthenticatedAdminUsersRoute,
	AuthenticatedParentReportRoute,
	AuthenticatedParentSettingsRoute,
	AuthenticatedRolePermissionsRoleIdRoute,
	AuthenticatedSupervisorDashboardRoute,
	AuthenticatedSupervisorReportsRoute,
	AuthenticatedSupervisorStudentsOverviewRoute,
	AuthenticatedSupervisorTeachersRoute,
	AuthenticatedTeacherAnalyticsRoute,
	AuthenticatedTeacherCommunityRoute,
	AuthenticatedTeacherContentRoute,
	AuthenticatedTeacherCoursesRoute,
	AuthenticatedTeacherDashboardRoute,
	AuthenticatedTeacherEarningsRoute,
	AuthenticatedTeacherGradingRoute,
	AuthenticatedTeacherQuizzesRoute,
	AuthenticatedTeacherSettingsRoute,
	AuthenticatedTeacherProfileEditRoute
};
var AuthenticatedRouteRouteWithChildren = AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren);
var BlogRouteChildren = { BlogSlugRoute };
var rootRouteChildren = {
	IndexRoute,
	AuthenticatedRouteRoute: AuthenticatedRouteRouteWithChildren,
	R403Route,
	AboutRoute,
	BlogRoute: BlogRoute._addFileChildren(BlogRouteChildren),
	ContactRoute,
	CoursesRoute,
	ForParentsRoute,
	ForTeachersRoute,
	ForgotPasswordRoute,
	HelpRoute,
	HowItWorksRoute,
	LoginRoute,
	PricingRoute,
	PrivacyRoute,
	ResetPasswordRoute,
	SignupRoute,
	TermsRoute,
	UnsubscribeRoute,
	VerifyEmailRoute,
	CertificateIdRoute,
	InviteCodeRoute,
	TeacherIdRoute,
	TeacherRegisterRoute
};
var routeTree = Route$74._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
var getRouter = () => {
	const queryClient = new QueryClient();
	const router = createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
	if (!router.isServer) index_server_exports.addIntegration(tanstackRouterBrowserTracingIntegration(router));
	return router;
};
//#endregion
export { getBlogPost as $, description$25 as A, ContentFlowIllustration as B, description$18 as C, description$22 as D, description$21 as E, description$30 as F, MistakeBankIllustration as G, ExamSimIllustration as H, Route$54 as I, ReviewSessionIllustration as J, ParentReportIllustration as K, identifyUser as L, description$27 as M, description$28 as N, description$23 as O, description$29 as P, blogPosts as Q, trackEvent as R, Route$37 as S, description$20 as T, ForbiddenIllustration as U, EmptyIllustration as V, LibraryTreeIllustration as W, ROLES as X, WelcomeIllustration as Y, USERS as Z, description$15 as _, throwBilingual as _t, description$4 as a, getStoredProfile as at, Route$35 as b, usePreferences as bt, description$7 as c, isDemoSession as ct, description$10 as d, loginAsDemo as dt, AUTH_EVENT as et, description$11 as f, logout as ft, Route$16 as g, roleKeyFromName as gt, description$14 as h, roleHome as ht, description$3 as i, getStoredEmail as it, description$26 as j, description$24 as k, description$8 as l, isRealAdmin as lt, description$13 as m, register as mt, description as n, apiClient as nt, description$5 as o, getStoredUserId as ot, description$12 as p, pageMatchesRole as pt, PlanChoiceIllustration as q, description$2 as r, changeMyPassword as rt, description$6 as s, isAuthenticated as st, router_exports as t, allowedPublicPaths as tt, description$9 as u, login as ut, description$16 as v, updateMyProfile as vt, description$19 as w, Route$36 as x, wasJustRegistered as xt, Route$34 as y, useBi as yt, currentUserHome as z };
