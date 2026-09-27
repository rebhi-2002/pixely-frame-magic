---
name: handoff
description: Write up a long session (context, decisions made, dead ends already tried, what's left) so another agent session or a teammate can continue without re-discovering everything. Use when a session is getting long and about to hit context limits, when switching between delegate implementers mid-task, or when the user says "write a handoff", "لخصلي وين وصلنا", or "someone else will continue this".
---

# Handoff

A dead end tried and rejected is worth as much as a step finished — maybe more, since it's the part
that saves the next session from repeating it. This skill exists so that part doesn't get lost.

## 📌 Non-Negotiable Hard Rules

1. **Dead ends are as valuable as progress.** If an approach was tried and rejected, say so explicitly
   with why — otherwise the next session wastes time re-trying it.
2. **State the actual current state, not the intended one.** "Tests pass" only if you just ran them and
   confirmed it, not because they passed earlier in the session.
3. **Point to real artifacts** (files touched, branch name, ticket/spec doc) rather than re-explaining
   everything in prose — a handoff should be fast to resume from, not a full replay of the session.

## 🔄 Workflow Steps

### 1️⃣ Step 1 — Snapshot the current state

```bash
git status && git diff --stat
npm run typecheck   # and note pass/fail honestly
```

Note the branch, what's committed vs. still working-tree only, and current gate status.

### 2️⃣ Step 2 — Recap the goal and the plan

One or two lines on the original ask, and which step of the plan (if `plan-task`/`wayfinder` produced
one) the session is currently on.

### 3️⃣ Step 3 — List what's done, what's left, what was tried and rejected

Three short lists. The "tried and rejected" list is the one people forget to write and the one that
saves the most time for whoever continues.

### 4️⃣ Step 4 — Name the next concrete action

Not "keep implementing the feature" — the actual next step ("run `npm run test:e2e` for the checkout
flow and fix the failing assertion in `e2e/login.spec.ts`").

## 📥 Deliverable Format

```markdown
## Handoff — <short title>
**Branch:** <name>            **Gate status:** typecheck ✅/❌, tests ✅/❌
**Goal:** <one line>
**Done:** <bullets>
**Tried and rejected:** <bullets, each with why>
**Left to do:** <bullets>
**Next concrete step:** <one specific action>
```
