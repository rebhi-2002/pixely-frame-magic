// تحقق نافذة «تعديل بيانات الاجتماع» لدرس أونلاين (WP-T4 / T4-05) — نقي وقابل للاختبار.
// Lesson/ConfigureMeeting {lessonId, meetingPlatform (1..4), meetingUrl, meetingInstructions?}.
// الرابط http/https فقط (أمان: يرفض javascript: وغيره عبر isHttpUrl).

import { isHttpUrl } from "@/lib/format";
import { MeetingPlatform } from "@/lib/enums";

/** حد أعلى واجهي للتعليمات — افتراض (غير موثّق بالباك اند). */
export const MEETING_INSTRUCTIONS_MAX = 1000;

export interface MeetingFormValues {
  /** قيمة MeetingPlatform كنص ("" = غير مختار). */
  meetingPlatform: string;
  meetingUrl: string;
  meetingInstructions: string;
}

export type MeetingFormErrorCode =
  | "platform_required"
  | "url_required"
  | "url_invalid"
  | "instructions_too_long";

export type MeetingFormErrors = Partial<
  Record<"meetingPlatform" | "meetingUrl" | "meetingInstructions", MeetingFormErrorCode>
>;

export function emptyMeetingValues(): MeetingFormValues {
  return { meetingPlatform: "", meetingUrl: "", meetingInstructions: "" };
}

export function parsePlatform(text: string): MeetingPlatform | null {
  const trimmed = text.trim();
  if (!/^\d+$/.test(trimmed)) return null;
  const n = Number(trimmed);
  return n >= MeetingPlatform.Zoom && n <= MeetingPlatform.Other ? (n as MeetingPlatform) : null;
}

export function validateMeetingForm(values: MeetingFormValues): MeetingFormErrors {
  const errors: MeetingFormErrors = {};
  if (parsePlatform(values.meetingPlatform) === null) errors.meetingPlatform = "platform_required";
  const url = values.meetingUrl.trim();
  if (!url) errors.meetingUrl = "url_required";
  else if (!isHttpUrl(url)) errors.meetingUrl = "url_invalid";
  if (values.meetingInstructions.length > MEETING_INSTRUCTIONS_MAX) {
    errors.meetingInstructions = "instructions_too_long";
  }
  return errors;
}

export function hasMeetingErrors(errors: MeetingFormErrors): boolean {
  return Object.keys(errors).length > 0;
}

/** وسائط configureLessonMeeting بعد التحقق: الرابط مقصوص، والتعليمات الفاضية = null. */
export function toMeetingArgs(values: MeetingFormValues): {
  meetingPlatform: MeetingPlatform;
  meetingUrl: string;
  meetingInstructions: string | null;
} | null {
  const platform = parsePlatform(values.meetingPlatform);
  if (platform === null || hasMeetingErrors(validateMeetingForm(values))) return null;
  return {
    meetingPlatform: platform,
    meetingUrl: values.meetingUrl.trim(),
    meetingInstructions: values.meetingInstructions.trim() || null,
  };
}
