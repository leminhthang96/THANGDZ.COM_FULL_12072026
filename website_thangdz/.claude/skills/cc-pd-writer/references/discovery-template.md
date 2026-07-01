# PRODUCT DISCOVERY REPORT — Template

**Phiên bản:** 1.0
**Hướng dẫn sử dụng:** Copy toàn bộ file này, điền nội dung theo từng section. Các phần in nghiêng là gợi ý, không bắt buộc.

---

## PRODUCT DISCOVERY REPORT

### [Tên tính năng / Vấn đề cần khám phá]

**Phiên bản:** X.Y
**Ngày:** YYYY-MM-DD
**Tác giả:** [Họ và tên]
**Chế độ:** [A Viết mới / B Refine / C Augment]
**Tài liệu tham chiếu:** [BRD / Email / Meeting notes, nếu có]

---

## 1. Problem Framing

### 1.1 Problem Statement

*[1-2 câu. Trả lời: Vấn đề là gì? Ai gặp? Hậu quả là gì?]*

VD: "Khách hàng SME không thể tự quản lý hóa đơn GTGT trên hệ thống. Mỗi tháng, đội kế toán phải xử lý thủ công trung bình 200 hóa đơn sai thông tin, gây chậm trễ quyết toán thuế 2-3 tuần."

### 1.2 Pain Point Mapping

*[Liệt kê tất cả pain point liên quan. Đánh giá mức độ cho từng pain point.]*

| Pain Point | Mức độ nghiêm trọng | Tần suất | Phạm vi ảnh hưởng |
| :--- | :--- | :--- | :--- |
| [Mô tả pain point 1] | [Cao / Trung bình / Thấp] | [Thường xuyên / Đôi khi / Hiếm] | [Toàn hệ thống / Nhóm / Cá nhân] |
| [Pain point 2] | [Cao / Trung bình / Thấp] | [Thường xuyên / Đôi khi / Hiếm] | [Toàn hệ thống / Nhóm / Cá nhân] |

### 1.3 Baseline Metrics

*[Chỉ số hiện tại nào sẽ được cải thiện sau khi giải quyết vấn đề? Càng định lượng càng tốt.]*

| Chỉ số | Giá trị hiện tại | Mục tiêu (ước lượng) | Cách đo |
| :--- | :--- | :--- | :--- |
| [VD: Thời gian xử lý hóa đơn] | [VD: 5 phút/hóa đơn] | [VD: < 30 giây/hóa đơn] | [Tool/logs] |
| [VD: Tỷ lệ hóa đơn sai] | [VD: 15%] | [VD: < 2%] | [System report] |

---

## 2. Stakeholder Map

### 2.1 Stakeholder Identification

*[Ai liên quan đến vấn đề này? Liệt kê đầy đủ: tên nhóm, vai trò, mối quan tâm chính.]*

| Stakeholder | Vai trò | Mối quan tâm chính |
| :--- | :--- | :--- |
| [VD: Kế toán viên SME] | End User | Giảm thời gian xử lý hóa đơn sai |
| [VD: Quản lý kế toán] | Supervisor | Tăng độ chính xác báo cáo thuế |
| [VD: Product Owner] | Sponsor | ROI của tính năng mới |
| [VD: Compliance] | Regulator | Đảm bảo tuân thủ GTGT |

### 2.2 Influence/Interest Grid

*[Phân loại stakeholder theo mức ảnh hưởng (có quyền quyết định) và mức quan tâm (bị ảnh hưởng)]*

| | Quan tâm cao | Quan tâm thấp |
| :--- | :--- | :--- |
| **Ảnh hưởng cao** | [VD: Product Owner, Quản lý kế toán] | [VD: CFO (ít quan tâm nhưng approve budget)] |
| **Ảnh hưởng thấp** | [VD: Kế toán viên] | [VD: Khách hàng không phải SME] |

### 2.3 Information Needs

*[Mỗi stakeholder cần thông tin gì từ discovery report? Định dạng nào phù hợp?]*

