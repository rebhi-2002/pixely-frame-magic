# Academia — Home Page UI/UX & Visual Redesign Blueprint
## Phase 01 — Audit the Home Page before merging the public site into one page

> Status: Design decision document — no implementation code.
>
> Scope: `/` Home/Landing page only.
>
> Important: the deployed URL `https://academia-platform.vercel.app` was not retrievable from the current web environment, so this document does **not** pretend to contain a pixel-level visual inspection of the live deployment. The audit is grounded in the current GitHub source, translations, design documentation, and the existing Home implementation.

---

# 1. Strategic Decision

The public-facing Academia experience will eventually become **one intentional landing page**.

The authenticated product remains a multi-page application centered around the user's dashboard.

Therefore:

```text
PUBLIC
/
└── One-page product story

AUTH
/login
/register

APPLICATION
/dashboard
/courses/...
/teachers/...
/learning/...
/exam/...
/mistakes/...
/schedule/...
...
```

The Home page should therefore not behave like a sitemap.

Its job is:

1. Explain what Academia is.
2. Establish who it is for.
3. Demonstrate how the product works.
4. Show the product rather than merely describing features.
5. Build trust without inventing proof.
6. Give the user one obvious next action.
7. Lead naturally to registration.

The page should NOT attempt to expose every feature, every role, every technical capability, or every route.

---

# 2. Current Home Page Inventory

The current `/` implementation contains these major sections:

1. Hero
2. "What happens after registration?" — 4 steps
3. Free-start / value proposition
4. Features Bento grid
5. Roles — student / teacher / parent
6. Blog teaser
7. Final CTA
8. Testimonials placeholder
9. Shared global header/footer

The current Hero also contains:

- badge
- headline
- supporting paragraph
- primary CTA
- secondary CTA
- 3 statistic cards
- browser/dashboard mockup
- 2 floating glass cards
- 3 subject progress rows
- dashboard mini statistics
- weekly activity bars
- 3D tilt
- glassmorphism
- mesh/gradient background

The source confirms that the current Hero mockup is built from UI primitives rather than a screenshot, and that several displayed values are explicitly demo values rather than real analytics.

---

# 3. Global Art Direction for the Home Page

## Direction

Use:

> Human Editorial Geometry

with:

- Playful Geometric vocabulary
- restrained Bauhaus influence
- editorial composition
- real photography where useful
- strong Arabic typography
- meaningful geometric forms
- controlled color
- generous negative space
- product evidence

Do NOT apply the original Playful Geometric prompt literally.

Avoid:

- purple/pink/yellow Memphis palette
- sticker-card everywhere
- hard black borders everywhere
- random confetti
- decorative blobs
- bounce on every element
- glassmorphism as a default surface
- generic gradient meshes
- icon + title + description repetition
- identical card grids
- meaningless statistics

The design system is a vocabulary, not a template.

---

# 4. Home Page Narrative

The Home page should tell one story:

```text
1. This is Academia.
        ↓
2. It is built for Palestinian Tawjihi students.
        ↓
3. Here is the problem it solves.
        ↓
4. Here is how the learning journey works.
        ↓
5. Here is what the actual product looks like.
        ↓
6. Here are the few capabilities that matter.
        ↓
7. Here is why you can start without risk.
        ↓
8. Start using Academia.
```

The exact section order can change after visual prototyping, but the narrative should remain coherent.

---

# 5. SECTION 01 — HERO

## Current role

The current Hero tries to do too much simultaneously:

- introduce the brand
- state the value proposition
- show three statistics
- show a dashboard
- show progress
- show weekly activity
- show streaks
- show floating achievements
- use glassmorphism
- use gradients
- use 3D

The current source uses a `HeroMockup`, three external statistic cards, two floating cards, a glass surface, mesh background, and a 3D browser-style dashboard.

## Decision

### Rebuild the Hero.

Do not simply restyle the current Hero.

---

## Hero objective

Within approximately 3 seconds the visitor should understand:

> Academia is a learning platform for Palestinian Tawjihi students that helps them organize study, track progress, and improve through practice.

---

## Hero content

### Eyebrow

Current:

> لطلاب التوجيهي في فلسطين

Keep the idea.

Possible stronger presentation:

