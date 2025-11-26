'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/services/auth';
import { LoginPayload } from '@/types/api';
import { formatErrorForDisplay, isNetworkError, isAuthError } from '@/libs/error-handler';
import AuthRedirect from '@/components/AuthRedirect';
import { motion } from 'framer-motion';

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

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <AuthRedirect>
      <motion.div
        className="min-h-screen bg-linear-to-br from-sand to-rose flex items-center justify-center px-4 py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-md w-full">
          {/* Logo and Header */}
          <motion.div className="text-center mb-8" variants={itemVariants}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/">
                <Image
                  className="mx-auto mb-4"
                  src="/anbu logo svg.svg"
                  alt="Anbu Gynaecare Logo"
                  width={80}
                  height={64}
                />
              </Link>
            </motion.div>
            <motion.h1
              className="font-headline text-3xl font-semibold text-text mb-2"
              variants={itemVariants}
            >
              Welcome Back
            </motion.h1>
            <motion.p
              className="font-body text-muted"
              variants={itemVariants}
            >
              Sign in to continue your wellness journey 🌸
            </motion.p>
          </motion.div>

          {/* Card */}
          <motion.div
            className="bg-glass backdrop-blur-sm rounded-2xl shadow-soft p-8 border border-white/50"
            variants={itemVariants}
          >
            {error && (
              <motion.div
                className="mb-6 p-4 bg-accent/10 border border-accent/30 rounded-2xl"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <p className="font-body text-sm text-accent text-center">{error}</p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <motion.div variants={itemVariants}>
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
              </motion.div>

              <motion.div variants={itemVariants}>
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
              </motion.div>

              <motion.div className="text-right" variants={itemVariants}>
                <Link href="/forgot-password" className="font-body text-sm text-accent hover:underline transition-colors">
                  Forgot Password?
                </Link>
              </motion.div>

              <motion.button
                type="submit"
                disabled={loading}
                className="w-full bg-accent text-bg font-semibold py-3 px-6 rounded-2xl shadow-soft disabled:opacity-50 disabled:cursor-not-allowed"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? 'Logging in...' : 'Login'}
              </motion.button>
            </form>
          </motion.div>

          {/* Footer Links */}
          <motion.div className="text-center mt-8" variants={itemVariants}>
            <p className="font-body text-sm text-muted">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="text-accent font-semibold hover:underline transition-colors">
                Sign Up
              </Link>
            </p>
            <Link href="/" className="inline-block mt-4 font-body text-sm text-muted hover:text-accent transition-colors">
              ← Back to Home
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </AuthRedirect>
  );
}