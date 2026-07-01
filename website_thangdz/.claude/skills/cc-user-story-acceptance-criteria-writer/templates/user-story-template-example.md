# Biểu mẫu Câu chuyện người dùng & Tiêu chí Nghiệm thu — ProjectOS

> **Mục đích:** File ví dụ minh họa — US "Tạo dự án" với AC Happy + Edge + Negative đã hoàn chành.
> Dùng để học cấu trúc, tham khảo cách viết, và làm mẫu khi soạn US thực tế.
>
> **Biểu mẫu trống để điền:** Xem [user-story-template-blank.md](./user-story-template-blank.md).

---

## Câu chuyện người dùng US-[MÃ_TÍNH_NĂNG]-[MÃ_SỐ]: [Tiêu đề ngắn gọn]

**As a** quản lý dự án đã được phân quyền trên ProjectOS
> ✅ *"quản lý dự án đã được phân quyền trên ProjectOS"*
> ❌ *"người dùng"*

**I want to** tạo dự án mới với thông tin đầy đủ và gửi thư mời tham gia đến các thành viên
> ✅ *"giao công việc cho thành viên cụ thể và đặt deadline"*
> ❌ *"quản lý công việc"*

**So that** các thành viên nhận được thông báo và có thể bắt đầu làm việc ngay trong ngày đầu tiên
> ✅ *"thành viên nhóm biết rõ trách nhiệm và tôi theo dõi được tiến độ"*
> ❌ *"để tôi giao công việc"* (lặp lại I want)

---

### Siêu dữ liệu (Metadata)

| Trường | Giá trị | Ghi chú |
| :--- | :--- | :--- |
| **Epic / Feature** | Quản lý dự án (Project Management) | |
| **Độ ưu tiên (MoSCoW)** | Must | Nghiệp vụ cốt lõi — không tạo dự án thì sản phẩm không dùng được |
| **Ước lượng (Estimate)** | 5 story points | |
| **Sự phụ thuộc (Dependencies)** | Không có | |
| **Giả định (Assumptions)** | Thư điện tử (email) của thành viên đã được xác minh trong hệ thống | |

---

### Tự đánh giá theo tiêu chí INVEST

| Tiêu chí | Đạt? | Ghi chú & Hướng xử lý nếu ⚠️ |
| :--- | :--- | :--- |
| **I**ndependent (Độc lập) | ✅ | Không phụ thuộc câu chuyện khác |
| **N**egotiable (Thương lượng) | ✅ | Tập trung What, không có chi tiết kỹ thuật cứng nhắc |
| **V**alue (Giá trị) | ✅ | So that hướng outcome rõ ràng |
| **E**stimable (Ước lượng) | ✅ | Nghiệp vụ đủ rõ để ước lượng |
| **S**mall (Nhỏ gọn) | ✅ | 1 câu chuyện chỉ tập trung Tạo dự án (không gộp CRUD) |
| **T**estable (Kiểm thử được) | ✅ | Có đủ 3 AC Happy + Edge + Negative |

> **Quy tắc:** Nếu bất kỳ tiêu chí nào là ⚠️ → **KHÔNG chuyển sang Sprint Planning** cho đến khi giải quyết xong.

---

### Tiêu chí nghiệm thu (Acceptance Criteria)

> **Định dạng:** Given-When-Then (Cú pháp Gherkin)
> **Yêu cầu tối thiểu:** 3 tiêu chí — Happy path + Edge case + Negative path
> **Phân biệt:** Tiêu chí nghiệp thu (AC) ≠ Kịch bản kiểm thử (Test Case) ≠ Script kiểm thử (Test Script)
>
> - **AC** mô tả hành vi nghiệp vụ → viết cho BA/PO.
> - **Test Case** sinh ra từ AC, ghi rõ input/expected result → viết cho Tester.
> - **Test Script** là code/procedure thực thi Test Case → viết cho QA Automation.

