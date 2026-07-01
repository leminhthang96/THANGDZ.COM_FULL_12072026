# Mẫu đặc tả Use Case

Sao chép mẫu bên dưới và thay thế các placeholder `{{...}}` bằng nội dung thực tế.

Yêu cầu đầu ra: 100% Tiếng Việt, chỉ giữ lại thuật ngữ chuyên ngành, tránh viết tắt
---

## UC-[Số]-[Số]: {{Tên Use Case}}

| Trường | Nội dung |
| --- | :--- |
| **Mã định danh Use Case** | UC-[Số]-[Số] |
| **Tên Use Case** | {{Động từ + Danh từ, ví dụ: Tạo dự án mới / Giao công việc}} |
| **Người tạo** | {{Họ tên - Vai trò}} |
| **Người cập nhất** | {{Họ tên - Vai trò}} |
| **Ngày tạo** | YYYY-MM-DD |
| **Ngày cập nhất** | YYYY-MM-DD |
| **Tác nhân chính** | {{vai trò cụ thể, ví dụ: Quản lý dự án / Thành viên nhóm / Quản trị viên}} |
| **Tác nhân phụ** | {{các tác nhân hỗ trợ, ví dụ: Dịch vụ xác thực / Dịch vụ thông báo / Dịch vụ lịch}} |
| **Mô tả** | {{2-3 câu: TẠI SAO tác nhân cần thực hiện + HỆ THỐNG làm gì + KẾT QUẢ đạt được}} |
| **Điều kiện tiên quyết** | {{1. điều kiện 1 có thể kiểm chứng được; 2. điều kiện 2; 3. ...}} |
| **Điều kiện kết quả** | {{1. trạng thái 1 sau khi Use Case hoàn thành; 2. trạng thái 2; 3. ...}} |
| **Mức ưu tiên** | Cao / Trung bình / Thấp - {{lý do ngắn gọn}} |
| **Tần suất sử dụng** | {{số lần / đơn vị thời gian}}, đỉnh điểm: {{...}} |

### Quy trình chính

1. {{hành động của tác nhân}}
2. {{phản hồi của hệ thống}}
3. {{...}}
4. {{...}}

### Các quy trình thay thế

**UC-[Số]-[Số].TT.1:** {{tên quy trình thay thế}}

- Tại bước {{số thứ tự bước}}, nếu {{điều kiện xảy ra}}:
  - {{số thứ tự bước}}-a. {{bước thực hiện}}
  - {{số thứ tự bước}}-b. {{bước thực hiện}}
  - ...
- Kết quả: quay lại bước {{số thứ tự bước trong Quy trình chính}} của Quy trình chính.

### Ngoại lệ

**UC-[Số]-[Số].NL.1:** {{tên ngoại lệ}}

- **Kích hoạt:** {{khi nào ngoại lệ xảy ra}}
- **Phản hồi:** {{hệ thống xử lý như thế nào}}
- **Trạng thái cuối:** {{trạng thái kết thúc}}

### Bao gồm

- UC-[Số]-[Số]: {{tên Use Case con}} *(được gọi tại bước {{số thứ tự bước}})*

### Yêu cầu đặc biệt

- **Hiệu suất:** {{...}}
- **Bảo mật:** {{...}}
- **Độ tin cậy:** {{...}}
- **Tuân thủ:** {{...}}

### Giả định

1. {{giả định 1}}
2. {{giả định 2}}

### Ghi chú và vấn đề mở

- [CĐ-1] {{câu hỏi cần làm rõ}} | Người phụ trách: {{...}} | Hạn: {{...}} | Giải pháp: {{...}}

---

## Ghi chú hướng dẫn khi sử dụng

### Quy tắc đặt tên cho mã định danh

| Loại | Định dạng | Ví dụ |
| --- | :--- | :--- |
| Quy trình thay thế | UC-[Số]-[Số].TT.[Số thứ tự] | UC-02-03.TT.1 |
| Ngoại lệ | UC-[Số]-[Số].NL.[Số thứ tự] | UC-02-03.NL.1 |
| Ghi chú mở | CĐ-[Số] | CĐ-1, CĐ-2 |

