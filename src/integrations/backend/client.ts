// عميل HTTP للباك اند (ASP.NET) الخاص بمشروعنا — يحلّ محلّ Supabase.
//
// عنوان الباك اند يُقرأ من متغيّر البيئة VITE_API_BASE_URL (راجع src/lib/env.ts
// و .env.example).
// نرسل الكوكيز مع كل طلب (`credentials: "include"`) لأن الباك اند يدير
// الجلسة عبر كوكي (SameSite=None; Secure) بدل Bearer token.

import { env } from "@/lib/env";

export const API_BASE_URL: string = env.API_BASE_URL;

const REQUEST_TIMEOUT_MS = 30_000;

/** يُطلق لما أي طلب (غير مصادقة) يرجع 401 — أي الجلسة/الكوكي انتهت أو ما وصلت
 * للباك اند. مستمع واحد بـ_authenticated/route.tsx بيمسح الجلسة المحلية
 * ويرجّع المستخدم لصفحة الدخول بدل ما يضل عالق بصفحة فاضية بعد "نجاح" ظاهري. */
export const SESSION_EXPIRED_EVENT = "academia-session-expired";

/** الباك اند بيجمّع رسائل التحقق بـ"<br>" (نص HTML) — منحوّلها لنص عادي مقروء. */
export function cleanBackendMessage(message: string): string {
  const withBreaks = message.replace(/<br\s*\/?>/gi, " — ");
  return withBreaks.replace(/\s+/g, " ").trim();
}

/** يستخرج رسالة المستخدم من ردّ خطأ الباك اند بشكليه: {message} (OperationResult)
 * أو ProblemDetails/{errors:{Field:[...]}} يلي بيرجعه [ApiController] تلقائيًا
 * عند فشل التحقق (400) — كان الشكل التاني بينتجاهل ويظهر نص عام "البيانات غير صحيحة". */
function extractBackendMessage(data: unknown): string | undefined {
  if (!data || typeof data !== "object") return undefined;
  const { message, errors } = data as { message?: unknown; errors?: unknown };
  if (typeof message === "string" && message.trim()) return cleanBackendMessage(message);
  if (errors && typeof errors === "object") {
    const messages = Object.values(errors as Record<string, unknown>)
      .flatMap((value) => (Array.isArray(value) ? value : [value]))
      .filter((m): m is string => typeof m === "string" && m.trim().length > 0);
    if (messages.length > 0) return cleanBackendMessage(messages.join("<br>"));
  }
  return undefined;
}

export type ApiErrorKind = "network" | "timeout" | "http" | "parse";

export class ApiError extends Error {
  status: number;
  kind: ApiErrorKind;
  /** رسالة صالحة للعرض مباشرة للمستخدم (عربي/إنجليزي حسب رسالة الباك اند
   * إن وجدت، أو ترجمة عامة واضحة بدل نص تقني زي "Failed to fetch"). */
  userMessage: string;

  constructor(message: string, status: number, kind: ApiErrorKind, userMessage?: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.kind = kind;
    this.userMessage = userMessage ?? message;
  }
}

/** رسائل عامة واضحة حسب نوع/كود الخطأ — تُستخدم فقط لو الباك اند نفسه ما
 * رجّع رسالة واضحة بحقل message (رسائل الباك اند العربية دايمًا لها الأولوية). */
/** يقرأ لغة الواجهة الحالية من <html lang="..."> (تنعكس فورًا مع تبديل
 * اللغة عبر preferences-provider). ما فيه "useTranslation" هون لأنه ملف
 * عادي مش React component — بيشتغل برات وقت رندر. */
export function currentLang(): "ar" | "en" {
  if (typeof document === "undefined") return "ar";
  return document.documentElement.lang === "en" ? "en" : "ar";
}

