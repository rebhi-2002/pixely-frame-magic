import { describe, expect, it } from "vitest";
import type { LessonRow } from "@/integrations/backend/lessons";
import {
  lessonDateOnly,
  lessonHasStarted,
  lessonRowActions,
  platformOrRoomText,
  sortCoursesForTeacher,
  sortLessonsBySchedule,
  suggestNextOrderIndex,
} from "@/lib/teacher-courses";
import { courseStatusLabel, courseStatusTone } from "@/lib/enums";
import { resolveCourseDeliveryType } from "@/components/teacher/course-seams";
import {
  emptyLessonValues,
  lessonRowToValues,
  toLessonInput,
  validateLessonForm,
} from "@/components/teacher/lesson-form-schema";

const bi = <T>(ar: T, _en: T) => ar;
const NOW = new Date("2026-10-07T10:00:00");

const lesson = (over: Partial<LessonRow>): LessonRow => ({
  lessonId: 1,
  courseType: 1,
  topic: "t",
  date: "2026-10-10T00:00:00",
  day: 6,
  startTime: "16:00:00",
  durationMinutes: 60,
  platformOrRoom: "",
  ...over,
});

describe("sortCoursesForTeacher", () => {
  it("منشور ثم مسودة ثم مؤرشف، والأحدث أولًا داخل كل حالة", () => {
    const out = sortCoursesForTeacher([
      { id: 1, status: 3 },
      { id: 2, status: 1 },
      { id: 3, status: 2 },
      { id: 4, status: 2 },
    ]);
    expect(out.map((c) => c.id)).toEqual([4, 3, 2, 1]);
  });
});

describe("حالة الكورس", () => {
  it("تسميات ونغمات", () => {
    expect(courseStatusLabel(1, bi)).toBe("مسودة");
    expect(courseStatusLabel(2, bi)).toBe("منشور");
    expect(courseStatusLabel(3, bi)).toBe("مؤرشف");
    expect(courseStatusLabel(9, bi)).toBe("—");
    expect(courseStatusTone(2)).toBe("success");
    expect(courseStatusTone(1)).toBe("primary");
    expect(courseStatusTone(3)).toBe("muted");
  });
});

describe("lessonDateOnly", () => {
  it("يقصّ ISO لتاريخ فقط", () => {
    expect(lessonDateOnly("2026-10-05T00:00:00")).toBe("2026-10-05");
    expect(lessonDateOnly("bad")).toBe("");
    expect(lessonDateOnly(null)).toBe("");
  });
});

describe("جدول الدروس", () => {
  it("الأقدم أولًا والفاسد للآخر دون تعديل الأصل", () => {
    const input = [
      lesson({ lessonId: 1, date: "2026-10-12T00:00:00" }),
      lesson({ lessonId: 2, date: "2026-10-09T00:00:00" }),
      lesson({ lessonId: 3, date: "bad" }),
    ];
    expect(sortLessonsBySchedule(input).map((r) => r.lessonId)).toEqual([2, 1, 3]);
    expect(input[0]!.lessonId).toBe(1);
  });
  it("اقتراح رقم الدرس التالي", () => {
    expect(suggestNextOrderIndex([])).toBe(1);
    expect(suggestNextOrderIndex([lesson({}), lesson({})])).toBe(3);
  });
  it("هل بدأ الدرس", () => {
    expect(
      lessonHasStarted(lesson({ date: "2026-10-07T00:00:00", startTime: "09:00:00" }), NOW),
    ).toBe(true);
    expect(lessonHasStarted(lesson({}), NOW)).toBe(false);
    expect(lessonHasStarted(lesson({ date: "bad" }), NOW)).toBe(false);
  });
  it("إجراءات الصف: الإلغاء لما لم يبدأ، الاجتماع للأونلاين فقط", () => {
    expect(lessonRowActions(lesson({}), 2, NOW)).toEqual({
      edit: true,
      cancel: true,
      meeting: true,
    });
    expect(lessonRowActions(lesson({}), 1, NOW)).toEqual({
      edit: true,
      cancel: true,
      meeting: false,
    });
    expect(lessonRowActions(lesson({}), null, NOW)).toEqual({
      edit: true,
      cancel: true,
      meeting: false,
    });
    const started = lesson({ date: "2026-10-01T00:00:00" });
    expect(lessonRowActions(started, 2, NOW)).toEqual({
      edit: false,
      cancel: false,
      meeting: false,
    });
  });
});

