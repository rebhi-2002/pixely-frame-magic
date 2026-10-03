import { describe, expect, it } from "vitest";
import { DeliveryType } from "../../lib/enums";
import {
  LESSON_DURATION_MAX,
  LESSON_DURATION_MIN,
  canEditLesson,
  deriveLessonDay,
  emptyLessonValues,
  hasErrors,
  toLessonInput,
  validateLessonForm,
} from "./lesson-form-schema";

const valid = {
  ...emptyLessonValues(2),
  title: "الدرس الثاني",
  scheduledDate: "2026-10-06",
  startTime: "16:00",
};
const online = {
  ...valid,
  meetingPlatform: "1",
  meetingUrl: "https://zoom.us/j/123",
};

describe("validateLessonForm — حضوري", () => {
  it("نموذج صالح بلا أخطاء", () => {
    expect(hasErrors(validateLessonForm(valid, DeliveryType.InPerson))).toBe(false);
  });
  it("الموضوع والتاريخ والوقت مطلوبة", () => {
    const e = validateLessonForm(emptyLessonValues(), DeliveryType.InPerson);
    expect(e.title).toBe("title_required");
    expect(e.scheduledDate).toBe("date_invalid");
    expect(e.startTime).toBe("time_invalid");
  });
  it("المنصة والرابط لا يُطلبان للحضوري", () => {
    const e = validateLessonForm(valid, DeliveryType.InPerson);
    expect(e.meetingPlatform).toBeUndefined();
    expect(e.meetingUrl).toBeUndefined();
  });
});

describe("حدود المدة", () => {
  it("الحدّان مقبولان", () => {
    for (const d of [LESSON_DURATION_MIN, LESSON_DURATION_MAX]) {
      expect(
        validateLessonForm({ ...valid, durationMinutes: String(d) }, 1).durationMinutes,
      ).toBeUndefined();
    }
  });
  it("خارج الحدود أو غير رقمي مرفوض", () => {
    for (const d of ["0", "14", "481", "-5", "abc", "", "60.5", "1e2"]) {
      expect(validateLessonForm({ ...valid, durationMinutes: d }, 1).durationMinutes).toBe(
        "duration_range",
      );
    }
  });
  it("رقم الدرس ≥ 1", () => {
    expect(validateLessonForm({ ...valid, orderIndex: "0" }, 1).orderIndex).toBe("order_invalid");
    expect(validateLessonForm({ ...valid, orderIndex: "x" }, 1).orderIndex).toBe("order_invalid");
  });
});

describe("validateLessonForm — أونلاين / رابط http(s)", () => {
  it("صالح", () => {
    expect(hasErrors(validateLessonForm(online, DeliveryType.Online))).toBe(false);
  });
  it("المنصة والرابط مطلوبان", () => {
    const e = validateLessonForm(valid, DeliveryType.Online);
    expect(e.meetingPlatform).toBe("platform_required");
    expect(e.meetingUrl).toBe("url_required");
  });
  it("يرفض javascript: وdata: وروابط بلا بروتوكول", () => {
    for (const url of ["javascript:alert(1)", "data:text/html,x", "zoom.us/j/1", "ftp://x.com"]) {
      expect(validateLessonForm({ ...online, meetingUrl: url }, 2).meetingUrl).toBe("url_invalid");
    }
  });
  it("منصة خارج 1..4 مرفوضة", () => {
    expect(validateLessonForm({ ...online, meetingPlatform: "9" }, 2).meetingPlatform).toBe(
      "platform_required",
    );
  });
});

describe("deriveLessonDay", () => {
  it("اليوم من التاريخ دون انزياح", () => {
    expect(deriveLessonDay("2026-10-06", "en")).toBe("Tuesday");
    expect(deriveLessonDay("2026-10-06", "ar")).toContain("الثلاثاء");
  });
  it("تاريخ غير صالح = —", () => {
    expect(deriveLessonDay("nope")).toBe("—");
  });
});

describe("canEditLesson", () => {
  const NOW = new Date(2026, 9, 2, 12, 0, 0);
  it("درس قادم غير ملغى = نعم", () => {
    expect(canEditLesson({ scheduledDate: "2026-10-05", startTime: "10:00" }, NOW)).toBe(true);
  });
  it("بدأ أو انتهى = لا", () => {
    expect(canEditLesson({ scheduledDate: "2026-09-30", startTime: "10:00" }, NOW)).toBe(false);
  });
  it("ملغى = لا", () => {
    expect(
      canEditLesson({ scheduledDate: "2026-10-05", startTime: "10:00", cancelled: true }, NOW),
    ).toBe(false);
  });
  it("موعد غير معروف = نسمح (الباك اند يحسم)", () => {
    expect(canEditLesson({}, NOW)).toBe(true);
  });
});

describe("toLessonInput", () => {
  it("حضوري: القاعة تُرسل وحقول الاجتماع null", () => {
    const input = toLessonInput(
      { ...valid, room: " قاعة 3 " },
      { courseId: 1, groupId: 2 },
      DeliveryType.InPerson,
    );
    expect(input).toMatchObject({
      groupId: 2,
      courseId: 1,
      title: "الدرس الثاني",
      startTime: "16:00",
      durationMinutes: 60,
      orderIndex: 2,
      room: "قاعة 3",
      meetingPlatform: null,
      meetingUrl: null,
      meetingInstructions: null,
    });
    expect("id" in input).toBe(false);
  });
  it("أونلاين: المنصة والرابط يُرسلان والقاعة null", () => {
    const input = toLessonInput(
      { ...online, meetingInstructions: "  ادخل قبل 5 دقائق " },
      { courseId: 1, groupId: 2, lessonId: 9 },
      DeliveryType.Online,
    );
    expect(input).toMatchObject({
      id: 9,
      meetingPlatform: 1,
      meetingUrl: "https://zoom.us/j/123",
      meetingInstructions: "ادخل قبل 5 دقائق",
      room: null,
    });
  });
});
