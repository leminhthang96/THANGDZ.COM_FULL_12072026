'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { User, PaginatedResponse } from '@/types/index';
import { api } from '@/lib/api';
import { formatDateShort, getStatusColor, getStatusLabel, debounce } from '@/lib/utils';
import { useToast } from '@/contexts/ToastContext';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import Pagination from '@/components/shared/Pagination';
import EmptyState from '@/components/shared/EmptyState';
import {
  Search,
  Filter,
  Lock,
  Unlock,
  ChevronRight,
  Users,
} from 'lucide-react';

export default function UsersPage() {
  const router = useRouter();
  const { showToast } = useToast();

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [togglingId, setTogglingId] = useState<number | null>(null);
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

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const params: Record<string, string | number> = { page, limit };
      if (debouncedSearch) params.search = debouncedSearch;
      if (statusFilter !== 'all') params.status = statusFilter;
      if (roleFilter !== 'all') params.role = roleFilter;

      const res: PaginatedResponse<User> = await api.getUsers(params);
      setUsers(res.data);
      setTotal(res.pagination.total);
      setTotalPages(res.pagination.total_pages);
    } catch {
      showToast('Không thể tải danh sách người dùng', 'error');
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearch, statusFilter, roleFilter, showToast]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleToggleStatus = async (user: User, newStatus: string) => {
    if (togglingId) return;
    setTogglingId(user.id);
    try {
      await api.updateUserStatus(user.id, newStatus as 'active' | 'inactive' | 'banned');
      showToast(`Đã cập nhật trạng thái người dùng`, 'success');
      fetchUsers();
    } catch {
      showToast('Cập nhật trạng thái thất bại', 'error');
    } finally {
      setTogglingId(null);
    }
  };

  const handleRowClick = (id: number) => {
    router.push(`/users/${id}`);
  };

  return (
    <div className="main-content">
      <div className="page-header">
        <div>
          <h1 className="page-title">Người dùng</h1>
          <p className="page-description">Quản lý tài khoản người dùng</p>
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
              placeholder="Tìm theo email hoặc tên..."
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
              <option value="active">Hoạt động</option>
              <option value="inactive">Không hoạt động</option>
              <option value="banned">Bị khóa</option>
            </select>
          </div>

          {/* Role Filter */}
          <select
            className="select"
            value={roleFilter}
            onChange={(e) => {
              setRoleFilter(e.target.value);
              setPage(1);
            }}
            style={{ minWidth: '140px' }}
          >
            <option value="all">Tất cả vai trò</option>
            <option value="user">Người dùng</option>
            <option value="admin">Quản trị</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="card">
        {loading ? (
          <LoadingSpinner />
        ) : users.length === 0 ? (
          <EmptyState
            title="Không có người dùng nào"
            description="Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm"
            icon={<Users size={40} />}
          />
        ) : (
          <>
            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Họ tên</th>
                    <th>Vai trò</th>
                    <th>Trạng thái</th>
                    <th>Ngày tạo</th>
                    <th style={{ textAlign: 'right' }}>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr
                      key={user.id}
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleRowClick(user.id)}
                    >
                      <td style={{ fontWeight: 500 }}>{user.email}</td>
                      <td>{user.full_name ?? '—'}</td>
                      <td>
                        <span
                          className={`badge ${user.role === 'admin' ? 'badge-indigo' : 'badge-muted'}`}
                        >
                          {getStatusLabel(user.role)}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${getStatusColor(user.status)}`}>
                          {getStatusLabel(user.status)}
                        </span>
                      </td>
                      <td style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                        {formatDateShort(user.created_at)}
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                          <button
                            className={`btn btn-sm ${user.status === 'active' ? 'btn-ghost' : 'btn-secondary'}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              const newStatus = user.status === 'active' ? 'inactive' : 'active';
                              handleToggleStatus(user, newStatus);
                            }}
                            disabled={togglingId === user.id}
                            title={user.status === 'active' ? 'Khóa tài khoản' : 'Mở khóa tài khoản'}
                          >
                            {togglingId === user.id ? (
                              <span className="spinner spinner-sm" />
                            ) : user.status === 'active' ? (
                              <>
                                <Lock size={14} /> Khóa
                              </>
                            ) : (
                              <>
                                <Unlock size={14} /> Mở
                              </>
                            )}
                          </button>
                          <button
                            className="btn btn-sm btn-ghost"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRowClick(user.id);
                            }}
                            title="Xem chi tiết"
                          >
                            <ChevronRight size={14} />
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
                Tổng: {total} người dùng
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
