// frontend/src/app/tai-khoan/page.tsx
'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { api, User, Order } from '@/lib/api';
import { LogOut, User as UserIcon, Lock, Mail, Phone, ShoppingBag, CreditCard, Shield, CheckCircle2 } from 'lucide-react';

function AccountContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') || 'login';
  const redirect = searchParams.get('redirect') || null;

  const [activeTab, setActiveTab] = useState(initialTab);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [myOrders, setMyOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Login Form States
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Register Form States
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regFullName, setRegFullName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regError, setRegError] = useState('');
  const [regSuccess, setRegSuccess] = useState(false);

  // Profile Edit States
  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [profileSuccess, setProfileSuccess] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      fetchUserData();
    }
  }, [isLoggedIn]);

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const user = await api.getMe();
      setCurrentUser(user);
      setEditName(user.full_name || '');
      setEditPhone(user.phone || '');
      
      const orders = await api.getMyOrders();
      setMyOrders(orders);
    } catch (err) {
      // Token het han hoac loi
      api.logout();
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoading(true);
    try {
      await api.login(loginEmail, loginPassword);
      setIsLoggedIn(true);
      if (redirect) {
        router.push(redirect);
      } else {
        router.refresh();
      }
    } catch (err: any) {
      setLoginError(err.message || 'Sai tài khoản hoặc mật khẩu.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegError('');
    setRegSuccess(false);
    setLoading(true);
    try {
      await api.register({
        email: regEmail,
        password: regPassword,
        full_name: regFullName,
        phone: regPhone
      });
      setRegSuccess(true);
      setLoginEmail(regEmail);
      setLoginPassword(regPassword);
      // Auto login or switch tab
      setTimeout(() => {
        setActiveTab('login');
      }, 1500);
    } catch (err: any) {
      setRegError(err.message || 'Lỗi khi đăng ký tài khoản.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSuccess(false);
    try {
      const updated = await api.updateMe({
        full_name: editName,
        phone: editPhone
      });
      setCurrentUser(updated);
      setProfileSuccess(true);
    } catch (err: any) {
      alert(err.message || 'Lỗi khi cập nhật hồ sơ.');
    }
  };

  const handleLogout = () => {
    api.logout();
    setIsLoggedIn(false);
    setCurrentUser(null);
    setMyOrders([]);
    router.push('/');
    router.refresh();
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return 'text-emerald-300 bg-emerald-500/10 border-emerald-500/20';
      case 'pending':
        return 'text-amber-300 bg-amber-500/10 border-amber-500/20';
      case 'cancelled':
        return 'text-slate-400 bg-white/5 border-white/5';
      default:
        return 'text-rose-300 bg-rose-500/10 border-rose-500/20';
    }
  };

  // RENDER LOGGED IN DASHBOARD
  if (isLoggedIn && currentUser) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col gap-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-white/5 pb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-white">Xin chào, {currentUser.full_name || currentUser.email}</h1>
            <p className="text-slate-400 text-sm mt-1">Quản lý hồ sơ cá nhân và theo dõi dịch vụ đã đăng ký.</p>
          </div>
          <div className="flex gap-3">
            {currentUser.role === 'admin' && (
              <button 
                onClick={() => router.push('/admin')}
                className="secondary-btn bg-purple-500/10 hover:bg-purple-500/20 border-purple-500/30 text-purple-300"
              >
                <Shield className="w-4 h-4" />
                <span>Trang quản trị</span>
              </button>
            )}
            <button onClick={handleLogout} className="secondary-btn text-rose-400 border-rose-500/20 hover:bg-rose-500/5">
              <LogOut className="w-4 h-4" />
              <span>Đăng xuất</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: Profile Form */}
          <div className="md:col-span-1 flex flex-col gap-6">
            <div className="glass-panel p-6">
              <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <UserIcon className="w-5 h-5 text-cyan-400" />
                <span>Thông tin tài khoản</span>
              </h2>

              <form onSubmit={handleUpdateProfile} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-slate-500 font-medium">Địa chỉ Email (Không thể sửa)</label>
                  <input 
                    type="email" 
                    value={currentUser.email} 
                    disabled 
                    className="form-input bg-slate-900/50 text-slate-500 cursor-not-allowed" 
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-slate-400 font-medium">Họ và Tên</label>
                  <input 
                    type="text" 
                    value={editName} 
                    onChange={(e) => setEditName(e.target.value)} 
                    required
                    className="form-input" 
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-slate-400 font-medium">Số điện thoại</label>
                  <input 
                    type="text" 
                    value={editPhone} 
                    onChange={(e) => setEditPhone(e.target.value)} 
                    className="form-input" 
                  />
                </div>

                {profileSuccess && (
                  <div className="text-xs text-emerald-400 font-medium flex items-center gap-1 mt-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Cập nhật thông tin thành công!</span>
                  </div>
                )}

                <button type="submit" className="glow-btn justify-center text-xs py-3 mt-4">
                  Cập nhật hồ sơ
                </button>
              </form>
            </div>
          </div>

          {/* Column 2 & 3: Order History */}
          <div className="md:col-span-2 flex flex-col gap-6">
            <div className="glass-panel p-6">
              <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-purple-400" />
                <span>Lịch sử đơn hàng</span>
              </h2>

              {loading ? (
                <div className="text-slate-500 text-sm py-6 text-center">Đang tải lịch sử đơn hàng...</div>
              ) : myOrders.length === 0 ? (
                <div className="text-slate-500 text-sm py-12 text-center flex flex-col gap-4">
                  <span>Bạn chưa đặt mua dịch vụ nào.</span>
                  <button onClick={() => router.push('/giai-phap')} className="glow-btn text-xs py-2 px-4 max-w-xs mx-auto">
                    Mua dịch vụ ngay
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {myOrders.map((order) => (
                    <div key={order.id} className="border border-white/5 bg-slate-900/10 p-4 rounded-xl flex flex-col gap-4 hover:border-white/10 transition-colors">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-3">
                        <div className="flex flex-col">
                          <span className="font-bold text-white text-sm">{order.order_code}</span>
                          <span className="text-[10px] text-slate-500 mt-0.5">Đặt lúc: {new Date(order.created_at).toLocaleString('vi-VN')}</span>
                        </div>
                        <span className={`text-xs px-2.5 py-0.5 rounded-full border font-semibold ${getStatusBadge(order.status)}`}>
                          {order.status.toUpperCase()}
                        </span>
                      </div>

                      {/* Items */}
                      <div className="flex flex-col gap-2.5">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex justify-between items-center text-xs">
                            <span className="text-slate-300 font-medium">{item.service?.name} (x{item.quantity})</span>
                            <span className="text-white font-bold">{formatPrice(item.total_price)}</span>
                          </div>
                        ))}
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between border-t border-white/5 pt-3 mt-1">
                        <div>
                          <span className="text-[10px] text-slate-500">Tổng thanh toán</span>
                          <div className="font-extrabold text-white text-sm">{formatPrice(order.total_amount)}</div>
                        </div>

                        {order.status === 'pending' && (
                          <button 
                            onClick={() => router.push(`/thanh-toan?orderId=${order.id}`)}
                            className="glow-btn text-[10px] py-1.5 px-4 flex items-center gap-1"
                          >
                            <CreditCard className="w-3.5 h-3.5" />
                            <span>Thanh toán ngay</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // RENDER LOGIN / REGISTER FORMS
  return (
    <div className="max-w-md mx-auto px-6 py-12">
      <div className="glass-panel p-8">
        {/* Tab Selector */}
        <div className="flex border-b border-white/5 mb-8">
          <button
            onClick={() => { setActiveTab('login'); setLoginError(''); }}
            className={`flex-1 pb-4 text-sm font-semibold tracking-wider transition-colors cursor-pointer border-b-2 bg-transparent ${
              activeTab === 'login' 
                ? 'border-cyan-400 text-cyan-400' 
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Đăng nhập
          </button>
          <button
            onClick={() => { setActiveTab('register'); setRegError(''); }}
            className={`flex-1 pb-4 text-sm font-semibold tracking-wider transition-colors cursor-pointer border-b-2 bg-transparent ${
              activeTab === 'register' 
                ? 'border-cyan-400 text-cyan-400' 
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Đăng ký
          </button>
        </div>

        {/* LOGIN FORM */}
        {activeTab === 'login' && (
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-slate-400 font-medium">Địa chỉ Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  placeholder="nhap email cua ban"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                  className="form-input pl-10"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-slate-400 font-medium">Mật khẩu</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                  className="form-input pl-10"
                />
              </div>
            </div>

            {loginError && (
              <p className="text-xs text-rose-400 font-medium">{loginError}</p>
            )}

            <button type="submit" disabled={loading} className="glow-btn justify-center w-full py-3 mt-2">
              {loading ? 'Đang xác thực...' : 'Đăng nhập'}
            </button>
          </form>
        )}

        {/* REGISTER FORM */}
        {activeTab === 'register' && (
          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-slate-400 font-medium">Họ và Tên</label>
              <div className="relative">
                <UserIcon className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Nguyen Van A"
                  value={regFullName}
                  onChange={(e) => setRegFullName(e.target.value)}
                  required
                  className="form-input pl-10"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-slate-400 font-medium">Địa chỉ Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  placeholder="email@example.com"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  required
                  className="form-input pl-10"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-slate-400 font-medium">Số điện thoại</label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="0987654321"
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  className="form-input pl-10"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-slate-400 font-medium">Mật khẩu (Tối thiểu 6 ký tự)</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  required
                  minLength={6}
                  className="form-input pl-10"
                />
              </div>
            </div>

            {regError && (
              <p className="text-xs text-rose-400 font-medium">{regError}</p>
            )}

            {regSuccess && (
              <p className="text-xs text-emerald-400 font-medium">Đăng ký thành công! Đang chuyển hướng...</p>
            )}

            <button type="submit" disabled={loading} className="glow-btn justify-center w-full py-3 mt-2">
              {loading ? 'Đang xử lý...' : 'Đăng ký tài khoản'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function Account() {
  return (
    <Suspense fallback={
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-slate-500 animate-pulse">Đang tải tài khoản...</div>
      </div>
    }>
      <AccountContent />
    </Suspense>
  );
}
