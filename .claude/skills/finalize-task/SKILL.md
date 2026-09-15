# 🚀 AI Skill: Finalize, Babysit, & Safe Release (finalize-task-skill-v4.md)

> **Role:** Continuous Delivery & Release Engineer
> **Objective:** Act as an automated **Babysitter** and **CI/CD Gatekeeper**. Resolve review comments automatically, verify integration gates, and execute highly resilient, policy-driven releases to production with instantaneous rollbacks.

---

## 📌 Non-Negotiable Hard Rules (Playbook Invariants)
1. **Never merge broken builds:** A PR can only be merged if all static checks (`tsc`, `lint`), unit tests (`vitest`), and E2E production smoke tests (`playwright`) pass completely in a green pipeline.
2. **Decouple Deploy from Release:** Never release a new feature to all users simultaneously. Always gate major changes behind **Feature Flags** (such as LaunchDarkly or custom flags) to support canary rollouts.
3. **Automated Rollback Trigger:** Monitor post-deploy telemetry metrics (error budgets, latency SLAs, Sentry exception spike rates). Trip an automatic rollback to the previous stable head within **60 seconds** if anomalies are detected.

---

## 🔄 Workflow Steps (The Execution Spine)

### 1️⃣ Step 1: Babysit the PR (`babysit-pr`)
Actively work the review rounds:
- Parse all inline comments containing the `<!-- debate-review -->` marker.
- For each real finding (P0/P1):
  - Check the code, generate the fix, write corresponding tests, and push a new commit to the branch.
  - Reply in the thread with concrete code evidence and mark the thread as resolved.
- Re-run the review pipeline until no P0 or P1 blockers remain.

### 2️⃣ Step 2: Run CI/CD Release Gates
Execute the automated validation pipeline:
- Run static type check: `npm run typecheck` or `tsc --noEmit`.
- Run linter and formatting checks.
- Run complete test suite and verify that code coverage meets your **80% coverage budget**.
- Compile the static production build (`next build` or `vite build`) to guarantee no runtime deployment exceptions.

### 3️⃣ Step 3: Policy-Driven Release & Canary Rollout
Once merged:
- Deploy the build to the production environment.
- Initialize the rollout at **10% canary traffic** using Feature Flags.
- Continuously monitor:
  - Browser Real User Monitoring (RUM) metrics (LCP, CLS, INP) using **Long Animation Frames (LoAF)**.
  - Exception rates in Sentry and connection errors.
- If anomaly budgets are breached, trigger an instantaneous git-revert or deployment rollback.

---

## 📥 Deliverable Format (Strict Template)
When this skill is invoked (`finalize-task-skill-v4`), return exactly:
1. **Babysit PR Log:** A list of parsed findings, automated fixes applied, and thread resolution statuses.
2. **Validation Pipeline Report:** Exact outputs of build, test, and type-check gates.
3. **Release Manifest:** Feature flag keys, canary rollout percentage, and active monitoring URLs.
4. **Rollback Watchdog:** Thresholds and metrics that will trigger an automatic rollback.
