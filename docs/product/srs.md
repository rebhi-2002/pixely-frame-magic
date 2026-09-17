# Software Requirements Specification (SRS) — Academia

> **مصدر:** مستند SRS رسمي من الفريق (نسخة موسّعة، تتضمّن Instructor
> Course & Lesson Management وWallet Management). حُوّل من docx لـmarkdown
> للأرشفة والبحث النصي. **هذا مستند "قيد التطوير" (WIP)** يصف نطاق
> المنتج الكامل المستهدف — مو كل بند فيه مبني بالباك اند حاليًا. راجع
> [`docs/api/frontend-integration-status.md`](../api/frontend-integration-status.md)
> لمعرفة شو مبني فعليًا فعلاً هلق (تلميح: Auth/User/Constant/Page/
> UserPermission/Wallet فقط — Course & Lesson Management بكل تفاصيلها
> بهالمستند **لسا مش مبنية بالباك اند إطلاقًا**، صفر controller لها).

---

**SOFTWARE REQUIREMENTS\
SPECIFICATION**

**SRS TEMPLATE**

**CHAPTER 1 --- INTRODUCTION\
CHAPTER 2 --- SYSTEM SPECIFICATIONS**

---

**Project Name** Academia

---

**Prepared By** **Ahmed Alkhaldi\
Rebhe Ibrahim\
Ziad ALNUMAILAT**

**Supervisor** Hamza Abu Jarad

**Organization / University** TAQAT - CodeMap

**Date** \[20/07/2026\]

**Version** Version 1.0
-----------------------------------------------------------------------

# TABLE OF CONTENTS

**CHAPTER 1 --- INTRODUCTION**

> 1.1 Introduction
>
> 1.2 Problem Statement
>
> 1.3 Project Objectives
>
> 1.3.1 Main Objective
>
> 1.3.2 SMART Objectives Concept
>
> 1.3.3 Specific Objectives
>
> 1.4 Project Limitations
>
> 1.5 Project Scope
>
> 1.5.1 In Scope
>
> 1.5.2 Out of Scope
>
> 1.6 Project Stages
>
> 1.7 Tools and Equipment
>
> 1.7.1 Hardware
>
> 1.7.2 Software Tools
>
> 1.8 Frontend Framework Overview
>
> 1.8.1 Reasons for Selection
>
> 1.8.2 Frontend Responsibilities
>
> 1.8.3 Frontend Architecture
>
> 1.9 Backend Framework Overview
>
> 1.9.1 Reasons for Selection
>
> 1.9.2 Backend Responsibilities
>
> 1.9.3 Backend Architecture

**CHAPTER 2 --- SYSTEM SPECIFICATIONS**

> 2.1 Stakeholder List
>
> 2.1.1 Primary Stakeholders
>
> 2.1.2 Secondary Stakeholders
>
> 2.1.3 Tertiary Stakeholders
>
> 2.2 Functional Requirements
>
> 2.2.1 How to Develop Functional Requirements
>
> 2.2.2 Functional Requirement Statement Format
>
> 2.2.3 Functional Requirement Documentation Template
>
> 2.2.4 Use Case Flow Templates
>
> 2.2.5 Quality Checklist
>
> 2.2.6 Common Writing Mistakes
>
> 2.2.7 Instructor Course & Lesson Management
>
> 2.2.8 Wallet Management
>
> 2.3 Non-Functional Requirements
>
> 2.3.1--2.3.12 Quality Requirement Categories
>
> 2.3.13 Non-Functional Requirements Summary

**CHAPTER 1**

# INTRODUCTION

+-----------------------------------------------------------------------+
| **Purpose of This Chapter** |
| |
| This chapter establishes the project context, problem, objectives, |
| scope, constraints, implementation stages, and selected technology |
| foundations. |
+=======================================================================+
+-----------------------------------------------------------------------+

## 1.1 Introduction

> The Academia system is a web platform designed to connect instructors
> with students and streamline the educational process. The system
> provides an efficient and user-friendly solution for managing academic
> content and tracking student progress through main features such as
> displaying lectures, uploading and organizing lesson-specific learning
> materials for easy access, and providing comprehensive evaluation
> tools that allow instructors to assess student performance,
> achievement, and overall academic standing.

+-----------------------------------------------------------------------+
| **Template** |
| |
| The \[Project Name\] system is a \[mobile application / web platform |
| / desktop system / SaaS system\] designed to help \[target users\] |
| perform \[main system purpose\]. The system provides an efficient and |
| user-friendly solution for \[problem or process\] through features |
| such as \[main features\]. |
+=======================================================================+
+-----------------------------------------------------------------------+

## 1.2 Problem Statement

Currently, instructors and students face difficulties in organizing
learning materials and accurately tracking student academic progress.
The current process depends on social media communication groups and
disconnected traditional methods, which causes the scattering and loss
of lesson files, wasted time searching for study materials, and
difficulties for instructors in evaluating individual student
achievement and performance. Therefore, a system is required to provide
a centralized web platform that organizes course materials, streamlines
file access, and offers effective tools for tracking and evaluating
student progress.

## 3 Project Objectives

Building an electronic system includes a web application to facilitate
the management of educational centers and private lessons.

### 1.3.1 Main Objective

The primary goal is to develop a web application that simplifies the
management of student data, files, and exams within the academy system.
This will include features such as adding students and administrators,
tracking progress, scheduling exams, managing instructors, and sharing
resources, thus saving time while ensuring easy access to data and files
without requiring significant effort.

### 1.3.2 SMART Objectives Concept

---

**Letter** **Meaning** **Description**

---

S Specific Clearly states what the project will achieve.

M Measurable Includes a measurable result, value, indicator, or
success threshold.

A Achievable Can be completed using the available time, team,
tools, budget, and skills.

R Relevant Directly supports the project problem, scope, and
stakeholder needs.

T Time-Bound Includes a deadline or a defined period for
completion.
------------------------------------------------------------------------------

+-----------------------------------------------------------------------+
| **SMART Objective Template** |
| |
| The project aims to \[specific action\] for \[target users\], |
| achieving \[measurable result\], using \[available tools or |
| resources\], to support \[relevant project purpose\], within \[time |
| period or deadline\]. |
+=======================================================================+
+-----------------------------------------------------------------------+

**General objective:** Improve the speed of processing customer
requests.

**SMART objective:** Develop and deploy an electronic request-management
system that reduces the average request-processing time by at least 40%
for \[target users or organization\] within \[number\] months from the
project start date.

### 1.3.3 Specific Objectives

**1. Facilitate direct connection and communication between teachers and
students through a unified and easy-to-use digital platform.**

**2. Enable teachers to efficiently receive and manage student requests
for joining in-person (face-to-face) tutoring sessions and classes.**

**3. Streamline the enrollment process for pre-recorded online courses
offered by teachers on the platform.**

**4. Provide automated real-time notifications to students and teachers
regarding course join requests, acceptances, and schedule updates.**

**5. Ensure high platform accessibility, allowing at least 95% of target
users (teachers and students) to manage course requests and access
materials via supported web browsers and desktop platforms.**

**6**. Generate academic progress and financial summary reports within a
maximum of 3 seconds .

**7**. Improve communication between teachers, and students by providing
real-time dashboard notifications.

