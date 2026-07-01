---
name: cc-pd-writer
description: |
  Hỗ trợ BA / PM / PO khám phá và đánh giá một ý tưởng / tính năng trước khi viết PRD.
  KÍCH HOẠT khi: người dùng yêu cầu viết tài liệu discovery, khám phá sản phẩm, đánh giá opportunity, lập bản đồ stakeholder, đánh giá feasibility, hoặc chuyển từ ý tưởng sang đầu vào cho PRD.
  KHÔNG DÙNG khi: đã có đầy đủ thông tin và chỉ cần viết PRD (dùng cc-prd-writer), viết User Story (dùng cc-user-story-acceptance-criteria-writer), viết Use Case chi tiết (dùng cc-use-case-writer), viết đặc tả kỹ thuật SRS (dùng cc-srs-writer).
---

# Product Discovery Writer

## Mục đích

Hỗ trợ BA / PM / PO thu thập và xác nhận 6 thông tin đầu vào bắt buộc cho `cc-prd-writer` một cách có hệ thống — trước khi viết PRD. Discovery tập trung vào **vấn đề, cơ hội và hướng xử lý ở mức nghiệp vụ**, không đi vào thiết kế giải pháp hay chi tiết kỹ thuật.

## Phân biệt Discovery và PRD

| | Product Discovery | PRD |
| :--- | :--- | :--- |
| **Mục đích** | Có nên đầu tư không? | Cần làm gì, như thế nào? |
| **Viết cho** | BA / PM / PO (nội bộ) | BA / PM / PO + Dev / QA |
| **Nội dung** | Problem, Opportunity, Feasibility, Risk | Feature, Flow, Business Rule, NFR |
| **Chi tiết triển khai** | Không | Không |

**Quy tắc vàng:** Mô tả **VẤN ĐỀ**, **CƠ HỘI** và **PHƯƠNG ÁN NGHIỆP VỤ**. Không mô tả **SOLUTION DESIGN**, **API**, **DATABASE**, **UI COMPONENT** hay **CƠ CHẾ KỸ THUẬT**.

## Quy trình thực hiện (Workflow)

### Bước 1: Xác định chế độ

- **Chế độ A (Viết mới):** Pain point / ý tưởng → sinh Discovery Report hoàn chỉnh.
- **Chế độ B (Refine):** Đã có Discovery sơ bộ → đánh giá và cải thiện theo checklist chất lượng.
- **Chế độ C (Augment):** Đã có vài phần → bổ sung phần còn thiếu.

### Bước 2: Thu thập thông tin đầu vào

**Thu thập tối thiểu 4 thông tin trước khi bắt đầu:**

1. **Pain point / Vấn đề ban đầu** — Điều gì khiến người dùng/stakeholder quan tâm?
2. **Stakeholder chính** — Ai đang gặp vấn đề / ai yêu cầu tính năng?
3. **Bối cảnh** — Vấn đề xảy ra trong bối cảnh nào (sản phẩm hiện tại, quy trình hiện tại)?
4. **Mức độ ưu tiên sơ bộ** — Có deadline không? P0/P1/P2?

**Khi thiếu thông tin:**

- Có 0-1 thông tin: **ĐẶT CÂU HỎI LÀM RÕ** trước. Không tự suy diễn.
- Có 2-3 thông tin: Có thể viết bản nháp nếu người dùng muốn tiếp tục, nhưng phải đánh dấu rõ `[GIẢ ĐỊNH: ...]` ở từng phần liên quan.
- Có đủ 4 thông tin: Có thể viết Discovery Report hoàn chỉnh.
- Không hỏi quá 5 câu/lượt. Ưu tiên hỏi về Persona, Goal, Business Value, Context, Scope, Constraints để chuẩn bị đầu vào cho PRD.

### Bước 3: Sinh Discovery Report theo 7 phần

Sử dụng mẫu compact dưới đây để tạo nhanh kết quả. Khi cần tài liệu đầy đủ hơn, dùng [discovery-template.md](./references/discovery-template.md).

