//#region node_modules/.nitro/vite/services/ssr/assets/student-learning-data-D1MitbQK.js
var ENROLLMENTS = [
	{
		id: "enr-1",
		courseTitle: "تفاضل وتكامل",
		teacherName: "أ. سامي",
		progressPercent: 62,
		nextSessionLabel: "الأحد 18:00",
		status: "قيد الدراسة"
	},
	{
		id: "enr-2",
		courseTitle: "فيزياء الوزاري",
		teacherName: "أ. ريم",
		progressPercent: 45,
		nextSessionLabel: "الثلاثاء 19:30",
		status: "قيد الدراسة"
	},
	{
		id: "enr-3",
		courseTitle: "عربي — بلاغة وتحليل",
		teacherName: "أ. لينا",
		progressPercent: 88,
		nextSessionLabel: "مسجّل مسبقاً",
		status: "قيد الدراسة"
	},
	{
		id: "enr-4",
		courseTitle: "مهارات المراجعة الذكية",
		teacherName: "أ. خالد",
		progressPercent: 100,
		nextSessionLabel: "—",
		status: "مكتمل"
	},
	{
		id: "enr-5",
		courseTitle: "أساسيات الكيمياء",
		teacherName: "أ. ياسر",
		progressPercent: 100,
		nextSessionLabel: "—",
		status: "مكتمل"
	}
];
var LIBRARY_SUBJECTS = [
	{
		id: "lib-1",
		subjectName: "الرياضيات",
		termLabel: "الفصل الأول",
		unitsCount: 6,
		lessonsCount: 32,
		progressPercent: 78
	},
	{
		id: "lib-2",
		subjectName: "الفيزياء",
		termLabel: "الفصل الأول",
		unitsCount: 5,
		lessonsCount: 26,
		progressPercent: 54
	},
	{
		id: "lib-3",
		subjectName: "الكيمياء",
		termLabel: "الفصل الأول",
		unitsCount: 4,
		lessonsCount: 21,
		progressPercent: 40
	},
	{
		id: "lib-4",
		subjectName: "اللغة العربية",
		termLabel: "الفصل الأول",
		unitsCount: 5,
		lessonsCount: 30,
		progressPercent: 91
	}
];
var FLASHCARD_DECKS = [
	{
		id: "deck-1",
		deckName: "رياضيات — مشتقات",
		totalCards: 48,
		dueCards: 12,
		masteredCards: 30,
		cards: [
			{
				front: "مشتقة x²",
				back: "2x"
			},
			{
				front: "مشتقة sin(x)",
				back: "cos(x)"
			},
			{
				front: "مشتقة ثابت (مثل 7)",
				back: "0"
			},
			{
				front: "قاعدة الضرب: مشتقة (u·v)",
				back: "u'v + uv'"
			}
		]
	},
	{
		id: "deck-2",
		deckName: "فيزياء — الحركة",
		totalCards: 36,
		dueCards: 14,
		masteredCards: 18,
		cards: [
			{
				front: "قانون نيوتن الثاني",
				back: "F = m × a"
			},
			{
				front: "السرعة = ؟",
				back: "المسافة ÷ الزمن"
			},
			{
				front: "التسارع = ؟",
				back: "التغيّر بالسرعة ÷ الزمن"
			}
		]
	},
	{
		id: "deck-3",
		deckName: "عربي — بلاغة",
		totalCards: 60,
		dueCards: 8,
		masteredCards: 45,
		cards: [
			{
				front: "التشبيه",
				back: "مقارنة شيء بشيء بأداة تشبيه لصفة مشتركة"
			},
			{
				front: "الاستعارة",
				back: "تشبيه حذف منه أحد طرفيه"
			},
			{
				front: "الطباق",
				back: "الجمع بين لفظتين متضادتين بالمعنى"
			}
		]
	}
];
var WEEKLY_STUDY_LOG = [
	{
		day: ["سبت", "Sat"],
		minutes: 35
	},
	{
		day: ["أحد", "Sun"],
		minutes: 50
	},
	{
		day: ["اثنين", "Mon"],
		minutes: 42
	},
	{
		day: ["ثلاثاء", "Tue"],
		minutes: 68
	},
	{
		day: ["أربعاء", "Wed"],
		minutes: 55
	},
	{
		day: ["خميس", "Thu"],
		minutes: 72
	},
	{
		day: ["جمعة", "Fri"],
		minutes: 30
	}
];
var UPCOMING_TASKS = [
	{
		id: "up-1",
		title: "امتحان فيزياء — وحدة 3",
		whenLabel: "غداً 9:00",
		type: "امتحان"
	},
	{
		id: "up-2",
		title: "تسليم ورقة عمل رياضيات",
		whenLabel: "بعد يومين",
		type: "واجب"
	},
	{
		id: "up-3",
		title: "مراجعة بطاقات كيمياء",
		whenLabel: "اليوم",
		type: "مراجعة"
	}
];
var STUDY_STATS = {
	streakDays: 12,
	achievementPoints: 1240,
	longestStreak: 21
};
function nextStudentId(prefix) {
	return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}
//#endregion
export { UPCOMING_TASKS as a, STUDY_STATS as i, FLASHCARD_DECKS as n, WEEKLY_STUDY_LOG as o, LIBRARY_SUBJECTS as r, nextStudentId as s, ENROLLMENTS as t };
