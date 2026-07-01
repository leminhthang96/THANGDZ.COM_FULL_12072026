# PROJECT PLAN - Website cá nhân thương hiệu, dịch vụ, nội dung, tài khoản và thanh toán

## 1. Tổng quan dự án

Dự án là một website cá nhân chuyên nghiệp dùng để xây dựng thương hiệu cá nhân, giới thiệu dịch vụ/giải pháp, đăng tin tức, viết hướng dẫn, quản lý tài khoản người dùng, xử lý thanh toán và cung cấp trang quản trị admin.

Website hướng tới mô hình kết hợp giữa:

- Trang giới thiệu thương hiệu cá nhân.
- Website dịch vụ/giải pháp chuyên nghiệp.
- Blog tin tức và kho hướng dẫn.
- Cổng tài khoản người dùng.
- Hệ thống bán dịch vụ, khóa học hoặc sản phẩm số.
- Admin dashboard để quản lý toàn bộ nội dung và giao dịch.

## 2. Mục tiêu website

- Giới thiệu cá nhân/thương hiệu cá nhân một cách rõ ràng, uy tín và chuyên nghiệp.
- Trình bày các dịch vụ, giải pháp, sản phẩm số hoặc khóa học đang cung cấp.
- Xây dựng khu vực tin tức để cập nhật nội dung mới.
- Xây dựng khu vực hướng dẫn để chia sẻ kiến thức, tài liệu và tutorial.
- Cho phép người dùng đăng ký, đăng nhập và quản lý thông tin cá nhân.
- Cho phép người dùng chọn dịch vụ/sản phẩm và thanh toán.
- Lưu lịch sử đơn hàng, thanh toán và trạng thái giao dịch.
- Cung cấp trang quản trị admin để quản lý nội dung, user, dịch vụ, đơn hàng và thanh toán.
- Tối ưu SEO để website có khả năng xuất hiện tốt trên Google.
- Thiết kế responsive để dùng tốt trên desktop, tablet và mobile.

## 3. Công nghệ sử dụng

### Front-end

- Next.js để xây dựng giao diện hiện đại, responsive, hỗ trợ SEO tốt.
- React component-based UI.
- Có thể dùng Tailwind CSS hoặc CSS module tùy định hướng thiết kế.
- Có thể dùng thư viện UI như shadcn/ui, Radix UI hoặc Mantine nếu cần tăng tốc phát triển.

### Back-end

- Python FastAPI để xây dựng REST API.
- Uvicorn để chạy ứng dụng ASGI.
- Gunicorn kết hợp Uvicorn Worker khi deploy production.
- SQLAlchemy hoặc SQLModel để làm ORM.
- Alembic để quản lý migration database.

### Database

- PostgreSQL để lưu users, bài viết, hướng dẫn, dịch vụ, đơn hàng, thanh toán và dữ liệu admin.

### Không sử dụng Docker

- Dự án sẽ chạy trực tiếp trên máy local và VPS Ubuntu.
- Deploy bằng Node.js, Python virtual environment, PostgreSQL, Nginx, systemd hoặc PM2.
- Không tạo `Dockerfile`.
- Không tạo `docker-compose.yml`.
- Không dùng container cho Next.js, FastAPI hoặc PostgreSQL.
- Không yêu cầu người dùng cài Docker Desktop khi phát triển local.
- Tài liệu cài đặt và deploy sẽ ưu tiên cách cài trực tiếp từng thành phần.

### Nguyên tắc triển khai không Docker

- Front-end Next.js chạy bằng Node.js trực tiếp.
- Back-end FastAPI chạy trong Python virtual environment.
- PostgreSQL cài trực tiếp trên máy local hoặc VPS Ubuntu.
- Nginx cài trực tiếp trên VPS để làm reverse proxy.
- Back-end production nên chạy bằng Gunicorn + Uvicorn Worker và được quản lý bằng systemd.
- Front-end production có thể chạy bằng PM2 hoặc systemd.
- Biến môi trường được quản lý bằng file `.env`, `.env.production` hoặc EnvironmentFile của systemd.
- Không phụ thuộc vào Docker image, container registry hoặc volume Docker.

## 4. Danh sách các trang chính

- Trang chủ
- Giới thiệu
- Giải pháp cung cấp
- Tin tức
- Hướng dẫn
- Tài khoản
- Thanh toán
- Admin dashboard

## 5. Phân tích chức năng từng trang

### Trang chủ

Chức năng chính:

- Hero section giới thiệu nhanh thương hiệu cá nhân.
- Call to action như "Liên hệ", "Xem giải pháp", "Đăng ký tư vấn", "Mua dịch vụ".
- Hiển thị các dịch vụ/giải pháp nổi bật.
- Hiển thị bài viết/tin tức mới nhất.
- Hiển thị hướng dẫn nổi bật.
- Hiển thị đánh giá, thành tựu, số liệu hoặc case study nếu có.
- Footer gồm thông tin liên hệ, mạng xã hội, chính sách, điều khoản.

Nội dung nên có:

- Tên thương hiệu/cá nhân.
- Lĩnh vực chuyên môn.
- Vấn đề khách hàng đang gặp.
- Giải pháp bạn cung cấp.
- Lý do nên tin tưởng.

### Giới thiệu

Chức năng chính:

- Giới thiệu cá nhân, kinh nghiệm, chuyên môn và giá trị cốt lõi.
- Trình bày câu chuyện thương hiệu.
- Hiển thị kỹ năng, chứng chỉ, thành tựu, dự án đã làm.
- Có khu vực liên hệ hoặc đặt lịch tư vấn.

Nội dung nên có:

- Bạn là ai.
- Bạn giúp ai.
- Bạn giải quyết vấn đề gì.
- Bạn khác biệt như thế nào.

### Giải pháp cung cấp

Chức năng chính:

- Danh sách dịch vụ/giải pháp.
- Trang chi tiết từng dịch vụ.
- Giá, mô tả, quyền lợi, kết quả đầu ra.
- CTA mua ngay, đăng ký tư vấn hoặc thêm vào đơn hàng.
- Bộ lọc theo nhóm dịch vụ nếu có nhiều dịch vụ.

