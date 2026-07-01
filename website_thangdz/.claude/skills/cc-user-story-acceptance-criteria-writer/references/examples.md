# Ví dụ mẫu về Câu chuyện người dùng và Tiêu chí nghiệm thu cho ProjectOS (Quản lý Dự án)

> Tài liệu tổng hợp 4 ví dụ mẫu thực tế thuộc các nghiệp vụ cốt lõi trong sản phẩm quản lý dự án: Tạo dự án, Giao công việc, Cập nhật tiến độ và Báo cáo.
> Các tên thương hiệu đã được thay đổi thành dạng chung: Project X, Team Y, Client Z...
> Yêu cầu đầu ra: 100% Tiếng Việt, chỉ giữ lại thuật ngữ chuyên ngành, tránh viết tắt.

---

## Ví dụ 1: Tạo dự án mới

### Câu chuyện người dùng US-PROJ-001: Tạo dự án mới với thông tin cơ bản

**As a** quản lý dự án đã được phân quyền tạo dự án trên ProjectOS.  
**I want to** tạo dự án mới với tên, mô tả, ngày bắt đầu, ngày kết thúc và danh sách thành viên ban đầu.  
**So that** nhóm bắt đầu làm việc ngay trên cùng một không gian dự án có sẵn thông tin nền tảng.

**Tự kiểm tra theo tiêu chí INVEST:**

| Tiêu chí | Đạt? (✅/⚠️) | Ghi chú |
| :--- | :---: | :--- |
| **I**ndependent (Độc lập) | ✅ | Không phụ thuộc câu chuyện nào khác nếu đã có module quản lý người dùng. |
| **N**egotiable (Thương lượng) | ✅ | Chưa cố định công nghệ lưu trữ hay cấu trúc bảng cơ sở dữ liệu. |
| **V**aluable (Giá trị) | ✅ | Quản lý dự án khởi tạo được không gian làm việc; nhóm có thể bắt đầu ngay. |
| **E**stimable (Ước lượng) | ✅ | Luồng nghiệp vụ tương đối chuẩn, ước lượng 3 ngày làm việc. |
| **S**mall (Nhỏ gọn) | ✅ | Thời gian triển khai ước lượng khoảng 3 ngày làm việc của lập trình viên. |
| **T**estable (Kiểm thử được) | ✅ | Các tiêu chí nghiệm thu được xác định rõ ràng, đo lường được. |

**Tiêu chí nghiệm thu 1: Tạo dự án thành công với thông tin hợp lệ (Happy path)**

- **Given** quản lý dự án đã đăng nhập và có quyền tạo dự án.
- **And** tên dự án là "Xây dựng hệ thống CRM phiên bản 2.0", ngày bắt đầu là 01/07, ngày kết thúc là 30/09.
- **When** quản lý dự án điền đầy đủ thông tin bắt buộc và nhấn nút "Tạo dự án".
- **Then** hệ thống tạo bản ghi dự án mới và hiển thị trang chi tiết dự án trong vòng 3 giây.
- **And** gửi thông báo mời tham gia dự án qua email đến các thành viên đã được thêm vào danh sách ban đầu.

**Tiêu chí nghiệm thu 2: Ngày kết thúc trước ngày bắt đầu (Edge case)**

- **Given** quản lý dự án đang tạo dự án mới.
- **When** quản lý dự án nhập ngày bắt đầu là 30/09 và ngày kết thúc là 01/07.
- **Then** hệ thống hiển thị thông báo lỗi: "Ngày kết thúc dự án phải sau ngày bắt đầu. Vui lòng kiểm tra lại."
- **And** không tạo bản ghi dự án mới.

**Tiêu chí nghiệm thu 3: Tên dự án trùng lặp (Negative path)**

- **Given** trong hệ thống đã tồn tại dự án có tên "Xây dựng hệ thống CRM phiên bản 2.0".
- **When** quản lý dự án nhập tên "Xây dựng hệ thống CRM phiên bản 2.0" và nhấn "Tạo dự án".
- **Then** hệ thống hiển thị cảnh báo: "Dự án với tên này đã tồn tại. Bạn có muốn tiếp tục tạo không?"
- **And** nếu quản lý dự án xác nhận, hệ thống cho phép tạo dự án trùng tên; nếu hủy, quay lại biểu mẫu.

**Definition of Done:**

- [ ] Code passed unit test
- [ ] Bản ghi dự án được lưu vào cơ sở dữ liệu với đầy đủ trường bắt buộc
- [ ] Email mời tham gia gửi thành công qua SMTP đã cấu hình
- [ ] Thành viên được thêm vào dự án có quyền truy cập ngay lập tức
- [ ] Dashboard / trang dự án hiển thị dự án mới tạo sau khi tải lại

---

## Ví dụ 2: Giao công việc (Task Assignment)

