import { describe, expect, it } from "vitest";
import type { StudentLessonDetail, StudentScheduleItemDto } from "@/integrations/backend/student";
import {
  isLessonCancelled,
  isOnlineLesson,
  lessonJoinHref,
  lessonLocationText,
  meetingInstructionsText,
  scheduleStatusLabel,
  scheduleStatusTone,
} from "@/lib/lesson-detail";

const bi = <T>(ar: T, _en: T) => ar;

const base: StudentScheduleItemDto = {
  kind: "Lesson",
  id: 1,
  lessonNumber: 1,
  topic: "t",
  courseTitle: null,
  teacherName: null,
  mode: 1,
  date: "2026-10-05T00:00:00",
  day: 1,
  startTime: "16:00:00",
  durationMinutes: 60,
  status: "Scheduled",
  room: "قاعة 3",
  meetingPlatform: null,
  meetingUrl: null,
  canJoin: false,
};

const detail = (
  lesson: Partial<StudentScheduleItemDto> = {},
  over: Partial<StudentLessonDetail> = {},
): StudentLessonDetail => ({
  lesson: { ...base, ...lesson },
  groupName: null,
  meetingInstructions: null,
  locationAvailable: true,
  cancellationReason: null,
  ...over,
});

describe("lessonLocationText", () => {
  it("حضوري بقاعة", () => {
    expect(lessonLocationText(detail(), bi)).toBe("قاعة 3");
  });
  it("حضوري + locationAvailable=false = الموقع غير متوفر حتى مع وجود room", () => {
    expect(lessonLocationText(detail({}, { locationAvailable: false }), bi)).toBe(
      "الموقع غير متوفر",
    );
  });
  it("أونلاين = اسم المنصة", () => {
    expect(lessonLocationText(detail({ mode: 2, room: null, meetingPlatform: 1 }), bi)).toBe(
      "Zoom",
    );
  });
});

describe("lessonJoinHref", () => {
  it("يتطلب canJoin ورابطًا آمنًا", () => {
    const online = { mode: 2 as const, meetingUrl: "https://zoom.us/j/1" };
    expect(lessonJoinHref(detail({ ...online, canJoin: true }))).toBe("https://zoom.us/j/1");
    expect(lessonJoinHref(detail({ ...online, canJoin: false }))).toBeNull();
    expect(
      lessonJoinHref(detail({ mode: 2, meetingUrl: "javascript:alert(1)", canJoin: true })),
    ).toBeNull();
  });
});

describe("isLessonCancelled / meetingInstructionsText / isOnlineLesson", () => {
  it("إلغاء", () => {
    expect(isLessonCancelled({ cancellationReason: "مرض المعلم" })).toBe(true);
    expect(isLessonCancelled({ cancellationReason: "   " })).toBe(false);
    expect(isLessonCancelled({ cancellationReason: null })).toBe(false);
  });
  it("تعليمات", () => {
    expect(meetingInstructionsText({ meetingInstructions: "  ادخل مبكرًا " })).toBe("ادخل مبكرًا");
    expect(meetingInstructionsText({ meetingInstructions: "" })).toBeNull();
  });
  it("أونلاين", () => {
    expect(isOnlineLesson(detail({ mode: 2 }))).toBe(true);
    expect(isOnlineLesson(detail())).toBe(false);
  });
});

describe("isLessonCancelled بالحالة النصية", () => {
  it("status = Cancelled يكفي حتى بلا سبب", () => {
    expect(isLessonCancelled(detail({ status: "Cancelled" }))).toBe(true);
    expect(isLessonCancelled(detail({ status: "Scheduled" }))).toBe(false);
  });
});

describe("scheduleStatusLabel / scheduleStatusTone", () => {
  it("حالات الدروس والحجوزات", () => {
    expect(scheduleStatusLabel("Scheduled", bi)).toBe("مجدول");
    expect(scheduleStatusLabel("Completed", bi)).toBe("مكتمل");
    expect(scheduleStatusLabel("Cancelled", bi)).toBe("ملغى");
    expect(scheduleStatusLabel("Confirmed", bi)).toBe("مؤكّد");
    expect(scheduleStatusTone("Cancelled")).toBe("danger");
    expect(scheduleStatusTone("Completed")).toBe("success");
    expect(scheduleStatusTone("Scheduled")).toBe("primary");
  });
  it("غير المعروف يُعرض كما هو والفاضي —", () => {
    expect(scheduleStatusLabel("Weird", bi)).toBe("Weird");
    expect(scheduleStatusLabel("", bi)).toBe("—");
    expect(scheduleStatusLabel(null, bi)).toBe("—");
    expect(scheduleStatusTone("Weird")).toBe("muted");
  });
});
