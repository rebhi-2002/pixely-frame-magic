---
name: code-simplifier
description: Simplify and refine already-working code for clarity and consistency with this repo's style, without changing behavior — dead code removal, reducing nesting, consolidating duplicated logic, renaming for clarity. Use after a feature works and tests are green but before code-review/finalize-task, or whenever the user asks to "clean this up", "simplify", or "refactor" without changing what it does.
---

# Code Simplifier

Working code, made easier for the next reader — human or agent — to understand, with zero behavior
change. Tests must pass exactly the same before and after, or this wasn't a simplification.

## 📌 Non-Negotiable Hard Rules

1. **Behavior-preserving only.** This skill never changes what the code does — only how it's expressed.
   If a "simplification" would change output, error handling, or an edge case, that's a feature change
   and belongs to `implement-task`, not here.
2. **Tests are the proof, not a formality.** Run the relevant Vitest/Playwright suite before and after;
   if anything that passed before now fails, the change is wrong regardless of how much cleaner the code
   looks.
3. **Don't simplify past the project's own conventions.** Matching `docs/standards/code-style.md` and
   the existing patterns in the surrounding file beats a "more elegant" pattern the rest of the codebase
   doesn't use — consistency wins over cleverness.
4. **Small, reviewable diffs.** Simplify one function/module/concern at a time rather than sweeping the
   whole file, so `code-review` can actually evaluate what changed and why.

## 🔄 Workflow Steps

### 1️⃣ Step 1 — Establish the safety net

```bash
npm run test        # or a scoped vitest run for the touched files
npm run typecheck
```

Confirm current state is green before touching anything. If it isn't, stop — that's a bug fix, not a
simplification target.

### 2️⃣ Step 2 — Look for the concrete smells, not vague "improvement"

- **Dead code:** unused exports, unreachable branches, commented-out blocks left behind.
- **Duplicated logic:** the same validation/transformation written more than once — consolidate into one
  hook or utility in `src/lib`, consistent with the shared-component-first rule in
  `academia-conventions`.
- **Deep nesting:** early returns / guard clauses over pyramid-of-doom conditionals.
- **Unclear naming:** a variable or function whose name doesn't say what it holds/does — rename for
  clarity, using `typescript-lsp`'s find-all-usages step so nothing is missed.
- **Prop drilling / oversized components:** a component doing presentation *and* data-fetching *and*
  business logic — split along `docs/architecture/api-boundary.md` boundaries.

### 3️⃣ Step 3 — Apply changes incrementally, re-verifying each step

After each meaningful chunk of simplification, re-run the test suite for the touched area. Don't batch
ten unrelated simplifications and test once at the end — isolate what broke, if anything, immediately.

### 4️⃣ Step 4 — Final verification

```bash
npm run validate    # typecheck + lint + format:check + test, must still be green
```

## 📥 Deliverable Format

1. **Smells addressed:** list, each with before/after in one line.
2. **Test result:** identical pass/fail set before and after (call out explicitly if anything changed).
3. **Scope note:** what was deliberately left alone (e.g. "not touching X — behavior-adjacent, out of
   scope for a pure simplification pass").
