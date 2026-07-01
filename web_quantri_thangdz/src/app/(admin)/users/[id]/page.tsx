'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import type { User, Order, Payment } from '@/types/index';
import { api } from '@/lib/api';
import { formatDate, formatCurrency, getStatusColor, getStatusLabel } from '@/lib/utils';
import { useToast } from '@/contexts/ToastContext';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import {
  ArrowLeft,
  Mail,
  User as UserIcon,
  Phone,
  Shield,
  CheckCircle,
  Calendar,
  ShoppingBag,
  CreditCard,
  ChevronDown,
} from 'lucide-react';

type Tab = 'orders' | 'payments';

export default function UserDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { showToast } = useToast();
  const userId = Number(params.id);

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>('orders');
  const [tabLoading, setTabLoading] = useState(false);

  // Orders & Payments
  const [orders, setOrders] = useState<Order[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);

  // Dropdown states
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [updatingRole, setUpdatingRole] = useState(false);

  const fetchUser = useCallback(async () => {
    try {
      const data = await api.getUserDetail(userId);
      setUser(data);
    } catch {
      showToast('Không thể tải thông tin người dùng', 'error');
    } finally {
      setLoading(false);
    }
  }, [userId, showToast]);

  useEffect(() => {
    setLoading(true);
    fetchUser();
  }, [fetchUser]);

  const fetchTabData = useCallback(async (tab: Tab) => {
    setTabLoading(true);
    try {
      if (tab === 'orders') {
        const res = await api.getOrders({ limit: 100 });
        setOrders(res.data);
      } else {
        const res = await api.getPayments({ limit: 100 });
        setPayments(res.data);
      }
    } catch {
      showToast(`Không thể tải danh sách ${tab === 'orders' ? 'đơn hàng' : 'thanh toán'}`, 'error');
    } finally {
      setTabLoading(false);
    }
  }, [userId, showToast]);

  useEffect(() => {
    fetchTabData(activeTab);
  }, [activeTab, fetchTabData]);

  const handleChangeStatus = async (status: string) => {
    if (!user || updatingStatus) return;
    setUpdatingStatus(true);
    setStatusDropdownOpen(false);
    try {
      await api.updateUserStatus(user.id, status as 'active' | 'inactive' | 'banned');
      setUser((prev) => (prev ? { ...prev, status: status as User['status'] } : null));
      showToast('Cập nhật trạng thái thành công', 'success');
    } catch {
      showToast('Cập nhật trạng thái thất bại', 'error');
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleChangeRole = async (role: string) => {
    if (!user || updatingRole) return;
    setUpdatingRole(true);
    setRoleDropdownOpen(false);
    try {
      await api.updateUserRole(user.id, role as 'user' | 'admin');
      setUser((prev) => (prev ? { ...prev, role: role as User['role'] } : null));
      showToast('Cập nhật vai trò thành công', 'success');
    } catch {
      showToast('Cập nhật vai trò thất bại', 'error');
    } finally {
      setUpdatingRole(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  if (!user) {
    return (
      <div className="main-content">
        <div className="empty-state">
          <p>Không tìm thấy người dùng</p>
        </div>
      </div>
    );
  }

  const statuses = [
    { value: 'active', label: 'Hoạt động' },
    { value: 'inactive', label: 'Không hoạt động' },
    { value: 'banned', label: 'Bị khóa' },
  ];

  const roles = [
    { value: 'user', label: 'Người dùng' },
    { value: 'admin', label: 'Quản trị' },
  ];

  return (
    <div className="main-content">
      {/* Back */}
      <button
        className="btn btn-ghost"
        onClick={() => router.push('/users')}
        style={{ marginBottom: '1rem', padding: '0.5rem 0' }}
      >
        <ArrowLeft size={16} /> Quay lại danh sách
      </button>

      {/* User Info Card */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div className="card-header">
          <h2 className="card-title">Thông tin người dùng</h2>
        </div>
        <div style={{ padding: '1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
            {/* Email */}
            <div className="form-group">
              <label className="label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={14} /> Email
              </label>
              <p style={{ fontSize: '0.95rem', fontWeight: 500 }}>{user.email}</p>
            </div>

            {/* Full Name */}
            <div className="form-group">
              <label className="label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <UserIcon size={14} /> Họ tên
              </label>
              <p style={{ fontSize: '0.95rem', fontWeight: 500 }}>{user.full_name ?? '—'}</p>
            </div>

            {/* Phone */}
            <div className="form-group">
              <label className="label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone size={14} /> Số điện thoại
              </label>
              <p style={{ fontSize: '0.95rem', fontWeight: 500 }}>{user.phone ?? '—'}</p>
            </div>

            {/* Role */}
            <div className="form-group">
              <label className="label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Shield size={14} /> Vai trò
              </label>
              <span
                className={`badge ${user.role === 'admin' ? 'badge-indigo' : 'badge-muted'}`}
                style={{ fontSize: '0.85rem' }}
              >
                {getStatusLabel(user.role)}
              </span>
            </div>

            {/* Status */}
            <div className="form-group">
              <label className="label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle size={14} /> Trạng thái
              </label>
              <span className={`badge ${getStatusColor(user.status)}`} style={{ fontSize: '0.85rem' }}>
                {getStatusLabel(user.status)}
              </span>
            </div>

            {/* Created At */}
            <div className="form-group">
              <label className="label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Calendar size={14} /> Ngày tạo
              </label>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                {formatDate(user.created_at)}
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="divider" style={{ margin: '1.5rem 0' }} />

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {/* Change Status Dropdown */}
            <div style={{ position: 'relative' }}>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setStatusDropdownOpen(!statusDropdownOpen);
                  setRoleDropdownOpen(false);
                }}
                disabled={updatingStatus}
              >
                Đổi trạng thái <ChevronDown size={14} />
              </button>
              {statusDropdownOpen && (
                <div className="dropdown-menu" style={{ display: 'block', minWidth: '180px', marginTop: '0.25rem' }}>
                  {statuses.map((s) => (
                    <button
                      key={s.value}
                      className={`dropdown-item ${user.status === s.value ? 'active' : ''}`}
                      onClick={() => handleChangeStatus(s.value)}
                    >
                      <span className={`badge ${getStatusColor(s.value)}`} style={{ fontSize: '0.8rem' }}>
                        {s.label}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Change Role Dropdown */}
            <div style={{ position: 'relative' }}>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setRoleDropdownOpen(!roleDropdownOpen);
                  setStatusDropdownOpen(false);
                }}
                disabled={updatingRole}
              >
                Đổi vai trò <ChevronDown size={14} />
              </button>
              {roleDropdownOpen && (
                <div className="dropdown-menu" style={{ display: 'block', minWidth: '180px', marginTop: '0.25rem' }}>
                  {roles.map((r) => (
                    <button
                      key={r.value}
                      className={`dropdown-item ${user.role === r.value ? 'active' : ''}`}
                      onClick={() => handleChangeRole(r.value)}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs" style={{ marginBottom: '1rem' }}>
        <button
          className={`tab ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          <ShoppingBag size={14} /> Đơn hàng
        </button>
        <button
          className={`tab ${activeTab === 'payments' ? 'active' : ''}`}
          onClick={() => setActiveTab('payments')}
        >
          <CreditCard size={14} /> Thanh toán
        </button>
      </div>

      {/* Tab Content */}
      <div className="card">
        {tabLoading ? (
          <LoadingSpinner />
        ) : activeTab === 'orders' ? (
          orders.length === 0 ? (
            <div className="empty-state">
              <ShoppingBag size={40} />
              <p className="empty-state-title">Chưa có đơn hàng nào</p>
            </div>
          ) : (
            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th>Mã đơn</th>
                    <th>Tổng tiền</th>
                    <th>Trạng thái</th>
                    <th>Ngày tạo</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td style={{ fontFamily: 'monospace', fontWeight: 600 }}>{order.order_code}</td>
                      <td>{formatCurrency(order.total_amount, order.currency)}</td>
                      <td>
                        <span className={`badge ${getStatusColor(order.status)}`}>
                          {getStatusLabel(order.status)}
                        </span>
                      </td>
                      <td style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                        {formatDate(order.created_at)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        ) : payments.length === 0 ? (
          <div className="empty-state">
            <CreditCard size={40} />
            <p className="empty-state-title">Chưa có thanh toán nào</p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>Mã đơn</th>
                  <th>Phương thức</th>
                  <th>Số tiền</th>
                  <th>Trạng thái</th>
                  <th>Ngày thanh toán</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.id}>
                    <td style={{ fontFamily: 'monospace', fontWeight: 600 }}>
                      {payment.order_code ?? `#${
                        typeof payment.order_id === 'number' ? payment.order_id : '—'
                      }`}
                    </td>
                    <td>{payment.payment_method}</td>
                    <td>{formatCurrency(payment.amount, payment.currency)}</td>
                    <td>
                      <span className={`badge ${getStatusColor(payment.status)}`}>
                        {getStatusLabel(payment.status)}
                      </span>
                    </td>
                    <td style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                      {payment.paid_at ? formatDate(payment.paid_at) : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Click outside to close dropdowns */}
      {statusDropdownOpen || roleDropdownOpen ? (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 40 }}
          onClick={() => {
            setStatusDropdownOpen(false);
            setRoleDropdownOpen(false);
          }}
        />
      ) : null}
    </div>
  );
}
