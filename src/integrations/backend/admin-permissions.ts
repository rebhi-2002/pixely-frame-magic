import { apiClient } from "./client";

export interface BackendUserType {
  id: number;
  name: string;
}

interface UserTypesFormResponse {
  userTypes?: BackendUserType[] | null;
}

/**
 * أنواع المستخدمين الحقيقية متل ما هي مزروعة (seeded) بالباك اند — 5 أنواع:
 * مدير النظام، مستخدم، الطالب، المعلم، ولي الامر (راجع UserSeed.cs). لا يوجد
 * Controller مستقل لإدارتها (لا إضافة ولا حذف من الواجهة)، فبنجيبها ديناميكيًا
 * من نفس endpoint يلي شاشة تعديل المستخدم بتستخدمه (/api/User/CreateEditModal)
 * بدل ما نخترع endpoint غير موجود أو نثبّت قائمة ناقصة بالكود.
 */
export async function listBackendUserTypes(): Promise<BackendUserType[]> {
  // id فاضي تمامًا بيرجّع 400 فعليًا (راجع admin-users.ts:loadFormData
  // لنفس الملاحظة) — "0" آمن وبيرجّع نفس قوائم userTypes/genders الكاملة.
  const result = await apiClient.get<UserTypesFormResponse>(`/api/User/CreateEditModal?id=0`);
  return result.userTypes ?? [];
}

interface RawPermissionEntry {
  pageId?: number;
}

/** الباك اند بيرجّع إما مصفوفة أرقام (PageIds) مباشرة، أو مصفوفة كائنات
 * فيها pageId — بنتعامل مع الاحتمالين دفاعيًا لأن الشكل الدقيق ما انولّد
 * من Swagger مباشرة (endpoint من غير مثال استجابة موثّق). */
export async function listGrantedPageIds(userTypeId: number): Promise<number[]> {
  const result = await apiClient.post<Array<number | RawPermissionEntry>>(
    `/api/UserPermission/GetUserTypePermissions?userTypeId=${userTypeId}`,
  );
  if (!Array.isArray(result)) return [];
  return result
    .map((entry) => (typeof entry === "number" ? entry : entry?.pageId))
    .filter((id): id is number => typeof id === "number");
}

export async function saveGrantedPageIds(userTypeId: number, pageIds: number[]): Promise<void> {
  await apiClient.post<{ success?: boolean; message?: string | null }>(
    `/api/UserPermission/SavePermissions?userTypeId=${userTypeId}`,
    pageIds.map((pageId) => ({ id: 0, userTypeId, pageId })),
  );
}
