import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio Admin',
  robots: { index: false, follow: false },
};
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-root dark min-h-screen bg-background text-foreground">
      {children}
    </div>
  );
}
