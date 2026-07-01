'use client';

export default function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const dim = size === 'sm' ? 20 : size === 'lg' ? 40 : 28;
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem' }}>
      <div className="spinner" style={{ width: dim, height: dim, borderWidth: size === 'lg' ? 3 : 2 }} />
    </div>
  );
}
