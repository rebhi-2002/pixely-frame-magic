# System Design & Gap Analysis (الباك اند) — مرجع خارجي

> **مصدر:** مستند تصميم نظام رسمي من الفريق (فيه تحليل فجوات، ERD
> حالي، و18 جدول مقترح). حُوّل من docx لـmarkdown للأرشفة والبحث
> النصي. **تاريخ المستند سابق لبعض التطوير الفعلي** — مثلًا يصف Wallet
> بأنه "غير مدعوم، صفر جداول مطابقة"، بينما `WalletController` وجداوله
> **مبنية فعليًا الآن** (تحقّقنا من الكود مباشرة، راجع
> [`docs/api/frontend-integration-status.md`](../api/frontend-integration-status.md)).
> يعني: تيم الباك اند نفّذ Wallet بعد كتابة هالمستند، بس لسا ما نفّذ
> باقي الـ18 جدول المقترحة (منهج/تسجيلات/حضور/امتحانات/إشعارات) ولا
> التصحيحات المقترحة بقسم 3.6 (خصوصًا `Students.UserId` و`Teachers.UserId`
> — **هاد بالضبط سبب تعطّل بوابة ولي الأمر حاليًا**، موثّق أيضًا بقسم
> Parent بملف `frontend-integration-status.md`).
>
> **كيف تستخدم هالمستند:** مرجع لفهم خطة الباك اند المستقبلية ولماذا
> بعض الفجوات موجودة (مو لتنفيذ أي شي منه بالفرونت — صفر endpoint لأي
> من الجداول الـ18 المقترحة حاليًا).
>
> **مخطط ERD مرافق:** [`assets/database-erd-2026-09-06.jpg`](assets/database-erd-2026-09-06.jpg)
> — نفس تاريخ المستند تقريبًا، **مو محدَّث**: ما فيه جداول Wallet
> إطلاقًا (تأكيد إضافي إن Wallet انبنى بعد هالتاريخ). يفيد لفهم شكل
> الجداول الأساسية (`usertypes`, `students`, `fathers`, `teachers`,
> `groups`, `grades`, `constants`, `pages`...) بس لا تعتبره دقيق
> لحالة Wallet/الصلاحيات الحالية.

---

**Academia**

**SYSTEM DESIGN DOCUMENT**

_Chapter 3 --- companion to the SRS (v1.0) and Milestone M3_

---

**Project Name** Academia

**Document** System Design (Chapter 3) --- Architecture, Data
Model, Gap Analysis, API & UI/UX Guidelines

**Prepared By** Ahmed Alkhaldi • Rebhe Ibrahim • Ziad ALNUMAILAT

**Compiled With** Claude (Anthropic) --- drafted from the team\'s
SRS, Milestones, ERD, and the academia GitHub
repository, for team review

**Supervisor** Hamza Abu Jarad

**Organization / TAQAT - CodeMap
University**

**Date** 18/08/2026

**Version** Version 1.1 (Draft for review)

---

---

**Version** **Date** **Change**

---

1.0 16/08/2026 Initial draft: architecture, current-state ERD
analysis, gap analysis, 18 proposed tables,
corrections, API & UI/UX guidelines.

1.1 18/08/2026 Wallet module revised: WalletTransactions now
records every top-up/withdrawal from submission
(Status=Pending) through to
Accepted/Rejected/Completed, split into In
(received) / Out (sent) so the wallet screen shows
a full sent-and-received history with a clear
status on each row --- including instructor
withdrawals to their bank account.
------------------------------------------------------------------------------

3\. System Design

3.1 Purpose and Relationship to Existing Documents