Ví dụ loại giải pháp:

- Tư vấn cá nhân/doanh nghiệp.
- Xây dựng website/app.
- Khóa học online.
- Sản phẩm số.
- Gói mentoring.
- Tài liệu trả phí.

### Tin tức

Chức năng chính:

- Danh sách bài viết tin tức.
- Trang chi tiết bài viết.
- Danh mục bài viết.
- Tìm kiếm bài viết.
- Phân trang hoặc infinite scroll.
- Bài viết liên quan.
- SEO metadata cho từng bài viết.

Trạng thái bài viết:

- Draft.
- Published.
- Archived.

### Hướng dẫn

Chức năng chính:

- Danh sách bài hướng dẫn/tutorial.
- Trang chi tiết hướng dẫn.
- Chia hướng dẫn theo chủ đề, trình độ hoặc chuỗi bài.
- Hỗ trợ nội dung dài, có mục lục.
- Có thể thêm video, hình ảnh, file tải xuống hoặc code snippet ở các phase sau.

Khác biệt với Tin tức:

- Tin tức thiên về cập nhật, thông báo, quan điểm.
- Hướng dẫn thiên về tutorial, kiến thức thực hành, tài liệu học tập.

### Tài khoản

Chức năng chính:

- Đăng ký tài khoản.
- Đăng nhập.
- Đăng xuất.
- Quên mật khẩu.
- Cập nhật thông tin cá nhân.
- Đổi mật khẩu.
- Xem lịch sử đơn hàng.
- Xem lịch sử thanh toán.
- Xem dịch vụ/sản phẩm đã mua.

Thông tin người dùng:

- Họ tên.
- Email.
- Số điện thoại.
- Avatar.
- Vai trò: user/admin.
- Trạng thái tài khoản.

### Thanh toán

Chức năng chính:

- Chọn dịch vụ/sản phẩm.
- Tạo đơn hàng.
- Xem chi tiết đơn hàng.
- Chọn phương thức thanh toán.
- Thanh toán.
- Xác nhận trạng thái thanh toán.
- Lưu lịch sử giao dịch.
- Gửi email xác nhận nếu cần.

Phương thức thanh toán có thể tích hợp:

- Chuyển khoản ngân hàng thủ công.
- Cổng thanh toán nội địa.
- Stripe hoặc PayPal nếu bán quốc tế.
- MoMo, ZaloPay, VNPay nếu phục vụ thị trường Việt Nam.

### Admin dashboard

Chức năng chính:

- Tổng quan số liệu: users, bài viết, đơn hàng, doanh thu.
- Quản lý bài viết.
- Quản lý hướng dẫn.
- Quản lý dịch vụ/giải pháp.
- Quản lý user.
- Quản lý đơn hàng.
- Quản lý thanh toán.
- Quản lý trạng thái xuất bản nội dung.
- Phân quyền admin.

## 6. Đề xuất chức năng Front-end

### Layout và navigation

- Header có menu:
  - Trang chủ
  - Giới thiệu
  - Giải pháp cung cấp
  - Tin tức
  - Hướng dẫn
  - Tài khoản
  - Thanh toán
- Header responsive với mobile menu.
- Footer có thông tin liên hệ, social links, chính sách, điều khoản.
- Breadcrumb cho trang chi tiết.

### UI/UX chính

- Giao diện flat, hiện đại, sạch, dễ đọc.
- Ưu tiên khoảng trắng hợp lý, typography rõ ràng.
- CTA nổi bật nhưng không gây rối.
- Card dịch vụ/bài viết dễ scan.
- Form có validation rõ ràng.
- Loading state, empty state và error state cho các trang dữ liệu.

### SEO Front-end

- Metadata riêng cho từng trang.
- Open Graph cho chia sẻ mạng xã hội.
- Sitemap và robots.txt.
- URL thân thiện, ví dụ:
  - `/tin-tuc/ten-bai-viet`
  - `/huong-dan/ten-huong-dan`
  - `/giai-phap/ten-dich-vu`

### Khu vực tài khoản

- Trang đăng nhập.
- Trang đăng ký.
- Trang quên mật khẩu.
- Trang hồ sơ cá nhân.
- Trang lịch sử đơn hàng.
- Trang lịch sử thanh toán.

### Khu vực admin

- Layout riêng cho admin.
- Sidebar điều hướng.
- Table quản lý dữ liệu.
- Form tạo/sửa nội dung.
- Xác nhận trước khi xóa.
- Bộ lọc, tìm kiếm, phân trang.

## 7. Đề xuất chức năng Back-end

### Authentication và Authorization

- Đăng ký tài khoản.
- Đăng nhập bằng email/password.
- Hash password bằng bcrypt hoặc argon2.
- JWT access token và refresh token.
- Phân quyền user/admin.
- Middleware kiểm tra token.
- API quên mật khẩu và đặt lại mật khẩu.

### Quản lý nội dung

- CRUD bài viết tin tức.
- CRUD bài hướng dẫn.
- CRUD dịch vụ/giải pháp.
- Upload ảnh đại diện bài viết/dịch vụ nếu cần.
- Trạng thái nội dung: draft, published, archived.
- Slug tự động cho URL SEO.

### Quản lý user

- User tự xem/cập nhật hồ sơ.
- Admin xem danh sách user.
- Admin khóa/mở tài khoản.
- Admin chỉnh vai trò nếu cần.

### Quản lý đơn hàng và thanh toán

- Tạo đơn hàng.
- Tính tổng tiền.
- Lưu trạng thái đơn hàng.
- Tạo payment record.
- Nhận callback/webhook từ cổng thanh toán nếu tích hợp.
- Cập nhật trạng thái thanh toán.
- Trả lịch sử giao dịch cho user.

### Logging và monitoring cơ bản

- Log lỗi API.
- Log request quan trọng như thanh toán, đăng nhập, đổi mật khẩu.
- Không log password, token hoặc dữ liệu nhạy cảm.

## 8. Thiết kế Database PostgreSQL

### Users

Mục đích: lưu thông tin tài khoản người dùng.

Trường đề xuất:

