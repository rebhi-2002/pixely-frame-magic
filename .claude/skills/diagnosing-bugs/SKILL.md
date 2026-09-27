---
name: diagnosing-bugs
description: Systematically diagnose a hard bug starting from a failing reproduction, before writing any fix — isolate the actual cause instead of pattern-matching a plausible one. Use whenever the user reports a bug with a repro (a failing test, a specific broken flow, a Sentry error), or says "diagnose this", "kh فيه مشكلة", "why is this happening", especially when a first guess already failed to fix it.
---

# Diagnosing Bugs

A fix built on a guessed cause tends to paper over the symptom and leave the real bug waiting. This
skill exists so the cause gets found before anything gets changed.

## 📌 Non-Negotiable Hard Rules

1. **No fix without a reproduction.** If the bug can't be reproduced (locally, in a test, or from
   Sentry/`instrument.client.ts` telemetry), the first job is making it reproducible — not guessing at a
   patch.
2. **State the hypothesis before testing it.** Write down what you think is happening and what evidence
   would confirm or rule it out, then go look — don't silently try random changes until something works.
3. **Never declare "fixed" without confirming the original repro now passes**, plus a regression test
   added so it stays fixed (feeds `code-simplifier`/`code-review`'s test-coverage expectations).

## 🔄 Workflow Steps

### 1️⃣ Step 1 — Pin down the reproduction

Get (or build) the smallest reliable way to trigger it: a failing Vitest/Playwright case, exact steps in
the app, or a Sentry event with a stack trace and breadcrumbs. If it's intermittent, note the pattern
(specific route, specific data shape, specific timing) rather than calling it random.

### 2️⃣ Step 2 — Narrow the search space

- Bisect: does it happen on `main`/base branch too, or only after a specific recent change (`git log`,
  `git bisect` if needed)?
- Isolate the layer: UI component, hook, TanStack Query cache behavior, server function
  (`src/lib/*.functions.ts`), or actual backend response — check each boundary per
  `docs/architecture/api-boundary.md` rather than assuming which layer is at fault.
- Check the obvious project-specific traps first: stale/misconfigured Query key or `staleTime`
  (`docs/data-fetching-rules.md`), a route guard that's client-only when it needed to be server-checked,
  a `.env` value mismatched between `.env` and `.env.production`.

### 3️⃣ Step 3 — Form and test one hypothesis at a time

State it, predict what should happen if true, check the prediction. If wrong, discard it explicitly and
move to the next rather than layering a second guess on top of the first.

### 4️⃣ Step 4 — Fix at the actual cause

Once confirmed, fix the root cause, not just the symptom visible in the repro. Add a regression test
that would have caught this. Re-run the original repro to confirm it's actually gone.

## 📥 Deliverable Format

1. **Root cause:** stated plainly, with the evidence that confirmed it.
2. **Fix:** what changed and why it addresses the cause, not just the symptom.
3. **Regression test added:** file and what it now guards against.
