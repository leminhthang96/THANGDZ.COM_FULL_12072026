'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import type { Guide } from '@/types/index';
import { api } from '@/lib/api';
import { useToast } from '@/contexts/ToastContext';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { ArrowLeft, Save, Trash2, Send } from 'lucide-react';
import MarkdownEditor from '@/components/shared/MarkdownEditor';

const LEVELS = [
  { value: 'beginner', label: 'Sơ cấp' },
  { value: 'intermediate', label: 'Trung cấp' },
  { value: 'advanced', label: 'Nâng cao' },
];

const STATUSES = [
  { value: 'draft', label: 'Nháp' },
  { value: 'published', label: 'Xuất bản' },
  { value: 'archived', label: 'Lưu trữ' },
];

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export default function EditGuidePage() {
  const params = useParams();
  const router = useRouter();
  const { showToast } = useToast();
  const guideId = Number(params.id);

  const [guide, setGuide] = useState<Guide | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: '',
    slug: '',
    summary: '',
    category: '',
    level: 'beginner' as 'beginner' | 'intermediate' | 'advanced',
    status: 'draft' as 'draft' | 'published' | 'archived',
    content: '',
    thumbnail_url: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const setField = (field: string, value: string) => {
    setForm((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === 'title') {
        updated.slug = generateSlug(value);
      }
      return updated;
    });
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const fetchGuide = useCallback(async () => {
    try {
      const data = await api.getGuide(guideId);
      setGuide(data);
      setForm({
        title: data.title ?? '',
        slug: data.slug ?? '',
        summary: data.summary ?? '',
        category: data.category ?? '',
        level: data.level ?? 'beginner',
        status: data.status ?? 'draft',
        content: data.content ?? '',
        thumbnail_url: data.thumbnail_url ?? '',
      });
    } catch {
      showToast('Không thể tải thông tin hướng dẫn', 'error');
    } finally {
      setLoading(false);
    }
  }, [guideId, showToast]);

  useEffect(() => {
    setLoading(true);
    fetchGuide();
  }, [fetchGuide]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!form.title.trim()) newErrors.title = 'Tiêu đề là bắt buộc';
    if (!form.slug.trim()) newErrors.slug = 'Slug là bắt buộc';
    if (!form.content.trim()) newErrors.content = 'Nội dung là bắt buộc';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;
    setSaving(true);
    try {
      const payload = {
        ...form,
        category: form.category || null,
        summary: form.summary || null,
        thumbnail_url: form.thumbnail_url || null,
      };
      await api.updateGuide(guideId, payload);
      showToast('Lưu hướng dẫn thành công', 'success');
      fetchGuide();
    } catch {
      showToast('Lưu hướng dẫn thất bại', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Xóa hướng dẫn "${form.title}"? Hành động này không thể hoàn tác.`)) return;
    try {
      await api.deleteGuide(guideId);
      showToast('Đã xóa hướng dẫn', 'success');
      router.push('/guides');
    } catch {
      showToast('Xóa hướng dẫn thất bại', 'error');
    }
  };

  const handlePublish = async () => {
    try {
      await api.publishGuide(guideId);
      showToast('Đã xuất bản hướng dẫn', 'success');
      fetchGuide();
    } catch {
      showToast('Xuất bản thất bại', 'error');
    }
  };

  const handleArchive = async () => {
    try {
      await api.archiveGuide(guideId);
      showToast('Đã lưu trữ hướng dẫn', 'success');
      fetchGuide();
    } catch {
      showToast('Lưu trữ thất bại', 'error');
    }
  };

  if (loading) return <LoadingSpinner />;

  if (!guide) {
    return (
      <div className="main-content">
        <button
          className="btn btn-ghost"
          onClick={() => router.push('/guides')}
          style={{ marginBottom: '1rem', padding: '0.5rem 0' }}
        >
          <ArrowLeft size={16} /> Quay lại danh sách
        </button>
        <div className="empty-state">
          <p>Không tìm thấy hướng dẫn</p>
        </div>
      </div>
    );
  }

  return (
    <div className="main-content">
      <button
        className="btn btn-ghost"
        onClick={() => router.push('/guides')}
        style={{ marginBottom: '1rem', padding: '0.5rem 0' }}
      >
        <ArrowLeft size={16} /> Quay lại danh sách
      </button>

      <div className="page-header" style={{ marginBottom: '1.5rem' }}>
        <div>
          <h1 className="page-title">Chỉnh sửa hướng dẫn</h1>
          <p className="page-description">Cập nhật nội dung hướng dẫn</p>
        </div>
        {/* Status action buttons */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {guide.status === 'draft' && (
            <button className="btn btn-secondary" onClick={handlePublish} disabled={saving}>
              <Send size={16} /> Xuất bản
            </button>
          )}
          {guide.status === 'published' && (
            <button className="btn btn-ghost" onClick={handleArchive} disabled={saving}>
              Lưu trữ
            </button>
          )}
        </div>
      </div>

      <div className="card">
        <div style={{ padding: '1.5rem' }}>
          {/* Title */}
          <div className="form-group">
            <label className="label">Tiêu đề <span style={{ color: 'var(--color-error)' }}>*</span></label>
            <input
              type="text"
              className={`input ${errors.title ? 'input-error' : ''}`}
              placeholder="Nhập tiêu đề hướng dẫn"
              value={form.title}
              onChange={(e) => setField('title', e.target.value)}
            />
            {errors.title && <p className="form-error">{errors.title}</p>}
          </div>

          {/* Slug */}
          <div className="form-group">
            <label className="label">Slug</label>
            <input
              type="text"
              className={`input ${errors.slug ? 'input-error' : ''}`}
              placeholder="slug-tu-dong-tao"
              value={form.slug}
              onChange={(e) => setField('slug', e.target.value)}
            />
            {errors.slug && <p className="form-error">{errors.slug}</p>}
            <p className="label-muted" style={{ marginTop: '0.25rem', fontSize: '0.8rem' }}>
              Đường dẫn: /guides/{form.slug || 'slug'}
            </p>
          </div>

          {/* Summary */}
          <div className="form-group">
            <label className="label">Tóm tắt</label>
            <textarea
              className="input"
              placeholder="Mô tả ngắn về nội dung hướng dẫn"
              rows={3}
              value={form.summary}
              onChange={(e) => setField('summary', e.target.value)}
              style={{ resize: 'vertical' }}
            />
          </div>

          {/* Category */}
          <div className="form-group">
            <label className="label">Danh mục</label>
            <input
              type="text"
              className="input"
              placeholder="VD: Lập trình, Thiết kế, Marketing"
              value={form.category}
              onChange={(e) => setField('category', e.target.value)}
            />
          </div>

          {/* Level & Status row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="label">Cấp độ</label>
              <select
                className="select"
                value={form.level}
                onChange={(e) => setField('level', e.target.value)}
                style={{ width: '100%' }}
              >
                {LEVELS.map((l) => (
                  <option key={l.value} value={l.value}>{l.label}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="label">Trạng thái</label>
              <select
                className="select"
                value={form.status}
                onChange={(e) => setField('status', e.target.value)}
                style={{ width: '100%' }}
              >
                {STATUSES.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Thumbnail URL */}
          <div className="form-group">
            <label className="label">URL hình thumbnail</label>
            <input
              type="url"
              className="input"
              placeholder="https://example.com/image.jpg"
              value={form.thumbnail_url}
              onChange={(e) => setField('thumbnail_url', e.target.value)}
            />
          </div>

          {/* Content */}
          <div className="form-group">
            <label className="label">Nội dung <span style={{ color: 'var(--color-error)' }}>*</span></label>
            <MarkdownEditor
              id="content"
              name="content"
              placeholder="Nhập nội dung hướng dẫn (Markdown được hỗ trợ)"
              rows={16}
              value={form.content}
              onChange={(content) => setField('content', content)}
            />
            {errors.content && <p className="form-error">{errors.content}</p>}
          </div>

          {/* Actions */}
          <div className="divider" style={{ margin: '1.5rem 0' }} />
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                className="btn btn-primary"
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? <LoadingSpinner size="sm" /> : <Save size={16} />}
                Lưu thay đổi
              </button>
            </div>
            <button
              className="btn btn-ghost"
              onClick={handleDelete}
              style={{ color: 'var(--color-error)' }}
            >
              <Trash2 size={16} /> Xóa hướng dẫn
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
