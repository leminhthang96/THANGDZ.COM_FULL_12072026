# PRD vs SRS — Phân biệt chi tiết

Hai loại tài liệu này thường bị nhầm lẫn. Bảng dưới làm rõ ranh giới và điểm khác biệt cốt lõi.

## So sánh tổng quan

| Tiêu chí | PRD (Product Requirements Document) | SRS (Software Requirements Specification) |
| :--- | :--- | :--- |
| **Định nghĩa** | Tài liệu mô tả sản phẩm từ góc nhìn nghiệp vụ | Tài liệu đặc tả hệ thống từ góc nhìn kỹ thuật |
| **Người viết chính** | BA / PO / PM | Dev Lead / System Architect |
| **Người đọc chính** | Đội ngũ phát triển, kiểm thử viên, stakeholder | Lập trình viên, kiểm thử viên, devops |
| **Ngôn ngữ** | Nghiệp vụ — "hệ thống phải LÀM GÌ" | Kỹ thuật — "hệ thống sẽ TRIỂN KHAI thế nào" |
| **Mức độ chi tiết** | Mức nghiệp vụ (what) | Mức kỹ thuật (how) |
| **Thời điểm** | Đầu dự án, trước khi thiết kế | Sau khi có PRD, trước khi code |
| **Cập nhật** | Khi yêu cầu nghiệp vụ thay đổi | Khi thiết kế kỹ thuật thay đổi |

## Ví dụ song song — cùng một yêu cầu

### Yêu cầu nghiệp vụ

> Khách hàng chọn thanh toán qua ví điện tử MoMo. Hệ thống tạo yêu cầu thanh toán và hiển thị mã QR cho khách hàng quét. Khi MoMo xác nhận thanh toán thành công, hệ thống tự động cập nhật trạng thái đơn hàng thành "Đã thanh toán" và gửi email xác nhận.

**→ Đây là nội dung cho PRD.**

### Đặc tả kỹ thuật

> API Endpoint: `POST /api/payments/momo/create`
>
> Request Body:
>
> ```json
> {
>   "order_id": "string",
>   "amount": "number",
>   "order_info": "string"
> }
> ```
>
> Response: Momo QR URL + transaction ID.
> Webhook: `POST /api/payments/momo/callback` — validate checksum (HMAC-SHA256), update order status in PostgreSQL `orders` table, emit event `order.paid` to message queue.
> Email: trigger via async job queue (Redis) → SendGrid API.

**→ Đây là nội dung cho SRS.**

## Quy tắc phân tách

Một câu mô tả thuộc **PRD** nếu trả lời được câu hỏi "**WHAT** does the system do?" (Hệ thống làm gì cho ai, kết quả gì?).

Một câu mô tả thuộc **SRS** nếu trả lời được câu hỏi "**HOW** does the system do it?" (Triển khai bằng công nghệ gì, kiến trúc ra sao, interface nào?).

## Dấu hiệu nhận biết nội dung sai vị trí

### ❌ Lỗi thường gặp trong PRD

| Nội dung sai vị trí | Sửa thành |
| :--- | :--- |
| "Gọi API MoMo qua HTTPS POST" | "Tạo yêu cầu thanh toán với mã giao dịch duy nhất" |
| "Lưu vào bảng orders trong PostgreSQL" | "Lưu thông tin đơn hàng với trạng thái ban đầu là Chờ thanh toán" |
| "Dùng Redis queue để gửi email" | "Gửi email xác nhận tự động trong vòng 30 giây sau khi tạo đơn" |
| "JWT token expiry 8 giờ" | "Người dùng phải đăng nhập lại sau khi hết phiên" |
| "React + TypeScript + Tailwind CSS" | "Giao diện web responsive, tương thích trình duyệt phổ biến" |

### ❌ Lỗi thường gặp trong SRS

| Nội dung sai vị trí | Sửa thành |
| :--- | :--- |
| "Hệ thống giúp tăng doanh thu 20%" | "Tích hợp cổng thanh toán MoMo và VNPay" |
| "Cải thiện trải nghiệm người dùng" | "Thời gian phản hồi API < 300ms" |
| "Đáp ứng nhu cầu khách hàng" | "Hỗ trợ thanh toán MoMo, VNPay, COD" |

## Khi nào dùng loại nào?

```
Bạn muốn...          → Dùng
────────────────────────────────────────────────────
Mô tả tính năng cho  → PRD
BA/PO/PM hiểu        → (mọi người)
                      
Mô tả để Dev code    → SRS
API, DB, arch         → (chỉ Dev/QA)

Cả hai đều cần?      → Viết PRD trước,
Nhận diện cách phân   → sau đó chuyển thành SRS
rõ ranh giới         → (không viết song song)

Sprint Planning?     → Dùng User Stories
                      → (từ PRD, dùng
                      →  cc-user-story-acceptance-criteria-writer)

Sử dụng dễ dàng?     → Viết Use Case
Tương tác chi tiết   → (từ FR trong PRD,
người-hệ thống      →  dùng cc-use-case-writer)
```

## Tóm tắt bằng một câu

- **PRD** trả lời: "Sản phẩm này giải quyết vấn đề gì, cho ai, kết quả đo lường thế nào?"
- **SRS** trả lời: "Hệ thống được xây dựng với kiến trúc gì, interface nào, database thế nào?"
