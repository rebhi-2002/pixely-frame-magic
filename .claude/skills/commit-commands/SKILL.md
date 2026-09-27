---
name: commit-commands
description: Streamlined git workflow commands for staging, writing Conventional-Commits-style messages, and committing in this repo — used after finalize-task's gates are green, never as a substitute for them. Use whenever the user asks to commit, stage changes, write a commit message, or says "commit this", "جهز الكوميت". Never commits on its own initiative without the developer's go-ahead.
---

# Commit Commands

Fast, consistent commits — without this ever becoming the thing that decides code is ready to land.
That decision stays with the developer and `finalize-task`'s gates.

## 📌 Non-Negotiable Hard Rules

1. **Never commit code that hasn't passed the project's gates.** Confirm `npm run validate` (typecheck +
   lint + format:check + test) is green — and `check-security`/`code-review` have no open P0/P1 — before
   proposing a commit. This mirrors `implement-task`'s "No Commits without gates" rule.
2. **Never commit on your own initiative.** Stage and draft the message, then wait for explicit
   confirmation before running `git commit`, unless the developer has already said "commit it" for this
   specific change.
3. **Never bundle unrelated changes into one commit.** If the working tree has two unrelated changes,
   split them — `git add -p` over `git add .` when the diff is mixed.

## 🔄 Workflow Steps

### 1️⃣ Step 1 — Confirm the tree is commit-ready

```bash
npm run validate     # typecheck + lint + format:check + test, must be green
git status            # see what's actually staged/unstaged
git diff --stat       # sanity-check scope matches intent
```

### 2️⃣ Step 2 — Stage precisely

```bash
git add <specific files>      # default
git add -p                    # when a file has mixed, unrelated hunks
```

Never `git add -A` blind when the status shows files unrelated to the current task (build artifacts,
unrelated WIP, `.env` — the latter must never be staged at all, per `check-security`).

### 3️⃣ Step 3 — Write the message

Use Conventional Commits, matching this repo's existing history style:

```
<type>(<scope>): <short imperative summary>

<body: what and why, not a diff restatement>
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `security`. Scope the commit to the
area touched (`routes`, `components`, `lib`, `docs`, `skills`, etc.).

**Example**
Input: added Zod validation to the newsletter signup server function
Output: `fix(lib): validate newsletter signup input with zod`

### 4️⃣ Step 4 — Confirm, then commit

Show the staged diff summary and the drafted message, get explicit go-ahead, then:

```bash
git commit -m "<type>(<scope>): <summary>" -m "<body>"
```

Never `git push` as part of this skill unless separately asked — landing to a remote is a distinct
decision from committing locally.

## 📥 Deliverable Format

1. **Gate status:** validate output, green/red.
2. **Staged scope:** files staged and why (or why split into multiple commits).
3. **Drafted message(s):** ready for confirmation before the actual `git commit` runs.
