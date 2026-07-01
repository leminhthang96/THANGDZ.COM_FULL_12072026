'use client';

import { useState } from 'react';
import { useToast } from '@/contexts/ToastContext';
import { Settings, ChevronDown, Globe, Mail, Phone, Database, Bell, Shield } from 'lucide-react';

interface SectionProps {
  title: string;
  description?: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function SettingsSection({ title, description, icon, children, defaultOpen = false }: SectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="card" style={{ marginBottom: '1rem', padding: 0, overflow: 'hidden' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '0.875rem',
          padding: '1rem 1.5rem',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: 'var(--text-primary)',
          textAlign: 'left',
          transition: 'background-color 0.15s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-hover)')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
      >
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            background: 'rgba(6, 182, 212, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          {icon}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '0.9375rem', fontWeight: 600 }}>{title}</div>
          {description && (
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              {description}
            </div>
          )}
        </div>
        <ChevronDown
          size={18}
          style={{
            color: 'var(--text-muted)',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease',
            flexShrink: 0,
          }}
        />
      </button>

      {isOpen && (
        <div
          style={{
            padding: '0 1.5rem 1.5rem',
            borderTop: '1px solid var(--border)',
            paddingTop: '1.25rem',
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}

export default function SettingsPage() {
  const { showToast } = useToast();

  const handleSave = () => {
    showToast('Tính năng đang phát triển', 'info');
  };

  return (
    <div className="main-content">
      {/* Page Header */}
      <div className="page-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 className="page-title">Cài đặt hệ thống</h1>
          <p className="page-description">Quản lý cấu hình website</p>
        </div>
        <button className="btn btn-primary" onClick={handleSave}>
          <Settings size={16} />
          Lưu thay đổi
        </button>
      </div>

      {/* Settings Sections */}
      <SettingsSection
        title="Thông tin website"
        description="Cấu hình thông tin cơ bản của trang"
        icon={<Globe size={18} style={{ color: 'var(--accent-cyan)' }} />}
        defaultOpen
      >
        <div className="grid grid-cols-2">
          <div className="form-group">
            <label className="label">Tên website</label>
            <input type="text" className="input" placeholder="ThangDz" />
          </div>
          <div className="form-group">
            <label className="label">Logo URL</label>
            <input type="text" className="input" placeholder="https://example.com/logo.png" />
          </div>
          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label className="label">Slogan</label>
            <input type="text" className="input" placeholder="Slogan cho website của bạn" />
          </div>
        </div>
      </SettingsSection>

      <SettingsSection
        title="Liên hệ"
        description="Thông tin liên hệ của website"
        icon={<Mail size={18} style={{ color: 'var(--accent-cyan)' }} />}
      >
        <div className="grid grid-cols-2">
          <div className="form-group">
            <label className="label">Email liên hệ</label>
            <input type="email" className="input" placeholder="contact@thangdz.com" />
          </div>
          <div className="form-group">
            <label className="label">Số điện thoại</label>
            <input type="tel" className="input" placeholder="0901 234 567" />
          </div>
        </div>
      </SettingsSection>

      <SettingsSection
        title="Thông báo"
        description="Cấu hình hệ thống thông báo"
        icon={<Bell size={18} style={{ color: 'var(--accent-cyan)' }} />}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '0.875rem', fontWeight: 500 }}>Thông báo đơn hàng mới</div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                Gửi email khi có đơn hàng mới
              </div>
            </div>
            <label style={{ position: 'relative', display: 'inline-block', width: '44px', height: '24px' }}>
              <input
                type="checkbox"
                defaultChecked
                style={{ opacity: 0, width: 0, height: 0 }}
              />
              <span
                style={{
                  position: 'absolute',
                  cursor: 'pointer',
                  inset: 0,
                  backgroundColor: 'var(--accent-cyan)',
                  borderRadius: '9999px',
                  transition: 'background-color 0.2s',
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    content: '',
                    height: '18px',
                    width: '18px',
                    left: '3px',
                    bottom: '3px',
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    transition: 'transform 0.2s',
                  }}
                />
              </span>
            </label>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '0.875rem', fontWeight: 500 }}>Thông báo thanh toán</div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                Thông báo khi có thanh toán mới
              </div>
            </div>
            <label style={{ position: 'relative', display: 'inline-block', width: '44px', height: '24px' }}>
              <input
                type="checkbox"
                defaultChecked
                style={{ opacity: 0, width: 0, height: 0 }}
              />
              <span
                style={{
                  position: 'absolute',
                  cursor: 'pointer',
                  inset: 0,
                  backgroundColor: 'var(--accent-cyan)',
                  borderRadius: '9999px',
                  transition: 'background-color 0.2s',
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    content: '',
                    height: '18px',
                    width: '18px',
                    left: '3px',
                    bottom: '3px',
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    transition: 'transform 0.2s',
                  }}
                />
              </span>
            </label>
          </div>
        </div>
      </SettingsSection>

      <SettingsSection
        title="Bảo mật"
        description="Cài đặt bảo mật nâng cao"
        icon={<Shield size={18} style={{ color: 'var(--accent-cyan)' }} />}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '1rem',
            backgroundColor: 'rgba(51, 65, 85, 0.3)',
            borderRadius: '8px',
            border: '1px dashed var(--border)',
          }}
        >
          <Database size={20} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
          <div>
            <div style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-muted)' }}>
              Coming soon
            </div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', opacity: 0.7 }}>
              Tính năng bảo mật nâng cao đang được phát triển
            </div>
          </div>
        </div>
      </SettingsSection>
    </div>
  );
}
