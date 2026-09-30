import { describe, expect, it } from "vitest";
import { findUserTypeForRole, parseRoleKey } from "./user-types";
import { resolveRoleKey } from "@/lib/bi";

// الأرقام هون متعمّدة غير متسلسلة (متل القاعدة الحية 1/3/4/5) لإثبات إن الدور ما بيعتمد عليها.
const roles = [
  { id: 3, name: "الطالب", code: "student" },
  { id: 4, name: "المعلم", code: "teacher" },
  { id: 5, name: "ولي الامر", code: "parent" },
];

describe("findUserTypeForRole", () => {
  it("يطابق بالـcode بغض النظر عن الرقم والاسم", () => {
    expect(findUserTypeForRole(roles, "teacher")?.id).toBe(4);
    expect(findUserTypeForRole(roles, "parent")?.id).toBe(5);
    expect(findUserTypeForRole([{ id: 99, name: "أي اسم", code: "student" }], "student")?.id).toBe(99);
  });

  it("احتياط بالاسم لو الباك اند لسا ما رجّع code (ولي الأمر بهمزة)", () => {
    expect(findUserTypeForRole([{ id: 7, name: "ولي الأمر" }], "parent")?.id).toBe(7);
  });

  it("ما يخمّن بالرقم: نوع غير موجود = undefined", () => {
    expect(findUserTypeForRole([{ id: 4, name: "شي تاني" }], "parent")).toBeUndefined();
  });
});

describe("resolveRoleKey / parseRoleKey", () => {
  it("يفضّل roleKey على الاسم والرقم", () => {
    expect(resolveRoleKey({ roleKey: "teacher", roleName: "الطالب", roleId: 1 })).toBe("teacher");
  });
  it("احتياط للجلسات القديمة", () => {
    expect(resolveRoleKey({ roleName: "المعلم", roleId: 4 })).toBe("teacher");
    expect(resolveRoleKey({ roleId: 1 })).toBe("admin");
  });
  it("يرفض مفاتيح غير معروفة", () => {
    expect(parseRoleKey("supervisor")).toBeNull();
    expect(parseRoleKey("admin")).toBe("admin");
  });
});
