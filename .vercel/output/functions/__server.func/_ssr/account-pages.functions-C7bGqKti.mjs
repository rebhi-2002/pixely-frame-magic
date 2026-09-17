import { a as numberType, n as booleanType, o as objectType, s as stringType } from "../_libs/zod.mjs";
import { r as createServerFn } from "./server-D1qnk3uY.mjs";
import { t as requireAuth } from "./auth-middleware-Cr7xkyyT.mjs";
import { o as requirePageAction, t as createServerRpc } from "./rbac.server-neaCseib.mjs";
import { a as TEACHER_SETTINGS, i as TEACHER_PROFILE, n as NOTIFICATIONS, o as nextAccountId, r as PARENT_NOTIFICATION_PREFS, t as LINKED_CHILDREN } from "./account-pages-data-Xw-6PmGW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/account-pages.functions-C7bGqKti.js
var getTeacherSettings_createServerFn_handler = createServerRpc({
	id: "148792d27e9017faaa166c09163fbf6ecd49743d1e5f015d613cd3c85b5bc037",
	name: "getTeacherSettings",
	filename: "src/lib/account-pages.functions.ts"
}, (opts) => getTeacherSettings.__executeServer(opts));
var getTeacherSettings = createServerFn({ method: "GET" }).middleware([requireAuth]).handler(getTeacherSettings_createServerFn_handler, async ({ context }) => {
	await requirePageAction(context.userId, "teacher_settings", "view_list");
	return TEACHER_SETTINGS;
});
var saveTeacherSettings_createServerFn_handler = createServerRpc({
	id: "f6b2336fa102b4ff66872a6717ffab28578d71b809bb94377cb222de03186f28",
	name: "saveTeacherSettings",
	filename: "src/lib/account-pages.functions.ts"
}, (opts) => saveTeacherSettings.__executeServer(opts));
var saveTeacherSettings = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({
	privateSessionPrice: numberType().min(0),
	availabilityLabel: stringType().trim().min(2),
	payoutMethodLabel: stringType().trim().min(2),
	notifyNewQuestion: booleanType()
}).parse(input)).handler(saveTeacherSettings_createServerFn_handler, async ({ data, context }) => {
	await requirePageAction(context.userId, "teacher_settings", "edit");
	Object.assign(TEACHER_SETTINGS, data);
	return { ok: true };
});
var getTeacherProfile_createServerFn_handler = createServerRpc({
	id: "76e2fd2965f176c3f04724099a62c6fc6e1fc5d52e4e40ebcc647d1ca0a3657e",
	name: "getTeacherProfile",
	filename: "src/lib/account-pages.functions.ts"
}, (opts) => getTeacherProfile.__executeServer(opts));
var getTeacherProfile = createServerFn({ method: "GET" }).middleware([requireAuth]).handler(getTeacherProfile_createServerFn_handler, async ({ context }) => {
	await requirePageAction(context.userId, "teacher_profile_edit", "view_profile");
	return TEACHER_PROFILE;
});
var saveTeacherProfile_createServerFn_handler = createServerRpc({
	id: "e33924e2a38bd9bcc7eaf8d3e4d2ba38d1dfdef19cc6a964a3cceec3db48f78f",
	name: "saveTeacherProfile",
	filename: "src/lib/account-pages.functions.ts"
}, (opts) => saveTeacherProfile.__executeServer(opts));
var saveTeacherProfile = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({
	displayName: stringType().trim().min(2, "الاسم مطلوب"),
	bio: stringType().trim().min(2, "النبذة مطلوبة"),
	subjectsLabel: stringType().trim().min(1, "المواد مطلوبة")
}).parse(input)).handler(saveTeacherProfile_createServerFn_handler, async ({ data, context }) => {
	await requirePageAction(context.userId, "teacher_profile_edit", "edit_profile");
	Object.assign(TEACHER_PROFILE, data);
	return { ok: true };
});
var listLinkedChildren_createServerFn_handler = createServerRpc({
	id: "05c05276ef23a695eba190af689dde57282c0e60a194dbf8ead6e37e582f10dc",
	name: "listLinkedChildren",
	filename: "src/lib/account-pages.functions.ts"
}, (opts) => listLinkedChildren.__executeServer(opts));
var listLinkedChildren = createServerFn({ method: "GET" }).middleware([requireAuth]).handler(listLinkedChildren_createServerFn_handler, async ({ context }) => {
	await requirePageAction(context.userId, "parent_settings", "view_list");
	return LINKED_CHILDREN;
});
var addLinkedChild_createServerFn_handler = createServerRpc({
	id: "78e4980bd89fb0abc9968fb9f4bf81cde77e8eba337fd2a23f876bc3945c31d0",
	name: "addLinkedChild",
	filename: "src/lib/account-pages.functions.ts"
}, (opts) => addLinkedChild.__executeServer(opts));
var addLinkedChild = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({
	childName: stringType().trim().min(2, "اسم الابن مطلوب"),
	gradeLabel: stringType().trim().min(2, "الصف مطلوب")
}).parse(input)).handler(addLinkedChild_createServerFn_handler, async ({ data, context }) => {
	await requirePageAction(context.userId, "parent_settings", "execute_add");
	const row = {
		id: nextAccountId("lc"),
		...data,
		linkedDateLabel: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
	};
	LINKED_CHILDREN.push(row);
	return { ok: true };
});
var unlinkChild_createServerFn_handler = createServerRpc({
	id: "da0025f40923a6e46e5b94b752e822f06914ce3158dcb29f4e20dc0463e0c269",
	name: "unlinkChild",
	filename: "src/lib/account-pages.functions.ts"
}, (opts) => unlinkChild.__executeServer(opts));
var unlinkChild = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({ id: stringType() }).parse(input)).handler(unlinkChild_createServerFn_handler, async ({ data, context }) => {
	await requirePageAction(context.userId, "parent_settings", "delete");
	const idx = LINKED_CHILDREN.findIndex((r) => r.id === data.id);
	if (idx !== -1) LINKED_CHILDREN.splice(idx, 1);
	return { ok: true };
});
var getParentNotificationPrefs_createServerFn_handler = createServerRpc({
	id: "19ac1a731ad10e924c49b22feeb607cd8af07aa13ac83ce4ef255669fc29a4e6",
	name: "getParentNotificationPrefs",
	filename: "src/lib/account-pages.functions.ts"
}, (opts) => getParentNotificationPrefs.__executeServer(opts));
var getParentNotificationPrefs = createServerFn({ method: "GET" }).middleware([requireAuth]).handler(getParentNotificationPrefs_createServerFn_handler, async ({ context }) => {
	await requirePageAction(context.userId, "parent_settings", "view_list");
	return PARENT_NOTIFICATION_PREFS;
});
var saveParentNotificationPrefs_createServerFn_handler = createServerRpc({
	id: "899775e4ba062860e513fea2e1f85524d8d12c3bfe66010216b53b01f2a4b678",
	name: "saveParentNotificationPrefs",
	filename: "src/lib/account-pages.functions.ts"
}, (opts) => saveParentNotificationPrefs.__executeServer(opts));
var saveParentNotificationPrefs = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({
	weeklyReport: booleanType(),
	masteryAlert: booleanType(),
	teacherMessages: booleanType()
}).parse(input)).handler(saveParentNotificationPrefs_createServerFn_handler, async ({ data, context }) => {
	await requirePageAction(context.userId, "parent_settings", "edit");
	Object.assign(PARENT_NOTIFICATION_PREFS, data);
	return { ok: true };
});
var listNotifications_createServerFn_handler = createServerRpc({
	id: "f21c393b0a6b492b106d410ee123c841b15e4ce51f4061ce336ea7804d209152",
	name: "listNotifications",
	filename: "src/lib/account-pages.functions.ts"
}, (opts) => listNotifications.__executeServer(opts));
var listNotifications = createServerFn({ method: "GET" }).middleware([requireAuth]).handler(listNotifications_createServerFn_handler, async ({ context }) => {
	await requirePageAction(context.userId, "notifications", "view_list");
	return NOTIFICATIONS;
});
var markNotificationRead_createServerFn_handler = createServerRpc({
	id: "40db4029a5135df58c815915ecc3fe29d029d7f92b5585ff77118e15457393ab",
	name: "markNotificationRead",
	filename: "src/lib/account-pages.functions.ts"
}, (opts) => markNotificationRead.__executeServer(opts));
var markNotificationRead = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({ id: stringType() }).parse(input)).handler(markNotificationRead_createServerFn_handler, async ({ data, context }) => {
	await requirePageAction(context.userId, "notifications", "edit");
	const row = NOTIFICATIONS.find((r) => r.id === data.id);
	if (!row) throw new Error("الإشعار غير موجود");
	row.isNew = false;
	return { ok: true };
});
var markAllNotificationsRead_createServerFn_handler = createServerRpc({
	id: "77d41ec318e19ceaeb7e0024e1e0acff69d01e302d9ef7e8d6343b8ec41c94c4",
	name: "markAllNotificationsRead",
	filename: "src/lib/account-pages.functions.ts"
}, (opts) => markAllNotificationsRead.__executeServer(opts));
var markAllNotificationsRead = createServerFn({ method: "POST" }).middleware([requireAuth]).handler(markAllNotificationsRead_createServerFn_handler, async ({ context }) => {
	await requirePageAction(context.userId, "notifications", "edit");
	for (const row of NOTIFICATIONS) row.isNew = false;
	return { ok: true };
});
var deleteNotification_createServerFn_handler = createServerRpc({
	id: "e3debcd0c409bba8621bc272b38fe4c5e8a842e602f029be951ffda3eaa9b534",
	name: "deleteNotification",
	filename: "src/lib/account-pages.functions.ts"
}, (opts) => deleteNotification.__executeServer(opts));
var deleteNotification = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({ id: stringType() }).parse(input)).handler(deleteNotification_createServerFn_handler, async ({ data, context }) => {
	await requirePageAction(context.userId, "notifications", "delete");
	const idx = NOTIFICATIONS.findIndex((r) => r.id === data.id);
	if (idx !== -1) NOTIFICATIONS.splice(idx, 1);
	return { ok: true };
});
//#endregion
export { addLinkedChild_createServerFn_handler, deleteNotification_createServerFn_handler, getParentNotificationPrefs_createServerFn_handler, getTeacherProfile_createServerFn_handler, getTeacherSettings_createServerFn_handler, listLinkedChildren_createServerFn_handler, listNotifications_createServerFn_handler, markAllNotificationsRead_createServerFn_handler, markNotificationRead_createServerFn_handler, saveParentNotificationPrefs_createServerFn_handler, saveTeacherProfile_createServerFn_handler, saveTeacherSettings_createServerFn_handler, unlinkChild_createServerFn_handler };
