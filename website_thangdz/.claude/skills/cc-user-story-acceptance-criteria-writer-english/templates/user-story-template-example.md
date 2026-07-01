# User Story & Acceptance Criteria Template — Worked Example

> **Purpose:** This is a worked example — US "Create Project" with Happy + Edge + Negative AC fully filled out.
> Use to learn the structure, reference writing patterns, and as a template when drafting actual US.
>
> **Blank template to fill in:** See [user-story-template-blank.md](./user-story-template-blank.md).

---

## User Story US-[FEATURE_CODE]-[NUMBER]: [Brief title]

**As a** project manager who has been granted project management permissions on ProjectOS
> ✅ *"project manager who has been granted project management permissions on ProjectOS"*
> ❌ *"user"*

**I want to** create a new project with full details and send invitation emails to team members
> ✅ *"assign tasks to specific team members and set deadlines"*
> ❌ *"manage tasks"*

**So that** team members receive notifications and can start working on the very first day
> ✅ *"team members know their responsibilities clearly and I can track assignment progress"*
> ❌ *"so I can assign tasks"* (repeats I want)

---

### Metadata

| Field | Value | Notes |
| :--- | :--- | :--- |
| **Epic / Feature** | Project Management | |
| **Priority (MoSCoW)** | Must | Core business capability — without project creation, the product is unusable |
| **Estimate** | 5 story points | |
| **Dependencies** | None | |
| **Assumptions** | Team members' emails have been verified in the system | |

---

### INVEST Self-Check

| Criteria | Met? | Notes & How to Fix if ⚠️ |
| :--- | :--- | :--- |
| **I**ndependent | ✅ | Does not depend on any other story |
| **N**egotiable | ✅ | Focuses on What, no rigid technical details |
| **V**aluable | ✅ | So that states a clear business outcome |
| **E**stimable | ✅ | Business logic is clear enough to estimate |
| **S**mall | ✅ | Story focuses only on Create Project (no CRUD combined) |
| **T**estable | ✅ | Has all 3 AC: Happy + Edge + Negative |

> **Rule:** If any criteria is ⚠️ → **DO NOT move to Sprint Planning** until resolved.

---

### Acceptance Criteria

> **Format:** Given-When-Then (Gherkin syntax)
> **Minimum requirement:** 3 criteria — Happy path + Edge case + Negative path
> **Distinction:** Acceptance Criteria (AC) ≠ Test Case ≠ Test Script
>
> - **AC** describes business behavior → written for BA/PO.
> - **Test Case** is derived from AC, specifying inputs/expected results → written for Tester.
> - **Test Script** is the code/procedure executing the Test Case → written for QA Automation.

#### Given-When-Then Writing Rules (Gherkin)

| Component | Role | Rule |
| :--- | :--- | :--- |
| **Given** | Precondition — context BEFORE the action | Use SPECIFIC data: real names, dates, quantities. **Do not** use generic values like "a valid user". |
| **When** | Single UNIQUE action by the user | Only ONE action. If multiple actions are needed → split into 2 separate AC. |
| **Then** | Primary result — measurable | Include specific metrics: "within 3 seconds", "80% rate", "sends 3 notifications". |
| **And** | Secondary result extending from Then | Use for supplementary results on the same branch. **Maximum 2 And** per AC. If more needed → split AC. |
| **But** | Exception / opposite case of Then | Use when describing a contrasting behavior from the main Then. |

#### Anti-patterns

| ❌ Wrong | ✅ Correct |
| :--- | :--- |
| `When` has multiple actions: "click Create **and** click Confirm" | Split into 2 separate AC |
| `Then` uses vague words: "system responds **fast**" | "system responds **within 2 seconds**" |
| Generic `Given`: "a valid user" | "Nguyen Van A has logged in as a project manager" |
| 4+ `And` clauses accumulating → AC too long | AC is combining multiple scenarios → split into 2 AC |
| Using `And` for exceptions | Use `But` for the opposite case |
| Describing UI details: "blue button" | Describing behavior: "system displays success message" |
| Contains API names: "call POST /v1/projects" | Describing business: "system creates a new project record" |

#### Acceptance Criteria 1: Create project successfully — Happy path

> **Rule:** Happy path describes the IDEAL SUCCESS flow — user does everything right, system responds correctly.

- **Given** the project manager is logged in and has permission to create projects on ProjectOS
- **When** the project manager fills in all required fields (project name, description, start date, end date) and clicks the "Create Project" button
- **Then** the system creates a new project record and displays the project detail page within 3 seconds
- **And** sends invitation notifications via email to the team members added to the project
- **And** the new project appears in the project manager's Dashboard under "My Projects"

<!-- markdownlint-disable MD031 MD040 -->
> **Gherkin illustration:**
>
> ```gherkin
> Given the project manager is logged in and has permission to create projects on ProjectOS
> When  the project manager fills in all required fields and clicks "Create Project"
> Then  the system creates a new project record and displays the project detail page within 3 seconds
> And   sends invitation notifications via email to the added team members
> And   the new project appears in the project manager's Dashboard
> ```
<!-- markdownlint-enable MD031 MD040 -->

#### Acceptance Criteria 2: Assign task to non-project member — Edge case

