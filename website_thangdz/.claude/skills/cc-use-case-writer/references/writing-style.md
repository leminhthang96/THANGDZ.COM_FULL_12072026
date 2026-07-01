# Hướng dẫn viết Use Case — Phong cách diễn đạt

## Yêu cầu đầu ra: 100% Tiếng Việt, chỉ giữ lại thuật ngữ chuyên ngành, tránh viết tắt

## Nguyên tắc tối cao: DỄ ĐỌC LÀ ƯU TIÊN SỐ 1

Quote nổi tiếng của Cockburn: "Write clearly. Readability is the most important thing."

Một Use Case tốt là Use Case mà:

- Người không kỹ thuật hiểu được ý nghĩa
- Developer đủ thông tin để code
- QA đủ thông tin để viết test case
- BA mới (hoặc người phụ trách sau này) cập nhật được khi thay đổi

---

## Rule 1: Chủ ngữ rõ ràng + Động từ cụ thể

### Subject + Verb + Object

Mỗi step phải bắt đầu bằng **chủ ngữ cụ thể**: tên actor hoặc "System".

- ✅ "Project Manager selects a team member from the project member dropdown"
- ❌ "Selects a team member" (không có chủ ngữ)

- ✅ "System validates the assignee's active project membership"
- ❌ "Validates the assignee" (mơ hồ, không biết ai làm)

### Active voice

Dùng câu chủ động, chủ ngữ thực hiện action.

- ✅ "Project Manager clicks the **Create Project** button"
- ❌ "The **Create Project** button is clicked by the Project Manager"

- ✅ "System saves the project record to the database"
- ❌ "The project record is saved to the database by the system"

### Present tense

Dùng thì hiện tại đơn, tránh tương lai/quá khứ.

- ✅ "System displays the project creation confirmation screen"
- ❌ "System will display..." / "System displayed..."

---

## Rule 2: Một step = Một action

Mỗi step trong Normal Course làm **đúng một việc**. Thấy "and" nối các action khác loại → tách step.

- ✅ "3. Project Manager enters the project name, description, and start date." (cùng loại — điền form)
- ❌ "3. Project Manager fills in the project name and clicks Create." → tách thành 2 step:
  - "3. Project Manager enters the project name and description."
  - "4. Project Manager clicks the **Create Project** button."

**Lý do**: "Click Send Request" thường trigger system validation → cần là step riêng để attach Exception "quota exceeded".

---

## Rule 3: Động từ phải cụ thể

| ❌ Mơ hồ | ✅ Cụ thể |
|---------|-----------|
| Manage | Create / Update / Archive / View |
| Handle | Validate / Process / Reject / Escalate |
| Do | Submit / Approve / Assign / Generate |
| Make | Issue / Build / Render / Compute |
| Get | Retrieve / Fetch / Query / Download |
| Use | Apply / Invoke / Execute / Redeem |
| Take care of | Specific verb |

Áp dụng cho cả Use Case Name và step text.

---

## Rule 4: Không mô tả cách thực hiện (implementation)

Use Case mô tả **WHAT** (hành động), không phải **HOW** (cơ chế). Để HOW cho giai đoạn thiết kế.

- ❌ "System calls POST /api/v1/projects with header Authorization Bearer {token}, body {name, owner_id}…"
- ✅ "System creates the project record in the database"

- ❌ "System renders the `<ProjectCreatedModal>` React component with prop projectName='CRM v2.0'…"
- ✅ "System displays the Project Detail screen with the project name and a success message"

**Exception**: Nếu Use Case là integration spec, có thể chi tiết hơn — nhưng vẫn dùng ngôn ngữ nghiệp vụ.

---

## Rule 5: Đặt tên UI element

Khi nhắc đến UI element trong step, dùng **bold** và label thực trên màn hình:

- ✅ "Project Manager clicks the **Create Project** button"
- ✅ "System displays the **Project Form** screen"
- ✅ "Project Manager selects team members from the workspace member directory"

Lý do: Dễ trace ngược về wireframe/mockup khi bàn giao thiết kế.

---

## Rule 6: Tránh từ mơ hồ

| ❌ Mơ hồ | ✅ Cụ thể |
|---------|-----------|
| In some cases | When condition X occurs |
| May / can | When [condition], system [action] |
| Sometimes | X% of the time / Y times per Z |
| If needed | When [specific trigger] |
| Valid | Meets the criteria: … (list them) |
| Appropriate | Per policy [reference] |
| Quickly | Within X seconds |
| User | Project Manager / Team Member / Admin / Client |

---

