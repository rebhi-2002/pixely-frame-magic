---
name: remember
description: Save a compressed summary of what matters to memory.md at the end of a session, and restore it at the start of the next one, confirming it before continuing. Use "remember save" at the end of any session, and "remember restore" at the very start of a new one — lighter and more routine than handoff, which is for a deliberate, detailed handoff of a specific long task to a specific continuer.
---

# Remember

An AI has no memory between sessions — every new chat starts blank, even in this same tool. `CLAUDE.md`
covers what's true about the _project_; this covers what was true about the _last session_ — where
things were left, what was decided in conversation that isn't written anywhere else yet.

## 📌 How this differs from handoff

`remember` → routine, every session, short: a compressed memory.md restored automatically at session
start.
`handoff` → deliberate, for a specific long task or a specific continuer (a teammate, a delegated CLI),
detailed: goal, done, tried-and-rejected, next step.

Use `handoff`'s deliverable format _inside_ a `remember save` when the session being closed was long
enough to need it — they compose rather than compete.

## 📌 Non-Negotiable Hard Rules

1. **Compress, don't transcribe.** `memory.md` holds what actually matters for next time — decisions
   made, where things stand — not a replay of the conversation.
2. **Restore, then confirm before acting.** At session start, read `memory.md` back and state what it
   says was true, and ask before assuming it's still accurate — code may have changed since, or the
   person may be starting something unrelated today.
3. **Never treat `memory.md` as more authoritative than the actual repo state.** If it says a feature was
   "in progress" but `git log`/`docs/scope/` show it shipped, trust the repo and correct the memory file.

## 🔄 Workflow Steps

### `remember save` — end of session

1. Compress into a few lines: what was worked on, what got decided (especially anything decided in
   conversation that isn't written into a spec/doc yet), where it was left.
2. Write/overwrite `memory.md` at the project root — this file holds only the _latest_ snapshot, it's
   not an append-only log (that's what `CHANGELOG.md`/`docs/operations/` are for).

### `remember restore` — start of session

1. Read `memory.md`.
2. State back what it says, plainly: "last session, X was in progress, Y was decided, next step was Z."
3. Confirm against current reality where cheap to check (`git status`, `docs/scope/`) before treating it
   as still accurate.
4. Only then continue with the actual request.

## 📥 Deliverable Format

**Save:** the written `memory.md` content.
**Restore:** the restated summary, plus anything found to have changed since it was written.