```markdown
# PRODUCT DISCOVERY REPORT
## [Tên tính năng / Vấn đề]

**Phiên bản:** X.Y
**Ngày:** YYYY-MM-DD
**Tác giả:** [Họ và tên]
**Chế độ:** [A Viết mới / B Refine / C Augment]

---

## 1. Problem Framing

### 1.1 Problem Statement
[Mô tả 1-2 câu: vấn đề là gì, ai gặp, hậu quả]

### 1.2 Pain Point Mapping

| Pain Point | Mức độ nghiêm trọng | Tần suất | Phạm vi ảnh hưởng |
| :--- | :--- | :--- | :--- |
| [Mô tả] | [Cao / Trung bình / Thấp] | [Thường xuyên / Đôi khi / Hiếm] | [Toàn hệ thống / Nhóm / Cá nhân] |

### 1.3 Baseline Metrics
[Chỉ số hiện tại nào sẽ được cải thiện?]

| Chỉ số | Giá trị hiện tại | Mục tiêu (ước lượng) | Cách đo |
| :--- | :--- | :--- | :--- |
| [VD: Thời gian xử lý đơn hàng] | [VD: 5 phút] | [VD: < 1 phút] | [VD: System report] |

---

## 2. Stakeholder Map

### 2.1 Stakeholder Identification

| Stakeholder | Vai trò | Mối quan tâm |
| :--- | :--- | :--- |
| [Tên nhóm/người] | [Sponsor / User / Regulator / ...] | [Mối quan tâm chính] |

### 2.2 Influence/Interest Grid

| | Quan tâm cao | Quan tâm thấp |
| :--- | :--- | :--- |
| **Ảnh hưởng cao** | [Quan tâm nhiều, ảnh hưởng lớn] | [Ít quan tâm nhưng ảnh hưởng lớn] |
| **Ảnh hưởng thấp** | [Quan tâm nhiều, ảnh hưởng nhỏ] | [Ít quan tâm, ảnh hưởng nhỏ] |

### 2.3 Information Needs

| Stakeholder | Thông tin cần từ Discovery | Định dạng |
| :--- | :--- | :--- |
| [Tên] | [VD: Problem Statement + ROI] | [VD: Slide / Report / 1-pager] |

---

## 3. Opportunity Assessment

### 3.1 Business Value
[Giá trị kinh doanh — định lượng được nếu có]

### 3.2 Market Opportunity
[Cơ hội thị trường / khách hàng bị miss]

### 3.3 Strategic Alignment
[Phù hợp chiến lược công ty?]

### 3.4 Assumptions

| Giả định | Rủi ro nếu sai | Cách kiểm chứng |
| :--- | :--- | :--- |
| [GIẢ ĐỊNH: mô tả] | [Hậu quả] | [Phương pháp] |

---

## 4. Business Solution Options

*[Chỉ mô tả phương án ở mức nghiệp vụ / product direction. Không mô tả chi tiết triển khai kỹ thuật.]*

### 4.1 Options Overview

| Phương án | Mô tả | Lợi ích chính | Rủi ro chính | Chi phí ước lượng |
| :--- | :--- | :--- | :--- | :--- |
| A | [Tên phương án] | [Lợi ích] | [Rủi ro] | [Cao / Trung bình / Thấp] |
| B | [Tên phương án] | [Lợi ích] | [Rủi ro] | [Cao / Trung bình / Thấp] |

### 4.2 Trade-off Analysis

| Tiêu chí | Phương án A | Phương án B |
| :--- | :--- | :--- |
| Impact | [Cao/Trung bình/Thấp] | [Cao/Trung bình/Thấp] |
| Effort | [Cao/Trung bình/Thấp] | [Cao/Trung bình/Thấp] |
| Time-to-value | [Nhanh/Trung bình/Chậm] | [Nhanh/Trung bình/Chậm] |
| Risk | [Cao/Trung bình/Thấp] | [Cao/Trung bình/Thấp] |

### 4.3 Recommendation
[Khuyến nghị phương án + lý do. Nếu chưa đủ thông tin, ghi rõ cần thêm gì.]

---

## 5. Feasibility & Risk Assessment

### 5.1 Feasibility

| Tiêu chí | Đánh giá | Ghi chú |
| :--- | :--- | :--- |
| Technical Feasibility | [Khả thi / Cần đánh giá thêm / Không khả thi] | [Đánh giá ở mức khả thi, không mô tả thiết kế kỹ thuật] |
| Resource Feasibility | [Khả thi / Cần đánh giá thêm / Không khả thi] | [VD: team size, budget] |
| Legal/Compliance | [OK / Rủi ro tiềm ẩn / Không OK] | [VD: GDPR, data residency] |

### 5.2 Risk Assessment

| Rủi ro | Mức độ | Mitigation |
| :--- | :--- | :--- |
| [Rủi ro 1] | [Cao / Trung bình / Thấp] | [Cách xử lý cụ thể] |
| [Rủi ro 2] | [Cao / Trung bình / Thấp] | [Cách xử lý cụ thể] |
| [Rủi ro 3] | [Cao / Trung bình / Thấp] | [Cách xử lý cụ thể] |

---

## 6. Prioritization Matrix

### 6.1 Impact/Effort Matrix

```text
        Effort
        Cao        Thấp
