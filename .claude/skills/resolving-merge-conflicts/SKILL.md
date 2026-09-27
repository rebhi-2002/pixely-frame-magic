---
name: resolving-merge-conflicts
description: Finish a git merge or rebase conflict hunk by hunk, understanding both sides' intent before picking a resolution, instead of blindly taking "ours" or "theirs". Use whenever a merge/rebase has left conflict markers, or the user says "resolve these conflicts", "فيه conflict عالبرانش", or pastes conflict-marked code.
---

# Resolving Merge Conflicts

A conflict resolved by blindly taking `--ours` or `--theirs` is a conflict resolved wrong half the
time. This skill resolves each hunk by understanding both sides' intent first.

## 📌 Non-Negotiable Hard Rules

1. **Never resolve a hunk you don't understand.** If it's unclear what one side was trying to achieve,
   check that commit's message/diff context before choosing — don't guess from the marker text alone.
2. **Never blanket `git checkout --ours` / `--theirs` across a whole file** unless one side is genuinely
   a full rewrite of the other and that's confirmed, not assumed.
3. **Re-run the project gates after resolving, always.** A conflict resolution that "looks right" can
   still be a syntax break or a logic error — `npm run typecheck` and the relevant tests are the actual
   proof, not a visual read of the merged diff.
4. **Never resolve away generated files by hand.** `src/routeTree.gen.ts` and similar generated files
   should be regenerated after resolving their real inputs, not hand-merged (see `typescript-lsp`).

## 🔄 Workflow Steps

### 1️⃣ Step 1 — Get the full picture per conflicted file

```bash
git status                      # list conflicted files
git log --oneline --left-right --merge -- <file>   # commits touching this file on both sides
```

Read what each side changed and _why_ (commit message, surrounding diff), not just the marker content.

### 2️⃣ Step 2 — Resolve hunk by hunk

For each `<<<<<<<` ... `=======` ... `>>>>>>>` block:

- If the two sides touch unrelated parts of the same function/region: keep both changes, merged
  correctly, not just concatenated.
- If they genuinely conflict on the same logic: decide based on which is correct given current intent
  (check the ticket/spec if one exists), not which is "easier."
- If unsure, surface it rather than guessing — flag the hunk and ask, especially for anything touching
  auth, data validation, or the truth-rule areas from `academia-conventions`.

### 3️⃣ Step 3 — Regenerate what shouldn't be hand-merged

For generated files, resolve the real source, then regenerate (e.g. re-run the router's codegen for
`routeTree.gen.ts`) instead of manually merging the generated output.

### 4️⃣ Step 4 — Verify before marking resolved

```bash
npm run typecheck
npm run test
git add <file>   # only after verifying, not before
```

## 📥 Deliverable Format

1. **Conflicts resolved:** file list, with a one-line note per file on which intent(s) were kept.
2. **Anything flagged for human judgment:** hunks not resolved automatically, with why.
3. **Verification result:** typecheck/test status after resolution.
