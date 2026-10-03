import { beforeEach, describe, expect, it, vi, type Mock } from "vitest";
import { apiClient } from "./client";
import {
  cancelLesson,
  configureLessonMeeting,
  createLesson,
  getLessonSchedule,
  updateLesson,
} from "./lessons";

vi.mock("./client", async (importOriginal) => {
  const actual = await importOriginal<typeof import("./client")>();
  return { ...actual, apiClient: { get: vi.fn(), post: vi.fn(), put: vi.fn() } };
});

const post = apiClient.post as unknown as Mock;
const put = apiClient.put as unknown as Mock;
const get = apiClient.get as unknown as Mock;

const lesson = {
  groupId: 1,
  courseId: 2,
  title: "الدرس الأول",
  scheduledDate: "2026-10-06",
  startTime: "16:00",
  durationMinutes: 90,
  orderIndex: 1,
};

describe("lessons.ts — مطابقة Swagger", () => {
  beforeEach(() => {
    post.mockReset().mockResolvedValue({ success: true, returnId: 11 });
    put.mockReset().mockResolvedValue({ success: true });
    get.mockReset().mockResolvedValue([]);
  });

  it("createLesson = POST /Lesson/Create ويرجّع OperationResult", async () => {
    const result = await createLesson({
      ...lesson,
      meetingPlatform: 1,
      meetingUrl: "https://zoom.us/j/1",
    });
    expect(post.mock.calls[0][0]).toBe("/api/Lesson/Create");
    expect(result.returnId).toBe(11);
  });

  it("updateLesson = PUT /Lesson/Update مع id", async () => {
    await updateLesson({ ...lesson, id: 9 });
    expect(put.mock.calls[0][0]).toBe("/api/Lesson/Update");
    expect(put.mock.calls[0][1]).toMatchObject({ id: 9, title: "الدرس الأول" });
  });

  it("configureLessonMeeting يرسل lessonId/meetingPlatform/meetingUrl/meetingInstructions", async () => {
    await configureLessonMeeting(7, 2, "https://meet.google.com/x", "ادخل قبل 5 دقائق");
    expect(put).toHaveBeenCalledWith("/api/Lesson/ConfigureMeeting", {
      lessonId: 7,
      meetingPlatform: 2,
      meetingUrl: "https://meet.google.com/x",
      meetingInstructions: "ادخل قبل 5 دقائق",
    });
  });

  it("cancelLesson يرسل lessonId وreason (null لو غايب)", async () => {
    await cancelLesson(3, "مرض");
    expect(put).toHaveBeenCalledWith("/api/Lesson/Cancel", { lessonId: 3, reason: "مرض" });
    await cancelLesson(3);
    expect(put).toHaveBeenLastCalledWith("/api/Lesson/Cancel", { lessonId: 3, reason: null });
  });

  it("getLessonSchedule يبني query بـcourseId/groupId فقط عند وجودها", async () => {
    await getLessonSchedule(4, 6);
    const path = get.mock.calls[0][0] as string;
    const params = new URLSearchParams(path.split("?")[1]);
    expect(params.get("courseId")).toBe("4");
    expect(params.get("groupId")).toBe("6");
    await getLessonSchedule(undefined, 6);
    expect(get).toHaveBeenLastCalledWith("/api/Lesson/GetSchedule?groupId=6");
    await getLessonSchedule();
    expect(get).toHaveBeenLastCalledWith("/api/Lesson/GetSchedule");
  });

  it("ردّ غير مصفوفة = قائمة فارغة", async () => {
    get.mockResolvedValue({});
    expect(await getLessonSchedule(1)).toEqual([]);
  });
});