8\. Provide a secure internal wallet system enabling students to top up
their balance via verified bank transfer and instructors to withdraw
earnings after platform commission deduction, achieving \[percentage\]%
transaction accuracy with zero unresolved discrepancies during the
defined testing period

## 1.4 Project Limitations

Identify restrictions and challenges that may affect project
implementation, operation, quality, schedule, or supported
functionality.

- Limited development time.

- The system will not operate as a native smartphone application.

- There is no system of conversation between the teacher and the
  parent, but the process is done by sending notifications.

- There are no multiple languages for the application.

- All wallet top-ups and instructor withdrawals are processed manually
  through Admin/Finance verification and bank transfer; the system
  does not integrate with an automated online payment gateway

## 1.5 Project Scope

### 1.5.1 In Scope

- User & Access Management: Secure role-based authentication and
  authorization (RBAC) for System Administrators, Instructors, Center
  Supervisors, and Students.

- Course & Content Organization: Tools for instructors to upload,
  categorize, archive, and manage lesson-specific learning materials
  and pre-recorded course resources.

- Course Enrollment & Join Requests: Workflows allowing students to
  request joining in-person tutoring classes or enrolling in
  pre-recorded online courses, with instructor approval/rejection
  capabilities. .

- Academic Tracking & Performance Evaluation: Modules to record and
  monitor student attendance, absence, exam schedules, grades, and
  academic standing.

- Dashboard & Real-Time Notifications: Integrated dashboard alerts
  notifying teachers and students about course requests, schedule
  changes, and updates.

- Archiving & Resource Management: Centralized repository ensuring
  fast indexing, searching, and access to stored course files and
  documents.

- Wallet & Financial Transactions Management: A digital wallet for
  students and instructors, including manual bank-transfer top-up with
  receipt/reference-number verification by Admin or Finance staff,
  automatic enrollment-fee deduction and commission-based fund
  distribution upon join-request approval, and instructor withdrawal
  requests processed via bank transfer.

- Course & Lesson Scheduling: The system shall allow instructors to
  create and manage in-person and live online course schedules,
  including student groups, lesson dates, start times, durations,
  teaching topics, and recurring schedules. For live online lessons,
  the system shall store the external meeting platform and meeting
  access information.

### 1.5.2 Out of Scope

- Native Mobile Applications: Dedicated mobile apps for Android and
  iOS devices (access is provided solely via responsive mobile
  browsers).

- Direct Instant Messaging / Chat System: Real-time, two-way chat
  rooms between teachers, students, or parents.

- Automated Online Payment Gateways: Direct integration with
  electronic payment processors (e.g., Stripe, PayPal, credit-card
  gateways). All wallet top-ups and withdrawals are handled manually
  via bank transfer and Admin/Finance verification, not through an
  automated gateway.

- Live Video Streaming & Virtual Classrooms: Built-in video
  conferencing capabilities (e.g., Zoom/Google Meet integrations or
  custom WebRTC streaming).

- Advanced AI & Analytics: Machine-learning algorithms for automated
  grading, personalized recommendations, or predictive student
  performance analysis.

- Offline Data Synchronization: Capability to access, edit, or submit
  assignments/tests without an active internet connection.

## 1.6 Project Stages

The project will be developed through the following stages:

### Stage 1: Idea Selection

IClarify the problem that the application solves (dispersion of
educational resources and difficulty in monitoring students), and
identify the target group (teachers, students, and center supervisors).

### Stage 2: Requirement Gathering

Collect information from stakeholders through interviews,
questionnaires, observation, meetings, and document analysis.

### Stage 3: Requirement Analysis

Analyze, classify, prioritize, and validate functional and
non-functional requirements.

### Stage 4: System Design

Translate specifications into comprehensive structural, database, and
visual models prior to

coding.

● System Architecture: Define the client-side (React.js) and server-side
(ASP.NET

Core REST APIs) layered architecture.

● Data Modeling: Construct Entity-Relationship Diagrams (ERD), database
schemas, and

data dictionary specifications.

● Interface & Experience (UI/UX): Create wireframes, user flow diagrams,
and interactive

prototypes using Figma.

● API Design: Formulate RESTful API endpoint specifications.

### Stage 5: System Development

Execute the actual software implementation across all layers of the
stack.

● Frontend Implementation: Develop component-based single-page
interfaces using

React.js, applying responsive layouts for browser compatibility.

● Backend Implementation: Build core domain logic, request validation
pipelines, service layers in ASP.NET Core.

● Database & Integration: Implement data access layers via Entity
Framework Core (EF

Core) and establish secure communications between frontend and backend
APIs.

### Stage 6: System Testing

Perform unit, integration, system, usability, security, performance, and
acceptance testing.

### Stage 7: System Deployment

Publish the system on the selected hosting environment or application
distribution platform.

### Stage 8: Maintenance and Improvement

Correct defects, monitor operation, improve performance, and implement
approved enhancements.

## 1.7 Tools and Equipment

### 1.7.1 Hardware

---

**Equipment** **Purpose**

---

Computer / Laptop System analysis, design, development, and
documentation.

Mobile Device Testing the mobile application on a physical
device.

Server / Cloud Hosting the backend, database, and deployed
Environment services.

Internet Connection Development, testing, collaboration, and
deployment.

\[Other Equipment\] \[Purpose\]
-----------------------------------------------------------------------

### 1.7.2 Software Tools

---

**Tool** **Purpose**

---

Visual Studio Source-code development.

Figma Interface design and prototyping.

GitHub / GitLab Version control and team collaboration.

Postman API testing and documentation.

Jira / Trello Project planning and task tracking.

Draw.io / Lucidchart System and database diagrams.

ٍَSQL Database Database management.

Firebase Authentication, storage, messaging, or
analytics.

---

## 1.8 Frontend Framework Overview

**Framework Name:** React.js

**Framework Version:** 19.2

The frontend framework is responsible for rendering the **Academia**
project visually and interactively for the end-user (the student). It
serves as the primary interface, utilizing JSX to build interactive user
interfaces, receiving student inputs, performing client-side data
validation, managing the application state, and communicating seamlessly
with backend services via APIs to display educational content,
questions, and results.

### 1.8.1 Reasons for Selection

**React.js** was selected for developing the **Academia** frontend based
on the following factors:

1.  **Reusable, Component-Based Architecture:** React allows the UI to

    > be divided into small, independent, and reusable components (e.g.,
    > progress bars, lesson cards, question forms). This ensures design
    > consistency, simplifies maintenance, and accelerates the
    > development of complex interfaces within **Academia**.

2.  **High Performance via Virtual DOM:** React utilizes a Virtual DOM

    > to update only specific parts of the page when data changes,
    > rather than reloading the entire page. This provides a fast,
    > smooth, and seamless Single Page Application (SPA) user experience
    > for students navigating through lessons and exercises.

3.  **Fast Development Cycle:** Features like Fast Refresh allow

    > developers to see the impact of code changes immediately, speeding
    > up the UI building and testing process for the **Academia**
    > platform.

4.  **Strong Community and Extensive Documentation:** React has one of

    > the largest developer communities in the world, ensuring the
    > availability of ready-made solutions, third-party libraries, and
    > comprehensive documentation, which reduces technical risks during
    > development.

