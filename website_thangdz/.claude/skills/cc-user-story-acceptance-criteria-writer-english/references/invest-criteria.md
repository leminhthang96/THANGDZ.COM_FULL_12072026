# INVEST Criteria — Detailed Explanation & Practical Guide

> **Role:** **In-depth reference** document explaining the theory and providing practical guidance for all 6 INVEST criteria.
>
> **Position in the documentation set:** This document supplements [user-story-template-blank.md](../templates/user-story-template-blank.md) — the template provides **what to fill in**, this document provides **why** and **how to handle violations**.
>
> **Audience:** BA (writes US), PO (reviews US), Developer (estimates US), QA (confirms testability).

---

## INVEST Quick Card

| Criterion | Quick Question | Most Common Violation | Action on Violation |
| :--- | :--- | :--- | :--- |
| **I**ndependent | Can it be developed/tested independently? | Depends on another US | Use mock data; split/merge US |
| **N**egotiable | Is there room to negotiate the How? | Over-specify (pixel UI, specific API) | Remove technical details; use wireframes |
| **V**alue | What does the stakeholder get? | So that repeats I want, or is blank | Rewrite So that toward business outcome |
| **E**stimable | Does Dev have enough info to estimate? | Vague requirements, high risk | Create Spike; add context |
| **S**mall | Can it be done in 1 Sprint? | Title has "AND"; AC > 8 scenarios | Split by CRUD / Persona / Workflow |
| **T**estable | Can test cases be written from AC? | AC uses vague terms, no metrics | Add GWT with specific data |

---

## I — Independent

### Definition

A US must be developable, testable, and deployable independently. Avoid rigid dependencies between USs.

### Why It Matters

- Enables **flexible prioritization** in the Backlog.
- Prevents **blockers** when one US is delayed.
- Simplifies **work allocation** across the team.

### Violation Signs

- US-B can only start after US-A is complete.
- Multiple USs must be merged simultaneously before any can be deployed.
- Testing US-B requires data from another US.

### Remediation

| Situation | Remediation |
| :--- | :--- |
| Small dependency, same team | Merge into one larger US (if size permits) |
| Large dependency, new technology | Create a research Spike story first, prioritize early |
| Testing is dependent | Use mock data / stubs for independent testing |

### Example

- ❌ **Violation:** US-1: Create project manager account. US-2: Create new project (can only be tested after US-1).
- ✅ **Compliant:** US-1: Create project manager account (test independently with sample data in test environment). US-2: Create new project (test independently with a pre-prepared account).

---

## N — Negotiable

### Definition

A US is a **"conversation starter,"** not a technical contract. Implementation details are clarified during Refinement and development.

> **Practical note:** BAs write USs based on business requirements, so USs are close to requirements. "Negotiable" here does not mean the US can be dropped — it means **the implementation approach (How) is still open**, not locked in by premature technical details.

### Why It Matters

- Leverages **Dev + QA expertise** to find the optimal solution.
- Remains flexible when new constraints emerge.
- Prevents **over-specifying** too early.

### Violation Signs

- Describing pixel coordinates of the UI in the US.
- Hard-coding specific technology constraints (e.g., "must use Redis," "must use React").
- Describing algorithms or code structure in the US content.

### Remediation

- Focus on **What** + **Why**, avoid **How**.
- Technical details → move to system design documents.
- Use **wireframes** instead of detailed mockups at the US writing stage.

### Example

- ❌ **Violation:** *"I want to create a project with fields stored in a MySQL table with an index on the project_code column to speed up queries..."*
- ✅ **Compliant:** *"I want to create a new project so that I can start assigning tasks to the team immediately."* (DB structure, index — Dev decides.)

---

## V — Valuable

### Definition

Each US must deliver clear value to the **end user**, **business**, or **both**. Do not create USs for purely technical reasons.

### Why It Matters

- Ensures **ROI** — every effort has practical impact.
- Helps **PO** prioritize accurately.
- Helps **Stakeholders** understand why this feature is needed.

### Violation Signs

- **So that** is blank or repeats **I want to**.
- US only benefits the Developer (e.g., upgrading a library) with no user-facing change.

### Remediation

- Write So that toward **measurable business outcomes** (e.g., "reduce customer wait time by 30%").
- Convert technical tasks into value-adding USs: instead of "upgrade charting library," write "view Gantt chart loading in under 2 seconds."

### Example

- ❌ **Violation:** *"As a developer, I want to upgrade the charting library from v2 to v4 so that we use the latest version."*
- ✅ **Compliant:** *"As a Project Manager, I want to view the Gantt chart within 2 seconds so that I can assess progress without waiting on slow connections."*

---

## E — Estimable

### Definition

The development team has sufficient information to provide a reasonable estimate of effort and time to completion.

### Why It Matters

- Supports accurate **Sprint Planning**.
- Early detection of stories that are too large or too vague.

### Violation Signs

