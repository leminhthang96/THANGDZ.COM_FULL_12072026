'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Payment, PaginatedResponse } from '@/types/index';
import { api } from '@/lib/api';
import { formatCurrency, formatDateShort, getStatusColor, getStatusLabel } from '@/lib/utils';
import { useToast } from '@/contexts/ToastContext';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import Pagination from '@/components/shared/Pagination';
import EmptyState from '@/components/shared/EmptyState';
import { Filter, CreditCard, CheckCircle, XCircle, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PaymentsPage() {
  const router = useRouter();
  const { showToast } = useToast();

  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [methodFilter, setMethodFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [processingId, setProcessingId] = useState<number | null>(null);
  const limit = 20;

  const fetchPayments = useCallback(async () => {
    setLoading(true);
    try {
      const params: Record<string, string | number> = { page, limit };
      if (statusFilter !== 'all') params.status = statusFilter;
      if (methodFilter !== 'all') params.payment_method = methodFilter;

      const res: PaginatedResponse<Payment> = await api.getPayments(params);
      setPayments(res.data);
      setTotal(res.pagination.total);
      setTotalPages(res.pagination.total_pages);
    } catch {
      showToast('Khong the tai danh sach thanh toan', 'error');
    } finally {
      setLoading(false);
    }
  }, [page, statusFilter, methodFilter, showToast]);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  const handleConfirm = async (payment: Payment) => {
    const txId = prompt('Nhap ma giao dich (transaction ID):');
    if (txId === null) return;
    setProcessingId(payment.id);
    try {
      await api.confirmPayment(payment.id, 'success', txId);
      showToast('Xac nhan thanh toan thanh cong', 'success');
      fetchPayments();
    } catch {
      showToast('Xac nhan thanh toan that bai', 'error');
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (payment: Payment) => {
    const txId = prompt('Nhap ma giao dich (transaction ID) hoac ly do tu choi:');
    if (txId === null) return;
    setProcessingId(payment.id);
    try {
      await api.confirmPayment(payment.id, 'failed', txId);
      showToast('Da tu choi thanh toan', 'success');
      fetchPayments();
    } catch {
      showToast('Tu choi thanh toan that bai', 'error');
    } finally {
      setProcessingId(null);
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

  return (
    <div className="main-content">
      <div className="page-header">
        <div>
          <h1 className="page-title">Thanh toan</h1>
          <p className="page-description">Quan ly lich su thanh toan</p>
        </div>
      </div>

      {/* Filters */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Status Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Filter size={14} style={{ color: 'var(--text-muted)' }} />
            <select
              className="select"
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              style={{ minWidth: '160px' }}
            >
              <option value="all">Tat ca trang thai</option>
              <option value="pending">Cho xu ly</option>
              <option value="success">Thanh cong</option>
              <option value="failed">That bai</option>
              <option value="cancelled">Da huy</option>
              <option value="refunded">Da hoan tien</option>
            </select>
          </div>

          {/* Payment Method Filter */}
          <select
            className="select"
            value={methodFilter}
            onChange={(e) => {
              setMethodFilter(e.target.value);
              setPage(1);
            }}
            style={{ minWidth: '200px' }}
          >
            <option value="all">Tat ca phuong thuc</option>
            <option value="bank_transfer">Chuyen khoan ngan hang</option>
            <option value="vnpay">VNPay</option>
            <option value="momo">MoMo</option>
            <option value="zalopay">ZaloPay</option>
            <option value="stripe">Stripe</option>
            <option value="cod">COD</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="card">
        {loading ? (
          <LoadingSpinner />
        ) : payments.length === 0 ? (
          <EmptyState
            title="Khong co thanh toan nao"
            description="Thu thay doi bo loc tim kiem"
            icon={<CreditCard size={40} />}
          />
        ) : (
          <>
            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th>Ma don</th>
                    <th>Email nguoi dung</th>
                    <th>So tien</th>
                    <th>Phuong thuc</th>
                    <th>Trang thai</th>
                    <th>Ngay tao</th>
                    <th style={{ textAlign: 'right' }}>Thao tac</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment) => (
                    <tr key={payment.id}>
                      <td style={{ fontFamily: 'monospace', fontWeight: 600 }}>
                        {payment.order_code ?? `#${payment.order_id}`}
                      </td>
                      <td>{payment.user_email ?? '—'}</td>
                      <td>{formatCurrency(payment.amount, payment.currency)}</td>
                      <td>{getPaymentMethodLabel(payment.payment_method)}</td>
                      <td>
                        <span className={`badge ${getStatusColor(payment.status)}`}>
                          {getStatusLabel(payment.status)}
                        </span>
                      </td>
                      <td style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                        {formatDateShort(payment.created_at)}
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <div
                          style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}
                        >
                          {payment.status === 'pending' && (
                            <>
                              <button
                                className="btn btn-sm btn-primary"
                                onClick={() => handleConfirm(payment)}
                                disabled={processingId === payment.id}
                                title="Xac nhan thanh toan"
                              >
                                {processingId === payment.id ? (
                                  <span className="spinner spinner-sm" />
                                ) : (
                                  <>
                                    <CheckCircle size={14} /> Xac nhan
                                  </>
                                )}
                              </button>
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() => handleReject(payment)}
                                disabled={processingId === payment.id}
                                title="Tu choi thanh toan"
                              >
                                <XCircle size={14} /> Tu choi
                              </button>
                            </>
                          )}
                          <button
                            className="btn btn-sm btn-ghost"
                            onClick={() => router.push(`/payments/${payment.id}`)}
                            title="Xem chi tiet"
                          >
                            <Eye size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem',
                borderTop: '1px solid var(--border-color)',
              }}
            >
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                Tong: {total} thanh toan
              </span>
              {totalPages > 1 && (
                <Pagination
                  page={page}
                  totalPages={totalPages}
                  total={total}
                  limit={limit}
                  onPageChange={setPage}
                />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
