# Ví dụ — 2 Use Case hoàn chỉnh của ProjectOS

Cả 2 Use Case mẫu đều đã pass checklist chất lượng 20 điểm.

Yêu cầu đầu ra: 100% Tiếng Việt, chỉ giữ lại thuật ngữ chuyên ngành, tránh viết tắt

---

## UC-PROJ-01: Tạo dự án mới

| Trường | Nội dung |
| --- | :--- |
| **Mã định danh Use Case** | UC-PROJ-01 |
| **Tên Use Case** | Tạo dự án mới |
| **Người tạo** | Project Manager - ProjectOS |
| **Người cập nhất** | Project Manager - ProjectOS |
| **Ngày tạo** | 2026-05-14 |
| **Ngày cập nhất** | 2026-05-14 |
| **Tác nhân chính** | Quản lý dự án (tài khoản ProjectOS đã đăng ký, vai trò Admin trong workspace) |
| **Tác nhân phụ** | Notification Service, Authentication Service |
| **Mô tả** | Khi một Quản lý dự án cần khởi tạo một sáng kiến mới, Quản lý dự án truy cập mục Dự án và tạo dự án mới bằng cách nhập thông tin chi tiết, thiết lập thời hạn và thêm thành viên nhóm. Use Case kết thúc khi dự án được tạo, tất cả thành viên được mời đều nhận được thông báo, và dự án xuất hiện trong danh sách dự án. |
| **Điều kiện tiên quyết** | 1. Quản lý dự án đã đăng nhập ProjectOS với địa chỉ email đã được xác thực.\n2. Workspace đang hoạt động và Quản lý dự án có quyền "Tạo dự án".\n3. Không có dự án nào cùng tên tồn tại trong workspace (kiểm tra tính duy nhất của tên dự án). |
| **Điều kiện kết quả** | 1. Bản ghi dự án được tạo trong bảng Projects với trạng thái='Hoạt động', thời điểm tạo, và Quản lý dự án là chủ sở hữu.\n2. Các thành viên nhóm được thêm vào bảng Project_Members với vai trò được gán tương ứng.\n3. Thông báo tạo dự án được gửi đến từng thành viên được mời qua email và thông báo trong ứng dụng trong vòng 60 giây.\n4. Dự án xuất hiện trong danh sách dự án của Quản lý dự án với trạng thái='Hoạt động'. |
| **Mức ưu tiên** | Cao — tính năng cốt lõi; là điều kiện tiên quyết cho mọi hoạt động quản lý dự án phía sau (tạo công việc, báo cáo, phân bổ nguồn lực). |
| **Tần suất sử dụng** | Ước tính ~50 dự án/ngày trên tất cả workspace; đỉnh điểm: ~15 dự án/giờ vào phiên lập kế hoạch đầu tuần (thứ Hai). |

### Quy trình chính

1. Quản lý dự án truy cập mục **Dự án** và nhấn nút **Tạo dự án**.
2. Hệ thống hiển thị biểu mẫu **Tạo dự án**: tên dự án, mô tả, ngày bắt đầu, ngày kết thúc, và danh sách thành viên nhóm trống.
3. Quản lý dự án nhập tên dự án và mô tả.
4. Quản lý dự án thiết lập ngày bắt đầu và ngày kết thúc của dự án.
5. Quản lý dự án tìm kiếm và thêm thành viên nhóm bằng cách nhập địa chỉ email hoặc chọn từ danh bạ thành viên workspace.
6. Quản lý dự án gán vai trò dự án cho từng thành viên được thêm (Quản lý dự án, Thành viên nhóm, Người quan sát).
7. Quản lý dự án nhấn **Tạo dự án**.
8. Hệ thống kiểm tra tất cả trường bắt buộc và kiểm tra trùng lặp tên dự án trong workspace.
9. Hệ thống tạo bản ghi dự án và lưu tất cả phân công thành viên.
10. Hệ thống gọi UC-NOTI-01 để gửi thông báo tạo dự án đến tất cả thành viên được thêm.
11. Hệ thống hiển thị trang **Chi tiết dự án** và hiển thị thông báo thành công: "Dự án được tạo thành công."

### Các quy trình thay thế

**UC-PROJ-01.TT.1:** Thêm thành viên nhóm từ danh bạ workspace

