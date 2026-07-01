# Biểu mẫu Câu chuyện người dùng & Tiêu chí Nghiệm thu — ProjectOS

> **Mục đích:** Biểu mẫu trống để điền thông tin thực tế cho câu chuyện người dùng mới. Dùng khi cần bàn giao đầy đủ US + AC cho Sprint Planning.
>
> **Ví dụ minh họa:** Xem [user-story-template-example.md](./user-story-template-example.md) — US "Tạo dự án" với AC Happy + Edge + Negative đã hoàn chỉnh, kèm hướng dẫn viết Given-When-Then chi tiết.
>
> **Checklist chất lượng tổng quát:** Xem [quality-checklist.md](../checklists/quality-checklist.md) — dùng khi PO review nhiều US cùng lúc.

---

## Câu chuyện người dùng US-[MÃ_TÍNH_NĂNG]-[MÃ_SỐ]: [Tiêu đề ngắn gọn, KHÔNG chứa liên từ "VÀ"]

**As a** [Đối tượng sử dụng cụ thể, vai trò + trạng thái]
> ✅ *"quản lý dự án đã được phân quyền trên ProjectOS"*
> ❌ *"người dùng" / "user"*

**I want to** [Hành động cụ thể, có thể đo lường được]
> ✅ *"tạo dự án mới với thông tin đầy đủ và gửi thư mời đến các thành viên"*
> ❌ *"quản lý công việc"* (quá mơ hồ)

**So that** [Giá trị kinh doanh rõ ràng, hướng outcome — không lặp lại I want]
> ✅ *"các thành viên nhận được thông báo và có thể bắt đầu làm việc ngay"*
> ❌ *"để tôi giao công việc"* (lặp lại I want to)

---

### Siêu dữ liệu (Metadata)

