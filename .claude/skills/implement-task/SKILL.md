---
name: implement-task
description: Build a spec'd feature test-first (React/TanStack/Tailwind), following secure defaults, then hand it to the review chain — never committing directly. Use once plan-task/to-spec has produced a clear ticket and it's time to actually write code, or when the user says "implement this", "نفّذ هاد التيكيت". For dispatching a ticket to a separate coding-agent CLI instead of implementing here yourself, use delegate-setup once and claude-delegate (or the matching *-delegate skill) per dispatch, rather than re-deriving the delegation steps inline.
---

# Implement & Delegate

Build a spec'd feature test-first — React, TanStack, Tailwind, secure defaults — and hand it to the
review chain. This skill never commits; producing the diff is the deliverable, review and commit
always belong to a human.

---

## 📌 Non-Negotiable Hard Rules (Playbook Invariants)

1. **Test-First Development (TDD):** Never implement a feature without first writing or updating the corresponding unit tests (Vitest) or E2E tests (Playwright) to guard the behavior.
2. **Secure Defaults (OWASP Top 10):**
   - **XSS Prevention:** Ban direct DOM injections (e.g., `dangerouslySetInnerHTML`) unless protected by a strict sanitizer (like DOMPurify).
   - **Session Security:** Never store raw sensitive state (JWT, PII) in unencrypted client-side `localStorage`. Use secure, programmatic cookies with `HttpOnly, Secure, SameSite=Strict`.
   - **Zero Hardcoded Secrets:** Ban any hardcoded API keys, tokens, or environment secrets. Fetch them dynamically via proxy endpoints.
3. **No Commits:** The implementer agent _never_ commits code directly. Creating the diff is the deliverable; review and commit always belong to the human.

---

## 🔄 Workflow Steps (The Execution Spine)

### 1️⃣ Step 1: Write a Self-Contained Brief

If delegating a sub-task to a separate coding agent CLI (Aider, Claude Code, Cursor) via `delegate-skills`:

- Extract the specific ticket from the plan.
- Write a highly-focused `brief` that contains:
  - Exact target files to modify/create.
  - Necessary dependencies and types.
  - Strict input validation requirements (using Zod) and clean boundaries.
  - The exact test assertions the agent must pass.

### 2️⃣ Step 2: Select the Fleet Lane & Run

Identify the optimal tool for the job. Use the fleet configuration:

- **`lane: ui`** -> Use **Cursor Agent** for styling, animations (Framer Motion), and presentation components.
- **`lane: feature`** -> Use **Aider** or **Claude Code** for complex business logic, Zod validation, and state hook wiring.
- **`lane: tests`** -> Use **Codex** or **Claude Code** for writing robust test mocks and assertions.
  Run the agent CLI headlessly using the corresponding `-delegate` wrapper.

### 3️⃣ Step 3: Run Project Gates & Prepare the Diff

Once the implementer finishes, run the project gates:

- Run Type-checking (`tsc --noEmit`) and Linter (`eslint`).
- Run the test suite (`vitest run`).
  Verify the diff manually and present a concise summary of touched files to the developer for commit landing.

---

## 📥 Deliverable Format (Strict Template)

When this skill is invoked (`implement-task-skill-v4`), return exactly:

1. **Brief Generated for Delegate:** (If using `delegate-skills`).
2. **Summary of Touched Files:** A clean list of modified files.
3. **Gate Status:** Build, lint, and test suite execution logs (All must be Green).
4. **Diff Link:** Prompt the developer to review `git diff` and land the commit.
