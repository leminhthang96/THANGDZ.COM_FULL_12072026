'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { useToast } from '@/contexts/ToastContext';
import MarkdownEditor from '@/components/shared/MarkdownEditor';
import { ArrowLeft, Save } from 'lucide-react';

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export default function CreateServicePage() {
  const router = useRouter();
  const { showToast } = useToast();

  const [form, setForm] = useState({
    name: '',
    slug: '',
    short_description: '',
    description: '',
    price: '',
    currency: 'VND',
    thumbnail_url: '',
    service_type: 'service' as 'service' | 'course' | 'digital_product' | 'consulting',
    status: 'draft' as 'active' | 'inactive' | 'draft',
  });
  const [saving, setSaving] = useState(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    const slug = generateSlug(name);
    setForm((prev) => ({ ...prev, name, slug }));
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

  const handleSubmit = async () => {
    if (!form.name.trim()) {
      showToast('Vui lòng nhập tên dịch vụ', 'warning');
      return;
    }
    if (!form.price || isNaN(Number(form.price)) || Number(form.price) < 0) {
      showToast('Vui lòng nhập giá hợp lệ', 'warning');
      return;
    }

    setSaving(true);
    try {
      const payload = {
        name: form.name.trim(),
        slug: form.slug || generateSlug(form.name),
        short_description: form.short_description.trim() || null,
        description: form.description.trim() || null,
        price: Number(form.price),
        currency: form.currency,
        thumbnail_url: form.thumbnail_url.trim() || null,
        service_type: form.service_type,
        status: form.status,
      };
      await api.createService(payload);
      showToast('Đã tạo dịch vụ thành công', 'success');
      router.push('/services');
    } catch {
      showToast('Tạo dịch vụ thất bại', 'error');
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
            <h1 className="page-title">Tạo dịch vụ</h1>
            <p className="page-description">Thêm dịch vụ mới</p>
          </div>
        </div>
      </div>

      <div className="card">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '1.5rem' }}>
          {/* Name */}
          <div className="form-group">
            <label className="label" htmlFor="name">Tên dịch vụ <span style={{ color: 'var(--error)' }}>*</span></label>
            <input
              id="name"
              type="text"
              name="name"
              className="input"
              placeholder="Nhập tên dịch vụ..."
              value={form.name}
              onChange={handleNameChange}
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
              placeholder="slug-dich-vu"
              value={form.slug}
              onChange={handleSlugChange}
            />
          </div>

          {/* Short Description */}
          <div className="form-group">
            <label className="label" htmlFor="short_description">Mô tả ngắn</label>
            <textarea
              id="short_description"
              name="short_description"
              className="input"
              rows={2}
              placeholder="Mô tả ngắn về dịch vụ..."
              value={form.short_description}
              onChange={handleChange}
              style={{ resize: 'vertical' }}
            />
          </div>

          {/* Description */}
          <div className="form-group">
            <label className="label" htmlFor="description">Mô tả chi tiết</label>
            <MarkdownEditor
              id="description"
              name="description"
              rows={8}
              placeholder="Mô tả chi tiết về dịch vụ..."
              value={form.description}
              onChange={(description) => setForm((prev) => ({ ...prev, description }))}
            />
          </div>

          {/* Price & Currency */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
            <div className="form-group">
              <label className="label" htmlFor="price">Giá <span style={{ color: 'var(--error)' }}>*</span></label>
              <input
                id="price"
                type="number"
                name="price"
                className="input"
                placeholder="0"
                min="0"
                step="1000"
                value={form.price}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="label" htmlFor="currency">Đơn vị tiền tệ</label>
              <select
                id="currency"
                name="currency"
                className="select"
                value={form.currency}
                onChange={handleChange}
              >
                <option value="VND">VND</option>
                <option value="USD">USD</option>
              </select>
            </div>
          </div>

          {/* Service Type & Status */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="form-group">
              <label className="label" htmlFor="service_type">Loại dịch vụ</label>
              <select
                id="service_type"
                name="service_type"
                className="select"
                value={form.service_type}
                onChange={handleChange}
              >
                <option value="service">Dịch vụ</option>
                <option value="course">Khóa học</option>
                <option value="digital_product">Sản phẩm số</option>
                <option value="consulting">Tư vấn</option>
              </select>
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
                <option value="active">Hoạt động</option>
                <option value="inactive">Không hoạt động</option>
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
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', paddingTop: '0.5rem' }}>
            <button
              className="btn btn-secondary"
              onClick={() => router.back()}
              disabled={saving}
            >
              Hủy
            </button>
            <button
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={saving || !form.name.trim()}
            >
              <Save size={16} />
              {saving ? 'Đang lưu...' : 'Lưu dịch vụ'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