5.  **Easy API Integration:** React facilitates easy communication with

    > the Backend and consumption of APIs using standard libraries like
    > Axios or the Fetch API.

6.  **Flexibility and Compatibility:** React enables the building of

    > Responsive Web Apps that function efficiently across mobile
    > browsers, tablets, and desktop computers, ensuring students can
    > access **Academia** from any device.

7.  **Maintainable and Scalable Project Structure:** When combined with
    > good architectural practices (and potentially TypeScript), the
    > project can grow and accommodate new features and users without
    > losing control over code quality.

### 1.8.2 Frontend Responsibilities

The responsibilities of React.js within the **Academia** project are
summarized as follows:

1.  **Display System Screens:** Visually rendering the student's

    > educational journey, from login screens and organizational
    > dashboards to content delivery pages, exams, and achievement
    > visualizations.

2.  **Receive and Validate User Input:** Managing input forms, accepting

    > student answers, and performing immediate client-side validation
    > to provide instant feedback before sending data to the Backend.

3.  **Application State Management:** Tracking the active state of the

    > application and updating the UI instantly when data changes (e.g.,
    > updating points balance or unlocking a new lesson upon completing
    > the previous one).

4.  **Communicate with Backend Services:** Sending requests to the API

    > to retrieve course content and save student progress, and
    > receiving and interpreting responses.

5.  **Handle Data and Errors:** Displaying schedules, educational

    > materials, and results clearly, while professionally handling
    > network or input errors and displaying appropriate alerts to the
    > user.

6.  **Manage Navigation (Routing):** Ensuring logical and smooth

    > transition between different pages and sections of the platform
    > without page reloads (Single Page Application experience).

7.  **Apply Localization and Accessibility Rules:** Fully supporting
    > Arabic as the default language and ensuring the platform is easily
    > usable by all students, including those with special needs.

### 1.8.3 Frontend Architecture

+-----------------------------------------------------------------------+
| The frontend development using React.js will adhere to a |
| **Component-Based Architecture**, supported by a modern and stable |
| state management pattern such as **Context API** (for simple states) |
| or a library like **Zustand/Redux** (for complex states). A clear |
| separation between business logic and the UI layer will be |
| maintained. |
| |
| The software structure consists of the following layers and |
| components: |
| |
| - **Presentation Layer:** Contains React components (JSX) that form |
| > the screens and UI elements (Presentational Components). |
| |
| - **State Management Layer:** Manages active application data |
| > (e.g., logged-in user data, current lesson progress) utilizing |
| > custom Hooks for this purpose. |
| |
| - **Services/Data Layer:** Contains functions dedicated to API |
| > communication (API Services) and handling requests and |
| > responses (e.g., using Axios). |
| |
| - **Models/Interfaces:** (Preferably using TypeScript) to define |
| > the structures of data exchanged with the API and ensure data |
| > integrity within the application. |
| |
| - **Shared/Common Components:** A library of small, reusable UI |
| > elements used throughout the application to ensure design |
| > consistency (e.g., buttons, input fields, modals). |
+=======================================================================+
+-----------------------------------------------------------------------+

## 1.9 Backend Framework Overview

Framework Name: \[ASP.NET Core\]

**Framework Version:** \[10.0.302\]

The backend framework implements business rules, validates requests,
manages data, controls access, exposes system services, and integrates
with external systems.

### 1.9.1 Reasons for Selection

- High performance: Cross-platform execution with low memory footprint
  and high throughput.

- Secure service development: Built-in protection against XSS, CSRF,
  and SQL injection, alongside integrated identity management.

- Database integration: Seamless integration with Entity Framework
  Core (EF Core) for object-relational mapping (ORM).

- Authentication and authorization support: Robust Identity system
  supporting JWT tokens, OAuth2, and policy/role-based access control.

- Scalable architecture: Native Dependency Injection (DI) support
  enabling modular and testable code structures.

- Structured error handling: Centralized exception handling middleware
  and standardized API responses (Problem Details - RFC 7807).

- Maintainability: C#-driven strongly typed architecture ensuring
  early compile-time error detection.

- Integration with third-party services: First-class support for HTTP
  clients, background workers, and external SDKs.

### 1.9.2 Backend Responsibilities

- Manage user accounts, identities, and access permissions.

- Process core business logic and workflows.

- Validate incoming request payloads (Model Validation &
  FluentValidation).

- Manage database operations (Migrations, CRUD, and Transactions via
  EF Core).

- Provide RESTful API endpoints for client communications.

- Send transactional notifications (Email, Push Notifications).

- Generate administrative and analytical reports.

- Record comprehensive audit logs and system telemetry.

- Handle errors and exceptions gracefully without leaking sensitive
  information.

### 1.9.3 Backend Architecture

+-----------------------------------------------------------------------+
| **Template** |
| |
| The backend is built using the \*\*Model-View-Controller (MVC) |
| Architectural Pattern\*\*, structured in a layered approach to |
| enforce separation of concerns:\ |
| Controllers & Routing:Handles incoming HTTP requests, binds |
| route/query parameters, applies attribute routing, and maps |
| responses.\ |
| Services (Business Layer): Encapsulates core application logic, |
| rules, and business transactions separate from HTTP concerns.\ |
| Repositories & Data Access: Leverages Entity Framework Core to |
| abstract database operations and data persistence.\ |
| Data Models & DTOs: Defines database entities, relationships, |
| database migrations, and Data Transfer Objects (DTOs) for API |
| request/response contracts.\ |
| Middleware Pipeline: Intercepts HTTP requests for logging, exception |
| handling, CORS policy enforcement, and authentication/authorization |
| checks.\ |
| Authentication & Access Control: Handles identity verification and |
| permission policies.\ |
| Notification Services: Asynchronous messaging services for |
| dispatching emails and system alerts.\ |
| Logging & Monitoring: Integrated logging infrastructure |
| (ILogger/Serilog) for audit trails and diagnostics. |
+=======================================================================+
+-----------------------------------------------------------------------+

**CHAPTER 2**

# SYSTEM SPECIFICATIONS

+-----------------------------------------------------------------------+
| **Purpose of This Chapter** |
| |
| This chapter identifies the project stakeholders and documents the |
| system's functional and quality requirements in a clear, testable, |
| and structured form. |
+=======================================================================+
+-----------------------------------------------------------------------+

## 2.1 Stakeholder List

Stakeholders are individuals, groups, or organizations that influence
the system, use it, manage it, fund it, regulate it, or are affected by
its outcomes.

---

**ID** **Stakeholder** **Level** **Role** **Responsibilities** **Expectations**

---

ST-01 System Primary Manages the Manage users, Reliable
Administrator system permissions, settings, administration and
and reports. full authorized
control.

ST-02 Registered User Primary Uses system Enter data, request Simple, secure,
services services, and manage and responsive
personal information. operation.

ST-03 Project Owner Secondary Owns the Approve scope, Business
product requirements, and objectives are
releases. achieved.

ST-04 Development Team Secondary Builds the Analyze, design, Clear and stable
system implement, test, and requirements.
maintain the system.

ST-05 Supervisor Secondary Reviews Review documentation, A complete and
project quality, and high-quality
progress milestones. project.

