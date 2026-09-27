---
name: tdd
description: The red-green-refactor loop this repo already commits to in implement-task, spelled out as its own reference — write a failing Vitest/Playwright test first, make it pass with the smallest change, then refactor with code-simplifier. Use whenever implementing new behavior, fixing a bug (pair with diagnosing-bugs), or when the user asks "do this test-first", "tdd هاد الشي".
---

# TDD Loop

`implement-task` already requires this — write the test first, make it pass with the smallest change,
then refactor. This is that loop written down once, so nothing else has to re-explain it.

## 📌 Non-Negotiable Hard Rules

1. **Red before green.** Write the test first and watch it fail for the right reason (not a typo/import
   error) before writing the implementation.
2. **Smallest change that turns it green.** Resist implementing more than the current test demands —
   extra untested behavior is exactly what `code-review` flags as scope creep.
3. **Refactor only on green**, and hand that step to `code-simplifier` rather than mixing refactoring
   into the same diff as the behavior change.

## 🔄 The loop

### 🔴 Red

Write the test for the next smallest piece of behavior. Run it. Confirm it fails, and read _why_ it
failed — a failure from a missing import isn't the same signal as a failure from wrong logic.

```bash
npm run test:watch          # unit, Vitest
npm run test:e2e            # end-to-end, Playwright, for full-flow behavior
```

### 🟢 Green

Write the minimum implementation to pass that specific test — not the whole feature. Re-run and confirm
green, and confirm nothing else broke.

### 🔁 Refactor

Once green, clean up (naming, duplication, structure) with tests as the safety net — this step is
`code-simplifier`'s job description exactly: behavior-preserving, tests must stay identical pass/fail.

### Repeat

Next smallest piece of behavior, next red.

## 📌 What kind of test, for what kind of behavior

- Pure logic / hooks / server functions (`src/lib/*.functions.ts`) → Vitest unit test.
- Full user flow across routes (login, checkout-like flows) → Playwright, per
  `docs/testing-guidelines.md`.
- A bug fix → the regression test from `diagnosing-bugs`'s workflow _is_ the red step here.

## 📥 Deliverable Format

Not a standalone report — this skill is referenced by `implement-task`/`diagnosing-bugs`/
`code-simplifier`. When run directly, report: test written → red confirmed → implementation → green
confirmed → refactor applied → still green.