#### Quy tắc viết Given-When-Then (Gherkin)

| Thành phần | Vai trò | Quy tắc |
| :--- | :--- | :--- |
| **Given** | Tiền điều kiện — bối cảnh TRƯỚC hành động | Dùng dữ liệu CỤ THỂ: tên người, ngày tháng, số lượng thực. **Không** dùng giá trị generic như "một người dùng hợp lệ". |
| **When** | Hành động DUY NHẤT của đối tượng sử dụng | Chỉ có MỘT hành động. Nếu có nhiều hành động → tách thành 2 AC riêng. |
| **Then** | Kết quả chính — đo lường được | Có số liệu cụ thể: "trong vòng 3 giây", "tỷ lệ 80%", "gửi 3 thông báo". |
| **And** | Kết quả PHỤ mở rộng từ Then | Dùng cho kết quả bổ sung cùng nhánh. **Tối đa 2 And** trong 1 AC. Nếu cần nhiều hơn → tách AC. |
| **But** | Ngoại lệ / trường hợp NGƯỢC lại Then | Dùng khi mô tả hành vi đối lập với Then chính. |

#### Chống mẫu thiết kế (Anti-patterns)

| ❌ Sai | ✅ Đúng |
| :--- | :--- |
| `When` có nhiều hành động: "nhấn Tạo **và** nhấn Xác nhận" | Tách thành 2 AC riêng |
| `Then` dùng từ mơ hồ: "hệ thống phản hồi **nhanh**" | "hệ thống phản hồi **trong vòng 2 giây**" |
| `Given` generic: "một người dùng hợp lệ" | "Nguyễn Văn A đã đăng nhập với vai trò quản lý dự án" |
| `And` tích lũy 4+ mệnh đề → AC quá dài | AC đang gộp nhiều scenario → tách thành 2 AC |
| Dùng `And` cho ngoại lệ | Dùng `But` cho trường hợp ngược lại |
| Mô tả chi tiết UI: "nút màu xanh" | Mô tả hành vi: "hệ thống hiển thị thông báo thành công" |
| Chứa tên API: "call POST /v1/projects" | Mô tả nghiệp vụ: "hệ thống tạo bản ghi dự án mới" |

#### Tiêu chí nghiệm thu 1: Tạo dự án thành công — Happy path

> **Quy tắc:** Happy path mô tả luồng THÀNH CÔNG lý tưởng — người dùng làm đúng, hệ thống phản hồi đúng.

- **Given** quản lý dự án đã đăng nhập và có quyền tạo dự án trên ProjectOS
- **When** quản lý dự án điền đầy đủ thông tin bắt buộc (tên dự án, mô tả, ngày bắt đầu, ngày kết thúc) và nhấn nút "Tạo dự án"
- **Then** hệ thống tạo bản ghi dự án mới và hiển thị trang chi tiết dự án trong vòng 3 giây
- **And** gửi thông báo mời tham gia qua email đến các thành viên đã được thêm vào dự án
- **And** dự án mới xuất hiện trên Dashboard của quản lý dự án trong danh sách "Dự án của tôi"

<!-- markdownlint-disable MD031 MD040 -->
> **Minh họa (Gherkin):**
>
> ```gherkin
> Given quản lý dự án đã đăng nhập và có quyền tạo dự án trên ProjectOS
> When  quản lý dự án điền đầy đủ thông tin bắt buộc và nhấn nút "Tạo dự án"
> Then  hệ thống tạo bản ghi dự án mới và hiển thị trang chi tiết trong vòng 3 giây
> And   gửi thông báo mời tham gia qua email đến các thành viên đã được thêm
> And   dự án mới xuất hiện trên Dashboard của quản lý dự án
> ```
<!-- markdownlint-enable MD031 MD040 -->

#### Tiêu chí nghiệm thu 2: Gán thành viên không thuộc dự án — Edge case

