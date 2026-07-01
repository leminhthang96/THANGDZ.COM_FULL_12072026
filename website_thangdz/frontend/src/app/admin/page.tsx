// frontend/src/app/admin/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { api, Service, Post, Guide, Order, Payment, User } from '@/lib/api';
import { Shield, BarChart3, Users, BookOpen, Layers, ShoppingBag, ShoppingCart, Check, X, Plus, Trash2, Globe, Loader2 } from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();

  const [isAdmin, setIsAdmin] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState('stats');
  const [loading, setLoading] = useState(true);

  // Data States
  const [stats, setStats] = useState<any>(null);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [guides, setGuides] = useState<Guide[]>([]);

  // Create Form States
  const [newServiceName, setNewServiceName] = useState('');
  const [newServicePrice, setNewServicePrice] = useState(0);
  const [newServiceDesc, setNewServiceDesc] = useState('');
  const [newServiceType, setNewServiceType] = useState('service');

  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostSummary, setNewPostSummary] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostCategory, setNewPostCategory] = useState('Tech News');

  const [newGuideTitle, setNewGuideTitle] = useState('');
  const [newGuideSummary, setNewGuideSummary] = useState('');
  const [newGuideContent, setNewGuideContent] = useState('');
  const [newGuideCategory, setNewGuideCategory] = useState('Backend');
  const [newGuideLevel, setNewGuideLevel] = useState('beginner');

  // Load Admin status
  useEffect(() => {
    const role = localStorage.getItem('role');
    const token = localStorage.getItem('token');
    
    if (!token || role !== 'admin') {
      router.push('/tai-khoan?tab=login');
    } else {
      setIsAdmin(true);
      loadDashboardData();
    }
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [statsData, paymentsData, usersData, servicesData, postsData, guidesData] = await Promise.all([
        api.getAdminStats(),
        api.getAdminPayments(),
        api.getAdminUsers(),
        api.getAdminServices(),
        api.getAdminPosts(),
        api.getAdminGuides()
      ]);
      setStats(statsData);
      setPayments(paymentsData);
      setUsers(usersData);
      setServices(servicesData);
      setPosts(postsData);
      setGuides(guidesData);
    } catch (err) {
      console.error('Loi khi tai du lieu quan tri:', err);
    } finally {
      setLoading(false);
    }
  };

  // Confirm Manual Payment
  const handleConfirmPayment = async (paymentId: number, status: 'success' | 'failed') => {
    try {
      const txId = status === 'success' ? `TX-${Date.now()}` : undefined;
      await api.confirmPayment(paymentId, status, txId);
      alert('Đã xử lý xác thực thanh toán thành công!');
      loadDashboardData();
    } catch (err: any) {
      alert(err.message || 'Lỗi khi xác thực thanh toán.');
    }
  };

  // Create Service
  const handleCreateService = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.createAdminService({
        name: newServiceName,
        price: newServicePrice,
        description: newServiceDesc,
        short_description: newServiceDesc.substring(0, 150),
        service_type: newServiceType,
        status: 'active'
      });
      alert('Đã tạo dịch vụ thành công!');
      setNewServiceName('');
      setNewServicePrice(0);
      setNewServiceDesc('');
      loadDashboardData();
    } catch (err: any) {
      alert(err.message || 'Lỗi khi tạo dịch vụ.');
    }
  };

  // Create Post
  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.createAdminPost({
        title: newPostTitle,
        summary: newPostSummary,
        content: newPostContent,
        category: newPostCategory,
        status: 'published' // Auto publish in admin panel
      });
      alert('Đã tạo và đăng bài viết thành công!');
      setNewPostTitle('');
      setNewPostSummary('');
      setNewPostContent('');
      loadDashboardData();
    } catch (err: any) {
      alert(err.message || 'Lỗi khi tạo bài viết.');
    }
  };

  // Create Guide
  const handleCreateGuide = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.createAdminGuide({
        title: newGuideTitle,
        summary: newGuideSummary,
        content: newGuideContent,
        category: newGuideCategory,
        level: newGuideLevel,
        status: 'published' // Auto publish in admin panel
      });
      alert('Đã tạo và đăng hướng dẫn thành công!');
      setNewGuideTitle('');
      setNewGuideSummary('');
      setNewGuideContent('');
      loadDashboardData();
    } catch (err: any) {
      alert(err.message || 'Lỗi khi tạo hướng dẫn.');
    }
  };

  // Delete Handlers
  const handleDeleteService = async (id: number) => {
    if (!confirm('Bạn có chắc chắn muốn xóa dịch vụ này?')) return;
    try {
      await api.deleteAdminService(id);
      loadDashboardData();
    } catch (err: any) {
      alert(err.message || 'Lỗi khi xóa dịch vụ.');
    }
  };

  const handleDeletePost = async (id: number) => {
    if (!confirm('Bạn có chắc chắn muốn xóa bài viết này?')) return;
    try {
      await api.deleteAdminPost(id);
      loadDashboardData();
    } catch (err: any) {
      alert(err.message || 'Lỗi khi xóa bài viết.');
    }
  };

  const handleDeleteGuide = async (id: number) => {
    if (!confirm('Bạn có chắc chắn muốn xóa hướng dẫn này?')) return;
    try {
      await api.deleteAdminGuide(id);
      loadDashboardData();
    } catch (err: any) {
      alert(err.message || 'Lỗi khi xóa hướng dẫn.');
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  if (!isAdmin || loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
      </div>
    );
  }

  const menuItems = [
    { id: 'stats', name: 'Tổng quan số liệu', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'payments', name: 'Duyệt thanh toán', icon: <ShoppingCart className="w-4 h-4" /> },
    { id: 'services', name: 'Dịch vụ & Gói bán', icon: <Layers className="w-4 h-4" /> },
    { id: 'posts', name: 'Đăng bài blog', icon: <Globe className="w-4 h-4" /> },
    { id: 'guides', name: 'Đăng tài liệu hướng dẫn', icon: <BookOpen className="w-4 h-4" /> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-8">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 flex flex-col gap-4">
        <div className="glass-panel p-6 flex items-center gap-3">
          <Shield className="w-6 h-6 text-purple-400" />
          <div>
            <h2 className="text-white font-bold text-sm">Quản trị Admin</h2>
            <p className="text-[10px] text-slate-500 mt-0.5">Thương hiệu ThangDz</p>
          </div>
        </div>

        <div className="glass-panel p-4 flex flex-col gap-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSubTab(item.id)}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-left text-xs font-semibold cursor-pointer transition-colors border-none ${
                activeSubTab === item.id 
                  ? 'bg-cyan-500 text-slate-950 font-bold' 
                  : 'bg-transparent text-slate-300 hover:bg-white/5'
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </button>
          ))}
        </div>
      </aside>

      {/* Main Backoffice Panel */}
      <main className="flex-1">
        {/* TAB 1: OVERVIEW STATS */}
        {activeSubTab === 'stats' && stats && (
          <div className="flex flex-col gap-8">
            <h2 className="text-2xl font-bold text-white">Số liệu thống kê</h2>
            
            {/* Stat Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="glass-panel p-5">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Tổng doanh thu</span>
                <div className="text-lg font-extrabold text-white mt-1.5">{formatPrice(stats.total_revenue)}</div>
              </div>
              <div className="glass-panel p-5">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Đơn hàng</span>
                <div className="text-lg font-extrabold text-white mt-1.5">{stats.total_orders} đơn</div>
              </div>
              <div className="glass-panel p-5">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Thành viên</span>
                <div className="text-lg font-extrabold text-white mt-1.5">{stats.total_users} users</div>
              </div>
              <div className="glass-panel p-5">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Tài liệu đăng tải</span>
                <div className="text-lg font-extrabold text-white mt-1.5">{stats.total_posts + stats.total_guides} bài</div>
              </div>
            </div>

            {/* Recent orders */}
            <div className="glass-panel p-6 mt-4">
              <h3 className="text-white font-bold text-base mb-4">Danh sách Đơn hàng gần đây</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-white/5 text-slate-500">
                      <th className="pb-3">Mã đơn</th>
                      <th className="pb-3">Khách hàng</th>
                      <th className="pb-3 text-right">Tổng tiền</th>
                      <th className="pb-3 text-center">Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recent_orders.map((o: any) => (
                      <tr key={o.id} className="border-b border-white/5">
                        <td className="py-3 text-white font-bold">{o.order_code}</td>
                        <td className="py-3 text-slate-400">{o.user_email}</td>
                        <td className="py-3 text-right text-white font-semibold">{formatPrice(o.total_amount)}</td>
                        <td className="py-3 text-center">
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-semibold border ${
                            o.status === 'paid' ? 'text-emerald-300 border-emerald-500/20 bg-emerald-500/10' : 'text-amber-300 border-amber-500/20 bg-amber-500/10'
                          }`}>
                            {o.status.toUpperCase()}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MANUAL PAYMENT CONFIRMATIONS */}
        {activeSubTab === 'payments' && (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-white">Duyệt giao dịch chuyển khoản</h2>
            <div className="flex flex-col gap-4">
              {payments.filter(p => p.status === 'pending').length === 0 ? (
                <div className="text-slate-500 text-center py-12 glass-panel">Không có giao dịch chuyển khoản nào cần xử lý duyệt.</div>
              ) : (
                payments.filter(p => p.status === 'pending').map((p) => (
                  <div key={p.id} className="glass-panel p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-l-4 border-amber-400">
                    <div className="flex flex-col gap-1 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">Giao dịch #{p.id}</span>
                        <span className="bg-amber-500/10 text-amber-300 px-2 py-0.5 rounded border border-amber-500/20 font-bold uppercase tracking-wider text-[9px]">PENDING</span>
                      </div>
                      <p className="text-slate-400 mt-1">Đơn hàng tương ứng: <span className="text-white font-bold">{p.order_id}</span></p>
                      <p className="text-slate-400">Số tiền cần nhận: <span className="text-white font-bold">{formatPrice(p.amount)}</span></p>
                      <p className="text-slate-500 mt-1">Giao dịch lúc: {new Date(p.created_at).toLocaleString('vi-VN')}</p>
                    </div>

                    <div className="flex gap-2 shrink-0">
                      <button 
                        onClick={() => handleConfirmPayment(p.id, 'success')}
                        className="flex items-center gap-1 bg-emerald-500 text-slate-950 font-bold px-4 py-2 rounded-full text-xs cursor-pointer hover:bg-emerald-400 transition-colors border-none"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Duyệt thành công</span>
                      </button>
                      <button 
                        onClick={() => handleConfirmPayment(p.id, 'failed')}
                        className="flex items-center gap-1 bg-rose-500/10 border border-rose-500/20 text-rose-300 font-semibold px-4 py-2 rounded-full text-xs cursor-pointer hover:bg-rose-500/20 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Bác bỏ</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 3: SERVICES BACKOFFICE */}
        {activeSubTab === 'services' && (
          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Quản lý Dịch vụ & Khóa học</h2>
            </div>

            {/* Create form */}
            <div className="glass-panel p-6">
              <h3 className="text-white font-bold mb-4 text-sm flex items-center gap-1.5"><Plus className="w-4 h-4" /><span>Tạo dịch vụ mới</span></h3>
              <form onSubmit={handleCreateService} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-slate-400">Tên dịch vụ</label>
                  <input type="text" value={newServiceName} onChange={e => setNewServiceName(e.target.value)} required className="form-input" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-slate-400">Giá (VND)</label>
                  <input type="number" value={newServicePrice} onChange={e => setNewServicePrice(parseInt(e.target.value))} required className="form-input" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-slate-400">Loại gói</label>
                  <select value={newServiceType} onChange={e => setNewServiceType(e.target.value)} className="form-input">
                    <option value="service">Dịch vụ code website</option>
                    <option value="course">Khóa học</option>
                    <option value="consulting">Mentoring tư vấn</option>
                  </select>
                </div>
                <div className="md:col-span-2 flex flex-col gap-1">
                  <label className="text-xs text-slate-400">Mô tả giải pháp</label>
                  <textarea rows={3} value={newServiceDesc} onChange={e => setNewServiceDesc(e.target.value)} required className="form-input py-3" />
                </div>
                <button type="submit" className="glow-btn justify-center text-xs py-3 md:col-span-2 mt-2">Tạo dịch vụ mới</button>
              </form>
            </div>

            {/* Services list */}
            <div className="flex flex-col gap-4">
              <h3 className="text-white font-bold text-sm">Danh sách Dịch vụ hiện có</h3>
              {services.map((s) => (
                <div key={s.id} className="glass-panel p-4 flex items-center justify-between text-xs gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="font-bold text-white text-sm">{s.name}</span>
                    <span className="text-slate-500 uppercase tracking-widest text-[9px]">{s.service_type} &bull; {formatPrice(s.price)}</span>
                  </div>
                  <button onClick={() => handleDeleteService(s.id)} className="text-rose-400 hover:text-rose-300 cursor-pointer bg-transparent border-none">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: POSTS BACKOFFICE */}
        {activeSubTab === 'posts' && (
          <div className="flex flex-col gap-8">
            <h2 className="text-2xl font-bold text-white">Đăng bài tin tức công nghệ</h2>
            
            <div className="glass-panel p-6">
              <h3 className="text-white font-bold mb-4 text-sm flex items-center gap-1.5"><Plus className="w-4 h-4" /><span>Tạo bài viết mới</span></h3>
              <form onSubmit={handleCreatePost} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-slate-400">Tiêu đề</label>
                    <input type="text" value={newPostTitle} onChange={e => setNewPostTitle(e.target.value)} required className="form-input" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-slate-400">Danh mục</label>
                    <input type="text" value={newPostCategory} onChange={e => setNewPostCategory(e.target.value)} required className="form-input" />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-slate-400">Tóm tắt ngắn</label>
                  <input type="text" value={newPostSummary} onChange={e => setNewPostSummary(e.target.value)} required className="form-input" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-slate-400">Nội dung chi tiết (Markdown hoặc Văn bản)</label>
                  <textarea rows={6} value={newPostContent} onChange={e => setNewPostContent(e.target.value)} required className="form-input py-3" />
                </div>
                <button type="submit" className="glow-btn justify-center text-xs py-3 mt-2">Đăng bài viết công khai</button>
              </form>
            </div>

            {/* Posts list */}
            <div className="flex flex-col gap-4">
              <h3 className="text-white font-bold text-sm">Bài viết đã đăng</h3>
              {posts.map((p) => (
                <div key={p.id} className="glass-panel p-4 flex items-center justify-between text-xs gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="font-bold text-white text-sm">{p.title}</span>
                    <span className="text-slate-500 uppercase tracking-widest text-[9px]">{p.category} &bull; {new Date(p.created_at).toLocaleDateString('vi-VN')}</span>
                  </div>
                  <button onClick={() => handleDeletePost(p.id)} className="text-rose-400 hover:text-rose-300 cursor-pointer bg-transparent border-none">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: GUIDES BACKOFFICE */}
        {activeSubTab === 'guides' && (
          <div className="flex flex-col gap-8">
            <h2 className="text-2xl font-bold text-white">Đăng tài liệu & hướng dẫn lập trình</h2>
            
            <div className="glass-panel p-6">
              <h3 className="text-white font-bold mb-4 text-sm flex items-center gap-1.5"><Plus className="w-4 h-4" /><span>Tạo tài liệu hướng dẫn mới</span></h3>
              <form onSubmit={handleCreateGuide} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1 md:col-span-2">
                    <label className="text-xs text-slate-400">Tiêu đề bài hướng dẫn</label>
                    <input type="text" value={newGuideTitle} onChange={e => setNewGuideTitle(e.target.value)} required className="form-input" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-slate-400">Cấp độ</label>
                    <select value={newGuideLevel} onChange={e => setNewGuideLevel(e.target.value)} className="form-input">
                      <option value="beginner">Beginner (Cơ bản)</option>
                      <option value="intermediate">Intermediate (Trung cấp)</option>
                      <option value="advanced">Advanced (Nâng cao)</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-slate-400">Danh mục (Ví dụ: Python, Next.js...)</label>
                    <input type="text" value={newGuideCategory} onChange={e => setNewGuideCategory(e.target.value)} required className="form-input" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-slate-400">Tóm tắt ngắn</label>
                    <input type="text" value={newGuideSummary} onChange={e => setNewGuideSummary(e.target.value)} required className="form-input" />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-slate-400">Nội dung chi tiết tài liệu học tập</label>
                  <textarea rows={6} value={newGuideContent} onChange={e => setNewGuideContent(e.target.value)} required className="form-input py-3" />
                </div>
                <button type="submit" className="glow-btn justify-center text-xs py-3 mt-2">Đăng tải hướng dẫn công khai</button>
              </form>
            </div>

            {/* Guides list */}
            <div className="flex flex-col gap-4">
              <h3 className="text-white font-bold text-sm">Hướng dẫn hiện có</h3>
              {guides.map((g) => (
                <div key={g.id} className="glass-panel p-4 flex items-center justify-between text-xs gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="font-bold text-white text-sm">{g.title}</span>
                    <span className="text-slate-500 uppercase tracking-widest text-[9px]">{g.category} &bull; {g.level.toUpperCase()} &bull; {new Date(g.created_at).toLocaleDateString('vi-VN')}</span>
                  </div>
                  <button onClick={() => handleDeleteGuide(g.id)} className="text-rose-400 hover:text-rose-300 cursor-pointer bg-transparent border-none">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
