---
name: cc-test-case-writer
description: |
  Sinh bộ Test Case chức năng chuẩn cho QA / Tester từ PRD, User Story, Acceptance Criteria, Use Case hoặc SRS. Dùng skill này khi người dùng yêu cầu viết, tạo, review, tối ưu, bổ sung hoặc chuyển đổi yêu cầu thành test cases, test scenarios, regression suite, smoke test, UAT checklist, hoặc test coverage matrix.
  KÍCH HOẠT khi: người dùng yêu cầu "viết test case", "tạo test cases", "test scenario", "UAT", "regression test", "smoke test", "kiểm thử chức năng", "coverage theo AC/FR/Use Case", hoặc dán User Story / Acceptance Criteria / Use Case / PRD / SRS để yêu cầu sinh test cases.
  KHÔNG DÙNG ĐỂ: viết User Story hoặc Acceptance Criteria (dùng cc-user-story-acceptance-criteria-writer), viết Use Case (dùng cc-use-case-writer), viết PRD (dùng cc-prd-writer), viết SRS (dùng cc-srs-writer), hoặc viết unit test / automation code kỹ thuật chi tiết.
---

# Test Case Writer

## Mục đích

Hỗ trợ QA / Tester / BA / PO chuyển yêu cầu nguồn thành bộ test case có thể thực thi, có traceability về FR / User Story / Acceptance Criteria / Use Case / SRS, và đủ bao phủ happy path, edge case, business rule validation, error path, permission, data, integration và regression.

Test Case tập trung vào **kiểm chứng hành vi và kết quả mong đợi**. Không viết code automation, không chọn test framework, không tự mở rộng scope ngoài yêu cầu nguồn.

## Phân biệt Test Case và tài liệu liên quan

|                  | Test Case                        | Acceptance Criteria        | Use Case                | SRS                     |
| :--------------- | :------------------------------- | :------------------------- | :---------------------- | :---------------------- |
| **Mục đích**     | Kiểm thử yêu cầu có đạt không    | Điều kiện nghiệm thu story | Tương tác actor-system  | Đặc tả kỹ thuật         |
| **Viết cho**     | QA / Tester / BA / PO            | BA / PO / Dev / QA         | BA / Dev / QA           | Dev / QA / Architect    |
| **Mức chi tiết** | Step, test data, expected result | Given-When-Then            | Main/alt/exception flow | Interface/data/contract |
| **Trace về**     | FR / US / AC / UC / SRS          | User Story                 | Goal/actor              | FR nguồn                |

**Quy tắc vàng:** Mỗi test case phải kiểm chứng một hành vi cụ thể, có dữ liệu kiểm thử, bước thực hiện, kết quả mong đợi, priority và traceability. Nếu nguồn không đủ rõ, đánh dấu `[CHƯA XÁC ĐỊNH: ...]` thay vì tự suy diễn.

## Quy trình thực hiện (Workflow)

### Bước 1: Xác định chế độ

- **Chế độ A (Viết mới):** Từ PRD / User Story / AC / Use Case / SRS → sinh bộ test case đầy đủ.
- **Chế độ B (Refine):** Đã có test case → review, tìm thiếu coverage, chuẩn hóa format.
- **Chế độ C (Augment):** Đã có một phần test case → bổ sung missing paths, test data, permission, negative case, regression.
- **Chế độ D (Coverage Matrix):** Người dùng chỉ cần ma trận traceability giữa FR / US / AC / UC / SRS và test cases.

### Bước 2: Thu thập thông tin đầu vào

**Thu thập tối thiểu 5 thông tin trước khi viết test cases:**

1. **Tài liệu nguồn:** PRD, User Story + AC, Use Case, SRS, hoặc mô tả tính năng.
2. **Phạm vi kiểm thử:** Feature/module nào trong scope? Có out-of-scope không?
3. **Loại kiểm thử:** Functional, UAT, smoke, regression, integration, permission, data validation.
4. **Vai trò / actor:** Ai thực hiện hành động? Có role/phân quyền nào cần kiểm tra?
5. **Test data / môi trường:** Dữ liệu đầu vào, trạng thái hệ thống, tài khoản, cấu hình, dependency.