> لطلاب التوجيهي في فلسطين

Use it as a small editorial label, not a glass pill.

No Trophy icon.

---

## Main headline

Current:

> رتّب دراسة التوجيهي وابـدأ بثقة مع أكاديميا.

The existing message is directionally good because it is specific to Tawjihi students.

Do not replace it with generic marketing such as:

> Your smarter way to learn.

The headline should remain Arabic-first and product-specific.

Recommended conceptual structure:

> رتّب دراسة التوجيهي  
> **وابدأ بثقة مع أكاديميا.**

The emphasized phrase should NOT require a gradient.

Use typography, weight, or a small geometric underline/accent instead.

---

## Supporting copy

Current meaning:

> كل موادك، اختباراتك، أخطاؤك وتقدّمك في مكان واحد — لتعرف ماذا تدرس الآن وأين تحتاج إلى التحسين.

Keep the substance.

The copy is useful because it answers:

- what is included
- what problem is solved
- what outcome the student gets

Possible refinement:

> كل موادك، اختباراتك، أخطاؤك وتقدّمك في مكان واحد — لتعرف ماذا تدرس الآن، وما الذي يحتاج إلى مراجعة.

Do not add technical terminology.

Do not mention:

- React
- AI
- dashboard architecture
- API
- RTL
- design system
- technical implementation
- internal modules

The visitor does not need them here.

---

## CTA

Primary:

> ابدأ مجاناً

Keep.

Secondary:

Current:
> شوف كيف بتبدأ

Change conceptually to an anchor action:

> كيف تعمل أكاديميا؟

This should scroll to the learning journey section instead of opening `/how-it-works`.

---

## Hero visual

### Current

The current `HeroMockup` contains:

- browser frame
- glass surface
- 3D tilt
- user greeting
- notification
- 3 mini stats
- 3 subject progress rows
- weekly activity chart
- 2 floating glass cards

### Decision

Keep the idea of showing the product.

Rebuild the composition.

The product mockup is valuable because it is actual product evidence rather than a decorative illustration.

---

## New Hero visual structure

Use:

```text
Typography / CTA          Product visual

                         ┌─────────────────┐
                         │ Academia        │
                         │                 │
                         │ Progress        │
                         │                 │
                         │ Subjects        │
                         │                 │
                         └─────────────────┘
                              amber light
```

### Product visual should be:

- flatter
- cleaner
- less "floating SaaS"
- less glass
- less 3D
- more editorial
- larger and more readable
- clearly recognizable as Academia

The mockup should feel like a **real product preview**, not a fake Dribbble dashboard.

---

## Hero mockup content

Keep only the information that communicates the product:

1. student identity
2. current progress
3. real subject names
4. one meaningful progress signal
5. one next action

Recommended subject labels:

- اللغة العربية
- الرياضيات
- الفيزياء

Use actual product terminology.

Do not show anonymous icons instead of subject names.

---

## Remove from Hero

### Remove:

- external 3-stat row:
  - 4 levels
  - 100% RTL
  - 3 spaces

Reason:

These are not persuasive proof metrics.

"100% RTL" is an implementation characteristic, not a user benefit.

"4 levels" and "3 spaces" are not meaningful trust metrics.

### Remove:

- two floating glass cards
- "12 lessons this week"
- "12-day streak"

Reason:

They are decorative demo evidence and compete with the actual product preview.

### Remove:

- browser "Preview" pill
- unnecessary browser chrome if it does not improve recognition

### Reduce:

- 3D tilt
- shadow
- glass effect

---

## Hero geometric treatment

Use exactly one primary geometric focal element.

Recommended:

- soft amber spotlight behind the product
- one geometric arc/circle partially intersecting the mockup
- no full-page mesh

The glow should sit BEHIND the product.

It should not extend across the entire Hero.

Do not use blue + green + violet + amber gradients simultaneously.

---

## Hero photography

Do NOT force a photograph into the Hero if it makes the product preview weaker.

The Hero already has a strong reason to show the actual product.

Photography should be introduced later where it creates emotional/contextual value.

Do not use generic stock photography.

---

## Hero spacing

Use significant negative space.

Do not add an element merely because an empty area exists.

The empty space is part of the design.

---

