import { describe, expect, it } from "vitest";
import {
  MEETING_INSTRUCTIONS_MAX,
  emptyMeetingValues,
  hasMeetingErrors,
  parsePlatform,
  toMeetingArgs,
  validateMeetingForm,
} from "@/components/teacher/meeting-config-schema";

const valid = { meetingPlatform: "1", meetingUrl: "https://zoom.us/j/123", meetingInstructions: "" };

describe("validateMeetingForm", () => {
  it("صالح", () => {
    expect(hasMeetingErrors(validateMeetingForm(valid))).toBe(false);
  });
  it("الفاضي: منصة ورابط مطلوبان", () => {
    const errors = validateMeetingForm(emptyMeetingValues());
    expect(errors.meetingPlatform).toBe("platform_required");
    expect(errors.meetingUrl).toBe("url_required");
  });
  it("منصة خارج 1..4", () => {
    expect(validateMeetingForm({ ...valid, meetingPlatform: "0" }).meetingPlatform).toBe("platform_required");
    expect(validateMeetingForm({ ...valid, meetingPlatform: "5" }).meetingPlatform).toBe("platform_required");
    expect(validateMeetingForm({ ...valid, meetingPlatform: "4" }).meetingPlatform).toBeUndefined();
  });
  it("يرفض الروابط الخطرة وغير http(s)", () => {
    for (const bad of ["javascript:alert(1)", "data:text/html,x", "ftp://x.com", "zoom.us/j/1", "not a url"]) {
      expect(validateMeetingForm({ ...valid, meetingUrl: bad }).meetingUrl).toBe("url_invalid");
    }
  });
  it("تعليمات طويلة", () => {
    expect(
      validateMeetingForm({ ...valid, meetingInstructions: "x".repeat(MEETING_INSTRUCTIONS_MAX + 1) })
        .meetingInstructions,
    ).toBe("instructions_too_long");
  });
});

describe("parsePlatform", () => {
  it("يحوّل النص لقيمة المنصة", () => {
    expect(parsePlatform("2")).toBe(2);
    expect(parsePlatform("")).toBeNull();
    expect(parsePlatform("abc")).toBeNull();
    expect(parsePlatform("1.5")).toBeNull();
  });
});

describe("toMeetingArgs", () => {
  it("يقص الرابط ويحوّل التعليمات الفاضية إلى null", () => {
    expect(toMeetingArgs({ meetingPlatform: "3", meetingUrl: "  https://teams.microsoft.com/l/x  ", meetingInstructions: "  " })).toEqual({
      meetingPlatform: 3,
      meetingUrl: "https://teams.microsoft.com/l/x",
      meetingInstructions: null,
    });
  });
  it("null لو غير صالح", () => {
    expect(toMeetingArgs({ ...valid, meetingUrl: "javascript:alert(1)" })).toBeNull();
    expect(toMeetingArgs(emptyMeetingValues())).toBeNull();
  });
});