| Stakeholder | Thông tin cần từ Discovery | Định dạng |
| :--- | :--- | :--- |
| [VD: Product Owner] | Problem Statement + Business Value + ROI | Slide + 1-pager |
| [VD: Kế toán viên] | Problem Statement + Baseline Metrics | Demo + Report |

---

## 3. Opportunity Assessment

### 3.1 Business Value

*[Giá trị kinh doanh mang lại. Càng định lượng càng tốt.]*

- **Định lượng:** [VD: Giảm 20% thời gian xử lý → tiết kiệm 50 giờ/tháng × 3 nhân viên]
- **Định tính:** [VD: Tăng satisfaction của khách hàng SME]

### 3.2 Market Opportunity

*[Cơ hội thị trường / khách hàng bị miss. Có thể mở rộng phạm vi?]*

[VD: 30% khách hàng SME hiện tại đã hỏi về tính năng này qua survey Q1/2026]

### 3.3 Strategic Alignment

*[Phù hợp chiến lược công ty? Liên kết với OKR/KPI nào?]*

[VD: Liên kết với OKR Q3: "Tăng retention khách hàng SME lên 15%"]

### 3.4 Assumptions

*[Các giả định cần kiểm chứng. BẮT BUỘC đánh dấu [GIẢ ĐỊNH: ...]]*

| Giả định | Rủi ro nếu sai | Cách kiểm chứng |
| :--- | :--- | :--- |
| [GIẢ ĐỊNH: 80% khách hàng SME dùng hóa đơn GTGT điện tử] | Tính năng không phù hợp với phần lớn khách hàng | Survey 50 khách hàng SME |
| [GIẢ ĐỊNH: Team dev có kinh nghiệm xử lý hóa đơn điện tử] | Cần training thêm, timeline tăng | Đánh giá kỹ năng team |

---

## 4. Business Solution Options

*[Chỉ mô tả phương án ở mức nghiệp vụ / product direction. Không mô tả chi tiết triển khai kỹ thuật — đó là việc của SRS.]*

### 4.1 Options Overview

| | Phương án A | Phương án B | Phương án C |
| :--- | :--- | :--- | :--- |
| **Tên** | [VD: Auto-validation] | [VD: Guided input] | [VD: Integration với bên thứ 3] |
| **Mô tả** | [Nghiệp vụ gì, không phải tech gì] | [Nghiệp vụ gì] | [Nghiệp vụ gì] |
| **Lợi ích chính** | [Lợi ích nghiệp vụ] | [Lợi ích nghiệp vụ] | [Lợi ích nghiệp vụ] |
| **Rủi ro chính** | [Rủi ro nghiệp vụ] | [Rủi ro nghiệp vụ] | [Rủi ro nghiệp vụ] |
| **Chi phí ước lượng** | [Cao / Trung bình / Thấp] | [Cao / Trung bình / Thấp] | [Cao / Trung bình / Thấp] |

### 4.2 Trade-off Analysis

| Tiêu chí | Phương án A | Phương án B | Phương án C |
| :--- | :--- | :--- | :--- |
| Impact | [Cao/Trung bình/Thấp] | [Cao/Trung bình/Thấp] | [Cao/Trung bình/Thấp] |
| Effort | [Cao/Trung bình/Thấp] | [Cao/Trung bình/Thấp] | [Cao/Trung bình/Thấp] |
| Time-to-value | [Nhanh/Trung bình/Chậm] | [Nhanh/Trung bình/Chậm] | [Nhanh/Trung bình/Chậm] |
| Risk | [Cao/Trung bình/Thấp] | [Cao/Trung bình/Thấp] | [Cao/Trung bình/Thấp] |

### 4.3 Recommendation

*[Khuyến nghị phương án + lý do. Nếu chưa đủ thông tin, ghi rõ cần thêm gì để quyết định.]*

[VD: Khuyến nghị Phương án A — impact cao, effort trung bình, time-to-value nhanh nhất. Cần thêm: đánh giá kỹ năng team dev trước khi confirm.]

