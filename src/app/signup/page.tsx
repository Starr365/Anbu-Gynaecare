'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    // Simulate signup
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-mint to-lavender flex items-center justify-center px-4">
      <div className="bg-bg rounded-2xl shadow-soft max-w-md w-full p-8 animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="font-headline text-3xl font-semibold text-text mb-2">
            Anbu Gynaecare
          </h1>
          <h2 className="font-headline text-2xl font-semibold text-text mb-4">
            Create Your Free Account 🌸
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block font-body text-sm font-medium text-muted mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-muted bg-bg shadow-inner-subtle focus:outline-none focus:ring-2 focus:ring-accent"
              required
            />
          </div>
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
          <div>
            <label htmlFor="confirmPassword" className="block font-body text-sm font-medium text-muted mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-muted bg-bg shadow-inner-subtle focus:outline-none focus:ring-2 focus:ring-accent"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-accent text-bg font-semibold py-3 px-6 rounded-2xl shadow-soft hover:scale-105 transition-transform duration-300"
          >
            Sign Up
          </button>
        </form>
        <div className="text-center mt-6">
          <p className="font-body text-sm text-muted">
            Already have an account?{' '}
            <Link href="/login" className="text-accent hover:underline">
              Log in
            </Link>
          </p>
          <p className="font-body text-xs text-muted mt-4">
            By signing up, you agree to our Terms & Privacy.
          </p>
        </div>
      </div>
    </div>
  );
}