# 6. SECTION 02 — "WHAT HAPPENS AFTER REGISTRATION?"

## Current content

Current heading:

> ماذا يحدث بعد التسجيل؟

Current four steps:

1. اختر فرعك
2. جهّز مساحتك
3. ابدأ اختباراً قصيراً
4. راجع بتركيز

The content is useful.

The current problem is the presentation: four identical icon cards.

## Decision

Keep the concept.

Rebuild the visual presentation completely.

---

## New composition

This should become the first major Playful Geometric section.

Instead of four cards:

```text
[01] [02] [03] [04]
```

create a **learning path**.

Concept:

```text
اختر فرعك
    ●
     \
      ● جهّز مساحتك
             \
              ● ابدأ اختباراً
                         \
                          ● راجع بتركيز
```

The path is not decorative.

It represents the actual user journey.

---

## Visual language

Use:

- one continuous path
- 4 milestones
- one geometric shape per milestone
- small contextual imagery/illustration where useful
- strong typography
- large numbers
- no repeated cards

The path may become a signature visual element for Academia.

---

## Content

Keep the four steps.

Shorten descriptions if necessary.

Do not add technical details.

The user needs to know what happens after registration.

This is product information.

---

# 7. SECTION 03 — FREE START / VALUE

## Current

Current message:

> ابدأ مجاناً — وشوف قيمة أكاديميا بنفسك

with a five-item list:

- إنشاء حساب وملف طالب
- اختيار الفرع والمواد
- متابعة الإنجاز الأساسي
- البدء باختبار تشخيصي
- حفظ الأخطاء للمراجعة

and trust note:

> بدون بطاقة بنكية للبدء • عدّل موادك لاحقاً • مصمم بالعربية أولاً

## Decision

Keep this section conceptually, but reduce its visual weight.

It is useful conversion information.

---

## Do NOT make it another card grid

Instead:

Large statement on one side.

On the other side:

a compact "included" checklist.

Possible composition:

```text
ابدأ مجاناً
────────────

جرّب أساسيات المنصة
قبل أن تقرر.

✓ إنشاء الحساب
✓ اختيار المواد
✓ متابعة الإنجاز
✓ اختبار تشخيصي
✓ حفظ الأخطاء
```

Add a small trust line below.

---

## Photography

Not necessary.

The content is functional/conversion-oriented.

A decorative photo here would probably add noise.

---

## Geometry

Use a small amber/emerald geometric accent only.

No illustration required.

---

# 8. SECTION 04 — FEATURES

## Current

The current section is:

> أدوات مرتبطة بطريقة دراستك

with a 7-item Bento grid.

Features include:

- المكتبة الذكية
- امتحاناتي التجريبية
- مجتمعات المواد
- متابعة الإنجاز
- بنك أخطائي
- مراجعة الـ15 دقيقة
- أساتذة من كل مكان...

The current implementation uses multiple illustrations and icon cards.

## Decision

### Do NOT show all seven as equal features.

This is one of the biggest changes.

A landing page should communicate the product model, not enumerate the codebase.

---

## New feature structure

Group the product into 3–4 meaningful capabilities.

Recommended:

### 01 — تعلّم منظّم

Contains:

- المكتبة
- المواد
- الدروس
- المراجعة

### 02 — اعرف مستواك

Contains:

- الاختبارات
- الإنجاز
- التقدم
- التشخيص

### 03 — تعلّم من أخطائك

Contains:

- بنك الأخطاء
- إعادة المراجعة
- نقاط الضعف

### 04 — تعلّم مع الآخرين

Contains:

- المدرسين
- المجتمعات
- الكورسات

This is much easier for a new visitor to understand.

---

## Visual presentation

Do not use four identical cards.

Use a modular editorial layout:

```text
┌──────────────────────────────┐
│ 01                            │
│ تعلّم منظّم                   │
│                              │
│       PRODUCT IMAGE           │
│                              │
└──────────────────────────────┘

┌───────────────┐ ┌─────────────┐
│ 02            │ │ 03          │
│ اعرف مستواك   │ │ أخطاؤك      │
└───────────────┘ └─────────────┘

┌──────────────────────────────┐
│ 04  تعلّم مع الآخرين         │
└──────────────────────────────┘
```