| Trường | Giá trị | Ghi chú |
| :--- | :--- | :--- |
| **Epic / Feature** | [Tên tính năng lớn] | |
| **Độ ưu tiên (MoSCoW)** | [Must / Should / Could / Won't] | **Must** = nghiệp vụ cốt lõi. **Should** = quan trọng nhưng có workaround. **Could** = triển khai nếu thời gian cho phép. **Won't** = loại bỏ trong lần này. |
| **Ước lượng (Estimate)** | [Story points / T-shirt size] | |
| **Sự phụ thuộc (Dependencies)** | [US-xxx phải hoàn thành trước / Không có] | Nếu có phụ thuộc → đánh dấu ⚠️ trong bảng INVEST |
| **Giả định (Assumptions)** | [Điều kiện giả định / Không có] | |
| **Trạng thái (Status)** | [Draft / Review / Approved] | |
| **Người phê duyệt (Approved By)** | [Tên PO] | |
| **Ngày phê duyệt** | [YYYY-MM-DD] | |

---

### Bảng mã tính năng (Feature Code Reference)

> Dùng mã này khi đặt tên US: `US-[MÃ]-[SỐ]`

| Mã tính năng | Tên tính năng |
| :--- | :--- |
| PROJ | Quản lý dự án |
| TASK | Quản lý công việc |
| MEMB | Quản lý thành viên |
| USER | Quản lý người dùng |
| AUTH | Xác thực & Phân quyền |
| NOTI | Thông báo |
| REPT | Báo cáo |

---

### Tự đánh giá theo tiêu chí INVEST

| Tiêu chí | Đạt? | Ghi chú & Hướng xử lý nếu ⚠️ |
| :--- | :--- | :--- |
| **I**ndependent (Độc lập) | [✅/⚠️] | ⚠️ → Gộp/chia phụ thuộc; dùng mock data để kiểm thử độc lập |
| **N**egotiable (Thương lượng) | [✅/⚠️] | ⚠️ → Lược bỏ chi tiết kỹ thuật cứng nhắc; tập trung What, không How |
| **V**alue (Giá trị) | [✅/⚠️] | ⚠️ → Viết lại So that hướng outcome, không phải feature |
| **E**stimable (Ước lượng) | [✅/⚠️] | ⚠️ → Bổ sung ngữ cảnh; cân nhắc tạo Spike trước |
| **S**mall (Nhỏ gọn) | [✅/⚠️] | ⚠️ → Chia nhỏ: tách CRUD, tách theo Persona, hoặc tách Happy path trước |
| **T**estable (Kiểm thử được) | [✅/⚠️] | ⚠️ → Bổ sung AC định dạng Given-When-Then, có số liệu cụ thể |

> **Quy tắc:** Nếu bất kỳ tiêu chí nào là ⚠️ → **KHÔNG chuyển sang Sprint Planning** cho đến khi giải quyết xong.

---

### Tiêu chí nghiệp thu (Acceptance Criteria)

> **Định dạng:** Given-When-Then (Cú pháp Gherkin)
> **Yêu cầu tối thiểu:** 3 tiêu chí — Happy path + Edge case + Negative path
> **Phân biệt:** Tiêu chí nghiệp thu (AC) ≠ Kịch bản kiểm thử (Test Case) ≠ Script kiểm thử (Test Script)

#### Tiêu chí nghiệp thu 1: [Tên kịch bản — Happy path]

- **Given** [Tiền điều kiện cụ thể — ai, ở đâu, dữ liệu gì]
- **When** [Một hành động DUY NHẤT của đối tượng sử dụng]
- **Then** [Kết quả chính — có số liệu đo lường cụ thể]
- **And** [Kết quả phụ bổ sung — nếu có, tối đa 2 And]
- **And** [Kết quả phụ cuối cùng — nếu có]

#### Tiêu chí nghiệp thu 2: [Tên kịch bản — Edge case / Validation]

- **Given** [Bối cảnh biên cụ thể — dữ liệu ở ranh giới]
- **When** [Hành động kích hoạt trường hợp biên]
- **Then** [Hệ thống xử lý đúng nghiệp vụ tại ranh giới đó]
- **And** [Thông báo hoặc hành vi phản hồi cụ thể]

#### Tiêu chí nghiệp thu 3: [Tên kịch bản — Negative path / Error]

- **Given** [Bối cảnh xảy ra lỗi cụ thể — dữ liệu không hợp lệ, mất quyền, timeout...]
- **When** [Hành động dẫn đến lỗi]
- **Then** [Hệ thống xử lý lỗi đúng nghiệp vụ — không crash]
- **And** [Thông báo lỗi cụ thể với nội dung rõ ràng]
- **But** [Điều ngược lại KHÔNG xảy ra — side effect không mong muốn]

#### Danh mục kiểm tra chất lượng (AC Quality Checklist)

> Tự đánh giá từng mục trước khi xác nhận AC đã sẵn sàng.

**Về cấu trúc Gherkin:**

- [ ] Mỗi AC có đủ **Given + When + Then**.
- [ ] Phần **When** chỉ có **MỘT** hành động duy nhất.
- [ ] Phần **Then** có **số liệu đo lường** cụ thể (thời gian, số lượng, tỷ lệ %).
- [ ] Số lượng **And** trong mỗi AC **≤ 2**. Nếu > 2 → tách AC.
- [ ] Dùng **But** cho ngoại lệ thay vì And.

**Về dữ liệu trong Given:**

- [ ] Given dùng **dữ liệu cụ thể** (tên người, ngày tháng, số lượng) thay vì generic ("người dùng hợp lệ").
- [ ] Given không chứa hành động — chỉ mô tả trạng thái ban đầu.

**Về độ bao phủ kịch bản:**

- [ ] Có **1 Happy path** (luồng thành công).
- [ ] Có **1 Edge case** (ranh giới nghiệp vụ).
- [ ] Có **1 Negative path** (xử lý lỗi / dữ liệu không hợp lệ).
- [ ] Tổng số AC cho US này **≤ 7–8**. Nếu vượt → phân rã US.

**Về ngôn ngữ:**

- [ ] **Không** từ mơ hồ: "nhanh", "đẹp", "thân thiện", "phù hợp", "trực quan".
- [ ] **Không** chi tiết kỹ thuật: tên API, database schema, framework.
- [ ] **Không** mô tả UI: màu nút, pixel, font chữ.
- [ ] Thông báo lỗi có **nội dung cụ thể**, không viết chung chung "thông báo lỗi".

**Về khả năng sinh Test Case:**

- [ ] Từ mỗi AC, có thể sinh ra **tối thiểu 3 Test Case**: đầu vào hợp lệ, biên, không hợp lệ.
- [ ] Tester đọc AC mà **không cần hỏi BA thêm** là đã hiểu kịch bản.

---

### Definition of Done (DoD)

> **DoD ≠ Tiêu chí nghiệp thu.** AC cho BA/PO xác nhận nghiệp vụ. DoD cho Dev/QA xác nhận chất lượng kỹ thuật bàn giao.

#### DoD — Nghiệp vụ (BA/PO đánh giá)

- [ ] Hệ thống phản hồi trong vòng [X] giây — số liệu cụ thể theo AC
- [ ] Thông báo / email được gửi đúng địa chỉ người nhận
- [ ] Thông báo lỗi có nội dung cụ thể, không chung chung

#### DoD — Kỹ thuật (Dev/QA đánh giá)

- [ ] Code passed unit test
- [ ] Đã test trên Chrome, Safari, Firefox
- [ ] Realtime sync hoạt động với [X]+ user đồng thời
- [ ] [Yêu cầu kỹ thuật bổ sung]

---

### Ghi chú (Notes)

| Loại | Nội dung |
| :--- | :--- |
| **Sự phụ thuộc (Dependencies)** | [Câu chuyện US-xxx phải hoàn thành trước / Không có] |
| **Giả định (Assumptions)** | [Điều kiện giả định / Không có] |
| **Câu hỏi mở (Open Questions)** | [Câu hỏi cần làm rõ với PO / Stakeholder] |