function friendlyMessageFor(kind: ApiErrorKind, status: number): string {
  const ar = currentLang() === "ar";
  if (kind === "network") {
    return ar
      ? "تعذّر الاتصال بالخادم. تأكد من اتصالك بالإنترنت وحاول مجددًا — إذا استمرت المشكلة، الخادم قد يكون متوقفًا مؤقتًا."
      : "Couldn't reach the server. Check your internet connection and try again — the server may be temporarily down.";
  }
  if (kind === "timeout") {
    return ar
      ? "استغرق الطلب وقتًا أطول من المتوقع. حاول مرة أخرى."
      : "The request took too long. Please try again.";
  }
  if (kind === "parse") {
    return ar
      ? "وصل ردّ غير متوقع من الخادم. حاول مجددًا، وإذا تكررت المشكلة بلّغ الدعم الفني."
      : "Received an unexpected response from the server. Try again, and contact support if it keeps happening.";
  }
  switch (status) {
    case 400:
      return ar
        ? "البيانات المُرسلة غير صحيحة. راجع الحقول وحاول مجددًا."
        : "The submitted data isn't valid. Please check the fields and try again.";
    case 401:
      return ar
        ? "انتهت جلستك أو لم يتم تسجيل الدخول. سجّل الدخول مجددًا للمتابعة."
        : "Your session has ended or you're not signed in. Please sign in again to continue.";
    case 403:
      return ar ? "ليس لديك صلاحية للقيام بهذا الإجراء." : "You don't have permission to do this.";
    case 404:
      return ar ? "لم يتم العثور على البيانات المطلوبة." : "The requested data couldn't be found.";
    case 409:
      return ar
        ? "تعارض في البيانات — قد يكون هذا العنصر معدّلاً من مكان آخر. حدّث الصفحة وحاول مجددًا."
        : "Data conflict — this item may have been changed elsewhere. Refresh the page and try again.";
    case 422:
      return ar
        ? "تعذّر معالجة البيانات المُرسلة. راجع الحقول وحاول مجددًا."
        : "The submitted data couldn't be processed. Please check the fields and try again.";
    case 429:
      return ar
        ? "طلبات كثيرة خلال وقت قصير. انتظر قليلًا وحاول مجددًا."
        : "Too many requests in a short time. Please wait a moment and try again.";
    default:
      if (status >= 500) {
        return ar
          ? "حدث خطأ من جهة الخادم. حاول لاحقًا، وإذا استمرت المشكلة بلّغ الدعم الفني."
          : "A server error occurred. Please try again later, and contact support if it persists.";
      }
      return ar
        ? "حدث خطأ غير متوقع. حاول مجددًا."
        : "An unexpected error occurred. Please try again.";
  }
}

