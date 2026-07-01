# Quality Checklist — ProjectOS

> **Purpose:** A **supplementary** checklist, used AFTER completing a User Story against the template.
>
> **Principle:** This checklist only contains content beyond what is already in [user-story-template-blank.md](../templates/user-story-template-blank.md) and [user-story-template-example.md](../templates/user-story-template-example.md).
>
> **Triage rule on failure:** Each failed item = a specific action (fix immediately / ask PO / create Spike).

---

## Triage — Priority Classification

| Severity | Symbol | Action | Example |
| :--- | :--- | :--- | :--- |
| **Must pass** | 🚨 | Fix IMMEDIATELY before delivering | So that is blank, no ACs, As a = "user" |
| **Should pass** | ⚠️ | Fix or document the reason for not fixing, PO confirms | MoSCoW is unclear, Metadata missing Estimate |
| **Nice to have** | 💡 | Document if you want to improve | Tester wants an additional 4th AC, Dev wants to add DoD |

---

## 🚨 Part A: User Story — Must Pass Items

> These items have **inline guidance in the template** but must be rechecked — they must not fail.

- [ ] **🚨 As a does not use the generic term "user" / "người dùng".**
  - Fail → Fix immediately: add the specific role and context.
- [ ] **🚨 So that is not blank and does not restate "I want to".**
  - Fail → Fix immediately: rewrite So that toward business value.
- [ ] **🚨 At least 1 Acceptance Criteria (AC) is attached.**
  - Fail → Fix immediately: write a minimum of 3 ACs (Happy + Edge + Negative).
- [ ] **🚨 US title does not contain the conjunction "AND".**
  - Fail → Fix immediately: split into 2 separate USs.

---

## ⚠️ Part B: User Story — Should Pass Items

> If these items fail, **document the reason or ask the PO** before delivering.

### INVEST Compliance

- [ ] **⚠️ I — Independent:** Can the story be developed and tested independently?
  - Fail → Document the dependency; mark ⚠️ in the INVEST table.
- [ ] **⚠️ N — Negotiable:** Are there rigid technical details (API, DB schema, framework)?
  - Fail → Remove technical details; focus on What, not How.
- [ ] **⚠️ V — Valuable:** Does So that describe clear business value, not a technical feature?
  - Fail → Rewrite So that toward outcomes.
- [ ] **⚠️ E — Estimable:** Does the Developer have enough information to estimate?
  - Fail → Add context; consider creating a Spike story first.
- [ ] **⚠️ S — Small:** Does the estimated effort exceed 5 working days?
  - Fail → Split: separate CRUD, Happy path first, Edge/Error second.
- [ ] **⚠️ T — Testable:** Do the ACs have specific data for writing test cases?
  - Fail → Add measurable data to each Then clause.

### Metadata & Format

- [ ] **⚠️ MoSCoW** is selected with a clear rationale (not defaulted to "Must")?
  - Fail → Document why that priority level was chosen.
- [ ] **⚠️ Dependencies** are listed clearly?
  - Fail → Enter the dependent US name or write "None."
- [ ] **⚠️ DoD** has at least 3 specific technical items?
  - Fail → Add technical checklist items (see DoD section in user-story-template-blank.md).

---

## 🚨 Part C: Acceptance Criteria — Must Pass Items

> These items have **inline guidance in user-story-template-example.md**.

- [ ] **🚨 Each AC has Given + When + Then complete.**
  - Fail → Fix immediately: add the missing clause.
- [ ] **🚨 When contains only ONE single action.**
  - Fail → Fix immediately: split the AC if When has multiple actions.
- [ ] **🚨 No vague terms: "fast," "nice," "friendly," "appropriate."**
  - Fail → Fix immediately: replace with specific measurable data.
- [ ] **🚨 No technical details (API, database, framework).**
  - Fail → Fix immediately: rewrite with business description, not implementation.
- [ ] **🚨 Error messages have SPECIFIC content — not a generic "error message."**
  - Fail → Fix immediately: write the actual message content (e.g., "A project with this name already exists").

---

## ⚠️ Part D: Acceptance Criteria — Should Pass Items

- [ ] **⚠️ And count per AC ≤ 2. If > 2 → split the AC.**
  - Fail → Document and consider splitting.
- [ ] **⚠️ If AC describes an exception, use `But` instead of `And`.**
  - Fail → Change And to But.
- [ ] **⚠️ Given uses specific data (person names, dates) not generic data.**
  - Fail → Document: specific sample data helps Testers write test cases more easily.
- [ ] **⚠️ Total AC count for this US ≤ 7–8. If exceeded → decompose the US.**
  - Fail → Document; propose splitting into additional USs.

---

## 💡 Part E: Test Case Derivation Potential

- [ ] **💡 From each AC, at least 3 Test Cases can be derived: valid, boundary, invalid.**
  - Note: This indicates the AC is clear enough for QA to write test scenarios.
- [ ] **💡 From each US, the estimated Test Case count ≥ 5.**
  - Note: Use this as the basis for estimating testing effort for the Sprint.

---

## ⚠️ Part F: Sanity Check — 5 Final Questions

> Re-read the entire US + AC before handoff. Answer all correctly → ready to export. Any unanswered question → go back and fix.

| # | Question | Pass? |
| :--- | :--- | :--- |
| 1 | **Can the Stakeholder understand?** — Can a PO with no technical background read this and understand the business? | [✅/❌] |
| 2 | **Can the Dev estimate?** — Can a junior developer read this and confidently estimate? | [✅/❌] |
| 3 | **Can the Tester write test cases?** — Is there enough specific data and metrics to write test scenarios? | [✅/❌] |
| 4 | **No duplication?** — Does this US overlap with another US in the Backlog? | [✅/❌] |
| 5 | **So that is truly Valuable?** — Or is it just a restatement of "I want"? | [✅/❌] |

---

## 🚨 Red Flags — Warning Signs That Require Immediate Fix

| Red Flag | Severity | Action |
| :--- | :--- | :--- |
| US description is longer than **200 words** | 🚨 | Shorten; move technical details to system design. |
| Acceptance criteria are longer than **10 lines** | 🚨 | Split ACs; multiple scenarios are being combined. |
| No AC attached | 🚨 | Add at least 3 ACs immediately. |
| So that is blank or repeats "I want to" | 🚨 | Rewrite So that toward business value. |
| As a = "user" / "everyone" | 🚨 | Fix immediately: add role + specific context. |
| Title contains "**AND**" | 🚨 | Split into 2 separate USs. |
| AC uses "etc." | 🚨 | Describe each specific case clearly. |
| Estimated effort > **5 days** | ⚠️ | Decompose the US per rules in skill.md. |
| AC status = "Draft" at handoff | ⚠️ | Change to "Approved" after PO confirms. |
| AC count > **8 scenarios** for 1 US | ⚠️ | Decompose; split by CRUD or by Persona. |
