// frontend/src/app/tin-tuc/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { api, Post } from '@/lib/api';
import { Calendar, User, BookOpen, Clock, Loader2 } from 'lucide-react';

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Tech News', 'DevOps', 'Frontend', 'Backend'];

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      try {
        const catFilter = activeCategory === 'All' ? undefined : activeCategory;
        const data = await api.getPosts(catFilter);
        setPosts(data);
      } catch (err: any) {
        setError(err.message || 'Lỗi khi tải bài viết.');
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, [activeCategory]);

  return (
    <div className="max-w-7xl mx-auto px-6 flex flex-col gap-12 py-12">
      {/* Page header */}
      <div className="text-center max-w-2xl mx-auto flex flex-col gap-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white">Tin Tức Công Nghệ</h1>
        <p className="text-slate-400 text-sm">
          Cập nhật những xu hướng lập trình mới, chia sẻ góc nhìn DevOps và các quan điểm xây dựng thương hiệu cá nhân.
        </p>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2.5 justify-center mt-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide cursor-pointer transition-colors ${
              activeCategory === cat
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/25'
                : 'bg-white/5 border border-white/5 text-slate-300 hover:bg-white/10'
            }`}
          >
            {cat}
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
      ) : posts.length === 0 ? (
        <div className="text-center text-slate-500 py-12">
          Không tìm thấy bài viết nào trong danh mục này.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
          {posts.map((post) => (
            <div key={post.id} className="glass-panel overflow-hidden flex flex-col justify-between min-h-[360px]">
              {post.thumbnail_url && (
                <Link href={`/tin-tuc/${post.slug}`} className="block aspect-[16/9] overflow-hidden bg-slate-950/60">
                  <img
                    src={post.thumbnail_url}
                    alt={post.title}
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
                  <span className="text-xs text-purple-400 font-semibold uppercase tracking-wider">{post.category}</span>
                  <div className="flex items-center gap-1 text-slate-500 text-xs">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{new Date(post.created_at).toLocaleDateString('vi-VN')}</span>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-white hover:text-cyan-300 transition-colors leading-snug">
                  <Link href={`/tin-tuc/${post.slug}`}>{post.title}</Link>
                </h3>
                
                <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
                  {post.summary}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <div className="w-7 h-7 bg-white/10 rounded-full flex items-center justify-center font-bold text-cyan-300 text-xs">
                    LT
                  </div>
                  <span>Lê Minh Thắng</span>
                </div>
                
                <Link href={`/tin-tuc/${post.slug}`} className="text-cyan-400 text-sm font-semibold hover:underline flex items-center gap-1">
                  <span>Đọc tiếp</span>
                  <Clock className="w-4 h-4" />
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
