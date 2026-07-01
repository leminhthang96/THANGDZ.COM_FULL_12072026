---
name: cc-srs-writer
description: |
  Sinh tài liệu đặc tả yêu cầu phần mềm (Software Requirements Specification - SRS) chuẩn cho trưởng nhóm phát triển (Development Lead) và kiến trúc sư hệ thống (System Architect).
  Hỗ trợ 3 chế độ: Chuyển đổi từ PRD, Mở rộng từ Use Case, Viết mới từ đầu.

  KÍCH HOẠT khi người dùng yêu cầu: viết, tạo, chuyển đổi, mở rộng hoặc đánh giá tài liệu đặc tả yêu cầu phần mềm (SRS / Software Requirements Specification).
  Kể cả khi người dùng dán tài liệu yêu cầu sản phẩm (PRD), Use Case, hoặc feature description để yêu cầu sinh SRS.

  KHÔNG DÙNG ĐỂ: viết tài liệu yêu cầu sản phẩm (Product Requirements Document - PRD) (dùng cc-prd-writer), viết câu chuyện người dùng (User Story) hoặc tiêu chí nghiệm thu (Acceptance Criteria) (dùng cc-user-story-acceptance-criteria-writer), viết Use Case chuẩn tắc (dùng cc-use-case-writer), hoặc viết tài liệu thiết kế kiến trúc (Architecture Design Document) (dùng design-document-writer hoặc tài liệu riêng).
---

# Software Requirements Specification Writer

## Mục đích

Hỗ trợ trưởng nhóm phát triển (Development Lead) và kiến trúc sư hệ thống (System Architect) chuyển đổi yêu cầu nghiệp vụ (từ PRD hoặc Use Case) thành tài liệu đặc tả kỹ thuật (SRS) theo tinh thần IEEE 830 / ISO/IEC/IEEE 29148, nơi mỗi mô tả kỹ thuật có thể truy xuất ngược về FR tương ứng trong tài liệu yêu cầu sản phẩm (PRD).

**Nguyên tắc vàng:**
> SRS mô tả **INTERFACE, CONTRACT, DATA MODEL và HÀNH VI KỸ THUẬT** bắt nguồn từ yêu cầu nghiệp vụ. SRS không thay thế PRD, không tự mở rộng nghiệp vụ, và mỗi phần tử phải truy xuất ngược về FR trong PRD.

## Phân biệt SRS và tài liệu liên quan

| | SRS (Software Requirements Specification) | PRD (Product Requirements Document) | Tài liệu thiết kế kiến trúc (ADD) |
| :--- | :--- | :--- | :--- |
| **Trả lời câu hỏi** | Interface nào, contract nào, data model/rule kỹ thuật ra sao? | Sản phẩm giải quyết vấn đề gì cho ai? | KIẾN TRÚC tổng thể như thế nào? |
| **Người viết** | Dev Lead / System Architect | BA / PO / PM | System Architect / Tech Lead |
| **Mức độ quyết định** | Quyết định triển khai (implementation decisions) | Quyết định sản phẩm (product decisions) | Quyết định cấu trúc (structural decisions) |
| **Thời điểm** | Sau PRD, trước khi bắt đầu coding | Đầu dự án | Sau khi có FR rõ ràng |
| **Ví dụ nội dung** | API endpoint, database schema, data contract, message format | FR mô tả hành vi, User Story, Acceptance Criteria | Service decomposition, deployment architecture, scaling strategy |

## Quy trình thực hiện (Workflow)

### Bước 1: Xác định chế độ (Mode)

Hỏi người dùng hoặc suy luận từ đầu vào:

- **Chế độ A (Chuyển đổi từ PRD):** Người dùng cung cấp PRD hoặc danh sách FR → Chuyển mỗi FR thành đặc tả kỹ thuật tương ứng.
- **Chế độ B (Mở rộng từ Use Case):** Người dùng cung cấp Use Case (Karl Wiegers 13 trường) → Bổ sung interface, data model, error contract cho mỗi Use Case.
- **Chế độ C (Viết mới từ đầu):** Người dùng mô tả tính năng chung → Thu thập thông tin kỹ thuật bắt buộc TRƯỚC KHI viết.

### Bước 2: Thu thập thông tin đầu vào bắt buộc

**Thu thập tối thiểu 5 thông tin sau:**

1. **PRD / Tài liệu yêu cầu nguồn**: Có PRD, danh sách FR hoặc Use Case nguồn không?
2. **Phạm vi kỹ thuật (Tech Scope)**: Đã có công nghệ quy định sẵn chưa? (Ngôn ngữ lập trình, framework, database, cloud provider, message broker...)
3. **Ràng buộc triển khai (Constraints)**: Ngân sách, thời hạn, team size, môi trường triển khai có ảnh hưởng đến thiết kế?
4. **Interface bắt buộc**: Có hệ thống bên ngoài phải tích hợp không? (Payment gateway, SSO, message queue...)
5. **Chuẩn nội bộ**: Có coding convention, naming convention, API design standard nội bộ cần tuân thủ?

