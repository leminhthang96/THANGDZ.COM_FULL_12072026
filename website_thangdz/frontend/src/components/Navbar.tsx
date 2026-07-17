// frontend/src/components/Navbar.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, User, LogOut, Shield } from 'lucide-react';
import { api } from '@/lib/api';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const pathname = usePathname();
  const router = useRouter();

  // Load auth state
  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    setIsLoggedIn(!!token);
    setUserRole(role);
  }, [pathname]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    api.logout();
    setIsLoggedIn(false);
    setUserRole(null);
    setIsOpen(false);
    router.push('/');
    router.refresh();
  };

  const navLinks = [
    { name: 'Trang chủ', path: '/' },
    { name: 'Giới thiệu', path: '/gioi-thieu' },
    { name: 'Dịch vụ', path: '/giai-phap' },
    { name: 'Bài viết', path: '/tin-tuc' },
    { name: 'Hướng dẫn', path: '/huong-dan' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'py-4 bg-slate-950/80 backdrop-blur-md border-b border-white/5 shadow-lg shadow-black/20' 
        : 'py-6 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="font-extrabold text-2xl tracking-tight text-gradient font-sans">
            Lê Minh Thắng
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link 
                  key={link.path} 
                  href={link.path}
                  className={`text-sm font-medium tracking-wide transition-colors hover:text-cyan-400 ${
                    isActive ? 'text-cyan-400 font-semibold' : 'text-slate-300'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-4 border-l border-white/10 pl-6">
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                {userRole === 'admin' && (
                  <Link 
                    href="/admin"
                    className="flex items-center gap-1.5 text-xs bg-purple-500/20 text-purple-300 border border-purple-500/30 px-3 py-1.5 rounded-full hover:bg-purple-500/30 transition-colors"
                  >
                    <Shield className="w-3.5 h-3.5" />
                    <span>Admin</span>
                  </Link>
                )}
                <Link 
                  href="/tai-khoan"
                  className="flex items-center gap-1.5 text-sm text-slate-300 hover:text-cyan-400"
                >
                  <User className="w-4 h-4" />
                  <span>Hồ sơ</span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-1 text-sm text-rose-400 hover:text-rose-300 cursor-pointer bg-transparent border-none"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link href="/tai-khoan?tab=login" className="glow-btn text-xs py-2 px-6">
                Đăng nhập
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-slate-300 hover:text-white focus:outline-none cursor-pointer bg-transparent border-none"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-slate-950/95 border-b border-white/5 backdrop-blur-lg px-6 py-6 flex flex-col gap-6 shadow-2xl">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link 
                  key={link.path} 
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-lg font-medium transition-colors ${
                    isActive ? 'text-cyan-400' : 'text-slate-300'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="border-t border-white/5 pt-6 flex flex-col gap-4">
            {isLoggedIn ? (
              <div className="flex flex-col gap-4">
                {userRole === 'admin' && (
                  <Link 
                    href="/admin"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 text-purple-300"
                  >
                    <Shield className="w-5 h-5" />
                    <span>Admin Dashboard</span>
                  </Link>
                )}
                <Link 
                  href="/tai-khoan"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 text-slate-300"
                >
                  <User className="w-5 h-5" />
                  <span>Trang cá nhân</span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-rose-400 w-full text-left bg-transparent border-none text-lg cursor-pointer"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Đăng xuất</span>
                </button>
              </div>
            ) : (
              <Link 
                href="/tai-khoan?tab=login" 
                onClick={() => setIsOpen(false)}
                className="glow-btn text-center justify-center py-3"
              >
                Đăng nhập
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
