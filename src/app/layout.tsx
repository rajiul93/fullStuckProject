import type { Metadata } from 'next';
import { Barlow } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';
import Providers from '@/provider/providers';

const barlow = Barlow({
  variable: '--font-barlow',
  subsets: ['latin'],
  weight: ['400', '700'], // or specify the weights you need
});

/** Live site URL for absolute OG/Twitter images (set in Vercel: NEXT_PUBLIC_SITE_URL). */
function siteUrl() {
  const env = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '');
  if (env) return env;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'http://localhost:3000';
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: 'Rajiul Islam | MERN Developer',
    template: '%s | Rajiul Islam',
  },
  description:
    'Portfolio of Rajiul Islam, a MERN Stack Developer focused on frontend engineering with React and Next.js.',
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Rajiul Islam',
    title: 'Rajiul Islam | MERN Developer',
    description:
      'Frontend-focused MERN developer portfolio showcasing projects, blogs, and resume.',
    images: [
      {
        url: '/logo.png',
        width: 512,
        height: 512,
        alt: 'Rajiul Islam',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rajiul Islam | MERN Developer',
    description:
      'Frontend-focused MERN developer portfolio showcasing projects, blogs, and resume.',
    images: ['/logo.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${barlow.variable} font-primary`}>
        <Providers>{children}</Providers>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