- `id`
- `full_name`
- `email`
- `phone`
- `password_hash`
- `avatar_url`
- `role`
- `status`
- `email_verified_at`
- `created_at`
- `updated_at`

Ghi chú:

- `email` cần unique.
- `role` có thể là `user`, `admin`.
- `status` có thể là `active`, `inactive`, `banned`.

### Posts

Mục đích: lưu bài viết tin tức.

Trường đề xuất:

- `id`
- `title`
- `slug`
- `summary`
- `content`
- `thumbnail_url`
- `category`
- `status`
- `author_id`
- `published_at`
- `created_at`
- `updated_at`

Ghi chú:

- `slug` cần unique.
- `author_id` liên kết đến `users.id`.

### Guides

Mục đích: lưu bài hướng dẫn/tutorial.

Trường đề xuất:

- `id`
- `title`
- `slug`
- `summary`
- `content`
- `thumbnail_url`
- `level`
- `category`
- `status`
- `author_id`
- `published_at`
- `created_at`
- `updated_at`

Ghi chú:

- `level` có thể là `beginner`, `intermediate`, `advanced`.
- Có thể thêm bảng guide series ở phase sau nếu cần chuỗi bài học.

### Services

Mục đích: lưu dịch vụ, giải pháp, khóa học hoặc sản phẩm số.

Trường đề xuất:

- `id`
- `name`
- `slug`
- `short_description`
- `description`
- `price`
- `currency`
- `thumbnail_url`
- `service_type`
- `status`
- `created_at`
- `updated_at`

Ghi chú:

- `service_type` có thể là `service`, `course`, `digital_product`, `consulting`.
- `status` có thể là `active`, `inactive`, `draft`.

### Orders

Mục đích: lưu đơn hàng của người dùng.

Trường đề xuất:

- `id`
- `user_id`
- `order_code`
- `total_amount`
- `currency`
- `status`
- `note`
- `created_at`
- `updated_at`

Ghi chú:

- `status` có thể là `pending`, `paid`, `cancelled`, `failed`, `refunded`.
- Nên có thêm bảng `order_items` nếu một đơn hàng có nhiều dịch vụ/sản phẩm.

### Order Items

Mục đích: lưu chi tiết từng sản phẩm/dịch vụ trong đơn hàng.

Trường đề xuất:

- `id`
- `order_id`
- `service_id`
- `quantity`
- `unit_price`
- `total_price`
- `created_at`

### Payments

Mục đích: lưu thông tin thanh toán và giao dịch.

Trường đề xuất:

- `id`
- `order_id`
- `user_id`
- `payment_method`
- `provider`
- `provider_transaction_id`
- `amount`
- `currency`
- `status`
- `paid_at`
- `raw_response`
- `created_at`
- `updated_at`

Ghi chú:

- `status` có thể là `pending`, `success`, `failed`, `cancelled`, `refunded`.
- `raw_response` chỉ nên lưu dữ liệu cần thiết, tránh lưu thông tin nhạy cảm.

### Admin

Có hai hướng thiết kế:

1. Dùng chung bảng `users` với trường `role = admin`.
2. Tạo bảng riêng `admin_users` nếu cần tách quản trị khỏi người dùng thường.

Đề xuất ban đầu:

- Dùng chung bảng `users`.
- Quản lý quyền bằng `role`.
- Sau này nếu cần phân quyền chi tiết, thêm bảng `permissions` và `role_permissions`.

### Bảng bổ sung nên cân nhắc

- `categories`: quản lý danh mục bài viết/hướng dẫn.
- `tags`: gắn tag cho nội dung.
- `password_reset_tokens`: xử lý quên mật khẩu.
- `refresh_tokens`: quản lý phiên đăng nhập.
- `audit_logs`: ghi lại hành động admin quan trọng.
- `media_files`: quản lý file upload.

## 9. Đề xuất API cần có

### API đăng ký/đăng nhập

- `POST /auth/register`: đăng ký tài khoản.
- `POST /auth/login`: đăng nhập.
- `POST /auth/logout`: đăng xuất.
- `POST /auth/refresh`: cấp lại access token.
- `POST /auth/forgot-password`: yêu cầu đặt lại mật khẩu.
- `POST /auth/reset-password`: đặt lại mật khẩu.
- `GET /auth/me`: lấy thông tin user hiện tại.

### API quản lý user

- `GET /users/me`: xem hồ sơ cá nhân.
- `PUT /users/me`: cập nhật hồ sơ cá nhân.
- `PUT /users/me/password`: đổi mật khẩu.
- `GET /admin/users`: admin xem danh sách user.
- `GET /admin/users/{id}`: admin xem chi tiết user.
- `PUT /admin/users/{id}`: admin cập nhật user.
- `PATCH /admin/users/{id}/status`: admin khóa/mở tài khoản.

### API quản lý bài viết

- `GET /posts`: danh sách bài viết đã xuất bản.
- `GET /posts/{slug}`: chi tiết bài viết.
- `GET /admin/posts`: admin xem tất cả bài viết.
- `POST /admin/posts`: tạo bài viết.
- `PUT /admin/posts/{id}`: cập nhật bài viết.
- `DELETE /admin/posts/{id}`: xóa bài viết.
- `PATCH /admin/posts/{id}/publish`: xuất bản bài viết.

### API quản lý hướng dẫn

- `GET /guides`: danh sách hướng dẫn đã xuất bản.
- `GET /guides/{slug}`: chi tiết hướng dẫn.
- `GET /admin/guides`: admin xem tất cả hướng dẫn.
- `POST /admin/guides`: tạo hướng dẫn.
- `PUT /admin/guides/{id}`: cập nhật hướng dẫn.
- `DELETE /admin/guides/{id}`: xóa hướng dẫn.
- `PATCH /admin/guides/{id}/publish`: xuất bản hướng dẫn.

### API quản lý dịch vụ

- `GET /services`: danh sách dịch vụ đang hoạt động.
- `GET /services/{slug}`: chi tiết dịch vụ.
- `GET /admin/services`: admin xem tất cả dịch vụ.
- `POST /admin/services`: tạo dịch vụ.
- `PUT /admin/services/{id}`: cập nhật dịch vụ.
- `DELETE /admin/services/{id}`: xóa dịch vụ.
- `PATCH /admin/services/{id}/status`: đổi trạng thái dịch vụ.

