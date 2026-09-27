---
name: code-review
description: Self-review a diff against this repo's own standards (docs/standards, docs/architecture, docs/data-fetching-rules.md) and against the original spec/ticket, immediately after writing or changing code — before commit, before check-security, and before handing off to the heavier two-model review-task gate. Use whenever the user says "review this", "code review", or "راجع الكود", or right after implement-task produces a diff.
---

# Code Review

The fast, single-pass lens — `review-task` is the slow, two-model debate gate for PRs. Run this one
first; it should remove most of what `review-task` would otherwise have to flag.

## 📌 Non-Negotiable Hard Rules

1. **Review the diff against two things, not one:** the project's own standards
   (`docs/standards/code-style.md`, `docs/standards/design-tokens-policy.md`,
   `docs/data-fetching-rules.md`, `docs/architecture/*`) **and** the original spec/ticket the code was
   supposed to satisfy. A change can be clean code and still be the wrong change.
2. **No rubber-stamping.** If there is nothing to flag, say so explicitly with what you checked — don't
   pad the review with cosmetic nitpicks to look thorough.
3. **Never approve your own P0/P1 findings away.** If this skill is run by the same agent that wrote the
   code, findings still get reported, not silently absorbed as "fixed later."

## 🔄 Workflow Steps

### 1️⃣ Step 1 — Establish the baseline

Read the ticket/spec (or the PR description) and the relevant `/docs` files for the area touched
(routing, data-fetching, design tokens, architecture boundaries). Don't review against memory —
re-read the current file.

### 2️⃣ Step 2 — Read the diff in layers

- **Correctness:** does it do what the spec asked, including edge cases and empty/error states
  (this project leans on `EmptyState`/`EmptyIllustration` — check the right one is used).
  For anything with data/validation/error handling, or state that mutates, run `check-security` before
  this step finishes, not after.
- **Architecture boundaries:** presentation components stay dumb; data access lives in hooks or
  `src/lib/*.functions.ts`, matching `docs/architecture/api-boundary.md`.
- **Data fetching:** TanStack Query keys, staleTime, and invalidation match
  `docs/data-fetching-rules.md`.
- **Style & tokens:** matches `docs/standards/code-style.md` and
  `docs/standards/design-tokens-policy.md` (no raw hex/spacing values where a token exists).
- **Tests:** new behavior has a Vitest unit test or a Playwright e2e test guarding it, per
  `docs/testing-guidelines.md`.

### 3️⃣ Step 3 — Classify findings

Use the same P0/P1/P2 scale as `review-task` and `check-security` so severities are consistent across
every skill in this repo:

- **P0:** wrong behavior, broken build, security issue (defer detail to `check-security`).
- **P1:** architecture leak, missing test for new behavior, spec mismatch.
- **P2:** style/naming/polish.

## 📥 Deliverable Format

1. **What I checked:** the spec/ticket and the specific `/docs` files used as the standard.
2. **Findings:** P0/P1/P2, each anchored to `file:line` with the concrete issue and a suggested fix.
3. **Verdict:** `Ready for review-task` / `Needs another pass` — never `Approved to merge` (that stays
   `finalize-task`'s call, after CI is green).
