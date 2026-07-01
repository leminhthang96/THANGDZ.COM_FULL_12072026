# Example User Stories & Acceptance Criteria for ProjectOS (Project Management)

> This document provides 4 real-world examples covering core business operations in a project management product: Create Project, Assign Task, Update Progress, and Reporting.
> All brand names have been anonymized to generic forms: Project X, Team Y, Client Z...
> All example content is written in professional English.

---

## Example 1: Create New Project

### User Story US-PROJ-001: Create a new project with basic information

**As a** Project Manager who has been granted project creation permissions on ProjectOS.
**I want to** create a new project with a name, description, start date, end date, and an initial member list.
**So that** the team can start working immediately within a shared project space that already has the foundational information.

#### INVEST Self-assessment

| Criterion | Pass? (✅/⚠️) | Notes |
| :--- | :---: | :--- |
| **I**ndependent | ✅ | No dependency on other stories if the user management module already exists. |
| **N**egotiable | ✅ | No storage technology or database schema has been locked down. |
| **V**alue | ✅ | Project Managers can initialize a workspace; the team can start immediately. |
| **E**stimable | ✅ | Business flow is relatively standard; estimated at 3 working days. |
| **S**mall | ✅ | Estimated implementation effort is approximately 3 developer working days. |
| **T**estable | ✅ | Acceptance criteria are clearly defined and measurable. |

#### Acceptance Criteria 1: Create project successfully with valid information (Happy path)**

- **Given** Project Manager is logged in and has project creation permissions.
- **And** the project name is "CRM System v2.0," start date is 07/01, end date is 09/30.
- **When** Project Manager fills in all required fields and clicks "Create Project."
- **Then** system creates a new project record and displays the project detail page within 3 seconds.
- **And** sends invitation emails to all members added to the initial member list.

#### Acceptance Criteria 2: End date before start date (Edge case)**

- **Given** Project Manager is creating a new project.
- **When** Project Manager enters start date as 09/30 and end date as 07/01.
- **Then** system displays error message: "Project end date must be after the start date. Please review your input."
- **And** does not create a new project record.

#### Acceptance Criteria 3: Duplicate project name (Negative path)**

- **Given** a project named "CRM System v2.0" already exists in the system.
- **When** Project Manager enters the name "CRM System v2.0" and clicks "Create Project."
- **Then** system displays warning: "A project with this name already exists. Do you want to continue creating it?"
- **And** if Project Manager confirms, the system allows creating a project with a duplicate name; if cancelled, returns to the form.

#### Definition of Done

- [ ] Code passed unit test
- [ ] Project record is saved to the database with all required fields populated
- [ ] Invitation email is sent successfully via the configured SMTP server
- [ ] Members added to the project gain access immediately
- [ ] Dashboard / project page displays the newly created project after page reload

---

## Example 2: Assign Task (Task Assignment)

### User Story US-TASK-001: Assign a task to a team member within a project

**As a** Project Manager managing an active project on ProjectOS.
**I want to** create a new task, assign it to a specific team member, and set a deadline.
**So that** team members know their responsibilities clearly, and I can track the progress of task assignments in real time.

#### Acceptance Criteria 1: Assign task successfully (Happy path)**

- **Given** project "CRM v2.0" is active and has 3 members: Nguyen Van A, Tran Thi B, Le Van C.
- **When** Project Manager creates task "Design the homepage," assigns it to Nguyen Van A, and sets the deadline to 07/15.
- **Then** system creates a new task with status "Not Started" and assigns it to Nguyen Van A.
- **And** sends a reminder notification via email and in-app to Nguyen Van A.
- **And** displays the new task in the project's task list and on Nguyen Van A's personal page.

#### Acceptance Criteria 2: Assign task to a non-project member (Edge case)**

- **Given** project "CRM v2.0" has 3 members: Nguyen Van A, Tran Thi B, Le Van C.
- **When** Project Manager attempts to assign a task to Hoang Van D — who is not a project member.
- **Then** system displays error message: "Hoang Van D is not a member of this project. Please add the member before assigning tasks."
- **And** does not create a task record.

#### Acceptance Criteria 3: Member receiving tasks exceeding the threshold (Negative path)**

- **Given** Nguyen Van A already has 8 in-scope tasks in project "CRM v2.0" and the maximum threshold is 10 tasks.
- **When** Project Manager assigns a 9th task to Nguyen Van A.
- **Then** system displays warning: "Nguyen Van A already has 8 in-scope tasks. Are you sure you want to assign another?"
- **And** if Project Manager confirms, the task is still assigned; if cancelled, returns to the form.

