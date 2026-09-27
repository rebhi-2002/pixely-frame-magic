---
name: to-spec
description: Turn an already-agreed conversation or set of decisions (from grilling, wayfinder, or a Slack/meeting recap) into a written SRS-style spec in this repo's docs/srs-template.md format — used when the interviewing/deciding is already done and only the write-up is missing. Use when the user says "write this up as a spec", "حولها لسبك", or pastes a decided conversation and wants a formal document out of it.
---

# To Spec

For when the deciding already happened somewhere else — a `wayfinder` map, a meeting — and only the
write-up into this repo's real SRS template is missing.

## 📌 How this differs from plan-task

`plan-task` does the interviewing _and_ the write-up together for one reasonably-scoped feature.
`to-spec` is the write-up step alone, for when the deciding already happened elsewhere (a `wayfinder`
map, a meeting, a Slack thread) and just needs to become a real document.

## 📌 Non-Negotiable Hard Rules

1. **Don't introduce new decisions.** If the source conversation left something genuinely undecided,
   mark it as an open question in the spec — don't quietly decide it while writing.
2. **Use the repo's actual template.** Follow `docs/srs-template.md`'s structure, not a generic SRS
   shape, so specs stay consistent across the project.
3. **Cite where each requirement came from** (which part of the conversation/decision) when it's not
   obvious — a spec that can't be traced back to a decision invites disputes later.

## 🔄 Workflow Steps

### 1️⃣ Step 1 — Extract the decisions

Read the source material and pull out: the problem being solved, who it's for, the concrete
requirements agreed, any constraints (performance, security, backend reality per
`academia-conventions`) that were mentioned.

### 2️⃣ Step 2 — Fill the template

Write into `docs/srs-template.md`'s structure: Problem, User, Success Criteria, Constraints,
Architecture boundaries touched, Data/caching implications, Failure modes — matching the depth
`plan-task` already uses for its own specs.

### 3️⃣ Step 3 — Flag gaps honestly

Anything the source conversation didn't cover goes in an explicit "Open Questions" section rather than
being filled in with an assumption.

### 4️⃣ Step 4 — Hand off

Once the spec is confirmed accurate against the source conversation, hand it to `to-tickets` for
breakdown, or `implement-task` directly if it's small enough.

## 📥 Deliverable Format

1. The filled spec, in `docs/srs-template.md` format, saved under the appropriate `docs/` location.
2. **Open Questions** list, separated clearly from decided requirements.
3. **Traceability note:** which parts of the source conversation each major requirement came from.
