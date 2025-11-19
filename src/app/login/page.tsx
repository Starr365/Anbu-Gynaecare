'use client';

import React, { use, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose to-blush flex items-center justify-center px-4">
      <div className="bg-bg rounded-2xl shadow-soft max-w-md w-full p-8 animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="font-headline text-3xl font-semibold text-text mb-2">
            Anbu Gynaecare
          </h1>
          <h2 className="font-headline text-2xl font-semibold text-text mb-4">
            Welcome Back 💛
          </h2>
        </div>
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
              className="w-full px-4 py-3 rounded-2xl border border-muted bg-bg shadow-inner-subtle focus:outline-none focus:ring-2 focus:ring-accent"
              required
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
              className="w-full px-4 py-3 rounded-2xl border border-muted bg-bg shadow-inner-subtle focus:outline-none focus:ring-2 focus:ring-accent"
              required
            />
          </div>
          <div className="text-right">
            <a href="#" className="font-body text-sm text-accent hover:underline">
              Forgot Password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-accent text-bg font-semibold py-3 px-6 rounded-2xl shadow-soft hover:scale-105 transition-transform duration-300"
          >
            Login
          </button>
        </form>
        <div className="text-center mt-6">
          <p className="font-body text-sm text-muted">
            Don't have an account?{' '}
            <Link href="/signup" className="text-accent hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}