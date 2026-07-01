# Stakeholder Map Template

Template để lập bản đồ stakeholder cho Product Discovery.

---

## 1. Stakeholder Identification

*[Liệt kê tất cả người/có liên quan đến vấn đề đang khám phá. Đừng bỏ sót ai.]*

| # | Stakeholder | Vai trò | Mô tả / Bộ phận | Mối quan tâm chính |
| :--- | :--- | :--- | :--- | :--- |
| 1 | [VD: Nguyễn Văn A] | End User | Kế toán viên, Khách hàng SME | Giảm thời gian xử lý hóa đơn sai |
| 2 | [VD: Trần Thị B] | Supervisor | Quản lý kế toán, Khách hàng SME | Tăng độ chính xác báo cáo thuế |
| 3 | [VD: Lê Minh C] | Sponsor | Product Owner | ROI của tính năng, timeline |
| 4 | [VD: Phòng Compliance] | Regulator | Bộ phận Compliance nội bộ | Tuân thủ GTGT, audit trail |
| 5 | [VD: Khách hàng tiềm năng] | Market | SME chưa là khách hàng | Đáp ứng nhu cầu quản lý hóa đơn |

### Vai trò thường gặp

| Mã | Vai trò | Định nghĩa |
| :--- | :--- | :--- |
| EU | End User | Người trực tiếp sử dụng tính năng |
| SU | Supervisor | Người giám sát / quản lý end user |
| SP | Sponsor | Người chi trả / quyết định đầu tư |
| RE | Regulator | Người/đơn vị kiểm soát tuân thủ |
| MK | Market | Khách hàng tiềm năng / thị trường |
| TE | Technical | Đội ngũ kỹ thuật / infrastructure |
| DE | Decision Maker | Người có quyền phê duyệt cuối cùng |

---

## 2. Influence/Interest Grid

*[Phân loại mỗi stakeholder vào đúng ô. Mục tiêu: hiểu ai cần được engage nhiều nhất.]*

```
                        Quan tâm (Interest)
                   Cao           Thấp
              ┌───────────┬───────────┐
  Ảnh        │           │           │
  hưởng      │    A      │     B     │
  (Influence) │  (Manage  │  (Monitor)│
  Cao        │  Closely) │           │
              ├───────────┼───────────┤
  Ảnh        │           │           │
  hưởng      │    C      │     D     │
  Thấp       │   (Keep   │  (Minimal │
              │  Informed)│   Effort) │
              └───────────┴───────────┘
```

| Vùng | Chiến lược engagement | Stakeholder trong vùng |
| :--- | :--- | :--- |
| **A — Manage Closely** (Ảnh hưởng cao × Quan tâm cao) | Engage chủ động, báo cáo thường xuyên, tham vấn quyết định | [VD: Sponsor, Supervisor] |
| **B — Monitor** (Ảnh hưởng cao × Quan tâm thấp) | Giữ informed nhưng không over-engage. Chủ động report khi cần. | [VD: CFO, CTO] |
| **C — Keep Informed** (Ảnh hưởng thấp × Quan tâm cao) | Cập nhật thường xuyên, lắng nghe feedback, cho cảm giác được đóng góp | [VD: End Users] |
| **D — Minimal Effort** (Ảnh hưởng thấp × Quan tâm thấp) | Monitor, react only khi có thay đổi ảnh hưởng | [VD: Khách hàng không liên quan] |

### Điền stakeholder vào grid

| | Quan tâm cao | Quan tâm thấp |
| :--- | :--- | :--- |
| **Ảnh hưởng cao** | [VD: Product Owner, Quản lý kế toán] | [VD: CFO, CTO] |
| **Ảnh hưởng thấp** | [VD: Kế toán viên, Compliance] | [VD: Khách hàng không phải SME] |

---

## 3. Information Needs

*[Mỗi stakeholder cần thông tin gì từ discovery? Định dạng nào phù hợp? Bao lâu một lần?]*

| Stakeholder | Thông tin cần | Mức độ chi tiết | Định dạng | Tần suất |
| :--- | :--- | :--- | :--- | :--- |
| [VD: Product Owner] | Problem + ROI + Recommendation | Cao | Slide + 1-pager | Hàng tuần |
| [VD: Quản lý kế toán] | Problem + Impact metrics | Trung bình | Demo | 2 lần/sprint |
| [VD: Kế toán viên] | Problem Statement | Thấp | Report | 1 lần |
| [VD: Compliance] | Ràng buộc pháp lý + Risk | Cao | Report chi tiết | 1 lần |

---

## 4. Engagement Plan (tùy chọn)

*[Nếu discovery cần nhiều stakeholder feedback, lập kế hoạch thu thập.]*

| Hoạt động | Stakeholder | Phương pháp | Thời gian |
| :--- | :--- | :--- | :--- |
| [VD: User interview] | [VD: Kế toán viên SME] | [VD: 30 phút, 5 người] | [VD: Week 1] |
| [VD: Stakeholder workshop] | [VD: PO + Quản lý kế toán] | [VD: 1 giờ, hybrid] | [VD: Week 2] |
| [VD: Survey] | [VD: 50 khách hàng SME] | [VD: Google Form, 5 câu] | [VD: Week 1-2] |