The actual layout can be asymmetrical.

---

## Images

This section is a strong candidate for real visual assets.

Use:

- actual screenshots/crops of Academia UI
- real educational photography
- or carefully designed contextual illustrations

Do NOT replace every card with an icon.

The visitor should see what the product actually does.

---

## Most important feature visual

The Library should probably get the strongest visual treatment because the current code already treats it as the flagship feature.

But verify the actual product's current library UX before final implementation.

---

# 9. SECTION 05 — ROLES

## Current

Three cards:

- طالب
- معلّم
- ولي أمر

Current copy explains the role.

## Decision

Do not present these as three generic feature cards.

The concept is useful, but it belongs to information architecture rather than feature marketing.

---

## Better presentation

Use a horizontal role switcher or editorial split.

Example:

```text
من يستخدم أكاديميا؟

[ الطالب ] [ المعلّم ] [ ولي الأمر ]

--------------------------------

For selected role:
headline
short explanation
one visual
one relevant outcome
```

Only one role needs to be visually dominant at a time.

---

## Student should be primary

Because the core product positioning is centered around the student.

Teacher and parent should be secondary perspectives.

Do not make all three look equally important if the product itself does not treat them equally.

---

## Visuals

Student:

- actual student dashboard screenshot
- study image
- progress visual

Teacher:

- teacher dashboard / course management visual

Parent:

- concise progress/report visual

Do not use three generic avatars.

---

# 10. SECTION 06 — BLOG

## Current

The Home page shows two latest blog posts plus a link to `/blog`.

## Decision

This section is optional.

It should NOT be present simply because the project has a blog route.

Keep it only if the blog is an actual strategic content channel.

If there is not enough high-quality content, remove it from the main landing narrative.

---

## If retained

Do not show two generic text cards.

Use:

- one featured article
- one smaller secondary article

with:

- category
- title
- short excerpt
- meaningful image

Photography/cover imagery is strongly recommended here.

This is one of the places where real imagery has actual value.

---

# 11. SECTION 07 — FINAL CTA

## Current

> جاهز تبدأ أول جلسة دراسة؟

> أنشئ حسابك مجاناً، اختر فرعك وموادك، وابدأ بأول اختبار خلال دقائق.

CTA:

> ابدأ أول جلسة مجاناً

## Decision

Keep the concept.

But it should feel like the conclusion of the story, not another Hero.

---

## New composition

Use a quiet, confident ending.

Example structure:

```text
        جاهز تبدأ؟

    أول خطوة بسيطة.

       [ ابدأ مجاناً ]

     لا تحتاج بطاقة بنكية
```

Use one geometric signature element.

Do not create a giant gradient CTA.

Do not repeat the entire Hero.

---

# 12. SECTION 08 — TESTIMONIALS

## Current state

The repository explicitly states that there are no real testimonials yet.

The current component intentionally shows a placeholder/skeleton and "coming soon" style content instead of inventing testimonials.

## Decision

Do NOT fabricate testimonials.

Do NOT use AI-generated names/photos.

Do NOT use fake student reviews.

For the current launch:

### Remove the testimonial section from the main landing page.

Why:

An empty testimonial area communicates lack of proof more strongly than no testimonial area at all.

When real testimonials exist, add them back.

---

# 13. SOCIAL PROOF — WHAT TO DO INSTEAD

Until real users and measurable results exist, use **product proof**, not fake social proof.

Possible proof:

- actual product screenshots
- real workflow demonstrations
- real course/content examples
- transparent explanation of what exists today
- real founder/team information if appropriate
- verified usage numbers only when they exist

Never manufacture:

- user counts
- success rates
- student outcomes
- ratings
- testimonials
- "trusted by" logos

---

# 14. GLOBAL HEADER

Current navigation includes many separate routes:

- Home
- Courses
- Teachers
- How it works
- Pricing
- For teachers
- For parents

After the one-page transition, the public header should become much smaller.

Recommended:

```text
Academia

كيف تعمل
المواد
المدرسون
المنصة

              دخول
           [ ابدأ الآن ]
```

Each item should scroll to a meaningful section.

The logo returns to the top.

Do not expose every section in the header.

---

# 15. GLOBAL FOOTER

The footer can remain more comprehensive than the header.