### API tạo đơn hàng

- `POST /orders`: tạo đơn hàng.
- `GET /orders/me`: user xem đơn hàng của mình.
- `GET /orders/{id}`: xem chi tiết đơn hàng.
- `POST /orders/{id}/cancel`: hủy đơn hàng nếu còn pending.
- `GET /admin/orders`: admin xem danh sách đơn hàng.
- `GET /admin/orders/{id}`: admin xem chi tiết đơn hàng.

### API xử lý thanh toán

- `POST /payments/create`: tạo phiên thanh toán.
- `POST /payments/webhook/{provider}`: nhận webhook từ cổng thanh toán.
- `GET /payments/{id}`: xem trạng thái thanh toán.
- `POST /admin/payments/{id}/confirm`: admin xác nhận thanh toán thủ công nếu dùng chuyển khoản.
- `POST /admin/payments/{id}/refund`: xử lý hoàn tiền nếu có.

### API lịch sử giao dịch

- `GET /transactions/me`: user xem lịch sử giao dịch.
- `GET /admin/payments`: admin xem toàn bộ thanh toán.
- `GET /admin/reports/revenue`: admin xem báo cáo doanh thu.

## 10. Đề xuất luồng tài khoản người dùng

### Đăng ký

1. User mở trang đăng ký.
2. Nhập họ tên, email, số điện thoại, mật khẩu.
3. Front-end validate dữ liệu.
4. Back-end kiểm tra email đã tồn tại chưa.
5. Back-end hash password và tạo user.
6. Trả kết quả đăng ký thành công.
7. Có thể gửi email xác thực ở phase sau.

### Đăng nhập

1. User nhập email và mật khẩu.
2. Back-end kiểm tra user tồn tại và password đúng.
3. Back-end kiểm tra trạng thái tài khoản.
4. Back-end cấp access token và refresh token.
5. Front-end lưu token theo chiến lược bảo mật phù hợp.
6. User được chuyển về trang tài khoản hoặc trang trước đó.

### Quên mật khẩu

1. User nhập email.
2. Back-end tạo token đặt lại mật khẩu có thời hạn.
3. Gửi email chứa link reset password.
4. User nhập mật khẩu mới.
5. Back-end kiểm tra token hợp lệ.
6. Cập nhật password hash mới.

### Cập nhật thông tin cá nhân

1. User đăng nhập.
2. Mở trang hồ sơ.
3. Cập nhật họ tên, số điện thoại, avatar.
4. Back-end validate và lưu thay đổi.
5. Front-end cập nhật lại thông tin hiển thị.

## 11. Đề xuất luồng thanh toán

### Chọn dịch vụ/sản phẩm

1. User xem danh sách dịch vụ/giải pháp.
2. User mở trang chi tiết dịch vụ.
3. User chọn mua hoặc đăng ký.
4. Nếu chưa đăng nhập, chuyển đến đăng nhập/đăng ký.

### Tạo đơn hàng

1. Front-end gửi service/product đã chọn lên API.
2. Back-end kiểm tra dịch vụ còn active không.
3. Back-end tạo order với trạng thái `pending`.
4. Back-end tạo order item.
5. Trả về order code và thông tin thanh toán.

### Thanh toán

1. User chọn phương thức thanh toán.
2. Nếu thanh toán online, tạo payment session với provider.
3. Nếu chuyển khoản thủ công, hiển thị thông tin ngân hàng và mã đơn hàng.
4. User thực hiện thanh toán.

### Xác nhận thanh toán

1. Provider gửi webhook về API hoặc admin xác nhận thủ công.
2. Back-end kiểm tra chữ ký webhook nếu có.
3. Cập nhật payment thành `success`.
4. Cập nhật order thành `paid`.
5. Kích hoạt quyền truy cập dịch vụ/sản phẩm nếu cần.

### Lưu lịch sử giao dịch

1. Mọi payment đều được lưu.
2. User xem lịch sử trong trang tài khoản.
3. Admin xem toàn bộ giao dịch trong dashboard.

## 12. Đề xuất trang quản trị admin

### Dashboard tổng quan

- Tổng số user.
- Tổng số bài viết.
- Tổng số hướng dẫn.
- Tổng số dịch vụ.
- Tổng số đơn hàng.
- Doanh thu theo ngày/tháng.
- Giao dịch gần đây.

### Quản lý bài viết

- Tạo bài viết.
- Sửa bài viết.
- Xóa bài viết.
- Lưu nháp.
- Xuất bản.
- Tìm kiếm, lọc theo trạng thái/danh mục.

### Quản lý hướng dẫn

- Tạo hướng dẫn.
- Sửa hướng dẫn.
- Xóa hướng dẫn.
- Gắn danh mục, level, tag.
- Xuất bản hoặc ẩn bài.

### Quản lý dịch vụ/giải pháp

- Tạo dịch vụ.
- Sửa thông tin dịch vụ.
- Cập nhật giá.
- Bật/tắt trạng thái.
- Quản lý ảnh, mô tả, quyền lợi, CTA.

### Quản lý user

- Xem danh sách user.
- Tìm kiếm theo email, tên, số điện thoại.
- Xem chi tiết user.
- Khóa/mở tài khoản.
- Đổi role nếu cần.

### Quản lý đơn hàng/thanh toán

- Xem danh sách đơn hàng.
- Lọc theo trạng thái.
- Xem chi tiết order items.
- Xác nhận thanh toán thủ công.
- Theo dõi giao dịch thất bại.
- Xuất báo cáo ở phase sau nếu cần.

## 13. Kế hoạch xây dựng theo phase

### Phase 1: Phân tích yêu cầu và thiết kế cấu trúc

Mục tiêu:

- Chốt phạm vi MVP.
- Xác định loại dịch vụ/sản phẩm cần bán.
- Chốt luồng user, admin và thanh toán.
- Thiết kế sitemap.
- Thiết kế kiến trúc front-end/back-end/database.