ST-06 Regulatory Tertiary Provides Define or enforce Legal and
Authority external applicable regulatory
oversight regulations. compliance.

ST-07 Finance Officer \[Primary Manages wallet Verify student Accurate, timely,
\] transactions bank-transfer and auditable
\] receipts, financial
approve/process operations
instructor withdrawal  
requests, reconcile  
platform commission  
revenue \]
-----------------------------------------------------------------------------------------------

### 2.1.1 Primary Stakeholders

Primary stakeholders directly interact with the system or manage its
daily operation.

- System administrators.

- Registered users.

- Employees.

- Customers.

- Service providers.

### 2.1.2 Secondary Stakeholders

Secondary stakeholders support, own, supervise, fund, maintain, or are
directly affected by system operations without necessarily using it
every day.

- Project owners.

- Supervisors.

- Partner organizations.

- Technical-support teams.

- Sponsors or funding organizations.

### 2.1.3 Tertiary Stakeholders

Tertiary stakeholders are not normally involved in daily system
operation, but they may indirectly influence the project or be affected
by its wider outcomes.

- Government and regulatory authorities.

- Legal and compliance bodies.

- Local communities and the general public.

- Industry associations.

- External auditors.

- Media organizations.

- Competitors.

- Researchers and academic institutions.

---

**Stakeholder **Relationship with the System** **Examples**
Level**

---

Primary Directly uses or manages the Users, administrators,
system. employees.

Secondary Owns, supports, supervises, Project owner,
funds, or maintains the system. supervisor, partners,
technical support.

Tertiary Indirectly influences or is Regulators, community,
influenced by the project. media, auditors,
researchers.
--------------------------------------------------------------------------

## 2.2 Functional Requirements

Functional requirements define the services, behaviors, calculations,
validations, and data operations that the system must perform. They
answer the question: What must the system do?

+-----------------------------------------------------------------------+
| **Core Writing Rule** |
| |
| Write every functional requirement as a clear obligation using the |
| form: "The system shall \[perform a specific function\] \[under a |
| defined condition or for an authorized actor\]." Avoid vague verbs |
| such as support, handle, facilitate, or be able to unless the exact |
| behavior is also defined. |
+=======================================================================+
+-----------------------------------------------------------------------+

### 2.2.1 How to Develop Functional Requirements

> **1.** Study the problem statement, project scope, business process,
> stakeholder needs, policies, and available data.
>
> **2.** Identify the system modules and the functions required in each
> module, such as authentication, records management, search, reporting,
> and notifications.
>
> **3.** Identify the responsible actor or system component for each
> function.
>
> **4.** Assign a unique requirement identifier using a consistent
> format such as FR-01, FR-02, and FR-03.
>
> **5.** Write one atomic requirement statement using "The system shall
> ...". One requirement should describe one main behavior.
>
> **6.** Document the trigger, preconditions, inputs, processing rules,
> outputs, postconditions, and exceptional conditions.
>
> **7.** Assign a priority such as Must, Should, Could, or High, Medium,
> and Low.
>
> **8.** Define a verification method that shows how the requirement
> will be checked through inspection, demonstration, analysis, or
> testing.
>
> **9.** Review the requirement for clarity, consistency, feasibility,
> necessity, uniqueness, and testability.
>
> **10.** Obtain stakeholder approval and control later changes through
> versioning and change management.

### 2.2.2 Functional Requirement Statement Format

+-----------------------------------------------------------------------+
| **Basic Format** |
| |
| FR-\[Number\] --- The system shall \[action verb\] \[object or data\] |
| \[for actor / under condition\] \[within any required business rule |
| or limit\]. |
+=======================================================================+
+-----------------------------------------------------------------------+

**Good example:** The system shall lock a user account for 15 minutes
after five consecutive failed login attempts.

**Weak example:** The system should provide good login security.

Recommended action verbs include: create, display, calculate, validate,
store, update, delete, retrieve, search, filter, send, generate,
approve, reject, export, import, authenticate, authorize, notify, and
record.

### 2.2.3 Functional Requirement Documentation Template

Use the following structure to document each functional requirement
consistently and make it traceable, testable, and easy to review.

---

**Field** **Description / Template**

---

Requirement ID FR-\[Number\]

Module \[Authentication / User Management / Reports /
Notifications / Other\]

Requirement The system shall \[perform a specific function\]
Statement \[for an actor / under a condition\].

Primary Actor \[User / Administrator / External System\]

Trigger \[Event that starts the requirement or use case\]

Preconditions \[Conditions that must be true before execution\]

Inputs \[Required data or user input\]

Main Success \[Normal sequence that completes successfully\]
Scenario

Alternative Flow \[Valid variation from the main sequence\]

Exception Flow \[Error or failure sequence and system response\]

Postconditions \[Expected system state after completion\]

Priority \[Must / Should / Could\] or \[High / Medium / Low\]

Verification \[Inspection / Demonstration / Analysis / Testing\]
Method
-----------------------------------------------------------------------

### 2.2.4 Use Case Flow Templates

Use these short flow templates to describe the normal path, valid
alternatives, and failure conditions for a use case.

#### 2.2.4.1 Main Success Scenario Template

+-----------------------------------------------------------------------+
| **Happy Path --- User Registration** |
| |
| User fills out the registration form → submits the data → the system |
| validates the data → the account is created → verification is sent → |
| a success message is displayed → the user is redirected. |
+=======================================================================+
+-----------------------------------------------------------------------+

#### 2.2.4.2 Alternative Flow Template

+-----------------------------------------------------------------------+
| **Alternative Flow --- Existing Account** |
| |
| User submits the registration form → the system detects that the |
| account already exists → the user is notified → login or password |
| recovery is offered. |
+=======================================================================+
+-----------------------------------------------------------------------+

#### 2.2.4.3 Exception Flow Template

+-----------------------------------------------------------------------+
| **Exception Flow --- Registration Failure** |
| |
| User submits the registration form → a validation or system error |
| occurs → the account is not created → an error message is displayed → |
| the user corrects the data or tries again. |
+=======================================================================+
+-----------------------------------------------------------------------+

### 2.2.5 Quality Checklist

---

**Quality Attribute** **Check**

---

Clear Can every reader interpret the requirement in the
same way?

Atomic Does the requirement describe one main behavior only?

Specific Are the actor, action, data, and conditions clearly
identified?

Necessary Does it support the approved problem, scope, or
business rule?

Feasible Can it be implemented with the available technology,
time, and budget?

Consistent Does it avoid conflict with other requirements?

Testable Can a tester objectively determine whether it is
satisfied?

Traceable Does it have an ID and an identifiable source?

Prioritized Is its implementation importance defined?

Implementation-Neutral Does it state required behavior without unnecessarily
forcing a technical solution?
------------------------------------------------------------------------------

### 2.2.6 Common Writing Mistakes

---

**Mistake** **Weak Example** **Improved Version**

---

Vague The system shall be The system shall return search
language fast. results within 3 seconds for up
to \[number\] records.

Multiple The system shall Split the statement into separate
behaviors in register users, send registration, confirmation, and
one email, and create a profile requirements.
requirement profile.

No measurable The system shall send The system shall submit an in-app
condition notifications quickly. notification within 10 seconds
after \[event\].

