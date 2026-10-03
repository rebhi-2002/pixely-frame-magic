import { beforeEach, describe, expect, it, vi, type Mock } from "vitest";
import { apiClient } from "./client";
import {
  cancelBooking,
  completeBooking,
  decideBooking,
  decideReschedule,
  listMyBookings,
  listTeacherBookings,
  listTeacherRescheduleRequests,
  rateBooking,
  submitBooking,
} from "./bookings";

vi.mock("./client", async (importOriginal) => {
  const actual = await importOriginal<typeof import("./client")>();
  return { ...actual, apiClient: { get: vi.fn(), post: vi.fn(), put: vi.fn() } };
});

const post = apiClient.post as unknown as Mock;
const get = apiClient.get as unknown as Mock;

describe("bookings.ts — مطابقة Swagger", () => {
  beforeEach(() => {
    post.mockReset().mockResolvedValue({ success: true, returnId: 5 });
    get.mockReset().mockResolvedValue([]);
  });

  it("submitBooking يرسل الحقول الموثّقة ويرجّع OperationResult", async () => {
    const input = {
      teacherId: 3,
      subjectId: 4,
      gradeId: 5,
      teachingMode: 2 as const,
      date: "2026-10-05",
      startTime: "10:00",
      durationMinutes: 60,
      studentNote: "ملاحظة",
    };
    const result = await submitBooking(input);
    expect(post).toHaveBeenCalledWith("/api/Booking/Submit", input);
    expect(result).toEqual({ success: true, returnId: 5 });
  });

  it("decideBooking يرسل accept (وليس approve)", async () => {
    await decideBooking(9, true);
    const body = post.mock.calls[0][1] as Record<string, unknown>;
    expect(post.mock.calls[0][0]).toBe("/api/Booking/Decide");
    expect(body).toEqual({ bookingId: 9, accept: true, rejectionReason: null });
    expect("approve" in body).toBe(false);
  });

  it("decideBooking يمرّر سبب الرفض", async () => {
    await decideBooking(9, false, "غير متاح");
    expect(post.mock.calls[0][1]).toMatchObject({ accept: false, rejectionReason: "غير متاح" });
  });

  it("cancelBooking يمرّر bookingId وreason كـquery", async () => {
    await cancelBooking(12, "ظرف طارئ");
    const path = post.mock.calls[0][0] as string;
    expect(path.startsWith("/api/Booking/Cancel?")).toBe(true);
    const params = new URLSearchParams(path.split("?")[1]);
    expect(params.get("bookingId")).toBe("12");
    expect(params.get("reason")).toBe("ظرف طارئ");
  });

  it("cancelBooking بدون سبب لا يرسل reason", async () => {
    await cancelBooking(12);
    expect(post.mock.calls[0][0]).toBe("/api/Booking/Cancel?bookingId=12");
  });

  it("completeBooking يرسل bookingId كـquery", async () => {
    await completeBooking(8);
    expect(post.mock.calls[0][0]).toBe("/api/Booking/Complete?bookingId=8");
  });

  it("rateBooking يرسل ratingValue وreview (وليس rating/comment)", async () => {
    await rateBooking(4, 5, "ممتاز");
    const body = post.mock.calls[0][1] as Record<string, unknown>;
    expect(post.mock.calls[0][0]).toBe("/api/Booking/Rate");
    expect(body).toEqual({ bookingId: 4, ratingValue: 5, review: "ممتاز" });
    expect("rating" in body).toBe(false);
  });

  it("decideReschedule يرسل requestId/approve/rejectionReason", async () => {
    await decideReschedule({ requestId: 2, approve: false, rejectionReason: "مشغول" });
    expect(post).toHaveBeenCalledWith("/api/Booking/DecideReschedule", {
      requestId: 2,
      approve: false,
      rejectionReason: "مشغول",
    });
  });

  it("listTeacherBookings يرسل الحالة رقمًا لا نصًا", async () => {
    await listTeacherBookings(5);
    expect(get).toHaveBeenCalledWith("/api/Booking/TeacherBookings?status=5");
    await listTeacherBookings();
    expect(get).toHaveBeenLastCalledWith("/api/Booking/TeacherBookings");
  });

  it("listTeacherRescheduleRequests مع/بدون فلتر", async () => {
    await listTeacherRescheduleRequests(2);
    expect(get).toHaveBeenCalledWith("/api/Booking/TeacherRescheduleRequests?status=2");
    await listTeacherRescheduleRequests();
    expect(get).toHaveBeenLastCalledWith("/api/Booking/TeacherRescheduleRequests");
  });

  it("ردود القوائم غير المصفوفة = قائمة فارغة (لا انهيار)", async () => {
    get.mockResolvedValue(null);
    expect(await listMyBookings()).toEqual([]);
    expect(await listTeacherBookings()).toEqual([]);
    expect(await listTeacherRescheduleRequests()).toEqual([]);
  });
});