- Tại bước 5, nếu Quản lý dự án chọn thành viên từ danh bạ workspace thay vì nhập địa chỉ email:
  - 5-a. Quản lý dự án nhấn **Thêm từ danh bạ**.
  - 5-b. Hệ thống hiển thị danh bạ thành viên có thể tìm kiếm với tên, vai trò và trạng thái sẵn sàng.
  - 5-c. Quản lý dự án chọn một hoặc nhiều thành viên và nhấn **Thêm đã chọn**.
  - 5-d. Hệ thống thêm các thành viên đã chọn vào danh sách thành viên nhóm → tiếp tục từ bước 6 của Quy trình chính.

**UC-PROJ-01.TT.2:** Tạo dự án với tên trùng lặp — xác nhận hoặc đổi tên

- Tại bước 8, nếu hệ thống phát hiện dự án cùng tên đã tồn tại trong workspace:
  - 8-a. Hệ thống hiển thị cảnh báo: "Dự án có tên này đã tồn tại trong workspace. Bạn có muốn tiếp tục hay đổi tên không?"
  - 8-b. Quản lý dự án nhấn **Tiếp tục với tên trùng lặp** → hệ thống chuyển đến bước 9.
  - 8-c. HOẶC Quản lý dự án nhấn **Đổi tên** → hệ thống quay lại trường tên dự án để chỉnh sửa → tiếp tục từ bước 3 của Quy trình chính.

### Ngoại lệ

**UC-PROJ-01.NL.1:** Phát hiện tên dự án trùng lặp

- **Kích hoạt:** Tại bước 8, hệ thống phát hiện dự án cùng tên và Quản lý dự án chọn không tiếp tục.
- **Phản hồi:** Hệ thống hiển thị "Dự án có tên này đã tồn tại. Vui lòng nhập tên dự án khác." và làm nổi bật trường tên.
- **Trạng thái cuối:** Không có bản ghi dự án nào được tạo. Quản lý dự án có thể sửa tên và gửi lại.

**UC-PROJ-01.NL.2:** Ngày kết thúc trước ngày bắt đầu

- **Kích hoạt:** Tại bước 8, hệ thống phát hiện ngày kết thúc của dự án sớm hơn ngày bắt đầu.
- **Phản hồi:** Hệ thống hiển thị "Ngày kết thúc phải sau ngày bắt đầu. Vui lòng kiểm tra và sửa ngày."
- **Trạng thái cuối:** Không có bản ghi dự án nào được tạo. Quản lý dự án có thể sửa ngày và gửi lại.

**UC-PROJ-01.NL.3:** Thành viên nhóm không tìm thấy trong workspace

- **Kích hoạt:** Tại bước 8, hệ thống kiểm tra tất cả thành viên đã thêm đều tồn tại trong workspace và phát hiện ít nhất một địa chỉ email không khớp với bất kỳ thành viên workspace nào.
- **Phản hồi:** Hệ thống hiển thị "Các địa chỉ email sau không được đăng ký trong workspace này: [danh sách email]. Vui lòng xóa hoặc mời họ tham gia workspace."
- **Trạng thái cuối:** Không có bản ghi dự án nào được tạo. Quản lý dự án có thể xóa thành viên không hợp lệ và gửi lại.

**UC-PROJ-01.NL.4:** Notification Service không khả dụng trong quá trình tạo dự án

- **Kích hoạt:** Tại bước 10, Notification Service không khả dụng (hết thời gian chờ hoặc lỗi) khi hệ thống cố gửi thông báo đến các thành viên được mời.
- **Phản hồi:** Hệ thống lưu dự án thành công và hiển thị cảnh báo: "Dự án được tạo. Việc gửi thông báo bị trì hoãn — các thành viên sẽ được thông báo trong giây lát."
- **Trạng thái cuối:** Bản ghi dự án được tạo. Công việc retry cố gắng gửi thông báo mỗi 5 phút trong 30 phút; nếu tất cả retry đều thất bại, đội ngũ hỗ trợ được thông báo qua ticket tự động.

### Bao gồm

- UC-NOTI-01: Gửi thông báo tạo dự án *(được gọi tại bước 10 của Quy trình chính)*

### Yêu cầu đặc biệt

- **Hiệu suất:** Trang Chi tiết dự án tải trong ≤ 2 giây; việc tạo dự án hoàn tất trong ≤ 3 giây. Hệ thống hỗ trợ 100 lần tạo dự án đồng thời mà không suy giảm hiệu năng.
- **Bảo mật:** Chỉ thành viên workspace có quyền "Tạo dự án" mới có thể khởi tạo Use Case này. Tên dự án phải được kiểm tra và làm sạch phía server để ngăn chặn tấn công injection.
- **Độ tin cậy:** Nếu Notification Service không khả dụng, dự án vẫn phải được tạo — thông báo được retry bất đồng bộ. Không dự án nào bị chặn vì lỗi thông báo.
- **Tuân thủ:** Dữ liệu dự án phải được lưu giữ theo chính sách lưu giữ dữ liệu của tổ chức (mặc định: 7 năm sau khi đóng dự án).

