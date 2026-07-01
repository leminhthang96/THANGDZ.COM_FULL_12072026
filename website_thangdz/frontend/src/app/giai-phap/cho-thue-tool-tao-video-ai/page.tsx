// frontend/src/app/giai-phap/cho-thue-tool-tao-video-ai/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { api, Service } from '@/lib/api';
import {
  ArrowLeft,
  CheckCircle2,
  ShoppingCart,
  Loader2,
  Zap,
  Clock,
  Settings,
  ChevronDown,
  Video,
  Award,
  TrendingUp,
  Cpu,
  UserCheck,
  Star,
  Users,
  Film,
  Mic,
  Sparkles,
  Palette,
  Rocket,
  Shield,
  Heart,
  Monitor,
  Layers,
  Headphones,
  Check,
  Send,
  AlertCircle,
  User,
  Mail,
  Phone,
  Hash,
  Download,
  Package,
  Key,
  HelpCircle,
  MessageCircle,
} from 'lucide-react';
import Link from 'next/link';

export default function AIPlaygroundTool() {
  const router = useRouter();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [ordering, setOrdering] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

  // Registration form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    zalo: '',
    platform: '',
    note: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());

  useEffect(() => {
    async function fetchService() {
      try {
        const data = await api.getService('cho-thue-tool-tao-video-ai');
        setService(data);
      } catch (err) {
        console.error('Không tìm thấy thông tin dịch vụ:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchService();
  }, []);

  // Scroll reveal observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );

    sectionRefs.current.forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [loading]);

  const registerSection = (id: string, el: HTMLElement | null) => {
    if (el) sectionRefs.current.set(id, el);
  };

  const handleOrder = async () => {
    const targetService = service;
    if (!targetService) {
      alert('Đang tải dữ liệu dịch vụ, vui lòng chờ trong giây lát...');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      router.push(`/tai-khoan?tab=login&redirect=/giai-phap/cho-thue-tool-tao-video-ai`);
      return;
    }

    setOrdering(true);
    try {
      const order = await api.createOrder({
        items: [{ service_id: targetService.id, quantity: 1 }],
        note: `Thuê tool tạo video AI - Gói chuẩn`
      });
      router.push(`/thanh-toan?orderId=${order.id}`);
    } catch (err: any) {
      alert(err.message || 'Lỗi khi tạo đơn hàng. Vui lòng thử lại.');
    } finally {
      setOrdering(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setSubmitError('Vui lòng điền đầy đủ thông tin: Họ tên, Email và Số điện thoại.');
      return;
    }
    setIsSubmitting(true);
    setSubmitError('');
    setSubmitSuccess(false);

    await new Promise(resolve => setTimeout(resolve, 1500));
    setSubmitSuccess(true);
    setIsSubmitting(false);
    setFormData({ name: '', email: '', phone: '', zalo: '', platform: '', note: '' });
  };

  // Target customers
  const targetCustomers = [
    {
      title: "Người Sáng Tạo Nội Dung",
      desc: "Sản xuất video TikTok, YouTube Shorts, Facebook Reels hàng loạt cực nhanh.",
      icon: <Video className="w-5 h-5" />
    },
    {
      title: "Chủ Shop Online",
      desc: "Tạo video giới thiệu, quảng cáo sản phẩm bắt mắt từ hình ảnh sẵn có.",
      icon: <ShoppingCart className="w-5 h-5" />
    },
    {
      title: "Doanh Nghiệp Nhỏ",
      desc: "Xây dựng chiến dịch video marketing chi phí thấp, không cần thuê đội ngũ dựng phim.",
      icon: <TrendingUp className="w-5 h-5" />
    },
    {
      title: "Affiliate & Dropship",
      desc: "Tạo video giới thiệu sản phẩm liên kết nhanh chóng để kéo traffic.",
      icon: <Award className="w-5 h-5" />
    },
    {
      title: "Media Agency",
      desc: "Tối ưu hóa thời gian sản xuất phim, demo ý tưởng video cho đối tác.",
      icon: <Settings className="w-5 h-5" />
    }
  ];

  // Pain points
  const painPoints = [
    {
      emoji: "🎬",
      title: "Tốn nhiều thời gian",
      desc: "Dựng máy tính cả ngày chỉ để cắt video, thêm phụ đề, render... thật là ngày càng nhiều việc."
    },
    {
      emoji: "💸",
      title: "Chi phí lớn",
      desc: "Thuê đội ngũ dựng phim, thuê voice-over, mua nhạc... chi phí cho 1 video có thể lên đến 5-10 triệu."
    },
    {
      emoji: "🤯",
      title: "Kỹ năng phức tạp",
      desc: "Premiere, After Effect, Capcut... phải học học nữa học mãi, mà công cụ lại thay đổi liên tục."
    },
    {
      emoji: "⏰",
      title: "Quá tải nội dung",
      desc: "Phải ra video mới mỗi ngày, mỗi tuần cho TikTok, Shorts, Reels mà không có nhân lực."
    }
  ];

  // Features
  const features = [
    {
      icon: <Sparkles className="w-6 h-6 text-cyan-400" />,
      title: "Tạo Video Từ Prompt/Kịch Bản",
      desc: "Chỉ cần nhập ý tưởng hoặc kịch bản chữ, AI sẽ tự động phân tích và tạo phân cảnh video tương ứng."
    },
    {
      icon: <Layers className="w-6 h-6 text-purple-400" />,
      title: "Định Dạng Đa Nền Tảng",
      desc: "Tối ưu hóa tỷ lệ khung hình 9:16 cho TikTok/Shorts/Reels hoặc 16:9 cho YouTube/Facebook chỉ trong 1 cú click."
    },
    {
      icon: <Mic className="w-6 h-6 text-emerald-400" />,
      title: "Lồng Tiếng AI Đa Giọng Đọc",
      desc: "Tích hợp sẵn hàng chục giọng đọc AI tự nhiên, truyền cảm với nhiều ngôn ngữ và ngữ điệu vùng miền."
    },
    {
      icon: <Monitor className="w-6 h-6 text-amber-400" />,
      title: "Phụ Đề & Caption Tự Động",
      desc: "AI tự động sinh phụ đề (auto-caption) khớp theo giọng nói với nhiều kiểu chữ nghệ thuật bắt mắt."
    },
    {
      icon: <Palette className="w-6 h-6 text-pink-400" />,
      title: "Kho Hình Ảnh & Hiệu Ứng Phong Phú",
      desc: "Áp dụng các hiệu ứng chuyển cảnh mượt mà và tự động ghép ảnh minh họa phù hợp với kịch bản."
    },
    {
      icon: <Rocket className="w-6 h-6 text-rose-400" />,
      title: "Xuất Bản Tốc Độ Cao",
      desc: "Không cần máy tính cấu hình cao. Render trực tiếp trên đám mây siêu tốc trong vòng vài phút."
    }
  ];

  // Benefits
  const benefits = [
    { icon: <CheckCircle2 className="w-5 h-5 text-cyan-400" />, text: "Tài khoản hoặc quyền truy cập tool tạo video AI chất lượng cao theo gói thuê." },
    { icon: <CheckCircle2 className="w-5 h-5 text-cyan-400" />, text: "Tài liệu hướng dẫn sử dụng chi tiết bằng video và hình ảnh." },
    { icon: <CheckCircle2 className="w-5 h-5 text-cyan-400" />, text: "Hỗ trợ cài đặt thông số ban đầu tối ưu cho thiết bị." },
    { icon: <CheckCircle2 className="w-5 h-5 text-cyan-400" />, text: "Hỗ trợ làm mẫu video đầu tiên để bạn hiểu quy trình." },
    { icon: <CheckCircle2 className="w-5 h-5 text-cyan-400" />, text: "Tư vấn cách viết prompt và biên tập kịch bản chuẩn SEO/Viral." },
    { icon: <CheckCircle2 className="w-5 h-5 text-cyan-400" />, text: "Hỗ trợ kỹ thuật 24/7 trực tiếp qua Zalo/Telegram trong suốt thời hạn thuê." },
  ];

  // Stats
  const stats = [
    { value: "10.000+", label: "Video đã tạo", icon: <Film className="w-5 h-5" /> },
    { value: "500+", label: "Khách hàng", icon: <Users className="w-5 h-5" /> },
    { value: "4.9/5", label: "Đánh giá", icon: <Star className="w-5 h-5" /> },
    { value: "<5 phút", label: "Rút ngắn thời gian", icon: <Clock className="w-5 h-5" /> },
  ];

  // Workflow steps
  const workflowSteps = [
    { step: "1", title: "Chọn gói", desc: "Xem chi tiết thông tin gói thuê tool tạo video AI." },
    { step: "2", title: "Đặt mua online", desc: "Nhấn đặt mua trực tiếp trên trang giải pháp này." },
    { step: "3", title: "Khởi tạo đơn hàng", desc: "Hệ thống tự động tạo mã hóa đơn và link thanh toán." },
    { step: "4", title: "Thanh toán an toàn", desc: "Quét mã chuyển khoản ngân hàng (VietQR) theo hướng dẫn." },
    { step: "5", title: "Xác thực tự động", desc: "Hệ thống kiểm tra giao dịch và phê duyệt đơn hàng nhanh chóng." },
    { step: "6", title: "Bàn giao tài khoản", desc: "Nhận tài khoản sử dụng cùng bộ tài liệu hướng dẫn vận hành." },
    { step: "7", title: "Đồng hành & Hỗ trợ", desc: "Nhận hỗ trợ kỹ thuật và tối ưu video trong suốt quá trình thuê." },
  ];

  // Testimonials
  const testimonials = [
    {
      name: "Nguyễn Văn A",
      role: "Chủ Shop Online",
      avatar: "NV",
      content: "Tôi bán hàng online trên TikTok, trước đây phải thuê người dựng video 3 triệu/video. Bây giờ chỉ cần gợi ý ý tưởng, AI tự tạo video rất nhanh. Tiết kiệm được 80% chi phí!",
      rating: 5,
    },
    {
      name: "Trần Thị B",
      role: "Content Creator",
      avatar: "TB",
      content: "Làm kênh YouTube, tôi cần ra video 2-3 lần/tuần. Nhờ tool AI này mà tôi rút ngắn được 70% thời gian sản xuất. Chất lượng video rất OK, khách xem không phân biệt được!",
      rating: 5,
    },
    {
      name: "Lê Văn C",
      role: "Chủ Doanh Nghiệp",
      avatar: "LC",
      content: "Công ty tôi cần quảng cáo sản phẩm liên tục trên Facebook. Tool này giải quyết bài toán sản xuất nội dung hàng loạt cực kỳ hiệu quả. Nhân sự dương thời gian làm nhiều việc khác hơn.",
      rating: 5,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col gap-24 md:gap-28">

      {/* Back link */}
      <div>
        <Link href="/giai-phap" className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-cyan-400 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại danh sách giải pháp</span>
        </Link>
      </div>

      {/* ============================ */}
      {/* 1. HERO SECTION */}
      {/* ============================ */}
      <section
        id="hero"
        ref={(el) => registerSection('hero', el)}
        className={`flex flex-col lg:flex-row items-center justify-between gap-12 relative transition-all duration-1000 ${visibleSections.has('hero') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        {/* Glow backgrounds */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] -z-10"></div>
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-[100px] -z-10"></div>

        {/* Left: Text content */}
        <div className="flex-1 flex flex-col items-start gap-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-xs text-cyan-300 font-semibold uppercase tracking-wider">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>Giải Pháp Content Marketing AI Tốc Độ Cao</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight">
            Tạo Video AI
            <br />
            <span className="text-gradient">Trong 5 Phút</span>
            <br />
            <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-400">Từ Kịch Bản Đến Video Viral</span>
          </h1>

          {/* Subheadline */}
          <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-2xl">
            Không cần máy tính cấu hình cao, không cần học Premiere. Chỉ cần ý tưởng hoặc kịch bản chữ, AI sẽ tự tạo video ngắn, lồng tiếng và phụ đề — sẵn sàng tải lên TikTok, YouTube Shorts, Facebook Reels ngay lập tức.
          </p>

          {/* Trust signals */}
          <div className="flex flex-wrap gap-4 items-center mt-2">
            <button
              onClick={handleOrder}
              disabled={ordering}
              className="glow-btn px-8 py-4 text-sm font-bold flex items-center gap-2 cursor-pointer"
            >
              {ordering ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Đang khởi tạo...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  <span>Thuê tool ngay</span>
                </>
              )}
            </button>
            <a href="#download" className="secondary-btn px-6 py-4 text-sm font-semibold flex items-center gap-2">
              <Download className="w-4 h-4" />
              <span>Tải file ZIP</span>
            </a>
            <a href="#pricing" className="secondary-btn px-6 py-4 text-sm font-semibold flex items-center gap-2">
              <span>Xem bảng giá</span>
              <ChevronDown className="w-4 h-4" />
            </a>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 border-t border-white/5 pt-8 w-full">
            <div className="flex flex-col gap-1">
              <div className="text-2xl font-bold text-white">1080p</div>
              <div className="text-xs text-slate-500">Độ phân giải cao</div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-2xl font-bold text-cyan-400">1 Click</div>
              <div className="text-xs text-slate-500">Tạo video nhanh</div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-2xl font-bold text-white">24/7</div>
              <div className="text-xs text-slate-500">Hỗ trợ kỹ thuật</div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-2xl font-bold text-purple-400">90%</div>
              <div className="text-xs text-slate-500">Giảm chi phí</div>
            </div>
          </div>
        </div>

        {/* Right: Avatar + branding */}
        <div className="flex-1 w-full flex justify-center items-center relative">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative glass-panel overflow-hidden p-3 rounded-2xl max-w-[420px] mx-auto">
              <img
                src="/chandung_bomun_chuan2.png"
                alt="Le Minh Thang (ThangDz)"
                className="w-full h-auto object-cover rounded-xl transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <div className="absolute bottom-6 left-6 right-6 glass-panel p-4 border-white/10 backdrop-blur-md rounded-xl flex items-center gap-3">
                <div className="p-2.5 bg-cyan-500/20 rounded-lg">
                  <UserCheck className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-xs uppercase tracking-wider">Đồng hành bởi</h4>
                  <p className="text-white font-extrabold text-sm mt-0.5">Le Minh Thang (ThangDz.Com)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ */}
      {/* 2. PROBLEM / PAIN POINTS */}
      {/* ============================ */}
      <section
        id="problem"
        ref={(el) => registerSection('problem', el)}
        className={`flex flex-col gap-10 transition-all duration-1000 delay-100 ${visibleSections.has('problem') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="text-center max-w-2xl mx-auto flex flex-col gap-3">
          <span className="text-xs text-rose-400 font-bold uppercase tracking-widest">Vấn đề thực tế</span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-white">
            Bạn Có Đang Gặp Những Điều Này?
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Hầu hết creator và doanh nghiệp đều gặp phải những trường hợp này khi sản xuất nội dung video. Nếu bạn thấy hiện tượng, bạn không đơn độc.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {painPoints.map((pain, idx) => (
            <div key={idx} className="glass-panel p-6 flex gap-5 hover:border-rose-500/20 transition-all duration-300">
              <div className="text-3xl shrink-0">{pain.emoji}</div>
              <div className="flex flex-col gap-2">
                <h3 className="text-white font-bold text-lg">{pain.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{pain.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================ */}
      {/* 3. SOLUTION */}
      {/* ============================ */}
      <section
        id="solution"
        ref={(el) => registerSection('solution', el)}
        className={`flex flex-col lg:flex-row items-center gap-12 transition-all duration-1000 delay-100 ${visibleSections.has('solution') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        {/* Visual: Code terminal */}
        <div className="flex-1 w-full">
          <div className="glass-panel overflow-hidden max-w-lg">
            <div className="flex items-center gap-2 px-4 py-3 bg-white/[0.03] border-b border-white/5">
              <span className="w-3 h-3 rounded-full bg-rose-500"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
              <span className="text-[10px] text-slate-500 font-mono ml-2">ai_video_engine.ts</span>
            </div>
            <div className="p-6 font-mono text-xs leading-relaxed flex flex-col gap-3">
              <p className="text-cyan-400">// Bước 1: Nhập kịch bản</p>
              <p className="text-slate-500">prompt = <span className="text-amber-300">"Video giới thiệu sản phẩm 30s, phong cách cinematic..."</span></p>
              <p className="text-cyan-400">// Bước 2: Chọn giọng đọc</p>
              <p className="text-slate-500">voice = generate_voice(prompt, id=<span className="text-emerald-400">"vi_female_warm"</span>)</p>
              <p className="text-cyan-400">// Bước 3: AI tạo video</p>
              <p className="text-slate-500">video = render(prompt, voice, style=<span className="text-purple-400">"cinematic"</span>)</p>
              <p className="text-cyan-400">// Bước 4: Xuất 1080p</p>
              <p className="text-emerald-400">export("product_promo_1080p.mp4")</p>
              <p className="text-white mt-2 flex items-center gap-2">
                <span className="text-emerald-400">&#10003;</span> Hoàn tất! Video sẵn sàng trong <span className="text-cyan-400 font-bold">4 phút 32 giây</span>
              </p>
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs text-emerald-300 font-semibold uppercase tracking-wider w-fit">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Giải Pháp</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-extrabold text-white leading-tight">
            Một Công Cụ — Giải Quyết Tất Cả
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Thay vì phải thuê nhiều người, mua nhiều công cụ, học nhiều kỹ năng — chỉ cần một gói thuê tool AI là bạn có ngay hệ thống tạo video tự động từ đầu vào đến đầu ra.
          </p>
          <div className="flex flex-col gap-3">
            <div className="flex items-start gap-3 text-sm text-slate-300">
              <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <span>Không cần biết kỹ thuật dựng phim hay chỉnh ảnh</span>
            </div>
            <div className="flex items-start gap-3 text-sm text-slate-300">
              <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <span>Không cần máy tính cấu hình cao, render trên đám mây</span>
            </div>
            <div className="flex items-start gap-3 text-sm text-slate-300">
              <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <span>Từ kịch bản đến video hoàn chỉnh chỉ trong vài phút</span>
            </div>
            <div className="flex items-start gap-3 text-sm text-slate-300">
              <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <span>Hỗ trợ 24/7, hướng dẫn chi tiết từ A đến Z</span>
            </div>
          </div>
          <button onClick={handleOrder} className="glow-btn w-fit px-8 py-4 text-sm font-bold flex items-center gap-2 cursor-pointer mt-2">
            <Zap className="w-4 h-4" />
            <span>Mua License Key</span>
          </button>
        </div>
      </section>

      {/* ============================ */}
      {/* 4. TARGET CUSTOMERS */}
      {/* ============================ */}
      <section
        id="audience"
        ref={(el) => registerSection('audience', el)}
        className={`flex flex-col gap-10 transition-all duration-1000 delay-100 ${visibleSections.has('audience') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="text-center max-w-2xl mx-auto flex flex-col gap-3">
          <span className="text-xs text-cyan-400 font-bold uppercase tracking-widest">Đối tượng</span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-white">
            Phù Hợp Cho Những Ai?
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Dịch vụ của chúng tôi được tối ưu hóa nhằm đơn giản hóa quy trình sản xuất nội dung video cho các nhóm đối tượng cụ thể.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {targetCustomers.map((cust, idx) => (
            <div key={idx} className="glass-panel p-5 flex flex-col gap-4 hover:border-cyan-500/30 transition-all duration-300 text-center items-center">
              <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-cyan-400">
                {cust.icon}
              </div>
              <h3 className="text-white font-bold text-sm">{cust.title}</h3>
              <p className="text-slate-400 text-xs leading-relaxed">{cust.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============================ */}
      {/* 5. FEATURES */}
      {/* ============================ */}
      <section
        id="features"
        ref={(el) => registerSection('features', el)}
        className={`flex flex-col gap-12 transition-all duration-1000 delay-100 ${visibleSections.has('features') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="text-center max-w-2xl mx-auto flex flex-col gap-3">
          <span className="text-xs text-purple-400 font-bold uppercase tracking-widest">Tính năng</span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-white">
            6 Tính Năng Đột Phá Của Tool
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Không cần sẵm máy tính đồ họa khủng hay mất hàng giờ học Premiere. Trải nghiệm sức mạnh AI thế hệ mới:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => (
            <div key={idx} className="glass-panel p-6 flex flex-col gap-4 relative overflow-hidden group hover:border-cyan-500/30 transition-all">
              <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/10 transition-all"></div>
              <div className="p-3 bg-white/5 border border-white/5 w-11 h-11 rounded-lg flex items-center justify-center shrink-0">
                {feat.icon}
              </div>
              <h3 className="text-white font-bold text-base">{feat.title}</h3>
              <p className="text-slate-400 text-xs leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============================ */}
      {/* 6. WHAT YOU GET / BENEFITS */}
      {/* ============================ */}
      <section
        id="benefits"
        ref={(el) => registerSection('benefits', el)}
        className={`flex flex-col lg:flex-row items-start gap-12 transition-all duration-1000 delay-100 ${visibleSections.has('benefits') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        {/* Text */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-xs text-purple-300 font-semibold uppercase tracking-wider w-fit">
            <Heart className="w-4 h-4 text-purple-400" />
            <span>Quyền lợi khách hàng</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-extrabold text-white leading-tight">
            Bạn Sẽ Nhận Được Gì Khi Thuê?
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Chúng tôi cam kết không chỉ cung cấp tài khoản công cụ mà còn đi kèm dịch vụ hỗ trợ đầy đủ để dự án của bạn hoạt động hiệu quả nhất.
          </p>
          <div className="flex flex-col gap-3">
            {benefits.map((b, i) => (
              <div key={i} className="flex items-start gap-3 text-sm text-slate-300 leading-relaxed">
                {b.icon}
                <span>{b.text}</span>
              </div>
            ))}
          </div>
          <button onClick={handleOrder} className="glow-btn w-fit px-8 py-4 text-sm font-bold flex items-center gap-2 cursor-pointer mt-2">
            <ShoppingCart className="w-4 h-4" />
            <span>Đặt mua ngay</span>
          </button>
        </div>

        {/* Stats cards */}
        <div className="flex-1 w-full grid grid-cols-2 gap-5">
          {stats.map((stat, idx) => (
            <div key={idx} className="glass-panel p-6 flex flex-col gap-3 hover:border-cyan-500/20 transition-all text-center items-center">
              <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-400">
                {stat.icon}
              </div>
              <div className="text-2xl font-extrabold text-white">{stat.value}</div>
              <div className="text-xs text-slate-500 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================ */}
      {/* 7. SOCIAL PROOF / TESTIMONIALS */}
      {/* ============================ */}
      <section
        id="testimonials"
        ref={(el) => registerSection('testimonials', el)}
        className={`flex flex-col gap-10 transition-all duration-1000 delay-100 ${visibleSections.has('testimonials') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="text-center max-w-2xl mx-auto flex flex-col gap-3">
          <span className="text-xs text-amber-400 font-bold uppercase tracking-widest">Biểu hiện xã hội</span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-white">
            Khách Hàng Nói Gì Về Tool
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Hiện thực hóa kết quả từ chính những người đã sử dụng dịch vụ của chúng tôi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div key={idx} className="glass-panel p-6 flex flex-col gap-4 hover:border-cyan-500/20 transition-all">
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-slate-300 text-sm leading-relaxed italic">"{t.content}"</p>
              <div className="flex items-center gap-3 mt-auto pt-4 border-t border-white/5">
                <div className="w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold text-xs">
                  {t.avatar}
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">{t.name}</h4>
                  <p className="text-slate-500 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================ */}
      {/* 8. WORKFLOW */}
      {/* ============================ */}
      <section
        id="workflow"
        ref={(el) => registerSection('workflow', el)}
        className={`flex flex-col gap-10 transition-all duration-1000 delay-100 ${visibleSections.has('workflow') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="text-center max-w-2xl mx-auto flex flex-col gap-3">
          <span className="text-xs text-cyan-400 font-bold uppercase tracking-widest">Quy trình</span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-white">
            7 Bước Để Sở Hữu Tool Ngay Hôm Nay
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Các bước đơn giản để sở hữu và bắt đầu vận hành tool tạo video AI ngay trong ngày:
          </p>
        </div>

        <div className="relative">
          {/* Decorative timeline */}
          <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-gradient-to-r from-cyan-500/5 via-cyan-500/30 to-purple-500/5 -translate-y-1/2 hidden lg:block"></div>

          <div className="grid grid-cols-1 lg:grid-cols-7 gap-5">
            {workflowSteps.map((step, idx) => (
              <div key={idx} className="glass-panel p-5 flex flex-col items-center text-center gap-3 relative hover:border-cyan-500/20 transition-all">
                <div className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-extrabold text-sm shrink-0 z-10">
                  {step.step}
                </div>
                <h4 className="text-white font-bold text-sm mt-1">{step.title}</h4>
                <p className="text-slate-400 text-[11px] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ */}
      {/* 9. PRICING */}
      {/* ============================ */}
      <section
        id="pricing"
        ref={(el) => registerSection('pricing', el)}
        className={`flex flex-col items-center gap-10 transition-all duration-1000 delay-100 ${visibleSections.has('pricing') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="text-center max-w-2xl mx-auto flex flex-col gap-3">
          <span className="text-xs text-cyan-400 font-bold uppercase tracking-widest">Bảng giá</span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-white">
            Chi Phí Thuê Tool
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Chi phí thuê gói tối ưu nhất để bắt đầu tạo video bằng trí tuệ nhân tạo.
          </p>
        </div>

        <div className="w-full max-w-md">
          <div className="glass-panel border-cyan-500/30 p-8 flex flex-col gap-6 relative overflow-hidden">
            {/* Hot badge */}
            <div className="absolute top-4 right-4 bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
              <Zap className="w-3 h-3" />
              Khuyên dùng
            </div>

            {/* Original price */}
            <div className="flex items-baseline gap-2">
              <span className="text-slate-500 text-lg line-through">1.500.000 đ</span>
              <span className="bg-rose-500/20 text-rose-300 text-[10px] font-bold px-2 py-0.5 rounded-full">-20%</span>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Gói thuê trọn bộ</span>
              <h3 className="text-2xl font-bold text-white">Thuê Tool Tạo Video AI</h3>
              <div className="flex items-baseline gap-1 mt-2">
                <span className="text-5xl font-extrabold text-white">
                  {service ? formatPrice(service.price) : '1.200.000 đ'}
                </span>
                <span className="text-xs text-slate-500">/ gói tháng</span>
              </div>
            </div>

            <div className="border-t border-white/5 pt-6 flex flex-col gap-3 text-sm text-slate-400">
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-slate-500" /> Thời hạn sử dụng:</span>
                <span className="text-white font-semibold">30 ngày kể từ kích hoạt</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2"><Film className="w-4 h-4 text-slate-500" /> Số lượng video:</span>
                <span className="text-white font-semibold">Không giới hạn xuất file</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2"><Settings className="w-4 h-4 text-slate-500" /> Hỗ trợ cài đặt:</span>
                <span className="text-emerald-400 font-semibold">Miễn phí 100%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-slate-500" /> Cập nhật tính năng:</span>
                <span className="text-cyan-300 font-semibold">Tự động & Miễn phí</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2"><Headphones className="w-4 h-4 text-slate-500" /> Hỗ trợ kỹ thuật:</span>
                <span className="text-purple-300 font-semibold">24/7 Zalo/Telegram</span>
              </div>
            </div>

            <button
              onClick={handleOrder}
              disabled={ordering}
              className="glow-btn justify-center w-full py-4 text-sm font-bold cursor-pointer mt-4"
            >
              {ordering ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Đang xử lý đặt hàng...</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" />
                  <span>Đặt mua & kích hoạt ngay</span>
                </>
              )}
            </button>

            <div className="flex flex-col gap-2 items-center">
              <div className="flex items-center gap-2 text-[10px] text-slate-500">
                <Shield className="w-3 h-3" />
                <span>Giao dịch an toàn được phê duyệt thủ công</span>
              </div>
              <div className="flex items-center gap-4 text-[10px] text-slate-500">
                <span className="flex items-center gap-1"><Check className="w-3 h-3 text-emerald-400" /> Hoàn tiền 7 ngày</span>
                <span className="flex items-center gap-1"><Check className="w-3 h-3 text-emerald-400" /> Bảo mật SSL</span>
                <span className="flex items-center gap-1"><Check className="w-3 h-3 text-emerald-400" /> Hỗ trợ 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ */}
      {/* 10. DOWNLOAD TOOL + LICENSE */}
      {/* ============================ */}
      <section
        id="download"
        ref={(el) => registerSection('download', el)}
        className={`flex flex-col gap-10 transition-all duration-1000 delay-100 ${visibleSections.has('download') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="text-center max-w-2xl mx-auto flex flex-col gap-3">
          <span className="text-xs text-cyan-400 font-bold uppercase tracking-widest">Tải về máy</span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-white">
            Tải Tool Về Máy & Kích Hoạt Bằng License Key
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Tải tool về máy tính (file ZIP), giải nén và nhập License Key để kích hoạt. Không cần internet khi tạo video.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Download tool */}
          <div className="glass-panel p-8 flex flex-col gap-6 border-cyan-500/20">
            <div className="flex items-start gap-4">
              <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl shrink-0">
                <Download className="w-8 h-8 text-cyan-400" />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-white font-bold text-lg">Tải File ZIP Về Máy</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  File ZIP chứa tool tạo video AI. Giải nén và chạy ngay trên máy tính, không cần internet.
                </p>
              </div>
            </div>

            {/* Requirements */}
            <div className="flex flex-col gap-3">
              <h4 className="text-white font-semibold text-sm flex items-center gap-2">
                <Settings className="w-4 h-4 text-slate-500" />
                Yêu cầu hệ thống
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'CPU', value: 'Intel i3 / AMD Ryzen 3+' },
                  { label: 'RAM', value: '8GB trở lên' },
                  { label: 'GPU', value: 'Khuyến nghị có GPU' },
                  { label: 'Disk', value: '5GB trương trình' },
                  { label: 'OS', value: 'Windows 10/11 (64-bit)' },
                  { label: 'Internet', value: 'Chỉ cần khi kích hoạt' },
                ].map((req) => (
                  <div key={req.label} className="flex items-center gap-2 text-xs text-slate-300">
                    <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span className="text-slate-500">{req.label}:</span>
                    <span className="text-slate-300">{req.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* What's inside */}
            <div className="flex flex-col gap-3">
              <h4 className="text-white font-semibold text-sm flex items-center gap-2">
                <Package className="w-4 h-4 text-slate-500" />
                Nội dung file tải về
              </h4>
              <div className="flex flex-col gap-2">
                {[
                  { file: 'ThangDz.AIVideoTool-v2.0.zip', size: '~2.4 GB', desc: 'File cài đặt chính' },
                  { file: 'Huong.dan.cai.dat.pdf', size: '~2 MB', desc: 'Tài liệu hướng dẫn chi tiết' },
                  { file: 'Thu.vien.media.zip', size: '~500 MB', desc: 'Kho hình ảnh, nhạc, hiệu ứng' },
                ].map((f) => (
                  <div key={f.file} className="flex items-center justify-between p-3 bg-white/[0.02] rounded-xl border border-white/5">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-slate-200 text-xs font-mono font-semibold">{f.file}</span>
                      <span className="text-slate-500 text-[10px]">{f.desc}</span>
                    </div>
                    <span className="text-cyan-400 text-[10px] font-mono shrink-0 ml-2">{f.size}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Download button */}
            <a
              href="/downloads/ThangDz.AIVideoTool-v2.0.zip"
              download
              className="glow-btn w-full py-4 text-sm font-bold cursor-pointer flex items-center justify-center gap-2 mt-2"
            >
              <Download className="w-4 h-4" />
              <span>Tải file ZIP về máy</span>
            </a>
            <p className="text-[10px] text-center text-slate-500">
              File được mã hóa & kiểm tra virus trước khi phát hành. Dung lượng ~2.4 GB.
            </p>
          </div>

          {/* Right: License info */}
          <div className="flex flex-col gap-6">
            {/* License purchase card */}
            <div className="glass-panel p-8 flex flex-col gap-6 border-purple-500/20 relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

              <div className="flex items-start gap-4 relative">
                <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-2xl shrink-0">
                  <Key className="w-8 h-8 text-purple-400" />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-white font-bold text-lg">Mua License Key</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Sau khi tải file về, bạn cần mua License Key để kích hoạt tool. Key được kích hoạt theo máy, không giới hạn số video.
                  </p>
                </div>
              </div>

              {/* License tiers */}
              <div className="flex flex-col gap-3">
                {[
                  {
                    days: 30,
                    label: 'Gói Thử 1 Tháng',
                    price: '1.200.000 đ',
                    original: '1.500.000 đ',
                    badge: 'Tiết kiệm 20%',
                    popular: false,
                  },
                  {
                    days: 90,
                    label: 'Gói 3 Tháng',
                    price: '3.000.000 đ',
                    original: '3.600.000 đ',
                    badge: 'Tiết kiệm 17%',
                    popular: true,
                  },
                  {
                    days: 365,
                    label: 'Gói Năm 2025',
                    price: '9.900.000 đ',
                    original: '14.400.000 đ',
                    badge: 'Tiết kiệm 31%',
                    popular: false,
                  },
                ].map((tier) => (
                  <div
                    key={tier.days}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      tier.popular
                        ? 'border-cyan-500/50 bg-cyan-500/5'
                        : 'border-white/5 bg-white/[0.02] hover:border-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {tier.popular && (
                          <div className="bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0">
                            Phổ biến nhất
                          </div>
                        )}
                        <div>
                          <h4 className="text-white font-bold text-sm">{tier.label}</h4>
                          <p className="text-slate-500 text-[10px]">Sử dụng {tier.days} ngày, không giới hạn video</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-0.5">
                        <span className="text-slate-500 text-[10px] line-through">{tier.original}</span>
                        <span className="text-white font-extrabold text-sm">{tier.price}</span>
                        <span className="text-emerald-400 text-[9px] font-bold">{tier.badge}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button onClick={handleOrder} className="glow-btn w-full py-4 text-sm font-bold cursor-pointer flex items-center justify-center gap-2">
                <Zap className="w-4 h-4" />
                <span>Mua License Key Ngay</span>
              </button>

              <div className="flex flex-col gap-2 text-center">
                <div className="flex items-center justify-center gap-4 text-[10px] text-slate-500">
                  <span className="flex items-center gap-1"><Check className="w-3 h-3 text-emerald-400" /> Kích hoạt ngay lập tức</span>
                  <span className="flex items-center gap-1"><Check className="w-3 h-3 text-emerald-400" /> Hoàn tiền 7 ngày</span>
                </div>
                <div className="flex items-center justify-center gap-4 text-[10px] text-slate-500">
                  <span className="flex items-center gap-1"><Shield className="w-3 h-3 text-emerald-400" /> Bảo mật thanh toán</span>
                  <span className="flex items-center gap-1"><MessageCircle className="w-3 h-3 text-emerald-400" /> Hỗ trợ 24/7</span>
                </div>
              </div>
            </div>

            {/* How to activate */}
            <div className="glass-panel p-6 flex flex-col gap-4">
              <h4 className="text-white font-bold text-sm flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-cyan-400" />
                Hướng dẫn kích hoạt
              </h4>
              <div className="flex flex-col gap-3">
                {[
                  { num: '1', title: 'Tải file ZIP về máy', desc: 'Nhấn nút "Tải file ZIP" bên trái để tải tool về máy tính.' },
                  { num: '2', title: 'Giải nén và cài đặt', desc: 'Giải nén file ZIP, chạy file cấu hình (setup.exe) và làm theo hướng dẫn.' },
                  { num: '3', title: 'Nhập License Key', desc: 'Sau khi mua, bạn sẽ nhận được License Key qua email/Zalo. Nhập key vào tool để kích hoạt.' },
                  { num: '4', title: 'Bắt đầu tạo video', desc: 'Đã kích hoạt thành công! Giờ tôi có thể tạo video không giới hạn.' },
                ].map((step) => (
                  <div key={step.num} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold text-xs shrink-0 mt-0.5">
                      {step.num}
                    </div>
                    <div>
                      <h5 className="text-white font-semibold text-xs">{step.title}</h5>
                      <p className="text-slate-500 text-[11px] leading-relaxed mt-0.5">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ */}
      {/* 11. REGISTRATION / PURCHASE FORM */}
      {/* ============================ */}
      <section
        id="register"
        ref={(el) => registerSection('register', el)}
        className={`transition-all duration-1000 delay-100 ${visibleSections.has('register') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 glass-panel overflow-hidden">
            {/* Left: Info */}
            <div className="lg:col-span-2 p-8 flex flex-col gap-6 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 border-b lg:border-b-0 lg:border-r border-white/5">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-xs text-cyan-300 font-semibold uppercase tracking-wider w-fit">
                <Send className="w-4 h-4 text-cyan-400" />
                <span>Tư vấn & Đăng ký</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">
                Đăng Ký Tư Vấn<br />
                <span className="text-gradient">Miễn Phí Ngay</span>
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Điền thông tin bên cạnh, chúng tôi sẽ liên hệ lại trong vòng 30 phút để tư vấn chi tiết về gói thuê phù hợp nhất với nhu cầu của bạn.
              </p>

              <div className="flex flex-col gap-3 mt-2">
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <div className="p-2 bg-cyan-500/10 rounded-lg">
                    <Check className="w-4 h-4 text-cyan-400" />
                  </div>
                  <span>Tư vấn miễn phí, không cám khoản</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <div className="p-2 bg-cyan-500/10 rounded-lg">
                    <Check className="w-4 h-4 text-cyan-400" />
                  </div>
                  <span>Hỗ trợ chọn gói phù hợp với nhu cầu</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <div className="p-2 bg-cyan-500/10 rounded-lg">
                    <Check className="w-4 h-4 text-cyan-400" />
                  </div>
                  <span>Hướng dẫn cài đặt & sử dụng chi tiết</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <div className="p-2 bg-cyan-500/10 rounded-lg">
                    <Check className="w-4 h-4 text-cyan-400" />
                  </div>
                  <span>Liên hệ trong vòng 30 phút</span>
                </div>
              </div>

              {/* Social links */}
              <div className="flex flex-col gap-2 mt-4">
                <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Hoặc liên hệ trực tiếp</span>
                <div className="flex gap-3">
                  <a
                    href="https://zalo.me"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-blue-600/20 border border-blue-500/30 rounded-xl text-blue-300 hover:bg-blue-600/30 transition-colors"
                    title="Zalo"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                    </svg>
                  </a>
                  <a
                    href="https://m.me"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-blue-500/20 border border-blue-500/30 rounded-xl text-blue-300 hover:bg-blue-500/30 transition-colors"
                    title="Messenger"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.37 0 0 4.97 0 11.1c0 3.5 1.7 6.6 4.4 8.7V24l4.3-2.4c1 .26 2 .4 3.1.4 6.63 0 12-4.97 12-11.1S18.63 0 12 0z"/>
                    </svg>
                  </a>
                  <a
                    href="https://t.me"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-cyan-300 hover:bg-cyan-500/20 transition-colors"
                    title="Telegram"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M11.944 0A12 12 0 1 0 24 12 12.013 12.013 0 0 0 11.944 0zm5.091 8.2l-.485 2.276-1.72-1.635-1.158 1.13-1.077-.977-4.33 3.946 5.59 4.553 2.66-2.577 1.046 1.02 2.48-7.217-4.006-3.5z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-3 p-8">
              {submitSuccess ? (
                <div className="flex flex-col gap-4 items-center justify-center text-center py-12">
                  <div className="p-4 bg-emerald-500/20 rounded-full">
                    <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-xl">Gửi yêu cầu thành công!</h3>
                    <p className="text-slate-400 text-sm mt-2 max-w-sm">
                      Cảm ơn bạn đã đăng ký tư vấn. Chúng tôi sẽ liên hệ trong vòng <strong className="text-cyan-300">30 phút</strong> trong giờ hành chính.
                    </p>
                  </div>
                  <button
                    onClick={() => setSubmitSuccess(false)}
                    className="secondary-btn px-6 py-3 text-sm font-semibold cursor-pointer mt-2"
                  >
                    Gửi yêu cầu khác
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
                  <h3 className="text-white font-bold text-lg">Thông tin của bạn</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Họ tên */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                        <User className="w-3 h-3" /> Họ tên <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        placeholder="Nguyễn Văn A"
                        className="form-input text-sm"
                        required
                      />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                        <Mail className="w-3 h-3" /> Email <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        placeholder="email@example.com"
                        className="form-input text-sm"
                        required
                      />
                    </div>

                    {/* Số điện thoại */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                        <Phone className="w-3 h-3" /> Số điện thoại <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleFormChange}
                        placeholder="0987.654.321"
                        className="form-input text-sm"
                        required
                      />
                    </div>

                    {/* Zalo */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                        <Hash className="w-3 h-3" /> Zalo (nếu có)
                      </label>
                      <input
                        type="text"
                        name="zalo"
                        value={formData.zalo}
                        onChange={handleFormChange}
                        placeholder="ID Zalo của bạn"
                        className="form-input text-sm"
                      />
                    </div>
                  </div>

                  {/* Nền tảng chính */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                      Nền tảng chính của bạn
                    </label>
                    <select
                      name="platform"
                      value={formData.platform}
                      onChange={handleFormChange}
                      className="form-input text-sm"
                    >
                      <option value="">-- Chọn nền tảng --</option>
                      <option value="tiktok">TikTok</option>
                      <option value="youtube">YouTube</option>
                      <option value="facebook">Facebook</option>
                      <option value="instagram">Instagram</option>
                      <option value="shopee">Shopee / Lazada</option>
                      <option value="website">Website</option>
                      <option value="khac">Khác</option>
                    </select>
                  </div>

                  {/* Lời nhắn */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                      Lời nhắn (tùy chọn)
                    </label>
                    <textarea
                      name="note"
                      value={formData.note}
                      onChange={handleFormChange}
                      placeholder="VD: Tôi muốn mua gói 3 tháng, máy tính cấu hình AMD Ryzen 7..."
                      className="form-input min-h-[80px] resize-none text-sm"
                      rows={3}
                    />
                  </div>

                  {/* Error */}
                  {submitError && (
                    <div className="flex items-center gap-2 text-rose-400 text-sm bg-rose-500/10 border border-rose-500/20 rounded-xl p-3">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="glow-btn w-full py-4 text-sm font-bold cursor-pointer flex items-center justify-center gap-2 mt-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Đang gửi yêu cầu...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Gửi yêu cầu tư vấn</span>
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-center text-slate-500 leading-relaxed">
                    Cảm ơn bạn! Chúng tôi cam kết bảo mật thông tin cá nhân và chỉ sử dụng để liên hệ tư vấn, không bao giờ bán thông tin với bên thứ ba.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
