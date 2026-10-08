// تحويل معامل المسار ($id) إلى رقم صحيح موجب. نقي وقابل للاختبار.
// أي نص غير رقمي صرف (مثل "12abc" أو "1.5" أو "-3" أو "") = null → الصفحة تعرض «غير موجود» بدل طلب خاطئ للباك اند.

export function parsePositiveInt(raw: string | null | undefined): number | null {
  if (typeof raw !== "string" || !/^\d+$/.test(raw.trim())) return null;
  const value = Number(raw.trim());
  return Number.isSafeInteger(value) && value > 0 ? value : null;
}