Keep:

- legal
- privacy
- terms
- help
- contact
- social links
- blog if retained
- relevant public routes

The footer is the correct place for secondary navigation.

Do not overload the main landing navigation.

---

# 16. WHAT CONTENT SHOULD NEVER APPEAR IN THE LANDING PAGE

Do not expose technical implementation details such as:

- React
- TypeScript
- Tailwind
- API architecture
- component system
- database
- RTL implementation
- semantic tokens
- SRS terminology
- backend limitations
- internal route names
- internal roles/permissions implementation

Those are engineering details, not user value.

Exception:

If a technical characteristic creates direct user value, translate it into the benefit.

Example:

Bad:

> 100% RTL implementation.

Better:

> واجهة عربية مصممة من البداية للقراءة والتنقّل الطبيعي بالعربية.

Even then, this does not necessarily belong in the Hero.

---

# 17. CONTENT THAT SHOULD BE SHOWN

Show:

- what Academia is
- who it is for
- what problem it solves
- how the student starts
- how studying is organized
- how progress is tracked
- how mistakes are reviewed
- how teachers/courses fit into the ecosystem
- what the product actually looks like
- what the free starting experience includes
- what the next action is

---

# 18. IMAGE STRATEGY

Not every section needs an image.

Recommended:

| Section | Image? | Reason |
|---|---|---|
| Hero | Product visual | Product evidence |
| Learning Journey | Optional illustration | Explain process |
| Free Start | No | Functional conversion section |
| Features | Yes | Product evidence / contextual imagery |
| Roles | Yes | Show different experiences |
| Blog | Yes | Editorial content |
| Final CTA | No | Keep conclusion focused |
| Testimonials | Only when real | Real people/proof |

---

# 19. IMAGE PLACEMENT RULES

Images should not automatically become:

```text
rounded card + shadow + centered image
```

Use different treatments:

- edge crop
- editorial crop
- asymmetric frame
- partial overlap
- full-bleed image
- product screenshot
- masked geometry
- image behind text only when contrast remains excellent

Blurred background images should be rare.

Do not put a blurred image behind every section.

---

# 20. SVG / ILLUSTRATION POLICY

Remove SVGs when they are merely:

- decorative filler
- generic feature symbols
- abstract blobs
- generic AI-style visual noise
- redundant with text

Keep SVG/illustration when it:

- explains a concept
- represents a real product workflow
- communicates educational meaning
- acts as a recognizable Academia visual motif

The rule is not:

> "SVGs are bad."

The rule is:

> "Decorative assets must earn their space."

---

# 21. DESIGN DENSITY

The Home page should alternate between:

```text
expressive
    ↓
quiet
    ↓
informational
    ↓
expressive
    ↓
quiet
```

Do not make every section visually loud.

This rhythm is important for a premium feel.

---

# 22. TYPOGRAPHY DIRECTION

Typography should carry more of the visual identity.

Use:

- strong Arabic headline
- clear hierarchy
- large but controlled display size
- short paragraphs
- comfortable line length
- meaningful weight differences

Do not use gradients to create hierarchy.

Do not make every heading huge.

Do not center every section.

RTL composition should follow Arabic reading direction naturally.

---

# 23. COLOR DIRECTION

Use Academia's existing palette:

- Deep Navy `#0A0F1C`
- Azure `#3E8EDE`
- Amber `#F0A62E`
- Emerald `#17A672`
- restrained Violet `#9A6AD6`

Do not introduce the original Playful Geometric purple/pink/yellow palette.

Use one dominant accent per composition.

Example:

Hero:
- neutral + amber

Progress:
- neutral + emerald

Interactive:
- neutral + azure

Achievement:
- neutral + amber

---

# 24. MOTION

Keep motion semantic.

Recommended:

- subtle section reveal
- button feedback
- product mockup micro-interaction
- learning path progression if meaningful

Remove:

- permanent floating cards
- constant wiggle
- excessive bounce
- infinite decorative motion

Respect `prefers-reduced-motion`.

---

# 25. HOME PAGE TARGET STRUCTURE

Recommended final structure:

