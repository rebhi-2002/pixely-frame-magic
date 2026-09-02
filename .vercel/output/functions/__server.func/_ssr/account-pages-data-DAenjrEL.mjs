//#region node_modules/.nitro/vite/services/ssr/assets/account-pages-data-DAenjrEL.js
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
	profileViews: 1860,
	rating: 4.8
};
var LINKED_CHILDREN = [{
	id: "lc-1",
	childName: "أحمد",
	gradeLabel: "الصف الحادي عشر",
	linkedDateLabel: "2026/03/02"
}, {
	id: "lc-2",
	childName: "سارة",
	gradeLabel: "الصف التاسع",
	linkedDateLabel: "2026/04/18"
}];
var PARENT_NOTIFICATION_PREFS = {
	weeklyReport: true,
	masteryAlert: true,
	teacherMessages: true
};
var NOTIFICATIONS = [
	{
		id: "nt-1",
		title: "تم نشر نتيجة اختبار الفيزياء",
		meta: "منذ 12 دقيقة",
		category: "اليوم",
		isNew: true,
		tone: "primary"
	},
	{
		id: "nt-2",
		title: "موعد مراجعة الرياضيات غداً",
		meta: "منذ ساعة",
		category: "اليوم",
		isNew: true,
		tone: "success"
	},
	{
		id: "nt-3",
		title: "تم تحديث إعدادات الأمان",
		meta: "منذ 3 ساعات",
		category: "اليوم",
		isNew: false,
		tone: "muted"
	},
	{
		id: "nt-4",
		title: "أضيف درس جديد إلى مكتبتك",
		meta: "أمس",
		category: "سابقاً",
		isNew: false,
		tone: "muted"
	},
	{
		id: "nt-5",
		title: "اكتملت سلسلة إنجاز 12 يوماً",
		meta: "منذ يومين",
		category: "سابقاً",
		isNew: false,
		tone: "success"
	}
];
function nextAccountId(prefix) {
	return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}
//#endregion
export { TEACHER_SETTINGS as a, TEACHER_PROFILE as i, NOTIFICATIONS as n, nextAccountId as o, PARENT_NOTIFICATION_PREFS as r, LINKED_CHILDREN as t };
