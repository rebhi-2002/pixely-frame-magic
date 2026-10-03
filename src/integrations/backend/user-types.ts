import type { RoleKey } from "@/lib/bi";

/**
 * أرقام أنواع المستخدمين المعتمدة من فريق الباك اند (قاعدة البيانات الحية):
 * 1 = مدير النظام، 3 = الطالب، 4 = المعلم، 5 = ولي الأمر.
 * هاي المرجع الأول لتحديد الدور (بعد code لو رجّعه الباك اند)، والاسم احتياط أخير.
 * لو تغيّرت الأرقام بالباك اند عدّلها هون بس — مكان واحد.
 */
export const USER_TYPE_ID_TO_ROLE: Readonly<Record<number, RoleKey>> = {
  1: "admin",
  3: "student",
  4: "teacher",
  5: "parent",
};

export const ROLE_TO_USER_TYPE_ID: Readonly<Record<RoleKey, number>> = {
  admin: 1,
  student: 3,
  teacher: 4,
  parent: 5,
};

/** يقبل رقم أو نص رقمي ("4") ويرجّع الدور، أو null لو الرقم غير معروف. */
export function roleKeyFromTypeId(id: unknown): RoleKey | null {
  const n = typeof id === "string" && id.trim() !== "" ? Number(id) : id;
  return typeof n === "number" && Number.isInteger(n) ? (USER_TYPE_ID_TO_ROLE[n] ?? null) : null;
}

/**
 * ترتيب تحديد الدور: code من الباك اند → رقم النوع (1/3/4/5) → الاسم (احتياط أخير).
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

/** مفتاح الدور لنوع مستخدم قادم من الباك اند: بالـcode أولًا، وبالاسم كاحتياط
 * (CreateEditModal ما بيرجّع code — بس id وname — فبدون هالاحتياط كل الأدوار بتطلع ""). */
export function roleKeyOfUserType(t: {
  id?: number | string | null;
  name?: string | null;
  code?: string | null;
}): RoleKey | null {
  const byCode = parseRoleKey(t.code);
  if (byCode) return byCode;
  const byId = roleKeyFromTypeId(t.id);
  if (byId) return byId;
  const name = normalizeRoleName(t.name ?? "");
  if (!name) return null;
  for (const key of ROLE_KEYS) {
    if (LEGACY_NAME_HINTS[key].map(normalizeRoleName).includes(name)) return key;
  }
  return null;
}

/** يلاقي نوع المستخدم المطلوب من قائمة الباك اند: بالـcode أولًا، وبالاسم كاحتياط مؤقت. */
export function findUserTypeForRole<T extends { id: number; name: string; code?: string | null }>(
  roles: readonly T[] | undefined,
  role: RoleKey,
): T | undefined {
  if (!roles?.length) return undefined;
  const byCode = roles.find((r) => parseRoleKey(r.code) === role);
  if (byCode) return byCode;
  const byId = roles.find((r) => r.id === ROLE_TO_USER_TYPE_ID[role]);
  if (byId) return byId;
  const wanted = LEGACY_NAME_HINTS[role].map(normalizeRoleName);
  return roles.find((r) => wanted.includes(normalizeRoleName(r.name ?? "")));
}
