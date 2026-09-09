// بيانات ثابتة (in-memory) لصفحات الإعدادات/الملفات الشخصية — إعدادات
// المعلم، ملفه العام، إعدادات ولي الأمر، الإشعارات. نفس مبدأ باقي ملفات
// *-data.ts.

export interface TeacherSettings {
  privateSessionPrice: number;
  availabilityLabel: string;
  payoutMethodLabel: string;
  notifyNewQuestion: boolean;
}

export const TEACHER_SETTINGS: TeacherSettings = {
  privateSessionPrice: 20,
  availabilityLabel: "أحد-خميس 17:00-21:00",
  payoutMethodLabel: "حوالة بنكية",
  notifyNewQuestion: true,
};

export interface TeacherProfile {
  displayName: string;
  bio: string;
  subjectsLabel: string;
  profileViews: number;
  rating: number;
}

export const TEACHER_PROFILE: TeacherProfile = {
  displayName: "أ. سامي خالد",
  bio: "معلم رياضيات — 12 سنة خبرة",
  subjectsLabel: "رياضيات · فيزياء",
  // أصفار بقصد — مشاهدات وتقييم حقيقيين من زوار/طلاب حقيقيين، ما توفروا بعد.
  profileViews: 0,
  rating: 0,
};

export interface LinkedChildRow {
  id: string;
  childName: string;
  gradeLabel: string;
  linkedDateLabel: string;
}

// فاضية بقصد — ولي الأمر ما ربط أولاد حقيقيين بعد. أول ابن يُربط فعليًا
// بيظهر هون تلقائياً.
export const LINKED_CHILDREN: LinkedChildRow[] = [];

export interface ParentNotificationPrefs {
  weeklyReport: boolean;
  masteryAlert: boolean;
  teacherMessages: boolean;
}

export const PARENT_NOTIFICATION_PREFS: ParentNotificationPrefs = {
  weeklyReport: true,
  masteryAlert: true,
  teacherMessages: true,
};

export type NotificationCategory = "اليوم" | "سابقاً";

export interface NotificationRow {
  id: string;
  title: string;
  meta: string;
  category: NotificationCategory;
  isNew: boolean;
  tone: "primary" | "success" | "muted";
}

// فاضية بقصد — إشعارات عن أحداث حقيقية (نتيجة اختبار، درس جديد...) ما
// صارت بعد، فما بنعرض إشعارات لأحداث مختلقة بتواريخ وهمية.
export const NOTIFICATIONS: NotificationRow[] = [];

export function nextAccountId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}
