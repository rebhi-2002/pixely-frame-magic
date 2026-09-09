import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as instance } from "../_libs/i18next.mjs";
import { n as useTranslation, r as initReactI18next, t as I18nextProvider } from "../_libs/react-i18next.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/rbac-static-data-JRz-nJtL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var API_BASE_URL = "https://ziadkamalaln2842-001-site1.etempurl.com".replace(/\/+$/, "") ?? "https://localhost:7176";
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
	delete: (path) => request(path, { method: "DELETE" })
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
* انضافت لـ MyProfileDto بالباك اند. بالانتظار، نجيبها من
* /api/User/CreateEditModal?id=... (نفس الـ endpoint يلي شاشة تعديل
* المستخدم بتستخدمه، ومتاح لأي جلسة). إذا فشل النداء (باك اند قديم/تعطّل
* مؤقت) منرجع null وبيضل تسجيل الدخول نفسه ناجح — بس الراوتينغ بيوجّه
* لصفحة طالب افتراضية بدل الأدمن، فمهم ما نكسر الدخول كله بسبب هالنداء
* الإضافي.
*/
async function fetchUserType(userId) {
	try {
		const modal = await apiClient.get(`/api/User/CreateEditModal?id=${encodeURIComponent(userId)}`);
		const u = modal?.user ?? modal?.User;
		return {
			roleId: typeof u?.userTypeId === "number" ? u.userTypeId : null,
			roleName: typeof u?.userType?.name === "string" ? u.userType.name : null
		};
	} catch {
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
/** دخول محلي مؤقت لاختبار الأدوار التي لم يدعمها الباك إند بعد.
* نفس شرط الظهور بالضبط يلي بيتحكم بظهور أزرار الدخول التجريبي بـlogin.tsx
* (demoEnabled) — لازم يضلوا متطابقين وإلا الزر بيظهر بس الضغط عليه بيفشل. */
function loginAsDemo(userId) {
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
/** UserTypeId=1 ("مدير النظام") — الوحيد المتاح فعليًا على الباك اند حاليًا. */
function isRealAdmin() {
	const session = readStoredSession();
	return session?.isDemo === false && session.profile?.roleId === 1;
}
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
		"badge": "للطلاب من 16 إلى 18 سنة",
		"h1a": "ملفاتك ضايعة بالواتساب؟",
		"h1b": "أكاديميا",
		"h1c": "ترتّبها وتخلّيك تنجز.",
		"sub": "مكان واحد لكل موادك: مكتبة مرتّبة، أسئلة تتجاوب عليها، جدول يذكّرك، وامتحانات تدريب تكشف نقاط ضعفك قبل الامتحان الحقيقي.",
		"ctaPrimary": "ابدأ مجاناً الآن",
		"ctaSecondary": "شوف كيف بتشتغل",
		"stats": {
			"levels": "مستويات تصنيف للمحتوى",
			"rtl": "عربي وواجهة RTL",
			"spaces": "مساحات: طالب، معلم، ولي أمر"
		},
		"featuresTitle": "كل شي بتحتاجه بمكان واحد",
		"featuresSub": "مش أرشيف ملفات — أدوات فعلية تساعدك تنجز وتتقن، مبنية على طريقة دراستك الحقيقية.",
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
				"title": "محاكي الامتحان الوزاري",
				"text": "امتحان بنفس النمط والتوقيت، تصحيح فوري وتحليل نقاط الضعف حسب الوحدة."
			},
			"mistakes": {
				"title": "بنك أخطائي",
				"text": "كل سؤال تخطئ فيه يُحفظ تلقائياً لتراجعه دورياً حتى تتقنه."
			},
			"review": {
				"title": "مراجعة الـ15 دقيقة",
				"text": "فلاش كاردز ذكية تُقترح حسب أضعف نقطة عندك قبل النوم أو قبل الامتحان."
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
		"ctaTitle": "جاهز تبلّش؟",
		"ctaSub": "سجّل بدقيقة، اختار موادك، وحدّد أول هدف أسبوعي — والباقي علينا.",
		"ctaButton": "إنشاء حساب مجاني",
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
		}
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
			"قبل الامتحان، محاكي الامتحان الوزاري بيقيسك بنفس التوقيت الحقيقي.",
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
				"محاكي الامتحان الوزاري بالذكاء الاصطناعي",
				"بنك أخطائي الخاص + التكرار المتباعد",
				"مراجعة الـ15 دقيقة (فلاش كاردز ذكية)",
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
							"l": "محاكي الامتحان الوزاري بالذكاء الاصطناعي",
							"free": false,
							"plus": true
						},
						{
							"l": "بنك أخطائي الخاص + التكرار المتباعد",
							"free": false,
							"plus": true
						},
						{
							"l": "مراجعة الـ15 دقيقة (فلاش كاردز ذكية)",
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
				"d": "بيانات الحساب (الاسم، البريد الإلكتروني، رقم الهاتف، الدور)، بيانات أكاديمية (الحضور، نتائج الاختبارات، سجل الدورات)، بيانات مالية (سجل معاملات المحفظة فقط — لا نخزّن بيانات بطاقات بنكية، التحويل يدوي بإيصال)، وبيانات تقنية أساسية لأغراض الأمان."
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
				"d": "أكاديميا سوق تعليمي إلكتروني يربط الطلاب بالمعلمين والدورات، ويوفر محفظة إلكترونية داخلية، وتتبع أكاديمي (حضور، اختبارات، نتائج)، ومتابعة اختيارية لولي الأمر. المنصة لا توفر حاليًا دردشة مباشرة، بث فيديو مباشر، تطبيق موبايل أصلي، أو دفع إلكتروني فوري — التحويلات البنكية تُعالَج يدويًا."
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
			"description": "Academia: an organized smart library, subject communities, achievement tracking, a mistake bank and a national-exam simulator — all your studying in one place."
		},
		"badge": "For students aged 16 to 18",
		"h1a": "Files lost in WhatsApp?",
		"h1b": "Academia",
		"h1c": "organizes them so you get things done.",
		"sub": "One place for every subject: a tidy library, questions that actually get answered, a schedule that reminds you, and practice exams that expose your weak spots before the real one.",
		"ctaPrimary": "Start free now",
		"ctaSecondary": "See how it works",
		"stats": {
			"levels": "content classification levels",
			"rtl": "Arabic-first with RTL interface",
			"spaces": "spaces: student, teacher, parent"
		},
		"featuresTitle": "Everything you need in one place",
		"featuresSub": "Not a file archive — real tools that help you finish and master, built around how you actually study.",
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
				"title": "National exam simulator",
				"text": "Same format and timing, instant grading and weak-point analysis per unit."
			},
			"mistakes": {
				"title": "My mistake bank",
				"text": "Every question you get wrong is saved automatically so you can review it until you master it."
			},
			"review": {
				"title": "15-minute review",
				"text": "Smart flashcards suggested from your weakest point, before bed or before the exam."
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
		"ctaTitle": "Ready to start?",
		"ctaSub": "Sign up in a minute, pick your subjects, set your first weekly goal — we handle the rest.",
		"ctaButton": "Create a free account",
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
		}
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
			"Before the exam, the national-exam simulator tests you with real timing.",
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
				"AI national-exam simulator",
				"Your own mistake bank + spaced repetition",
				"15-minute review (smart flashcards)",
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
							"l": "Personal mistake bank + spaced repetition",
							"free": false,
							"plus": true
						},
						{
							"l": "15-minute review (smart flashcards)",
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
				"t": "مؤسس — الواجهة الأمامية والمنتج",
				"d": "يبني تجربة الطالب والواجهات، من التصميم لآخر تفصيل بالتفاعل."
			},
			{
				"t": "مؤسس — الباك اند",
				"d": "يبني البنية التقنية وقاعدة البيانات."
			},
			{
				"t": "مؤسس — الباك اند",
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
			"description": "تصفّح كورسات المعلّمين المعتمدين في أكاديميا حسب المادة والمستوى قبل إنشاء حسابك."
		},
		"h1": "سوق الكورسات",
		"sub": "كورسات من معلّمين موثّقين — تصفّحها بدون حساب، وسجّل عند الاشتراك.",
		"searchPlaceholder": "ابحث باسم الكورس أو المعلّم…",
		"all": "الكل",
		"empty": "لا نتائج مطابقة لبحثك.",
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
				"t": "Founder — Frontend & product",
				"d": "Builds the student experience and the interface, down to the last interaction detail."
			},
			{
				"t": "Founder — Backend",
				"d": "Builds the technical infrastructure and database."
			},
			{
				"t": "Founder — Backend",
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
			"description": "Browse courses from verified Academia teachers by subject and level before creating an account."
		},
		"h1": "Course marketplace",
		"sub": "Courses from verified teachers — browse without an account, sign up when you enroll.",
		"searchPlaceholder": "Search by course or teacher…",
		"all": "All",
		"empty": "No results match your search.",
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
var THEME_STORAGE_KEY = "acadimia.theme";
var LOCALE_STORAGE_KEY = "acadimia.locale";
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
var PreferencesContext = (0, import_react.createContext)(null);
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
	"مدير عام": "admin"
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
		id: "p-student-my-courses",
		module_id: "m-student",
		parent_id: null,
		key: "student_my_courses",
		name: "دوراتي",
		name_en: "My courses",
		icon: "BookOpen",
		path: "/my-courses",
		sort_order: 2
	},
	{
		id: "p-student-library",
		module_id: "m-student",
		parent_id: null,
		key: "student_library",
		name: "المكتبة",
		name_en: "Library",
		icon: "Library",
		path: "/library",
		sort_order: 3
	},
	{
		id: "p-student-flashcards",
		module_id: "m-student",
		parent_id: null,
		key: "student_flashcards",
		name: "البطاقات التعليمية",
		name_en: "Flashcards",
		icon: "Layers",
		path: "/flashcards",
		sort_order: 4
	},
	{
		id: "p-student-exam",
		module_id: "m-student",
		parent_id: null,
		key: "student_exam",
		name: "امتحاناتي التجريبية",
		name_en: "My practice exams",
		icon: "FileQuestion",
		path: "/exam-simulator",
		sort_order: 5
	},
	{
		id: "p-student-mistakes",
		module_id: "m-student",
		parent_id: null,
		key: "student_mistakes",
		name: "بنك الأخطاء",
		name_en: "Mistakes bank",
		icon: "AlertTriangle",
		path: "/mistakes-bank",
		sort_order: 6
	},
	{
		id: "p-student-achievements",
		module_id: "m-student",
		parent_id: null,
		key: "student_achievements",
		name: "الإنجازات",
		name_en: "Achievements",
		icon: "Trophy",
		path: "/achievements",
		sort_order: 7
	},
	{
		id: "p-student-certificates",
		module_id: "m-student",
		parent_id: null,
		key: "student_certificates",
		name: "شهاداتي",
		name_en: "My certificates",
		icon: "Award",
		path: "/my-certificates",
		sort_order: 8
	},
	{
		id: "p-student-schedule",
		module_id: "m-student",
		parent_id: null,
		key: "student_schedule",
		name: "الجدول",
		name_en: "Schedule",
		icon: "Calendar",
		path: "/schedule",
		sort_order: 9
	},
	{
		id: "p-student-community",
		module_id: "m-student",
		parent_id: null,
		key: "student_community",
		name: "أسئلتي",
		name_en: "My questions",
		icon: "MessagesSquare",
		path: "/community",
		sort_order: 10
	},
	{
		id: "p-student-bookmarks",
		module_id: "m-student",
		parent_id: null,
		key: "student_bookmarks",
		name: "المفضلة",
		name_en: "Bookmarks",
		icon: "Bookmark",
		path: "/bookmarks",
		sort_order: 11
	},
	{
		id: "p-student-referrals",
		module_id: "m-student",
		parent_id: null,
		key: "student_referrals",
		name: "الإحالات",
		name_en: "Referrals",
		icon: "Gift",
		path: "/referrals",
		sort_order: 12
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
		id: "p-teacher-courses",
		module_id: "m-teacher",
		parent_id: null,
		key: "teacher_courses",
		name: "دوراتي",
		name_en: "My courses",
		icon: "BookOpen",
		path: "/teacher/courses",
		sort_order: 2
	},
	{
		id: "p-teacher-content",
		module_id: "m-teacher",
		parent_id: null,
		key: "teacher_content",
		name: "المحتوى",
		name_en: "Content",
		icon: "FileText",
		path: "/teacher/content",
		sort_order: 3
	},
	{
		id: "p-teacher-quizzes",
		module_id: "m-teacher",
		parent_id: null,
		key: "teacher_quizzes",
		name: "الاختبارات",
		name_en: "Quizzes",
		icon: "FileQuestion",
		path: "/teacher/quizzes",
		sort_order: 4
	},
	{
		id: "p-teacher-grading",
		module_id: "m-teacher",
		parent_id: null,
		key: "teacher_grading",
		name: "التصحيح",
		name_en: "Grading",
		icon: "CheckSquare",
		path: "/teacher/grading",
		sort_order: 5
	},
	{
		id: "p-teacher-analytics",
		module_id: "m-teacher",
		parent_id: null,
		key: "teacher_analytics",
		name: "التحليلات",
		name_en: "Analytics",
		icon: "BarChart3",
		path: "/teacher/analytics",
		sort_order: 6
	},
	{
		id: "p-teacher-earnings",
		module_id: "m-teacher",
		parent_id: null,
		key: "teacher_earnings",
		name: "الأرباح",
		name_en: "Earnings",
		icon: "Wallet",
		path: "/teacher/earnings",
		sort_order: 7
	},
	{
		id: "p-teacher-community",
		module_id: "m-teacher",
		parent_id: null,
		key: "teacher_community",
		name: "أسئلة طلابي",
		name_en: "My students' questions",
		icon: "MessagesSquare",
		path: "/teacher/community",
		sort_order: 8
	},
	{
		id: "p-teacher-profile-edit",
		module_id: "m-teacher",
		parent_id: null,
		key: "teacher_profile_edit",
		name: "تعديل الملف الشخصي",
		name_en: "Edit profile",
		icon: "UserCog",
		path: "/teacher/profile/edit",
		sort_order: 9
	},
	{
		id: "p-teacher-settings",
		module_id: "m-teacher",
		parent_id: null,
		key: "teacher_settings",
		name: "الإعدادات",
		name_en: "Settings",
		icon: "Settings",
		path: "/teacher/settings",
		sort_order: 10
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
		id: "p-admin-teachers",
		module_id: "m-academic",
		parent_id: null,
		key: "admin_teachers",
		name: "المعلمون",
		name_en: "Teachers",
		icon: "Users",
		path: "/admin/teachers",
		sort_order: 2
	},
	{
		id: "p-admin-curriculum",
		module_id: "m-academic",
		parent_id: null,
		key: "admin_curriculum",
		name: "المنهج",
		name_en: "Curriculum",
		icon: "BookOpen",
		path: "/admin/curriculum",
		sort_order: 3
	},
	{
		id: "p-admin-curriculum-req",
		module_id: "m-academic",
		parent_id: null,
		key: "admin_curriculum_requests",
		name: "طلبات المنهج",
		name_en: "Curriculum requests",
		icon: "FileCheck",
		path: "/admin/curriculum-requests",
		sort_order: 4
	},
	{
		id: "p-admin-content-review",
		module_id: "m-academic",
		parent_id: null,
		key: "admin_content_review",
		name: "مراجعة المحتوى",
		name_en: "Content review",
		icon: "FileSearch",
		path: "/admin/content-review",
		sort_order: 5
	},
	{
		id: "p-admin-community-reports",
		module_id: "m-academic",
		parent_id: null,
		key: "admin_community_reports",
		name: "بلاغات المجتمع",
		name_en: "Community reports",
		icon: "MessageSquareWarning",
		path: "/admin/community-reports",
		sort_order: 6
	},
	{
		id: "p-admin-payments",
		module_id: "m-academic",
		parent_id: null,
		key: "admin_payments",
		name: "المدفوعات",
		name_en: "Payments",
		icon: "CreditCard",
		path: "/admin/payments",
		sort_order: 7
	},
	{
		id: "p-admin-course-catalog",
		module_id: "m-academic",
		parent_id: null,
		key: "admin_course_catalog",
		name: "كتالوج الكورسات العام",
		name_en: "Public course catalog",
		icon: "Store",
		path: "/admin/course-catalog",
		sort_order: 8
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
export { usePreferences as A, nextId as C, roleKeyFromName as D, roleHome as E, throwBilingual as O, logout as S, preferencesBootScript as T, isAuthenticated as _, PERMISSION_KEYS as a, login as b, ROLE_PERMISSION_GRANTS as c, apiClient as d, getErrorMessage as f, i18n_default as g, getStoredUserId as h, PAGES as i, verifyServerSession as j, useBi as k, USERS as l, getStoredProfile as m, DEMO_USER_COOKIE as n, PreferencesProvider as o, getStoredEmail as p, MODULES as r, ROLES as s, AUTH_EVENT as t, allowedPublicPaths as u, isDemoSession as v, pageMatchesRole as w, loginAsDemo as x, isRealAdmin as y };
