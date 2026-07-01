# Quality Checklist — 20 Points to Validate a Use Case

Run this checklist BEFORE handing over a UC. Each item has: definition, how to check, pass/fail examples.

## How to use

1. After writing the UC, walk through items C1-C20
2. Mark Status: ✅ Pass / ❌ Fail / ⚠️ Needs review
3. If Fail → fix it or flag it to the user
4. Output a summary table at the end

```
| Item | Status | Note |
| C1   | ✅     | UC Name "Create a new project" follows the format |
| C2   | ⚠️     | UC could be split further — confirm with PO |
| ...  | ...    | ... |
```

---

## GROUP A: Scope & Identification (C1-C5)

### C1. UC Name follows "verb + object", active voice

**Definition**: UC Name starts with an active verb + an object noun, with no actor name embedded.

**How to check**: Parse the UC Name → identify the leading verb → verify it's an action verb.

**Pass**: "Create a new project", "Assign task to team member", "Update project deadline"
**Fail**: "Enrollment" (no verb), "Project Manager books task" (actor included), "Manage projects" (vague verb)

---

### C2. UC is at user-goal level (passes the coffee-break test)

**Definition**: After completing the UC, the actor can stop and take a break — the goal is achieved.

**How to check**: Read the Postconditions → ask yourself "Is this a business-meaningful result?"

- If the result is just a sub-step (e.g. "OTP is verified") → UC is too small
- If the result spans multiple sessions → UC is too large

**Pass**:

- "Create a new project" → postcondition: project active, team members notified, project visible in project list
- "Assign task to team member" → postcondition: task created, assignee notified, task visible on task board

**Fail**:

- "Verify OTP" (too small — just a sub-step of another UC) → should be an Includes
- "Manage entire project portfolio" (too large — spans many sessions) → split into many UCs

---

### C3. UC ID is unique and follows naming convention

**Definition**: ID is unique in the project and matches the standard format.

**How to check**:

- Check the master UC list — is the ID unique?
- Does the format match `UC-<module>-<seq>`?

**Pass**: "UC-PROJ-01" (unique, correct format), "UC-TASK-01"
**Fail**: "UC1" (no module), "UseCase_ProjectCreate" (name embedded)

---

### C4. Exactly 1 primary actor + clear business goal

**Definition**: One UC has 1 primary actor (the initiator) and 1 specific goal.

**How to check**:

- Actor field → is there "Primary: [X]"?
- Description → does it state the goal clearly?
- If you see 2 primary actors → flag for splitting

**Pass**: Primary: Project Manager. Goal: create a new project and invite team members for immediate collaboration.
**Fail**: Primary: Project Manager + Team Member (2 actors). → Split: "Project Manager creates project" and "Team Member creates personal task" as 2 UCs.

---

### C5. System boundary is clear

**Definition**: The UC describes interaction with one specific system, not multiple systems mixed together.

**How to check**: Read the Normal Course → do the "System..." steps consistently refer to one system?

**Pass**: All steps refer to "ProjectOS Platform". Notification Service and Authentication Service are secondary actors.
**Fail**: Mixing ProjectOS web platform + mobile app + third-party Calendar API as if they were one system. → Split by system boundary or clarify primary system.

---

## GROUP B: Actor & Context (C6-C8)

### C6. Actor is a specific role/class

**How to check**: Is the actor a specific role/class rather than "User"?

**Pass**: "Project Manager (workspace Admin, active account)", "Team Member (active project member)"
**Fail**: "User", "Person", "Actor 1"

---

### C7. Description answers WHY + WHAT + OUTCOME

**How to check**: Read the Description → check that all 3 elements are present.

**Pass**:
"When a Project Manager identifies a work item that needs to be performed by a team member [WHY], the Project Manager creates a task, assigns it to the responsible member, and sets a deadline [WHAT]. The UC ends when the task is created, the assignee is notified, and the task appears on the project task board [OUTCOME]."

**Fail**: "This UC is about task assignment." (missing WHY and OUTCOME)

---

### C8. Frequency of Use is quantified

**How to check**: Does the Frequency field contain a NUMBER?

