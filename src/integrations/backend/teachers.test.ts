import { beforeEach, describe, expect, it, vi, type Mock } from "vitest";
import { ApiError, apiClient } from "./client";
import { getTeacherAvailability, getTeacherPublicProfile, searchTeachers } from "./teachers";

vi.mock("./client", async (importOriginal) => {
  const actual = await importOriginal<typeof import("./client")>();
  return { ...actual, apiClient: { get: vi.fn(), post: vi.fn() } };
});

// apiClient.get/post دوال generic — cast لـMock بسيط يتجنّب تعارض أنواع الـgeneric مع mockResolvedValue.
const post = apiClient.post as unknown as Mock;
const get = apiClient.get as unknown as Mock;

describe("teachers.ts", () => {
  beforeEach(() => {
    post.mockReset();
    get.mockReset();
  });

  it("getTeacherPublicProfile: 404 فقط يعني 'غير موجود' (null)", async () => {
    get.mockRejectedValueOnce(new ApiError("nf", 404, "http"));
    await expect(getTeacherPublicProfile(3)).resolves.toBeNull();
  });

  it("getTeacherPublicProfile: خطأ شبكة/خادم يرتفع ولا يتحوّل لـ'غير موجود'", async () => {
    get.mockRejectedValueOnce(new ApiError("down", 0, "network"));
    await expect(getTeacherPublicProfile(3)).rejects.toBeInstanceOf(ApiError);
    get.mockRejectedValueOnce(new ApiError("boom", 500, "http"));
    await expect(getTeacherPublicProfile(3)).rejects.toBeInstanceOf(ApiError);
  });

  it("getTeacherPublicProfile: يرجّع الملف عند النجاح", async () => {
    get.mockResolvedValueOnce({ id: 3, name: "معلم", subjects: [], grades: [] });
    await expect(getTeacherPublicProfile(3)).resolves.toMatchObject({ id: 3 });
    expect(get.mock.calls[0][0]).toBe("/api/Teacher/PublicProfile?id=3");
  });

  it("searchTeachers: يرسل الفلتر كما هو لـTeacher/Search", async () => {
    post.mockResolvedValueOnce({ totalCount: 0, data: [] });
    await searchTeachers({ keyword: "سامي", online: true, pageSize: 24 });
    expect(post).toHaveBeenCalledWith("/api/Teacher/Search", {
      keyword: "سامي",
      online: true,
      pageSize: 24,
    });
  });

  it("getTeacherAvailability: يبني الاستعلام (mode/date اختياريين)", async () => {
    get.mockResolvedValue([]);
    await getTeacherAvailability(4);
    expect(get.mock.calls[0][0]).toBe("/api/Teacher/Availability?teacherId=4");
    await getTeacherAvailability(4, 2, "2026-09-25");
    expect(get.mock.calls[1][0]).toBe(
      "/api/Teacher/Availability?teacherId=4&mode=2&date=2026-09-25",
    );
  });
});
