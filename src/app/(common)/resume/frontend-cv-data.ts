import { resumeData } from './resume-data';

export const frontendCvData = {
  ...resumeData,
  profileImage: '/images/rajiul.jpeg',
  careerObjective:
    'To join a forward-thinking engineering team as a Front-End Developer where I can deliver high-performance, user-centric web applications using React.js and Next.js, while continuously growing through modern frontend architecture, clean code practices, and cross-functional collaboration.',
  careerSummary: resumeData.summary,
  coreStrengths: [
    'Scalable UI architecture with React & Next.js',
    'Type-safe development with TypeScript',
    'Performance-focused component design',
    'REST API integration & state management',
    'Responsive, accessible interface delivery',
    'Agile teamwork & deadline ownership',
  ],
};

export type FrontendCvData = typeof frontendCvData;
