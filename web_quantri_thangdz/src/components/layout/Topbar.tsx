'use client';

import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Bell, ChevronDown, LogOut, User } from 'lucide-react';
import { AUTH_EMAIL_KEY } from '@/lib/auth';

export default function Topbar() {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const email = typeof window !== 'undefined' ? localStorage.getItem(AUTH_EMAIL_KEY) || user?.email || '' : '';

  return (
    <header className="topbar">
      <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
        Xin chào, <span style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>{email.split('@')[0]}</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          style={{
            position: 'relative',
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          title="Thông báo"
        >
          <Bell size={20} />
          <span style={{
            position: 'absolute',
            top: 4,
            right: 4,
            width: 8,
            height: 8,
            backgroundColor: 'var(--error)',
            borderRadius: '50%',
          }} />
        </button>

        <div className="dropdown" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'none',
              border: '1px solid var(--border)',
              borderRadius: 8,
              padding: '6px 12px',
              cursor: 'pointer',
              color: 'var(--text-primary)',
              fontSize: '0.875rem',
            }}
          >
            <div className="avatar avatar-sm">{email[0]?.toUpperCase()}</div>
            <span style={{ maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {email}
            </span>
            <ChevronDown size={14} style={{ color: 'var(--text-muted)' }} />
          </button>

          <div className={`dropdown-menu ${dropdownOpen ? 'open' : ''}`}>
            <button className="dropdown-item">
              <User size={16} />
              <span>Thông tin tài khoản</span>
            </button>
            <div className="dropdown-divider" />
            <button
              className="dropdown-item danger"
              onClick={logout}
            >
              <LogOut size={16} />
              <span>Đăng xuất</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
