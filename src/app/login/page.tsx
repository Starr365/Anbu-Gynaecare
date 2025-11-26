'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/services/auth';
import { LoginPayload } from '@/types/api';
import { formatErrorForDisplay, isNetworkError, isAuthError } from '@/libs/error-handler';
import AuthRedirect from '@/components/AuthRedirect';

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
        // Clear any previous errors
        setError('');
        router.push('/dashboard');
      } else {
        setError('Login failed. Please try again.');
      }
    } catch (err: unknown) {
      // Use centralized error handling
      const errorMessage = formatErrorForDisplay(err);
      
      // Provide additional context for specific error types
      if (isAuthError(err)) {
        setError('Invalid email or password. Please try again.');
      } else if (isNetworkError(err)) {
        setError('Network error. Please check your connection and try again.');
      } else {
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthRedirect>
      <div className="min-h-screen bg-linear-to-br from-sand to-rose flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full animate-fade-in">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <Link href="/">
            <Image
              className="mx-auto mb-4 hover:scale-105 transition-transform duration-300"
              src="/anbu logo svg.svg"
              alt="Anbu Gynaecare Logo"
              width={80}
              height={64}
            />
          </Link>
          <h1 className="font-headline text-3xl font-semibold text-text mb-2">
            Welcome Back
          </h1>
          <p className="font-body text-muted">
            Sign in to continue your wellness journey 🌸
          </p>
        </div>

        {/* Card */}
        <div className="bg-glass backdrop-blur-sm rounded-2xl shadow-soft p-8 border border-white/50">
          {error && (
            <div className="mb-6 p-4 bg-accent/10 border border-accent/30 rounded-2xl animate-slide-up">
              <p className="font-body text-sm text-accent text-center">{error}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <label htmlFor="email" className="block font-body text-sm font-medium text-text mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-blush/50 bg-white/50 text-text placeholder-muted/60 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 focus:bg-white transition-all duration-300"
                placeholder="Enter your email"
                autoComplete="email"
                required
                disabled={loading}
              />
            </div>
            
            <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <label htmlFor="password" className="block font-body text-sm font-medium text-text mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-blush/50 bg-white/50 text-text placeholder-muted/60 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 focus:bg-white transition-all duration-300"
                placeholder="Enter your password"
                autoComplete="current-password"
                required
                disabled={loading}
              />
            </div>
            
            <div className="text-right animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <Link href="/forgot-password" className="font-body text-sm text-accent hover:underline transition-colors">
                Forgot Password?
              </Link>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent text-bg font-semibold py-3 px-6 rounded-2xl shadow-soft hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed animate-slide-up"
              style={{ animationDelay: '0.4s' }}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>

        {/* Footer Links */}
        <div className="text-center mt-8 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <p className="font-body text-sm text-muted">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-accent font-semibold hover:underline transition-colors">
              Sign Up
            </Link>
          </p>
          <Link href="/" className="inline-block mt-4 font-body text-sm text-muted hover:text-accent transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
    </AuthRedirect>
  );
}