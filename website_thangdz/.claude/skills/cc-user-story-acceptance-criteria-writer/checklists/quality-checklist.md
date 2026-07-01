# Bảng kiểm tra chất lượng (Quality Checklist) — ProjectOS

> **Mục đích:** Danh sách kiểm tra **bổ sung**, dùng SAU khi đã hoàn thành User Story theo template.
>
> **Nguyên tắc:** Checklist này chỉ chứa nội dung bổ sung ngoài những gì đã có trong [user-story-acceptance-criteria-template.md](../templates/user-story-acceptance-criteria-template.md) (Phần 1 worked example + Phần 2 biểu mẫu trống).
>
> **Quy tắc triage khi fail:** Mỗi mục fail = hành động cụ thể (sửa ngay / hỏi PO / tạo Spike).

---

## Triage — Phân loại mức độ ưu tiên

| Mức độ | Ký hiệu | Hành động | Ví dụ |
| :--- | :--- | :--- | :--- |
| **Bắt buộc đạt** | 🚨 | Sửa NGAY trước khi xuất kết quả | So that trống, không có AC nào, As a = "user" |
| **Nên đạt** | ⚠️ | Sửa hoặc ghi nhận lý do không sửa, PO xác nhận | MoSCoW không rõ ràng, Metadata thiếu Estimate |
| **Tốt nên có** | 💡 | Ghi chú lại nếu muốn cải thiện | Tester muốn thêm AC thứ 4, Dev muốn bổ sung DoD |

---

## 🚨 Phần A: User Story — Mục bắt buộc đạt (🚨)

> Đây là các mục **đã có hướng dẫn inline trong template**, nhưng cần kiểm tra lại không được phép fail.

- [ ] **🚨 As a không dùng từ "user" / "người dùng" chung chung.**
  - Fail → Sửa ngay: bổ sung vai trò + trạng thái cụ thể.
- [ ] **🚨 So that không trống và không lặp lại phần I want to.**
  - Fail → Sửa ngay: viết lại So that hướng vào giá trị kinh doanh.
- [ ] **🚨 Có ít nhất 1 tiêu chí nghiệm thu (AC) đi kèm.**
  - Fail → Sửa ngay: viết tối thiểu 3 AC (Happy + Edge + Negative).
- [ ] **🚨 Tiêu đề US không chứa liên từ "VÀ" (AND).**
  - Fail → Sửa ngay: tách thành 2 US riêng.

---

## ⚠️ Phần B: User Story — Mục nên đạt (⚠️)

> Các mục này nếu fail cần **ghi nhận lý do hoặc hỏi PO** trước khi xuất kết quả.

### INVEST Compliance

- [ ] **⚠️ I — Independent:** Câu chuyện có thể phát triển và kiểm thử độc lập không?
  - Fail → Ghi nhận dependency; đánh dấu ⚠️ trong bảng INVEST.
- [ ] **⚠️ N — Negotiable:** Có chi tiết kỹ thuật cứng nhắc (API, DB schema, framework) không?
  - Fail → Lược bỏ chi tiết kỹ thuật; tập trung What, không How.
- [ ] **⚠️ V — Valuable:** So that mô tả giá trị kinh doanh rõ ràng, không phải tính năng kỹ thuật?
  - Fail → Viết lại So that hướng outcome.
- [ ] **⚠️ E — Estimable:** Lập trình viên có đủ thông tin để ước lượng không?
  - Fail → Bổ sung ngữ cảnh; cân nhắc tạo Spike story trước.
- [ ] **⚠️ S — Small:** Ước lượng effort vượt quá 5 ngày làm việc không?
  - Fail → Chia nhỏ: tách CRUD, tách Happy path trước, Edge/Error triển khai sau.
- [ ] **⚠️ T — Testable:** Tiêu chí nghiệm thu có số liệu cụ thể để viết test case không?
  - Fail → Bổ sung số liệu đo lường vào mỗi Then.

### Metadata & Format

- [ ] **⚠️ MoSCoW** được chọn có giải thích rõ lý do (không phải mặc định "Must")?
  - Fail → Ghi nhận tại sao chọn mức ưu tiên đó.
- [ ] **⚠️ Sự phụ thuộc (Dependencies)** được liệt kê rõ ràng?
  - Fail → Điền tên US phụ thuộc hoặc ghi "Không có".
- [ ] **⚠️ DoD** có ít nhất 3 mục kỹ thuật cụ thể?
  - Fail → Bổ sung checklist kỹ thuật (xem Phần 2 biểu mẫu trống trong user-story-acceptance-criteria-template.md).

---

## 🚨 Phần C: Acceptance Criteria — Mục bắt buộc đạt (🚨)

> Đây là các mục **đã có hướng dẫn inline trong Phần 1 worked example của user-story-acceptance-criteria-template.md**.

