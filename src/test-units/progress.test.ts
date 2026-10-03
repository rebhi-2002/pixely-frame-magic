import { describe, expect, it } from "vitest";
import {
  buildProgressView,
  normalizeCount,
  normalizePercent,
  percentText,
  toMetric,
} from "../lib/progress";

describe("normalizePercent", () => {
  it("يقرّب ويقبل 0 و100", () => {
    expect(normalizePercent(0)).toBe(0);
    expect(normalizePercent(100)).toBe(100);
    expect(normalizePercent(84.6)).toBe(85);
  });
  it("القيم الناقصة/غير الصالحة = null (لا صفر مخترع)", () => {
    expect(normalizePercent(null)).toBeNull();
    expect(normalizePercent(undefined)).toBeNull();
    expect(normalizePercent(Number.NaN)).toBeNull();
    expect(normalizePercent("80")).toBeNull();
    expect(normalizePercent(-5)).toBeNull();
    expect(normalizePercent(140)).toBeNull();
  });
});

describe("normalizeCount", () => {
  it("عدّاد صحيح غير سالب", () => {
    expect(normalizeCount(7)).toBe(7);
    expect(normalizeCount(7.9)).toBe(7);
    expect(normalizeCount(null)).toBe(0);
    expect(normalizeCount(-2)).toBe(0);
  });
});

describe("toMetric / percentText", () => {
  it("صفر حقيقي يبقى صفرًا ويُعرض 0%", () => {
    const m = toMetric(0, 4);
    expect(m.state).toBe("value");
    expect(percentText(m)).toBe("0%");
  });
  it("null = غير متاح ويُعرض —", () => {
    const m = toMetric(null, 0);
    expect(m.state).toBe("unavailable");
    expect(percentText(m)).toBe("—");
  });
});

describe("buildProgressView", () => {
  it("رد كامل", () => {
    const v = buildProgressView({
      attendanceRatePercent: 90,
      averageExamScorePercent: 76.4,
      attendanceSessions: 10,
      examsTaken: 3,
    });
    expect(v.isEmpty).toBe(false);
    expect(v.attendance.percent).toBe(90);
    expect(v.exams.percent).toBe(76);
    expect(v.exams.samples).toBe(3);
  });
  it("لا بيانات أبدًا = فراغ", () => {
    const v = buildProgressView({
      attendanceRatePercent: null,
      averageExamScorePercent: null,
      attendanceSessions: 0,
      examsTaken: 0,
    });
    expect(v.isEmpty).toBe(true);
  });
  it("حضور فقط: ليس فراغًا والامتحانات غير متاحة", () => {
    const v = buildProgressView({
      attendanceRatePercent: 80,
      averageExamScorePercent: null,
      attendanceSessions: 5,
      examsTaken: 0,
    });
    expect(v.isEmpty).toBe(false);
    expect(v.exams.state).toBe("unavailable");
  });
  it("رد null/ناقص لا يكسر", () => {
    expect(() => buildProgressView(null)).not.toThrow();
    expect(buildProgressView(undefined).isEmpty).toBe(true);
    expect(buildProgressView({}).attendance.state).toBe("unavailable");
  });
});
