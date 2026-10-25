'use client';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminApi } from '@/components/admin/api';

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setBusy(true);
    const form = new FormData(event.currentTarget);
    try {
      await adminApi('/api/admin/login', {
        method: 'POST',
        body: JSON.stringify(Object.fromEntries(form)),
      });
      router.replace('/admin');
      router.refresh();
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <form
        onSubmit={submit}
        className="w-full max-w-md space-y-6 rounded-2xl border border-border bg-card p-8"
      >
        <div>
          <p className="mb-2 text-sm text-primary">PORTFOLIO MANAGER</p>
          <h1 className="text-3xl font-bold">Admin sign in</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Manage your projects and Cloudflare storage.
          </p>
        </div>
        <label className="block space-y-2">
          <span>Email</span>
          <input
            type="email"
            name="email"
            autoComplete="username"
            required
            className="w-full rounded-lg border border-input bg-background p-3"
          />
        </label>
        <label className="block space-y-2">
          <span>Password</span>
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            required
            className="w-full rounded-lg border border-input bg-background p-3"
          />
        </label>
        {error && (
          <p role="alert" className="text-sm text-red-400">
            {error}
          </p>
        )}
        <button
          disabled={busy}
          className="w-full rounded-lg bg-primary text-primary-foreground p-3 font-semibold hover:bg-primary/90 disabled:opacity-50"
        >
          {busy ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </main>
  );
}