**Khi thiếu thông tin:**

- Có 0-1 thông tin: **ĐẶT CÂU HỎI LÀM RÕ** trước, ưu tiên xác nhận PRD/FR/Use Case nguồn. Không tự tạo FR mới.
- Có 2-4 thông tin: Có thể viết bản nháp nếu người dùng muốn tiếp tục, nhưng mọi tech choice chưa được xác nhận phải ghi `[CHƯA XÁC ĐỊNH: cần xác nhận]`.
- Có đủ 5 thông tin: Có thể viết SRS hoàn chỉnh.
- Nếu có PRD nhưng thiếu Tech Scope: HỎI người dùng hoặc ghi `[CHƯA XÁC ĐỊNH: sẽ xác nhận với đội ngũ]`. KHÔNG tự suy diễn tech stack.
- Nếu không có PRD/FR/Use Case và người dùng chỉ mô tả chung: hỏi tối đa 5 câu làm rõ, sau đó ghi rõ giả định và khuyến nghị tạo PRD/FR trước khi bàn giao SRS chính thức.

### Bước 3: Xây dựng cấu trúc SRS theo mẫu chuẩn

Trình bày theo cấu trúc IEEE 830 / ISO/IEC/IEEE 29148 — mỗi phần gắn với FR tương ứng qua ma trận truy xuất.

````markdown
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
- [IEEE 830-1998] — Recommended Practice for Software Requirements Specifications (legacy reference)
- [ISO/IEC/IEEE 29148] — Requirements engineering
- [ISO/IEC 25010:2011] — Systems and software Quality Requirements and Evaluation (SQuaRE)

### 1.4 Người đọc dự kiến
- Trưởng nhóm phát triển (Development Lead)
- Kiến trúc sư hệ thống (System Architect)
- Lập trình viên (Developer)
- Kiểm thử viên (QA Engineer)

---

## 2. Yêu cầu chức năng (Functional Requirements) — Specification by FR

*[Mỗi yêu cầu chức năng từ PRD được mở rộng thành đặc tả kỹ thuật. Format: FR-[mã] từ PRD → SRS-[mã] tương ứng.]*

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

[Các quy tắc nghiệp vụ được triển khai dưới dạng thuật toán hoặc luồng xử lý cụ thể. Đây là bản dịch kỹ thuật của quy tắc nghiệp vụ trong FR.]

#### 2.1.4 Ràng buộc và giả định kỹ thuật

| Loại | Nội dung |
| :--- | :--- |
| [Ràng buộc kỹ thuật] | [VD: Input phải sanitize trước khi lưu vào database] |
| [Giả định kỹ thuật] | [VD: Timestamp dùng UTC, timezone convert ở presentation layer] |

---

## 3. Yêu cầu phi chức năng (Non-Functional Requirements)

*[Từ NFR trong PRD, chuyển thành tiêu chí kỹ thuật cụ thể.]*

### 3.1 Hiệu suất

| Tiêu chí | Ngưỡng | Điều kiện đo | Phương pháp đo |
| :--- | :--- | :--- | :--- |
| Thời gian phản hồi | [VD: p95 < 200ms] | [API cụ thể] | [Benchmark tool] |
| Thông lượng | [VD: 1000 req/s] | [Load test với N users] | [k6 / Gatling] |

### 3.2 Bảo mật

| Tiêu chí | Yêu cầu kỹ thuật | Chuẩn tham chiếu |
| :--- | :--- | :--- |
| Xác thực | [VD: JWT với RS256, expiry 8h, refresh token 7d] | [OAuth 2.0 / JWT RFC 7519] |
| Phân quyền | [VD: RBAC với JWT claims] | [NIST RBAC] |
| Mã hóa | [VD: TLS 1.3, data at rest AES-256] | [FIPS 140-2] |
| Input validation | [VD: whitelist + sanitize, parameterized queries] | [OWASP Top 10] |

### 3.3 Khả dụng

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

**Quy tắc: Mỗi phần tử trong SRS phải truy xuất về ít nhất 1 FR trong PRD.**

| SRS-[mã] | Tên | Loại | FR nguồn | Độ ưu tiên | Ghi chú |
| :--- | :--- | :--- | :--- | :--- | :--- |
| SRS-001 | [Tên] | [API / Data Model / Processing Rule] | FR-001, FR-003 | [P0/P1/P2] | [Ghi chú] |

---

## 6. Nhật ký quyết định kiến trúc (Architecture Decision Records)

*[Ghi lại các quyết định kỹ thuật cục bộ phục vụ FR. Không dùng phần này để thiết kế service decomposition, deployment topology hoặc scaling architecture tổng thể; các nội dung đó thuộc ADD.]*

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

````

### Bước 4: Áp dụng các quy tắc giới hạn (Guardrails)

**Tuyệt đối KHÔNG được làm trong SRS:**