**Khi thiếu thông tin:**

- Có 0-1 thông tin: **ĐẶT CÂU HỎI LÀM RÕ** trước, ưu tiên hỏi tài liệu nguồn và phạm vi kiểm thử.
- Có 2-4 thông tin: Có thể viết bản nháp nếu người dùng muốn tiếp tục, nhưng đánh dấu `[CHƯA XÁC ĐỊNH: ...]` ở test data, precondition hoặc expected result còn thiếu.
- Có đủ 5 thông tin: Có thể viết test suite hoàn chỉnh.
- Không hỏi quá 5 câu/lượt. Nếu nguồn có Acceptance Criteria dạng Gherkin, dùng AC làm baseline coverage trước khi bổ sung edge/error/regression.

### Bước 3: Phân tích nguồn và lập chiến lược coverage

1. Trích xuất danh sách FR / US / AC / UC / SRS item từ tài liệu nguồn.
2. Với mỗi item, xác định coverage tối thiểu:
   - Happy Path
   - Edge Case / Business Rule Validation
   - Error Path
   - Permission / Role-based behavior nếu có role
   - Data Validation nếu có input
   - Integration / State Transition nếu có hệ thống phụ thuộc
   - Regression impact nếu thay đổi ảnh hưởng luồng cũ
3. Gán priority:
   - **P0:** Critical path, money/data/security/compliance/blocker.
   - **P1:** Core feature path, common user flow.
   - **P2:** Edge/rare path, cosmetic/content fallback.
4. Gán test type: Functional / UAT / Smoke / Regression / Integration / Permission / Negative.

### Bước 4: Sinh Test Case Suite theo mẫu chuẩn

Sử dụng mẫu compact dưới đây. Khi cần tài liệu đầy đủ hơn, dùng [test-case-template.md](./references/test-case-template.md).

```markdown
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

[Kiểm chứng hành vi nào, cho vai trò nào, trong bối cảnh nào]

### 1.2 Phạm vi kiểm thử

| In-scope                  | Out-of-scope                                 |
| :------------------------ | :------------------------------------------- |
| [Luồng/chức năng sẽ test] | [Luồng/chức năng không test trong suite này] |

### 1.3 Vai trò và môi trường

| Hạng mục   | Giá trị                              |
| :--------- | :----------------------------------- |
| Actor/Role | [VD: Admin, Customer, Staff]         |
| Môi trường | [UAT / Staging / Production-like]    |
| Dependency | [Hệ thống phụ thuộc / CHƯA XÁC ĐỊNH] |

---

## 2. Test Data

| Data ID | Mục đích     | Dữ liệu        | Ghi chú              |
| :------ | :----------- | :------------- | :------------------- |
| TD-001  | [Happy path] | [Input cụ thể] | [Điều kiện chuẩn bị] |
| TD-002  | [Edge/Error] | [Input cụ thể] | [Điều kiện chuẩn bị] |

---

## 3. Test Cases

### TC-[mã]: [Tên test case]

| Trường        | Nội dung                                                                      |
| :------------ | :---------------------------------------------------------------------------- |
| Traceability  | [FR-001 / US-001 / AC-001 / UC-001 / SRS-001]                                 |
| Priority      | [P0 / P1 / P2]                                                                |
| Test Type     | [Functional / UAT / Smoke / Regression / Integration / Permission / Negative] |
| Scenario      | [Happy Path / Edge Case / Error Path / Permission / Data Validation]          |
| Preconditions | [Điều kiện trước khi test]                                                    |
| Test Data     | [TD-001 hoặc dữ liệu cụ thể]                                                  |

**Steps & Expected Results**

| Step | Action                             | Expected Result            |
| :--: | :--------------------------------- | :------------------------- |
|  1   | [Người dùng/hệ thống thực hiện gì] | [Kết quả mong đợi đo được] |
|  2   | [Bước tiếp theo]                   | [Kết quả mong đợi]         |

**Postconditions:** [Trạng thái hệ thống sau test]

---

## 4. Coverage Matrix

| Source ID | Requirement / Scenario | Test Case ID | Coverage Type | Status  |
| :-------- | :--------------------- | :----------- | :------------ | :------ |
| AC-001    | [Happy path]           | TC-001       | Positive      | Covered |
| AC-002    | [Business validation]  | TC-002       | Edge          | Covered |
| AC-003    | [Error handling]       | TC-003       | Negative      | Covered |

---

## 5. Risk & Gap

| Gap / Risk                       | Ảnh hưởng           | Cách xử lý           |
| :------------------------------- | :------------------ | :------------------- |
| [CHƯA XÁC ĐỊNH: thiếu test data] | [Không thể execute] | [Cần PO/QA xác nhận] |
```