Technical The system shall use The system shall store \[data
design MongoDB. type\] and retrieve it using
presented as \[required performance or
a need integrity rule\].

Optional The system may allow The system shall allow authorized
wording report export. administrators to export reports
in PDF and CSV formats.
-----------------------------------------------------------------------

## 2.2.7 Instructor Course & Lesson Management --- Functional Requirements

The following functional requirements define the instructor\'s ability
to create, configure, schedule, and manage in-person and online courses
and their individual lessons, including student group information,
lesson schedules, lesson duration, teaching topics, and online meeting
platform details.

### FR-I01 --- Create In-Person Course

---

**Requirement ID** FR-I01

---

**Module** Instructor Course & Lesson Management

**Requirement The system shall allow an authenticated instructor
Statement** to create an in-person course and define its basic
information and student group configuration.

**Primary Actor** Instructor

**Trigger** Instructor selects \"Create In-Person Course\" from
the instructor dashboard.

**Preconditions** Instructor is authenticated and authorized to create
courses.

**Inputs** Course name, subject, description, group
name/number, maximum number of students, course
duration, and general schedule information.

**Main Success The instructor enters the required course
Scenario** information and submits the form; the system
validates the entered data, creates the in-person
course, and displays the course in the instructor
dashboard.

**Alternative Flow** The instructor saves the course as a draft before
publishing it.

**Exception Flow** Required information is missing or invalid; the
system displays validation errors and prevents
course creation.

**Postconditions** An in-person course is created with an identifiable
course record and an associated student group.

**Priority** Must

**Verification Testing
Method**
-------------------------------------------------------------------------

### FR-I02 --- Configure In-Person Student Group

---

**Requirement ID** FR-I02

---

**Module** Instructor Course & Lesson Management

**Requirement The system shall allow an instructor to configure
Statement** each in-person student group by defining the maximum
number of accepted students and the recurring
attendance schedule.

**Primary Actor** Instructor

**Trigger** Instructor opens the group configuration page for an
in-person course.

**Preconditions** An in-person course exists and the instructor is
authorized to manage it.

**Inputs** Group name or number, maximum number of students,
attendance days, attendance time, lesson duration,
and course start/end dates.

**Main Success The instructor enters the group configuration; the
Scenario** system validates the schedule and capacity
information and saves the group configuration.

**Alternative Flow** The instructor updates the group schedule or maximum
capacity before the course starts.

**Exception Flow** The entered schedule contains invalid or conflicting
information; the system displays a validation
message and prevents saving the invalid
configuration.

**Postconditions** The group contains a defined capacity and recurring
schedule that can be used to generate individual
lesson sessions.

**Priority** Must

**Verification Testing
Method**
-------------------------------------------------------------------------

_Note: use \"Maximum Number of Students\" rather than \"Number of
Students\" in the data model, since this field represents group
capacity, while the number of students actually accepted may vary over
time._

### FR-I03 --- View In-Person Group Students

---

**Requirement ID** FR-I03

---

**Module** Instructor Course & Lesson Management

**Requirement The system shall allow an instructor to view the
Statement** students accepted into each in-person group and
display their relevant contact and location
information.

**Primary Actor** Instructor

**Trigger** Instructor opens the \"Group Students\" section.

**Preconditions** The instructor has at least one in-person group with
accepted students.

**Inputs** Selected course and student group.

**Main Success The system retrieves and displays the accepted
Scenario** students assigned to the selected group.

**Alternative Flow** The instructor filters or searches the student list
by name or other supported criteria.

**Exception Flow** The group has no accepted students; the system
displays an appropriate empty-state message.

**Postconditions** No system data is modified.

**Priority** Must

**Verification Testing
Method**
-------------------------------------------------------------------------

_Note: the displayed student information shall be limited to the
specific fields the instructor needs (e.g., name, phone number,
location) rather than open-ended personal data, in line with applicable
access-control and privacy rules._

### FR-I04 --- Create and Schedule In-Person Lessons

---

**Requirement ID** FR-I04

---

**Module** Instructor Course & Lesson Management

**Requirement The system shall allow an instructor to create
Statement** individual lessons within an in-person course and
define the scheduled date, day, start time,
duration, and teaching topic for each lesson.

**Primary Actor** Instructor

**Trigger** Instructor selects \"Add Lesson\" within an
in-person course.

**Preconditions** An in-person course and student group exist.

**Inputs** Lesson number, lesson date, day, start time,
duration, and teaching topic.

**Main Success The instructor enters the lesson details and submits
Scenario** them; the system validates the information, creates
the lesson session, associates it with the selected
group, and displays it in the course schedule.

**Alternative Flow** The instructor edits the lesson before its scheduled
date.

**Exception Flow** The lesson conflicts with an existing lesson or
contains invalid date/time information; the system
displays an error and prevents the conflicting
schedule from being saved.

**Postconditions** The lesson is stored as a scheduled session
associated with the selected student group.

**Priority** Must

**Verification Testing
Method**
-------------------------------------------------------------------------

### FR-I05 --- Create Online Course

---

**Requirement ID** FR-I05

---

**Module** Instructor Course & Lesson Management

**Requirement The system shall allow an authenticated instructor
Statement** to create an online course and configure its student
group, schedule, lesson duration, and online meeting
platform.

**Primary Actor** Instructor

**Trigger** Instructor selects \"Create Online Course\" from the
instructor dashboard.

**Preconditions** Instructor is authenticated and authorized to create
courses.

**Inputs** Course name, subject, description, group
information, maximum number of students, meeting
schedule, lesson duration, and meeting platform.

**Main Success The instructor enters the required information; the
Scenario** system validates and stores the online course
configuration and displays it in the instructor
dashboard.

**Alternative Flow** The instructor saves the course as a draft.

**Exception Flow** Required information is missing or invalid; the
system prevents creation and displays validation
errors.

**Postconditions** An online course is created with its group and
meeting configuration.

**Priority** Must

**Verification Testing
Method**
-------------------------------------------------------------------------

### FR-I06 --- Configure Online Course Group

---

**Requirement ID** FR-I06

---

**Module** Instructor Course & Lesson Management

**Requirement The system shall allow an instructor to configure
Statement** the maximum number of students and recurring lesson
schedule for each online student group.

**Primary Actor** Instructor

**Trigger** Instructor opens the online group configuration
page.

**Preconditions** An online course exists.

**Inputs** Group name/number, maximum students, attendance
days, start time, lesson duration, and course
period.

**Main Success The instructor enters the group configuration; the
Scenario** system validates and stores the schedule and
capacity information.

**Alternative Flow** The instructor modifies the schedule before lessons
begin.

**Exception Flow** The schedule conflicts with an existing scheduled
lesson; the system displays a conflict warning and
prevents saving the conflicting schedule.

**Postconditions** The online group has a defined capacity and
recurring schedule.

**Priority** Must

**Verification Testing
Method**
-------------------------------------------------------------------------

### FR-I07 --- Configure Online Meeting Platform

---

**Requirement ID** FR-I07

---

**Module** Instructor Course & Lesson Management

**Requirement The system shall allow an instructor to specify the
Statement** online meeting platform and provide the required
meeting information for each online lesson.

**Primary Actor** Instructor

**Trigger** Instructor creates or edits an online lesson.

