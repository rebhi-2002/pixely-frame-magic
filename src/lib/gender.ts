// أسماء خيارات الجنس بتيجي من الباك اند (جدول Constants — مزروعة بالعربي: ذكر/أنثى).
// بالواجهة الإنجليزية منعرضها Male/Female. المطابقة بالـid الثابت من الباك اند
// (GeneralEnums.Male=6، Female=7) وبالاسم كاحتياط لو اختلفت الأرقام بقاعدة بيانات
// تانية. أي قيمة جديدة ما منعرفها بتنعرض باسمها العربي القادم من الباك اند كما هو
// (ما منخترع ترجمة).

const GENDER_EN_BY_ID: Record<number, string> = { 6: "Male", 7: "Female" };
const GENDER_EN_BY_NAME: Record<string, string> = {
  ذكر: "Male",
  أنثى: "Female",
  انثى: "Female",
};

export function genderNameEn(gender: { id: number; name: string }): string {
  return GENDER_EN_BY_ID[gender.id] ?? GENDER_EN_BY_NAME[gender.name.trim()] ?? gender.name;
}
