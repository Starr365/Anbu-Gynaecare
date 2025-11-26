import AuthGuard from '@/components/AuthGuard';

export default function YouLayout({
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