import { apiClient, throwBilingual } from "./client";

export interface ConstantRow {
  id: number;
  name: string;
  comment: string | null;
  icon: string | null;
  parent_id: number | null;
  parent_name: string | null;
}

export interface ConstantParentOption {
  id: number;
  name: string;
}

export interface ConstantForm {
  id?: number;
  name: string;
  comment: string;
  icon: string;
  parent_id: number | null;
}

interface BackendConstantDto {
  id?: number;
  name?: string | null;
  comment?: string | null;
  icon?: string | null;
  parentId?: number | null;
  parent?: { id?: number; name?: string | null } | null;
}

interface ConstantTableResponse {
  data?: BackendConstantDto[] | null;
  totalCount?: number;
}

interface ConstantFormResponse {
  constant?: BackendConstantDto | null;
  parents?: ConstantParentOption[] | null;
}

function mapConstant(c: BackendConstantDto): ConstantRow {
  return {
    id: c.id ?? 0,
    name: c.name ?? "",
    comment: c.comment ?? null,
    icon: c.icon ?? null,
    parent_id: c.parentId ?? c.parent?.id ?? null,
    parent_name: c.parent?.name ?? null,
  };
}

async function loadFormData(id?: number): Promise<ConstantFormResponse> {
  return apiClient.get<ConstantFormResponse>(`/api/Constant/CreateEditModal?id=${id ?? 0}`);
}

export interface ListConstantsParams {
  searchValue?: string;
  pageSize?: number;
  skip?: number;
}

export interface ListConstantsResult {
  rows: ConstantRow[];
  totalCount: number;
}

export async function listBackendConstants(
  params: ListConstantsParams = {},
): Promise<ListConstantsResult> {
  const result = await apiClient.post<ConstantTableResponse>("/api/Constant/GetAll", {
    searchValue: params.searchValue ?? "",
    sortColumn: "",
    sortColumnDirection: "",
    pageSize: params.pageSize ?? 20,
    skip: params.skip ?? 0,
  });
  return {
    rows: (result.data ?? []).map(mapConstant).filter((c) => c.id > 0),
    totalCount: result.totalCount ?? 0,
  };
}

export async function loadBackendConstantParents(): Promise<ConstantParentOption[]> {
  const result = await loadFormData();
  return result.parents ?? [];
}

export async function saveBackendConstant(form: ConstantForm): Promise<void> {
  if (!form.name.trim()) throwBilingual("الاسم مطلوب", "Name is required");
  if (form.name.trim().length < 3)
    throwBilingual(
      "الاسم قصير جدًا (3 أحرف على الأقل)",
      "Name is too short (at least 3 characters)",
    );

  // الباك اند بيرفض الطلب لو الثابت اختار نفسه أبًا له — فحص وقائي بالفرونت
  // قبل الإرسال، بالإضافة لأي تحقق سيرفري لاحقًا.
  if (form.id != null && form.parent_id === form.id) {
    throwBilingual("لا يمكن أن يكون الثابت أبًا لنفسه", "A constant can't be its own parent");
  }

  const result = await apiClient.post<{ success: boolean; message?: string | null }>(
    "/api/Constant/CreateEdit",
    {
      id: form.id ?? 0,
      name: form.name.trim(),
      comment: form.comment.trim() || null,
      icon: form.icon.trim() || null,
      parentId: form.parent_id,
    },
  );

  if (!result.success) {
    if (result.message) throw new Error(result.message);
    throwBilingual("تعذر حفظ الثابت", "Failed to save constant");
  }
}

export async function deleteBackendConstant(id: number): Promise<void> {
  const result = await apiClient.delete<{ success: boolean; message?: string | null }>(
    `/api/Constant/Delete?id=${id}`,
  );
  if (!result.success) {
    // الباك اند برجّع Messages.ConstantHasChildren لو الثابت إله عناصر فرعية —
    // رسالة الباك اند نفسها (بالعربي) بتنعرض للمستخدم مباشرة، مافي داعي نكررها.
    if (result.message) throw new Error(result.message);
    throwBilingual("تعذر حذف الثابت", "Failed to delete constant");
  }
}