> **Rule:** Edge case describes BOUNDARY conditions — data is in the correct format but at the limit or in a special case.
>
> **Note:** This AC illustrates the Edge case structure — part of task assignment. Use as a structural reference; it does not necessarily belong to the same "Create Project" US.

- **Given** project "CRM Version 2.0" is active and has 3 members: Nguyen Van A, Tran Thi B, Le Van C
- **When** the project manager attempts to assign a task to Hoang Van D — a person who is not a member of the project
- **Then** the system displays a message: "Hoang Van D is not a member of this project"
- **And** does not create a new task record

<!-- markdownlint-disable MD031 MD040 -->
> **Gherkin illustration:**
>
> ```gherkin
> Given project "CRM Version 2.0" has 3 members: Nguyen Van A, Tran Thi B, Le Van C
> When  the project manager attempts to assign a task to Hoang Van D — not a project member
> Then  the system displays a message: "Hoang Van D is not a member of this project"
> And   does not create a new task record
> ```
<!-- markdownlint-enable MD031 MD040 -->

#### Acceptance Criteria 3: Assign task exceeding member workload threshold — Negative path

> **Rule:** Negative path describes behavior when an ERROR occurs or data is INVALID — system must handle gracefully, no crash, no side effects.
>
> **Note:** This AC illustrates the Negative path structure — part of task assignment. Use as a structural reference; it does not necessarily belong to the same "Create Project" US.

- **Given** a team member already has 8 in-progress tasks (maximum threshold: 10 tasks in the same status)
- **When** the project manager assigns the 9th task to that team member
- **Then** the system displays a warning: "This member already has 8 in-progress tasks"
- **And** if the project manager confirms the warning, the task is still assigned successfully
- **But** the 11th task cannot be assigned without confirming the warning

<!-- markdownlint-disable MD031 MD040 -->
> **Gherkin illustration:**
>
> ```gherkin
> Given a team member already has 8 in-progress tasks (maximum threshold: 10)
> When  the project manager assigns the 9th task to that team member
> Then  the system displays a warning: "This member already has 8 in-progress tasks"
> And   if the project manager confirms, the task is still assigned
> But   the 11th task cannot be assigned without confirming the warning
> ```
<!-- markdownlint-enable MD031 MD040 -->

#### AC Quality Checklist

> Self-assess each item before confirming AC is ready. Full checklist: see [quality-checklist.md](../checklists/quality-checklist.md).

**Gherkin structure:**

- [x] Each AC has **Given + When + Then** complete.
- [x] **When** contains only **ONE** action.
- [x] **Then** has **specific measurable metrics** (time, quantity, percentage).
- [x] Number of **And** clauses per AC **≤ 2**. If > 2 → split AC.
- [x] Uses **But** for exceptions instead of And.

**Given data:**

- [x] Given uses **specific data** (names, dates, quantities) rather than generic ("a valid user").
- [x] Given does not contain actions — only describes the initial state.

**Scenario coverage:**

- [x] Has **1 Happy path** (success flow).
- [x] Has **1 Edge case** (business boundary).
- [x] Has **1 Negative path** (error handling / invalid data).
- [x] Total AC count for this US **≤ 7–8**. If exceeded → decompose US.

**Language:**

- [x] **No** vague words: "fast", "beautiful", "friendly", "appropriate", "intuitive".
- [x] **No** technical details: API names, database schema, framework.
- [x] **No** UI descriptions: button colors, pixels, font styles.
- [x] Error messages have **specific content**, not generic "error message".

**Test Case derivation:**

- [x] From each AC, at least **3 Test Cases** can be derived: valid input, boundary, invalid.
- [x] Tester can read AC and **understand the scenario without asking BA**.

---

### Definition of Done (DoD)

> **DoD ≠ Acceptance Criteria.** AC is for BA/PO to confirm business. DoD is for Dev/QA to confirm technical delivery quality.

#### DoD — Business (evaluated by BA/PO)

- [x] Notification email is sent to the correct recipient addresses
- [x] Toast notification is displayed after successful project creation
- [x] Error messages have specific content, not generic

#### DoD — Technical (evaluated by Dev/QA)

- [x] Code passed unit test
- [x] API endpoint response time < 3 seconds when creating a project
- [x] Tested on Chrome, Safari, Firefox
- [x] Realtime sync works with 3+ concurrent users on the same project

---

### Notes

| Type | Content |
| :--- | :--- |
| **Dependencies** | None |
| **Assumptions** | Team members' emails have been verified; project manager is already logged in |
| **Open Questions** | Should we confirm the maximum number of members that can be assigned to one project? |

---

### Appendix: Quick AC Writing Rules Summary

> Use as a quick checklist when writing or reviewing AC. For detailed examples and full guidance, see the **Acceptance Criteria** section above.

| Component | Golden Rule |
| :--- | :--- |
| **Given** | Use SPECIFIC data. Not generic ("valid user"). No actions. |
| **When** | Only ONE action. Multiple actions → split into 2 AC. |
| **Then** | Specific measurable metrics (time, quantity, %). No vague words. |
| **And** | Maximum 2 per AC. More → split AC. |
| **But** | Use for exceptions / opposite of Then. |

**Minimum:** 3 AC — Happy path + Edge case + Negative path.

**Do not use:** vague words ("fast", "beautiful"), technical details (API, database), UI descriptions (button color, pixels).
