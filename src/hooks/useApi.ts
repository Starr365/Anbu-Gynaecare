/**
 * Custom hooks for data fetching and state management
 * Handles loading states, error handling, caching, and retries
 */

'use client';

import { useState, useCallback, useEffect } from 'react';
import { formatErrorForDisplay } from '@/libs/error-handler';

/**
 * Generic hook for async data fetching
 * Handles loading, error states, and automatic retries
 */
interface UseFetchOptions {
  /** Automatically fetch on mount */
  immediate?: boolean;
  /** Number of times to retry on failure */
  retry?: number;
  /** Delay between retries in ms */
  retryDelay?: number;
}

interface UseFetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  retry: () => Promise<void>;
}

export function useFetch<T>(
  fetchFn: () => Promise<T>,
  options: UseFetchOptions = {}
): UseFetchState<T> {
  const { immediate = true, retry: maxRetries = 2, retryDelay = 1000 } = options;

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetchFn();
      setData(result);
      setRetryCount(0);
    } catch (err: unknown) {
      const errorMsg = formatErrorForDisplay(err);

      if (retryCount < maxRetries) {
        // Wait before retry
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        setRetryCount(retryCount + 1);
        return execute();
      }

      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  }, [fetchFn, retryCount, maxRetries, retryDelay]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  const retry = useCallback(async () => {
    setRetryCount(0);
    await execute();
  }, [execute]);

  return { data, loading, error, retry };
}

/**
 * Hook for handling form submissions with loading and error states
 */
interface UseAsyncSubmitOptions {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

interface UseAsyncSubmitState<T> {
  loading: boolean;
  error: string | null;
  submit: (submitFn: () => Promise<T>) => Promise<T | undefined>;
  clearError: () => void;
}

export function useAsyncSubmit<T>(
  options: UseAsyncSubmitOptions = {}
): UseAsyncSubmitState<T> {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = useCallback(
    async (submitFn: () => Promise<T>): Promise<T | undefined> => {
      setLoading(true);
      setError(null);

      try {
        const result = await submitFn();
        options.onSuccess?.();
        return result;
      } catch (err: unknown) {
        const errorMsg = formatErrorForDisplay(err);
        setError(errorMsg);
        options.onError?.(errorMsg);
      } finally {
        setLoading(false);
      }
    },
    [options]
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return { loading, error, submit, clearError };
}

/**
 * Hook for managing paginated data
 */
interface UsePaginationState<T> {
  items: T[];
  currentPage: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
  nextPage: () => Promise<void>;
  prevPage: () => Promise<void>;
  goToPage: (page: number) => Promise<void>;
}

export function usePagination<T>(
  fetchFn: (page: number) => Promise<{ data: T[]; total: number; pageSize: number }>,
  pageSize = 10
): UsePaginationState<T> {
  const [items, setItems] = useState<T[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPage = useCallback(
    async (page: number) => {
      setLoading(true);
      setError(null);

      try {
        const { data, total } = await fetchFn(page);
        setItems(data);
        setCurrentPage(page);
        setTotalPages(Math.ceil(total / pageSize));
      } catch (err: unknown) {
        setError(formatErrorForDisplay(err));
      } finally {
        setLoading(false);
      }
    },
    [fetchFn, pageSize]
  );

  const nextPage = useCallback(async () => {
    if (currentPage < totalPages) {
      await fetchPage(currentPage + 1);
    }
  }, [currentPage, totalPages, fetchPage]);

  const prevPage = useCallback(async () => {
    if (currentPage > 1) {
      await fetchPage(currentPage - 1);
    }
  }, [currentPage, fetchPage]);

  const goToPage = useCallback(
    async (page: number) => {
      if (page >= 1 && page <= totalPages) {
        await fetchPage(page);
      }
    },
    [totalPages, fetchPage]
  );

  useEffect(() => {
    fetchPage(1);
  }, [fetchPage]);

  return {
    items,
    currentPage,
    totalPages,
    loading,
    error,
    nextPage,
    prevPage,
    goToPage,
  };
}

/**
 * Hook for managing debounced search
 */
interface UseSearchState<T> {
  results: T[];
  loading: boolean;
  error: string | null;
  search: (query: string) => void;
}

export function useSearch<T>(
  searchFn: (query: string) => Promise<T[]>,
  debounceMs = 500
): UseSearchState<T> {
  const [results, setResults] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const search = useCallback(
    (query: string) => {
      // Clear previous timeout
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      if (!query.trim()) {
        setResults([]);
        return;
      }

      // Set new timeout
      const newTimeoutId = setTimeout(async () => {
        setLoading(true);
        setError(null);

        try {
          const data = await searchFn(query);
          setResults(data);
        } catch (err: unknown) {
          setError(formatErrorForDisplay(err));
        } finally {
          setLoading(false);
        }
      }, debounceMs);

      setTimeoutId(newTimeoutId);
    },
    [searchFn, debounceMs, timeoutId]
  );

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  return { results, loading, error, search };
}

/**
 * Hook for managing authentication state
 */
interface UseAuthState {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  checkAuth: () => Promise<void>;
}

export function useAuth(): UseAuthState {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const checkAuth = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Check if token exists
      const token =
        typeof window !== 'undefined'
          ? localStorage.getItem('accessToken')
          : null;

      setIsAuthenticated(!!token);

      // Optionally verify token validity with API
      // const user = await getUser();
      // setIsAuthenticated(!!user);
    } catch (err: unknown) {
      setError(formatErrorForDisplay(err));
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return { isAuthenticated, loading, error, checkAuth };
}

/**
 * Hook for managing form state with validation
 */
interface UseFormState<T extends Record<string, unknown>> {
  values: T;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  setValue: (field: keyof T, value: unknown) => void;
  setError: (field: keyof T, error: string) => void;
  setTouched: (field: keyof T, value: boolean) => void;
  reset: () => void;
}

export function useForm<T extends Record<string, unknown>>(
  initialValues: T
): UseFormState<T> {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const setValue = useCallback((field: keyof T, value: unknown) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  }, []);

  const setError = useCallback((field: keyof T, error: string) => {
    setErrors((prev) => ({ ...prev, [field]: error }));
  }, []);

  const setFieldTouched = useCallback((field: keyof T, value: boolean) => {
    setTouched((prev) => ({ ...prev, [field]: value }));
  }, []);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    setValue,
    setError,
    setTouched: setFieldTouched,
    reset,
  };
}
