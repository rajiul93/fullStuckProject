import type { Metadata } from 'next';
import { Barlow, Manrope } from 'next/font/google';
import './globals.css';
import './portfolio.css';
import './admin.css';
import { Toaster } from 'sonner';
import Providers from '@/provider/providers';
import { site, siteUrl } from '@/lib/site';

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
  display: 'swap',
});

const barlow = Barlow({
  variable: '--font-barlow',
  subsets: ['latin'],
  weight: ['400', '700'], // or specify the weights you need
});

// OG/Twitter images come from app/opengraph-image.tsx.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: site.title,
    template: '%s | Rajiul Islam',
  },
  description: site.description,
  keywords: site.keywords,
  authors: [{ name: site.name, url: siteUrl() }],
  creator: site.name,
  applicationName: site.name,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  },
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: site.name,
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: site.title,
    description: site.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${barlow.variable} ${manrope.variable} font-primary`}>
        <Providers>{children}</Providers>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
