import { redirect } from 'next/navigation';
import { currentAdmin } from '@/lib/server/auth';
import { DashboardShell } from '@/components/admin/dashboard-shell';

export const dynamic = 'force-dynamic';
export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await currentAdmin();
  if (!admin) redirect('/admin/login');
  return <DashboardShell email={admin.email}>{children}</DashboardShell>;
}