**Pass**: "~500 tasks/day platform-wide; peak ~80/hour during sprint planning sessions"
**Fail**: "Frequent", "Often during Monday mornings" (no volume)

⚠️ Acceptable: "TBD — awaiting analytics data from ops team" + logged in Notes as [TBD-N]

---

## GROUP C: Pre/Post Conditions (C9-C11)

### C9. Preconditions are verifiable

**How to check**: Can each precondition be verified by a query / boolean test?

**Pass**: "Project Manager has logged in and has 'Create Project' permission" (auth check), "Project is in 'Active' status" (DB query)
**Fail**: "Project Manager is motivated to work" (motivation — not verifiable), "System is ready" (too vague)

---

### C10. Postconditions cover the success state + all changes

**How to check**: Do the postconditions describe all changes after the UC runs?

- Data changes (which records, which fields)
- External state (notification sent, calendar blocked, file generated)
- User-visible state (new screen, badge unlocked)

**Pass**:

```
1. Project record created with status='Active'
2. Team members added to the project with their assigned roles
3. Project creation notification sent to all members within 60s
4. Project visible in the Project Manager's project list
```

**Fail**: Only "Project created" → missing all state detail.

---

### C11. Preconditions are not confused with Assumptions

**How to check**: Distinguish:

- Precondition: MUST BE TRUE, system can check
- Assumption: BELIEVED to be true, not verified

**Common ProjectOS mistake**: Putting "Project Manager has basic project management skills" in Precondition → WRONG, this is an Assumption. The system cannot check it.

---

## GROUP D: Normal Course (C12-C15)

### C12. Numbered list, one action per step

**How to check**: Does each step:

- Start with a number (1., 2., 3...)
- Contain only one main action
- Avoid "and" connecting two different-kind actions

**Pass**: "3. Project Manager enters the task title, description, and deadline." (same kind — input fields)
**Fail**: "3. Project Manager enters the task and clicks Create and waits for confirmation." (3 actions in one step)

---

### C13. Alternates Actor / System with clear subjects

**How to check**: Read the steps — is there an alternating Actor/System pattern?

**Pass**:

```
1. Project Manager clicks Create Project     ← Actor
2. System displays the Project Form        ← System
3. Project Manager fills in details        ← Actor
4. Project Manager clicks Save             ← Actor
5. System creates the project record       ← System
```

(OK to have 2 consecutive Actor steps when both are input — still clear)

**Fail**: Only "Project Manager does X, then Y, then Z" with no system response anywhere.

---

### C14. NO embedded if/else/loop in the Normal Course

**How to check**: Search the Normal Course for "if", "in case", "otherwise" → flag.

**Pass**:

```
5. System validates the assignee is an active project member.
6. System creates the task record with status='Todo'.
```

**Fail**:

```
5. If the assignee has a workload below capacity threshold, system allows assignment; if overload, system shows a warning; if assignee is not a project member, system blocks the action.
```

→ Split into: Normal Course (default flow) + AC (overload warning) + Exception (invalid assignee).

---

### C15. Flow runs from trigger to postcondition

**How to check**:

- Does step 1 match the trigger in the Description?
- Does the final step achieve the postcondition?
- Are there any "dangling" steps?

**Pass**: Step 1 "Project Manager clicks Create Project" (trigger) → step 11 "System sends project creation notification" (postcondition achieved).
**Fail**: Final step is "System saves project" but postcondition says "Notification is sent to members" → flow is incomplete.

---

## GROUP E: Alternative & Exception (C16-C18)

### C16. Each AC specifies "at step N" + condition

**How to check**: Does each Alternative Course have:

- ID format `UC-XX.AC.N`
- Opening sentence: "At step Y of the Normal Course, if [condition]..."
- Sub-steps numbered 5a, 5b...
- Closing sentence: "continue from step Z of the Normal Course"

**Pass**:

```
UC-PROJ-01.AC.1: Create project with initial team members from directory
At step 5 of the Normal Course, if the Project Manager selects members from the workspace member directory:
5a. System displays a searchable member directory.
5b. Project Manager selects members and clicks Add.
5c. System adds selected members to the team list → continue from step 6 of the Normal Course.
```

**Fail**:

```
AC1: If Project Manager adds members from the workspace directory, they can do so without entering email addresses.
```

