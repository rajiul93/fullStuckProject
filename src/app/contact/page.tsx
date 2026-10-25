import type { Metadata } from 'next';
import { PortfolioShell } from '@/components/portfolio/shell';
import PortfolioContact from '@/components/portfolio/contact';

export const metadata: Metadata = {
  title: 'Contact — Hire a Front-End Focused MERN Developer',
  description:
    'Get in touch with Rajiul Islam for React, Next.js and MERN stack projects, remote roles or freelance work.',
  alternates: { canonical: '/contact' },
};
export default function ContactPage() {
  return (
    <PortfolioShell>
      <main id="main-content" className="portfolio-contact-page">
        <PortfolioContact />
      </main>
    </PortfolioShell>
  );
}
