import { apiClient, throwBilingual } from "./client";

export interface PageRow {
  id: number;
  name: string;
  name_en: string;
  link: string | null;
  icon: string | null;
  in_menu: boolean;
  is_active: boolean;
  is_ajax: boolean;
  parent_id: number | null;
  parent_name: string | null;
  module_id: number | null;
  module_name: string | null;
  category_id: number | null;
  category_name: string | null;
}

export interface PageLookupOption {
  id: number;
  name: string;
}

export interface PageForm {
  id?: number;
  name: string;
  name_en: string;
  link: string;
  icon: string;
  in_menu: boolean;
  is_active: boolean;
  is_ajax: boolean;
  parent_id: number | null;
  module_id: number | null;
  category_id: number | null;
}

export interface PageFormOptions {
  modules: PageLookupOption[];
  categories: PageLookupOption[];
  parents: PageLookupOption[];
}

interface BackendPageDto {
  id?: number;
  name?: string | null;
  nameEn?: string | null;
  link?: string | null;
  icon?: string | null;
  inMenu?: boolean;
  isActive?: boolean;
  isAjax?: boolean;
  parentId?: number | null;
  parent?: { id?: number; name?: string | null } | null;
  moduleId?: number | null;
  module?: { id?: number; name?: string | null } | null;
  categoryId?: number | null;
  category?: { id?: number; name?: string | null } | null;
}

interface PageTableResponse {
  data?: BackendPageDto[] | null;
  totalCount?: number;
}

interface PageFormResponse {
  page?: BackendPageDto | null;
  modules?: PageLookupOption[] | null;
  categories?: PageLookupOption[] | null;
  parents?: PageLookupOption[] | null;
}

function mapPage(p: BackendPageDto): PageRow {
  return {
    id: p.id ?? 0,
    name: p.name ?? "",
    name_en: p.nameEn ?? "",
    link: p.link ?? null,
    icon: p.icon ?? null,
    in_menu: p.inMenu ?? false,
    is_active: p.isActive ?? false,
    is_ajax: p.isAjax ?? false,
    parent_id: p.parentId ?? p.parent?.id ?? null,
    parent_name: p.parent?.name ?? null,
    module_id: p.moduleId ?? p.module?.id ?? null,
    module_name: p.module?.name ?? null,
    category_id: p.categoryId ?? p.category?.id ?? null,
    category_name: p.category?.name ?? null,
  };
}

async function loadFormData(id?: number): Promise<PageFormResponse> {
  return apiClient.get<PageFormResponse>(`/api/Page/CreateEditModal?id=${id ?? 0}`);
}

export async function listBackendPages(): Promise<PageRow[]> {
  const result = await apiClient.post<PageTableResponse>("/api/Page/GetAll", {
    searchValue: "",
    sortColumn: "",
    sortColumnDirection: "",
    pageSize: 1000,
    skip: 0,
  });
  return (result.data ?? []).map(mapPage).filter((p) => p.id > 0);
}

export async function loadBackendPageOptions(): Promise<PageFormOptions> {
  const result = await loadFormData();
  return {
    modules: result.modules ?? [],
    categories: result.categories ?? [],
    parents: result.parents ?? [],
  };
}

export async function saveBackendPage(form: PageForm): Promise<void> {
  if (!form.name.trim() || form.name.trim().length < 3) {
    throwBilingual(
      "الاسم بالعربي مطلوب (3 أحرف على الأقل)",
      "Arabic name is required (at least 3 characters)",
    );
  }
  if (!form.name_en.trim() || form.name_en.trim().length < 3) {
    throwBilingual(
      "الاسم بالإنجليزي مطلوب (3 أحرف على الأقل)",
      "English name is required (at least 3 characters)",
    );
  }
  if (form.category_id == null) {
    throwBilingual("يجب اختيار الفئة", "You must select a category");
  }
  if (form.id != null && form.parent_id === form.id) {
    throwBilingual("لا يمكن أن تكون الصفحة أبًا لنفسها", "A page can't be its own parent");
  }

  const result = await apiClient.post<{ success: boolean; message?: string | null }>(
    "/api/Page/CreateEdit",
    {
      id: form.id ?? 0,
      name: form.name.trim(),
      nameEn: form.name_en.trim(),
      link: form.link.trim() || null,
      icon: form.icon.trim() || null,
      inMenu: form.in_menu,
      isActive: form.is_active,
      isAjax: form.is_ajax,
      parentId: form.parent_id,
      moduleId: form.module_id,
      categoryId: form.category_id,
    },
  );

  if (!result.success) {
    if (result.message) throw new Error(result.message);
    throwBilingual("تعذر حفظ الصفحة", "Failed to save page");
  }
}

export async function deleteBackendPage(id: number): Promise<void> {
  const result = await apiClient.delete<{ success: boolean; message?: string | null }>(
    `/api/Page/Delete?id=${id}`,
  );
  if (!result.success) {
    // الباك اند برجّع رسالة "هذه الصفحة لها صفحات فرعية" لو في أبناء —
    // منعرضها كما هي، مو رسالة عامة.
    if (result.message) throw new Error(result.message);
    throwBilingual("تعذر حذف الصفحة", "Failed to delete page");
  }
}
