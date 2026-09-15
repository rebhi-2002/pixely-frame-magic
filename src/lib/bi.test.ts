import { describe, expect, it } from "vitest";
import { roleHome, roleKeyFromName, pageMatchesRole } from "@/lib/bi";

// هالتيست بيقفل باگ حقيقي صار تصليحه: أسماء الأدوار الحقيقية بالباك اند
// (UserSeed.cs) مختلفة شكليًا عن أسماء بيانات الديمو المحلية — بدون
// المطابقة الصحيحة، أي مستخدم حقيقي (طالب/معلم/ولي أمر) كان ينحط بمساحة
// الطالب افتراضيًا بعد تسجيل الدخول. راجع full-project-report.md قسم 10.

describe("roleKeyFromName — أسماء الباك اند الحقيقية", () => {
  it("يطابق الطالب الحقيقي", () => {
    expect(roleKeyFromName("الطالب", false)).toBe("student");
  });

  it("يطابق المعلم الحقيقي", () => {
    expect(roleKeyFromName("المعلم", false)).toBe("teacher");
  });

  it("يطابق ولي الأمر الحقيقي", () => {
    expect(roleKeyFromName("ولي الامر", false)).toBe("parent");
  });

  it("يطابق مدير النظام الحقيقي", () => {
    expect(roleKeyFromName("مدير النظام", false)).toBe("admin");
  });
});

describe("roleKeyFromName — أسماء بيانات الديمو المحلية (يجب أن تبقى شغالة)", () => {
  it("يطابق طالب الديمو", () => {
    expect(roleKeyFromName("طالب", false)).toBe("student");
  });

  it("يطابق ولي أمر الديمو", () => {
    expect(roleKeyFromName("ولي أمر", false)).toBe("parent");
  });

  it("يطابق مدير عام الديمو", () => {
    expect(roleKeyFromName("مدير عام", false)).toBe("admin");
  });
});

describe("roleKeyFromName — حالات الفشل الآمن", () => {
  it("يرجع طالب افتراضيًا لاسم غير معروف وبدون علم أدمن", () => {
    expect(roleKeyFromName("اسم غير موجود", false)).toBe("student");
  });

  it("يرجع أدمن لو علم isAdmin=true حتى لو الاسم غير معروف", () => {
    expect(roleKeyFromName(null, true)).toBe("admin");
  });

  it("يرجع طالب لقيمة null بدون علم أدمن", () => {
    expect(roleKeyFromName(null, false)).toBe("student");
  });
});

describe("roleHome — التوجيه بعد تسجيل الدخول", () => {
  it("الأدمن الحقيقي يروح لـ/admin/dashboard مش /dashboard", () => {
    expect(roleHome("مدير النظام", true)).toBe("/admin/dashboard");
  });

  it("المعلم الحقيقي يروح لمساحته هو، مش مساحة الطالب", () => {
    expect(roleHome("المعلم", false)).toBe("/teacher/dashboard");
  });

  it("ولي الأمر الحقيقي يروح لمساحته هو", () => {
    expect(roleHome("ولي الامر", false)).toBe("/parent/report");
  });
});

describe("pageMatchesRole", () => {
  it("صفحة طالب مسموحة لدور الطالب", () => {
    expect(pageMatchesRole("student_dashboard", "student")).toBe(true);
  });

  it("صفحة طالب غير مسموحة لدور المعلم", () => {
    expect(pageMatchesRole("student_dashboard", "teacher")).toBe(false);
  });

  it("الإشعارات مسموحة لكل الأدوار (صفحة مشتركة)", () => {
    expect(pageMatchesRole("notifications", "parent")).toBe(true);
    expect(pageMatchesRole("notifications", "admin")).toBe(true);
  });
});
