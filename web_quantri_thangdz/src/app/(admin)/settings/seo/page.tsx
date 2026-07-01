'use client';

import { useState } from 'react';
import { useToast } from '@/contexts/ToastContext';
import { Search, Save, ExternalLink, Info } from 'lucide-react';

export default function SEOSettingsPage() {
  const { showToast } = useToast();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    metaTitle: 'ThangDz - Dịch vụ & Giải pháp số',
    metaDescription:
      'ThangDz cung cấp các dịch vụ và giải pháp số chất lượng cao, giúp doanh nghiệp chuyển đổi số hiệu quả.',
    ogImageUrl: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 300));
    setSaving(false);
    showToast('Đã lưu cài đặt SEO', 'success');
  };

  return (
    <div className="main-content">
      {/* Page Header */}
      <div className="page-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 className="page-title">Cài đặt SEO</h1>
          <p className="page-description">Tối ưu tìm kiếm và chia sẻ mạng xã hội</p>
        </div>
        <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
          {saving ? (
            <span className="spinner spinner-sm" />
          ) : (
            <Save size={16} />
          )}
          Lưu thay đổi
        </button>
      </div>

      {/* SEO Form */}
      <div className="card">
        <div className="card-header">
          <div>
            <h2 className="card-title">Cấu hình SEO</h2>
            <p className="card-description">
              Các thẻ meta giúp website tối ưu trên công cụ tìm kiếm
            </p>
          </div>
          <Search size={20} style={{ color: 'var(--accent-cyan)' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Meta Title */}
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="label" htmlFor="metaTitle">
              Meta Title
              <span
                style={{
                  marginLeft: '0.5rem',
                  fontSize: '0.75rem',
                  fontWeight: 400,
                  color: 'var(--text-muted)',
                }}
              >
                (tiêu đề trên Google)
              </span>
            </label>
            <input
              id="metaTitle"
              type="text"
              name="metaTitle"
              className="input"
              value={formData.metaTitle}
              onChange={handleChange}
              placeholder="Tiêu đề website trên Google"
              maxLength={60}
            />
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '0.375rem',
              }}
            >
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Nên dùng 50-60 ký tự
              </span>
              <span
                style={{
                  fontSize: '0.75rem',
                  color: formData.metaTitle.length > 60 ? 'var(--error)' : 'var(--text-muted)',
                }}
              >
                {formData.metaTitle.length}/60
              </span>
            </div>
          </div>

          {/* Meta Description */}
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="label" htmlFor="metaDescription">
              Meta Description
              <span
                style={{
                  marginLeft: '0.5rem',
                  fontSize: '0.75rem',
                  fontWeight: 400,
                  color: 'var(--text-muted)',
                }}
              >
                (mô tả trên Google)
              </span>
            </label>
            <textarea
              id="metaDescription"
              name="metaDescription"
              className="input"
              value={formData.metaDescription}
              onChange={handleChange}
              placeholder="Mô tả ngắn gọn về website"
              rows={3}
              maxLength={160}
              style={{ resize: 'vertical', minHeight: '80px' }}
            />
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '0.375rem',
              }}
            >
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Nên dùng 150-160 ký tự
              </span>
              <span
                style={{
                  fontSize: '0.75rem',
                  color: formData.metaDescription.length > 160 ? 'var(--error)' : 'var(--text-muted)',
                }}
              >
                {formData.metaDescription.length}/160
              </span>
            </div>
          </div>

          {/* OG Image */}
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="label" htmlFor="ogImageUrl">
              OG Image URL
              <span
                style={{
                  marginLeft: '0.5rem',
                  fontSize: '0.75rem',
                  fontWeight: 400,
                  color: 'var(--text-muted)',
                }}
              >
                (ảnh chia sẻ Facebook/Zalo)
              </span>
            </label>
            <input
              id="ogImageUrl"
              type="url"
              name="ogImageUrl"
              className="input"
              value={formData.ogImageUrl}
              onChange={handleChange}
              placeholder="https://example.com/og-image.jpg"
            />
          </div>

          {/* OG Image Preview */}
          {formData.ogImageUrl && (
            <div>
              <label className="label">Preview OG Image</label>
              <div
                style={{
                  borderRadius: '8px',
                  overflow: 'hidden',
                  border: '1px solid var(--border)',
                  maxWidth: '400px',
                }}
              >
                <img
                  src={formData.ogImageUrl}
                  alt="OG Preview"
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    backgroundColor: 'var(--bg-primary)',
                    display: 'block',
                  }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                <div
                  style={{
                    padding: '0.75rem',
                    backgroundColor: 'var(--bg-card)',
                  }}
                >
                  <div
                    style={{
                      fontSize: '0.8125rem',
                      color: 'var(--text-muted)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      marginBottom: '0.25rem',
                    }}
                  >
                    thangdz.com
                  </div>
                  <div
                    style={{
                      fontSize: '0.9375rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {formData.metaTitle}
                  </div>
                  <div
                    style={{
                      fontSize: '0.8125rem',
                      color: 'var(--text-muted)',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      marginTop: '0.125rem',
                    }}
                  >
                    {formData.metaDescription}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* SEO Preview */}
      <div className="card" style={{ marginTop: '1.5rem' }}>
        <div className="card-header">
          <div>
            <h2 className="card-title">Google Search Preview</h2>
            <p className="card-description">Xem trước cách website hiển thị trên Google</p>
          </div>
          <ExternalLink size={18} style={{ color: 'var(--accent-cyan)' }} />
        </div>

        <div
          style={{
            padding: '1rem',
            backgroundColor: 'var(--bg-primary)',
            borderRadius: '8px',
            border: '1px solid var(--border)',
          }}
        >
          <div
            style={{
              fontSize: '1.125rem',
              color: '#1a0dab',
              cursor: 'pointer',
              textDecoration: 'underline',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {formData.metaTitle}
          </div>
          <div
            style={{
              fontSize: '0.875rem',
              color: '#006621',
              marginTop: '0.125rem',
            }}
          >
            https://thangdz.com
          </div>
          <div
            style={{
              fontSize: '0.8125rem',
              color: '#545454',
              marginTop: '0.375rem',
              lineHeight: 1.4,
            }}
          >
            {formData.metaDescription}
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div
        className="alert alert-info"
        style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}
      >
        <Info size={18} style={{ flexShrink: 0, marginTop: '1px' }} />
        <span style={{ fontSize: '0.875rem', lineHeight: 1.6 }}>
          Các thẻ meta này giúp website tối ưu hơn trên công cụ tìm kiếm. Thay đổi sẽ có hiệu lực sau khi lưu.
        </span>
      </div>
    </div>
  );
}
