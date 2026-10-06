// وصف فشل التحميل بشكل مفهوم + رمز الاستجابة (للتشخيص بدون DevTools). نقي (duck typing — ما بيستورد client.ts).
// الهدف: لما صفحة تعرض «ما قدرنا نحمّل…» يظهر تحتها السبب الأرجح (صلاحية/خادم/شبكة) والرمز.
// ⚠️ التفسير تلميح فقط؛ المرجع الحقيقي رد الباك اند.

import type { Bi } from "@/lib/enums";

/** رمز HTTP من ApiError، أو null لو الخطأ ليس استجابة (شبكة/غير معروف). */
export function errorStatus(error: unknown): number | null {
  if (!error || typeof error !== "object") return null;
  const status = (error as { status?: unknown }).status;
  return typeof status === "number" && Number.isFinite(status) ? status : null;
}

/** سطر تشخيصي قصير. فاضي لو ما في معلومة مفيدة. */
export function loadErrorDetail(error: unknown, bi: Bi): string {
  const status = errorStatus(error);
  if (status === null) return "";
  if (status === 0) {
    return bi(
      "تعذّر الوصول للخادم (شبكة أو عنوان الخادم).",
      "Couldn't reach the server (network or server address).",
    );
  }
  if (status === 401) {
    return bi(
      "رمز 401: انتهت الجلسة أو لم تسجّل الدخول — سجّل الدخول من جديد.",
      "Code 401: your session expired or you're signed out — sign in again.",
    );
  }
  if (status === 403) {
    return bi(
      "رمز 403: هذا الحساب غير مصرّح له بهذه البيانات (قد لا يكون مربوطًا بملف طالب/معلم).",
      "Code 403: this account isn't allowed to access this data (it may not be linked to a student/teacher profile).",
    );
  }
  if (status === 404) {
    return bi("رمز 404: العنوان أو البيانات غير موجودة.", "Code 404: the address or data wasn't found.");
  }
  if (status >= 500) {
    return bi(
      `رمز ${status}: خطأ من الخادم (ليس من الواجهة) — أبلغ فريق الباك اند.`,
      `Code ${status}: a server error (not the UI) — report it to the backend team.`,
    );
  }
  return bi(`رمز الاستجابة: ${status}.`, `Response code: ${status}.`);
}

/** يدمج الوصف الأساسي مع السطر التشخيصي. */
export function withLoadErrorDetail(base: string, error: unknown, bi: Bi): string {
  const detail = loadErrorDetail(error, bi);
  return detail ? `${base} ${detail}` : base;
}
