# TEST CASE SUITE

## [Tên tính năng / Module]

**Phiên bản:** X.Y
**Ngày:** YYYY-MM-DD
**Người viết:** [Họ và tên]
**Nguồn:** [PRD / US / AC / UC / SRS]
**Phạm vi:** [In-scope / Out-of-scope]

---

## 1. Tổng quan kiểm thử

### 1.1 Mục tiêu

[Kiểm chứng hành vi nào, cho vai trò nào, trong bối cảnh nào.]

### 1.2 Phạm vi kiểm thử

| In-scope | Out-of-scope |
| :--- | :--- |
| [Luồng/chức năng sẽ test] | [Luồng/chức năng không test trong suite này] |

### 1.3 Vai trò và môi trường

| Hạng mục | Giá trị |
| :--- | :--- |
| Actor/Role | [VD: Admin, Customer, Staff] |
| Môi trường | [UAT / Staging / Production-like] |
| Dependency | [Hệ thống phụ thuộc / CHƯA XÁC ĐỊNH] |

---

## 2. Test Data

| Data ID | Mục đích | Dữ liệu | Ghi chú |
| :--- | :--- | :--- | :--- |
| TD-001 | [Happy path] | [Input cụ thể] | [Điều kiện chuẩn bị] |
| TD-002 | [Edge/Error] | [Input cụ thể] | [Điều kiện chuẩn bị] |

---

## 3. Test Cases

### TC-[mã]: [Tên test case]

| Trường | Nội dung |
| :--- | :--- |
| Traceability | [FR-001 / US-001 / AC-001 / UC-001 / SRS-001] |
| Priority | [P0 / P1 / P2] |
| Test Type | [Functional / UAT / Smoke / Regression / Integration / Permission / Negative] |
| Scenario | [Happy Path / Edge Case / Error Path / Permission / Data Validation] |
| Preconditions | [Điều kiện trước khi test] |
| Test Data | [TD-001 hoặc dữ liệu cụ thể] |

#### Steps & Expected Results

| Step | Action | Expected Result |
| :---: | :--- | :--- |
| 1 | [Người dùng/hệ thống thực hiện gì] | [Kết quả mong đợi đo được] |
| 2 | [Bước tiếp theo] | [Kết quả mong đợi] |

**Postconditions:** [Trạng thái hệ thống sau test]

---

## 4. Coverage Matrix

| Source ID | Requirement / Scenario | Test Case ID | Coverage Type | Status |
| :--- | :--- | :--- | :--- | :--- |
| AC-001 | [Happy path] | TC-001 | Positive | Covered |
| AC-002 | [Business validation] | TC-002 | Edge | Covered |
| AC-003 | [Error handling] | TC-003 | Negative | Covered |

---

## 5. Risk & Gap

| Gap / Risk | Ảnh hưởng | Cách xử lý |
| :--- | :--- | :--- |
| [CHƯA XÁC ĐỊNH: thiếu test data] | [Không thể execute] | [Cần PO/QA xác nhận] |
