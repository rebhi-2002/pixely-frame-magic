import { describe, expect, it } from "vitest";
import type { StudentAttendance, StudentAttendanceRow } from "@/integrations/backend/student";
import {
  attendanceCounters,
  attendanceRateText,
  hasAttendanceData,
  isRangeInverted,
  rangeToFilter,
  sortRecordsNewestFirst,
} from "@/lib/attendance-view";

const bi = <T>(ar: T, _en: T) => ar;

const empty: StudentAttendance = {
  attendanceRatePercent: null,
  totalSessions: 0,
  present: 0,
  absent: 0,
  late: 0,
  excused: 0,
  records: [],
};

const row = (sessionDate: string): StudentAttendanceRow => ({
  sessionDate,
  groupName: "g",
  courseTitle: "c",
  status: 1,
  notes: null,
});

describe("isRangeInverted", () => {
  it("البداية بعد النهاية = مقلوب", () => {
    expect(isRangeInverted({ from: "2026-10-10", to: "2026-10-01" })).toBe(true);
  });
  it("سليم أو ناقص = غير مقلوب", () => {
    expect(isRangeInverted({ from: "2026-10-01", to: "2026-10-10" })).toBe(false);
    expect(isRangeInverted({ from: "2026-10-01", to: "2026-10-01" })).toBe(false);
    expect(isRangeInverted({ from: "", to: "2026-10-01" })).toBe(false);
    expect(isRangeInverted({ from: "2026-10-01", to: "" })).toBe(false);
  });
});

describe("rangeToFilter", () => {
  it("يرسل التاريخين كما هما ويتجاهل الفاضي/الفاسد", () => {
    expect(rangeToFilter({ from: "2026-10-01", to: "2026-10-05" })).toEqual({
      from: "2026-10-01",
      to: "2026-10-05",
    });
    expect(rangeToFilter({ from: "", to: "" })).toEqual({});
    expect(rangeToFilter({ from: "garbage", to: "2026-10-05" })).toEqual({
      to: "2026-10-05",
    });
  });
});

describe("sortRecordsNewestFirst", () => {
  it("الأحدث أولًا والتواريخ الفاسدة للآخر دون تعديل الأصل", () => {
    const input = [row("2026-10-01"), row("bad"), row("2026-10-05")];
    const out = sortRecordsNewestFirst(input);
    expect(out.map((r) => r.sessionDate)).toEqual(["2026-10-05", "2026-10-01", "bad"]);
    expect(input[0]!.sessionDate).toBe("2026-10-01");
  });
});

describe("attendanceCounters", () => {
  it("يعكس أرقام الباك اند بتسميات الحالات", () => {
    const items = attendanceCounters({ ...empty, present: 5, absent: 1, late: 2, excused: 3 }, bi);
    expect(items.map((i) => [i.key, i.label, i.count])).toEqual([
      ["present", "حاضر", 5],
      ["absent", "غائب", 1],
      ["late", "متأخر", 2],
      ["excused", "معذور", 3],
    ]);
  });
});

describe("attendanceRateText / hasAttendanceData", () => {
  it("نص النسبة", () => {
    expect(attendanceRateText(85)).toBe("85%");
    expect(attendanceRateText(66.666)).toBe("66.7%");
    expect(attendanceRateText(0)).toBe("0%");
    expect(attendanceRateText(null)).toBe("—");
    expect(attendanceRateText(Number.NaN)).toBe("—");
  });
  it("وجود بيانات", () => {
    expect(hasAttendanceData(empty)).toBe(false);
    expect(hasAttendanceData({ ...empty, totalSessions: 3 })).toBe(true);
    expect(hasAttendanceData({ ...empty, records: [row("2026-10-01")] })).toBe(true);
  });
});
