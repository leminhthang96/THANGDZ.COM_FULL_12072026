# SRS Quality Checklist — 20 điểm tự kiểm tra

Dùng danh mục này trước khi bàn giao SRS cho đội ngũ phát triển. SRS đạt khi tổng điểm từ 18/20 trở lên và tất cả mục critical đều đạt.

---

## Phần 1: Nguồn gốc yêu cầu (3 điểm)

- [ ] **1.1 [CRITICAL]** Mỗi SRS-[mã] có FR-[mã] nguồn được ghi rõ trong tài liệu.
- [ ] **1.2 [CRITICAL]** Có ma trận truy xuất (RTM) liên kết SRS-[mã] ↔ FR-[mã].
- [ ] **1.3 [CRITICAL]** Không có SRS-[mã] "mồ côi" — không có FR nguồn.

---

## Phần 2: Giao diện kỹ thuật (5 điểm)

- [ ] **2.1** Mỗi API endpoint có đầy đủ request schema (field name, type, required).
- [ ] **2.2** Mỗi API endpoint có response schema (data + meta structure).
- [ ] **2.3** Mỗi API endpoint có mã lỗi (error code) với HTTP status, nội dung, nguyên nhân.
- [ ] **2.4** Data model có đầy đủ: field name, kiểu dữ liệu, ràng buộc (NOT NULL, FK, UNIQUE).
- [ ] **2.5** Indexes được ghi rõ (Primary Key, Foreign Key, additional indexes).

---

## Phần 3: Yêu cầu phi chức năng (3 điểm)

- [ ] **3.1 [CRITICAL]** Mỗi NFR có ngưỡng cụ thể (số đo được — VD: p95 < 200ms, không phải "nhanh").
- [ ] **3.2 [CRITICAL]** Mỗi NFR có điều kiện đo và phương pháp đo được ghi rõ.
- [ ] **3.3** NFR được phân biệt rõ: Performance, Security, Availability, Scalability, Compatibility.

---

## Phần 4: Giới hạn phạm vi (4 điểm)

- [ ] **4.1 [CRITICAL]** Không có tech stack được tự chọn (framework, database, cloud) — trừ khi đã được xác nhận.
- [ ] **4.2 [CRITICAL]** Không có chức năng nào vượt quá phạm vi FR trong PRD nguồn.
- [ ] **4.3 [CRITICAL]** Không có CI/CD pipeline, deployment strategy, hoặc monitoring setup.
- [ ] **4.4 [CRITICAL]** Không có microservices architecture, service decomposition, hoặc deployment topology.

---

## Phần 5: Tích hợp hệ thống (2 điểm)

- [ ] **5.1** Mỗi tích hợp bên ngoài có contract rõ (API format, message format). Provider chỉ được ghi nếu đã có trong PRD/FR hoặc đã được xác nhận.
- [ ] **5.2 [CRITICAL]** Không có third-party service được thêm mà không có trong PRD.

---

## Phần 6: Quyết định kiến trúc (1 điểm)

- [ ] **6.1** Các quyết định kỹ thuật cục bộ phục vụ FR được ghi trong phần ADR (Architecture Decision Records); quyết định kiến trúc tổng thể chuyển sang ADD.

---

## Phần 7: Chất lượng tài liệu (2 điểm)

- [ ] **7.1** Thuật ngữ và từ viết tắt được định nghĩa trong phần 1.3.
- [ ] **7.2 [CRITICAL]** Không có giả định nào không được ghi nhận — mọi tech choice không xác định phải có `[CHƯA XÁC ĐỊNH]`.

---

## Tóm tắt kết quả

| Phần | Đạt | Cần cải thiện | Tổng |
| :--- | :--- | :--- | :--- |
| 1. Nguồn gốc yêu cầu | /3 | | /3 |
| 2. Giao diện kỹ thuật | /5 | | /5 |
| 3. Yêu cầu phi chức năng | /3 | | /3 |
| 4. Giới hạn phạm vi | /4 | | /4 |
| 5. Tích hợp hệ thống | /2 | | /2 |
| 6. Quyết định kiến trúc | /1 | | /1 |
| 7. Chất lượng tài liệu | /2 | | /2 |
| **Tổng cộng** | **/20** | | **/20** |

**Ngưỡng bàn giao:** 18/20 (90%) và tất cả mục `[CRITICAL]` phải đạt. SRS dưới 18 điểm hoặc trượt bất kỳ mục critical nào cần được tinh chỉnh trước khi bàn giao.