```text
HEADER
│
├── HERO
│
├── LEARNING JOURNEY
│
├── PRODUCT / HOW IT HELPS
│
├── CORE CAPABILITIES
│
├── ROLES / ECOSYSTEM
│
├── FREE START
│
├── OPTIONAL BLOG
│
├── FINAL CTA
│
└── FOOTER
```

The exact order should be validated after the first visual prototype.

---

# 26. What We Should NOT Do Yet

Do not:

- merge all routes yet
- rewrite every page
- redesign the dashboard
- create dozens of new components
- introduce new dependencies
- generate dozens of images
- create a giant new token system
- blindly apply Playful Geometric to every component

First validate the Home page.

---

# 27. Implementation Order

### Pass 1 — Content

Finalize:

- Hero copy
- section hierarchy
- what stays
- what disappears
- what is renamed

### Pass 2 — Composition

Design:

- grid
- image placement
- visual focal points
- negative space
- section rhythm

### Pass 3 — Visual system

Apply:

- typography
- color
- geometry
- imagery
- borders
- shadows

### Pass 4 — Interaction

Apply:

- anchors
- hover states
- subtle motion
- scroll behavior

### Pass 5 — Responsive

Validate:

- mobile
- tablet
- desktop
- RTL
- LTR

### Pass 6 — Screenshot review

Review the actual rendered page.

Do not approve from code alone.

---

# 28. Home Page Acceptance Criteria

The redesign is not complete until:

- The visitor understands Academia within seconds.
- The primary CTA is obvious.
- The page feels specific to Academia.
- The design does not look like generic AI SaaS.
- The product is visually demonstrated.
- There are no fake statistics or fake testimonials.
- Decorative SVGs are justified.
- Photography has a purpose.
- Typography carries meaningful personality.
- Sections do not all look identical.
- The page works naturally in Arabic RTL.
- The page works naturally in English LTR.
- Mobile preserves hierarchy.
- Motion does not interfere with reading.
- The page does not feel empty merely because decoration was removed.
- The page does not feel crowded merely because content exists.

---

# 29. Most Important Design Rule

Do not ask:

> "What can we add to make this section prettier?"

Ask:

> "What does the visitor need to understand here, and what is the strongest visual way to communicate it?"

Then choose:

- text
- screenshot
- photography
- illustration
- geometry
- data
- interaction
- or nothing

based on the answer.

---

# 30. Current Home Page Decisions — Summary

| Current element | Decision |
|---|---|
| Hero | Rebuild |
| Hero headline | Keep meaning, refine presentation |
| Hero supporting text | Keep meaning, refine |
| Primary CTA | Keep |
| Secondary CTA | Convert to anchor |
| Hero 3D mockup | Keep concept, rebuild |
| Hero glass | Reduce heavily |
| Hero gradients | Replace with one controlled amber focal light |
| Floating glass cards | Remove |
| Hero external statistics | Remove |
| Subject names | Add |
| Learning journey 4 cards | Keep content, change to path composition |
| Free-start section | Keep, simplify |
| 7 feature cards | Consolidate into 3–4 capability groups |
| Feature illustrations | Keep only when they explain something |
| Roles cards | Replace with role-oriented composition |
| Blog teaser | Optional; keep only if strategically active |
| Final CTA | Keep, simplify |
| Testimonials placeholder | Remove until real testimonials exist |
| Fake/social proof | Never add |
| Technical copy | Remove from marketing content |
| Header | Convert to anchor navigation |
| Footer | Keep secondary navigation |
| Public pages | Merge later, after Home is validated |

---

# 31. Source Basis

Primary repository sources reviewed:

- `src/routes/index.tsx`
- `src/components/site/hero-mockup.tsx`
- `src/components/site/public-layout.tsx`
- `src/components/site/testimonials-section.tsx`
- `src/i18n/locales/ar.json`
- `docs/design/design-system.md`
- existing UX/design documentation in `docs/design/`
- product/SRS documentation in `docs/product/`

The current source confirms that the Hero uses a UI-built dashboard preview, demo analytics, floating glass cards, and 3D perspective; the Home page currently contains the sections described above.

The current testimonial component explicitly avoids fabricated quotes and names.

The existing design system already requires semantic tokens, accessible focus states, RTL/LTR support, controlled motion, and named typography utilities. The redesign should preserve these engineering foundations.
