// تكامل المصادقة الحالي مع ASP.NET Identity في باك إند academia.
// المتاح حاليًا: Login وLogout وMyProfileModal.
// إلى أن يضيف الباك إند endpoint /me وصلاحيات فعلية، تبقى حراسة الواجهة
// المحلية مؤقتة ولا تُعدّ بديلًا عن التحقق على الخادم.

import { loadBackendUserOptions } from "./admin-users";
import type { RoleKey } from "@/lib/bi";
import { parseRoleKey } from "./user-types";
import { apiClient, ApiError, cleanBackendMessage, currentLang } from "./client";

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
  /** مفتاح الدور الثابت من الباك اند (admin|student|teacher|parent) — المرجع الوحيد للتوجيه والصلاحيات. */
  roleKey?: RoleKey | null;
}

interface StoredSession {
  email: string | null;
  loggedInAt: number;
  userId: string;
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
  /** نوع المستخدم — الباك اند صار يرجّعه بنفس ردّ MyProfileModal (مستوى الغلاف،
   * مش داخل MyProfileDto لأنه DTO مشترك مع تعديل الملف الشخصي). */
  userTypeId?: number | null;
  UserTypeId?: number | null;
  userTypeName?: string | null;
  UserTypeName?: string | null;
  userTypeCode?: string | null;
  UserTypeCode?: string | null;
};

type ResolvedRole = { roleId: number | null; roleName: string | null; roleKey: RoleKey | null };

function roleFromEnvelope(payload: ProfileEnvelope): ResolvedRole {
  const id = payload?.userTypeId ?? payload?.UserTypeId;
  const name = payload?.userTypeName ?? payload?.UserTypeName;
  return {
    roleId: typeof id === "number" ? id : null,
    roleName: typeof name === "string" && name.length > 0 ? name : null,
    roleKey: parseRoleKey(payload?.userTypeCode ?? payload?.UserTypeCode),
  };
}

/** نتيجة عملية (OperationResult) فاشلة → Error برسالة نظيفة (بدون <br>). */
function operationError(result: { message?: string | null } | null | undefined, fallback: string) {
  return new Error(result?.message ? cleanBackendMessage(result.message) : fallback);
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
    throw operationError(result, "تعذّر حفظ التعديلات");
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
    throw operationError(result, "تعذّر تغيير كلمة المرور");
  }
}

function writeStoredSession(session: StoredSession | null) {
  if (typeof window === "undefined") return;

  const previous = localStorage.getItem(AUTH_STORAGE_KEY);
  const next = session ? JSON.stringify(session) : null;

  if (session) {
    localStorage.setItem(AUTH_STORAGE_KEY, next as string);
    // هذه الكوكي مؤقتة لحراسة الواجهة المحلية فقط، وليست حدًا أمنيًا.
    document.cookie = `${DEMO_USER_COOKIE}=${encodeURIComponent(session.userId)}; path=/; max-age=86400; samesite=lax`;
  } else {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    document.cookie = `${DEMO_USER_COOKIE}=; path=/; max-age=0; samesite=lax`;
  }

  // ما منبلّغ المستمعين إلا لو الجلسة تغيّرت فعلاً. verifyServerSession بيكتب
  // الجلسة عند كل فحص (كل beforeLoad)، وAuthSync (__root.tsx) بيعمل
  // router.invalidate() عند كل AUTH_EVENT → بدون هالشرط كانت حلقة لا نهائية:
  // beforeLoad → verify → كتابة → حدث → invalidate → beforeLoad → ... (عشرات طلبات
  // MyProfileModal بالثانية، وتنقّل عالق بصفحة الدخول).
  if (next === previous) return;

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
    roleKey: parseRoleKey(raw.roleKey),
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
async function fetchUserType(userId: string): Promise<ResolvedRole> {
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
    return { roleId, roleName, roleKey: null };
  } catch (err) {
    console.error("[auth] fetchUserType failed — سيتم التعامل مع المستخدم كطالب افتراضيًا:", err);
    return { roleId: null, roleName: null, roleKey: null };
  }
}

