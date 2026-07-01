# Test Case Quality Checklist — 20 điểm tự kiểm tra

Dùng checklist này trước khi bàn giao test case suite. Bộ test đạt khi tổng điểm từ 18/20 trở lên và tất cả mục critical đều đạt.

---

## Phần 1: Nguồn gốc và phạm vi (4 điểm)

- [ ] **1.1 [CRITICAL]** Mỗi test case có traceability về FR / US / AC / UC / SRS nguồn.
- [ ] **1.2 [CRITICAL]** Không có test case kiểm thử requirement ngoài phạm vi nguồn.
- [ ] **1.3** In-scope / out-of-scope của test suite được ghi rõ.
- [ ] **1.4** Actor / role / permission liên quan được xác định.

---

## Phần 2: Coverage (5 điểm)

- [ ] **2.1 [CRITICAL]** Mỗi AC hoặc source scenario P0/P1 có ít nhất 1 test case.
- [ ] **2.2 [CRITICAL]** Có happy path cho mỗi flow chính.
- [ ] **2.3 [CRITICAL]** Có edge case hoặc business rule validation cho mỗi flow chính.
- [ ] **2.4 [CRITICAL]** Có error path / negative case cho mỗi flow chính.
- [ ] **2.5** Có regression impact cho luồng cũ bị ảnh hưởng nếu có.

---

## Phần 3: Chất lượng test case (5 điểm)

- [ ] **3.1 [CRITICAL]** Mỗi test case có Preconditions rõ ràng.
- [ ] **3.2 [CRITICAL]** Mỗi test case có Test Data cụ thể hoặc tham chiếu Data ID.
- [ ] **3.3 [CRITICAL]** Steps rõ ràng, tuần tự, có thể execute.
- [ ] **3.4 [CRITICAL]** Expected Results đo được, không dùng từ mơ hồ như "đúng", "hợp lý", "ổn".
- [ ] **3.5** Mỗi test case chỉ kiểm chứng một hành vi chính.

---

## Phần 4: Phân loại và ưu tiên (3 điểm)

- [ ] **4.1** Mỗi test case có Priority (P0/P1/P2).
- [ ] **4.2** Mỗi test case có Test Type (Functional / UAT / Smoke / Regression / Integration / Permission / Negative).
- [ ] **4.3** Smoke / regression candidates được đánh dấu nếu phù hợp.

---

## Phần 5: Dữ liệu, môi trường và dependency (2 điểm)

- [ ] **5.1** Test data có mục đích, giá trị và điều kiện chuẩn bị.
- [ ] **5.2** Môi trường, dependency hoặc hệ thống tích hợp được ghi rõ.

---

## Phần 6: Giả định và gap (1 điểm)

- [ ] **6.1 [CRITICAL]** Mọi thông tin thiếu hoặc chưa xác định được đánh dấu `[CHƯA XÁC ĐỊNH: ...]` và đưa vào Risk & Gap.

---

## Tóm tắt kết quả

| Phần                                 | Đạt     | Cần cải thiện | Tổng    |
| :----------------------------------- | :------ | :------------ | :------ |
| 1. Nguồn gốc và phạm vi              | /4      |               | /4      |
| 2. Coverage                          | /5      |               | /5      |
| 3. Chất lượng test case              | /5      |               | /5      |
| 4. Phân loại và ưu tiên              | /3      |               | /3      |
| 5. Dữ liệu, môi trường và dependency | /2      |               | /2      |
| 6. Giả định và gap                   | /1      |               | /1      |
| **Tổng cộng**                        | **/20** |               | **/20** |

**Ngưỡng bàn giao:** 18/20 (90%) và tất cả mục `[CRITICAL]` phải đạt. Bộ test case dưới 18 điểm hoặc trượt bất kỳ mục critical nào cần được tinh chỉnh trước khi bàn giao.
