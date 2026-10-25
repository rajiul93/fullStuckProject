'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { adminApi } from '@/components/admin/api';
export function NavUser({ email }: { email: string }) {
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
    <div className="admin-user">
      <Avatar className="size-9 rounded-lg">
        <AvatarFallback className="rounded-lg bg-primary/10 text-xs text-primary">
          {email.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold">Administrator</p>
        <p className="truncate text-[11px] text-muted-foreground">{email}</p>
      </div>
      <button
        type="button"
        aria-label="Sign out"
        title="Sign out"
        disabled={busy}
        onClick={logout}
        className="rounded-md p-2 hover:bg-white/10 disabled:opacity-50"
      >
        {busy ? (
          <LoaderCircle size={17} className="animate-spin" />
        ) : (
          <LogOut size={17} />
        )}
      </button>
    </div>
  );
}