Kết quả cần có:

- Tài liệu yêu cầu.
- Sitemap.
- Wireframe cơ bản.
- Quy ước API.
- Quy ước database.

### Phase 2: Thiết kế database PostgreSQL

Mục tiêu:

- Thiết kế schema database.
- Xác định quan hệ giữa các bảng.
- Chuẩn bị migration bằng Alembic.

Kết quả cần có:

- ERD hoặc mô tả bảng.
- Migration ban đầu.
- Seed data cơ bản cho admin, dịch vụ mẫu, bài viết mẫu.

### Phase 3: Xây dựng giao diện website bằng Next.js

Mục tiêu:

- Tạo layout chính.
- Tạo header, footer, navigation.
- Xây dựng các trang public.
- Thiết kế responsive.

Kết quả cần có:

- Trang chủ.
- Trang giới thiệu.
- Trang giải pháp.
- Trang tin tức.
- Trang hướng dẫn.
- Trang chi tiết dịch vụ/bài viết/hướng dẫn.

### Phase 4: Xây dựng Back-end bằng FastAPI

Mục tiêu:

- Tạo cấu trúc FastAPI.
- Tạo route, schema, service layer.
- Cấu hình CORS.
- Cấu hình auth cơ bản.

Kết quả cần có:

- API health check.
- API auth.
- API public cho posts, guides, services.
- API admin cơ bản.

### Phase 5: Kết nối Back-end với PostgreSQL

Mục tiêu:

- Kết nối database.
- Cấu hình ORM.
- Tạo migration.
- CRUD dữ liệu thật.

Kết quả cần có:

- PostgreSQL chạy local.
- FastAPI đọc/ghi dữ liệu.
- Migration hoạt động.
- Seed data ban đầu.

### Phase 6: Xây dựng hệ thống bài viết/tin tức/hướng dẫn

Mục tiêu:

- Hoàn thiện CRUD nội dung.
- Hiển thị nội dung public.
- Tối ưu slug, SEO metadata.

Kết quả cần có:

- Admin tạo/sửa/xóa bài viết.
- Admin tạo/sửa/xóa hướng dẫn.
- User xem danh sách và chi tiết nội dung.
- Tìm kiếm, phân trang cơ bản.

### Phase 7: Xây dựng tài khoản người dùng

Mục tiêu:

- Hoàn thiện đăng ký, đăng nhập, đăng xuất.
- Trang hồ sơ người dùng.
- Đổi mật khẩu và quên mật khẩu.

Kết quả cần có:

- User auth hoạt động.
- Token bảo mật.
- Route bảo vệ cho trang tài khoản.
- User xem/cập nhật thông tin cá nhân.

### Phase 8: Xây dựng thanh toán

Mục tiêu:

- Cho phép user mua dịch vụ/sản phẩm.
- Tạo order và payment.
- Xử lý trạng thái thanh toán.

Kết quả cần có:

- Luồng tạo đơn hàng.
- Lịch sử đơn hàng.
- Lịch sử thanh toán.
- Tích hợp phương thức thanh toán đầu tiên.

Đề xuất MVP:

- Bắt đầu với chuyển khoản thủ công để đơn giản.
- Sau đó tích hợp VNPay/MoMo/ZaloPay/Stripe tùy thị trường.

### Phase 9: Xây dựng admin dashboard

Mục tiêu:

- Tạo khu vực quản trị đầy đủ.
- Quản lý user, nội dung, dịch vụ, đơn hàng, thanh toán.

Kết quả cần có:

- Admin login.
- Sidebar dashboard.
- CRUD nội dung.
- CRUD dịch vụ.
- Quản lý user.
- Quản lý order/payment.

### Phase 10: Kiểm thử, tối ưu SEO, responsive

Mục tiêu:

- Kiểm thử chức năng chính.
- Kiểm thử responsive.
- Tối ưu performance.
- Tối ưu SEO.
- Rà soát bảo mật.

Kết quả cần có:

- Test các luồng đăng ký, đăng nhập, mua hàng, thanh toán.
- Kiểm tra mobile/tablet/desktop.
- Sitemap, robots.txt, metadata.
- Kiểm tra lỗi 404/500.

### Phase 11: Deploy website lên VPS Ubuntu

Mục tiêu:

- Deploy production không dùng Docker.
- Cấu hình domain, SSL, Nginx.
- Chạy ổn định bằng systemd hoặc PM2.

Kết quả cần có:

- Front-end chạy tại `https://domain.com`.
- API chạy dưới `https://domain.com/api`.
- PostgreSQL chạy trên VPS.
- SSL HTTPS hoạt động.
- Có quy trình update code.

## 14. Các lưu ý về bảo mật

- Hash password bằng bcrypt hoặc argon2, không lưu password thô.
- Dùng HTTPS cho production.
- Bảo vệ API admin bằng role admin.
- Validate dữ liệu cả front-end và back-end.
- Dùng CORS chặt chẽ, không mở wildcard trong production.
- Rate limit API đăng nhập, đăng ký, quên mật khẩu.
- Chống SQL injection bằng ORM/query parameterized.
- Chống XSS khi hiển thị nội dung HTML/markdown.
- Chống CSRF nếu dùng cookie-based auth.
- Không commit `.env` lên git.
- Token, secret key, database password phải nằm trong biến môi trường.
- Kiểm tra chữ ký webhook khi tích hợp cổng thanh toán.
- Ghi audit log cho thao tác admin quan trọng.
- Backup database định kỳ.

## 15. Các lưu ý về SEO

- Mỗi trang có title và meta description riêng.
- Bài viết/hướng dẫn/dịch vụ có slug thân thiện.
- Tạo sitemap.xml.
- Tạo robots.txt.
- Dùng heading đúng cấu trúc: H1, H2, H3.
- Tối ưu tốc độ tải trang.
- Tối ưu ảnh: kích thước, lazy loading, alt text.
- Thêm Open Graph và Twitter Card.
- Dùng canonical URL nếu có nội dung trùng.
- Tạo schema markup cho article/service nếu cần.
- Trang lỗi 404 nên thân thiện và có link quay lại.

## 16. Các lưu ý về UI/UX

