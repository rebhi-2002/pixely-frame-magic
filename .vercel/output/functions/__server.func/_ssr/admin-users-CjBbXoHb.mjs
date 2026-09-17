import { O as throwBilingual, d as apiClient } from "./rbac-static-data-DgiM51a_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-users-CjBbXoHb.js
function mapGender(name) {
	if (!name) return "male";
	const normalized = name.toLowerCase();
	return normalized.includes("أنث") || normalized.includes("female") ? "female" : "male";
}
function mapUser(user) {
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
		user_type_id: user.userTypeId ?? user.userType?.id ?? null
	};
}
async function loadFormData(id) {
	const query = `?id=${id ? encodeURIComponent(id) : "0"}`;
	return apiClient.get(`/api/User/CreateEditModal${query}`);
}
async function listBackendUsers(params = {}) {
	const pageSize = params.pageSize ?? 20;
	const result = await apiClient.post("/api/User/GetAll", {
		searchValue: params.searchValue ?? "",
		sortColumn: "",
		sortColumnDirection: "",
		pageSize,
		skip: params.skip ?? 0,
		userTypeId: params.userTypeId ?? null,
		genderId: params.genderId ?? null,
		isActiveSearch: params.isActiveSearch ?? null
	});
	return {
		rows: (result.data ?? []).map(mapUser).filter((user) => user.id.length > 0),
		totalCount: result.totalCount ?? 0
	};
}
async function loadBackendUserOptions() {
	const result = await loadFormData();
	return {
		roles: result.userTypes ?? [],
		genders: result.genders ?? []
	};
}
function requiredId(value, label) {
	if (value == null || value <= 0) throw new Error(`يجب اختيار ${label}`);
	return value;
}
async function saveBackendUser(form) {
	const existingUser = (form.id ? await loadFormData(form.id) : null)?.user;
	const genderId = requiredId(form.gender_id ?? existingUser?.genderId ?? null, "الجنس");
	const userTypeId = requiredId(form.role_id ? Number(form.role_id) : existingUser?.userTypeId ?? null, "نوع المستخدم");
	if (!form.id && (!form.password || !form.confirmPassword)) throwBilingual("كلمة المرور وتأكيدها مطلوبان عند إضافة مستخدم", "Password and confirmation are required when adding a user");
	const result = await apiClient.post("/api/User/CreateEdit", {
		id: form.id ?? null,
		name: form.full_name,
		email: form.email,
		phoneNumber: form.phone,
		genderId,
		userTypeId,
		isActive: form.is_active,
		avatar: existingUser?.avatar ?? null,
		password: form.id ? null : form.password,
		confirmPassword: form.id ? null : form.confirmPassword
	});
	if (!result.success) {
		if (result.message) throw new Error(result.message);
		throwBilingual("تعذر حفظ المستخدم", "Failed to save user");
	}
}
async function updateBackendUserStatus(id, isActive) {
	const user = (await loadFormData(id)).user;
	if (!user?.id || !user.name || !user.email || !user.phoneNumber) throwBilingual("تعذر تحميل بيانات المستخدم قبل تحديث حالته", "Couldn't load the user's data before updating their status");
	const genderId = requiredId(user.genderId ?? user.gender?.id ?? null, "الجنس");
	const userTypeId = requiredId(user.userTypeId ?? user.userType?.id ?? null, "نوع المستخدم");
	const saved = await apiClient.post("/api/User/CreateEdit", {
		id: user.id,
		name: user.name,
		email: user.email,
		phoneNumber: user.phoneNumber,
		genderId,
		userTypeId,
		isActive,
		avatar: user.avatar ?? null,
		password: null,
		confirmPassword: null
	});
	if (!saved.success) {
		if (saved.message) throw new Error(saved.message);
		throwBilingual("تعذر تحديث حالة المستخدم", "Failed to update user status");
	}
}
async function deleteBackendUser(id) {
	const result = await apiClient.delete(`/api/User/Delete?id=${encodeURIComponent(id)}`);
	if (!result.success) {
		if (result.message) throw new Error(result.message);
		throwBilingual("تعذر حذف المستخدم", "Failed to delete user");
	}
}
//#endregion
export { updateBackendUserStatus as a, saveBackendUser as i, listBackendUsers as n, loadBackendUserOptions as r, deleteBackendUser as t };
