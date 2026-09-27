---
name: skill-creator
description: Create new skills under .claude/skills/ for this repo, or improve existing ones, following this project's own established conventions (YAML frontmatter with name+description, the shared P0/P1/P2 severity vocabulary, cross-references between overlapping skills). Use when the user wants a new skill made from a repeated instruction, wants an existing skill tightened, or asks "turn this into a skill" / "اعمل سكيل لهاد الشي".
---

# Skill Creator — project-local edition

The general skill-creation method, pinned to how this repo actually writes its own skills, so a new
one fits in immediately instead of needing a `claude-md-management` pass to reconcile it afterward.

## 📌 Non-Negotiable Hard Rules

1. **Every skill needs YAML frontmatter with `name` and `description`.** The `description` is the entire
   trigger mechanism — it must state both *what the skill does* and *when to use it*, with concrete
   trigger phrases, not just a topic label. Weak descriptions under-trigger; be a little "pushy" about
   naming the situations that should fire this skill.
2. **Check for overlap before creating.** Read the existing skills under `.claude/skills/` first. If a
   new request substantially overlaps an existing skill (e.g. another "review the code" variant), extend
   or reference the existing one via `claude-md-management`'s process instead of forking a near-duplicate.
3. **Reuse the shared vocabulary.** Any skill that produces findings should use this project's existing
   P0 (blocking, security) / P1 (blocking, correctness/architecture) / P2 (non-blocking, polish) scale
   rather than inventing a new severity system — that consistency is what lets `code-review`,
   `check-security`, and `review-task` compose.
4. **State the boundary against neighboring skills explicitly, in the body.** If the new skill is close
   to an existing one (as `check-security`/`security-guidance` or `code-review`/`review-task` are), say
   in one line how they differ — don't leave it implicit.
5. **No generic "AI Skill" framing.** Don't title a skill "AI Skill: X (x)" and don't open with a
   `> **Role:** ... > **Objective:** ...` pair — that's the exact templated shape every public
   Claude-skill repo uses, and it's what makes a skill set read as generated rather than authored. Open
   with a plain title and one paragraph of real reasoning instead, matching `academia-conventions` and
   `README.md`'s voice.

## 🔄 Workflow Steps

### 1️⃣ Step 1 — Capture intent

What should this skill make the agent do, and in which concrete situations should it fire? If the user
is turning a just-completed workflow into a skill, extract the actual steps taken in this conversation
rather than a generic version of them.

### 2️⃣ Step 2 — Check for overlap

Scan `.claude/skills/*/SKILL.md` for anything close. If found, propose extending that skill instead of
creating a new one, or creating the new one with an explicit "how this differs from X" line.

### 3️⃣ Step 3 — Draft following this repo's shape

```
.claude/skills/<kebab-case-name>/SKILL.md
```

```markdown
---
name: <kebab-case-name>
description: <what it does> + <concrete trigger phrases/situations>
---

# <Plain Title, no "AI Skill" prefix, no repeating the kebab-name>

<One short paragraph, no Role/Objective labels: why this skill exists in *this* project — what
recurring problem it's solving, referencing a real file/decision/incident where it helps. Write it the
way `academia-conventions` and `README.md` already write — direct, no corporate framing.>

## 📌 Non-Negotiable Hard Rules
1. ...

## 🔄 Workflow Steps
### 1️⃣ Step 1 — ...

## 📥 Deliverable Format
1. ...
```

Keep the SKILL.md itself under ~500 lines; if a skill needs more, split detail into a `references/`
subfolder next to it and point to those files rather than inlining everything.

### 4️⃣ Step 4 — Sanity-check the description against real prompts

Write 2–3 realistic things a developer on this project would actually type, and confirm the description
would plausibly fire the skill for each. If it wouldn't, tighten the description rather than the body —
the body never gets read if the skill doesn't trigger.

### 5️⃣ Step 5 — Hand off to claude-md-management

Once created, a `claude-md-management` pass (immediately, or at the next periodic audit) confirms no
stale references and no unflagged overlap with the rest of the set.

## 📥 Deliverable Format

1. **New/updated skill file path.**
2. **Overlap check result:** none found / extended existing skill `X` instead / boundary line added
   against skill `Y`.
3. **Test prompts used** to validate triggering, and whether the description needed tightening.
