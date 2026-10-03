import { describe, expect, it } from "vitest";
import { EARNINGS_WINDOW_SIZE, WITHDRAWAL_STAGES, pickInstructorCredits } from "../lib/earnings";
import type { WalletTransactionDto } from "../integrations/backend/wallet";

function tx(partial: Partial<WalletTransactionDto>): WalletTransactionDto {
  return {
    id: 1,
    walletId: 1,
    direction: 1,
    type: 4,
    amount: 10,
    status: 4,
    description: null,
    createdOn: "2026-10-01T10:00:00Z",
    ...partial,
  };
}

describe("pickInstructorCredits", () => {
  it("يُبقي InstructorCredit فقط (النوع 4)", () => {
    const rows = [
      tx({ id: 1, type: 1 }), // TopUp
      tx({ id: 2, type: 2, direction: 2 }), // Withdrawal
      tx({ id: 3, type: 3, direction: 2 }), // EnrollmentDeduction
      tx({ id: 4, type: 4 }), // InstructorCredit
    ];
    expect(pickInstructorCredits(rows).map((t) => t.id)).toEqual([4]);
  });

  it("الأحدث أولًا", () => {
    const rows = [
      tx({ id: 1, createdOn: "2026-09-01T00:00:00Z" }),
      tx({ id: 2, createdOn: "2026-10-02T00:00:00Z" }),
      tx({ id: 3, createdOn: "2026-09-20T00:00:00Z" }),
    ];
    expect(pickInstructorCredits(rows).map((t) => t.id)).toEqual([2, 3, 1]);
  });

  it("لا يستبعد أي حالة (مثلاً المُرتجع) — لا نخفي حركة حقيقية", () => {
    const rows = [tx({ id: 1, status: 5 }), tx({ id: 2, status: 3 }), tx({ id: 3, status: 1 })];
    expect(pickInstructorCredits(rows)).toHaveLength(3);
  });

  it("قائمة فاضية = فاضية، وتاريخ غير صالح لا يكسر الترتيب", () => {
    expect(pickInstructorCredits([])).toEqual([]);
    expect(() =>
      pickInstructorCredits([tx({ id: 1, createdOn: "bad" }), tx({ id: 2 })]),
    ).not.toThrow();
  });

  it("لا يعدّل المصفوفة الأصلية", () => {
    const rows = [tx({ id: 1, createdOn: "2026-09-01T00:00:00Z" }), tx({ id: 2 })];
    const copy = [...rows];
    pickInstructorCredits(rows);
    expect(rows).toEqual(copy);
  });
});

describe("ثوابت العرض", () => {
  it("النافذة 50 حركة (التسمية بالواجهة تعتمد عليها)", () => {
    expect(EARNINGS_WINDOW_SIZE).toBe(50);
  });
  it("مراحل السحب الثلاث بالترتيب", () => {
    expect(WITHDRAWAL_STAGES.map((s) => s.key)).toEqual(["pending", "approved", "completed"]);
  });
});
