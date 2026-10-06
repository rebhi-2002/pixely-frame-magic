import { describe, expect, it } from "vitest";
import {
  emptyGroupScheduleValues,
  issuesFor,
  newDayRow,
  toGroupScheduleInput,
  validateGroupScheduleForm,
  type GroupScheduleFormValues,
} from "@/components/teacher/group-schedule-form";
import {
  isGroupScheduleValid,
  validateGroupSchedule,
} from "@/components/teacher/group-schedule-validation";

const valid: GroupScheduleFormValues = {
  maxStudents: "12",
  courseStartDate: "2026-11-01",
  courseEndDate: "2027-01-31",
  defaultLessonDurationMinutes: "90",
  days: [
    { key: "a", dayOfWeek: "1", startTime: "16:00" },
    { key: "b", dayOfWeek: "3", startTime: "18:30" },
  ],
};

describe("validateGroupSchedule (T2-03)", () => {
  const base = {
    courseStartDate: "2026-11-01",
    courseEndDate: "2027-01-31",
    defaultLessonDurationMinutes: 60,
    maxStudents: 10,
    scheduleDays: [{ dayOfWeek: 1 as const, startTime: "16:00" }],
  };
  it("صالح", () => {
    expect(isGroupScheduleValid(base)).toBe(true);
  });
  it("نهاية قبل البداية", () => {
    expect(
      validateGroupSchedule({ ...base, courseEndDate: "2026-10-01" }).map((i) => i.code),
    ).toContain("end_before_start");
  });
  it("بداية ونهاية بنفس اليوم مقبولة", () => {
    expect(isGroupScheduleValid({ ...base, courseEndDate: "2026-11-01" })).toBe(true);
  });
  it("مدة وسعة غير صالحتين", () => {
    const codes = validateGroupSchedule({
      ...base,
      defaultLessonDurationMinutes: 0,
      maxStudents: 0,
    }).map((i) => i.code);
    expect(codes).toContain("duration_invalid");
    expect(codes).toContain("capacity_invalid");
  });
  it("لا أيام", () => {
    expect(validateGroupSchedule({ ...base, scheduleDays: [] }).map((i) => i.code)).toEqual([
      "days_required",
    ]);
  });
  it("يوم مكرر ووقت غير صالح", () => {
    const issues = validateGroupSchedule({
      ...base,
      scheduleDays: [
        { dayOfWeek: 1, startTime: "16:00" },
        { dayOfWeek: 1, startTime: "99:99" },
      ],
    });
    expect(issues).toContainEqual({ code: "day_duplicate", dayIndex: 1 });
    expect(issues).toContainEqual({ code: "time_invalid", dayIndex: 1 });
  });
});

describe("toGroupScheduleInput (T2-01/02)", () => {
  it("يبني جسم الطلب بأنواع رقمية", () => {
    expect(toGroupScheduleInput(7, valid)).toEqual({
      groupId: 7,
      maxStudents: 12,
      courseStartDate: "2026-11-01",
      courseEndDate: "2027-01-31",
      defaultLessonDurationMinutes: 90,
      scheduleDays: [
        { dayOfWeek: 1, startTime: "16:00" },
        { dayOfWeek: 3, startTime: "18:30" },
      ],
    });
  });
  it("قيم غير مفهومة تبقى غير صالحة (لا تُحوَّل لـ0)", () => {
    const input = toGroupScheduleInput(7, {
      ...valid,
      maxStudents: "abc",
      days: [{ key: "x", dayOfWeek: "", startTime: "" }],
    });
    expect(Number.isNaN(input.maxStudents)).toBe(true);
    expect(input.scheduleDays[0].dayOfWeek).toBe(-1);
  });
  it("يرفض يوم الأسبوع خارج 0..6", () => {
    expect(
      toGroupScheduleInput(1, {
        ...valid,
        days: [{ key: "x", dayOfWeek: "7", startTime: "10:00" }],
      }).scheduleDays[0].dayOfWeek,
    ).toBe(-1);
  });
});

describe("validateGroupScheduleForm", () => {
  it("نموذج صالح", () => {
    expect(validateGroupScheduleForm(valid)).toEqual([]);
  });
  it("النموذج الفاضي غير صالح (تواريخ وسعة ويوم)", () => {
    const codes = validateGroupScheduleForm(emptyGroupScheduleValues()).map((i) => i.code);
    expect(codes).toContain("start_date_invalid");
    expect(codes).toContain("end_date_invalid");
    expect(codes).toContain("capacity_invalid");
    expect(codes).toContain("day_invalid");
    expect(codes).toContain("time_invalid");
    expect(codes).not.toContain("duration_invalid");
  });
  it("المدة الافتراضية 60", () => {
    expect(emptyGroupScheduleValues().defaultLessonDurationMinutes).toBe("60");
  });
});

describe("issuesFor / newDayRow", () => {
  it("يفلتر بالكود والصف", () => {
    const issues = [
      { code: "day_duplicate" as const, dayIndex: 1 },
      { code: "time_invalid" as const, dayIndex: 0 },
      { code: "capacity_invalid" as const },
    ];
    expect(issuesFor(issues, ["capacity_invalid"])).toHaveLength(1);
    expect(issuesFor(issues, ["day_duplicate", "time_invalid"], 1)).toEqual([
      { code: "day_duplicate", dayIndex: 1 },
    ]);
    expect(issuesFor(issues, ["time_invalid"], 1)).toEqual([]);
  });
  it("مفاتيح الصفوف فريدة", () => {
    expect(newDayRow().key).not.toBe(newDayRow().key);
  });
});
