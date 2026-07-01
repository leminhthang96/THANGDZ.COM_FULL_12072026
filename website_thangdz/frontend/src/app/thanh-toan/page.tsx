// frontend/src/app/thanh-toan/page.tsx
'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { api } from '@/lib/api';
import { CreditCard, ArrowLeft, CheckCircle2, ShieldCheck, Loader2 } from 'lucide-react';
import Link from 'next/link';

interface PaymentInfo {
  payment_id: number;
  order_id: number;
  order_code: string;
  amount: number;
  payment_method: string;
  bank_name: string;
  account_no: string;
  account_name: string;
  memo: string;
  qr_url: string;
  status: string;
}

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderIdStr = searchParams.get('orderId');

  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function initPayment() {
      if (!orderIdStr) {
        setError('Thiếu mã hóa đơn đơn hàng.');
        setLoading(false);
        return;
      }
      
      try {
        const orderId = parseInt(orderIdStr);
        // Goi API khoi tao thanh toan bank transfer de lay VietQR link
        const data = await api.createPayment(orderId, 'bank_transfer');
        setPaymentInfo(data);
      } catch (err: any) {
        setError(err.message || 'Lỗi khi khởi tạo phiên thanh toán.');
      } finally {
        setLoading(false);
      }
    }
    initPayment();
  }, [orderIdStr]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
      </div>
    );
  }

  if (error || !paymentInfo) {
    return (
      <div className="max-w-md mx-auto px-6 py-24 text-center flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-rose-400">{error || 'Không tìm thấy thông tin hóa đơn.'}</h1>
        <Link href="/tai-khoan" className="secondary-btn justify-center">
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại Lịch sử đơn hàng</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 flex flex-col gap-8">
      <div>
        <Link href="/tai-khoan" className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-cyan-400 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại tài khoản của bạn</span>
        </Link>
      </div>

      <div className="text-center flex flex-col gap-3">
        <h1 className="text-3xl font-extrabold text-white flex items-center justify-center gap-2">
          <CreditCard className="w-8 h-8 text-cyan-400" />
          <span>Thanh toán đơn hàng</span>
        </h1>
        <p className="text-slate-400 text-sm">Quét mã QR bằng ứng dụng ngân hàng của bạn để hoàn tất đặt hàng.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mt-4 items-start">
        {/* VietQR Display Column */}
        <div className="md:col-span-2 flex flex-col items-center gap-4">
          <div className="glass-panel p-4 bg-white border-white/10 rounded-2xl flex items-center justify-center shadow-xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={paymentInfo.qr_url} 
              alt="Mã QR Chuyển khoản VietQR" 
              className="w-full max-w-[240px] aspect-square object-contain"
            />
          </div>
          <span className="text-[10px] text-slate-500 text-center">
            Mã VietQR tự động sinh chứa đúng số tiền và nội dung chuyển khoản.
          </span>
        </div>

        {/* Bank Account Details Column */}
        <div className="md:col-span-3 flex flex-col gap-6">
          <div className="glass-panel p-6 flex flex-col gap-4">
            <h3 className="text-white font-bold text-base border-b border-white/5 pb-2">Thông tin chuyển khoản</h3>
            
            <div className="flex flex-col gap-3.5 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Ngân hàng nhận:</span>
                <span className="text-white font-bold">{paymentInfo.bank_name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Số tài khoản:</span>
                <span className="text-cyan-400 font-extrabold tracking-wider">{paymentInfo.account_no}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Chủ tài khoản:</span>
                <span className="text-white font-bold">{paymentInfo.account_name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Số tiền:</span>
                <span className="text-white font-extrabold text-base">{formatPrice(paymentInfo.amount)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Nội dung chuyển khoản (Memo):</span>
                <span className="text-purple-300 font-extrabold bg-purple-500/10 px-2.5 py-0.5 rounded border border-purple-500/20">
                  {paymentInfo.memo}
                </span>
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 bg-slate-900/40 flex gap-4 border-l-4 border-cyan-400">
            <ShieldCheck className="w-8 h-8 text-cyan-400 shrink-0 mt-0.5" />
            <div className="flex flex-col gap-1 text-xs text-slate-400 leading-relaxed">
              <h4 className="text-white font-bold">Lưu ý quan trọng:</h4>
              <p>1. Vui lòng giữ nguyên nội dung chuyển khoản để hệ thống tự động nhận dạng đơn hàng nhanh chóng.</p>
              <p>2. Giao dịch sẽ được Admin kiểm duyệt và kích hoạt quyền truy cập dịch vụ trong vòng 5 - 15 phút.</p>
              <p>3. Bạn có thể đóng trang này và kiểm tra trạng thái tại trang cá nhân bất kỳ lúc nào.</p>
            </div>
          </div>

          <Link href="/tai-khoan" className="secondary-btn justify-center py-3">
            <span>Kiểm tra trạng thái tại Trang cá nhân</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Checkout() {
  return (
    <Suspense fallback={
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