describe("resolveCourseDeliveryType", () => {
  const course = (deliveryType: number) =>
    ({ id: 1, deliveryType }) as unknown as Parameters<typeof resolveCourseDeliveryType>[0];
  it("من DTO الباك اند", () => {
    expect(resolveCourseDeliveryType(course(1))).toBe(1);
    expect(resolveCourseDeliveryType(course(2))).toBe(2);
    expect(resolveCourseDeliveryType(course(7))).toBeNull();
    expect(resolveCourseDeliveryType(null)).toBeNull();
  });
});

describe("toLessonInput بدون groupId (Q-02b)", () => {
  const values = {
    ...emptyLessonValues(2),
    title: " درس ",
    scheduledDate: "2026-10-10",
    startTime: "16:00",
  };
  it("لا يرسل groupId لو غير معروف", () => {
    const input = toLessonInput(values, { courseId: 5 }, 1);
    expect("groupId" in input).toBe(false);
    expect(input.courseId).toBe(5);
    expect(input.title).toBe("درس");
  });
  it("يرسله لو معروف", () => {
    expect(toLessonInput(values, { courseId: 5, groupId: 8 }, 1).groupId).toBe(8);
  });
});

describe("platformOrRoomText", () => {
  it("أونلاين: اسم المنصة فقط من «المنصة — الرابط»", () => {
    expect(platformOrRoomText("Zoom — https://zoom.us/j/1", 2)).toBe("Zoom");
    expect(platformOrRoomText(" — ", 2)).toBe("—");
    expect(platformOrRoomText(null, 2)).toBe("—");
  });
  it("حضوري: القاعة كما هي أو —", () => {
    expect(platformOrRoomText("قاعة 3", 1)).toBe("قاعة 3");
    expect(platformOrRoomText("—", 1)).toBe("—");
    expect(platformOrRoomText("", 1)).toBe("—");
  });
});

describe("lessonRowToValues (تعديل درس)", () => {
  it("يحوّل صف الجدول لقيم النموذج", () => {
    const v = lessonRowToValues(
      lesson({
        topic: "درس",
        date: "2026-10-10T00:00:00",
        startTime: "16:30:00",
        durationMinutes: 90,
      }),
      4,
    );
    expect(v).toMatchObject({
      title: "درس",
      scheduledDate: "2026-10-10",
      startTime: "16:30",
      durationMinutes: "90",
      orderIndex: "4",
      meetingPlatform: "",
      meetingUrl: "",
    });
  });
  it("قيم غير صالحة → فارغ/افتراضي", () => {
    const v = lessonRowToValues(lesson({ date: "bad", startTime: "x", durationMinutes: 0 }), 1);
    expect(v.scheduledDate).toBe("");
    expect(v.startTime).toBe("");
    expect(v.durationMinutes).toBe("60");
  });
});

describe("تحقق نموذج الدرس: العنوان والتعديل", () => {
  const ok = {
    ...emptyLessonValues(1),
    title: "درس",
    scheduledDate: "2026-10-10",
    startTime: "16:00",
  };
  it("العنوان 3 أحرف كحد أدنى و250 كحد أقصى", () => {
    expect(validateLessonForm({ ...ok, title: "اب" }, 1).title).toBe("title_length");
    expect(validateLessonForm({ ...ok, title: "x".repeat(251) }, 1).title).toBe("title_length");
    expect(validateLessonForm({ ...ok, title: "   " }, 1).title).toBe("title_required");
    expect(validateLessonForm(ok, 1).title).toBeUndefined();
  });
  it("أونلاين عند التعديل: فارغان معًا = إبقاء الاجتماع الحالي", () => {
    expect(validateLessonForm(ok, 2, { editing: true }).meetingUrl).toBeUndefined();
    expect(validateLessonForm(ok, 2, { editing: true }).meetingPlatform).toBeUndefined();
    expect(validateLessonForm(ok, 2).meetingUrl).toBe("url_required");
  });
  it("أونلاين عند التعديل: لو كُتب الرابط يُتحقق منه", () => {
    const e = validateLessonForm({ ...ok, meetingUrl: "zoom.us" }, 2, { editing: true });
    expect(e.meetingUrl).toBe("url_invalid");
    expect(e.meetingPlatform).toBe("platform_required");
  });
  it("رابط الاجتماع الفاضي يُرسل null لا نصًا فارغًا", () => {
    const input = toLessonInput(ok, { courseId: 5, lessonId: 9 }, 2);
    expect(input.meetingUrl).toBeNull();
  });
});
