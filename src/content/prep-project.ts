import type { Project } from '@/type/front/project-data-type';

// Public homepage reviewed on 2026-10-25. Showcase images were supplied by the
// owner; authenticated study tools and paid AI features were not tested.
export const prepProject: Project = {
  id: 'prep-study-platform',
  title: 'Prep — AI Study & Job Exam Preparation',
  description:
    'A Bangla study and job-exam preparation platform with question banks, timed practice, study plans, notes, AI assistance and collaborative learning tools.',
  category: 'large',
  image: '/images/project/prep/prep-thumbnail.png',
  images: [
    {
      id: 'prep-thumbnail',
      url: '/images/project/prep/prep-thumbnail.png',
      name: 'Prep — exam preparation platform showcase',
    },
    {
      id: 'prep-responsive',
      url: '/images/project/prep/prep-responsive.png',
      name: 'Prep — desktop and mobile study space',
    },
    {
      id: 'prep-study-tools',
      url: '/images/project/prep/prep-study-tools.png',
      name: 'Prep — practice, planner and AI assistant showcase',
    },
  ],
  clientLink: 'https://ai-assistant-one-rouge.vercel.app/',
  tags: ['Next.js', 'React', 'Tailwind CSS'],
  features: [
    {
      title: 'Job Exam Question Bank',
      description:
        'Past questions for BCS, primary recruitment and grade 11–20 job examinations, organized by exam.',
    },
    {
      title: 'Timed MCQ & Written Practice',
      description:
        'Custom MCQ sets, timed tests, result review and short-answer exercises with self-assessment.',
    },
    {
      title: 'Study Plans, Tasks & Timers',
      description:
        'Daily tasks, study timers, revision planning and a job-eligibility age countdown.',
    },
    {
      title: 'Organized Notes & Confusion Tracking',
      description:
        'Subject-and-topic notes and a dedicated list for recording and resolving questions while studying.',
    },
    {
      title: 'AI Study Assistant',
      description:
        'Plan-based AI tools described for explanations, image questions and generating question sets from book-page photos.',
    },
    {
      title: 'Focused Video Library',
      description:
        'A study-video experience designed around YouTube lessons without distracting follow-up suggestions.',
    },
    {
      title: 'Vocabulary & Bangla Typing Lab',
      description:
        'Vocabulary practice and Bijoy-based Bangla typing exercises alongside exam preparation.',
    },
    {
      title: 'Job Application Tracking',
      description:
        'Tools for recording applications and tracking their progress through different recruitment stages.',
    },
    {
      title: 'Study Groups & Sharing',
      description:
        'Friend chats, study groups and sharing of notes, tasks and question sets.',
    },
  ],
};