#### Definition of Done

- [ ] Code passed unit test
- [ ] New task is created with all fields populated in the database
- [ ] Assigned member receives notifications via email and in-app
- [ ] Team member's task list is updated immediately after assignment
- [ ] New task appears on the assigned member's personal page

---

## Example 3: Update Task Progress

### User Story US-PROGRESS-001: Update task status and progress

**As a** team member who has been assigned a task in a project.
**I want to** update the status (Not Started / In Progress / Completed / On Hold) and the completion percentage.
**So that** the Project Manager and stakeholders can see the actual task status in real time.

#### Acceptance Criteria 1: Update progress successfully (Happy path)**

- **Given** task "Design the homepage" has status "In Progress" with 40% completion.
- **When** team member updates the progress to 80% and changes the status to "In Progress."
- **Then** system saves the new status and progress within 2 seconds.
- **And** the project's Gantt chart and Kanban board are updated instantly.
- **And** Project Manager receives a notification about the progress update.

#### Acceptance Criteria 2: Progress decreased compared to previous entry (Edge case)**

- **Given** the task has a recorded progress of 60%.
- **When** team member updates the progress down to 30%.
- **Then** system requires the team member to enter a note explaining the reason for the decrease.
- **And** after the note is provided, system saves the new progress and sends a warning notification to the Project Manager.

#### Acceptance Criteria 3: Update a completed task (Negative path)**

- **Given** the task has status "Completed" with 100% progress.
- **When** team member attempts to update the progress back to 50%.
- **Then** system displays message: "This task has been marked as completed. Please unlock the task before updating progress."
- **And** does not save the 50% progress value.

#### Definition of Done

- [ ] Code passed unit test
- [ ] API endpoint returns a result within 2 seconds
- [ ] Status and progress update in real time for all users currently viewing the task
- [ ] Notification sent successfully via configured channels (email / in-app)

---

## Example 4: Project Progress Report

### User Story US-REPORT-001: View project portfolio overview report

**As a** Project Manager tracking multiple projects simultaneously.
**I want to** view a summary report on progress, task status, and risks for each project.
**So that** I can quickly assess the overall portfolio health and prioritize intervention when needed.

#### Acceptance Criteria 1: Display report with complete information (Happy path)**

- **Given** Project Manager is tracking 3 projects: "CRM v2.0" (25 tasks), "ERP System" (10 tasks), "Mobile App" (15 tasks).
- **When** Project Manager accesses the Reports page.
- **Then** system displays a summary table including: project name, total tasks, completed, in-progress, overdue, and average progress percentage (%).
- **And** sorts by default according to the project with the most overdue tasks.

#### Acceptance Criteria 2: Project with no tasks (Edge case)**

- **Given** project "Marketing Q3" has been created but no tasks have been assigned.
- **When** Project Manager views the report for this project.
- **Then** system displays the status "No tasks yet" instead of a percentage.
- **And** displays a Call-to-Action (CTA) button: "Create First Task."

#### Acceptance Criteria 3: Report loading timeout (Negative path)**

- **Given** Project Manager requests a report for a project with more than 500 tasks.
- **When** the system is processing the report data.
- **Then** system displays a loading progress bar with message "Loading report..."
- **And** if the load time exceeds 10 seconds, system displays an option: "Load as file (background)."

#### Definition of Done

- [ ] Code passed unit test
- [ ] Reports page loads within 10 seconds with a dataset of 500 tasks
- [ ] Charts (Gantt / bar chart) render with correct data, without misalignment
- [ ] Loading progress bar displays when processing large datasets
- [ ] Export file (CSV / PDF) contains the same data as displayed in the UI

---

## Key Principles Derived from the Examples

1. **Specific Persona:** Always identify the user's role and context precisely (e.g., "Project Manager tracking multiple projects," "team member assigned a task in a project") rather than using the generic term "user."
2. **Verifiable Goals:** Goals always target clear business outcomes (clarify responsibilities, track real-time progress, prevent resource overload).
3. **Complete AC Coverage:** Every User Story must cover at minimum — Happy path, Edge case, and Negative path.
4. **No Technology Implementation Details:** Avoid referencing algorithm names, source code structure, database tables, or specific programming libraries to preserve the story's Negotiable quality.
5. **Add DoD Where Appropriate:** For features involving real-time updates, notifications, or third-party integrations, add a technical DoD checklist to guide developers and QA on delivery criteria.
