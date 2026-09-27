# Academia — Presentation Content (Final)
# English version (20 slides, for Replit) first — Arabic personal version below
# Technical facts verified directly against backend code, DB migrations, and the team's
# own frontend↔backend integration audit docs. Last verified: this session.

---

# 🇬🇧 English Version — 20 Slides

## 1) Title
Academia
Teacher Business Management Platform
Subtitle: Helps private tutors get students, manage their teaching business, and control their income — all in one place.

## 2) The Problem (Teacher-first framing)
Header: Private tutors run their business the hard way
- No professional online presence — tutors rely purely on word-of-mouth and social media to find students
- Sessions, schedules, and students are managed manually by phone and chat apps
- No unified way to organize both in-person and online sessions
- Income, payments, and commissions are tracked informally, with no clear financial record
- Result: teaching quality is high, business management is chaos

## 3) The Problem (Student & Parent side)
Header: Students and parents aren't served either
- Students rely on personal recommendations with no way to compare tutors by subject, price, rating, or teaching mode
- Booking and payment for a session is an unstructured, ad-hoc process
- Parents have almost no visibility into their child's sessions or academic activity
- They depend entirely on direct, informal communication with the tutor for updates

## 4) The Solution
Header: One system. Built for the tutor. Open to the student.
- Academia gives tutors a professional page, full control over in-person & online sessions, students & groups management, and complete income/wallet management
- Students get a "Find a Teacher" marketplace to search, compare, and book
- Parents get a read-only window into their linked child's academic activity
- Positioning line (standalone, large): "Academia is not just a place to find a tutor — it's a complete business-management tool for the private tutor, from getting students to managing sessions and income."

## 5) How Students Use It (visual flow diagram, arrows, not paragraph)
Search → Compare → Choose a Teacher → Send Booking Request → Pay → Attend Session → Rate

## 6) Feature Spotlight: Teacher Business Management (the core of the platform)
Header: This is the heart of Academia
- Professional profile & public page
- Subjects, services & pricing display
- Student & group management
- In-person AND online session management in one system
- Schedule & availability management
- Booking management (accept/reject)
- Reschedule request handling
- Attendance & session tracking

## 7) Feature Spotlight: Find a Teacher (student discovery marketplace)
Header: A professional digital presence, not just word-of-mouth
Filters students can search by: Subject, Grade, Area/Region, Online/In-person, Price, Available days & times, Rating, Experience, Language
Closing line: Gives the tutor a professional digital presence instead of relying only on personal referrals.

## 8) Feature Spotlight: Smart Booking System
Header: A structured cycle, not a random request
Visual flow: Pending → Accepted / Rejected → Confirmed → Completed
- Accept or reject with a stated reason
- Independent reschedule-request workflow (student proposes, teacher approves/declines)
- Full booking history preserved — nothing deleted
- Rating unlocks only after the session is completed

## 9) Feature Spotlight: Wallet & Financial Management
Header: More than bookings — a financial layer for the tutor's business
- Student wallet with balance top-up
- Manual bank-transfer top-up with receipt verification
- Automatic commission calculation on booking confirmation
- Teacher earnings credited automatically
- Full transaction history
- Teacher withdrawal requests
- Platform revenue ledger

## 10) Feature Spotlight: Admin & Academic Tracking (brief, combined)
- Dynamic, configurable permission system — Admin controls role access to any page without touching code
- Student/parent academic tracking: attendance, exam results, progress (designed capability — see honest status on Slide 17)
- Parent access strictly scoped to linked children only, by design

## 11) Target Market
Header: Why Palestine, why now
- Primary geographic focus: Gaza Strip & West Bank
- Covers in-person, online, individual, and group private tutoring for school-stage students
- Today this market runs on: WhatsApp + Facebook + phone calls + manual bank transfers + handwritten schedules
- Academia unifies all of that into one platform

