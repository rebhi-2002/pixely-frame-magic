import type { RoleKey } from "@/lib/bi";

/**
 * الدور يُحدَّد بمفتاح ثابت يرجعه الباك اند (UserTypes.Code = admin | student | teacher | parent).
 * أرقام أنواع المستخدمين وأسماءهم العربية بتختلف بين البيئات (بالقاعدة الحية: 1/3/4/5)
 * فما منعتمد عليهم أبدًا لتحديد الدور — الأسماء للعرض فقط.
 */
const ROLE_KEYS: readonly RoleKey[] = ["admin", "student", "teacher", "parent"];

export function parseRoleKey(value: unknown): RoleKey | null {
  return typeof value === "string" && (ROLE_KEYS as readonly string[]).includes(value)
    ? (value as RoleKey)
    : null;
}

// احتياط فقط لو الباك اند لسا ما انحدّث (ما رجّع code): مطابقة بالاسم بعد توحيد الشكل.
const LEGACY_NAME_HINTS: Record<RoleKey, string[]> = {
  admin: ["مدير النظام", "مدير عام"],
  student: ["الطالب", "طالب"],
  teacher: ["المعلم", "معلم"],
  parent: ["ولي الامر", "ولي امر"],
};

function normalizeRoleName(name: string): string {
  return name
    .replace(/[\u064B-\u065F\u0670]/g, "")
    .replace(/[أإآٱ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه")
    .replace(/\s+/g, "")
    .replace(/^ال/, "");
}

/** يلاقي نوع المستخدم المطلوب من قائمة الباك اند: بالـcode أولًا، وبالاسم كاحتياط مؤقت. */
export function findUserTypeForRole<T extends { id: number; name: string; code?: string | null }>(
  roles: readonly T[] | undefined,
  role: RoleKey,
): T | undefined {
  if (!roles?.length) return undefined;
  const byCode = roles.find((r) => parseRoleKey(r.code) === role);
  if (byCode) return byCode;
  const wanted = LEGACY_NAME_HINTS[role].map(normalizeRoleName);
  return roles.find((r) => wanted.includes(normalizeRoleName(r.name ?? "")));
}
