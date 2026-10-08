import { describe, expect, it } from "vitest";
import { groupDaysSummary, orderGroupDays } from "@/lib/course-detail";

const bi = <T>(ar: T, _en: T) => ar;

describe("orderGroupDays", () => {
  it("السبت أولًا ثم الأحد…، ثم الوقت، ويحذف الأيام غير الصالحة", () => {
    const out = orderGroupDays([
      { day: 1, startTime: "17:00:00" },
      { day: 6, startTime: "16:00:00" },
      { day: 1, startTime: "09:00:00" },
      { day: 9, startTime: "10:00:00" },
      { day: 0, startTime: "10:00:00" },
    ]);
    expect(out.map((d) => `${d.day}@${d.startTime}`)).toEqual([
      "6@16:00:00",
      "0@10:00:00",
      "1@09:00:00",
      "1@17:00:00",
    ]);
  });
});

describe("groupDaysSummary", () => {
  it("نص مختصر", () => {
    expect(
      groupDaysSummary(
        [
          { day: 1, startTime: "16:00:00" },
          { day: 6, startTime: "16:00:00" },
        ],
        bi,
      ),
    ).toBe("السبت 16:00 · الاثنين 16:00");
  });
  it("فاضي لو لا أيام", () => {
    expect(groupDaysSummary([], bi)).toBe("");
  });
});