> **Quy tắc:** Edge case mô tả điều kiện BIÊN — dữ liệu đúng format nhưng ở ranh giới hoặc trường hợp đặc biệt.
>
> **Lưu ý:** AC này minh họa cấu trúc Edge case — thuộc tính năng gán công việc. Dùng để tham khảo cấu trúc, không nhất thiết thuộc cùng US "Tạo dự án".

- **Given** dự án "CRM phiên bản 2.0" đang ở trạng thái đang hoạt động và có 3 thành viên: Nguyễn Văn A, Trần Thị B, Lê Văn C
- **When** quản lý dự án cố gắng gán công việc cho Hoàng Văn D — người không phải thành viên của dự án
- **Then** hệ thống hiển thị thông báo: "Hoàng Văn D không phải thành viên của dự án này"
- **And** không tạo bản ghi công việc mới

<!-- markdownlint-disable MD031 MD040 -->
> **Minh họa (Gherkin):**
>
> ```gherkin
> Given dự án "CRM phiên bản 2.0" có 3 thành viên: Nguyễn Văn A, Trần Thị B, Lê Văn C
> When  quản lý dự án cố gắng gán công việc cho Hoàng Văn D — không phải thành viên dự án
> Then  hệ thống hiển thị thông báo: "Hoàng Văn D không phải thành viên của dự án này"
> And   không tạo bản ghi công việc mới
> ```
<!-- markdownlint-enable MD031 MD040 -->

#### Tiêu chí nghiệm thu 3: Gán công việc vượt ngưỡng thành viên — Negative path

> **Quy tắc:** Negative path mô tả hành vi khi xảy ra LỖI hoặc dữ liệu KHÔNG HỢP LỆ — hệ thống phải xử lý graceful, không crash, không side effect.
>
> **Lưu ý:** AC này minh họa cấu trúc Negative path — thuộc tính năng gán công việc. Dùng để tham khảo cấu trúc, không nhất thiết thuộc cùng US "Tạo dự án".

- **Given** thành viên nhóm đã có 8 công việc đang trong hạn (ngưỡng tối đa: 10 công việc cùng trạng thái)
- **When** quản lý dự án gán thêm công việc thứ 9 cho thành viên đó
- **Then** hệ thống hiển thị cảnh báo: "Thành viên đã có 8 công việc đang trong hạn"
- **And** nếu quản lý dự án xác nhận cảnh báo → công việc vẫn được giao thành công
- **But** công việc thứ 11 không thể giao nếu chưa xác nhận cảnh báo

<!-- markdownlint-disable MD031 MD040 -->
> **Minh họa (Gherkin):**
>
> ```gherkin
> Given thành viên nhóm đã có 8 công việc đang trong hạn (ngưỡng tối đa: 10)
> When  quản lý dự án gán thêm công việc thứ 9 cho thành viên đó
> Then  hệ thống hiển thị cảnh báo: "Thành viên đã có 8 công việc đang trong hạn"
> And   nếu quản lý dự án xác nhận → công việc vẫn được giao
> But   công việc thứ 11 không thể giao nếu chưa xác nhận cảnh báo
> ```
<!-- markdownlint-enable MD031 MD040 -->

#### Danh mục kiểm tra chất lượng (AC Quality Checklist)

> Tự đánh giá từng mục trước khi xác nhận AC đã sẵn sàng. Checklist đầy đủ: xem [quality-checklist.md](../checklists/quality-checklist.md).

**Về cấu trúc Gherkin:**

- [x] Mỗi AC có đủ **Given + When + Then**.
- [x] Phần **When** chỉ có **MỘT** hành động duy nhất.
- [x] Phần **Then** có **số liệu đo lường** cụ thể (thời gian, số lượng, tỷ lệ %).
- [x] Số lượng **And** trong mỗi AC **≤ 2**. Nếu > 2 → tách AC.
- [x] Dùng **But** cho ngoại lệ thay vì And.

