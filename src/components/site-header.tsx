'use client';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, LockKeyhole } from 'lucide-react';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
export function SiteHeader() {
  const pathname = usePathname();
  return (
    <header className="admin-site-header">
      <div className="flex min-w-0 items-center gap-3">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="h-4" />
        <span className="hidden text-xs text-muted-foreground sm:inline">
          Workspace
        </span>
        <span className="hidden text-muted-foreground sm:inline">/</span>
        <span className="text-sm font-medium">
          {pathname === '/admin/settings' ? 'Storage settings' : 'Projects'}
        </span>
      </div>
      <div className="flex items-center gap-5">
        <span className="hidden items-center gap-1.5 text-[10px] text-muted-foreground sm:flex">
          <LockKeyhole size={12} /> Admin access
        </span>
        <Link
          className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground"
          href="/"
          target="_blank"
          rel="noopener noreferrer"
        >
          View portfolio <ArrowUpRight size={14} />
        </Link>
      </div>
    </header>
  );
}
