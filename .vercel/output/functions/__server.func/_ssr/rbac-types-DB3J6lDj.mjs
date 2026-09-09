//#region node_modules/.nitro/vite/services/ssr/assets/rbac-types-DB3J6lDj.js
/**
* ترجمة عرضية مؤقتة (frontend-only) لتسميات الصلاحيات — جدول `permission_keys`
* بقاعدة البيانات ما فيه عمود إنجليزي (`label_en`) حالياً. مبنية على المفتاح
* الثابت (`key`) مش على نص `label`، فهي آمنة وما بتتأثر لو تغيّر نص العرض العربي.
* تُحذف تلقائياً بمجرد ما الباك إند يضيف `label_en` (استبدل بـ`bi(label, labelEn)`).
*/
var PERMISSION_LABEL_EN = {
	view_list: "View list",
	show_add_form: "Show add form",
	execute_add: "Create",
	edit: "Edit",
	delete: "Delete",
	view_profile: "View profile",
	edit_profile: "Edit profile",
	show_password_form: "Show password form",
	change_password: "Change password"
};
/**
* ترجمة عرضية مؤقتة (frontend-only) لأسماء الأدوار — جدول `roles` ما فيه عمود
* `name_en` حالياً (بخلاف `modules`/`pages` اللي فيهم). تُحذف بمجرد ما الباك إند
* يضيف العمود.
*/
var ROLE_NAME_EN = {
	طالب: "Student",
	معلم: "Teacher",
	"ولي أمر": "Parent",
	"مشرف أكاديمي": "Academic Supervisor",
	"مدير عام": "General Admin"
};
//#endregion
export { ROLE_NAME_EN as n, PERMISSION_LABEL_EN as t };
