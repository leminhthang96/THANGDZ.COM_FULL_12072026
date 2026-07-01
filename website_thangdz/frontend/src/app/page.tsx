// frontend/src/app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen, Code, Cpu, ShieldCheck, Star } from 'lucide-react';
import { api, Service, Post, Guide } from '@/lib/api';

export default function Home() {
  const [services, setServices] = useState<Service[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [servicesData, postsData, guidesData] = await Promise.all([
          api.getServices(),
          api.getPosts(),
          api.getGuides()
        ]);
        setServices(servicesData.slice(0, 3));
        setPosts(postsData.slice(0, 2));
        setGuides(guidesData.slice(0, 2));
      } catch (err) {
        console.error('Loi tai du lieu:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 flex flex-col gap-24">
      {/* 1. Hero Section */}
      <section className="min-h-[70vh] flex flex-col lg:flex-row items-center justify-between gap-12 py-12 relative">
        <div className="flex-1 flex flex-col items-start text-left gap-6 lg:max-w-[60%]">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs text-cyan-300 font-semibold tracking-wider uppercase">
            <Cpu className="w-4 h-4 animate-spin-slow" />
            <span>Full Stack Solutions & Mentoring</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Nâng tầm giá trị với <br />
            <span className="text-gradient">Giải Pháp Lập Trình Chuyên Nghiệp</span>
          </h1>
          
          <p className="text-slate-400 text-base md:text-lg max-w-xl leading-relaxed">
            Chào mừng bạn đến với blog chia sẻ kiến thức, tài liệu lập trình thực tế và các giải pháp thiết kế web tối ưu của Lê Minh Thắng (ThangDz).
          </p>
          
          <div className="flex gap-4 items-center">
            <Link href="/giai-phap" className="glow-btn">
              <span>Khám phá dịch vụ</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/gioi-thieu" className="secondary-btn">
              <span>Tìm hiểu thêm</span>
            </Link>
          </div>
        </div>

        <div className="flex-grow-0 flex-shrink-0 flex justify-center items-center w-full lg:w-auto">
          <img 
            src="/chandung.png" 
            alt="Lê Minh Thắng (ThangDz)" 
            className="w-[300px] md:w-[450px] lg:w-[500px] h-auto object-contain rounded-2xl shadow-2xl transition-transform duration-500 hover:scale-[1.02]"
          />
        </div>
      </section>

      {/* 2. Dịch vụ nổi bật */}
      <section className="flex flex-col gap-12">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">Dịch vụ & Giải pháp</h2>
            <p className="text-slate-400 text-sm mt-2">Các gói giải pháp và khóa học công nghệ chất lượng cao được thiết kế chi tiết.</p>
          </div>
          <Link href="/giai-phap" className="text-cyan-400 text-sm font-semibold flex items-center gap-1 hover:underline">
            <span>Xem tất cả dịch vụ</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="glass-panel h-80 animate-pulse bg-slate-900/30"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service) => (
              <div key={service.id} className="glass-panel p-6 flex flex-col justify-between min-h-[360px]">
                <div className="flex flex-col gap-4">
                  <div className="p-3 bg-cyan-500/10 text-cyan-300 w-12 h-12 rounded-lg flex items-center justify-center">
                    <Code className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white hover:text-cyan-300 transition-colors">
                    <Link href={`/giai-phap/${service.slug}`}>{service.name}</Link>
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
                    {service.short_description}
                  </p>
                </div>
                <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xl font-extrabold text-white">
                    {formatPrice(service.price)}
                  </span>
                  <Link href={`/giai-phap/${service.slug}`} className="glow-btn py-2.5 px-5 text-xs">
                    <span>Xem chi tiết</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 3. Bài viết & Hướng dẫn mới nhất */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Tin tức */}
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">Tin tức công nghệ</h2>
            <Link href="/tin-tuc" className="text-cyan-400 text-sm font-semibold hover:underline">Xem tất cả</Link>
          </div>
          <div className="flex flex-col gap-4">
            {posts.map((post) => (
              <div key={post.id} className="glass-panel p-6 flex flex-col gap-4">
                <span className="text-xs text-purple-400 font-semibold uppercase tracking-wider">{post.category}</span>
                <h3 className="text-lg font-bold text-white hover:text-cyan-300 transition-colors">
                  <Link href={`/tin-tuc/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed line-clamp-2">
                  {post.summary}
                </p>
                <div className="flex justify-between items-center text-xs text-slate-500 mt-2">
                  <span>Lê Minh Thắng</span>
                  <span>{new Date(post.created_at).toLocaleDateString('vi-VN')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hướng dẫn */}
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">Hướng dẫn lập trình</h2>
            <Link href="/huong-dan" className="text-cyan-400 text-sm font-semibold hover:underline">Xem tất cả</Link>
          </div>
          <div className="flex flex-col gap-4">
            {guides.map((guide) => (
              <div key={guide.id} className="glass-panel overflow-hidden flex flex-col gap-4">
                {guide.thumbnail_url && (
                  <Link href={`/huong-dan/${guide.slug}`} className="block aspect-[16/9] overflow-hidden bg-slate-950/60">
                    <img
                      src={guide.thumbnail_url}
                      alt={guide.title}
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                      loading="lazy"
                      onError={(event) => {
                        event.currentTarget.style.display = 'none';
                      }}
                    />
                  </Link>
                )}
                <div className="flex flex-col gap-4 p-6">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-purple-400 font-semibold uppercase tracking-wider">{guide.category}</span>
                  <span className="text-xs bg-cyan-500/10 text-cyan-300 px-2 py-0.5 rounded-full border border-cyan-500/20">{guide.level}</span>
                </div>
                <h3 className="text-lg font-bold text-white hover:text-cyan-300 transition-colors">
                  <Link href={`/huong-dan/${guide.slug}`}>{guide.title}</Link>
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed line-clamp-2">
                  {guide.summary}
                </p>
                <div className="flex justify-between items-center text-xs text-slate-500 mt-2">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Bài học thực hành</span>
                  </span>
                  <span>{new Date(guide.created_at).toLocaleDateString('vi-VN')}</span>
                </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Ý kiến khách hàng */}
      <section className="glass-panel p-10 flex flex-col items-center text-center gap-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl"></div>
        
        <div className="flex gap-1 text-amber-400">
          {[1,2,3,4,5].map((s) => <Star key={s} className="w-5 h-5 fill-current" />)}
        </div>
        <blockquote className="text-lg md:text-xl font-medium text-slate-200 max-w-3xl italic leading-relaxed">
          &ldquo;Khóa học Next.js của anh Thắng được xây dựng cực kỳ thực chiến, chỉ bảo tận tình từ khâu viết code backend đến cấu hình deploy server Ubuntu. Mình đã tự tin xây dựng và vận hành dự án thực tế ngay sau khi học.&rdquo;
        </blockquote>
        <div>
          <cite className="not-italic font-bold text-white text-base">Hoàng Văn Nam</cite>
          <p className="text-xs text-slate-500 mt-0.5">Học viên khóa học Next.js & Full-stack</p>
        </div>
      </section>
    </div>
  );
}
