'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import type { Post } from '@/types/index';
import { api } from '@/lib/api';
import { useToast } from '@/contexts/ToastContext';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { ArrowLeft, Save, Trash2, Globe, Archive } from 'lucide-react';
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

export default function EditPostPage() {
  const params = useParams();
  const router = useRouter();
  const { showToast } = useToast();
  const id = Number(params.id);

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: '',
    slug: '',
    summary: '',
    category: '',
    status: 'draft' as 'draft' | 'published' | 'archived',
    content: '',
    thumbnail_url: '',
  });

  useEffect(() => {
    if (isNaN(id)) {
      showToast('ID bài viết không hợp lệ', 'error');
      router.push('/posts');
      return;
    }

    api.getPost(id)
      .then((res: any) => {
        const p: Post = res.data ?? res;
        setPost(p);
        setForm({
          title: p.title ?? '',
          slug: p.slug ?? '',
          summary: p.summary ?? '',
          category: p.category ?? '',
          status: p.status ?? 'draft',
          content: p.content ?? '',
          thumbnail_url: p.thumbnail_url ?? '',
        });
      })
      .catch(() => {
        showToast('Không thể tải bài viết', 'error');
        router.push('/posts');
      })
      .finally(() => setLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setForm((prev) => ({ ...prev, title, slug: generateSlug(title) }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.updatePost(id, form);
      showToast('Đã lưu thay đổi', 'success');
      // Refresh post data
      const res: any = await api.getPost(id);
      const p: Post = res.data ?? res;
      setPost(p);
      setForm({
        title: p.title ?? '',
        slug: p.slug ?? '',
        summary: p.summary ?? '',
        category: p.category ?? '',
        status: p.status ?? 'draft',
        content: p.content ?? '',
        thumbnail_url: p.thumbnail_url ?? '',
      });
    } catch {
      showToast('Lưu thay đổi thất bại', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Bạn có chắc muốn xóa bài viết này? Hành động này không thể hoàn tác.')) return;
    try {
      await api.deletePost(id);
      showToast('Đã xóa bài viết', 'success');
      router.push('/posts');
    } catch {
      showToast('Xóa bài viết thất bại', 'error');
    }
  };

  const handlePublish = async () => {
    try {
      await api.publishPost(id);
      showToast('Bài viết đã được xuất bản', 'success');
      const res: any = await api.getPost(id);
      const p: Post = res.data ?? res;
      setPost(p);
      setForm((prev) => ({ ...prev, status: p.status }));
    } catch {
      showToast('Xuất bản thất bại', 'error');
    }
  };

  const handleArchive = async () => {
    try {
      await api.archivePost(id);
      showToast('Bài viết đã được lưu trữ', 'success');
      const res: any = await api.getPost(id);
      const p: Post = res.data ?? res;
      setPost(p);
      setForm((prev) => ({ ...prev, status: p.status }));
    } catch {
      showToast('Lưu trữ thất bại', 'error');
    }
  };

  if (loading) {
    return (
      <div className="main-content">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="main-content">
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button className="btn btn-ghost btn-sm" onClick={() => router.push('/posts')}>
            <ArrowLeft size={16} />
          </button>
          <div>
            <h1 className="page-title">Sửa bài viết</h1>
            <p className="page-description">
              {post ? `"${post.title}"` : `ID: ${id}`}
            </p>
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
              onChange={(e) =>
                setForm((prev) => ({ ...prev, slug: generateSlug(e.target.value) }))
              }
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
              <label className="label" htmlFor="status">Trạng thái</label>
              <select
                id="status"
                name="status"
                className="select"
                value={form.status}
                onChange={handleChange}
              >
                <option value="draft">Nháp</option>
                <option value="published">Đã xuất bản</option>
                <option value="archived">Lưu trữ</option>
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
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'space-between', paddingTop: '0.5rem' }}>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                className="btn btn-danger"
                onClick={handleDelete}
                disabled={saving}
              >
                <Trash2 size={16} />
                Xóa
              </button>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {form.status === 'draft' && (
                <button
                  className="btn btn-secondary"
                  onClick={handleArchive}
                  disabled={saving}
                  title="Lưu trữ bài viết"
                >
                  <Archive size={16} />
                  Lưu trữ
                </button>
              )}
              {(form.status === 'archived' || form.status === 'draft') && (
                <button
                  className="btn btn-primary"
                  onClick={handlePublish}
                  disabled={saving}
                  title="Xuất bản bài viết"
                >
                  <Globe size={16} />
                  Xuất bản
                </button>
              )}
              <button
                className="btn btn-secondary"
                onClick={handleSave}
                disabled={saving}
              >
                <Save size={16} />
                {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
