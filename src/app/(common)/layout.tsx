import type { Metadata } from 'next';
import Footer from '@/components/common-component/footer';
import Navbar from '@/components/common-component/navbar';
import React from 'react';
import FloatingSocialBar from '@/components/common-component/floating-social-bar';

export const metadata: Metadata = {
  title: {
    default: 'Rajiul Islam | MERN Developer',
    template: '%s | Rajiul Islam',
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
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rajiul Islam | MERN Developer',
    description:
      'Frontend-focused MERN developer portfolio showcasing projects, blogs, and resume.',
  },
};

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-teal-800 text-white">
      <Navbar />
      <FloatingSocialBar />
      {children}
      <Footer />
    </main>
  );
};

export default PublicLayout;
