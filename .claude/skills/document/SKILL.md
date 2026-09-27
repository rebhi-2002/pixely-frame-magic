---
name: document
description: Draft the human-facing prose about a change — a PR description, a CHANGELOG entry, a release note, or a postmortem — from the real commits and diff, never from memory of what was intended. Use once a change is ready to open as a PR or land, or when the user says "write the PR description", "اكتب الـ changelog", "document this change" (not to be confused with documenting how a system works, which is a docs/ update, not this skill).
---

# Document

The gap this fills: `commit-commands` writes commit messages, `finalize-task` gates the release, but
nothing owns writing the actual prose a reviewer or a user reads about *what changed and why*. This
does — and only that; it never touches code, tests, or specs.

## 📌 Non-Negotiable Hard Rules

1. **Draft from the real diff, not from what was supposed to happen.** Read the actual commits/diff for
   this change — a plan can drift during implementation, and the write-up must reflect what shipped.
2. **Write to the right place, in this project's existing format.** A CHANGELOG entry goes into
   `CHANGELOG.md` as a new top entry (append-only, per `PROJECT-ATLAS.md`'s convention) — never rewrite
   history there. A postmortem or ops note follows the `docs/operations/YYYY-MM-DD-<slug>.md` pattern.
3. **No code changes as a side effect.** If writing the PR description surfaces something that looks
   wrong in the code, flag it back to `code-review`/`check-security` — don't fix it here.

## 🔄 Workflow Steps

### 1️⃣ Step 1 — Establish what actually shipped

```bash
git log <base>..HEAD --oneline
git diff <base>..HEAD --stat
```

### 2️⃣ Step 2 — Pick the form (or ask if genuinely unclear)

- **PR description:** what changed, why, how to verify, anything a reviewer needs flagged.
- **CHANGELOG entry:** one or two lines, user-facing language, added as a new top entry.
- **Release note:** grouped by area, for people who don't read commit logs.
- **Postmortem:** what broke, root cause (pull this from `diagnosing-bugs`'s findings if this change was
  a fix), what changed to prevent recurrence — written into `docs/operations/`.

### 3️⃣ Step 3 — Draft in this project's voice

Match the direct, concrete tone already in `CHANGELOG.md`/`README.md` — no marketing language, no vague
"various improvements."

### 4️⃣ Step 4 — Write to the right file

Append (don't overwrite existing entries), following the exact pattern `PROJECT-ATLAS.md` documents for
that file/folder.

## 📥 Deliverable Format

The drafted prose itself, plus the exact file/location it was written to (or is proposed for, if the PR
description is meant for GitHub rather than a file in-repo).
