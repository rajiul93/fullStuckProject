import type { Metadata } from 'next';
import { Suspense } from 'react';
import ResumePageClient from './resume-client';

export const metadata: Metadata = {
  title: 'Résumé',
  description:
    'Résumé of Rajiul Islam — MERN stack developer focused on React, Next.js and TypeScript front-end work.',
  alternates: { canonical: '/resume' },
};

const ResumePage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResumePageClient />
    </Suspense>
  );
};

export default ResumePage;
