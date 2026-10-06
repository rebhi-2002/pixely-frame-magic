import { describe, expect, it } from "vitest";
import { findUserTypeForRole, parseRoleKey } from "./user-types";
import { resolveRoleKey } from "@/lib/bi";

// الأرقام هون متعمّدة غير متسلسلة (متل القاعدة الحية 1/2/3/4) لإثبات إن الدور ما بيعتمد عليها.
const roles = [
  { id: 2, name: "الطالب", code: "student" },
  { id: 3, name: "المعلم", code: "teacher" },
  { id: 4, name: "ولي الامر", code: "parent" },
];

describe("findUserTypeForRole", () => {
  it("يطابق بالـcode بغض النظر عن الرقم والاسم", () => {
    expect(findUserTypeForRole(roles, "teacher")?.id).toBe(3);
    expect(findUserTypeForRole(roles, "parent")?.id).toBe(4);
    expect(findUserTypeForRole([{ id: 99, name: "أي اسم", code: "student" }], "student")?.id).toBe(
      99,
    );
  });

  it("احتياط بالاسم لو الباك اند لسا ما رجّع code (ولي الأمر بهمزة)", () => {
    expect(findUserTypeForRole([{ id: 7, name: "ولي الأمر" }], "parent")?.id).toBe(7);
  });

  it("نوع غير موجود (لا code ولا رقم 4 ولا اسم) = undefined", () => {
    expect(findUserTypeForRole([{ id: 9, name: "شي تاني" }], "parent")).toBeUndefined();
  });
});

describe("resolveRoleKey / parseRoleKey", () => {
  it("يفضّل roleKey على الاسم والرقم", () => {
    expect(resolveRoleKey({ roleKey: "teacher", roleName: "الطالب", roleId: 1 })).toBe("teacher");
  });
  it("احتياط للجلسات القديمة", () => {
    expect(resolveRoleKey({ roleName: "المعلم", roleId: 3 })).toBe("teacher");
    expect(resolveRoleKey({ roleId: 1 })).toBe("admin");
  });
  it("الأرقام المعتمدة: 1 أدمن، 2 طالب، 3 معلم، 4 ولي أمر (رقم نصي أو عددي)", () => {
    expect(resolveRoleKey({ roleId: 1 })).toBe("admin");
    expect(resolveRoleKey({ roleId: 2 })).toBe("student");
    expect(resolveRoleKey({ roleId: 3 })).toBe("teacher");
    expect(resolveRoleKey({ roleId: "4" })).toBe("parent");
    expect(resolveRoleKey({ roleId: 99 })).toBe("student"); // غير معروف → الافتراضي
  });
  it("الرقم يتقدّم على الاسم", () => {
    expect(resolveRoleKey({ roleName: "الطالب", roleId: 3 })).toBe("teacher");
  });
  it("يلاقي النوع بالرقم لو ما رجع code ولا طابق الاسم", () => {
    expect(findUserTypeForRole([{ id: 4, name: "xyz" }], "parent")?.id).toBe(4);
  });
  it("يرفض مفاتيح غير معروفة", () => {
    expect(parseRoleKey("supervisor")).toBeNull();
    expect(parseRoleKey("admin")).toBe("admin");
  });
});
