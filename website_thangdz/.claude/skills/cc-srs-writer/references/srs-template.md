# TÀI LIỆU ĐẶC TẢ YÊU CẦU PHẦN MỀM (SRS)

## [Tên hệ thống / Tính năng]

**Phiên bản:** X.Y
**Ngày:** YYYY-MM-DD
**Tác giả:** [Họ và tên]
**Tài liệu tham chiếu:** [PRD tên X, phiên bản Y]
**Trạng thái:** [Bản nháp / Để duyệt / Đã phê duyệt]

---

## 1. Tổng quan

### 1.1 Mục đích tài liệu

[Mục đích của SRS này là gì. 1-2 đoạn.]

### 1.2 Phạm vi hệ thống

[Mô tả hệ thống và ranh giới. Nêu rõ những gì THUỘC và KHÔNG THUỘC SRS này.]

### 1.3 Định nghĩa, từ viết tắt, chuẩn tham chiếu

| Thuật ngữ | Định nghĩa |
| :--- | :--- |
| [Thuật ngữ] | [Định nghĩa] |

**Chuẩn tham chiếu:**

- [IEEE 830-1998] — Recommended Practice for Software Requirements Specifications
- [ISO/IEC/IEEE 29148] — Requirements engineering
- [ISO/IEC 25010:2011] — Systems and software Quality Requirements and Evaluation (SQuaRE)

### 1.4 Người đọc dự kiến

- Trưởng nhóm phát triển (Development Lead)
- Kiến trúc sư hệ thống (System Architect)
- Lập trình viên (Developer)
- Kiểm thử viên (QA Engineer)

---

## 2. Yêu cầu chức năng — Specification by FR

### 2.1 [Nhóm chức năng / Module]

**FR-[mã] nguồn:** [Tên FR từ PRD]

**SRS-[mã]:** [Tên yêu cầu]

**Mô tả ngắn:** [1-2 câu mô tả interface chính]

**Nguồn:** [FR-[mã] trong PRD / Use Case UC-XX / Yêu cầu từ stakeholder]

#### 2.1.1 Giao diện (Interface)

**API Endpoint (nếu có):**

| Phương thức | Đường dẫn | Mô tả |
| :--- | :--- | :--- |
| [GET/POST/PUT/DELETE] | [/api/...] | [Mô tả chức năng] |

**Request:**

```json
{
  "[field_name]": {
    "type": "[string/number/boolean/array/object]",
    "required": [true/false],
    "description": "[mô tả ý nghĩa]"
  }
}
```

**Response:**

```json
{
  "data": {
    "[field_name]": { "type": "...", "description": "..." }
  },
  "meta": {
    "status": "[success/error]",
    "message": "[string]"
  }
}
```

**Mã lỗi (Error Codes):**

| Mã lỗi | HTTP Status | Nội dung | Nguyên nhân |
| :--- | :--- | :--- | :--- |
| [ERR-XXX] | [4xx/5xx] | [Mô tả] | [Nguyên nhân] |

#### 2.1.2 Mô hình dữ liệu (Data Model)

**Entity: [Tên]**

| Thuộc tính | Kiểu dữ liệu | Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| [field_name] | [VARCHAR(255)/INTEGER/BOOLEAN/TIMESTAMP...] | [NOT NULL / UNIQUE / FK...] | [Mô tả] |

**Index:**

- Primary Key: [field_name]
- Foreign Key: [field_name] → [related_table.primary_key]
- Indexes: [field_name(s)]

#### 2.1.3 Quy tắc xử lý (Processing Rules)

[Các quy tắc nghiệp vụ được triển khai dưới dạng thuật toán hoặc luồng xử lý cụ thể.]

#### 2.1.4 Ràng buộc và giả định kỹ thuật

| Loại | Nội dung |
| :--- | :--- |
| [Ràng buộc kỹ thuật] | [VD: Input phải sanitize trước khi lưu vào database] |
| [Giả định kỹ thuật] | [VD: Timestamp dùng UTC, timezone convert ở presentation layer] |

---

## 3. Yêu cầu phi chức năng (Non-Functional Requirements)

### 3.1 Hiệu suất (Performance)

