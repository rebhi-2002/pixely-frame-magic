// كتالوج الكورسات العام (صفحة /courses قبل تسجيل الدخول) — كان قبل هيك
// مكتوب داخل ملفات الترجمة (i18n JSON)، نقلته هون ليصير بيانات حقيقية
// قابلة للإدارة من لوحة الأدمن (نفس مبدأ باقي ملفات *-data.ts).

export interface PublicCourseRow {
  id: string;
  title: [string, string];
  teacher: [string, string];
  teacherId: string;
  subject: [string, string];
  level: [string, string];
  lessons: number;
  price: number;
}

export const PUBLIC_COURSES: PublicCourseRow[] = [
  {
    id: "math-tawjihi",
    title: ["الرياضيات — تفاضل وتكامل", "Mathematics — Calculus"],
    teacher: ["أ. سامي خليل", "Sami Khalil"],
    teacherId: "sami-khalil",
    subject: ["رياضيات", "Math"],
    level: ["توجيهي علمي", "Science track"],
    lessons: 42,
    price: 35,
  },
  {
    id: "physics-mechanics",
    title: ["الفيزياء — الميكانيكا الكاملة", "Physics — Full mechanics"],
    teacher: ["أ. رنا حدّاد", "Rana Haddad"],
    teacherId: "rana-haddad",
    subject: ["فيزياء", "Physics"],
    level: ["توجيهي علمي", "Science track"],
    lessons: 36,
    price: 30,
  },
  {
    id: "arabic-grammar",
    title: ["اللغة العربية — النحو والبلاغة", "Arabic — Grammar & rhetoric"],
    teacher: ["أ. مها زيدان", "Maha Zeidan"],
    teacherId: "maha-zeidan",
    subject: ["عربي", "Arabic"],
    level: ["توجيهي عام", "General track"],
    lessons: 28,
    price: 0,
  },
  {
    id: "english-exam",
    title: ["الإنجليزية — تحضير الامتحان", "English — Exam preparation"],
    teacher: ["أ. لؤي درويش", "Luay Darwish"],
    teacherId: "luay-darwish",
    subject: ["إنجليزي", "English"],
    level: ["توجيهي عام", "General track"],
    lessons: 24,
    price: 25,
  },
  {
    id: "chem-organic",
    title: ["الكيمياء العضوية من الصفر", "Organic chemistry from zero"],
    teacher: ["أ. نور عابد", "Noor Abed"],
    teacherId: "noor-abed",
    subject: ["كيمياء", "Chemistry"],
    level: ["توجيهي علمي", "Science track"],
    lessons: 31,
    price: 28,
  },
  {
    id: "islamic-studies",
    title: ["التربية الإسلامية — مراجعة شاملة", "Islamic studies — Full review"],
    teacher: ["أ. عمر الشريف", "Omar Sharif"],
    teacherId: "omar-sharif",
    subject: ["إسلامية", "Islamic"],
    level: ["توجيهي عام", "General track"],
    lessons: 18,
    price: 0,
  },
];

export function nextCatalogId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}
