# TÀI LIỆU YÊU CẦU SẢN PHẨM (PRD)

## [Tên sản phẩm / Tính năng]

**Phiên bản:** X.Y
**Ngày:** YYYY-MM-DD
**Tác giả:** [Họ và tên]
**Tài liệu tham chiếu:** [BRD số X, nếu có]

---

## 1. Tổng quan sản phẩm

### 1.1 Mục đích

[Mô tả vấn đề cần giải quyết, bối cảnh, giá trị mang lại. Viết cho người đọc chưa biết gì về dự án. 1-2 đoạn văn.]

### 1.2 Phạm vi

| Trong phạm vi (In-scope) | Ngoài phạm vi (Out-of-scope) |
| :--- | :--- |
| [Chức năng bắt buộc, phiên bản này] | [Chức năng không thuộc phiên bản này] |

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

**User Story liên quan:** [US-XXX]

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
| FR-001 | [Tên] | [BRD / Stakeholder / Đội ngũ] | [P0/P1/P2] | [US-XXX] | [Phase 1] |
| FR-002 | [Tên] | [BRD / Stakeholder / Đội ngũ] | [P0/P1/P2] | [US-XXX] | [Phase 1] |

---

## 9. User Stories

*[Tái sử dụng skill **cc-user-story-acceptance-criteria-writer** cho phần này. Đảm bảo mỗi User Story gắn với FR tương ứng trong ma trận truy xuất và có tối thiểu 3 Acceptance Criteria dạng Given-When-Then: Happy Path, Edge Case / Business Rule Validation, Error Path.]*

---

## 10. Phụ lục

### 10.1 Thuật ngữ

| Thuật ngữ | Định nghĩa |
| :--- | :--- |
| [Thuật ngữ 1] | [Định nghĩa] |

### 10.2 Tài liệu tham khảo

- [Tài liệu 1 — đường dẫn hoặc mô tả]
- [Tài liệu 2 — đường dẫn hoặc mô tả]
