'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { registerUser } from '@/services/auth';
import { RegisterPayload } from '@/types/api';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [age, setAge] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validation
      if (!name || !email || !password || !confirmPassword || !age) {
        setError('All fields are required');
        setLoading(false);
        return;
      }

      if (password !== confirmPassword) {
        setError('Passwords do not match');
        setLoading(false);
        return;
      }

      if (password.length < 6) {
        setError('Password must be at least 6 characters long');
        setLoading(false);
        return;
      }

      const ageNum = parseInt(age, 10);
      if (isNaN(ageNum) || ageNum < 13) {
        setError('You must be at least 13 years old');
        setLoading(false);
        return;
      }

      const payload: RegisterPayload = {
        name,
        email,
        password,
        age: ageNum,
      };

      const response = await registerUser(payload);

      if (response.data?.user?.id) {
        router.push('/dashboard');
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (err: unknown) {
      let errorMessage = 'Registration failed. Please try again.';
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
      <div className="mt-8 mb-8 bg-bg rounded-2xl shadow-soft max-w-md w-full p-8 animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="font-headline text-3xl font-semibold text-text mb-2">
            Anbu Gynaecare
          </h1>
          <h2 className="font-headline text-xl font-semibold text-text mb-4">
            Create Your Free Account 🌸
          </h2>
        </div>
        {error && (
          <div className="mb-4 p-3 bg-rose/20 border border-rose rounded-lg">
            <p className="font-body text-sm text-rose">{error}</p>
          </div>
        )}
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
              className="required w-full px-4 py-3 rounded-2xl border border-muted bg-bg shadow-inner-subtle focus:outline-none focus:ring-2 focus:ring-accent"
              required
              disabled={loading}
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
              className="required w-full px-4 py-3 rounded-2xl border border-muted bg-bg shadow-inner-subtle focus:outline-none focus:ring-2 focus:ring-accent"
              required
              disabled={loading}
            />
          </div>
          <div>
            <label htmlFor="age" className="block font-body text-sm font-medium text-muted mb-2">
              Age
            </label>
            <input
              type="number"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="required w-full px-4 py-3 rounded-2xl border border-muted bg-bg shadow-inner-subtle focus:outline-none focus:ring-2 focus:ring-accent"
              required
              disabled={loading}
              min="13"
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
          <div>
            <label htmlFor="confirmPassword" className="block font-body text-sm font-medium text-muted mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="required w-full px-4 py-3 rounded-2xl border border-muted bg-bg shadow-inner-subtle focus:outline-none focus:ring-2 focus:ring-accent"
              required
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent/70 text-bg font-semibold py-3 px-6 rounded-2xl shadow-soft hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
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