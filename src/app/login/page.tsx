'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/services/auth';
import { LoginPayload } from '@/types/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!email || !password) {
        setError('Email and password are required');
        setLoading(false);
        return;
      }

      const payload: LoginPayload = { email, password };
      const response = await loginUser(payload);

      if (response.data?.user?.id) {
        router.push('/dashboard');
      } else {
        setError('Login failed. Please try again.');
      }
    } catch (err: unknown) {
      let errorMessage = 'Login failed. Please try again.';
      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === 'object' && err !== null) {
        const errObj = err as Record<string, unknown>;
        if (errObj.response && typeof errObj.response === 'object') {
          const data = (errObj.response as Record<string, unknown>).data;
          if (data && typeof data === 'object' && 'message' in data) {
            errorMessage = data.message as string;
          }
        }
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-accent/20 to-blush flex items-center justify-center px-4">
      <div className="bg-bg rounded-2xl shadow-soft max-w-md w-full p-8 animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="font-headline text-3xl font-semibold text-text mb-2">
            Anbu Gynaecare
          </h1>
          <h2 className="font-headline text-2xl font-semibold text-text mb-4">
            Welcome Back🌸
          </h2>
        </div>
        {error && (
          <div className="mb-4 p-3 bg-rose/20 border border-rose rounded-lg">
            <p className="font-body text-sm text-rose">{error}</p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block font-body text-sm font-medium text-muted mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="required w-full px-4 py-3 rounded-2xl border border-muted bg-bg shadow-inner-subtle focus:outline-none focus:ring-2 focus:ring-accent"
              required
              disabled={loading}
            />
          </div>
          <div>
            <label htmlFor="password" className="block font-body text-sm font-medium text-muted mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="required w-full px-4 py-3 rounded-2xl border border-muted bg-bg shadow-inner-subtle focus:outline-none focus:ring-2 focus:ring-accent"
              required
              disabled={loading}
            />
          </div>
          <div className="text-right">
            <Link href="/forgot-password" className="font-body text-sm text-accent hover:underline">
              Forgot Password?
            </Link>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent/70 text-bg font-semibold py-3 px-6 rounded-2xl shadow-soft hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="text-center mt-6">
          <p className="font-body text-sm text-muted">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-accent hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}