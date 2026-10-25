'use client';
import { FormEvent, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { adminApi } from './api';

type Settings = {
  accountId: string;
  bucket: string;
  publicUrl: string;
  accessKeyId: string;
  secretAccessKey: string;
  hasCredentials?: boolean;
};
const empty: Settings = {
  accountId: '',
  bucket: '',
  publicUrl: '',
  accessKeyId: '',
  secretAccessKey: '',
};
export default function StorageSettings() {
  const [settings, setSettings] = useState(empty);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [busy, setBusy] = useState('');
  useEffect(() => {
    adminApi<{ settings: Settings | null }>('/api/admin/settings')
      .then(({ settings }) => setSettings({ ...empty, ...settings }))
      .catch((error) => setLoadError(error.message))
      .finally(() => setLoading(false));
  }, []);
  async function save(event: FormEvent) {
    event.preventDefault();
    setBusy('save');
    try {
      await adminApi('/api/admin/settings', {
        method: 'PUT',
        body: JSON.stringify(settings),
      });
      setSettings((value) => ({
        ...value,
        accessKeyId: '',
        secretAccessKey: '',
        hasCredentials: true,
      }));
      toast.success('R2 settings saved.');
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setBusy('');
    }
  }
  async function test() {
    setBusy('test');
    try {
      const data = await adminApi<{ message: string }>(
        '/api/admin/settings/test',
        { method: 'POST', body: JSON.stringify(settings) },
      );
      toast.success(data.message);
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setBusy('');
    }
  }
  if (loading) return <p role="status">Loading settings…</p>;
  if (loadError)
    return (
      <p role="alert" className="text-red-400">
        {loadError}
      </p>
    );
  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold">Storage settings</h1>
      <p className="mt-3 text-muted-foreground">
        Configure Cloudflare R2 for project images. Saved credentials are
        encrypted in your database.
      </p>
      <form
        onSubmit={save}
        className="mt-8 space-y-6 rounded-xl border border-border bg-card p-6"
      >
        {(
          [
            [
              'accountId',
              'Cloudflare account ID',
              'Your 32-character account ID',
            ],
            ['bucket', 'Bucket name', 'portfolio-images'],
            [
              'publicUrl',
              'Public bucket URL / custom domain',
              'https://images.example.com',
            ],
            [
              'accessKeyId',
              'Access key ID',
              settings.hasCredentials
                ? 'Saved — leave blank to keep'
                : 'R2 access key ID',
            ],
            [
              'secretAccessKey',
              'Secret access key',
              settings.hasCredentials
                ? 'Saved — leave blank to keep'
                : 'R2 secret access key',
            ],
          ] as const
        ).map(([key, label, placeholder]) => (
          <label key={key} className="block space-y-2">
            <span className="text-sm font-medium">{label}</span>
            <input
              value={settings[key]}
              onChange={(event) =>
                setSettings({ ...settings, [key]: event.target.value })
              }
              required={
                !settings.hasCredentials ||
                !['accessKeyId', 'secretAccessKey'].includes(key)
              }
              type={
                ['accessKeyId', 'secretAccessKey'].includes(key)
                  ? 'password'
                  : key === 'publicUrl'
                    ? 'url'
                    : 'text'
              }
              autoComplete="off"
              placeholder={placeholder}
              className="w-full rounded-lg border border-input bg-background p-3"
            />
          </label>
        ))}
        <p className="text-sm leading-6 text-muted-foreground">
          Enable public access on the bucket or connect a custom domain. Use an
          R2 API token with Object Read & Write permissions. The connection test
          checks upload and deletion; verify image previews to confirm the
          public URL.
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            disabled={!!busy}
            className="rounded-lg bg-primary text-primary-foreground px-5 py-3 font-medium disabled:opacity-50"
          >
            {busy === 'save' ? 'Saving…' : 'Save settings'}
          </button>
          <button
            type="button"
            onClick={test}
            disabled={!!busy}
            className="rounded-lg border border-input px-5 py-3 disabled:opacity-50"
          >
            {busy === 'test' ? 'Testing…' : 'Test connection'}
          </button>
        </div>
      </form>
    </div>
  );
}
