---
name: cc-prd-writer
description: |
  Sinh tài liệu yêu cầu sản phẩm (Product Requirements Document - PRD) chuẩn cho chuyên viên phân tích nghiệp vụ (Business Analyst), quản lý dự án (Project Manager) và chủ sở hữu sản phẩm (Product Owner).
  Hỗ trợ 3 chế độ: Viết mới, Tinh chỉnh (Refine) và Bổ sung phần (Augment).

  KÍCH HOẠT khi người dùng yêu cầu: viết, tạo, đánh giá (review), tối ưu hoặc chuyển đổi tài liệu yêu cầu thành PRD.
  Kể cả khi người dùng dán tài liệu yêu cầu nghiệp vụ (BRD), tài liệu mô tả tính năng, hoặc bản phác thảo sản phẩm để yêu cầu sinh PRD.

  KHÔNG DÙNG ĐỂ: viết câu chuyện người dùng (User Story) hoặc tiêu chí nghiệm thu (Acceptance Criteria) (dùng cc-user-story-acceptance-criteria-writer), viết tài liệu đặc tả yêu cầu phần mềm (SRS) chi tiết kỹ thuật (dùng cc-srs-writer), viết trường hợp sử dụng chuẩn tắc (Use Case formal) (dùng cc-use-case-writer).
---

# Product Requirements Document Writer

## Mục đích

Hỗ trợ chuyên viên phân tích nghiệp vụ (Business Analyst), quản lý dự án (Project Manager) và chủ sở hữu sản phẩm (Product Owner) soạn thảo tài liệu yêu cầu sản phẩm (Product Requirements Document - PRD) chuẩn, rõ ràng, có thể truy xuất nguồn gốc, và sẵn sàng bàn giao cho đội ngũ phát triển (Development Team) cùng kiểm thử viên (Tester).

PRD tập trung vào **NGHIỆP VỤ và KẾT QUẢ** — không phải thiết kế kỹ thuật. Thiết kế kỹ thuật thuộc phạm vi tài liệu đặc tả yêu cầu phần mềm (Software Requirements Specification - SRS).

## Phân biệt PRD và SRS

| | PRD (Product Requirements Document) | SRS (Software Requirements Specification) |
| :--- | :--- | :--- |
| **Mục đích** | Mô tả sản phẩm từ góc nhìn nghiệp vụ | Mô tả hệ thống từ góc nhìn kỹ thuật |
| **Viết cho** | BA / PM / PO | Dev / QA |
| **Nội dung** | Nghiệp vụ, quy trình, kết quả mong đợi | Kiến trúc, API, database, interface |
| **Ví dụ** | "Hệ thống gửi email xác nhận khi đơn hàng được tạo" | "POST /api/orders → 200 + JSON payload" |
| **Công cụ** | Luồng nghiệp vụ, quy tắc nghiệp vụ, kịch bản | Use Case, sequence diagram, ERD |

**Quy tắc vàng:** Mô tả **HÀNH VI** và **KẾT QUẢ** của hệ thống bằng ngôn ngữ nghiệp vụ. Không mô tả **CƠ CHẾ KỸ THUẬT** triển khai.

## Quy trình thực hiện (Workflow)

### Bước 1: Xác định chế độ (Mode)

Hỏi người dùng hoặc tự suy luận từ nội dung cung cấp (sau đó xác nhận lại):

- **Chế độ A (Viết mới)**: Người dùng cung cấp mô tả tính năng hoặc BRD -> Sinh mới PRD hoàn chỉnh.
- **Chế độ B (Tinh chỉnh - Refine)**: Đã có sẵn PRD -> Đánh giá và đề xuất cải tiến theo checklist chất lượng.
- **Chế độ C (Bổ sung - Augment)**: Đã có PRD cơ bản -> Bổ sung phần còn thiếu (ví dụ: bổ sung User Stories, bổ sung NFR, bổ sung ma trận truy xuất).

### Bước 2: Thu thập thông tin đầu vào

**Thu thập tối thiểu 6 thông tin sau trước khi bắt đầu** (tuyệt đối không tự suy diễn nếu thiếu):

1. **Tên sản phẩm / tính năng**: Tên chính xác của sản phẩm hoặc tính năng.
2. **Mục đích sản phẩm**: Vấn đề gì cần giải quyết? Ai gặp vấn đề đó?
3. **Đối tượng sử dụng chính**: Nhóm người dùng cốt lõi (End User, Admin, Manager...).
4. **Phạm vi chức năng (In-scope)**: Những chức năng nào PHẢI có trong lần phát hành này?
5. **Phạm vi ngoài (Out-of-scope)**: Những chức năng nào KHÔNG thuộc phiên bản này? (Ngăn chặn scope creep)
6. **Ràng buộc nghiệp vụ**: Quy định, quy trình, chính sách ảnh hưởng đến thiết kế.