**Preconditions** An online course and lesson exist.

**Inputs** Meeting platform, meeting URL or access information,
and optional meeting instructions.

**Main Success The instructor selects the supported meeting
Scenario** platform and enters the required meeting
information; the system validates and stores the
information and associates it with the lesson.

**Alternative Flow** The instructor updates the meeting link or platform
before the lesson starts.

**Exception Flow** The meeting information is missing or the URL is
invalid; the system displays a validation error.

**Postconditions** The online lesson contains the required meeting
platform and access information.

**Priority** Must

**Verification Testing
Method**
-------------------------------------------------------------------------

_Note: the system records and displays externally hosted meeting
information (e.g., platform name and access link); it does not provide
built-in video conferencing capabilities, consistent with Section 1.5.2
Out of Scope._

### FR-I08 --- Create and Schedule Online Lessons

---

**Requirement ID** FR-I08

---

**Module** Instructor Course & Lesson Management

**Requirement The system shall allow an instructor to create
Statement** individual online lessons and define the lesson
date, day, start time, duration, teaching topic, and
online meeting platform.

**Primary Actor** Instructor

**Trigger** Instructor selects \"Add Online Lesson\".

**Preconditions** An online course and student group exist.

**Inputs** Lesson number, teaching topic, lesson date, day,
start time, duration, meeting platform, and meeting
link.

**Main Success The instructor enters the lesson information; the
Scenario** system validates the data, creates the scheduled
online lesson, and associates it with the selected
group.

**Alternative Flow** The instructor edits the lesson details before the
scheduled time.

**Exception Flow** The lesson conflicts with another lesson or contains
invalid scheduling information; the system prevents
saving and displays an appropriate error.

**Postconditions** The online lesson is stored and displayed in the
course schedule with its meeting information.

**Priority** Must

**Verification Testing
Method**
-------------------------------------------------------------------------

### FR-I09 --- View Course Schedule

---

**Requirement ID** FR-I09

---

**Module** Instructor Course & Lesson Management

**Requirement The system shall allow an instructor to view the
Statement** complete schedule of lessons for a selected course
or student group in chronological order.

**Primary Actor** Instructor

**Trigger** Instructor opens the course schedule.

**Preconditions** The instructor owns or manages the selected course.

**Inputs** Selected course and optional student group.

**Main Success The system displays all scheduled lessons with their
Scenario** lesson number, topic, date, day, start time,
duration, and, for online lessons, meeting platform
and meeting information.

**Alternative Flow** The instructor filters the schedule by date, group,
or lesson status.

**Exception Flow** No lessons have been scheduled; the system displays
an empty-state message.

**Postconditions** No system data is modified.

**Priority** Must

**Verification Testing
Method**
-------------------------------------------------------------------------

### FR-I10 --- Update Scheduled Lesson

---

**Requirement ID** FR-I10

---

**Module** Instructor Course & Lesson Management

**Requirement The system shall allow an authorized instructor to
Statement** update the date, start time, duration, teaching
topic, and meeting information of a scheduled lesson
before the lesson starts.

**Primary Actor** Instructor

**Trigger** Instructor selects \"Edit\" on a scheduled lesson.

**Preconditions** The lesson exists and has not yet started.

**Inputs** Updated date, start time, duration, teaching topic,
and/or meeting information.

**Main Success The instructor updates one or more lesson fields and
Scenario** submits the changes; the system validates the
updated schedule, checks for conflicts with other
lessons, and saves the changes.

**Alternative Flow** The instructor cancels the edit without saving
changes.

**Exception Flow** The updated schedule conflicts with another lesson
or contains invalid information; the system displays
an error and prevents the update from being saved.

**Postconditions** The lesson record reflects the updated schedule
and/or meeting information.

**Priority** Must

**Verification Testing
Method**
-------------------------------------------------------------------------

### FR-I11 --- Cancel Scheduled Lesson

---

**Requirement ID** FR-I11

---

**Module** Instructor Course & Lesson Management

**Requirement The system shall allow an authorized instructor to
Statement** cancel a scheduled lesson before its scheduled start
time, subject to the applicable course and
enrollment rules.

**Primary Actor** Instructor

**Trigger** Instructor selects \"Cancel Lesson\" on a scheduled
lesson.

**Preconditions** The lesson exists, has not yet started, and is
eligible for cancellation under the applicable
course rules.

**Inputs** Selected lesson and optional cancellation reason.

**Main Success The instructor confirms the cancellation; the system
Scenario** updates the lesson status to \"Cancelled\", retains
the lesson record, and notifies the enrolled
students.

**Alternative Flow** The instructor reschedules the lesson instead of
cancelling it.

**Exception Flow** The lesson is not eligible for cancellation (e.g.,
already completed or outside the allowed
cancellation window); the system displays an error
and prevents the action.

**Postconditions** The lesson is marked as cancelled and remains in the
course schedule and attendance history for reporting
purposes.

**Priority** Must

**Verification Testing
Method**
-------------------------------------------------------------------------

_Note: the lesson is cancelled rather than deleted, so that attendance
and reporting history is preserved._

## 2.2.8 Wallet Management --- Functional Requirements

The following functional requirements define the wallet feature: student
wallet top-up via manual bank transfer, verification and crediting by
Admin/Finance staff, automatic fee deduction and commission-based
crediting on enrollment approval, instructor withdrawal requests, and
platform commission configuration.

### FR-W01 --- Submit Wallet Top-Up Request

---

**Requirement ID** FR-W01

---

**Module** Wallet Management

**Requirement The system shall allow an authenticated student to
Statement** submit a wallet top-up request by uploading a
payment receipt and entering the bank-transfer
reference number and amount.

**Primary Actor** Student

**Trigger** Student selects \"Top Up Wallet\" from the wallet
dashboard.

**Preconditions** Student is authenticated and has completed a bank
transfer to the platform\'s bank account.

**Inputs** Transfer amount, transfer reference number, payment
receipt file, bank name (optional).

**Main Success Student enters amount, uploads receipt, and enters
Scenario** reference number, then submits; request status is
set to \"Pending Verification\" and the
Admin/Finance Officer is notified.

**Alternative Flow** Student saves the request as a draft before
submitting.

**Exception Flow** A required field (amount, reference number, or
receipt) is missing; the system displays a
validation error and blocks submission.

**Postconditions** Top-up request recorded with status \"Pending
Verification\"; wallet balance unchanged until
verified.

**Priority** Must

**Verification Testing
Method**
-------------------------------------------------------------------------

### FR-W02 --- Verify and Credit Wallet Top-Up

---

**Requirement ID** FR-W02

---

**Module** Wallet Management

**Requirement The system shall allow an Admin or Finance Officer
Statement** to review a pending top-up request, verify the bank
transfer, and approve or reject it.

**Primary Actor** Admin / Finance Officer

**Trigger** Admin/Finance Officer opens a top-up request with
status \"Pending Verification\".

**Preconditions** A top-up request exists with status \"Pending
Verification\".

**Inputs** Decision (Approve/Reject), optional rejection
reason.

**Main Success Admin/Finance Officer checks the receipt and
Scenario** reference number against bank records and approves;
the system credits the verified amount to the
student\'s wallet balance and sets status to
\"Completed\"; the student is notified.