- [ ] **🚨 Mỗi AC có đủ Given + When + Then.**
  - Fail → Sửa ngay: bổ sung phần còn thiếu.
- [ ] **🚨 When chỉ có MỘT hành động duy nhất.**
  - Fail → Sửa ngay: tách AC nếu When chứa nhiều hành động.
- [ ] **🚨 Không có từ mơ hồ: "nhanh", "đẹp", "thân thiện", "phù hợp".**
  - Fail → Sửa ngay: thay bằng số liệu đo lường cụ thể.
- [ ] **🚨 Không chứa chi tiết kỹ thuật (API, database, framework).**
  - Fail → Sửa ngay: viết lại mô tả nghiệp vụ, không phải implementation.
- [ ] **🚨 Thông báo lỗi có nội dung CỤ THỂ, không viết "thông báo lỗi" chung.**
  - Fail → Sửa ngay: viết nội dung thông báo thực tế (ví dụ: "Dự án với tên này đã tồn tại").

---

## ⚠️ Phần D: Acceptance Criteria — Mục nên đạt (⚠️)

- [ ] **⚠️ Số lượng And trong mỗi AC ≤ 2. Nếu > 2 → tách AC.**
  - Fail → Ghi nhận và cân nhắc tách.
- [ ] **⚠️ Nếu AC mô tả ngoại lệ, dùng `But` thay vì `And`.**
  - Fail → Sửa And thành But.
- [ ] **⚠️ Given dùng dữ liệu cụ thể (tên người, ngày tháng) thay vì generic.**
  - Fail → Ghi nhận: dữ liệu mẫu cụ thể giúp Tester dễ viết test case.
- [ ] **⚠️ Tổng số AC cho US này ≤ 7–8. Nếu vượt → phân rã US.**
  - Fail → Ghi nhận; đề xuất tách thêm US.

---

## 💡 Phần E: Khả năng sinh Test Case (💡)

- [ ] **💡 Từ mỗi AC, có thể sinh tối thiểu 3 Test Case: hợp lệ, ranh giới, không hợp lệ.**
  - Ghi chú: Đây là dấu hiệu AC đủ rõ để QA viết kịch bản kiểm thử.
- [ ] **💡 Từ mỗi US, số lượng Test Case ước tính ≥ 5.**
  - Ghi chú: Dùng làm căn cứ ước lượng khối lượng kiểm thử cho Sprint.

---

## ⚠️ Phần F: Sanity Check — 5 câu hỏi cuối cùng

> Đọc lại toàn bộ US + AC trước khi bàn giao. Trả lời đúng hết → sẵn sàng xuất. Có câu nào không trả lời được → quay lại sửa.

| # | Câu hỏi | Pass? |
| :--- | :--- | :--- |
| 1 | **Stakeholder hiểu?** — PO không có chuyên môn kỹ thuật đọc có hiểu nghiệp vụ không? | [✅/❌] |
| 2 | **Dev ước lượng được?** — Lập trình viên ít kinh nghiệm đọc có tự tin estimate không? | [✅/❌] |
| 3 | **Tester viết được test case?** — Có đủ số liệu và dữ liệu cụ thể để viết kịch bản kiểm thử không? | [✅/❌] |
| 4 | **Không trùng lặp?** — US này có chồng chéo với US khác trong Backlog không? | [✅/❌] |
| 5 | **So that thực sự Valuable?** — Hay chỉ diễn đạt lại phần I want? | [✅/❌] |

---

## 🚨 Red Flags — Dấu hiệu cảnh báo cần sửa ngay

| Red Flag | Mức | Hành động |
| :--- | :--- | :--- |
| Mô tả US dài hơn **200 từ** | 🚨 | Rút ngắn; chuyển chi tiết kỹ thuật sang thiết kế hệ thống. |
| Tiêu chí nghiệm thu dài hơn **10 dòng** | 🚨 | Tách AC; đang gộp nhiều kịch bản. |
| Không có AC đi kèm | 🚨 | Bổ sung ngay tối thiểu 3 AC. |
| So that trống hoặc trùng I want to | 🚨 | Viết lại So that hướng giá trị kinh doanh. |
| As a = "user" / "everyone" | 🚨 | Sửa ngay: thêm vai trò + trạng thái cụ thể. |
| Tiêu đề chứa "**VÀ**" | 🚨 | Tách thành 2 US riêng. |
| AC dùng "v.v.", "vân vân" | 🚨 | Mô tả rõ ràng từng trường hợp cụ thể. |
| Ước lượng effort > **5 ngày** | ⚠️ | Chia nhỏ US theo quy tắc phân rã trong skill.md. |
| Metadata trạng thái AC = "Draft" khi xuất bàn giao | ⚠️ | Chuyển sang "Approved" sau khi PO xác nhận. |
| Số AC > **8 kịch bản** cho 1 US | ⚠️ | Phân rã US; tách theo CRUD hoặc theo Persona. |