- Developer responds "I don't know how long this will take, need more research."
- Estimates vary too widely between team members (more than 3x difference).
- Too many undefined technical risks.

### Estimation Methods

| Method | Description | Best Used When |
| :--- | :--- | :--- |
| **Planning Poker** | Team votes using Fibonacci cards, discusses on large variance | Team has stable velocity |
| **T-shirt Sizing** | Classify as XS / S / M / L / XL | First Sprint, no historical data |
| **Story Points** | Relative points based on effort, complexity, risk | Team has backlog for comparison |
| **Spike Story** | Independent research US to reduce uncertainty before estimating main US | New technology, vague requirements, high risk |

### Remediation When Not Estimable

1. **Step 1 — Create a Spike:** Independent research US (fixed duration: 1–3 days) to reduce uncertainty.
2. **Step 2 — Add Context:** Include business constraints, reference documents, wireframes.
3. **Step 3 — Mark ⚠️ in the INVEST table:** Do not move to Sprint until estimable.

### Example

- ❌ **Violation:** *"I want AI to analyze project risks and suggest remediation options."* (Which AI? Input data? Desired accuracy?)
- ✅ **Compliant (decomposed):** Spike: *"Research automated risk analysis solutions for a 50-member project, output: Technical proposal within 3 days."* → US: *"Implement a risk analysis system based on the approved Technical proposal."*

---

## S — Small

### Definition

A US must be small enough to complete within 1 Sprint — typically **1–3 person-days** of developer work.

### Why It Matters

- Minimizes **planning risk**.
- Accelerates **feedback loop** from customers/users.
- Simplifies **testing, integration, and rollback** when issues arise.

### Violation Signs

- Estimated effort **exceeds 5 working days**.
- AC count **exceeds 7–8 scenarios**.
- Title contains **"AND"** — combining 2+ USs.
- US covers **all CRUD operations**.

### Decomposition Rules (5 Strategies)

> ⚠️ **When to decompose?** When effort > 5 days OR AC > 8 scenarios.

| Strategy | Description | When to Use |
| :--- | :--- | :--- |
| **1. By CRUD** | Separate Create / Read / Update / Delete into independent USs | When the business has all 4 operations |
| **2. By Persona** | Separate by role: Project Manager / Team Member / Client | When each Persona has different business flows |
| **3. By Data Structure** | Process text data first, add file/chart support later | When multiple input data types exist |
| **4. By Business Rule** | Happy path first, Validation + Permission second | When Edge case/Error represents large effort |
| **5. By Workflow** | Split by step: Create → Assign → Update → Report | When the business is a multi-step process |

### Example

- ❌ **Violation:** *"I want to manage project information (view, rename, change dates, assign members, request project closure)."*
- ✅ **Compliant (5 USs from 1 large US):**

  - US-1: View project information.
  - US-2: Update project name.
  - US-3: Change start/end dates.
  - US-4: Assign members to project.
  - US-5: Request project closure.

---

## T — Testable

### Definition

A US must have clear, specific, measurable ACs so that QA can write test cases and validate the feature.

### Why It Matters

- Prevents disputes about **Definition of Done** between teams.
- Enables **automated testing**.

### Violation Signs

- AC uses vague terms: "fast," "nice," "friendly," "easy to use."
- No AC — only a general description.

### 3 Conditions for Testability

| Condition | Requirement |
| :--- | :--- |
| **Clear ACs** | Each AC has complete Given-When-Then with specific data and measurable metrics |
| **Test environment ready** | Test environment exists; access is available; test data is available |
| **Measurable criteria** | Test outcomes can be determined as pass/fail — not vague |

> **Note:** Testability is not only about AC quality. If the test environment does not exist or test data is not ready → document in the Notes section of the US.

### Example

- ❌ **Violation:** *"Acceptance criteria: System must respond quickly and display a friendly error message when a team member exceeds the deadline."*
- ✅ **Compliant:**

  - Given a team member has a task with deadline 06/15 and the system detects it is incomplete after 23:59 on 06/15.
  - When the team member clicks the "Update Status" button.
  - Then the system sends a reminder notification within 5 minutes.
  - And records "Overdue" status on the Gantt chart.

---

## Role-Based Priorities — What Each Reader Needs

| Role | Priority Criteria | Purpose |
| :--- | :--- | :--- |
| **BA (writes US)** | N + V + T | Ensure US is negotiable, value is clear, and testable |
| **PO (reviews US)** | V + S | Ensure business value is correct and US is small enough to estimate |
| **Developer (estimates)** | E + S | Ensure enough information to estimate; know when a Spike is needed |
| **QA (confirms)** | T + I | Ensure testability; ensure no dependency on another US |

---

## References

- Bill Wake (2003) — *"INVEST in Good Stories, and SMART Tasks"*
- Mike Cohn — *"User Stories Applied"*
- Atlassian Agile Coach — *User Story Best Practices*
