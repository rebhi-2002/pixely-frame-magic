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
  profileViews: 1860,
  rating: 4.8,
};

export interface LinkedChildRow {
  id: string;
  childName: string;
  gradeLabel: string;
  linkedDateLabel: string;
}

export const LINKED_CHILDREN: LinkedChildRow[] = [
  { id: "lc-1", childName: "أحمد", gradeLabel: "الصف الحادي عشر", linkedDateLabel: "2026/03/02" },
  { id: "lc-2", childName: "سارة", gradeLabel: "الصف التاسع", linkedDateLabel: "2026/04/18" },
];

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

export const NOTIFICATIONS: NotificationRow[] = [
  {
    id: "nt-1",
    title: "تم نشر نتيجة اختبار الفيزياء",
    meta: "منذ 12 دقيقة",
    category: "اليوم",
    isNew: true,
    tone: "primary",
  },
  {
    id: "nt-2",
    title: "موعد مراجعة الرياضيات غداً",
    meta: "منذ ساعة",
    category: "اليوم",
    isNew: true,
    tone: "success",
  },
  {
    id: "nt-3",
    title: "تم تحديث إعدادات الأمان",
    meta: "منذ 3 ساعات",
    category: "اليوم",
    isNew: false,
    tone: "muted",
  },
  {
    id: "nt-4",
    title: "أضيف درس جديد إلى مكتبتك",
    meta: "أمس",
    category: "سابقاً",
    isNew: false,
    tone: "muted",
  },
  {
    id: "nt-5",
    title: "اكتملت سلسلة إنجاز 12 يوماً",
    meta: "منذ يومين",
    category: "سابقاً",
    isNew: false,
    tone: "success",
  },
];

export function nextAccountId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}
