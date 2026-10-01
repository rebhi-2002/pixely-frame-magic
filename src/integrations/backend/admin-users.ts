import { apiClient, currentLang, throwBilingual } from "./client";
import type { UserRow } from "@/lib/rbac-types";

export interface BackendUserType {
  id: number;
  name: string;
  /** مفتاح الدور الثابت (admin|student|teacher|parent). */
  code?: string | null;
}

export interface BackendGender {
  id: number;
  name: string;
}

interface BackendUserDto {
  id?: string | null;
  name?: string | null;
  email?: string | null;
  phoneNumber?: string | null;
  genderId?: number | null;
  gender?: BackendGender | null;
  userTypeId?: number | null;
  userType?: BackendUserType | null;
  isActive?: boolean;
  avatar?: string | null;
}

interface UserTableResponse {
  data?: BackendUserDto[] | null;
  totalCount?: number;
}

interface UserFormResponse {
  user?: BackendUserDto | null;
  userTypes?: BackendUserType[] | null;
  genders?: BackendGender[] | null;
}

export interface BackendUserForm {
  id?: string;
  full_name: string;
  email: string;
  phone: string;
  gender_id: number | null;
  role_id: string | null;
  is_active: boolean;
  password: string;
  confirmPassword: string;
}

export interface BackendUserOptions {
  roles: BackendUserType[];
  genders: BackendGender[];
}

function mapGender(name: string | null | undefined): "male" | "female" {
  if (!name) return "male";
  const normalized = name.toLowerCase();
  return normalized.includes("أنث") || normalized.includes("female") ? "female" : "male";
}

function mapUser(user: BackendUserDto): UserRow {
  return {
    id: user.id ?? "",
    full_name: user.name ?? "",
    email: user.email ?? null,
    phone: user.phoneNumber ?? null,
    gender: mapGender(user.gender?.name),
    avatar_url: user.avatar ?? null,
    is_active: user.isActive ?? false,
    role_id: user.userTypeId == null ? null : String(user.userTypeId),
    role_name: user.userType?.name ?? null,
    gender_id: user.genderId ?? user.gender?.id ?? null,
    user_type_id: user.userTypeId ?? user.userType?.id ?? null,
  };
}

async function loadFormData(id?: string): Promise<UserFormResponse> {
  // ملاحظة مهمة: id فاضي تمامًا (id=) بيرجّع 400 من الباك اند الفعلي
  // (تأكدنا من الـNetwork tab)، بعكس id غير فاضي زي "0" يلي شغال. نفس
  // الحل المستخدم أصلاً بـadmin-constants.ts/admin-pages.ts.
  const query = `?id=${id ? encodeURIComponent(id) : "0"}`;
  return apiClient.get<UserFormResponse>(`/api/User/CreateEditModal${query}`);
}

export interface ListUsersParams {
  searchValue?: string;
  userTypeId?: number | null;
  genderId?: number | null;
  isActiveSearch?: boolean | null;
  pageSize?: number;
  skip?: number;
}

export interface ListUsersResult {
  rows: UserRow[];
  totalCount: number;
}

export async function listBackendUsers(params: ListUsersParams = {}): Promise<ListUsersResult> {
  const pageSize = params.pageSize ?? 20;
  const result = await apiClient.post<UserTableResponse>("/api/User/GetAll", {
    searchValue: params.searchValue ?? "",
    sortColumn: "",
    sortColumnDirection: "",
    pageSize,
    skip: params.skip ?? 0,
    userTypeId: params.userTypeId ?? null,
    genderId: params.genderId ?? null,
    isActiveSearch: params.isActiveSearch ?? null,
  });
  return {
    rows: (result.data ?? []).map(mapUser).filter((user) => user.id.length > 0),
    totalCount: result.totalCount ?? 0,
  };
}

export async function loadBackendUserOptions(): Promise<BackendUserOptions> {
  const result = await loadFormData();
  return {
    roles: result.userTypes ?? [],
    genders: result.genders ?? [],
  };
}

function requiredId(value: number | null, label: string): number {
  if (value == null || value <= 0) throw new Error(`يجب اختيار ${label}`);
  return value;
}

function pickUserType(
  list: BackendUserType[] | null | undefined,
  id: number,
  fallback?: BackendUserType | null,
): { id: number; name: string } {
  const found = list?.find((t) => t.id === id) ?? fallback ?? null;
  return { id, name: found?.name ?? "" };
}

