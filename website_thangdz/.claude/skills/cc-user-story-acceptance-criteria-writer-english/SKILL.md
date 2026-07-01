---
name: cc-user-story-acceptance-criteria-writer
description: |
  Generate User Stories that meet the 06 INVEST criteria and Given-When-Then (Gherkin) Acceptance Criteria for Business Analysts and Product Owners.
  Supports 3 modes: Create New, Refine, and Add Acceptance Criteria.

  ACTIVATE when the user requests: write, create, review, optimize, or decompose a User Story or Acceptance Criteria.
  Including when the user pastes a feature description or Product Requirements Document (PRD) to generate a list of User Stories.

  DO NOT USE FOR: writing a full Product Requirements Document (PRD) or Software Requirement Specification (SRS) (use prd-writer, srs-writer), writing detailed technical test cases, writing formal Use Cases (use po-usecase-refiner), or designing Business Rules (use business-rule-generator).
---

# User Story & Acceptance Criteria Writer

## Purpose

Support Business Analysts and Product Owners in crafting high-quality User Stories that meet the 06 INVEST criteria and Given-When-Then (Gherkin) Acceptance Criteria — ready for Developers to estimate and Testers to write test cases.

## Workflow

### Step 1: Identify Mode

Ask the user or infer from the provided content (then confirm):

- **Mode A (Create New)**: User provides a feature description -> Generate new User Story and Acceptance Criteria.
- **Mode B (Refine)**: User already has a User Story or Acceptance Criteria -> Evaluate and propose improvements.
- **Mode C (Add Acceptance Criteria)**: User already has a User Story -> Generate additional detailed Acceptance Criteria.

### Step 2: Gather Input

Ensure all 4 pieces of information are collected before proceeding (never assume if missing):

1. **Persona/User type**: Who uses the feature? (Project Manager, Team Member, Supervisor, Client, Admin...)
2. **Goal**: What action does the user want to perform?
3. **Business value**: Why is this feature needed? (Value for the product or business)
4. **Context/Scope**: Which subsystem or module does the feature belong to?

### Step 3: Generate User Story from Template

Apply the standard 3-part format:

```markdown
**User Story US-[Number]**: [Brief title]

**As a** [Specific user type, do not use vague terms like "user"]
**I want to** [Specific, measurable action]
**So that** [Real value delivered, do not repeat the "I want" part]
```

### Step 4: Validate Against INVEST Criteria

Self-assess the User Story before responding based on the table below:

| Criteria | Self-check Question | How to Fix if Not Met |
| :--- | :--- | :--- |
| **I**ndependent | Does the story depend on another story? | Separate dependencies or merge stories |
| **N**egotiable | Is there room for discussion and negotiation? | Remove rigid technical details |
| **V**aluable | What real value does it deliver for users or business? | Rewrite **So that** with clearer business outcome |
| **E**stimable | Can the development team estimate the effort? | Add context and constraints |
| **S**mall | Can it be completed within a Sprint? | Split into independent stories |
| **T**estable | Can the tester write corresponding test cases? | Add specific, measurable Acceptance Criteria |

*(Details in [invest-criteria.md](./references/invest-criteria.md))*

### Step 5: Generate Acceptance Criteria

Ensure **a minimum of 3 Acceptance Criteria** in Gherkin format (Given-When-Then) covering: Happy path (AC 1), Edge case or business validation (AC 2), and Error handling (AC 3).

```markdown
**Acceptance Criteria [number]: [Scenario name]**
- **Given** [Specific precondition]
- **When** [Triggering user action]
- **Then** [Expected result or measurable output]
- **And** [Accompanying secondary result (if any)]
```

**Acceptance Criteria Writing Principles:**

- **Measurable:** Avoid vague terms like "fast", "beautiful", "reasonable", "user-friendly".
- **Business-focused:** Do not include technical details or UI elements in Acceptance Criteria (that's the developer's job).
- **Single-responsibility:** Each Acceptance Criteria covers exactly one scenario — do not combine multiple complex flows.

### Supplement: Definition of Done (DoD)

**DoD vs Acceptance Criteria (AC) — what's the difference?**

