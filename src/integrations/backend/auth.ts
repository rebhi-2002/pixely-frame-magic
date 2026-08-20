// طبقة تسجيل الدخول/الخروج الجديدة — تستبدل Supabase Auth بالكامل.
//
// حالياً الباك اند (راجع swagger) بيوفر فقط:
//   POST /api/Auth/Login   { email, password, returnUrl } -> OperationResult
//   GET  /api/Auth/Logout
// ما في أي endpoint لجلب بيانات المستخدم الحالي (لا "/me" ولا role بالاستجابة)،
// وما في غير حساب أدمن واحد شغّال حالياً. فـ:
//   - أي تسجيل دخول ناجح (success: true) بيتعامل معه التطبيق كـ "أدمن".
//   - ما فيه Sign up / نسيت كلمة السر / إلخ حالياً (صفحاتهم موجودة بالفرونت
//     بس معطّلة مؤقتاً لحد ما يضيف الباك اند لهم endpoints — دوّر على "قيد
//     التطوير" بالكود).
//
// الجلسة الفعلية (هل الطلبات القادمة للباك اند مصرّح فيها) بيقررها كوكي
// الـ ASP.NET نفسه اللي المفروض ينضبط تلقائياً عند نجاح /api/Auth/Login
// (`credentials: "include"` بملف client.ts). العلم المحلي تحت هو بس لتفعيل/
// تعطيل واجهات الفرونت بسرعة (إظهار القائمة الجانبية، الحراسة على المسارات..)
// وما بيغني عن الكوكي الحقيقي.

import { apiClient, ApiError } from "./client";

const AUTH_STORAGE_KEY = "academia.auth";
export const AUTH_EVENT = "academia-auth-changed";

export interface OperationResult {
  success: boolean;
  message: string;
  returnId?: number;
  isNameChanged?: boolean;
  newName?: string;
  isAvatarChanged?: boolean;
  newAvatar?: string;
  oldAvatar?: string;
  fileName?: string;
}

interface StoredSession {
  email: string;
  loggedInAt: number;
}

function readStoredSession(): StoredSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StoredSession) : null;
  } catch {
    return null;
  }
}

function writeStoredSession(session: StoredSession | null) {
  if (typeof window === "undefined") return;
  if (session) {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
  } else {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }
  window.dispatchEvent(new Event(AUTH_EVENT));
}

export async function login(email: string, password: string): Promise<void> {
  const result = await apiClient.post<OperationResult>("/api/Auth/Login", {
    email,
    password,
    returnUrl: "",
  });

  if (!result?.success) {
    throw new Error(result?.message || "تعذّر تسجيل الدخول");
  }

  writeStoredSession({ email, loggedInAt: Date.now() });
}

export async function logout(): Promise<void> {
  try {
    await apiClient.get<void>("/api/Auth/Logout");
  } catch (err) {
    // ما نوقف تسجيل الخروج محلياً حتى لو فشل نداء السيرفر (مثلاً الجلسة
    // منتهية أصلاً) — أهم شي نظّف الحالة المحلية.
    if (!(err instanceof ApiError)) console.error(err);
  } finally {
    writeStoredSession(null);
  }
}

/** فحص محلي سريع (بدون نداء شبكة) — يُستخدم لحراسة المسارات وواجهة الهيدر. */
export function isAuthenticated(): boolean {
  return readStoredSession() !== null;
}

export function getStoredEmail(): string | null {
  return readStoredSession()?.email ?? null;
}
