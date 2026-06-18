import { Suspense } from 'react';
import ResumePageClient from './resume-client';

const ResumePage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResumePageClient />
    </Suspense>
  );
};

export default ResumePage;