### Giả định

1. Tất cả thành viên nhóm được mời qua email đều đã đăng ký trong workspace. Nếu chưa, họ phải được mời qua luồng onboarding riêng.
2. Workspace không có giới hạn định sẵn về số lượng dự án — giới hạn có thể được bổ sung trong các gói giá sau.
3. SLA của Authentication Service là ≥ 99,5% uptime trong giờ làm việc.

### Ghi chú và vấn đề mở

- [CĐ-1] Quản lý dự án có thể tạo dự án con (hierarchy lồng nhau) trong phase 2 không? | Người phụ trách: Product Team | Hạn: 2026-06-01 | Giải pháp: TBD — deferred.
- [CĐ-2] Số lượng thành viên nhóm tối đa cho phép mỗi dự án là bao nhiêu? | Người phụ trách: Project Manager - ProjectOS | Hạn: 2026-05-25 | Giải pháp: TBD.
- [NOTE] Biểu mẫu tạo dự án phải hỗ trợ kéo-thả để sắp xếp thứ tự thành viên nhóm — phối hợp với đội ngũ Frontend để triển khai.

---

## UC-TASK-01: Giao công việc cho thành viên nhóm

| Trường | Nội dung |
| --- | :--- |
| **Mã định danh Use Case** | UC-TASK-01 |
| **Tên Use Case** | Giao công việc cho thành viên nhóm |
| **Người tạo** | Project Manager - ProjectOS |
| **Người cập nhất** | Project Manager - ProjectOS |
| **Ngày tạo** | 2026-05-14 |
| **Ngày cập nhất** | 2026-05-14 |
| **Tác nhân chính** | Quản lý dự án (dự án đang hoạt động với ít nhất một thành viên nhóm) |
| **Tác nhân phụ** | Notification Service, Authentication Service |
| **Mô tả** | Khi một Quản lý dự án xác định một hạng mục công việc cần được thực hiện bởi một thành viên nhóm cụ thể, Quản lý dự án tạo công việc trong dự án, giao cho thành viên phụ trách, đặt thời hạn và xác định mức ưu tiên. Use Case kết thúc khi công việc được tạo, được giao, và thành viên được giao nhận được thông báo về công việc mới. |
| **Điều kiện tiên quyết** | 1. Quản lý dự án đã đăng nhập ProjectOS với một dự án đang hoạt động.\n2. Dự án có trạng thái='Hoạt động' và không bị lưu trữ.\n3. Có ít nhất một thành viên nhóm được phân công vào dự án với vai trò cho phép giao công việc (không phải 'Người quan sát').\n4. Thành viên nhóm được giao có trạng thái tài khoản đang hoạt động. |
| **Điều kiện kết quả** | 1. Bản ghi công việc được tạo trong bảng Tasks với trạng thái='Cần làm', thành viên được giao, thời hạn và mức ưu tiên.\n2. Công việc xuất hiện trong danh sách công việc cá nhân của thành viên được giao (Công việc của tôi).\n3. Thông báo giao công việc được gửi đến thành viên được giao qua email và thông báo trong ứng dụng trong vòng 60 giây.\n4. Quản lý dự án nhìn thấy công việc trong bảng công việc của dự án. |
| **Mức ưu tiên** | Cao — quy trình cốt lõi; là điều kiện tiên quyết cho theo dõi tiến độ và phối hợp nhóm. |
| **Tần suất sử dụng** | Ước tính ~500 công việc/ngày toàn nền tảng; đỉnh điểm: ~80 công việc/giờ vào phiên lập kế hoạch sprint (thứ Hai và thứ Năm sáng). |

### Quy trình chính

