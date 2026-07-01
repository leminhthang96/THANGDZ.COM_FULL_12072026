// frontend/src/app/giai-phap/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { api, Service } from '@/lib/api';
import { Code, BookOpen, Layers, ShieldCheck } from 'lucide-react';

export default function Solutions() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchServices() {
      try {
        const data = await api.getServices();
        setServices(data);
      } catch (err: any) {
        setError(err.message || 'Lỗi khi tải danh sách giải pháp.');
      } finally {
        setLoading(false);
      }
    }
    fetchServices();
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const getServiceIcon = (type: string) => {
    switch (type) {
      case 'course':
        return <BookOpen className="w-6 h-6 text-purple-400" />;
      case 'service':
        return <Code className="w-6 h-6 text-cyan-400" />;
      default:
        return <Layers className="w-6 h-6 text-emerald-400" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 flex flex-col gap-12 py-12">
      <div className="text-center max-w-3xl mx-auto flex flex-col gap-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white">Giải Pháp & Dịch Vụ</h1>
        <p className="text-slate-400 text-base">
          Cung cấp các giải pháp công nghệ lập trình, mentoring chuyên sâu và các tài nguyên chất lượng cao để thúc đẩy dự án của bạn đi nhanh hơn.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="glass-panel h-96 animate-pulse bg-slate-900/30"></div>
          ))}
        </div>
      ) : error ? (
        <div className="glass-panel p-8 text-center text-rose-400 max-w-md mx-auto">
          {error}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
          {services.map((service) => (
            <div key={service.id} className="glass-panel p-6 flex flex-col justify-between min-h-[420px]">
              <div className="flex flex-col gap-4">
                <div className="p-3 bg-white/5 border border-white/5 w-12 h-12 rounded-lg flex items-center justify-center">
                  {getServiceIcon(service.service_type)}
                </div>
                
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">{service.service_type}</span>
                
                <h3 className="text-xl font-bold text-white hover:text-cyan-300 transition-colors">
                  <Link href={`/giai-phap/${service.slug}`}>{service.name}</Link>
                </h3>
                
                <p className="text-slate-400 text-sm leading-relaxed line-clamp-4">
                  {service.short_description}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500">Giá trọn gói</span>
                  <span className="text-2xl font-extrabold text-white">{formatPrice(service.price)}</span>
                </div>
                
                <Link href={`/giai-phap/${service.slug}`} className="glow-btn justify-center w-full py-3 text-sm">
                  Chi tiết giải pháp
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Trust banner */}
      <section className="glass-panel p-6 flex flex-col md:flex-row items-center justify-around gap-6 mt-12 text-center md:text-left">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-10 h-10 text-cyan-400 shrink-0" />
          <div>
            <h4 className="text-white font-bold">Thanh toán An toàn</h4>
            <p className="text-xs text-slate-400 mt-0.5">Xác nhận giao dịch thủ công qua ngân hàng bảo mật.</p>
          </div>
        </div>
        <div className="w-px h-12 bg-white/10 hidden md:block"></div>
        <div className="flex items-center gap-3">
          <Layers className="w-10 h-10 text-purple-400 shrink-0" />
          <div>
            <h4 className="text-white font-bold">Bàn giao Đầy đủ</h4>
            <p className="text-xs text-slate-400 mt-0.5">Bàn giao toàn bộ mã nguồn sạch cùng hướng dẫn vận hành VPS.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