| | Acceptance Criteria (AC) | Definition of Done (DoD) |
| :--- | :--- | :--- |
| **Purpose** | Does the story meet business requirements? | Is the story ready for delivery? |
| **Written for** | BA / PO | Dev / QA |
| **Content** | Business, business outcome | Technical, code quality, testing |
| **Example** | "Then system displays confirmation" | "Code passed unit test" |

DoD is a technical checklist that developers mark themselves when a story is complete. Unlike Acceptance Criteria (for BA/PO to confirm business), DoD (for Dev/QA to confirm technical quality).

**Example DoD for Kanban drag-and-drop story:**

```text
**Definition of Done:**
- [ ] Code passed unit test
- [ ] Tested on Chrome, Safari, Firefox
- [ ] Realtime sync works with 3+ concurrent users
- [ ] Smooth animation when drag-and-drop
```

### Step 6: Output Format

Present in the following order:

1. **User Story**: 3 lines (As a / I want / So that).
2. **INVEST Self-check**: Self-assessment table with Pass (✅) or Needs Improvement (⚠️) for all 6 criteria.
3. **Acceptance Criteria**: Numbered list.
4. **Notes**: Dependencies, assumptions, or clarifying questions.
5. **Handoff Confirmation**: Ask the user to review all content and confirm the desired format before exporting.

## Anti-patterns to Avoid

- ❌ **Vague user type**: *"As a user"*
  👉 ✅ **Specific**: *"As a project manager who has been assigned to manage the project and has verified their email address"*
- ❌ **Vague action**: *"I want to manage profile"*
  👉 ✅ **Specific**: *"I want to update my email address"*
- ❌ **Value that duplicates the goal**: *"So that I can manage profile"*
  👉 ✅ **Meaningful**: *"So that I receive notifications at the correct address"*
- ❌ **Acceptance Criteria describing UI**: *"Then button turns blue"*
  👉 ✅ **Describes behavior**: *"Then system displays confirmation message"*
- ❌ **Acceptance Criteria containing technical logic**: *"Then call API /v1/users/update"*
  👉 ✅ **Describes business**: *"Then user data is updated and persisted"*
- ❌ **Incomplete Acceptance Criteria**: Only 1 happy path scenario
  👉 ✅ **Diverse**: Minimum 3 Acceptance Criteria covering Happy, Edge, and Error paths.
- ❌ **Overly large User Story**: 1 story containing all Create, Read, Update, Delete (CRUD) actions
  👉 ✅ **Separated**: Split into separate stories (Create, Read, Update, Delete).

### Quick Reference Table

| ❌ Wrong | ✅ Correct |
| :--- | :--- |
| "Build login page" (technical) | "As a user, I want to log in so that..." |
| Story too large (epic) | Split into smaller stories |
| Missing "so that" | Always state the value |
| Written from dev perspective | Written from end-user perspective |
| Vague AC ("must be fast") | Measurable AC ("load <2s") |

## User Story Decomposition Criteria and Guidelines

**Signs that decomposition is needed:**

- Title contains a conjunction "AND" (e.g., "Login AND Register").
- Contains more than 1 user type or handles multiple CRUD actions simultaneously.
- Acceptance Criteria scenarios exceed 7-8 scenarios.
- Developer's estimated effort exceeds 5 working days.

**Common decomposition rules:**

- **By basic operation (CRUD):** Separate Create, Read, Update, Delete behaviors.
- **By user type (Persona):** Separate business flows for each user group (Project Manager, Team Member, Client, Admin...).
- **By rule or business flow (Rule/Flow):** Separate Happy path from validation or permission checks.
- **By data type:** Split by specific data types being processed.

---

## Related Reference Documents

- [user-story-template-example.md](./templates/user-story-template-example.md) - Complete worked example for US "Create Project" with Happy + Edge + Negative AC. Part 1 is a filled worked example with detailed Given-When-Then guidance. Use for learning structure and reference.
- [user-story-template-blank.md](./templates/user-story-template-blank.md) - Blank template to fill in for actual US. Includes feature code reference table, Status/Approval fields, and DoD split by technical/business. Use for handoff to Sprint Planning.
- [invest-criteria.md](./references/invest-criteria.md) - In-depth analysis of the 06 INVEST criteria.
- [examples.md](./references/examples.md) - 4 real-world examples in the ProjectOS (Project Management) domain.
- [quality-checklist.md](./checklists/quality-checklist.md) - Quality self-check list before handoff.
