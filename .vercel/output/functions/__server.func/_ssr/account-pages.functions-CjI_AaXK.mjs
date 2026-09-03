import { c as createServerFn } from "./createServerFn-TbS7u0_2.mjs";
import { t as createSsrRpc } from "./createSsrRpc-DYGk39x2.mjs";
import { t as requireAuth } from "./auth-middleware-DukBAMOp.mjs";
import { a as numberType, n as booleanType, o as objectType, s as stringType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/account-pages.functions-CjI_AaXK.js
var getTeacherSettings = createServerFn({ method: "GET" }).middleware([requireAuth]).handler(createSsrRpc("148792d27e9017faaa166c09163fbf6ecd49743d1e5f015d613cd3c85b5bc037"));
var saveTeacherSettings = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({
	privateSessionPrice: numberType().min(0),
	availabilityLabel: stringType().trim().min(2),
	payoutMethodLabel: stringType().trim().min(2),
	notifyNewQuestion: booleanType()
}).parse(input)).handler(createSsrRpc("f6b2336fa102b4ff66872a6717ffab28578d71b809bb94377cb222de03186f28"));
var getTeacherProfile = createServerFn({ method: "GET" }).middleware([requireAuth]).handler(createSsrRpc("76e2fd2965f176c3f04724099a62c6fc6e1fc5d52e4e40ebcc647d1ca0a3657e"));
var saveTeacherProfile = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({
	displayName: stringType().trim().min(2, "الاسم مطلوب"),
	bio: stringType().trim().min(2, "النبذة مطلوبة"),
	subjectsLabel: stringType().trim().min(1, "المواد مطلوبة")
}).parse(input)).handler(createSsrRpc("e33924e2a38bd9bcc7eaf8d3e4d2ba38d1dfdef19cc6a964a3cceec3db48f78f"));
var listLinkedChildren = createServerFn({ method: "GET" }).middleware([requireAuth]).handler(createSsrRpc("05c05276ef23a695eba190af689dde57282c0e60a194dbf8ead6e37e582f10dc"));
var addLinkedChild = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({
	childName: stringType().trim().min(2, "اسم الابن مطلوب"),
	gradeLabel: stringType().trim().min(2, "الصف مطلوب")
}).parse(input)).handler(createSsrRpc("78e4980bd89fb0abc9968fb9f4bf81cde77e8eba337fd2a23f876bc3945c31d0"));
var unlinkChild = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({ id: stringType() }).parse(input)).handler(createSsrRpc("da0025f40923a6e46e5b94b752e822f06914ce3158dcb29f4e20dc0463e0c269"));
var getParentNotificationPrefs = createServerFn({ method: "GET" }).middleware([requireAuth]).handler(createSsrRpc("19ac1a731ad10e924c49b22feeb607cd8af07aa13ac83ce4ef255669fc29a4e6"));
var saveParentNotificationPrefs = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({
	weeklyReport: booleanType(),
	masteryAlert: booleanType(),
	teacherMessages: booleanType()
}).parse(input)).handler(createSsrRpc("899775e4ba062860e513fea2e1f85524d8d12c3bfe66010216b53b01f2a4b678"));
var listNotifications = createServerFn({ method: "GET" }).middleware([requireAuth]).handler(createSsrRpc("f21c393b0a6b492b106d410ee123c841b15e4ce51f4061ce336ea7804d209152"));
var markNotificationRead = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({ id: stringType() }).parse(input)).handler(createSsrRpc("40db4029a5135df58c815915ecc3fe29d029d7f92b5585ff77118e15457393ab"));
var markAllNotificationsRead = createServerFn({ method: "POST" }).middleware([requireAuth]).handler(createSsrRpc("77d41ec318e19ceaeb7e0024e1e0acff69d01e302d9ef7e8d6343b8ec41c94c4"));
var deleteNotification = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({ id: stringType() }).parse(input)).handler(createSsrRpc("e3debcd0c409bba8621bc272b38fe4c5e8a842e602f029be951ffda3eaa9b534"));
//#endregion
export { getTeacherSettings as a, markAllNotificationsRead as c, saveTeacherProfile as d, saveTeacherSettings as f, getTeacherProfile as i, markNotificationRead as l, deleteNotification as n, listLinkedChildren as o, unlinkChild as p, getParentNotificationPrefs as r, listNotifications as s, addLinkedChild as t, saveParentNotificationPrefs as u };
