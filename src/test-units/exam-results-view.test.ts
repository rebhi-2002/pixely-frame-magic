import { describe, expect, it } from "vitest";
import type { StudentExamResultRow } from "@/integrations/backend/student";
import {
  percentTone,
  resolveExamPercent,
  scoreText,
  sortExamsNewestFirst,
} from "@/lib/exam-results";

const exam = (over: Partial<StudentExamResultRow> = {}): StudentExamResultRow => ({
  examId: 1,
  examTitle: "t",
  examDate: "2026-10-01",
  courseTitle: null,
  scoreObtained: 17,
  totalMarks: 20,
  percentage: null,
  feedback: null,
  ...over,
});

describe("resolveExamPercent", () => {
  it("يفضّل percentage القادمة من الباك اند", () => {
    expect(resolveExamPercent(exam({ percentage: 90 }))).toBe(90);
  });
  it("يحسب من الدرجة/المجموع لو percentage ناقصة", () => {
    expect(resolveExamPercent(exam())).toBe(85);
  });
  it("null لو المجموع صفر", () => {
    expect(resolveExamPercent(exam({ totalMarks: 0 }))).toBeNull();
  });
});

describe("sortExamsNewestFirst", () => {
  it("الأحدث أولًا", () => {
    const out = sortExamsNewestFirst([
      exam({ examId: 1, examDate: "2026-09-01" }),
      exam({ examId: 2, examDate: "2026-10-01" }),
      exam({ examId: 3, examDate: "bad" }),
    ]);
    expect(out.map((e) => e.examId)).toEqual([2, 1, 3]);
  });
});

describe("scoreText / percentTone", () => {
  it("نص الدرجة", () => {
    expect(scoreText({ scoreObtained: 17, totalMarks: 20 })).toBe("17 / 20");
    expect(scoreText({ scoreObtained: Number.NaN, totalMarks: 20 })).toBe("—");
  });
  it("نغمات النسبة", () => {
    expect(percentTone(null)).toBe("muted");
    expect(percentTone(85)).toBe("success");
    expect(percentTone(70)).toBe("success");
    expect(percentTone(55)).toBe("primary");
    expect(percentTone(20)).toBe("danger");
  });
});
