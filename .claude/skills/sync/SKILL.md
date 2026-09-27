---
name: sync
description: The last step after any change is complete, around merge — reconcile docs/scope/ against what actually shipped, flag any spec in docs/specs/ that the change made stale, and make surgical single-line updates to CLAUDE.md/PROJECT-ATLAS.md if something they describe changed. Use right after finalize-task/commit-commands land a change, or when the user says "sync the docs", "حدّث الملفات المرافقة". Never rewrites a whole file or curated prose — one owned line at a time.
---

# Sync

`project-atlas` is the heavy, occasional rescan for when something appears that doesn't fit any known
pattern. `sync` is the light, routine pass that runs after _every_ merge — small, surgical, and
specifically about keeping the durable files honest with what just happened, not about discovering new
structure.

## 📌 How this differs from project-atlas

`project-atlas` → full-tree scan, run when a new file/folder breaks every known pattern.
`sync` → targeted, one-change-sized update, run after every merge as routine hygiene.

If `sync` finds something project-atlas-sized (a genuinely new top-level thing, not just a fact that
changed), it hands off to `project-atlas` rather than trying to absorb it.

## 📌 Non-Negotiable Hard Rules

1. **Surgical only.** Add a line, correct a line this skill owns — never rewrite a whole section or
   touch curated prose someone wrote by hand (a design rationale in `README.md`, for instance).
2. **Reconcile against evidence, not intent.** Check the actual merged diff before marking a
   `docs/scope/` entry done or a `docs/specs/*` file stale — same discipline as `scope`'s own rule.
3. **Never silently delete a stale spec.** Mark it stale with why, don't remove it — someone may still
   need the history of what was originally speced.

## 🔄 Workflow Steps

### 1️⃣ Step 1 — Confirm what just landed

```bash
git log -1 --stat
```

### 2️⃣ Step 2 — Reconcile the scope

Hand off to `scope`'s reconciliation step for anything the merged change completes or partially
completes.

### 3️⃣ Step 3 — Check specs for staleness

If `docs/specs/*` (from `architect`/`plan-task`/`to-spec`) described something this change altered
differently than speced, flag that spec file as stale with a one-line note — don't silently leave it
looking current.

### 4️⃣ Step 4 — Touch CLAUDE.md / PROJECT-ATLAS.md only if a described fact changed

If the merged change added a file/folder that already matches a documented pattern in
`PROJECT-ATLAS.md` → nothing to do, the pattern already covers it. If it changed something
`PROJECT-ATLAS.md` states as a fact (e.g. which file is the authority for a topic) → update that one
line. If it's genuinely new structure → stop and hand off to `project-atlas` instead of guessing at a
one-line fix.

## 📥 Deliverable Format

1. **Scope reconciled:** entries marked done/still-open.
2. **Specs flagged stale**, if any, with why.
3. **Lines changed** in `CLAUDE.md`/`PROJECT-ATLAS.md`, if any — or "handed off to project-atlas" if the
   change was bigger than a surgical fix.
