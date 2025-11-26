'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useApi';

interface AuthRedirectProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export default function AuthRedirect({ children, redirectTo = '/dashboard' }: AuthRedirectProps) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, loading, router, redirectTo]);

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    );
  }

  // Don't render anything if authenticated (will redirect)
  if (isAuthenticated) {
    return null;
  }

  // Render login/register content if not authenticated
  return <>{children}</>;
}