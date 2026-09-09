# Academia — Jury Prep Guide
### Deep-dive explainer + anticipated Q&A bank

This guide has two jobs: (1) let you explain any slide in more depth than the deck itself
shows, and (2) prepare you for the questions a jury is most likely to ask. Every answer below
is grounded in your own SRS, business-model doc, user stories, milestones, and codebase — plus
a small amount of outside market research, clearly marked as such. Nothing here invents a
number that isn't in your source material.

**How to use this**: skim the "30-second narrative" first — that's your opening if asked to
summarize the whole project in one breath. Then read the deep-dive section that matches
whichever slide is on screen. The Q&A bank at the end is organized by theme so you can jump
straight to the category a question falls into.

---

## 1. The 30-second narrative

> "Academia is a marketplace and learning platform for private tutoring and courses. Today,
> teachers run their classes through WhatsApp groups and personal bank transfers — there's no
> discovery, no secure payment, and no visibility for parents. Academia replaces that with one
> platform: students discover and pay for courses through an internal wallet, teachers get
> automatic payouts minus a transparent commission, and attendance and exam results are tracked
> in one place instead of a notebook. We designed the full system, built and tested the
> authentication and access-control core, and are finishing the course, enrollment, and wallet
> modules on a defined 12-week build plan."

---

## 2. Deep-dive by topic

### 2.1 The problem, in more detail
Your own requirements work identifies the root cause plainly: teaching materials, join
requests, and payment currently move through **social-media groups and disconnected manual
methods**. Three concrete failure modes fall out of that:
- **No durable record** — a lesson file shared in a WhatsApp group is not organized by
  subject/lesson the way a course platform would structure it (this is literally what FR‑12,
  "Upload and Organize Course Materials," was written to fix).
- **No discovery mechanism** — a prospective student can only find a teacher through a link or
  referral, which caps a teacher's addressable audience to their existing network.
- **No trusted payment or record-keeping** — fees are collected informally, so there's no
  enrollment confirmation, no receipt, and no parent visibility into what was paid or attended.

If asked "how do you know this is a real problem and not just an assumption," the honest answer
is: this is the standard shape of the private-tutoring market across the region — it's exactly
the gap that funded regional players (Noon Academy, Orcas, Tyro) were built to close, which is
independent third-party evidence the problem is real and investable, even though Academia's own
user research is internal, not a published study.

### 2.2 Market sizing — why there's no dollar figure
You'll notice the deck frames TAM/SAM/SOM *conceptually* rather than with a specific dollar
number. That is deliberate, not a gap: no sourced market study for your specific target market
exists in your materials, and presenting an invented figure to a jury is a bigger risk than
presenting none. What the deck offers instead is real, independently reported evidence that
capital already flows into this category:

| Company | HQ | Founded | Funding (reported) | What it tells the jury |
|---|---|---|---|---|
| Noon Academy | Saudi Arabia | 2013 | ~$41M Series B (2026) | Live/social tutoring at scale still attracts large, recent rounds |
| Abwaab | Jordan | 2019 | $27.5M total | Curriculum-aligned content raised a $20M Series A to expand into Egypt/Pakistan |
| Al‑Mentor | UAE | 2016 | $14.5M total | Adjacent (professional/skills) content is fundable too |
| Orcas | Egypt | 2013 | $3.5M total | Even a narrower tutor-discovery app cleared a seed/Series A bar |

**If pressed for a number anyway**: say plainly that you haven't sized the market with a
sourced study yet, and that you'd rather commit to doing that properly (e.g., using regional
household-education-spend data or a specific country's private-tutoring survey) than quote a
guess in a jury setting.

### 2.3 Who else is already here (competition, in depth)
Four real, funded players operate adjacent to Academia, and none of them combine all five of
Academia's core pieces (marketplace discovery + wallet + commission ledger + parent dashboard +
attendance/exam tracking) in one system:

- **Noon Academy** — closest in spirit (live, social tutoring), but it's a content/session
  platform without a wallet-and-commission marketplace layer or parent finance visibility.
- **Orcas** — closest in *distribution model* (mobile app connecting parents/students to nearby
  tutors), but it's positioned as a discovery/booking layer, not a full course/LMS + payments
  system.
- **Al‑Mentor** — a professional-development video library aimed at adult/enterprise learners,
  not K‑12 attendance-based tutoring.
- **Nafham / Tyro** — Nafham was free crowdsourced video content; after its 2021 merger with
  Tyro (a live-tutoring booking platform), the combined entity still lacks a unified wallet,
  commission ledger, or parent controls as far as public information shows.
- **Google Classroom** and **Udemy** are the two "everyone has heard of them" reference points
  in the deck — useful because the jury already has a mental model of both, and Academia's gap
  relative to each is easy to state in one line (Classroom: no discovery or payments; Udemy: no
  live attendance or parent role).

**"What stops one of these from just copying you?"** is a fair question — see the Q&A bank
below (section 3.4) for the prepared answer.

### 2.4 The product, module by module
- **Marketplace & discovery** — a public catalog of courses/categories/teacher groups.
- **Courses, groups & lessons** — teachers upload materials into lesson categories, with
  visibility set to public or enrolled‑only, and a documented 50MB per‑file upload ceiling with
  a progress indicator (this is a real acceptance criterion, not a marketing detail).
- **Join requests & enrollment** — a student cannot submit a duplicate request for a section
  they're already pending or enrolled in; the system blocks it and shows a clear message.
- **Wallet** — the financial core; see 2.5 below.
- **Academic tracking** — attendance (present/absent/late/excused) and exam scores, with
  percentage/average auto-calculated and PDF/Excel export targeted to complete in under 3
  seconds (a real, documented target from your own requirements and user stories, not invented
  for the deck).
- **Admin & audit** — permissions, notifications, and audit logs.

### 2.5 The wallet & commission engine, precisely
This is the most technically interesting — and most heavily scrutinized — part of the system,
so know it cold:

1. **Top‑up (FR‑W01)** — student uploads a bank-transfer receipt + reference number; status is
   "Pending Verification"; balance does **not** change yet.
2. **Verification (FR‑W02)** — an Admin/Finance Officer checks the receipt against bank
   records and approves or rejects; only approval credits the wallet.
3. **Enrollment deduction (FR‑W03a)** — when a teacher approves a join request, the system
   checks the student's balance is sufficient and deducts the fee. If it isn't sufficient, the
   approval itself is blocked — the teacher is told "Insufficient Student Balance" and the
   student is told to top up. Enrollment cannot happen without a clean deduction.
4. **Commission split (FR‑W03b)** — immediately following a successful deduction, the system
   computes `commission = fee × active commission rate`, credits the teacher's wallet with
   `fee − commission`, and logs the commission to the platform revenue ledger. **Steps 3 and 4
   are one atomic transaction** — they succeed or fail together, so a student can never be
   charged without the teacher (and the ledger) being credited, and vice versa.
5. **Withdrawal (FR‑W04/W05a/W05b)** — a teacher requests a withdrawal (amount ≤ available
   balance); an Admin/Finance Officer approves and completes the transfer outside the system,
   then confirms it in-app, which is what actually deducts the teacher's balance. The requested
   amount is reserved the moment the request is submitted, so it can't be double-spent while
   pending.
6. **Commission governance (FR‑W07)** — the commission percentage is admin‑configurable
   (validated to a 0–100% range), every change is logged with admin ID and timestamp, and the
   **previous rate is archived, not overwritten**, preserving a full audit trail.
7. **Transaction history (FR‑W06)** — both sides can see a chronological, filterable log of
   every top‑up, deduction, credit, and withdrawal.

The 80/20 split shown visually in the deck is **illustrative only** — say this explicitly if
asked. The real rate is a configurable platform setting, not a hard-coded number.