The SRS (v1.0) defines System Design as Stage 4 of the project and
Milestone M3 (\'System Design Completed\') requires an ERD, Architecture
Diagram, API Design, and UI/UX Wireframes to be finalized before feature
development starts. Neither the SRS nor the Milestones document
currently contains that content --- they only reference it as an
upcoming deliverable. This document fills that gap as a standalone
Chapter 3, to be read together with:

- SRS.docx --- Chapters 1--2 (objectives, scope, stakeholders,
  functional and non-functional requirements, including the fully
  specified Wallet module FR-W01--FR-W07).

- Milestones_2.docx --- the 12-week sprint plan and milestone list
  (M1--M12).

- Academia-ERD.png --- the current database diagram.

- The academia GitHub repository (ziad-kamal2001/academia) --- the
  actual ASP.NET Core solution, used to verify the ERD against real
  model classes and migrations rather than the picture alone.

> _Everything in sections 3.4--3.8 below was cross-checked directly
> against the repository\'s C# entity classes and EF Core migration
> snapshot (academia.Data/Models and academia.Data/Migrations), not only
> against the ERD image, so the gap analysis reflects what is actually
> implemented today._

3.2 System Architecture

3.2.1 Architectural Style

Academia follows a layered client--server architecture: a React.js
single-page application (client tier) communicates over REST/JSON with
an ASP.NET Core Web API (application tier), which persists data through
EF Core into a relational database (data tier). This matches SRS
sections 1.8.3 and 1.9.3 and is confirmed by the repository structure:
academia.Web/Api (controllers), academia.Infrastructure (services),
academia.Data (models, DbContext, migrations).

![](media/6852edbcb0dd60519a162f7d463c692f2a8c5a4b.png){width="6.25in"
height="2.0in"}

_Figure 3.1 --- High-level system architecture_

3.2.2 Layer Responsibilities

---

**Layer** **Responsibility** **Key
technologies**

---

Presentation Renders screens, validates input React.js 19.2,
(Client) client-side, manages UI state, calls Context API /
the API. Zustand, Axios

Controllers Expose REST endpoints, bind/validate ASP.NET Core MVC
DTOs, map HTTP responses. / Web API

Services Business rules --- enrollment C#, dependency
(Business Layer) approval, wallet injection
deduction/commission split, exam  
grading, etc.

Data Access Entity persistence, migrations, EF Core
transactions.

Cross-cutting AuthN/AuthZ (Identity + JWT + RBAC), ASP.NET Core
exception handling, CORS, logging. Identity,
Serilog/ILogger
------------------------------------------------------------------------

3.2.3 Observation on the Current Implementation

> _The repository currently has two nearly-identical projects,
> academia.Web and academia.Api, and the API project\'s controllers
> (e.g. AuthController, ConstantController) are still MVC-style --- they
> return Views and use conventional routing rather than
> \[ApiController\] / \[Route(\"api/\[controller\]\")\] attribute
> routing and DTO-only JSON responses. Since the SRS commits to a React
> SPA consuming a REST API, academia.Api should be refactored to genuine
> REST controllers before the new modules in section 3.6 are
> implemented, so every new endpoint is built the right way from the
> start rather than retrofitted later._

3.3 Current Data Model (As-Is)

The provided ERD and the repository agree on the following 14 custom
tables (plus the standard ASP.NET Identity tables: AspNetUsers,
AspNetRoles, AspNetUserClaims, AspNetRoleClaims, AspNetUserRoles,
AspNetUserLogins, AspNetUserTokens). This is essentially a generic
admin/CRUD scaffold --- user accounts, permissions, and a thin academic
layer --- with none of the SRS\'s differentiating features (wallet,
enrollment, content, attendance, exams, notifications) implemented yet,
which is consistent with Milestone M1 (\'Auth Module Completed\') being
the only module marked complete so far.

---

**Table** **Purpose**

---

UserTypes Business-level role list (Admin, Instructor, Center
Supervisor, Student, ...), referenced by
AspNetUsers.UserTypeId.

UserPermissions Maps a UserType to the Pages it may access.

Pages / PageCategories Admin-panel menu/screen registry driving the
/ Modules permission system.

Constants Generic key-value lookup list (e.g. Gender) with a
self-referencing Parent.

Grades Academic grade/level and section (e.g. \'Grade 10
--- A\').

Students Student profile: father, grade, WhatsApp number.

Teachers Teacher profile: grade only.

Fathers Parent record --- currently only an Id and audit
fields.

Groups A teaching group tied to one Grade and one Teacher.

TrackStudentTransfers Historical log of a student moving between
grade/teacher, by whom (UserId).

Nationalities Lookup list present in the DbContext but not shown
on the provided ERD image.

Migrations EF Core\'s internal migration-history bookkeeping
table.
---------------------------------------------------------------------------

3.3.2 Issues Found in the Current Design

These were found by reading the actual model classes and the EF Core
migration snapshot, not just the diagram:

- Students has both a redundant Grade_id column and a proper GradeId
  foreign key (with index and FK constraint). Grade_id is dead weight
  left over from the model --- likely from an early rename --- and
  should be dropped.

- No table anywhere links a Student to a Group (or vice-versa). There
  is no many-to-many relationship at all between them today, so the
  platform cannot yet record which students belong to which group ---
  this must exist before \'view my group\' or attendance/exams can
  work.

- Teachers has no UserId, and Students has no UserId. Neither profile
  table is linked back to AspNetUsers, so there is currently no way to
  resolve \'which login account is this teacher/student\' --- needed
  for every self-service feature (join requests, wallet, uploading
  materials) and for RBAC (Admin, Instructor, Center Supervisor,
  Student roles named in Milestone M1).

- Fathers has no data at all beyond Id and audit columns --- no name,
  no phone/WhatsApp number --- even though the Limitations section
  relies on notifying parents.

- There is no Subject entity. Groups and Courses can only be scoped by
  Grade (class level), not by subject (Math, Physics, ...), which is
  normally required for a tutoring platform.

- Audit fields are inconsistent: Student, Teacher, Group, Grade,
  Father, UserType, Page inherit BaseModel (IsDeleted, CreatedOn/By,
  UpdatedOn/By), but Nationality, Module, PageCategory, Constant, and
  UserPermission do not --- weakening the audit trail required by
  NFR-02/NFR-09.

3.4 Gap Analysis --- SRS Modules vs. Current Data Model

---

**SRS Scope / FR **Supported by current **Missing tables (see 3.6)**
Module** schema?**

---

User & Access Management Partially --- --- (fix existing tables,
(RBAC) roles/permissions exist, 3.7)
but Student/Teacher are  
not linked to  
AspNetUsers.

Course & Content Not supported --- no Lessons, LessonMaterials
Organization lesson or file/material  
entity exists.

Course Enrollment & Join Not supported --- no JoinRequests, Enrollments,
Requests join-request or roster Subjects, Courses,
entity exists. CourseCategories

Academic Tracking & Not supported --- no Attendance, Exams,
Evaluation attendance/exam/score ExamResults
entity exists.

Dashboard & Real-Time Not supported --- no Notifications
Notifications notification entity  
exists.

Wallet & Financial Not supported --- fully Wallets, WalletTransactions,
Transactions specified in the SRS but WalletTopUpRequests,
(FR-W01--FR-W07) has zero matching tables WithdrawalRequests,
today. PlatformCommissionSettings,
PlatformRevenueLedger

Audit trail (NFR-02, Partially --- AuditLogs
NFR-09) soft-delete/audit  
columns exist on some  
tables only.
-------------------------------------------------------------------------------

3.5 Proposed Additions --- New Tables by Module

18 new tables are proposed, grouped into three modules. Each entity
below lists its fields, keys, and relationships; the diagrams show how
the group fits together and connects to the existing tables from section
3.3.

3.5.1 Wallet & Financial Transactions (6 tables)

Directly implements FR-W01--FR-W07. Wallets holds balances;
WalletTransactions is the unified sent/received history behind the
wallet screen; the two request tables carry the manual bank-transfer
workflow; the two settings/ledger tables support commission
configuration and platform revenue reporting for the Finance Officer
stakeholder (ST-07).

> _Revision (v1.1): the wallet screen must show a full record of money
> sent and money received, with each entry marked Accepted or Rejected
> once Admin/Finance has decided on it --- and instructor withdrawals to
> their own bank account must be clearly identifiable in that same
> history. To satisfy this, WalletTransactions (below) is no longer
> written only once a request finishes: a row is created the moment a
> top-up or withdrawal request is submitted (Status=Pending), and the
> same row is then updated to Accepted, Rejected, or Completed as
> Admin/Finance acts on it --- rather than a row appearing only after
> approval. A new Direction field (In/Out) lets the wallet UI split the
> history into a \'Received\' list and a \'Sent\' list, and a
> Description field gives each row a readable line (e.g. the destination
> bank for a withdrawal)._

![](media/e565206f7c4bd8c1efe9dbbbe926dc095bc01793.png){width="6.25in"
height="4.4375in"}

_Figure 3.2 --- Proposed Wallet & Financial Transactions ERD (revised)_

_**Wallets**_

One balance-holding wallet per platform user (student or instructor).
Created automatically when a user account is created.

---

**Field** **Type** **Key** **Description**

---

**Id** int **PK** Unique wallet identifier.

UserId varchar(450) **FK** Owning user (AspNetUsers.Id).

Balance decimal(18,2) Current available balance; must
never go negative (NFR-09).

CreatedOn datetime Wallet creation timestamp.

UpdatedOn datetime Last balance change timestamp.
------------------------------------------------------------------------------

_**Relationships:** 1:1 with AspNetUsers. 1:N with WalletTransactions._

_**WalletTransactions**_

The single unified feed behind the wallet\'s transaction history screen
(FR-W06). Every top-up, withdrawal, enrollment deduction, and instructor
credit is written here as soon as it is initiated --- not only once it
is finished --- so a student or instructor sees a full record of money
sent and money received, each row carrying its current status (Pending /
Accepted / Rejected / Completed).

---

**Field** **Type** **Key** **Description**

---

**Id** int **PK** Unique transaction identifier.

WalletId int **FK** Wallet affected by this entry.

Direction enum In (received) / Out (sent) --- which
list the entry appears under in the
wallet UI.

Type enum TopUp / Withdrawal /
EnrollmentDeduction /
InstructorCredit.

Amount decimal(18,2) Transaction amount (always positive;
Direction conveys the flow).

Status enum Pending / Accepted / Rejected /
Completed / Reversed --- see the
status-lifecycle table below.

Description varchar(300) Human-readable line, e.g.
\'Withdrawal to Bank Al-Ahli ---
Acc. \*\*\*\*1234\' or \'Enrollment
fee --- Grade 10 Math\'.

RelatedEntityType varchar(50) \'TopUpRequest\' /
\'WithdrawalRequest\' /
\'Enrollment\'.

RelatedEntityId int, null Id of the related record, for
traceability and drill-down.

DecisionBy varchar(450), **FK** Admin/Finance Officer who
null accepted/rejected the entry, where
applicable.

DecisionOn datetime, null Timestamp of the accept/reject
decision.

CreatedOn datetime Timestamp the entry was first
created (i.e., when the request was
submitted).

CreatedBy varchar(450) **FK** System/user that generated the entry
(audit).
----------------------------------------------------------------------------------

_**Relationships:** N:1 with Wallets. References the source request
(top-up/withdrawal/enrollment) via RelatedEntityType/Id, and is kept in
sync with that request\'s status._

_**WalletTopUpRequests**_

Student-submitted, manually-verified bank-transfer top-up requests
(FR-W01, FR-W02).

---

**Field** **Type** **Key** **Description**

---

**Id** int **PK** Unique request identifier.

StudentId varchar(450) **FK** Requesting student (AspNetUsers.Id).

Amount decimal(18,2) Requested top-up amount.

BankReferenceNo varchar(100) Bank transfer reference number
entered by the student.

ReceiptFileUrl varchar(300) Uploaded receipt image/PDF
(encrypted/access-restricted per
NFR-02).

Status enum PendingVerification / Completed /
Rejected.

RejectionReason varchar(300), Reason recorded when rejected.
null

VerifiedBy varchar(450), **FK** Admin/Finance Officer who verified
null the request.

VerifiedOn datetime, null Verification timestamp.
--------------------------------------------------------------------------------

_**Relationships:** N:1 with AspNetUsers (student). Creates one
WalletTransactions row (Direction=In, Type=TopUp, Status=Pending) the
moment the student submits it; approval flips that row to Accepted and
credits Wallets.Balance, rejection flips it to Rejected._

_**WithdrawalRequests**_

Instructor requests to withdraw earnings to a bank account, approved by
Admin/Finance (FR-W04, FR-W05a, FR-W05b).

---

**Field** **Type** **Key** **Description**

---

**Id** int **PK** Unique request identifier.

InstructorId varchar(450) **FK** Requesting instructor
(AspNetUsers.Id).

Amount decimal(18,2) Requested withdrawal amount.

BankIBAN varchar(50) Destination account/IBAN
(access-restricted, NFR-02).

BankName varchar(150) Destination bank name.

AccountHolderName varchar(150) Name on the destination account.

Status enum PendingApproval /
Approved-PendingTransfer / Completed
/ Rejected.

ApprovedBy varchar(450), **FK** Admin/Finance Officer who
null approved/rejected.

TransferReference varchar(100), Bank confirmation reference once
null transferred.

RejectionReason varchar(300), Reason recorded when rejected.
null
----------------------------------------------------------------------------------

_**Relationships:** N:1 with AspNetUsers (instructor). Creates one
WalletTransactions row (Direction=Out, Type=Withdrawal, Status=Pending)
the moment the instructor submits it; admin approval flips it to
Accepted (amount reserved, not yet debited); confirming the bank
transfer flips it to Completed and debits Wallets.Balance; rejection at
any pre-completion stage flips it to Rejected._

_**PlatformCommissionSettings**_

Versioned platform commission percentage applied to instructor earnings
(FR-W07). History is kept for audit.

---

**Field** **Type** **Key** **Description**

---

**Id** int **PK** Unique setting version identifier.

CommissionPercentage decimal(5,2) Value between 0 and 100.

EffectiveFrom datetime When this rate became active.

EffectiveTo datetime, null When this rate stopped being active
(null = current).

IsActive bit Convenience flag for the
currently-applied rate.

CreatedBy varchar(450) **FK** Admin who set the rate.
------------------------------------------------------------------------------------

_**Relationships:** 1:N with PlatformRevenueLedger (each enrollment fee
split uses the active rate at the time)._

_**PlatformRevenueLedger**_

Records the platform\'s commission revenue earned from each enrollment,
for reporting and reconciliation (ST-07 Finance Officer expectation).
This is platform-level bookkeeping, not a personal wallet, so it is not
part of the student/instructor WalletTransactions feed.

---

**Field** **Type** **Key** **Description**

---

**Id** int **PK** Unique ledger entry identifier.

EnrollmentId int **FK** Enrollment that generated the
commission (see Enrollments, section
3.5.2).

CommissionAmount decimal(18,2) Commission amount retained by the
platform.

CommissionRateApplied decimal(5,2) Rate actually applied (snapshot, in
case the rate changes later).

CreatedOn datetime Timestamp of the entry.
--------------------------------------------------------------------------------------

_**Relationships:** N:1 with Enrollments. Written by the same service
call that creates the instructor\'s InstructorCredit transaction
(FR-W03b), so the two always agree._

_**WalletTransactions --- Status Lifecycle**_

How the Status field on each WalletTransactions row moves over time, so
\'sent\' and \'received\' entries always show whether they are still
awaiting a decision, or have been accepted/rejected/completed:

---

**Type** **Direction** **Status flow** **Who moves it**

---

TopUp In Pending → Accepted (wallet Admin / Finance
credited) / Rejected Officer (FR-W02)

Withdrawal Out Pending → Accepted (reserved, Admin / Finance
awaiting transfer) → Completed Officer (FR-W05a,
(wallet debited) / Rejected FR-W05b)

EnrollmentDeduction Out Completed (created directly --- System, at
no pending stage) instructor\'s
join-request
approval
(FR-W03a)

InstructorCredit In Completed (created directly, System, same
alongside the matching transaction as
deduction) above (FR-W03b)
---------------------------------------------------------------------------------------

> _Reversed applies to any Completed entry that Admin later corrects
> (e.g., a refunded top-up); it is an exception path, not part of the
> normal flow above._

3.5.2 Enrollment, Courses & Content Management (7 tables)

Covers three SRS scope items together: course/subject structure, the
join-request → enrollment workflow, and lesson content organization.
Enrollments is the most structurally important addition --- it is the
missing link between Students and Groups that the current schema has no
equivalent of at all.

![](media/35910176fa6cc16bd31e0c75c8b413909107cd4b.png){width="6.25in"
height="3.40625in"}

_Figure 3.3 --- Proposed Enrollment, Courses & Content ERD_

_**Subjects**_

Academic subject taught (e.g., Math, Physics) --- currently absent from
the schema, so Groups/Courses cannot be distinguished by subject, only
by grade level.

---

**Field** **Type** **Key** **Description**

---

**Id** int **PK** Unique subject identifier.

Name varchar(150) Subject name.

IsDeleted bit Soft-delete flag, consistent with
BaseModel.
-----------------------------------------------------------------------------

_**Relationships:** 1:N with Groups and Courses._

_**CourseCategories**_

Classification for pre-recorded online courses (e.g., Exam Prep,
Enrichment), supporting FR scope item \'Archiving & Resource
Management\'.

---

**Field** **Type** **Key** **Description**

---

**Id** int **PK** Unique category identifier.

Name varchar(150) Category name.
-----------------------------------------------------------------------------

_**Relationships:** 1:N with Courses._

_**Courses**_

A pre-recorded online course offered by an instructor, separate from a
live in-person Group (SRS scope: \'enrolling in pre-recorded online
courses\').

---

**Field** **Type** **Key** **Description**

---

**Id** int **PK** Unique course identifier.

TeacherId int **FK** Owning instructor.

SubjectId int, null **FK** Subject taught.

CategoryId int **FK** Course category.

Title varchar(250) Course title.

Description text Course description.

Price decimal(18,2) Enrollment fee used by FR-W03a.

Status enum Draft / Published / Archived.
------------------------------------------------------------------------------

_**Relationships:** N:1 with Teachers, Subjects, CourseCategories. 1:N
with Lessons, JoinRequests, Enrollments._

_**JoinRequests**_

A student\'s request to join a live Group or enroll in a pre-recorded
Course, awaiting instructor decision (SRS scope: \'Course Enrollment &
Join Requests\').

---

**Field** **Type** **Key** **Description**

---

**Id** int **PK** Unique request identifier.

StudentId int **FK** Requesting student.

TargetType enum Group / Course --- indicates which
FK below is used.

GroupId int, null **FK** Target live group, if
TargetType=Group.

CourseId int, null **FK** Target pre-recorded course, if
TargetType=Course.

Status enum Pending / Approved / Rejected.

RequestedOn datetime Submission timestamp.

DecisionBy varchar(450), **FK** Instructor who approved/rejected.
null

DecisionOn datetime, null Decision timestamp.

RejectionReason varchar(300), Reason recorded when rejected.
null
--------------------------------------------------------------------------------

_**Relationships:** N:1 with Students; references exactly one of Group
or Course. Produces one Enrollments row on approval._

_**Enrollments**_

Active roster linking a Student to a Group or Course after approval.
This is the many-to-many relationship that the current schema is missing
entirely --- today nothing connects Students to Groups.

---

**Field** **Type** **Key** **Description**

---

**Id** int **PK** Unique enrollment identifier.

StudentId int **FK** Enrolled student.

GroupId int, null **FK** Enrolled group, if applicable.

CourseId int, null **FK** Enrolled course, if applicable.

JoinRequestId int **FK** Originating join request.

FeeAmount decimal(18,2) Fee charged, copied at approval
time.

EnrollmentDate datetime Date the enrollment became active.

Status enum Active / Completed / Cancelled.
-------------------------------------------------------------------------------

_**Relationships:** N:1 with Students, Groups/Courses, and the
originating JoinRequest. Drives FR-W03a/FR-W03b (fee deduction &
commission split) and PlatformRevenueLedger._

_**Lessons**_

A lesson/session belonging to a Group (live) or Course (pre-recorded),
the organizing unit for learning materials.

---

**Field** **Type** **Key** **Description**

---

**Id** int **PK** Unique lesson identifier.

GroupId int, null **FK** Owning group, if a live lesson.

CourseId int, null **FK** Owning course, if a recorded lesson.

Title varchar(250) Lesson title.

OrderIndex int Display/sequence order.

CreatedOn datetime Creation timestamp.
-----------------------------------------------------------------------------

_**Relationships:** N:1 with Groups or Courses. 1:N with
LessonMaterials._

_**LessonMaterials**_

Uploaded files (documents, videos, slides) attached to a lesson --- the
core of the \'Course & Content Organization\' scope item; no such table
exists today.

---

**Field** **Type** **Key** **Description**

---

**Id** int **PK** Unique material identifier.

LessonId int **FK** Owning lesson.

FileName varchar(250) Original file name.

FileUrl varchar(300) Storage location/URL.

FileType enum PDF / Video / Image / Other.

UploadedBy varchar(450) **FK** Instructor who uploaded the file.

IsArchived bit Supports the \'Archiving & Resource
Management\' scope item.
-----------------------------------------------------------------------------

_**Relationships:** N:1 with Lessons._

3.5.3 Academic Tracking, Notifications & Audit (5 tables)

Covers attendance and exam scoring (distinct from the existing Grade
entity, which only represents class level), plus two cross-cutting
tables --- Notifications for the real-time dashboard/email requirement,
and AuditLogs to standardize the audit trail called for in the
non-functional requirements.

![](media/ba953fc634272bdd1ba705cfbddc3400f035e700.png){width="4.791666666666667in"
height="5.791666666666667in"}

_Figure 3.4 --- Proposed Academic Tracking, Notifications & Audit ERD_

_**Attendance**_

Per-session attendance record for a student in a group (SRS scope:
\'record and monitor student attendance, absence\').

---

**Field** **Type** **Key** **Description**

---

**Id** int **PK** Unique attendance record identifier.

StudentId int **FK** Student attending/absent.

GroupId int **FK** Group/session.

SessionDate date Date of the session.

Status enum Present / Absent / Late / Excused.

RecordedBy varchar(450) **FK** Instructor who recorded attendance.

Notes varchar(300), Optional remark.
null
------------------------------------------------------------------------------

_**Relationships:** N:1 with Students and Groups._

_**Exams**_

An exam scheduled for a Group or Course (SRS scope: \'exam schedules\').

---

**Field** **Type** **Key** **Description**

---

**Id** int **PK** Unique exam identifier.

GroupId int, null **FK** Group the exam belongs to, if
applicable.

CourseId int, null **FK** Course the exam belongs to, if
applicable.

Title varchar(250) Exam title.

ExamDate datetime Scheduled date/time.

TotalMarks decimal(6,2) Maximum achievable score.

CreatedBy varchar(450) **FK** Instructor who created the exam.
-----------------------------------------------------------------------------

_**Relationships:** N:1 with Groups/Courses. 1:N with ExamResults._

_**ExamResults**_

A student\'s score on an exam --- the actual \'grades\' data needed for
academic evaluation (not to be confused with the existing Grade entity,
which represents class level).

---

**Field** **Type** **Key** **Description**

---

**Id** int **PK** Unique result identifier.

ExamId int **FK** Related exam.

StudentId int **FK** Related student.

ScoreObtained decimal(6,2) Marks achieved.

Feedback varchar(300), Optional instructor feedback.
null

GradedBy varchar(450) **FK** Instructor who graded.

GradedOn datetime Grading timestamp.
------------------------------------------------------------------------------

_**Relationships:** N:1 with Exams and Students._

_**Notifications**_

In-app/dashboard and email alerts driving the \'Dashboard & Real-Time
Notifications\' scope item --- no notification table exists today.

---

**Field** **Type** **Key** **Description**

---

**Id** int **PK** Unique notification identifier.

UserId varchar(450) **FK** Recipient.

Title varchar(200) Short heading.

Message varchar(500) Notification body.

Type enum JoinRequest / Wallet / Schedule /
System.

IsRead bit Read/unread state.

RelatedEntityType varchar(50), e.g. \'JoinRequest\',
null \'WithdrawalRequest\'.

RelatedEntityId int, null Id of the related record.

CreatedOn datetime Creation timestamp.
---------------------------------------------------------------------------------

_**Relationships:** N:1 with AspNetUsers._

_**AuditLogs**_

Cross-cutting change log supporting NFR-02 (audit trails) and NFR-09
(data integrity), especially for wallet and permission changes.

---

**Field** **Type** **Key** **Description**

---

**Id** int **PK** Unique log entry identifier.

UserId varchar(450) **FK** User who performed the action.

Action varchar(50) Create / Update / Delete / Approve /
Reject, etc.

EntityName varchar(100) Affected table/entity name.

EntityId varchar(50) Affected record identifier.

OldValues text, null Previous values (JSON snapshot).

NewValues text, null New values (JSON snapshot).

Timestamp datetime When the action occurred.
-----------------------------------------------------------------------------

_**Relationships:** N:1 with AspNetUsers._

3.6 Corrections to Existing Tables

Recommended changes to the tables already in the ERD/repository, before
the new modules are built on top of them:

---

**Table** **Change** **Reason**

---

Students Drop the redundant Grade_id Grade_id is an unused
column; keep only the duplicate left in the
FK-backed GradeId. schema --- a
data-integrity/clarity
risk (NFR-09).

Students Add UserId (FK → Required to resolve the
AspNetUsers), unique. logged-in student\'s
profile for self-service
join requests, wallet, and
dashboards.

Teachers Add UserId (FK → Required for instructor
AspNetUsers), unique. login, content upload,
join-request approval, and
withdrawal requests.

Fathers Add Name and The table currently
PhoneNumber/WhatsAppNumber carries no usable data;
(at minimum). parent notifications (per
the Limitations section)
need a name and a channel
to notify.

Groups Add SubjectId (FK → Subjects, Groups can currently only
nullable until data is be scoped by grade level,
backfilled). not by subject.

Nationality, Inherit the same audit fields Standardizes the audit
Module, as BaseModel (IsDeleted, trail across all tables
PageCategory, CreatedOn/By, UpdatedOn/By). (NFR-02, NFR-09) instead
Constant, of only some.
UserPermission
-------------------------------------------------------------------------

3.7 Consolidated List of Missing Tables

Quick-reference answer to \"which tables are missing\": 18 new tables,
none of which exist in the current ERD or repository.

---

**\#** **Table** **Module**

---

1 Wallets Wallet & Financial Transactions

2 WalletTransactions Wallet & Financial Transactions

3 WalletTopUpRequests Wallet & Financial Transactions

4 WithdrawalRequests Wallet & Financial Transactions

5 PlatformCommissionSettings Wallet & Financial Transactions

6 PlatformRevenueLedger Wallet & Financial Transactions

7 Subjects Enrollment, Courses & Content

8 CourseCategories Enrollment, Courses & Content

9 Courses Enrollment, Courses & Content

10 JoinRequests Enrollment, Courses & Content

11 Enrollments Enrollment, Courses & Content

12 Lessons Enrollment, Courses & Content

13 LessonMaterials Enrollment, Courses & Content

14 Attendance Academic Tracking, Notifications &
Audit

15 Exams Academic Tracking, Notifications &
Audit

16 ExamResults Academic Tracking, Notifications &
Audit

17 Notifications Academic Tracking, Notifications &
Audit

18 AuditLogs Academic Tracking, Notifications &
Audit
-----------------------------------------------------------------------------

3.8 API Design Guidelines

Formalizing the RESTful contracts is one of the four Stage-4
deliverables named in the SRS. Once academia.Api is refactored to
attribute-routed controllers (3.2.3), each module should expose a
resource-oriented endpoint set. A representative slice, directly
traceable to the FR-W\* requirements already written in the SRS, is
shown below as the pattern to extend to the other modules:

---

**FR** **Endpoint** **Method** **Notes**

---

FR-W01 /api/wallet/topup-requests POST Student submits a top-up request with
receipt upload.

FR-W02 /api/wallet/topup-requests/{id}/decision PUT Admin/Finance approves or rejects;
role-restricted.

FR-W03a/b /api/enrollments/{id}/approve PUT Instructor approval triggers
deduction + commission split as one
transaction.

FR-W04 /api/wallet/withdrawal-requests POST Instructor submits a withdrawal
request.

FR-W05a /api/wallet/withdrawal-requests/{id}/decision PUT Admin/Finance approves or rejects.

FR-W05b /api/wallet/withdrawal-requests/{id}/complete PUT Admin/Finance confirms the bank
transfer; deducts balance.

FR-W06 /api/wallet/transactions?direction=&status= GET Paged history for the current user,
filterable by Direction (In/Out) and
Status
(Pending/Accepted/Rejected/Completed)
--- powers the Sent/Received tabs.

FR-W07 /api/settings/commission GET / PUT Admin reads/updates the active
commission percentage.
----------------------------------------------------------------------------------------------------------------

> _Every new endpoint must sit behind the existing \[Authorize\] +
> role/claim checks already used by BaseController, and financial
> endpoints specifically must be restricted to Admin/Finance Officer per
> NFR-02._

3.9 UI/UX Design Checklist

Actual wireframes are a visual-design task for Figma and are out of
scope for this document, but the screens below are the minimum inventory
the design team needs to cover so that Milestone M3\'s \'UI/UX
Wireframes\' item lines up one-to-one with the data model in section
3.5:

- Student: Browse groups/courses, Join-request status tracker, My
  enrollments, Lesson materials viewer, Wallet (balance, top-up form +
  receipt upload, Received/Sent history tabs with a status badge ---
  Pending/Accepted/Rejected --- on every row).

- Instructor: My groups/courses, Join-request inbox (approve/reject),
  Lesson & material upload, Attendance sheet, Exam & grading screen,
  Wallet (balance, withdrawal-to-bank form, Received/Sent history tabs
  showing withdrawal status through Pending → Accepted → Completed, or
  Rejected).

- Admin/Finance: Top-up verification queue, Withdrawal approval queue,
  Commission settings, Revenue/reporting dashboard,
  User/role/permission management (already partly covered by existing
  Pages/UserPermissions screens).

- Shared: Real-time notification center/dropdown, role-based dashboard
  landing page.

3.10 Design Considerations Mapped to Non-Functional Requirements

---

**NFR** **Design implication for the new tables**

---

NFR-02 Security Restrict WalletTopUpRequests/WithdrawalRequests
decision endpoints to Admin/Finance role; encrypt/limit
access to ReceiptFileUrl and BankIBAN columns.

NFR-04 FR-W03a (deduction) and FR-W03b (credit) must run
Reliability / inside a single database transaction --- enforce at the
atomicity Services layer, not the client.

NFR-06 Index WalletTransactions on (WalletId, CreatedOn) and
Scalability Attendance on (GroupId, SessionDate) for the volumes
implied by FR-W06 and daily attendance.

NFR-09 Data Add a check constraint / application rule that
integrity Wallets.Balance never goes negative; enforce
TargetType-consistent nullability on
JoinRequests/Enrollments/Exams (exactly one of
GroupId/CourseId set).

NFR-11 Backup & WalletTransactions and AuditLogs are append-only by
recovery design --- good candidates for more frequent
incremental backups than reference tables.
-----------------------------------------------------------------------

3.11 Recommendations & Next Steps

- Apply the corrections in 3.6 before layering the 18 new tables on
  top, so the foreign keys (Student.UserId, Teacher.UserId,
  Group.SubjectId) are available for the new modules to reference.

- Build Enrollments/JoinRequests and Wallets first among the new
  modules --- nearly every other new table (Lessons, Attendance,
  Exams, PlatformRevenueLedger) depends on a student actually being
  enrolled in a group or course.

- Refactor academia.Api to genuine attribute-routed REST controllers
  (3.2.3) before wiring the new endpoints in 3.8, rather than
  extending the current MVC-style pattern.

- Once this chapter is reviewed and approved, update the Milestones
  document to mark M3 (\'System Design Completed\') as done and
  reference this file as its deliverable.
