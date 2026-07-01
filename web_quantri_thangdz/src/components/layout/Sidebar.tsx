'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Users, FileText, BookOpen, Layers,
  ShoppingCart, CreditCard, Image, Settings, BarChart3,
  Shield, ScrollText, ChevronRight
} from 'lucide-react';

const menuGroups = [
  {
    title: 'Tổng quan',
    items: [
      { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    ],
  },
  {
    title: 'Quản lý nội dung',
    items: [
      { label: 'Bài viết', href: '/posts', icon: FileText },
      { label: 'Hướng dẫn', href: '/guides', icon: BookOpen },
      { label: 'Dịch vụ', href: '/services', icon: Layers },
    ],
  },
  {
    title: 'Kinh doanh',
    items: [
      { label: 'Đơn hàng', href: '/orders', icon: ShoppingCart },
      { label: 'Thanh toán', href: '/payments', icon: CreditCard },
    ],
  },
  {
    title: 'Hệ thống',
    items: [
      { label: 'Người dùng', href: '/users', icon: Users },
      { label: 'Media', href: '/media', icon: Image },
      { label: 'Cài đặt', href: '/settings', icon: Settings },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-indigo))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Shield size={20} color="white" />
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--text-primary)' }}>ThangDz</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Admin Panel</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {menuGroups.map((group) => (
          <div key={group.title} className="sidebar-section">
            <div className="sidebar-section-title">{group.title}</div>
            {group.items.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`sidebar-item ${active ? 'active' : ''}`}
                >
                  <Icon size={18} className="sidebar-item-icon" />
                  <span style={{ flex: 1 }}>{item.label}</span>
                  {active && <ChevronRight size={14} style={{ opacity: 0.5 }} />}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center' }}>
          ThangDz Admin v1.0
        </div>
      </div>
    </aside>
  );
}
