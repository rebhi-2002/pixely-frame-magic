import { apiClient, throwBilingual } from "./client";
import type { UserRow } from "@/lib/rbac-types";

export interface BackendUserType {
  id: number;
  name: string;
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
  const query = id ? `?id=${encodeURIComponent(id)}` : "?id=";
  return apiClient.get<UserFormResponse>(`/api/User/CreateEditModal${query}`);
}

export async function listBackendUsers(): Promise<UserRow[]> {
  const result = await apiClient.post<UserTableResponse>("/api/User/GetAll", {
    searchValue: "",
    sortColumn: "",
    sortColumnDirection: "",
    pageSize: 1000,
    skip: 0,
    userTypeId: null,
    genderId: null,
    isActiveSearch: null,
  });
  return (result.data ?? []).map(mapUser).filter((user) => user.id.length > 0);
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

export async function saveBackendUser(form: BackendUserForm): Promise<void> {
  const existing = form.id ? await loadFormData(form.id) : null;
  const existingUser = existing?.user;
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

  const result = await apiClient.post<{ success: boolean; message?: string | null }>(
    "/api/User/CreateEdit",
    {
      id: form.id ?? null,
      name: form.full_name,
      email: form.email,
      phoneNumber: form.phone,
      genderId,
      userTypeId,
      isActive: form.is_active,
      avatar: existingUser?.avatar ?? null,
      password: form.id ? null : form.password,
      confirmPassword: form.id ? null : form.confirmPassword,
    },
  );

  if (!result.success) {
    if (result.message) throw new Error(result.message);
    throwBilingual("تعذر حفظ المستخدم", "Failed to save user");
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
  const saved = await apiClient.post<{ success: boolean; message?: string | null }>(
    "/api/User/CreateEdit",
    {
      id: user.id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      genderId,
      userTypeId,
      isActive,
      avatar: user.avatar ?? null,
      password: null,
      confirmPassword: null,
    },
  );

  if (!saved.success) {
    if (saved.message) throw new Error(saved.message);
    throwBilingual("تعذر تحديث حالة المستخدم", "Failed to update user status");
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