function pickGender(
  list: BackendGender[] | null | undefined,
  id: number,
  fallback?: BackendGender | null,
): { id: number; name: string } {
  const found = list?.find((g) => g.id === id) ?? fallback ?? null;
  return { id, name: found?.name ?? "" };
}

/** الباك اند حاليًا بيفرض Password/ConfirmPassword حتى عند تعديل مستخدم موجود — منوضّح
 * السبب بدل رسالة التحقق الخام. الحل الدائم بالباك اند (راجع شرح الإصلاح). */
function explainSaveError(message: string | null | undefined, isEdit: boolean): string {
  if (!message) return currentLang() === "ar" ? "تعذر حفظ المستخدم" : "Failed to save user";
  if (isEdit && /password/i.test(message)) {
    return currentLang() === "ar"
      ? "الخادم يطلب كلمة مرور عند التعديل. أدخل كلمة مرور جديدة مع تأكيدها، أو اطلب من مطوّر الباك اند إلغاء إلزامية كلمة المرور عند التعديل."
      : "The server requires a password when editing. Enter a new password with confirmation, or ask the backend developer to make it optional on edit.";
  }
  return message;
}

export async function saveBackendUser(form: BackendUserForm): Promise<void> {
  // نحمّل النموذج دائمًا (حتى عند الإضافة) لأن قوائم الأنواع/الأجناس لازمة لبناء
  // كائني userType وgender يلي الباك اند بيطلبهم (UserDto.UserType غير nullable).
  const existing = await loadFormData(form.id);
  const existingUser = form.id ? existing?.user : null;
  const genderId = requiredId(form.gender_id ?? existingUser?.genderId ?? null, "الجنس");
  const userTypeId = requiredId(
    form.role_id ? Number(form.role_id) : (existingUser?.userTypeId ?? null),
    "نوع المستخدم",
  );

  if (!form.id && (!form.password || !form.confirmPassword)) {
    throwBilingual(
      "كلمة المرور وتأكيدها مطلوبان عند إضافة مستخدم",
      "Password and confirmation are required when adding a user",
    );
  }
  if (form.password !== form.confirmPassword) {
    throwBilingual("كلمتا المرور غير متطابقتين", "Passwords don't match");
  }

  const userType = pickUserType(existing?.userTypes, userTypeId, existingUser?.userType);
  const gender = pickGender(existing?.genders, genderId, existingUser?.gender);

  const result = await apiClient.post<{ success: boolean; message?: string | null }>(
    "/api/User/CreateEdit",
    {
      id: form.id ?? null,
      name: form.full_name,
      email: form.email,
      phoneNumber: form.phone,
      genderId,
      gender,
      userTypeId,
      userType,
      isActive: form.is_active,
      avatar: existingUser?.avatar ?? null,
      // عند التعديل: كلمة المرور اختيارية؛ لو فاضية منرسل null (الباك اند لازم يتجاهلها).
      password: form.password || null,
      confirmPassword: form.confirmPassword || null,
    },
  );

  if (!result.success) {
    throw new Error(explainSaveError(result.message, Boolean(form.id)));
  }
}

export async function updateBackendUserStatus(id: string, isActive: boolean): Promise<void> {
  const result = await loadFormData(id);
  const user = result.user;
  if (!user?.id || !user.name || !user.email || !user.phoneNumber) {
    throwBilingual(
      "تعذر تحميل بيانات المستخدم قبل تحديث حالته",
      "Couldn't load the user's data before updating their status",
    );
  }

  const genderId = requiredId(user.genderId ?? user.gender?.id ?? null, "الجنس");
  const userTypeId = requiredId(user.userTypeId ?? user.userType?.id ?? null, "نوع المستخدم");
  const userType = pickUserType(result.userTypes, userTypeId, user.userType);
  const gender = pickGender(result.genders, genderId, user.gender);
  const saved = await apiClient.post<{ success: boolean; message?: string | null }>(
    "/api/User/CreateEdit",
    {
      id: user.id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      genderId,
      gender,
      userTypeId,
      userType,
      isActive,
      avatar: user.avatar ?? null,
      password: null,
      confirmPassword: null,
    },
  );

  if (!saved.success) {
    throw new Error(explainSaveError(saved.message, true));
  }
}

export async function deleteBackendUser(id: string): Promise<void> {
  const result = await apiClient.delete<{ success: boolean; message?: string | null }>(
    `/api/User/Delete?id=${encodeURIComponent(id)}`,
  );
  if (!result.success) {
    if (result.message) throw new Error(result.message);
    throwBilingual("تعذر حذف المستخدم", "Failed to delete user");
  }
}
