import type { Project } from '@/type/front/project-data-type';

// Written on 2026-11-06 from the four Aplinto repositories (backend feature docs,
// public-site copy and READMEs) and the live site. Images are added by the owner
// from the admin panel, so the project is imported as an unpublished draft.
export const aplintoProject: Project = {
  id: 'aplinto',
  title:
    'Aplinto — AI Customer Support SaaS for WhatsApp, Messenger, Instagram & Gmail',
  description:
    'Aplinto is a multi-tenant SaaS that answers a business’s customer messages automatically. A business connects its WhatsApp, Facebook Messenger, Instagram and Gmail accounts, teaches the AI about its products, prices and policies once, and every customer gets a reply in seconds, day or night. The AI answers only from what the business taught it; when it does not know, the customer receives the business’s own fallback message and the question is saved so the owner can answer it once and the AI learns. The platform is four connected apps: a NestJS API, a seller dashboard where businesses run their inbox and AI, a super admin dashboard for the platform team, and a Next.js marketing site with Stripe checkout.',
  category: 'large',
  image: '',
  images: [],
  published: false,
  clientLink: 'https://aplinto.ai/',
  tags: [
    'NestJS',
    'Next.js',
    'React',
    'TypeScript',
    'PostgreSQL',
    'Prisma',
    'Redis',
    'BullMQ',
    'Socket.IO',
    'OpenAI',
    'WhatsApp Cloud API',
    'Stripe',
    'Tailwind CSS',
    'TanStack Query',
    'Zustand',
    'Zod',
  ],
  features: [
    {
      title: 'One Inbox for Every Channel',
      description:
        'WhatsApp (through Meta’s official Cloud API), Facebook Messenger, Instagram DMs and Gmail arrive in a single inbox with channel labels, unread counts, search, filters and full conversation history.',
    },
    {
      title: 'AI Replies That Never Make Things Up',
      description:
        'OpenAI-powered replies use only the business’s own knowledge base, in the customer’s language and the tone the owner picks (friendly, formal or short). Responses are checked against a strict schema, so the AI either answers from real data or admits it does not know.',
    },
    {
      title: 'Unanswered Questions Loop',
      description:
        'When the AI cannot answer, the customer gets the business’s fallback message and the owner gets a note. Answering it once adds the reply to the knowledge base, so the same question is handled automatically next time.',
    },
    {
      title: 'Human Takeover',
      description:
        'The owner can pause the AI for any conversation, reply personally and hand it back with one click, or switch AI off for the whole account.',
    },
    {
      title: 'Learn From the Business Website',
      description:
        'Paste a website link and Aplinto scans the page into editable text. Nothing reaches the AI until the owner reviews and approves it, and a rescan keeps the old approved version live until the update is approved.',
    },
    {
      title: 'Voice, Image & PDF Understanding',
      description:
        'Voice notes are transcribed, photos and screenshots are understood, and WhatsApp PDFs are read, so the AI can answer questions customers send as media rather than text.',
    },
    {
      title: 'Tour Catalog Integration',
      description:
        'Travel businesses connect their tour website API. The AI looks up real tours, starting prices and durations, guides customers like a travel consultant and sends tour recommendation cards on WhatsApp, Messenger and Instagram.',
    },
    {
      title: 'Facebook Comment Replies',
      description:
        'Comments on the business’s Facebook posts are answered privately in Messenger, turning public questions into direct conversations.',
    },
    {
      title: 'Real-Time Dashboard',
      description:
        'New messages, delivery and read status appear instantly over Socket.IO, and the dashboard shows when each channel’s reply window is open.',
    },
    {
      title: 'Subscriptions & AI Usage Billing',
      description:
        'Businesses buy a plan through Stripe on the marketing site, see their AI usage at any time, and change or cancel the plan themselves.',
    },
    {
      title: 'Super Admin Platform',
      description:
        'The platform team manages businesses, plans, finance, support chat, admin roles and permissions, and AI spending tracked from OpenAI’s usage data, with audit logs and MFA on sensitive settings.',
    },
    {
      title: 'Secure & Reliable Backend',
      description:
        'Three versioned APIs (admin, seller, public), API keys and secrets encrypted with AES-256-GCM, Redis caching and rate limits, and BullMQ queues that retry failed AI calls so no customer message is lost.',
    },
  ],
};
