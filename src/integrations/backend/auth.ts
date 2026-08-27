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

export async function login(email: string, password: string): Promise<void> {
  const result = await apiClient.post<OperationResult>("/api/Auth/Login", {
    email,
    password,
    returnUrl: "",
  });

  if (!result?.success) {
    throw new Error(result?.message || "تعذّر تسجيل الدخول");
  }

  let profile: StoredProfile | null = null;
  try {
    const payload = await apiClient.get<ProfileEnvelope>("/api/User/MyProfileModal");
    profile = normalizeProfile(payload);
  } catch {
    // Login نفسه نجح؛ لا نمنع الدخول إذا كان endpoint الملف غير جاهز.
  }

  writeStoredSession({
    email: profile?.email ?? email,
    loggedInAt: Date.now(),
    userId: profile?.id ?? "u-admin",
    isDemo: false,
    profile,
  });
}

/** دخول محلي مؤقت لاختبار الأدوار التي لم يدعمها الباك إند بعد. */
export function loginAsDemo(userId: string): void {
  writeStoredSession({
    email: null,
    loggedInAt: Date.now(),
    userId,
    isDemo: true,
    profile: null,
  });
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
