// طبقة تسجيل الدخول/الخروج الجديدة — تستبدل Supabase Auth بالكامل.
//
// حالياً الباك اند (راجع swagger) بيوفر فقط:
//   POST /api/Auth/Login   { email, password, returnUrl } -> OperationResult
//   GET  /api/Auth/Logout
// ما في أي endpoint لجلب بيانات المستخدم الحالي (لا "/me" ولا role بالاستجابة).
// أي تسجيل دخول حقيقي ناجح (success: true) بيتعامل معه التطبيق كـ "مدير عام"
// (u-admin بملف rbac-static-data.ts).
//
// الجلسة الفعلية (هل الطلبات القادمة للباك اند مصرّح فيها) بيقررها كوكي
// الـ ASP.NET نفسه اللي المفروض ينضبط تلقائياً عند نجاح /api/Auth/Login
// (`credentials: "include"` بملف client.ts).
//
// ── دخول تجريبي محلي (Demo login) ──────────────────────────────────────
// عشان تقدروا تجربوا لوحات التحكم الخمسة كلها (مدير عام/مشرف/معلم/ولي أمر/
// طالب) بدون باك اند حقيقي لكل دور، في `loginAsDemo()` تحت — محلي بالكامل،
// صفر نداءات شبكة، صفر Lovable، صفر Supabase. بس بيضبط علم محلي (localStorage)
// + كوكي بسيط (`academia_demo_user`) عشان دوال السيرفر (rbac.functions.ts)
// تعرف مين "الهوية الحالية" وقت تحسب الصلاحيات/القائمة الجانبية. احذف
// loginAsDemo + أزرار "دخول سريع" بصفحة /login أول ما يصير عندكم تسجيل دخول
// حقيقي متعدد الأدوار من الباك اند.

import { apiClient, ApiError } from "./client";

const AUTH_STORAGE_KEY = "academia.auth";
export const AUTH_EVENT = "academia-auth-changed";
export const DEMO_USER_COOKIE = "academia_demo_user";

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
  email: string | null;
  loggedInAt: number;
  userId: string;
  isDemo: boolean;
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
    // كوكي بسيط غير httpOnly — بس عشان server functions تعرف الهوية الحالية
    // (راجع src/integrations/backend/auth-middleware.ts). عمر يوم واحد.
    document.cookie = `${DEMO_USER_COOKIE}=${session.userId}; path=/; max-age=86400; samesite=lax`;
  } else {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    document.cookie = `${DEMO_USER_COOKIE}=; path=/; max-age=0`;
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

  writeStoredSession({ email, loggedInAt: Date.now(), userId: "u-admin", isDemo: false });
}

/**
 * دخول تجريبي محلي بالكامل — بدون أي نداء شبكة. راجع الشرح فوق.
 * @param userId معرّف المستخدم التجريبي من USERS بملف rbac-static-data.ts
 */
export function loginAsDemo(userId: string): void {
  writeStoredSession({ email: null, loggedInAt: Date.now(), userId, isDemo: true });
}

export async function logout(): Promise<void> {
  const wasDemo = readStoredSession()?.isDemo;
  try {
    // حسابات الدخول التجريبي محلية بالكامل — ما في داعي نبلّغ الباك اند
    // الحقيقي عنها أصلاً.
    if (!wasDemo) await apiClient.get<void>("/api/Auth/Logout");
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

export function getStoredUserId(): string | null {
  return readStoredSession()?.userId ?? null;
}
