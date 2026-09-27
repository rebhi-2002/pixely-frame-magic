---
name: debate-review
description: Post one real two-model debate review as inline comments on a live GitHub PR or GitLab MR via gh/glab — the same P0/P1/P2 method review-task uses on a local diff, but actually posted to the PR itself, once per head commit. Use when the user gives a PR/MR URL or number and asks to review, comment, or "post a review", not just look at a local diff.
---

# Debate Review — live PR/MR

Same two-pass debate method as `review-task`, except the output is real inline comments on a live
GitHub PR or GitLab MR, posted from your own `gh`/`glab` account — not a report in this chat.

## 📌 How this differs from review-task

`review-task` produces its debate-review findings as a report in this conversation, for a local
working-tree diff. `debate-review` runs the same method but its deliverable is real, posted comments on
a live GitHub PR or GitLab MR — use this one once code is actually pushed and opened as a PR/MR.

## 📌 Non-Negotiable Hard Rules

1. **One review per head commit.** Re-running on the same head must not post a duplicate review — check
   for an existing review from this account on the current head SHA first.
2. **Never edit code, approve, or request changes as a side effect.** This posts a `COMMENT`-type review
   with inline findings only; merge-affecting states are a human decision.
3. **Use the same P0/P1/P2 severity scale as `check-security`/`code-review`/`review-task`**, rendered as
   `[!CAUTION]`/`[!WARNING]`/`[!NOTE]`, so findings read consistently regardless of which skill produced
   them.
4. **A contested finding gets posted with both sides' reasoning, not silently dropped** — the point of
   the debate step is surfacing disagreement, not hiding it.

## 🔄 Workflow Steps

### 1️⃣ Step 1 — Fetch the PR/MR and confirm no existing review on this head

```bash
gh pr view <number> --json headRefOid,reviews    # GitHub
glab mr view <number>                             # GitLab
```

If a review from this account already exists for the current head SHA, stop and report that instead of
posting again.

### 2️⃣ Step 2 — Main review pass

Read the diff against `/docs` standards and the linked ticket/spec, same checks as `code-review`. Draft
findings.

### 3️⃣ Step 3 — Debate pass

Re-read the draft findings adversarially — for each, try to refute it with a concrete counter-argument
from the actual code. Confirm, refute, downgrade, or add, exactly as `review-task` does for a local
diff. Drop anything that lands below a reasonable confidence bar.

### 4️⃣ Step 4 — Post the review

```bash
gh api repos/<owner>/<repo>/pulls/<number>/reviews -f event=COMMENT -F comments=@review.json
# or the glab equivalent for discussions with diff positions
```

Each comment and the review body start with an HTML marker (e.g. `<!-- debate-review -->`) so
`babysit-pr` can find these threads later regardless of who else has also commented.

## 📥 Deliverable Format

1. **Posted review confirmation:** URL, head SHA reviewed.
2. **Summary table:** P0/P1/P2 counts and focus areas (same shape as `review-task`'s).
3. **Contested findings**, if any, with both sides noted.