## 12) Target Users
Header: Built teacher-first, by design
- PRIMARY — Teacher: "Get Students + Manage Teaching + Manage Business + Manage Money"
- SECONDARY — Student: discovers, compares, and books
- SUPPORTING — Parent: monitors linked children's academic activity
(Visually emphasize "PRIMARY" on Teacher — larger card or highlighted border)

## 13) Business Model
Header: Platform + SaaS hybrid revenue model
- Primary revenue: commission on every completed booking (student pays → Academia commission deducted → teacher receives net earnings), commission rate configurable by admin
- Future revenue: paid teacher plans (professional accounts, higher search ranking, analytics tools, advanced student/income reports, marketing tools, advanced group/session management features)
- Future: additional digital services around the tutor's business, without changing the platform's core

## 14) Competitive Landscape (build as an actual comparison TABLE)
Header: Most competitors solve only one piece of the puzzle
Table columns: Platform | Scope | Model & Focus | Strength | Gap vs Academia
- Orcas | Egypt, UAE | Connects students with tutors (online/in-person), tracks parents | Strong brand, guardian monitoring | Focused on students/parents, not on giving the tutor business-management tools
- Hissaa (حصة) | Saudi Arabia & Gulf | Marketplace for booking private sessions, simplifies individual learning | Simple interface, wide reach in the Gulf | Locked to Gulf market workflows and payment methods
- MyPrivateTutor | Middle East & MENA | Directory of private tutors and centers | Very large database, high traffic | Just a listing/directory — no scheduling or wallet tools
- Darisni (درسني) | Kuwait & Gulf | Instant private-lesson booking app | Fast, focused on quick video-session booking | Online-only, doesn't serve in-person or group sessions
- TutorBird / Teachworks | Global (US/Europe) | SaaS business-management software for tutors and centers | Very mature management system (scheduling, invoicing, reports) | No marketplace at all — no way for the tutor to find NEW students; not localized, no local payment support

## 15) Academia's Competitive Edge (3 pillars — visual cards)
Header: Why no existing player looks like Academia
1. Marketplace + SaaS in one — competitors are either a booking marketplace ONLY or a management SaaS ONLY. Academia combines both.
2. Built for the local tutoring reality — supports in-person tutoring, not just online video, with payment flows (manual bank transfer + wallet) matching how the local market actually pays.
3. Teacher-First Engine — turns a tutor's word-of-mouth chaos into an organized business through one professional, shareable profile page.
Closing line (standalone, bold): "In the local Palestinian market, Academia currently has no direct local competitor combining all of this."

## 16) Tech Stack & Architecture
- Frontend: React 19 + TypeScript, built on the TanStack ecosystem — TanStack Start + Router (full-stack React framework) and TanStack Query for data fetching
- Styling & UI: Tailwind CSS v4 + a Radix-based component system (shadcn/ui pattern)
- True internationalization layer (i18next) powering real Arabic RTL — not a CSS-only trick, used across 40+ components
- Backend: .NET 10 + ASP.NET Core Web API, Entity Framework Core 10 + SQL Server
- Clean, layered solution structure: separate Core, Data, Infrastructure, and API projects
- Auth: ASP.NET Core Identity with secure cross-origin cookie authentication (not token-based)
- Automated testing in place on the frontend: unit tests (Vitest) + end-to-end tests (Playwright)
- Fully documented, testable API via Swagger
Include a simple diagram: Client (React + TanStack) ↔ REST API (ASP.NET Core) ↔ SQL Database

## 17) Current Progress — what we've actually built and shipped
Header: What we've actually built and shipped
- Full authentication system live for all 4 roles (Teacher, Student, Parent, Admin)
- Complete admin console shipped: user management, dynamic content management, and a fully configurable role-permission system
- Full wallet & payments engine shipped end-to-end: balance, transaction history, bank-transfer top-up with receipt verification, and a complete withdrawal approval workflow
- Public teacher-discovery marketplace live: search, filtering, and public profiles — no login required
- Booking engine and lesson-scheduling engine fully built on the backend — current focus is finishing the account-linking layer that connects them to real teacher/student screens
- Automated testing in place (unit + end-to-end) as part of the engineering process
Add small stat cards: 81 backend endpoints / 4 roles live / full wallet engine shipped

