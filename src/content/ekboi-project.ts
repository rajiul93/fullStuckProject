import type { Project } from '@/type/front/project-data-type';

// Reviewed against the public homepage on 2026-10-25. Feature descriptions
// describe the product's public overview; no private learning account was used.
export const ekboiProject: Project = {
  id: '6',
  title: 'Ekboi — Adaptive Learning & Exam Preparation',
  description:
    'A Bangla learning platform for SSC, HSC, university admission and job-exam preparation, combining question practice, spaced revision, learning feedback and study resources.',
  category: 'large',
  image: '/images/project/ekboi-thumbnail.png',
  images: [
    {
      id: 'ekboi-thumbnail',
      url: '/images/project/ekboi-thumbnail.png',
      name: 'Ekboi — desktop and mobile showcase',
    },
    {
      id: 'ekboi-desktop',
      url: '/images/project/ekboi-desktop.png',
      name: 'Ekboi — current desktop homepage',
    },
    {
      id: 'ekboi-learning',
      url: '/images/project/ekboi-learning.png',
      name: 'Ekboi — learning and revision overview',
    },
    {
      id: 'ekboi-mobile',
      url: '/images/project/ekboi-mobile.png',
      name: 'Ekboi — current mobile homepage',
    },
  ],
  clientLink: 'https://www.ekboi.com/',
  tags: ['Next.js', 'React', 'Tailwind CSS'],
  features: [
    {
      title: 'Bangla Exam Preparation',
      description:
        'The platform introduces study paths for SSC, HSC, university admission and job examinations in a Bangla-first interface.',
    },
    {
      title: 'MCQ, CQ & Short-Answer Practice',
      description:
        'The public practice overview presents chapter-based MCQs, mixed quizzes, creative questions and short-answer exercises.',
    },
    {
      title: 'Spaced Revision & Mistake Review',
      description:
        'A mistake-notebook workflow brings incorrect answers back for revision, with intervals adjusted as learners practise.',
    },
    {
      title: 'Step-by-Step Creative Question Feedback',
      description:
        'The product describes separate feedback for each part of a creative question, explaining the steps behind an answer.',
    },
    {
      title: 'Learning Diagnosis & Feedback',
      description:
        'Public examples show feedback cards that identify strengths, misconceptions and topics needing further practice.',
    },
    {
      title: 'Study Resources & Focus Sessions',
      description:
        'The study-room overview combines topic notes, video lessons, study reminders and a Pomodoro-based focus approach.',
    },
    {
      title: 'Printable Revision Notes',
      description:
        'The public feature overview describes downloading a mistake list as a PDF for printing and offline review.',
    },
    {
      title: 'Progress Reports & Peer Challenges',
      description:
        'The platform presents weekly learning reports for parents and question challenges with friends.',
    },
  ],
};