### 2.6 Architecture, in more depth
- **Frontend**: React 19.2 + TypeScript, built on Vite, using TanStack Router/Start for
  routing/data-loading, Tailwind CSS 4 for styling, Radix UI for accessible primitives, and
  i18next for multi-language support (the codebase is already structured for more than one
  language, even though the current UI ships in Arabic/English as needed).
- **Backend**: ASP.NET Core, layered into **Data → Core → Infrastructure → API → Web**
  projects — a classic clean-architecture separation so business rules (in Core/Infrastructure
  services) don't leak into controllers, and controllers don't leak into the database layer.
- **Data**: Entity Framework Core against a relational database, with migrations tracked in
  source control, and role-aware DTOs so the API never returns a raw entity (which would risk
  leaking fields like a wallet balance or a bank IBAN to a role that shouldn't see it).
- **Cross-cutting**: JWT-based authentication and role-based authorization (ASP.NET Identity),
  centralized exception handling middleware, CORS policy enforcement, and Serilog-based
  structured logging.
- **Process maturity**: the team has already run an internal architecture review of the
  services layer (auditing which services correctly inherit shared base-class behavior like
  `CreatedBy`/`UpdatedBy` field population, soft-delete conventions, and audit-trail hooks)
  *before* building out the three newest domains (Wallet, Enrollment/Courses, Academic
  Tracking). That's a real, completed internal document — a good thing to mention if a
  technical juror asks about code quality practices, because it shows the team catches
  inconsistency before it compounds, not after.

### 2.7 Where the build actually stands today
Be exact and unembarrassed about this — it's a strength, not a weakness, in front of a
technical jury:

- **Shipped**: authentication, role-based access control, user/page/module/permission
  management, core platform configuration.
- **In progress**: course, lesson, and exam API contracts; enrollment and certificate delivery;
  end-to-end in-app notifications.
- **Designed but not yet built**: automated payment-gateway integration (today's flow is
  verified manual bank transfer only), the AI study-assistant layer, native mobile apps.

### 2.8 The 12-week build plan
Weeks 1–2 foundations (requirements, user stories, auth/RBAC) → weeks 3–6 content & enrollment
(system design, courses, join requests) → weeks 6–9 wallet & academics (top-ups, commission
split, attendance, exams) → weeks 9–12 polish & launch (notifications, QA, go-live). This is
your actual internal milestones document, not an aspirational placeholder — if asked "how
confident are you in this timeline," you can honestly say it's the plan you're already
executing against, and the "Live today" / "Finishing next" slide is the real-time proof of
where you are inside it.

### 2.9 The team
Prepared by **Ahmed Alkhaldi**, **Rebhi Ibrahim**, and **Ziad Alnumailat**, supervised by
**Hamza Abu Jarad**, built through the **TAQAT · CodeMap** program. Rebhi's ownership of the
public frontend repository and Ziad's ownership of the hosted backend/Swagger environment are
the basis for the Frontend / Backend labels in the deck — if a juror asks about role split in
more granular detail than that (e.g., who owns which specific module), answer with whatever the
real internal division of labor is; the deck deliberately doesn't over-specify what isn't
documented.

---

## 3. Anticipated Q&A bank

### 3.1 Market & problem
**Q: How big is this market, really — do you have a number?**
A: We haven't sized our specific target market with a sourced study, and we'd rather say that
plainly than give the jury a guess dressed up as research. What we can show is that comparable
regional players — Noon Academy, Abwaab, Al‑Mentor, Orcas — have collectively raised well over
$80M in reported funding for adjacent problems, which tells us investors already believe this
category is fundable at scale. Sizing our own addressable slice with a real study is on our
list, not something we want to fabricate for this room.

**Q: Is this problem specific to one country, or is it everywhere?**
A: The root cause — private tutoring coordinated through informal channels instead of a
platform — is common across the region; that's exactly the gap regional competitors like Noon
Academy, Orcas, and Tyro were built to address in their own markets. We haven't locked our
specific launch market in this deck because our own materials don't commit to one yet — that's
a live decision, not something we want to guess at in front of you.

**Q: What made you confident this is a real pain point and not something you assumed?**
A: Our own requirements process traced the problem back to how teachers and students actually
operate today — materials and join requests moving through social-media groups, with no
structured record and no payment trail. That's internal research, not a published study, so we
hold it with appropriate humility — but it's also exactly the shape of problem that four
funded regional companies were independently built to solve, which is external corroboration
we didn't have to invent.

### 3.2 Business model & unit economics
**Q: What's your commission rate?**
A: It's admin-configurable, not fixed — the system validates any rate between 0% and 100%,
logs every change with who made it and when, and archives the previous rate for audit purposes.
The 80/20 split in the deck is an illustrative example, not a committed number. We haven't
locked a specific launch rate here because getting it right depends on real teacher feedback
during pilot onboarding — pricing a two-sided marketplace before you have both sides talking to
you is a good way to get it wrong.

**Q: What are your unit economics — CAC, LTV, margin per transaction?**
A: We don't have real acquisition or retention data yet — the platform hasn't launched, so any
CAC/LTV number we gave you today would be invented, not measured. What we can commit to is the
mechanism: our margin is a percentage of gross transaction value with near-zero marginal
processing cost once the payment-gateway integration replaces today's manual bank-transfer
verification step, so unit economics improve automatically as we automate that one workflow.

**Q: Why commission instead of a subscription (SaaS-fee-per-teacher)?**
A: Zero upfront risk for a teacher to try the platform is the whole point — a subscription asks
a teacher to pay before they've seen a single new student come through the marketplace, which
is exactly the trust problem we're trying to solve, not create. A commission means Academia
only gets paid when a teacher gets paid, which aligns our growth incentive with theirs instead
of against it.

**Q: What if a teacher and student just exchange contact info and transact outside the
platform to avoid the commission?**
A: That's the classic marketplace "disintermediation" risk, and we take it seriously. Our
answer isn't to block contact — it's to make staying on-platform clearly more convenient than
leaving it: the wallet, the attendance/exam record, the materials hosting, the parent dashboard,
and the enrollment confirmation are all workflow value a side deal doesn't replicate. A teacher
who goes around the platform loses their audit trail, their parent-visibility feature, and their
automatic collection — for a student, an off-platform arrangement is exactly the informal,
unprotected setup we're asking them to leave behind. We also don't have this fully solved with
data yet, because we haven't launched — it's a real risk to monitor, not one we're claiming
away.

**Q: How do you handle payment fraud or a disputed/fake bank-transfer receipt?**
A: Today's top‑up flow (FR‑W02) requires a human Admin/Finance Officer to check the uploaded
receipt and reference number against actual bank records before the wallet is credited — the
balance never moves on the student's say-so alone, and every decision is logged with the admin's
ID and a timestamp. That's slower than an automated gateway, which is exactly why an integrated
payment gateway is on our near-term roadmap — it removes the manual-verification bottleneck and
the residual fraud surface that comes with a human-in-the-loop process.

### 3.3 Product & technology
**Q: Why React + ASP.NET Core instead of [some other stack]?**
A: React with TypeScript gives us a component-based frontend with strong typing across a large,
role-differentiated UI (student/teacher/parent/admin all see very different views of the same
data), and TanStack Router/Start gives us type-safe routing and data loading without hand-rolled
boilerplate. ASP.NET Core with EF Core gives us a mature, strongly-typed backend with built-in
Identity/JWT auth and a clean-architecture layering (Data/Core/Infrastructure/API/Web) that
keeps business rules out of controllers. It's a boring, well-supported, hire-able stack on
purpose — a marketplace handling other people's money is not the place to bet on something
exotic.

**Q: How do you guarantee wallet balances stay correct — what if a transaction fails halfway?**
A: The fee deduction from the student and the net credit to the teacher (FR‑W03a/FR‑W03b) are
implemented as a single atomic database transaction — either both happen or neither does. There
is no state where a student is charged but the teacher isn't credited, or vice versa.

**Q: Is the platform secure? What about a data breach?**
A: Every sensitive field is returned through role-aware DTOs, not raw database entities, so a
lower-privilege role can't even receive fields it shouldn't see over the API — that's enforced
at the service layer, not just hidden in the UI. Receipts and bank details sit behind
authorization checks by default. Every permission change, payment action, and deletion writes
to a persistent audit log. We haven't had a third-party security audit yet — that's an honest
gap, and one we'd flag as a good use of funding.

**Q: What happens to a deleted user or course — do you lose history?**
A: We use soft deletion, not hard deletion, for the entities that matter for financial and
academic history — a record is flagged inactive rather than erased, which preserves the audit
and academic trail while still freeing up unique fields (like an email or username) for reuse.
A small number of pure lookup/reference entities that don't yet have real dependent records use
hard delete instead — an internal review the team already completed identified exactly which
services are consistent with this pattern and which need alignment before we scale further.

**Q: What's your plan for scale — can this handle a large number of concurrent users?**
A: The layered architecture (thin controllers, business rules in services, EF Core for data
access) is a standard pattern for horizontal scaling, and our non-functional requirements
process explicitly calls out performance, availability, and scalability as requirement
categories to define targets against. We don't have a load-tested number to quote you today
because we haven't run that test yet — that's a "should do before launch," not a "already
proven," and we'd rather tell you that than invent a number.

**Q: Is the AI functionality real, or is that a slide-only feature?**
A: It's explicitly roadmap, not shipped — the deck labels it "planned for a later release" for
exactly that reason. What is real is the reason we're confident it's buildable when we get
there: lesson content, attendance, and exam history already live in one structured data model,
which is the actual prerequisite an AI study assistant or a predictive-performance alert needs.
We'd rather show you the data foundation is real than claim the AI feature is further along
than it is.

### 3.4 Competition & defensibility
**Q: Google Classroom or Udemy could add a wallet and a marketplace tomorrow — why won't they?**
A: They could, technically — but it would mean rebuilding their core product identity. Classroom
is built around closed, single-teacher classrooms tied to a school's Google Workspace account;
adding an open public marketplace and a payments ledger is a different product, not a feature
flag. Udemy is built around asynchronous, self-paced global content at massive scale; adding
live attendance tracking and a parent role serves a completely different buyer than their
current one. Neither company's incentive structure rewards chasing a regional, live-tutoring,
family-inclusive niche the way a focused startup's does.

**Q: What about Noon Academy or Orcas adding what you have?**
A: This is the more credible threat, and we don't pretend otherwise — they're closer to our
model than Classroom or Udemy are. Our answer is speed and focus: they're each optimized around
their current core (Noon around social/gamified live sessions, Orcas around nearby-tutor
discovery), and pivoting a funded company's product core is organizationally slower than a
focused team building the full stack — discovery + wallet + commission ledger + parent
dashboard + academic tracking — as one integrated system from day one.

**Q: What's your actual moat — what stops any well-funded competitor from copying this?**
A: Honestly, no early-stage marketplace has a strong technical moat on day one — the real moat
is the two-sided network (teachers with real students, students with real course history) that
gets harder to replicate the longer we operate, plus the workflow lock-in described in the
disintermediation answer above (3.2). We'd rather say that plainly than claim a defensibility we
haven't earned yet.

### 3.5 Go-to-market
**Q: How do you solve the chicken-and-egg problem — no teachers without students, no students
without teachers?**
A: We seed supply first, deliberately: onboard a small number of independent teachers and small
tutoring centers directly (our SOM — serviceable obtainable market — is exactly this group),
give them the marketplace listing and the wallet/attendance tools for free during onboarding,
and let their existing students migrate onto the platform as the first demand. Discovery-driven
new-student acquisition comes second, once there's a real catalog worth browsing.

**Q: How do you convince a student to switch from an informal WhatsApp-group arrangement?**
A: We don't ask them to switch on faith — we ask them to switch for something concrete: browse
and compare teachers instead of relying on word of mouth, pay once from a wallet instead of a
separate transfer per teacher, and see their own attendance and exam history instead of trusting
a teacher's notebook. Enrollment confirmation and receipts replace a verbal promise in a group
chat.

**Q: How do you convince a teacher to give up a commission?**
A: We reframe what the commission buys, not just what it costs. A teacher currently is their own
sales, billing, and collections department — chasing individual transfers, tracking who's paid
informally, and relying entirely on personal referrals for new students. The commission is the
price of automating that collections work and adding real demand generation through the
marketplace, with every rate change transparent and logged. It's optional, not exclusive — a
teacher can still use their existing channels alongside Academia; we're not asking them to burn
down what already works for them.

### 3.6 Team & execution
**Q: Why should we trust this team to execute?**
A: The strongest evidence isn't a claim — it's the artifacts. We produced a full SRS with
testable functional requirements down to the transaction level (not vague statements like "the
system shall be fast"), wrote user stories with explicit acceptance criteria and edge-case
scenarios, ran an internal architecture review of our own service layer before scaling it
further, and can show you exactly what's shipped versus what's still in progress against a
12-week plan we're already executing. That's a team that documents before it builds, which is
the opposite of the usual early-stage risk.

**Q: What's the single biggest risk to this project?**
A: Probably the same risk every two-sided marketplace faces: reaching enough combined
teacher-and-student density in one place fast enough to make the marketplace side (not just the
LMS/wallet side) actually valuable. The wallet, attendance, and admin tooling are valuable to a
single teacher and their existing students on day one regardless of marketplace scale — that's
deliberate, so the product isn't worthless before the marketplace effect kicks in — but the full
vision depends on winning that density.

### 3.7 The ask
**Q: How much are you raising, and what's the valuation?**
A: We haven't put a specific number in this deck because we don't want to anchor a figure we
haven't properly modeled against real cost data — engineering time, infrastructure, and a
payment-gateway integration all have real, quotable costs we'd rather bring you precisely rather
than estimate on stage. What we can tell you is exactly what the funding is for: finishing the
already-designed course/enrollment/certificate APIs, integrating an automated payment gateway to
replace manual bank-transfer verification, and building the AI layer on top of the academic data
we already structure. We're glad to follow up with a modeled number.

**Q: What have you spent so far, and how?**
A: This has been built as an engineering-first graduation/training project under TAQAT ·
CodeMap rather than on outside capital, so "spend" so far has primarily been the team's time
against the 12-week build plan, not a cash budget we're reporting on. Happy to be precise about
this if it's relevant to how the jury evaluates the ask.

---

## 4. Slides where you should slow down

A few slides carry more weight than their screen time suggests — plan to spend real time on
these if the jury looks engaged, and be ready to skip ahead quickly on the more self-explanatory
ones:

1. **Commission mechanics (slide 12)** — this is where a sharp juror will probe hardest. Know
   the FR‑W03a/FR‑W03b atomicity story cold.
2. **Regional competitors (slide 6)** — this is your proof you've actually done competitive
   research, not just picked the two most famous global names.
3. **Status today (slide 15)** — this is your credibility slide. Don't rush past it; the
   honesty here is doing real work for you.
4. **Unit economics (slide 17)** — a formula, not a forecast. Say that distinction out loud
   before anyone has to ask whether the numbers are real.
5. **Risks & mitigations (slide 20)** — this slide exists so a juror never gets to "ask the hard
   question" first. Deliver it with the same steady tone as everything else, not an apology.
6. **Winning teachers (slide 22)** — this is the single most commonly asked "but why would they
   agree to that" question in any marketplace pitch. Have the answer ready before it's asked.
7. **Product concept mockup (slide 10)** — say the caption out loud ("concept illustration, not
   a live screenshot") before a juror has to ask. Volunteering the caveat reads as more honest
   than waiting to be caught.

---

## 5. Delivering it — the jury weighs *how* you present, not just what's on the slide

You mentioned the jury pays close attention to how the idea is presented, not only the content —
that's a fair thing to prepare for deliberately, because it's a separate skill from writing the
deck.

**Time-box it.** A 25-slide deck at an average of ~35–40 seconds per slide runs close to
15–16 minutes — check the actual slot you've been given and cut or merge slides if you're
over. If you're short on time, the safest slides to compress into a spoken aside instead of a
full stop are: Agenda (10 seconds, don't over-explain it), Platform Capabilities (name three
chips, don't read all ten), and the SaaS philosophy bridge (one sentence, then move on).

**Rehearse the transitions out loud, not just the content.** Because each slide now has a
distinct entrance (zoom on the cover/why-we-win/ask, fade on the two "pause and be honest"
slides, convex on architecture, slide everywhere else), practice saying the first sentence of
each new slide *as it visually settles* — the motion should support your point, not distract
from it. On the two `fade` slides in particular (the SaaS-philosophy bridge and the "Where we
are today" slide) — pause a full beat before speaking. Fade is your "let this land" cue.

**Assign a speaker to each thematic block**, if presenting as a team — the deck's six agenda
items map cleanly onto that: e.g., one person owns problem/market/competition, a second owns
product/architecture/status, a third owns business model/GTM/roadmap/ask. Handoffs should
happen *on a slide boundary*, not mid-slide, and each handoff line can be as simple as "I'll let
[name] walk you through how the wallet actually works."

**Practice the honesty beats deliberately — they're a strength only if delivered with
confidence, not apology.** "Where we are today" and the disintermediation/fraud answers in the
Q&A bank are your credibility slides. Say them plainly and move on; don't over-explain or
apologize for what isn't built yet. A steady, matter-of-fact tone reads as maturity; a nervous
or defensive tone undercuts the same words.

**On Q&A specifically:**
- Repeat or briefly rephrase a hard question before answering — it buys you a second to think
  and confirms you understood it correctly.
- If you don't know something, say so in one sentence and offer what you *can* commit to next
  (see the "what NOT to say" list below for the exact places this applies — market size,
  funding ask, commission rate, launch country).
- Let whichever team member built the thing being asked about answer it — a backend question
  answered by whoever wrote the wallet service reads as more credible than a generalized answer
  from whoever happens to be holding the clicker.
- Close every answer on the substance, not on a nervous filler ("...so yeah, that's basically
  it") — end on the actual last fact.

**Physical/logistics checklist:**
- You now have two versions of this deck: the HTML file (richer motion, GSAP-driven staggered
  reveals, needs a browser and — the first time — internet access to load fonts/scripts from a
  CDN) and the PowerPoint file (works fully offline once opened, easier to hand to a jury
  coordinator in advance, and lets you use PowerPoint's own Presenter View). Use the PPTX if
  you're not certain about the venue's internet or projector setup; use the HTML if you want the
  extra motion and are confident about the connection.
- Test the deck on the actual display beforehand — reveal.js scales to the window, but confirm
  fonts (Fraunces/Inter/JetBrains Mono) load from Google Fonts on the venue's network; if there's
  no internet access at the venue, open it once beforehand so the browser cache has the fonts
  and CDN scripts, or bring a hotspot as backup, since this file loads reveal.js and fonts from
  a CDN rather than bundling them.
- Know the keyboard controls: arrow keys or space to advance, `S` opens speaker notes in a
  second window (useful for whoever isn't holding the shared screen), `Esc` for the slide
  overview grid if a juror asks you to jump back to a specific slide. In PowerPoint, the same
  speaker notes are attached to every slide — open with Presenter View (Slide Show tab) instead.
- Decide in advance who advances slides during Q&A — fumbling with the clicker while answering a
  tough question is a small thing that reads as bigger than it is.

---

## 6. What NOT to say

- Don't quote a specific TAM/SAM/SOM dollar figure for Academia itself — you don't have a
  sourced number, and improvising one under pressure is worse than saying "we haven't sized it
  yet."
- Don't imply the AI features are built or in progress — they are explicitly roadmap.
  Overclaiming here is the fastest way to lose technical credibility once a juror asks a
  follow-up you can't back up.
- Don't quote a fixed commission percentage as if it's locked — it's an admin-configurable
  setting, and the 80/20 example in the deck is illustrative only.
- Don't claim a specific launch country/city unless your team has actually decided on one
  outside this deck — the source material doesn't commit to one, so neither should you.

---

## 7. Appendix — how the comparison table was actually verified

You asked directly whether the Google Classroom comparison row was checked and improved, or
just copy-pasted. Here's exactly what happened, so you can verify it yourself line by line: your
source file (`مقارنة المنصة مع كلاس روم.pdf`) is entirely in Arabic, and the deck's table is in
English — so every cell is necessarily a *translation*, not a paste. What I mean by "verified"
is that I re-extracted the raw Arabic text a second time from the original file and checked my
English wording against it sentence-by-sentence before finalizing the slide, rather than
translating once from memory and moving on. Below is that exact side-by-side so you can confirm
it yourself:

| Dimension | Arabic source (verbatim) | English in the deck |
|---|---|---|
| Platform type — Classroom | أداة لتنظيم صفوف مغلقة | Tool for organizing closed classes |
| Platform type — Academia | سوق تعليمي ومنصة LMS متكاملة | Education marketplace + integrated LMS |
| Discovery — Classroom | غير متاح؛ يحتاج المستخدم إلى رابط أو رمز دخول | Not available — needs a link or access code |
| Discovery — Academia | متاح عبر دليل الدورات والمدرسين | Directory of courses & teachers |
| Payments — Classroom | خارجي تماماً ولا يدعمه النظام | Entirely external — not supported by the system |
| Payments — Academia | محفظة داخلية موحدة وآمنة | Unified, secure in‑platform wallet |
| Parent role — Classroom | تقارير بريدية محدودة | Limited email reports |
| Parent role — Academia | لوحة متابعة للنشاط والمدفوعات | Dedicated activity & payments dashboard |
| Attendance/exams — Classroom | محدود جداً | Very limited |
| Attendance/exams — Academia | تتبع أكاديمي تفصيلي | Detailed academic tracking |

The **Udemy** column is not in this source file at all — there's no Arabic table row to
translate for it. It's built instead from a separate narrative paragraph in your business-model
document that discusses Udemy by name (arguing Academia's edge is live interactive learning,
attendance tracking, and parent involvement versus Udemy's async model) — I turned that
paragraph into comparable table language rather than translating a table that doesn't exist for
that competitor. That's why the deck's source note under the table says the Google Classroom row
and the Udemy row come from two different places in your materials — that note exists so this
distinction is never hidden from a juror who reads closely.

Separately: the **regional competitor slide** (Noon Academy, Orcas, Al‑Mentor, Nafham/Tyro) is
not from any of your uploaded files at all — none of your source material named outside
competitors, which is what you flagged. Those four companies came from live web research done
specifically in response to that gap, cross-checked across multiple independent sources
(Arab News' MENA edtech funding roundup, Wamda's coverage of the Nafham/Tyro merger and Noon
Academy's 2026 raise, and CB Insights/Cairo Scene profiles) rather than taken from a single
article, and the funding figures shown are the most recent ones found for each company.
