'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { adminApi } from './api';
import { useState } from 'react';

export default function AdminNavigation({ email }: { email: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  async function logout() {
    setBusy(true);
    try {
      await adminApi('/api/admin/logout', { method: 'POST' });
      router.replace('/admin/login');
      router.refresh();
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <header className="border-b border-white/10 bg-slate-900">
      <nav
        className="mx-auto flex max-w-6xl flex-wrap items-center gap-5 px-4 py-5 md:px-8"
        aria-label="Admin navigation"
      >
        <Link href="/admin" className="mr-auto text-lg font-bold">
          Portfolio Admin
        </Link>
        {[
          ['/admin', 'Projects'],
          ['/admin/settings', 'Settings'],
        ].map(([href, label]) => (
          <Link
            key={href}
            href={href}
            aria-current={pathname === href ? 'page' : undefined}
            className={pathname === href ? 'text-blue-400' : 'text-slate-300'}
          >
            {label}
          </Link>
        ))}
        <Link href="/" target="_blank" className="text-slate-300">
          View site ↗
        </Link>
        <span className="hidden text-xs text-slate-400 lg:inline">{email}</span>
        <button
          type="button"
          onClick={logout}
          disabled={busy}
          className="rounded-lg border border-white/20 px-3 py-2 text-sm disabled:opacity-50"
        >
          Sign out
        </button>
      </nav>
    </header>
  );
}
