import { a as numberType, n as booleanType, o as objectType, r as enumType, s as stringType } from "../_libs/zod.mjs";
import { r as createServerFn } from "./server-tMaTfkv1.mjs";
import { t as requireAuth } from "./auth-middleware-Dsbad7Ma.mjs";
import { o as requirePageAction, t as createServerRpc } from "./rbac.server-BM9kmPOX.mjs";
import { a as REFERRAL_LINK, i as REFERRALS, n as COMMUNITY_QUESTIONS, o as SCHEDULE_EVENTS, r as COMMUNITY_STATS, s as nextSocialId, t as BOOKMARKS } from "./student-social-data-NYvD98SY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/student-social.functions-bWLdGdUz.js
var listScheduleEvents_createServerFn_handler = createServerRpc({
	id: "c2af62d5539af6a319c9b1dcfaa62e4d7bc0222181d6d464392239a18fe74181",
	name: "listScheduleEvents",
	filename: "src/lib/student-social.functions.ts"
}, (opts) => listScheduleEvents.__executeServer(opts));
var listScheduleEvents = createServerFn({ method: "GET" }).middleware([requireAuth]).handler(listScheduleEvents_createServerFn_handler, async ({ context }) => {
	await requirePageAction(context.userId, "student_schedule", "view_list");
	return SCHEDULE_EVENTS;
});
var saveScheduleEvent_createServerFn_handler = createServerRpc({
	id: "cf8f625ddf9d97c0afb59978c67330647c1b52deab9c1fb346b2165b50b175e0",
	name: "saveScheduleEvent",
	filename: "src/lib/student-social.functions.ts"
}, (opts) => saveScheduleEvent.__executeServer(opts));
var saveScheduleEvent = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({
	id: stringType().optional(),
	dayAr: stringType().trim().min(2, "اليوم مطلوب"),
	dayEn: stringType().trim().min(2),
	activityTitle: stringType().trim().min(2, "النشاط مطلوب"),
	timeLabel: stringType().trim().min(1, "الوقت مطلوب"),
	type: enumType([
		"حصة",
		"مراجعة",
		"امتحان",
		"واجب"
	]),
	hoursPlanned: numberType().min(0),
	reminderOn: booleanType(),
	overdue: booleanType()
}).parse(input)).handler(saveScheduleEvent_createServerFn_handler, async ({ data, context }) => {
	await requirePageAction(context.userId, "student_schedule", data.id ? "edit" : "execute_add");
	if (data.id) {
		const row = SCHEDULE_EVENTS.find((r) => r.id === data.id);
		if (!row) throw new Error("الحدث غير موجود");
		Object.assign(row, data);
	} else {
		const row = {
			id: nextSocialId("sch"),
			...data
		};
		SCHEDULE_EVENTS.push(row);
	}
	return { ok: true };
});
var deleteScheduleEvent_createServerFn_handler = createServerRpc({
	id: "38b3d03f80497ef344bccce79059c3ac32f4e613ab876e79db943f11bc22557f",
	name: "deleteScheduleEvent",
	filename: "src/lib/student-social.functions.ts"
}, (opts) => deleteScheduleEvent.__executeServer(opts));
var deleteScheduleEvent = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({ id: stringType() }).parse(input)).handler(deleteScheduleEvent_createServerFn_handler, async ({ data, context }) => {
	await requirePageAction(context.userId, "student_schedule", "delete");
	const idx = SCHEDULE_EVENTS.findIndex((r) => r.id === data.id);
	if (idx !== -1) SCHEDULE_EVENTS.splice(idx, 1);
	return { ok: true };
});
var listCommunityQuestions_createServerFn_handler = createServerRpc({
	id: "4e9bd2bbcec1ebb33729ac90c0c324338f87eab653bd57c42cb9f8aeb0c7059b",
	name: "listCommunityQuestions",
	filename: "src/lib/student-social.functions.ts"
}, (opts) => listCommunityQuestions.__executeServer(opts));
var listCommunityQuestions = createServerFn({ method: "GET" }).middleware([requireAuth]).handler(listCommunityQuestions_createServerFn_handler, async ({ context }) => {
	await requirePageAction(context.userId, "student_community", "view_list");
	return COMMUNITY_QUESTIONS;
});
var saveCommunityQuestion_createServerFn_handler = createServerRpc({
	id: "b39e222eb7e7167efe58df8816f712e7522f88b7d6c8092a4ef809c3428c5405",
	name: "saveCommunityQuestion",
	filename: "src/lib/student-social.functions.ts"
}, (opts) => saveCommunityQuestion.__executeServer(opts));
var saveCommunityQuestion = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({
	id: stringType().optional(),
	questionTitle: stringType().trim().min(3, "السؤال مطلوب"),
	subjectName: stringType().trim().min(2, "المادة مطلوبة"),
	answersCount: numberType().int().min(0),
	status: enumType([
		"إجابة معلم",
		"مفتوح",
		"مُغلق"
	])
}).parse(input)).handler(saveCommunityQuestion_createServerFn_handler, async ({ data, context }) => {
	await requirePageAction(context.userId, "student_community", data.id ? "edit" : "execute_add");
	if (data.id) {
		const row = COMMUNITY_QUESTIONS.find((r) => r.id === data.id);
		if (!row) throw new Error("السؤال غير موجود");
		Object.assign(row, data);
	} else {
		const row = {
			id: nextSocialId("cq"),
			...data
		};
		COMMUNITY_QUESTIONS.push(row);
	}
	return { ok: true };
});
var deleteCommunityQuestion_createServerFn_handler = createServerRpc({
	id: "fc1bd5b6cf0de859776c2dbf0f3bba04e7206b9135934dbad8c64591417e00ee",
	name: "deleteCommunityQuestion",
	filename: "src/lib/student-social.functions.ts"
}, (opts) => deleteCommunityQuestion.__executeServer(opts));
var deleteCommunityQuestion = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({ id: stringType() }).parse(input)).handler(deleteCommunityQuestion_createServerFn_handler, async ({ data, context }) => {
	await requirePageAction(context.userId, "student_community", "delete");
	const idx = COMMUNITY_QUESTIONS.findIndex((r) => r.id === data.id);
	if (idx !== -1) COMMUNITY_QUESTIONS.splice(idx, 1);
	return { ok: true };
});
var getCommunityStats_createServerFn_handler = createServerRpc({
	id: "e7bbd4046cfa6c30697a2be7ded045cced65d572268e72ffa5001d5567b39bb4",
	name: "getCommunityStats",
	filename: "src/lib/student-social.functions.ts"
}, (opts) => getCommunityStats.__executeServer(opts));
var getCommunityStats = createServerFn({ method: "GET" }).middleware([requireAuth]).handler(getCommunityStats_createServerFn_handler, async ({ context }) => {
	await requirePageAction(context.userId, "student_community", "view_list");
	return COMMUNITY_STATS;
});
var saveCommunityStats_createServerFn_handler = createServerRpc({
	id: "a1f98b33e7c030a5d200f852401002e281c268dd5f6248dc4d86b09a87ff999e",
	name: "saveCommunityStats",
	filename: "src/lib/student-social.functions.ts"
}, (opts) => saveCommunityStats.__executeServer(opts));
var saveCommunityStats = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({
	memberCount: numberType().int().min(0),
	reputation: numberType().int().min(0)
}).parse(input)).handler(saveCommunityStats_createServerFn_handler, async ({ data, context }) => {
	await requirePageAction(context.userId, "student_community", "edit");
	Object.assign(COMMUNITY_STATS, data);
	return { ok: true };
});
var listBookmarks_createServerFn_handler = createServerRpc({
	id: "8e936cc82a8469128261ab7f749877849b2d2c587d61ecf31681b696d3f60d39",
	name: "listBookmarks",
	filename: "src/lib/student-social.functions.ts"
}, (opts) => listBookmarks.__executeServer(opts));
var listBookmarks = createServerFn({ method: "GET" }).middleware([requireAuth]).handler(listBookmarks_createServerFn_handler, async ({ context }) => {
	await requirePageAction(context.userId, "student_bookmarks", "view_list");
	return BOOKMARKS;
});
var saveBookmark_createServerFn_handler = createServerRpc({
	id: "495ccf38f1140eb71c41ce407ee56f58fecb9ba69f32c5728c285e6a5760f8d6",
	name: "saveBookmark",
	filename: "src/lib/student-social.functions.ts"
}, (opts) => saveBookmark.__executeServer(opts));
var saveBookmark = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({
	id: stringType().optional(),
	itemTitle: stringType().trim().min(2, "العنوان مطلوب"),
	subjectName: stringType().trim().min(1, "المادة مطلوبة"),
	type: enumType([
		"درس",
		"سؤال",
		"نقاش"
	])
}).parse(input)).handler(saveBookmark_createServerFn_handler, async ({ data, context }) => {
	await requirePageAction(context.userId, "student_bookmarks", data.id ? "edit" : "execute_add");
	if (data.id) {
		const row = BOOKMARKS.find((r) => r.id === data.id);
		if (!row) throw new Error("العنصر غير موجود");
		Object.assign(row, data);
	} else {
		const row = {
			id: nextSocialId("bm"),
			...data
		};
		BOOKMARKS.push(row);
	}
	return { ok: true };
});
var deleteBookmark_createServerFn_handler = createServerRpc({
	id: "95581e0065cf10e7a54a2d917eb72b35a2dfd758b6f2bb0e05bc2f80a9344ac3",
	name: "deleteBookmark",
	filename: "src/lib/student-social.functions.ts"
}, (opts) => deleteBookmark.__executeServer(opts));
var deleteBookmark = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({ id: stringType() }).parse(input)).handler(deleteBookmark_createServerFn_handler, async ({ data, context }) => {
	await requirePageAction(context.userId, "student_bookmarks", "delete");
	const idx = BOOKMARKS.findIndex((r) => r.id === data.id);
	if (idx !== -1) BOOKMARKS.splice(idx, 1);
	return { ok: true };
});
var listReferrals_createServerFn_handler = createServerRpc({
	id: "3dfb409bd1e262ce4f4c1e5f34f2c5f739a60b8a6249ace827e4bad268b89864",
	name: "listReferrals",
	filename: "src/lib/student-social.functions.ts"
}, (opts) => listReferrals.__executeServer(opts));
var listReferrals = createServerFn({ method: "GET" }).middleware([requireAuth]).handler(listReferrals_createServerFn_handler, async ({ context }) => {
	await requirePageAction(context.userId, "student_referrals", "view_list");
	return REFERRALS;
});
var saveReferral_createServerFn_handler = createServerRpc({
	id: "f6748a7e86065ac034483ceb7673364b7a224fe791e6df709d50d049ba4d701c",
	name: "saveReferral",
	filename: "src/lib/student-social.functions.ts"
}, (opts) => saveReferral.__executeServer(opts));
var saveReferral = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({
	id: stringType().optional(),
	friendName: stringType().trim().min(2, "الاسم مطلوب"),
	dateLabel: stringType().trim().min(1),
	status: enumType(["مكافأة", "معلّق"])
}).parse(input)).handler(saveReferral_createServerFn_handler, async ({ data, context }) => {
	await requirePageAction(context.userId, "student_referrals", data.id ? "edit" : "execute_add");
	if (data.id) {
		const row = REFERRALS.find((r) => r.id === data.id);
		if (!row) throw new Error("الدعوة غير موجودة");
		Object.assign(row, data);
	} else {
		const row = {
			id: nextSocialId("ref"),
			...data
		};
		REFERRALS.push(row);
	}
	return { ok: true };
});
var deleteReferral_createServerFn_handler = createServerRpc({
	id: "cfb2ddfa8d9386bfd82f655ce1a5f177b4e55544bc56f58a05b67ba87af65361",
	name: "deleteReferral",
	filename: "src/lib/student-social.functions.ts"
}, (opts) => deleteReferral.__executeServer(opts));
var deleteReferral = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({ id: stringType() }).parse(input)).handler(deleteReferral_createServerFn_handler, async ({ data, context }) => {
	await requirePageAction(context.userId, "student_referrals", "delete");
	const idx = REFERRALS.findIndex((r) => r.id === data.id);
	if (idx !== -1) REFERRALS.splice(idx, 1);
	return { ok: true };
});
var getReferralLink_createServerFn_handler = createServerRpc({
	id: "99b5124ec5172fb234fdde32fd546e1e77ae8095f879c56dd8741233340e9096",
	name: "getReferralLink",
	filename: "src/lib/student-social.functions.ts"
}, (opts) => getReferralLink.__executeServer(opts));
var getReferralLink = createServerFn({ method: "GET" }).middleware([requireAuth]).handler(getReferralLink_createServerFn_handler, async ({ context }) => {
	await requirePageAction(context.userId, "student_referrals", "view_list");
	return REFERRAL_LINK;
});
//#endregion
export { deleteBookmark_createServerFn_handler, deleteCommunityQuestion_createServerFn_handler, deleteReferral_createServerFn_handler, deleteScheduleEvent_createServerFn_handler, getCommunityStats_createServerFn_handler, getReferralLink_createServerFn_handler, listBookmarks_createServerFn_handler, listCommunityQuestions_createServerFn_handler, listReferrals_createServerFn_handler, listScheduleEvents_createServerFn_handler, saveBookmark_createServerFn_handler, saveCommunityQuestion_createServerFn_handler, saveCommunityStats_createServerFn_handler, saveReferral_createServerFn_handler, saveScheduleEvent_createServerFn_handler };
