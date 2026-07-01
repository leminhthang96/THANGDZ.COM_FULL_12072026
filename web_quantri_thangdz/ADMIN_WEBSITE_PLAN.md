# 🏗️ KẾ HOẠCH XÂY DỰNG WEBSITE QUẢN TRỊ THANGDZ

> **Tài liệu brainstorm & roadmap chi tiết** — Phiên bản 1.0  
> **Ngày tạo:** 30/06/2026  
> **Cập nhật gần nhất:** 30/06/2026  
> **Tác giả:** Senior PM & Solution Architect

---

## Mục lục

1. [Tổng quan mục tiêu](#1-tổng-quan-mục-tiêu)
2. [Phạm vi hệ thống quản trị](#2-phạm-vi-hệ-thống-quản-trị)
3. [Kế hoạch theo Phase](#3-kế-hoạch-theo-phase)
4. [Đề xuất kiến trúc](#4-đề-xuất-kiến-trúc)
5. [UX/UI định hướng](#5-uxui-định-hướng)
6. [Checklist triển khai](#6-checklist-triển-khai)
7. [Ưu tiên MVP](#7-ưu-tiên-mvp)

---

## 1. Tổng quan mục tiêu

### 1.1. Website quản trị dùng để làm gì?

Website quản trị ThangDz Admin Panel là **trung tâm điều hành toàn bộ hoạt động** của ThangDz.Com, bao gồm:

- **Quản trị nội dung**: Tạo, chỉnh sửa, xuất bản, lưu nháp bài viết tin tức, hướng dẫn, dịch vụ.
- **Quản trị kinh doanh**: Theo dõi đơn hàng, xác nhận thanh toán, quản lý doanh thu.
- **Quản trị người dùng**: Xem, khóa/mở, phân quyền tài khoản người dùng.
- **Giám sát hoạt động**: Dashboard thống kê tổng quan, audit log, báo cáo kinh doanh.
- **Cấu hình hệ thống**: Tùy chỉnh thông tin website, SEO, cài đặt thanh toán, chatbot, webhook.

### 1.2. Ai là người dùng chính?

| Vai trò | Mô tả | Quyền truy cập |
|---------|--------|-----------------|
| **Super Admin** | Chủ website ThangDz, toàn quyền | Tất cả module, cấu hình hệ thống, phân quyền |
| **Admin** | Quản trị viên được ủy quyền | Quản lý nội dung, đơn hàng, người dùng |
| **Content Editor** | Nhân sự viết bài, tạo hướng dẫn | Quản lý posts, guides, media |
| **Support Staff** | Nhân sự hỗ trợ khách hàng | Xem đơn hàng, thanh toán, thông tin user |

### 1.3. Giá trị mang lại

- **Tiết kiệm thời gian**: Thao tác quản trị tập trung, không phải vào database thủ công.
- **Kiểm soát kinh doanh**: Theo dõi doanh thu, đơn hàng, thanh toán realtime.
- **Nâng cao chất lượng nội dung**: Quy trình soạn-duyệt-xuất bản bài viết chuyên nghiệp.
- **Bảo mật**: Phân quyền rõ ràng, audit log theo dõi hành động, không lộ dữ liệu nhạy cảm.
- **Mở rộng đội ngũ**: Sẵn sàng cho nhiều người cùng vận hành mà không xung đột.

---

## 2. Phạm vi hệ thống quản trị

### 2.1. Tổng hợp module

```
┌─────────────────────────────────────────────────────────────┐
│                   THANGDZ ADMIN PANEL                       │
├──────────────┬──────────────┬───────────────┬───────────────┤
│  Dashboard   │  Users Mgmt  │ Services Mgmt │  Posts Mgmt   │
├──────────────┼──────────────┼───────────────┼───────────────┤
│ Guides Mgmt  │ Orders Mgmt  │ Payments Mgmt │ Media Upload  │
├──────────────┼──────────────┼───────────────┼───────────────┤
│  Site Config │ Permissions  │  Audit Log    │  Reports      │
├──────────────┼──────────────┼───────────────┼───────────────┤
│ Chatbot/n8n  │  SEO Tools   │ Notifications │  Settings     │
└──────────────┴──────────────┴───────────────┴───────────────┘
```

### 2.2. Chi tiết từng module

#### 📊 Module 1: Dashboard tổng quan

**Hiện trạng backend:** Đã có API `GET /admin/dashboard/stats` trả về `total_users`, `total_posts`, `total_guides`, `total_services`, `total_orders`, `total_revenue`, `recent_orders`, `recent_payments`.

**Cần xây dựng thêm:**

| Tính năng | Mô tả | Mức ưu tiên |
|-----------|--------|-------------|
| Widget thống kê nhanh | Tổng user, post, order, revenue với icon và trend | 🔴 Cao |
| Biểu đồ doanh thu | Chart doanh thu theo ngày/tuần/tháng | 🟡 Trung bình |
| Đơn hàng gần đây | Table 5-10 đơn hàng mới nhất, click xem chi tiết | 🔴 Cao |
| Thanh toán chờ xử lý | Danh sách payment `pending` cần admin confirm | 🔴 Cao |
| Bài viết mới nhất | 5 bài viết/hướng dẫn mới nhất | 🟢 Thấp |
| User mới đăng ký | 5 user mới nhất | 🟢 Thấp |
| Biểu đồ đăng ký user | Trend user mới theo thời gian | 🟡 Trung bình |

---

#### 👥 Module 2: Quản lý người dùng

**Hiện trạng backend:**
- `GET /admin/users` — Danh sách user (đã có, không có phân trang).
- `PATCH /admin/users/{id}/status` — Đổi trạng thái (active/inactive/banned).
- `PATCH /admin/users/{id}/role` — Đổi vai trò (user/admin).

**Cần xây dựng thêm:**

| Tính năng | Backend | Frontend | Mức ưu tiên |
|-----------|---------|----------|-------------|
| Phân trang + search | Thêm query params `?page=&limit=&search=` | DataTable với search/filter | 🔴 Cao |
| Xem chi tiết user | `GET /admin/users/{id}` (chưa có) | Modal hoặc trang detail | 🔴 Cao |
| Xem đơn hàng của user | Join orders theo user_id | Tab trong user detail | 🟡 Trung bình |
| Export danh sách user | API trả CSV/Excel | Nút Download | 🟢 Thấp |
| Gửi email cho user | Tích hợp email service | Form gửi email | 🟢 Thấp (Phase sau) |

---

#### 🛠️ Module 3: Quản lý dịch vụ/giải pháp

**Hiện trạng backend:**
- `GET /services/admin/all` — Tất cả services (mọi status).
- `POST /services` — Tạo service mới (cần auth admin).
- `PUT /services/{id}` — Cập nhật.
- `DELETE /services/{id}` — Xóa.

**Model hiện tại:** `Service` có các trường: `name`, `slug`, `short_description`, `description`, `price`, `currency`, `thumbnail_url`, `service_type`, `status`.

**Cần xây dựng thêm:**

| Tính năng | Backend | Frontend | Mức ưu tiên |
|-----------|---------|----------|-------------|
| Phân trang + lọc theo type/status | Thêm query params | DataTable với filter | 🔴 Cao |
| Form tạo/sửa dịch vụ | Đã có API | Form với rich text editor cho description | 🔴 Cao |
| Upload thumbnail | API upload file | Image uploader component | 🟡 Trung bình |
| Sắp xếp thứ tự hiển thị | Thêm field `sort_order` vào model | Drag & drop hoặc input | 🟡 Trung bình |
| Preview trước khi publish | Không cần backend | Preview panel | 🟢 Thấp |
| Quản lý pricing plan | Thêm bảng `service_plans` | Tab pricing trong service detail | 🟢 Thấp (Phase sau) |

---

#### 📰 Module 4: Quản lý bài viết tin tức

**Hiện trạng backend:**
- `GET /posts/admin/all` — Tất cả posts.
- `POST /posts` — Tạo bài.
- `PUT /posts/{id}` — Cập nhật.
- `DELETE /posts/{id}` — Xóa.
- `PATCH /posts/{id}/publish` — Xuất bản.

**Model hiện tại:** `Post` có: `title`, `slug` (auto từ title), `summary`, `content`, `thumbnail_url`, `category`, `status` (draft/published/archived), `author_id`.

**Cần xây dựng thêm:**

| Tính năng | Backend | Frontend | Mức ưu tiên |
|-----------|---------|----------|-------------|
| Phân trang + search + filter status/category | Thêm query params | DataTable nâng cao | 🔴 Cao |
| Rich text editor | Đã có content text | Tích hợp TipTap hoặc Quill | 🔴 Cao |
| Markdown editor option | Backend lưu markdown/html | Toggle markdown/WYSIWYG | 🟡 Trung bình |
| Quản lý danh mục | Tạo bảng `categories` | CRUD categories | 🟡 Trung bình |
| SEO meta fields | Thêm fields `meta_title`, `meta_description`, `og_image` | Form SEO riêng | 🟡 Trung bình |
| Scheduled publish | Thêm field `scheduled_at` | Date picker cho lên lịch | 🟢 Thấp (Phase sau) |
| Bulk actions | API batch update/delete | Checkbox + action bar | 🟢 Thấp |

---

#### 📚 Module 5: Quản lý hướng dẫn/tài liệu

**Hiện trạng backend:** Tương tự Posts, có thêm field `level` (beginner/intermediate/advanced).

**Cần xây dựng thêm:**

| Tính năng | Backend | Frontend | Mức ưu tiên |
|-----------|---------|----------|-------------|
| CRUD cơ bản với filter level/category | Tương tự Posts module | DataTable + Form | 🔴 Cao |
| Quản lý guide series | Tạo bảng `guide_series` | Gom guides thành series | 🟡 Trung bình |
| Gắn file đính kèm | Tạo bảng `attachments` | Upload component | 🟢 Thấp |
| Code snippet highlight | Frontend rendering | Syntax highlighter | 🟢 Thấp |

---

#### 📦 Module 6: Quản lý đơn hàng

**Hiện trạng backend:**
- `GET /orders/admin/all` — Danh sách tất cả đơn hàng.
- `PUT /orders/{id}/status` — Cập nhật trạng thái.
- Model: `Order` → `OrderItem` → `Service`, status: pending/paid/cancelled/failed/refunded.

**Cần xây dựng thêm:**

| Tính năng | Backend | Frontend | Mức ưu tiên |
|-----------|---------|----------|-------------|
| Phân trang + filter status + search order_code | Thêm query params | DataTable | 🔴 Cao |
| Xem chi tiết đơn hàng | `GET /admin/orders/{id}` (cần chuẩn hóa) | Order detail page | 🔴 Cao |
| Timeline trạng thái | Lưu lịch sử thay đổi status | Visual timeline | 🟡 Trung bình |
| Ghi chú admin | Thêm field `admin_note` | Text area | 🟡 Trung bình |
| Export đơn hàng | API trả CSV | Nút Download | 🟢 Thấp |
| In hóa đơn | Generate PDF | Nút Print/Download PDF | 🟢 Thấp (Phase sau) |

---

#### 💳 Module 7: Quản lý thanh toán/giao dịch

**Hiện trạng backend:**
- `GET /payments/admin/all` — Danh sách thanh toán.
- `POST /payments/admin/{id}/confirm` — Xác nhận thanh toán thủ công.
- Model: `Payment` với `payment_method` (bank_transfer, vnpay), `status` (pending/success/failed/cancelled/refunded).

**Cần xây dựng thêm:**

| Tính năng | Backend | Frontend | Mức ưu tiên |
|-----------|---------|----------|-------------|
| Filter status + payment_method | Thêm query params | DataTable | 🔴 Cao |
| Confirm workflow rõ ràng | Đã có API | Confirm dialog với ghi chú | 🔴 Cao |
| Refund workflow | Thêm API `POST /admin/payments/{id}/refund` | Refund form | 🟡 Trung bình |
| Reconciliation | So khớp bank statement với payment | Upload bank statement | 🟢 Thấp (Phase sau) |
| Tích hợp VNPay/MoMo dashboard | Webhook + callback | Status display | 🟢 Thấp (Phase sau) |

---

#### 🤖 Module 8: Quản lý Chatbot AI / n8n Webhook

**Hiện trạng:** Frontend đã có component `ChatBot.tsx` (11KB).

**Cần xây dựng:**

| Tính năng | Backend | Frontend | Mức ưu tiên |
|-----------|---------|----------|-------------|
| Cấu hình chatbot endpoint | Thêm bảng `site_settings` | Form config chatbot URL | 🟡 Trung bình |
| Quản lý n8n webhook URLs | Lưu vào settings | Form CRUD webhook | 🟡 Trung bình |
| Xem log chatbot conversations | Tạo bảng `chatbot_logs` | DataTable + detail | 🟢 Thấp |
| Bật/tắt chatbot | Setting flag | Toggle switch | 🟡 Trung bình |
| Quản lý prompt templates | Tạo bảng `chatbot_prompts` | CRUD prompts | 🟢 Thấp (Phase sau) |

---

#### ⚙️ Module 9: Quản lý cấu hình website

**Hiện trạng:** Chưa có. Thông tin website hiện hardcode trong frontend.

**Cần xây dựng:**

| Tính năng | Backend | Frontend | Mức ưu tiên |
|-----------|---------|----------|-------------|
| Thông tin chung (tên, logo, slogan, email, phone) | Tạo bảng `site_settings` + API CRUD | Form settings | 🔴 Cao |
| SEO mặc định (meta title, description, og_image) | Lưu trong `site_settings` | Form SEO | 🟡 Trung bình |
| Social links (Facebook, Zalo, YouTube...) | Lưu trong `site_settings` | Form links | 🟡 Trung bình |
| Footer content | Lưu trong `site_settings` | Rich text editor | 🟢 Thấp |
| Maintenance mode | Flag `is_maintenance` | Toggle + message | 🟢 Thấp |
| Cấu hình payment methods | Lưu provider config | Form cấu hình | 🟡 Trung bình |

---

#### 🖼️ Module 10: Quản lý Media/Upload ảnh

**Hiện trạng:** Chưa có. Model `thumbnail_url` là string nhưng chưa có API upload.

**Cần xây dựng:**

| Tính năng | Backend | Frontend | Mức ưu tiên |
|-----------|---------|----------|-------------|
| Upload ảnh | API `POST /admin/media/upload` + lưu file local/S3 | Upload component | 🔴 Cao |
| Thư viện media | Tạo bảng `media_files` | Gallery grid | 🟡 Trung bình |
| Resize/optimize ảnh | Backend xử lý Pillow/Sharp | Auto resize khi upload | 🟡 Trung bình |
| Xóa media | API `DELETE /admin/media/{id}` | Nút xóa với confirm | 🟡 Trung bình |
| Tích hợp media picker vào editor | N/A | Media browser trong editor | 🟢 Thấp |

---

#### 🔐 Module 11: Quản lý phân quyền

**Hiện trạng:** Chỉ có 2 role: `user` và `admin`. Backend dùng `check_admin` dependency đơn giản.

**Cần xây dựng:**

| Tính năng | Backend | Frontend | Mức ưu tiên |
|-----------|---------|----------|-------------|
| Role mới: `super_admin`, `editor`, `support` | Cập nhật model User + deps.py | Role selector | 🟡 Trung bình |
| Permission matrix | Tạo bảng `permissions`, `role_permissions` | Permission grid | 🟡 Trung bình |
| Route guard theo permission | Middleware kiểm tra permission | Route protection | 🟡 Trung bình |
| Invite staff | API tạo user với role preset | Invite form + email | 🟢 Thấp (Phase sau) |

---

#### 📋 Module 12: Nhật ký hoạt động / Audit Log

**Hiện trạng:** Chưa có.

**Cần xây dựng:**

| Tính năng | Backend | Frontend | Mức ưu tiên |
|-----------|---------|----------|-------------|
| Log hành động admin | Tạo bảng `audit_logs` + middleware | DataTable log | 🟡 Trung bình |
| Filter theo user, action, thời gian | Query params | Filter bar | 🟡 Trung bình |
| Log chi tiết thay đổi | Lưu `old_value`, `new_value` dạng JSON | Diff viewer | 🟢 Thấp |
| Retention policy | Cronjob xóa log cũ | Setting retention days | 🟢 Thấp |

---

#### 📈 Module 13: Báo cáo/Thống kê

**Hiện trạng:** Chỉ có `total_revenue` tổng quát từ stats API.

**Cần xây dựng:**

| Tính năng | Backend | Frontend | Mức ưu tiên |
|-----------|---------|----------|-------------|
| Doanh thu theo ngày/tuần/tháng | API aggregate query | Line/Bar chart | 🟡 Trung bình |
| Top dịch vụ bán chạy | API group by service | Bar chart + table | 🟡 Trung bình |
| User growth report | API count by date range | Line chart | 🟢 Thấp |
| Content performance | View count tracking | Dashboard widget | 🟢 Thấp (Phase sau) |
| Export báo cáo PDF/Excel | Generate file | Download button | 🟢 Thấp |

---

## 3. Kế hoạch theo Phase

### Phase 0: Audit project hiện tại và chuẩn hóa kiến trúc

#### Mục tiêu
Đánh giá toàn bộ codebase website chính, xác định gap và chuẩn hóa convention trước khi xây admin riêng.

#### Tính năng cần làm

| # | Task | Chi tiết |
|---|------|----------|
| 1 | Audit backend API | Kiểm tra tất cả endpoint, response format, error handling |
| 2 | Audit database model | Review model, index, relationship, naming convention |
| 3 | Audit frontend code | Review component structure, state management, API client |
| 4 | Chuẩn hóa API response | Thống nhất format: `{ success, data, message, pagination }` |
| 5 | Chuẩn hóa error handling | Thống nhất error code, error message format |
| 6 | Chuẩn hóa naming convention | File, folder, API path, database column |
| 7 | Tài liệu API specification | Swagger/OpenAPI docs đầy đủ |

#### API/Backend cần chỉnh sửa

```python
# Chuẩn hóa response format cho tất cả API
# TRƯỚC:
@router.get("/admin/users")
def get_all_users(...):
    return db.query(User).all()  # Trả trực tiếp list

# SAU:
@router.get("/admin/users")
def get_all_users(..., page: int = 1, limit: int = 20, search: str = None):
    return {
        "success": True,
        "data": users,
        "pagination": {"page": page, "limit": limit, "total": total}
    }
```

#### Phát hiện từ audit codebase hiện tại

**Các vấn đề cần xử lý ngay:**

1. **Không có phân trang** — Tất cả endpoint admin trả về toàn bộ records. Sẽ gặp vấn đề performance khi data tăng.
2. **API path không nhất quán** — Admin posts dùng `/posts/admin/all` thay vì `/admin/posts`. Cần chuẩn hóa prefix `/admin/*`.
3. **Token lưu localStorage** — Đang lưu `token`, `role`, `email` trong localStorage. Cần xem xét httpOnly cookie cho admin.
4. **Admin page monolith** — Toàn bộ admin hiện tại là 1 file `page.tsx` (~500 lines, 24KB). Cần tách thành module.
5. **Thiếu validation phía backend** — `user_status` và `role` nhận query param string nhưng không dùng Pydantic schema.
6. **`datetime.utcnow()` deprecated** — Python 3.12+ đã deprecate, nên chuyển sang `datetime.now(UTC)`.

#### Tiêu chí hoàn thành
- [ ] Tài liệu audit hoàn chỉnh
- [ ] API naming convention thống nhất
- [ ] Response format chuẩn hóa
- [ ] Swagger docs cập nhật
- [ ] Không còn N+1 query trong admin API

#### Rủi ro/Khoảng chưa rõ
- Mức độ breaking change khi chuẩn hóa API path (website chính đang gọi API cũ).
- Cần backward compatible hoặc migration plan cho frontend cũ.

---

### Phase 1: Admin Foundation — Layout, Auth, Role Guard

#### Mục tiêu
Tạo nền tảng admin app riêng biệt với layout, authentication và route protection.

#### Tính năng cần làm

| # | Tính năng | Chi tiết |
|---|-----------|----------|
| 1 | Admin login page | Trang đăng nhập riêng cho admin |
| 2 | Admin layout | Sidebar + Topbar + Content area |
| 3 | Sidebar navigation | Menu động theo role, collapsible |
| 4 | Topbar | User info, notifications bell, logout |
| 5 | Auth context/provider | Quản lý token, auto refresh, redirect |
| 6 | Route guard middleware | Redirect nếu chưa đăng nhập hoặc không đủ quyền |
| 7 | Loading/Error states | Skeleton loading, error boundary |
| 8 | Theme (Dark/Light) | CSS variables based theming |

#### API/Backend cần bổ sung

```python
# 1. Admin login endpoint riêng (optional, có thể reuse /auth/login)
POST /auth/admin/login  # Validate role = admin trước khi trả token

# 2. API lấy thông tin admin session
GET /auth/me  # Đã có, nhưng cần bổ sung permissions list

# 3. API refresh token
POST /auth/refresh  # Đã có cơ bản, cần review expiry logic
```

#### Frontend/Admin UI cần xây dựng

```
web_quantri_thangdz/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout
│   │   ├── page.tsx                # Redirect to /dashboard or /login
│   │   ├── login/
│   │   │   └── page.tsx            # Admin login page
│   │   ├── (dashboard)/            # Route group with admin layout
│   │   │   ├── layout.tsx          # Admin layout (sidebar + topbar)
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx        # Dashboard overview
│   │   │   └── ...                 # Other admin pages
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Topbar.tsx
│   │   │   └── AdminLayout.tsx
│   │   ├── ui/                     # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── DataTable.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Toast.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Pagination.tsx
│   │   │   └── ...
│   │   └── shared/
│   │       ├── LoadingSpinner.tsx
│   │       ├── ErrorBoundary.tsx
│   │       └── EmptyState.tsx
│   ├── lib/
│   │   ├── api.ts                  # API client (base fetch, interceptors)
│   │   ├── auth.ts                 # Auth helpers, token management
│   │   └── utils.ts                # Utility functions
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useApi.ts
│   │   └── useDebounce.ts
│   ├── contexts/
│   │   └── AuthContext.tsx
│   └── types/
│       └── index.ts                # Shared TypeScript interfaces
```

#### Database/Model cần thêm
- Chưa cần thêm model mới ở phase này.
- Review lại model `User` để đảm bảo field `role` support multi-role nếu cần.

#### Tiêu chí hoàn thành
- [ ] Admin app chạy được ở `localhost:3001` (port khác website chính)
- [ ] Đăng nhập thành công, redirect về dashboard
- [ ] Sidebar hiển thị menu items theo cấu hình
- [ ] Route guard chặn user không phải admin
- [ ] Layout responsive trên tablet (≥768px)
- [ ] Dark/Light theme toggle hoạt động

#### Rủi ro/Khoảng chưa rõ
- Chọn thư viện UI: Tự build từ đầu hay dùng Shadcn/UI, Radix, Mantine?
- Token strategy: Tiếp tục localStorage hay chuyển httpOnly cookie?
- CORS config: Backend cần thêm origin cho admin app.

---

### Phase 2: Dashboard và Quản lý dữ liệu cốt lõi

#### Mục tiêu
Xây dựng dashboard tổng quan và module quản lý người dùng — hai module admin dùng nhiều nhất.

#### Tính năng cần làm

| # | Tính năng | Module |
|---|-----------|--------|
| 1 | Dashboard stats widgets | Dashboard |
| 2 | Biểu đồ doanh thu cơ bản | Dashboard |
| 3 | Danh sách đơn hàng gần đây | Dashboard |
| 4 | Payment cần xử lý | Dashboard |
| 5 | DataTable người dùng | Users |
| 6 | Search/Filter người dùng | Users |
| 7 | Xem chi tiết user | Users |
| 8 | Đổi status/role user | Users |

#### API/Backend cần bổ sung

```python
# Dashboard - bổ sung thêm data
GET /admin/dashboard/stats          # Cập nhật thêm: user growth, pending payments count
GET /admin/dashboard/revenue-chart  # Doanh thu theo ngày (7/30 ngày gần nhất)

# Users - chuẩn hóa và nâng cấp
GET /admin/users?page=1&limit=20&search=&status=&role=
GET /admin/users/{id}               # Chi tiết user + orders count
PATCH /admin/users/{id}/status      # Đổi sang request body thay vì query param
PATCH /admin/users/{id}/role        # Đổi sang request body thay vì query param
```

#### Frontend/Admin UI cần xây dựng

```
(dashboard)/
├── dashboard/
│   └── page.tsx          # Stats grid + charts + recent tables
├── users/
│   ├── page.tsx          # User list with DataTable
│   └── [id]/
│       └── page.tsx      # User detail (info + orders + payments)
```

#### Database/Model cần thêm
- Không cần model mới.
- Cần thêm index vào `users.email`, `users.status`, `users.role` nếu chưa có.
- Cần tối ưu query dashboard stats (hiện tại query riêng lẻ từng table).

#### Tiêu chí hoàn thành
- [ ] Dashboard hiển thị 6 widget thống kê chính xác
- [ ] Biểu đồ doanh thu render đúng data
- [ ] DataTable users: search, filter, phân trang hoạt động
- [ ] Xem chi tiết user hiển thị đầy đủ thông tin
- [ ] Đổi status/role user thành công, có confirm dialog

#### Rủi ro/Khoảng chưa rõ
- Thư viện chart: Recharts, Chart.js, hay Nivo?
- Performance dashboard khi data lớn (cần caching?).

---

### Phase 3: Quản lý Content — Posts, Guides, Services

#### Mục tiêu
Xây dựng đầy đủ CRUD cho 3 loại nội dung chính với rich text editor.

#### Tính năng cần làm

| # | Tính năng | Module |
|---|-----------|--------|
| 1 | CRUD bài viết | Posts |
| 2 | CRUD hướng dẫn | Guides |
| 3 | CRUD dịch vụ | Services |
| 4 | Rich text / Markdown editor | Shared |
| 5 | Slug auto-generate + editable | Shared |
| 6 | Status workflow (draft → published → archived) | Shared |
| 7 | Phân trang, search, filter | Shared |
| 8 | Bulk delete | Shared |

#### API/Backend cần bổ sung

```python
# Posts - chuẩn hóa path
GET  /admin/posts?page=1&limit=20&status=&category=&search=
GET  /admin/posts/{id}
POST /admin/posts
PUT  /admin/posts/{id}
DELETE /admin/posts/{id}
PATCH /admin/posts/{id}/publish
PATCH /admin/posts/{id}/archive
DELETE /admin/posts/bulk    # Bulk delete

# Guides - tương tự Posts
GET  /admin/guides?page=1&limit=20&status=&category=&level=&search=
GET  /admin/guides/{id}
POST /admin/guides
PUT  /admin/guides/{id}
DELETE /admin/guides/{id}
PATCH /admin/guides/{id}/publish
PATCH /admin/guides/{id}/archive

# Services - tương tự
GET  /admin/services?page=1&limit=20&status=&type=&search=
GET  /admin/services/{id}
POST /admin/services
PUT  /admin/services/{id}
DELETE /admin/services/{id}
PATCH /admin/services/{id}/status

# Categories (mới)
GET  /admin/categories?type=post|guide
POST /admin/categories
PUT  /admin/categories/{id}
DELETE /admin/categories/{id}
```

#### Frontend/Admin UI cần xây dựng

```
(dashboard)/
├── posts/
│   ├── page.tsx              # Posts list
│   ├── create/
│   │   └── page.tsx          # Create post form
│   └── [id]/
│       └── edit/
│           └── page.tsx      # Edit post form
├── guides/
│   ├── page.tsx
│   ├── create/
│   │   └── page.tsx
│   └── [id]/
│       └── edit/
│           └── page.tsx
├── services/
│   ├── page.tsx
│   ├── create/
│   │   └── page.tsx
│   └── [id]/
│       └── edit/
│           └── page.tsx
```

**Component mới cần xây:**

| Component | Mô tả |
|-----------|--------|
| `RichTextEditor` | TipTap-based editor với toolbar, image insert, code block |
| `SlugInput` | Auto-generate slug từ title, cho phép edit |
| `StatusBadge` | Badge hiển thị status với màu khác nhau |
| `ContentForm` | Form layout chung cho posts/guides: 2 cột (content + sidebar meta) |
| `CategorySelect` | Dropdown chọn category |
| `ConfirmDialog` | Dialog xác nhận delete/status change |

#### Database/Model cần thêm

```sql
-- Bảng categories mới
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    slug VARCHAR UNIQUE NOT NULL,
    type VARCHAR NOT NULL,  -- 'post' hoặc 'guide'
    description TEXT,
    parent_id INTEGER REFERENCES categories(id),
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Thêm index
CREATE INDEX idx_posts_status ON posts(status);
CREATE INDEX idx_posts_category ON posts(category);
CREATE INDEX idx_guides_status ON guides(status);
CREATE INDEX idx_guides_level ON guides(level);
```

#### Tiêu chí hoàn thành
- [ ] CRUD posts hoạt động đầy đủ với rich text editor
- [ ] CRUD guides hoạt động đầy đủ
- [ ] CRUD services hoạt động đầy đủ
- [ ] Slug tự động generate, không trùng lặp
- [ ] Status workflow: draft ↔ published ↔ archived
- [ ] Phân trang, search, filter hoạt động
- [ ] Xác nhận trước khi xóa

#### Rủi ro/Khoảng chưa rõ
- Rich text editor library: TipTap (recommended), Quill, hay CKEditor?
- Image trong editor: Upload rồi insert URL hay base64 inline?
- Chuyển đổi giữa category từ string sang foreign key có breaking change.

---

### Phase 4: Quản lý đơn hàng, thanh toán, support

#### Mục tiêu
Hoàn thiện luồng quản lý đơn hàng và thanh toán — phần quan trọng nhất cho vận hành kinh doanh.

#### Tính năng cần làm

| # | Tính năng | Module |
|---|-----------|--------|
| 1 | Danh sách đơn hàng với filter/search | Orders |
| 2 | Chi tiết đơn hàng (items, user, payment) | Orders |
| 3 | Cập nhật trạng thái đơn hàng | Orders |
| 4 | Danh sách thanh toán với filter | Payments |
| 5 | Confirm thanh toán thủ công | Payments |
| 6 | Refund workflow | Payments |
| 7 | Ghi chú admin vào đơn hàng | Orders |
| 8 | Gửi notification cho user khi đổi status | Notifications |

#### API/Backend cần bổ sung

```python
# Orders nâng cao
GET  /admin/orders?page=1&limit=20&status=&search=&date_from=&date_to=
GET  /admin/orders/{id}           # Chi tiết + items + payments + user info
PUT  /admin/orders/{id}/status    # Chuẩn hóa: request body { status, admin_note }
GET  /admin/orders/export?format=csv&date_from=&date_to=  # Export

# Payments nâng cao
GET  /admin/payments?page=1&limit=20&status=&method=&date_from=&date_to=
POST /admin/payments/{id}/confirm  # Đã có
POST /admin/payments/{id}/refund   # Mới
GET  /admin/payments/{id}          # Chi tiết payment + order info

# Order status history (mới)
GET  /admin/orders/{id}/history    # Lịch sử thay đổi trạng thái
```

#### Frontend/Admin UI cần xây dựng

```
(dashboard)/
├── orders/
│   ├── page.tsx              # Orders list
│   └── [id]/
│       └── page.tsx          # Order detail (items + payments + timeline)
├── payments/
│   ├── page.tsx              # Payments list
│   └── [id]/
│       └── page.tsx          # Payment detail
```

**Component mới cần xây:**

| Component | Mô tả |
|-----------|--------|
| `OrderTimeline` | Visual timeline hiển thị lịch sử status changes |
| `PaymentConfirmDialog` | Dialog confirm payment với ghi chú |
| `RefundDialog` | Dialog xử lý refund |
| `OrderItemsTable` | Table hiển thị items trong order |
| `DateRangeFilter` | Filter theo khoảng thời gian |

#### Database/Model cần thêm

```sql
-- Bảng order_status_history (mới)
CREATE TABLE order_status_history (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
    old_status VARCHAR,
    new_status VARCHAR NOT NULL,
    changed_by INTEGER REFERENCES users(id),
    note TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Thêm field admin_note vào orders
ALTER TABLE orders ADD COLUMN admin_note TEXT;
```

#### Tiêu chí hoàn thành
- [ ] Danh sách đơn hàng: filter, search, phân trang
- [ ] Chi tiết đơn hàng hiển thị đầy đủ: items, user, payments, timeline
- [ ] Confirm thanh toán hoạt động, tự cập nhật order status
- [ ] Refund workflow hoạt động
- [ ] Timeline status changes hiển thị đúng

#### Rủi ro/Khoảng chưa rõ
- Refund flow: Chỉ ghi nhận hay tích hợp refund qua payment provider?
- Notification cho user: Email, in-app, hay cả hai?
- Concurrency: 2 admin cùng confirm 1 payment thì sao?

---

### Phase 5: Cấu hình hệ thống, Media, SEO, Chatbot/n8n

#### Mục tiêu
Xây dựng các module hỗ trợ vận hành: upload media, cấu hình website, SEO tools, chatbot.

#### Tính năng cần làm

| # | Tính năng | Module |
|---|-----------|--------|
| 1 | Upload ảnh/file | Media |
| 2 | Thư viện media | Media |
| 3 | Cấu hình thông tin website | Settings |
| 4 | Cấu hình SEO mặc định | Settings |
| 5 | Cấu hình social links | Settings |
| 6 | Cấu hình chatbot endpoint | Chatbot |
| 7 | Cấu hình n8n webhook | Chatbot |
| 8 | Bật/tắt chatbot | Chatbot |

#### API/Backend cần bổ sung

```python
# Media
POST /admin/media/upload           # Upload file, trả URL
GET  /admin/media?page=1&limit=20  # Thư viện media
DELETE /admin/media/{id}            # Xóa file

# Site Settings
GET  /admin/settings                # Lấy toàn bộ settings
PUT  /admin/settings                # Cập nhật settings (key-value pairs)
GET  /admin/settings/{key}          # Lấy setting cụ thể
PUT  /admin/settings/{key}          # Cập nhật setting cụ thể

# Chatbot config
GET  /admin/chatbot/config
PUT  /admin/chatbot/config
GET  /admin/chatbot/logs?page=1&limit=20
```

#### Frontend/Admin UI cần xây dựng

```
(dashboard)/
├── media/
│   └── page.tsx              # Media library + upload
├── settings/
│   ├── page.tsx              # General settings
│   ├── seo/
│   │   └── page.tsx          # SEO settings
│   ├── payment/
│   │   └── page.tsx          # Payment provider config
│   └── chatbot/
│       └── page.tsx          # Chatbot/n8n config
```

#### Database/Model cần thêm

```sql
-- Bảng site_settings
CREATE TABLE site_settings (
    id SERIAL PRIMARY KEY,
    key VARCHAR UNIQUE NOT NULL,
    value TEXT,
    value_type VARCHAR DEFAULT 'string',
    group_name VARCHAR,
    description TEXT,
    updated_at TIMESTAMP DEFAULT NOW(),
    updated_by INTEGER REFERENCES users(id)
);

-- Bảng media_files
CREATE TABLE media_files (
    id SERIAL PRIMARY KEY,
    filename VARCHAR NOT NULL,
    original_name VARCHAR NOT NULL,
    file_path VARCHAR NOT NULL,
    file_url VARCHAR NOT NULL,
    file_size INTEGER,
    mime_type VARCHAR,
    width INTEGER,
    height INTEGER,
    uploaded_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Bảng chatbot_logs (optional)
CREATE TABLE chatbot_logs (
    id SERIAL PRIMARY KEY,
    session_id VARCHAR,
    user_message TEXT,
    bot_response TEXT,
    user_id INTEGER REFERENCES users(id),
    ip_address VARCHAR,
    created_at TIMESTAMP DEFAULT NOW()
);
```

#### Tiêu chí hoàn thành
- [ ] Upload ảnh hoạt động, trả URL chính xác
- [ ] Thư viện media hiển thị grid ảnh, phân trang
- [ ] Xóa media hoạt động
- [ ] Cấu hình website lưu và load đúng
- [ ] Website chính đọc settings từ API
- [ ] Chatbot config bật/tắt hoạt động

#### Rủi ro/Khoảng chưa rõ
- Lưu file local hay S3/Cloudinary?
- Kích thước file tối đa cho upload?
- Cấu hình website: Cache strategy nào cho frontend đọc settings?

---

### Phase 6: Phân quyền nâng cao, Audit Log, Bảo mật

#### Mục tiêu
Nâng cấp hệ thống phân quyền từ đơn giản (user/admin) sang RBAC (Role-Based Access Control). Thêm audit log để giám sát.

#### Tính năng cần làm

| # | Tính năng | Module |
|---|-----------|--------|
| 1 | Tạo/sửa/xóa roles | Permissions |
| 2 | Permission matrix | Permissions |
| 3 | Assign role cho user | Permissions |
| 4 | Backend middleware kiểm tra permission | Permissions |
| 5 | Frontend route guard theo permission | Permissions |
| 6 | Sidebar menu ẩn/hiện theo permission | Permissions |
| 7 | Ghi audit log tự động | Audit Log |
| 8 | Xem/filter audit log | Audit Log |
| 9 | Rate limiting cho admin API | Security |
| 10 | 2FA cho admin (optional) | Security |

#### API/Backend cần bổ sung

```python
# Roles & Permissions
GET  /admin/roles
POST /admin/roles
PUT  /admin/roles/{id}
DELETE /admin/roles/{id}
GET  /admin/permissions
PUT  /admin/roles/{id}/permissions

# Audit Log
GET  /admin/audit-logs?page=1&limit=50&user_id=&action=&date_from=&date_to=
GET  /admin/audit-logs/{id}

# Security
POST /admin/auth/change-password
POST /admin/auth/enable-2fa            # Phase sau
```

#### Database/Model cần thêm

```sql
-- Bảng roles
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR UNIQUE NOT NULL,
    display_name VARCHAR NOT NULL,
    description TEXT,
    is_system BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Bảng permissions
CREATE TABLE permissions (
    id SERIAL PRIMARY KEY,
    name VARCHAR UNIQUE NOT NULL,
    display_name VARCHAR NOT NULL,
    module VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Bảng role_permissions (many-to-many)
CREATE TABLE role_permissions (
    role_id INTEGER REFERENCES roles(id) ON DELETE CASCADE,
    permission_id INTEGER REFERENCES permissions(id) ON DELETE CASCADE,
    PRIMARY KEY (role_id, permission_id)
);

-- Cập nhật users: role → role_id
ALTER TABLE users ADD COLUMN role_id INTEGER REFERENCES roles(id);

-- Bảng audit_logs
CREATE TABLE audit_logs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    user_email VARCHAR,
    action VARCHAR NOT NULL,
    resource_type VARCHAR,
    resource_id INTEGER,
    old_value JSONB,
    new_value JSONB,
    ip_address VARCHAR,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_action ON audit_logs(action);
CREATE INDEX idx_audit_logs_created ON audit_logs(created_at);
```

#### Tiêu chí hoàn thành
- [ ] RBAC hoạt động: user với role `editor` không thể truy cập module orders
- [ ] Permission matrix hiển thị đúng, có thể toggle permission
- [ ] Audit log ghi lại tất cả hành động CRUD quan trọng
- [ ] Sidebar ẩn menu items không có quyền
- [ ] API trả 403 khi không đủ permission

#### Rủi ro/Khoảng chưa rõ
- Migration từ role string sang role_id cần backward compatible.
- Permission granularity: Module level hay action level?
- 2FA implementation: TOTP (Google Authenticator) hay SMS?

---

### Phase 7: Báo cáo, Tối ưu vận hành, Deployment

#### Mục tiêu
Hoàn thiện module báo cáo, tối ưu performance, chuẩn bị deployment production.

#### Tính năng cần làm

| # | Tính năng | Module |
|---|-----------|--------|
| 1 | Báo cáo doanh thu theo thời gian | Reports |
| 2 | Báo cáo top dịch vụ bán chạy | Reports |
| 3 | Báo cáo user growth | Reports |
| 4 | Export báo cáo CSV/Excel | Reports |
| 5 | Caching cho dashboard | Performance |
| 6 | Lazy loading / Code splitting | Performance |
| 7 | SEO cho admin (robots noindex) | SEO |
| 8 | Production build & deploy guide | Deployment |
| 9 | Environment config production | Deployment |
| 10 | Health check endpoint | Deployment |

#### API/Backend cần bổ sung

```python
# Reports
GET /admin/reports/revenue?period=daily|weekly|monthly&date_from=&date_to=
GET /admin/reports/top-services?limit=10&date_from=&date_to=
GET /admin/reports/user-growth?period=daily|weekly|monthly&date_from=&date_to=
GET /admin/reports/orders-summary?date_from=&date_to=
GET /admin/reports/export?type=revenue|orders|users&format=csv|excel&date_from=&date_to=
```

#### Frontend/Admin UI cần xây dựng

```
(dashboard)/
├── reports/
│   ├── page.tsx              # Reports overview
│   ├── revenue/
│   │   └── page.tsx          # Revenue report
│   ├── services/
│   │   └── page.tsx          # Top services
│   └── users/
│       └── page.tsx          # User growth
```

#### Tiêu chí hoàn thành
- [ ] Biểu đồ báo cáo render chính xác với data thật
- [ ] Export CSV/Excel hoạt động
- [ ] Admin app build production thành công, không lỗi
- [ ] Deploy lên VPS chạy ổn định
- [ ] HTTPS hoạt động cho admin domain/subdomain
- [ ] Performance: First Contentful Paint < 2s

#### Rủi ro/Khoảng chưa rõ
- Admin deploy cùng domain (`domain.com/admin`) hay subdomain (`admin.domain.com`)?
- Cần reverse proxy config riêng cho admin app.
- Backup strategy cho data admin app (nếu cùng database thì đã cover).

---

## 4. Đề xuất kiến trúc

### 4.1. Backend: Dùng chung FastAPI hay tách?

**Đề xuất: Dùng chung backend FastAPI, tách router prefix.**

**Lý do:**

| Tiêu chí | Chung backend | Tách backend |
|----------|---------------|--------------|
| Complexity | ✅ Đơn giản hơn | ❌ Phải maintain 2 app |
| Database | ✅ 1 connection pool | ❌ 2 connection pools |
| Auth | ✅ Reuse auth logic | ❌ Duplicate auth |
| Deploy | ✅ 1 process | ❌ 2 processes |
| Security | ⚠️ Cần prefix guard tốt | ✅ Isolation tốt hơn |
| Scalability | ⚠️ Scale cùng nhau | ✅ Scale độc lập |

**Kết luận**: Với quy mô hiện tại của ThangDz, **dùng chung backend** là phù hợp nhất. Tất cả admin API đặt dưới prefix `/admin/*` và bảo vệ bằng dependency `check_admin` hoặc `check_permission`.

### 4.2. Frontend: Cùng Next.js hay app riêng?

**Đề xuất: Tạo Next.js app riêng cho admin.**

**Lý do:**

| Tiêu chí | Cùng app | App riêng |
|----------|----------|-----------|
| Code separation | ❌ Admin code lẫn public | ✅ Tách biệt hoàn toàn |
| Bundle size | ❌ User tải thêm code admin | ✅ User không bị ảnh hưởng |
| Deploy | ✅ 1 lần deploy | ⚠️ 2 lần deploy |
| Dependencies | ❌ Conflict admin-only libs | ✅ Dependencies riêng |
| Dev experience | ❌ File structure phức tạp | ✅ Code sạch, focused |
| Team work | ❌ Conflict nhiều hơn | ✅ Team admin tách biệt |

**Kết luận**: Admin code hiện tại đã **quá tải** trong 1 file `page.tsx` (~24KB). Tạo app riêng sẽ giúp tổ chức code tốt hơn, không ảnh hưởng performance website chính.

### 4.3. Cấu trúc thư mục admin frontend đầy đủ

```
web_quantri_thangdz/
├── .env.local                        # NEXT_PUBLIC_API_URL=http://localhost:8000
├── .env.production                   # NEXT_PUBLIC_API_URL=https://thangdz.com/api
├── package.json
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── ADMIN_WEBSITE_PLAN.md             # File này
│
├── public/
│   ├── logo.svg
│   └── favicon.ico
│
└── src/
    ├── app/
    │   ├── globals.css               # Global styles + CSS variables
    │   ├── layout.tsx                # Root layout (fonts, metadata)
    │   ├── page.tsx                  # Root → redirect to /dashboard
    │   │
    │   ├── login/
    │   │   └── page.tsx             # Admin login page
    │   │
    │   └── (admin)/                  # Route group → AdminLayout
    │       ├── layout.tsx            # AdminLayout wrapper
    │       ├── dashboard/
    │       │   └── page.tsx
    │       ├── users/
    │       │   ├── page.tsx
    │       │   └── [id]/
    │       │       └── page.tsx
    │       ├── posts/
    │       │   ├── page.tsx
    │       │   ├── create/page.tsx
    │       │   └── [id]/edit/page.tsx
    │       ├── guides/
    │       │   ├── page.tsx
    │       │   ├── create/page.tsx
    │       │   └── [id]/edit/page.tsx
    │       ├── services/
    │       │   ├── page.tsx
    │       │   ├── create/page.tsx
    │       │   └── [id]/edit/page.tsx
    │       ├── orders/
    │       │   ├── page.tsx
    │       │   └── [id]/page.tsx
    │       ├── payments/
    │       │   ├── page.tsx
    │       │   └── [id]/page.tsx
    │       ├── media/
    │       │   └── page.tsx
    │       ├── settings/
    │       │   ├── page.tsx
    │       │   ├── seo/page.tsx
    │       │   ├── payment/page.tsx
    │       │   └── chatbot/page.tsx
    │       ├── reports/
    │       │   ├── page.tsx
    │       │   ├── revenue/page.tsx
    │       │   └── users/page.tsx
    │       ├── roles/
    │       │   └── page.tsx
    │       └── audit-log/
    │           └── page.tsx
    │
    ├── components/
    │   ├── layout/
    │   │   ├── Sidebar.tsx           # Collapsible sidebar
    │   │   ├── Topbar.tsx            # Top navigation bar
    │   │   ├── AdminLayout.tsx       # Layout wrapper
    │   │   └── SidebarMenuItem.tsx   # Individual menu item
    │   │
    │   ├── ui/
    │   │   ├── Button.tsx
    │   │   ├── Input.tsx
    │   │   ├── Select.tsx
    │   │   ├── Textarea.tsx
    │   │   ├── Checkbox.tsx
    │   │   ├── Toggle.tsx
    │   │   ├── Badge.tsx
    │   │   ├── Card.tsx
    │   │   ├── Modal.tsx
    │   │   ├── DataTable.tsx         # Reusable data table
    │   │   ├── Pagination.tsx
    │   │   ├── Toast.tsx
    │   │   ├── Tabs.tsx
    │   │   ├── DropdownMenu.tsx
    │   │   ├── DatePicker.tsx
    │   │   ├── FileUpload.tsx
    │   │   └── ConfirmDialog.tsx
    │   │
    │   ├── shared/
    │   │   ├── LoadingSpinner.tsx
    │   │   ├── ErrorBoundary.tsx
    │   │   ├── EmptyState.tsx
    │   │   ├── StatusBadge.tsx
    │   │   ├── PageHeader.tsx        # Title + breadcrumb + actions
    │   │   └── StatsCard.tsx
    │   │
    │   ├── editor/
    │   │   ├── RichTextEditor.tsx
    │   │   ├── MarkdownEditor.tsx
    │   │   └── MediaPicker.tsx
    │   │
    │   └── charts/
    │       ├── RevenueChart.tsx
    │       ├── UserGrowthChart.tsx
    │       └── TopServicesChart.tsx
    │
    ├── hooks/
    │   ├── useAuth.ts                # Auth state management
    │   ├── useApi.ts                 # Generic API hook with loading/error
    │   ├── usePagination.ts
    │   ├── useDebounce.ts
    │   ├── useMediaUpload.ts
    │   └── useToast.ts
    │
    ├── contexts/
    │   ├── AuthContext.tsx
    │   ├── ThemeContext.tsx
    │   └── ToastContext.tsx
    │
    ├── lib/
    │   ├── api.ts                    # API client with interceptors
    │   ├── auth.ts                   # Token management
    │   ├── utils.ts                  # Format date, currency, etc.
    │   └── constants.ts              # Menu items, status options, etc.
    │
    └── types/
        ├── index.ts                  # Shared types
        ├── api.ts                    # API response types
        └── models.ts                 # Data model types
```

### 4.4. API Naming Convention

```
# Convention: /admin/{resource}/{action}
# RESTful principles + admin prefix

# List:      GET    /admin/{resources}?page=1&limit=20&search=&filters...
# Detail:    GET    /admin/{resources}/{id}
# Create:    POST   /admin/{resources}
# Update:    PUT    /admin/{resources}/{id}
# Partial:   PATCH  /admin/{resources}/{id}/{action}
# Delete:    DELETE /admin/{resources}/{id}
# Bulk:      DELETE /admin/{resources}/bulk
# Export:    GET    /admin/{resources}/export?format=csv

# Ví dụ cụ thể:
GET    /admin/posts                    # Danh sách
GET    /admin/posts/5                  # Chi tiết
POST   /admin/posts                    # Tạo mới
PUT    /admin/posts/5                  # Cập nhật toàn bộ
PATCH  /admin/posts/5/publish          # Hành động cụ thể
DELETE /admin/posts/5                  # Xóa
DELETE /admin/posts/bulk               # Xóa nhiều

# Dashboard & Reports
GET    /admin/dashboard/stats
GET    /admin/dashboard/revenue-chart
GET    /admin/reports/revenue
GET    /admin/reports/top-services

# Settings
GET    /admin/settings
PUT    /admin/settings

# Media
POST   /admin/media/upload
GET    /admin/media
DELETE /admin/media/5
```

### 4.5. Auth Token & Role Guard Strategy

```
┌─────────────────────────────────────────────────────┐
│                   AUTH FLOW                          │
│                                                     │
│  1. Admin Login                                     │
│     POST /auth/login → { access_token, role }       │
│     ↓                                               │
│  2. Frontend stores token                           │
│     localStorage (dev) / httpOnly cookie (prod)     │
│     ↓                                               │
│  3. Every API request                               │
│     Header: Authorization: Bearer {token}           │
│     ↓                                               │
│  4. Backend validates                               │
│     decode_token() → check role → check permission  │
│     ↓                                               │
│  5. Token refresh                                   │
│     Auto refresh khi access_token sắp hết hạn       │
│     ↓                                               │
│  6. Frontend Route Guard                            │
│     AuthContext → check role → redirect if needed   │
└─────────────────────────────────────────────────────┘
```

**Route guard implementation:**

```typescript
// middleware.ts (Next.js middleware)
export function middleware(request: NextRequest) {
  const token = request.cookies.get('admin_token');
  const isLoginPage = request.nextUrl.pathname === '/login';

  if (!token && !isLoginPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (token && isLoginPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
```

---

## 5. UX/UI định hướng

### 5.1. Phong cách giao diện

| Thuộc tính | Định hướng |
|-----------|------------|
| **Tone** | Professional, clean, data-focused |
| **Color scheme** | Dark mode mặc định, hỗ trợ light mode |
| **Primary color** | Indigo (#6366F1) hoặc Blue (#3B82F6) |
| **Background** | Dark: `#0F172A` / Light: `#F8FAFC` |
| **Card background** | Dark: `#1E293B` / Light: `#FFFFFF` |
| **Typography** | Inter hoặc Be Vietnam Pro (hỗ trợ tiếng Việt tốt) |
| **Border radius** | `8px` cho card, `6px` cho button/input |
| **Shadow** | Subtle, chỉ dùng cho elevation (dropdown, modal) |
| **Animation** | Micro-animations: fade in, slide, skeleton loading |
| **Icon library** | Lucide React (đã dùng trong project) |

### 5.2. Layout Structure

```
┌──────────────────────────────────────────────────────┐
│                      TOPBAR (56px)                   │
│  [☰ Toggle]  ThangDz Admin     [🔔] [🌙] [👤 Admin ▾]│
├────────────┬─────────────────────────────────────────┤
│            │                                         │
│  SIDEBAR   │           CONTENT AREA                  │
│  (250px)   │                                         │
│            │  ┌──────────────────────────────────┐   │
│  📊 Dashboard│  │  Page Title          [+ Create]  │   │
│  👥 Users    │  │  Breadcrumb: Home > Users        │   │
│  📰 Posts    │  ├──────────────────────────────────┤   │
│  📚 Guides   │  │                                  │   │
│  🛠️ Services │  │  [Search...] [Filter ▾] [Export] │   │
│  📦 Orders   │  │                                  │   │
│  💳 Payments │  │  ┌────────────────────────────┐  │   │
│  🖼️ Media    │  │  │      DATA TABLE            │  │   │
│            │  │  │  Name | Status | Date | Act  │  │   │
│  ⚙️ Settings │  │  │  ─────────────────────────  │  │   │
│  📈 Reports  │  │  │  Row 1 ...                 │  │   │
│  🔐 Roles    │  │  │  Row 2 ...                 │  │   │
│  📋 Audit Log│  │  └────────────────────────────┘  │   │
│            │  │                                  │   │
│            │  │  [← Prev]  1 2 3 ... 10  [Next →]│   │
│            │  └──────────────────────────────────┘   │
└────────────┴─────────────────────────────────────────┘
```

**Responsive behavior:**
- Desktop (≥1280px): Sidebar expanded + full content.
- Tablet (768px-1279px): Sidebar collapsed (icon only) + full content.
- Mobile (<768px): Sidebar hidden, toggle via hamburger.

### 5.3. Component Library cần có

| Component | Variants / Props | Dùng ở đâu |
|-----------|-----------------|------------|
| `Button` | primary, secondary, danger, ghost, loading, disabled, icon | Khắp nơi |
| `Input` | text, email, password, number, search, with icon, error state | Forms |
| `Select` | single, searchable, clearable | Filters, forms |
| `Textarea` | auto-resize, char count, error state | Content forms |
| `DataTable` | sortable, selectable, custom cells, empty state | List pages |
| `Pagination` | page numbers, per-page selector | List pages |
| `Modal` | sizes (sm/md/lg/xl), closable, footer actions | CRUD, confirm |
| `Toast` | success, error, warning, info, auto dismiss | Feedback |
| `Badge` | colors (green/yellow/red/blue/gray), dot variant | Status display |
| `Card` | with header, footer, hover effect | Dashboard |
| `Tabs` | horizontal, with badges | Detail pages |
| `DropdownMenu` | items with icons, dividers, danger items | Actions menu |
| `DatePicker` | single date, date range | Filters, forms |
| `FileUpload` | drag & drop, preview, progress bar | Media upload |
| `ConfirmDialog` | danger/warning variant, custom message | Delete confirm |
| `Skeleton` | line, circle, card, table row | Loading states |
| `EmptyState` | icon, message, action button | No data |

### 5.4. Luồng thao tác quan trọng

#### Luồng 1: Admin đăng nhập
```
Login page → Nhập email/password → Validate → Call API login
→ Kiểm tra role = admin → Lưu token → Redirect /dashboard
→ Load dashboard data → Hiển thị stats
```

#### Luồng 2: Tạo bài viết mới
```
Sidebar click "Posts" → Posts list → Click [+ Tạo bài viết]
→ Form: Title, Category, Status → Rich text editor cho Content
→ Auto-generate slug → Click [Lưu nháp] hoặc [Xuất bản]
→ API POST /admin/posts → Toast success → Redirect posts list
```

#### Luồng 3: Xác nhận thanh toán thủ công
```
Dashboard → Click "Thanh toán chờ xử lý" → Payments list (filter: pending)
→ Click row → Payment detail → Xem thông tin chuyển khoản
→ Click [Xác nhận] → Confirm dialog (nhập mã giao dịch ngân hàng)
→ API POST /admin/payments/{id}/confirm → Order status tự cập nhật
→ Toast success → Quay lại list
```

#### Luồng 4: Quản lý người dùng
```
Sidebar click "Users" → Users list (DataTable)
→ Search by email/name → Click row → User detail
→ Tab: Info | Orders | Payments
→ Action: Khóa tài khoản → Confirm dialog → API PATCH status
→ Toast success → Badge đổi thành "Banned"
```

---

## 6. Checklist triển khai

### Phase 0: Audit & Chuẩn hóa

- [ ] Audit toàn bộ backend API endpoints
- [ ] Audit database models, indexes
- [ ] Audit frontend components, state management
- [ ] Viết tài liệu API specification
- [ ] Chuẩn hóa response format `{ success, data, message, pagination }`
- [ ] Chuẩn hóa error response format
- [ ] Chuẩn hóa admin API path prefix thành `/admin/*`
- [ ] Fix N+1 query trong dashboard stats
- [ ] Fix `datetime.utcnow()` deprecated warning
- [ ] Thêm phân trang cho tất cả list endpoints
- [ ] Review CORS config, thêm admin app origin

---

### Phase 1: Foundation

- [ ] Khởi tạo Next.js app mới cho admin
- [ ] Cấu hình TypeScript, Tailwind CSS, ESLint
- [ ] Cài đặt dependencies: Lucide React, date-fns
- [ ] Tạo CSS variables cho theme (dark/light)
- [ ] Tạo component `Button`
- [ ] Tạo component `Input`
- [ ] Tạo component `Badge`
- [ ] Tạo component `Card`
- [ ] Tạo component `Toast` + ToastContext
- [ ] Tạo component `Modal`
- [ ] Tạo component `LoadingSpinner`
- [ ] Tạo component `EmptyState`
- [ ] Tạo `Sidebar` layout
- [ ] Tạo `Topbar` layout
- [ ] Tạo `AdminLayout` wrapper
- [ ] Tạo `AuthContext` + `useAuth` hook
- [ ] Tạo API client (`lib/api.ts`)
- [ ] Tạo token management (`lib/auth.ts`)
- [ ] Tạo admin login page
- [ ] Tạo route guard / middleware
- [ ] Tạo trang 404 cho admin
- [ ] Test: Login → Dashboard → Logout flow

---

### Phase 2: Dashboard & Users

- [ ] Backend: Thêm phân trang cho `GET /admin/users`
- [ ] Backend: Thêm `GET /admin/users/{id}` chi tiết
- [ ] Backend: Thêm `GET /admin/dashboard/revenue-chart`
- [ ] Backend: Chuẩn hóa `PATCH /admin/users/{id}/status` dùng request body
- [ ] Frontend: Tạo component `DataTable`
- [ ] Frontend: Tạo component `Pagination`
- [ ] Frontend: Tạo component `StatsCard`
- [ ] Frontend: Xây dựng Dashboard page (stats + charts + recent tables)
- [ ] Frontend: Tích hợp chart library
- [ ] Frontend: Xây dựng Users list page
- [ ] Frontend: Xây dựng User detail page
- [ ] Frontend: Implement search/filter cho users
- [ ] Frontend: Implement đổi status/role user
- [ ] Test: Dashboard data hiển thị đúng
- [ ] Test: Users CRUD hoạt động

---

### Phase 3: Content Management

- [ ] Backend: Chuẩn hóa `GET /admin/posts` với phân trang, filter
- [ ] Backend: Chuẩn hóa `GET /admin/guides` với phân trang, filter
- [ ] Backend: Chuẩn hóa `GET /admin/services` với phân trang, filter
- [ ] Backend: Tạo bảng `categories` + API CRUD
- [ ] Backend: Thêm `PATCH /admin/posts/{id}/archive`
- [ ] Backend: Thêm `PATCH /admin/guides/{id}/archive`
- [ ] Frontend: Tạo component `RichTextEditor`
- [ ] Frontend: Tạo component `SlugInput`
- [ ] Frontend: Tạo component `StatusBadge`
- [ ] Frontend: Tạo component `ContentForm` (2-column layout)
- [ ] Frontend: Tạo component `CategorySelect`
- [ ] Frontend: Tạo component `ConfirmDialog`
- [ ] Frontend: Posts list page
- [ ] Frontend: Posts create page
- [ ] Frontend: Posts edit page
- [ ] Frontend: Guides list page
- [ ] Frontend: Guides create page
- [ ] Frontend: Guides edit page
- [ ] Frontend: Services list page
- [ ] Frontend: Services create page
- [ ] Frontend: Services edit page
- [ ] Test: CRUD posts full workflow
- [ ] Test: CRUD guides full workflow
- [ ] Test: CRUD services full workflow
- [ ] Test: Slug generation unique
- [ ] Test: Status workflow (draft → published → archived)

---

### Phase 4: Orders & Payments

- [ ] Backend: Nâng cấp `GET /admin/orders` phân trang + filter
- [ ] Backend: Tạo `GET /admin/orders/{id}` chi tiết
- [ ] Backend: Tạo bảng `order_status_history`
- [ ] Backend: Tạo `GET /admin/orders/{id}/history`
- [ ] Backend: Thêm field `admin_note` vào orders
- [ ] Backend: Tạo `POST /admin/payments/{id}/refund`
- [ ] Backend: Nâng cấp `GET /admin/payments` phân trang + filter
- [ ] Frontend: Tạo component `OrderTimeline`
- [ ] Frontend: Tạo component `DateRangeFilter`
- [ ] Frontend: Tạo component `PaymentConfirmDialog`
- [ ] Frontend: Orders list page
- [ ] Frontend: Order detail page (items + payments + timeline)
- [ ] Frontend: Payments list page
- [ ] Frontend: Payment detail page
- [ ] Frontend: Confirm payment workflow
- [ ] Frontend: Refund workflow
- [ ] Test: Orders list filter/search
- [ ] Test: Confirm payment → order status updates
- [ ] Test: Refund workflow

---

### Phase 5: Settings, Media, Chatbot

- [ ] Backend: Tạo bảng `site_settings` + API CRUD
- [ ] Backend: Tạo bảng `media_files`
- [ ] Backend: Tạo `POST /admin/media/upload`
- [ ] Backend: Tạo `GET /admin/media` + `DELETE /admin/media/{id}`
- [ ] Backend: Tạo chatbot config API
- [ ] Backend: File upload handling (local storage)
- [ ] Frontend: Tạo component `FileUpload` (drag & drop)
- [ ] Frontend: Media library page
- [ ] Frontend: Settings general page
- [ ] Frontend: Settings SEO page
- [ ] Frontend: Settings payment page
- [ ] Frontend: Settings chatbot page
- [ ] Frontend: Tích hợp media picker vào editor
- [ ] Test: Upload ảnh → URL hoạt động
- [ ] Test: Settings lưu và load đúng

---

### Phase 6: Permissions & Audit

- [ ] Backend: Tạo bảng `roles`, `permissions`, `role_permissions`
- [ ] Backend: Tạo bảng `audit_logs`
- [ ] Backend: Migration: `users.role` → `users.role_id`
- [ ] Backend: Tạo API roles CRUD
- [ ] Backend: Tạo middleware audit log tự động
- [ ] Backend: Tạo permission check middleware
- [ ] Backend: Seed default roles + permissions
- [ ] Frontend: Roles management page
- [ ] Frontend: Permission matrix grid
- [ ] Frontend: Audit log page
- [ ] Frontend: Sidebar menu ẩn/hiện theo permission
- [ ] Frontend: Route guard theo permission
- [ ] Test: Editor role không truy cập được orders
- [ ] Test: Audit log ghi lại hành động
- [ ] Test: Permission matrix toggle hoạt động

---

### Phase 7: Reports & Deployment

- [ ] Backend: Tạo API reports (revenue, top-services, user-growth)
- [ ] Backend: Tạo export CSV/Excel endpoint
- [ ] Backend: Implement caching cho dashboard stats
- [ ] Frontend: Revenue report page
- [ ] Frontend: Top services report page
- [ ] Frontend: User growth report page
- [ ] Frontend: Export button hoạt động
- [ ] Performance: Lazy loading cho chart components
- [ ] Performance: Code splitting optimization
- [ ] Production: Build thành công, không lỗi
- [ ] Production: Tạo systemd/PM2 config cho admin app
- [ ] Production: Cấu hình Nginx reverse proxy
- [ ] Production: SSL HTTPS
- [ ] Production: robots.txt noindex cho admin
- [ ] Documentation: Deploy guide cho admin app
- [ ] Test: Full regression test

---

## 7. Ưu tiên MVP

### 🎯 MVP — 8 tính năng để admin dùng được ngay

**MVP bao gồm Phase 0 (chuẩn hóa cơ bản) + Phase 1 + Phase 2 + một phần Phase 3 & 4.**  
**Ước tính: 2-3 tuần phát triển.**

| # | Tính năng MVP | Phase | Giá trị |
|---|--------------|-------|---------|
| 1 | **Admin Login + Route Guard** | Phase 1 | Admin truy cập an toàn |
| 2 | **Admin Layout (Sidebar + Topbar)** | Phase 1 | Nền tảng navigation |
| 3 | **Dashboard Stats Overview** | Phase 2 | Nắm tổng quan kinh doanh |
| 4 | **Quản lý người dùng (list + search + status)** | Phase 2 | Kiểm soát user |
| 5 | **Quản lý bài viết (CRUD + rich editor)** | Phase 3 | Tạo/sửa nội dung |
| 6 | **Quản lý dịch vụ (CRUD)** | Phase 3 | Quản lý sản phẩm bán |
| 7 | **Quản lý đơn hàng (list + detail)** | Phase 4 | Theo dõi đơn hàng |
| 8 | **Xác nhận thanh toán thủ công** | Phase 4 | Xử lý giao dịch |

### Tóm tắt MVP

```
MVP Admin Panel
├── 🔐 Login (email + password, role check)
├── 📊 Dashboard (6 stats cards + recent orders + pending payments)
├── 👥 Users (list → search → view → change status/role)
├── 📰 Posts (list → create → edit → publish → delete)
├── 🛠️ Services (list → create → edit → delete)
├── 📦 Orders (list → detail with items)
└── 💳 Payments (list → confirm manual payment)
```

**Sau khi MVP hoàn thành**, admin có thể:
- Đăng nhập vào admin panel riêng biệt.
- Xem tổng quan kinh doanh trên dashboard.
- Quản lý người dùng: tìm kiếm, khóa/mở tài khoản.
- Tạo, sửa, xuất bản bài viết tin tức.
- Quản lý dịch vụ/giải pháp đang bán.
- Theo dõi đơn hàng và xác nhận thanh toán chuyển khoản.

**Chưa cần ở MVP**: Media upload, settings, chatbot, RBAC, audit log, reports, export.

---

## Phụ lục: So sánh hiện trạng vs. mục tiêu

| Module | Hiện trạng | Mục tiêu MVP | Mục tiêu Full |
|--------|-----------|-------------|----------------|
| Auth | ✅ Login/Register cơ bản | ✅ Admin login riêng | ✅ + 2FA, session mgmt |
| Dashboard | ⚠️ 1 file page.tsx 24KB | ✅ Trang riêng, modular | ✅ + Charts, alerts |
| Users | ⚠️ List không phân trang | ✅ DataTable + search | ✅ + Export, email |
| Posts | ⚠️ CRUD cơ bản | ✅ Rich editor + status | ✅ + Categories, SEO |
| Guides | ⚠️ CRUD cơ bản | ✅ Rich editor + status | ✅ + Series, files |
| Services | ⚠️ CRUD cơ bản | ✅ Form đầy đủ | ✅ + Pricing plans |
| Orders | ⚠️ CRUD cơ bản | ✅ Detail + timeline | ✅ + Export, PDF |
| Payments | ⚠️ Confirm cơ bản | ✅ Confirm workflow | ✅ + Refund, reconcile |
| Media | ❌ Chưa có | ❌ Phase sau | ✅ Upload + library |
| Settings | ❌ Chưa có | ❌ Phase sau | ✅ Full config |
| Permissions | ❌ Chỉ user/admin | ❌ Phase sau | ✅ RBAC |
| Audit Log | ❌ Chưa có | ❌ Phase sau | ✅ Full logging |
| Reports | ❌ Chưa có | ❌ Phase sau | ✅ Charts + export |
| Chatbot | ⚠️ Component FE | ❌ Phase sau | ✅ Config + logs |

---

> **Tài liệu này là living document**, sẽ được cập nhật theo tiến độ phát triển thực tế.  
> Mỗi phase hoàn thành cần review lại scope phase tiếp theo trước khi bắt đầu.
