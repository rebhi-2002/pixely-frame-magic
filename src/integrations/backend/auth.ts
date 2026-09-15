// تكامل المصادقة الحالي مع ASP.NET Identity في باك إند academia.
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
  /** true فقط إذا صار تسجيل الحساب بهالجلسة بالذات (لحظة التسجيل، مو
   * تسجيل دخول لاحق) — إشارة حقيقية الوحيدة المتوفرة لدينا لـ"مستخدم
   * جديد" (الباك اند ما بيرجع تاريخ إنشاء الحساب بـMyProfileModal).
   * تُستهلك بـsrc/lib/onboarding.ts لعرض قائمة الخطوات الأولى مرة وحدة. */
  justRegistered?: boolean;
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

/** يحدّث بيانات الجلسة المخزّنة محليًا بعد نجاح تعديل حقيقي (تعديل ملف
 * شخصي، تحديد نوع مستخدم بعد fetchUserType...) — بدون ما نصدّر
 * writeStoredSession/readStoredSession أنفسهم لتبقى إدارة الجلسة مركزية
 * بهالملف. */
function patchStoredProfile(patch: Partial<StoredProfile>): void {
  const session = readStoredSession();
  if (!session?.profile) return;
  writeStoredSession({ ...session, profile: { ...session.profile, ...patch } });
}

export interface UpdateProfileInput {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  genderId: number;
}

/** تعديل الملف الشخصي الحقيقي — POST /api/User/MyProfile. متاح فقط
 * لجلسة حقيقية (مو ديمو)؛ بعد النجاح نحدّث الجلسة المخزّنة محليًا حتى
 * تنعكس فورًا بكل مكان بيقرأ StoredProfile (القائمة الجانبية، الإعدادات...). */
export async function updateMyProfile(input: UpdateProfileInput): Promise<void> {
  const result = await apiClient.post<{ success: boolean; message?: string | null }>(
    "/api/User/MyProfile",
    {
      id: input.id,
      name: input.name,
      email: input.email,
      phoneNumber: input.phoneNumber,
      genderId: input.genderId,
    },
  );
  if (!result?.success) {
    throw new Error(result?.message || "تعذّر حفظ التعديلات");
  }
  patchStoredProfile({
    name: input.name,
    email: input.email,
    phoneNumber: input.phoneNumber,
    genderId: input.genderId,
  });
}

export interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

/** تغيير كلمة المرور الحقيقي — POST /api/User/ChangePassword. الباك اند
 * نفسه بيتحقق من تطابق newPassword/confirmPassword (Compare attribute)
 * وصحة currentPassword — رسالة الخطأ (مثلاً "كلمة المرور الحالية غير
 * صحيحة") جاية من الباك اند مباشرة. */
export async function changeMyPassword(input: ChangePasswordInput): Promise<void> {
  const result = await apiClient.post<{ success: boolean; message?: string | null }>(
    "/api/User/ChangePassword",
    {
      currentPassword: input.currentPassword,
      newPassword: input.newPassword,
      confirmPassword: input.confirmPassword,
    },
  );
  if (!result?.success) {
    throw new Error(result?.message || "تعذّر تغيير كلمة المرور");
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
async function fetchUserType(
  userId: string,
): Promise<{ roleId: number | null; roleName: string | null }> {
  try {
    const modal = await apiClient.get<{
      user?: { userTypeId?: number | null; userType?: { name?: string | null } | null } | null;
      User?: { userTypeId?: number | null; userType?: { name?: string | null } | null } | null;
    }>(`/api/User/CreateEditModal?id=${encodeURIComponent(userId)}`);
    const u = modal?.user ?? modal?.User;
    const roleId = typeof u?.userTypeId === "number" ? u.userTypeId : null;
    const roleName = typeof u?.userType?.name === "string" ? u.userType.name : null;
    if (roleId == null) {
      console.warn(
        "[auth] fetchUserType: userTypeId غير موجود بالاستجابة — تحقق من شكل الـJSON الفعلي:",
        modal,
      );
    }
    return { roleId, roleName };
  } catch (err) {
    console.error("[auth] fetchUserType failed — سيتم التعامل مع المستخدم كطالب افتراضيًا:", err);
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

export interface RegisterInput {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  genderId: number;
  /** نوع المستخدم (3=الطالب، 5=ولي الامر، 4=المعلم...) — راجع
   * listBackendUserTypes() بـ admin-permissions.ts لجلبها ديناميكيًا. */
  userTypeId: number;
}

/** الباك اند بينشئ الحساب، ينشئ Wallet تلقائيًا، ويسجّل الدخول فورًا لو نجح
 * (SignInManager.SignInAsync)، فمنجيب البروفايل فورًا بعدها متل login(). */
export async function register(input: RegisterInput): Promise<void> {
  const result = await apiClient.post<OperationResult>("/api/Auth/Register", {
    name: input.name,
    email: input.email,
    phoneNumber: input.phoneNumber,
    password: input.password,
    confirmPassword: input.confirmPassword,
    genderId: input.genderId,
    userTypeId: input.userTypeId,
  });

  if (!result?.success) {
    throw new Error(result?.message || "تعذّر إنشاء الحساب");
  }

  const payload = await apiClient.get<ProfileEnvelope>("/api/User/MyProfileModal");
  const profile = normalizeProfile(payload);
  if (!profile) {
    throw new Error("تم إنشاء الحساب، لكن تعذّر التحقق من الملف الشخصي");
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
    justRegistered: true,
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

/** true فقط لأول جلسة بعد نجاح التسجيل — إشارة ابتدائية لعرض قائمة
 * "خطواتك الأولى" تلقائيًا أول مرة. لا تُستهلك/تُطفى هون عمدًا (القرار
 * الدائم لعرض/إخفاء القائمة عبر عمر الحساب بيتحكم فيه onboarding.ts
 * بعلم منفصل مربوط بـuserId، مش بهالعلم المؤقت). */
export function wasJustRegistered(): boolean {
  return readStoredSession()?.justRegistered === true;
}

/** UserTypeId=1 ("مدير النظام") — الوحيد المتاح فعليًا على الباك اند حاليًا. */
export function isRealAdmin(): boolean {
  const session = readStoredSession();
  return session?.isDemo === false && session.profile?.roleId === 1;
}
