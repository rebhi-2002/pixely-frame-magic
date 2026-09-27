---
name: claude-md-management
description: Audit and improve this repo's CLAUDE.md (or .claude/CLAUDE.md) and the SKILL.md files under .claude/skills — check for staleness against actual code/docs, redundancy between skills, missing "when to use" triggers, and drift from docs/*. Use when the user asks to audit, clean up, or update CLAUDE.md or the skills folder, after any significant refactor that could make existing skill instructions wrong, or periodically as upkeep (mirrors the /improve-codebase-architecture idea, applied to the skills layer itself).
---

# CLAUDE.md & Skills Management

This project holds its own skills to the same bar it holds its code: no stale references, no
instruction that quietly duplicates another one. This skill is that bar, applied to `.claude/skills/*`
and `CLAUDE.md` themselves.

## 📌 Non-Negotiable Hard Rules

1. **A stale instruction is worse than no instruction.** If `CLAUDE.md` or a skill references a file,
   script, or rule that no longer exists (e.g. a renamed `docs/` file, a removed npm script), fix or
   remove it — don't leave it to mislead the next session.
2. **Every skill needs a real trigger, not just a topic.** A `description` that only says what a skill
   does (and not when to use it) under-triggers — per this project's own skills and the upstream
   `skill-creator` guidance, the description is the entire routing mechanism.
3. **Don't duplicate; cross-reference.** If two skills would give overlapping instructions (e.g.
   `check-security` vs. `security-guidance`, or `code-review` vs. `review-task`), keep one as the source
   of truth and have the other point to it, rather than letting both drift independently.

## 🔄 Workflow Steps

### 1️⃣ Step 1 — Inventory

List every skill under `.claude/skills/*/SKILL.md` and the root `CLAUDE.md`/`AGENTS.md` if present.
For each skill, extract: `name`, `description`, and the files/scripts/docs it references.

### 2️⃣ Step 2 — Check for staleness

For each referenced path (a `docs/*.md`, an npm script, a component), confirm it still exists and still
matches what the skill claims about it. Cross-check npm scripts against the current `package.json`
(`typecheck`, `lint`, `format`, `test`, `test:e2e`, `validate`, `audit` today — verify this list is
current, not assumed).

### 3️⃣ Step 3 — Check for trigger quality

For each `description`, ask: would this fire in the situations a developer actually types? Weak
descriptions ("helps with code") under-trigger; strong ones name concrete trigger phrases and contexts.
Tighten any that are too generic, following the pattern already used across this project's own skills.

### 4️⃣ Step 4 — Check for overlap and redundancy

Map which skills cover similar ground (this repo currently separates `check-security` /
`security-guidance`, `code-review` / `review-task`, and `plan-task` / `frontend-design`). Confirm each
pair's boundary is still stated explicitly in both files — if the boundary line is missing or vague,
add it rather than letting the two skills silently duplicate each other.

### 5️⃣ Step 5 — Propose and apply fixes

List concrete edits (stale reference removed, description tightened, boundary line added) before making
them, mirroring `plan-task`'s "no blind guesses" rule — this is instruction-layer work, treat it with
the same care as a spec change.

## 📥 Deliverable Format

1. **Inventory table:** skill name → what it does → what it references.
2. **Findings:** stale references, weak triggers, unresolved overlaps.
3. **Applied changes:** diff summary of what was edited and why.
