import { beforeEach, describe, expect, it, vi, type Mock } from "vitest";
import { apiClient } from "./client";
import {
  getMyRescheduleRequests,
  getStudentAttendance,
  getStudentBooking,
  getStudentBookingPayment,
  getStudentCourse,
  getStudentExamResults,
  getStudentLesson,
  getStudentProgress,
  requestReschedule,
  studentCancelBooking,
} from "./student";

vi.mock("./client", async (importOriginal) => {
  const actual = await importOriginal<typeof import("./client")>();
  return { ...actual, apiClient: { get: vi.fn(), post: vi.fn() } };
});

const post = apiClient.post as unknown as Mock;
const get = apiClient.get as unknown as Mock;

describe("student.ts — الدوال العشر الجديدة", () => {
  beforeEach(() => {
    post.mockReset().mockResolvedValue({ success: true });
    get.mockReset().mockResolvedValue([]);
  });

  it("GetBooking / BookingPayment / GetLesson / GetCourse يرسلون المعرّف بالاسم الموثّق", async () => {
    get.mockResolvedValue({});
    await getStudentBooking(5);
    await getStudentBookingPayment(5);
    await getStudentLesson(6);
    await getStudentCourse(7);
    expect(get.mock.calls.map((c) => c[0])).toEqual([
      "/api/Student/GetBooking?id=5",
      "/api/Student/BookingPayment?bookingId=5",
      "/api/Student/GetLesson?id=6",
      "/api/Student/GetCourse?id=7",
    ]);
  });

  it("studentCancelBooking: body {bookingId, reason}", async () => {
    await studentCancelBooking(3, "تغيّر الموعد");
    expect(post).toHaveBeenCalledWith("/api/Student/CancelBooking", {
      bookingId: 3,
      reason: "تغيّر الموعد",
    });
  });

  it("requestReschedule: الحقول الأربعة الموثّقة", async () => {
    await requestReschedule({
      bookingId: 3,
      proposedDate: "2026-10-09",
      proposedStartTime: "17:00",
      note: "أفضل وقت",
    });
    expect(post).toHaveBeenCalledWith("/api/Student/RequestReschedule", {
      bookingId: 3,
      proposedDate: "2026-10-09",
      proposedStartTime: "17:00",
      note: "أفضل وقت",
    });
  });

  it("getMyRescheduleRequests: غير مصفوفة = فارغة", async () => {
    get.mockResolvedValue(null);
    expect(await getMyRescheduleRequests()).toEqual([]);
    expect(get).toHaveBeenCalledWith("/api/Student/MyRescheduleRequests");
  });

  it("getStudentAttendance يبني الفلاتر ويحوّل Date إلى ISO", async () => {
    await getStudentAttendance({
      from: new Date("2026-10-01T00:00:00.000Z"),
      to: "2026-10-31",
      courseId: 9,
    });
    const path = get.mock.calls[0][0] as string;
    expect(path.startsWith("/api/Student/Attendance?")).toBe(true);
    const params = new URLSearchParams(path.split("?")[1]);
    expect(params.get("from")).toBe("2026-10-01T00:00:00.000Z");
    expect(params.get("to")).toBe("2026-10-31");
    expect(params.get("courseId")).toBe("9");
    await getStudentAttendance();
    expect(get).toHaveBeenLastCalledWith("/api/Student/Attendance");
  });

  it("getStudentAttendance يطبّع كائن الباك اند ويحمي من الحقول الناقصة", async () => {
    get.mockResolvedValue({
      attendanceRatePercent: 80,
      totalSessions: 5,
      present: 4,
      absent: 1,
      records: [{ sessionDate: "2026-10-01T00:00:00", groupName: "أ", courseTitle: null, status: 1, notes: null }],
    });
    const result = await getStudentAttendance();
    expect(result.attendanceRatePercent).toBe(80);
    expect(result.late).toBe(0);
    expect(result.excused).toBe(0);
    expect(result.records).toHaveLength(1);
    get.mockResolvedValue(null);
    const empty = await getStudentAttendance();
    expect(empty.attendanceRatePercent).toBeNull();
    expect(empty.totalSessions).toBe(0);
    expect(empty.records).toEqual([]);
  });

  it("getStudentExamResults مع/بدون courseId", async () => {
    await getStudentExamResults(4);
    expect(get).toHaveBeenCalledWith("/api/Student/ExamResults?courseId=4");
    await getStudentExamResults();
    expect(get).toHaveBeenLastCalledWith("/api/Student/ExamResults");
  });

  it("getStudentProgress يستخدم StudentProgressDto الموجود", async () => {
    get.mockResolvedValue({
      attendanceRatePercent: 90,
      averageExamScorePercent: null,
      attendanceSessions: 10,
      examsTaken: 0,
    });
    const progress = await getStudentProgress();
    expect(get).toHaveBeenCalledWith("/api/Student/Progress");
    expect(progress.attendanceRatePercent).toBe(90);
    expect(progress.averageExamScorePercent).toBeNull();
  });
});
