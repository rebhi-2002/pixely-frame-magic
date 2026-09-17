import { a as numberType, n as booleanType, o as objectType, r as enumType, s as stringType } from "../_libs/zod.mjs";
import { r as createServerFn } from "./server-oWHHg8-O.mjs";
import { t as createSsrRpc } from "./createSsrRpc-UbjxkEih.mjs";
import { t as requireAuth } from "./auth-middleware-DygD5oX-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/student-social.functions-CyaRQFiJ.js
var listScheduleEvents = createServerFn({ method: "GET" }).middleware([requireAuth]).handler(createSsrRpc("c2af62d5539af6a319c9b1dcfaa62e4d7bc0222181d6d464392239a18fe74181"));
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
}).parse(input)).handler(createSsrRpc("cf8f625ddf9d97c0afb59978c67330647c1b52deab9c1fb346b2165b50b175e0"));
var deleteScheduleEvent = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({ id: stringType() }).parse(input)).handler(createSsrRpc("38b3d03f80497ef344bccce79059c3ac32f4e613ab876e79db943f11bc22557f"));
var listCommunityQuestions = createServerFn({ method: "GET" }).middleware([requireAuth]).handler(createSsrRpc("4e9bd2bbcec1ebb33729ac90c0c324338f87eab653bd57c42cb9f8aeb0c7059b"));
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
}).parse(input)).handler(createSsrRpc("b39e222eb7e7167efe58df8816f712e7522f88b7d6c8092a4ef809c3428c5405"));
var deleteCommunityQuestion = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({ id: stringType() }).parse(input)).handler(createSsrRpc("fc1bd5b6cf0de859776c2dbf0f3bba04e7206b9135934dbad8c64591417e00ee"));
var getCommunityStats = createServerFn({ method: "GET" }).middleware([requireAuth]).handler(createSsrRpc("e7bbd4046cfa6c30697a2be7ded045cced65d572268e72ffa5001d5567b39bb4"));
createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({
	memberCount: numberType().int().min(0),
	reputation: numberType().int().min(0)
}).parse(input)).handler(createSsrRpc("a1f98b33e7c030a5d200f852401002e281c268dd5f6248dc4d86b09a87ff999e"));
var listBookmarks = createServerFn({ method: "GET" }).middleware([requireAuth]).handler(createSsrRpc("8e936cc82a8469128261ab7f749877849b2d2c587d61ecf31681b696d3f60d39"));
var saveBookmark = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({
	id: stringType().optional(),
	itemTitle: stringType().trim().min(2, "العنوان مطلوب"),
	subjectName: stringType().trim().min(1, "المادة مطلوبة"),
	type: enumType([
		"درس",
		"سؤال",
		"نقاش"
	])
}).parse(input)).handler(createSsrRpc("495ccf38f1140eb71c41ce407ee56f58fecb9ba69f32c5728c285e6a5760f8d6"));
var deleteBookmark = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({ id: stringType() }).parse(input)).handler(createSsrRpc("95581e0065cf10e7a54a2d917eb72b35a2dfd758b6f2bb0e05bc2f80a9344ac3"));
var listReferrals = createServerFn({ method: "GET" }).middleware([requireAuth]).handler(createSsrRpc("3dfb409bd1e262ce4f4c1e5f34f2c5f739a60b8a6249ace827e4bad268b89864"));
var saveReferral = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({
	id: stringType().optional(),
	friendName: stringType().trim().min(2, "الاسم مطلوب"),
	dateLabel: stringType().trim().min(1),
	status: enumType(["مكافأة", "معلّق"])
}).parse(input)).handler(createSsrRpc("f6748a7e86065ac034483ceb7673364b7a224fe791e6df709d50d049ba4d701c"));
var deleteReferral = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((input) => objectType({ id: stringType() }).parse(input)).handler(createSsrRpc("cfb2ddfa8d9386bfd82f655ce1a5f177b4e55544bc56f58a05b67ba87af65361"));
var getReferralLink = createServerFn({ method: "GET" }).middleware([requireAuth]).handler(createSsrRpc("99b5124ec5172fb234fdde32fd546e1e77ae8095f879c56dd8741233340e9096"));
//#endregion
export { getCommunityStats as a, listCommunityQuestions as c, saveBookmark as d, saveCommunityQuestion as f, deleteScheduleEvent as i, listReferrals as l, saveScheduleEvent as m, deleteCommunityQuestion as n, getReferralLink as o, saveReferral as p, deleteReferral as r, listBookmarks as s, deleteBookmark as t, listScheduleEvents as u };