**Alternative Flow** Admin/Finance Officer rejects the request with a
reason; the student is notified to resubmit.

**Exception Flow** Reference number does not match bank records; the
request is rejected with reason \"Verification
Failed\".

**Postconditions** Student wallet balance increased by the verified
amount (on approval); transaction logged with admin
ID, decision, and timestamp.

**Priority** Must

**Verification Testing
Method**
-------------------------------------------------------------------------

### FR-W03a --- Deduct Enrollment Fee from Student Wallet

---

**Requirement ID** FR-W03a

---

**Module** Wallet Management

**Requirement The system shall deduct the enrollment fee from the
Statement** student\'s wallet balance upon the instructor\'s
approval of a join request.

**Primary Actor** System (triggered by Instructor action)

**Trigger** Instructor approves a student\'s enrollment/join
request.

**Preconditions** Student wallet balance is greater than or equal to
the enrollment fee.

**Inputs** Enrollment fee amount.

**Main Success Instructor approves the request; the system verifies
Scenario** the student\'s wallet balance is sufficient and
deducts the enrollment fee from the student\'s
wallet; the enrollment status is set to \"Active\".

**Alternative Flow** N/A

**Exception Flow** Insufficient student wallet balance; the enrollment
approval is blocked, the instructor is notified
\"Insufficient Student Balance\", and the student is
notified to top up.

**Postconditions** Student wallet debited by the enrollment fee amount;
enrollment status set to \"Active\"; deduction
recorded as a wallet transaction.

**Priority** Must

**Verification Testing
Method**
-------------------------------------------------------------------------

### FR-W03b --- Credit Instructor Wallet After Commission

---

**Requirement ID** FR-W03b

---

**Module** Wallet Management

**Requirement The system shall credit the instructor\'s wallet
Statement** with the enrollment fee minus the platform
commission immediately following a successful fee
deduction (FR-W03a).

**Primary Actor** System (triggered by successful FR-W03a deduction)

**Trigger** A student wallet deduction (FR-W03a) completes
successfully for an approved enrollment.

**Preconditions** The platform commission rate is configured; the
associated fee deduction (FR-W03a) has been
completed.

**Inputs** Deducted enrollment fee amount, configured
commission percentage.

**Main Success The system calculates the commission as the fee
Scenario** multiplied by the commission rate, credits the fee
minus the commission to the instructor\'s wallet,
and records the commission in the platform revenue
ledger; both parties are notified.

**Alternative Flow** N/A

**Exception Flow** The associated deduction (FR-W03a) did not complete;
no credit is issued and the enrollment approval is
not finalized.

**Postconditions** Instructor wallet credited with the fee minus
commission; platform commission recorded. This
credit and the FR-W03a deduction are applied
together as a single atomic transaction.

**Priority** Must

**Verification Testing
Method**
-------------------------------------------------------------------------

### FR-W04 --- Instructor Withdrawal Request

---

**Requirement ID** FR-W04

---

**Module** Wallet Management

**Requirement The system shall allow an authenticated instructor
Statement** to submit a withdrawal request specifying an amount
and destination bank account, provided the amount
does not exceed the available wallet balance.

**Primary Actor** Instructor

**Trigger** Instructor selects \"Withdraw Funds\" from the
wallet dashboard.

**Preconditions** Instructor is authenticated; instructor wallet
balance is greater than or equal to the requested
withdrawal amount.

**Inputs** Withdrawal amount, bank account details
(account/IBAN number, bank name, account holder
name).

**Main Success Instructor enters the amount and bank details and
Scenario** submits; the system validates that the balance is
sufficient, sets the request status to \"Pending
Approval\", and notifies the Admin/Finance Officer.

**Alternative Flow** Instructor cancels a pending withdrawal request
before it is processed.

**Exception Flow** Requested amount exceeds the available wallet
balance; the system displays an error and blocks
submission.

**Postconditions** Withdrawal request recorded with status \"Pending
Approval\"; requested amount reserved and
unavailable for a further withdrawal request until
resolved.

**Priority** Must

**Verification Testing
Method**
-------------------------------------------------------------------------

### FR-W05a --- Approve or Reject Withdrawal Request

---

**Requirement ID** FR-W05a

---

**Module** Wallet Management

**Requirement The system shall allow an Admin or Finance Officer
Statement** to approve or reject a pending withdrawal request.

**Primary Actor** Admin / Finance Officer

**Trigger** Admin/Finance Officer opens a withdrawal request
with status \"Pending Approval\".

**Preconditions** A withdrawal request exists with status \"Pending
Approval\".

**Inputs** Decision (Approve/Reject), optional rejection
reason.

**Main Success Admin/Finance Officer reviews the request; on
Scenario** approval, status is set to \"Approved -- Pending
Transfer\" and the officer proceeds to complete the
bank transfer outside the system; on rejection, a
reason is recorded.

**Alternative Flow** Admin/Finance Officer rejects the request with a
reason; the reserved amount is released back to the
available balance and the instructor is notified.

**Exception Flow** The request cannot be reviewed due to missing bank
details; the system flags it for correction instead
of approving or rejecting.

**Postconditions** Withdrawal request status updated to \"Approved --
Pending Transfer\" or \"Rejected\"; instructor
notified of the decision.

**Priority** Must

**Verification Testing
Method**
-------------------------------------------------------------------------

### FR-W05b --- Deduct Withdrawal Amount on Confirmed Bank Transfer

---

**Requirement ID** FR-W05b

---

**Module** Wallet Management

**Requirement The system shall deduct the withdrawn amount from
Statement** the instructor\'s wallet balance once the Admin or
Finance Officer confirms that the bank transfer has
been completed.

**Primary Actor** Admin / Finance Officer

**Trigger** Admin/Finance Officer enters the bank-transfer
confirmation reference for a request with status
\"Approved -- Pending Transfer\" (FR-W05a).

**Preconditions** A withdrawal request exists with status \"Approved
-- Pending Transfer\".

**Inputs** Bank-transfer confirmation reference.

**Main Success Admin/Finance Officer enters the transfer
Scenario** confirmation reference; the system deducts the
amount from the instructor\'s wallet balance and
sets the request status to \"Completed\"; the
instructor is notified.

**Alternative Flow** N/A

**Exception Flow** The bank transfer cannot be completed; the request
remains \"Approved -- Pending Transfer\" until
resolved, and no deduction is made.

**Postconditions** Instructor wallet balance decreased by the withdrawn
amount; transaction logged with admin ID, bank
reference, and timestamp.

**Priority** Must

**Verification Testing
Method**
-------------------------------------------------------------------------

### FR-W06 --- View Wallet Transaction History

---

**Requirement ID** FR-W06

---

**Module** Wallet Management

**Requirement The system shall allow students and instructors to
Statement** view a chronological history of their wallet
transactions, including top-ups, deductions,
credits, and withdrawals, with status and timestamp
for each.

**Primary Actor** Student / Instructor

**Trigger** User opens the \"Wallet\" or \"Transaction History\"
page.

**Preconditions** User is authenticated.

**Inputs** Optional date-range or status filter.

**Main Success User opens the wallet page; the system displays the
Scenario** current balance and a list of transactions sorted by
date; the user may filter by type, date, or status.

