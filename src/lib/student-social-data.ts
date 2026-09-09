// بيانات ثابتة (in-memory) لصفحات "تنظيم واجتماعي" بمساحة الطالب — الجدول،
// المجتمع، المحفوظات، الإحالات. نفس مبدأ باقي ملفات *-data.ts.

export type ScheduleEventType = "حصة" | "مراجعة" | "امتحان" | "واجب";

export interface ScheduleEventRow {
  id: string;
  dayAr: string;
  dayEn: string;
  activityTitle: string;
  timeLabel: string;
  type: ScheduleEventType;
  hoursPlanned: number;
  reminderOn: boolean;
  overdue: boolean;
}

export const SCHEDULE_EVENTS: ScheduleEventRow[] = [
  {
    id: "sch-1",
    dayAr: "الأحد",
    dayEn: "Sunday",
    activityTitle: "مراجعة رياضيات",
    timeLabel: "17:00",
    type: "مراجعة",
    hoursPlanned: 1.5,
    reminderOn: true,
    overdue: false,
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
    overdue: false,
  },
  {
    id: "sch-3",
    dayAr: "الأربعاء",
    dayEn: "Wednesday",
    activityTitle: "تسليم واجب كيمياء",
    timeLabel: "23:59",
    type: "واجب",
    hoursPlanned: 0.5,
    reminderOn: true,
    overdue: true,
  },
];

export type QuestionStatus = "إجابة معلم" | "مفتوح" | "مُغلق";

export interface CommunityQuestionRow {
  id: string;
  questionTitle: string;
  subjectName: string;
  answersCount: number;
  status: QuestionStatus;
}

export const COMMUNITY_QUESTIONS: CommunityQuestionRow[] = [
  {
    id: "cq-1",
    questionTitle: "كيف نحلّ تكامل بالتجزيء؟",
    subjectName: "رياضيات",
    // صفر بقصد — مافي إجابات حقيقية من معلم أو زميل بعد، هاد دفتر أسئلة
    // شخصي حاليًا (راجع وصف الصفحة community.tsx).
    answersCount: 0,
    status: "مفتوح",
  },
  {
    id: "cq-2",
    questionTitle: "فرق الجهد في التوالي والتوازي",
    subjectName: "فيزياء",
    answersCount: 0,
    status: "مفتوح",
  },
  {
    id: "cq-3",
    questionTitle: "مراجعة قواعد الهمزة",
    subjectName: "عربي",
    answersCount: 0,
    status: "مفتوح",
  },
];

export interface CommunityStats {
  memberCount: number;
  reputation: number;
}

// أصفار بقصد — مافي مجتمع حقيقي متعدد المستخدمين بعد (راجع وصف الصفحة).
export const COMMUNITY_STATS: CommunityStats = {
  memberCount: 0,
  reputation: 0,
};

export type BookmarkType = "درس" | "سؤال" | "نقاش";

export interface BookmarkRow {
  id: string;
  itemTitle: string;
  subjectName: string;
  type: BookmarkType;
}

export const BOOKMARKS: BookmarkRow[] = [
  { id: "bm-1", itemTitle: "درس: تكامل بالتجزيء", subjectName: "رياضيات", type: "درس" },
  { id: "bm-2", itemTitle: "سؤال: قانون أوم", subjectName: "فيزياء", type: "سؤال" },
  { id: "bm-3", itemTitle: "نقاش: تنظيم وقت المراجعة", subjectName: "عام", type: "نقاش" },
];

export type ReferralStatus = "مكافأة" | "معلّق";

export interface ReferralRow {
  id: string;
  friendName: string;
  dateLabel: string;
  status: ReferralStatus;
}

// فاضية بقصد — ما في أصدقاء حقيقيين انضموا عبر الإحالة بعد، فما بنعرض
// مكافآت وهمية. أول إحالة حقيقية بتظهر هون تلقائياً.
export const REFERRALS: ReferralRow[] = [];

export interface ReferralLink {
  code: string;
}

export const REFERRAL_LINK: ReferralLink = { code: "AH12" };

export function nextSocialId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}
