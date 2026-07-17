// frontend/src/components/Footer.tsx
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-white/5 bg-slate-950/40 backdrop-blur-sm py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Column */}
        <div className="md:col-span-2 flex flex-col gap-4">
          <Link href="/" className="font-extrabold text-xl tracking-tight text-gradient">
            Lê Minh Thắng
          </Link>
          <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
            Xây dựng thương hiệu cá nhân, cung cấp giải pháp lập trình chất lượng cao và chia sẻ tài liệu học tập lập trình thực chiến.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-4">
          <h4 className="text-white font-semibold text-sm uppercase tracking-wider">Liên kết</h4>
          <ul className="flex flex-col gap-2.5 text-sm text-slate-400">
            <li>
              <Link href="/gioi-thieu" className="hover:text-cyan-400 transition-colors">Giới thiệu</Link>
            </li>
            <li>
              <Link href="/giai-phap" className="hover:text-cyan-400 transition-colors">Dịch vụ</Link>
            </li>
            <li>
              <Link href="/tin-tuc" className="hover:text-cyan-400 transition-colors">Bài viết</Link>
            </li>
            <li>
              <Link href="/huong-dan" className="hover:text-cyan-400 transition-colors">Hướng dẫn</Link>
            </li>
          </ul>
        </div>

        {/* Contact Column */}
        <div className="flex flex-col gap-4">
          <h4 className="text-white font-semibold text-sm uppercase tracking-wider">Liên hệ</h4>
          <ul className="flex flex-col gap-2 text-sm text-slate-400">
            <li>Email: leminhthang7896@gmail.com</li>
            <li>Điện thoại: 0987.654.321</li>
            <li>Địa chỉ: Hà Nội, Việt Nam</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-white/5 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <span>&copy; {currentYear} ThangDz. All rights reserved.</span>
        <div className="flex gap-6">
          <a href="#" className="hover:text-slate-300">Điều khoản sử dụng</a>
          <a href="#" className="hover:text-slate-300">Chính sách bảo mật</a>
        </div>
      </div>
    </footer>
  );
}
