---
name: project-atlas
description: Scan the repo's root files, docs/, .github/, .claude/, Shared/, and any other top-level or dot-folder, then create or refresh PROJECT-ATLAS.md — a living map of what every file/folder is for, when to read it, and when to write to it — so a brand-new chat or a different AI tool never has to be told file names by hand. Use at the start of any repo-wide task, whenever a file or folder shows up that PROJECT-ATLAS.md doesn't account for, or when the user says "حدّث الخريطة", "index the project", "atlas this repo".
---

# Project Atlas

`docs/README.md` already indexes `docs/*` by category and convention instead of by filename — this
extends the same instinct to the rest of the repo (root, dot-folders, `Shared/`), so a brand-new chat
never has to be told file names by hand, and adding a file doesn't quietly go undocumented.

## 📌 The key idea: index conventions, not filenames

A folder like `docs/operations/` or `.claude/skills/` grows by a predictable pattern
(`YYYY-MM-DD-<slug>.md`, `<skill-name>/SKILL.md`). Document **the pattern once** — new files that follow
it don't make the atlas stale. Only genuinely new top-level files, new folders, or files that break the
pattern need a manual atlas entry. This is what makes the map survive new files being added without
constant re-editing.

## 📌 Non-Negotiable Hard Rules

1. **Never invent a purpose you didn't verify.** Read enough of each file (frontmatter, first heading,
   first paragraph) to state its real purpose — don't guess from the filename alone.
2. **Mark authority explicitly.** For any topic covered in more than one place (e.g. backend endpoint
   status appears in both `README.md` and `docs/api/frontend-integration-status.md`), state which one is
   the actual source of truth, the same way this project's own `README.md` already does
   ("مصدر الحقيقة لحالة كل endpoint").
3. **Flag orphaned/raw material honestly.** Folders like `Shared/` or `.ChatGPT_Conversation/` that hold
   working notes rather than maintained docs get labeled as such — don't present a raw chat export as if
   it were an authoritative spec.
4. **Never regenerate silently over unrelated edits.** If `PROJECT-ATLAS.md` needs updating, show what
   changed (new entries, changed authority notes) rather than silently overwriting the whole file.

## 🔄 Workflow Steps

### 1️⃣ Step 1 — Walk the tree

List root-level files/folders and everything under `docs/`, `.github/`, `.claude/`, `Shared/`, and any
other dot-folder, excluding build/dependency output (`node_modules`, `dist`, generated files like
`src/routeTree.gen.ts`).

### 2️⃣ Step 2 — Classify each item

For each file: read enough to state one-line purpose, then decide:

- **Named entry** (root docs, config files, genuinely one-off files) → gets its own row.
- **Pattern entry** (a folder that grows by convention) → gets one row describing the naming pattern and
  purpose, not one row per file.
- **Raw/unmaintained** (chat exports, scratch notes, zipped bundles) → gets one row saying so plainly.

### 3️⃣ Step 3 — Resolve authority conflicts

Where the same fact could be claimed by two files, state which one wins, mirroring the project's
existing convention of calling one file out as "مصدر الحقيقة."

### 4️⃣ Step 4 — Write / refresh PROJECT-ATLAS.md

Update the root `PROJECT-ATLAS.md`. If it already exists, diff against the current tree: report new
files/folders not yet covered by any named or pattern entry, and any named entry whose file no longer
exists.

### 5️⃣ Step 5 — Confirm CLAUDE.md still points here

`CLAUDE.md` should tell every session to read `PROJECT-ATLAS.md` first and to run this skill if the atlas
looks stale (an unfamiliar top-level file/folder appears). If that instruction is missing or altered,
flag it — the whole mechanism depends on that one link.

## 📥 Deliverable Format

1. **New/changed entries** since the last atlas version (or "first run" if none existed).
2. **Authority notes added or changed.**
3. **Anything flagged as raw/unmaintained**, with a one-line reason.
4. **Confirmation** that `CLAUDE.md` still references this atlas correctly.
