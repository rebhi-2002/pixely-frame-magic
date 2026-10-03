import { describe, expect, it } from "vitest";
import { detailTarget, joinHref, locationLabel } from "@/lib/schedule-join";

const bi = <T>(ar: T, _en: T) => ar;

describe("joinHref", () => {
  it("يتطلب canJoin ورابط http/https صالح", () => {
    expect(joinHref({ canJoin: true, meetingUrl: "https://zoom.us/j/123" })).toBe(
      "https://zoom.us/j/123",
    );
    expect(joinHref({ canJoin: true, meetingUrl: "  http://meet.example.com/x  " })).toBe(
      "http://meet.example.com/x",
    );
  });
  it("canJoin=false = لا رابط حتى لو الرابط صالح", () => {
    expect(joinHref({ canJoin: false, meetingUrl: "https://zoom.us/j/123" })).toBeNull();
  });
  it("يرفض الروابط الخطرة والفاضية", () => {
    for (const bad of [
      "javascript:alert(1)",
      "data:text/html,<script>",
      "ftp://x.com",
      "zoom.us/j/1",
      "",
      "   ",
    ]) {
      expect(joinHref({ canJoin: true, meetingUrl: bad })).toBeNull();
    }
    expect(joinHref({ canJoin: true, meetingUrl: null })).toBeNull();
  });
});

describe("locationLabel", () => {
  it("حضوري: القاعة أو الموقع غير متوفر", () => {
    expect(locationLabel({ mode: 1, room: "قاعة 3", meetingPlatform: null }, bi)).toBe("قاعة 3");
    expect(locationLabel({ mode: 1, room: "  ", meetingPlatform: null }, bi)).toBe(
      "الموقع غير متوفر",
    );
    expect(locationLabel({ mode: 1, room: null, meetingPlatform: null }, bi)).toBe(
      "الموقع غير متوفر",
    );
  });
  it("أونلاين: اسم المنصة", () => {
    expect(locationLabel({ mode: 2, room: null, meetingPlatform: 1 }, bi)).toBe("Zoom");
    expect(locationLabel({ mode: 2, room: null, meetingPlatform: 2 }, bi)).toBe("Google Meet");
    expect(locationLabel({ mode: 2, room: null, meetingPlatform: null }, bi)).toBe("—");
  });
  it("وضع غير معروف", () => {
    expect(locationLabel({ mode: null, room: "x", meetingPlatform: 1 }, bi)).toBe("—");
  });
});

describe("detailTarget", () => {
  it("درس → /lesson/$id وحجز → /booking/$id", () => {
    expect(detailTarget({ kind: "Lesson", id: 7 })).toEqual({ to: "/lesson/$id", id: "7" });
    expect(detailTarget({ kind: "Booking", id: 9 })).toEqual({ to: "/booking/$id", id: "9" });
  });
});