**Khi thiếu thông tin:**

- Có 0-2 thông tin: **ĐẶT CÂU HỎI LÀM RÕ** trước khi viết. Không tự suy diễn.
- Có 3-5 thông tin: Có thể viết bản nháp nếu người dùng muốn tiếp tục, nhưng phải ghi rõ giả định trong phần **Giả định và ràng buộc** và đánh dấu bằng `[GIẢ ĐỊNH: mô tả]`.
- Có đủ 6 thông tin: Có thể viết PRD hoàn chỉnh.
- Không hỏi quá 6 câu/lượt. Ưu tiên hỏi theo đúng 6 thông tin đầu vào ở trên.

### Bước 3: Xây dựng cấu trúc PRD theo mẫu chuẩn

Trình bày theo thứ tự và định dạng bắt buộc sau. Mỗi phần có vai trò rõ ràng:

````markdown
# TÀI LIỆU YÊU CẦU SẢN PHẨM (PRD)
## [Tên sản phẩm / Tính năng]

**Phiên bản:** X.Y
**Ngày:** YYYY-MM-DD
**Tác giả:** [Họ và tên]
**Tài liệu tham chiếu:** [BRD số X, nếu có]

---

## 1. Tổng quan sản phẩm

### 1.1 Mục đích
[1-2 đoạn. Mô tả vấn đề cần giải quyết, bối cảnh, giá trị mang lại. Viết cho người đọc chưa biết gì về dự án.]

### 1.2 Phạm vi

| Trong phạm vi (In-scope) | Ngoài phạm vi (Out-of-scope) |
| :--- | :--- |
| [Chức năng bắt buộc] | [Chức năng không thuộc phiên bản này] |

### 1.3 Đối tượng người dùng

| Đối tượng | Vai trò | Mô tả |
| :--- | :--- | :--- |
| [Tên nhóm] | [Vai trò] | [Ai họ là, họ làm gì trong hệ thống] |

### 1.4 Lợi ích chính (Key Benefits)
- [Lợi ích 1 — viết dạng kết quả đo lường được nếu có]
- [Lợi ích 2]
- [Lợi ích 3]

---

## 2. Yêu cầu chức năng

*[Mỗi yêu cầu chức năng (FR) được trình bày với: Mã, Tên, Mô tả nghiệp vụ, Tác nhân, Điều kiện kích hoạt, Luồng chính, Luồng thay thế, Kết quả mong đợi, Quy tắc nghiệp vụ, User Story liên quan]*

### 2.1 [Tên nhóm chức năng / Module 1]

**FR-[mã]:** [Tên yêu cầu]

**Mô tả nghiệp vụ:** [Mô tả bằng ngôn ngữ nghiệp vụ — hệ thống LÀM GÌ, không phải TRIỂN KHAI thế nào]

**Tác nhân (Actor):** [Đối tượng thực hiện hành động]

**Điều kiện kích hoạt (Trigger):** [Sự kiện nào khởi tạo yêu cầu này?]

**Luồng chính (Happy Path):**
1. [Bước 1]
2. [Bước 2]
3. [Bước 3]

**Luồng thay thế (Alternative Flow):**
- [Luồng A]: [Mô tả]
- [Luồng B]: [Mô tả]

**Kết quả mong đợi (Expected Outcome):** [Kết quả nghiệp vụ đo lường được]

**Quy tắc nghiệp vụ (Business Rules):**
- [Quy tắc 1 — dạng mệnh đề, không phải thủ tục]
- [Quy tắc 2]

