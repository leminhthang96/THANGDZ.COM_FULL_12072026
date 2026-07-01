// frontend/src/app/huong-dan/[slug]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { api, Guide } from '@/lib/api';
import { Calendar, ArrowLeft, BookOpen, Clock, Loader2 } from 'lucide-react';
import PostContent from '@/components/PostContent';

export default function GuideDetail() {
  const params = useParams();
  const slug = params.slug as string;

  const [guide, setGuide] = useState<Guide | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchGuide() {
      try {
        const data = await api.getGuide(slug);
        setGuide(data);
      } catch (err: any) {
        setError(err.message || 'Không tìm thấy hướng dẫn.');
      } finally {
        setLoading(false);
      }
    }
    if (slug) fetchGuide();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
      </div>
    );
  }

  if (error || !guide) {
    return (
      <div className="max-w-md mx-auto px-6 py-24 text-center flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-rose-400">{error || 'Không tìm thấy hướng dẫn.'}</h1>
        <Link href="/huong-dan" className="secondary-btn justify-center">
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại Hướng dẫn</span>
        </Link>
      </div>
    );
  }

  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'text-emerald-300 bg-emerald-500/10 border-emerald-500/20';
      case 'intermediate':
        return 'text-cyan-300 bg-cyan-500/10 border-cyan-500/20';
      case 'advanced':
        return 'text-rose-300 bg-rose-500/10 border-rose-500/20';
      default:
        return 'text-slate-300 bg-white/5 border-white/5';
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 flex flex-col gap-8">
      {/* Back link */}
      <div>
        <Link href="/huong-dan" className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-cyan-400 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại tất cả hướng dẫn</span>
        </Link>
      </div>

      {/* Guide Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <span className="text-xs text-purple-400 font-bold uppercase tracking-widest px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full">
            {guide.category}
          </span>
          <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${getLevelBadge(guide.level)}`}>
            {guide.level.toUpperCase()}
          </span>
        </div>
        
        <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
          {guide.title}
        </h1>

        <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 border-b border-white/5 pb-6">
          <div className="flex items-center gap-1.5">
            <BookOpen className="w-4 h-4" />
            <span>Tài liệu thực hành</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            <span>Cập nhật: {new Date(guide.created_at).toLocaleDateString('vi-VN')}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>Lê Minh Thắng</span>
          </div>
        </div>
      </div>

      {guide.thumbnail_url && (
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-950/60">
          <img
            src={guide.thumbnail_url}
            alt={guide.title}
            className="max-h-[520px] w-full object-cover"
            loading="lazy"
            onError={(event) => {
              event.currentTarget.style.display = 'none';
            }}
          />
        </div>
      )}

      {/* Summary Box */}
      {guide.summary && (
        <div className="glass-panel p-6 border-l-4 border-cyan-400 bg-slate-900/40 text-slate-300 font-medium italic text-base leading-relaxed">
          {guide.summary}
        </div>
      )}

      {/* Content */}
      <article className="prose prose-invert max-w-none text-sm leading-relaxed">
        <PostContent content={guide.content} />
      </article>
    </div>
  );
}
