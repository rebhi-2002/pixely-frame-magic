---
name: scope
description: Keep a living, coarse scope of what's being built in docs/scope/ — plan a new product slice, enroll one named feature, or reconcile the queue after something ships. Use to seed WHAT gets built next (wayfinder settles bigger open decisions; plan-task specs one item once scope names it), or when the user says "شو التالي", "what's next", "add this to the roadmap".
---

# Scope

None of this project's other planning skills keep a running answer to "what's next after this ships" —
`wayfinder` settles big ambiguous decisions once, `plan-task` specs one already-named feature. This is
the queue that sits between them: coarse, current, and reconciled against what's actually shipped rather
than what was once planned.

## 📌 How this differs from wayfinder and plan-task

`wayfinder` → settles open decisions for something too big/ambiguous to spec directly.
`scope` → keeps the ongoing list of *what* to build next, coarse-grained, always current.
`plan-task`/`to-spec` → takes one item scope has named and turns it into a real spec + tickets.

## 📌 Non-Negotiable Hard Rules

1. **Coarse, not detailed.** An entry here is a name and a one-line intent, not a spec — detail belongs
   in `plan-task`'s output once an entry is picked up.
2. **Reconcile against reality, not memory.** When something ships, confirm it against the actual
   merged diff/PR before marking it done — don't mark a scope entry complete from intent alone.
3. **Never silently drop an entry.** Something descoped gets marked as such with a reason, not deleted —
   the history of "we decided not to do X, here's why" is worth keeping.

## 🔄 Workflow Steps

### 1️⃣ Step 1 — Locate or start the living scope

`docs/scope/` holds one running file per active product area. If it doesn't exist yet for the area in
question, start it plainly: a short list, not a template with empty sections to fill later.

### 2️⃣ Step 2 — Enroll or reconcile

- **Enrolling a named feature:** add a one-line entry with intent and rough size.
- **Reconciling after a ship:** check `git log`/merged PRs since the last reconciliation, mark shipped
  entries done, and note anything shipped that scope never named (so the queue reflects reality).
- **Planning the next slice with no argument given:** look at what just shipped, what's still open, and
  propose the next 1–3 entries — don't dump the whole backlog at once.

### 3️⃣ Step 3 — Hand off

Once an entry is picked up for real work, hand it to `plan-task` (or `wayfinder` first, if it turns out
to be bigger than scope's one-line entry implied).

## 📥 Deliverable Format

```markdown
## docs/scope/<area>.md
- [x] <shipped entry> — reconciled against <PR/commit>
- [ ] <open entry> — <one-line intent>
- [~] <descoped entry> — why
```