- Giao diện nên sạch, flat, hiện đại, dễ đọc.
- Navigation rõ ràng, người dùng biết đang ở đâu.
- CTA nên xuất hiện ở các vị trí quan trọng.
- Form ngắn gọn, thông báo lỗi dễ hiểu.
- Trang thanh toán cần đơn giản, ít bước.
- Trang tài khoản cần rõ lịch sử đơn hàng/thanh toán.
- Admin dashboard cần ưu tiên hiệu quả thao tác, bảng dữ liệu dễ lọc/tìm.
- Responsive tốt trên mobile.
- Không dùng quá nhiều animation gây chậm hoặc phân tán.
- Trạng thái loading/error/empty cần được thiết kế đầy đủ.

## 17. Danh sách việc cần làm sau khi đọc file markdown này

1. Chốt tên thương hiệu/cá nhân và thông điệp chính.
2. Chốt nhóm khách hàng mục tiêu.
3. Liệt kê dịch vụ/giải pháp đầu tiên muốn đưa lên website.
4. Chốt mô hình thanh toán MVP: chuyển khoản thủ công hay cổng thanh toán.
5. Chốt các trang cần làm ở phiên bản đầu tiên.
6. Chốt tone thiết kế: màu sắc, typography, phong cách hình ảnh.
7. Chuẩn bị nội dung giới thiệu cá nhân.
8. Chuẩn bị ít nhất 3 dịch vụ/giải pháp mẫu.
9. Chuẩn bị ít nhất 3 bài viết tin tức hoặc hướng dẫn mẫu.
10. Chốt cấu trúc database MVP.
11. Chốt danh sách API MVP.
12. Tạo repository và cấu trúc thư mục front-end/back-end.
13. Cài môi trường local trực tiếp: Node.js, Python, PostgreSQL, không dùng Docker.
14. Bắt đầu Phase 1 và Phase 2 trước khi viết nhiều giao diện.
15. Sau khi MVP ổn định, triển khai Phase 8 thanh toán và Phase 9 admin dashboard.

---

### 18. Hướng dẫn deploy VPS Ubuntu

Tài liệu này hướng dẫn deploy dự án lên VPS Ubuntu không dùng Docker. Toàn bộ service sẽ được cài và chạy trực tiếp trên VPS, không dùng container, không dùng `Dockerfile`, không dùng `docker-compose`.

Mô hình đề xuất:

- Website Next.js chạy ở domain chính: `https://domain.com`
- API FastAPI chạy dưới path: `https://domain.com/api`
- PostgreSQL chạy trực tiếp trên VPS
- Nginx làm reverse proxy
- SSL HTTPS bằng Certbot
- Process được quản lý bằng systemd hoặc PM2

Các thành phần không sử dụng trong dự án:

- Docker Desktop
- Docker Engine
- Docker Compose
- Dockerfile
- Container registry
- PostgreSQL container

### 1. Chuẩn bị VPS Ubuntu

Yêu cầu đề xuất:

- Ubuntu 22.04 LTS hoặc 24.04 LTS.
- RAM tối thiểu 1GB, khuyến nghị 2GB trở lên.
- CPU tối thiểu 1 vCPU.
- Ổ cứng tối thiểu 20GB.
- Có quyền SSH root hoặc user có sudo.
- Domain đã trỏ DNS A record về IP VPS.

Việc cần làm ban đầu:

- SSH vào VPS.
- Tạo user deploy riêng nếu đang dùng root.
- Cập nhật hệ thống.
- Cấu hình firewall.
- Mở các port cần thiết:
  - `22` cho SSH
  - `80` cho HTTP
  - `443` cho HTTPS

Gợi ý bảo mật:

- Không dùng mật khẩu SSH yếu.
- Ưu tiên SSH key.
- Tắt đăng nhập root trực tiếp nếu đã có user sudo ổn định.

### 2. Cài Node.js

Next.js cần Node.js. Nên dùng bản LTS.

Khuyến nghị:

- Dùng Node.js 20 LTS hoặc 22 LTS.
- Có thể cài qua NodeSource hoặc nvm.

Sau khi cài cần kiểm tra:

- `node -v`
- `npm -v`

Nếu dùng PM2 để chạy Next.js:

- Cài PM2 global.
- Dùng PM2 để start process front-end.
- Cấu hình PM2 startup để tự chạy lại khi VPS reboot.

### 3. Cài Python

FastAPI cần Python và môi trường ảo.

Khuyến nghị:

- Python 3.11 hoặc 3.12.
- Cài `python3`, `python3-venv`, `python3-pip`.

Sau khi cài cần kiểm tra:

- `python3 --version`
- `pip3 --version`

Back-end nên chạy trong virtual environment:

- Tạo thư mục backend.
- Tạo `.venv`.
- Kích hoạt `.venv`.
- Cài dependencies từ `requirements.txt` hoặc công cụ quản lý package đang dùng.

### 4. Cài PostgreSQL

Cài PostgreSQL trực tiếp trên VPS.

Sau khi cài cần kiểm tra:

- PostgreSQL service đang chạy.
- Có thể đăng nhập bằng user `postgres`.
- Port mặc định `5432` chỉ nên mở nội bộ, không public ra internet nếu không cần.

Khuyến nghị:

- Database chỉ cho ứng dụng trên VPS kết nối qua localhost.
- Không mở port PostgreSQL public.
- Backup database định kỳ.

### 5. Cấu hình database PostgreSQL

Việc cần làm:

- Tạo database cho dự án.
- Tạo database user riêng cho ứng dụng.
- Gán quyền user vào database.
- Cấu hình password mạnh.
- Cập nhật chuỗi kết nối database vào biến môi trường back-end.

Ví dụ biến môi trường:

- `DATABASE_URL=postgresql://app_user:strong_password@localhost:5432/app_db`

Lưu ý:

- Không commit thông tin database vào git.
- File `.env` chỉ nằm trên VPS hoặc môi trường local.
- Chạy migration trước khi start production API.

### 6. Deploy Back-end FastAPI bằng Uvicorn/Gunicorn

Mô hình production đề xuất:

