//#region node_modules/.nitro/vite/services/ssr/assets/account-pages-data-Xw-6PmGW.js
var TEACHER_SETTINGS = {
	privateSessionPrice: 20,
	availabilityLabel: "أحد-خميس 17:00-21:00",
	payoutMethodLabel: "حوالة بنكية",
	notifyNewQuestion: true
};
var TEACHER_PROFILE = {
	displayName: "أ. سامي خالد",
	bio: "معلم رياضيات — 12 سنة خبرة",
	subjectsLabel: "رياضيات · فيزياء",
	profileViews: 0,
	rating: 0
};
var LINKED_CHILDREN = [];
var PARENT_NOTIFICATION_PREFS = {
	weeklyReport: true,
	masteryAlert: true,
	teacherMessages: true
};
var NOTIFICATIONS = [];
function nextAccountId(prefix) {
	return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}
//#endregion
export { TEACHER_SETTINGS as a, TEACHER_PROFILE as i, NOTIFICATIONS as n, nextAccountId as o, PARENT_NOTIFICATION_PREFS as r, LINKED_CHILDREN as t };
