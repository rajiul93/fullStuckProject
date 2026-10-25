'use client';
import type { CSSProperties, ReactNode } from 'react';
import { AppSidebar } from '@/components/app-sidebar';
import { SiteHeader } from '@/components/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
export function DashboardShell({
  email,
  children,
}: {
  email: string;
  children: ReactNode;
}) {
  return (
    <SidebarProvider
      className="admin-shell dark"
      style={{ '--sidebar-width': '15.5rem' } as CSSProperties}
    >
      <AppSidebar email={email} variant="inset" />
      <SidebarInset className="admin-inset">
        <SiteHeader />
        <div className="admin-main">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
