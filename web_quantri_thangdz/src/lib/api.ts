const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

function getAuthHeaders(tokenRequired = true): HeadersInit {
  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  if (tokenRequired) {
    const token = localStorage.getItem('admin_token');
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

async function apiFetch(endpoint: string, options: RequestInit = {}, tokenRequired = true) {
  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: { ...getAuthHeaders(tokenRequired), ...options.headers },
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.detail || `Lỗi API: ${response.status}`);
  }
  if (response.status === 204) return null;
  return response.json();
}

async function uploadFetch(endpoint: string, formData: FormData) {
  const token = localStorage.getItem('admin_token');
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    body: formData,
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.detail || `Loi upload: ${response.status}`);
  }
  return response.json();
}

export const api = {
  // Auth
  login: (email: string, password: string) => {
    const formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', password);
    return fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData,
    }).then(r => {
      if (!r.ok) throw new Error('Đăng nhập thất bại');
      return r.json();
    });
  },
  getMe: () => apiFetch('/auth/me'),

  // Dashboard
  getDashboardStats: () => apiFetch('/admin/dashboard/stats'),
  getRevenueChart: (days = 30) => apiFetch(`/admin/dashboard/revenue-chart?days=${days}`),

  // Users
  getUsers: (params: { page?: number; limit?: number; search?: string; status?: string; role?: string } = {}) => {
    const qs = new URLSearchParams();
    if (params.page) qs.set('page', String(params.page));
    if (params.limit) qs.set('limit', String(params.limit));
    if (params.search) qs.set('search', params.search);
    if (params.status) qs.set('status', params.status);
    if (params.role) qs.set('role', params.role);
    return apiFetch(`/admin/users?${qs}`);
  },
  getUserDetail: (id: number) => apiFetch(`/admin/users/${id}`),
  updateUserStatus: (id: number, status: string) =>
    apiFetch(`/admin/users/${id}/status`, { method: 'PATCH', body: JSON.stringify({ user_status: status }) }),
  updateUserRole: (id: number, role: string) =>
    apiFetch(`/admin/users/${id}/role`, { method: 'PATCH', body: JSON.stringify({ role }) }),

  // Posts
  getPosts: (params: { page?: number; limit?: number; search?: string; status?: string; category?: string } = {}) => {
    const qs = new URLSearchParams();
    if (params.page) qs.set('page', String(params.page));
    if (params.limit) qs.set('limit', String(params.limit));
    if (params.search) qs.set('search', params.search);
    if (params.status) qs.set('status', params.status);
    if (params.category) qs.set('category', params.category);
    return apiFetch(`/admin/posts?${qs}`);
  },
  getPost: (id: number) => apiFetch(`/admin/posts/${id}`),
  createPost: (data: any) => apiFetch('/admin/posts', { method: 'POST', body: JSON.stringify(data) }),
  updatePost: (id: number, data: any) => apiFetch(`/admin/posts/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deletePost: (id: number) => apiFetch(`/admin/posts/${id}`, { method: 'DELETE' }),
  publishPost: (id: number) => apiFetch(`/admin/posts/${id}/publish`, { method: 'PATCH' }),
  archivePost: (id: number) => apiFetch(`/admin/posts/${id}/archive`, { method: 'PATCH' }),

  // Guides
  getGuides: (params: { page?: number; limit?: number; search?: string; status?: string; level?: string; category?: string } = {}) => {
    const qs = new URLSearchParams();
    if (params.page) qs.set('page', String(params.page));
    if (params.limit) qs.set('limit', String(params.limit));
    if (params.search) qs.set('search', params.search);
    if (params.status) qs.set('status', params.status);
    if (params.level) qs.set('level', params.level);
    if (params.category) qs.set('category', params.category);
    return apiFetch(`/admin/guides?${qs}`);
  },
  getGuide: (id: number) => apiFetch(`/admin/guides/${id}`),
  createGuide: (data: any) => apiFetch('/admin/guides', { method: 'POST', body: JSON.stringify(data) }),
  updateGuide: (id: number, data: any) => apiFetch(`/admin/guides/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteGuide: (id: number) => apiFetch(`/admin/guides/${id}`, { method: 'DELETE' }),
  publishGuide: (id: number) => apiFetch(`/admin/guides/${id}/publish`, { method: 'PATCH' }),
  archiveGuide: (id: number) => apiFetch(`/admin/guides/${id}/archive`, { method: 'PATCH' }),

  // Services
  getServices: (params: { page?: number; limit?: number; search?: string; status?: string; service_type?: string } = {}) => {
    const qs = new URLSearchParams();
    if (params.page) qs.set('page', String(params.page));
    if (params.limit) qs.set('limit', String(params.limit));
    if (params.search) qs.set('search', params.search);
    if (params.status) qs.set('status', params.status);
    if (params.service_type) qs.set('service_type', params.service_type);
    return apiFetch(`/admin/services?${qs}`);
  },
  getService: (id: number) => apiFetch(`/admin/services/${id}`),
  createService: (data: any) => apiFetch('/admin/services', { method: 'POST', body: JSON.stringify(data) }),
  updateService: (id: number, data: any) => apiFetch(`/admin/services/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteService: (id: number) => apiFetch(`/admin/services/${id}`, { method: 'DELETE' }),

  // Orders
  getOrders: (params: { page?: number; limit?: number; search?: string; status?: string } = {}) => {
    const qs = new URLSearchParams();
    if (params.page) qs.set('page', String(params.page));
    if (params.limit) qs.set('limit', String(params.limit));
    if (params.search) qs.set('search', params.search);
    if (params.status) qs.set('status', params.status);
    return apiFetch(`/admin/orders?${qs}`);
  },
  getOrder: (id: number) => apiFetch(`/admin/orders/${id}`),
  updateOrderStatus: (id: number, status: string, admin_note?: string) =>
    apiFetch(`/admin/orders/${id}/status`, { method: 'PUT', body: JSON.stringify({ status, admin_note }) }),

  // Payments
  getPayments: (params: { page?: number; limit?: number; status?: string; payment_method?: string } = {}) => {
    const qs = new URLSearchParams();
    if (params.page) qs.set('page', String(params.page));
    if (params.limit) qs.set('limit', String(params.limit));
    if (params.status) qs.set('status', params.status);
    if (params.payment_method) qs.set('payment_method', params.payment_method);
    return apiFetch(`/admin/payments?${qs}`);
  },
  getPayment: (id: number) => apiFetch(`/admin/payments/${id}`),
  confirmPayment: (id: number, status: string, txId?: string) =>
    apiFetch(`/admin/payments/${id}/confirm`, { method: 'POST', body: JSON.stringify({ status, provider_transaction_id: txId }) }),
  refundPayment: (id: number, reason?: string) =>
    apiFetch(`/admin/payments/${id}/refund`, { method: 'POST', body: JSON.stringify({ reason }) }),

  // Media
  uploadMedia: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return uploadFetch('/admin/media/upload', formData);
  },

  // System Update
  checkUpdate: () => apiFetch('/admin/update/check'),
  runUpdate: () => apiFetch('/admin/update/run', { method: 'POST' }),
  getUpdateStatus: () => apiFetch('/admin/update/status'),
};

