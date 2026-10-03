import { beforeEach, describe, expect, it, vi, type Mock } from "vitest";
import { ApiError, apiClient } from "./client";
import {
  ROLE_PROBE_PATHS,
  classifyProbeError,
  decideRoleFromProbes,
  probeRole,
  type ProbeResults,
} from "./role-probe";

vi.mock("./client", async (importOriginal) => {
  const actual = await importOriginal<typeof import("./client")>();
  return { ...actual, apiClient: { get: vi.fn(), post: vi.fn() } };
});

const get = apiClient.get as unknown as Mock;
const err = (status: number) => new ApiError("x", status, "http");

describe("classifyProbeError", () => {
  it("401/403 = مرفوض", () => {
    expect(classifyProbeError(err(403))).toBe("denied");
    expect(classifyProbeError(err(401))).toBe("denied");
  });
  it("5xx = وصل (عدّى الصلاحية)", () => {
    expect(classifyProbeError(err(500))).toBe("reached");
  });
  it("شبكة/404/غير ApiError = مجهول", () => {
    expect(classifyProbeError(err(404))).toBe("unknown");
    expect(classifyProbeError(new ApiError("x", 0, "network"))).toBe("unknown");
    expect(classifyProbeError(new Error("boom"))).toBe("unknown");
  });
});

describe("decideRoleFromProbes", () => {
  const r = (student: string, parent: string, teacher: string) =>
    ({ student, parent, teacher }) as ProbeResults;
  it("دور واحد وصل والباقي مرفوض", () => {
    expect(decideRoleFromProbes(r("reached", "denied", "denied"))).toBe("student");
    expect(decideRoleFromProbes(r("denied", "reached", "denied"))).toBe("parent");
    expect(decideRoleFromProbes(r("denied", "denied", "reached"))).toBe("teacher");
  });
  it("غموض = null: دوران وصلا (endpoint بلا فحص دور)", () => {
    expect(decideRoleFromProbes(r("reached", "reached", "denied"))).toBeNull();
    expect(decideRoleFromProbes(r("reached", "reached", "reached"))).toBeNull();
  });
  it("لا دور وصل = null", () => {
    expect(decideRoleFromProbes(r("denied", "denied", "denied"))).toBeNull();
  });
  it("أي نتيجة مجهولة = null حتى لو وصل دور", () => {
    expect(decideRoleFromProbes(r("reached", "unknown", "denied"))).toBeNull();
  });
});

describe("probeRole", () => {
  beforeEach(() => get.mockReset());

  it("معلم: الطالب وولي الأمر 403 والمعلم 500", async () => {
    get.mockImplementation(async (path: string) => {
      if (path === ROLE_PROBE_PATHS.teacher) throw err(500);
      throw err(403);
    });
    expect(await probeRole("u-teacher")).toBe("teacher");
  });

  it("طالب: endpoint الطالب ينجح والباقي 403", async () => {
    get.mockImplementation(async (path: string) => {
      if (path === ROLE_PROBE_PATHS.student) return {};
      throw err(403);
    });
    expect(await probeRole("u-student")).toBe("student");
  });

  it("تُحسب مرة واحدة لكل مستخدم", async () => {
    get.mockImplementation(async () => {
      throw err(403);
    });
    await probeRole("u-once");
    await probeRole("u-once");
    expect(get).toHaveBeenCalledTimes(3);
  });
});
