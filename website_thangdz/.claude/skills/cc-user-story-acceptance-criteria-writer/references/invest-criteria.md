# Tiêu chí INVEST — Giải thích chi tiết và Hướng dẫn thực hành

> **Vai trò:** Tài liệu **tham khảo chuyên sâu**, giải thích lý thuyết và hướng dẫn thực hành cho 06 tiêu chí INVEST.
>
> **Vị trí trong bộ tài liệu:** Tài liệu này bổ sung cho [user-story-template.md](../templates/user-story-template.md) — template cung cấp **mẫu điền**, tài liệu này cung cấp **giải thích tại sao** và **cách xử lý khi vi phạm**.
>
> **Đối tượng đọc:** BA (viết US), PO (review US), Developer (estimate US), QA (xác nhận testable).

---

## INVEST Quick Card — Tra cứu nhanh

| Tiêu chí | Câu hỏi nhanh | Vi phạm phổ biến nhất | Hành động khi vi phạm |
| :--- | :--- | :--- | :--- |
| **I**ndependent | Phát triển/kiểm thử độc lập được không? | Phụ thuộc US khác | Dùng mock data; tách/chia US |
| **N**egotiable | Còn chỗ thương lượng How không? | Over-specify (UI pixel, API cụ thể) | Bỏ chi tiết kỹ thuật; dùng wireframe |
| **V**alue | Stakeholder nhận được gì? | So that trùng I want, hoặc bỏ trống | Viết lại So that hướng business outcome |
| **E**stimable | Dev đủ thông tin để estimate? | Yêu cầu mơ hồ, rủi ro cao | Tạo Spike; bổ sung ngữ cảnh |
| **S**mall | Hoàn thành trong 1 Sprint được không? | Tiêu đề có "VÀ"; AC > 8 kịch bản | Tách theo CRUD / Persona / Workflow |
| **T**estable | Viết được test case từ AC? | AC dùng từ mơ hồ, không có số liệu | Bổ sung GWT với dữ liệu cụ thể |

---

## I — Independent (Độc lập)

### Định nghĩa

US phải có thể phát triển, kiểm thử và triển khai độc lập. Tránh phụ thuộc cứng nhắc giữa các US.

### Tại sao quan trọng?

- Cho phép sắp xếp **độ ưu tiên linh hoạt** trong Backlog.
- Tránh **blocker** khi 1 US bị chậm.
- Dễ dàng **phân chia công việc** cho team.

### Dấu hiệu vi phạm (I)

- US-B chỉ thực hiện được SAU khi US-A hoàn thành.
- Phải merge nhiều US cùng lúc mới triển khai được.
- Kiểm thử US bắt buộc phải dùng dữ liệu từ US khác.

### Hướng xử lý (I)

| Tình huống | Hướng xử lý |
| :--- | :--- |
| Phụ thuộc nhỏ, cùng team | Gộp thành 1 US lớn hơn (nếu quy mô cho phép) |
| Phụ thuộc lớn, công nghệ mới | Tách spike story nghiên cứu trước, ưu tiên thực hiện sớm |
| Kiểm thử bị phụ thuộc | Dùng mock data / stub để test độc lập |

### Ví dụ (I)

- ❌ **Vi phạm:** US-1: Tạo tài khoản quản lý dự án. US-2: Tạo dự án mới (chỉ test được sau US-1).
- ✅ **Đạt chuẩn:** US-1: Tạo tài khoản quản lý dự án (test độc lập với dữ liệu mẫu trong môi trường test). US-2: Tạo dự án mới (test độc lập với tài khoản đã chuẩn bị sẵn).

---

## N — Negotiable (Thương lượng)

### Định nghĩa

US là **"lời mời thảo luận"**, không phải hợp đồng kỹ thuật. Chi tiết triển khai được làm rõ trong Refinement và quá trình phát triển.

> **Lưu ý thực tế:** BA viết US dựa trên yêu cầu nghiệp vụ, nên US gần như requirement. "Negotiable" ở đây không có nghĩa US có thể bị bỏ — mà là **cách thức triển khai (How) vẫn còn mở**, không bị khóa bởi chi tiết kỹ thuật quá sớm.

### Tại sao quan trọng?

- Tận dụng chuyên môn **Dev + QA** để tìm phương án tối ưu.
- Linh hoạt khi xuất hiện ràng buộc mới.
- Tránh **over-specify** quá sớm.

### Dấu hiệu vi phạm (N)

- Mô tả tọa độ pixel giao diện người dùng trong US.
- Ràng buộc công nghệ cụ thể (ví dụ: "bắt buộc dùng Redis", "bắt buộc dùng React").
- Mô tả giải thuật và cấu trúc mã nguồn trong nội dung US.

### Hướng xử lý (N)

- Tập trung **What** (cái gì) + **Why** (tại sao), tránh **How** (làm thế nào).
- Chi tiết kỹ thuật → chuyển sang tài liệu thiết kế hệ thống.
- Dùng **wireframe** thay vì mockup chi tiết ở giai đoạn viết US.