---

## 5. Feasibility & Risk Assessment

### 5.1 Feasibility

| Tiêu chí | Đánh giá | Ghi chú |
| :--- | :--- | :--- |
| Technical Feasibility | [Khả thi / Cần đánh giá thêm / Không khả thi] | [VD: Công nghệ hiện có đủ, cần tích hợp với hệ thống GTGT] |
| Resource Feasibility | [Khả thi / Cần đánh giá thêm / Không khả thi] | [VD: Team 3 dev, 2 tháng timeline] |
| Legal/Compliance | [OK / Rủi ro tiềm ẩn / Không OK] | [VD: Tuân thủ thông tư 78/2021/TT-BTC] |

### 5.2 Risk Assessment

*[Top 3 rủi ro chính cần lưu ý trước khi đầu tư.]*

| Rủi ro | Mức độ | Mitigation |
| :--- | :--- | :--- |
| [VD: Khách hàng không adopt tính năng mới] | [Cao / Trung bình / Thấp] | [VD: User research trước khi build, beta test group] |
| [VD: Thay đổi quy định thuế GTGT giữa chừng] | [Cao / Trung bình / Thấp] | [VD: Thiết kế flexible — rule-driven không hard-coded] |
| [VD: Scope creep] | [Cao / Trung bình / Thấp] | [VD: Cố định In-scope, review với PO hàng tuần] |

---

## 6. Prioritization Matrix

### 6.1 Impact/Effort Matrix

```text
        Effort
        Cao        Thấp
Impact  ┌─────────┬─────────┐
Cao     │  [①]    │  [②]    │   ← Ưu tiên cao
        ├─────────┼─────────┤
Thấp    │  [③]    │  [④]    │
        └─────────┴─────────┘
```

| Vùng | Phương án | Hành động |
| :--- | :--- | :--- |
| ① Impact Cao, Effort Cao | [Phương án nào] | [VD: Chờ nguồn lực hoặc chia nhỏ] |
| ② Impact Cao, Effort Thấp | [Phương án nào] | **Ưu tiên cao — làm ngay** |
| ③ Impact Thấp, Effort Cao | [Phương án nào] | [VD: Tránh hoặc từ chối] |
| ④ Impact Thấp, Effort Thấp | [Phương án nào] | [VD: Hạng thấp — làm cuối cùng] |

### 6.2 Go/No-Go Recommendation

| Quyết định | Ghi chú |
| :--- | :--- |
| [Go / No-Go / Conditional Go] | [Lý do + điều kiện đi kèm. VD: Conditional Go — nếu survey xác nhận 80% KH dùng hóa đơn điện tử] |

---

## 7. PRD Kickoff Package

*[Điền đầy đủ 6 thông tin — đây là input cho cc-prd-writer]*

**1. Tên tính năng:** [Tên chính xác và ngắn gọn]

**2. Mục đích sản phẩm:** [Vấn đề cần giải quyết, ai gặp, hậu quả]

**3. Đối tượng sử dụng chính:** [Nhóm người dùng cốt lõi. VD: Kế toán viên SME, Quản lý kế toán]

**4. Phạm vi trong (In-scope):** [Chức năng PHẢI có trong lần phát hành này. VD: Auto-validation hóa đơn GTGT, thông báo lỗi real-time, báo cáo tổng hợp]

**5. Phạm vi ngoài (Out-of-scope):** [Chức năng KHÔNG thuộc phiên bản này. VD: Xử lý hóa đơn bán lẻ, tích hợp với phần mềm kế toán bên thứ 3]

**6. Ràng buộc nghiệp vụ:** [Quy định, quy trình, chính sách ảnh hưởng đến thiết kế. VD: Phải tuân thủ thông tư 78/2021/TT-BTC về hóa đơn GTGT điện tử]

---

> **Bước tiếp theo:** Dùng `cc-prd-writer` để viết PRD hoàn chỉnh từ 6 inputs trên.
