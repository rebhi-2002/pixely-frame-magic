---
name: triage
description: Sort a pile of raw, unstructured issues, bug reports, or feedback into work someone can actually pick up — deduplicated, severity-tagged (using the same P0/P1/P2 scale as check-security/code-review), and routed to plan-task, diagnosing-bugs, or to-tickets as appropriate. Use when the user dumps a batch of GitHub issues, bug reports, or feedback and asks to sort/prioritize them, or says "triage this", "رتب هاد الشكاوى".
---

# Triage

A pile of raw issues isn't work yet — it's noise with a few real things buried in it. This sorts,
deduplicates, and routes each item to the skill that can actually act on it.

## 📌 Non-Negotiable Hard Rules

1. **Deduplicate before prioritizing.** Two issues describing the same root symptom get merged, not
   scored twice.
2. **Use the shared severity scale.** P0 = security/data-integrity/broken-for-everyone, P1 = broken for
   a real segment or blocks other work, P2 = polish/nice-to-have — the same vocabulary
   `check-security`/`code-review`/`review-task` already use, so triage output composes with the rest.
3. **Route, don't just label.** Every item ends up pointed at the next actual skill (`diagnosing-bugs`
   for an unclear bug, `plan-task`/`wayfinder` for a feature request, `to-tickets` if it's already
   spec'd) — a severity tag with no next step isn't triage, it's just sorting.
4. **A security-flavored report gets escalated immediately**, not queued at normal priority — hand it to
   `check-security` right away regardless of where it entered the pile.

## 🔄 Workflow Steps

### 1️⃣ Step 1 — Normalize the pile

List every item with a one-line restatement in your own words — this surfaces near-duplicates that
differ only in wording.

### 2️⃣ Step 2 — Deduplicate

Merge items describing the same underlying symptom; keep the clearest repro/description among the
duplicates, note how many reports rolled into it (signal for real-world impact).

### 3️⃣ Step 3 — Classify

For each surviving item: type (bug / feature request / question / security concern) and severity
(P0/P1/P2), using evidence from the report, not assumption.

### 4️⃣ Step 4 — Route

- Bug, repro unclear → `diagnosing-bugs`.
- Bug, repro clear and small → straight to `to-tickets`/`implement-task`.
- Feature request, scope unclear or large → `wayfinder`.
- Feature request, scope clear and small → `plan-task`.
- Security concern → `check-security`, immediately, out of normal priority order.
- Not actionable (duplicate of a known limitation, out of scope) → say so plainly rather than leaving it
  ambiguously open.

## 📥 Deliverable Format

| Item | Type | Severity | Duplicates rolled in | Routed to |
| --- | --- | --- | --- | --- |
| ... | ... | P0/P1/P2 | count | skill name |

Plus a one-line callout for anything escalated to `check-security` immediately.
