---
name: wayfinder
description: Chart a large, ambiguous effort (a whole feature area, a migration, a redesign) as a map of the open decisions it actually depends on, then settle them one by one — used before plan-task when the ask is too big or vague to interview in one pass. Use when the user describes a big initiative without a clear shape yet ("redo the whole dashboard flow", "rethink how courses work"), or says "help me map this out", "شو الخطوات الكبيرة هون".
---

# Wayfinder

For when an ask is too big or too vague for `plan-task` to interview in one pass — a redesign, a
migration. This charts the decisions the effort actually depends on, and settles them one at a time,
before anything gets spec'd.

## 📌 How this differs from plan-task

`plan-task` interviews and specs **one** feature that's already reasonably scoped. `wayfinder` runs
first when the scope itself is the unknown — a redesign, a migration, "rethink how X works" — and its
output (a settled map of decisions) becomes the input `plan-task` then specs one piece at a time.

## 📌 Non-Negotiable Hard Rules

1. **A map is decisions, not tasks.** Don't jump to a ticket list — first identify the handful of real
   decisions (architecture direction, what stays vs. what's rebuilt, data model implications) that
   everything else depends on.
2. **Don't fake certainty.** If a decision genuinely can't be settled without more information (backend
   capability, a design review), mark it open rather than picking an answer to look finished.
3. **Respect the backend reality check from `academia-conventions`** — any decision that assumes an
   endpoint or capability the real backend doesn't have yet must say so explicitly on the map.

## 🔄 Workflow Steps

### 1️⃣ Step 1 — Surface the decisions

Read the relevant `/docs` (architecture, product) and list the 4–8 decisions that actually shape the
effort (not implementation details) — e.g. "does this migrate existing mock data or start clean?",
"does this need a new route group or extend an existing one?".

### 2️⃣ Step 2 — Draw the map

Present decisions with their dependencies (which ones block which), not a flat list — a decision about
data model usually blocks decisions about UI states.

### 3️⃣ Step 3 — Settle them one at a time

For each decision: give the tradeoffs plainly, recommend one if there's a clear best answer, or ask the
2-3 sharpest questions if not (borrowing `plan-task`'s "Grill with Docs" discipline). Record the answer
before moving to the next.

### 4️⃣ Step 4 — Hand off

Once every decision on the map is settled (or explicitly parked as open), hand the settled map to
`plan-task` to spec the first slice, and `to-tickets` to break it down.

## 📥 Deliverable Format

1. **Decision map:** decisions + dependencies between them.
2. **Settled answers:** one per decision, with the reasoning.
3. **Open items:** anything genuinely blocked on outside information, named explicitly.
