// frontend/src/app/huong-dan/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { api, Guide } from '@/lib/api';
import { BookOpen, Calendar, Award, Loader2, ArrowRight } from 'lucide-react';

export default function Guides() {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeLevel, setActiveLevel] = useState<string>('All');

  const levels = ['All', 'beginner', 'intermediate', 'advanced'];

  useEffect(() => {
    async function fetchGuides() {
      setLoading(true);
      try {
        const levelFilter = activeLevel === 'All' ? undefined : activeLevel;
        const data = await api.getGuides(levelFilter);
        setGuides(data);
      } catch (err: any) {
        setError(err.message || 'Lỗi khi tải danh sách hướng dẫn.');
      } finally {
        setLoading(false);
      }
    }
    fetchGuides();
  }, [activeLevel]);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'intermediate':
        return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20';
      case 'advanced':
        return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
      default:
        return 'text-slate-400 bg-white/5 border-white/5';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 flex flex-col gap-12 py-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto flex flex-col gap-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white">Hướng Dẫn Thực Hành</h1>
        <p className="text-slate-400 text-sm">
          Kho bài học lập trình thực chiến, hướng dẫn chi tiết cách tích hợp API, triển khai hạ tầng VPS và tối ưu mã nguồn.
        </p>
      </div>

      {/* Level Filter */}
      <div className="flex flex-wrap gap-2.5 justify-center mt-4">
        {levels.map((lvl) => (
          <button
            key={lvl}
            onClick={() => setActiveLevel(lvl)}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide cursor-pointer transition-colors ${
              activeLevel === lvl
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/25'
                : 'bg-white/5 border border-white/5 text-slate-300 hover:bg-white/10'
            }`}
          >
            {lvl === 'All' ? 'Tất cả cấp độ' : lvl.toUpperCase()}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
          {[1, 2].map((n) => (
            <div key={n} className="glass-panel h-80 animate-pulse bg-slate-900/30"></div>
          ))}
        </div>
      ) : error ? (
        <div className="glass-panel p-8 text-center text-rose-400 max-w-md mx-auto">
          {error}
        </div>
      ) : guides.length === 0 ? (
        <div className="text-center text-slate-500 py-12">
          Không tìm thấy bài hướng dẫn nào cho cấp độ này.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
          {guides.map((guide) => (
            <div key={guide.id} className="glass-panel overflow-hidden flex flex-col justify-between min-h-[360px]">
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

              <div className="flex flex-1 flex-col justify-between p-6">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-purple-400 font-semibold uppercase tracking-wider">{guide.category}</span>
                  <span className={`text-xs px-2.5 py-0.5 rounded-full border font-semibold ${getLevelColor(guide.level)}`}>
                    {guide.level.toUpperCase()}
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold text-white hover:text-cyan-300 transition-colors leading-snug">
                  <Link href={`/huong-dan/${guide.slug}`}>{guide.title}</Link>
                </h3>
                
                <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
                  {guide.summary}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{new Date(guide.created_at).toLocaleDateString('vi-VN')}</span>
                </div>
                
                <Link href={`/huong-dan/${guide.slug}`} className="text-cyan-400 text-sm font-semibold hover:underline flex items-center gap-1">
                  <span>Bắt đầu học</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
