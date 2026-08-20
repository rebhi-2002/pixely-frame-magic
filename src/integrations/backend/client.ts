// عميل HTTP للباك اند (ASP.NET) الخاص بمشروعنا — يحلّ محلّ Supabase.
//
// عنوان الباك اند يُقرأ من متغيّر البيئة VITE_API_BASE_URL (راجع ملف .env.example).
// نرسل الكوكيز مع كل طلب (`credentials: "include"`) لأن Swagger لا يُظهر أي
// token في استجابة /api/Auth/Login — الافتراض هو أن ASP.NET يدير الجلسة عبر
// كوكي HttpOnly تلقائي (السلوك الافتراضي لمعظم مشاريع ASP.NET Identity).
//
// ⚠️ لم نتمكن من تأكيد هذا فعلياً لأن الشبكة هنا لا تسمح بالوصول لعنوان
// academiatawjihi.runasp.net (مضيف غير مُدرَج بقائمة الشبكة المسموحة). افتح
// أدوات المطوّر بالمتصفح (تبويب Network) بعد تسجيل دخول ناجح وتأكد إن فيه
// Set-Cookie براجعة الاستجابة. إذا الباك اند بيرجع Bearer token بدل الكوكي،
// بلّغني وبكيّف auth.ts بثواني.

export const API_BASE_URL: string =
  (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/+$/, "") ??
  "https://localhost:7176";

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function request<T>(path: string, init: RequestInit & { json?: unknown } = {}): Promise<T> {
  const { json, headers, ...rest } = init;
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...rest,
    credentials: "include",
    headers: {
      Accept: "application/json, text/plain, */*",
      ...(json !== undefined ? { "Content-Type": "application/json" } : {}),
      ...headers,
    },
    body: json !== undefined ? JSON.stringify(json) : rest.body,
  });

  const text = await res.text();
  const data = text ? safeParseJson(text) : null;

  if (!res.ok) {
    const parsedMessage =
      data && typeof data === "object" && "message" in data
        ? (data as { message?: string }).message
        : undefined;
    const message = parsedMessage || `${res.status} ${res.statusText}`;
    throw new ApiError(message, res.status);
  }

  return data as T;
}

function safeParseJson(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

export const apiClient = {
  get: <T>(path: string) => request<T>(path, { method: "GET" }),
  post: <T>(path: string, json?: unknown) => request<T>(path, { method: "POST", json }),
};
