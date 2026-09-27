---
name: review-task
description: Run a strict two-model debate review of a local working-tree diff or PR-in-progress — architecture leaks, security, and full-stack observability (tracing, LoAF) — before anything is proposed for merge. Use after implement-task/code-simplifier finish and before finalize-task, or when the user says "review this properly", "راجع هاد الديف مراجعة كاملة". For posting the equivalent review as real comments on a live GitHub/GitLab PR, use debate-review instead of restating this locally.
---

# Two-Model Debate Review & Observability

A strict quality gate: two models argue over a local diff — architecture leaks, security,
observability — before anything is proposed for merge. `debate-review` is the same method aimed at a
live PR instead of a local diff.

---

## 📌 Non-Negotiable Hard Rules (Playbook Invariants)

1. **Catch Abstraction Leaks:** Reject any code where the presentation layer (UI components) directly triggers database queries, fetches raw APIs, or implements raw business rules. Logic must be encapsulated in custom hooks or domain service layers.
2. **Verify Tracing (E2E Observability):**
   - Ensure every outgoing HTTP/API caller (Axios, Fetch, TanStack Query) propagates the OpenTelemetry standard `traceparent` header to link the client-side user click with downstream database logs (SQLCommenter).
   - Verify that performance monitoring tracks **Long Animation Frames (LoAF)** to detect and log client-side UI thread freezing.
3. **Two-Model Debate Protocol:** Review must run in a two-stage debate format (review-main vs. review-debate) to filter out false positives and ensure only high-confidence, actionable findings are reported.

---

## 🔄 Workflow Steps (The Execution Spine)

### 1️⃣ Step 1: Main Review Pass (`lane: review-main`)

The main reviewer model reads the code changes (PR/MR or working tree diff) and evaluates them against the `/docs` guidelines (architecture, design system, data-fetching, security). Drafts a list of potential findings.

### 2️⃣ Step 2: Debate Challenge Pass (`lane: review-debate`)

A second, distinct reviewer model (running on a different LLM to avoid shared blind spots) challenges the draft findings:

- **Confirm:** If the finding is highly valid and has a clear proof-of-trigger.
- **Refute:** If the code or context makes the failure mode impossible.
- **Downgrade:** If the severity is overestimated.
- **Add:** If the main reviewer missed a critical edge case.
  Findings below the confidence floor are silently discarded.

### 3️⃣ Step 3: Publish Structured Inline Findings

Format all surviving findings as inline comments matching the exact `review-skills` severity levels:

- **`[!CAUTION] P0` (Blocking, Security/Data Integrity):** Critical OWASP breaches (unencrypted localStorage tokens, missing CSRF/XSS sanitization, leaking API keys).
- **`[!WARNING] P1` (Blocking, Clean Code/Bugs/Specs):** Violation of architecture boundaries, missing error handling, broken test cases, or missing `traceparent` propagation.
- **`[!NOTE] P2` (Non-Blocking, Performance/Optimizations):** Missing indices, unoptimized React renders, suboptimal TanStack Query staleTimes, or styling polish.

_Every comment must carry the `<!-- debate-review -->` HTML comment marker for automated tooling parsing._

---

## 📥 Deliverable Format (Strict Template)

When this skill is invoked (`review-task-skill-v4`), return exactly:

1. **Debate Summary Table:**
   | Level  | Count | Focus Areas                        |
   | ------ | ----- | ---------------------------------- |
   | **P0** | N     | [Security, Token leak]             |
   | **P1** | N     | [Abstraction leak, No traceparent] |
   | **P2** | N     | [TanStack Query cache tuning]      |
2. **Inline Comments Draft:** Chronological code-anchored warnings (P0/P1/P2) with the correct `<!-- debate-review -->` tags.
3. **Verdict:** Clear `Approved` or `Request Changes` statement.
