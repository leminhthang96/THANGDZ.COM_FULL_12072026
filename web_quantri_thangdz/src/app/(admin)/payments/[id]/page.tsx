'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import type { Payment } from '@/types/index';
import { api } from '@/lib/api';
import { formatCurrency, formatDate, getStatusColor, getStatusLabel } from '@/lib/utils';
import { useToast } from '@/contexts/ToastContext';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import {
  ArrowLeft,
  CreditCard,
  User,
  Calendar,
  CheckCircle,
  RefreshCw,
  DollarSign,
  Hash,
  ShoppingBag,
} from 'lucide-react';

export default function PaymentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { showToast } = useToast();
  const paymentId = Number(params.id);

  const [payment, setPayment] = useState<Payment | null>(null);
  const [loading, setLoading] = useState(true);
  const [confirming, setConfirming] = useState(false);
  const [refunding, setRefunding] = useState(false);

  const fetchPayment = useCallback(async () => {
    try {
      const data = await api.getPayment(paymentId);
      setPayment(data);
    } catch {
      showToast('Khong the tai thong tin thanh toan', 'error');
    } finally {
      setLoading(false);
    }
  }, [paymentId, showToast]);

  useEffect(() => {
    setLoading(true);
    fetchPayment();
  }, [fetchPayment]);

  const handleConfirm = async () => {
    if (!payment || confirming) return;
    const txId = prompt('Nhap ma giao dich (transaction ID):');
    if (txId === null) return;
    setConfirming(true);
    try {
      await api.confirmPayment(paymentId, 'success', txId);
      showToast('Xac nhan thanh toan thanh cong', 'success');
      fetchPayment();
    } catch {
      showToast('Xac nhan thanh toan that bai', 'error');
    } finally {
      setConfirming(false);
    }
  };

  const handleRefund = async () => {
    if (!payment || refunding) return;
    const reason = prompt('Nhap ly do hoan tien (tuy chon):');
    // User can click cancel (null) or enter empty string
    setRefunding(true);
    try {
      await api.refundPayment(paymentId, reason ?? undefined);
      showToast('Hoan tien thanh cong', 'success');
      fetchPayment();
    } catch {
      showToast('Hoan tien that bai', 'error');
    } finally {
      setRefunding(false);
    }
  };

  const getPaymentMethodLabel = (method: string) => {
    const labels: Record<string, string> = {
      bank_transfer: 'Chuyen khoan ngan hang',
      vnpay: 'VNPay',
      momo: 'MoMo',
      zalopay: 'ZaloPay',
      stripe: 'Stripe',
      cod: 'Cu nhan hang (COD)',
    };
    return labels[method] ?? method;
  };

  if (loading) return <LoadingSpinner />;

  if (!payment) {
    return (
      <div className="main-content">
        <div className="empty-state">
          <p>Khong tim thay thanh toan</p>
        </div>
      </div>
    );
  }

  return (
    <div className="main-content">
      {/* Back */}
      <button
        className="btn btn-ghost"
        onClick={() => router.push('/payments')}
        style={{ marginBottom: '1rem', padding: '0.5rem 0' }}
      >
        <ArrowLeft size={16} /> Quay lai danh sach
      </button>

      {/* Payment Info */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div className="card-header">
          <h2 className="card-title">Thong tin thanh toan</h2>
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
                {payment.order_code ?? `#${payment.order_id}`}
              </p>
            </div>

            {/* User Email */}
            <div className="form-group">
              <label className="label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <User size={14} /> Email nguoi dung
              </label>
              <p style={{ fontSize: '0.95rem', fontWeight: 500 }}>
                {payment.user_email ?? '—'}
              </p>
            </div>

            {/* Amount */}
            <div className="form-group">
              <label className="label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <DollarSign size={14} /> So tien
              </label>
              <p
                style={{
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  color: 'var(--accent-color)',
                }}
              >
                {formatCurrency(payment.amount, payment.currency)}
              </p>
            </div>

            {/* Payment Method */}
            <div className="form-group">
              <label className="label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CreditCard size={14} /> Phuong thuc
              </label>
              <p style={{ fontSize: '0.95rem', fontWeight: 500 }}>
                {getPaymentMethodLabel(payment.payment_method)}
              </p>
            </div>

            {/* Status */}
            <div className="form-group">
              <label className="label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle size={14} /> Trang thai
              </label>
              <span
                className={`badge ${getStatusColor(payment.status)}`}
                style={{ fontSize: '0.85rem' }}
              >
                {getStatusLabel(payment.status)}
              </span>
            </div>

            {/* Provider Transaction ID */}
            <div className="form-group">
              <label className="label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Hash size={14} /> Ma giao dich nha cung cap
              </label>
              <p style={{ fontFamily: 'monospace', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                {payment.provider_transaction_id ?? '—'}
              </p>
            </div>

            {/* Paid At */}
            {payment.paid_at && (
              <div className="form-group">
                <label className="label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Calendar size={14} /> Ngay thanh toan
                </label>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                  {formatDate(payment.paid_at)}
                </p>
              </div>
            )}

            {/* Created At */}
            <div className="form-group">
              <label className="label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Calendar size={14} /> Ngay tao
              </label>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                {formatDate(payment.created_at)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Thao tac</h2>
        </div>
        <div style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {payment.status === 'pending' && (
              <button
                className="btn btn-primary"
                onClick={handleConfirm}
                disabled={confirming}
              >
                {confirming ? (
                  <span className="spinner spinner-sm" />
                ) : (
                  <>
                    <CheckCircle size={14} /> Xac nhan thanh toan
                  </>
                )}
              </button>
            )}
            {payment.status === 'success' && (
              <button
                className="btn btn-danger"
                onClick={handleRefund}
                disabled={refunding}
              >
                {refunding ? (
                  <span className="spinner spinner-sm" />
                ) : (
                  <>
                    <RefreshCw size={14} /> Hoan tien
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