**Alternative Flow** User exports the transaction history (e.g.,
PDF/CSV), if supported.

**Exception Flow** No transactions found; the system displays an
empty-state message.

**Postconditions** None (read-only operation).

**Priority** Should

**Verification Testing
Method**
-------------------------------------------------------------------------

### FR-W07 --- Configure Platform Commission Rate

---

**Requirement ID** FR-W07

---

**Module** Wallet Management

**Requirement The system shall allow an authorized Admin to define
Statement** and update the platform commission percentage
applied to instructor earnings.

**Primary Actor** Admin

**Trigger** Admin opens \"Platform Settings -- Commission\".

**Preconditions** Admin is authenticated with the appropriate
permissions.

**Inputs** New commission percentage value.

**Main Success Admin enters the new commission percentage and
Scenario** confirms; the system validates the value is within
an acceptable range (0-100%), updates the active
commission rate, and logs the change with admin ID
and timestamp.

**Alternative Flow** Admin schedules a future effective date for the new
rate, if supported.

**Exception Flow** Entered value is outside the valid range; the system
rejects the change and displays a validation error.

**Postconditions** New commission rate applied to subsequent
transactions; previous rate archived for audit
purposes.

**Priority** Must

**Verification Testing
Method**
-------------------------------------------------------------------------

## 2.3 Non-Functional Requirements

Non-functional requirements define the quality attributes, operational
constraints, standards, and measurable conditions under which the system
must perform its functions.

+-----------------------------------------------------------------------+
| **Writing Rule** |
| |
| Whenever possible, express each quality requirement using a |
| measurable threshold, operating condition, supported environment, or |
| compliance rule. Replace words such as fast, secure, reliable, and |
| easy with objective criteria. |
+=======================================================================+
+-----------------------------------------------------------------------+

### 2.3.1 Performance (NFR-01)

- The system shall respond to normal user requests within 3 seconds
  under \[defined load\].

- The system shall load primary screens within 5 seconds over
  \[defined network condition\].

- The system shall support at least \[number\] concurrent active
  users.

- The system shall complete \[critical operation\] within \[time
  limit\].

### 2.3.2 Security (NFR-02)

- The system shall authenticate users before allowing access to
  protected functions.

- The system shall enforce role-based access so that users can access
  only authorized functions and data.

- The system shall protect sensitive data during transmission using
  secure encrypted connections.

- The system shall lock an account for \[duration\] after \[number\]
  consecutive failed login attempts.

- The system shall restrict wallet top-up verification and withdrawal

  > approval actions to users holding the Admin or Finance Officer
  > role.

- The system shall encrypt and restrict access to uploaded payment
  > receipts and instructor bank account details.

### 2.3.3 Usability (NFR-03)

- At least \[percentage\]% of test users shall complete the primary
  task without assistance.

- A new user shall be able to complete \[primary task\] within
  \[number\] minutes during usability testing.

- The system shall display clear instructions and validation messages
  near the related input fields.

### 2.3.4 Reliability (NFR-04)

- The system shall complete critical transactions without partial or
  duplicate data records.

- The system shall recover from temporary service failures without
  losing confirmed user data.

- The failure rate for \[critical operation\] shall not exceed
  \[percentage\]% during the defined test period.

- The system shall apply a wallet deduction and its corresponding
  > credit (e.g., student deduction paired with instructor credit) as
  > a single atomic transaction, with no partial application in the
  > event of failure.

### 2.3.5 Availability (NFR-05)

- The system shall maintain at least \[percentage\]% availability
  during the defined service period.

- Planned maintenance shall be announced at least \[number\] hours
  before service interruption.

- The system shall display a clear service-status message when a
  required service is unavailable.

### 2.3.6 Scalability (NFR-06)

- The system shall support growth from \[initial number\] to \[target
  number\] active users without redesigning the core architecture.

- The system shall maintain the defined response-time target when
  processing up to \[number\] concurrent requests.

- The database shall support at least \[number\] records for \[main
  entity\] while meeting the defined performance target.

### 2.3.7 Maintainability (NFR-07)

- The source code shall follow the approved coding standards and
  modular project structure.

- Critical business components shall achieve at least \[percentage\]%
  automated test coverage.

- A change to one independent module shall not require unnecessary
  changes to unrelated modules.

### 2.3.8 Compatibility (NFR-08)

- The system shall support the approved operating systems, browsers,
  devices, and platform versions.

- The user interface shall remain usable across the defined screen
  sizes and orientations.

- The system shall preserve core functionality when used on the
  current and previous \[number\] supported browser versions.

### 2.3.9 Data Integrity (NFR-09)

- The system shall validate required data types, formats, ranges, and
  uniqueness rules before storage.

- The system shall prevent unauthorized modification or deletion of
  protected records.

- The system shall maintain consistent related records when a
  transaction succeeds or fails

- The system shall ensure that the sum of all wallet transaction
  entries for a user equals that user\'s recorded wallet balance at
  all times.

- The system shall prevent a wallet balance from becoming negative as
  > a result of concurrent transactions.

### 2.3.10 Privacy (NFR-10)

- The system shall collect only the personal data required for
  approved system functions.

- The system shall restrict access to personal data according to the
  user's authorized role.

- The system shall retain and delete personal data according to the
  approved retention policy.

### 2.3.11 Backup and Recovery (NFR-11)

- The system shall create an automated backup of critical data every
  \[period\].

- The recovery point objective (RPO) shall not exceed \[duration\].

- The recovery time objective (RTO) shall not exceed \[duration\].

- Backup restoration shall be tested at least once every \[period\].

### 2.3.12 Accessibility (NFR-12)

- The interface shall provide text labels for interactive controls and
  meaningful alternative text for informative images.

- Core functions shall be operable using a keyboard where the target
  platform supports keyboard input.

- Text, controls, and status messages shall meet the approved
  accessibility and contrast guidelines.

- The system shall conform to WCAG 2.1 Level AA where applicable to
  the selected platform.

### 2.3.13 Non-Functional Requirements Summary

---

**ID** **Category** **Requirement Focus** **Target /
Measurement**

---

NFR-01 Performance Response time, throughput, and \[Seconds / requests
load. / users\]

NFR-02 Security Access control and data \[Policy / standard
protection. / control\]

NFR-03 Usability Ease of learning and operation. \[Time / completion
rate /
satisfaction\]

NFR-04 Reliability Correct and consistent \[Failure rate /
operation. recovery result\]

NFR-05 Availability Service uptime. \[Percentage /
service window\]

NFR-06 Scalability Ability to support growth. \[Users / records /
transactions\]

NFR-07 Maintainability Ease of correction and \[Standards /
enhancement. coverage / change
time\]

NFR-08 Compatibility Supported devices and \[Versions /
environments. browsers /
platforms\]

NFR-09 Data Integrity Accuracy and consistency of \[Validation /
stored data. uniqueness /
constraints\]

NFR-10 Privacy Lawful and restricted \[Policy / roles /
personal-data use. retention\]

NFR-11 Backup and Protection against data loss. \[Schedule / RPO /
Recovery RTO\]

NFR-12 Accessibility Inclusive interface operation. \[Guideline / test
result\]
-------------------------------------------------------------------------------

_End of Chapters 1 and 2_