### Câu chuyện người dùng US-TASK-001: Giao công việc cho thành viên trong dự án

**As a** quản lý dự án đang quản lý dự án đã được tạo trên ProjectOS  
**I want to** tạo công việc mới, gán cho thành viên cụ thể và đặt deadline  
**So that** thành viên nhóm biết rõ trách nhiệm, thời hạn và tôi theo dõi được tiến độ phân công

**Tiêu chí nghiệm thu 1: Giao công việc thành công (Happy path)**

- **Given** dự án "CRM phiên bản 2.0" đang hoạt động và có 3 thành viên: Nguyễn Văn A, Trần Thị B, Lê Văn C.
- **When** quản lý dự án tạo công việc "Thiết kế giao diện trang chủ", gán cho Nguyễn Văn A, đặt deadline ngày 15/07.
- **Then** hệ thống tạo công việc mới với trạng thái "Chưa bắt đầu" và gán cho Nguyễn Văn A.
- **And** gửi thông báo nhắc nhở qua email và trong ứng dụng đến Nguyễn Văn A.
- **And** hiển thị công việc mới trong danh sách công việc của dự án và trang cá nhân của Nguyễn Văn A.

**Tiêu chí nghiệm thu 2: Giao công việc cho người không thuộc dự án (Edge case)**

- **Given** dự án "CRM phiên bản 2.0" có 3 thành viên: Nguyễn Văn A, Trần Thị B, Lê Văn C.
- **When** quản lý dự án cố gắng gán công việc cho Hoàng Văn D — người không phải thành viên của dự án.
- **Then** hệ thống hiển thị thông báo lỗi: "Hoàng Văn D không phải thành viên của dự án này. Vui lòng thêm thành viên trước khi giao việc."
- **And** không tạo công việc.

**Tiêu chí nghiệm thu 3: Thành viên nhận nhiều công việc vượt ngưỡng (Negative path)**

- **Given** Nguyễn Văn A đã có 8 công việc đang trong hạn trong dự án "CRM phiên bản 2.0" và ngưỡng tối đa là 10 công việc.
- **When** quản lý dự án giao thêm công việc thứ 9 cho Nguyễn Văn A.
- **Then** hệ thống hiển thị cảnh báo: "Nguyễn Văn A đã có 8 công việc đang trong hạn. Bạn có chắc muốn giao thêm không?"
- **And** nếu quản lý dự án xác nhận, công việc vẫn được giao; nếu hủy, quay lại biểu mẫu.

**Definition of Done:**

- [ ] Code passed unit test
- [ ] Công việc mới được tạo với đầy đủ trường trong cơ sở dữ liệu
- [ ] Thành viên được gán nhận thông báo qua email và in-app
- [ ] Danh sách công việc của thành viên được cập nhật ngay lập tức sau khi giao
- [ ] Công việc mới xuất hiện trong trang cá nhân của thành viên được gán

---

## Ví dụ 3: Cập nhật tiến độ công việc

### Câu chuyện người dùng US-PROGRESS-001: Cập nhật trạng thái và tiến độ công việc

**As a** thành viên nhóm được giao công việc trong dự án  
**I want to** cập nhật trạng thái (Chưa bắt đầu / Đang làm / Hoàn thành / Tạm dừng) và phần trăm tiến độ  
**So that** quản lý dự án và các bên liên quan nắm được thực trạng công việc theo thời gian thực

**Tiêu chí nghiệm thu 1: Cập nhật tiến độ thành công (Happy path)**

- **Given** công việc "Thiết kế giao diện trang chủ" có trạng thái "Đang làm" với tiến độ 40%.
- **When** thành viên nhóm cập nhật tiến độ lên 80% và thay đổi trạng thái thành "Đang làm".
- **Then** hệ thống lưu trạng thái và tiến độ mới trong vòng 2 giây.
- **And** biểu đồ Gantt và bảng Kanban của dự án được cập nhật tức thì.
- **And** quản lý dự án nhận thông báo về việc cập nhật tiến độ.

**Tiêu chí nghiệm thu 2: Tiến độ giảm so với lần trước (Edge case)**

- **Given** công việc có tiến độ đã ghi nhận là 60%.
- **When** thành viên nhóm cập nhật tiến độ xuống còn 30%.
- **Then** hệ thống yêu cầu thành viên nhập ghi chú giải thích lý do giảm tiến độ.
- **And** sau khi có ghi chú, hệ thống lưu tiến độ mới và gửi thông báo cảnh báo đến quản lý dự án.

**Tiêu chí nghiệm thu 3: Cập nhật công việc đã hoàn thành (Negative path)**

