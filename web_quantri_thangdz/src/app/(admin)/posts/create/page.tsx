'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { useToast } from '@/contexts/ToastContext';
import { ArrowLeft, Save, Send } from 'lucide-react';
import MarkdownEditor from '@/components/shared/MarkdownEditor';

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

export default function CreatePostPage() {
  const router = useRouter();
  const { showToast } = useToast();

  const [form, setForm] = useState({
    title: '',
    slug: '',
    summary: '',
    category: '',
    status: 'draft' as 'draft' | 'published',
    content: '',
    thumbnail_url: '',
  });
  const [saving, setSaving] = useState(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const slug = generateSlug(title);
    setForm((prev) => ({ ...prev, title, slug }));
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, slug: generateSlug(e.target.value) }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (status: 'draft' | 'published') => {
    setSaving(true);
    try {
      const payload = { ...form, status };
      await api.createPost(payload);
      showToast(status === 'published' ? 'Bài viết đã được xuất bản' : 'Bài viết đã được lưu', 'success');
      router.push('/posts');
    } catch {
      showToast('Tạo bài viết thất bại', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="main-content">
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button className="btn btn-ghost btn-sm" onClick={() => router.back()}>
            <ArrowLeft size={16} />
          </button>
          <div>
            <h1 className="page-title">Tạo bài viết</h1>
            <p className="page-description">Viết bài viết mới</p>
          </div>
        </div>
      </div>

      <div className="card">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '1.5rem' }}>
          {/* Title */}
          <div className="form-group">
            <label className="label" htmlFor="title">Tiêu đề</label>
            <input
              id="title"
              type="text"
              name="title"
              className="input"
              placeholder="Nhập tiêu đề bài viết..."
              value={form.title}
              onChange={handleTitleChange}
            />
          </div>

          {/* Slug */}
          <div className="form-group">
            <label className="label" htmlFor="slug">Slug</label>
            <input
              id="slug"
              type="text"
              name="slug"
              className="input"
              placeholder="slug-bai-viet"
              value={form.slug}
              onChange={handleSlugChange}
            />
          </div>

          {/* Summary */}
          <div className="form-group">
            <label className="label" htmlFor="summary">Tóm tắt</label>
            <textarea
              id="summary"
              name="summary"
              className="input"
              rows={3}
              placeholder="Mô tả ngắn về bài viết..."
              value={form.summary}
              onChange={handleChange}
              style={{ resize: 'vertical' }}
            />
          </div>

          {/* Category & Status */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="form-group">
              <label className="label" htmlFor="category">Danh mục</label>
              <input
                id="category"
                type="text"
                name="category"
                className="input"
                placeholder="VD: Tin tức, Công nghệ..."
                value={form.category}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="label" htmlFor="status">Trạng thái mặc định</label>
              <select
                id="status"
                name="status"
                className="select"
                value={form.status}
                onChange={handleChange}
              >
                <option value="draft">Nháp</option>
                <option value="published">Đã xuất bản</option>
              </select>
            </div>
          </div>

          {/* Thumbnail URL */}
          <div className="form-group">
            <label className="label" htmlFor="thumbnail_url">Ảnh thumbnail</label>
            <input
              id="thumbnail_url"
              type="text"
              name="thumbnail_url"
              className="input"
              placeholder="https://..."
              value={form.thumbnail_url}
              onChange={handleChange}
            />
            <p className="label-muted" style={{ marginTop: '0.5rem', fontSize: '0.8125rem' }}>
              Image direct URL, for example: https://iili.io/C7aipyb.jpg
            </p>
          </div>

          {/* Content */}
          <div className="form-group">
            <label className="label" htmlFor="content">Nội dung</label>
            <MarkdownEditor
              id="content"
              name="content"
              rows={16}
              placeholder="Nội dung bài viết (hỗ trợ Markdown)..."
              value={form.content}
              onChange={(content) => setForm((prev) => ({ ...prev, content }))}
            />
            <p className="label-muted" style={{ marginTop: '0.5rem', fontSize: '0.8125rem' }}>
              To show an image inside the post, put the image URL on its own line or use Markdown: ![alt](https://...)
            </p>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', paddingTop: '0.5rem' }}>
            <button
              className="btn btn-secondary"
              onClick={() => handleSubmit('draft')}
              disabled={saving || !form.title.trim()}
            >
              <Save size={16} />
              {saving ? 'Đang lưu...' : 'Lưu nháp'}
            </button>
            <button
              className="btn btn-primary"
              onClick={() => handleSubmit('published')}
              disabled={saving || !form.title.trim()}
            >
              <Send size={16} />
              {saving ? 'Đang xuất bản...' : 'Xuất bản'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
