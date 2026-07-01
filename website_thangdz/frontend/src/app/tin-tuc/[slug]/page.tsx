// frontend/src/app/tin-tuc/[slug]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { api, Post } from '@/lib/api';
import { Calendar, ArrowLeft, User, Eye, Loader2 } from 'lucide-react';
import PostContent from '@/components/PostContent';

export default function PostDetail() {
  const params = useParams();
  const slug = params.slug as string;

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        const data = await api.getPost(slug);
        setPost(data);
      } catch (err: any) {
        setError(err.message || 'Không tìm thấy bài viết.');
      } finally {
        setLoading(false);
      }
    }
    if (slug) fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="max-w-md mx-auto px-6 py-24 text-center flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-rose-400">{error || 'Không tìm thấy bài viết.'}</h1>
        <Link href="/tin-tuc" className="secondary-btn justify-center">
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại Tin tức</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 flex flex-col gap-8">
      {/* Back button */}
      <div>
        <Link href="/tin-tuc" className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-cyan-400 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại tất cả bài viết</span>
        </Link>
      </div>

      {/* Post Header */}
      <div className="flex flex-col gap-4">
        <span className="text-xs text-purple-400 font-bold uppercase tracking-widest self-start px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full">
          {post.category}
        </span>
        
        <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 border-b border-white/5 pb-6">
          <div className="flex items-center gap-1.5">
            <User className="w-4 h-4" />
            <span>Lê Minh Thắng</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            <span>{new Date(post.created_at).toLocaleDateString('vi-VN')}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Eye className="w-4 h-4" />
            <span>Đã xuất bản</span>
          </div>
        </div>
      </div>

      {post.thumbnail_url && (
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-950/50">
          <img
            src={post.thumbnail_url}
            alt={post.title}
            className="max-h-[520px] w-full object-cover"
            loading="eager"
            onError={(event) => {
              event.currentTarget.style.display = 'none';
            }}
          />
        </div>
      )}

      {/* Summary Box */}
      {post.summary && (
        <div className="glass-panel p-6 border-l-4 border-cyan-400 bg-slate-900/40 text-slate-300 font-medium italic text-base leading-relaxed">
          {post.summary}
        </div>
      )}

      {/* Main Body Content */}
      <article className="prose prose-invert max-w-none text-sm leading-relaxed">
        <PostContent content={post.content} />
      </article>
    </div>
  );
}
