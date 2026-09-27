---
name: babysit-pr
description: Work a live PR/MR's review rounds end to end — harvest every reviewer thread (debate-review, CodeRabbit, human), verify each finding against the code, fix real ones, reply with evidence, resolve, and re-trigger the next review round, until the PR meets the merge gate. Use when the user says "babysit this PR", "خلص التعليقات عالـ PR", or wants review rounds worked automatically rather than one comment at a time by hand.
---

# Babysit PR

This is the part of review that's pure toil — re-checking whether a comment is still true, replying,
resolving, re-running. Automating exactly that toil is the point; the judgment calls (is this finding
real, is the fix right) still get made for real, not rubber-stamped.

## 📌 Non-Negotiable Hard Rules

1. **Never merges.** This skill fixes, replies, resolves threads, and re-triggers review — merging stays
   a human decision, same boundary `finalize-task` already draws around release gates.
2. **Never resolves a thread it didn't actually answer.** A thread is resolved only after a real fix (or
   a substantiated "not applicable" reply with evidence), never resolved just to clear the queue.
3. **Replies as the account running this, on behalf of the developer** — never impersonates another
   reviewer or a bot.
4. **Re-run this repo's own gates before pushing any fix**, and run `check-security`/`code-review` on the
   fix itself — a fix for one reviewer's comment shouldn't introduce a new finding.

## 🔄 Workflow Steps

### 1️⃣ Step 1 — Harvest every open thread

```bash
gh api graphql -f query='...reviewThreads...'   # GitHub: review threads, unresolved only
glab api projects/:id/merge_requests/:iid/discussions   # GitLab
```

Include threads from `debate-review`, CodeRabbit, human reviewers, and any bot — not just this project's
own skills' output.

### 2️⃣ Step 2 — Verify each finding against the current code

For each thread: read the actual code at the anchored line right now (not the diff snapshot in the
comment) and confirm the finding is still real. Code may have moved since the comment was posted.

### 3️⃣ Step 3 — Fix real findings

For each confirmed finding: make the fix, add/update a test guarding it, run
`npm run validate` and, for anything security-relevant, `check-security`.

### 4️⃣ Step 4 — Reply, resolve, push

Reply in-thread with concrete evidence (what changed, in which commit), resolve the thread, and push the
fix commit. For a contested-but-not-actionable finding, reply with the reasoning instead of silently
resolving it.

### 5️⃣ Step 5 — Re-trigger and report

Once all fixable threads are handled, re-run `debate-review` for the next round (new head SHA means a
fresh review is allowed). Report merge-gate status: build/lint/test green, and whether any P0/P1 remains
open.

## 📥 Deliverable Format

1. **Threads harvested:** count, by source (debate-review / CodeRabbit / human / other bot).
2. **Per-thread outcome:** fixed & resolved / replied-not-actionable / still open (with why).
3. **Merge-gate status:** green/red, and what (if anything) still blocks merge.
