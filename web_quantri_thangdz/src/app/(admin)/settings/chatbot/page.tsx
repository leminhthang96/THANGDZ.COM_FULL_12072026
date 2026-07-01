'use client';

import { useState } from 'react';
import { useToast } from '@/contexts/ToastContext';
import { MessageSquare, Save, Webhook, Info, ToggleLeft, ToggleRight } from 'lucide-react';

export default function ChatbotSettingsPage() {
  const { showToast } = useToast();
  const [saving, setSaving] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [formData, setFormData] = useState({
    webhookUrl: '',
    n8nWebhookUrl: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 300));
    setSaving(false);
    showToast('Đã lưu cấu hình Chatbot', 'success');
  };

  return (
    <div className="main-content">
      {/* Page Header */}
      <div className="page-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 className="page-title">Cấu hình Chatbot</h1>
          <p className="page-description">Kết nối chatbot AI với website</p>
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

      {/* Enable Toggle */}
      <div className="card" style={{ marginBottom: '1.5rem', padding: '1.25rem 1.5rem' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '10px',
                background: enabled
                  ? 'rgba(6, 182, 212, 0.15)'
                  : 'rgba(51, 65, 85, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background-color 0.2s ease',
              }}
            >
              <MessageSquare
                size={22}
                style={{
                  color: enabled ? 'var(--accent-cyan)' : 'var(--text-muted)',
                  transition: 'color 0.2s ease',
                }}
              />
            </div>
            <div>
              <div style={{ fontSize: '1rem', fontWeight: 600 }}>Bật Chatbot</div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                Kích hoạt chatbot hỗ trợ khách hàng trên website
              </div>
            </div>
          </div>
          <button
            onClick={() => setEnabled(!enabled)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
            title={enabled ? 'Tắt chatbot' : 'Bật chatbot'}
          >
            <span
              style={{
                fontSize: '0.8125rem',
                fontWeight: 500,
                color: enabled ? 'var(--accent-cyan)' : 'var(--text-muted)',
              }}
            >
              {enabled ? 'Bật' : 'Tắt'}
            </span>
            {enabled ? (
              <ToggleRight size={40} style={{ color: 'var(--accent-cyan)' }} />
            ) : (
              <ToggleLeft size={40} style={{ color: 'var(--text-muted)' }} />
            )}
          </button>
        </div>
      </div>

      {/* Webhook Configuration */}
      <div className="card">
        <div className="card-header">
          <div>
            <h2 className="card-title">Webhook Configuration</h2>
            <p className="card-description">
              Cấu hình endpoint để chatbot kết nối với backend
            </p>
          </div>
          <Webhook size={20} style={{ color: 'var(--accent-cyan)' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Webhook URL */}
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="label" htmlFor="webhookUrl">
              URL Webhook
              <span
                style={{
                  marginLeft: '0.5rem',
                  fontSize: '0.75rem',
                  fontWeight: 400,
                  color: 'var(--text-muted)',
                }}
              >
                (endpoint nhận tin nhắn)
              </span>
            </label>
            <input
              id="webhookUrl"
              type="url"
              name="webhookUrl"
              className="input"
              value={formData.webhookUrl}
              onChange={handleChange}
              placeholder="https://api.example.com/webhook/chatbot"
              disabled={!enabled}
              style={{ fontFamily: 'monospace', fontSize: '0.8125rem' }}
            />
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.375rem' }}>
              Endpoint nhận và xử lý tin nhắn từ chatbot
            </div>
          </div>

          {/* n8n Webhook URL */}
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="label" htmlFor="n8nWebhookUrl">
              n8n Webhook URL
              <span
                style={{
                  marginLeft: '0.5rem',
                  fontSize: '0.75rem',
                  fontWeight: 400,
                  color: 'var(--text-muted)',
                }}
              >
                (automation workflow)
              </span>
            </label>
            <input
              id="n8nWebhookUrl"
              type="url"
              name="n8nWebhookUrl"
              className="input"
              value={formData.n8nWebhookUrl}
              onChange={handleChange}
              placeholder="https://your-n8n.app/webhook/chatbot-ai"
              disabled={!enabled}
              style={{ fontFamily: 'monospace', fontSize: '0.8125rem' }}
            />
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.375rem' }}>
              URL webhook n8n để xử lý logic AI chatbot qua automation
            </div>
          </div>

          {/* Connection Status */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.875rem 1rem',
              backgroundColor: enabled ? 'rgba(51, 65, 85, 0.3)' : 'rgba(51, 65, 85, 0.15)',
              borderRadius: '8px',
              border: '1px solid var(--border)',
            }}
          >
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: enabled ? 'var(--text-muted)' : 'var(--border)',
                flexShrink: 0,
              }}
            />
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
              {enabled
                ? formData.webhookUrl || formData.n8nWebhookUrl
                  ? 'Webhook đã được cấu hình. Kết nối sẽ được kiểm tra khi lưu.'
                  : 'Chưa có webhook nào được cấu hình.'
                : 'Chatbot hiện đang tắt. Bật chatbot để cấu hình webhook.'}
            </span>
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
          Tính năng chatbot AI đang trong giai đoạn phát triển. Kết nối với n8n workflow để tự động hóa
          phản hồi khách hàng thông qua các mô hình AI như Claude, GPT, hoặc Gemini.
        </span>
      </div>
    </div>
  );
}
