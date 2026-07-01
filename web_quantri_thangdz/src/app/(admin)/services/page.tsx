'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { Service, PaginatedResponse } from '@/types/index';
import { api } from '@/lib/api';
import { formatDateShort, formatCurrency, debounce } from '@/lib/utils';
import { useToast } from '@/contexts/ToastContext';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import Pagination from '@/components/shared/Pagination';
import EmptyState from '@/components/shared/EmptyState';
import {
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Package,
} from 'lucide-react';

const SERVICE_TYPE_LABELS: Record<string, string> = {
  service: 'Dịch vụ',
  course: 'Khóa học',
  digital_product: 'Sản phẩm số',
  consulting: 'Tư vấn',
};

const SERVICE_TYPE_COLORS: Record<string, string> = {
  service: 'badge-indigo',
  course: 'badge-info',
  digital_product: 'badge-success',
  consulting: 'badge-warning',
};

const STATUS_COLORS: Record<string, string> = {
  active: 'badge-success',
  inactive: 'badge-error',
  draft: 'badge-muted',
};

const STATUS_LABELS: Record<string, string> = {
  active: 'Hoạt động',
  inactive: 'Không hoạt động',
  draft: 'Nháp',
};

export default function ServicesPage() {
  const router = useRouter();
  const { showToast } = useToast();

  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const limit = 20;

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

  const fetchServices = useCallback(async () => {
    setLoading(true);
    try {
      const params: Record<string, string | number> = { page, limit };
      if (debouncedSearch) params.search = debouncedSearch;
      if (statusFilter !== 'all') params.status = statusFilter;
      if (typeFilter !== 'all') params.service_type = typeFilter;

      const res: PaginatedResponse<Service> = await api.getServices(params);
      setServices(res.data);
      setTotal(res.pagination.total);
      setTotalPages(res.pagination.total_pages);
    } catch {
      showToast('Không thể tải danh sách dịch vụ', 'error');
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearch, statusFilter, typeFilter, showToast]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const handleDelete = async (id: number) => {
    if (!confirm('Bạn có chắc muốn xóa dịch vụ này?')) return;
    setDeletingId(id);
    try {
      await api.deleteService(id);
      showToast('Đã xóa dịch vụ', 'success');
      fetchServices();
    } catch {
      showToast('Xóa dịch vụ thất bại', 'error');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="main-content">
      <div className="page-header">
        <div>
          <h1 className="page-title">Dịch vụ</h1>
          <p className="page-description">Quản lý dịch vụ</p>
        </div>
        <button className="btn btn-primary" onClick={() => router.push('/services/create')}>
          <Plus size={16} /> Tạo dịch vụ
        </button>
      </div>

      {/* Filters */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
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
              placeholder="Tìm theo tên dịch vụ..."
              value={search}
              onChange={handleSearchChange}
              style={{ paddingLeft: '2.5rem', width: '100%' }}
            />
          </div>

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
              <option value="all">Tất cả trạng thái</option>
              <option value="active">Hoạt động</option>
              <option value="inactive">Không hoạt động</option>
              <option value="draft">Nháp</option>
            </select>
          </div>

          <select
            className="select"
            value={typeFilter}
            onChange={(e) => {
              setTypeFilter(e.target.value);
              setPage(1);
            }}
            style={{ minWidth: '180px' }}
          >
            <option value="all">Tất cả loại</option>
            <option value="service">Dịch vụ</option>
            <option value="course">Khóa học</option>
            <option value="digital_product">Sản phẩm số</option>
            <option value="consulting">Tư vấn</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="card">
        {loading ? (
          <LoadingSpinner />
        ) : services.length === 0 ? (
          <EmptyState
            title="Không có dịch vụ nào"
            description="Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm"
            icon={<Package size={40} />}
          />
        ) : (
          <>
            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th>Tên dịch vụ</th>
                    <th>Loại dịch vụ</th>
                    <th>Giá</th>
                    <th>Trạng thái</th>
                    <th>Ngày tạo</th>
                    <th style={{ textAlign: 'right' }}>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((service) => (
                    <tr key={service.id}>
                      <td style={{ fontWeight: 500, maxWidth: '280px' }}>
                        <span style={{
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}>
                          {service.name}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${SERVICE_TYPE_COLORS[service.service_type] ?? 'badge-muted'}`}>
                          {SERVICE_TYPE_LABELS[service.service_type] ?? service.service_type}
                        </span>
                      </td>
                      <td style={{ fontWeight: 500 }}>
                        {formatCurrency(service.price, service.currency)}
                      </td>
                      <td>
                        <span className={`badge ${STATUS_COLORS[service.status] ?? 'badge-muted'}`}>
                          {STATUS_LABELS[service.status] ?? service.status}
                        </span>
                      </td>
                      <td style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                        {formatDateShort(service.created_at)}
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                          <button
                            className="btn btn-sm btn-secondary"
                            onClick={() => router.push(`/services/${service.id}/edit`)}
                            title="Sửa dịch vụ"
                          >
                            <Edit size={14} /> Sửa
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(service.id)}
                            disabled={deletingId === service.id}
                            title="Xóa dịch vụ"
                          >
                            {deletingId === service.id ? (
                              <span className="spinner spinner-sm" />
                            ) : (
                              <Trash2 size={14} />
                            )}
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
                Tổng: {total} dịch vụ
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
