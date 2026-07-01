# PRD Quality Checklist — 20 điểm tự kiểm tra

Dùng danh mục này trước khi bàn giao PRD cho đội ngũ phát triển. PRD đạt khi tổng điểm từ 18/20 trở lên và tất cả mục critical đều đạt.

---

## Phần 1: Thông tin tổng quan (2 điểm)

- [ ] **1.1** Tên sản phẩm / tính năng được đặt rõ ràng, không mơ hồ.
- [ ] **1.2 [CRITICAL]** Có bảng In-scope / Out-of-scope đầy đủ. Out-of-scope không được trống.

---

## Phần 2: Yêu cầu chức năng (6 điểm)

- [ ] **2.1** Mỗi yêu cầu chức năng (FR) có mã duy nhất theo format `FR-[số]`.
- [ ] **2.2 [CRITICAL]** Mỗi FR có mô tả nghiệp vụ rõ ràng — **không chứa thuật ngữ kỹ thuật** (API, database, protocol, framework).
- [ ] **2.3** Mỗi FR có đủ 6 thành phần: Mô tả, Tác nhân, Trigger, Happy Path, Alternative Flow, Expected Outcome.
- [ ] **2.4** Mỗi FR có **tối thiểu 1 quy tắc nghiệp vụ** (Business Rule) dạng mệnh đề.
- [ ] **2.5** FR được nhóm theo module / nhóm chức năng logic.
- [ ] **2.6** Không có FR quá lớn — mỗi FR có thể kiểm thử độc lập trong 1 Sprint.

---

## Phần 3: Yêu cầu phi chức năng (2 điểm)

- [ ] **3.1** Có phần NFR với ít nhất 3 tiêu chí: Hiệu suất, Bảo mật, Khả dụng.
- [ ] **3.2** Mỗi NFR có ngưỡng cụ thể (số đo được), không dùng từ mơ hồ như "nhanh", "bảo mật cao".

---

## Phần 4: UX/UI Guidelines (2 điểm)

- [ ] **4.1** Có mô tả luồng người dùng chính bằng text hoặc ASCII flowchart.
- [ ] **4.2** Không chứa wireframe chi tiết, mockup, hoặc chỉ định layout cụ thể — đó là việc của UX Designer.

---

## Phần 5: Tích hợp (1 điểm)

- [ ] **5.1** Phần tích hợp chỉ ghi tên hệ thống bên thứ ba và chức năng tích hợp. Không chỉ định cơ chế kỹ thuật.

---

## Phần 6: User Stories và Ma trận truy xuất (4 điểm)

- [ ] **6.1 [CRITICAL]** Mỗi FR P0/P1 có User Story tương ứng trong ma trận truy xuất (RTM). FR P2 có thể để trống nếu ghi rõ lý do.
- [ ] **6.2** Mỗi User Story đạt đủ 06 tiêu chí INVEST (Independent, Negotiable, Valuable, Estimable, Small, Testable).
- [ ] **6.3 [CRITICAL]** Mỗi User Story có tối thiểu 3 tiêu chí nghiệm thu (Acceptance Criteria) dạng Given-When-Then: Happy Path, Edge Case / Business Rule Validation, Error Path.
- [ ] **6.4** Ma trận truy xuất có đủ cột: FR, Tên, Nguồn, Độ ưu tiên, User Story, Phase.

---

## Phần 7: Rủi ro và Giả định (2 điểm)

- [ ] **7.1** Mỗi rủi ro có mức độ đánh giá (Cao / Trung bình / Thấp) và giải pháp dự phòng cụ thể.
- [ ] **7.2** Mỗi giả định có ghi rõ hậu quả nếu sai.

---

## Phần 8: Chất lượng tổng thể (1 điểm)

- [ ] **8.1 [CRITICAL]** Không có giả định nào được tự suy diễn mà không được đánh dấu `[GIẢ ĐỊNH: ...]`.

---

## Tóm tắt kết quả

| Phần | Đạt | Cần cải thiện | Tổng |
| :--- | :--- | :--- | :--- |
| 1. Thông tin tổng quan | /2 | | /2 |
| 2. Yêu cầu chức năng | /6 | | /6 |
| 3. Yêu cầu phi chức năng | /2 | | /2 |
| 4. UX/UI Guidelines | /2 | | /2 |
| 5. Tích hợp | /1 | | /1 |
| 6. User Stories & RTM | /4 | | /4 |
| 7. Rủi ro và Giả định | /2 | | /2 |
| 8. Chất lượng tổng thể | /1 | | /1 |
| **Tổng cộng** | **/20** | | **/20** |

**Ngưỡng bàn giao:** 18/20 (90%) và tất cả mục `[CRITICAL]` phải đạt. PRD dưới 18 điểm hoặc trượt bất kỳ mục critical nào cần được tinh chỉnh trước khi bàn giao.
