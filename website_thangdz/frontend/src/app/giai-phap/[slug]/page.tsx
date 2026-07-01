// frontend/src/app/giai-phap/[slug]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { api, Service } from '@/lib/api';
import PostContent from '@/components/PostContent';
import { CheckCircle2, ShoppingCart, ArrowLeft, Loader2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ServiceDetail() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [ordering, setOrdering] = useState(false);

  useEffect(() => {
    async function fetchService() {
      try {
        const data = await api.getService(slug);
        setService(data);
      } catch (err: any) {
        setError(err.message || 'Không tìm thấy dịch vụ/giải pháp.');
      } finally {
        setLoading(false);
      }
    }
    if (slug) fetchService();
  }, [slug]);

  const handleOrder = async () => {
    if (!service) return;
    
    // Kiem tra dang nhap
    const token = localStorage.getItem('token');
    if (!token) {
      // Chuyen huong den login va quay lai sau khi dang nhap
      router.push(`/tai-khoan?tab=login&redirect=/giai-phap/${slug}`);
      return;
    }
    
    setOrdering(true);
    try {
      // Tao don hang pending
      const order = await api.createOrder({
        items: [{ service_id: service.id, quantity: 1 }],
        note: `Dat mua giai phap: ${service.name}`
      });
      // Chuyen huong den trang thanh toan kem QR VietQR
      router.push(`/thanh-toan?orderId=${order.id}`);
    } catch (err: any) {
      alert(err.message || 'Lỗi khi tạo đơn hàng. Vui lòng thử lại.');
    } finally {
      setOrdering(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="max-w-md mx-auto px-6 py-24 text-center flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-rose-400">{error || 'Không tìm thấy giải pháp.'}</h1>
        <Link href="/giai-phap" className="secondary-btn justify-center">
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại Dịch vụ</span>
        </Link>
      </div>
    );
  }

  // Chia danh sach uu diem/quyen loi (gia dinh tu description)
  const benefits = [
    'Bàn giao toàn bộ mã nguồn sạch, cấu trúc modul hóa dễ bảo trì.',
    'Tối ưu hóa SEO On-page cơ bản cho mọi giao diện bài viết.',
    'Hỗ trợ kỹ thuật 1-1 trực tiếp qua Zalo/Meet thời hạn 3 tháng.',
    'Tài liệu hướng dẫn triển khai VPS chi tiết (PM2, systemd, Nginx).'
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 flex flex-col gap-8">
      {/* Back link */}
      <div>
        <Link href="/giai-phap" className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-cyan-400 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại tất cả dịch vụ</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-4">
        {/* Main Content Column */}
        <div className="md:col-span-2 flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <span className="text-xs text-purple-400 font-bold uppercase tracking-widest">{service.service_type}</span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white">{service.name}</h1>
          </div>

          <div className="glass-panel p-6 leading-relaxed text-slate-300 text-sm flex flex-col gap-6">
            <h3 className="text-white font-bold text-base border-b border-white/5 pb-2">Mô tả chi tiết dịch vụ</h3>
            <PostContent content={service.description || service.short_description || ''} />
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-white font-bold text-lg">Bạn sẽ nhận được gì?</h3>
            <div className="grid grid-cols-1 gap-3">
              {benefits.map((b, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-slate-400 leading-relaxed">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sticky Pricing / Order Card */}
        <div className="flex flex-col gap-6">
          <div className="glass-panel p-6 border-cyan-500/20 sticky top-28 flex flex-col gap-6">
            <div>
              <span className="text-xs text-slate-500 font-medium">Giá gói trọn gói</span>
              <div className="text-3xl font-extrabold text-white mt-1">
                {formatPrice(service.price)}
              </div>
            </div>

            <div className="border-t border-white/5 pt-6 flex flex-col gap-4 text-xs text-slate-400">
              <div className="flex justify-between">
                <span>Loại tài nguyên:</span>
                <span className="text-white font-semibold capitalize">{service.service_type}</span>
              </div>
              <div className="flex justify-between">
                <span>Hỗ trợ trọn gói:</span>
                <span className="text-white font-semibold">3 tháng</span>
              </div>
              <div className="flex justify-between">
                <span>Thời gian triển khai:</span>
                <span className="text-white font-semibold">3 - 7 ngày</span>
              </div>
            </div>

            <button 
              onClick={handleOrder}
              disabled={ordering}
              className="glow-btn justify-center w-full py-3 text-sm cursor-pointer mt-4"
            >
              {ordering ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Đang xử lý...</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" />
                  <span>Đặt mua ngay</span>
                </>
              )}
            </button>

            <p className="text-[10px] text-center text-slate-500 mt-2">
              Bằng việc nhấn đặt mua, một hóa đơn pending sẽ được tạo lập trong hồ sơ tài khoản của bạn để tiến hành thanh toán.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
