'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { formatCurrency, formatDate, getStatusColor, getStatusLabel } from '@/lib/utils';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { DashboardStats, RevenueChartData } from '@/types';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  DollarSign,
  ShoppingCart,
  Users,
  Clock,
  TrendingUp,
  Package,
  CreditCard,
} from 'lucide-react';

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [chartData, setChartData] = useState<RevenueChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [statsResponse, chartResponse] = await Promise.all([
          api.getDashboardStats(),
          api.getRevenueChart(30).catch(() => ({ data: [] })),
        ]);
        const statsData = statsResponse.data ?? statsResponse;
        setStats(statsData);
        setChartData(chartResponse.data ?? []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Không thể tải dữ liệu dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <LoadingSpinner size="lg" />;
  }

  if (error) {
    return (
      <div className="alert alert-error" style={{ marginTop: '2rem' }}>
        <span>{error}</span>
      </div>
    );
  }

  if (!stats) return null;

  const statCards = [
    {
      label: 'Tổng doanh thu',
      value: formatCurrency(stats.total_revenue),
      icon: DollarSign,
      bgColor: 'rgba(6, 182, 212, 0.15)',
      iconColor: '#06b6d4',
    },
    {
      label: 'Tổng đơn hàng',
      value: (stats.total_orders ?? 0).toLocaleString('vi-VN'),
      icon: ShoppingCart,
      bgColor: 'rgba(245, 158, 11, 0.15)',
      iconColor: '#f59e0b',
    },
    {
      label: 'Người dùng',
      value: (stats.total_users ?? 0).toLocaleString('vi-VN'),
      icon: Users,
      bgColor: 'rgba(34, 197, 94, 0.15)',
      iconColor: '#22c55e',
    },
    {
      label: 'Thanh toán chờ',
      value: (stats.pending_payments_count ?? 0).toLocaleString('vi-VN'),
      icon: Clock,
      bgColor: 'rgba(239, 68, 68, 0.15)',
      iconColor: '#ef4444',
    },
  ];

  const customTooltipStyle = {
    backgroundColor: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '8px',
    fontSize: '0.875rem',
    color: '#f8fafc',
  };

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-description">
          Tổng quan hoạt động của hệ thống ThangDz
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4" style={{ marginBottom: '1.5rem' }}>
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="stat-card">
              <div
                className="stat-card-icon"
                style={{ background: card.bgColor }}
              >
                <Icon size={22} color={card.iconColor} />
              </div>
              <div className="stat-card-content">
                <div className="stat-card-label">{card.label}</div>
                <div className="stat-card-value">{card.value}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Revenue Chart */}
      {chartData.length > 0 && (
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <div className="card-header">
            <div>
              <h2 className="card-title">Doanh thu 30 ngày gần đây</h2>
              <p className="card-description">
                Biểu đồ doanh thu theo ngày
              </p>
            </div>
            <TrendingUp size={20} color="#06b6d4" />
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis
                dataKey="date"
                tick={{ fill: '#94a3b8', fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(val: string) => {
                  const d = new Date(val);
                  return `${d.getDate()}/${d.getMonth() + 1}`;
                }}
              />
              <YAxis
                tick={{ fill: '#94a3b8', fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(val: number) =>
                  val >= 1_000_000
                    ? `${(val / 1_000_000).toFixed(1)}M`
                    : val >= 1_000
                    ? `${(val / 1_000).toFixed(0)}K`
                    : String(val)
                }
              />
              <Tooltip
                contentStyle={customTooltipStyle}
                labelStyle={{ color: '#94a3b8', marginBottom: '4px' }}
                formatter={(value: number) => [formatCurrency(value), 'Doanh thu']}
                labelFormatter={(label: string) => {
                  const d = new Date(label);
                  return d.toLocaleDateString('vi-VN', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  });
                }}
              />
              <Bar
                dataKey="revenue"
                fill="#06b6d4"
                radius={[4, 4, 0, 0]}
                maxBarSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Two-column layout */}
      <div className="grid grid-cols-2">
        {/* Recent Orders */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Đơn hàng gần đây</h2>
            <Package size={20} color="#f59e0b" />
          </div>
          {stats.recent_orders.length === 0 ? (
            <div className="empty-state">
              <Package size={48} className="empty-state-icon" />
              <div className="empty-state-title">Chưa có đơn hàng nào</div>
              <div className="empty-state-description">
                Danh sách đơn hàng gần đây sẽ hiển thị tại đây.
              </div>
            </div>
          ) : (
            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th>Mã đơn</th>
                    <th>Khách hàng</th>
                    <th>Tổng tiền</th>
                    <th>Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recent_orders.map((order) => (
                    <tr key={order.id}>
                      <td style={{ fontFamily: 'monospace', fontSize: '0.8125rem' }}>
                        {order.order_code}
                      </td>
                      <td style={{ color: '#94a3b8' }}>{order.user_email ?? '—'}</td>
                      <td>{formatCurrency(order.total_amount)}</td>
                      <td>
                        <span className={`badge ${getStatusColor(order.status)}`}>
                          {getStatusLabel(order.status)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Recent Payments */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Thanh toán gần đây</h2>
            <CreditCard size={20} color="#22c55e" />
          </div>
          {stats.recent_payments.length === 0 ? (
            <div className="empty-state">
              <CreditCard size={48} className="empty-state-icon" />
              <div className="empty-state-title">Chưa có thanh toán nào</div>
              <div className="empty-state-description">
                Danh sách thanh toán gần đây sẽ hiển thị tại đây.
              </div>
            </div>
          ) : (
            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th>Phương thức</th>
                    <th>Số tiền</th>
                    <th>Trạng thái</th>
                    <th>Khách hàng</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recent_payments.map((payment) => (
                    <tr key={payment.id}>
                      <td style={{ textTransform: 'capitalize' }}>
                        {payment.payment_method}
                      </td>
                      <td>{formatCurrency(payment.amount)}</td>
                      <td>
                        <span className={`badge ${getStatusColor(payment.status)}`}>
                          {getStatusLabel(payment.status)}
                        </span>
                      </td>
                      <td style={{ color: '#94a3b8' }}>{payment.user_email ?? '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
