'use client';

import { useState, useEffect } from 'react';
import { useToast } from '@/contexts/ToastContext';
import { Settings, ChevronDown, Globe, Mail, Phone, Database, Bell, Shield, RefreshCw, AlertCircle, Terminal, Play, CheckCircle } from 'lucide-react';
import { api } from '@/lib/api';

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

  // States for system update
  const [checking, setChecking] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [updateInfo, setUpdateInfo] = useState<{
    current_version: string;
    latest_version: string;
    has_update: boolean;
    changelog: string;
    update_url: string;
  } | null>(null);
  const [logs, setLogs] = useState<string>('');

  // Poll logs function
  const startPollingLogs = () => {
    setUpdating(true);
    const interval = setInterval(async () => {
      try {
        const res = await api.getUpdateStatus();
        if (res && res.success) {
          setLogs(res.logs || '');
          if (!res.is_updating) {
            clearInterval(interval);
            setUpdating(false);
            if (res.update_success) {
              showToast('Cập nhật hoàn tất thành công! Hệ thống sẽ tự động làm mới sau 5 giây.', 'success');
              setTimeout(() => {
                window.location.reload();
              }, 5000);
            } else if (res.update_failed) {
              showToast('Cập nhật thất bại! Vui lòng kiểm tra log bên dưới để biết chi tiết lỗi.', 'error');
            } else {
              showToast('Quá trình cập nhật đã kết thúc. Kiểm tra log để xem chi tiết.', 'info');
            }
          }
        }
      } catch (err: any) {
        console.error('Error polling update status:', err);
      }
    }, 2500);
    return interval;
  };

  // Check update status on mount
  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    const initCheck = async () => {
      try {
        const statusRes = await api.getUpdateStatus();
        if (statusRes && statusRes.success) {
          if (statusRes.is_updating) {
            setLogs(statusRes.logs || '');
            intervalId = startPollingLogs();
          } else {
            const checkRes = await api.checkUpdate();
            if (checkRes && checkRes.success) {
              setUpdateInfo(checkRes);
            }
          }
        }
      } catch (err: any) {
        console.error('Initial system update check failed:', err);
      }
    };
    initCheck();
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  const handleCheckUpdate = async () => {
    setChecking(true);
    try {
      const res = await api.checkUpdate();
      if (res && res.success) {
        setUpdateInfo(res);
        if (res.has_update) {
          showToast(`Phát hiện phiên bản mới: ${res.latest_version}`, 'info');
        } else {
          showToast('Hệ thống của bạn đang chạy phiên bản mới nhất.', 'success');
        }
      }
    } catch (err: any) {
      showToast(err.message || 'Lỗi khi kiểm tra phiên bản mới', 'error');
    } finally {
      setChecking(false);
    }
  };

  const handleStartUpdate = async () => {
    if (!window.confirm('Bạn có chắc chắn muốn cập nhật hệ thống? Cả backend và frontend sẽ được rebuild lại tự động trên VPS.')) {
      return;
    }
    setUpdating(true);
    setLogs('Bắt đầu gửi lệnh cập nhật lên server...\n');
    try {
      const res = await api.runUpdate();
      if (res && res.success) {
        showToast('Kích hoạt cập nhật thành công! Đang theo dõi tiến trình...', 'success');
        startPollingLogs();
      }
    } catch (err: any) {
      showToast(err.message || 'Lỗi khi bắt đầu cập nhật', 'error');
      setUpdating(false);
    }
  };

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

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .spin-icon {
          animation: spin 1.5s linear infinite;
        }
      `}</style>

      <SettingsSection
        title="Cập nhật hệ thống"
        description="Kiểm tra và cập nhật mã nguồn dự án"
        icon={<RefreshCw size={18} className={checking || updating ? 'spin-icon' : ''} style={{ color: 'var(--accent-cyan)' }} />}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ fontSize: '0.9375rem', fontWeight: 600 }}>
                Phiên bản hiện tại: <span style={{ color: 'var(--accent-cyan)' }}>{updateInfo?.current_version || '1.0.0'}</span>
              </div>
              {updateInfo?.has_update && (
                <div style={{ fontSize: '0.875rem', color: 'var(--accent-cyan)', fontWeight: 500, marginTop: '4px' }}>
                  Phát hiện phiên bản mới: {updateInfo.latest_version}
                </div>
              )}
            </div>
            
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button 
                className="btn btn-secondary" 
                onClick={handleCheckUpdate} 
                disabled={checking || updating}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', height: '38px', cursor: (checking || updating) ? 'not-allowed' : 'pointer' }}
              >
                <RefreshCw size={14} className={checking ? 'spin-icon' : ''} />
                {checking ? 'Đang kiểm tra...' : 'Kiểm tra cập nhật'}
              </button>
              
              {updateInfo?.has_update && !updating && (
                <button 
                  className="btn btn-primary" 
                  onClick={handleStartUpdate} 
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', height: '38px', background: 'linear-gradient(135deg, var(--accent-cyan) 0%, #0891b2 100%)' }}
                >
                  <Play size={14} />
                  Cập nhật ngay
                </button>
              )}
            </div>
          </div>

          {updateInfo?.has_update && (
            <div style={{ padding: '1rem', backgroundColor: 'rgba(6, 182, 212, 0.05)', border: '1px solid rgba(6, 182, 212, 0.2)', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--accent-cyan)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertCircle size={16} />
                Nội dung cập nhật (Phiên bản {updateInfo.latest_version})
              </div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-primary)', whiteSpace: 'pre-wrap', lineHeight: 1.5 }}>
                {updateInfo.changelog || 'Không có mô tả chi tiết.'}
              </div>
            </div>
          )}

          {(updating || logs) && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ fontSize: '0.875rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
                <Terminal size={16} />
                Tiến trình cập nhật từ Server
                {updating && <span style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', animation: 'pulse 1.5s infinite' }}> (Đang chạy...)</span>}
              </div>
              <pre style={{ 
                margin: 0, 
                padding: '1rem', 
                backgroundColor: '#0f172a', 
                color: '#38bdf8', 
                borderRadius: '8px', 
                fontFamily: 'monospace', 
                fontSize: '0.75rem', 
                maxHeight: '300px', 
                overflowY: 'auto',
                whiteSpace: 'pre-wrap',
                lineHeight: 1.6,
                border: '1px solid #334155',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5)'
              }}>
                {logs || 'Đang chuẩn bị tải cập nhật...'}
              </pre>
            </div>
          )}
        </div>
      </SettingsSection>
    </div>
  );
}