### Ví dụ (N)

- ❌ **Vi phạm:** *"I want to tạo dự án với các trường lưu trong bảng MySQL với chỉ mục index trên cột project_code để tăng tốc độ truy vấn..."*
- ✅ **Đạt chuẩn:** *"I want to tạo dự án mới so that tôi có thể bắt đầu phân công công việc cho nhóm ngay lập tức."* (Cấu trúc DB, index do Dev quyết định).

---

## V — Valuable (Giá trị)

### Định nghĩa

Mỗi US phải mang lại giá trị rõ ràng cho **người dùng cuối**, **doanh nghiệp**, hoặc **cả hai**. Không tạo US vì lý do kỹ thuật thuần túy.

### Tại sao quan trọng?

- Đảm bảo **ROI** — mọi nỗ lực đều có hiệu quả thực tế.
- Giúp **PO** sắp xếp thứ tự ưu tiên chính xác.
- Giúp **Stakeholder** hiểu lý do cần tính năng này.

### Dấu hiệu vi phạm (V)

- Phần **So that** bỏ trống hoặc lặp lại phần **I want to**.
- US chỉ có giá trị với Dev (ví dụ: nâng cấp thư viện) mà không mang lại thay đổi nào cho người dùng.

### Hướng xử lý (V)

- So that viết theo **kết quả kinh doanh đo lường được** (ví dụ: "giảm 30% thời gian chờ của khách hàng").
- Chuyển nhiệm vụ kỹ thuật thành US mang giá trị nghiệp vụ: thay vì "nâng cấp thư viện", viết "tối ưu tốc độ tải biểu đồ Gantt < 2 giây".

### Ví dụ (V)

- ❌ **Vi phạm:** *"As a developer, I want to nâng cấp thư viện biểu đồ từ v2 lên v4 so that chúng tôi sử dụng phiên bản mới nhất."*
- ✅ **Đạt chuẩn:** *"As a quản lý dự án, I want to xem biểu đồ Gantt trong vòng 2 giây so that tôi đánh giá tiến độ mà không phải chờ khi kết nối chậm."*

---

## E — Estimable (Ước lượng được)

### Định nghĩa

Đội ngũ phát triển có đủ thông tin để đưa ra ước lượng tương đối về nỗ lực và thời gian hoàn thành.

### Tại sao quan trọng?

- Hỗ trợ **Sprint Planning** chính xác.
- Phát hiện sớm US quá lớn hoặc quá mơ hồ.

### Dấu hiệu vi phạm (E)

- Dev phản hồi "không biết bao giờ xong, phải nghiên cứu thêm".
- Ước lượng chênh lệch quá lớn giữa các thành viên (vượt quá 3 lần).
- Quá nhiều rủi ro kỹ thuật chưa xác định.

### Phương pháp ước lượng phổ biến

| Phương pháp | Mô tả | Phù hợp khi |
| :--- | :--- | :--- |
| **Planning Poker** | Team dùng thẻ Fibonacci để vote số điểm, thảo luận khi chênh lệch lớn | Team đã có velocity ổn định |
| **T-shirt Sizing** | Phân loại XS / S / M / L / XL | Sprint đầu tiên, chưa có historical data |
| **Story Points** | Điểm tương đối dựa trên effort, phức tạp, rủi ro | Team có backlog để so sánh tương đối |
| **Spike Story** | US nghiên cứu độc lập để giảm uncertainty trước khi estimate US chính | Công nghệ mới, yêu cầu mơ hồ, rủi ro cao |

### Hướng xử lý khi không estimate được

1. **Bước 1 — Tạo Spike:** US nghiên cứu độc lập (thời gian cố định: 1-3 ngày) để giảm uncertainty.
2. **Bước 2 — Bổ sung ngữ cảnh:** Thêm ràng buộc nghiệp vụ, tài liệu tham khảo, wireframe.
3. **Bước 3 — Đánh dấu ⚠️ trong bảng INVEST:** Không chuyển vào Sprint cho đến khi estimate được.

### Ví dụ (E)

- ❌ **Vi phạm:** *"I want to AI phân tích rủi ro dự án và gợi ý phương án xử lý."* (Không rõ AI nào, dữ liệu đầu vào, độ chính xác mong muốn.)
- ✅ **Đạt chuẩn (Phân rã):** Spike: *"Nghiên cứu giải pháp phân tích rủi ro tự động cho dự án 50 thành viên, đầu ra là Technical proposal trong 3 ngày."* → US: *"Triển khai hệ thống phân tích rủi ro dựa trên Technical proposal đã phê duyệt."*

---

## S — Small (Nhỏ gọn)

### Định nghĩa

US phải đủ nhỏ để hoàn thành trong 1 Sprint, thông thường **1-3 ngày công** của 1 lập trình viên.

### Tại sao quan trọng?

- Giảm thiểu **rủi ro khi lập kế hoạch**.
- Tăng tốc **feedback loop** từ khách hàng/người dùng.
- Dễ **kiểm thử, tích hợp và rollback** khi có lỗi.