- **Given** công việc có trạng thái "Hoàn thành" với tiến độ 100%.
- **When** thành viên nhóm cố gắng cập nhật tiến độ về 50%.
- **Then** hệ thống hiển thị thông báo: "Công việc đã được đánh dấu hoàn thành. Vui lòng mở khóa công việc trước khi cập nhật tiến độ."
- **And** không lưu tiến độ 50%.

**Definition of Done:**

- [ ] Code passed unit test
- [ ] API endpoint trả về kết quả trong vòng 2 giây
- [ ] Trạng thái và tiến độ cập nhật realtime cho tất cả người dùng đang xem
- [ ] Thông báo gửi thành công qua kênh đã cấu hình (email / in-app)

---

## Ví dụ 4: Báo cáo tiến độ dự án

### Câu chuyện người dùng US-REPORT-001: Xem báo cáo tổng quan tiến độ dự án

**As a** quản lý dự án đang theo dõi nhiều dự án cùng lúc  
**I want to** xem báo cáo tổng quan về tiến độ, tình trạng công việc và rủi ro của từng dự án  
**So that** tôi có thể đánh giá nhanh tình trạng toàn bộ danh mục dự án và ưu tiên can thiệp khi cần

**Tiêu chí nghiệm thu 1: Hiển thị báo cáo đầy đủ thông tin (Happy path)**

- **Given** quản lý dự án đang theo dõi 3 dự án: "CRM phiên bản 2.0" (25 công việc), "Hệ thống ERP" (10 công việc), "Ứng dụng di động" (15 công việc).
- **When** quản lý dự án truy cập trang Báo cáo.
- **Then** hệ thống hiển thị bảng tổng quan gồm: tên dự án, tổng số công việc, số hoàn thành, đang làm, quá hạn, tỷ lệ tiến độ trung bình (%).
- **And** sắp xếp mặc định theo dự án có nhiều công việc quá hạn nhất.

**Tiêu chí nghiệm thu 2: Dự án không có công việc nào (Edge case)**

- **Given** dự án "Marketing Q3" đã được tạo nhưng chưa có công việc nào được giao.
- **When** quản lý dự án xem báo cáo của dự án này.
- **Then** hệ thống hiển thị trạng thái "Chưa có công việc" thay vì tỷ lệ phần trăm.
- **And** hiển thị nút kêu gọi hành động (CTA) "Tạo công việc đầu tiên".

**Tiêu chí nghiệm thu 3: Hết thời gian phản hồi khi tải báo cáo (Negative path)**

- **Given** quản lý dự án yêu cầu xem báo cáo dự án có hơn 500 công việc.
- **When** hệ thống đang xử lý dữ liệu báo cáo.
- **Then** hệ thống hiển thị thanh tiến trình tải với thông báo "Đang tải báo cáo..."
- **And** nếu thời gian tải vượt quá 10 giây, hệ thống hiển thị tùy chọn "Tải dưới dạng tệp tin (background)".

**Definition of Done:**

- [ ] Code passed unit test
- [ ] Trang Báo cáo tải xong trong vòng 10 giây với tập dữ liệu 500 công việc
- [ ] Biểu đồ (Gantt / biểu đồ cột) render đúng dữ liệu, không bị lệch
- [ ] Thanh tiến trình tải hiển thị khi xử lý dữ liệu lớn
- [ ] Export file (CSV / PDF) chứa đúng dữ liệu như trên giao diện

---

## Các nguyên tắc rút ra từ các ví dụ mẫu trên

1. **Đối tượng sử dụng (Persona) cụ thể**: Luôn xác định rõ vai trò và hoàn cảnh của người dùng (ví dụ: quản lý dự án đang theo dõi nhiều dự án, thành viên nhóm được giao công việc trong dự án) thay vì sử dụng từ "người dùng" chung chung.
2. **Mục tiêu có thể kiểm tra**: Các mục tiêu luôn hướng tới kết quả nghiệp vụ rõ ràng (phân công rõ trách nhiệm, theo dõi tiến độ thời gian thực, tránh quá tải tài nguyên).
3. **Đầy đủ 3 luồng tiêu chí nghiệp thu**: Mọi câu chuyện người dùng đều bắt buộc bao quát tối thiểu Luồng thông thường (Happy path), Trường hợp biên (Edge case) và Luồng xử lý lỗi (Negative path).
4. **Không đưa chi tiết triển khai công nghệ**: Tránh nhắc đến tên giải thuật, cấu trúc mã nguồn, bảng cơ sở dữ liệu hay thư viện lập trình cụ thể để giữ nguyên tính thương lượng (Negotiable) của câu chuyện người dùng.
5. **Bổ sung Definition of Done (DoD) cho ví dụ phù hợp**: Với các tính năng liên quan đến realtime, notification, hoặc tích hợp bên thứ ba, bổ sung DoD checklist kỹ thuật để hướng dẫn developer và QA về điều kiện bàn giao.
