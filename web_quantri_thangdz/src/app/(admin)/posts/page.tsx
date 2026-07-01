'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { Post, PaginatedResponse } from '@/types/index';
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
  Edit,
  Trash2,
  FileText,
} from 'lucide-react';

export default function PostsPage() {
  const router = useRouter();
  const { showToast } = useToast();

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [debouncedCategory, setDebouncedCategory] = useState('');
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

  const debouncedSetCategory = useCallback(
    debounce((value: string) => {
      setDebouncedCategory(value);
      setPage(1);
    }, 300),
    []
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    debouncedSetSearch(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryFilter(e.target.value);
    debouncedSetCategory(e.target.value);
  };

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const params: Record<string, string | number> = { page, limit };
      if (debouncedSearch) params.search = debouncedSearch;
      if (statusFilter !== 'all') params.status = statusFilter;
      if (debouncedCategory) params.category = debouncedCategory;

      const res: PaginatedResponse<Post> = await api.getPosts(params);
      setPosts(res.data);
      setTotal(res.pagination.total);
      setTotalPages(res.pagination.total_pages);
    } catch {
      showToast('Không thể tải danh sách bài viết', 'error');
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearch, statusFilter, debouncedCategory, showToast]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleDelete = async (id: number) => {
    if (!confirm('Bạn có chắc muốn xóa bài viết này?')) return;
    setDeletingId(id);
    try {
      await api.deletePost(id);
      showToast('Đã xóa bài viết', 'success');
      fetchPosts();
    } catch {
      showToast('Xóa bài viết thất bại', 'error');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="main-content">
      <div className="page-header">
        <div>
          <h1 className="page-title">Bài viết</h1>
          <p className="page-description">Quản lý bài viết</p>
        </div>
        <button className="btn btn-primary" onClick={() => router.push('/posts/create')}>
          <Plus size={16} /> Tạo bài viết
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
              placeholder="Tìm theo tiêu đề..."
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
              style={{ minWidth: '140px' }}
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="draft">Nháp</option>
              <option value="published">Đã xuất bản</option>
              <option value="archived">Lưu trữ</option>
            </select>
          </div>

          <input
            type="text"
            className="input"
            placeholder="Lọc theo danh mục..."
            value={categoryFilter}
            onChange={handleCategoryChange}
            style={{ minWidth: '180px' }}
          />
        </div>
      </div>

      {/* Table */}
      <div className="card">
        {loading ? (
          <LoadingSpinner />
        ) : posts.length === 0 ? (
          <EmptyState
            title="Không có bài viết nào"
            description="Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm"
            icon={<FileText size={40} />}
          />
        ) : (
          <>
            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th>Tiêu đề</th>
                    <th>Danh mục</th>
                    <th>Trạng thái</th>
                    <th>Ngày tạo</th>
                    <th style={{ textAlign: 'right' }}>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post) => (
                    <tr key={post.id}>
                      <td style={{ fontWeight: 500, maxWidth: '320px' }}>
                        <span style={{
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}>
                          {post.title}
                        </span>
                      </td>
                      <td style={{ color: 'var(--text-muted)' }}>
                        {post.category ?? '—'}
                      </td>
                      <td>
                        <span className={`badge ${getStatusColor(post.status)}`}>
                          {getStatusLabel(post.status)}
                        </span>
                      </td>
                      <td style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                        {formatDateShort(post.created_at)}
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                          <button
                            className="btn btn-sm btn-secondary"
                            onClick={() => router.push(`/posts/${post.id}/edit`)}
                            title="Sửa bài viết"
                          >
                            <Edit size={14} /> Sửa
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(post.id)}
                            disabled={deletingId === post.id}
                            title="Xóa bài viết"
                          >
                            {deletingId === post.id ? (
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
                Tổng: {total} bài viết
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