- FastAPI chạy bằng Gunicorn.
- Gunicorn dùng Uvicorn Worker.
- Process được quản lý bằng systemd.
- Nginx proxy request `/api` về back-end.

Các bước tổng quát:

1. Clone source code lên VPS.
2. Vào thư mục back-end.
3. Tạo Python virtual environment.
4. Cài dependencies.
5. Tạo file `.env` production.
6. Chạy database migration.
7. Test API bằng health check.
8. Tạo systemd service cho back-end.
9. Enable và start service.

Biến môi trường back-end nên có:

- `DATABASE_URL`
- `SECRET_KEY`
- `ACCESS_TOKEN_EXPIRE_MINUTES`
- `REFRESH_TOKEN_EXPIRE_DAYS`
- `CORS_ORIGINS`
- `ENV=production`
- Thông tin payment provider nếu có.

Lưu ý path `/api`:

- Có thể cấu hình Nginx strip prefix `/api` trước khi proxy vào FastAPI.
- Hoặc cấu hình FastAPI chạy với root path `/api`.
- Cần thống nhất để docs, redirect và static path không lỗi.

### 7. Deploy Front-end Next.js

Mô hình production đề xuất:

- Build Next.js bằng `npm run build`.
- Chạy bằng `npm run start` hoặc PM2.
- Nginx proxy domain chính về Next.js.

Các bước tổng quát:

1. Vào thư mục front-end.
2. Cài dependencies.
3. Tạo file `.env.production`.
4. Cấu hình API base URL là `/api` hoặc `https://domain.com/api`.
5. Build production.
6. Start Next.js bằng PM2 hoặc systemd.
7. Kiểm tra website chạy ở port nội bộ, ví dụ `3000`.

Biến môi trường front-end nên có:

- `NEXT_PUBLIC_API_BASE_URL=/api`
- Các public key của payment provider nếu cần.

Lưu ý:

- Chỉ biến có prefix `NEXT_PUBLIC_` mới được expose ra browser.
- Không đặt secret key trong biến `NEXT_PUBLIC_`.

### 8. Cấu hình Nginx reverse proxy

Nginx sẽ nhận request từ internet và chuyển tiếp:

- `/` về Next.js.
- `/api` về FastAPI.

Mô hình port nội bộ ví dụ:

- Next.js: `127.0.0.1:3000`
- FastAPI: `127.0.0.1:8000`

Nguyên tắc cấu hình:

- Request đến `https://domain.com` chuyển về Next.js.
- Request đến `https://domain.com/api` chuyển về FastAPI.
- Nginx cần set các header proxy như Host, X-Real-IP, X-Forwarded-For, X-Forwarded-Proto.
- Nếu strip prefix `/api`, cần cấu hình rewrite hoặc proxy_pass phù hợp.

Lưu ý quan trọng:

- Kiểm tra Nginx config trước khi reload.
- Reload Nginx thay vì restart nếu chỉ đổi config.
- Tránh để Next.js và FastAPI public trực tiếp ra internet nếu không cần.

### 9. Cấu hình custom domain

Các bước:

1. Vào trang quản lý DNS của domain.
2. Tạo A record:
   - Host: `@`
   - Value: IP VPS
3. Tạo A record cho `www` nếu cần:
   - Host: `www`
   - Value: IP VPS
4. Chờ DNS propagate.
5. Kiểm tra domain đã trỏ đúng IP.

Khuyến nghị:

- Dùng cả `domain.com` và `www.domain.com`.
- Chọn một bản chính, ví dụ `domain.com`.
- Redirect `www` về non-www hoặc ngược lại để tránh trùng SEO.

### 10. Cấu hình website và API dùng chung 1 domain

Mục tiêu:

- Website: `https://domain.com`
- API: `https://domain.com/api`

Ưu điểm:

- Dễ cấu hình CORS hơn.
- Cookie/session dễ quản lý hơn nếu sau này dùng cookie auth.
- Người dùng chỉ cần nhớ một domain.
- Triển khai SSL đơn giản hơn.

Cách tổ chức request:

- Front-end gọi API qua `/api`.
- Nginx nhận `/api/*` và proxy sang FastAPI.
- Next.js xử lý tất cả route còn lại.

Điểm cần kiểm tra:

- `GET https://domain.com` trả về website.
- `GET https://domain.com/api/health` trả về health check API.
- Không bị Next.js bắt nhầm route `/api`.
- Không bị lỗi redirect slash.
- API docs nếu bật cần hoạt động đúng dưới `/api/docs` hoặc endpoint tương ứng.

### 11. Cấu hình SSL HTTPS bằng Certbot

Dùng Certbot để cấp SSL Let's Encrypt.

Các bước tổng quát:

1. Cài Certbot và plugin Nginx.
2. Chạy Certbot cho domain.
3. Chọn tự động redirect HTTP sang HTTPS.
4. Kiểm tra SSL.
5. Kiểm tra auto-renew.

Sau khi cấu hình:

- `http://domain.com` nên tự chuyển sang `https://domain.com`.
- Chứng chỉ tự động gia hạn.
- Nginx config có block SSL cho domain.

Lưu ý:

- Domain phải trỏ đúng IP trước khi chạy Certbot.
- Port 80 và 443 phải mở firewall.
- Không chạy Certbot khi Nginx config đang lỗi.

### 12. Cấu hình PM2 hoặc systemd để chạy dự án ổn định

### Phương án đề xuất

- Back-end FastAPI: dùng systemd.
- Front-end Next.js: dùng PM2 hoặc systemd.

### systemd cho back-end

Ưu điểm:

- Ổn định.
- Tự restart khi lỗi.
- Tự chạy lại khi VPS reboot.
- Dễ xem log bằng journalctl.

Cần cấu hình:

- Working directory.
- User chạy service.
- Environment file.
- Command chạy Gunicorn/Uvicorn Worker.
- Restart policy.

### PM2 cho front-end

Ưu điểm:

- Quản lý Node.js app tiện.
- Xem log dễ.
- Restart app dễ.
- Có startup script.

Cần cấu hình:

- App name.
- Working directory.
- Command start Next.js.
- Environment production.
- Lưu PM2 process list.
- Cấu hình PM2 startup.

