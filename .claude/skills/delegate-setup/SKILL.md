---
name: delegate-setup
description: Discover which coding-agent CLIs (Claude Code, Codex, Cursor Agent, Aider, OpenCode, etc.) are installed on this machine, and record a small "fleet" of lanes (feature/tests/ui) in .claude/delegate-fleet.json so implement-task can delegate bounded tickets to the right one. Use when the user asks to set up delegation, says "اعمل fleet", or wants implement-task's delegation section to actually have implementers to dispatch to. Never dispatches coding work itself.
---

# Delegate Setup

Turns "I have a few coding-agent CLIs installed" into a small, named set of lanes `implement-task`
can actually dispatch bounded work to. It never dispatches anything itself — discovery and approval
only.

## 📌 Relationship to the upstream `delegate-skills` project

This is a project-local, lighter version of `amElnagdy/delegate-skills`'s fleet concept, adapted to run
without its dedicated Node relay scripts — dispatch here goes through the bash tool directly, since this
environment already has shell access. For the fully verified per-CLI contract (read-only tripwires,
session resume, sandboxed writes per implementer), install the upstream package
(`npx skills add amElnagdy/delegate-skills`) instead; this skill covers the decision layer
(which lane maps to which CLI) either way.

## 📌 Non-Negotiable Hard Rules

1. **Never dispatches coding work.** This skill only discovers, proposes, and — after explicit approval
   — writes the fleet config. Actual dispatch is `implement-task`'s or a ticket's job.
2. **Nothing is written without approval.** Show the proposed fleet map before writing
   `.claude/delegate-fleet.json`.
3. **Only list a lane for a CLI that's actually authenticated and runnable**, confirmed with a real
   `--version`/`--help` check — never assume availability from the CLI being merely on PATH.

## 🔄 Workflow Steps

### 1️⃣ Step 1 — Discover

```bash
for cli in claude codex cursor-agent aider opencode; do
  command -v "$cli" >/dev/null && echo "$cli: $($cli --version 2>&1 | head -1)"
done
```

### 2️⃣ Step 2 — Propose lanes

Map discovered CLIs to lanes based on strength, matching the upstream convention:

- **`feature`** — complex business logic, Zod validation, state wiring.
- **`tests`** — Vitest/Playwright assertions and mocks.
- **`ui`** — styling, layout, presentation components (pairs with `frontend-design`).

### 3️⃣ Step 3 — Get approval, then write

Show the full proposed `.claude/delegate-fleet.json` and get explicit confirmation before writing it.

```json
{
  "version": "delegate-fleet.v1",
  "lanes": {
    "feature": { "cli": "codex", "effort": "high" },
    "tests": { "cli": "claude" },
    "ui": { "cli": "cursor-agent" }
  }
}
```

### 4️⃣ Step 4 — Verify each lane once

Run one trivial read-only check per configured lane's CLI (`--help`, or a `--read-only`/plan-mode probe
if the CLI supports it) so the fleet file isn't recording a lane that doesn't actually work.

## 📥 Deliverable Format

1. **Discovered CLIs:** which are installed and authenticated.
2. **Proposed fleet:** lane → CLI → dial, shown before writing.
3. **Written config path**, once approved, plus the verification result per lane.