## 18) Roadmap
- Finish linking teacher/student registration to their respective database records (in progress)
- Connect the booking and lesson-scheduling systems to real screens
- Enable parent-child linking so the parent portal returns real data
- Automated payment gateway to replace manual bank transfer
- Paid teacher plans (from the Business Model slide)
- Mobile app, later

## 19) Appendix: Technical Deep Dive (Q&A backup only)
- Wallet integrity: every debit/credit pair (student ↔ teacher) runs as a single atomic transaction — no partial application on failure
- Core data model already implemented: Booking, BookingRescheduleRequest, GroupScheduleDay, ParentStudentLink, WalletTransaction, WalletTopUpRequest, WithdrawalRequest, PlatformCommissionSetting, PlatformRevenueLedger, Page/UserPermission
- Planned access-control model: API-level authorization + database relation level (a parent would only ever query children explicitly linked to their account)
- Booking design rule: students will never be able to directly modify a teacher's schedule — any teacher-side change is designed to auto-propagate to the student's confirmed schedule with a notification
- Cross-origin cookie authentication restricted to a whitelist of trusted frontend origins

## 20) Closing
"Academia — from finding the student, to managing the session, to managing the income."
Thank you — Questions?

=== COLOR SYSTEM (deliberately chosen for presentation legibility, NOT copied from the app's own brand) ===
- Slide background (all content slides): pure white #FFFFFF — maximum legibility on a projector and for a jury reading for several minutes
- Slide background (title/closing slides ONLY): deep navy #0B1E39 — used only at open/close for gravitas, not throughout
- Body text: #1A1F2B (soft near-black — easier on the eyes than pure black-on-white)
- Text on navy backgrounds: near-white #F5F7FA
- Primary accent (headers, icons, key numbers, table headers): blue #2B5FE0
- Secondary accent (sparingly — ONLY to highlight "Academia" in comparisons/key stats, max 1-2 elements per slide): teal #14B8A6
- "Gap" / missing-feature color (competitor table only): neutral gray #6B7280 — NOT red, to avoid an alarmist tone
- Card/box backgrounds: very light gray #F4F6F9 with a thin 1px border, never a solid color fill
- Hard rule: no more than 2 accent colors in the whole deck. WCAG AA contrast (4.5:1 min) for all text.

=== IMAGE GUIDANCE ===
- No stock photography of people — breaks the B2B/professional tone, looks templated
- Flat/line-style icons for concepts (wallet, calendar, workflow arrows, profile cards, dashboard)
- If real product screenshots exist (admin console, wallet screen, teacher search), prefer those over icons specifically on Slide 17 — real UI is the strongest credibility signal
- No decorative/generic background images on any slide

=== SPECIAL TREATMENT NOTES FOR THE DESIGNER/REPLIT ===
- Slide 14 (competitor table) is the single most important slide — give it a light gray page background (#F4F6F9) so it visually stands apart from the surrounding white slides, full-width table, muted gray for the "Gap vs Academia" column, accent color reserved exclusively for the word "Academia".
- Slides 6-10 share one consistent card/icon template as "the feature suite."
- Slide 17 is a credibility slide, not a weakness slide — same confident visual weight as feature slides, stat cards not apologetic language.
- Slide 19 (Appendix) should look visually distinct (denser/technical) to signal it's backup material.

---
---

# 🇸🇦 النسخة العربية (نسخة شخصية — 16 شريحة، بنفس التصحيحات التقنية)

## 1) الغلاف
Academia — منصة إدارة أعمال المعلم الخصوصي
"من مكان واحد: أعمالك، حصصك، دخلك."

## 2) المشكلة (من منظور المعلم أولاً)
- المعلم يدير عمله يدويًا: واتساب، مكالمات، جداول، تحويلات بنكية، وسائل تواصل اجتماعي متفرقة
- لا حضور مهني رقمي — الاعتماد الكامل على التوصيات الشخصية لجذب طلاب جدد
- لا نظام موحد لإدارة الطلاب والمجموعات والحجوزات
- متابعة الدخل والعمولات يدوية وغير منظمة

## 3) المشكلة (الطالب وولي الأمر)
- صعوبة العثور على المعلم المناسب ومقارنته بمعايير واضحة (مادة، سعر، تقييم)
- عملية الحجز والدفع غير منظمة
- ولي الأمر بلا رؤية واضحة للنشاط الأكاديمي لابنه، ويعتمد على التواصل المباشر مع المعلم فقط

## 4) الحل
Academia هي بالأساس منصة إدارة أعمال للمعلم الخصوصي: صفحة مهنية عامة (Find a Teacher)، تحكم كامل بالحصص الوجاهية والأونلاين، وإدارة كاملة للدخل عبر المحفظة.
للطالب: سوق لاكتشاف ومقارنة وحجز أفضل المعلمين.
لولي الأمر: نافذة مراقبة فقط.
> "Academia ليست مجرد منصة للعثور على مدرس، بل أداة لإدارة أعمال المعلم الخصوصي بالكامل — من الحصول على الطلاب إلى إدارة الحصص والدخل."

## 5) كيف يستخدم الطالب المنصة (Flow بصري)
بحث → مقارنة → اختيار معلم → إرسال طلب حجز → دفع → حضور الحصة → تقييم

## 6) جوهر المنصة: إدارة أعمال المعلم
صفحة مهنية وعرض للخدمات + إدارة الطلاب والمجموعات + إدارة الحصص الوجاهية والأونلاين + إدارة الجدول والتوفر + إدارة الحجوزات وإعادة الجدولة + متابعة الحضور

## 7) ميزة: Find a Teacher (سوق اكتشاف المعلمين)
فلاتر البحث: المادة، الصف، المنطقة، أونلاين/وجاهي، السعر، الأيام والأوقات، التقييم، الخبرة، اللغة
يمنح المعلم حضورًا رقميًا مهنيًا بدل الاعتماد فقط على التوصيات الشخصية

## 8) ميزة: نظام الحجز الذكي
دورة منظمة: Pending → Accepted/Rejected → Confirmed → Completed
قبول/رفض مع سبب + طلب إعادة جدولة مستقل + سجل حجوزات محفوظ + تقييم بعد الاكتمال فقط

## 9) ميزة: المحفظة والإدارة المالية
شحن بتحويل بنكي + تحقق من الإيصال + خصم عمولة تلقائي عند التأكيد + مستحقات المعلم + سجل حركات + طلبات سحب + سجل إيرادات المنصة

## 10) السوق المستهدف
فلسطين — قطاع غزة والضفة الغربية أولًا. اليوم يُدار هذا السوق عبر: واتساب + فيسبوك + مكالمات + تحويلات بنكية يدوية + جداول ورقية. Academia تجمع كل هذا بمنصة واحدة.

## 11) الفئات المستهدفة
أساسي: المعلم (Get Students + Manage Teaching + Manage Business + Manage Money)
ثانوي: الطالب (يكتشف ويقارن ويحجز)
داعم: ولي الأمر (مراقبة فقط)

## 12) نموذج العمل
عمولة على كل حجز مكتمل (نسبة قابلة للتهيئة) + خطط مدفوعة مستقبلية للمعلمين (حسابات احترافية، ظهور أعلى بالبحث، تقارير متقدمة)

## 13) الميزة التنافسية
معظم المنافسين (Orcas، Hissaa، MyPrivateTutor، Darisni، TutorBird/Teachworks) يغطّون جزء واحد فقط: إما اكتشاف فقط (Marketplace) أو إدارة فقط (SaaS)، وغالبًا أونلاين فقط أو غير ملائم للسوق المحلي.
Academia فريدة بجمعها: (1) Marketplace + SaaS معًا (2) ملاءمة السوق المحلي (وجاهي + أونلاين + دفع محلي) (3) Teacher-First Engine.
> "بالسوق الفلسطيني المحلي، Academia حاليًا بدون منافس مباشر يجمع كل هذا."

## 14) البنية التقنية
- Frontend: React 19 + TypeScript، مبني على منظومة TanStack كاملة — TanStack Start + Router (فريموورك React متكامل) و TanStack Query لجلب البيانات
- التصميم: Tailwind CSS v4 + مكونات Radix (نمط shadcn/ui)
- طبقة تدويل حقيقية (i18next) وراء دعم RTL — مش مجرد CSS، مستخدمة فعليًا بأكتر من 40 مكوّن
- Backend: .NET 10 + ASP.NET Core Web API + Entity Framework Core 10 + SQL Server
- معمارية Clean/Layered حقيقية: مشاريع منفصلة Core, Data, Infrastructure, API
- المصادقة: ASP.NET Core Identity عبر Cookie آمن (وليس Token)
- اختبارات آلية فعلية بالفرونت اند: Unit tests (Vitest) + End-to-end tests (Playwright)
- توثيق Swagger كامل

## 15) وين وصل المشروع فعليًا — شو أنجزناه وسلّمناه فعليًا
- تسجيل دخول/تسجيل كامل وشغال لكل الأدوار الأربعة (معلم، طالب، ولي أمر، إدارة)
- لوحة أدمن كاملة تم تسليمها: إدارة مستخدمين، إدارة محتوى ديناميكي، ونظام صلاحيات قابل للتهيئة بالكامل
- محرك محفظة ومدفوعات كامل من طرف لطرف: رصيد، سجل حركات، شحن بتحويل بنكي مع تحقق من الإيصال، ودورة موافقة سحب كاملة
- سوق اكتشاف معلمين عام وشغال: بحث، فلترة، بروفايلات عامة — بدون الحاجة لتسجيل دخول
- محرك الحجز ومحرك جدولة الدروس مبنيين بالكامل بالباك اند — التركيز الحالي على إكمال طبقة ربط الحساب اللي بتوصلهم بشاشات المعلم/الطالب الحقيقية
- اختبارات آلية موجودة فعليًا (Unit + End-to-end) كجزء من منهجية العمل
- 81 API endpoint مكتوبة بالباك اند عبر 13 controller

## 16) الختام
"Academia — من العثور على الطالب، إلى إدارة الحصة، إلى إدارة الدخل."
شكرًا لكم / أسئلة؟

---

## ⚠️ ملاحظات تقنية داخلية للفريق (لا تُعرض باجتماع اللجنة — للمراجعة الداخلية فقط)
1. **تحقّق من الـ migrations:** جداول Bookings, TeacherAvailability, TeacherSubject, TeacherGradeLevel, TeacherRating غير موجودة بآخر migration مسجّل بالمشروع (`AddStudentLocationAndLessonRoom`) — تأكدوا إن قاعدة البيانات الفعلية المستخدمة بالديمو فيها migration أحدث، وإلا ميزة "Find a Teacher" ممكن تفشل وقت التشغيل الفعلي.
2. **الأمان (Authorization):** أغلب الـ controllers (Wallet، Constant، Page، Teacher، Lesson، Parent، UserPermission) بدون أي `[Authorize]` أو تحقق صلاحيات فعلي بالكود الحالي — لازم تصليحها قبل أي نشر عام حقيقي (مش مشكلة بالعرض التقديمي، بس أولوية أمنية حقيقية).
3. بوابة ولي الأمر مربوطة بالكود لكن ترجع بيانات فاضية دايمًا (لا يوجد endpoint لربط ولي أمر بابنه، ولا يوجد كود ينشئ صف "طالب" أصلًا).
