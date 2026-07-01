'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { Order, PaginatedResponse } from '@/types/index';
import { api } from '@/lib/api';
import { formatCurrency, formatDateShort, getStatusColor, getStatusLabel, debounce } from '@/lib/utils';
import { useToast } from '@/contexts/ToastContext';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import Pagination from '@/components/shared/Pagination';
import EmptyState from '@/components/shared/EmptyState';
import { Search, Filter, ShoppingBag, ChevronRight } from 'lucide-react';

export default function OrdersPage() {
  const router = useRouter();
  const { showToast } = useToast();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 20;

  // Debounce search
  const debouncedSetSearch = useCallback(
    debounce((value: string) => {
      setDebouncedSearch(value);
      setPage(1);
    }, 300),
    []
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    debouncedSetSearch(e.target.value);
  };

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const params: Record<string, string | number> = { page, limit };
      if (debouncedSearch) params.search = debouncedSearch;
      if (statusFilter !== 'all') params.status = statusFilter;

      const res: PaginatedResponse<Order> = await api.getOrders(params);
      setOrders(res.data);
      setTotal(res.pagination.total);
      setTotalPages(res.pagination.total_pages);
    } catch {
      showToast('Khong the tai danh sach don hang', 'error');
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearch, statusFilter, showToast]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleRowClick = (id: number) => {
    router.push(`/orders/${id}`);
  };

  return (
    <div className="main-content">
      <div className="page-header">
        <div>
          <h1 className="page-title">Don hang</h1>
          <p className="page-description">Quan ly danh sach don hang</p>
        </div>
      </div>

      {/* Filters */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Search */}
          <div style={{ position: 'relative', flex: '1 1 280px' }}>
            <Search
              size={16}
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)',
              }}
            />
            <input
              type="text"
              className="input"
              placeholder="Tim theo ma don..."
              value={search}
              onChange={handleSearchChange}
              style={{ paddingLeft: '2.5rem', width: '100%' }}
            />
          </div>

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
              <option value="paid">Da thanh toan</option>
              <option value="cancelled">Da huy</option>
              <option value="failed">That bai</option>
              <option value="refunded">Da hoan tien</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card">
        {loading ? (
          <LoadingSpinner />
        ) : orders.length === 0 ? (
          <EmptyState
            title="Khong co don hang nao"
            description="Thu thay doi bo loc hoac tu khoa tim kiem"
            icon={<ShoppingBag size={40} />}
          />
        ) : (
          <>
            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th>Ma don</th>
                    <th>Email nguoi dung</th>
                    <th>Tong tien</th>
                    <th>Trang thai</th>
                    <th>Ngay tao</th>
                    <th style={{ textAlign: 'right' }}>Thao tac</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr
                      key={order.id}
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleRowClick(order.id)}
                    >
                      <td style={{ fontFamily: 'monospace', fontWeight: 600 }}>{order.order_code}</td>
                      <td>{order.user_email ?? '—'}</td>
                      <td>{formatCurrency(order.total_amount, order.currency)}</td>
                      <td>
                        <span className={`badge ${getStatusColor(order.status)}`}>
                          {getStatusLabel(order.status)}
                        </span>
                      </td>
                      <td style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                        {formatDateShort(order.created_at)}
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <button
                          className="btn btn-sm btn-ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRowClick(order.id);
                          }}
                          title="Xem chi tiet"
                        >
                          <ChevronRight size={14} />
                        </button>
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
                Tong: {total} don hang
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
