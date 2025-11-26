'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { registerUser } from '@/services/auth';
import { RegisterPayload } from '@/types/api';
import { formatErrorForDisplay, parseValidationErrors, isNetworkError } from '@/libs/error-handler';
import { validatePassword, getPasswordErrorMessage } from '@/utils/passwordValidation';
import AuthRedirect from '@/components/AuthRedirect';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [age, setAge] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setPasswordError('');
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

      // Validate password strength
      const passwordValidation = validatePassword(password);
      if (!passwordValidation.isValid) {
        setError(getPasswordErrorMessage(passwordValidation));
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
        // Clear any previous errors
        setError('');
        setPasswordError('');
        router.push('/dashboard');
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (err: unknown) {
      // Try to parse validation errors first
      const validationErrors = parseValidationErrors(err);
      if (validationErrors.length > 0) {
        const firstError = validationErrors[0];
        setError(`${firstError.field}: ${firstError.message}`);
      } else {
        // Use centralized error handling
        const errorMessage = formatErrorForDisplay(err);
        
        // Provide context for specific error types
        if (isNetworkError(err)) {
          setError('Network error. Please check your connection and try again.');
        } else if (errorMessage.includes('email')) {
          setError('This email is already registered. Please try logging in instead.');
        } else {
          setError(errorMessage);
        }
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
        <div className="text-center mb-6">
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
            Join Anbu
          </h1>
          <p className="font-body text-muted">
            Start your wellness journey today 🌸
          </p>
        </div>

        {/* Card */}
        <div className="bg-glass backdrop-blur-sm rounded-2xl shadow-soft p-8 border border-white/50">
          {error && (
            <div className="mb-6 p-4 bg-accent/10 border border-accent/30 rounded-2xl animate-slide-up">
              <p className="font-body text-sm text-accent text-center">{error}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <label htmlFor="name" className="block font-body text-sm font-medium text-text mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-blush/50 bg-white/50 text-text placeholder-muted/60 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 focus:bg-white transition-all duration-300"
                placeholder="Enter your name"
                autoComplete="name"
                required
                disabled={loading}
              />
            </div>
            
            <div className="animate-slide-up" style={{ animationDelay: '0.15s' }}>
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
              <label htmlFor="age" className="block font-body text-sm font-medium text-text mb-2">
                Age
              </label>
              <input
                type="number"
                id="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-blush/50 bg-white/50 text-text placeholder-muted/60 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 focus:bg-white transition-all duration-300"
                placeholder="Enter your age"
                autoComplete="off"
                required
                disabled={loading}
                min="13"
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="animate-slide-up" style={{ animationDelay: '0.25s' }}>
                <label htmlFor="password" className="block font-body text-sm font-medium text-text mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => {
                    const newPassword = e.target.value;
                    setPassword(newPassword);

                    // Validate password strength in real-time
                    if (newPassword) {
                      const validation = validatePassword(newPassword);
                      setPasswordError(validation.isValid ? '' : getPasswordErrorMessage(validation));
                    } else {
                      setPasswordError('');
                    }

                    // Check password confirmation match
                    if (confirmPassword && newPassword !== confirmPassword) {
                      setConfirmPasswordError('Passwords do not match');
                    } else {
                      setConfirmPasswordError('');
                    }
                  }}
                  className="w-full px-4 py-3 rounded-2xl border border-blush/50 bg-white/50 text-text placeholder-muted/60 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 focus:bg-white transition-all duration-300"
                  placeholder="Create password"
                  autoComplete="new-password"
                  required
                  disabled={loading}
                />
                {passwordError && (
                  <p className="font-body text-sm text-accent mt-1">{passwordError}</p>
                )}
              </div>
              
              <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
                <label htmlFor="confirmPassword" className="block font-body text-sm font-medium text-text mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (e.target.value !== password) {
                      setConfirmPasswordError('Passwords do not match');
                    } else {
                      setConfirmPasswordError('');
                    }
                  }}
                  className="w-full px-4 py-3 rounded-2xl border border-blush/50 bg-white/50 text-text placeholder-muted/60 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 focus:bg-white transition-all duration-300"
                  placeholder="Confirm password"
                  autoComplete="new-password"
                  required
                  disabled={loading}
                />
                {confirmPasswordError && (
                  <p className="font-body text-sm text-accent mt-1">{confirmPasswordError}</p>
                )}
              </div>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent text-bg font-semibold py-3 px-6 rounded-2xl shadow-soft hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed animate-slide-up mt-2"
              style={{ animationDelay: '0.35s' }}
            >
              {loading ? 'Creating Account...' : 'Get Started Free'}
            </button>
          </form>
          
          <p className="font-body text-xs text-muted text-center mt-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            By signing up, you agree to our Terms & Privacy.
          </p>
        </div>

        {/* Footer Links */}
        <div className="text-center mt-6 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <p className="font-body text-sm text-muted">
            Already have an account?{' '}
            <Link href="/login" className="text-accent font-semibold hover:underline transition-colors">
              Log in
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