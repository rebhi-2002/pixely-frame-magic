// عميل HTTP للباك اند (ASP.NET) الخاص بمشروعنا — يحلّ محلّ Supabase.
//
// عنوان الباك اند يُقرأ من متغيّر البيئة VITE_API_BASE_URL (راجع ملف .env.example).
// نرسل الكوكيز مع كل طلب (`credentials: "include"`) لأن الباك اند يدير
// الجلسة عبر كوكي (SameSite=None; Secure) بدل Bearer token.

export const API_BASE_URL: string =
  (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/+$/, "") ??
  "https://localhost:7176";

const REQUEST_TIMEOUT_MS = 20_000;

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
function friendlyMessageFor(kind: ApiErrorKind, status: number): string {
  if (kind === "network") {
    return "تعذّر الاتصال بالخادم. تأكد من اتصالك بالإنترنت وحاول مجددًا — إذا استمرت المشكلة، الخادم قد يكون متوقفًا مؤقتًا.";
  }
  if (kind === "timeout") {
    return "استغرق الطلب وقتًا أطول من المتوقع. حاول مرة أخرى.";
  }
  if (kind === "parse") {
    return "وصل ردّ غير متوقع من الخادم. حاول مجددًا، وإذا تكررت المشكلة بلّغ الدعم الفني.";
  }
  switch (status) {
    case 400:
      return "البيانات المُرسلة غير صحيحة. راجع الحقول وحاول مجددًا.";
    case 401:
      return "انتهت جلستك أو لم يتم تسجيل الدخول. سجّل الدخول مجددًا للمتابعة.";
    case 403:
      return "ليس لديك صلاحية للقيام بهذا الإجراء.";
    case 404:
      return "لم يتم العثور على البيانات المطلوبة.";
    case 409:
      return "تعارض في البيانات — قد يكون هذا العنصر معدّلاً من مكان آخر. حدّث الصفحة وحاول مجددًا.";
    case 422:
      return "تعذّر معالجة البيانات المُرسلة. راجع الحقول وحاول مجددًا.";
    case 429:
      return "طلبات كثيرة خلال وقت قصير. انتظر قليلًا وحاول مجددًا.";
    default:
      if (status >= 500) {
        return "حدث خطأ من جهة الخادم. حاول لاحقًا، وإذا استمرت المشكلة بلّغ الدعم الفني.";
      }
      return "حدث خطأ غير متوقع. حاول مجددًا.";
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
    const kind: ApiErrorKind = err instanceof DOMException && err.name === "AbortError" ? "timeout" : "network";
    const raw = err instanceof Error ? err.message : String(err);
    throw new ApiError(raw, 0, kind, friendlyMessageFor(kind, 0));
  } finally {
    clearTimeout(timeoutId);
  }

  const text = await res.text();
  let data: unknown = null;
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      if (!res.ok) {
        throw new ApiError(text || res.statusText, res.status, "parse", friendlyMessageFor("parse", res.status));
      }
      // استجابة ناجحة (200) لكن مو JSON — نادرًا ما يصير، منمررها كما هي.
      data = text;
    }
  }

  if (!res.ok) {
    const backendMessage =
      data && typeof data === "object" && "message" in data
        ? (data as { message?: string | null }).message
        : undefined;
    const technicalMessage = backendMessage || `${res.status} ${res.statusText}`;
    // رسالة الباك اند (لو موجودة وواضحة) لها الأولوية كـ userMessage — هي
    // أصلاً مكتوبة عربي وموجّهة للمستخدم بمعظم الحالات بهالمشروع. غير هيك
    // منستخدم رسالة عامة واضحة حسب نوع الخطأ بدل النص التقني.
    const userMessage = backendMessage?.trim() || friendlyMessageFor("http", res.status);
    throw new ApiError(technicalMessage, res.status, "http", userMessage);
  }

  return data as T;
}

export const apiClient = {
  get: <T>(path: string) => request<T>(path, { method: "GET" }),
  post: <T>(path: string, json?: unknown) => request<T>(path, { method: "POST", json }),
  delete: <T>(path: string) => request<T>(path, { method: "DELETE" }),
};

/**
 * استخرج رسالة مفهومة للمستخدم من أي خطأ ممسوك بـ catch. لو الخطأ جاي من
 * apiClient (ApiError) بترجع userMessage المُترجمة (شبكة/مهلة/HTTP)، وإلا
 * أي Error عادي بترجع نصه، وإلا fallback المُمرّرة. استخدمها بكل مكان
 * بدل `err instanceof Error ? err.message : "..."` مباشرة، حتى ما توصل
 * نصوص تقنية زي "Failed to fetch" للواجهة.
 */
export function getErrorMessage(err: unknown, fallback: string): string {
  if (err instanceof ApiError) return err.userMessage;
  if (err instanceof Error) return err.message;
  return fallback;
}
