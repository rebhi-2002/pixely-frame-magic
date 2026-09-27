---
name: plan-task
description: Interview and design a single, reasonably-scoped feature before any code is written — grill the requester on business objective, edge cases and constraints, write an SRS spec, then break it into delegatable tickets. Use before starting new feature work, when a request is still vague, or when the user says "plan this", "خطط لهاد الفيتشر". For an initiative too large or ambiguous to interview in one pass, use wayfinder first; once decisions are agreed elsewhere, use to-spec/to-tickets instead of repeating the interview here.
---

# Plan, Grill, & Design

Before a line of code gets written: interview the request properly, write the SRS, and break it into
tickets an implementer can build without guessing. Skipping this step is exactly the "engineering
waste" this project has already paid for once.

---

## 📌 Non-Negotiable Hard Rules (Playbook Invariants)

1. **Never write implementation code or propose libraries immediately.** Your first response must strictly focus on analyzing the problem, design tradeoffs, and querying constraints.
2. **No Blind Guesses:** If any product or architectural requirement is ambiguous, you **must** stop and interview the developer (Grill with Docs).
3. **Respect Local Context:** Always read and integrate the local files in `/docs` (`srs-template.md`, `design-system.md`, `architecture.md`) before proposing a design.

---

## 🔄 Workflow Steps (The Execution Spine)

### 1️⃣ Step 1: Grill with Docs (The Interview)

Before writing a specification, stress-test the developer's request. Ask **exactly 2-3 high-impact, tough product or architectural questions** regarding:

- The business objective, target audience, and success metrics (conversion, performance budgets).
- Edge cases, failure modes, and security requirements.
- Integration constraints with existing `/docs` files.

### 2️⃣ Step 2: Write the SRS Specification (`srs-template.md`)

Once the developer answers, formulate a formal **Software Requirements Specification (SRS)** inside the scratchpad or update `/docs` using your template. You must include:

- **Problem Framing:** The Problem, the User, the Success Criteria (e.g., FCP < 1.5s, zero LoAF), and Constraints.
- **Clean Architecture Boundaries:** Map the layers (Presentation UI vs. Presenter Hooks vs. Domain Zod Schemas vs. Data APIs).
- **Data Caching & Offline Schema:** Define TanStack Query key structures, revalidation rules, and optimistic updates.
- **Reliability Schema:** List failure modes (API downtime, slow network, duplicate requests) and mitigation plans (graceful degradation, exponential backoff retries, idempotency keys).

### 3️⃣ Step 3: Break to Delegatable Tickets

Decompose the final specification into a sequence of atomic, self-contained, independent **Implementation Tickets (Tickets)**. Each ticket must be structured so a separate AI Agent (Aider, Claude Code, Cursor) can build it test-first without needing the full system context:

- **Scope:** Which exact files to create or modify.
- **Invariants:** What rules must remain true (e.g., component must be dumb/unstyled, Zod schema must validate limits).
- **Red-Green Test Case:** The exact Vitest/Playwright tests that will prove completion.

---

## 📥 Deliverable Format (Strict Template)

When this skill is invoked (`plan-task-skill-v4`), return exactly:

1. **Grill Results & Gaps Resolved:** Summary of the architectural interview.
2. **Full SRS Specification Document:** (Grounded in `/docs/srs-template.md`).
3. **The Ticket Backlog:** Organized list of delegatable, self-contained tickets.
4. **Immediate Next Step:** A clear call to action for the developer to approve the plan.