(Too vague, no step reference, no sub-steps, no rejoining instruction)

---

### C17. Each Exception has trigger + response + final state

**How to check**: Does each exception have all 3 parts?

**Pass**:

```
UC-PROJ-01.EX.2: Duplicate project name mid-creation
Trigger: At step 8, the system detects a project with the same name already exists in the workspace.
Response: System displays "A project with this name already exists. Please enter a different project name."
Final state: No project record is created. Project Manager can edit the name and resubmit.
```

**Fail**:

```
EX1: If an error occurs, system shows an error message.
```

(Vague — no trigger, no response detail, no final state)

---

### C18. Common failure modes are covered

**How to check**: Does the UC cover at least the common failure types relevant to ProjectOS?

| Failure type | Required for ProjectOS UC? |
|---|---|
| Validation error (invalid input) | ✅ |
| Business rule violation (quota exceeded, project at capacity) | ✅ |
| External service failure (notification service, calendar timeout) | ✅ |
| Authentication/Authorization failure | ✅ if UC has auth |
| Network/connectivity issue | ✅ for mobile flows |
| Concurrency conflict (two PMs creating project with same name) | ✅ for project/task creation UCs |
| Resource overload (assignee workload exceeds threshold) | ✅ for task assignment UCs |

**Tip**: If the UC has only 1-2 Exceptions → suspicious. Project and task creation UCs typically need 3-5.

---

## GROUP F: Completeness (C19-C20)

### C19. Includes (if any) point to existing UCs

**How to check**: Does each UC in the Includes field have a valid ID + does that UC actually exist?

**Pass**: "Includes: UC-PAY-01 (Process payment)" → UC-PAY-01 has been written and is in the UC register.
**Fail**: "Includes: Payment UC" → ID not specific, or referenced UC doesn't exist yet.

---

### C20. Special Requirements don't duplicate functional requirements

**How to check**: Is each item in Special Requirements a non-functional requirement?

**Pass** (non-functional):

- "Project list loads ≤ 2s under 5,000 concurrent users"
- "Audit log retained for 3 years"
- "Comply with Vietnamese VAT invoicing regulations"

**Fail** (functional — belongs in Normal Course / Business Rule):

- "Validate that the project name is ≤ 100 characters" → validation logic, belongs in a Normal Course step or BR
- "Project Manager can only create 50 projects per workspace per month" → business rule, not a Special Requirement

---

## Validation Report

After checking all 20 items, output the report in this format:

```markdown
## Validation Result for UC-PROJ-01

| # | Item | Status | Note |
|---|------|--------|------|
| C1 | UC Name format | ✅ | "Create a new project" — active verb + object |
| C2 | User-goal level | ✅ | Passes coffee-break test |
| C3 | UC ID unique | ✅ | Follows convention |
| C4 | 1 primary actor | ✅ | Project Manager |
| C5 | System boundary | ✅ | ProjectOS Platform |
| C6 | Specific actor | ✅ | |
| C7 | Description WHY + WHAT + OUTCOME | ✅ | |
| C8 | Frequency quantified | ⚠️ | TBD — awaiting analytics from ops team |
| C9 | Preconditions verifiable | ✅ | 3/3 verifiable |
| C10 | Postconditions cover state | ✅ | 4 postconditions |
| C11 | No Pre/Assumption mix | ✅ | |
| C12 | Numbered, 1 action/step | ✅ | 11 steps |
| C13 | Actor/System alternating | ✅ | |
| C14 | No nested if/else | ✅ | |
| C15 | Flow complete | ✅ | |
| C16 | AC has "at step N" | ✅ | 2 ACs, all properly anchored |
| C17 | Exception has 3 parts | ✅ | 4 exceptions, all complete |
| C18 | Common failure modes covered | ✅ | Duplicate name, invalid member, notification fail — all covered |
| C19 | Includes valid | ✅ | UC-NOTI-01 |
| C20 | Special Req non-functional | ✅ | |

**Summary**: 19/20 ✅ + 1 ⚠️. UC is ready for stakeholder review.
**Follow-up**: C8 — Frequency of Use awaiting analytics data from the ops team [TBD-3].
```
