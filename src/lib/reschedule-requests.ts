// منطق لوحة طلبات إعادة الجدولة للطالب (WP-S3 / S3-02) — نقي وقابل للاختبار.

import type { StudentRescheduleRequest } from "@/integrations/backend/student";
import { RescheduleStatus } from "./enums";

/** الأحدث إنشاءً أولًا (تواريخ فاسدة للآخر). لا يعدّل الأصل. */
export function sortRequestsNewestFirst(
  requests: StudentRescheduleRequest[],
): StudentRescheduleRequest[] {
  const time = (r: StudentRescheduleRequest) => {
    const t = new Date(r.createdOn).getTime();
    return Number.isNaN(t) ? Number.NEGATIVE_INFINITY : t;
  };
  return [...requests].sort((a, b) => time(b) - time(a));
}

/** سبب الرفض يُعرض فقط للطلب المرفوض وغير الفاضي. */
export function visibleRejectionReason(
  request: Pick<StudentRescheduleRequest, "status" | "rejectionReason">,
): string | null {
  if (request.status !== RescheduleStatus.Rejected) return null;
  return request.rejectionReason?.trim() || null;
}