async function request<T>(path: string, init: RequestInit & { json?: unknown } = {}): Promise<T> {
  const { json, headers, ...rest } = init;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  let res: Response;
  try {
    res = await fetch(`${API_BASE_URL}${path}`, {
      ...rest,
      credentials: "include",
      signal: controller.signal,
      headers: {
        Accept: "application/json, text/plain, */*",
        ...(json !== undefined ? { "Content-Type": "application/json" } : {}),
        ...headers,
      },
      body: json !== undefined ? JSON.stringify(json) : rest.body,
    });
  } catch (err) {
    // أي فشل بمستوى الشبكة (لا اتصال، CORS، الخادم متوقف، DNS...) بيوصل هون
    // كـ TypeError خام من fetch نفسه (نص إنجليزي تقني زي "Failed to fetch")
    // — منترجمه لرسالة مفهومة قبل ما توصل لأي مكوّن بالواجهة.
    const kind: ApiErrorKind =
      err instanceof DOMException && err.name === "AbortError" ? "timeout" : "network";
    const raw = err instanceof Error ? err.message : String(err);
    throw new ApiError(raw, 0, kind, friendlyMessageFor(kind, 0));
  } finally {
    clearTimeout(timeoutId);
  }

  // 401 على أي endpoint غير مصادقة = الجلسة غير موجودة/منتهية (نبلّغ قبل أي
  // معالجة للجسم عشان يصير حتى لو الجسم مش JSON).
  if (res.status === 401 && typeof window !== "undefined" && !path.startsWith("/api/Auth/")) {
    window.dispatchEvent(new Event(SESSION_EXPIRED_EVENT));
  }

  const text = await res.text();
  let data: unknown = null;
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      if (!res.ok) {
        throw new ApiError(
          text || res.statusText,
          res.status,
          "parse",
          friendlyMessageFor("parse", res.status),
        );
      }
      // استجابة ناجحة (200) لكن مو JSON — نادرًا ما يصير، منمررها كما هي.
      data = text;
    }
  }

  if (!res.ok) {
    const backendMessage = extractBackendMessage(data);
    const technicalMessage = backendMessage || `${res.status} ${res.statusText}`;
    // رسالة الباك اند (لو موجودة وواضحة) لها الأولوية كـ userMessage — هي
    // أصلاً مكتوبة عربي وموجّهة للمستخدم بمعظم الحالات بهالمشروع. غير هيك
    // منستخدم رسالة عامة واضحة حسب نوع الخطأ بدل النص التقني.
    const userMessage = backendMessage || friendlyMessageFor("http", res.status);
    throw new ApiError(technicalMessage, res.status, "http", userMessage);
  }

  return data as T;
}

export const apiClient = {
  get: <T>(path: string) => request<T>(path, { method: "GET" }),
  post: <T>(path: string, json?: unknown) => request<T>(path, { method: "POST", json }),
  put: <T>(path: string, json?: unknown) => request<T>(path, { method: "PUT", json }),
  delete: <T>(path: string) => request<T>(path, { method: "DELETE" }),
  /** لـ endpoints [FromForm] (زي رفع الملفات) — بدون Content-Type يدوي حتى
   * يحدد المتصفح boundary الـ multipart تلقائيًا. */
  postForm: <T>(path: string, formData: FormData) =>
    request<T>(path, { method: "POST", body: formData }),
  baseUrl: API_BASE_URL,
};

/**
 * استخرج رسالة مفهومة للمستخدم من أي خطأ ممسوك بـ catch. لو الخطأ جاي من
 * apiClient (ApiError) بترجع userMessage المُترجمة (شبكة/مهلة/HTTP)، وإلا
 * أي Error عادي بترجع نصه، وإلا fallback المُمرّرة. استخدمها بكل مكان
 * بدل `err instanceof Error ? err.message : "..."` مباشرة، حتى ما توصل
 * نصوص تقنية زي "Failed to fetch" للواجهة.
 */
/**
 * رسائل خطأ عربية ثابتة تترجَم يدوياً للعرض بالإنجليزي — الدالة الرامية لها
 * تشتغل أحياناً بمسار لا يقدر يقرأ document.documentElement.lang (auth.ts
 * أثناء التحقق من الجلسة)، فمنترجمها هون على مستوى العرض بس.
 */
const KNOWN_ERROR_TRANSLATIONS: Record<string, string> = {
  "تم تسجيل الدخول، لكن تعذّر التحقق من الملف الشخصي":
    "Signed in, but couldn't verify your profile",
};

export function getErrorMessage(err: unknown, fallback: string): string {
  if (err instanceof ApiError) return err.userMessage;
  if (err instanceof Error) {
    if (currentLang() === "en" && KNOWN_ERROR_TRANSLATIONS[err.message]) {
      return KNOWN_ERROR_TRANSLATIONS[err.message];
    }
    return err.message;
  }
  return fallback;
}

/** يرمي رسالة تحقق مطابقة للغة الواجهة الحالية — للاستخدام بملفات التكامل
 * العادية (admin-users.ts وغيرها) يلي مش مكوّنات React وما فيها useTranslation. */
export function throwBilingual(ar: string, en: string): never {
  throw new Error(currentLang() === "ar" ? ar : en);
}
