import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency = 'VND'): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatDateShort(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('vi-VN').format(num);
}

export function getStatusColor(status: string): string {
  const map: Record<string, string> = {
    active: 'bg-green-500/10 text-green-400 border-green-500/20',
    inactive: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
    banned: 'bg-red-500/10 text-red-400 border-red-500/20',
    pending: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    published: 'bg-green-500/10 text-green-400 border-green-500/20',
    draft: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
    archived: 'bg-slate-600/10 text-slate-500 border-slate-600/20',
    paid: 'bg-green-500/10 text-green-400 border-green-500/20',
    cancelled: 'bg-red-500/10 text-red-400 border-red-500/20',
    failed: 'bg-red-500/10 text-red-400 border-red-500/20',
    refunded: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    success: 'bg-green-500/10 text-green-400 border-green-500/20',
  };
  return map[status] || 'bg-slate-500/10 text-slate-400 border-slate-500/20';
}

export function getStatusLabel(status: string): string {
  const map: Record<string, string> = {
    active: 'Hoạt động',
    inactive: 'Không hoạt động',
    banned: 'Bị khóa',
    pending: 'Chờ xử lý',
    published: 'Đã xuất bản',
    draft: 'Nháp',
    archived: 'Lưu trữ',
    paid: 'Đã thanh toán',
    cancelled: 'Đã hủy',
    failed: 'Thất bại',
    refunded: 'Đã hoàn tiền',
    success: 'Thành công',
    admin: 'Quản trị',
    user: 'Người dùng',
  };
  return map[status] || status;
}

export function debounce<T extends (...args: any[]) => any>(fn: T, delay: number): T {
  let timer: ReturnType<typeof setTimeout>;
  return ((...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  }) as T;
}
