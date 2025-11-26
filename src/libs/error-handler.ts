/**
 * Comprehensive error handling utility for API errors
 * Handles axios errors, validation errors, and network errors
 */

import { AxiosError } from 'axios';
import { ValidationError } from '@/types/api';

/**
 * Extract error message from various error sources
 * @param error - Unknown error object
 * @returns Formatted error message
 */
export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'object' && error !== null) {
    const errObj = error as Record<string, unknown>;

    // Handle Axios errors
    if (errObj.response && typeof errObj.response === 'object') {
      const response = errObj.response as Record<string, unknown>;
      const data = response.data as Record<string, unknown> | undefined;

      if (data?.message && typeof data.message === 'string') {
        return data.message;
      }

      if (data?.error && typeof data.error === 'string') {
        return data.error;
      }
    }

    // Handle generic message property
    if (errObj.message && typeof errObj.message === 'string') {
      return errObj.message;
    }
  }

  if (typeof error === 'string') {
    return error;
  }

  return 'An unexpected error occurred. Please try again.';
};

/**
 * Get HTTP status code from error
 * @param error - Axios error
 * @returns HTTP status code or 500
 */
export const getStatusCode = (error: unknown): number => {
  if (error instanceof Error) {
    const axiosError = error as AxiosError;
    return axiosError.response?.status || 500;
  }

  if (typeof error === 'object' && error !== null) {
    const errObj = error as Record<string, unknown>;
    if (errObj.response && typeof errObj.response === 'object') {
      const status = (errObj.response as Record<string, unknown>).status;
      if (typeof status === 'number') {
        return status;
      }
    }
  }

  return 500;
};

/**
 * Parse validation errors from API response
 * @param error - Axios error response
 * @returns Array of validation errors
 */
export const parseValidationErrors = (
  error: unknown
): ValidationError[] => {
  if (!(error instanceof Error)) return [];

  const axiosError = error as AxiosError;
  const data = axiosError.response?.data as Record<string, unknown> | undefined;

  if (!data) return [];

  // Handle nested errors array
  if (Array.isArray(data.errors)) {
    return (data.errors as Record<string, unknown>[]).map((err: Record<string, unknown>) => ({
      field: String(err.field ?? 'unknown'),
      message: String(err.message ?? 'Validation error'),
    }));
  }

  // Handle single error message
  if (data.message && typeof data.message === 'string') {
    return [{ field: 'general', message: data.message }];
  }

  return [];
};

/**
 * Check if error is an auth error (401 or 403)
 * @param error - Unknown error
 * @returns True if auth error
 */
export const isAuthError = (error: unknown): boolean => {
  const status = getStatusCode(error);
  return status === 401 || status === 403;
};

/**
 * Check if error is a network error
 * @param error - Unknown error
 * @returns True if network error
 */
export const isNetworkError = (error: unknown): boolean => {
  if (!(error instanceof Error)) return false;
  return (
    error.message.includes('Network') ||
    error.message.includes('ECONNREFUSED') ||
    error.message.includes('ETIMEDOUT')
  );
};

/**
 * Format error for user display
 * @param error - Unknown error
 * @returns User-friendly error message
 */
export const formatErrorForDisplay = (error: unknown): string => {
  const status = getStatusCode(error);
  const message = getErrorMessage(error);

  // Specific status code messages
  if (status === 401 || status === 403) {
    return 'Your session has expired. Please log in again.';
  }

  if (status === 404) {
    return 'The requested resource was not found.';
  }

  if (status === 422) {
    return `Validation error: ${message}`;
  }

  if (status >= 500) {
    return 'Server error. Please try again later.';
  }

  if (isNetworkError(error)) {
    return 'Network error. Please check your connection.';
  }

  return message;
};

/**
 * Handle auth errors and redirect if needed
 * @param error - Unknown error
 * @param onAuthError - Callback for auth errors
 */
export const handleAuthError = (
  error: unknown,
  onAuthError?: () => void
): void => {
  if (isAuthError(error)) {
    // Clear auth tokens
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    // Call callback if provided
    if (onAuthError) {
      onAuthError();
    }
  }
};
