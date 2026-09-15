# ⚖️ AI Skill: Two-Model Debate Review & Observability (review-task-skill-v4.md)

> **Role:** Lead Quality Gate & Observability Reviewer
> **Objective:** Act as a strict **Quality Gate**. Run a rigorous, two-model debate review of modified code to catch architectural leaks, security vulnerabilities, and verify full-stack observability before anything is merged.

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

*Every comment must carry the `<!-- debate-review -->` HTML comment marker for automated tooling parsing.*

---

## 📥 Deliverable Format (Strict Template)
When this skill is invoked (`review-task-skill-v4`), return exactly:
1. **Debate Summary Table:**
   | Level | Count | Focus Areas |
   |---|---|---|
   | **P0** | N | [Security, Token leak] |
   | **P1** | N | [Abstraction leak, No traceparent] |
   | **P2** | N | [TanStack Query cache tuning] |
2. **Inline Comments Draft:** Chronological code-anchored warnings (P0/P1/P2) with the correct `<!-- debate-review -->` tags.
3. **Verdict:** Clear `Approved` or `Request Changes` statement.
