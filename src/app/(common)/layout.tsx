import type { Metadata } from 'next';
import React from 'react';
import { PortfolioShell } from '@/components/portfolio/shell';

export const metadata: Metadata = {
  title: {
    absolute: 'Rajiul Islam | Front-End Developer',
  },
  description:
    'Portfolio of Rajiul Islam, a MERN Stack Developer focused on frontend engineering with React and Next.js.',
  keywords: [
    'Rajiul Islam',
    'MERN Stack Developer',
    'Frontend Developer',
    'React',
    'Next.js',
    'TypeScript',
    'Portfolio',
  ],
  openGraph: {
    title: 'Rajiul Islam | MERN Developer',
    description:
      'Frontend-focused MERN developer portfolio showcasing projects, blogs, and resume.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Rajiul Islam',
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

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <PortfolioShell>
      <main id="main-content">{children}</main>
    </PortfolioShell>
  );
};

export default PublicLayout;
