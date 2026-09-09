//#region node_modules/.nitro/vite/services/ssr/assets/student-social-data-NYvD98SY.js
var SCHEDULE_EVENTS = [
	{
		id: "sch-1",
		dayAr: "الأحد",
		dayEn: "Sunday",
		activityTitle: "مراجعة رياضيات",
		timeLabel: "17:00",
		type: "مراجعة",
		hoursPlanned: 1.5,
		reminderOn: true,
		overdue: false
	},
	{
		id: "sch-2",
		dayAr: "الاثنين",
		dayEn: "Monday",
		activityTitle: "امتحان فيزياء",
		timeLabel: "09:00",
		type: "امتحان",
		hoursPlanned: 1,
		reminderOn: true,
		overdue: false
	},
	{
		id: "sch-3",
		dayAr: "الأربعاء",
		dayEn: "Wednesday",
		activityTitle: "تسليم واجب كيمياء",
		timeLabel: "23:59",
		type: "واجب",
		hoursPlanned: .5,
		reminderOn: true,
		overdue: true
	}
];
var COMMUNITY_QUESTIONS = [
	{
		id: "cq-1",
		questionTitle: "كيف نحلّ تكامل بالتجزيء؟",
		subjectName: "رياضيات",
		answersCount: 0,
		status: "مفتوح"
	},
	{
		id: "cq-2",
		questionTitle: "فرق الجهد في التوالي والتوازي",
		subjectName: "فيزياء",
		answersCount: 0,
		status: "مفتوح"
	},
	{
		id: "cq-3",
		questionTitle: "مراجعة قواعد الهمزة",
		subjectName: "عربي",
		answersCount: 0,
		status: "مفتوح"
	}
];
var COMMUNITY_STATS = {
	memberCount: 0,
	reputation: 0
};
var BOOKMARKS = [
	{
		id: "bm-1",
		itemTitle: "درس: تكامل بالتجزيء",
		subjectName: "رياضيات",
		type: "درس"
	},
	{
		id: "bm-2",
		itemTitle: "سؤال: قانون أوم",
		subjectName: "فيزياء",
		type: "سؤال"
	},
	{
		id: "bm-3",
		itemTitle: "نقاش: تنظيم وقت المراجعة",
		subjectName: "عام",
		type: "نقاش"
	}
];
var REFERRALS = [];
var REFERRAL_LINK = { code: "AH12" };
function nextSocialId(prefix) {
	return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}
//#endregion
export { REFERRAL_LINK as a, REFERRALS as i, COMMUNITY_QUESTIONS as n, SCHEDULE_EVENTS as o, COMMUNITY_STATS as r, nextSocialId as s, BOOKMARKS as t };
