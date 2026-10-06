// تحديد دور المستخدم من الخادم نفسه عند غياب أي مصدر مباشر (احتياط أخير).
//
// المشكلة: MyProfileModal ما بيرجّع نوع المستخدم، وCreateEditModal للأدمن فقط (403 لغيره).
// فالأدمن بيتعرّف دوره من أي جهاز، أما الطالب/المعلم/ولي الأمر فكان دورهم بيضلّ مجهولًا إلا
// بنفس المتصفح (ذاكرة الجهاز). سجل الأخطاء بيثبت إن endpoints كل دور بترفض غيره (مثلاً
// Student/Dashboard → 403 لحساب مش طالب)، فنستعمل ذلك كدليل.
//
// قاعدة صارمة ضد التخمين: بنجرّب endpoints الأدوار الثلاثة بالتوازي، ولا نقرّر إلا لو
// «وصل» دور واحد بالضبط والباقي مرفوض (401/403) — أي غموض (دوران وصلوا، أو فشل شبكة، أو
// ما وصل أي دور) = null ولا نخمّن. «وصل» = نجح (2xx) أو انرفض لسبب داخلي (5xx) بعد ما
// عدّى فحص الصلاحية (الدليل: TeacherBookings بيرجّع 500 لحساب معلم، و403 لغيره).
//
// ⚠️ حل مؤقت: الحل الأصح أن يرجّع الباك اند userTypeId/userTypeCode في MyProfileModal.

import { ApiError, apiClient } from "./client";
import type { RoleKey } from "@/lib/bi";

export type ProbeOutcome = "reached" | "denied" | "unknown";
type ProbedRole = Exclude<RoleKey, "admin">;
export type ProbeResults = Record<ProbedRole, ProbeOutcome>;

/** endpoints القراءة فقط (GET) المخصصة لكل دور. */
export const ROLE_PROBE_PATHS: Readonly<Record<ProbedRole, string>> = {
  student: "/api/Student/Dashboard",
  parent: "/api/Parent/MyChildren",
  teacher: "/api/Booking/TeacherBookings?status=1",
};

/** نجاح = وصل؛ 401/403 = مرفوض؛ 5xx = وصل (فشل داخلي بعد الصلاحية)؛ غير ذلك = مجهول. */
export function classifyProbeError(err: unknown): ProbeOutcome {
  if (!(err instanceof ApiError)) return "unknown";
  if (err.status === 401 || err.status === 403) return "denied";
  if (err.status >= 500) return "reached";
  return "unknown";
}

/** يقرّر الدور فقط لو وصل دور واحد بالضبط ولا يوجد أي نتيجة مجهولة. */
export function decideRoleFromProbes(results: ProbeResults): ProbedRole | null {
  const roles = Object.keys(results) as ProbedRole[];
  if (roles.some((r) => results[r] === "unknown")) return null;
  const reached = roles.filter((r) => results[r] === "reached");
  return reached.length === 1 ? reached[0] : null;
}

type ProbeFetcher = (path: string) => Promise<unknown>;
const defaultFetcher: ProbeFetcher = (path) => apiClient.get<unknown>(path);

async function probeOne(path: string, fetcher: ProbeFetcher): Promise<ProbeOutcome> {
  try {
    await fetcher(path);
    return "reached";
  } catch (err) {
    return classifyProbeError(err);
  }
}

const inFlight = new Map<string, Promise<ProbedRole | null>>();

/**
 * يجرّب الأدوار الثلاثة ويرجّع الدور أو null. نتيجة كل مستخدم تُحسب مرة واحدة بالجلسة
 * الحالية (حتى لو نُدي أكثر من مرة) كي ما تتكرر الطلبات.
 */
export function probeRole(
  userId: string,
  /** للاختبار: دالة جلب بديلة (الافتراضي apiClient.get). */
  fetcher: ProbeFetcher = defaultFetcher,
): Promise<ProbedRole | null> {
  const existing = inFlight.get(userId);
  if (existing) return existing;
  const task = (async () => {
    const [student, parent, teacher] = await Promise.all([
      probeOne(ROLE_PROBE_PATHS.student, fetcher),
      probeOne(ROLE_PROBE_PATHS.parent, fetcher),
      probeOne(ROLE_PROBE_PATHS.teacher, fetcher),
    ]);
    return decideRoleFromProbes({ student, parent, teacher });
  })();
  inFlight.set(userId, task);
  return task;
}
