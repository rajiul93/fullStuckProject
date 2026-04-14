import Link from 'next/link';

export default function PlaygroundMediaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-blue-50">
      <header className="border-b bg-background px-4 py-3">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 text-sm">
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/" className="font-medium text-primary hover:underline">
              Home
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="font-medium">Media playground</span>
            <span className="text-muted-foreground">·</span>
            <Link
              href="/login"
              className="text-primary hover:underline"
            >
              Login
            </Link>
            <span className="text-muted-foreground">·</span>
            <Link
              href="/dashboard/playground/media"
              className="text-primary hover:underline"
            >
              Dashboard view
            </Link>
          </div>
          <p className="text-muted-foreground">
            লিস্ট দেখা যায় লগইন ছাড়াও। আপলোড / এডিট / ডিলিট করতে লগইন করে{' '}
            <code className="rounded bg-muted px-1">auth_token</code> কুকি লাগবে।
          </p>
        </div>
      </header>
      {children}
    </div>
  );
}
