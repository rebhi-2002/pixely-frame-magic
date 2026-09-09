// تكامل المصادقة الحالي مع ASP.NET Identity في باك إند Acadimia.
// المتاح حاليًا: Login وLogout وMyProfileModal.
// إلى أن يضيف الباك إند endpoint /me وصلاحيات فعلية، تبقى حراسة الواجهة
// المحلية مؤقتة ولا تُعدّ بديلًا عن التحقق على الخادم.

import { apiClient, ApiError } from "./client";

const AUTH_STORAGE_KEY = "academia.auth";
export const AUTH_EVENT = "academia-auth-changed";
export const DEMO_USER_COOKIE = "academia_demo_user";

export interface OperationResult {
  success: boolean;
  message?: string | null;
  returnId?: number;
  isNameChanged?: boolean;
  newName?: string | null;
  isAvatarChanged?: boolean;
  newAvatar?: string | null;
  oldAvatar?: string | null;
  fileName?: string | null;
}

export interface StoredProfile {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string | null;
  genderId?: number | null;
  avatar?: string | null;
  roleId?: number | string | null;
  roleName?: string | null;
}

interface StoredSession {
  email: string | null;
  loggedInAt: number;
  userId: string;
  isDemo: boolean;
  profile: StoredProfile | null;
}

type ProfileEnvelope = {
  myProfileDto?: Partial<StoredProfile> | null;
  MyProfileDto?: Partial<StoredProfile> | null;
};

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
    // هذه الكوكي مؤقتة لحراسة الواجهة المحلية فقط، وليست حدًا أمنيًا.
    document.cookie = `${DEMO_USER_COOKIE}=${encodeURIComponent(session.userId)}; path=/; max-age=86400; samesite=lax`;
  } else {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    document.cookie = `${DEMO_USER_COOKIE}=; path=/; max-age=0; samesite=lax`;
  }

  window.dispatchEvent(new Event(AUTH_EVENT));
}

function normalizeProfile(payload: ProfileEnvelope): StoredProfile | null {
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
    roleName: typeof raw.roleName === "string" ? raw.roleName : null,
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
async function fetchUserType(
  userId: string,
): Promise<{ roleId: number | null; roleName: string | null }> {
  try {
    const modal = await apiClient.get<{
      user?: { userTypeId?: number | null; userType?: { name?: string | null } | null } | null;
      User?: { userTypeId?: number | null; userType?: { name?: string | null } | null } | null;
    }>(`/api/User/CreateEditModal?id=${encodeURIComponent(userId)}`);
    const u = modal?.user ?? modal?.User;
    return {
      roleId: typeof u?.userTypeId === "number" ? u.userTypeId : null,
      roleName: typeof u?.userType?.name === "string" ? u.userType.name : null,
    };
  } catch {
    return { roleId: null, roleName: null };
  }
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

  const payload = await apiClient.get<ProfileEnvelope>("/api/User/MyProfileModal");
  const profile = normalizeProfile(payload);
  if (!profile) {
    // TODO(temp-debug): احذف هالسطر بعد ما نتأكد من شكل الاستجابة الحقيقي.
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
    profile,
  });
}

/** دخول محلي مؤقت لاختبار الأدوار التي لم يدعمها الباك إند بعد.
 * نفس شرط الظهور بالضبط يلي بيتحكم بظهور أزرار الدخول التجريبي بـlogin.tsx
 * (demoEnabled) — لازم يضلوا متطابقين وإلا الزر بيظهر بس الضغط عليه بيفشل. */
export function loginAsDemo(userId: string): void {
  const demoAllowed = import.meta.env.DEV || import.meta.env.VITE_ENABLE_DEMO_LOGIN === "true";
  if (!demoAllowed) {
    throw new Error("الدخول التجريبي متاح في بيئة التطوير فقط");
  }

  writeStoredSession({
    email: null,
    loggedInAt: Date.now(),
    userId,
    isDemo: true,
    profile: null,
  });
}

export function isDemoSession(): boolean {
  return readStoredSession()?.isDemo === true;
}

/** يتحقق من جلسة ASP.NET Identity من خلال endpoint الخادم. */
export async function verifyServerSession(): Promise<boolean> {
  if (typeof window === "undefined" || isDemoSession()) return false;

  try {
    const payload = await apiClient.get<ProfileEnvelope>("/api/User/MyProfileModal");
    const profile = normalizeProfile(payload);
    if (!profile) return false;

    const current = readStoredSession();
    writeStoredSession({
      email: profile.email,
      loggedInAt: current?.loggedInAt ?? Date.now(),
      userId: profile.id,
      isDemo: false,
      profile,
    });
    return true;
  } catch (err) {
    if (err instanceof ApiError && [401, 403].includes(err.status)) {
      writeStoredSession(null);
    }
    return false;
  }
}

export async function logout(): Promise<void> {
  const wasDemo = readStoredSession()?.isDemo;
  try {
    if (!wasDemo) {
      // الباك إند يعرّف Logout كـ POST.
      await apiClient.post<OperationResult>("/api/Auth/Logout");
    }
  } catch (err) {
    if (!(err instanceof ApiError)) console.error(err);
  } finally {
    writeStoredSession(null);
  }
}

/** فحص محلي للواجهة فقط؛ التحقق الأمني يجب أن يبقى في الباك إند. */
export function isAuthenticated(): boolean {
  return readStoredSession() !== null;
}

export function getStoredEmail(): string | null {
  return readStoredSession()?.email ?? null;
}

export function getStoredUserId(): string | null {
  return readStoredSession()?.userId ?? null;
}

export function getStoredProfile(): StoredProfile | null {
  return readStoredSession()?.profile ?? null;
}

/** UserTypeId=1 ("مدير النظام") — الوحيد المتاح فعليًا على الباك اند حاليًا. */
export function isRealAdmin(): boolean {
  const session = readStoredSession();
  return session?.isDemo === false && session.profile?.roleId === 1;
}