### Dấu hiệu vi phạm (S)

- Effort ước lượng **vượt quá 5 ngày làm việc**.
- Số lượng AC **vượt quá 7-8 kịch bản**.
- Tiêu đề chứa **"VÀ (AND)"** — đang gộp 2+ US.
- US bao gồm **toàn bộ CRUD**.

### Quy tắc phân rã (5 chiến lược)

> ⚠️ **Khi nào cần phân rã?** Khi effort > 5 ngày HOẶC AC > 8 kịch bản.

| Chiến lược | Mô tả | Khi nào dùng |
| :--- | :--- | :--- |
| **1. Theo CRUD** | Tách Create / Read / Update / Delete thành US riêng | Khi nghiệp vụ có đủ 4 thao tác |
| **2. Theo Persona** | Tách theo vai trò: Quản lý dự án / Thành viên / Khách hàng | Khi mỗi Persona có luồng nghiệp vụ khác nhau |
| **3. Theo cấu trúc dữ liệu** | Xử lý dữ liệu văn bản trước, bổ sung file/biểu đồ sau | Khi có nhiều loại dữ liệu đầu vào |
| **4. Theo quy tắc nghiệp vụ** | Happy path trước, Validation + Permission sau | Khi Edge case/Error chiếm effort lớn |
| **5. Theo Workflow** | Tách theo bước: Tạo → Phân công → Cập nhật → Báo cáo | Khi nghiệp vụ là quy trình nhiều bước |

### Ví dụ (S)

- ❌ **Vi phạm:** *"I want to quản lý thông tin dự án (xem, sửa tên, thay đổi ngày, phân công thành viên, yêu cầu đóng dự án)."*
- ✅ **Đạt chuẩn (5 US từ 1 US lớn):**

  - US-1: Xem thông tin dự án.
  - US-2: Cập nhật tên dự án.
  - US-3: Thay đổi ngày bắt đầu/kết thúc.
  - US-4: Phân công thành viên vào dự án.
  - US-5: Yêu cầu đóng dự án.

---

## T — Testable (Kiểm thử được)

### Định nghĩa

US phải có AC rõ ràng, cụ thể, đo lường được để QA viết test case và nghiệm thu tính năng.

### Tại sao quan trọng?

- Tránh tranh cãi về **Definition of Done** giữa các bộ phận.
- Tạo điều kiện cho **kiểm thử tự động (Automation test)**.

### Dấu hiệu vi phạm (T)

- AC dùng từ mơ hồ: "nhanh", "đẹp", "thân thiện", "dễ sử dụng".
- Không có AC, chỉ có mô tả chung chung.

### Hướng xử lý — 3 điều kiện để testable

| Điều kiện | Yêu cầu |
| :--- | :--- |
| **AC rõ ràng** | Mỗi AC có Given-When-Then đầy đủ, dữ liệu cụ thể, số liệu đo lường |
| **Môi trường test sẵn sàng** | Có môi trường test; có quyền truy cập; có test data |
| **Tiêu chí đo lường được** | Kết quả kiểm thử xác định được pass/fail, không mơ hồ |

> **Lưu ý:** Testability không chỉ phụ thuộc vào chất lượng AC. Nếu môi trường test chưa có, test data chưa sẵn → ghi nhận trong Ghi chú (Notes) của US.

### Ví dụ (T)

- ❌ **Vi phạm:** *"Tiêu chí nghiệm thu: Hệ thống phải phản hồi nhanh và hiển thị thông báo lỗi thân thiện khi thành viên nhóm vượt deadline."*
- ✅ **Đạt chuẩn:**

  - Given thành viên nhóm có công việc deadline 15/06 và hệ thống phát hiện chưa hoàn thành sau 23:59 ngày 15/06.
  - When thành viên nhóm nhấn nút "Cập nhật trạng thái".
  - Then hệ thống gửi thông báo nhắc nhở trong vòng 5 phút.
  - And ghi nhận trạng thái "Quá hạn" trên biểu đồ Gantt.

---

## Vai trò — Mỗi người đọc cần gì?

| Vai trò | Tiêu chí ưu tiên | Mục đích đọc |
| :--- | :--- | :--- |
| **BA (viết US)** | N + V + T | Đảm bảo US đủ Negotiable, Value rõ, Testable |
| **PO (review US)** | V + S | Đảm bảo giá trị nghiệp vụ đúng, US đủ nhỏ để estimate |
| **Developer (estimate)** | E + S | Đảm bảo đủ thông tin để estimate, biết khi nào cần Spike |
| **QA (xác nhận)** | T + I | Đảm bảo test được, không bị phụ thuộc US khác |

---

## Tài liệu tham khảo

- Bill Wake (2003) — *"INVEST in Good Stories, and SMART Tasks"*
- Mike Cohn — *"User Stories Applied"*
- Atlassian Agile Coach — *User Story Best Practices*
