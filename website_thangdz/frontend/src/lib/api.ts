// frontend/src/lib/api.ts
const API_BASE_URL = 'http://localhost:8000';

export interface User {
  id: number;
  email: string;
  full_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  role: string;
  status: string;
  created_at: string;
}

export interface Service {
  id: number;
  name: string;
  slug: string;
  short_description: string | null;
  description: string | null;
  price: number;
  currency: string;
  thumbnail_url: string | null;
  service_type: string;
  status: string;
  created_at: string;
}

export interface Post {
  id: number;
  title: string;
  slug: string;
  summary: string | null;
  content: string;
  thumbnail_url: string | null;
  category: string | null;
  status: string;
  author_id: number;
  published_at: string | null;
  created_at: string;
}

export interface Guide {
  id: number;
  title: string;
  slug: string;
  summary: string | null;
  content: string;
  thumbnail_url: string | null;
  level: string;
  category: string | null;
  status: string;
  author_id: number;
  published_at: string | null;
  created_at: string;
}

export interface OrderItem {
  id: number;
  service_id: number;
  quantity: number;
  unit_price: number;
  total_price: number;
  service: Service;
}

export interface Order {
  id: number;
  order_code: string;
  total_amount: number;
  currency: string;
  status: string;
  note: string | null;
  created_at: string;
  updated_at: string;
  items: OrderItem[];
}

export interface Payment {
  id: number;
  order_id: number;
  user_id: number;
  payment_method: string;
  provider: string | null;
  provider_transaction_id: string | null;
  amount: number;
  currency: string;
  status: string;
  paid_at: string | null;
  created_at: string;
}

// Helper to get token
export function getAuthToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
}

// Helper for standard headers
function getHeaders(tokenRequired = true) {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (tokenRequired) {
    const token = getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  return headers;
}

// Base Fetch Function
async function apiFetch(endpoint: string, options: RequestInit = {}, tokenRequired = true) {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    ...getHeaders(tokenRequired),
    ...options.headers,
  };
  
  const response = await fetch(url, { ...options, headers });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || `Loi API: ${response.statusText}`);
  }
  
  if (response.status === 204) {
    return null;
  }
  
  return response.json();
}

export const api = {
  // Public Fetching
  getServices: () => apiFetch('/services', {}, false),
  getService: (slug: string) => apiFetch(`/services/${slug}`, {}, false),
  
  getPosts: (category?: string) => apiFetch(category ? `/posts?category=${category}` : '/posts', {}, false),
  getPost: (slug: string) => apiFetch(`/posts/${slug}`, {}, false),
  
  getGuides: (level?: string, category?: string) => {
    let query = '';
    if (level || category) {
      const params = new URLSearchParams();
      if (level) params.append('level', level);
      if (category) params.append('category', category);
      query = `?${params.toString()}`;
    }
    return apiFetch(`/guides${query}`, {}, false);
  },
  getGuide: (slug: string) => apiFetch(`/guides/${slug}`, {}, false),
  
  // Auth Operations
  register: (data: any) => apiFetch('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data)
  }, false),
  
  login: async (email: string, password: string) => {
    // Dung oauth2 form urlencoded format de dang nhap
    const formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', password);
    
    const url = `${API_BASE_URL}/auth/login`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || 'Loi dang nhap.');
    }
    
    const tokenData = await response.json();
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', tokenData.access_token);
      localStorage.setItem('role', tokenData.role);
      localStorage.setItem('email', email);
      window.dispatchEvent(new Event('authchange'));
    }
    return tokenData;
  },
  
  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('email');
      window.dispatchEvent(new Event('authchange'));
    }
  },
  
  getMe: () => apiFetch('/auth/me'),
  updateMe: (data: any) => apiFetch('/auth/me', {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  
  // Orders
  createOrder: (data: any) => apiFetch('/orders', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  getMyOrders: () => apiFetch('/orders/me'),
  getOrder: (id: number) => apiFetch(`/orders/${id}`),
  cancelOrder: (id: number) => apiFetch(`/orders/${id}/cancel`, { method: 'POST' }),
  
  // Payments
  createPayment: (orderId: number, method = 'bank_transfer') => apiFetch('/payments/create', {
    method: 'POST',
    body: JSON.stringify({ order_id: orderId, payment_method: method })
  }),
  getMyTransactions: () => apiFetch('/payments/my-transactions'),
  
  // Admin Operations
  getAdminStats: () => apiFetch('/admin/dashboard/stats'),
  getAdminUsers: () => apiFetch('/admin/users'),
  updateUserStatus: (userId: number, status: string) => apiFetch(`/admin/users/${userId}/status?user_status=${status}`, {
    method: 'PATCH'
  }),
  updateUserRole: (userId: number, role: string) => apiFetch(`/admin/users/${userId}/role?role=${role}`, {
    method: 'PATCH'
  }),
  
  getAdminPosts: () => apiFetch('/posts/admin/all'),
  createAdminPost: (data: any) => apiFetch('/posts', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  updateAdminPost: (id: number, data: any) => apiFetch(`/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  deleteAdminPost: (id: number) => apiFetch(`/posts/${id}`, { method: 'DELETE' }),
  publishPost: (id: number) => apiFetch(`/posts/${id}/publish`, { method: 'PATCH' }),
  
  getAdminGuides: () => apiFetch('/guides/admin/all'),
  createAdminGuide: (data: any) => apiFetch('/guides', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  updateAdminGuide: (id: number, data: any) => apiFetch(`/guides/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  deleteAdminGuide: (id: number) => apiFetch(`/guides/${id}`, { method: 'DELETE' }),
  publishGuide: (id: number) => apiFetch(`/guides/${id}/publish`, { method: 'PATCH' }),
  
  getAdminServices: () => apiFetch('/services/admin/all'),
  createAdminService: (data: any) => apiFetch('/services', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  updateAdminService: (id: number, data: any) => apiFetch(`/services/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  deleteAdminService: (id: number) => apiFetch(`/services/${id}`, { method: 'DELETE' }),
  
  getAdminOrders: () => apiFetch('/orders/admin/all'),
  updateOrderStatus: (id: number, status: string) => apiFetch(`/orders/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status })
  }),
  
  getAdminPayments: () => apiFetch('/payments/admin/all'),
  confirmPayment: (paymentId: number, status: string, txId?: string) => apiFetch(`/payments/admin/${paymentId}/confirm`, {
    method: 'POST',
    body: JSON.stringify({ status, provider_transaction_id: txId })
  })
};
