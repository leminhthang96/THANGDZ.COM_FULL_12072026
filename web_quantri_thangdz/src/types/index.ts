// ============================================================
// API Response Types
// ============================================================
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
  };
}

// ============================================================
// User
// ============================================================
export interface User {
  id: number;
  email: string;
  full_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  role: "user" | "admin";
  status: "active" | "inactive" | "banned";
  created_at: string;
}

// ============================================================
// Post
// ============================================================
export interface Post {
  id: number;
  title: string;
  slug: string;
  summary: string | null;
  content: string;
  thumbnail_url: string | null;
  category: string | null;
  status: "draft" | "published" | "archived";
  author_id: number;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

// ============================================================
// Guide
// ============================================================
export interface Guide {
  id: number;
  title: string;
  slug: string;
  summary: string | null;
  content: string;
  thumbnail_url: string | null;
  level: "beginner" | "intermediate" | "advanced";
  category: string | null;
  status: "draft" | "published" | "archived";
  author_id: number;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

// ============================================================
// Service
// ============================================================
export interface Service {
  id: number;
  name: string;
  slug: string;
  short_description: string | null;
  description: string | null;
  price: number;
  currency: string;
  thumbnail_url: string | null;
  service_type: "service" | "course" | "digital_product" | "consulting";
  status: "active" | "inactive" | "draft";
  created_at: string;
  updated_at: string;
}

// ============================================================
// Order
// ============================================================
export interface Order {
  id: number;
  order_code: string;
  total_amount: number;
  currency: string;
  status: "pending" | "paid" | "cancelled" | "failed" | "refunded";
  note: string | null;
  user_email?: string;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: number;
  service_id: number;
  service_name?: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

export interface OrderDetail extends Order {
  user?: { id: number; email: string; full_name: string | null };
  items: OrderItem[];
  payments: Payment[];
}

// ============================================================
// Payment
// ============================================================
export interface Payment {
  id: number;
  order_id: number;
  order_code?: string;
  user_email?: string;
  payment_method: string;
  provider: string | null;
  provider_transaction_id: string | null;
  amount: number;
  currency: string;
  status: "pending" | "success" | "failed" | "cancelled" | "refunded";
  paid_at: string | null;
  created_at: string;
}

// ============================================================
// Dashboard
// ============================================================
export interface DashboardStats {
  total_users: number;
  total_posts: number;
  total_guides: number;
  total_services: number;
  total_orders: number;
  total_revenue: number;
  pending_payments_count: number;
  recent_orders: Order[];
  recent_payments: Payment[];
}

export interface RevenueChartData {
  date: string;
  revenue: number;
  order_count: number;
}
