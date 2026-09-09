import { O as throwBilingual, d as apiClient } from "./rbac-static-data-JRz-nJtL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-pages-D5cQf2YU.js
function mapPage(p) {
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
		category_name: p.category?.name ?? null
	};
}
async function loadFormData(id) {
	return apiClient.get(`/api/Page/CreateEditModal?id=${id ?? 0}`);
}
async function listBackendPages() {
	return ((await apiClient.post("/api/Page/GetAll", {
		searchValue: "",
		sortColumn: "",
		sortColumnDirection: "",
		pageSize: 1e3,
		skip: 0
	})).data ?? []).map(mapPage).filter((p) => p.id > 0);
}
async function loadBackendPageOptions() {
	const result = await loadFormData();
	return {
		modules: result.modules ?? [],
		categories: result.categories ?? [],
		parents: result.parents ?? []
	};
}
async function saveBackendPage(form) {
	if (!form.name.trim() || form.name.trim().length < 3) throwBilingual("الاسم بالعربي مطلوب (3 أحرف على الأقل)", "Arabic name is required (at least 3 characters)");
	if (!form.name_en.trim() || form.name_en.trim().length < 3) throwBilingual("الاسم بالإنجليزي مطلوب (3 أحرف على الأقل)", "English name is required (at least 3 characters)");
	if (form.category_id == null) throwBilingual("يجب اختيار الفئة", "You must select a category");
	if (form.id != null && form.parent_id === form.id) throwBilingual("لا يمكن أن تكون الصفحة أبًا لنفسها", "A page can't be its own parent");
	const result = await apiClient.post("/api/Page/CreateEdit", {
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
		categoryId: form.category_id
	});
	if (!result.success) {
		if (result.message) throw new Error(result.message);
		throwBilingual("تعذر حفظ الصفحة", "Failed to save page");
	}
}
async function deleteBackendPage(id) {
	const result = await apiClient.delete(`/api/Page/Delete?id=${id}`);
	if (!result.success) {
		if (result.message) throw new Error(result.message);
		throwBilingual("تعذر حذف الصفحة", "Failed to delete page");
	}
}
//#endregion
export { saveBackendPage as i, listBackendPages as n, loadBackendPageOptions as r, deleteBackendPage as t };
