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
    answersCount: 6,
    status: "إجابة معلم",
  },
  {
    id: "cq-2",
    questionTitle: "فرق الجهد في التوالي والتوازي",
    subjectName: "فيزياء",
    answersCount: 3,
    status: "مفتوح",
  },
  {
    id: "cq-3",
    questionTitle: "مراجعة قواعد الهمزة",
    subjectName: "عربي",
    answersCount: 9,
    status: "مُغلق",
  },
];

export interface CommunityStats {
  memberCount: number;
  reputation: number;
}

export const COMMUNITY_STATS: CommunityStats = {
  memberCount: 312,
  reputation: 150,
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

export const REFERRALS: ReferralRow[] = [
  { id: "ref-1", friendName: "لؤي ع.", dateLabel: "2026/07/12", status: "مكافأة" },
  { id: "ref-2", friendName: "سما ح.", dateLabel: "2026/07/03", status: "مكافأة" },
  { id: "ref-3", friendName: "يزن م.", dateLabel: "—", status: "معلّق" },
];

export interface ReferralLink {
  code: string;
}

export const REFERRAL_LINK: ReferralLink = { code: "AH12" };

export function nextSocialId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}
