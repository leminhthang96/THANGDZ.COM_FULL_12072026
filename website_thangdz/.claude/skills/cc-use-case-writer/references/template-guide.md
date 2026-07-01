# Template Guide — How to Fill Each Field

Detailed guidance for filling each of the 13 fields, with pass/fail examples in the ProjectOS domain.

## Table of Contents

1. [Use Case ID](#1-use-case-id)
2. [Use Case Name](#2-use-case-name)
3. [Use Case History](#3-use-case-history)
4. [Actor](#4-actor)
5. [Description](#5-description)
6. [Preconditions](#6-preconditions)
7. [Postconditions](#7-postconditions)
8. [Priority](#8-priority)
9. [Frequency of Use](#9-frequency-of-use)
10. [Normal Course of Events](#10-normal-course-of-events)
11. [Alternative Courses](#11-alternative-courses)
12. [Exceptions](#12-exceptions)
13. [Includes](#13-includes)
14. [Special Requirements](#14-special-requirements)
15. [Assumptions](#15-assumptions)
16. [Notes and Issues](#16-notes-and-issues)

---

## 1. Use Case ID

**Purpose**: Unique identifier so requirements can be traced back to the UC.

**Rules**:

- Format: `UC-<module>-<sequence>` or `UC-X.Y` (hierarchical)
- Use a consistent naming convention across the project
- For related UC groups, use X.Y (e.g. UC-3.1, UC-3.2 belong to the "Project Management" group)
- Pad the sequence to 2-3 digits: `UC-PROJ-01`, `UC-TASK-003`

**Good examples**:

- `UC-PROJ-01` (Project module, UC #1)
- `UC-TASK-03` (Task Management module, UC #3)
- `UC-3.2` (hierarchical, 2nd sub-UC of group 3)

**Bad examples**:

- `UC1` (no scheme)
- `UseCase_ProjectCreate` (mixes name into ID — hard to maintain when name changes)

---

## 2. Use Case Name

**Purpose**: Short label describing the UC's goal.

**CRITICAL rules**:

- MUST follow **"Action verb + Object"** form
- 3-7 words, not too long
- DO NOT start with the actor name
- DO NOT use vague verbs ("manage", "handle", "process", "do")
- Reflects the actor's goal, not the implementation

**Pattern**: `<Verb> <Direct Object> [<modifier>]`

**Good examples** (ProjectOS):

- ✅ "Create a new project"
- ✅ "Assign task to team member"
- ✅ "Update project deadline"
- ✅ "Archive a completed project"
- ✅ "Add team member to project"

**Bad examples → how to fix**:

- ❌ "Project Enrollment" → ✅ "Create a new project"
- ❌ "Project Manager assigns task" (actor included) → ✅ "Assign task to team member"
- ❌ "Manage projects" (vague verb) → split into "Create project", "Update project", "Archive project"
- ❌ "Task is created" (passive voice) → ✅ "Create a task"

---

## 3. Use Case History

**Purpose**: Audit trail (Created By, Date Created, Last Updated By, Date Last Updated).

**Rules**:

- Created By: full name + role (e.g. "Project Manager - ProjectOS")
- Date Created: YYYY-MM-DD format
- Last Updated By + Date Last Updated: update on every edit
- If unknown, use the placeholder `<TBD>` instead of leaving blank

---

## 4. Actor

**Purpose**: Identify who/what interacts with the system.

**Actor types**:

- **Primary actor**: Initiates the UC, benefits from the outcome
- **Secondary actor**: Supporting system/person (Notification Service, Authentication Service, Calendar Integration)
- **Off-stage stakeholder**: Has interest but doesn't interact directly (regulators, auditors) — usually NOT listed in the Actor field

**Rules**:

- The primary actor MUST be a specific role/class — never write "User" generically
- A UC should have 1 primary actor (rarely 2+)
- If there's a secondary actor, label it clearly

**Good examples** (ProjectOS):

- ✅ "Primary: Project Manager (workspace Admin, active account)"
- ✅ "Primary: Team Member (active project member)"
- ✅ "Primary: Client (external stakeholder with view-only access)"
- ✅ "Primary: Project Manager; Secondary: Notification Service, Authentication Service"

**Bad examples**:

- ❌ "User" (too generic)
- ❌ "Employee" (ambiguous — is it the same as Team Member?)
- ❌ "System" (the system is the target of the UC, not an actor)

---

## 5. Description

**Purpose**: Summarize the UC in 2-3 sentences so readers grasp what it's about quickly.

**Rules — must answer 3 questions**:

1. **WHY**: The reason/trigger that leads to this UC
2. **WHAT**: What the actor does with the system
3. **OUTCOME**: The final result (new system state / value for the actor)

**Pattern**: `[When/To] <trigger/reason>, <actor> <action> in order to <outcome>.`

**Good example** (ProjectOS):
> "When a Project Manager identifies a work item that needs to be performed by a team member [WHY], the Project Manager creates a task within a project, assigns it to the responsible member, and sets a deadline [WHAT]. The UC ends when the task is created, the assignee is notified, and the task appears on the project task board [OUTCOME]."

**Bad examples**:
> ❌ "This UC is about task assignment." (too short, missing WHY and OUTCOME)
> ❌ "The task module has these steps: create, assign, notify…" (describes flow, not a description)

---

## 6. Preconditions

**Purpose**: List conditions that MUST be true before the UC can start.

**CRITICAL rules**:

- Every precondition must be **verifiable** (boolean check)
- Number them: 1, 2, 3…
- Distinguish from Business Rules:
  - Precondition: checked BEFORE the UC starts
  - Business Rule: applied DURING the UC's flow
- Distinguish from Assumptions:
  - Precondition: REQUIRED for the UC to run
  - Assumption: BELIEVED to be true but not verified

**Good examples** (ProjectOS):

```
1. Project Manager has logged in to ProjectOS with a verified email address
2. Project Manager has the "Create Project" permission in the workspace
3. The project name does not duplicate an existing project name in the workspace
4. Notification Service is available
```

**Bad examples**:

- ❌ "System is operating" (too generic, not verifiable)
- ❌ "Project Manager wants to create a project" (motivation, not a condition)
- ❌ "Project Manager must have a valid workspace subscription" (belongs in a different UC, not a project creation UC)

---

## 7. Postconditions

**Purpose**: Describe the system state AFTER successful UC completion.

**Rules**:

- Verifiable (can be checked via DB query / API response)
- Cover all kinds of changes:
  - Data state (new record, status change)
  - User-facing state (notification sent, file available for download)
  - External system state (API call succeeded, calendar blocked)
- Number them

**Important**: A postcondition is a **state**, not an **action**.

- ✅ State: "Project record is created with status='Active'"
- ❌ Action: "System creates the project record" (this is a step in the Normal Course)

**Good example** (ProjectOS):

```
1. Project record is created in the Projects table with status='Active', creation timestamp, and owner
2. Project members are added to the Project_Members table with their assigned roles
3. Project appears in the Project Manager's project list
4. Project creation notification is sent to all invited members via email and in-app notification within 60 seconds
```

---

## 8. Priority

**Purpose**: Define the implementation priority of the UC.

**Common schemes**:

- **MoSCoW**: Must / Should / Could / Won't
- **3-level**: High / Medium / Low

**Rules**:

- Use the SAME scheme as the project's SRS / PRD
- Justify (one sentence explaining why priority X)

**Good examples** (ProjectOS):

- "High — Core feature; directly tied to team coordination and project delivery metrics"
- "Medium — Enhances reporting and analytics; planned for phase 2"

---

## 9. Frequency of Use

**Purpose**: Estimate how often the UC will be executed → input for performance/capacity planning.

**Rules**:

- Use SPECIFIC NUMBERS (not "occasionally", "frequently")
- Suitable time units: per second, per hour, per day, per month
- If there are peak times, state them explicitly

**Good examples** (ProjectOS):

- "~500 tasks/day platform-wide; peak ~80/hour during sprint planning sessions (Monday and Thursday mornings)"
- "~50 projects/day across all workspaces; peak ~15/hour during Monday morning planning"

**Bad examples**:

- ❌ "Frequent"
- ❌ "Daily" (no volume)

---

## 10. Normal Course of Events

**Purpose**: Describe the happy path — steps from trigger to goal achieved.

**CRITICAL rules** (this is the most error-prone field):

### 10.1. Format

- Numbered list (1, 2, 3…)
- Each step: one single action
- Start with a clear subject (Actor / System)
- Active voice + present tense
- Short steps, 1-2 sentences each

### 10.2. Alternate Actor / System

Typical pattern: Actor → System → Actor → System…

- Odd steps: actor input
- Even steps: system response

### 10.3. DO NOT embed

- ❌ If/else → move to Alternative Course
- ❌ Loops → use "Steps X-Y repeat until Z"
- ❌ Exceptions → move to Exceptions
- ❌ Internal system logic → that's design, not a UC

### 10.4. Start and end

- Step 1: Trigger (the event that activates the UC)
- Final step: Goal achieved (postcondition met)

**Good example** (ProjectOS — create a project):

```
1. Project Manager navigates to the "Projects" section and clicks "Create Project".
2. System displays the project creation form: name, description, start date, end date, and team member list.
3. Project Manager fills in the project name and description.
4. Project Manager sets the start date and end date.
5. Project Manager searches for and adds team members.
6. Project Manager assigns a project role to each added member (Project Manager, Team Member, Viewer).
7. Project Manager clicks "Create Project".
8. System validates all required fields and checks for duplicate project names.
9. System creates the project record and saves all member assignments.
10. System sends project creation notifications to all invited members.
11. System displays the project detail page with a success message.
```

**Bad examples → how to fix**:

- ❌ "1. If the Project Manager has Admin role, they can create any project; otherwise they can only create limited projects…" → Move the branching to an Alternative Course
- ❌ "8. System validates. If invalid, show error. If valid, continue." → Validation-pass continues in flow; validation-fail goes into an Exception
- ❌ "9. System calls POST /api/v1/projects with body {name, description, owner_id}…" → Too technical. Say: "System creates the project record in the database"

---

## 11. Alternative Courses

**Purpose**: A DIFFERENT path that still leads to the goal (still success), just a different route.

**Rules**:

- ID format: `UC-XX.AC.N` (AC = Alternative Course)
- Each AC starts with: "At step Y of the Normal Course, if [condition], execute the alternative: …"
- After the AC, state explicitly which step of the Normal Course to continue from

**Good example** (ProjectOS):

```
UC-PROJ-01.AC.1: Add team members from workspace directory
At step 5 of the Normal Course, if the Project Manager selects members from the workspace member directory:
5a. System displays a searchable member directory with availability status.
5b. Project Manager selects one or more members and clicks "Add Selected".
5c. System adds selected members to the team member list → continue from step 6 of the Normal Course.
```

---

## 12. Exceptions

**Purpose**: Cases where the UC FAILS (goal is not achieved).

**Rules**:

- ID format: `UC-XX.EX.N` (EX = Exception)
- Each exception needs 3 parts:
  1. **Trigger condition**: When the exception occurs
  2. **System response**: What the system does
  3. **Final state**: The end state (rollback? partial? log?)

**Common failure modes to check** (don't forget):

- Validation errors (wrong format, missing field)
- Business rule violations (quota exceeded, duplicate project name)
- External service failures (notification service timeout, authentication service unavailable)
- Network/connectivity issues
- Permission denied / authorization failure
- Concurrency conflict (two Project Managers creating project with same name simultaneously)
- Workload overload (assignee's tasks exceed capacity threshold)

**Good example** (ProjectOS):

```
UC-PROJ-01.EX.2: Duplicate project name
Trigger: At step 8, the system detects a project with the same name already exists in the workspace.
Response: System displays "A project with this name already exists. Please enter a different project name."
Final state: No project record is created. Project Manager can edit the name and resubmit.
```

---

## 13. Includes

**Purpose**: Reuse common functionality across UCs.

**Rules**:

- List sub-UCs "called" by this UC (UML «include» semantics)
- The sub-UC must exist (have its own spec)
- DO NOT use Includes just to group minor steps — only for logic reused in other UCs

**Good example** (ProjectOS):

```
- UC-NOTI-01: Send project creation notification (called at step 10 of the Normal Course)
- UC-TASK-01: Assign task (called at step 3 of the project planning UC)
```

---

## 14. Special Requirements

**Purpose**: Non-functional requirements specific to this UC.

**Categories to cover**:

- **Performance**: Response time, throughput, concurrent users
- **Security**: Authentication, encryption, data privacy
- **Usability**: Accessibility, mobile-first requirements
- **Reliability**: Uptime, async fallback strategy
- **Compliance**: Regulatory requirements (VAT invoicing, data retention)

**Rule**: DO NOT duplicate functional requirements — only list non-functional.

**Good example** (ProjectOS):

```
- Performance: Project list page loads ≤ 2s under 5,000 concurrent users; project creation completes ≤ 3s
- Security: Only workspace members with "Create Project" permission can initiate this UC; project names validated server-side
- Reliability: If Notification Service is unavailable, project must still be created — retry notifications asynchronously up to 30 min
- Compliance: Project data retained per organization data retention policy (default: 7 years after project closure)
```

---

## 15. Assumptions

**Purpose**: Things assumed during analysis that haven't been verified.

**Difference vs Precondition**:

- Precondition: MUST BE TRUE, system can verify
- Assumption: BELIEVED TO BE TRUE, not required to verify

**Good example** (ProjectOS):

```
1. Project Manager's email address is verified and active — notifications will not bounce
2. Notification Service SLA is ≥ 99.5% uptime during business hours
3. All team members to be invited are already registered in the workspace
4. Authentication Service access provisioning completes synchronously in < 3s under normal load
```

---

## 16. Notes and Issues

**Purpose**: Open questions, TBDs, follow-up items.

**Format**:

```
[TBD-N] | Owner | Due Date | Resolution
```

**Good example** (ProjectOS):

```
- [TBD-1] Should sub-projects (nested hierarchy) be supported in phase 2? | Owner: Product Team | Due: 2026-06-01 | Resolution: TBD — deferred
- [TBD-2] What is the maximum number of team members allowed per project? | Owner: Project Manager - ProjectOS | Due: 2026-05-25 | Resolution: TBD
- [NOTE] Project creation form must support drag-and-drop reordering of team members — coordinate with Frontend team
```