**Về dữ liệu trong Given:**

- [x] Given dùng **dữ liệu cụ thể** (tên người, ngày tháng, số lượng) thay vì generic ("người dùng hợp lệ").
- [x] Given không chứa hành động — chỉ mô tả trạng thái ban đầu.

**Về độ bao phủ kịch bản:**

- [x] Có **1 Happy path** (luồng thành công).
- [x] Có **1 Edge case** (ranh giới nghiệp vụ).
- [x] Có **1 Negative path** (xử lý lỗi / dữ liệu không hợp lệ).
- [x] Tổng số AC cho US này **≤ 7–8**. Nếu vượt → phân rã US.

**Về ngôn ngữ:**

- [x] **Không** từ mơ hồ: "nhanh", "đẹp", "thân thiện", "phù hợp", "trực quan".
- [x] **Không** chi tiết kỹ thuật: tên API, database schema, framework.
- [x] **Không** mô tả UI: màu nút, pixel, font chữ.
- [x] Thông báo lỗi có **nội dung cụ thể**, không viết chung chung "thông báo lỗi".

**Về khả năng sinh Test Case:**

- [x] Từ mỗi AC, có thể sinh ra **tối thiểu 3 Test Case**: đầu vào hợp lệ, biên, không hợp lệ.
- [x] Tester đọc AC mà **không cần hỏi BA thêm** là đã hiểu kịch bản.

---

### Definition of Done (DoD)

> **DoD ≠ Tiêu chí nghiệp thu.** AC cho BA/PO xác nhận nghiệp vụ. DoD cho Dev/QA xác nhận chất lượng kỹ thuật bàn giao.

#### DoD — Nghiệp vụ (BA/PO đánh giá)

- [x] Email thông báo được gửi đúng địa chỉ người nhận
- [x] Toast notification hiển thị sau khi tạo dự án thành công
- [x] Thông báo lỗi có nội dung cụ thể, không chung chung

#### DoD — Kỹ thuật (Dev/QA đánh giá)

- [x] Code passed unit test
- [x] API endpoint response time < 3 giây khi tạo dự án
- [x] Đã test trên Chrome, Safari, Firefox
- [x] Realtime sync hoạt động với 3+ user đồng thời trên cùng dự án

---

### Ghi chú (Notes)

| Loại | Nội dung |
| :--- | :--- |
| **Sự phụ thuộc (Dependencies)** | Không có |
| **Giả định (Assumptions)** | Email của thành viên đã được xác minh; quản lý dự án đã đăng nhập |
| **Câu hỏi mở (Open Questions)** | Cần xác nhận số lượng thành viên tối đa được gán vào một dự án? |

---

### Phụ lục: Tóm tắt nhanh quy tắc viết AC

> Dùng làm checklist nhanh khi viết hoặc review AC. Để có ví dụ chi tiết và hướng dẫn đầy đủ, xem phần **Tiêu chí nghiệp thu** bên trên.

| Thành phần | Quy tắc tối thuần |
| :--- | :--- |
| **Given** | Dùng dữ liệu CỤ THỂ. Không generic ("người dùng hợp lệ"). Không chứa hành động. |
| **When** | CHỈ MỘT hành động duy nhất. Nhiều hành động → tách 2 AC riêng. |
| **Then** | Có số liệu đo lường cụ thể (thời gian, số lượng, tỷ lệ %). Không từ mơ hồ. |
| **And** | Tối đa 2 And trong 1 AC. Nhiều hơn → tách AC. |
| **But** | Dùng cho ngoại lệ / trường hợp ngược lại Then. |

**Yêu cầu tối thiểu:** 3 AC — Happy path + Edge case + Negative path.

**Không dùng:** từ mơ hồ ("nhanh", "đẹp"), chi tiết kỹ thuật (API, database), mô tả UI (màu nút, pixel).