1. Quản lý dự án mở dự án và truy cập mục **Bảng công việc**.
2. Hệ thống hiển thị bảng công việc với các công việc hiện có được nhóm theo trạng thái (Cần làm / Đang thực hiện / Hoàn thành).
3. Quản lý dự án nhấn nút **Thêm công việc**.
4. Hệ thống hiển thị biểu mẫu **Chi tiết công việc**: tiêu đề công việc, mô tả, người được giao, thời hạn, mức ưu tiên và ước lượng giờ.
5. Quản lý dự án nhập tiêu đề công việc và mô tả.
6. Quản lý dự án chọn người được giao từ danh sách thành viên dự án.
7. Quản lý dự án đặt ngày thời hạn.
8. Quản lý dự án chọn mức ưu tiên công việc: Thấp / Trung bình / Cao / Khẩn cấp.
9. Quản lý dự án nhấn **Tạo công việc**.
10. Hệ thống kiểm tra tất cả trường bắt buộc và gán ID công việc duy nhất.
11. Hệ thống tạo bản ghi công việc trong bảng Tasks.
12. Hệ thống gọi UC-NOTI-03 để gửi thông báo giao công việc đến thành viên được giao.
13. Hệ thống cập nhật bảng công việc để hiển thị công việc mới trong cột 'Cần làm' và hiển thị thông báo thành công: "Công việc được tạo và giao."

### Các quy trình thay thế

**UC-TASK-01.TT.1:** Giao công việc cho nhiều thành viên

- Tại bước 6, nếu Quản lý dự án cần giao công việc cho nhiều thành viên:
  - 6-a. Quản lý dự án nhấn **Thêm nhiều người được giao**.
  - 6-b. Hệ thống hiển thị danh sách chọn nhiều thành viên dự án.
  - 6-c. Quản lý dự án chọn hai hoặc nhiều thành viên và nhấn **Xác nhận**.
  - 6-d. Hệ thống cập nhật trường người được giao để hiển thị "[Thành viên A], [Thành viên B] + [N] người khác" → tiếp tục từ bước 8 của Quy trình chính.

**UC-TASK-01.TT.2:** Giao công việc kèm công việc con

- Tại bước 5, nếu Quản lý dự án muốn tạo công việc con cùng lúc với công việc chính:
  - 5-a. Quản lý dự án nhập tiêu đề và mô tả công việc chính.
  - 5-b. Quản lý dự án nhấn **Thêm công việc con**.
  - 5-c. Hệ thống hiển thị bảng tạo công việc con với tối đa 10 trường công việc con.
  - 5-d. Quản lý dự án nhập tiêu đề công việc con và nhấn **Xong**.
  - 5-e. Hệ thống lưu công việc con cùng với công việc chính → tiếp tục từ bước 6 của Quy trình chính.

### Ngoại lệ

**UC-TASK-01.NL.1:** Người được giao không phải thành viên dự án

- **Kích hoạt:** Tại bước 10, hệ thống kiểm tra người được giao là thành viên đang hoạt động của dự án.
- **Phản hồi:** Hệ thống hiển thị "Người được gào không phải là thành viên của dự án này. Vui lòng chọn thành viên hợp lệ hoặc thêm họ vào dự án trước."
- **Trạng thái cuối:** Không có bản ghi công việc nào được tạo. Quản lý dự án có thể chọn người được giao hợp lệ và gửi lại.

**UC-TASK-01.NL.2:** Thời hạn đã qua

- **Kích hoạt:** Tại bước 10, hệ thống phát hiện ngày thời hạn đã nhập sớm hơn ngày hiện tại.
- **Phản hồi:** Hệ thống hiển thị "Thời hạn không thể ở quá khứ. Vui lòng nhập ngày tương lai hợp lệ."
- **Trạng thái cuối:** Không có bản ghi công việc nào được tạo. Quản lý dự án có thể sửa thời hạn và gửi lại.

**UC-TASK-01.NL.3:** Khối lượng công việc của người được giao vượt ngưỡng

- **Kích hoạt:** Tại bước 10, hệ thống kiểm tra khối lượng công việc hiện tại của người được giao và phát hiện việc thêm công việc này sẽ vượt ngưỡng khối lượng công việc (mặc định: 150% số giờ ước lượng hàng tháng).
- **Phản hồi:** Hệ thống hiển thị cảnh báo: "[Tên người được giao] đã có [N] công việc được giao trong tháng này. Việc thêm công việc này có thể gây quá tải. Bạn có muốn tiếp tục không?"
- **Trạng thái cuối:** Nếu Quản lý dự án xác nhận, công việc được tạo bất chấp cảnh báo. Nếu Quản lý dự án hủy, không có công việc nào được tạo.

**UC-TASK-01.NL.4:** Notification Service không khả dụng trong quá trình giao công việc

