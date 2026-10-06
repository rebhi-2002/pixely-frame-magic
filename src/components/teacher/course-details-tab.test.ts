import { describe, expect, it } from "vitest";
import {
  COURSE_TITLE_MAX,
  deliveryTypeFromParam,
  emptyCourseValues,
  hasCourseErrors,
  parsePrice,
  toCourseInput,
  validateCourseForm,
  type CourseFormValues,
} from "@/components/teacher/course-form-schema";

const valid: CourseFormValues = {
  title: "رياضيات الصف التاسع",
  description: "شرح المنهاج كاملًا",
  subjectId: "3",
  categoryId: "2",
  gradeId: "9",
  price: "120",
  maxStudents: "15",
  groupName: "المجموعة أ",
};

describe("validateCourseForm", () => {
  it("نموذج صالح", () => {
    expect(validateCourseForm(valid)).toEqual({});
    expect(hasCourseErrors(validateCourseForm(valid))).toBe(false);
  });
  it("نموذج فاضي = أخطاء الحقول المطلوبة", () => {
    const errors = validateCourseForm(emptyCourseValues());
    expect(errors.title).toBe("title_required");
    expect(errors.subjectId).toBe("subject_required");
    expect(errors.categoryId).toBe("category_required");
    expect(errors.gradeId).toBe("grade_required");
    expect(errors.price).toBe("price_invalid");
    expect(errors.maxStudents).toBe("capacity_invalid");
    expect(errors.groupName).toBe("group_name_required");
    expect(errors.description).toBeUndefined();
  });
  it("العنوان: مسافات فقط = مطلوب، وطويل = رفض", () => {
    expect(validateCourseForm({ ...valid, title: "   " }).title).toBe("title_required");
    expect(validateCourseForm({ ...valid, title: "x".repeat(COURSE_TITLE_MAX + 1) }).title).toBe("title_too_long");
    expect(validateCourseForm({ ...valid, title: "x".repeat(COURSE_TITLE_MAX) }).title).toBeUndefined();
  });
  it("السعر: صفر مقبول، سالب/نص/أكثر من منزلتين مرفوض", () => {
    expect(validateCourseForm({ ...valid, price: "0" }).price).toBeUndefined();
    expect(validateCourseForm({ ...valid, price: "49.5" }).price).toBeUndefined();
    expect(validateCourseForm({ ...valid, price: "-5" }).price).toBe("price_invalid");
    expect(validateCourseForm({ ...valid, price: "abc" }).price).toBe("price_invalid");
    expect(validateCourseForm({ ...valid, price: "10.123" }).price).toBe("price_invalid");
  });
  it("السعة: عدد صحيح ≥ 1", () => {
    expect(validateCourseForm({ ...valid, maxStudents: "0" }).maxStudents).toBe("capacity_invalid");
    expect(validateCourseForm({ ...valid, maxStudents: "2.5" }).maxStudents).toBe("capacity_invalid");
    expect(validateCourseForm({ ...valid, maxStudents: "1" }).maxStudents).toBeUndefined();
  });
  it("الوصف الطويل مرفوض", () => {
    expect(validateCourseForm({ ...valid, description: "x".repeat(2001) }).description).toBe("description_too_long");
  });
});

describe("parsePrice", () => {
  it("يقبل الفاصلة كنقطة", () => {
    expect(parsePrice("12,5")).toBe(12.5);
    expect(parsePrice(" 7 ")).toBe(7);
    expect(parsePrice("")).toBeNull();
    expect(parsePrice("1e3")).toBeNull();
  });
});

describe("toCourseInput", () => {
  it("جسم الإنشاء: بدون id وبدون teacherId (Q-03)", () => {
    const input = toCourseInput(valid, 1, true);
    expect(input).toEqual({
      subjectId: 3,
      categoryId: 2,
      gradeId: 9,
      title: "رياضيات الصف التاسع",
      description: "شرح المنهاج كاملًا",
      price: 120,
      deliveryType: 1,
      maxStudents: 15,
      groupName: "المجموعة أ",
      saveAsDraft: true,
    });
    expect("id" in input).toBe(false);
    expect("teacherId" in input).toBe(false);
  });
  it("النشر المباشر: saveAsDraft=false والأونلاين", () => {
    const input = toCourseInput(valid, 2, false);
    expect(input.saveAsDraft).toBe(false);
    expect(input.deliveryType).toBe(2);
  });
  it("التعديل يمرّر id، وteacherId فقط لو مُرِّر صراحة", () => {
    const input = toCourseInput(valid, 1, true, { courseId: 7, teacherId: 4 });
    expect(input.id).toBe(7);
    expect(input.teacherId).toBe(4);
  });
  it("الوصف الفاضي = null", () => {
    expect(toCourseInput({ ...valid, description: "  " }, 1, true).description).toBeNull();
  });
});

describe("deliveryTypeFromParam", () => {
  it("2 = أونلاين وغيره = حضوري", () => {
    expect(deliveryTypeFromParam(2)).toBe(2);
    expect(deliveryTypeFromParam(1)).toBe(1);
    expect(deliveryTypeFromParam(undefined)).toBe(1);
    expect(deliveryTypeFromParam("2")).toBe(1);
  });
});
