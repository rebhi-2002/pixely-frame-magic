import { beforeEach, describe, expect, it, vi, type Mock } from "vitest";
import { ApiError, apiClient } from "./client";
import {
  PUBLISHED_PAGE_SIZE,
  coursesOfTeacher,
  getPublishedCourse,
  listAllPublishedCourses,
  listPublishedCoursesPage,
  type BackendCourseRow,
} from "./courses";

vi.mock("./client", async (importOriginal) => {
  const actual = await importOriginal<typeof import("./client")>();
  return { ...actual, apiClient: { get: vi.fn(), post: vi.fn() } };
});

// apiClient.get/post دوال generic — cast لـMock بسيط يتجنّب تعارض أنواع الـgeneric مع mockResolvedValue.
const post = apiClient.post as unknown as Mock;
const get = apiClient.get as unknown as Mock;

function course(id: number, teacherId = 1): BackendCourseRow {
  return {
    id,
    title: `كورس ${id}`,
    price: 10,
    deliveryType: 2,
    status: 2,
    maxStudents: 20,
    teacherId,
  };
}

/** يحاكي GetPublished: يرجّع الصفحة المطلوبة من total كورس. */
function fakeBackend(total: number) {
  post.mockImplementation(async (_path: string, body?: unknown) => {
    const { skip = 0, pageSize = 1 } = body as { skip?: number; pageSize?: number };
    const size = Math.min(Math.max(pageSize, 1), PUBLISHED_PAGE_SIZE);
    const data = Array.from({ length: total }, (_, i) => course(i + 1)).slice(skip, skip + size);
    return { totalCount: total, data };
  });
}

describe("courses.ts — الكتالوج العام (GetPublished)", () => {
  beforeEach(() => {
    post.mockReset();
    get.mockReset();
  });

  it("يستخدم GetPublished (مش GetAll المقصور على الأدمن/المعلم)", async () => {
    fakeBackend(3);
    await listAllPublishedCourses();
    expect(post.mock.calls[0][0]).toBe("/api/Course/GetPublished");
  });

  it("يرسل PageSize صريح ومقصوص عند 50 (الباك اند يقصّ الصفر لـ1)", async () => {
    fakeBackend(0);
    await listPublishedCoursesPage({ pageSize: 500 });
    expect(post.mock.calls[0][1]).toMatchObject({ skip: 0, pageSize: 50 });
    await listPublishedCoursesPage();
    expect(post.mock.calls[1][1]).toMatchObject({ pageSize: 50 });
  });

  it("صفحة وحيدة: كل العناصر وبدون اقتطاع", async () => {
    fakeBackend(3);
    const catalog = await listAllPublishedCourses();
    expect(catalog.items).toHaveLength(3);
    expect(catalog.totalCount).toBe(3);
    expect(catalog.truncated).toBe(false);
    expect(post).toHaveBeenCalledTimes(1);
  });

  it("عدة صفحات: يجلبها كلها بترتيب skip صحيح", async () => {
    fakeBackend(120);
    const catalog = await listAllPublishedCourses();
    expect(catalog.items).toHaveLength(120);
    expect(catalog.items.map((c) => c.id)).toEqual(Array.from({ length: 120 }, (_, i) => i + 1));
    expect(catalog.truncated).toBe(false);
    expect(post.mock.calls.map((c) => (c[1] as { skip: number }).skip)).toEqual([0, 50, 100]);
  });

  it("يقف عند سقف الصفحات ويعلّم الاقتطاع بصدق", async () => {
    fakeBackend(500);
    const catalog = await listAllPublishedCourses(2);
    expect(post).toHaveBeenCalledTimes(2);
    expect(catalog.items).toHaveLength(100);
    expect(catalog.totalCount).toBe(500);
    expect(catalog.truncated).toBe(true);
  });

  it("كتالوج فاضي بدون أخطاء", async () => {
    fakeBackend(0);
    const catalog = await listAllPublishedCourses();
    expect(catalog).toEqual({ items: [], totalCount: 0, truncated: false });
  });

  it("خطأ الشبكة بيرتفع (ما يتحوّل لكتالوج فاضي وهمي)", async () => {
    post.mockRejectedValue(new ApiError("down", 0, "network"));
    await expect(listAllPublishedCourses()).rejects.toBeInstanceOf(ApiError);
  });

  it("coursesOfTeacher: فلترة حسب المعلم فقط", () => {
    const items = [course(1, 7), course(2, 8), course(3, 7)];
    expect(coursesOfTeacher(items, 7).map((c) => c.id)).toEqual([1, 3]);
    expect(coursesOfTeacher(items, 99)).toEqual([]);
  });

  it("getPublishedCourse: 404 → null، وغيره يرتفع", async () => {
    get.mockRejectedValueOnce(new ApiError("nf", 404, "http"));
    await expect(getPublishedCourse(5)).resolves.toBeNull();
    get.mockRejectedValueOnce(new ApiError("boom", 500, "http"));
    await expect(getPublishedCourse(5)).rejects.toBeInstanceOf(ApiError);
    get.mockResolvedValueOnce(course(5));
    await expect(getPublishedCourse(5)).resolves.toMatchObject({ id: 5 });
  });
});