### Khi nào dùng toàn bộ systemd?

Nếu muốn đồng nhất vận hành, có thể dùng systemd cho cả Next.js và FastAPI. Đây là lựa chọn gọn, ít dependency global hơn PM2.

### 13. Cách update code khi có phiên bản mới

Quy trình update đề xuất:

1. SSH vào VPS.
2. Vào thư mục source code.
3. Pull code mới từ git.
4. Update dependencies nếu có thay đổi.
5. Chạy migration database nếu có.
6. Build lại Next.js.
7. Restart front-end process.
8. Restart back-end service.
9. Reload Nginx nếu có đổi config.
10. Kiểm tra website, API, đăng nhập, thanh toán.

Lưu ý:

- Trước khi update production nên backup database.
- Nếu có migration lớn, nên có kế hoạch rollback.
- Không update trực tiếp vào giờ cao điểm nếu website có người dùng thật.
- Nên lưu release note nội bộ cho mỗi lần deploy.

### 14. Các lỗi thường gặp khi deploy

### Website không truy cập được

Nguyên nhân có thể:

- DNS chưa trỏ đúng IP.
- Firewall chưa mở port 80/443.
- Nginx chưa chạy.
- Nginx config lỗi.
- Next.js process chưa chạy.

Cách kiểm tra:

- Kiểm tra DNS.
- Kiểm tra firewall.
- Kiểm tra trạng thái Nginx.
- Kiểm tra log Nginx.
- Kiểm tra process Next.js.

### API trả 502 Bad Gateway

Nguyên nhân có thể:

- FastAPI service chưa chạy.
- Sai port proxy trong Nginx.
- Gunicorn/Uvicorn lỗi khi start.
- Biến môi trường thiếu.
- Database không kết nối được.

Cách kiểm tra:

- Kiểm tra systemd service back-end.
- Kiểm tra log back-end.
- Gọi API trực tiếp qua localhost trên VPS.
- Kiểm tra `DATABASE_URL`.

### Lỗi CORS

Nguyên nhân có thể:

- Front-end gọi sai API domain.
- Back-end CORS chưa cho phép domain production.
- Dùng khác domain/subdomain mà chưa cấu hình đúng.

Cách xử lý:

- Nếu dùng chung domain `/api`, ưu tiên gọi relative path `/api`.
- Cấu hình `CORS_ORIGINS` đúng domain.
- Không dùng wildcard trong production nếu có auth.

### SSL không cấp được

Nguyên nhân có thể:

- Domain chưa trỏ đúng IP.
- Port 80 bị chặn.
- Nginx config lỗi.
- Đã vượt giới hạn Let's Encrypt do thử quá nhiều lần.

Cách xử lý:

- Kiểm tra DNS.
- Kiểm tra firewall.
- Test Nginx config.
- Chờ DNS propagate rồi chạy lại.

### Database không kết nối được

Nguyên nhân có thể:

- Sai username/password/database.
- PostgreSQL chưa chạy.
- User chưa có quyền.
- App đang dùng sai host/port.
- File `.env` chưa được load.

Cách xử lý:

- Kiểm tra service PostgreSQL.
- Đăng nhập thử bằng database user.
- Kiểm tra quyền database.
- Kiểm tra biến `DATABASE_URL`.

### Next.js build lỗi

Nguyên nhân có thể:

- Thiếu biến môi trường.
- Sai phiên bản Node.js.
- Dependency chưa cài đủ.
- Lỗi TypeScript/lint/build.

Cách xử lý:

- Kiểm tra Node.js version.
- Cài lại dependencies.
- Kiểm tra `.env.production`.
- Build thử trên local trước khi deploy.

### Thanh toán không callback về được

Nguyên nhân có thể:

- Webhook URL sai.
- API chưa public đúng path `/api`.
- SSL lỗi.
- Provider yêu cầu verify signature nhưng back-end kiểm tra sai.
- Firewall hoặc Nginx chặn request.

Cách xử lý:

- Kiểm tra webhook URL trong provider.
- Kiểm tra log Nginx và back-end.
- Kiểm tra chữ ký webhook.
- Tạo endpoint test webhook riêng trong môi trường staging nếu cần.

### 15. Checklist kiểm tra sau khi deploy

### Hạ tầng

- Domain trỏ đúng IP VPS.
- HTTP tự redirect sang HTTPS.
- SSL hợp lệ.
- Nginx đang chạy.
- PostgreSQL đang chạy.
- Back-end service đang chạy.
- Front-end process đang chạy.

### Website

- Trang chủ truy cập được.
- Menu hoạt động.
- Trang giới thiệu hoạt động.
- Trang giải pháp hoạt động.
- Trang tin tức hoạt động.
- Trang hướng dẫn hoạt động.
- Responsive trên mobile ổn.
- Không có lỗi console nghiêm trọng.

### API

- Health check API hoạt động tại `/api/health`.
- API public trả dữ liệu.
- API auth hoạt động.
- API admin được bảo vệ.
- API lỗi trả response rõ ràng.

### Tài khoản

- Đăng ký thành công.
- Đăng nhập thành công.
- Đăng xuất thành công.
- Cập nhật hồ sơ thành công.
- Quên mật khẩu hoạt động nếu đã triển khai.

### Thanh toán

- Tạo đơn hàng thành công.
- Tạo payment thành công.
- Xác nhận thanh toán hoạt động.
- Lịch sử giao dịch hiển thị đúng.
- Admin xem được đơn hàng/thanh toán.

### Admin

- Admin đăng nhập được.
- Admin tạo/sửa/xóa bài viết.
- Admin tạo/sửa/xóa hướng dẫn.
- Admin tạo/sửa/xóa dịch vụ.
- Admin quản lý user.
- Admin quản lý order/payment.

### Bảo mật và vận hành

- `.env` không public.
- PostgreSQL không mở public nếu không cần.
- Secret key đủ mạnh.
- CORS production cấu hình đúng.
- Log không chứa password/token.
- Backup database đã có kế hoạch.
- Process tự restart khi reboot.
- Có quy trình update code rõ ràng.

