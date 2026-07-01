'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { Guide, PaginatedResponse } from '@/types/index';
import { api } from '@/lib/api';
import { formatDateShort, getStatusColor, getStatusLabel, debounce } from '@/lib/utils';
import { useToast } from '@/contexts/ToastContext';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import Pagination from '@/components/shared/Pagination';
import EmptyState from '@/components/shared/EmptyState';
import {
  Search,
  Filter,
  Plus,
  ChevronRight,
  BookOpen,
  Pencil,
  Trash2,
} from 'lucide-react';

const LEVEL_BADGE: Record<string, string> = {
  beginner: 'badge-success',
  intermediate: 'badge-warning',
  advanced: 'badge-error',
};

const LEVEL_LABEL: Record<string, string> = {
  beginner: 'Sơ cấp',
  intermediate: 'Trung cấp',
  advanced: 'Nâng cao',
};

export default function GuidesPage() {
  const router = useRouter();
  const { showToast } = useToast();

  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [actionId, setActionId] = useState<number | null>(null);
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

  const fetchGuides = useCallback(async () => {
    setLoading(true);
    try {
      const params: Record<string, string | number> = { page, limit };
      if (debouncedSearch) params.search = debouncedSearch;
      if (statusFilter !== 'all') params.status = statusFilter;
      if (levelFilter !== 'all') params.level = levelFilter;

      const res: PaginatedResponse<Guide> = await api.getGuides(params);
      setGuides(res.data);
      setTotal(res.pagination.total);
      setTotalPages(res.pagination.total_pages);
    } catch {
      showToast('Không thể tải danh sách hướng dẫn', 'error');
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearch, statusFilter, levelFilter, showToast]);

  useEffect(() => {
    fetchGuides();
  }, [fetchGuides]);

  const handlePublish = async (guide: Guide) => {
    if (actionId) return;
    setActionId(guide.id);
    try {
      await api.publishGuide(guide.id);
      showToast('Đã xuất bản hướng dẫn', 'success');
      fetchGuides();
    } catch {
      showToast('Xuất bản thất bại', 'error');
    } finally {
      setActionId(null);
    }
  };

  const handleArchive = async (guide: Guide) => {
    if (actionId) return;
    setActionId(guide.id);
    try {
      await api.archiveGuide(guide.id);
      showToast('Đã lưu trữ hướng dẫn', 'success');
      fetchGuides();
    } catch {
      showToast('Lưu trữ thất bại', 'error');
    } finally {
      setActionId(null);
    }
  };

  const handleDelete = async (guide: Guide) => {
    if (!confirm(`Xóa hướng dẫn "${guide.title}"?`)) return;
    setDeletingId(guide.id);
    try {
      await api.deleteGuide(guide.id);
      showToast('Đã xóa hướng dẫn', 'success');
      fetchGuides();
    } catch {
      showToast('Xóa thất bại', 'error');
    } finally {
      setDeletingId(null);
    }
  };

  const handleRowClick = (id: number) => {
    router.push(`/guides/${id}/edit`);
  };

  return (
    <div className="main-content">
      <div className="page-header">
        <div>
          <h1 className="page-title">Hướng dẫn</h1>
          <p className="page-description">Quản lý bài viết hướng dẫn</p>
        </div>
        <button className="btn btn-primary" onClick={() => router.push('/guides/create')}>
          <Plus size={16} /> Tạo hướng dẫn
        </button>
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
              placeholder="Tìm theo tiêu đề..."
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
              style={{ minWidth: '140px' }}
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="draft">Nháp</option>
              <option value="published">Xuất bản</option>
              <option value="archived">Lưu trữ</option>
            </select>
          </div>

          {/* Level Filter */}
          <select
            className="select"
            value={levelFilter}
            onChange={(e) => {
              setLevelFilter(e.target.value);
              setPage(1);
            }}
            style={{ minWidth: '140px' }}
          >
            <option value="all">Tất cả cấp độ</option>
            <option value="beginner">Sơ cấp</option>
            <option value="intermediate">Trung cấp</option>
            <option value="advanced">Nâng cao</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="card">
        {loading ? (
          <LoadingSpinner />
        ) : guides.length === 0 ? (
          <EmptyState
            title="Không có hướng dẫn nào"
            description="Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm"
            icon={<BookOpen size={40} />}
          />
        ) : (
          <>
            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th>Tiêu đề</th>
                    <th>Danh mục</th>
                    <th>Cấp độ</th>
                    <th>Trạng thái</th>
                    <th>Ngày tạo</th>
                    <th style={{ textAlign: 'right' }}>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {guides.map((guide) => (
                    <tr
                      key={guide.id}
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleRowClick(guide.id)}
                    >
                      <td style={{ fontWeight: 500, maxWidth: '320px' }}>
                        <span style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {guide.title}
                        </span>
                      </td>
                      <td style={{ color: 'var(--text-muted)' }}>
                        {guide.category ?? '—'}
                      </td>
                      <td>
                        <span className={`badge ${LEVEL_BADGE[guide.level] ?? 'badge-muted'}`}>
                          {LEVEL_LABEL[guide.level] ?? guide.level}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${getStatusColor(guide.status)}`}>
                          {getStatusLabel(guide.status)}
                        </span>
                      </td>
                      <td style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                        {formatDateShort(guide.created_at)}
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <div
                          style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            className="btn btn-sm btn-ghost"
                            onClick={() => handleRowClick(guide.id)}
                            title="Chỉnh sửa"
                          >
                            <Pencil size={14} />
                          </button>
                          {guide.status === 'draft' && (
                            <button
                              className="btn btn-sm btn-secondary"
                              onClick={() => handlePublish(guide)}
                              disabled={actionId === guide.id}
                              title="Xuất bản"
                            >
                              {actionId === guide.id ? (
                                <span className="spinner spinner-sm" />
                              ) : (
                                'Xuất bản'
                              )}
                            </button>
                          )}
                          {guide.status === 'published' && (
                            <button
                              className="btn btn-sm btn-ghost"
                              onClick={() => handleArchive(guide)}
                              disabled={actionId === guide.id}
                              title="Lưu trữ"
                            >
                              {actionId === guide.id ? (
                                <span className="spinner spinner-sm" />
                              ) : (
                                'Lưu trữ'
                              )}
                            </button>
                          )}
                          <button
                            className="btn btn-sm btn-ghost"
                            onClick={() => handleDelete(guide)}
                            disabled={deletingId === guide.id}
                            title="Xóa"
                            style={{ color: 'var(--color-error)' }}
                          >
                            {deletingId === guide.id ? (
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
                Tổng: {total} hướng dẫn
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