| Tiêu chí | Ngưỡng | Điều kiện đo | Phương pháp đo |
| :--- | :--- | :--- | :--- |
| Thời gian phản hồi | [VD: p95 < 200ms] | [API cụ thể] | [Benchmark tool] |
| Thông lượng | [VD: 1000 req/s] | [Load test với N users] | [k6 / Gatling] |

### 3.2 Bảo mật (Security)

| Tiêu chí | Yêu cầu kỹ thuật | Chuẩn tham chiếu |
| :--- | :--- | :--- |
| Xác thực | [VD: JWT với RS256, expiry 8h, refresh token 7d] | [OAuth 2.0 / JWT RFC 7519] |
| Phân quyền | [VD: RBAC với JWT claims] | [NIST RBAC] |
| Mã hóa | [VD: TLS 1.3, data at rest AES-256] | [FIPS 140-2] |
| Input validation | [VD: whitelist + sanitize, parameterized queries] | [OWASP Top 10] |

### 3.3 Khả dụng (Availability)

| Tiêu chí | Yêu cầu |
| :--- | :--- |
| Uptime | [VD: 99.5% / tháng] |
| RPO | [Recovery Point Objective — VD: 1 giờ] |
| RTO | [Recovery Time Objective — VD: 4 giờ] |

### 3.4 Khả năng mở rộng

[Các chiến lược mở rộng: horizontal scaling, sharding, caching strategy...]

### 3.5 Khả năng tương thích

[Các platform, trình duyệt, phiên bản library tối thiểu được hỗ trợ.]

---

## 4. Giao diện hệ thống (System Interface)

### 4.1 Giao diện người dùng (User Interface)

*[Mô tả màn hình chính, không phải chi tiết UX — đó là việc của designer.]*

| Màn hình | Mô tả | FR liên quan |
| :--- | :--- | :--- |
| [Tên màn hình] | [Chức năng chính] | FR-[mã] |

### 4.2 Giao diện phần cứng (Hardware Interface)

[Nếu có giao tiếp phần cứng đặc biệt.]

### 4.3 Giao diện phần mềm (Software Interface)

[Tích hợp với hệ thống bên ngoài — ghi rõ contract. Provider chỉ được ghi nếu đã có trong PRD/FR hoặc đã được xác nhận.]

| Hệ thống | Chức năng tích hợp | Contract (API / Message format) | Trạng thái xác nhận |
| :--- | :--- | :--- | :--- |
| [VD: MoMo Payment Gateway, nếu đã có trong PRD] | [Tạo yêu cầu thanh toán, nhận webhook] | [Request/response JSON schema] | [Đã xác nhận / CHƯA XÁC ĐỊNH] |

### 4.4 Giao diện truyền thông (Communication Interface)

[Các giao thức truyền thông: HTTP/REST, gRPC, WebSocket, message queue...]

---

## 5. Ma trận truy xuất yêu cầu (Requirements Traceability Matrix)

| SRS-[mã] | Tên | Loại | FR nguồn | Độ ưu tiên | Ghi chú |
| :--- | :--- | :--- | :--- | :--- | :--- |
| SRS-001 | [Tên] | [API / Data Model / Processing Rule] | FR-001, FR-003 | [P0/P1/P2] | [Ghi chú] |

---

## 6. Nhật ký quyết định kiến trúc (Architecture Decision Records)

*[Chỉ ghi các quyết định kỹ thuật cục bộ phục vụ FR. Service decomposition, deployment topology hoặc scaling architecture tổng thể thuộc ADD.]*

| ADR-[mã] | Quyết định | Bối cảnh | Lựa chọn | Hệ quả |
| :--- | :--- | :--- | :--- | :--- |
| ADR-001 | [VD: Chọn PostgreSQL thay vì MySQL] | [Lý do cần đặt ra] | [Lựa chọn đã chọn] | [Ưu điểm / Nhược điểm] |

---

## 7. Phụ lục

### 7.1 Từ điển dữ liệu (Data Dictionary)

[Bảng giải thích chi tiết từng trường dữ liệu nếu cần thiết cho đội phát triển.]

### 7.2 Tài liệu tham khảo

- [Tài liệu 1 — đường dẫn]
- [Tài liệu 2 — đường dẫn]