/**
 * يجيب ملف المستخدم مباشرة بعد Login/Register ناجحين، ويشرح للمستخدم سبب الفشل
 * بدل رسالة عامة:
 * - 401: الباك اند قَبِل الدخول لكن المتصفح ما رجّع كوكي الجلسة بالطلب التالي
 *   (كوكيز الطرف الثالث محجوبة، أو اتصال مباشر cross-origin بدون بروكسي).
 * - 403: الحساب اتأكّد (الدخول/التسجيل نجح) لكن الخادم رفض تحميل الملف الشخصي —
 *   يعني صلاحيات هالنوع من الحسابات مش مكتملة بالخادم (مو خطأ ببيانات المستخدم).
 */
async function fetchProfilePayloadAfterAuth(kind: "login" | "register"): Promise<ProfileEnvelope> {
  try {
    return await apiClient.get<ProfileEnvelope>("/api/User/MyProfileModal");
  } catch (err) {
    const ar = currentLang() === "ar";
    if (err instanceof ApiError && err.status === 401) {
      throw new Error(
        ar
          ? "تم قبول بيانات الدخول لكن المتصفح لم يحتفظ بجلسة الدخول (الكوكي). جرّب تعطيل حظر الكوكيز لهذا الموقع أو تحديث الصفحة، وإذا استمرت المشكلة بلّغ الدعم."
          : "Your credentials were accepted but the browser did not keep the sign-in session (cookie). Allow cookies for this site or refresh, and contact support if it persists.",
      );
    }
    if (err instanceof ApiError && err.status === 403) {
      throw new Error(
        kind === "register"
          ? ar
            ? "تم إنشاء حسابك بنجاح، لكن الخادم لم يسمح بتحميل ملفك الشخصي بعد (صلاحيات الحساب غير مكتملة). لا تُعد التسجيل بنفس البيانات؛ حاول تسجيل الدخول لاحقًا أو تواصل مع الدعم."
            : "Your account was created, but the server didn't allow loading your profile yet (account permissions are incomplete). Don't register again with the same details — try signing in later or contact support."
          : ar
            ? "تم التحقق من بياناتك، لكن الخادم لم يسمح بتحميل ملفك الشخصي (صلاحيات حسابك غير مكتملة). ليس الخطأ من بياناتك — تواصل مع الدعم."
            : "Your credentials are correct, but the server didn't allow loading your profile (your account permissions are incomplete). This isn't caused by your details — contact support.",
      );
    }
    throw err;
  }
}

/** الدور من ردّ MyProfileModal مباشرة (الأدق)، وإلا fallback لنداء CreateEditModal
 * (بيشتغل للأدمن بس — غير الأدمن بياخد 403 فبنرجع null). */
async function resolveRole(payload: ProfileEnvelope, userId: string): Promise<ResolvedRole> {
  const fromEnvelope = roleFromEnvelope(payload);
  if (fromEnvelope.roleKey != null || fromEnvelope.roleId != null) return fromEnvelope;
  return fetchUserType(userId);
}