- **Kích hoạt:** Tại bước 12, Notification Service không khả dụng khi hệ thống cố gửi thông báo giao công việc.
- **Phản hồi:** Hệ thống lưu công việc thành công và hiển thị: "Công việc được tạo. Việc gửi thông báo bị trì hoãn — người được giao sẽ được thông báo trong giây lát."
- **Trạng thái cuối:** Công việc được tạo và hiển thị trong danh sách công việc của người được giao. Công việc retry cố gắng gửi thông báo mỗi 5 phút trong 30 phút.

### Bao gồm

- UC-NOTI-03: Gửi thông báo giao công việc *(được gọi tại bước 12 của Quy trình chính)*

### Yêu cầu đặc biệt

- **Hiệu suất:** Bảng công việc tải trong ≤ 2 giây với tối đa 200 công việc được hiển thị. Việc tạo công việc hoàn tất trong ≤ 2 giây.
- **Bảo mật:** Chỉ Quản lý dự án và thành viên có quyền 'Tạo công việc' mới có thể khởi tạo Use Case này. Người được giao phải được kiểm tra phía server đối với danh sách thành viên dự án.
- **Độ tin cậy:** Nếu Notification Service không khả dụng, công việc vẫn phải được tạo — thông báo được retry bất đồng bộ. Không công việc nào bị chặn vì lỗi thông báo.
- **Tuân thủ:** Mỗi hành động tạo công việc phải được ghi log kèm actor ID, thời điểm và người được giao. Log audit được lưu giữ trong 3 năm.

### Giả định

1. Các mức ưu tiên công việc được định nghĩa bởi nhóm dự án và có thể tùy chỉnh theo loại dự án.
2. Ngưỡng khối lượng công việc có thể cấu hình theo workspace (mặc định: 150%).
3. Notification Service hỗ trợ cả kênh thông báo qua email và push notification trong ứng dụng.

### Ghi chú và vấn đề mở

- [CĐ-1] Công việc có hỗ trợ giao việc định kỳ (ví dụ: "mỗi thứ Hai lúc 9h sáng") không? | Người phụ trách: Product Team | Hạn: 2026-06-15 | Giải pháp: TBD.
- [CĐ-2] Số lượng công việc con tối đa cho phép mỗi công việc là bao nhiêu? | Người phụ trách: Project Manager - ProjectOS | Hạn: 2026-05-25 | Giải pháp: TBD — gợi ý 20 làm mặc định.
- [NOTE] Cảnh báo quá tải khối lượng công việc (NT.3) cần hiển thị trên trang hồ sơ người được giao — phối hợp với đội ngũ Frontend để triển khai widget "Tổng quan khối lượng công việc".

---

## Bài học kinh nghiệm từ 2 ví dụ

1. **UC-PROJ-01** minh họa Use Case tạo dự án với phân công thành viên nhóm, xử lý trùng tên, và fallback thông báo bất đồng bộ.
2. **UC-TASK-01** minh họa Use Case giao công việc với hỗ trợ giao cho nhiều người, kiểm tra ngưỡng khối lượng công việc, và xử lý công việc con.
3. **Cả 2 Use Case chia sẻ:**
   - 1 tác nhân chính + tác nhân phụ rõ ràng
   - Mô tả bao quát TẠI SAO + LÀM GÌ + KẾT QUẢ
   - Điều kiện tiên quyết có thể kiểm chứng (không phải động lực chủ quan)
   - Điều kiện kết quả thể hiện thay đổi trạng thái hệ thống
   - Quy trình chính 10+ bước xen kẽ Tác nhân/Hệ thống
   - 2 TA + 3-4 NT bao phủ các chế độ thất bại chính
   - Yêu cầu đặc biệt chỉ gồm yêu cầu phi chức năng
   - Ghi chú với CĐ bao gồm người phụ trách + hạn + giải pháp
4. **Các pattern đáng học hỏi:**
   - Pattern fallback bất đồng bộ (NT.4 trong cả 2 UC): tạo thành công nhưng thông báo lỗi — retry bất đồng bộ, không bao giờ chặn thao tác chính
   - Kiểm tra ngưỡng khối lượng công việc khi giao (NT.3 trong UC-TASK-01): cảnh báo nhưng cho phép override, trao quyết định cuối cùng cho Quản lý dự án
   - Xử lý xung đột concurrency cho trùng tên (TA.2 trong UC-PROJ-01)
   - Pattern chọn nhiều người được giao (TA.1 trong UC-TASK-01) dùng cùng trường với định dạng hiển thị rõ ràng
   - Tham chiếu Business Rule bằng ID thay vì nhúng trực tiếp trong bước Quy trình chính