### Hướng dẫn từng trường

**Mã định danh Use Case**
: Dùng định dạng `UC-[Số]-[Số]`.
: - Số đầu là hệ thống con.
: - Số sau là thứ tự Use Case.
: - Ví dụ: `UC-01-01` là Use Case số 1 trong hệ thống con số 1.

**Tên Use Case**
: Bắt đầu bằng động từ nguyên mẫu.
: - Đúng: "Xem danh sách khóa học", "Thanh toán đơn hàng"
: - Sai: "Danh sách khóa học" (không có động từ đứng đầu)
: Câu hỏi gợi ý: Ai làm gì? Hành động chính là gì?

**Tác nhân chính**
: Người hoặc hệ thống khởi tạo hành động.
: - Mỗi Use Case nên có đúng một tác nhân chính.
: Câu hỏi gợi ý: Ai bắt đầu hành động này? Đó là người hay hệ thống bên ngoài?

**Tác nhân phụ**
: Người hoặc hệ thống mà Use Case tương tác nhưng không khởi tạo.
: - Có thể bỏ trống nếu không có.
: Câu hỏi gợi ý: Hệ thống cần tương tác với ai khác để hoàn thành mục tiêu?

**Mô tả**
: Trả lời ba câu hỏi:
: - **Tại sao:** Tại sao tác nhân cần thực hiện hành động này?
: - **Làm gì:** Hệ thống làm gì trong Use Case này?
: - **Kết quả:** Kết quả cuối cùng là gì?
: Câu hỏi gợi ý: Use Case này mang lại giá trị gì cho tác nhân?

**Điều kiện tiên quyết**
: Chỉ liệt kê điều kiện có thể kiểm chứng được bởi hệ thống.
: - Không liệt kê suy đoán chủ quan.
: - Không nhầm lẫn với Giả định.
: Câu hỏi gợi ý: Hệ thống có thể tự kiểm tra điều kiện này trước khi bắt đầu không?

**Điều kiện kết quả**
: Mô tả trạng thái hệ thống và dữ liệu sau khi Use Case hoàn thành thành công.
: Câu hỏi gợi ý: Làm thế nào để biết Use Case đã thành công? Dữ liệu nào thay đổi?

**Quy trình chính**
: Đánh số từng bước, xen kẽ hành động tác nhân và phản hồi hệ thống.
: - Mỗi bước mô tả một hành động duy nhất.
: - Không nhúng rẽ nhánh hoặc lặp trong luồng chính.
: Câu hỏi gợi ý: Ai làm gì trước? Hệ thống phản hồi ra sao? Bước cuối cùng là gì?

**Quy trình thay thế**
: Nhánh xử lý thay thế có kế hoạch, Use Case vẫn hoàn thành mục tiêu.
: - Ghi rõ điểm rẽ và luồng quay về Quy trình chính.
: Câu hỏi gợi ý: Người dùng có thể chọn làm khác đi không? Có bước nào có thể bỏ qua không?

**Ngoại lệ**
: Tình huống lỗi hoặc sự cố không mong muốn, Use Case không thể hoàn thành mục tiêu.
: Câu hỏi gợi ý: Điều gì có thể khiến Use Case thất bại? Hệ thống phản hồi ra sao?

### Phân biệt Quy trình thay thế và Ngoại lệ

| Tiêu chí | Quy trình thay thế | Ngoại lệ |
| --- | :--- | :--- |
| Bản chất | Nhánh xử lý hợp lệ, có kế hoạch | Tình huống lỗi hoặc sự cố không mong muốn |
| Kết quả cuối | Use Case vẫn hoàn thành mục tiêu | Use Case không thể hoàn thành mục tiêu |
| Ví dụ | Người dùng hủy đặt hàng giữa chừng | Hệ thống mất kết nối cơ sở dữ liệu |
| Xử lý | Quay về Quy trình chính hoặc kết thúc có kiểm soát | Thông báo lỗi, ghi log, hoặc chuyển sang Use Case xử lý lỗi |