export async function login(email: string, password: string): Promise<void> {
  const result = await apiClient.post<OperationResult>("/api/Auth/Login", {
    email,
    password,
    returnUrl: "",
  });

  if (!result?.success) {
    throw operationError(result, "تعذّر تسجيل الدخول");
  }

  const payload = await fetchProfilePayloadAfterAuth("login");
  const profile = normalizeProfile(payload);
  if (!profile) {
    // TODO(temp-debug): احذف هالسطر بعد ما نتأكد من شكل الاستجابة الحقيقي.
    console.error("MyProfileModal payload لم يطابق الشكل المتوقع:", payload);
    throw new Error("تم تسجيل الدخول، لكن تعذّر التحقق من الملف الشخصي");
  }

  // تسجيل الدخول ما فيه دور مختار من المستخدم: الدور من ردّ MyProfileModal، وإلا fetchUserType.
  const userType = await resolveRole(payload, profile.id);

  profile.roleId = userType.roleId;
  profile.roleName = userType.roleName;
  profile.roleKey = userType.roleKey;

  writeStoredSession({
    email: profile.email,
    loggedInAt: Date.now(),
    userId: profile.id,
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
  /** رقم نوع المستخدم من RegistrationOptions (يختلف بين البيئات) — اختره بـ findUserTypeForRole(roles, role)
   * حسب الـcode، ما تكتب رقم بالكود. */
  userTypeId: number;
  /** مفتاح الدور الذي اختاره المستخدم بصفحة التسجيل (student|teacher|parent). يُستخدم كاحتياط
   * لو ما رجّع الباك اند الدور بردّ MyProfileModal (CreateEditModal للأدمن فقط). */
  roleKey?: RoleKey | null;
}

/** الباك اند بينشئ الحساب، ينشئ Wallet تلقائيًا، ويسجّل الدخول فورًا لو نجح
 * (SignInManager.SignInAsync)، فمنجيب البروفايل فورًا بعدها متل login(). */
export async function register(input: RegisterInput): Promise<void> {
  let result: OperationResult;
  try {
    result = await apiClient.post<OperationResult>("/api/Auth/Register", {
      name: input.name,
      email: input.email,
      phoneNumber: input.phoneNumber,
      password: input.password,
      confirmPassword: input.confirmPassword,
      genderId: input.genderId,
      userTypeId: input.userTypeId,
    });
  } catch (err) {
    // خطأ خادم (5xx) وقت التسجيل: بالتجربة أكثر سبب معروف هو رقم هاتف مسجّل مسبقًا
    // (فهرس فريد بقاعدة البيانات) — بنوضّحه بدل "حدث خطأ بالخادم" العامة.
    if (err instanceof ApiError && err.status >= 500) {
      throw new Error(
        currentLang() === "ar"
          ? "تعذّر إنشاء الحساب بسبب خطأ في الخادم. قد يكون رقم الهاتف أو البريد الإلكتروني مسجّلًا مسبقًا — جرّب بيانات مختلفة، وإن استمر الخطأ تواصل مع الدعم."
          : "We couldn't create your account because of a server error. The phone number or email may already be registered — try different details, and contact support if it persists.",
      );
    }
    throw err;
  }

  if (!result?.success) {
    throw operationError(result, "تعذّر إنشاء الحساب");
  }

  const payload = await fetchProfilePayloadAfterAuth("register");
  const profile = normalizeProfile(payload);
  if (!profile) {
    throw new Error("تم إنشاء الحساب، لكن تعذّر التحقق من الملف الشخصي");
  }

  const fromEnvelope = roleFromEnvelope(payload);
  const userType: ResolvedRole =
    fromEnvelope.roleKey != null || fromEnvelope.roleId != null
      ? fromEnvelope
      : input.roleKey
        ? { roleId: input.userTypeId, roleName: null, roleKey: input.roleKey }
        : await resolveRole(payload, profile.id);
  profile.roleId = userType.roleId ?? input.userTypeId;
  profile.roleName = userType.roleName;
  profile.roleKey = userType.roleKey ?? input.roleKey ?? null;

  writeStoredSession({
    email: profile.email,
    loggedInAt: Date.now(),
    userId: profile.id,
    profile,
    justRegistered: true,
  });
}

/** يتحقق من جلسة ASP.NET Identity من خلال endpoint الخادم. */
export async function verifyServerSession(): Promise<boolean> {
  if (typeof window === "undefined") return false;

  try {
    const payload = await apiClient.get<ProfileEnvelope>("/api/User/MyProfileModal");
    const profile = normalizeProfile(payload);
    if (!profile) return false;

    const current = readStoredSession();

    // MyProfileDto ما فيه دور، فـnormalizeProfile بيرجّع roleId=null — وكان
    // هالسطر بيمسح الدور المخزّن عند كل فحص جلسة (كل دخول لمسار محمي/تحديث
    // صفحة) فيصير المستخدم "بلا دور" ويظهر "تعذّر تحميل صلاحياتك". منحافظ
    // على الدور: من ردّ السيرفر، وإلا من الجلسة المخزّنة لنفس المستخدم، وإلا
    // من fetchUserType.
    const previous = current?.profile && current.profile.id === profile.id ? current.profile : null;
    const fromEnvelope = roleFromEnvelope(payload);
    profile.roleId = fromEnvelope.roleId ?? previous?.roleId ?? null;
    profile.roleName = fromEnvelope.roleName ?? previous?.roleName ?? null;
    profile.roleKey = fromEnvelope.roleKey ?? previous?.roleKey ?? null;
    if (profile.roleId == null) {
      const fetched = await fetchUserType(profile.id);
      profile.roleId = fetched.roleId;
      profile.roleName = fetched.roleName;
      profile.roleKey = profile.roleKey ?? fetched.roleKey;
    }

    writeStoredSession({
      email: profile.email,
      loggedInAt: current?.loggedInAt ?? Date.now(),
      userId: profile.id,
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

/** يمسح الجلسة المحلية (localStorage + كوكي الواجهة) ويُعلم المستمعين — يُستخدم
 * لما الباك اند يرد 401 (الجلسة انتهت) عشان ما نضل نعرض واجهة مسجّل دخول. */
export function clearStoredSession(): void {
  writeStoredSession(null);
}

export interface RegistrationOptions {
  roles: Array<{ id: number; name: string; code?: string | null }>;
  genders: Array<{ id: number; name: string }>;
}

/**
 * خيارات صفحات التسجيل والإعدادات (الجنس + أنواع الحسابات) من الباك اند.
 * المصدر المفضّل: /api/Auth/RegistrationOptions (عام، AllowAnonymous). لو ما
 * كان منشور بعد على الباك اند (404) أو رجّع قوائم فاضية، منرجع لـ
 * /api/User/CreateEditModal (المسار القديم يلي كان شغّال) بدل ما تضل القائمة فاضية.
 * لو الاتنين فشلوا بيرمي خطأ الأول ليعرض الفرونت رسالة + إعادة محاولة.
 */
export async function loadRegistrationOptions(): Promise<RegistrationOptions> {
  let primary: RegistrationOptions = { genders: [], roles: [] };
  let primaryError: unknown = null;

  try {
    const result = await apiClient.get<{
      genders?: Array<{ id: number; name: string }> | null;
      userTypes?: Array<{ id: number; name: string; code?: string | null }> | null;
    }>("/api/Auth/RegistrationOptions");
    primary = { genders: result?.genders ?? [], roles: result?.userTypes ?? [] };
  } catch (err) {
    primaryError = err;
    console.warn("[auth] RegistrationOptions غير متاح — نجرّب CreateEditModal:", err);
  }

  if (primary.genders.length > 0 && primary.roles.length > 0) return primary;

  try {
    const legacy = await loadBackendUserOptions();
    return {
      genders: primary.genders.length > 0 ? primary.genders : legacy.genders,
      roles: primary.roles.length > 0 ? primary.roles : legacy.roles,
    };
  } catch (legacyError) {
    if (primary.genders.length > 0 || primary.roles.length > 0) return primary;
    throw primaryError ?? legacyError;
  }
}

export async function logout(): Promise<void> {
  try {
    // الباك إند يعرّف Logout كـ POST.
    await apiClient.post<OperationResult>("/api/Auth/Logout");
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

/** أدمن حقيقي = roleKey "admin" من الباك اند (الرقم 1 احتياط للجلسات القديمة بدون roleKey). */
export function isRealAdmin(): boolean {
  const p = readStoredSession()?.profile;
  return p?.roleKey === "admin" || (p?.roleKey == null && p?.roleId === 1);
}
