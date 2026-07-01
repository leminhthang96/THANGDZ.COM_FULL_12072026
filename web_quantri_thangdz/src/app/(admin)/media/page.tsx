'use client';

import { useState } from 'react';
import { useToast } from '@/contexts/ToastContext';
import { Image, Upload, Info } from 'lucide-react';

export default function MediaPage() {
  const { showToast } = useToast();
  const [uploading, setUploading] = useState(false);

  const handleUpload = () => {
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      showToast('Tính năng sẽ sớm có', 'info');
    }, 300);
  };

  const placeholderCards = Array.from({ length: 6 }, (_, i) => i);

  return (
    <div className="main-content">
      {/* Page Header */}
      <div className="page-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 className="page-title">Thư viện Media</h1>
          <p className="page-description">Quản lý hình ảnh và tệp tin tải lên</p>
        </div>
        <button
          className="btn btn-primary"
          onClick={handleUpload}
          disabled={uploading}
        >
          {uploading ? (
            <span className="spinner spinner-sm" />
          ) : (
            <Upload size={16} />
          )}
          Upload file
        </button>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-3" style={{ marginBottom: '1.5rem' }}>
        {placeholderCards.map((index) => (
          <div
            key={index}
            className="card"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '180px',
              background: 'linear-gradient(135deg, rgba(51, 65, 85, 0.5), rgba(30, 41, 59, 0.5))',
              borderStyle: 'dashed',
              gap: '0.75rem',
              cursor: 'default',
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: 'rgba(51, 65, 85, 0.8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Image size={24} style={{ color: 'var(--text-muted)', opacity: 0.5 }} />
            </div>
            <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              Chưa có file
            </span>
          </div>
        ))}
      </div>

      {/* Info Banner */}
      <div className="alert alert-info" style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
        <Info size={18} style={{ flexShrink: 0, marginTop: '1px' }} />
        <span style={{ fontSize: '0.875rem', lineHeight: 1.6 }}>
          Tính năng upload media đang được phát triển. Các file ảnh hiện được nhập trực tiếp qua URL thumbnail.
        </span>
      </div>
    </div>
  );
}
