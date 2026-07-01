'use client';

import { useState, useCallback } from 'react';
import { useToast } from '@/contexts/ToastContext';

interface UseApiOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (err: Error) => void;
}

export function useApi<T = any>(apiFn: (...args: any[]) => Promise<T>, options: UseApiOptions<T> = {}) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { showToast } = useToast();

  const execute = useCallback(async (...args: any[]) => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiFn(...args);
      setData(result);
      options.onSuccess?.(result);
      return result;
    } catch (err: any) {
      const error = err instanceof Error ? err : new Error(err?.message || 'Lỗi không xác định');
      setError(error);
      options.onError?.(error);
      showToast(error.message, 'error');
      return null;
    } finally {
      setLoading(false);
    }
  }, [apiFn, options, showToast]);

  return { data, loading, error, execute };
}

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useState(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  });

  return debouncedValue;
}
