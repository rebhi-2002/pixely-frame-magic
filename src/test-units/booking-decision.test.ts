import { describe, expect, it } from "vitest";
import {
  MAX_REJECTION_REASON,
  normalizeReason,
  toDecisionArgs,
  validateDecision,
} from "@/lib/booking-decision";

describe("normalizeReason", () => {
  it("يقص ويحوّل الفاضي إلى null", () => {
    expect(normalizeReason("  الوقت غير مناسب  ")).toBe("الوقت غير مناسب");
    expect(normalizeReason("   ")).toBeNull();
    expect(normalizeReason("")).toBeNull();
  });
});

describe("validateDecision", () => {
  it("القبول بلا شروط حتى بدون سبب", () => {
    expect(validateDecision("accept", "")).toEqual([]);
  });
  it("الرفض يتطلب سببًا", () => {
    expect(validateDecision("reject", "")).toEqual(["reason_required"]);
    expect(validateDecision("reject", "   ")).toEqual(["reason_required"]);
    expect(validateDecision("reject", "غير متاح")).toEqual([]);
  });
  it("حد طول السبب", () => {
    expect(validateDecision("reject", "x".repeat(MAX_REJECTION_REASON))).toEqual([]);
    expect(validateDecision("reject", "x".repeat(MAX_REJECTION_REASON + 1))).toEqual(["reason_too_long"]);
  });
});

describe("toDecisionArgs", () => {
  it("القبول لا يرسل سببًا حتى لو كُتب", () => {
    expect(toDecisionArgs("accept", "نص قديم")).toEqual({ accept: true, rejectionReason: null });
  });
  it("الرفض يرسل السبب مقصوصًا", () => {
    expect(toDecisionArgs("reject", "  مشغول  ")).toEqual({ accept: false, rejectionReason: "مشغول" });
  });
});
