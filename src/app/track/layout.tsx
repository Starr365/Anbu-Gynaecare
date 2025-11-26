import AuthGuard from '@/components/AuthGuard';

export default function TrackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      {children}
    </AuthGuard>
  );
}