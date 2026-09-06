import { apiClient } from "./client";

// الباك اند حاليًا فيه بس نوعين مستخدم ثابتين ومفروضين بالكود نفسه (لا يوجد
// أي Controller لإدارة UserTypes — لا إضافة ولا حذف)، فبنعرضهم كقائمة ثابتة
// هون بدل ما نخترع نداء لإندبوينت غير موجود. لو انضاف Controller لهم لاحقًا،
// بنبدلها بنداء حقيقي.
export const BACKEND_USER_TYPES = [
  { id: 1, name: "مدير النظام", name_en: "System Admin" },
  { id: 2, name: "مستخدم", name_en: "User" },
] as const;

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