## Rule 7: Không nhúng business rule vào step

Normal Course step mô tả **flow**. Business rules cần:

- Reference Special Requirements bằng rule ID, hoặc
- Tách ra document Business Rule riêng (BR-XX-YY)

- ❌ "5. System validates: project name must be ≤ 100 chars, assignee must be a project member, deadline must be ≥ today…"
- ✅ "5. System validates the project creation request according to business rule BR-PROJ-001."
  - (Khai báo BR-PROJ-001 trong Special Requirements hoặc document BR riêng)

---

## Rule 8: Không nhúng điều kiện vào Normal Course

- ❌ "5. If Project Manager has Admin role, system allows all options; otherwise only limited options are shown."
- ✅ Normal Course (default) + Alternative Course (Admin path) hoặc Exception (unauthorized).

---

## Rule 9: Đánh số nhất quán

### Normal Course

Danh sách đánh số, bắt đầu từ 1.

### Alternative Course

Sub-numbering theo step gốc + chữ cái:

- Alternative Course tại step 5 → 5a, 5b, 5c
- Sau Alternative Course, ghi rõ: "continue from step N of the Normal Course"

### Exception

Format: `UC-XX.EX.N` (đánh số độc lập, không gắn step).

### Preconditions / Postconditions

Danh sách đánh số, bắt đầu từ 1.

---

## Rule 10: Độ dài Use Case

| Phần | Độ dài |
|------|---------|
| Use Case Name | 3-7 từ |
| Description | 2-4 câu, ~50-100 từ |
| Normal Course | 5-15 step (thường 7-10) |
| Mỗi step | 1 câu, tối đa 2 câu, < 30 từ |
| Alternative Courses | 1-5 AC mỗi Use Case (nhiều hơn → xem lại scope) |
| Exceptions | 3-7 mỗi Use Case |
| Toàn bộ Use Case | 2-5 trang A4 |

---

## Rule 11: Nhất quán xuyên project

- Tên actor (không đổi lung tung giữa "Project Manager", "Team Member", "User", "Client")
- Tên component system (ProjectOS Platform, Notification Service, Authentication Service → chọn 1)
- Tên screen/menu (phải khớp wireframe hoặc product spec)
- Quy ước đặt tên Use Case ID

**Tip**: Duy trì **Glossary** ở đầu bộ tài liệu. Thống nhất trước: "Project Manager" hay "PM"? "Team Member" hay "Member"?

---

## Anti-patterns — 10 lỗi thường gặp nhất

### 1. Use Case = spec UI pixel-by-pixel

❌ "System displays a modal with a blue #1E88E5 header 'Project Created', a checkmark icon, and project thumbnail..."
→ ✅ "System displays the Project Detail screen with the project name and a Create Task button."

### 2. Nhét actor và system trong 1 step

❌ "3. Project Manager selects the member and system validates membership."
→ ✅ Tách thành 2 step riêng.

### 3. Thiếu system response

❌ "1. Project Manager clicks Create Project. 2. Project Manager fills in details. 3. Project Manager confirms."
→ Use Case phải thể hiện DIALOG actor ↔ system. Luôn có response giữa các action.

### 4. Nhúng điều kiện trong Normal Course

❌ "5. If Project Manager has Admin role, show all options; otherwise show limited options."
→ ✅ Normal Course (default) + Alternative Course hoặc Exception.

### 5. Trigger mơ hồ

❌ "When the Project Manager wants to create a project, they..."
→ ✅ "When the Project Manager navigates to the **Projects** section and clicks **Create Project**..."

### 6. Postcondition là action thay vì state

❌ "System sends a notification to the team member" (action)
→ ✅ "A task assignment notification has been delivered to the team member's email address" (state — verifiable)

### 7. Use Case có 2 primary actor

❌ Primary: Project Manager + Team Member (cùng khởi tạo Use Case)
→ ✅ Tách thành 2 Use Case: một cho Project Manager tạo dự án, một cho Team Member tạo personal task.

### 8. "System processes" mơ hồ

❌ "5. System processes the project creation."
→ ✅ "5. System creates the project record in the database and sends notifications to all invited members."

### 9. Lặp lại Description trong Normal Course

Description là summary 2-3 câu. Normal Course là chi tiết từng bước. Không copy Description vào Normal Course.

### 10. Quên failure mode

Use Case chỉ có Normal Course + 1 generic "error" Exception → không đủ.
Luôn cover: validation failures, quota exhaustion, external service timeouts, concurrency conflicts (hai PM cùng tạo project trùng tên), permission/role mismatches.