| Hành động bị cấm | Lý do | Xử lý thay thế |
| :--- | :--- | :--- |
| Tự chọn tech stack (framework, database, cloud) khi chưa được xác nhận | Quyết định này thuộc về kiến trúc sư / đội ngũ | Ghi `[CHƯA XÁC ĐỊNH: cần xác nhận]` |
| Thêm chức năng không có trong PRD/FR | SRS phục vụ FR, không phải nơi mở rộng phạm vi | Tạo FR mới trong PRD trước |
| Viết 20+ API endpoints cho 1 tính năng nhỏ | Over-engineering, lãng phí | Chỉ mô tả interface cần thiết cho FR |
| Thiết kế chi tiết kiến trúc microservices, service decomposition | Đó là Architecture Design Document, không phải SRS | Tạo ADD hoặc ADR ở tài liệu kiến trúc riêng |
| Đề xuất third-party services không được nêu trong PRD | Mở rộng phạm vi không kiểm soát | Chỉ ghi tích hợp đã có trong PRD |
| Viết CI/CD pipeline, deployment strategy, monitoring setup | Đó là DevOps/SRE document, không phải SRS | Tạo tài liệu riêng |

### Bước 5: Tự đánh giá theo checklist chất lượng

Trước khi trình bày kết quả, tự kiểm tra theo **SRS Quality Checklist** 20 điểm (xem [quality-checklist-srs.md](./checklists/quality-checklist-srs.md)). Không dùng danh sách rút gọn làm tiêu chí bàn giao.

Các mục critical bắt buộc đạt:

- [ ] Mỗi SRS-[mã] có FR nguồn được ghi rõ?
- [ ] Không có tech stack được tự chọn (hoặc đã được đánh dấu CHƯA XÁC ĐỊNH)?
- [ ] Không có chức năng nào vượt quá phạm vi FR trong PRD?
- [ ] Ma trận truy xuất đầy đủ — không có SRS phần tử "mồ côi"?
- [ ] Không có CI/CD, deployment, monitoring trong SRS?
- [ ] Không có service decomposition, microservices design?
- [ ] Mỗi NFR có tiêu chí đo lường được (số cụ thể, điều kiện đo, phương pháp đo).

### Bước 6: Trình bày kết quả

1. **SRS hoàn chỉnh** — theo cấu trúc ở Bước 3.
2. **Ma trận truy xuất** — RTM liên kết SRS ↔ FR.
3. **Bảng tự kiểm tra chất lượng** — trạng thái Đạt / Cần cải thiện cho các mục critical và điểm tổng theo checklist 20 điểm.
4. **Nhật ký quyết định kỹ thuật cục bộ** — ADR chỉ cho lựa chọn phục vụ FR cụ thể.
5. **Xác nhận bàn giao** — nêu rõ các `[CHƯA XÁC ĐỊNH]` còn cần đội ngũ xác nhận.

## Mẫu chống lại thiết kế chuẩn (Anti-patterns)

| Sai | Đúng |
| :--- | :--- |
| Tự chọn tech stack: "Dùng Node.js + PostgreSQL + Redis" | Ghi `[CHƯA XÁC ĐỊNH]` hoặc xác nhận với đội ngũ |
| Tạo 84 endpoints cho 3 FR | Chỉ mô tả interface cần thiết cho FR |
| FR mô tả "gửi email xác nhận" nhưng SRS tự chọn SendGrid API | Ghi "email service integration"; provider chỉ ghi nếu đã được xác nhận |
| SRS mà không có PRD/FR nguồn | Hỏi người dùng: có PRD/FR/Use Case làm nguồn không? |
| Microservices design hoặc deployment topology trong SRS | Chuyển sang ADD hoặc ADR kiến trúc riêng |
| CI/CD pipeline, deployment strategy, monitoring setup trong SRS | Tạo tài liệu DevOps/SRE riêng |
| Không có RTM | Mỗi SRS-[mã] liên kết về FR-[mã] |

## Tài liệu tham khảo liên quan

- [quality-checklist-srs.md](./checklists/quality-checklist-srs.md) — Danh mục tự kiểm tra 20 điểm chất lượng SRS trước khi bàn giao.
- [srs-template.md](./references/srs-template.md) — Biểu mẫu SRS đầy đủ theo cấu trúc IEEE 830 / ISO/IEC/IEEE 29148.
- [prd-vs-srs.md](../cc-prd-writer/references/prd-vs-srs.md) — Tài liệu phân biệt chi tiết PRD và SRS.
- **RELATED SKILL:** `cc-use-case-writer` — Dùng khi cần chuyển Use Case (Karl Wiegers 13 trường) thành SRS.
- **RELATED SKILL:** `cc-prd-writer` — Dùng để tạo PRD trước khi chuyển sang SRS.
- **RELATED SKILL:** `cc-user-story-acceptance-criteria-writer` — Dùng khi cần bổ sung User Story ở tầng PRD / Sprint planning; SRS chỉ tham chiếu nếu User Story đã có.
