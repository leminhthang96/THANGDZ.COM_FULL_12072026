# User Story & Acceptance Criteria Template — Blank

> **Purpose:** Blank template for filling in actual user stories. Use when full US + AC handoff to Sprint Planning is needed.
>
> **Worked example:** See [user-story-template-example.md](./user-story-template-example.md) — US "Create Project" with complete Happy + Edge + Negative AC and detailed Given-When-Then guidance.
>
> **General quality checklist:** See [quality-checklist.md](../checklists/quality-checklist.md) — for when PO reviews multiple US at once.

---

## User Story US-[FEATURE_CODE]-[NUMBER]: [Brief title — NO conjunction "AND"]

**As a** [Specific user type, role + status]
> ✅ *"project manager who has been granted permissions on ProjectOS"*
> ❌ *"user"*

**I want to** [Specific, measurable action]
> ✅ *"create a new project with complete details and send invitation emails to team members"*
> ❌ *"manage tasks"* (too vague)

**So that** [Clear business value, outcome-oriented — do not repeat I want]
> ✅ *"team members receive notifications and can start working immediately"*
> ❌ *"so I can assign tasks"* (repeats I want)

---

### Metadata

| Field | Value | Notes |
| :--- | :--- | :--- |
| **Epic / Feature** | [Large feature name] | |
| **Priority (MoSCoW)** | [Must / Should / Could / Won't] | **Must** = core business capability. **Should** = important but has a workaround. **Could** = if time permits. **Won't** = excluded this iteration. |
| **Estimate** | [Story points / T-shirt size] | |
| **Dependencies** | [US-xxx must be completed first / None] | If dependencies exist → mark ⚠️ in INVEST table |
| **Assumptions** | [Assumed conditions / None] | |
| **Status** | [Draft / Review / Approved] | |
| **Approved By** | [PO name] | |
| **Approval Date** | [YYYY-MM-DD] | |

---

### Feature Code Reference

> Use this code when naming US: `US-[CODE]-[NUMBER]`

| Code | Feature Name |
| :--- | :--- |
| PROJ | Project Management |
| TASK | Task Management |
| MEMB | Member Management |
| USER | User Management |
| AUTH | Authentication & Authorization |
| NOTI | Notifications |
| REPT | Reports |

---

### INVEST Self-Check

| Criteria | Met? | Notes & How to Fix if ⚠️ |
| :--- | :--- | :--- |
| **I**ndependent | [✅/⚠️] | ⚠️ → Merge/split dependencies; use mock data for independent testing |
| **N**egotiable | [✅/⚠️] | ⚠️ → Remove rigid technical details; focus on What, not How |
| **V**alue | [✅/⚠️] | ⚠️ → Rewrite So that with outcome orientation, not feature |
| **E**stimable | [✅/⚠️] | ⚠️ → Add context; consider creating a Spike first |
| **S**mall | [✅/⚠️] | ⚠️ → Split: separate CRUD, by Persona, or Happy path first |
| **T**estable | [✅/⚠️] | ⚠️ → Add Given-When-Then AC with specific metrics |

> **Rule:** If any criteria is ⚠️ → **DO NOT move to Sprint Planning** until resolved.

---

### Acceptance Criteria

> **Format:** Given-When-Then (Gherkin syntax)
> **Minimum requirement:** 3 criteria — Happy path + Edge case + Negative path
> **Distinction:** Acceptance Criteria (AC) ≠ Test Case ≠ Test Script

#### Acceptance Criteria 1: [Scenario name — Happy path]

- **Given** [Specific precondition — who, where, what data]
- **When** [ONE unique action by the user type]
- **Then** [Primary result — specific measurable metric]
- **And** [Supplementary result — if any, maximum 2 And]
- **And** [Final supplementary result — if any]

#### Acceptance Criteria 2: [Scenario name — Edge case / Validation]

- **Given** [Specific boundary context — data at the boundary]
- **When** [Action triggering the edge case]
- **Then** [System handles the boundary correctly per business rules]
- **And** [Specific feedback message or behavior]

#### Acceptance Criteria 3: [Scenario name — Negative path / Error]

- **Given** [Specific error context — invalid data, permission denied, timeout...]
- **When** [Action leading to error]
- **Then** [System handles error correctly per business rules — no crash]
- **And** [Specific error message with clear content]
- **But** [What does NOT happen — no unwanted side effects]

#### AC Quality Checklist

> Self-assess each item before confirming AC is ready.

**Gherkin structure:**

- [ ] Each AC has **Given + When + Then** complete.
- [ ] **When** contains only **ONE** action.
- [ ] **Then** has **specific measurable metrics** (time, quantity, percentage).
- [ ] Number of **And** clauses per AC **≤ 2**. If > 2 → split AC.
- [ ] Uses **But** for exceptions instead of And.

**Given data:**

- [ ] Given uses **specific data** (names, dates, quantities) rather than generic ("a valid user").
- [ ] Given does not contain actions — only describes the initial state.

**Scenario coverage:**

- [ ] Has **1 Happy path** (success flow).
- [ ] Has **1 Edge case** (business boundary).
- [ ] Has **1 Negative path** (error handling / invalid data).
- [ ] Total AC count for this US **≤ 7–8**. If exceeded → decompose US.

**Language:**

- [ ] **No** vague words: "fast", "beautiful", "friendly", "appropriate", "intuitive".
- [ ] **No** technical details: API names, database schema, framework.
- [ ] **No** UI descriptions: button colors, pixels, font styles.
- [ ] Error messages have **specific content**, not generic "error message".

**Test Case derivation:**

- [ ] From each AC, at least **3 Test Cases** can be derived: valid, boundary, invalid.
- [ ] Tester can read AC and **understand the scenario without asking BA**.

---

### Definition of Done (DoD)

> **DoD ≠ Acceptance Criteria.** AC is for BA/PO to confirm business. DoD is for Dev/QA to confirm technical delivery quality.

#### DoD — Business (evaluated by BA/PO)

- [ ] System responds within [X] seconds — specific metric per AC
- [ ] Notification / email is sent to the correct recipient addresses
- [ ] Error messages have specific content, not generic

#### DoD — Technical (evaluated by Dev/QA)

- [ ] Code passed unit test
- [ ] Tested on Chrome, Safari, Firefox
- [ ] Realtime sync works with [X]+ concurrent users
- [ ] [Additional technical requirements]

---

### Notes

| Type | Content |
| :--- | :--- |
| **Dependencies** | [US-xxx must be completed first / None] |
| **Assumptions** | [Assumed conditions / None] |
| **Open Questions** | [Questions to clarify with PO / Stakeholder] |