### Bước 5: Tự đánh giá theo checklist

Trước khi trình bày kết quả, tự kiểm tra theo [quality-checklist-test-case.md](./checklists/quality-checklist-test-case.md). Các mục critical bắt buộc đạt:

- [ ] Mỗi test case có traceability về FR / US / AC / UC / SRS nguồn.
- [ ] Mỗi AC hoặc source scenario P0/P1 có ít nhất 1 test case.
- [ ] Có đủ happy path, edge/business validation và error path cho mỗi story/flow chính.
- [ ] Mỗi test case có preconditions, test data, steps và expected results rõ ràng.
- [ ] Không tự thêm scope hoặc requirement không có trong nguồn.
- [ ] Các thông tin chưa rõ được đánh dấu `[CHƯA XÁC ĐỊNH: ...]`.

### Bước 6: Trình bày kết quả

1. **Test Case Suite** — theo cấu trúc ở Bước 4.
2. **Coverage Matrix** — trace từ source requirement/scenario đến test cases.
3. **Risk & Gap** — dữ liệu, môi trường, dependency hoặc requirement chưa rõ.
4. **Self-check** — điểm tổng và các mục critical.

## Anti-Patterns

| Sai                                              | Đúng                                                                  |
| :----------------------------------------------- | :-------------------------------------------------------------------- |
| Viết test case không có traceability             | Mỗi test case gắn FR / US / AC / UC / SRS nguồn                       |
| Expected result mơ hồ: "hệ thống hoạt động đúng" | Expected result đo được: "trạng thái đơn hàng đổi sang Đã thanh toán" |
| Chỉ viết happy path                              | Bổ sung edge case, business validation, error path                    |
| Gộp nhiều mục tiêu vào một test case             | Mỗi test case kiểm chứng một hành vi chính                            |
| Tự tạo requirement mới khi nguồn thiếu           | Đánh dấu `[CHƯA XÁC ĐỊNH]` hoặc hỏi làm rõ                            |
| Viết unit test / automation code                 | Chỉ viết manual/functional test case; automation thuộc tài liệu riêng |

## Tài liệu tham khảo

- [test-case-template.md](./templates/test-case-template.md) — Template test case suite đầy đủ.
- [quality-checklist-test-case.md](./checklists/quality-checklist-test-case.md) — Checklist 20 điểm trước khi bàn giao.
- **RELATED SKILL:** `cc-user-story-acceptance-criteria-writer` — Dùng để tạo User Story / AC trước khi viết test cases.
- **RELATED SKILL:** `cc-use-case-writer` — Dùng khi cần làm rõ luồng actor-system trước khi viết test cases.
- **RELATED SKILL:** `cc-prd-writer` — Dùng khi thiếu PRD / FR nguồn.
- **RELATED SKILL:** `cc-srs-writer` — Dùng khi cần contract kỹ thuật trước khi viết integration test cases.
