---
name: to-tickets
description: Split a finished spec (from to-spec or plan-task) into small, atomic, independently-implementable tickets an agent or developer can build test-first, one at a time. Use once a spec exists and needs breaking down, or when the user says "break this into tickets", "قسمها لمهام", or has a spec doc ready to hand to implement-task / a delegate lane.
---

# To Tickets

Splits a finished spec into tickets small enough that an implementer — here or delegated — can build
one test-first, without needing this whole conversation's context.

## 📌 Non-Negotiable Hard Rules

1. **Every ticket is self-contained.** It must name its exact target files, the types/schemas it depends
   on, and the test assertions it must pass — an implementer with no chat history should be able to work
   from it alone, per `implement-task`'s delegation rules.
2. **Order matters — surface dependencies explicitly.** If ticket B needs ticket A's types to exist
   first, say so; don't hand out a flat unordered list when there's a real dependency chain.
3. **No ticket skips the truth rule or security by default.** Any ticket touching user-facing data or
   auth must restate the relevant constraint from `academia-conventions`/`check-security` inline, not
   assume the implementer will remember it from the spec alone.

## 🔄 Workflow Steps

### 1️⃣ Step 1 — Read the spec fully

Confirm it's actually finished (no unresolved "Open Questions" that block a ticket) before splitting —
an unfinished spec produces tickets that contradict each other.

### 2️⃣ Step 2 — Find the natural seams

Split along architecture boundaries (`docs/architecture/api-boundary.md`): a server function/schema
ticket, a hook/data-layer ticket, a presentation-component ticket, a test-coverage ticket — rather than
splitting by arbitrary size.

### 3️⃣ Step 3 — Write each ticket to the same template

```markdown
### Ticket: <name>

**Files:** create/modify — exact paths
**Depends on:** <ticket name or "none">
**Requirements:** <from the spec, restated concretely>
**Constraints carried forward:** <security/truth-rule/architecture rules that apply>
**Test assertions it must pass:** <concrete, not "add tests">
```

### 4️⃣ Step 4 — Sequence and hand off

Order tickets by dependency. Hand the queue to `implement-task`, or to `delegate-setup`'s fleet lanes if
multiple implementers will work them in parallel.

## 📥 Deliverable Format

1. **Ticket list**, each in the template above.
2. **Dependency order** (a simple sequence or small graph).
3. **Anything the spec couldn't support a ticket for**, flagged back to `to-spec`/`plan-task` rather than
   guessed.