Impact  ┌─────────┬─────────┐
Cao     │  ①      │  ②     │   ← Ưu tiên cao
        ├─────────┼─────────┤
Thấp    │  ③      │  ④     │
        └─────────┴─────────┘
```

| Vùng | Phương án | Hành động |
| :--- | :--- | :--- |
| ① Impact Cao, Effort Cao | [Phương án nào] | Chờ nguồn lực hoặc chia nhỏ |
| ② Impact Cao, Effort Thấp | [Phương án nào] | **Ưu tiên cao — làm ngay** |
| ③ Impact Thấp, Effort Cao | [Phương án nào] | Tránh hoặc từ chối |
| ④ Impact Thấp, Effort Thấp | [Phương án nào] | Hạng thấp |

### 6.2 Go/No-Go Recommendation

| Quyết định | Ghi chú |
| :--- | :--- |
| [Go / No-Go / Conditional Go] | [Lý do + điều kiện] |

---

## 7. PRD Kickoff Package

*[6 thông tin bắt buộc làm đầu vào cho cc-prd-writer]*

1. **Tên tính năng:** [Tên chính xác]
2. **Mục đích sản phẩm:** [Vấn đề cần giải quyết, ai gặp]
3. **Đối tượng sử dụng chính:** [Nhóm người dùng cốt lõi]
4. **Phạm vi trong (In-scope):** [Chức năng PHẢI có trong lần phát hành này]
5. **Phạm vi ngoài (Out-of-scope):** [Chức năng KHÔNG thuộc phiên bản này]
6. **Ràng buộc nghiệp vụ:** [Quy định, quy trình, chính sách ảnh hưởng]

> **Bước tiếp theo:** Dùng `cc-prd-writer` để viết PRD hoàn chỉnh từ 6 inputs trên.

---

## Anti-Patterns

| ❌ Sai | ✅ Đúng |
| :--- | :--- |
| Nhảy thẳng sang giải pháp mà chưa định nghĩa rõ vấn đề | Viết Problem Statement rõ ràng trước |
| Không xác định stakeholder → thông tin không đúng người | Lập Stakeholder Map với Influence/Interest Grid |
| Bỏ qua giả định → discovery dựa trên assumption sai | Đánh dấu `[GIẢ ĐỊNH: ...]` rõ ràng |
| Mô tả solution spec trong discovery | Chỉ nêu phương án nghiệp vụ, không mô tả triển khai |
| Không có Go/No-Go | Đưa ra recommendation rõ ràng |
| Không có baseline metrics | Xác định chỉ số hiện tại để đo lường success |
| Tự suy diễn khi thiếu thông tin | Đặt câu hỏi hoặc đánh dấu [GIẢ ĐỊNH] |
| Không đóng gói PRD Kickoff Package | Hoàn thành 6 inputs cho cc-prd-writer |

## Tự kiểm tra chất lượng

Trước khi trình bày kết quả, tự kiểm tra theo [quality-checklist-discovery.md](./checklists/quality-checklist-discovery.md):

- [ ] Problem Statement rõ ràng (ai gặp, vấn đề gì, hậu quả)?
- [ ] Pain Point có đánh giá severity / frequency / scope?
- [ ] Có baseline metrics?
- [ ] Stakeholder Map đầy đủ (identification + grid + info needs)?
- [ ] Business Value được mô tả (định lượng nếu có)?
- [ ] Assumptions được đánh dấu `[GIẢ ĐỊNH]`?
- [ ] Có tối thiểu 2 phương án với trade-off?
- [ ] Có khuyến nghị phương án?
- [ ] Feasibility (Technical / Resource / Legal) được đánh giá?
- [ ] Top 3 risks có mitigation cụ thể?
- [ ] Impact/Effort matrix có?
- [ ] Go/No-Go rõ ràng?
- [ ] Đủ 6 inputs cho cc-prd-writer?
- [ ] Không có chi tiết triển khai kỹ thuật?
- [ ] Không có giả định ngầm chưa được đánh dấu?

Đạt ≥ 13/15 để bàn giao.

## Tài liệu tham khảo

- [discovery-template.md](./references/discovery-template.md) — Biểu mẫu Discovery Report đầy đủ.
- [stakeholder-map-template.md](./references/stakeholder-map-template.md) — Template Influence/Interest Grid.
- [opportunity-assessment-template.md](./references/opportunity-assessment-template.md) — Template đánh giá cơ hội kinh doanh.
- [quality-checklist-discovery.md](./checklists/quality-checklist-discovery.md) — Checklist 15 điểm tự đánh giá.
- **CHUỖI KẾ TIẾP:** `cc-prd-writer` — dùng 6 inputs từ PRD Kickoff Package để viết PRD hoàn chỉnh.
