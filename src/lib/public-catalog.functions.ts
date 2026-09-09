import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireAuth } from "@/integrations/backend/auth-middleware";
import { requirePermission } from "./rbac.server";
import { PUBLIC_COURSES, nextCatalogId, type PublicCourseRow } from "./public-catalog-data";

/** قراءة عامة — بدون تسجيل دخول، تُستخدم بصفحة /courses قبل الاشتراك. */
export const listPublicCourses = createServerFn({ method: "GET" }).handler(async () => {
  return PUBLIC_COURSES;
});

export const saveCourse = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) =>
    z
      .object({
        id: z.string().optional(),
        titleAr: z.string().trim().min(2, "العنوان بالعربي مطلوب"),
        titleEn: z.string().trim().min(2, "العنوان بالإنجليزي مطلوب"),
        descriptionAr: z.string().trim().min(10, "الوصف بالعربي مطلوب (10 أحرف ع الأقل)"),
        descriptionEn: z.string().trim().min(10, "الوصف بالإنجليزي مطلوب (10 أحرف ع الأقل)"),
        teacherAr: z.string().trim().min(2, "اسم المعلم بالعربي مطلوب"),
        teacherEn: z.string().trim().min(2, "اسم المعلم بالإنجليزي مطلوب"),
        teacherId: z.string().trim().min(2, "معرّف المعلم مطلوب"),
        subjectAr: z.string().trim().min(1, "المادة بالعربي مطلوبة"),
        subjectEn: z.string().trim().min(1, "المادة بالإنجليزي مطلوبة"),
        levelAr: z.string().trim().min(1, "المستوى بالعربي مطلوب"),
        levelEn: z.string().trim().min(1, "المستوى بالإنجليزي مطلوب"),
        lessons: z.number().int().min(0),
        price: z.number().min(0),
        // اختياريين بقصد — فاضين لحد ما تتوفر بيانات حقيقية (راجع تعليق
        // PublicCourseRow بـ public-catalog-data.ts لشرح المبدأ).
        rating: z.number().min(0).max(5).optional(),
        studentsCount: z.number().int().min(0).optional(),
        durationHours: z.number().min(0).optional(),
        /** وسوم مفصولة بفاصلة، بنفس الترتيب باللغتين (تاغ 1 عربي = تاغ 1 إنجليزي). */
        tagsAr: z.string().optional(),
        tagsEn: z.string().optional(),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    await requirePermission(
      context.userId,
      "admin_course_catalog",
      data.id ? "edit" : "execute_add",
    );
    const tagsArList = (data.tagsAr ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const tagsEnList = (data.tagsEn ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const tags: [string, string][] | undefined =
      tagsArList.length > 0
        ? tagsArList.map((ar, i) => [ar, tagsEnList[i] ?? ar] as [string, string])
        : undefined;

    const shaped = {
      title: [data.titleAr, data.titleEn] as [string, string],
      description: [data.descriptionAr, data.descriptionEn] as [string, string],
      teacher: [data.teacherAr, data.teacherEn] as [string, string],
      teacherId: data.teacherId,
      subject: [data.subjectAr, data.subjectEn] as [string, string],
      level: [data.levelAr, data.levelEn] as [string, string],
      lessons: data.lessons,
      price: data.price,
      rating: data.rating,
      studentsCount: data.studentsCount,
      durationHours: data.durationHours,
      tags,
      // يُحدَّث تلقائياً بكل حفظ — بدون حقل يدوي بالنموذج.
      updatedAt: new Date().toISOString(),
    };
    if (data.id) {
      const row = PUBLIC_COURSES.find((r) => r.id === data.id);
      if (!row) throw new Error("الكورس غير موجود");
      Object.assign(row, shaped);
    } else {
      const row: PublicCourseRow = { id: nextCatalogId("crs"), ...shaped };
      PUBLIC_COURSES.push(row);
    }
    return { ok: true };
  });

export const deleteCourse = createServerFn({ method: "POST" })
  .middleware([requireAuth])
  .inputValidator((input) => z.object({ id: z.string() }).parse(input))
  .handler(async ({ data, context }) => {
    await requirePermission(context.userId, "admin_course_catalog", "delete");
    const idx = PUBLIC_COURSES.findIndex((r) => r.id === data.id);
    if (idx !== -1) PUBLIC_COURSES.splice(idx, 1);
    return { ok: true };
  });
