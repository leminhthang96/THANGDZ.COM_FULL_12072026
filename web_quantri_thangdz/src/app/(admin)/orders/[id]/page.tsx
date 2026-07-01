'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import type { OrderDetail } from '@/types/index';
import { api } from '@/lib/api';
import { formatCurrency, formatDate, getStatusColor, getStatusLabel } from '@/lib/utils';
import { useToast } from '@/contexts/ToastContext';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import {
  ArrowLeft,
  ShoppingBag,
  User,
  Calendar,
  CreditCard,
  CheckCircle,
  Clock,
} from 'lucide-react';

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { showToast } = useToast();
  const orderId = Number(params.id);

  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState('');
  const [adminNote, setAdminNote] = useState('');

  const fetchOrder = useCallback(async () => {
    try {
      const data = await api.getOrder(orderId);
      setOrder(data);
      setStatus(data.status);
    } catch {
      showToast('Khong the tai thong tin don hang', 'error');
    } finally {
      setLoading(false);
    }
  }, [orderId, showToast]);

  useEffect(() => {
    setLoading(true);
    fetchOrder();
  }, [fetchOrder]);

  const handleUpdateStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!order || submitting) return;
    setSubmitting(true);
    try {
      await api.updateOrderStatus(orderId, status, adminNote || undefined);
      showToast('Cap nhat trang thai thanh cong', 'success');
      setAdminNote('');
      fetchOrder();
    } catch {
      showToast('Cap nhat trang thai that bai', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  if (!order) {
    return (
      <div className="main-content">
        <div className="empty-state">
          <p>Khong tim thay don hang</p>
        </div>
      </div>
    );
  }

  return (
    <div className="main-content">
      {/* Back */}
      <button
        className="btn btn-ghost"
        onClick={() => router.push('/orders')}
        style={{ marginBottom: '1rem', padding: '0.5rem 0' }}
      >
        <ArrowLeft size={16} /> Quay lai danh sach
      </button>

      {/* Order Info */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div className="card-header">
          <h2 className="card-title">Thong tin don hang</h2>
        </div>
        <div style={{ padding: '1.5rem' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {/* Order Code */}
            <div className="form-group">
              <label className="label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShoppingBag size={14} /> Ma don
              </label>
              <p style={{ fontFamily: 'monospace', fontSize: '0.95rem', fontWeight: 600 }}>
                {order.order_code}
              </p>
            </div>

            {/* Status */}
            <div className="form-group">
              <label className="label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle size={14} /> Trang thai
              </label>
              <span className={`badge ${getStatusColor(order.status)}`} style={{ fontSize: '0.85rem' }}>
                {getStatusLabel(order.status)}
              </span>
            </div>

            {/* Total Amount */}
            <div className="form-group">
              <label className="label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CreditCard size={14} /> Tong tien
              </label>
              <p style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--accent-color)' }}>
                {formatCurrency(order.total_amount, order.currency)}
              </p>
            </div>

            {/* User Email */}
            <div className="form-group">
              <label className="label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <User size={14} /> Email nguoi dung
              </label>
              <p style={{ fontSize: '0.95rem', fontWeight: 500 }}>
                {order.user?.email ?? order.user_email ?? '—'}
              </p>
            </div>

            {/* Created At */}
            <div className="form-group">
              <label className="label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Calendar size={14} /> Ngay tao
              </label>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>{formatDate(order.created_at)}</p>
            </div>

            {/* Note */}
            {order.note && (
              <div className="form-group">
                <label className="label">
                  <Clock size={14} style={{ display: 'inline', marginRight: '0.5rem' }} />
                  Ghi chu
                </label>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{order.note}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Order Items */}
      {order.items && order.items.length > 0 && (
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <div className="card-header">
            <h2 className="card-title">Chi tiet don hang</h2>
          </div>
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>Dich vu</th>
                  <th>So luong</th>
                  <th>Don gia</th>
                  <th>Thanh tien</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.service_name ?? `Dich vu #${item.service_id}`}</td>
                    <td>{item.quantity}</td>
                    <td>{formatCurrency(item.unit_price, order.currency)}</td>
                    <td style={{ fontWeight: 600 }}>
                      {formatCurrency(item.total_price, order.currency)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Payments */}
      {order.payments && order.payments.length > 0 && (
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <div className="card-header">
            <h2 className="card-title">Lich su thanh toan</h2>
          </div>
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>Phuong thuc</th>
                  <th>So tien</th>
                  <th>Trang thai</th>
                  <th>Ngay tao</th>
                </tr>
              </thead>
              <tbody>
                {order.payments.map((payment) => (
                  <tr key={payment.id}>
                    <td>{payment.payment_method}</td>
                    <td>{formatCurrency(payment.amount, payment.currency)}</td>
                    <td>
                      <span className={`badge ${getStatusColor(payment.status)}`}>
                        {getStatusLabel(payment.status)}
                      </span>
                    </td>
                    <td style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                      {formatDate(payment.created_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Change Status Form */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Doi trang thai don hang</h2>
        </div>
        <div style={{ padding: '1.5rem' }}>
          <form onSubmit={handleUpdateStatus}>
            <div className="form-group">
              <label className="label" htmlFor="order-status">
                Trang thai moi
              </label>
              <select
                id="order-status"
                className="select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                style={{ maxWidth: '300px' }}
              >
                <option value="pending">Cho xu ly</option>
                <option value="paid">Da thanh toan</option>
                <option value="cancelled">Da huy</option>
                <option value="failed">That bai</option>
                <option value="refunded">Da hoan tien</option>
              </select>
            </div>
            <div className="form-group">
              <label className="label" htmlFor="admin-note">
                Ghi chu quan tri (tuychon)
              </label>
              <textarea
                id="admin-note"
                className="input"
                rows={3}
                placeholder="Nhap ghi chu neu can..."
                value={adminNote}
                onChange={(e) => setAdminNote(e.target.value)}
                style={{ maxWidth: '500px' }}
              />
            </div>
            <div style={{ marginTop: '1rem' }}>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={submitting || status === order.status}
              >
                {submitting ? <span className="spinner spinner-sm" /> : null}
                Cap nhat trang thai
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