**User Story liên quan:** [[US-XYZ](#user-stories)]

### 2.2 [Tên nhóm chức năng / Module 2]
[... tiếp tục ...]

---

## 3. Yêu cầu phi chức năng (Non-Functional Requirements)

### 3.1 Hiệu suất (Performance)
| Tiêu chí | Ngưỡng yêu cầu | Ghi chú |
| :--- | :--- | :--- |
| Thời gian phản hồi | [VD: < 2 giây cho thao tác X] | [Nếu có điều kiện cụ thể] |
| Thông lượng | [VD: hỗ trợ X người dùng đồng thời] | [Nếu có] |

### 3.2 Bảo mật (Security)
| Tiêu chí | Yêu cầu | Ghi chú |
| :--- | :--- | :--- |
| Xác thực | [VD: Người dùng phải được xác minh danh tính trước khi truy cập] | [Nếu có] |
| Phân quyền | [VD: Quyền thao tác được giới hạn theo vai trò nghiệp vụ] | [Nếu có] |
| Bảo vệ dữ liệu | [VD: Dữ liệu nhạy cảm phải được bảo vệ trong quá trình sử dụng và trao đổi] | [Nếu có] |

### 3.3 Khả dụng (Availability)
| Tiêu chí | Yêu cầu | Ghi chú |
| :--- | :--- | :--- |
| Uptime | [VD: 99.5%] | [Nếu có] |

### 3.4 Khả năng tương thích (Compatibility)
| Tiêu chí | Yêu cầu | Ghi chú |
| :--- | :--- | :--- |
| Trình duyệt | [VD: Chrome, Firefox, Safari phiên bản mới nhất] | [Nếu có] |

---

## 4. Thiết kế trải nghiệm người dùng (UX/UI Guidelines)

### 4.1 Luồng người dùng chính (Key User Flows)
[Mô tả bằng text hoặc ASCII flowchart các luồng quan trọng. KHÔNG vẽ wireframe chi tiết — đó là việc của UX Designer.]

```text
[Actor] → [Action 1] → [System Response 1] → [Action 2] → [System Response 2]
```

### 4.2 Quy tắc giao diện người dùng (UI Guidelines)

| Nguyên tắc | Mô tả |
| :--- | :--- |
| [Nguyên tắc 1] | [VD: Thông báo lỗi phải hiển thị trong 3 giây] |
| [Nguyên tắc 2] | [VD: Form validation real-time, không chờ submit] |

### 4.3 Thông báo và trạng thái lỗi

| Mã thông báo | Nội dung | Hành động người dùng |
| :--- | :--- | :--- |
| [ERR-001] | [Mô tả] | [Hướng dẫn] |

---

## 5. Tích hợp hệ thống (Integrations)

*[Chỉ mô tả nếu có tích hợp với hệ thống bên thứ ba hoặc module khác]*

| Hệ thống | Chức năng tích hợp | Dữ liệu nghiệp vụ trao đổi | Ràng buộc nghiệp vụ / SLA |
| :--- | :--- | :--- | :--- |
| [VD: MoMo] | [Thanh toán] | [Mã giao dịch, số tiền, trạng thái] | [Thời gian xác nhận thanh toán, trạng thái phụ thuộc] |

---

## 6. Kế hoạch phát hành / Phân kỳ triển khai (Release Plan)

| Giai đoạn | Mục tiêu | FR liên quan | Thời gian ước lượng |
| :--- | :--- | :--- | :--- |
| [Phase 1] | [Mô tả] | FR-[mã], FR-[mã] | [X Sprint / X ngày] |
| [Phase 2] | [Mô tả] | FR-[mã], FR-[mã] | [X Sprint / X ngày] |

---

## 7. Rủi ro và giả định

### 7.1 Rủi ro

| Rủi ro | Mức độ | Giải pháp dự phòng |
| :--- | :--- | :--- |
| [Rủi ro 1] | [Cao / Trung bình / Thấp] | [Cách xử lý] |

### 7.2 Giả định

| Giả định | Ảnh hưởng nếu sai |
| :--- | :--- |
| [Giả định 1] | [Hậu quả] |
| [Giả định 2] | [Hậu quả] |

---

## 8. Ma trận truy xuất yêu cầu (Requirements Traceability Matrix)

| FR | Tên yêu cầu | Nguồn | Độ ưu tiên | User Story | Phase |
| :--- | :--- | :--- | :--- | :--- | :--- |
| FR-001 | [Tên] | [BRD / Stakeholder / Đội ngũ] | [P0/P1/P2] | [US-XYZ] | [Phase 1] |
| FR-002 | [Tên] | [BRD / Stakeholder / Đội ngũ] | [P0/P1/P2] | [US-XYZ] | [Phase 1] |

---

## 9. User Stories

*[Tái sử dụng kỹ năng **REQUIRED SUB-SKILL:** Use cc-user-story-acceptance-criteria-writer cho phần này. Đảm bảo User Story được gắn FR tương ứng trong ma trận truy xuất và có tối thiểu 3 Acceptance Criteria dạng Given-When-Then: Happy Path, Edge Case / Business Rule Validation, Error Path.]*

---

## 10. Phụ lục

### 10.1 Thuật ngữ

| Thuật ngữ | Định nghĩa |
| :--- | :--- |
| [Thuật ngữ 1] | [Định nghĩa] |

### 10.2 Tài liệu tham khảo

- [Tài liệu 1 — đường dẫn hoặc mô tả]
- [Tài liệu 2 — đường dẫn hoặc mô tả]

````

### Bước 4: Tạo User Stories tích hợp

**Sử dụng skill bắt buộc:** `cc-user-story-acceptance-criteria-writer`

Sau khi viết các yêu cầu chức năng (Bước 3), **bắt buộc** tạo User Stories cho **mỗi FR có độ ưu tiên P0 và P1**. Mỗi User Story phải:

1. Liên kết ngược với FR tương ứng qua ma trận truy xuất (Section 8).
2. Có tối thiểu 3 tiêu chí nghiệm thu (Acceptance Criteria) dạng Given-When-Then cho mỗi User Story: Happy Path, Edge Case / Business Rule Validation, Error Path.
3. Được đánh số theo format `US-[mã số]` — mã số trùng với mã FR khi có thể.

### Bước 5: Tự đánh giá theo checklist chất lượng

Trước khi trình bày kết quả, tự kiểm tra theo **PRD Quality Checklist** 20 điểm (xem [quality-checklist-prd.md](./checklists/quality-checklist-prd.md)). Không dùng danh sách rút gọn làm tiêu chí bàn giao.

Các mục critical bắt buộc đạt:

- [ ] Không có chi tiết triển khai (tech stack, API endpoint, database schema, protocol, framework).
- [ ] Out-of-scope được liệt kê rõ ràng và không để trống.
- [ ] Mỗi FR P0/P1 có User Story liên kết trong ma trận truy xuất.
- [ ] Mỗi User Story có tối thiểu 3 Acceptance Criteria dạng Given-When-Then.
- [ ] Giả định được đánh dấu `[GIẢ ĐỊNH: ...]`.

### Bước 6: Trình bày kết quả

Mặc định trình bày kết quả bằng Markdown. Nếu người dùng yêu cầu Word / PDF, hỏi trước về định dạng và cách xuất.

Sau khi tự kiểm tra đạt, trình bày theo thứ tự:

1. **PRD hoàn chỉnh** — theo cấu trúc ở Bước 3.
2. **Bảng tự kiểm tra chất lượng** — trạng thái Đạt / Cần cải thiện cho các mục critical và điểm tổng theo checklist 20 điểm.
3. **Xác nhận bàn giao** — nêu rõ các giả định còn cần người dùng xác nhận.

## Mẫu chống lại thiết kế chuẩn (Anti-patterns)

| Sai | Đúng |
| :--- | :--- |
| Mô tả kỹ thuật trong FR: "Hệ thống gọi API MoMo qua HTTPS POST với payload JSON" | Mô tả nghiệp vụ: "Khách hàng chọn thanh toán MoMo và hệ thống tạo yêu cầu thanh toán với mã giao dịch duy nhất" |
| Không có Out-of-scope | Liệt kê rõ ràng bảng In-scope / Out-of-scope |
| FR quá lớn, gộp nhiều hành vi nghiệp vụ | Tách mỗi FR thành một hành vi nghiệp vụ cụ thể, có thể kiểm thử độc lập |
| Không có ma trận truy xuất | RTM liên kết FR -> User Story -> Phase |
| Tự suy diễn khi thiếu thông tin | Đặt câu hỏi làm rõ hoặc ghi `[GIẢ ĐỊNH: ...]` rõ ràng |
| Đề xuất framework, database, cloud provider | Chỉ mô tả hệ thống tích hợp và chức năng tích hợp ở mức nghiệp vụ |
| User Story đứng riêng | User Story gắn FR trong RTM |

## Tài liệu tham khảo liên quan

- [prd-template.md](./references/prd-template.md) — Biểu mẫu PRD đầy đủ có thể sao chép. Dùng làm baseline khi viết PRD thực tế.
- [quality-checklist-prd.md](./checklists/quality-checklist-prd.md) — Danh mục tự kiểm tra 20 điểm chất lượng PRD trước khi bàn giao.
- [prd-vs-srs.md](./references/prd-vs-srs.md) — Tài liệu phân biệt chi tiết PRD và SRS với ví dụ song song.
- **REQUIRED SUB-SKILL:** `cc-user-story-acceptance-criteria-writer` — Bắt buộc dùng để sinh User Stories và Acceptance Criteria tích hợp trong PRD.
- **RELATED SKILL:** `cc-use-case-writer` — Viết Use Case chuẩn tắc (Karl Wiegers) khi cần mô tả luồng tương tác chi tiết.
